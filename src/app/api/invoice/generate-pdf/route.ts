import { renderToBuffer } from '@react-pdf/renderer';
import { NextRequest, NextResponse } from 'next/server';

import { InvoiceDocument } from '@/components/pdf/invoice-document';
import { safeCurrency, safeNumber, safePdfTemplateId, stripHtml } from '@/lib/sanitize';
import { getSharedInvoicePdfPath, getSharedInvoiceViewerPath } from '@/lib/shared-invoice-links';
import { supabaseAdmin } from '@/lib/supabase';
import type { InvoiceData } from '@/types/invoice';

export const runtime = 'nodejs';

// In-memory rate limiter: 10 PDF generations per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimitResult(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: maxRequests - entry.count };
}

function hasRequiredInvoiceFields(invoice: InvoiceData) {
  return Boolean(
    invoice.businessName.trim() &&
      invoice.clientName.trim() &&
      invoice.lineItems.some((item) => item.description.trim() && item.rate > 0)
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      '127.0.0.1';

    const { allowed } = getRateLimitResult(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const sanitized = {
      ...body,
      pdfTemplateId: safePdfTemplateId(body.pdfTemplateId),
      businessName: stripHtml(body.businessName),
      businessEmail: stripHtml(body.businessEmail),
      businessPhone: stripHtml(body.businessPhone),
      businessAddress: stripHtml(body.businessAddress),
      clientName: stripHtml(body.clientName),
      clientEmail: stripHtml(body.clientEmail),
      clientPhone: stripHtml(body.clientPhone),
      clientCompany: stripHtml(body.clientCompany),
      notes: stripHtml(body.notes),
      currency: safeCurrency(body.currency),
      taxRate: safeNumber(body.taxRate, 0, 100),
      discount: safeNumber(body.discount, 0, 100),
      lineItems: Array.isArray(body.lineItems)
        ? body.lineItems.map((item: Record<string, unknown>) => ({
            ...item,
            description: stripHtml(item.description),
            quantity: safeNumber(item.quantity, 0, 100_000),
            rate: safeNumber(item.rate, 0, 1_000_000),
            amount: safeNumber(item.amount, 0, 1_000_000_000),
          }))
        : [],
    };
    const invoiceData = sanitized as InvoiceData;

    // Pass through business logo (base64 data URL) if provided
    const businessLogo =
      typeof body.businessLogo === 'string' && body.businessLogo.startsWith('data:image/')
        ? body.businessLogo
        : undefined;

    // Pass through accent color (hex string) if provided
    const accentColor =
      typeof body.accentColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(body.accentColor)
        ? body.accentColor
        : undefined;

    if (!hasRequiredInvoiceFields(invoiceData)) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: business name, client name, and at least one valid line item.',
        },
        { status: 400 }
      );
    }

    const pdfBuffer = await renderToBuffer(InvoiceDocument({ invoice: invoiceData, businessLogo, accentColor }));
    const pdfBytes = new Uint8Array(pdfBuffer);

    if (!supabaseAdmin) {
      return new NextResponse(pdfBytes, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="invoice-${invoiceData.id}.pdf"`,
        },
      });
    }

    const fileName = `${invoiceData.id}.pdf`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from('invoices')
      .upload(fileName, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);

      return NextResponse.json({ error: 'Failed to store PDF' }, { status: 500 });
    }

    return NextResponse.json({
      invoiceId: invoiceData.id,
      viewerPath: getSharedInvoiceViewerPath(invoiceData.id),
      downloadPath: getSharedInvoicePdfPath(invoiceData.id, { download: true }),
    });
  } catch (error) {
    console.error('PDF generation error:', error);

    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
