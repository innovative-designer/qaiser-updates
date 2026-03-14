import { supabaseAdmin } from '@/lib/supabase';

export function getInvoiceStorageObjectPath(invoiceId: string) {
  return `${invoiceId}.pdf`;
}

export function buildPdfResponseHeaders(
  invoiceId: string,
  options: { download: boolean },
) {
  const disposition = options.download ? 'attachment' : 'inline';

  return {
    'Cache-Control': 'no-cache',
    'Content-Disposition': `${disposition}; filename="invoice-${invoiceId}.pdf"`,
    'Content-Type': 'application/pdf',
  };
}

export async function downloadStoredInvoicePdf(invoiceId: string) {
  if (!supabaseAdmin) {
    throw new Error('STORAGE_UNAVAILABLE');
  }

  const objectPath = getInvoiceStorageObjectPath(invoiceId);
  const { data, error } = await supabaseAdmin.storage.from('invoices').download(objectPath);

  if (error || !data) {
    const message = error?.message?.toLowerCase() ?? '';

    if (message.includes('not found') || message.includes('404')) {
      throw new Error('NOT_FOUND');
    }

    throw new Error('STORAGE_ERROR');
  }

  return data;
}
