import { renderToBuffer } from '@react-pdf/renderer';
import { NextRequest, NextResponse } from 'next/server';

import { InvoiceDocument } from '@/components/pdf/invoice-document';
import { supabaseAdmin } from '@/lib/supabase';
import type { InvoiceData } from '@/types/invoice';

export const runtime = 'nodejs';

function hasRequiredInvoiceFields(invoice: InvoiceData) {
  return Boolean(
    invoice.businessName.trim() &&
      invoice.clientName.trim() &&
      invoice.lineItems.some((item) => item.description.trim() && item.rate > 0)
  );
}

export async function POST(request: NextRequest) {
  try {
    const invoiceData = (await request.json()) as InvoiceData;

    if (!hasRequiredInvoiceFields(invoiceData)) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: business name, client name, and at least one valid line item.',
        },
        { status: 400 }
      );
    }

    const pdfBuffer = await renderToBuffer(InvoiceDocument({ invoice: invoiceData }));
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

    const { data } = supabaseAdmin.storage.from('invoices').getPublicUrl(fileName);

    return NextResponse.json({
      invoiceId: invoiceData.id,
      pdfUrl: data.publicUrl,
    });
  } catch (error) {
    console.error('PDF generation error:', error);

    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
