# Sprint 1 — Frontend Design Specification

## Aesthetic Direction: "Sharp Finance"

**Tone:** Refined utilitarian. Think Stripe's clarity meets Linear's crispness. Professional but not corporate — the kind of tool a solo freelancer would trust with their livelihood.

**Core principles:**
- **Precision over decoration** — every pixel earns its place
- **High contrast hierarchy** — bold headings, muted supporting text, one accent color that pops
- **Paper-is-the-product** — the invoice preview should feel like a real document, not a UI component
- **Speed as personality** — the 30-second promise should be visible in the design's directness

**What makes it unforgettable:** The invoice preview feels like holding a real document. The form feels like filling out a single card, not a government application.

---

## Color System

Replace the shadcn neutral defaults with a deliberate palette. Use oklch for perceptual uniformity.

### `globals.css` `:root` overrides:

```css
:root {
  /* Deep navy primary — authoritative, financial, trustworthy */
  --primary: oklch(0.39 0.07 260);
  --primary-foreground: oklch(0.985 0 0);

  /* Warm off-white background — softer than pure white, easier on eyes */
  --background: oklch(0.985 0.002 90);
  --foreground: oklch(0.145 0 0);

  /* Cards slightly brighter than background for lift */
  --card: oklch(0.995 0 0);
  --card-foreground: oklch(0.145 0 0);

  /* Muted tones — warm gray, not cold */
  --muted: oklch(0.955 0.005 90);
  --muted-foreground: oklch(0.45 0.01 260);

  /* Accent — a teal-ish green for "success" moments (save, total) */
  --accent: oklch(0.55 0.15 170);
  --accent-foreground: oklch(0.985 0 0);

  /* Keep destructive as-is */
  --destructive: oklch(0.58 0.22 27);

  /* Softer borders */
  --border: oklch(0.90 0.005 90);
  --input: oklch(0.92 0.005 90);
  --ring: oklch(0.39 0.07 260);
}
```

> **BRANDING PLUG-IN:** These are placeholder values. When brand colors arrive, replace the oklch values above. Every component using `bg-primary`, `text-muted-foreground`, etc. updates automatically.

### Dark mode

Leave `.dark` overrides as-is for Sprint 1. Light-mode only is fine — invoice apps are document-centric and light mode is the natural context. Dark mode can be added in Sprint 2.

---

## Typography

Use the existing **Geist** font (already installed). It's geometric, modern, and highly legible — a strong choice for a financial tool. Don't swap it.

**Type scale applied:**
- Page titles: `text-2xl font-bold tracking-tight` (compact, authoritative)
- Section headings: `text-lg font-semibold`
- Card titles: `text-base font-medium`
- Body/labels: `text-sm`
- Supporting text: `text-xs text-muted-foreground`
- Invoice preview "INVOICE" label: `text-xl font-bold tracking-tight text-primary uppercase`

> **BRANDING PLUG-IN:** If a custom font is provided later, swap the `Geist` import in `layout.tsx`.

---

## Landing Page Design

### Hero Section

**Layout:** Centered, generous vertical padding. Subtle gradient from primary tint to background — not a loud gradient, just a whisper of color.

**Key details:**
- **Pill badge** at top: rounded-full, border, `bg-background` with subtle shadow — announces "Free forever, no signup"
- **Headline:** Large (`text-4xl lg:text-6xl`), bold, tight tracking. The "30 Seconds" text uses `text-primary` for emphasis — the ONE thing that pops
- **Subheadline:** `text-lg text-muted-foreground`, max-width constrained for readability (~520px)
- **CTA button:** `size="lg"`, primary color, with right arrow. Generous padding
- **Placeholder image area:** Rounded-xl, dashed border in muted color, centered icon. This is intentionally a "coming soon" placeholder — don't fake a screenshot. When the demo GIF arrives, it replaces this div

**Spacing:** `py-20 lg:py-32` — generous, not cramped. `gap-8` between elements.

### How It Works Section

**Layout:** 3-column grid on desktop, stacked on mobile.

**Each step:**
- Circular icon container: `size-14`, `rounded-full`, `bg-primary/10`, icon in `text-primary`
- Step number: tiny, muted, uppercase — "Step 1"
- Title: `text-lg font-semibold`
- Description: `text-sm text-muted-foreground`
- Optionally add a connecting line between steps on desktop (a horizontal dashed border or thin SVG) — but only if it's clean. Skip if it adds clutter.

### Features Grid

**Layout:** 3x2 grid on desktop, 2-col on tablet, 1-col mobile.

**Each card:** shadcn `Card` component with:
- Lucide icon: `size-8 text-primary` with `mb-3`
- Title: `font-semibold`
- Description: `text-sm text-muted-foreground`
- Cards use the default `ring-1 ring-foreground/10` from shadcn Card
- On hover, consider a subtle `hover:ring-primary/20 transition-colors` — barely noticeable but adds polish

### Pro Coming Soon Section

**Layout:** `bg-muted/40`, centered text.

Deliberately understated. No email capture, no urgency. Just a quiet promise:
- Heading: `text-2xl font-bold`
- Description: `text-muted-foreground`, max-width for readability
- This section should NOT compete with the main CTA. It's atmospheric.

### Footer

Clean, minimal. `border-t bg-muted/40`. Copyright left, nav links right. Links are muted, hover to foreground. No social icons until accounts are created.

---

## Invoice Creation Page Design

### Page-Level Layout

- **Background:** `bg-muted/50` (slightly tinted, distinguishes from card whites)
- **Container:** `max-w-7xl mx-auto px-4 py-6`
- **Grid:** `lg:grid-cols-[1fr_400px] gap-6`
- Left column: scrollable form cards with `space-y-6`
- Right column: `sticky top-6` preview panel, hidden on mobile

### Header Bar

- **"Create Invoice"** title: `text-2xl font-bold tracking-tight`
- Mobile "Preview" button: right-aligned, `variant="outline"`, Eye icon. Opens bottom Sheet at 85vh
- Consider adding a subtle breadcrumb or back arrow linking to `/` for navigation

### Form Cards

Each section is a shadcn `Card`. Key design refinements:

**Card styling:**
- Default shadcn card (white bg, `ring-1 ring-foreground/10`)
- `CardHeader` with `CardTitle` in `text-base font-medium`
- `CardContent` uses `grid gap-4 sm:grid-cols-2`
- Required fields have `*` in the label text

**Input refinements:**
- Labels use `text-sm font-medium` (shadcn default)
- Inputs have warm `bg-background` by default, not pure white (matches our warmer palette)
- Error text: `text-xs text-destructive mt-1`
- Placeholder text should be helpful and specific — not generic "Enter value"

### Line Items Table

This is the most complex UI element. Design choices:

**Desktop:** Grid layout `grid-cols-[1fr_80px_100px_100px_40px]`
- Column headers shown only on first row (conditional render: `index === 0`)
- Description: full-width text input
- Qty: narrow number input, min=1
- Rate: number input with 0.00 placeholder
- Amount: read-only, `bg-muted` background to distinguish from editable fields
- Delete button: ghost, muted-foreground, hover:destructive

**Mobile note:** The 5-column grid may be tight on small screens. Consider adding `overflow-x-auto` on the container, or switching to a stacked card layout per line item on screens < 640px. This is a Sprint 1 refinement to evaluate during manual testing.

**Add button:** `variant="outline" size="sm"`, Plus icon, below the items list

### Financial Summary Card

Clean right-aligned totals:
- Subtotal, Tax, Discount as `flex justify-between` rows
- Tax/discount only show when values > 0 (conditional rendering)
- Total line: separated by `<Separator />`, `text-lg font-bold`, total value in `text-primary`
- Tax Rate and Discount are inline inputs (`w-24 text-right`) next to their labels

### Save Button

- Full-width at the bottom of the form column
- `size="lg"` for a chunky, confident button
- Primary color
- On save: Sonner toast (success or error)

---

## Invoice Preview Panel Design

This is the signature visual element. It should look like a printed document.

### Paper Effect

```
rounded-lg border bg-white shadow-sm
```

Add a subtle paper-like quality:
- `shadow-sm` for gentle lift
- Border color from our warm palette (comes from `--border`)
- Padding: `p-6` — generous but not wasteful
- On dark mode (future): use `dark:bg-zinc-950` — dark paper is unusual but maintain usability

### Layout (mimics the future PDF)

**Top section:**
- Left: Business name (bold, `text-lg`), contact details below in `text-xs text-muted-foreground`
- Right: "INVOICE" in `text-xl font-bold tracking-tight text-primary uppercase`, invoice ID below, date, due date as `Badge variant="outline"`

**Bill To section:**
- Uppercase tiny label: `text-xs font-semibold uppercase tracking-wide text-muted-foreground`
- Client name: `font-medium`
- Details below in `text-xs text-muted-foreground`

**Line Items table:**
- Header row: `text-xs font-semibold uppercase tracking-wide text-muted-foreground`
- Data rows: `border-b border-dashed` — dashed borders feel like a receipt, not a spreadsheet
- Amounts: `font-medium text-foreground`, right-aligned
- Descriptions: regular weight

**Totals:**
- Right-aligned, fixed-width container (`w-48`)
- Separator before total
- Total in `text-base font-bold`, amount in `text-primary`

**Notes:**
- Only rendered if notes exist
- Separated by `<Separator />`
- Tiny uppercase label + body text in muted

**Watermark footer:**
- `text-xs text-muted-foreground/60` — deliberately light
- Lucide `Zap` icon at `size-3`
- Text: "Created with Free Invoice Kit — Free invoicing on WhatsApp → www.freeinvoicekit.com"
- **BRANDING PLUG-IN:** Replace icon with `<Image src="/logo.svg" />` when available

### Desktop Behavior

- Sticky: `sticky top-6`
- Max height: `max-h-[calc(100vh-3rem)] overflow-y-auto`
- Scrolls independently from form

### Mobile Behavior

- Hidden on mobile (no column for it)
- Accessible via floating "Preview" button → opens shadcn `Sheet` from bottom
- Sheet at `h-[85vh]` with `overflow-y-auto`

---

## Micro-Interactions (keep simple for Sprint 1)

Don't over-animate. This is a productivity tool, not a portfolio piece. But add:

1. **Card hover on features grid:** `hover:ring-primary/20 transition-colors duration-200`
2. **Button hover states:** shadcn defaults are fine
3. **Sonner toast:** Already has enter/exit animations built in
4. **Sheet open/close:** shadcn Sheet has built-in transitions
5. **Focus states:** Rely on shadcn defaults (`ring` on focus)

No page transitions, no skeleton loaders, no parallax. Keep it fast and direct.

---

## Responsive Breakpoints

| Breakpoint | Landing Page | Create Page |
|-----------|-------------|-------------|
| < 640px (mobile) | Single column, stacked sections | Single column, sheet preview |
| 640-1024px (tablet) | 2-col features grid, single col elsewhere | Single column form, sheet preview |
| > 1024px (desktop) | 3-col grids, full hero | 2-col (form + sticky preview) |

---

## Summary of Changes to Implementation Plan

The implementation plan code is largely correct. These are the refinements this design spec adds:

1. **`globals.css`** — Replace neutral oklch values with the "Sharp Finance" warm navy palette (documented above)
2. **Landing page** — Add `hover:ring-primary/20 transition-colors` to feature cards for subtle interactivity
3. **Create page background** — Use `bg-muted/50` instead of `bg-background` for the page wrapper to give cards visual lift
4. **Line items** — Consider `overflow-x-auto` wrapper for mobile
5. **Preview panel** — The code as-written matches the spec. No changes needed.
6. **Header** — The code as-written matches the spec. No changes needed.

These are all small CSS-level tweaks. No structural code changes required.
