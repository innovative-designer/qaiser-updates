import { describe, expect, it } from 'vitest';

import { getShareableInvoicePaths } from '@/lib/share';

describe('getShareableInvoicePaths', () => {
  it('prefers branded same-origin paths for invoices with remote pdf access', () => {
    expect(
      getShareableInvoicePaths({
        id: 'abc12345',
        pdfUrl: '/api/shared-invoices/studio-north_f7a2c91b12345678_2026-03-18/pdf',
      }),
    ).toEqual({
      viewerPath: '/v/studio-north_f7a2c91b12345678_2026-03-18',
      pdfPath: '/api/shared-invoices/studio-north_f7a2c91b12345678_2026-03-18/pdf',
      downloadPath: '/api/shared-invoices/studio-north_f7a2c91b12345678_2026-03-18/pdf?download=1',
    });
  });

  it('falls back to the legacy invoice id mapping for old remote pdf urls', () => {
    expect(
      getShareableInvoicePaths({
        id: 'abc12345',
        pdfUrl: 'https://xyz.supabase.co/storage/v1/object/public/invoices/abc12345.pdf',
      }),
    ).toEqual({
      viewerPath: '/v/abc12345',
      pdfPath: '/api/shared-invoices/abc12345/pdf',
      downloadPath: '/api/shared-invoices/abc12345/pdf?download=1',
    });
  });

  it('returns null when the invoice only has a local blob url', () => {
    expect(
      getShareableInvoicePaths({
        id: 'abc12345',
        pdfUrl: 'blob:abc',
      }),
    ).toBeNull();
  });
});
