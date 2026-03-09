# Sprint 3 — WhatsApp Sharing + PWA + Traffic Push

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wire up the actual sharing mechanics (WhatsApp via Web Share API with fallback, direct download, email, copy caption), mark invoices as sent, make the app installable as a PWA with offline support, add a Pro waitlist banner backed by Supabase, build 3 more SEO landing pages, and polish mobile responsiveness.

**Status:** Sprint 3 engineering complete and QA'd as of March 8, 2026. `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build` are passing. Eight post-implementation QA fixes were applied (see QA / Post-Sprint Changes section below). Remaining items are production verification, real icon assets, and PM/SEO follow-through.

**Architecture:** Sharing uses the Web Share API (file sharing) on supported mobile devices and falls back to download + wa.me link on desktop/unsupported browsers. A new `src/lib/share.ts` module centralizes all sharing logic. PWA is implemented via `@serwist/turbopack` and `serwist`, with a route-served service worker, a manifest, a provider-based registration layer, and an `/offline` fallback page. The Pro waitlist captures emails through a server-side API route (`/api/waitlist`) that inserts into a Supabase `pro_waitlist` table with rate limiting, honeypot spam protection, and duplicate detection. Three new server-rendered SEO pages target geo-specific and competitor-alternative keywords.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui v4, @supabase/supabase-js, @serwist/turbopack, serwist, esbuild, idb, nanoid, lucide-react, sonner

**Design Doc:** See `docs/plans/2026-03-07-sprint1-design.md` for approved architectural decisions.
**Phase Plan:** See `documentation/Phase1_Implementation_Plan.md` Section 7 for Sprint 3 task definitions.
**Sprint 2 Plan:** See `docs/plans/2026-03-07-sprint2-pdf-generation.md` for prior sprint implementation.

---

## Pre-flight: Verify Sprint 2 baseline

Before starting any Sprint 3 work, confirm the baseline:

```bash
pnpm build
pnpm lint
```

Both must pass cleanly. If they don't, fix before proceeding.

---

## Task 1: Extend InvoiceData Type for Sharing

**Files:**

- Modify: `src/types/invoice.ts`

The `InvoiceData` type needs `sentAt` and `sentVia` fields so we can track when and how an invoice was shared.

**Step 1: Add sharing fields to InvoiceData**

In `src/types/invoice.ts`, add two optional fields to the `InvoiceData` interface:

```typescript
// Add after the existing `pdfUrl?: string;` field:
sentAt?: string;        // ISO datetime string — when the invoice was shared
sentVia?: 'whatsapp' | 'email' | 'download' | 'copy';  // How it was shared
```

These are optional because existing saved invoices in IndexedDB won't have them. The sharing flow sets them when the user triggers any share action.

**Step 2: Verify**

```bash
pnpm build
```

No errors expected — the fields are optional, so no existing code breaks.

**Step 3: Commit**

```bash
git add src/types/invoice.ts
git commit -m "feat: add sentAt and sentVia fields to InvoiceData type"
```

---

## Task 2: Sharing Utilities Module

**Files:**

- Create: `src/lib/share.ts`

This module centralizes all sharing logic: WhatsApp (Web Share API + fallback), download, email, copy caption, and the "mark as sent" IndexedDB update.

**Step 1: Create the share module**

Create `src/lib/share.ts`:

```typescript
import { formatCurrency } from '@/lib/currencies';
import { saveInvoice } from '@/lib/db';
import type { InvoiceData } from '@/types/invoice';

// --- WhatsApp Sharing ---

export async function shareOnWhatsApp(
  invoice: InvoiceData
): Promise<'shared' | 'fallback' | 'cancelled'> {
  const caption = buildCaption(invoice);
  const pdfUrl = invoice.pdfUrl;

  if (!pdfUrl) {
    return 'fallback';
  }

  try {
    // Attempt Web Share API with file (mobile devices)
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const file = new File([blob], `invoice-${invoice.id}.pdf`, {
      type: 'application/pdf',
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: `Invoice for ${invoice.clientName}`,
        text: caption,
        files: [file],
      });
      await markAsSent(invoice, 'whatsapp');
      return 'shared';
    }

    // Fallback: download + open wa.me
    return await fallbackWhatsAppShare(pdfUrl, caption, invoice);
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      return 'cancelled';
    }
    // On any share error, fall back
    return await fallbackWhatsAppShare(pdfUrl, caption, invoice);
  }
}

async function fallbackWhatsAppShare(
  pdfUrl: string,
  caption: string,
  invoice: InvoiceData
): Promise<'fallback'> {
  // Step 1: Trigger download
  downloadFile(pdfUrl, `invoice-${invoice.id}.pdf`);

  // Step 2: Open WhatsApp with pre-filled caption
  const encodedCaption = encodeURIComponent(caption + '\n\n(Please see the attached PDF invoice)');
  window.open(`https://wa.me/?text=${encodedCaption}`, '_blank');

  await markAsSent(invoice, 'whatsapp');
  return 'fallback';
}

// --- Download ---

export function downloadPdf(invoice: InvoiceData): void {
  if (!invoice.pdfUrl) return;
  downloadFile(invoice.pdfUrl, `invoice-${invoice.id}.pdf`);
  markAsSent(invoice, 'download');
}

function downloadFile(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- Email ---

export function shareViaEmail(invoice: InvoiceData): void {
  const amount = formatCurrency(invoice.total, invoice.currency);
  const subject = encodeURIComponent(`Invoice from ${invoice.businessName}`);
  const body = encodeURIComponent(
    `Hi ${invoice.clientName},\n\n` +
      `Please find attached your invoice for ${amount}.\n\n` +
      `Best regards,\n${invoice.businessName}\n\n` +
      `---\nInvoice created with Free Invoice Kit — www.freeinvoicekit.com`
  );
  window.open(`mailto:${invoice.clientEmail || ''}?subject=${subject}&body=${body}`, '_self');
  markAsSent(invoice, 'email');
}

// --- Copy Caption ---

export async function copyCaptionText(invoice: InvoiceData): Promise<void> {
  const caption = buildCaption(invoice);
  await navigator.clipboard.writeText(caption);
  markAsSent(invoice, 'copy');
}

// --- Helpers ---

function buildCaption(invoice: InvoiceData): string {
  const amount = formatCurrency(invoice.total, invoice.currency);
  return `Hi ${invoice.clientName}, please find attached your invoice for ${amount}. — ${invoice.businessName}`;
}

async function markAsSent(
  invoice: InvoiceData,
  via: 'whatsapp' | 'email' | 'download' | 'copy'
): Promise<void> {
  await saveInvoice({
    ...invoice,
    status: 'sent',
    sentAt: new Date().toISOString(),
    sentVia: via,
  });
}
```

**Step 2: Verify**

```bash
pnpm build
```

The module imports existing code (`formatCurrency`, `saveInvoice`, `InvoiceData`). Should compile with no errors.

**Step 3: Commit**

```bash
git add src/lib/share.ts
git commit -m "feat: add sharing utilities (WhatsApp, download, email, copy)"
```

---

## Task 3: Wire Sharing Buttons into Create Page

**Files:**

- Modify: `src/app/create/page.tsx`

The create page already has a success state with placeholder share buttons (from Sprint 2). This task replaces the disabled placeholders with working buttons that call the share utilities.

**Step 1: Add imports to the create page**

Add these imports to `src/app/create/page.tsx`:

```typescript
import { MessageCircle, Mail, Copy, Download } from 'lucide-react';
import { shareOnWhatsApp, downloadPdf, shareViaEmail, copyCaptionText } from '@/lib/share';
```

**Step 2: Add sharing handler functions**

Add these handler functions inside the `CreatePage` component (or whatever the component is named), alongside the existing `handleGenerateInvoice`:

```typescript
async function handleShareWhatsApp() {
  const result = await shareOnWhatsApp(invoice);
  if (result === 'shared') {
    toast.success('Invoice shared on WhatsApp!');
  } else if (result === 'fallback') {
    toast.info('PDF downloaded. Attach it in the WhatsApp chat that just opened.');
  }
  // 'cancelled' — user dismissed share dialog, no toast
}

function handleDownloadPdf() {
  downloadPdf(invoice);
  toast.success('PDF downloaded!');
}

function handleShareEmail() {
  shareViaEmail(invoice);
  toast.info('Email client opened. Attach the downloaded PDF manually.');
}

async function handleCopyCaption() {
  await copyCaptionText(invoice);
  toast.success('Caption copied to clipboard!');
}
```

**Step 3: Replace the placeholder share buttons in the success card**

Find the success state card (the `Card` with `"Invoice Ready!"` or similar) and replace the disabled share buttons with:

```tsx
<div className="flex flex-col gap-2 sm:flex-row">
  <Button
    variant="default"
    className="flex-1"
    onClick={handleShareWhatsApp}
    disabled={!invoice.pdfUrl}
  >
    <MessageCircle className="size-4" />
    Send on WhatsApp
  </Button>
  <Button
    variant="outline"
    className="flex-1"
    onClick={handleDownloadPdf}
    disabled={!invoice.pdfUrl}
  >
    <Download className="size-4" />
    Download PDF
  </Button>
</div>
<div className="flex flex-col gap-2 sm:flex-row">
  <Button
    variant="outline"
    className="flex-1"
    onClick={handleShareEmail}
  >
    <Mail className="size-4" />
    Email Invoice
  </Button>
  <Button
    variant="outline"
    className="flex-1"
    onClick={handleCopyCaption}
  >
    <Copy className="size-4" />
    Copy Caption
  </Button>
</div>
```

Make the "Send on WhatsApp" button `variant="default"` (primary color) — it's the main CTA. The rest are `variant="outline"`.

**Step 4: Ensure the invoice object passed to share functions has `pdfUrl`**

In the `handleGenerateInvoice` function, after setting `generatedPdfUrl`, make sure the invoice state also has the `pdfUrl`. Check if the existing code already calls `setPdfUrl` on the form hook — if it does, the `invoice` object from the hook will already have `pdfUrl`. If not, pass a constructed object to the share functions:

```typescript
// In the share handlers, if invoice.pdfUrl is not set, use generatedPdfUrl:
const invoiceWithPdf: InvoiceData = {
  ...invoice,
  pdfUrl: invoice.pdfUrl || generatedPdfUrl || undefined,
};
```

Use `invoiceWithPdf` in the share handler calls instead of `invoice` directly.

**Step 5: Verify**

```bash
pnpm dev
```

1. Navigate to `/create`
2. Fill out a valid invoice and click "Generate Invoice"
3. After success, verify the four share buttons are visible and enabled
4. Click "Download PDF" — should trigger download
5. Click "Copy Caption" — should show success toast
6. Click "Send on WhatsApp" — on desktop, should download PDF and open wa.me in a new tab
7. Click "Email Invoice" — should open default email client

**Step 6: Commit**

```bash
git add src/app/create/page.tsx
git commit -m "feat: wire sharing buttons (WhatsApp, download, email, copy)"
```

---

## Task 4: Pro Waitlist API Route

**Files:**

- Create: `src/app/api/waitlist/route.ts`

Server-side API route that inserts emails into the `pro_waitlist` Supabase table. Includes rate limiting, honeypot spam detection, duplicate checking, email validation, and country detection.

**Prerequisites:** The `pro_waitlist` table must already exist in Supabase (SQL was run before this sprint).

**Step 1: Create the waitlist API route**

Create `src/app/api/waitlist/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

import { supabaseAdmin } from '@/lib/supabase';

// Simple in-memory rate limiter (per-process, resets on deploy)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3; // 3 submissions per IP per hour

// Common disposable email domains
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'tempmail.com',
  'throwaway.email',
  'yopmail.com',
  'sharklasers.com',
  'guerrillamailblock.com',
  'grr.la',
  'dispostable.com',
  'maildrop.cc',
  'trashmail.com',
  'fakeinbox.com',
  'temp-mail.org',
  '10minutemail.com',
  'mailnesia.com',
]);

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function isValidEmail(email: string): boolean {
  // RFC 5322 simplified — good enough for waitlist
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 254;
}

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISPOSABLE_DOMAINS.has(domain || '');
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const ip = getClientIp(request);

    // Rate limit check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, source, honeypot } = body as {
      email?: string;
      source?: string;
      honeypot?: string;
    };

    // Honeypot check — if this hidden field has a value, it's a bot
    if (honeypot) {
      // Return 200 so bots think it worked
      return NextResponse.json({ success: true });
    }

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    if (isDisposableEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Please use a non-disposable email address' },
        { status: 400 }
      );
    }

    // Check for duplicate
    const { data: existing } = await supabaseAdmin
      .from('pro_waitlist')
      .select('id')
      .eq('email', trimmedEmail)
      .limit(1)
      .single();

    if (existing) {
      // Don't reveal duplicate to potential scrapers — just say success
      return NextResponse.json({ success: true });
    }

    // Detect country from geo route data
    let country: string | null = null;
    try {
      const geoResponse = await fetch(new URL('/api/geo', request.url).toString(), {
        signal: AbortSignal.timeout(2000),
      });
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        country = geoData.country || null;
      }
    } catch {
      // Ignore geo detection failure
    }

    // Insert into Supabase
    const { error: insertError } = await supabaseAdmin.from('pro_waitlist').insert({
      email: trimmedEmail,
      source: source || 'banner',
      ip,
      country,
    });

    if (insertError) {
      console.error('Waitlist insert error:', insertError);
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
```

**Step 2: Update the geo API route to also return the country code**

In `src/app/api/geo/route.ts`, the current response only returns `{ currency }`. Update it to also include the country code so the waitlist route can use it:

Find the line that returns the JSON response:

```typescript
return NextResponse.json({ currency });
```

Change it to:

```typescript
return NextResponse.json({
  currency,
  country: data.country_code || null,
});
```

Also update the fallback response:

```typescript
return NextResponse.json({ currency: DEFAULT_CURRENCY, country: null });
```

**Step 3: Verify**

```bash
pnpm build
```

**Step 4: Test with curl**

```bash
pnpm dev &

# Should succeed
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "source": "banner"}'

# Should return error (invalid email)
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "notanemail", "source": "banner"}'

# Should silently succeed (honeypot triggered)
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "bot@spam.com", "source": "banner", "honeypot": "gotcha"}'
```

**Step 5: Commit**

```bash
git add src/app/api/waitlist/route.ts src/app/api/geo/route.ts
git commit -m "feat: add Pro waitlist API with rate limiting and spam protection"
```

---

## Task 5: Pro Waitlist Banner Component

**Files:**

- Create: `src/components/pro-waitlist-banner.tsx`
- Modify: `src/app/create/page.tsx` (add the banner)
- Modify: `src/app/page.tsx` (add the banner to landing page teaser section)

A dismissable banner that captures emails for the Pro waitlist. Shows on `/create` and in the "Pro Coming Soon" section on the landing page. Remembers dismissal in localStorage.

**Step 1: Create the banner component**

Create `src/components/pro-waitlist-banner.tsx`:

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DISMISS_KEY = 'freeinvoicekit-pro-banner-dismissed';
const SIGNED_UP_KEY = 'freeinvoicekit-pro-waitlist-signed-up';

interface ProWaitlistBannerProps {
  source?: 'banner' | 'landing_page';
  variant?: 'banner' | 'inline';
}

export function ProWaitlistBanner({
  source = 'banner',
  variant = 'banner',
}: ProWaitlistBannerProps) {
  const [dismissed, setDismissed] = useState(true); // Start hidden to avoid flash
  const [signedUp, setSignedUp] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const wasDismissed = localStorage.getItem(DISMISS_KEY) === 'true';
    const wasSignedUp = localStorage.getItem(SIGNED_UP_KEY) === 'true';
    setDismissed(wasDismissed);
    setSignedUp(wasSignedUp);
  }, []);

  if (dismissed && variant === 'banner') return null;
  if (signedUp) {
    return (
      <div className="border-accent/20 bg-accent/5 text-accent flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm">
        <CheckCircle2 className="size-4" />
        You&apos;re on the Pro waitlist. We&apos;ll notify you at launch!
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source,
          honeypot: honeypotRef.current?.value || '',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setSignedUp(true);
      localStorage.setItem(SIGNED_UP_KEY, 'true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleDismiss() {
    setDismissed(true);
    localStorage.setItem(DISMISS_KEY, 'true');
  }

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Sparkles className="text-primary mt-0.5 size-5 shrink-0" />
          <div>
            <p className="text-sm font-medium">
              Free Invoice Kit Pro — Remove watermark, add your logo, auto-recurring invoices.
            </p>
            {!showForm && (
              <Button
                variant="link"
                size="sm"
                className="text-primary h-auto p-0 text-sm"
                onClick={() => setShowForm(true)}
              >
                Notify me when it launches
              </Button>
            )}
          </div>
        </div>
        {variant === 'banner' && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-auto shrink-0 p-1"
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          {/* Honeypot — hidden from real users, visible to bots */}
          <input
            ref={honeypotRef}
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-xs"
            disabled={isSubmitting}
            required
          />
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Join Waitlist'}
          </Button>
        </form>
      )}

      {error && <p className="text-destructive mt-2 text-xs">{error}</p>}
    </>
  );

  if (variant === 'inline') {
    return <div className="bg-muted/40 rounded-lg border p-4">{content}</div>;
  }

  return <div className="border-primary/10 bg-primary/5 rounded-lg border p-4">{content}</div>;
}
```

**Step 2: Add the banner to the create page**

In `src/app/create/page.tsx`, import and add the banner above the form:

```typescript
import { ProWaitlistBanner } from '@/components/pro-waitlist-banner';
```

Place it at the top of the form column, before the first form `Card`:

```tsx
<ProWaitlistBanner source="banner" variant="banner" />
```

**Step 3: Add the inline version to the landing page**

In `src/app/page.tsx`, find the "Pro Coming Soon" section. Replace the static text-only teaser with the interactive component. Since the landing page is a server component, wrap it:

```tsx
import { ProWaitlistBanner } from '@/components/pro-waitlist-banner';
```

In the "Pro Coming Soon" section, replace the existing static content with:

```tsx
<section className="py-16 sm:py-20">
  <div className="mx-auto max-w-2xl px-4 text-center">
    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Pro Coming Soon</h2>
    <p className="text-muted-foreground mt-4 text-lg">
      Remove the watermark, add your own logo, set up recurring invoices, and more.
    </p>
    <div className="mx-auto mt-8 max-w-md">
      <ProWaitlistBanner source="landing_page" variant="inline" />
    </div>
  </div>
</section>
```

**Step 4: Verify**

```bash
pnpm dev
```

1. Go to `/` — the Pro Coming Soon section should show the inline waitlist form
2. Go to `/create` — a dismissable banner should appear at the top
3. Enter an email and submit — should show success state
4. Dismiss the banner on `/create` — reload, it should stay dismissed
5. Check Supabase dashboard — the email should appear in `pro_waitlist` table

**Step 5: Commit**

```bash
git add src/components/pro-waitlist-banner.tsx src/app/create/page.tsx src/app/page.tsx
git commit -m "feat: add Pro waitlist banner with Supabase backend"
```

---

## Task 6: PWA Manifest

**Files:**

- Create: `public/manifest.json`
- Modify: `src/app/layout.tsx` (link the manifest)

Add a web app manifest so the app is installable on mobile devices. Uses placeholder icons until brand assets arrive.

**Step 1: Create placeholder PWA icons**

Before creating the manifest, we need icon files. For now, create simple placeholder icons. The real icons will be swapped in when brand assets arrive.

Generate placeholder icons using the Next.js default favicon approach — create a simple SVG icon:

Create `public/icon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" fill="#1e3a5f"/>
  <text x="256" y="340" text-anchor="middle" font-family="system-ui, sans-serif" font-size="280" font-weight="700" fill="white">Q</text>
</svg>
```

**Note:** For full PWA compliance, you also need `icon-192.png` and `icon-512.png`. These should be created by the designer (manual task). For now, the SVG serves as a fallback. If you have ImageMagick or a similar tool, generate PNGs from the SVG:

```bash
# Optional — only if you have a conversion tool available:
# magick public/icon.svg -resize 192x192 public/icon-192.png
# magick public/icon.svg -resize 512x512 public/icon-512.png
```

If PNGs can't be generated now, omit the `icons` array entries for PNG — the manifest still works without them (just won't show an icon on home screen).

**Step 2: Create the manifest**

Create `public/manifest.json`:

```json
{
  "name": "Free Invoice Kit — Free Invoice Maker for WhatsApp",
  "short_name": "Free Invoice Kit",
  "description": "Create and send PDF invoices on WhatsApp. Free. No signup.",
  "start_url": "/create",
  "display": "standalone",
  "background_color": "#f9f9f6",
  "theme_color": "#1e3a5f",
  "orientation": "portrait-primary",
  "categories": ["business", "finance", "productivity"],
  "icons": [
    {
      "src": "/icon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any"
    }
  ]
}
```

**When brand icons arrive**, add these entries to the `icons` array:

```json
{ "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
{ "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
```

**Step 3: Link the manifest in the root layout**

In `src/app/layout.tsx`, add the manifest link and PWA meta tags to the `metadata` export:

Add to the existing `metadata` object:

```typescript
manifest: '/manifest.json',
```

Add `themeColor` if not already present:

```typescript
themeColor: '#1e3a5f',
```

Add `appleWebApp` for iOS:

```typescript
appleWebApp: {
  capable: true,
  statusBarStyle: 'default',
  title: 'Free Invoice Kit',
},
```

**Step 4: Verify**

```bash
pnpm dev
```

1. Open Chrome DevTools → Application → Manifest — verify it loads correctly
2. Check there are no manifest errors in the console
3. On Android Chrome (or emulator): verify the "Add to Home Screen" option appears in the browser menu

**Step 5: Commit**

```bash
git add public/manifest.json public/icon.svg src/app/layout.tsx
git commit -m "feat: add PWA manifest for app installability"
```

---

## Task 7: Service Worker with Serwist

**Files:**

- Install: `@serwist/turbopack`, `serwist`, `esbuild`
- Create: `src/app/sw.ts` (service worker entry)
- Create: `src/app/serwist/[path]/route.ts` (route-served service worker bundle)
- Create: `src/components/providers/serwist-provider.tsx`
- Create: `src/app/offline/page.tsx`
- Modify: `next.config.ts` (Serwist plugin)
- Modify: `src/app/layout.tsx` (register SW via provider + PWA metadata)

Serwist is integrated through Turbopack in this repo, not the older webpack-style `@serwist/next` path. The service worker is bundled from `src/app/sw.ts`, exposed through a route, and registered on the client in production through a provider component.

**Step 1: Install Serwist**

```bash
pnpm add -D @serwist/turbopack serwist esbuild
```

**Step 2: Create the service worker entry**

Create `src/app/sw.ts`:

```typescript
import { defaultCache } from '@serwist/turbopack/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope & typeof globalThis;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: {
    cleanupOutdatedCaches: true,
    navigateFallback: '/offline',
    navigateFallbackDenylist: [/^\/api\//, /^\/serwist\//],
  },
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
```

**Step 3: Expose the generated worker through an App Router route**

Create `src/app/serwist/[path]/route.ts`:

```typescript
import { createSerwistRoute } from '@serwist/turbopack';
import type { NextRequest } from 'next/server';

const serwistRoute = createSerwistRoute({
  swSrc: 'src/app/sw.ts',
  useNativeEsbuild: true,
  additionalPrecacheEntries: ['/offline'],
});

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;
export const generateStaticParams = serwistRoute.generateStaticParams;

export async function GET(request: NextRequest, context: { params: Promise<unknown> }) {
  return serwistRoute.GET(request, context as { params: Promise<{ path: string }> });
}
```

**Step 4: Configure next.config.ts**

Replace the contents of `next.config.ts` with:

```typescript
import type { NextConfig } from 'next';
import { withSerwist } from '@serwist/turbopack';

const nextConfig: NextConfig = {};

export default withSerwist(nextConfig);
```

**Step 5: Add production registration through a provider**

Create `src/components/providers/serwist-provider.tsx`:

```tsx
'use client';

import { SerwistProvider as BaseSerwistProvider } from '@serwist/turbopack/react';

export function SerwistProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseSerwistProvider
      swUrl="/serwist/sw.js"
      disable={process.env.NODE_ENV !== 'production'}
      cacheOnNavigation
      register
      reloadOnOnline
      options={{ scope: '/' }}
    >
      {children}
    </BaseSerwistProvider>
  );
}
```

Then wrap the app body in `src/app/layout.tsx` with `<SerwistProvider>` and add `manifest`, `appleWebApp`, `viewport.themeColor`, and icon metadata.

**Step 6: Add an offline fallback page**

Create `src/app/offline/page.tsx` so navigation fallback has a real destination when the network is unavailable.

**Step 7: Verify**

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm start
```

To test locally in production mode:
Open Chrome DevTools → Application → Service Workers — verify the SW is registered and active.
Open Chrome DevTools → Application → Manifest — verify the manifest loads and the installability checks are clean.
Disconnect the network and confirm navigation falls back to `/offline`.

**Step 8: Commit**

```bash
git add src/app/sw.ts src/app/serwist/[path]/route.ts src/components/providers/serwist-provider.tsx src/app/offline/page.tsx next.config.ts src/app/layout.tsx package.json pnpm-lock.yaml
git commit -m "feat: add Serwist service worker for PWA offline support"
```

---

## Task 8: SEO Landing Page — /whatsapp-billing-uae

**Files:**

- Create: `src/app/whatsapp-billing-uae/page.tsx`
- Modify: `src/app/sitemap.ts`

Target keyword: "whatsapp billing uae" (800 searches/month). Content angle: UAE business culture, VAT requirements, WhatsApp-first communication, AED currency support.

**Step 1: Create the page**

Create `src/app/whatsapp-billing-uae/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, MessageCircle, Globe, Shield, ArrowRight, Receipt } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

export const metadata: Metadata = {
  title: 'WhatsApp Billing in UAE — Free Invoice Maker with AED Support | Free Invoice Kit',
  description:
    'Create professional invoices in AED and send them on WhatsApp in 30 seconds. Perfect for UAE freelancers, consultants, and small businesses. Free, no signup.',
  alternates: { canonical: 'https://www.freeinvoicekit.com/whatsapp-billing-uae' },
};

const benefits = [
  {
    icon: MessageCircle,
    title: 'WhatsApp-First Billing',
    description:
      'The UAE runs on WhatsApp. Send PDF invoices directly as attachments — no emails that get lost in spam.',
  },
  {
    icon: Globe,
    title: 'AED Currency Support',
    description:
      'Create invoices in UAE Dirhams with proper formatting. Auto-detects your location for the right currency.',
  },
  {
    icon: Shield,
    title: 'VAT-Ready Invoices',
    description:
      'Add your 5% UAE VAT with a single field. Tax amount calculates automatically. Professional and compliant.',
  },
  {
    icon: Receipt,
    title: 'Professional PDF Format',
    description:
      'Clean, branded PDF invoices that build trust with your clients. Download or share in one tap.',
  },
];

const faqs = [
  {
    question: 'Can I create invoices in AED with Free Invoice Kit?',
    answer:
      'Yes. Free Invoice Kit auto-detects your location in the UAE and defaults to AED. You can also manually select any of 25+ supported currencies.',
  },
  {
    question: 'Is Free Invoice Kit compliant with UAE VAT requirements?',
    answer:
      'Free Invoice Kit supports adding VAT as a tax percentage on your invoices. Set the tax rate to 5% (the UAE standard VAT rate) and the tax amount is calculated automatically. For full FTA compliance, consult your accountant.',
  },
  {
    question: 'How do I send an invoice on WhatsApp from the UAE?',
    answer:
      'Open Free Invoice Kit, fill in your invoice details, click Generate Invoice, then tap Send on WhatsApp. The PDF attaches directly to your WhatsApp chat — your client receives a professional document, not a link.',
  },
  {
    question: 'Is Free Invoice Kit free for UAE businesses?',
    answer:
      'Yes, 100% free. No signup, no credit card, no hidden fees. Create unlimited invoices and share them on WhatsApp instantly.',
  },
];

export default function WhatsAppBillingUAEPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            WhatsApp Billing for <span className="text-primary">UAE Businesses</span>
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
            Create professional PDF invoices in AED and send them directly on WhatsApp. Built for
            UAE freelancers, consultants, and SMBs who need fast, trusted billing.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/create">
                Create Invoice Now
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="hover:ring-primary/20 transition-colors">
              <CardContent className="pt-6">
                <div className="bg-primary/10 mb-4 inline-flex rounded-full p-3">
                  <benefit.icon className="text-primary size-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why WhatsApp section */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why WhatsApp for Invoicing in the UAE?
          </h2>
          <div className="text-muted-foreground mx-auto mt-6 max-w-2xl space-y-4 text-base">
            <p>
              With over 9.5 million active users, WhatsApp is the default communication channel for
              businesses in the UAE. Clients check WhatsApp before email — and invoices sent on
              WhatsApp get seen within minutes, not days.
            </p>
            <p>
              Free Invoice Kit lets you skip the email chain entirely. Generate a clean PDF invoice, tap
              &quot;Send on WhatsApp,&quot; and the document lands directly in your client&apos;s
              chat. No links to click, no apps to download — just a professional invoice ready for
              payment.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Start Billing on WhatsApp Today</h2>
          <p className="text-muted-foreground mt-4">
            Free forever. No signup. Create your first invoice in 30 seconds.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/create">
                Create Your First Invoice
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <Footer />
    </div>
  );
}
```

**Step 2: Add to sitemap**

In `src/app/sitemap.ts`, add a new entry to the return array:

```typescript
{
  url: `${baseUrl}/whatsapp-billing-uae`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
},
```

**Step 3: Verify**

```bash
pnpm build
```

Navigate to `http://localhost:3000/whatsapp-billing-uae` and verify the page renders correctly.

**Step 4: Commit**

```bash
git add src/app/whatsapp-billing-uae/page.tsx src/app/sitemap.ts
git commit -m "feat: add SEO landing page for WhatsApp billing UAE"
```

---

## Task 9: SEO Landing Page — /invoice-generator-pakistan

**Files:**

- Create: `src/app/invoice-generator-pakistan/page.tsx`
- Modify: `src/app/sitemap.ts`

Target keyword: "invoice generator pakistan" (900 searches/month). Content angle: Pakistani freelancer/SMB market, PKR support, WhatsApp dominance, mobile-first design.

**Step 1: Create the page**

Create `src/app/invoice-generator-pakistan/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, MessageCircle, Globe, Smartphone, ArrowRight, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

export const metadata: Metadata = {
  title: 'Free Invoice Generator for Pakistan — PKR Invoices on WhatsApp | Free Invoice Kit',
  description:
    'Create professional invoices in PKR and share on WhatsApp instantly. Perfect for Pakistani freelancers, agencies, and small businesses. Free, no signup required.',
  alternates: {
    canonical: 'https://www.freeinvoicekit.com/invoice-generator-pakistan',
  },
};

const benefits = [
  {
    icon: Globe,
    title: 'PKR Currency Built In',
    description:
      'Create invoices in Pakistani Rupees with proper formatting. Auto-detects your location — no manual setup needed.',
  },
  {
    icon: MessageCircle,
    title: 'Share Instantly on WhatsApp',
    description:
      'Pakistan has 60M+ WhatsApp users. Send professional PDF invoices directly in chat — faster than email, more trusted than links.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description:
      'Works perfectly on any smartphone. Create invoices on the go — no laptop needed. Install as an app from your browser.',
  },
  {
    icon: Wallet,
    title: '100% Free — No Hidden Fees',
    description:
      'No subscription, no credit card, no signup wall. Create unlimited invoices and share them for free. Forever.',
  },
];

const faqs = [
  {
    question: 'Can I create invoices in PKR with Free Invoice Kit?',
    answer:
      'Yes. Free Invoice Kit auto-detects your location in Pakistan and sets the currency to PKR. All amounts, taxes, and totals display in Pakistani Rupees with proper formatting.',
  },
  {
    question: 'How do I send an invoice on WhatsApp from Pakistan?',
    answer:
      'Open Free Invoice Kit on your phone or computer, fill in the invoice details, tap Generate Invoice, then tap Send on WhatsApp. The PDF is attached directly to your WhatsApp message.',
  },
  {
    question: 'Do I need to create an account to use Free Invoice Kit?',
    answer:
      'No. Free Invoice Kit requires zero signup. Open the app, create your invoice, and share it. Your invoices are saved locally on your device.',
  },
  {
    question: 'Can I add tax to my invoices?',
    answer:
      'Yes. Add any tax percentage (e.g., sales tax, withholding tax) and Free Invoice Kit calculates the amount automatically. The tax breakdown shows clearly on your PDF invoice.',
  },
  {
    question: 'Does Free Invoice Kit work offline?',
    answer:
      'You can view your saved invoices offline. Generating a new PDF requires an internet connection, but the form works offline — fill it out now, generate when you reconnect.',
  },
];

export default function InvoiceGeneratorPakistanPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Free Invoice Generator for <span className="text-primary">Pakistan</span>
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
            Create professional PDF invoices in PKR and share them on WhatsApp in 30 seconds. Built
            for Pakistani freelancers, agencies, and growing businesses.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/create">
                Create Invoice in PKR
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="hover:ring-primary/20 transition-colors">
              <CardContent className="pt-6">
                <div className="bg-primary/10 mb-4 inline-flex rounded-full p-3">
                  <benefit.icon className="text-primary size-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Context section */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why Pakistani Freelancers Choose WhatsApp Invoicing
          </h2>
          <div className="text-muted-foreground mx-auto mt-6 max-w-2xl space-y-4 text-base">
            <p>
              Pakistan&apos;s freelance economy is booming — the country ranks 4th globally on
              freelancing platforms. But most invoice tools are built for Western markets with USD
              pricing and email-based workflows.
            </p>
            <p>
              Free Invoice Kit is different. It supports PKR natively, works on mobile (where most
              Pakistani freelancers operate), and sends invoices on WhatsApp — the app your clients
              already use every day. No app downloads, no account creation, no complexity.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Start Invoicing in PKR — Free Forever
          </h2>
          <p className="text-muted-foreground mt-4">
            No signup. No fees. Create your first invoice in 30 seconds.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/create">
                Create Your First Invoice
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <Footer />
    </div>
  );
}
```

**Step 2: Add to sitemap**

In `src/app/sitemap.ts`, add:

```typescript
{
  url: `${baseUrl}/invoice-generator-pakistan`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
},
```

**Step 3: Verify**

```bash
pnpm build
```

**Step 4: Commit**

```bash
git add src/app/invoice-generator-pakistan/page.tsx src/app/sitemap.ts
git commit -m "feat: add SEO landing page for invoice generator Pakistan"
```

---

## Task 10: SEO Landing Page — /stripe-invoice-alternative

**Files:**

- Create: `src/app/stripe-invoice-alternative/page.tsx`
- Modify: `src/app/sitemap.ts`

Target keyword: "stripe invoice alternative" (1,200 searches/month). Content angle: Stripe invoicing is expensive/complex for simple needs, Free Invoice Kit is free, comparison table.

**Step 1: Create the page**

Create `src/app/stripe-invoice-alternative/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, XCircle, Zap, CreditCard, Clock, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

export const metadata: Metadata = {
  title: 'Free Stripe Invoice Alternative — No Fees, No Signup | Free Invoice Kit',
  description:
    'Looking for a Stripe invoice alternative? Free Invoice Kit lets you create professional PDF invoices for free — no 0.4% fee, no account required. Send on WhatsApp in 30 seconds.',
  alternates: {
    canonical: 'https://www.freeinvoicekit.com/stripe-invoice-alternative',
  },
};

const comparisonRows = [
  { feature: 'Invoice creation', freeInvoiceKit: 'Free', stripe: 'Free' },
  {
    feature: 'Per-invoice fee',
    freeInvoiceKit: 'None',
    stripe: '0.4% + Stripe fees',
  },
  { feature: 'Signup required', freeInvoiceKit: 'No', stripe: 'Yes + ID verification' },
  {
    feature: 'Time to first invoice',
    freeInvoiceKit: '30 seconds',
    stripe: '15+ minutes (setup)',
  },
  { feature: 'WhatsApp sharing', freeInvoiceKit: 'Built-in', stripe: 'Not available' },
  { feature: 'Offline support', freeInvoiceKit: 'Yes (PWA)', stripe: 'No' },
  {
    feature: 'Multi-currency',
    freeInvoiceKit: '25+ currencies',
    stripe: '135+ currencies',
  },
  {
    feature: 'Online payments',
    freeInvoiceKit: 'Coming soon',
    stripe: 'Built-in (Stripe)',
  },
  { feature: 'Recurring invoices', freeInvoiceKit: 'Coming soon (Pro)', stripe: 'Yes' },
  { feature: 'Custom branding', freeInvoiceKit: 'Coming soon (Pro)', stripe: 'Yes' },
];

const reasons = [
  {
    icon: Zap,
    title: 'Zero Setup Time',
    description:
      'No account creation, no business verification, no Stripe dashboard to learn. Open Free Invoice Kit, fill in the form, and your invoice is ready.',
  },
  {
    icon: CreditCard,
    title: 'Zero Fees',
    description:
      'Stripe charges 0.4% per paid invoice plus payment processing fees. Free Invoice Kit is free — now and forever for the core invoicing features.',
  },
  {
    icon: Clock,
    title: '30-Second Workflow',
    description:
      'Fill in your business info, add line items, click generate. Share on WhatsApp, download, or email. The entire flow takes under a minute.',
  },
  {
    icon: Shield,
    title: 'Your Data Stays Local',
    description:
      'Invoices save to your browser. No cloud account, no data sharing with payment processors, no vendor lock-in.',
  },
];

const faqs = [
  {
    question: 'Why would I use Free Invoice Kit instead of Stripe Invoicing?',
    answer:
      'If you need simple invoicing without online payment collection, Free Invoice Kit is faster and free. No signup, no fees, no complexity. Stripe is better if you need built-in payment processing and recurring billing.',
  },
  {
    question: 'Can I accept payments through Free Invoice Kit?',
    answer:
      'Online payment collection is coming soon in Free Invoice Kit Pro. For now, Free Invoice Kit focuses on creating and sharing professional PDF invoices. You can add your bank details or payment instructions in the invoice notes.',
  },
  {
    question: 'Is Free Invoice Kit really free?',
    answer:
      'Yes. The core invoicing features (create, generate PDF, share on WhatsApp, download, email) are free forever. Free Invoice Kit Pro (coming soon) will offer premium features like watermark removal, custom branding, and recurring invoices.',
  },
  {
    question: 'Can I switch from Stripe Invoicing to Free Invoice Kit?',
    answer:
      'Yes. There is nothing to migrate — just open Free Invoice Kit and start creating invoices. Your Stripe invoicing history stays in Stripe. Free Invoice Kit is a standalone tool.',
  },
];

export default function StripeInvoiceAlternativePage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            The Free <span className="text-primary">Stripe Invoice Alternative</span>
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
            Need invoicing without the Stripe fees, signup process, and complexity? Free Invoice Kit
            creates professional PDF invoices in 30 seconds — free, no account needed.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/create">
                Create a Free Invoice
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Free Invoice Kit vs Stripe Invoicing
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-muted-foreground pb-3 font-medium">Feature</th>
                  <th className="text-primary pb-3 font-semibold">Free Invoice Kit</th>
                  <th className="text-muted-foreground pb-3 font-medium">Stripe Invoicing</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <td className="py-3 font-medium">{row.feature}</td>
                    <td className="py-3">
                      <span className="flex items-center gap-1.5">
                        {row.freeInvoiceKit.includes('Coming') ? (
                          <Clock className="text-muted-foreground size-4" />
                        ) : (
                          <CheckCircle2 className="size-4 text-green-600" />
                        )}
                        {row.freeInvoiceKit}
                      </span>
                    </td>
                    <td className="text-muted-foreground py-3">
                      <span className="flex items-center gap-1.5">
                        {row.stripe === 'Not available' ? (
                          <XCircle className="size-4 text-red-400" />
                        ) : (
                          <CheckCircle2 className="text-muted-foreground size-4" />
                        )}
                        {row.stripe}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why switch */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why Freelancers Choose Free Invoice Kit
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {reasons.map((reason) => (
              <Card key={reason.title} className="hover:ring-primary/20 transition-colors">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 mb-4 inline-flex rounded-full p-3">
                    <reason.icon className="text-primary size-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Try Free Invoice Kit Free — No Signup Needed
          </h2>
          <p className="text-muted-foreground mt-4">
            Create your first invoice in 30 seconds. No fees. No strings attached.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/create">
                Create Your First Invoice
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <Footer />
    </div>
  );
}
```

**Step 2: Add to sitemap**

In `src/app/sitemap.ts`, add:

```typescript
{
  url: `${baseUrl}/stripe-invoice-alternative`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
},
```

**Step 3: Verify**

```bash
pnpm build
```

**Step 4: Commit**

```bash
git add src/app/stripe-invoice-alternative/page.tsx src/app/sitemap.ts
git commit -m "feat: add SEO landing page for Stripe invoice alternative"
```

---

## Task 11: Mobile Responsiveness Polish

**Files:**

- Modify: `src/app/create/page.tsx` (line items table overflow)
- Modify: `src/components/invoice-preview/invoice-preview.tsx` (mobile scaling)

This task addresses known mobile UX issues from the Sprint 1 design spec.

**Step 1: Add horizontal scroll to line items on mobile**

In `src/app/create/page.tsx`, find the line items section. Wrap the line items grid in a horizontally scrollable container for small screens:

```tsx
<div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
  {/* existing line items grid/table */}
</div>
```

This allows the 5-column line items grid to scroll horizontally on small screens without breaking the card layout.

**Step 2: Ensure touch targets are at least 44x44px**

Review all interactive elements on the create page. The delete button on line items is the most likely offender. Ensure it has adequate size:

```tsx
<Button
  variant="ghost"
  size="icon"
  className="size-10 shrink-0" // 40px minimum, padded to ~44px touch target
  onClick={() => removeLineItem(item.id)}
  disabled={invoice.lineItems.length <= 1}
>
  <Trash2 className="size-4" />
</Button>
```

If `size-10` (40px) is already set, leave it. If it's smaller (e.g., `size-8` = 32px), increase it.

**Step 3: Verify the preview panel padding on mobile sheet**

In `src/components/invoice-preview/invoice-preview.tsx` or wherever the mobile Sheet renders, ensure the preview content has adequate padding inside the sheet:

```tsx
<SheetContent side="bottom" className="h-[85vh] overflow-y-auto p-4">
  {/* invoice preview */}
</SheetContent>
```

**Step 4: Test manually**

```bash
pnpm dev
```

Test at these viewport widths in Chrome DevTools:

- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad)
- 1024px (small laptop)

Check:

- Line items table doesn't break layout
- All buttons are tappable
- Text is readable without zooming
- Preview sheet opens and scrolls correctly on mobile viewports
- Landing page sections stack correctly

**Step 5: Commit**

```bash
git add src/app/create/page.tsx src/components/invoice-preview/invoice-preview.tsx
git commit -m "fix: improve mobile responsiveness for line items and touch targets"
```

---

## Task 12: Final Build Verification + Sprint Commit

**Files:**

- None (verification only)

**Step 1: Run full build**

```bash
pnpm build
```

Must pass with no errors. Warnings are acceptable if they're from dependencies.

**Step 2: Run lint**

```bash
pnpm lint
```

Must pass cleanly.

**Step 3: Run format check**

```bash
pnpm exec prettier --check .
```

If files need formatting:

```bash
pnpm exec prettier --write .
```

**Step 4: Verify all pages render**

Start the dev server and manually visit each page:

```bash
pnpm dev
```

- `http://localhost:3000/` — landing page with Pro waitlist teaser
- `http://localhost:3000/create` — invoice form with Pro banner + share buttons
- `http://localhost:3000/send-invoice-whatsapp` — SEO page (Sprint 2)
- `http://localhost:3000/free-invoice-maker-freelancers` — SEO page (Sprint 2)
- `http://localhost:3000/whatsapp-billing-uae` — SEO page (new)
- `http://localhost:3000/invoice-generator-pakistan` — SEO page (new)
- `http://localhost:3000/stripe-invoice-alternative` — SEO page (new)
- `http://localhost:3000/sitemap.xml` — should list all 7 pages

**Step 5: Verify PWA (production build)**

```bash
pnpm build && pnpm start
```

Open Chrome DevTools → Application:

- Manifest tab: no errors
- Service Workers tab: SW registered and active (production only)

**Step 6: Final commit (if any formatting/lint fixes)**

```bash
git add -A
git commit -m "feat: add Sprint 3 — WhatsApp sharing, PWA, Pro waitlist, SEO pages"
```

---

## Sprint 3 Milestone Checklist

- [x] "Send on WhatsApp" works via Web Share API on supported mobile browsers
- [x] Fallback (download + wa.me) works on desktop and unsupported browsers
- [x] "Download PDF" works
- [x] "Share via Email" opens mail client with pre-filled content
- [x] "Copy Caption" copies text to clipboard with toast confirmation
- [x] Invoice status updates to "sent" with timestamp and method in IndexedDB
- [x] Pro waitlist banner on `/create` — dismissable, remembers dismissal
- [x] Pro waitlist inline on landing page "Pro Coming Soon" section
- [x] Waitlist API: rate limiting, honeypot, duplicate check, disposable email block
- [ ] Emails appear in Supabase `pro_waitlist` table
- [x] App is installable as PWA (manifest + service worker)
- [x] Service worker caches static assets for offline support
- [x] SEO page live: `/whatsapp-billing-uae`
- [x] SEO page live: `/invoice-generator-pakistan`
- [x] SEO page live: `/stripe-invoice-alternative`
- [x] Sitemap includes all 7 pages
- [x] Mobile responsiveness improvements are implemented (line items scroll, touch targets, preview sheet)
- [x] `pnpm build` passes
- [x] `pnpm lint` passes
- [ ] Manual device verification for WhatsApp Web Share API completed
- [ ] Manual production PWA verification completed

## Manual Tasks (Not in This Plan — PM/QA Owned)

- [ ] Verify successful waitlist inserts in the real Supabase `pro_waitlist` table
- [ ] Verify duplicate, rate-limit, and honeypot behavior against the deployed `/api/waitlist`
- [ ] Verify PWA install prompt and offline fallback on real Android/iPhone devices
- [ ] PDF sharing compatibility test on 15 device/browser combos (Task 3.10 in Phase Plan)
- [ ] PDF quality audit in 7 viewers (Task 3.11 in Phase Plan)
- [ ] Record 30-second product demo GIF (Task 3.12 in Phase Plan)
- [ ] Create PWA icons (icon-192.png, icon-512.png, apple-touch-icon.png) from brand assets
- [ ] Submit updated sitemap to Google Search Console
- [ ] Request indexing for new pages via URL Inspection tool

---

## Manual Handoff

### Owner Checklist

1. Run final validation locally:
   ```bash
   corepack pnpm lint
   corepack pnpm exec tsc --noEmit
   corepack pnpm build
   ```
2. Start production mode locally:
   ```bash
   corepack pnpm start
   ```
3. Open `http://localhost:3000` and verify:
   - `/`
   - `/create`
   - `/send-invoice-whatsapp`
   - `/free-invoice-maker-freelancers`
   - `/whatsapp-billing-uae`
   - `/invoice-generator-pakistan`
   - `/stripe-invoice-alternative`
   - `/sitemap.xml`
4. In Chrome DevTools → Application:
   - confirm `manifest.json` loads
   - confirm the service worker is registered from `/serwist/sw.js`
   - switch offline mode on and confirm navigation falls back to `/offline`
5. In the deployed environment, verify `/api/waitlist` against real Supabase:
   - valid email insert
   - duplicate submission response
   - invalid email rejection
   - honeypot silent success
6. On real devices, verify:
   - WhatsApp file sharing on supported mobile browsers
   - desktop fallback behavior
   - email, copy-caption, and download actions
7. Replace placeholder PWA icons before launch if brand assets are available:
   - `public/icon-192.png`
   - `public/icon-512.png`
   - `public/apple-touch-icon.png`
8. Submit the sitemap and request indexing for the three Sprint 3 SEO pages.

### Handoff Notes

- The implemented PWA stack uses `@serwist/turbopack`, not `@serwist/next`, because this project builds on Next.js 16 with Turbopack.
- The service worker is route-served from `/serwist/sw.js`, not written directly into `public/`.
- Build validation may fail inside WSL if remote Google Fonts cannot be fetched; validate from Windows when necessary.
- Placeholder SVG icon support is sufficient for engineering verification, but not ideal for production install UX.

---

## File Map Summary

### New files created in Sprint 3:

```
src/
  lib/
    share.ts                          # Sharing utilities (WhatsApp, download, email, copy)
  components/
    pro-waitlist-banner.tsx           # Pro waitlist banner + inline form
    providers/
      serwist-provider.tsx            # Production SW registration wrapper
  app/
    api/
      waitlist/
        route.ts                      # Pro waitlist API (Supabase insert)
    sw.ts                             # Serwist service worker entry
    serwist/
      [path]/
        route.ts                      # Route handler serving the bundled SW
    offline/
      page.tsx                        # Offline fallback page
    whatsapp-billing-uae/
      page.tsx                        # SEO landing page
    invoice-generator-pakistan/
      page.tsx                        # SEO landing page
    stripe-invoice-alternative/
      page.tsx                        # SEO landing page
public/
  manifest.json                       # PWA manifest
  icon.svg                            # Placeholder PWA icon
```

### Existing files modified in Sprint 3:

```
src/types/invoice.ts                  # Add sentAt, sentVia fields
src/app/create/page.tsx               # Wire share buttons + add Pro banner
src/app/page.tsx                      # Add Pro waitlist inline to landing page
src/app/layout.tsx                    # PWA metadata + provider registration
src/app/sitemap.ts                    # Add 3 new SEO pages
src/app/api/geo/route.ts             # Return country code for waitlist
next.config.ts                        # Serwist Turbopack integration
package.json / pnpm-lock.yaml         # @serwist/turbopack, serwist, esbuild dependencies
```

---

## WSL Environment Notes

If developing in a WSL (Windows Subsystem for Linux) environment, the project lives on a Windows drive. Use the mounted path and `corepack` to ensure the correct `pnpm` version:

```bash
cd /mnt/d/quikcbill-project/quickbill
```

All `pnpm` commands throughout this plan should be prefixed with `corepack`:

| This plan says                 | In WSL, run instead                     |
| ------------------------------ | --------------------------------------- |
| `pnpm install`                 | `corepack pnpm install`                 |
| `pnpm build`                   | `corepack pnpm build`                   |
| `pnpm lint`                    | `corepack pnpm lint`                    |
| `pnpm dev`                     | `corepack pnpm dev`                     |
| `pnpm start`                   | `corepack pnpm start`                   |
| `pnpm add <pkg>`               | `corepack pnpm add <pkg>`               |
| `pnpm exec prettier --write .` | `corepack pnpm exec prettier --write .` |

General rule: replace `pnpm` with `corepack pnpm` for any command in this plan.

---

## QA / Post-Sprint Changes

The following fixes were applied during QA after the initial Sprint 3 implementation. All changes are committed to the `develop` branch.

### 1. WhatsApp Share on Desktop — WhatsApp Web URL

**File:** `src/lib/share.ts`

The desktop fallback was using `wa.me/?text=` which tries to launch the native WhatsApp desktop app (and fails on machines without it). Changed the URL to `https://web.whatsapp.com/send?text=` so the fallback always opens WhatsApp Web directly in a new browser tab.

### 2. Platform-Aware Sharing — Windows Desktop Detection

**File:** `src/lib/share.ts`

Added an `isWindowsDesktop()` helper that checks the user agent for Windows. In `shareOnWhatsApp()`, Windows desktop now skips the Web Share API entirely and goes straight to the WhatsApp Web fallback, preserving the user gesture required for `window.open`. Mac and mobile devices continue to use the native Web Share API with file attachment where supported.

### 3. Download Button Fix — Blob Object URL

**File:** `src/lib/share.ts`

`downloadFile()` was passing the remote PDF URL directly as `link.href`, causing browsers to navigate to the URL instead of downloading the file. Fixed by fetching the PDF as a blob first and creating a local `URL.createObjectURL()` before triggering the anchor click. The object URL is revoked after the click.

### 4. Status Block Removed from PDF

**File:** `src/components/pdf/invoice-document.tsx`

The "Status / Draft" card was rendering inside the PDF output. This was placeholder content that should never appear in a client-facing document. The card has been removed from the PDF template.

### 5. Duplicate Key Warnings Fixed

**File:** `src/components/invoice-preview/invoice-preview.tsx` (lines 61 and 88)

`businessLines.map((line) => ...)` and `clientLines.map((line) => ...)` were using the line value as the React `key`. When two fields share the same value (e.g., two blank lines) this produces duplicate key warnings. Changed both to use the array index: `(line, i) => ... key={i}`.

### 6. Business Info localStorage Persistence

**File:** `src/app/create/page.tsx`

Added Save / Edit / Clear controls to the Business Info card. Business info is stored in `localStorage` under the key `freeinvoicekit_business_info` and auto-populated on page load. Fields are disabled in saved state; Edit re-enables them for changes; Clear wipes the stored data and resets the fields. This eliminates the need to re-enter business details on every visit.

### 7. Discount Changed to Percentage

**Files:** `src/types/invoice.ts`, `src/app/create/page.tsx`, `src/components/invoice-preview/invoice-preview.tsx`, `src/components/pdf/invoice-document.tsx`

The `discount` field was previously treated as an absolute amount. It is now a percentage (0–100). A derived `discountAmount` field was added to `InvoiceData` and the `useInvoice` hook. The form label is now "Discount (%)", the calculation is `discountAmount = subtotal * (discount / 100)`, and all display locations — form summary, live preview, and PDF — show "Discount (X%)" alongside the computed currency amount.

### 8. Landing Page Mobile Fix — Hero Card Padding

**File:** `src/app/page.tsx`

The hero invoice preview card's outer, middle, and inner wrapper `div`s had full desktop padding applied at all breakpoints, which pushed the card to the right and wasted space on narrow screens. Reduced padding to `p-0` / `p-2` / `p-3` / `p-4` on mobile with `sm:` breakpoints restoring the full decorative border padding on desktop. The card now uses the full available width on mobile viewports.
