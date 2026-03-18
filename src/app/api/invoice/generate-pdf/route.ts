import { renderToBuffer } from '@react-pdf/renderer';
import { NextRequest, NextResponse } from 'next/server';

import { InvoiceDocument } from '@/components/pdf/invoice-document';
import {
  MAX_PDF_ADDRESS_LENGTH,
  MAX_PDF_BUSINESS_NAME_LENGTH,
  MAX_PDF_CLIENT_COMPANY_LENGTH,
  MAX_PDF_EMAIL_LENGTH,
  MAX_PDF_LINE_ITEMS,
  MAX_PDF_LINE_ITEM_DESCRIPTION_LENGTH,
  MAX_PDF_LOGO_BYTES,
  MAX_PDF_NOTES_LENGTH,
  MAX_PDF_PHONE_LENGTH,
  MAX_PDF_REQUEST_BYTES,
} from '@/lib/constants';
import { safeCurrency, safeNumber, safePdfTemplateId, stripHtml } from '@/lib/sanitize';
import {
  createSharedPdfWriteToken,
  createSharedInvoiceId,
  getInvoiceStorageObjectPath,
  isStableSharedInvoiceId,
  isValidSharedPdfWriteToken,
} from '@/lib/server/shared-pdf';
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

function getDataUrlByteSize(value: string) {
  const [, base64 = ''] = value.split(',', 2);
  const paddingLength = (base64.match(/=*$/)?.[0]?.length ?? 0);

  return Math.floor((base64.length * 3) / 4) - paddingLength;
}

function hasExceededLengthLimit(value: string, maxLength: number) {
  return value.length > maxLength;
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

    const contentLength = Number(request.headers.get('content-length') ?? '0');
    if (Number.isFinite(contentLength) && contentLength > MAX_PDF_REQUEST_BYTES) {
      return NextResponse.json(
        { error: 'PDF request payload is too large.' },
        { status: 413 },
      );
    }

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_PDF_REQUEST_BYTES) {
      return NextResponse.json(
        { error: 'PDF request payload is too large.' },
        { status: 413 },
      );
    }

    let body: Record<string, unknown>;

    try {
      body = JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    if (Array.isArray(body.lineItems) && body.lineItems.length > MAX_PDF_LINE_ITEMS) {
      return NextResponse.json(
        { error: `Maximum ${MAX_PDF_LINE_ITEMS} line items allowed.` },
        { status: 400 },
      );
    }

    const requestedSharedInvoiceId =
      typeof body.sharedInvoiceId === 'string' ? body.sharedInvoiceId.trim() : '';
    const sharedPdfWriteToken =
      typeof body.sharedPdfWriteToken === 'string' ? body.sharedPdfWriteToken.trim() : '';
    const canOverwriteExistingPdf =
      Boolean(requestedSharedInvoiceId) &&
      Boolean(sharedPdfWriteToken) &&
      isStableSharedInvoiceId(requestedSharedInvoiceId) &&
      isValidSharedPdfWriteToken(requestedSharedInvoiceId, sharedPdfWriteToken);


    if ((requestedSharedInvoiceId || sharedPdfWriteToken) && !canOverwriteExistingPdf) {
      return NextResponse.json(
        { error: 'Invalid shared PDF update token.' },
        { status: 403 },
      );
    }

    const sanitized = {
      ...body,
      pdfTemplateId: safePdfTemplateId(body.pdfTemplateId),
      businessName: stripHtml(body.businessName),
      businessEmail: stripHtml(body.businessEmail),
      businessPhone: stripHtml(body.businessPhone),
      businessAddress: stripHtml(body.businessAddress),
      senderName: stripHtml(body.senderName ?? ''),
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

    if (
      hasExceededLengthLimit(invoiceData.businessName, MAX_PDF_BUSINESS_NAME_LENGTH) ||
      hasExceededLengthLimit(invoiceData.businessEmail, MAX_PDF_EMAIL_LENGTH) ||
      hasExceededLengthLimit(invoiceData.businessPhone, MAX_PDF_PHONE_LENGTH) ||
      hasExceededLengthLimit(invoiceData.businessAddress, MAX_PDF_ADDRESS_LENGTH) ||
      hasExceededLengthLimit(invoiceData.senderName ?? '', MAX_PDF_BUSINESS_NAME_LENGTH) ||
      hasExceededLengthLimit(invoiceData.clientName, MAX_PDF_BUSINESS_NAME_LENGTH) ||
      hasExceededLengthLimit(invoiceData.clientEmail, MAX_PDF_EMAIL_LENGTH) ||
      hasExceededLengthLimit(invoiceData.clientPhone, MAX_PDF_PHONE_LENGTH) ||
      hasExceededLengthLimit(invoiceData.clientCompany, MAX_PDF_CLIENT_COMPANY_LENGTH) ||
      hasExceededLengthLimit(invoiceData.notes, MAX_PDF_NOTES_LENGTH) ||
      invoiceData.lineItems.some((item) =>
        hasExceededLengthLimit(item.description, MAX_PDF_LINE_ITEM_DESCRIPTION_LENGTH),
      )
    ) {
      return NextResponse.json(
        { error: 'One or more invoice fields exceed the allowed length.' },
        { status: 400 },
      );
    }

    if (businessLogo && getDataUrlByteSize(businessLogo) > MAX_PDF_LOGO_BYTES) {
      return NextResponse.json(
        { error: 'Logo must be under 512KB.' },
        { status: 400 },
      );
    }

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

    const sharedInvoiceId = canOverwriteExistingPdf
      ? requestedSharedInvoiceId
      : createSharedInvoiceId(invoiceData.businessName);
    const storagePath = getInvoiceStorageObjectPath(sharedInvoiceId);
    const { error: uploadError } = await supabaseAdmin.storage
      .from('invoices')
      .upload(storagePath, pdfBytes, {
        contentType: 'application/pdf',
        upsert: canOverwriteExistingPdf,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);

      return NextResponse.json({ error: 'Failed to store PDF' }, { status: 500 });
    }

    return NextResponse.json({
      invoiceId: invoiceData.id,
      pdfPath: getSharedInvoicePdfPath(sharedInvoiceId),
      sharedPdfWriteToken: createSharedPdfWriteToken(sharedInvoiceId),
      viewerPath: getSharedInvoiceViewerPath(sharedInvoiceId),
      downloadPath: getSharedInvoicePdfPath(sharedInvoiceId, { download: true }),
    });
  } catch (error) {
    console.error('PDF generation error:', error);

    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
