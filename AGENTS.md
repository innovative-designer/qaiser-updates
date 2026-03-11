# Repository Guidelines

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (PostCSS plugin, config in `globals.css`, oklch color space)
- **UI Components:** shadcn/ui v4 (radix-nova style, lucide icons, RSC-compatible)
- **PDF:** `@react-pdf/renderer` (client-side generation)
- **Storage:** IndexedDB via `idb` (offline-first, max 10 invoices, LRU eviction)
- **IDs:** `nanoid` (8-char invoice, 6-char line item)
- **PWA:** Serwist (service worker via Turbopack, disabled in dev)
- **Toasts:** `sonner`
- **Dark mode:** `next-themes` (`.dark` class strategy)
- **Analytics:** PostHog (optional)
- **Package manager:** pnpm

## Project Structure & Module Organization

- `src/app/` — Next.js App Router pages, layouts, and `globals.css`; **server components by default**.
- `src/components/ui/` — shadcn/ui primitives (button, card, dialog, input, etc.); reuse before creating new base components.
- `src/components/shared/` — Reusable layout parts (Header, Footer, PageHero, PageSection, ContentPage, JsonLd).
- `src/components/pdf/` — `invoice-document.tsx` (React PDF template).
- `src/components/providers/` — Context providers (theme, serwist, posthog).
- `src/hooks/` — Custom React hooks (`useInvoiceForm`, `useLocalInvoices`).
- `src/lib/` — Shared helpers: `db.ts` (IndexedDB), `currencies.ts`, `share.ts` (WhatsApp/email/download), `constants.ts`, `site.ts`, `utils.ts` (`cn()`).
- `src/types/` — TypeScript types (`invoice.ts` defines `InvoiceData`, `LineItem`, `CurrencyInfo`).
- `src/content/` — Static content as TS exports: `blog/`, `legal/`, `site/`.
- `public/` — Static assets. Use the `@/*` alias for internal imports from `src/`.

## Build, Test, and Development Commands

- `pnpm dev` — local dev server on `http://localhost:3000` (PWA disabled).
- `pnpm build` — production build; surfaces route, type, and config issues.
- `pnpm start` — run built app (test PWA/offline here, not in dev).
- `pnpm lint` — ESLint with Next.js Core Web Vitals and TypeScript rules.
- `pnpm exec prettier --write .` — format and sort Tailwind classes.

## Architecture & Data Flow

- **Offline-first:** All invoice data persists in IndexedDB; no backend required for core invoicing.
- **Business info** is stored separately in localStorage for quick re-entry across sessions.
- **Invoice calculations** run in `useInvoiceForm` reducer via `recalculateInvoice()` (quantity × rate = amount → subtotal → tax → discount → total).
- **PDF generation** is client-side (`@react-pdf/renderer`); blob URLs are revoked on unmount to prevent memory leaks.
- **Sharing** (WhatsApp, email, download, copy) is handled by `src/lib/share.ts` using the generated PDF.
- **Currency detection** uses `/api/geo` with a 5s abort signal; falls back to USD.
- **Content pages** use `ContentPage` wrapper; landing pages use `PageHero` + `PageSection`.
- **Metadata/SEO:** Every route exports a `Metadata` object; JSON-LD structured data via `JsonLd` component.

## Routes Reference

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Static | Landing page |
| `/create` | Static | Invoice builder (client-heavy, mobile-optimized) |
| `/history` | Static | Saved invoices (IndexedDB, cards + table) |
| `/blog`, `/blog/[slug]` | SSG | Blog index and articles |
| `/about`, `/contact`, `/faq` | Static | Info pages |
| `/privacy-policy`, `/terms-of-service`, `/cookie-policy` | Static | Legal pages |
| `/invoice-generator/[slug]` | SSG | Industry + country invoice pages (programmatic SEO) |
| `/compare/[slug]` | SSG | Competitor comparison pages (programmatic SEO) |
| `/invoice-template/[slug]` | SSG | Invoice template pages (programmatic SEO) |
| `/send-invoice-whatsapp`, `/free-invoice-maker-freelancers` | Static | Hand-crafted SEO landings |
| `/offline` | Static | PWA offline fallback |
| `/api/invoice/generate-pdf` | Dynamic | PDF generation API |
| `/api/waitlist` | Dynamic | Pro waitlist (Supabase) |
| `/api/geo` | Dynamic | Geo/currency detection |

## Coding Style & Naming Conventions

- Write strict TypeScript; prefer explicit props and utility types over `any`.
- Prettier: 2-space indent, single quotes, semicolons, trailing commas (es5), 100-char lines, Tailwind class sorting.
- PascalCase for React component names; lowercase/kebab-case filenames (`page.tsx`, `posthog-pageview.tsx`).
- Tailwind utilities in JSX, shared helpers in `src/lib/`, UI primitives in `src/components/ui/`.
- Add shadcn components via `pnpm dlx shadcn@latest add <component>`.

## Theming & Styling

- CSS variables defined in `src/app/globals.css` using oklch color space.
- Light: warm beige/cream palette. Dark: deep blue/charcoal.
- Semantic tokens: primary, secondary, accent, destructive, muted, border.
- Custom radius scales: `--radius-button-sm`, `--radius-field`, `--radius-card`, `--radius-shell`, `--radius-pill`.
- Mobile-first responsive: `sm:`, `md:`, `lg:` breakpoints.

## Testing Guidelines

- No dedicated test runner yet. `pnpm lint` and `pnpm build` are the required checks before PRs.
- If adding tests: name `*.test.ts` / `*.test.tsx`, place next to feature or in `__tests__/`, document run command.

## Commit & Pull Request Guidelines

- Conventional Commits: `feat:`, `fix:`, `chore:` with short, imperative summaries.
- PRs: focused scope, clear description, linked issue, validation steps, screenshots for UI changes.
- Call out new env vars or analytics changes.

## Gotchas & Pitfalls

- **IndexedDB version** is `DB_VERSION = 1`. Schema changes require a version bump + upgrade handler in `getDB()`.
- **Max 10 invoices** per user — oldest auto-deleted (LRU). No warning before limit hit.
- **PDF bundle impact:** `@react-pdf/renderer` is ~50 KB gzip; client-side only.
- **PWA disabled in dev** — must `pnpm build && pnpm start` to test offline/service-worker behavior.
- **Blob URL cleanup:** PDF blob URLs must be revoked on unmount; distinguish `blob:` (temp) from remote (persistent).
- **Theme hydration:** `suppressHydrationWarning` on `<html>` avoids mismatch with `next-themes`.
- **localStorage vs IndexedDB:** Business info → localStorage; invoices → IndexedDB. Don't mix them.

## Security & Configuration

- PostHog is optional: `NEXT_PUBLIC_POSTHOG_KEY` + `NEXT_PUBLIC_POSTHOG_HOST`. Never commit secrets.
- CSP headers configured in `next.config.ts` (allows PostHog, Supabase, ipapi.co).
- Security headers: X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- No required env vars for core functionality — invoicing works out of the box.
