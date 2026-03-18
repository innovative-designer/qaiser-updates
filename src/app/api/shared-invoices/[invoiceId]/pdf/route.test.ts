import { NextRequest } from 'next/server';
import { describe, expect, it, vi } from 'vitest';

const { buildPdfResponseHeadersMock, downloadStoredInvoicePdfMock } = vi.hoisted(() => ({
  buildPdfResponseHeadersMock: vi.fn(
    (invoiceId: string, { download }: { download: boolean }) => ({
      'Content-Disposition': `${
        download ? 'attachment' : 'inline'
      }; filename="invoice-${invoiceId}.pdf"`,
      'Content-Type': 'application/pdf',
    }),
  ),
  downloadStoredInvoicePdfMock: vi.fn(
    async () => new Blob(['pdf'], { type: 'application/pdf' }),
  ),
}));

vi.mock('@/lib/server/shared-pdf', () => ({
  buildPdfResponseHeaders: buildPdfResponseHeadersMock,
  downloadStoredInvoicePdf: downloadStoredInvoicePdfMock,
}));

import { GET } from '@/app/api/shared-invoices/[invoiceId]/pdf/route';

describe('GET /api/shared-invoices/[invoiceId]/pdf', () => {
  it('returns an inline pdf by default', async () => {
    const request = new NextRequest(
      'https://www.freeinvoicekit.com/api/shared-invoices/abc12345/pdf',
    );
    const response = await GET(request, {
      params: Promise.resolve({ invoiceId: 'abc12345' }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Disposition')).toContain('inline');
  });

  it('returns an attachment when download=1', async () => {
    const request = new NextRequest(
      'https://www.freeinvoicekit.com/api/shared-invoices/studio-north_f7a2c91b12345678_2026-03-18/pdf?download=1',
    );
    const response = await GET(request, {
      params: Promise.resolve({ invoiceId: 'studio-north_f7a2c91b12345678_2026-03-18' }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Disposition')).toContain('attachment');
  });

  it('returns 404 when the pdf does not exist', async () => {
    downloadStoredInvoicePdfMock.mockRejectedValueOnce(new Error('NOT_FOUND'));

    const request = new NextRequest(
      'https://www.freeinvoicekit.com/api/shared-invoices/missing/pdf',
    );
    const response = await GET(request, {
      params: Promise.resolve({ invoiceId: 'missing' }),
    });

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: 'PDF not found' });
  });
});
