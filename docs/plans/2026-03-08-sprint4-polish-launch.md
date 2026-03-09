# Sprint 4 — Polish, Directory Blitz & Soft Launch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Harden the app with security headers, rate limiting, and input sanitization; hit Lighthouse > 90; add an invoice history page and blog infrastructure; then soft-launch via directories and personal network.

**Architecture:** Sprint 4 adds no new product features — it hardenes existing API routes, adds security/perf headers in `next.config.ts`, builds a thin invoice history page from IndexedDB data already in `src/lib/db.ts`, and scaffolds a blog at `/blog/[slug]` using static MDX-style content (no CMS). All code tasks result in passing `pnpm build` and `pnpm lint`.

**Tech Stack:** Next.js 16 App Router · TypeScript strict · Tailwind v4 · shadcn/ui · idb (IndexedDB) · Supabase · pnpm

---

## Progress Status (updated 2026-03-09)

### Engineering Tasks

| Task | Status | Commit | Notes |
|------|--------|--------|-------|
| Task 1: Security headers + CSP | ✅ Done | `2801d44` | All 5 headers on every response |
| Task 2: Rate limiting on PDF API | ✅ Done | `234b0b4` | 10 req/IP/hour, in-memory |
| Task 3: Input sanitization on PDF API | ✅ Done | `234b0b4` | `stripHtml`, `safeNumber`, `safeCurrency` in `src/lib/sanitize.ts` |
| Fix: Currencies allowlist | ✅ Done | `234b0b4` | Derived from `CURRENCIES` source of truth |
| Task 4: Invoice history page | ✅ Done | `234b0b4` | `/history` — mobile cards + desktop table, re-share & delete |
| Task 5: Blog infrastructure + first post | ✅ Done | `234b0b4` | `/blog` + `/blog/[slug]` SSG; `@tailwindcss/typography` |
| Task 6: Lighthouse fixes | ✅ Done | `234b0b4` | Metadata layouts for `/create` + `/history`; accessible icon titles |
| Task 7: PWA icon assets | ✅ Done | `234b0b4` | 192px, 512px PNG + apple-touch-icon generated from SVG |
| Fix: CSP PostHog assets domain | ✅ Done | `097977f` | Added `us-assets.i.posthog.com` to script-src + connect-src |

### QA Verification (Playwright — 2026-03-08)

| Check | Result |
|-------|--------|
| Homepage loads, title correct | ✅ |
| History nav link in header | ✅ |
| `/history` shows real IndexedDB data | ✅ 8 invoices with client, amount, status |
| `/history` action buttons accessible (title attrs) | ✅ |
| `/history` page title: "Invoice History \| Free Invoice Kit" | ✅ |
| `/create` page title: "Create Invoice \| Free Invoice Kit" | ✅ |
| `/blog` index renders post card | ✅ |
| `/blog/send-invoice-whatsapp-30-seconds` renders prose | ✅ |
| `/sitemap.xml` has all 10 routes | ✅ |
| Security headers confirmed via `curl -I` | ✅ All 5 present |
| Zero browser console errors | ✅ After CSP fix |

### Current Branch State

- **Branch:** `ui-ux-update` (branched from `develop` after Sprint 4)
- **Latest commit:** `cab700a` — feat: UI/UX redesign with mobile-optimized create page and branded share buttons
- **`pnpm build`:** ✅ 20 routes, 0 errors
- **`pnpm lint`:** ✅ 0 errors

**Note:** The Editorial Utility UI/UX redesign was implemented on the `ui-ux-update` branch after Sprint 4 engineering. This includes a full design-system refresh across all pages, mobile-optimized create page, and branded WhatsApp share buttons. See `docs/plans/2026-03-08-editorial-utility-redesign.md` for details.

### Launch Progress Update (2026-03-09)

Completed since the original Sprint 4 handoff:

- Production domain chosen: `https://www.freeinvoicekit.com`
- Hardcoded runtime domain references updated in app constants, canonicals, blog content, and robots.txt
- Supabase environment variables confirmed configured
- Supabase waitlist setup confirmed configured
- Launch checklist doc added and updated for current release state

Still remaining before merge to `main` / live rollout:

- Create real `Privacy` and `Terms` pages
- Replace footer placeholder links that still point to `#`
- Run final production validation (`lint`, `tsc --noEmit`, `build`) in the actual deployment-ready environment
- Test WhatsApp PDF sharing on real Android and iPhone devices
- Test PWA install prompt and offline behavior on real devices
- Submit sitemap in Google Search Console and Bing after the production deploy
- Merge release branch to `main` and verify Vercel production is green

---

## Remaining Work

### 🔧 Pending Engineering (Before Merge to Main)

| Item | What to do |
|------|-----------|
| Legal pages + footer links | Create `/privacy` and `/terms`, then update footer links from `#` to real routes |
| Lighthouse scores | Run `pnpm build && pnpm start`, open Chrome DevTools → Lighthouse on `/` and `/create`. Target: Perf > 90, A11y > 90, SEO > 95. Fix any failures found. |
| Real-device WhatsApp test | Test PDF sharing on real Android + iOS device |
| PWA install test | Install from Android Chrome, verify icon on home screen |
| Final validation | Run `corepack pnpm lint`, `corepack pnpm exec tsc --noEmit`, and `corepack pnpm build` before release |

### 🚀 Manual Launch Steps (PM / Founder — Non-Code)

These do not require code changes. Do them after merging to `main` and verifying production.

#### Step 1: Merge develop → main & Deploy

```bash
git checkout main
git merge develop --no-ff -m "chore: Sprint 4 complete — security, history, blog, icons"
git push origin main
```

Then in **Vercel dashboard**, confirm these env vars are set for **Production**:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
NEXT_PUBLIC_POSTHOG_KEY=          (optional)
NEXT_PUBLIC_POSTHOG_HOST=         (optional)
```

#### Step 2: Verify Production Deployment

After Vercel goes green:

- [ ] `https://www.freeinvoicekit.com` — homepage loads
- [ ] `https://www.freeinvoicekit.com/create` — form works, PDF generates
- [ ] `https://www.freeinvoicekit.com/history` — loads (empty state on fresh visit)
- [ ] `https://www.freeinvoicekit.com/blog` — blog index shows post
- [ ] `https://www.freeinvoicekit.com/blog/send-invoice-whatsapp-30-seconds` — post renders
- [ ] `https://www.freeinvoicekit.com/sitemap.xml` — expected URLs present
- [ ] `curl -I https://www.freeinvoicekit.com | grep x-frame` → `X-Frame-Options: DENY`
- [ ] Waitlist form submits, email appears in Supabase `pro_waitlist` table

#### Step 3: Supabase Table Check

In **Supabase dashboard → Table Editor**, confirm `pro_waitlist` table exists with columns:
- `id` (uuid, primary key)
- `email` (text, unique)
- `source` (text, nullable)
- `ip` (text, nullable)
- `country` (text, nullable)
- `created_at` (timestamptz, default: now())

RLS must be **enabled** with insert policy for service role.

#### Step 4: Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property for `www.freeinvoicekit.com`, verify ownership (DNS TXT or HTML file method)
3. Submit sitemap: `https://www.freeinvoicekit.com/sitemap.xml`
4. Optionally request indexing for each URL using the URL Inspection tool

#### Step 5: Directory Submissions (target: 10+)

Use this copy for all submissions:

- **Product name:** Free Invoice Kit
- **Tagline:** "Free PDF invoices on WhatsApp. No signup."
- **Description (150 words):**
  > Free Invoice Kit lets freelancers and small businesses create a professional PDF invoice and send it directly on WhatsApp — in under 30 seconds, with no account required. Built for emerging markets where WhatsApp is the primary business communication channel (Pakistan, UAE, Nigeria, India). Enter your details, add line items, auto-detect local currency, generate a branded PDF, and share it as a file attachment — not a link. Completely free, forever.

| # | Directory | URL | Status |
|---|-----------|-----|--------|
| 1 | AlternativeTo | alternativeto.net | ⬜ Pending |
| 2 | BetaList | betalist.com | ⬜ Pending |
| 3 | SaaSHub | saashub.com | ⬜ Pending |
| 4 | IndieHackers | indiehackers.com/products | ⬜ Pending |
| 5 | StartupStash | startupstash.com | ⬜ Pending |
| 6 | SideProjectors | sideprojectors.com | ⬜ Pending |
| 7 | ToolPilot | toolpilot.ai | ⬜ Pending |
| 8 | MicroSaaS HQ | microsaashq.com | ⬜ Pending |
| 9 | Launching Next | launchingnext.com | ⬜ Pending |
| 10 | Product Hunt | producthunt.com (as "Upcoming") | ⬜ Pending |

#### Step 6: Personal Network Outreach (target: 50–100 contacts)

Message to send (WhatsApp or DM):
> "Hey [Name]! I just launched a free tool — create a PDF invoice and send it on WhatsApp in 30 seconds, no signup. Would love your feedback: [your-domain.com]"

Target: freelancers, consultants, small business owners, anyone who invoices clients.

#### Step 7: Social Media Announcement

**LinkedIn** (personal story post):
> I built something for the way real business happens in [your country].
> Most people there don't email invoices — they send them on WhatsApp.
> So I made Free Invoice Kit: professional PDF invoice → WhatsApp in 30 seconds. Free, no signup.
> [your-domain.com]
> Would love feedback from freelancers and small business owners.

**Twitter/X**:
> Just launched Free Invoice Kit.
> Free PDF invoices on WhatsApp. No signup.
> → 30 seconds from zero to sent invoice
> → Professional PDF, not a screenshot
> → Works on Android, iOS, desktop
> [your-domain.com]
> #buildinpublic #indiehackers

---

## Context You Must Know

- **Dev server:** `pnpm dev` → http://localhost:3000
- **Build check:** `pnpm build` (must pass before every commit)
- **Lint check:** `pnpm lint` (must pass before every commit)
- **Type check:** `pnpm exec tsc --noEmit`
- **Path alias:** `@/*` → `./src/*`
- **Branch:** `develop` — all work goes here; never commit directly to `main`
- **Commit style:** `feat:`, `fix:`, `perf:`, `chore:` conventional commits

### Key Existing Files

| File | What It Does |
|------|-------------|
| `src/lib/db.ts` | IndexedDB CRUD: `getAllInvoices()`, `getInvoice(id)`, `saveInvoice()`, `deleteInvoice(id)` |
| `src/types/invoice.ts` | `InvoiceData` and `LineItem` types |
| `src/hooks/use-local-invoices.ts` | React hook that wraps `getAllInvoices()` with loading state |
| `src/lib/share.ts` | `shareOnWhatsApp()`, `downloadPdf()`, `shareViaEmail()`, `copyCaptionText()` |
| `src/lib/currencies.ts` | `formatCurrency(amount, code)` helper |
| `src/app/create/page.tsx` | 924-line invoice form page (client component) |
| `src/app/api/waitlist/route.ts` | Already has rate limiting pattern — use it as reference |
| `src/components/shared/header.tsx` | Site header |
| `src/components/shared/footer.tsx` | Site footer |
| `src/app/sitemap.ts` | Dynamic sitemap — must be updated when new routes are added |
| `next.config.ts` | Next.js config — security headers go here |

### InvoiceData Shape (abbreviated)

```typescript
{
  id: string;
  businessName: string;
  clientName: string;
  clientEmail: string;
  lineItems: LineItem[];
  currency: string;
  total: number;
  status: 'draft' | 'sent';
  createdAt: string;      // ISO string
  sentAt?: string;        // ISO string
  sentVia?: 'whatsapp' | 'email' | 'download' | 'copy';
  pdfUrl?: string;
}
```

### shadcn/ui Components Available

`button`, `input`, `label`, `card`, `select`, `textarea`, `table`, `badge`, `separator`, `sheet`, `dialog`, `sonner`

Add new ones with: `pnpm dlx shadcn@latest add <name>`

---

## Task 1: Security Headers + CSP in next.config.ts

**Why:** Adds `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy` headers to all responses. This is a one-file change.

**Files:**
- Modify: `next.config.ts`

---

**Step 1: Read the current next.config.ts**

```bash
# In your editor, open next.config.ts — note the existing structure before editing
```

**Step 2: Add security headers**

Replace the contents of `next.config.ts` with:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://us.i.posthog.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co https://ipapi.co https://us.i.posthog.com",
              "worker-src 'self' blob:",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

> **Note:** If `next.config.ts` already has other options (e.g. Serwist config), merge the `headers()` function into the existing config object — do not replace the whole file blindly. Read it first.

**Step 3: Verify build passes**

```bash
pnpm build
```

Expected: Build succeeds with no errors.

**Step 4: Verify headers are served**

```bash
pnpm dev
# In another terminal:
curl -I http://localhost:3000 | grep -E "x-frame|x-content|content-security"
```

Expected output includes `x-frame-options: DENY` and `content-security-policy: ...`

**Step 5: Lint check**

```bash
pnpm lint
```

Expected: 0 errors.

**Step 6: Commit**

```bash
git add next.config.ts
git commit -m "feat: add security headers and CSP to all responses"
```

---

## Task 2: Rate Limiting on `/api/invoice/generate-pdf`

**Why:** The PDF generation endpoint is CPU-intensive and currently has no rate limiting, making it vulnerable to abuse. The waitlist API (`src/app/api/waitlist/route.ts`) already has a working in-memory rate limiter — copy that pattern.

**Files:**
- Modify: `src/app/api/invoice/generate-pdf/route.ts`

---

**Step 1: Read the existing rate limiting pattern**

Open `src/app/api/waitlist/route.ts` and study the rate limiter at the top of the file. You'll see an in-memory `Map` tracking `{ count, resetAt }` per IP.

**Step 2: Read the generate-pdf route**

Open `src/app/api/invoice/generate-pdf/route.ts`. Note where the handler starts and where to insert the rate limit check.

**Step 3: Add rate limiting to generate-pdf**

At the **top** of `src/app/api/invoice/generate-pdf/route.ts` (after imports, before the handler), add:

```typescript
// In-memory rate limiter: 10 PDF generations per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimitResult(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: maxRequests - entry.count };
}
```

Then, at the **start** of the `POST` handler function (before any parsing), add:

```typescript
const ip =
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
  request.headers.get('x-real-ip') ??
  '127.0.0.1';

const { allowed } = getRateLimitResult(ip);
if (!allowed) {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429 },
  );
}
```

**Step 4: Build and lint**

```bash
pnpm build && pnpm lint
```

Expected: 0 errors.

**Step 5: Manual test**

```bash
pnpm dev
# Make 11 POST requests to /api/invoice/generate-pdf
# The 11th should return HTTP 429
```

**Step 6: Commit**

```bash
git add src/app/api/invoice/generate-pdf/route.ts
git commit -m "feat: add rate limiting to PDF generation API (10 req/IP/hour)"
```

---

## Task 3: Input Sanitization on PDF API

**Why:** The PDF API accepts user-supplied strings that get embedded in a rendered document. Strip HTML and validate numeric fields to prevent injection.

**Files:**
- Create: `src/lib/sanitize.ts`
- Modify: `src/app/api/invoice/generate-pdf/route.ts`

---

**Step 1: Create the sanitize utility**

Create `src/lib/sanitize.ts`:

```typescript
/**
 * Strip HTML tags from a string to prevent injection in rendered output.
 */
export function stripHtml(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, '').trim();
}

/**
 * Clamp a number to a safe range and return 0 for non-finite values.
 */
export function safeNumber(value: unknown, min = 0, max = 1_000_000_000): number {
  const n = Number(value);
  if (!isFinite(n)) return 0;
  return Math.min(Math.max(n, min), max);
}

/**
 * Validate that a currency code is in the allowed list.
 * Returns 'USD' as fallback for unknown codes.
 */
const ALLOWED_CURRENCIES = new Set([
  'USD', 'EUR', 'GBP', 'PKR', 'AED', 'SAR', 'INR', 'BDT', 'NGN',
  'KES', 'GHS', 'ZAR', 'EGP', 'CAD', 'AUD', 'NZD', 'SGD', 'MYR',
  'IDR', 'PHP', 'THB', 'VND', 'BRL', 'MXN', 'COP', 'PEN', 'CLP',
  'ARS', 'TRY', 'ILS', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK',
  'HUF', 'RON', 'HRK', 'BGN', 'HKD', 'TWD', 'JPY', 'KRW', 'CNY',
]);

export function safeCurrency(value: unknown): string {
  if (typeof value === 'string' && ALLOWED_CURRENCIES.has(value.toUpperCase())) {
    return value.toUpperCase();
  }
  return 'USD';
}
```

**Step 2: Apply sanitization in the PDF route**

In `src/app/api/invoice/generate-pdf/route.ts`, after parsing the request body, sanitize all user-supplied fields before passing them to the PDF renderer:

```typescript
import { stripHtml, safeNumber, safeCurrency } from '@/lib/sanitize';

// After: const body = await request.json();
// Add sanitization:
const sanitized = {
  ...body,
  businessName: stripHtml(body.businessName),
  businessEmail: stripHtml(body.businessEmail),
  businessPhone: stripHtml(body.businessPhone),
  businessAddress: stripHtml(body.businessAddress),
  clientName: stripHtml(body.clientName),
  clientEmail: stripHtml(body.clientEmail),
  clientPhone: stripHtml(body.clientPhone),
  clientCompany: stripHtml(body.clientCompany),
  notes: stripHtml(body.notes),
  currency: safeCurrency(body.currency),
  taxRate: safeNumber(body.taxRate, 0, 100),
  discount: safeNumber(body.discount, 0, 100),
  lineItems: Array.isArray(body.lineItems)
    ? body.lineItems.map((item: Record<string, unknown>) => ({
        ...item,
        description: stripHtml(item.description),
        quantity: safeNumber(item.quantity, 0, 100_000),
        rate: safeNumber(item.rate, 0, 1_000_000),
        amount: safeNumber(item.amount, 0, 1_000_000_000),
      }))
    : [],
};
// Use `sanitized` instead of `body` for all downstream calls
```

**Step 3: Build and lint**

```bash
pnpm build && pnpm lint
```

Expected: 0 errors.

**Step 4: Commit**

```bash
git add src/lib/sanitize.ts src/app/api/invoice/generate-pdf/route.ts
git commit -m "feat: add input sanitization to PDF generation API"
```

---

## Task 4: Invoice History Page

**Why:** Users currently have no way to view past invoices. The data is already in IndexedDB via `getAllInvoices()` — this task adds a `/history` page that lists them with status, amount, and re-share actions.

**Files:**
- Create: `src/app/history/page.tsx`
- Modify: `src/app/sitemap.ts` (add `/history`)
- Modify: `src/components/shared/header.tsx` (add nav link)

---

**Step 1: Read the existing hook**

Open `src/hooks/use-local-invoices.ts`. You will see it returns `{ invoices, loading, deleteInvoice }`.

**Step 2: Read the existing header**

Open `src/components/shared/header.tsx`. Note the nav link pattern used.

**Step 3: Create the history page**

Create `src/app/history/page.tsx`:

```typescript
'use client';

import { useLocalInvoices } from '@/hooks/use-local-invoices';
import { formatCurrency } from '@/lib/currencies';
import { downloadPdf, shareOnWhatsApp, shareViaEmail } from '@/lib/share';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Mail, MessageCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function HistoryPage() {
  const { invoices, loading, deleteInvoice } = useLocalInvoices();

  if (loading) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <p className="text-muted-foreground text-center">Loading invoices…</p>
      </main>
    );
  }

  if (invoices.length === 0) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold">Invoice History</h1>
        <p className="text-muted-foreground mb-6">No invoices yet.</p>
        <Button asChild>
          <Link href="/create">Create your first invoice</Link>
        </Button>
      </main>
    );
  }

  async function handleDelete(id: string) {
    await deleteInvoice(id);
    toast.success('Invoice deleted');
  }

  async function handleDownload(invoice: (typeof invoices)[number]) {
    const ok = await downloadPdf(invoice);
    if (!ok) toast.error('No PDF available for this invoice');
  }

  async function handleWhatsApp(invoice: (typeof invoices)[number]) {
    await shareOnWhatsApp(invoice);
  }

  async function handleEmail(invoice: (typeof invoices)[number]) {
    await shareViaEmail(invoice);
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Invoice History</h1>
        <Button asChild size="sm">
          <Link href="/create">New Invoice</Link>
        </Button>
      </div>

      {/* Mobile card view */}
      <div className="space-y-4 md:hidden">
        {invoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">
                  {invoice.clientName || 'Unknown Client'}
                </CardTitle>
                <Badge variant={invoice.status === 'sent' ? 'default' : 'secondary'}>
                  {invoice.status}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                {invoice.businessName || '—'} ·{' '}
                {new Date(invoice.createdAt).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-lg font-semibold">
                {formatCurrency(invoice.total, invoice.currency)}
              </p>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={() => handleWhatsApp(invoice)}>
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={() => handleEmail(invoice)}>
                  <Mail className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={() => handleDownload(invoice)}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="text-destructive ml-auto"
                  onClick={() => handleDelete(invoice.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  {invoice.clientName || '—'}
                </TableCell>
                <TableCell>{invoice.businessName || '—'}</TableCell>
                <TableCell>
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{formatCurrency(invoice.total, invoice.currency)}</TableCell>
                <TableCell>
                  <Badge variant={invoice.status === 'sent' ? 'default' : 'secondary'}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Share on WhatsApp"
                      onClick={() => handleWhatsApp(invoice)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Share via Email"
                      onClick={() => handleEmail(invoice)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Download PDF"
                      onClick={() => handleDownload(invoice)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Delete"
                      className="text-destructive"
                      onClick={() => handleDelete(invoice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
```

**Step 4: Add to sitemap**

Open `src/app/sitemap.ts`. Find the array of URL entries and add:

```typescript
{
  url: `${baseUrl}/history`,
  lastModified: new Date(),
  changeFrequency: 'daily' as const,
  priority: 0.5,
},
```

**Step 5: Add nav link to header**

Open `src/components/shared/header.tsx`. Add a "History" nav link next to any existing nav links, following the same pattern used there.

**Step 6: Build and lint**

```bash
pnpm build && pnpm lint
```

Expected: 0 errors.

**Step 7: Manual test**

1. `pnpm dev`
2. Go to `/create`, create and save an invoice
3. Navigate to `/history`
4. Confirm the invoice appears with correct client name, amount, status, and date
5. Test Delete button — invoice should disappear from list
6. Test on mobile viewport (Chrome DevTools) — cards should show instead of table

**Step 8: Commit**

```bash
git add src/app/history/page.tsx src/app/sitemap.ts src/components/shared/header.tsx
git commit -m "feat: add invoice history page with re-share and delete actions"
```

---

## Task 5: Blog Infrastructure + First Post

**Why:** Establishes a content footprint for SEO. A single post targeting "how to send invoice on WhatsApp" captures informational search intent. No CMS needed — static content in a `content/` folder.

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/lib/blog.ts`
- Create: `src/content/blog/send-invoice-whatsapp-30-seconds.ts`
- Modify: `src/app/sitemap.ts`

---

**Step 1: Create the blog post content file**

Create `src/content/blog/send-invoice-whatsapp-30-seconds.ts`:

```typescript
export const post = {
  slug: 'send-invoice-whatsapp-30-seconds',
  title: 'How to Send a Professional Invoice on WhatsApp in 30 Seconds',
  description:
    'Step-by-step guide to creating a PDF invoice and sending it directly to a client on WhatsApp — no signup, no app install, completely free.',
  publishedAt: '2026-03-08',
  readingTimeMin: 3,
  html: `
<p>Sending invoices on WhatsApp is how millions of freelancers and small businesses in Pakistan, UAE, Nigeria, India, and beyond get paid every day. The problem? Most invoice tools are slow, require signup, or don't actually attach a PDF — they just paste a link.</p>

<p><strong>Free Invoice Kit fixes that.</strong> Here's how to go from zero to a professional PDF invoice sent on WhatsApp in under 30 seconds.</p>

<h2>Step 1: Open Free Invoice Kit</h2>
<p>Go to <a href="/create">www.freeinvoicekit.com/create</a>. No account needed. The form loads instantly.</p>

<h2>Step 2: Fill in your details</h2>
<p>Enter your business name, your client's name, and the line items (what you did and how much). Free Invoice Kit auto-detects your local currency based on your location.</p>

<h2>Step 3: Generate the PDF</h2>
<p>Tap <strong>"Generate PDF"</strong>. Within seconds, a professionally formatted PDF invoice is created with your details, a unique invoice number, and a branded watermark.</p>

<h2>Step 4: Send on WhatsApp</h2>
<p>Tap <strong>"Share on WhatsApp"</strong>. On Android and iOS, the PDF attaches directly to WhatsApp via the native share sheet. On desktop, it downloads automatically and opens WhatsApp Web with a pre-filled caption.</p>

<p>Your client receives a professional PDF — not a screenshot, not a link, not a photo of a notebook.</p>

<h2>Why not just use a regular invoice app?</h2>
<p>Most invoice apps require you to create an account, add your client as a contact, wait for an email, and hope your client opens it. WhatsApp has a 98% open rate. Your invoice gets seen.</p>

<p>Free Invoice Kit is built for the way people actually do business in emerging markets: fast, mobile-first, and on WhatsApp.</p>

<h2>Try it now</h2>
<p><a href="/create">Create your first invoice →</a></p>
`,
};
```

**Step 2: Create the blog utility**

Create `src/lib/blog.ts`:

```typescript
import { post as sendInvoiceWhatsApp } from '@/content/blog/send-invoice-whatsapp-30-seconds';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTimeMin: number;
  html: string;
};

const posts: BlogPost[] = [sendInvoiceWhatsApp];

export function getAllPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
```

**Step 3: Create the blog index page**

Create `src/app/blog/page.tsx`:

```typescript
import { getAllPosts } from '@/lib/blog';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Free Invoice Kit',
  description: 'Tips and guides on invoicing, freelancing, and getting paid faster.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Blog</h1>
      <p className="text-muted-foreground mb-8">
        Tips on invoicing, freelancing, and getting paid faster.
      </p>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardDescription>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  · {post.readingTimeMin} min read
                </CardDescription>
                <p className="text-muted-foreground mt-1 text-sm">{post.description}</p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
```

**Step 4: Create the blog post page**

Create `src/app/blog/[slug]/page.tsx`:

```typescript
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Free Invoice Kit`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild size="sm" className="mb-4 -ml-2">
          <Link href="/blog">← Back to Blog</Link>
        </Button>
        <h1 className="mb-3 text-3xl font-bold leading-tight">{post.title}</h1>
        <p className="text-muted-foreground text-sm">
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          · {post.readingTimeMin} min read
        </p>
      </div>

      <article
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <div className="mt-12 rounded-lg border p-6 text-center">
        <p className="mb-4 text-lg font-semibold">Ready to send your first invoice on WhatsApp?</p>
        <Button asChild size="lg">
          <Link href="/create">Create Invoice — It&apos;s Free</Link>
        </Button>
      </div>
    </main>
  );
}
```

**Step 5: Install @tailwindcss/typography (for `prose` classes)**

```bash
pnpm add @tailwindcss/typography
```

Then open `src/app/globals.css` and add the plugin. In Tailwind v4 (PostCSS), add:

```css
@plugin "@tailwindcss/typography";
```

> Place it near the top of `globals.css`, after `@import "tailwindcss"` or `@tailwind base;` — check existing format first.

**Step 6: Add blog routes to sitemap**

Open `src/app/sitemap.ts`. Import `getAllPosts` and add blog routes:

```typescript
import { getAllPosts } from '@/lib/blog';

// Inside the sitemap function, after existing routes:
const blogPosts = getAllPosts().map((post) => ({
  url: `${baseUrl}/blog/${post.slug}`,
  lastModified: new Date(post.publishedAt),
  changeFrequency: 'monthly' as const,
  priority: 0.6,
}));

// Add to the return array:
// [...existingRoutes, { url: `${baseUrl}/blog`, ... }, ...blogPosts]
```

Also add the blog index:

```typescript
{
  url: `${baseUrl}/blog`,
  lastModified: new Date(),
  changeFrequency: 'weekly' as const,
  priority: 0.7,
},
```

**Step 7: Build and lint**

```bash
pnpm build && pnpm lint
```

Expected: 0 errors.

**Step 8: Manual test**

1. `pnpm dev`
2. Visit `/blog` — post card should appear
3. Click post — full content should render with proper headings and links
4. Visit `/sitemap.xml` — `/blog` and `/blog/send-invoice-whatsapp-30-seconds` should appear

**Step 9: Commit**

```bash
git add src/content/ src/lib/blog.ts src/app/blog/ src/app/sitemap.ts
git commit -m "feat: add blog infrastructure and first post on WhatsApp invoicing"
```

---

## Task 6: Lighthouse Performance Audit & Fixes

**Why:** Phase 1 success criteria require Lighthouse > 90 across Performance, Accessibility, Best Practices, and SEO. This task measures then fixes.

**Files:** Varies based on findings — most likely `src/app/page.tsx`, `src/app/layout.tsx`, image assets.

---

**Step 1: Run Lighthouse**

1. `pnpm build && pnpm start` (audit against production build, not dev server)
2. Open Chrome DevTools → Lighthouse tab
3. Run audit on: `/`, `/create`, `/blog/send-invoice-whatsapp-30-seconds`
4. Record all scores and note specific failing audits

**Step 2: Fix common issues (apply only what's actually failing)**

**A. Images without width/height (causes layout shift → low CLS score)**

Any `<img>` tags in landing page should be replaced with Next.js `<Image>`:
```typescript
import Image from 'next/image';
// Replace: <img src="/icon.svg" alt="..." />
// With:   <Image src="/icon.svg" alt="..." width={48} height={48} />
```

**B. Missing `alt` attributes (accessibility)**

Search for `<img` without `alt=` in all page files:
```bash
# In terminal:
grep -r '<img' src/ --include="*.tsx" | grep -v 'alt='
```
Add descriptive `alt` text to each result.

**C. Contrast issues (accessibility)**

Check Lighthouse's contrast failures. Update Tailwind color classes to use higher-contrast variants (e.g. `text-muted-foreground` → `text-foreground` for body copy that fails).

**D. Missing meta description on `/create`**

Open `src/app/create/page.tsx`. If there's no `export const metadata`, add:
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Invoice — Free Invoice Kit',
  description: 'Create a professional PDF invoice and send it on WhatsApp in 30 seconds. Free, no signup required.',
};
```

**E. Render-blocking scripts**

Next.js handles this automatically. If Lighthouse flags a specific script, check `src/app/layout.tsx` for any `<script>` tags without `defer` or `async`.

**Step 3: Re-run Lighthouse after each fix**

Iterate until all target scores are met:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 95

**Step 4: Build and lint**

```bash
pnpm build && pnpm lint
```

**Step 5: Commit all Lighthouse fixes together**

```bash
git add -p  # Stage only the relevant changes
git commit -m "perf: improve Lighthouse scores — accessibility, meta tags, image sizing"
```

---

## Task 7: App Icon Assets

**Why:** `public/icon.svg` is a placeholder. PWA install UX and directory listings need real brand assets. This task creates minimal-viable icon set.

**Files:**
- Replace: `public/icon.svg`
- Add: `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png`
- Verify: `public/manifest.json`

---

**Step 1: Create or obtain icon assets**

Options (choose one):
- **Design:** Use Figma, Canva, or similar to create a simple icon (e.g., a receipt/invoice symbol with a green color)
- **Generate:** Use a favicon generator like [realfavicongenerator.net](https://realfavicongenerator.net/) with a simple SVG
- **Minimum viable:** A square PNG with the letters "QB" on a green background (#16a34a)

Required sizes:
- `icon-192.png` — 192×192px
- `icon-512.png` — 512×512px
- `apple-touch-icon.png` — 180×180px
- `favicon.ico` — 32×32px (replace existing or let Next.js handle via `icon.svg`)

**Step 2: Place files in `public/`**

```
public/
├── icon.svg              (updated brand icon)
├── icon-192.png
├── icon-512.png
├── apple-touch-icon.png
└── favicon.ico           (optional — Next.js uses icon.svg if present)
```

**Step 3: Verify manifest.json references correct paths**

Open `public/manifest.json`. Confirm `icons` array references the new files:

```json
{
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

**Step 4: Verify layout.tsx has apple-touch-icon link**

Open `src/app/layout.tsx`. Confirm there is a metadata entry for apple-touch-icon. If not, add:

```typescript
export const metadata: Metadata = {
  // ...existing metadata...
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};
```

**Step 5: Test PWA install on mobile**

1. Deploy to Vercel staging (or use ngrok to expose local dev)
2. Open on Android Chrome
3. "Add to Home Screen" prompt should appear
4. Install and verify icon appears correctly on home screen

**Step 6: Commit**

```bash
git add public/
git commit -m "chore: add production-ready PWA icon assets"
```

---

## Task 8: Merge develop → main & Deploy

**Why:** All Sprint 4 engineering is complete. Merge to main triggers Vercel production deployment.

**Prerequisites:** All Tasks 1–7 complete, `pnpm build` and `pnpm lint` passing on `develop`.

---

**Step 1: Final pre-merge checks**

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

All three must pass with zero errors.

**Step 2: Verify environment variables in Vercel**

In the Vercel dashboard (not code), ensure these are set for the **Production** environment:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SECRET_KEY=your-service-role-key
NEXT_PUBLIC_POSTHOG_KEY=your-key         (optional)
NEXT_PUBLIC_POSTHOG_HOST=your-host       (optional)
```

**Step 3: Verify Supabase `pro_waitlist` table exists**

In Supabase dashboard → Table Editor, confirm table with columns:
- `id` (uuid, primary key, auto-generated)
- `email` (text, unique)
- `source` (text, nullable)
- `ip` (text, nullable)
- `country` (text, nullable)
- `created_at` (timestamptz, default: now())

RLS must be **enabled** with a policy allowing service-role inserts.

**Step 4: Merge develop → main**

> ⚠️ Confirm with the team before running this. It triggers production deployment.

```bash
git checkout main
git merge develop --no-ff -m "chore: merge Sprint 4 — polish, security, history, blog"
git push origin main
```

**Step 5: Verify production deployment**

After Vercel deploys (check dashboard for green status):

- [ ] Homepage loads
- [ ] `/create` — invoice creation works, PDF generates
- [ ] `/history` — page loads (empty state on fresh visit)
- [ ] `/blog` — blog index shows post
- [ ] `/blog/send-invoice-whatsapp-30-seconds` — post renders correctly
- [ ] `/sitemap.xml` — all routes present including new blog and history
- [ ] Security headers present: `curl -I https://your-domain.com | grep x-frame`
- [ ] Waitlist form submits without error

**Step 6: Commit (no code change needed — just the merge)**

The merge commit above is the commit.

---

## Task 9: Post-Launch (Manual — Non-Code)

These are PM/founder actions, not engineering. Track completion in GitHub Issues or a checklist.

**Step 1: Submit to 10+ startup directories**

Submit to each with consistent copy:

- **Product name:** Free Invoice Kit
- **Tagline:** "Free PDF invoices on WhatsApp. No signup."
- **Description (150 words):**
  > Free Invoice Kit lets freelancers and small businesses create a professional PDF invoice and send it directly on WhatsApp — in under 30 seconds, with no account required. Built for emerging markets where WhatsApp is the primary business communication channel (Pakistan, UAE, Nigeria, India). Enter your details, add line items, auto-detect local currency, generate a branded PDF, and share it as a file attachment — not a link. Completely free, forever.

| Directory | URL |
|-----------|-----|
| AlternativeTo | alternativeto.net |
| BetaList | betalist.com |
| SaaSHub | saashub.com |
| IndieHackers | indiehackers.com/products |
| StartupStash | startupstash.com |
| SideProjectors | sideprojectors.com |
| ToolPilot | toolpilot.ai |
| MicroSaaS HQ | microsaashq.com |
| Launching Next | launchingnext.com |
| Product Hunt | producthunt.com (as "Upcoming") |

**Step 2: Submit sitemap to Google Search Console**

1. Verify domain ownership in Google Search Console
2. Submit `https://your-domain.com/sitemap.xml`
3. Request indexing for each URL manually (optional, for faster pickup)

**Step 3: Personal network outreach**

Send to 50–100 contacts (freelancers, consultants, small business owners):

> "Hey [Name]! I just launched a free tool — create a PDF invoice and send it on WhatsApp in 30 seconds, no signup. Would love your feedback: [your-domain.com]"

**Step 4: LinkedIn + Twitter/X post**

LinkedIn (personal story):
> I built something for the way real business happens in [your country].
> Most people there don't email invoices — they send them on WhatsApp.
> So I made Free Invoice Kit: professional PDF invoice → WhatsApp in 30 seconds. Free, no signup.
> [your-domain.com]
> Would love feedback from freelancers and small business owners.

Twitter/X:
> Just launched Free Invoice Kit.
> Free PDF invoices on WhatsApp. No signup.
> → 30 seconds from zero to sent invoice
> → Professional PDF, not a screenshot
> → Works on Android, iOS, desktop
> [your-domain.com]
> #buildinpublic #indiehackers

---

## Sprint 4 Done-Definition Checklist

### Engineering (develop branch)
- [x] `pnpm lint` passes (0 errors)
- [x] `pnpm exec tsc --noEmit` passes (0 errors)
- [x] `pnpm build` succeeds (20 routes)
- [x] Security headers present on all responses (`X-Frame-Options`, `CSP`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`)
- [x] PDF API returns HTTP 429 after 10 requests from same IP within 1 hour
- [x] Input sanitization strips HTML from all PDF API string fields
- [x] `/history` page lists local invoices with working Delete, WhatsApp, Email, Download actions
- [x] `/blog` index renders with post card
- [x] `/blog/send-invoice-whatsapp-30-seconds` renders full post content
- [x] `/sitemap.xml` includes `/history`, `/blog`, and the blog post URL (10 URLs total)
- [x] Page titles correct on `/create` and `/history`
- [x] PWA icon assets generated (192px, 512px, apple-touch-icon)
- [x] Zero browser console errors (PostHog CSP fixed)

### Pre-Launch (manual — before merge to main)
- [ ] Real `/privacy` page created
- [ ] Real `/terms` page created
- [ ] Footer links updated from placeholders
- [ ] Lighthouse Performance > 90 on `/`
- [ ] Lighthouse Accessibility > 90 on `/`
- [ ] Lighthouse SEO > 95 on `/`
- [ ] WhatsApp PDF sharing tested on real Android device
- [ ] WhatsApp PDF sharing tested on real iOS device
- [ ] PWA install prompt appears on Android Chrome
- [x] Supabase `pro_waitlist` table exists with RLS enabled
- [x] Waitlist form submits correctly (test with real email)

### Deployment
- [x] Vercel env vars set for Production environment
- [x] Production domain set to `www.freeinvoicekit.com`
- [ ] `develop` merged to `main` via `git merge --no-ff`
- [ ] Vercel build green on `main`
- [ ] All routes verified on production URL

### Post-Launch (PM / Founder)
- [ ] Google Search Console — domain verified for `www.freeinvoicekit.com`
- [ ] Sitemap submitted to Google Search Console
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] Listed on 10+ startup directories (see Task 9 table above)
- [ ] 50+ personal outreach messages sent
- [ ] LinkedIn launch post published
- [ ] Twitter/X launch post published
- [ ] Blog post published and indexed
- [ ] Soft launch tweet published
