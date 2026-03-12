# Branded PDF Viewer Links Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace direct Supabase PDF links with branded `www.freeinvoicekit.com` viewer links that open a minimal in-app PDF viewer and keep PDF delivery hidden behind same-origin routes.

**Architecture:** Keep Supabase Storage as the backing store, but stop returning or exposing Supabase public URLs in user-facing UI. The app will generate viewer links based on `invoiceId`, stream PDFs through same-origin API routes, and render a dedicated noindex viewer route with minimal branding, a homepage logo link, and a download action.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Supabase Storage, Vitest, Testing Library, pnpm.

---

## Preconditions

- The current storage key remains `${invoiceId}.pdf` in the `invoices` bucket.
- Shared links are intentionally public and permanent for now.
- The viewer route will be `noindex` and excluded from the sitemap.
- The PDF viewer will use a same-origin PDF stream route, not a client-side PDF.js renderer.

## Implementation Rules

- Follow TDD strictly: write a failing test first, confirm it fails, implement the minimum fix, then rerun.
- Keep each commit small and scoped to one task.
- Preserve backward compatibility for old invoices stored in IndexedDB with `pdfUrl`.
- Do not expose Supabase URLs in toasts, copied links, anchors, API JSON payloads, or analytics props.

## Proposed Route Shape

- Viewer page: `/v/[invoiceId]`
- Inline PDF stream: `/api/shared-invoices/[invoiceId]/pdf`
- Download URL: `/api/shared-invoices/[invoiceId]/pdf?download=1`

## Proposed File Layout

- Create: `src/lib/shared-invoice-links.ts`
- Create: `src/lib/server/shared-pdf.ts`
- Create: `src/app/api/shared-invoices/[invoiceId]/pdf/route.ts`
- Create: `src/app/v/[invoiceId]/layout.tsx`
- Create: `src/app/v/[invoiceId]/page.tsx`
- Create: `src/components/shared/pdf-viewer-shell.tsx`
- Create: `src/components/shared/pdf-viewer-frame.tsx`
- Create: `src/components/shared/pdf-viewer-actions.tsx`
- Create: `src/test/setup.ts`
- Create: `vitest.config.ts`
- Create: `src/lib/shared-invoice-links.test.ts`
- Create: `src/lib/server/shared-pdf.test.ts`
- Create: `src/app/api/shared-invoices/[invoiceId]/pdf/route.test.ts`
- Create: `src/components/shared/pdf-viewer-shell.test.tsx`
- Modify: `package.json`
- Modify: `src/app/api/invoice/generate-pdf/route.ts`
- Modify: `src/app/create/page.tsx`
- Modify: `src/app/history/page.tsx`
- Modify: `src/lib/share.ts`
- Modify: `src/lib/analytics/posthog.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `next.config.ts`

## Data Contract Changes

- Keep `InvoiceData.pdfUrl` for legacy compatibility only.
- Treat `invoice.id` as the canonical share identifier.
- New server response from PDF generation route should be:

```ts
type GeneratePdfResponse = {
  invoiceId: string;
  viewerPath: string;
  downloadPath: string;
};
```

- Do not return `pdfUrl` from the PDF generation API once the migration is complete.

## Test Matrix

- Unit tests for path builders
- Unit tests for Supabase fetch/stream helpers
- Route tests for inline and download response headers
- Component tests for the viewer shell
- Smoke tests for create/history button behavior
- Manual browser QA for desktop and mobile PDF rendering

---

### Task 1: Add the test harness

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Test: `src/components/shared/pdf-viewer-shell.test.tsx`

**Step 1: Write the failing test**

Create `src/components/shared/pdf-viewer-shell.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';

import { PdfViewerShell } from '@/components/shared/pdf-viewer-shell';

describe('PdfViewerShell', () => {
  it('renders the app brand and download action', () => {
    render(
      <PdfViewerShell
        invoiceId="abc12345"
        pdfInlinePath="/api/shared-invoices/abc12345/pdf"
        pdfDownloadPath="/api/shared-invoices/abc12345/pdf?download=1"
      />,
    );

    expect(screen.getByRole('link', { name: /free invoice kit/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download pdf/i })).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run:

```bash
corepack pnpm exec vitest run src/components/shared/pdf-viewer-shell.test.tsx
```

Expected: FAIL because `vitest` is not installed and `PdfViewerShell` does not exist.

**Step 3: Write minimal implementation**

- Add dev dependencies:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "...",
    "@testing-library/react": "...",
    "@testing-library/user-event": "...",
    "jsdom": "...",
    "vitest": "..."
  }
}
```

- Add `vitest.config.ts` with:

```ts
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- Add `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- Add a temporary `PdfViewerShell` stub that only renders brand text and download link.

**Step 4: Run test to verify it passes**

Run:

```bash
corepack pnpm exec vitest run src/components/shared/pdf-viewer-shell.test.tsx
```

Expected: PASS

**Step 5: Commit**

```bash
git add package.json vitest.config.ts src/test/setup.ts src/components/shared/pdf-viewer-shell.tsx src/components/shared/pdf-viewer-shell.test.tsx
git commit -m "test: add viewer feature test harness"
```

---

### Task 2: Add shared branded-link helpers

**Files:**
- Create: `src/lib/shared-invoice-links.ts`
- Test: `src/lib/shared-invoice-links.test.ts`

**Step 1: Write the failing test**

Create `src/lib/shared-invoice-links.test.ts`:

```ts
import {
  getSharedInvoiceViewerPath,
  getSharedInvoicePdfPath,
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
    expect(isLegacyRemotePdfUrl('https://xyz.supabase.co/storage/v1/object/public/invoices/a.pdf')).toBe(true);
    expect(isLegacyRemotePdfUrl('blob:abc')).toBe(false);
  });
});
```

**Step 2: Run test to verify it fails**

Run:

```bash
corepack pnpm exec vitest run src/lib/shared-invoice-links.test.ts
```

Expected: FAIL because the helper module does not exist.

**Step 3: Write minimal implementation**

Create `src/lib/shared-invoice-links.ts`:

```ts
export function getSharedInvoiceViewerPath(invoiceId: string) {
  return `/v/${invoiceId}`;
}

export function getSharedInvoicePdfPath(
  invoiceId: string,
  options?: { download?: boolean },
) {
  return options?.download
    ? `/api/shared-invoices/${invoiceId}/pdf?download=1`
    : `/api/shared-invoices/${invoiceId}/pdf`;
}

export function isLegacyRemotePdfUrl(url: string | undefined) {
  return Boolean(url && !url.startsWith('blob:') && /^https?:\/\//.test(url));
}
```

**Step 4: Run test to verify it passes**

Run:

```bash
corepack pnpm exec vitest run src/lib/shared-invoice-links.test.ts
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/shared-invoice-links.ts src/lib/shared-invoice-links.test.ts
git commit -m "test: add branded shared invoice link helpers"
```

---

### Task 3: Add server-side PDF access helpers

**Files:**
- Create: `src/lib/server/shared-pdf.ts`
- Test: `src/lib/server/shared-pdf.test.ts`

**Step 1: Write the failing test**

Create `src/lib/server/shared-pdf.test.ts`:

```ts
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    storage: {
      from: () => ({
        download: vi.fn(),
      }),
    },
  },
}));

import {
  buildPdfResponseHeaders,
  getInvoiceStorageObjectPath,
} from '@/lib/server/shared-pdf';

describe('shared pdf server helpers', () => {
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
});
```

**Step 2: Run test to verify it fails**

Run:

```bash
corepack pnpm exec vitest run src/lib/server/shared-pdf.test.ts
```

Expected: FAIL because the server helper module does not exist.

**Step 3: Write minimal implementation**

Create `src/lib/server/shared-pdf.ts`:

```ts
export function getInvoiceStorageObjectPath(invoiceId: string) {
  return `${invoiceId}.pdf`;
}

export function buildPdfResponseHeaders(
  invoiceId: string,
  options: { download: boolean },
) {
  const disposition = options.download ? 'attachment' : 'inline';

  return {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `${disposition}; filename="invoice-${invoiceId}.pdf"`,
    'Cache-Control': 'public, max-age=300',
  };
}
```

Then extend the file with a `downloadStoredInvoicePdf(invoiceId)` helper that:

- reads from `supabaseAdmin.storage.from('invoices').download(...)`
- returns a typed result
- throws a `NOT_FOUND` error when the file does not exist
- throws a generic storage error for everything else

**Step 4: Run test to verify it passes**

Run:

```bash
corepack pnpm exec vitest run src/lib/server/shared-pdf.test.ts
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/server/shared-pdf.ts src/lib/server/shared-pdf.test.ts
git commit -m "test: add shared pdf server helpers"
```

---

### Task 4: Add the PDF proxy route

**Files:**
- Create: `src/app/api/shared-invoices/[invoiceId]/pdf/route.ts`
- Test: `src/app/api/shared-invoices/[invoiceId]/pdf/route.test.ts`

**Step 1: Write the failing test**

Create `src/app/api/shared-invoices/[invoiceId]/pdf/route.test.ts`:

```ts
import { NextRequest } from 'next/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/server/shared-pdf', () => ({
  downloadStoredInvoicePdf: vi.fn(async () => new Blob(['pdf'], { type: 'application/pdf' })),
  buildPdfResponseHeaders: vi.fn((invoiceId: string, { download }: { download: boolean }) => ({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename="invoice-${invoiceId}.pdf"`,
  })),
}));

import { GET } from '@/app/api/shared-invoices/[invoiceId]/pdf/route';

describe('GET /api/shared-invoices/[invoiceId]/pdf', () => {
  it('returns an inline pdf by default', async () => {
    const request = new NextRequest('https://www.freeinvoicekit.com/api/shared-invoices/abc12345/pdf');
    const response = await GET(request, { params: Promise.resolve({ invoiceId: 'abc12345' }) });

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Disposition')).toContain('inline');
  });

  it('returns an attachment when download=1', async () => {
    const request = new NextRequest('https://www.freeinvoicekit.com/api/shared-invoices/abc12345/pdf?download=1');
    const response = await GET(request, { params: Promise.resolve({ invoiceId: 'abc12345' }) });

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Disposition')).toContain('attachment');
  });
});
```

**Step 2: Run test to verify it fails**

Run:

```bash
corepack pnpm exec vitest run src/app/api/shared-invoices/[invoiceId]/pdf/route.test.ts
```

Expected: FAIL because the route does not exist.

**Step 3: Write minimal implementation**

Create `src/app/api/shared-invoices/[invoiceId]/pdf/route.ts`:

```ts
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

    return new NextResponse(blob, { status: 200, headers });
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'PDF not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Failed to load PDF' }, { status: 500 });
  }
}
```

Add one more failing test, then implement:

```ts
it('returns 404 when the PDF does not exist', async () => { ... });
```

**Step 4: Run test to verify it passes**

Run:

```bash
corepack pnpm exec vitest run src/app/api/shared-invoices/[invoiceId]/pdf/route.test.ts
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/app/api/shared-invoices/[invoiceId]/pdf/route.ts src/app/api/shared-invoices/[invoiceId]/pdf/route.test.ts
git commit -m "feat: add branded shared pdf proxy route"
```

---

### Task 5: Build the minimal viewer page

**Files:**
- Create: `src/app/v/[invoiceId]/layout.tsx`
- Create: `src/app/v/[invoiceId]/page.tsx`
- Create: `src/components/shared/pdf-viewer-shell.tsx`
- Create: `src/components/shared/pdf-viewer-frame.tsx`
- Create: `src/components/shared/pdf-viewer-actions.tsx`
- Test: `src/components/shared/pdf-viewer-shell.test.tsx`

**Step 1: Write the failing test**

Extend `src/components/shared/pdf-viewer-shell.test.tsx`:

```tsx
it('links the brand to the homepage', () => {
  render(
    <PdfViewerShell
      invoiceId="abc12345"
      pdfInlinePath="/api/shared-invoices/abc12345/pdf"
      pdfDownloadPath="/api/shared-invoices/abc12345/pdf?download=1"
    />,
  );

  expect(screen.getByRole('link', { name: /free invoice kit/i })).toHaveAttribute('href', '/');
});

it('renders the inline pdf frame using the same-origin stream path', () => {
  render(
    <PdfViewerShell
      invoiceId="abc12345"
      pdfInlinePath="/api/shared-invoices/abc12345/pdf"
      pdfDownloadPath="/api/shared-invoices/abc12345/pdf?download=1"
    />,
  );

  expect(screen.getByTitle(/invoice pdf viewer/i)).toHaveAttribute(
    'src',
    '/api/shared-invoices/abc12345/pdf',
  );
});
```

**Step 2: Run test to verify it fails**

Run:

```bash
corepack pnpm exec vitest run src/components/shared/pdf-viewer-shell.test.tsx
```

Expected: FAIL because the shell is still a stub.

**Step 3: Write minimal implementation**

Create `src/components/shared/pdf-viewer-shell.tsx`:

```tsx
import Link from 'next/link';

import { PdfViewerActions } from '@/components/shared/pdf-viewer-actions';
import { PdfViewerFrame } from '@/components/shared/pdf-viewer-frame';

export function PdfViewerShell({
  invoiceId,
  pdfInlinePath,
  pdfDownloadPath,
}: {
  invoiceId: string;
  pdfInlinePath: string;
  pdfDownloadPath: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-border/60 surface-floating sticky top-0 z-40 border-b">
        <div className="app-shell flex items-center justify-between gap-4 py-3">
          <Link href="/" className="text-foreground text-sm font-semibold tracking-[var(--tracking-heading)]">
            Free Invoice Kit
          </Link>
          <PdfViewerActions pdfDownloadPath={pdfDownloadPath} />
        </div>
      </header>

      <main className="app-shell py-4 sm:py-6">
        <PdfViewerFrame src={pdfInlinePath} title={`Invoice PDF Viewer ${invoiceId}`} />
      </main>
    </div>
  );
}
```

Create `src/components/shared/pdf-viewer-frame.tsx`:

```tsx
export function PdfViewerFrame({ src, title }: { src: string; title: string }) {
  return (
    <iframe
      title={title}
      src={src}
      className="h-[calc(100vh-7rem)] w-full rounded-[var(--radius-card)] border bg-card"
    />
  );
}
```

Create `src/components/shared/pdf-viewer-actions.tsx`:

```tsx
export function PdfViewerActions({ pdfDownloadPath }: { pdfDownloadPath: string }) {
  return (
    <a href={pdfDownloadPath} className="surface-field rounded-[var(--radius-button)] border px-4 py-2 text-sm font-medium">
      Download PDF
    </a>
  );
}
```

Create `src/app/v/[invoiceId]/layout.tsx`:

```ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice Viewer',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SharedInvoiceViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

Create `src/app/v/[invoiceId]/page.tsx`:

```tsx
import { PdfViewerShell } from '@/components/shared/pdf-viewer-shell';
import {
  getSharedInvoicePdfPath,
  getSharedInvoiceViewerPath,
} from '@/lib/shared-invoice-links';

export default async function SharedInvoiceViewerPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId } = await params;

  return (
    <PdfViewerShell
      invoiceId={invoiceId}
      pdfInlinePath={getSharedInvoicePdfPath(invoiceId)}
      pdfDownloadPath={getSharedInvoicePdfPath(invoiceId, { download: true })}
    />
  );
}
```

**Step 4: Run test to verify it passes**

Run:

```bash
corepack pnpm exec vitest run src/components/shared/pdf-viewer-shell.test.tsx
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/app/v/[invoiceId]/layout.tsx src/app/v/[invoiceId]/page.tsx src/components/shared/pdf-viewer-shell.tsx src/components/shared/pdf-viewer-frame.tsx src/components/shared/pdf-viewer-actions.tsx src/components/shared/pdf-viewer-shell.test.tsx
git commit -m "feat: add minimal branded invoice viewer"
```

---

### Task 6: Refactor PDF generation API to return branded app paths

**Files:**
- Modify: `src/app/api/invoice/generate-pdf/route.ts`
- Test: `src/app/api/invoice/generate-pdf/route.test.ts`
- Reuse: `src/lib/shared-invoice-links.ts`

**Step 1: Write the failing test**

Create `src/app/api/invoice/generate-pdf/route.test.ts`:

```ts
import { NextRequest } from 'next/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@react-pdf/renderer', () => ({
  renderToBuffer: vi.fn(async () => Uint8Array.from([1, 2, 3])),
}));

vi.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    storage: {
      from: () => ({
        upload: vi.fn(async () => ({ error: null })),
      }),
    },
  },
}));

import { POST } from '@/app/api/invoice/generate-pdf/route';

describe('POST /api/invoice/generate-pdf', () => {
  it('returns branded viewer and download paths instead of a public pdf url', async () => {
    const request = new NextRequest('https://www.freeinvoicekit.com/api/invoice/generate-pdf', {
      method: 'POST',
      body: JSON.stringify({
        id: 'abc12345',
        businessName: 'Studio North',
        clientName: 'Client',
        lineItems: [{ id: 'li1', description: 'Design', quantity: 1, rate: 100, amount: 100 }],
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(body.viewerPath).toBe('/v/abc12345');
    expect(body.downloadPath).toBe('/api/shared-invoices/abc12345/pdf?download=1');
    expect(body.pdfUrl).toBeUndefined();
  });
});
```

**Step 2: Run test to verify it fails**

Run:

```bash
corepack pnpm exec vitest run src/app/api/invoice/generate-pdf/route.test.ts
```

Expected: FAIL because the route still returns `pdfUrl`.

**Step 3: Write minimal implementation**

Modify `src/app/api/invoice/generate-pdf/route.ts`:

- import path helpers from `src/lib/shared-invoice-links.ts`
- keep upload behavior unchanged
- stop calling `getPublicUrl`
- return:

```ts
return NextResponse.json({
  invoiceId: invoiceData.id,
  viewerPath: getSharedInvoiceViewerPath(invoiceData.id),
  downloadPath: getSharedInvoicePdfPath(invoiceData.id, { download: true }),
});
```

- keep the blob fallback branch unchanged when `supabaseAdmin` is missing

**Step 4: Run test to verify it passes**

Run:

```bash
corepack pnpm exec vitest run src/app/api/invoice/generate-pdf/route.test.ts
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/app/api/invoice/generate-pdf/route.ts src/app/api/invoice/generate-pdf/route.test.ts
git commit -m "feat: return branded shared invoice paths from pdf generation api"
```

---

### Task 7: Switch create and history flows to branded viewer links

**Files:**
- Modify: `src/app/create/page.tsx`
- Modify: `src/app/history/page.tsx`
- Modify: `src/lib/share.ts`
- Test: `src/lib/share.test.ts`
- Test: `src/app/create/page.test.tsx`
- Test: `src/app/history/page.test.tsx`

**Step 1: Write the failing tests**

Create `src/lib/share.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

import { getShareableInvoicePaths } from '@/lib/share';

describe('getShareableInvoicePaths', () => {
  it('prefers branded same-origin paths for invoices with ids', () => {
    expect(
      getShareableInvoicePaths({
        id: 'abc12345',
        pdfUrl: 'https://xyz.supabase.co/storage/v1/object/public/invoices/abc12345.pdf',
      } as never),
    ).toEqual({
      viewerPath: '/v/abc12345',
      pdfPath: '/api/shared-invoices/abc12345/pdf',
      downloadPath: '/api/shared-invoices/abc12345/pdf?download=1',
    });
  });
});
```

Add targeted page tests:

```tsx
it('copies the branded viewer path from create', async () => { ... });
it('copies the branded viewer path from history', async () => { ... });
```

**Step 2: Run test to verify it fails**

Run:

```bash
corepack pnpm exec vitest run src/lib/share.test.ts src/app/create/page.test.tsx src/app/history/page.test.tsx
```

Expected: FAIL because the helper does not exist and pages still use `pdfUrl` directly.

**Step 3: Write minimal implementation**

In `src/lib/share.ts`:

- add:

```ts
import { getSharedInvoicePdfPath, getSharedInvoiceViewerPath } from '@/lib/shared-invoice-links';

export function getShareableInvoicePaths(invoice: Pick<InvoiceData, 'id'>) {
  return {
    viewerPath: getSharedInvoiceViewerPath(invoice.id),
    pdfPath: getSharedInvoicePdfPath(invoice.id),
    downloadPath: getSharedInvoicePdfPath(invoice.id, { download: true }),
  };
}
```

- change `shareOnWhatsApp()` and `downloadPdf()` to fetch `pdfPath` or `downloadPath` from `invoice.id`
- only fall back to legacy `invoice.pdfUrl` if the invoice is missing an id or if the feature is being used during migration debugging

In `src/app/create/page.tsx`:

- replace remote `generatedPdfUrl` copy-link logic with `viewerPath`
- keep `blob:` path support only for the immediate local open fallback branch
- change `Open PDF` when remote to use `/v/[invoiceId]`

In `src/app/history/page.tsx`:

- change `Open PDF` to link to `/v/[invoiceId]`
- change `Copy Link` to copy `/v/[invoiceId]`

**Step 4: Run test to verify it passes**

Run:

```bash
corepack pnpm exec vitest run src/lib/share.test.ts src/app/create/page.test.tsx src/app/history/page.test.tsx
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/share.ts src/lib/share.test.ts src/app/create/page.tsx src/app/history/page.tsx src/app/create/page.test.tsx src/app/history/page.test.tsx
git commit -m "feat: switch share actions to branded invoice viewer links"
```

---

### Task 8: Add viewer analytics, metadata, and security exceptions

**Files:**
- Modify: `src/lib/analytics/posthog.ts`
- Modify: `next.config.ts`
- Modify: `src/app/sitemap.ts`
- Test: `src/lib/analytics/posthog.test.ts`
- Test: `src/app/sitemap.test.ts`

**Step 1: Write the failing tests**

Create `src/lib/analytics/posthog.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

import { isAnalyticsRoute } from '@/lib/analytics/posthog';

describe('isAnalyticsRoute', () => {
  it('treats shared invoice viewer routes as analytics-enabled', () => {
    expect(isAnalyticsRoute('/v/abc12345')).toBe(true);
  });
});
```

Add sitemap test:

```ts
it('does not include shared viewer routes', () => {
  // assert no /v/ path appears
});
```

**Step 2: Run test to verify it fails**

Run:

```bash
corepack pnpm exec vitest run src/lib/analytics/posthog.test.ts src/app/sitemap.test.ts
```

Expected: FAIL because `/v` is not in analytics and sitemap test file does not exist.

**Step 3: Write minimal implementation**

In `src/lib/analytics/posthog.ts`:

- add `'/v'` to `ANALYTICS_ROUTE_PREFIXES`
- capture `shared_invoice_viewed` from the viewer page on mount
- capture `shared_invoice_downloaded` from the download action click

In `next.config.ts`:

- replace the single global header rule with route-specific rules:
  - default `X-Frame-Options: DENY`
  - `/api/shared-invoices/:path*` gets `X-Frame-Options: SAMEORIGIN`

In `src/app/sitemap.ts`:

- explicitly exclude `/v/*`
- leave viewer layout metadata as `noindex`

**Step 4: Run test to verify it passes**

Run:

```bash
corepack pnpm exec vitest run src/lib/analytics/posthog.test.ts src/app/sitemap.test.ts
corepack pnpm lint
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/analytics/posthog.ts src/lib/analytics/posthog.test.ts next.config.ts src/app/sitemap.ts src/app/sitemap.test.ts
git commit -m "feat: wire analytics and security for shared invoice viewer"
```

---

### Task 9: Finish the viewer polish and error states

**Files:**
- Modify: `src/components/shared/pdf-viewer-shell.tsx`
- Modify: `src/components/shared/pdf-viewer-frame.tsx`
- Modify: `src/app/v/[invoiceId]/page.tsx`
- Test: `src/components/shared/pdf-viewer-shell.test.tsx`

**Step 1: Write the failing test**

Extend `src/components/shared/pdf-viewer-shell.test.tsx`:

```tsx
it('shows a clean fallback message when the pdf cannot be embedded', () => {
  render(
    <PdfViewerShell
      invoiceId="abc12345"
      pdfInlinePath="/api/shared-invoices/abc12345/pdf"
      pdfDownloadPath="/api/shared-invoices/abc12345/pdf?download=1"
      errorMessage="This invoice is unavailable."
    />,
  );

  expect(screen.getByText(/this invoice is unavailable/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run:

```bash
corepack pnpm exec vitest run src/components/shared/pdf-viewer-shell.test.tsx
```

Expected: FAIL because no error state exists.

**Step 3: Write minimal implementation**

- add optional `errorMessage` prop
- render a centered minimal fallback card with:
  - short message
  - `Download PDF` button only when download path exists
  - `Back to Home` link
- ensure mobile layout uses stacked actions and no overflow
- keep branding minimal

**Step 4: Run test to verify it passes**

Run:

```bash
corepack pnpm exec vitest run src/components/shared/pdf-viewer-shell.test.tsx
corepack pnpm lint
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/shared/pdf-viewer-shell.tsx src/components/shared/pdf-viewer-frame.tsx src/app/v/[invoiceId]/page.tsx src/components/shared/pdf-viewer-shell.test.tsx
git commit -m "feat: add polished error states for shared invoice viewer"
```

---

### Task 10: Run final validation and manual QA

**Files:**
- No code changes required unless a validation issue is found

**Step 1: Run automated checks**

Run:

```bash
corepack pnpm exec vitest run
corepack pnpm lint
```

Expected: PASS

**Step 2: Run production build**

Run:

```bash
corepack pnpm build
```

Expected: PASS

If sandbox or platform issues block the build, rerun outside the sandbox and record the reason.

**Step 3: Run manual browser QA**

Test on desktop:

- Generate an invoice from `/create`
- Copy Link and verify it copies `https://www.freeinvoicekit.com/v/<invoiceId>`
- Open the copied link in a new tab
- Verify the page shows the logo link, minimal chrome, and the inline PDF
- Verify the download button downloads `invoice-<invoiceId>.pdf`
- Verify DevTools network shows requests to your domain, not an exposed Supabase link in the UI

Test on mobile:

- Open the viewer link directly
- Verify the PDF fits without horizontal page overflow
- Verify the download button remains reachable above the safe area
- Verify tapping the logo returns to `/`

Test error cases:

- Open `/v/not-real-id`
- Verify the page shows a clean unavailable state
- Call `/api/shared-invoices/not-real-id/pdf`
- Verify 404 JSON response

**Step 4: Record rollout notes**

Document:

- whether old history rows with `pdfUrl` still open through `/v/<invoiceId>`
- whether any invoice records need a migration script
- whether analytics for `/v/*` are acceptable for SEO/performance

**Step 5: Commit if anything changed**

```bash
git add .
git commit -m "chore: validate branded shared invoice viewer flow"
```

---

## Additional Manual Test Cases

- Create flow without Supabase configured still returns a local blob path and does not offer `Copy Link`.
- History flow for a legacy invoice without a remote file shows a disabled or hidden share-link action instead of a broken `/v` link.
- `Referrer-Policy` remains `strict-origin-when-cross-origin`.
- Shared viewer route is not included in `sitemap.xml`.
- Shared viewer route source contains no marketing CTA beyond the logo and brand name.
- PDF stream endpoint returns `Content-Type: application/pdf`.
- PDF stream endpoint returns `inline` by default and `attachment` when `download=1`.
- Downloaded filename matches `invoice-<invoiceId>.pdf`.
- Copy Link toast text remains generic and never mentions Supabase.

## Rollout Notes

- Deploy this behind the existing production domain only after verifying `APP_URL` is `https://www.freeinvoicekit.com`.
- After deploy, manually test a newly generated invoice and one older stored invoice.
- Watch PostHog for:
  - `shared_invoice_viewed`
  - `shared_invoice_downloaded`
  - regressions in `invoice_created`
  - regressions in `pdf_downloaded`

## Risks

- If `X-Frame-Options` is not adjusted correctly, the embedded PDF will fail silently in the viewer.
- If the storage object key ever diverges from `${invoiceId}.pdf`, the branded route will stop resolving old files.
- If the build environment lacks the right Next.js binary, automated build validation may need an unsandboxed rerun.
- If mobile browsers refuse inline embedding for some PDFs, the viewer must degrade to a centered download-first fallback.
