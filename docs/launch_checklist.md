# Launch Checklist

## Current State

Free Invoice Kit is effectively at a Phase 1 / Wave 1 launch state from the WhatsApp invoice blueprint.
The core free product is built: users can create invoices without signup, generate PDFs, save locally,
and share through WhatsApp, email, download, or copied caption text.

Implemented and present in the repo:

- No-auth invoice creator
- Local invoice persistence via IndexedDB
- PDF generation API
- WhatsApp sharing flow and fallback actions
- Pro waitlist UI and API
- PWA manifest, service worker, and offline route
- SEO landing pages
- Blog infrastructure
- Local invoice history page
- Security headers, sanitization, and API rate limiting

Not yet implemented from the later blueprint phases:

- Auth / signup
- Cloud invoice sync and migration
- Client directory
- Analytics dashboard
- Search and filters across cloud data
- Stripe Connect / payments
- Pro subscriptions and monetization layer

Those missing items are later-phase roadmap work and are not required for the first public launch.

## What Is Done

- Core landing page and invoice creation flow are implemented.
- PDF generation is implemented server-side.
- Waitlist capture is implemented with Supabase support.
- Supabase environment variables are configured.
- Supabase waitlist table/setup is configured.
- PWA shell and offline support are implemented.
- Sitemap and metadata are implemented.
- SEO pages are live in the app.
- Blog system is live with one published article.

## What Still Needs To Be Done Before Going Live

### Required blockers

- Add real legal pages for Privacy and Terms.
- Replace footer placeholder links (`Privacy`, `Terms`, `Twitter`) that currently point to `#`.
- Verify real-device WhatsApp sharing on Android and iPhone.
- Verify PWA install/offline behavior on real devices.
- Confirm all hardcoded domain references use `https://www.freeinvoicekit.com`.
- Verify a clean production build in the real deployment environment.

### Recommended before launch

- Add final production-quality app icons and branding assets.
- Expand content beyond a single blog post.
- Run Lighthouse checks on the production URL.
- Confirm PostHog is configured if analytics are needed from day one.

## Manual Steps

### 1. Supabase verification

- Confirm the waitlist is still writing correctly in production.
- Test that a real waitlist signup inserts a row.
- Test duplicate signup handling.
- If using hosted PDFs, confirm the `invoices` storage bucket and required policies exist.

### 2. Domain and DNS

- Add the purchased domain to Vercel.
- Configure DNS records in Cloudflare or your registrar.
- Enable HTTPS and confirm the production domain resolves correctly.
- Confirm `https://www.freeinvoicekit.com` is the canonical production URL everywhere.

### 3. Legal and footer cleanup

- Create `/privacy` and `/terms` pages.
- Update footer links to point to real routes.
- Replace the placeholder Twitter link if you want a public social account linked at launch.

### 4. Production verification

Run:

```bash
corepack pnpm lint
corepack pnpm exec tsc --noEmit
corepack pnpm build
```

Then verify manually on production:

- `/`
- `/create`
- `/history`
- `/blog`
- blog article route
- `/sitemap.xml`
- waitlist submission flow
- PDF generation flow

### 5. Real-device QA

Test manually:

- WhatsApp share on Android
- WhatsApp share on iPhone
- Desktop fallback behavior
- PWA install prompt
- Offline fallback page
- PDF download filename and PDF opening
- Email share behavior
- Copy-caption behavior

### 6. SEO launch steps

- Open the live sitemap and confirm expected URLs are present.
- Verify the domain in Google Search Console.
- Submit `sitemap.xml` to Google Search Console.
- Request indexing for priority pages.
- Submit the sitemap to Bing Webmaster Tools as well.

## Validation Notes

- TypeScript check passed locally with `corepack pnpm exec tsc --noEmit`.
- Production `next build` was not verified in this workspace because the local Next.js Linux SWC binary was missing.
- Earlier project docs indicate build/lint had already been validated on Windows, but production should still be re-verified before go-live.

## Launch Verdict

The product is close to launch.

Engineering for the first public release is mostly complete. The remaining work is mostly
legal/compliance cleanup, domain/SEO launch setup, real-device QA, and final deploy verification.
