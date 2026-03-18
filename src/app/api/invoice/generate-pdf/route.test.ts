import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createSharedPdfWriteToken } from '@/lib/server/shared-pdf';

const uploadMock = vi.fn();

vi.mock('@react-pdf/renderer', () => ({
  renderToBuffer: vi.fn(async () => Uint8Array.from([1, 2, 3])),
}));

vi.mock('@/components/pdf/invoice-document', () => ({
  InvoiceDocument: vi.fn(() => null),
}));

vi.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    storage: {
      from: vi.fn(() => ({
        upload: uploadMock,
      })),
    },
  },
}));

import { POST } from '@/app/api/invoice/generate-pdf/route';

describe('POST /api/invoice/generate-pdf', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-18T09:00:00.000Z'));
    vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(
      'f7a2c91b-1234-5678-9abc-def012345678',
    );
    process.env.SHARED_PDF_WRITE_TOKEN_SECRET = 'test-write-token-secret';
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    uploadMock.mockReset();
  });

  it('returns branded viewer, inline, and download paths backed by a server-generated key', async () => {
    uploadMock.mockResolvedValueOnce({ error: null });

    const request = new NextRequest('https://www.freeinvoicekit.com/api/invoice/generate-pdf', {
      method: 'POST',
      body: JSON.stringify({
        id: 'abc12345',
        businessName: 'Studio North',
        clientName: 'Client',
        lineItems: [
          {
            id: 'li1',
            description: 'Design',
            quantity: 1,
            rate: 100,
            amount: 100,
          },
        ],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const body = (await response.json()) as {
      downloadPath?: string;
      invoiceId?: string;
      pdfPath?: string;
      pdfUrl?: string;
      sharedPdfWriteToken?: string;
      viewerPath?: string;
    };

    expect(response.status).toBe(200);
    expect(body.invoiceId).toBe('abc12345');
    expect(body.viewerPath).toBe('/v/studio-north_f7a2c91b12345678_2026-03-18');
    expect(body.pdfPath).toBe(
      '/api/shared-invoices/studio-north_f7a2c91b12345678_2026-03-18/pdf',
    );
    expect(body.downloadPath).toBe(
      '/api/shared-invoices/studio-north_f7a2c91b12345678_2026-03-18/pdf?download=1',
    );
    expect(body.sharedPdfWriteToken).toBe(
      createSharedPdfWriteToken('studio-north_f7a2c91b12345678_2026-03-18'),
    );
    expect(body.pdfUrl).toBeUndefined();
    expect(uploadMock).toHaveBeenCalledWith(
      'shared/studio-north_f7a2c91b12345678_2026-03-18.pdf',
      expect.any(Uint8Array),
      expect.objectContaining({
        contentType: 'application/pdf',
        upsert: false,
      }),
    );
  });

  it('reuses the existing shared pdf path when a valid update token is provided', async () => {
    uploadMock.mockResolvedValueOnce({ error: null });
    const sharedInvoiceId = 'studio-north_f7a2c91b12345678_2026-03-18';

    const request = new NextRequest('https://www.freeinvoicekit.com/api/invoice/generate-pdf', {
      method: 'POST',
      body: JSON.stringify({
        id: 'abc12345',
        businessName: 'Studio North',
        clientName: 'Client',
        sharedInvoiceId,
        sharedPdfWriteToken: createSharedPdfWriteToken(sharedInvoiceId),
        lineItems: [
          {
            id: 'li1',
            description: 'Design',
            quantity: 1,
            rate: 150,
            amount: 150,
          },
        ],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const body = (await response.json()) as {
      pdfPath?: string;
      viewerPath?: string;
    };

    expect(response.status).toBe(200);
    expect(body.viewerPath).toBe(`/v/${sharedInvoiceId}`);
    expect(body.pdfPath).toBe(`/api/shared-invoices/${sharedInvoiceId}/pdf`);
    expect(uploadMock).toHaveBeenCalledWith(
      `shared/${sharedInvoiceId}.pdf`,
      expect.any(Uint8Array),
      expect.objectContaining({
        contentType: 'application/pdf',
        upsert: true,
      }),
    );
  });

  it('rejects requests with more than 20 line items', async () => {
    const request = new NextRequest('https://www.freeinvoicekit.com/api/invoice/generate-pdf', {
      method: 'POST',
      body: JSON.stringify({
        id: 'abc12345',
        businessName: 'Studio North',
        clientName: 'Client',
        lineItems: Array.from({ length: 21 }, (_, index) => ({
          id: `li${index + 1}`,
          description: `Design ${index + 1}`,
          quantity: 1,
          rate: 100,
          amount: 100,
        })),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: 'Maximum 20 line items allowed.',
    });
  });
});
