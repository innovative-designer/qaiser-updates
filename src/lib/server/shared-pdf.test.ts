import { beforeEach, describe, expect, it, vi } from 'vitest';

const downloadMock = vi.fn();

vi.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    storage: {
      from: vi.fn(() => ({
        download: downloadMock,
      })),
    },
  },
}));

import {
  buildPdfResponseHeaders,
  downloadStoredInvoicePdf,
  getInvoiceStorageObjectPath,
} from '@/lib/server/shared-pdf';

describe('shared pdf server helpers', () => {
  beforeEach(() => {
    downloadMock.mockReset();
  });

  it('maps invoice id to the storage object path', () => {
    expect(getInvoiceStorageObjectPath('abc12345')).toBe('abc12345.pdf');
  });

  it('builds inline headers', () => {
    const headers = buildPdfResponseHeaders('abc12345', { download: false });
    expect(headers['Content-Type']).toBe('application/pdf');
    expect(headers['Content-Disposition']).toContain('inline');
  });

  it('builds attachment headers', () => {
    const headers = buildPdfResponseHeaders('abc12345', { download: true });
    expect(headers['Content-Disposition']).toContain('attachment');
  });

  it('downloads the stored invoice pdf blob', async () => {
    const blob = new Blob(['pdf'], { type: 'application/pdf' });
    downloadMock.mockResolvedValue({ data: blob, error: null });

    await expect(downloadStoredInvoicePdf('abc12345')).resolves.toBe(blob);
    expect(downloadMock).toHaveBeenCalledWith('abc12345.pdf');
  });

  it('throws NOT_FOUND when storage cannot find the pdf', async () => {
    downloadMock.mockResolvedValue({
      data: null,
      error: { message: 'Object not found' },
    });

    await expect(downloadStoredInvoicePdf('abc12345')).rejects.toThrow('NOT_FOUND');
  });
});
