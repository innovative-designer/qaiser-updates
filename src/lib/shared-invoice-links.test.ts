import { describe, expect, it } from 'vitest';

import {
  getSharedInvoicePdfPath,
  getSharedInvoiceViewerPath,
  isLegacyRemotePdfUrl,
} from '@/lib/shared-invoice-links';

describe('shared invoice links', () => {
  it('builds the viewer path from invoice id', () => {
    expect(getSharedInvoiceViewerPath('abc12345')).toBe('/v/abc12345');
  });

  it('builds the inline PDF path from invoice id', () => {
    expect(getSharedInvoicePdfPath('abc12345')).toBe('/api/shared-invoices/abc12345/pdf');
  });

  it('builds the download PDF path from invoice id', () => {
    expect(getSharedInvoicePdfPath('abc12345', { download: true })).toBe(
      '/api/shared-invoices/abc12345/pdf?download=1',
    );
  });

  it('recognizes legacy remote pdf urls', () => {
    expect(
      isLegacyRemotePdfUrl('https://xyz.supabase.co/storage/v1/object/public/invoices/a.pdf'),
    ).toBe(true);
    expect(isLegacyRemotePdfUrl('blob:abc')).toBe(false);
    expect(isLegacyRemotePdfUrl(undefined)).toBe(false);
  });
});
