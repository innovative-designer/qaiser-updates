import { NextRequest, NextResponse } from 'next/server';

import {
  buildPdfResponseHeaders,
  downloadStoredInvoicePdf,
} from '@/lib/server/shared-pdf';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ invoiceId: string }> },
) {
  const { invoiceId } = await context.params;
  const download = request.nextUrl.searchParams.get('download') === '1';

  try {
    const blob = await downloadStoredInvoicePdf(invoiceId);
    const headers = buildPdfResponseHeaders(invoiceId, { download });

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'PDF not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Failed to load PDF' }, { status: 500 });
  }
}
