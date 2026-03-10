# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
See `AGENTS.md` for the full reference (architecture, routes, gotchas, theming).

## Commands

- **Dev server:** `pnpm dev` (PWA disabled in dev)
- **Build:** `pnpm build` (validates routes, types, config)
- **Start:** `pnpm start` (test PWA/offline here)
- **Lint:** `pnpm lint`
- **Format:** `pnpm exec prettier --write .`

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (PostCSS plugin, config in `globals.css`, oklch color space)
- **UI Components:** shadcn/ui v4 (radix-nova style, lucide icons, RSC-compatible)
- **PDF:** `@react-pdf/renderer` (client-side only, ~50 KB gzip)
- **Storage:** IndexedDB via `idb` (offline-first, max 10 invoices, LRU eviction)
- **IDs:** `nanoid` (8-char invoice, 6-char line item)
- **PWA:** Serwist (service worker via Turbopack)
- **Toasts:** `sonner`
- **Dark mode:** `next-themes` (`.dark` class strategy)
- **Analytics:** PostHog (optional: `NEXT_PUBLIC_POSTHOG_KEY` + `NEXT_PUBLIC_POSTHOG_HOST`)
- **Package manager:** pnpm

## Architecture

- `src/app/` — Pages, layouts, `globals.css`. **Server components by default.**
- `src/components/ui/` — shadcn/ui primitives (button, card, dialog, input, select, table, etc.)
- `src/components/shared/` — Reusable layout parts (Header, Footer, PageHero, PageSection, ContentPage, JsonLd)
- `src/components/pdf/` — `invoice-document.tsx` (React PDF template)
- `src/components/providers/` — Context providers (theme, serwist, posthog)
- `src/hooks/` — `useInvoiceForm` (reducer + calculations), `useLocalInvoices` (IndexedDB CRUD)
- `src/lib/` — `db.ts`, `currencies.ts`, `share.ts`, `constants.ts`, `site.ts`, `utils.ts` (`cn()`)
- `src/types/` — `invoice.ts` (`InvoiceData`, `LineItem`, `CurrencyInfo`)
- `src/content/` — Static content as TS exports: `blog/`, `legal/`, `site/`

Path alias: `@/*` → `./src/*`

## Conventions

- **Formatting:** Prettier — 2-space indent, single quotes, semicolons, trailing commas (es5), 100-char lines, Tailwind class sorting
- **Linting:** ESLint flat config with next/core-web-vitals and next/typescript
- **shadcn/ui:** Add via `pnpm dlx shadcn@latest add <component>`. CSS variables for theming (oklch).
- **Dark mode:** `.dark` class strategy (`@custom-variant dark (&:is(.dark *))`)
- **Naming:** PascalCase components; lowercase/kebab-case filenames
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`)

## Key Data Flow

- Invoice state managed by `useInvoiceForm` reducer → `recalculateInvoice()` (qty × rate → subtotal → tax → discount → total)
- Business info persists in localStorage; invoices in IndexedDB
- PDF generated client-side → blob URL revoked on unmount
- Sharing (WhatsApp/email/download/copy) via `src/lib/share.ts`
- Currency auto-detected via `/api/geo` (5s timeout, fallback: USD)

## Gotchas

- IndexedDB `DB_VERSION = 1` — schema changes need version bump + upgrade handler
- Max 10 invoices — oldest auto-deleted (LRU), no warning
- PWA disabled in dev — use `pnpm build && pnpm start` to test offline
- `suppressHydrationWarning` on `<html>` required for next-themes
- No required env vars for core functionality
