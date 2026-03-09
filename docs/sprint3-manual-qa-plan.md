# Sprint 3 Manual QA & Launch Plan

All engineering work for Sprint 3 is merged to `develop`. This document covers every
manual task required before promoting to `main` and going live.

---

## 1. Supabase — Waitlist Table Setup

The waitlist API at `POST /api/waitlist` writes to a table called `pro_waitlist` in
Supabase. The table does not auto-create; you must create it manually.

### 1a. Create the table

Go to your Supabase project → **Table Editor** → **New table**.

| Column   | Type        | Notes                              |
|----------|-------------|------------------------------------|
| id       | uuid         | Primary key, default `gen_random_uuid()` |
| email    | text         | Unique constraint required (`23505` duplicate handling is in the API) |
| source   | text         | Nullable — e.g. `banner`, `homepage` |
| ip       | text         | Nullable                           |
| country  | text         | Nullable                           |
| created_at | timestamptz | Default `now()`                  |

SQL shortcut — run in **SQL Editor**:

```sql
create table if not exists public.pro_waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  source      text,
  ip          text,
  country     text,
  created_at  timestamptz not null default now()
);

-- Restrict direct reads to service-role only (API uses SUPABASE_SECRET_KEY)
alter table public.pro_waitlist enable row level security;
```

### 1b. Get your API keys

Go to **Project Settings → API**:

- `NEXT_PUBLIC_SUPABASE_URL` — the project URL (e.g. `https://xyz.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — the `anon` public key
- `SUPABASE_SECRET_KEY` — the `service_role` secret key (the waitlist API uses this)

### 1c. Create `.env.local`

Create the file at the project root (it is gitignored):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SECRET_KEY=your-service-role-key
NEXT_PUBLIC_POSTHOG_KEY=             # optional, leave blank if not using PostHog
NEXT_PUBLIC_POSTHOG_HOST=            # optional
```

### 1d. Verify the API locally

Start the dev server:

```bash
pnpm dev
```

Submit a test email via the waitlist banner on the homepage, then check **Table Editor →
pro_waitlist** in Supabase to confirm a row was inserted.

Also test duplicate submission — a second POST with the same email should return
`{ success: true }` without inserting a duplicate row.

---

## 2. PWA — Install & Offline Verification

### 2a. Build and serve production locally

The service worker only registers in a production build:

```bash
pnpm build
pnpm start
```

### 2b. Test PWA install prompt

Open `http://localhost:3000` in **Chrome** (desktop or Android):

- Chrome address bar should show an **Install** icon (plus/download icon on the right).
- Click it and confirm the app installs to your desktop or home screen.
- Launch the installed app — it should open `/create` in standalone mode (no browser chrome).

If the install prompt does not appear:
- Open DevTools → **Application → Manifest** — verify no manifest errors.
- Check **Application → Service Workers** — confirm `sw.js` is registered and active.

### 2c. Test offline fallback

With the PWA installed and the app previously loaded:

1. In DevTools → **Network** tab → check **Offline**.
2. Navigate to `http://localhost:3000/create`.
3. The app should load from cache (Serwist precache).
4. Navigate to a route that was never visited (e.g. `/nonexistent`).
5. You should see the `/offline` fallback page.

### 2d. Test on a real Android device

Connect Android phone via USB or use the same Wi-Fi:

```bash
# Find your local IP
ipconfig   # Windows
```

Open `http://<your-local-ip>:3000` in Chrome on Android:

- Three-dot menu → **Add to Home screen**.
- Open from home screen — verify it opens in standalone mode.
- Enable airplane mode, re-open the app — `/create` should load from cache.

### 2e. Manifest icon check

The manifest currently uses `/icon.svg` which covers all sizes via `"sizes": "any"`.
This works in Chrome but some Android launchers require raster PNGs. If the home screen
icon appears blank or generic:

- Add `public/icon-192.png` (192×192 px) and `public/icon-512.png` (512×512 px).
- Update `public/manifest.json` to include:

```json
{ "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
{ "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
```

Free tool to generate all sizes from an SVG: https://maskable.app/editor

---

## 3. WhatsApp Sharing — Real Device QA

The share logic in `src/lib/share.ts` has three paths:

| Device            | Behavior                                                              |
|-------------------|-----------------------------------------------------------------------|
| Android / iOS     | Native Web Share API with PDF file attachment → user picks WhatsApp  |
| Mac               | Native Web Share API (Chrome/Edge on Mac support file sharing)        |
| Windows desktop   | Opens WhatsApp Web with pre-filled caption + auto-downloads the PDF  |

### 3a. Android test

1. Open the app in Chrome on Android (production build or deployed URL).
2. Fill in a test invoice and tap **Generate PDF**.
3. Tap **Share on WhatsApp**.
4. The native share sheet should appear with the PDF attached.
5. Select WhatsApp → pick a contact → verify the PDF and caption arrive correctly.

### 3b. iOS test

Same as Android, but use Safari on iPhone (Web Share API with files is supported in
Safari 15.1+). Verify the PDF appears in the share sheet and can be sent via WhatsApp.

### 3c. Windows desktop test

1. Open the app in Chrome on Windows.
2. Generate a PDF and tap **Share on WhatsApp**.
3. WhatsApp Web should open in a new tab with the caption pre-filled.
4. The PDF should auto-download to your Downloads folder.
5. Manually attach the downloaded PDF in WhatsApp Web and send.

### 3d. Edge cases to check

- Invoice with no client email — email share should open `mailto:` with blank recipient.
- Copy caption — paste into a text field to confirm the text is correct.
- Download PDF — confirm the file is named `invoice-<id>.pdf` and opens correctly.

---

## 4. SEO — Sitemap Submission & Indexing

### 4a. Verify the sitemap

After deploying to production, open:

```
https://your-domain.com/sitemap.xml
```

Confirm all pages are listed (10+ routes after Sprint 4 and blog additions):
- `/`
- `/create`
- `/history`
- `/blog`
- `/blog/send-invoice-whatsapp-30-seconds`
- `/invoice-generator-pakistan`
- `/whatsapp-billing-uae`
- `/stripe-invoice-alternative`
- `/send-invoice-whatsapp`
- `/free-invoice-maker-freelancers`

### 4b. Submit to Google Search Console

1. Go to https://search.google.com/search-console
2. Add your property (domain or URL prefix).
3. Verify ownership (DNS TXT record is easiest on Vercel — add via your DNS provider).
4. Go to **Sitemaps** → enter `sitemap.xml` → click **Submit**.
5. Check back in 24–48 hours for indexing status.

### 4c. Request indexing for priority pages

In Search Console → **URL Inspection**:

- Paste each URL → click **Request Indexing**.
- Start with `/`, `/create`, and `/invoice-generator-pakistan`.

### 4d. Submit to Bing Webmaster Tools (optional but recommended for Pakistan/UAE traffic)

1. Go to https://www.bing.com/webmasters
2. Add your site and verify ownership.
3. Submit your sitemap URL.

---

## 5. App Icons & Launch Assets

The current `public/icon.svg` is a placeholder. Before launch:

1. Design or export your final logo as an SVG.
2. Replace `public/icon.svg` with the final version.
3. Generate PNG sizes using https://maskable.app/editor or https://realfavicongenerator.net
4. Add to `public/`: `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180×180).
5. Update `public/manifest.json` icons array (see section 2e above).
6. Add to `src/app/layout.tsx` `<head>`:

```tsx
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

---

## 6. Pre-Launch Checklist

Run these before merging `develop` → `main`:

```bash
pnpm lint          # must pass with 0 errors
pnpm exec tsc --noEmit   # must pass with 0 type errors
pnpm build         # must complete successfully
```

Then verify manually:

- [ ] `.env.local` set with real Supabase keys
- [ ] `pro_waitlist` table exists in Supabase with RLS enabled
- [ ] Waitlist form submits and row appears in Supabase
- [ ] Duplicate email returns success without duplicate row
- [ ] PWA installs from Chrome (desktop and/or Android)
- [ ] Offline fallback page shows when network is off
- [ ] WhatsApp sharing tested on real Android device
- [ ] PDF downloads with correct filename
- [ ] Email share opens `mailto:` correctly
- [ ] Copy caption copies correct text
- [ ] `/sitemap.xml` returns all expected URLs (10+ after Sprint 4)
- [ ] Sitemap submitted to Google Search Console
- [ ] Final app icon in place (not placeholder SVG)

---

## 7. Deploy to Production

The project is configured for Vercel. After checklist above is complete:

```bash
# Merge develop → main
git checkout main
git merge develop
git push origin main
```

Then in Vercel dashboard:
- Add all `.env.local` values as **Environment Variables** (Production environment).
- Trigger a deployment if it does not auto-deploy.
- After deploy, verify the production URL for all items in section 6 checklist.
