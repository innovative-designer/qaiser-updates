import { createHmac, timingSafeEqual } from 'node:crypto';

import { supabaseAdmin } from '@/lib/supabase';

const NEW_SHARED_INVOICE_ID_PATTERN =
  /^[a-z0-9]+(?:-[a-z0-9]+)*_[a-z0-9]{8,16}_[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

function slugifyStorageSegment(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);

  return slug || 'invoice';
}

export function createSharedInvoiceId(
  businessName: string,
  options?: { date?: Date; randomId?: string },
) {
  const date = options?.date ?? new Date();
  const randomId = (options?.randomId ?? crypto.randomUUID())
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 16)
    .toLowerCase();
  const datePart = date.toISOString().slice(0, 10);

  return `${slugifyStorageSegment(businessName)}_${randomId || 'sharedpdf'}_${datePart}`;
}

function getSharedPdfWriteTokenSecret() {
  return process.env.SHARED_PDF_WRITE_TOKEN_SECRET ?? process.env.SUPABASE_SECRET_KEY ?? null;
}

export function isStableSharedInvoiceId(sharedInvoiceId: string) {
  return NEW_SHARED_INVOICE_ID_PATTERN.test(sharedInvoiceId);
}

export function createSharedPdfWriteToken(sharedInvoiceId: string) {
  const secret = getSharedPdfWriteTokenSecret();

  if (!secret) {
    throw new Error('WRITE_TOKEN_SECRET_UNAVAILABLE');
  }

  return createHmac('sha256', secret).update(`shared-pdf:${sharedInvoiceId}`).digest('base64url');
}

export function isValidSharedPdfWriteToken(sharedInvoiceId: string, token: string) {
  const secret = getSharedPdfWriteTokenSecret();

  if (!secret) {
    return false;
  }

  const expectedToken = createSharedPdfWriteToken(sharedInvoiceId);
  const providedBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expectedToken);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

export function getInvoiceStorageObjectPath(sharedInvoiceId: string) {
  if (isStableSharedInvoiceId(sharedInvoiceId)) {
    return `shared/${sharedInvoiceId}.pdf`;
  }

  return `${sharedInvoiceId}.pdf`;
}

export function buildPdfResponseHeaders(
  sharedInvoiceId: string,
  options: { download: boolean },
) {
  const disposition = options.download ? 'attachment' : 'inline';

  return {
    'Cache-Control': 'no-cache',
    'Content-Disposition': `${disposition}; filename="invoice-${sharedInvoiceId}.pdf"`,
    'Content-Type': 'application/pdf',
  };
}

export async function downloadStoredInvoicePdf(sharedInvoiceId: string) {
  if (!supabaseAdmin) {
    throw new Error('STORAGE_UNAVAILABLE');
  }

  const objectPath = getInvoiceStorageObjectPath(sharedInvoiceId);
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
