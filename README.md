# QuickBill

QuickBill is a Next.js 16 invoice app for creating professional PDF invoices, saving them locally, and sharing them through WhatsApp, email, download, or copied captions. The product is optimized for fast mobile workflows and includes SEO landing pages, a Pro waitlist, and installable PWA support.

## Status

Sprint 3 engineering work is implemented in the repo:

- invoice PDF generation and local persistence
- WhatsApp / download / email / copy sharing flows
- Pro waitlist API and UI
- three Sprint 3 SEO landing pages
- PWA manifest, service worker, and offline fallback route

Remaining Sprint 3 work is manual verification and launch follow-through:

- real-device QA for WhatsApp sharing
- Supabase waitlist verification
- PWA install/offline verification
- real app icons and launch assets
- sitemap submission and indexing requests

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- `@react-pdf/renderer`
- Supabase
- IndexedDB via `idb`
- Serwist Turbopack integration for PWA support

## Local Development

If you are working from WSL on a Windows-mounted drive, prefer `corepack pnpm` commands.

```bash
cd /mnt/d/quikcbill-project/quickbill
corepack pnpm install
corepack pnpm dev
```

For Windows `cmd.exe`:

```cmd
cd /d D:\quikcbill-project\quickbill
corepack pnpm install
corepack pnpm dev
```

## Validation Commands

```bash
corepack pnpm lint
corepack pnpm exec tsc --noEmit
corepack pnpm build
corepack pnpm start
```

## Environment Variables

Create `.env.local` with the environment your deployment expects:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

PostHog is optional. Supabase-backed PDF hosting and waitlist storage require valid Supabase values.

## Key Paths

- App shell: [`src/app`](/mnt/d/quikcbill-project/quickbill/src/app)
- Shared components: [`src/components`](/mnt/d/quikcbill-project/quickbill/src/components)
- Shared libraries: [`src/lib`](/mnt/d/quikcbill-project/quickbill/src/lib)
- Main implementation plan: [`documentation/Phase1_Implementation_Plan.md`](/mnt/d/quikcbill-project/quickbill/documentation/Phase1_Implementation_Plan.md)
- Sprint 3 plan and handoff: [`docs/plans/sprint3-whatsapp-pwa-traffic.md`](/mnt/d/quikcbill-project/quickbill/docs/plans/sprint3-whatsapp-pwa-traffic.md)
