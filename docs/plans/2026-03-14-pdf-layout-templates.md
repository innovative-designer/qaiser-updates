# PDF Layout Templates Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a PDF layout picker with static thumbnail previews and at least 6 PDF templates; use the selected template for final PDF generation and persist the choice.

**Architecture:** Introduce a `PdfTemplateId` union type, store `pdfTemplateId` on invoices, add a template dispatcher `InvoiceDocument`, implement 6 template components, and add a `PdfTemplatePicker` UI that uses static images from `public/`.

**Tech Stack:** Next.js App Router, React 19, TypeScript (strict), Tailwind v4, shadcn/ui, `@react-pdf/renderer`, Vitest + Testing Library.

---

## Assumptions (Confirm Or Edit)

- Changing templates does not auto-regenerate the PDF; user clicks Generate/Regenerate.
- Thumbnails are curated static PNGs in `public/pdf-templates/` (no live rendering).
- Template selection is persisted:
  - Per invoice in IndexedDB (via `InvoiceData.pdfTemplateId`)
  - As a default preference in `localStorage`

## Template IDs (Initial 6)

Use stable IDs for URLs/assets and analytics:

```ts
export type PdfTemplateId =
  | 'classic'
  | 'minimal'
  | 'bold'
  | 'modern'
  | 'ledger'
  | 'compact';
```

## Task 1: Add Template Type And Metadata

**Files:**
- Create: `src/types/pdf-template.ts`
- Modify: `src/types/invoice.ts`
- Create: `src/lib/pdf-templates.ts`
- Modify: `src/lib/constants.ts`

**Step 1: Add the type**

```ts
// src/types/pdf-template.ts
export type PdfTemplateId =
  | 'classic'
  | 'minimal'
  | 'bold'
  | 'modern'
  | 'ledger'
  | 'compact';
```

**Step 2: Add invoice field (back-compat optional)**

```ts
// src/types/invoice.ts
import type { PdfTemplateId } from '@/types/pdf-template';

export interface InvoiceData {
  // ...
  pdfTemplateId?: PdfTemplateId;
}
```

**Step 3: Add constants and template registry**

```ts
// src/lib/constants.ts
export const DEFAULT_PDF_TEMPLATE_ID = 'classic' as const;
```

```ts
// src/lib/pdf-templates.ts
import type { PdfTemplateId } from '@/types/pdf-template';

export type PdfTemplateMeta = {
  id: PdfTemplateId;
  name: string;
  description: string;
  previewSrc: string; // public path
};

export const PDF_TEMPLATES: PdfTemplateMeta[] = [
  { id: 'classic', name: 'Classic', description: 'Warm paper, clean hierarchy.', previewSrc: '/pdf-templates/classic.png' },
  { id: 'minimal', name: 'Minimal', description: 'Monochrome, typography-first.', previewSrc: '/pdf-templates/minimal.png' },
  { id: 'bold', name: 'Bold', description: 'Strong rail, big totals.', previewSrc: '/pdf-templates/bold.png' },
  { id: 'modern', name: 'Modern', description: 'Airy grid, subtle accents.', previewSrc: '/pdf-templates/modern.png' },
  { id: 'ledger', name: 'Ledger', description: 'Table-forward, accountant vibe.', previewSrc: '/pdf-templates/ledger.png' },
  { id: 'compact', name: 'Compact', description: 'Denser, chat-friendly export.', previewSrc: '/pdf-templates/compact.png' },
];
```

**Step 4: Unit test the registry invariants (optional but cheap)**

If you want a guardrail, add a small test to ensure `PDF_TEMPLATES` covers all IDs and there are no duplicates.

Run: `pnpm test`
Expected: PASS

## Task 2: Add Safe Template Sanitizer

**Files:**
- Modify: `src/lib/sanitize.ts`
- Create: `src/lib/sanitize.test.ts`

**Step 1: Add helper**

```ts
// src/lib/sanitize.ts
import { DEFAULT_PDF_TEMPLATE_ID } from '@/lib/constants';
import { PDF_TEMPLATES } from '@/lib/pdf-templates';
import type { PdfTemplateId } from '@/types/pdf-template';

const ALLOWED_PDF_TEMPLATES = new Set<PdfTemplateId>(PDF_TEMPLATES.map((t) => t.id));

export function safePdfTemplateId(value: unknown): PdfTemplateId {
  if (typeof value === 'string' && ALLOWED_PDF_TEMPLATES.has(value as PdfTemplateId)) {
    return value as PdfTemplateId;
  }
  return DEFAULT_PDF_TEMPLATE_ID;
}
```

**Step 2: Test it**

```ts
import { describe, expect, it } from 'vitest';
import { safePdfTemplateId } from '@/lib/sanitize';

describe('safePdfTemplateId', () => {
  it('returns known template ids', () => {
    expect(safePdfTemplateId('minimal')).toBe('minimal');
  });

  it('falls back for unknown values', () => {
    expect(safePdfTemplateId('nope')).toBe('classic');
  });
});
```

Run: `pnpm test`
Expected: PASS

## Task 3: Refactor PDF Rendering Into 6 Templates

**Files:**
- Modify: `src/components/pdf/invoice-document.tsx`
- Create: `src/components/pdf/templates/classic.tsx`
- Create: `src/components/pdf/templates/minimal.tsx`
- Create: `src/components/pdf/templates/bold.tsx`
- Create: `src/components/pdf/templates/modern.tsx`
- Create: `src/components/pdf/templates/ledger.tsx`
- Create: `src/components/pdf/templates/compact.tsx`
- (Optional) Create: `src/components/pdf/shared/*`

**Step 1: Move current template to `classic`**

- Copy current `InvoiceDocument` JSX/styles into `templates/classic.tsx` and export `ClassicInvoiceDocument(props)`.
- Keep shared helpers like `buildColors` and `formatDate` either local to the template or moved to `pdf/shared/`.

**Step 2: Create 5 new templates**

Guidelines for each template:
- Use the same inputs: `{ invoice, businessLogo?, accentColor? }`.
- Keep content parity: invoice header/meta, business block, bill-to, line items, totals, notes, footer.
- Only change layout/styling: grid/rail/table density/typography sizing/accent placement.

**Step 3: Build a dispatcher `InvoiceDocument`**

```ts
// src/components/pdf/invoice-document.tsx
import { safePdfTemplateId } from '@/lib/sanitize';
import { ClassicInvoiceDocument } from '@/components/pdf/templates/classic';
// import other templates...

export function InvoiceDocument(props: InvoiceDocumentProps) {
  const templateId = safePdfTemplateId(props.invoice.pdfTemplateId);
  switch (templateId) {
    case 'minimal':
      return MinimalInvoiceDocument(props);
    case 'bold':
      return BoldInvoiceDocument(props);
    case 'modern':
      return ModernInvoiceDocument(props);
    case 'ledger':
      return LedgerInvoiceDocument(props);
    case 'compact':
      return CompactInvoiceDocument(props);
    case 'classic':
    default:
      return ClassicInvoiceDocument(props);
  }
}
```

**Step 4: Sanity-check generation**

Run: `pnpm build`
Expected: Build succeeds.

## Task 4: Wire Template ID Through PDF Generation API

**Files:**
- Modify: `src/app/api/invoice/generate-pdf/route.ts`
- Modify: `src/app/api/invoice/generate-pdf/route.test.ts`

**Step 1: Sanitize `pdfTemplateId`**

In `route.ts`, after `const sanitized = { ...body, ... }` add:

```ts
import { safePdfTemplateId } from '@/lib/sanitize';

const sanitized = {
  ...body,
  pdfTemplateId: safePdfTemplateId(body.pdfTemplateId),
  // existing sanitization...
};
```

**Step 2: Add a test for passing template id**

Update the route test to include `pdfTemplateId: 'minimal'` and assert the dispatcher is called with invoice data containing that id.

Run: `pnpm test`
Expected: PASS

## Task 5: Add Template Picker UI With Static Thumbnails

**Files:**
- Create: `src/components/shared/pdf-template-picker.tsx`
- Modify: `src/app/create/page.tsx`
- Add: `public/pdf-templates/*.png`

**Step 1: Build the picker component**

Requirements:
- Uses `PDF_TEMPLATES` metadata.
- Desktop: 2-column grid of cards (or 3x2) with consistent aspect ratio.
- Mobile: horizontal scroll row with snap + large tap targets.
- Implements radio semantics with keyboard support.

Component interface:

```ts
type Props = {
  value: PdfTemplateId;
  onChange: (id: PdfTemplateId) => void;
};
```

**Step 2: Integrate in Create page**

In `src/app/create/page.tsx`:
- Add state `pdfTemplateId` with default from:
  1) `localStorage` key, else
  2) `DEFAULT_PDF_TEMPLATE_ID`
- Persist changes back to `localStorage`.
- Store selection in invoice state via `setField` (or add a dedicated action if preferred).
- Include `pdfTemplateId` in the JSON body sent to `/api/invoice/generate-pdf`.

Also:
- If `hasGeneratedPdf === true`, changing template shows a toast hint and flips button label to “Regenerate”.

**Step 3: Add thumbnails**

Add 6 files:
- `public/pdf-templates/classic.png`
- `public/pdf-templates/minimal.png`
- `public/pdf-templates/bold.png`
- `public/pdf-templates/modern.png`
- `public/pdf-templates/ledger.png`
- `public/pdf-templates/compact.png`

Sizing guidance:
- Keep the same pixel dimensions across all images.
- Use a consistent crop (top of page) so the cards are comparable.

**Step 4: Light UI test (optional)**

If adding UI tests:
- Use Testing Library to render the picker and assert:
  - 6 options render
  - click selects and toggles `aria-checked`

Run: `pnpm test`
Expected: PASS

## Task 5A: Generate Thumbnail PNGs (Playwright MCP Runbook)

This task is designed to be handed to an agent that has Playwright MCP access. It produces the 6 `public/pdf-templates/*.png` assets from the actual PDF output using a fixed fake invoice payload.

**Prereqs:**
- The invoice PDF generation route must return actual PDF bytes (`Content-Type: application/pdf`).
  - In this repo, `POST /api/invoice/generate-pdf` returns PDF bytes when `supabaseAdmin` is `null`.
  - If you have Supabase env vars set locally, temporarily unset `SUPABASE_SECRET_KEY` (or both `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SECRET_KEY`) while generating thumbnails.

**Files:**
- Create (temporary): `tmp/pdf-template-thumbnails/` (output staging)
- Add (final): `public/pdf-templates/*.png`

**Step 1: Create staging directory**

Run: `mkdir -p tmp/pdf-template-thumbnails`
Expected: `tmp/pdf-template-thumbnails/` exists.

**Step 2: Start the dev server without Supabase admin**

Run: `SUPABASE_SECRET_KEY= NEXT_PUBLIC_SUPABASE_URL= pnpm dev`
Expected: App runs on `http://localhost:3000` and PDF generation returns `application/pdf`.

**Step 3: Prepare a fixed fake invoice payload**

Use this payload for all templates to keep previews comparable:

```json
{
  "id": "PREVIEW01",
  "businessName": "Studio North",
  "businessEmail": "billing@studionorth.example",
  "businessPhone": "+1 (555) 013-2048",
  "businessAddress": "44 Cedar Ave, Suite 12\nSpringfield, USA",
  "clientName": "Avery Johnson",
  "clientEmail": "ap@clientco.example",
  "clientPhone": "+1 (555) 019-7712",
  "clientCompany": "ClientCo",
  "currency": "USD",
  "taxRate": 7.5,
  "discount": 5,
  "notes": "Thanks for the project. Payable within 7 days.\nReply in WhatsApp if you need anything adjusted.",
  "dueDate": "2030-01-15",
  "createdAt": "2030-01-01T10:00:00.000Z",
  "status": "sent",
  "lineItems": [
    { "id": "li0001", "description": "Homepage redesign (UI + responsive)", "quantity": 1, "rate": 1200, "amount": 1200 },
    { "id": "li0002", "description": "Component library polish", "quantity": 6, "rate": 120, "amount": 720 },
    { "id": "li0003", "description": "Invoice UX walkthrough + fixes", "quantity": 2, "rate": 150, "amount": 300 }
  ],
  "subtotal": 2220,
  "taxAmount": 166.5,
  "discountAmount": 111,
  "total": 2275.5
}
```

**Step 4: Use Playwright MCP to render each template into a screenshot**

For each template id in:
`classic`, `minimal`, `bold`, `modern`, `ledger`, `compact`

Do:

1. Navigate the browser to `http://localhost:3000/`.
2. Resize viewport to a consistent A4-ish ratio (example: 600x848).
3. Run code in the page to:
   - POST the fake invoice to `/api/invoice/generate-pdf` with `pdfTemplateId` set to the template id and `accentColor` set to a fixed hex color (example `#e05a2a`).
   - Convert returned PDF bytes to a `data:application/pdf;base64,...` URL.
   - Replace the page content with a neutral wrapper that embeds the PDF (no UI chrome) so the screenshot is clean and consistent.
4. Take a viewport screenshot and save it to `tmp/pdf-template-thumbnails/<templateId>.png`.

MCP call order per template:
- `browser_navigate` -> `browser_resize` -> `browser_run_code` -> `browser_take_screenshot`

Recommended Playwright `browser_run_code` snippet (agent should edit `TEMPLATE_ID` per run):

```js
async (page) => {
  const TEMPLATE_ID = 'classic';
  const ACCENT = '#e05a2a';
  const payload = {
    id: 'PREVIEW01',
    businessName: 'Studio North',
    businessEmail: 'billing@studionorth.example',
    businessPhone: '+1 (555) 013-2048',
    businessAddress: '44 Cedar Ave, Suite 12\\nSpringfield, USA',
    clientName: 'Avery Johnson',
    clientEmail: 'ap@clientco.example',
    clientPhone: '+1 (555) 019-7712',
    clientCompany: 'ClientCo',
    currency: 'USD',
    taxRate: 7.5,
    discount: 5,
    notes: 'Thanks for the project. Payable within 7 days.\\nReply in WhatsApp if you need anything adjusted.',
    dueDate: '2030-01-15',
    createdAt: '2030-01-01T10:00:00.000Z',
    status: 'sent',
    lineItems: [
      { id: 'li0001', description: 'Homepage redesign (UI + responsive)', quantity: 1, rate: 1200, amount: 1200 },
      { id: 'li0002', description: 'Component library polish', quantity: 6, rate: 120, amount: 720 },
      { id: 'li0003', description: 'Invoice UX walkthrough + fixes', quantity: 2, rate: 150, amount: 300 },
    ],
    subtotal: 2220,
    taxAmount: 166.5,
    discountAmount: 111,
    total: 2275.5,
    pdfTemplateId: TEMPLATE_ID,
    accentColor: ACCENT,
  };

  const res = await page.evaluate(async (body) => {
    const r = await fetch('/api/invoice/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const ct = r.headers.get('Content-Type') || '';
    if (!ct.includes('application/pdf')) {
      const text = await r.text().catch(() => '');
      throw new Error(`Expected PDF response, got ${ct}. Body: ${text.slice(0, 200)}`);
    }
    const buf = await r.arrayBuffer();
    const bytes = new Uint8Array(buf);
    // Base64 without stack blowups.
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
    }
    const base64 = btoa(binary);
    return `data:application/pdf;base64,${base64}`;
  }, payload);

  await page.setContent(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          html, body { margin: 0; padding: 0; background: #ffffff; }
          .frame { width: 100vw; height: 100vh; overflow: hidden; }
          embed { width: 100%; height: 100%; border: 0; }
        </style>
      </head>
      <body>
        <div class="frame">
          <embed src="${res}" type="application/pdf" />
        </div>
      </body>
    </html>
  `);
}
```

Then take a screenshot (viewport only) and repeat for each template id.

**Step 5: Move staged images into `public/`**

Run:
- `mkdir -p public/pdf-templates`
- `cp tmp/pdf-template-thumbnails/*.png public/pdf-templates/`

Expected: `public/pdf-templates/` contains the 6 PNGs used by `PDF_TEMPLATES`.

**Step 6: Quick visual QA**

- Ensure all 6 images have identical dimensions and consistent margins.
- Ensure the invoice looks “real” and not clipped.
- Ensure the only visible differences are layout/styling.

**Step 7: Commit only the final PNGs**

Avoid committing any staging output.

## Task 6: Persist Selection In Saved Invoices

**Files:**
- Modify: `src/hooks/use-invoice-form.ts`
- Modify: `src/app/create/page.tsx`

**Step 1: Ensure the invoice object includes `pdfTemplateId`**

Two acceptable approaches:
- Treat it like other editable fields and add to `EditableInvoiceField` union.
- Or store template as separate state and merge into the request/save objects.

Recommendation: put it on the invoice to keep a single source of truth.

**Step 2: Defaulting old invoices**

When loading any invoice without `pdfTemplateId`, assume `classic` in UI and generation.

## Task 7: Analytics (Optional)

**Files:**
- Modify: `src/app/create/page.tsx`

Add:
- `captureAnalyticsEvent('pdf_template_selected', { template_id, source: 'create' })`

## Verification Checklist

- `pnpm test` passes.
- `pnpm build` passes.
- In `/create`:
  - Selecting a template updates selection state immediately.
  - “Generate” produces a PDF with the selected layout.
  - Changing layout after generation prompts to regenerate and affects next PDF.
- In `/history`:
  - Download/WhatsApp/Open still works (PDF already generated).

## Rollout Notes

- Safe to ship incrementally:
  - Ship picker + dispatcher with only `classic` first (hidden behind registry), then add the 5 new templates.
  - Or ship all at once if design is ready.
- If any template is unstable, remove it from `PDF_TEMPLATES` registry while keeping code in place.
