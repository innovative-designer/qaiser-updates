# Free Invoice Kit

Free Invoice Kit is a Next.js 16 invoice app for creating professional PDF invoices, saving them locally, and sharing them through WhatsApp, email, download, or copied captions. The product is optimized for fast mobile workflows and includes SEO landing pages, a Pro waitlist, and installable PWA support.

## Status

**Current branch:** `ui-ux-update` — Editorial Utility redesign complete.

### Completed (Sprints 1–4 + UI/UX redesign)

- Invoice PDF generation and local persistence (IndexedDB)
- WhatsApp / download / email / copy sharing flows with branded WhatsApp button
- Pro waitlist API and UI (Supabase-backed)
- Six SEO landing pages (`/invoice-generator-pakistan`, `/send-invoice-whatsapp`, `/free-invoice-maker-freelancers`, `/stripe-invoice-alternative`, `/whatsapp-billing-uae`, plus home page)
- PWA manifest, service worker (Serwist), and offline fallback route
- Security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- Rate limiting and input sanitization on PDF API
- Invoice history page (`/history`) with mobile cards and desktop table
- Blog infrastructure (`/blog`, `/blog/[slug]`) with SSG and typography plugin
- **Editorial Utility UI redesign** — unified design system across all pages
- **Mobile-optimized create page** — compact tool header on mobile (replaces editorial hero), sticky bottom action bar, branded WhatsApp share with SVG icon
- Lighthouse-targeted metadata and accessible icon titles

### Remaining (manual verification)

- Real-device WhatsApp sharing QA (Android + iOS)
- PWA install/offline verification on real devices
- Lighthouse score validation (target: Perf > 90, A11y > 90, SEO > 95)
- Final app icon assets (production-quality)
- Sitemap submission to Google Search Console and Bing Webmaster Tools
- Merge to `main` and production deploy

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Landing page |
| `/create` | Static | Invoice builder (mobile-optimized) |
| `/history` | Static | Invoice history (IndexedDB) |
| `/blog` | Static | Blog index |
| `/blog/[slug]` | SSG | Blog articles |
| `/invoice-generator-pakistan` | Static | SEO landing |
| `/send-invoice-whatsapp` | Static | SEO landing |
| `/free-invoice-maker-freelancers` | Static | SEO landing |
| `/stripe-invoice-alternative` | Static | SEO landing |
| `/whatsapp-billing-uae` | Static | SEO landing |
| `/offline` | Static | PWA offline fallback |
| `/api/invoice/generate-pdf` | Dynamic | PDF generation API |
| `/api/waitlist` | Dynamic | Pro waitlist API |
| `/api/geo` | Dynamic | Geo-detection API |
| `/sitemap.xml` | Static | XML sitemap |

## Stack

- Next.js 16 App Router (Turbopack)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4 (PostCSS plugin)
- shadcn/ui v4 (radix-nova style, Lucide icons)
- `@react-pdf/renderer`
- Supabase (waitlist + optional PDF hosting)
- IndexedDB via `idb`
- Serwist Turbopack integration for PWA support
- PostHog (optional analytics)

## Local Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

For WSL on a Windows-mounted drive, prefer `corepack pnpm` commands:

```bash
cd /mnt/d/quikcbill-project/quickbill
corepack pnpm install
corepack pnpm dev
```

## Validation Commands

```bash
pnpm lint              # ESLint with Next.js rules
pnpm build             # Production build (Turbopack)
pnpm start             # Serve production build
pnpm exec prettier --write .   # Format + sort Tailwind classes
```

## Environment Variables

Create `.env.local` at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

PostHog is optional. Supabase-backed PDF hosting and waitlist storage require valid Supabase values.

## Key Paths

| Path | Purpose |
|------|---------|
| `src/app/` | Next.js App Router pages, layouts, API routes |
| `src/components/ui/` | shadcn/ui primitives (button, card, input, etc.) |
| `src/components/shared/` | Header, footer, shared chrome |
| `src/components/invoice-preview/` | Live invoice preview component |
| `src/lib/` | Utilities, currencies, sharing, sanitization, DB |
| `src/hooks/` | Custom React hooks (invoice form, local invoices) |
| `docs/plans/` | Sprint plans and design documents |
| `documentation/` | Original implementation plans and blueprints |
