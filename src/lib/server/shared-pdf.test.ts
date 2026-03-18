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
  createSharedPdfWriteToken,
  createSharedInvoiceId,
  downloadStoredInvoicePdf,
  getInvoiceStorageObjectPath,
  isStableSharedInvoiceId,
  isValidSharedPdfWriteToken,
} from '@/lib/server/shared-pdf';

describe('shared pdf server helpers', () => {
  beforeEach(() => {
    downloadMock.mockReset();
    process.env.SHARED_PDF_WRITE_TOKEN_SECRET = 'test-write-token-secret';
  });

  it('creates a readable shared invoice id', () => {
    expect(
      createSharedInvoiceId('Studio North', {
        date: new Date('2026-03-18T09:00:00.000Z'),
        randomId: 'f7a2c91b-1234-5678-9abc-def012345678',
      }),
    ).toBe('studio-north_f7a2c91b12345678_2026-03-18');
  });

  it('maps new shared invoice ids to the scoped storage object path', () => {
    expect(getInvoiceStorageObjectPath('studio-north_f7a2c91b12345678_2026-03-18')).toBe(
      'shared/studio-north_f7a2c91b12345678_2026-03-18.pdf',
    );
  });

  it('keeps legacy invoice ids on the old storage path', () => {
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

    await expect(
      downloadStoredInvoicePdf('studio-north_f7a2c91b12345678_2026-03-18'),
    ).resolves.toBe(blob);
    expect(downloadMock).toHaveBeenCalledWith(
      'shared/studio-north_f7a2c91b12345678_2026-03-18.pdf',
    );
  });

  it('throws NOT_FOUND when storage cannot find the pdf', async () => {
    downloadMock.mockResolvedValue({
      data: null,
      error: { message: 'Object not found' },
    });

    await expect(downloadStoredInvoicePdf('abc12345')).rejects.toThrow('NOT_FOUND');
  });

  it('recognizes the stable shared invoice id format', () => {
    expect(isStableSharedInvoiceId('studio-north_f7a2c91b12345678_2026-03-18')).toBe(true);
    expect(isStableSharedInvoiceId('abc12345')).toBe(false);
  });

  it('creates and validates a write token for a shared pdf id', () => {
    const sharedInvoiceId = 'studio-north_f7a2c91b12345678_2026-03-18';
    const token = createSharedPdfWriteToken(sharedInvoiceId);

    expect(isValidSharedPdfWriteToken(sharedInvoiceId, token)).toBe(true);
    expect(
      isValidSharedPdfWriteToken(sharedInvoiceId, 'invalid-shared-pdf-write-token'),
    ).toBe(false);
  });
});
