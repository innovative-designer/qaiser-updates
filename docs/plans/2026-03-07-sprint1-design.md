# Sprint 1 Design — Invoice Creation Form + Landing Page

**Date:** 2026-03-07
**Status:** Approved
**Scope:** Build core invoice form with real-time preview, landing page, IndexedDB storage, SEO foundation. No PDF generation (Sprint 2). Brand assets deferred — placeholder strategy with documented plug-in points.

---

## Decisions

| Question             | Decision                                             | Rationale                                                                             |
| -------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Form layout          | Single long scrollable form + sticky preview         | Simplest, lets users see/edit everything at once, matches "30-second invoice" promise |
| Pro email capture    | Skip for Sprint 1, wire in Sprint 3                  | Avoids third-party deps and half-baked solutions                                      |
| Placeholder branding | Opinionated — temp blue primary, Lucide icon as logo | Makes app feel real enough to demo and test                                           |
| Architecture         | Client-heavy, useReducer for form state              | Form is entirely client-side (IndexedDB). No server DB, no form library overhead      |

---

## Data Layer

### Types (`src/types/invoice.ts`)

- `LineItem` — id, description, quantity, rate, amount (computed: qty x rate)
- `InvoiceData` — business info (name, email, phone, address), client info (name, email, phone, company), lineItems[], currency (ISO 4217), subtotal, taxRate, taxAmount, discount, total, notes, dueDate, createdAt, status ('draft' | 'sent'), pdfUrl?
- `CurrencyInfo` — code, symbol, name, locale

### Constants (`src/lib/constants.ts`)

Single source of truth for all branding text:

- `APP_NAME = 'Free Invoice Kit'`
- `APP_URL = 'https://www.freeinvoicekit.com'`
- `APP_TAGLINE = 'Free invoicing on WhatsApp'`
- `MAX_INVOICES = 10`
- `INVOICE_ID_LENGTH = 8`

All components import from here. When branding changes, update this one file for text.

### IndexedDB (`src/lib/db.ts`)

- Uses `idb` library wrapper
- Single object store `invoices` keyed by `id`
- CRUD: `saveInvoice`, `getInvoice`, `getAllInvoices`, `deleteInvoice`
- 10-invoice cap — evicts oldest on overflow
- Hook (`src/hooks/use-local-invoices.ts`) wraps with React state + loading boolean

### Currencies (`src/lib/currencies.ts`)

- 20+ currencies array with code, symbol, name, locale
- `formatCurrency(amount, currencyCode)` using `Intl.NumberFormat`

### Geolocation (`src/lib/geolocation.ts`)

- `detectCurrency()` — calls ipapi.co with 3s AbortSignal timeout
- Country-to-currency mapping fallback
- Returns 'USD' on any failure

---

## Invoice Form & Preview

### Form State (`src/hooks/use-invoice-form.ts`)

- `useReducer` with typed actions: `SET_FIELD`, `SET_LINE_ITEM`, `ADD_LINE_ITEM`, `REMOVE_LINE_ITEM`, `SET_CURRENCY`
- Reducer auto-computes: `amount` per line item, `subtotal`, `taxAmount`, `total` on every dispatch
- On mount: generate `nanoid(8)` ID, set `createdAt`, call `detectCurrency()`

### Create Page (`src/app/create/page.tsx`)

- Client component (`'use client'`)
- Desktop: CSS grid `grid-cols-[1fr_400px]` — scrollable form left, sticky preview right
- Mobile: single column, floating "Preview" button (bottom-right) opens Sheet

Form sections (top to bottom):

1. **Business Info** — name (required), email, phone, address
2. **Client Info** — name (required), email, phone, company
3. **Line Items** — dynamic table, add/remove rows, min 1 row, auto-calc amounts
4. **Financial Summary** — read-only subtotal, tax rate input, read-only tax amount, discount input, bold total
5. **Currency selector + Due Date + Notes**
6. **"Save Invoice" button** — validates, saves to IndexedDB, Sonner toast

### Validation (inline, on submit)

- Business name: required
- Client name: required
- At least 1 line item with description and rate > 0
- Due date >= today
- Red text below invalid fields

### Preview Panel (`src/components/invoice-preview/invoice-preview.tsx`)

- Accepts `InvoiceData` as props
- Paper-like card: white bg, shadow, border
- Layout mirrors future PDF: header (business info + "INVOICE" label), bill-to, line items table, totals, notes, due date badge
- Watermark footer: Lucide `Zap` icon + "Created with Free Invoice Kit" placeholder text
- Desktop: sticky `top-4`, `max-h-screen overflow-y-auto`
- Mobile: rendered inside shadcn `Sheet` triggered by floating button

---

## Landing Page & SEO

### Landing Page (`src/app/page.tsx`)

Server component for SEO. Sections:

1. **Header** — Lucide `Zap` icon + "Free Invoice Kit" text (placeholder logo), "Create Invoice" CTA button
2. **Hero** — Headline, subheadline, CTA to `/create`, placeholder illustration (gray box with Lucide `FileText` icon)
3. **How It Works** — 3 step cards with Lucide icons
4. **Features Grid** — 6 cards (No Signup, Professional PDFs, WhatsApp Native, Works Offline, Auto Currency, 100% Free)
5. **Pro Coming Soon** — text-only teaser, no email capture yet (implemented in Sprint 3)
6. **Footer** — Privacy/Terms links (href="#" until pages created), Twitter placeholder, attribution

### Shared Components

- `src/components/shared/header.tsx` — reused on landing + create page
- `src/components/shared/footer.tsx` — reused everywhere
- `src/components/shared/json-ld.tsx` — SoftwareApplication schema

### SEO

- `layout.tsx` metadata: title, description, OpenGraph, Twitter card
- `src/app/sitemap.ts` — dynamic sitemap (/, /create)
- `public/robots.txt` — allow all, reference sitemap
- JSON-LD SoftwareApplication on homepage

### Placeholder Brand Color

Temporary blue primary applied via `--primary` in `globals.css`. When real brand colors arrive, swap the oklch values.

---

## Branding Plug-in System

All branding flows through 3 choke points:

| Choke Point | File                   | What It Controls                                  |
| ----------- | ---------------------- | ------------------------------------------------- |
| Text        | `src/lib/constants.ts` | App name, tagline, URL                            |
| Colors      | `src/app/globals.css`  | CSS custom properties (--primary, --accent, etc.) |
| Assets      | `public/` folder       | Logo, icons, favicon, OG image                    |

### When brand assets arrive — checklist:

| Step                 | File(s)                         | Action                                                                                                |
| -------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1. Drop files        | `public/`                       | Add `logo.svg`, `favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `og-image.png` |
| 2. Colors            | `globals.css` `:root` + `.dark` | Replace `--primary`, `--accent` oklch values                                                          |
| 3. Fonts             | `layout.tsx`                    | Swap `Geist` import for chosen Google Font                                                            |
| 4. Logo              | `header.tsx`                    | Replace `<Zap /> Free Invoice Kit` text with `<Image src="/logo.svg" />`                                     |
| 5. Preview watermark | `invoice-preview.tsx`           | Replace Lucide icon with logo image                                                                   |
| 6. Favicon           | `src/app/favicon.ico`           | Replace file                                                                                          |
| 7. Constants         | `constants.ts`                  | Update `APP_URL` if domain changes                                                                    |

No component restructuring needed. Just file drops and value swaps.

---

## File Map

### New files to create:

```
src/
  types/
    invoice.ts
  lib/
    constants.ts
    currencies.ts
    geolocation.ts
    db.ts
  hooks/
    use-invoice-form.ts
    use-local-invoices.ts
  components/
    shared/
      header.tsx
      footer.tsx
      json-ld.tsx
    invoice-preview/
      invoice-preview.tsx
  app/
    sitemap.ts
    create/
      page.tsx
public/
  robots.txt
```

### Existing files to modify:

```
src/app/layout.tsx    — SEO metadata
src/app/page.tsx      — Full rewrite to landing page
src/app/globals.css   — Placeholder brand color
```

---

## Deferred / Manual Tasks

| Task                                                      | Owner        | Notes                                                                 |
| --------------------------------------------------------- | ------------ | --------------------------------------------------------------------- |
| Brand assets (logo, colors, favicon, OG image, watermark) | PM/Designer  | Follow Branding Plug-in checklist above                               |
| Legal pages (Privacy, Terms)                              | PM           | Generate via Termly/Iubenda, create app/privacy/ and app/terms/ pages |
| Twitter/X build-in-public posts                           | PM           | 3 posts with Sprint 1 screenshots                                     |
| Domain + DNS                                              | PM/Team Lead | Not blocking dev                                                      |
| Google Search Console                                     | PM           | Needs domain                                                          |
| Pro waitlist email capture                                | Sprint 3     | UI teaser shown first, backend and banner wired later                 |
