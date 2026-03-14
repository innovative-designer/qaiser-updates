# PDF Layout Templates (6+) Design

**Date:** 2026-03-14

## Goal

Let users choose between multiple PDF invoice layouts before generation. The picker shows accurate, small preview images (static thumbnails generated from fake data) for at least 6 templates. The selected template affects the generated PDF (download/share/viewer).

## Non-Goals

- Legal compliance variants (tax IDs, jurisdiction-specific fields, e-invoicing, etc.).
- Multi-page invoices (phase 2 if needed).
- Live-rendered PDF previews in the picker (we use static thumbnails by design).
- A template marketplace or user-uploaded templates.

## Current Architecture (What We’re Extending)

- The create flow calls `POST /api/invoice/generate-pdf` with invoice JSON + optional `businessLogo` (base64) and `accentColor`.
- The API route sanitizes fields and calls `renderToBuffer(InvoiceDocument(...))`.
- A single template exists today: `src/components/pdf/invoice-document.tsx`.
- Generated PDFs are either returned as a blob (no Supabase) or stored in Supabase and served via `/api/shared-invoices/[invoiceId]/pdf`.
- Invoices are persisted offline in IndexedDB via `src/lib/db.ts` (no schema migration required for extra fields).

## UX / Product Design

### Where The Picker Lives

- Desktop: right sidebar near `InvoiceColorPicker` (high relevance: export settings).
- Mobile: a compact “PDF Layout” section above the sticky action bar or immediately below the main invoice card; horizontally scrollable options with snap.

### Interaction

- Picker presents 6 templates as selectable cards:
  - Preview image (static thumbnail)
  - Template name
  - 1-line description (tone/visual cues)
- Selection is “radio” behavior (exactly one active).
- Changing template does not auto-generate; it sets state and shows a subtle hint:
  - If a PDF was already generated, show “Layout changed. Generate again to update the PDF.”
  - Button copy becomes “Regenerate Invoice” when `hasGeneratedPdf === true`.

### Persistence

- Per-invoice: the selected template ID is stored in the invoice record so that:
  - The history list “remembers” which template the invoice used (optional to display later).
  - Regeneration (if added later) can default to the original template.
- Cross-invoice preference: store the last used template ID in `localStorage` (similar to accent color).

### Accessibility

- Implement as a semantic radio group:
  - Container: `role="radiogroup"` with label “PDF layout”.
  - Each option: `role="radio"`, `aria-checked`, keyboard navigation (Tab focus and Enter/Space to select).
- Thumbnails include `alt` text: “Preview of <template name> invoice layout”.

## Templates (Initial 6)

All templates render the same invoice information, but with different layout systems, hierarchy, and table styling.

1. `classic` (existing): warm paper, masthead + meta card, clean table.
2. `minimal`: monochrome, tight spacing, thin rules, typography-forward.
3. `bold`: strong left rail, big total, accent blocks, more contrast.
4. `modern`: airy grid, subtle geometric shapes, accent underline/stripes.
5. `ledger`: accountant vibe, columnar table emphasis, strong totals box.
6. `compact`: chat-friendly, denser table, smaller masthead, optimized for one-screen viewing.

## Data Model

### Template ID Type

Add a narrow union type for safety:

- `type PdfTemplateId = 'classic' | 'minimal' | 'bold' | 'modern' | 'ledger' | 'compact'`

### Invoice Field

- Add `pdfTemplateId?: PdfTemplateId` to `InvoiceData` for backward compatibility.
- Runtime default: `classic` when missing/invalid.

## Server API / Validation

### Request Shape

`POST /api/invoice/generate-pdf` accepts `pdfTemplateId` in the JSON body.

### Sanitization

- Introduce a small helper `safePdfTemplateId(value)` that returns an allowed ID or `DEFAULT_PDF_TEMPLATE_ID`.
- Keep the existing `stripHtml` and numeric/currency clamping intact.

### Rendering

`InvoiceDocument` becomes a dispatcher that routes to a template component:

- `InvoiceDocument({ invoice, businessLogo, accentColor })`:
  - Resolve `templateId = safePdfTemplateId(invoice.pdfTemplateId)`
  - Render the selected template component
  - Fallback to `classic` if missing

## PDF Code Organization

### Proposed Structure

- `src/components/pdf/invoice-document.tsx`
  - Dispatcher (selects template) + shared types
- `src/components/pdf/templates/`
  - `classic.tsx`
  - `minimal.tsx`
  - `bold.tsx`
  - `modern.tsx`
  - `ledger.tsx`
  - `compact.tsx`
- `src/components/pdf/shared/` (optional but recommended once >2 templates)
  - `colors.ts` (buildColors, defaults)
  - `format.ts` (formatDate, safe helpers)
  - `footer.tsx` (common footer component)
  - `blocks.tsx` (business/client blocks, totals blocks) as needed

This keeps each layout self-contained while sharing utilities to avoid drift.

## Thumbnail Preview Assets

### Storage

- Put static images in:
  - `public/pdf-templates/<templateId>.png`

### Requirements

- Aspect ratio matches A4 preview (or consistent crop) so cards don’t jump.
- Show fake but realistic data:
  - Business name, logo placeholder, client name, 3 line items, totals, notes.
- Add light shadow/border baked in, since these are “photos” of the PDF.

### How To Produce Thumbnails (Manual, Phase 1)

- Render each template once using a fixed fake invoice and export a screenshot to PNG.
- Keep the fake invoice consistent across templates so differences are attributable to layout.

### Optional (Phase 2): Auto-Generated Thumbnails

If drift becomes an issue, add a script that renders each PDF and converts to PNG in CI, but this adds dependencies and complexity and is not required for initial launch.

## Edge Cases / Fallbacks

- Unknown `pdfTemplateId` from older data or tampered requests: sanitize to `classic`.
- Template added later: thumbnails optional; selection list can be data-driven.
- If a user changes template after generating a remote PDF, the viewer link continues to point at the prior PDF until they regenerate.

## Success Criteria

- Users can reliably select between 6 templates and see clear preview thumbnails.
- The chosen template is used for PDF generation in `/api/invoice/generate-pdf`.
- The selection persists per invoice and as the default for new invoices.
- No regressions in existing share/download/view flows.

