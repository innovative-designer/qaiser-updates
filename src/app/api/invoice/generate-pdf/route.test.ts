import { NextRequest } from 'next/server';
import { describe, expect, it, vi } from 'vitest';

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
  it('returns branded viewer and download paths instead of a public pdf url', async () => {
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
      pdfUrl?: string;
      viewerPath?: string;
    };

    expect(response.status).toBe(200);
    expect(body.invoiceId).toBe('abc12345');
    expect(body.viewerPath).toBe('/v/abc12345');
    expect(body.downloadPath).toBe('/api/shared-invoices/abc12345/pdf?download=1');
    expect(body.pdfUrl).toBeUndefined();
  });
});
