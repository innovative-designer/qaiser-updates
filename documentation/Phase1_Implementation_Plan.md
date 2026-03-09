# QuickBill — Phase 1: The Free Invoicer + Viral Loop

## Detailed Implementation Plan (Weeks 1–7 / Days 1–42)

**Document Version:** 1.1
**Date:** March 8, 2026
**Audience:** Junior developers, project leads, and non-technical team members
**Purpose:** Step-by-step implementation guide with every task, subtask, dependency, and expected outcome defined clearly enough for handoff.

---

## Table of Contents

1. [Overview & Goals](#1-overview--goals)
2. [Tech Stack & Tools Reference](#2-tech-stack--tools-reference)
3. [Environment & Tooling Prerequisites](#3-environment--tooling-prerequisites)
4. [Phase 0 — Foundation (Days 1–5)](#4-phase-0--foundation-days-15)
5. [Sprint 1 — Invoice Creation Form + Landing Page (Days 6–14)](#5-sprint-1--invoice-creation-form--landing-page-days-614)
6. [Sprint 2 — PDF Generation + Watermark + Storage (Days 15–23)](#6-sprint-2--pdf-generation--watermark--storage-days-1523)
7. [Sprint 3 — WhatsApp Sharing + PWA + Traffic Push (Days 24–35)](#7-sprint-3--whatsapp-sharing--pwa--traffic-push-days-2435)
8. [Sprint 4 — Directory Blitz + Polish + Soft Launch (Days 36–42)](#8-sprint-4--directory-blitz--polish--soft-launch-days-3642)
9. [Task Dependency Graph](#9-task-dependency-graph)
10. [Manual / Non-Automatable Actions Checklist](#10-manual--non-automatable-actions-checklist)
11. [Definition of Done (DoD) per Sprint](#11-definition-of-done-dod-per-sprint)
12. [Risk & Blockers Log](#12-risk--blockers-log)

---

## 1. Overview & Goals

### What We Are Building

A fully functional, **no-signup-required** Progressive Web App (PWA) that lets any user:

1. Fill out an invoice form (business info, client info, line items, tax, discount, notes, due date)
2. Generate a professional PDF with a branded QuickBill watermark in the footer
3. Share that PDF directly as a WhatsApp attachment (or download / email it)
4. Save up to 10 invoices locally in the browser (IndexedDB)

### What We Are NOT Building in Phase 1

- No user accounts / authentication
- No cloud database storage of invoices (IndexedDB only)
- No Stripe / payment processing
- No dashboard / client management
- No recurring invoices

### Phase 1 Success Criteria

| Metric                                              | Target                  |
| --------------------------------------------------- | ----------------------- |
| A user can create + share a PDF invoice on WhatsApp | < 30 seconds, no signup |
| Branded watermark on every PDF                      | 100% of generated PDFs  |
| SEO landing pages indexed by Google                 | 5 pages                 |
| Listed on startup directories                       | 10+ directories         |
| Blog posts published                                | 1                       |
| PWA installable on mobile                           | Yes                     |
| Lighthouse PWA score                                | > 90                    |
| PDF file size                                       | < 500KB                 |

---

## 2. Tech Stack & Tools Reference

This section is a lookup table. Refer back to it when setting up each component.

| Layer               | Technology              | Version              | Purpose                             | Documentation                            |
| ------------------- | ----------------------- | -------------------- | ----------------------------------- | ---------------------------------------- |
| **Framework**       | Next.js                 | 16.x (App Router)    | Full-stack React framework with SSR | https://nextjs.org/docs                  |
| **Language**        | TypeScript              | 5.x                  | Type safety                         | https://www.typescriptlang.org/docs      |
| **Styling**         | Tailwind CSS            | 4.x                  | Utility-first CSS                   | https://tailwindcss.com/docs             |
| **UI Components**   | shadcn/ui               | latest               | Pre-built accessible components     | https://ui.shadcn.com                    |
| **PDF Generation**  | @react-pdf/renderer     | latest               | Server-side PDF rendering           | https://react-pdf.org                    |
| **Local Storage**   | idb (IndexedDB wrapper) | latest               | Client-side invoice persistence     | https://github.com/nicolo-ribaudo/idb    |
| **ID Generation**   | nanoid                  | latest               | Short unique invoice IDs            | https://github.com/ai/nanoid             |
| **IP Geolocation**  | ipapi.co                | free API             | Country/currency auto-detection     | https://ipapi.co/api                     |
| **Hosting**         | Vercel                  | Hobby tier (free)    | Deployment + CDN + serverless       | https://vercel.com/docs                  |
| **DNS / CDN**       | Cloudflare              | Free tier            | DNS, SSL, DDoS protection           | https://developers.cloudflare.com        |
| **Analytics**       | PostHog                 | Cloud free tier      | Product analytics + session replays | https://posthog.com/docs                 |
| **SEO**             | Google Search Console   | Free                 | Indexing + keyword tracking         | https://search.google.com/search-console |
| **Code Quality**    | ESLint + Prettier       | latest               | Linting + formatting                | —                                        |
| **Version Control** | Git + GitHub            | —                    | Source control                      | —                                        |
| **Package Manager** | pnpm                    | latest (recommended) | Fast, disk-efficient                | https://pnpm.io                          |

---

## 3. Environment & Tooling Prerequisites

### 3.1 Developer Machine Setup

Every developer on the team needs the following installed **before** starting any tasks.

| Tool               | Minimum Version | Install Command / Link                                                |
| ------------------ | --------------- | --------------------------------------------------------------------- |
| Node.js            | 20.x LTS        | https://nodejs.org or `nvm install 20`                                |
| pnpm               | 9.x             | `npm install -g pnpm`                                                 |
| Git                | 2.40+           | https://git-scm.com                                                   |
| VS Code            | Latest          | https://code.visualstudio.com                                         |
| VS Code Extensions | —               | ESLint, Prettier, Tailwind CSS IntelliSense, PostCSS Language Support |

### 3.2 Accounts Required (Team Lead / PM Must Create)

> **⚠️ MANUAL ACTION REQUIRED** — These cannot be automated by code. The PM or team lead must create these accounts before development begins.

| Account               | Who Creates    | Purpose                                                             | URL                                      | Notes                                                               |
| --------------------- | -------------- | ------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------- |
| GitHub Organization   | Team Lead      | Code repository                                                     | https://github.com                       | Create a repo named `quickbill`                                     |
| Vercel Account        | Team Lead      | Hosting & deployment                                                | https://vercel.com                       | Connect to GitHub repo                                              |
| Cloudflare Account    | Team Lead      | DNS management                                                      | https://cloudflare.com                   | —                                                                   |
| Domain Purchase       | PM / Team Lead | `www.freeinvoicekit.com` or similar                                          | Cloudflare Registrar or Namecheap        | Budget: ~$10–15/year                                                |
| Supabase Project      | Team Lead      | Storage bucket for PDFs (Phase 1 uses storage only, no auth/DB yet) | https://supabase.com                     | Free tier. Create a project, note the Project URL + publishable key |
| PostHog Account       | Team Lead      | Analytics                                                           | https://posthog.com                      | Cloud free tier. Get the project API key                            |
| Google Search Console | PM             | SEO indexing                                                        | https://search.google.com/search-console | Verify domain ownership via Cloudflare DNS TXT record               |
| Twitter/X Account     | PM             | Build-in-public                                                     | https://twitter.com                      | Handle: @quickbillapp (or closest available)                        |
| ipapi.co              | —              | Geolocation API                                                     | https://ipapi.co                         | No signup needed for free tier (1000 req/day)                       |

---

## 4. Phase 0 — Foundation (Days 1–5)

### Overview

Set up the project skeleton, deploy an empty app, configure all infrastructure, and start the build-in-public presence.

---

### Task 0.1 — Domain Purchase & DNS Configuration

| Field            | Value                                                                             |
| ---------------- | --------------------------------------------------------------------------------- |
| **Owner**        | PM / Team Lead                                                                    |
| **Type**         | ⚠️ MANUAL                                                                         |
| **Effort**       | 1 hour                                                                            |
| **Dependencies** | None                                                                              |
| **Outcome**      | `www.freeinvoicekit.com` (or chosen domain) is registered and DNS is managed by Cloudflare |

**Subtasks:**

1. Purchase domain on Cloudflare Registrar (or transfer nameservers to Cloudflare if purchased elsewhere)
2. Verify domain is active in Cloudflare dashboard
3. Enable "Always Use HTTPS" in Cloudflare SSL/TLS settings
4. Note the Cloudflare Zone ID and API token — needed for Vercel custom domain setup

---

### Task 0.2 — GitHub Repository Setup

| Field            | Value                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| **Owner**        | CTO / Senior Dev                                                                                      |
| **Type**         | Code + Manual                                                                                         |
| **Effort**       | 2 hours                                                                                               |
| **Dependencies** | None                                                                                                  |
| **Outcome**      | GitHub repo with Next.js 16 scaffolding, Tailwind, shadcn/ui, ESLint, Prettier, and branch protection |

**Subtasks:**

1. **Create the repository**

   ```bash
   # On GitHub: create repo "quickbill" (private, with README)
   git clone https://github.com/<org>/quickbill.git
   cd quickbill
   ```

2. **Scaffold Next.js 16 project**

   ```bash
   pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```

   - When prompted: use App Router = Yes, src/ directory = Yes, Turbopack = Yes

3. **Install core dependencies**

   ```bash
   pnpm add @react-pdf/renderer nanoid idb
   pnpm add -D prettier eslint-config-prettier
   ```

4. **Initialize shadcn/ui**

   ```bash
   pnpm dlx shadcn@latest init
   ```

   - Style: Default
   - Base color: Slate (or Neutral — team preference)
   - CSS variables: Yes

5. **Add commonly needed shadcn components**

   ```bash
   pnpm dlx shadcn@latest add button input label card select textarea table badge separator sheet dialog sonner
   ```

   - Use `sonner` for toast notifications because shadcn `toast` is deprecated.

6. **Configure Prettier**
   Create `.prettierrc` at project root:

   ```json
   {
     "semi": true,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5",
     "printWidth": 100,
     "plugins": ["prettier-plugin-tailwindcss"]
   }
   ```

   Install plugin:

   ```bash
   pnpm add -D prettier-plugin-tailwindcss
   ```

7. **Set up project folder structure**

   ```
   src/
   ├── app/
   │   ├── layout.tsx              # Root layout
   │   ├── page.tsx                # Landing page
   │   ├── create/
   │   │   └── page.tsx            # Invoice creation form
   │   ├── api/
   │   │   └── invoice/
   │   │       └── generate-pdf/
   │   │           └── route.ts    # PDF generation API route
   │   ├── send-invoice-whatsapp/
   │   │   └── page.tsx            # SEO landing page 1
   │   ├── free-invoice-maker-freelancers/
   │   │   └── page.tsx            # SEO landing page 2
   │   ├── whatsapp-billing-uae/
   │   │   └── page.tsx            # SEO landing page 3
   │   ├── invoice-generator-pakistan/
   │   │   └── page.tsx            # SEO landing page 4
   │   └── stripe-invoice-alternative/
   │       └── page.tsx            # SEO landing page 5
   ├── components/
   │   ├── ui/                     # shadcn components (auto-generated)
   │   ├── invoice-form/           # Invoice form components
   │   ├── invoice-preview/        # Live preview panel
   │   ├── pdf/                    # PDF template components
   │   ├── landing/                # Landing page sections
   │   └── shared/                 # Header, Footer, Logo, etc.
   ├── lib/
   │   ├── utils.ts                # shadcn utility (auto-generated)
   │   ├── db.ts                   # IndexedDB helper functions
   │   ├── pdf-generator.ts        # PDF generation logic
   │   ├── geolocation.ts          # IP-based country/currency detection
   │   ├── currencies.ts           # Currency list + formatting
   │   ├── share.ts                # Web Share API + fallback logic
   │   └── constants.ts            # App-wide constants
   ├── types/
   │   └── invoice.ts              # TypeScript types/interfaces
   └── hooks/
       ├── use-invoice-form.ts     # Form state management hook
       └── use-local-invoices.ts   # IndexedDB CRUD hook
   ```

8. **Configure branch protection** (⚠️ MANUAL on GitHub)
   - Protect `main` branch: require pull request reviews, require status checks
   - Create `develop` branch as the working branch

9. **Create initial commit and push**
   ```bash
   git add .
   git commit -m "chore: scaffold Next.js 16 project with Tailwind + shadcn/ui"
   git push origin main
   git checkout -b develop
   git push origin develop
   ```

---

### Task 0.3 — Vercel Deployment Setup

| Field            | Value                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **Owner**        | CTO / Senior Dev                                                                           |
| **Type**         | Manual (Vercel Dashboard)                                                                  |
| **Effort**       | 30 minutes                                                                                 |
| **Dependencies** | Task 0.1 (domain), Task 0.2 (repo)                                                         |
| **Outcome**      | App auto-deploys on every push to `main`. Preview deploys on PRs. Custom domain connected. |

**Subtasks:**

1. Log in to Vercel → Import the `quickbill` GitHub repo
2. Framework preset: Next.js (auto-detected)
3. Install command: `pnpm install`
4. Build command: `pnpm build`
5. Deploy — verify the default Next.js page loads at `*.vercel.app`
6. Go to Project Settings → Domains → Add `www.freeinvoicekit.com`
7. Vercel will provide DNS records (CNAME or A) — add these in Cloudflare DNS
8. Wait for SSL certificate provisioning (usually < 5 minutes)
9. Verify `https://www.freeinvoicekit.com` loads the app
10. Enable preview deployments for pull requests (on by default)

---

### Task 0.4 — Supabase Project Setup (Storage Only for Phase 1)

| Field            | Value                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------- |
| **Owner**        | CTO / Senior Dev                                                                        |
| **Type**         | Manual (Supabase Dashboard) + Code                                                      |
| **Effort**       | 1 hour                                                                                  |
| **Dependencies** | None                                                                                    |
| **Outcome**      | Supabase project created, storage bucket for PDFs configured, environment variables set |

**Subtasks:**

1. Go to https://supabase.com → Create new project (name: `quickbill`, region: closest to your primary users)
2. Note down:
   - Project URL: `https://xxxxx.supabase.co`
   - Publishable key: `sb_publishable_...` (safe for browser use)
   - Secret key: `sb_secret_...` (keep secret — server-side only)
   - If you only see `anon` / `service_role` in the dashboard, those are the legacy equivalents of publishable / secret.
3. Go to Storage → Create a new bucket named `invoices`
   - Public: **Yes** (PDFs need to be downloadable via URL)
   - File size limit: 5MB
   - Allowed MIME types: `application/pdf`
4. Set up storage policy: allow anonymous uploads to `invoices` bucket (since Phase 1 has no auth)

   ```sql
   -- In Supabase SQL editor, run:
   CREATE POLICY "Allow anonymous uploads" ON storage.objects
     FOR INSERT WITH CHECK (bucket_id = 'invoices');

   CREATE POLICY "Allow public reads" ON storage.objects
     FOR SELECT USING (bucket_id = 'invoices');
   ```

5. Create `.env.local` in the Next.js app root (the folder with `package.json`) (DO NOT commit this file):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   SUPABASE_SECRET_KEY=sb_secret_...
   ```
6. Add `.env.local` to `.gitignore` (should already be there from Next.js scaffolding)
7. Install Supabase client:
   ```bash
   pnpm add @supabase/supabase-js
   ```
8. Create `src/lib/supabase.ts`:

   ```typescript
   import { createClient } from '@supabase/supabase-js';

   // Client-side (browser) — uses publishable key
   export const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
   );

   // Server-side — uses secret key (API routes only)
   export const supabaseAdmin = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.SUPABASE_SECRET_KEY!
   );
   ```

9. Add environment variables in Vercel dashboard: Project Settings → Environment Variables → add all three keys

---

### Task 0.5 — Analytics Setup (PostHog)

| Field            | Value                                                           |
| ---------------- | --------------------------------------------------------------- |
| **Owner**        | Junior Dev                                                      |
| **Type**         | Code                                                            |
| **Effort**       | 1.5 hours                                                       |
| **Dependencies** | Task 0.2 (repo exists)                                          |
| **Outcome**      | PostHog tracks page views + custom events. Works in production. |

**Subtasks:**

**PostHog:**

1. Sign up at https://posthog.com → Create project → Get project API key
2. Install:
   ```bash
   pnpm add posthog-js
   ```
3. Create `src/lib/posthog.ts`:

   ```typescript
   import posthog from 'posthog-js';

   export function initPostHog() {
     if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
       posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
         api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
         person_profiles: 'identified_only',
         capture_pageview: true,
         capture_pageleave: true,
       });
     }
   }

   export { posthog };
   ```

4. Initialize PostHog in `src/app/layout.tsx` using a client component wrapper
5. Add env vars:
   ```env
   NEXT_PUBLIC_POSTHOG_KEY=phc_...
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```
6. Add these to Vercel environment variables as well

**Verification:**

- Deploy to Vercel → visit the site → check PostHog dashboard for a pageview event

---

### Task 0.6 — Google Search Console Setup

| Field            | Value                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| **Owner**        | PM                                                                     |
| **Type**         | ⚠️ MANUAL                                                              |
| **Effort**       | 30 minutes                                                             |
| **Dependencies** | Task 0.1 (domain active), Task 0.3 (site deployed)                     |
| **Outcome**      | Domain verified in Google Search Console, ready for sitemap submission |

**Subtasks:**

1. Go to https://search.google.com/search-console
2. Add property → Domain property → enter `www.freeinvoicekit.com`
3. Google provides a DNS TXT record → add it in Cloudflare DNS
4. Wait for verification (usually < 1 hour)
5. Once verified, the sitemap will be submitted later (Sprint 2, Task 2.8)

---

### Task 0.7 — Brand Assets

| Field            | Value                                                            |
| ---------------- | ---------------------------------------------------------------- |
| **Owner**        | PM / Designer                                                    |
| **Type**         | ⚠️ MANUAL (Design work)                                          |
| **Effort**       | 4–8 hours                                                        |
| **Dependencies** | None                                                             |
| **Outcome**      | Logo files, color palette, typography defined, favicon, OG image |

**Deliverables:**

1. **Logo** — SVG + PNG (512×512 for PWA icon, 192×192, 180×180 for Apple touch icon)
2. **Color palette** — Primary, secondary, accent, success, warning, error colors. Document as Tailwind config values.
3. **Typography** — Choose 1–2 Google Fonts (e.g., Inter for body, Cal Sans or similar for headings)
4. **Favicon** — `favicon.ico` (32×32), `icon.png` (512×512)
5. **OpenGraph image** — 1200×630 PNG for social sharing
6. **Watermark design** — The exact text/logo treatment for the PDF footer:
   _"Created with QuickBill — Free invoicing on WhatsApp → www.freeinvoicekit.com"_
   Include the QuickBill logo mark (small) alongside the text

**Where to place files:**

```
public/
├── favicon.ico
├── icon-192.png
├── icon-512.png
├── apple-touch-icon.png
├── og-image.png
└── logo.svg
```

---

### Task 0.8 — Twitter/X Account + First Post

| Field            | Value                                                               |
| ---------------- | ------------------------------------------------------------------- |
| **Owner**        | PM                                                                  |
| **Type**         | ⚠️ MANUAL                                                           |
| **Effort**       | 30 minutes                                                          |
| **Dependencies** | None                                                                |
| **Outcome**      | @quickbillapp account created, first build-in-public post published |

**Subtasks:**

1. Create Twitter/X account with handle `@quickbillapp` (or closest available)
2. Set profile photo (logo), header image, bio: "Free PDF invoices on WhatsApp. No signup. Building in public. 🚀"
3. Publish first post: "Day 1 of building QuickBill — a free tool to create PDF invoices and send them on WhatsApp in 30 seconds. No signup. No fees. Following the journey? #buildinpublic #indiehackers"

---

### Task 0.9 — Legal Documents

| Field            | Value                                                       |
| ---------------- | ----------------------------------------------------------- |
| **Owner**        | PM                                                          |
| **Type**         | ⚠️ MANUAL                                                   |
| **Effort**       | 2–3 hours                                                   |
| **Dependencies** | Task 0.1 (domain name known)                                |
| **Outcome**      | Privacy Policy, Terms of Service, Cookie Policy pages ready |

**Subtasks:**

1. Use a generator like https://www.iubenda.com or https://www.termly.io (free tier)
2. Generate Privacy Policy, Terms of Service, Cookie Policy
3. Create pages in the app:
   - `src/app/privacy/page.tsx`
   - `src/app/terms/page.tsx`
4. Link these from the footer of every page

---

### Task 0.10 — Stripe Atlas LLC Registration (Background)

| Field            | Value                                                                      |
| ---------------- | -------------------------------------------------------------------------- |
| **Owner**        | PM / Founder                                                               |
| **Type**         | ⚠️ MANUAL                                                                  |
| **Effort**       | 1–2 hours to start, 3–5 business days to complete                          |
| **Dependencies** | None                                                                       |
| **Outcome**      | US LLC registration initiated (needed later for Stripe Connect in Phase 4) |

**Important:** This is a background task. Do NOT build any Stripe integration. Just start the legal entity registration so it's ready when needed in Phase 4 (Weeks 13+).

**Subtasks:**

1. Go to https://stripe.com/atlas
2. Fill out application: company name, founder details, business description
3. Pay the $500 fee
4. Wait for incorporation (3–5 business days)
5. Once approved, you'll receive EIN and bank account — file these for later

---

### Phase 0 Milestone Checklist

- [ ] Domain purchased and DNS on Cloudflare
- [x] GitHub repo with Next.js 16 + Tailwind + shadcn/ui scaffolding
- [x] App deployed to Vercel (`*.vercel.app`)
- [ ] Custom domain connected (`www.freeinvoicekit.com`)
- [x] Supabase project with `invoices` storage bucket
- [x] PostHog tracking page views
- [ ] Google Search Console domain verified
- [ ] Brand assets created (logo, colors, fonts, watermark design)
- [ ] Twitter/X account live with first post
- [ ] Legal pages drafted
- [ ] Stripe Atlas application submitted (background)

---

## 5. Sprint 1 — Invoice Creation Form + Landing Page (Days 6–14)

### Overview

Build the core invoice creation form with real-time preview, and the SEO-optimized landing page. The form does NOT generate PDFs yet (that's Sprint 2) — it captures all invoice data and shows a live preview.

---

### Task 1.1 — Define TypeScript Types

| Field            | Value                                                       |
| ---------------- | ----------------------------------------------------------- |
| **Owner**        | Dev A                                                       |
| **Type**         | Code                                                        |
| **Effort**       | 1 hour                                                      |
| **Dependencies** | Task 0.2 (repo ready)                                       |
| **Outcome**      | All invoice-related types defined in `src/types/invoice.ts` |

**File: `src/types/invoice.ts`**

```typescript
export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number; // quantity * rate (computed)
}

export interface InvoiceData {
  id: string; // nanoid-generated short ID (8 chars)
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  lineItems: LineItem[];
  currency: string; // ISO 4217 code: 'USD', 'EUR', 'AED', 'PKR', etc.
  subtotal: number; // sum of all line item amounts
  taxRate: number; // percentage (e.g., 5 for 5%)
  taxAmount: number; // subtotal * taxRate / 100
  discount: number; // flat discount amount
  total: number; // subtotal + taxAmount - discount
  notes: string;
  dueDate: string; // ISO date string 'YYYY-MM-DD'
  createdAt: string; // ISO datetime string
  status: 'draft' | 'sent';
  pdfUrl?: string; // Supabase Storage URL (set after PDF generation)
}

export interface CurrencyInfo {
  code: string; // 'USD'
  symbol: string; // '$'
  name: string; // 'US Dollar'
  locale: string; // 'en-US' (for number formatting)
}
```

---

### Task 1.2 — Currency & Geolocation Utilities

| Field            | Value                                                                           |
| ---------------- | ------------------------------------------------------------------------------- |
| **Owner**        | Dev A                                                                           |
| **Type**         | Code                                                                            |
| **Effort**       | 3 hours                                                                         |
| **Dependencies** | Task 1.1                                                                        |
| **Outcome**      | Utility functions for currency list, formatting, and IP-based country detection |

**Subtasks:**

1. **Create `src/lib/currencies.ts`** — a map of 20+ supported currencies:

   ```typescript
   export const CURRENCIES: CurrencyInfo[] = [
     { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
     { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
     { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
     { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', locale: 'ar-AE' },
     { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', locale: 'ur-PK' },
     { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
     { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', locale: 'en-NG' },
     { code: 'ZAR', symbol: 'R', name: 'South African Rand', locale: 'en-ZA' },
     { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', locale: 'bn-BD' },
     { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
     { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
     { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', locale: 'ar-SA' },
     // ... add more as needed
   ];

   export function formatCurrency(amount: number, currencyCode: string): string {
     const currency = CURRENCIES.find((c) => c.code === currencyCode);
     return new Intl.NumberFormat(currency?.locale || 'en-US', {
       style: 'currency',
       currency: currencyCode,
     }).format(amount);
   }
   ```

2. **Create `src/lib/geolocation.ts`** — detect user country via IP:

   ```typescript
   interface GeoData {
     country_code: string;
     currency: string;
   }

   const COUNTRY_TO_CURRENCY: Record<string, string> = {
     US: 'USD',
     GB: 'GBP',
     DE: 'EUR',
     FR: 'EUR',
     AE: 'AED',
     PK: 'PKR',
     IN: 'INR',
     NG: 'NGN',
     ZA: 'ZAR',
     BD: 'BDT',
     CA: 'CAD',
     AU: 'AUD',
     SA: 'SAR',
     // extend as needed
   };

   export async function detectCurrency(): Promise<string> {
     try {
       const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
       const data: GeoData = await res.json();
       return COUNTRY_TO_CURRENCY[data.country_code] || data.currency || 'USD';
     } catch {
       return 'USD'; // fallback
     }
   }
   ```

---

### Task 1.3 — Invoice Form Component

| Field            | Value                                                      |
| ---------------- | ---------------------------------------------------------- |
| **Owner**        | Dev B                                                      |
| **Type**         | Code                                                       |
| **Effort**       | 3 days                                                     |
| **Dependencies** | Task 1.1, Task 1.2, Task 0.2 (shadcn components installed) |
| **Outcome**      | Fully functional invoice creation form at `/create` route  |

**Page:** `src/app/create/page.tsx`

**Subtasks:**

1. **Build the form layout** — use a two-column layout on desktop (form left, preview right), single column on mobile with a toggle button to switch between form and preview.

2. **Form sections** (top to bottom):
   - **Your Business Info** — Business Name (required), Email, Phone, Address (all text inputs)
   - **Client Info** — Client Name (required), Email, Phone, Company
   - **Line Items** — Dynamic table/list:
     - Columns: Description (text), Quantity (number, default 1), Rate (number), Amount (computed: qty × rate)
     - "Add Line Item" button at the bottom
     - "Remove" button (trash icon) on each row (minimum 1 row always visible)
     - Amount auto-calculates when quantity or rate changes
   - **Financial Summary** —
     - Subtotal (auto-computed: sum of all line item amounts) — read-only display
     - Tax Rate % (number input, default 0)
     - Tax Amount (auto-computed: subtotal × taxRate / 100) — read-only display
     - Discount (number input, flat amount, default 0)
     - **Total** (auto-computed: subtotal + tax - discount) — read-only display, bold/large
   - **Additional Details** —
     - Currency (select dropdown, populated from CURRENCIES list, default from geolocation)
     - Due Date (date picker)
     - Notes (textarea, optional)

3. **Form state management** — Create `src/hooks/use-invoice-form.ts`:
   - Use React `useState` or `useReducer` for form state
   - Auto-compute subtotal, tax amount, total on every change
   - Generate a unique `id` via `nanoid(8)` when the form mounts
   - Set `createdAt` to current ISO datetime
   - Set `status` to `'draft'`

4. **Form validation**:
   - Business Name: required
   - Client Name: required
   - At least 1 line item with description and rate > 0
   - Due Date: must be today or future
   - Show validation errors inline below each field (red text)

5. **Currency auto-detection on mount**:
   - Call `detectCurrency()` on component mount
   - Set the currency dropdown to the detected value
   - User can always override manually

6. **"Generate Invoice" button** at the bottom:
   - Disabled until form is valid
   - In Sprint 1, this button saves to IndexedDB and shows a success Sonner toast: "Invoice saved! PDF generation coming soon."
   - In Sprint 2, this button will trigger PDF generation

**UI Details:**

- Use shadcn `Input`, `Label`, `Button`, `Select`, `Textarea`, `Card`, `Separator`, `Badge`
- Mobile responsive: stack everything vertically, preview toggle at top
- Clean, professional look — no clutter

---

### Task 1.4 — Real-Time Invoice Preview Panel

| Field            | Value                                                                             |
| ---------------- | --------------------------------------------------------------------------------- |
| **Owner**        | Dev B                                                                             |
| **Type**         | Code                                                                              |
| **Effort**       | 2 days                                                                            |
| **Dependencies** | Task 1.3 (form state exists)                                                      |
| **Outcome**      | Live preview panel that updates as the user types, mimicking the final PDF layout |

**Component:** `src/components/invoice-preview/InvoicePreview.tsx`

**Subtasks:**

1. **Build the preview component** — accepts `InvoiceData` as props and renders a visual representation of the invoice that closely matches the final PDF layout:
   - Header: Business name, email, phone, address (left) + "INVOICE" label + invoice ID (right)
   - Bill To section: Client name, email, phone, company
   - Line Items table: Description | Qty | Rate | Amount
   - Totals: Subtotal, Tax, Discount, **Total**
   - Notes section (if provided)
   - Due Date badge
   - **Footer: Watermark text** — "Created with QuickBill — Free invoicing on WhatsApp → www.freeinvoicekit.com" in a muted color

2. **Styling** — use a white card with subtle shadow and border to look like a paper document. Scale down on mobile (80% width).

3. **Desktop layout** — preview is a sticky panel on the right side (40% width) that scrolls independently

4. **Mobile layout** — add a floating "Preview" toggle button (bottom right). Tapping it shows the preview in a full-screen sheet/modal (use shadcn `Sheet`).

5. **Real-time updates** — the preview re-renders instantly as the user types (it reads directly from the form state — no debouncing needed since it's just React state).

---

### Task 1.5 — IndexedDB Local Storage

| Field            | Value                                                                          |
| ---------------- | ------------------------------------------------------------------------------ |
| **Owner**        | Dev A                                                                          |
| **Type**         | Code                                                                           |
| **Effort**       | 1 day                                                                          |
| **Dependencies** | Task 1.1 (types defined)                                                       |
| **Outcome**      | Users can save up to 10 invoices locally in the browser. CRUD operations work. |

**Subtasks:**

1. **Create `src/lib/db.ts`** — IndexedDB wrapper using the `idb` library:

   ```typescript
   import { openDB, IDBPDatabase } from 'idb';
   import { InvoiceData } from '@/types/invoice';

   const DB_NAME = 'quickbill';
   const DB_VERSION = 1;
   const STORE_NAME = 'invoices';
   const MAX_INVOICES = 10;

   async function getDB(): Promise<IDBPDatabase> {
     return openDB(DB_NAME, DB_VERSION, {
       upgrade(db) {
         if (!db.objectStoreNames.contains(STORE_NAME)) {
           db.createObjectStore(STORE_NAME, { keyPath: 'id' });
         }
       },
     });
   }

   export async function saveInvoice(invoice: InvoiceData): Promise<void> {
     const db = await getDB();
     const count = await db.count(STORE_NAME);
     if (count >= MAX_INVOICES) {
       // Get oldest invoice and delete it
       const allInvoices = await db.getAll(STORE_NAME);
       allInvoices.sort(
         (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
       );
       await db.delete(STORE_NAME, allInvoices[0].id);
     }
     await db.put(STORE_NAME, invoice);
   }

   export async function getInvoice(id: string): Promise<InvoiceData | undefined> {
     const db = await getDB();
     return db.get(STORE_NAME, id);
   }

   export async function getAllInvoices(): Promise<InvoiceData[]> {
     const db = await getDB();
     const invoices = await db.getAll(STORE_NAME);
     return invoices.sort(
       (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
     );
   }

   export async function deleteInvoice(id: string): Promise<void> {
     const db = await getDB();
     await db.delete(STORE_NAME, id);
   }
   ```

2. **Create `src/hooks/use-local-invoices.ts`** — React hook for the above:
   - `invoices` — list of saved invoices
   - `saveInvoice(data)` — saves and refreshes list
   - `deleteInvoice(id)` — deletes and refreshes list
   - `loading` — boolean while IndexedDB loads

---

### Task 1.6 — Landing Page (Homepage)

| Field            | Value                                            |
| ---------------- | ------------------------------------------------ |
| **Owner**        | Dev C (or Dev B)                                 |
| **Type**         | Code                                             |
| **Effort**       | 1.5 days                                         |
| **Dependencies** | Task 0.7 (brand assets), Task 0.2 (shadcn ready) |
| **Outcome**      | Professional, SEO-optimized landing page at `/`  |

**Page:** `src/app/page.tsx` (server-rendered for SEO)

**Sections (top to bottom):**

1. **Header/Nav** — Logo (left), "Create Invoice" CTA button (right). Minimal, no hamburger menus yet.

2. **Hero Section**
   - Headline: "Send Professional Invoices on WhatsApp in 30 Seconds"
   - Subheadline: "Create a PDF invoice and share it directly on WhatsApp. No signup. No fees. Free forever."
   - CTA button: "Create Your First Invoice →" (links to `/create`)
   - Demo GIF/image placeholder (actual GIF created in Sprint 3)

3. **How It Works** — 3-step visual:
   - Step 1: "Fill in your invoice details" (icon: form/clipboard)
   - Step 2: "Generate a professional PDF" (icon: document)
   - Step 3: "Share on WhatsApp in one tap" (icon: WhatsApp logo)

4. **Features Grid** — 4–6 feature cards:
   - "No Signup Required" — Start invoicing instantly
   - "Professional PDFs" — Clean, business-ready templates
   - "WhatsApp Native" — Send as attachment, not a link
   - "Works Offline" — PWA saves your invoices locally
   - "Auto Currency Detection" — Detects your country automatically
   - "100% Free" — No hidden fees, no credit card

5. **Social Proof Area** — placeholder for future testimonials. For now: "Join 0 freelancers already using QuickBill" (update the number as real users arrive — or hide until you have some)

6. **Pro Coming Soon Teaser** — a subtle banner:
   - "QuickBill Pro — Remove watermark, add your logo, auto-recurring invoices. Coming soon."
   - "Notify me" button → opens a small email input form
   - On submit, capture interest only as teaser UI during Sprint 1. The actual waitlist backend is implemented later in Sprint 3 using Supabase `pro_waitlist`.

7. **Footer** — Links: Privacy Policy, Terms of Service, Twitter/X, "Made with ❤️ by [founder name]"

**SEO Requirements (Critical):**

- Set metadata in `src/app/layout.tsx` and `src/app/page.tsx` using Next.js `metadata` export:
  ```typescript
  export const metadata: Metadata = {
    title: 'QuickBill — Free Invoice Maker for WhatsApp | Send PDF Invoices',
    description:
      'Create professional PDF invoices and send them on WhatsApp in 30 seconds. No signup required. Free forever.',
    openGraph: {
      title: 'QuickBill — Free Invoice Maker for WhatsApp',
      description:
        'Create and send professional PDF invoices on WhatsApp in 30 seconds. No signup. No fees.',
      images: ['/og-image.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'QuickBill — Free Invoice Maker for WhatsApp',
      description: 'Send professional PDF invoices on WhatsApp in 30 seconds.',
      images: ['/og-image.png'],
    },
  };
  ```
- Add JSON-LD structured data (SoftwareApplication schema) in the page `<head>`

---

### Task 1.7 — SEO Meta Tags & JSON-LD

| Field            | Value                                                              |
| ---------------- | ------------------------------------------------------------------ |
| **Owner**        | Dev A or Dev C                                                     |
| **Type**         | Code                                                               |
| **Effort**       | 3 hours                                                            |
| **Dependencies** | Task 1.6 (landing page exists)                                     |
| **Outcome**      | Proper meta tags on all pages, JSON-LD structured data on homepage |

**Subtasks:**

1. **Create a reusable JSON-LD component** `src/components/shared/JsonLd.tsx`:

   ```typescript
   export function SoftwareApplicationJsonLd() {
     const jsonLd = {
       '@context': 'https://schema.org',
       '@type': 'SoftwareApplication',
       name: 'QuickBill',
       applicationCategory: 'BusinessApplication',
       operatingSystem: 'Web',
       offers: {
         '@type': 'Offer',
         price: '0',
         priceCurrency: 'USD',
       },
       description: 'Free invoice maker for WhatsApp. Create PDF invoices and share them on WhatsApp in 30 seconds.',
       url: 'https://www.freeinvoicekit.com',
     };
     return (
       <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
       />
     );
   }
   ```

2. **Add `robots.txt`** — create `public/robots.txt`:

   ```
   User-agent: *
   Allow: /
   Sitemap: https://www.freeinvoicekit.com/sitemap.xml
   ```

3. **Create dynamic sitemap** — `src/app/sitemap.ts`:

   ```typescript
   import { MetadataRoute } from 'next';

   export default function sitemap(): MetadataRoute.Sitemap {
     const baseUrl = 'https://www.freeinvoicekit.com';
     return [
       { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
       {
         url: `${baseUrl}/create`,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.9,
       },
       {
         url: `${baseUrl}/send-invoice-whatsapp`,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.8,
       },
       {
         url: `${baseUrl}/free-invoice-maker-freelancers`,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.8,
       },
       // Add more SEO pages as they are built
     ];
   }
   ```

---

### Task 1.8 — Twitter/X Build-in-Public Posts (Week 2)

| Field            | Value                                                |
| ---------------- | ---------------------------------------------------- |
| **Owner**        | PM                                                   |
| **Type**         | ⚠️ MANUAL                                            |
| **Effort**       | 30 min/post, 3 posts this week                       |
| **Dependencies** | Task 0.8 (Twitter account exists)                    |
| **Outcome**      | 3 build-in-public posts with screenshots of progress |

**Post ideas:**

1. Screenshot of the invoice form UI — "The invoice form is taking shape. Clean, fast, no clutter. #buildinpublic"
2. Architecture decision post — "Why we chose PDF-direct sharing over links for WhatsApp invoicing. Thread 🧵"
3. Landing page preview — "Landing page is live at www.freeinvoicekit.com. Creating the first SEO content next. #buildinpublic"

---

### Sprint 1 Milestone Checklist

**Status update (2026-03-07):**

- Sprint 1 application code implemented on `develop`
- Validation completed: `tsc --noEmit` passed, `next build` passed manually, ESLint passed manually
- Product scope follows the approved Sprint 1 design doc: "Pro Coming Soon" is text-only in Sprint 1. The actual waitlist capture shipped later in Sprint 3.
- **QA completed (2026-03-07):** Playwright MCP ran all 12 test scenarios — **PASS**. Full results in `documentation/Playwright_local_test_handoff.md`.

- [x] Invoice creation form functional at `/create`
- [x] All form fields work: business info, client info, line items, tax, discount, notes, due date
- [x] Line items can be added/removed dynamically
- [x] Currency auto-detected on page load
- [x] Real-time preview panel updates as user types
- [x] Preview shows watermark footer
- [x] Invoices save to IndexedDB (up to 10)
- [x] Landing page live at `/` with all sections
- [x] SEO meta tags and JSON-LD on homepage
- [x] robots.txt and sitemap.xml generated
- [x] Form validation works (business name, client name, line items, due date)
- [x] Mobile preview sheet works
- [x] Save flow with Sonner toast confirmation works
- [x] IndexedDB persistence verified (survives reload)
- [x] "Pro Coming Soon" email capture works — **implemented in Sprint 3**
- [ ] 3 build-in-public tweets posted — **PM/marketing task**

**Non-blocking issues found during QA (fix in Sprint 2):**

1. Hydration mismatch on `/create` — nanoid element IDs differ server/client. Fix: use React `useId()`.
2. CORS errors from `ipapi.co` on localhost — currency falls back to USD. Fix: proxy via Next.js API route.

**Sprint 1 verdict: COMPLETE — ready for Sprint 2.**

---

## 6. Sprint 2 — PDF Generation + Watermark + Storage (Days 15–23)

### Overview

Build the server-side PDF generation engine, add the branded watermark, store PDFs in Supabase Storage, and build 2 SEO landing pages.

---

### Task 2.1 — PDF Template Design (React-PDF)

| Field            | Value                                                         |
| ---------------- | ------------------------------------------------------------- |
| **Owner**        | Dev B                                                         |
| **Type**         | Code                                                          |
| **Effort**       | 1.5 days                                                      |
| **Dependencies** | Task 1.1 (types), Task 0.7 (watermark design)                 |
| **Outcome**      | A React-PDF component that renders a professional invoice PDF |

**File:** `src/components/pdf/InvoiceDocument.tsx`

**Subtasks:**

1. **Create the PDF template** using `@react-pdf/renderer`:
   - This runs server-side only (in an API route). It uses React-PDF's own components (`Document`, `Page`, `View`, `Text`, `Image`, `StyleSheet`), NOT regular HTML/CSS.

2. **PDF layout structure:**

   ```
   ┌─────────────────────────────────────────┐
   │  [Business Name]          INVOICE       │
   │  [Email / Phone]          #[short-id]   │
   │  [Address]                Date: [date]  │
   │                           Due: [date]   │
   ├─────────────────────────────────────────┤
   │  BILL TO:                               │
   │  [Client Name]                          │
   │  [Client Email / Phone / Company]       │
   ├─────────────────────────────────────────┤
   │  Description    Qty    Rate    Amount   │
   │  ─────────────────────────────────────  │
   │  [item 1]       2      $50     $100     │
   │  [item 2]       1      $200    $200     │
   │  ...                                    │
   ├─────────────────────────────────────────┤
   │                      Subtotal:  $300    │
   │                      Tax (5%):  $15     │
   │                      Discount: -$10     │
   │                      ─────────────────  │
   │                      TOTAL:     $305    │
   ├─────────────────────────────────────────┤
   │  Notes: [notes text]                    │
   ├─────────────────────────────────────────┤
   │  [Reserved area for future QR code]     │
   │  "Pay online: coming soon"              │
   ├─────────────────────────────────────────┤
   │  ♦ Created with QuickBill               │
   │  Free invoicing on WhatsApp             │
   │  → www.freeinvoicekit.com                        │
   └─────────────────────────────────────────┘
   ```

3. **Font registration** — register a clean font (Inter or Helvetica). React-PDF ships Helvetica by default but custom fonts can be registered:

   ```typescript
   import { Font } from '@react-pdf/renderer';
   Font.register({
     family: 'Inter',
     src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
   });
   ```

4. **Color scheme** — use the brand colors from Task 0.7. Keep it professional: dark text on white background, primary color for headers and the total line.

5. **Watermark footer** — this is CRITICAL. The footer must appear on every page and contain:
   - QuickBill logo (small, embedded as base64 or loaded from public URL)
   - Text: "Created with QuickBill — Free invoicing on WhatsApp → www.freeinvoicekit.com"
   - Muted color (gray) so it's visible but not intrusive
   - This footer is the entire viral loop — do not skip it

6. **Future QR code placeholder** — leave a reserved area above the watermark footer. For now, show light gray text: "Online payment: coming soon". In Phase 4 this will show a QR code + payment URL.

---

### Task 2.2 — PDF Generation API Route

| Field            | Value                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------- |
| **Owner**        | Dev A                                                                                     |
| **Type**         | Code                                                                                      |
| **Effort**       | 2 days                                                                                    |
| **Dependencies** | Task 2.1 (PDF template), Task 0.4 (Supabase storage)                                      |
| **Outcome**      | API endpoint that accepts invoice data, generates PDF, stores it, and returns the PDF URL |

**File:** `src/app/api/invoice/generate-pdf/route.ts`

**Subtasks:**

1. **Create the API route**:

   ```typescript
   import { NextRequest, NextResponse } from 'next/server';
   import { renderToBuffer } from '@react-pdf/renderer';
   import { InvoiceDocument } from '@/components/pdf/InvoiceDocument';
   import { supabaseAdmin } from '@/lib/supabase';
   import { InvoiceData } from '@/types/invoice';

   export async function POST(request: NextRequest) {
     try {
       const invoiceData: InvoiceData = await request.json();

       // Validate required fields
       if (!invoiceData.businessName || !invoiceData.clientName || !invoiceData.lineItems?.length) {
         return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
       }

       // Generate PDF buffer
       const pdfBuffer = await renderToBuffer(
         <InvoiceDocument invoice={invoiceData} />
       );

       // Upload to Supabase Storage
       const fileName = `${invoiceData.id}.pdf`;
       const { data, error } = await supabaseAdmin.storage
         .from('invoices')
         .upload(fileName, pdfBuffer, {
           contentType: 'application/pdf',
           upsert: true,
         });

       if (error) throw error;

       // Get public URL
       const { data: urlData } = supabaseAdmin.storage
         .from('invoices')
         .getPublicUrl(fileName);

       return NextResponse.json({
         pdfUrl: urlData.publicUrl,
         invoiceId: invoiceData.id,
       });
     } catch (error) {
       console.error('PDF generation error:', error);
       return NextResponse.json(
         { error: 'Failed to generate PDF' },
         { status: 500 }
       );
     }
   }
   ```

2. **Wire up the form** — update the "Generate Invoice" button in the form:
   - On click: POST invoice data to `/api/invoice/generate-pdf`
   - Show a loading spinner ("Generating your invoice...")
   - On success: save the `pdfUrl` to the invoice object in IndexedDB
   - Navigate to a success / share page (or show share options inline)

3. **Error handling**:
   - Network errors → Sonner toast: "Failed to generate PDF. Please try again."
   - Server errors → log to console, show generic error message

4. **Performance considerations**:
   - PDF generation typically takes 1–3 seconds
   - Show a skeleton/progress indicator during generation
   - React-PDF `renderToBuffer` runs server-side only — it will NOT work client-side

---

### Task 2.3 — Invoice Short ID Generation

| Field            | Value                                                   |
| ---------------- | ------------------------------------------------------- |
| **Owner**        | Dev A                                                   |
| **Type**         | Code                                                    |
| **Effort**       | 1 hour                                                  |
| **Dependencies** | Task 1.1                                                |
| **Outcome**      | Every invoice gets a unique 8-character alphanumeric ID |

**Implementation:**

```typescript
// In src/lib/utils.ts or src/lib/constants.ts
import { nanoid } from 'nanoid';

export function generateInvoiceId(): string {
  return nanoid(8); // e.g., 'V1StGXR8'
}
```

This ID is:

- Used in the PDF filename: `V1StGXR8.pdf`
- Displayed on the PDF as the invoice number
- Used as the IndexedDB key
- Later used for internal dashboard URLs: `/inv/V1StGXR8`
- Later used for payment pages: `/pay/V1StGXR8`

---

### Task 2.4 — Connect Form to PDF Generation

| Field            | Value                                                             |
| ---------------- | ----------------------------------------------------------------- |
| **Owner**        | Dev B                                                             |
| **Type**         | Code                                                              |
| **Effort**       | 0.5 days                                                          |
| **Dependencies** | Task 2.2 (API route working), Task 1.3 (form working)             |
| **Outcome**      | Clicking "Generate Invoice" creates a PDF and shows share options |

**Subtasks:**

1. **Update the "Generate Invoice" button** flow:
   - Validate form → show validation errors if invalid
   - If valid: set loading state, call `POST /api/invoice/generate-pdf`
   - On success: update invoice in IndexedDB with `pdfUrl`
   - Show a success state with action buttons:
     - "Send on WhatsApp" (Sprint 3)
     - "Download PDF" (Sprint 3)
     - "Share via Email" (Sprint 3)
     - "Create Another Invoice"

2. **Create a success/share view** — either a new page (`/create/success?id=xxx`) or an inline state change on the form page. The success view should show:
   - A confirmation message: "Your invoice is ready! 🎉"
   - The invoice amount and client name
   - Share action buttons (later wired in Sprint 3)
   - A preview of the PDF (embed using `<iframe>` or `<object>` with the PDF URL)

---

### Task 2.5 — PDF Quality Assurance

| Field            | Value                                                              |
| ---------------- | ------------------------------------------------------------------ |
| **Owner**        | QA / Dev B                                                         |
| **Type**         | Testing                                                            |
| **Effort**       | 0.5 days                                                           |
| **Dependencies** | Task 2.2, Task 2.4                                                 |
| **Outcome**      | PDFs look correct, are < 500KB, and render properly in all viewers |

**Test cases:**

1. Generate a PDF with all fields filled → verify layout matches design
2. Generate a PDF with minimum fields (just business name, client name, 1 line item) → verify no layout breakage
3. Generate a PDF with 20+ line items → verify pagination works (items overflow to next page)
4. Generate a PDF with long text (200-char business name, 500-char notes) → verify text wraps correctly
5. Generate a PDF with non-Latin characters (Arabic for AED, Urdu for PKR, Bengali for BDT) → verify font rendering
6. Check file size → must be < 500KB for all cases
7. Open the PDF in: Chrome built-in viewer, Apple Preview, Adobe Reader, WhatsApp's PDF viewer (Android + iOS)
8. Verify watermark footer is visible and correctly formatted on every page

---

### Task 2.6 — SEO Landing Page: /send-invoice-whatsapp

| Field            | Value                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------- |
| **Owner**        | Dev C                                                                                         |
| **Type**         | Code                                                                                          |
| **Effort**       | 0.75 days                                                                                     |
| **Dependencies** | Task 0.2 (repo), Task 1.6 (shared components like header/footer)                              |
| **Outcome**      | Server-rendered SEO page targeting "how to send invoice on whatsapp" (3,600 monthly searches) |

**Page:** `src/app/send-invoice-whatsapp/page.tsx`

**Content structure:**

1. **H1:** "How to Send an Invoice on WhatsApp (Free, No App Required)"
2. **Intro paragraph** (100 words): Explain the problem — clients ignore email invoices, WhatsApp has 95%+ open rates
3. **Step-by-step guide** with screenshots/illustrations:
   - Step 1: Open QuickBill (no signup)
   - Step 2: Fill in your invoice details
   - Step 3: Click "Generate PDF"
   - Step 4: Tap "Send on WhatsApp" → PDF attachment lands in client's chat
4. **Why PDF, not a link?** — Short paragraph explaining trust and professionalism
5. **CTA:** "Create Your First WhatsApp Invoice Now →" (links to `/create`)
6. **FAQ section** (3–5 questions) — doubles as FAQ schema for rich results

**SEO metadata:**

```typescript
export const metadata: Metadata = {
  title: 'How to Send an Invoice on WhatsApp — Free PDF Invoice Maker | QuickBill',
  description:
    'Send professional PDF invoices on WhatsApp in 30 seconds. No signup needed. Free forever. Create, generate, and share invoices as WhatsApp attachments.',
  alternates: { canonical: 'https://www.freeinvoicekit.com/send-invoice-whatsapp' },
};
```

Add `FAQPage` JSON-LD schema for the FAQ section.

---

### Task 2.7 — SEO Landing Page: /free-invoice-maker-freelancers

| Field            | Value                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| **Owner**        | Dev C                                                                                            |
| **Type**         | Code                                                                                             |
| **Effort**       | 0.75 days                                                                                        |
| **Dependencies** | Same as Task 2.6                                                                                 |
| **Outcome**      | Server-rendered SEO page targeting "free invoice maker for freelancers" (2,400 monthly searches) |

**Page:** `src/app/free-invoice-maker-freelancers/page.tsx`

**Content:** Similar structure to Task 2.6 but angled towards freelancers specifically. Highlight:

- No monthly fees
- No signup required
- Professional templates
- WhatsApp sharing for fast payment
- Works on mobile (PWA)

---

### Task 2.8 — Sitemap Submission + Google Indexing

| Field            | Value                                                         |
| ---------------- | ------------------------------------------------------------- |
| **Owner**        | PM / Dev A                                                    |
| **Type**         | Code + ⚠️ MANUAL                                              |
| **Effort**       | 0.5 days                                                      |
| **Dependencies** | Task 0.6 (GSC verified), Task 2.6, Task 2.7 (SEO pages exist) |
| **Outcome**      | Sitemap submitted to Google, indexing requested for all pages |

**Subtasks:**

1. **Update `src/app/sitemap.ts`** to include the new SEO pages
2. **Deploy** to Vercel
3. **⚠️ MANUAL:** Go to Google Search Console → Sitemaps → Submit `https://www.freeinvoicekit.com/sitemap.xml`
4. **⚠️ MANUAL:** Use the URL Inspection tool to request indexing for each page individually:
   - `https://www.freeinvoicekit.com/`
   - `https://www.freeinvoicekit.com/create`
   - `https://www.freeinvoicekit.com/send-invoice-whatsapp`
   - `https://www.freeinvoicekit.com/free-invoice-maker-freelancers`

5. **Optional: Google Indexing API** — for faster indexing (< 24 hours):
   - Set up a service account in Google Cloud Console
   - Enable the Indexing API
   - Create an API route or script that calls the Indexing API for new pages
   - This is optional for Phase 1; manual URL inspection is sufficient

---

### Sprint 2 Milestone Checklist

- [ ] PDF generation works end-to-end (form → API → PDF → Supabase Storage)
- [ ] PDF template is professional and matches the design spec
- [ ] Watermark footer appears on every page of every PDF
- [ ] Future QR/payment area is reserved with placeholder text
- [ ] PDFs are < 500KB
- [ ] PDFs render correctly in Chrome, Safari, WhatsApp viewer, Adobe Reader
- [ ] Invoice short IDs are unique (8-char nanoid)
- [x] Success view shows PDF preview + share buttons (fully wired in Sprint 3)
- [ ] SEO page `/send-invoice-whatsapp` is live and server-rendered
- [ ] SEO page `/free-invoice-maker-freelancers` is live and server-rendered
- [ ] Sitemap submitted to Google Search Console
- [ ] Indexing requested for all pages

---

## 7. Sprint 3 — WhatsApp Sharing + PWA + Traffic Push (Days 24–35)

### Overview

Wire up the actual sharing mechanics (WhatsApp, download, email), make the app installable as a PWA, build 3 more SEO pages, and create the product demo GIF.

**Implementation status as of March 8, 2026:** Sprint 3 engineering work is implemented in the repo and the production build has been validated manually on Windows. The remaining work is manual QA, launch verification, real icon assets, and SEO/PM handoff tasks.

---

### Task 3.1 — "Send on WhatsApp" (Web Share API)

| Field            | Value                                                                          |
| ---------------- | ------------------------------------------------------------------------------ |
| **Owner**        | Dev A                                                                          |
| **Type**         | Code                                                                           |
| **Effort**       | 1 day                                                                          |
| **Dependencies** | Task 2.2 (PDFs can be generated and have a URL)                                |
| **Outcome**      | User taps "Send on WhatsApp" → native share sheet opens with PDF file attached |

**File:** `src/lib/share.ts`

**Implementation:**

```typescript
export async function shareOnWhatsApp(
  pdfUrl: string,
  clientName: string,
  amount: string,
  businessName: string,
  currency: string
): Promise<'shared' | 'fallback' | 'error'> {
  const caption = `Hi ${clientName}, please find attached your invoice for ${amount}. — ${businessName}`;

  try {
    // Fetch the PDF as a blob
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const file = new File([blob], 'invoice.pdf', { type: 'application/pdf' });

    // Check if Web Share API supports files
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: `Invoice for ${clientName}`,
        text: caption,
        files: [file],
      });
      return 'shared';
    } else {
      // Fallback: download PDF + open WhatsApp with caption
      return await fallbackShare(pdfUrl, caption);
    }
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      // User cancelled the share dialog — not an error
      return 'shared';
    }
    console.error('Share failed:', error);
    return await fallbackShare(pdfUrl, caption);
  }
}

async function fallbackShare(pdfUrl: string, caption: string): Promise<'fallback'> {
  // Step 1: Download the PDF
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'invoice.pdf';
  link.click();

  // Step 2: Open WhatsApp with pre-filled caption
  const encodedCaption = encodeURIComponent(caption + '\n\n(Please see the attached PDF invoice)');
  window.open(`https://wa.me/?text=${encodedCaption}`, '_blank');

  return 'fallback';
}
```

**UX Flow:**

1. User taps "Send on WhatsApp" button
2. **On supported devices** (most modern Android + iOS): native share sheet opens with the PDF file pre-attached. User selects a WhatsApp contact → PDF is sent as a document attachment.
3. **On unsupported devices**: PDF auto-downloads to the device + WhatsApp opens with the caption text. User manually attaches the downloaded PDF.

**PostHog tracking:**

- Track event: `invoice_shared` with properties: `{ method: 'whatsapp' | 'whatsapp_fallback', invoiceId, currency }`

---

### Task 3.2 — "Download PDF" Button

| Field            | Value                                              |
| ---------------- | -------------------------------------------------- |
| **Owner**        | Dev A                                              |
| **Type**         | Code                                               |
| **Effort**       | 2 hours                                            |
| **Dependencies** | Task 2.2                                           |
| **Outcome**      | User can download the PDF directly to their device |

**Implementation:**

```typescript
export function downloadPdf(pdfUrl: string, invoiceId: string): void {
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = `invoice-${invoiceId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

Track event: `invoice_downloaded` with `{ invoiceId }`

---

### Task 3.3 — "Share via Email" Button

| Field            | Value                                                                    |
| ---------------- | ------------------------------------------------------------------------ |
| **Owner**        | Dev A                                                                    |
| **Type**         | Code                                                                     |
| **Effort**       | 2 hours                                                                  |
| **Dependencies** | Task 2.2                                                                 |
| **Outcome**      | Opens the user's default email client with a pre-filled subject and body |

**Implementation:**

```typescript
export function shareViaEmail(
  clientEmail: string,
  clientName: string,
  amount: string,
  businessName: string
): void {
  const subject = encodeURIComponent(`Invoice from ${businessName}`);
  const body = encodeURIComponent(
    `Hi ${clientName},\n\nPlease find attached your invoice for ${amount}.\n\nBest regards,\n${businessName}\n\n---\nInvoice created with QuickBill — www.freeinvoicekit.com`
  );
  window.open(`mailto:${clientEmail}?subject=${subject}&body=${body}`, '_self');
}
```

**Note:** Email `mailto:` links cannot attach files programmatically. The body instructs the user to attach the PDF manually. Alternatively, prompt the user to download the PDF first, then open the email compose.

Track event: `invoice_shared` with `{ method: 'email', invoiceId }`

---

### Task 3.4 — "Copy Caption Text" Button

| Field            | Value                                                  |
| ---------------- | ------------------------------------------------------ |
| **Owner**        | Dev A                                                  |
| **Type**         | Code                                                   |
| **Effort**       | 1 hour                                                 |
| **Dependencies** | None                                                   |
| **Outcome**      | Copies the pre-formatted WhatsApp caption to clipboard |

```typescript
export async function copyCaptionText(
  clientName: string,
  amount: string,
  businessName: string
): Promise<void> {
  const text = `Hi ${clientName}, please find attached your invoice for ${amount}. — ${businessName}`;
  await navigator.clipboard.writeText(text);
}
```

Show a Sonner toast: "Caption copied to clipboard!"

---

### Task 3.5 — Mark Invoice as "Sent"

| Field            | Value                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------- |
| **Owner**        | Dev A                                                                                    |
| **Type**         | Code                                                                                     |
| **Effort**       | 2 hours                                                                                  |
| **Dependencies** | Task 3.1, Task 1.5 (IndexedDB)                                                           |
| **Outcome**      | When a user triggers any share action, the invoice status updates to "sent" in IndexedDB |

Update the invoice in IndexedDB:

```typescript
invoice.status = 'sent';
invoice.sentAt = new Date().toISOString();
invoice.sentVia = 'whatsapp' | 'email' | 'download';
await saveInvoice(invoice);
```

(Add `sentAt: string` and `sentVia: string` to the `InvoiceData` type.)

---

### Task 3.6 — PWA Configuration

| Field            | Value                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| **Owner**        | Dev B                                                                                                      |
| **Type**         | Code                                                                                                       |
| **Effort**       | 1.5 days                                                                                                   |
| **Dependencies** | Task 0.7 (icons), Task 0.2                                                                                 |
| **Outcome**      | App is installable on mobile, serves a service worker through Turbopack, and has an offline fallback route |

**Subtasks:**

1. **Create `public/manifest.json`** (or use Next.js metadata API):

   ```json
   {
     "name": "QuickBill — Free Invoice Maker for WhatsApp",
     "short_name": "QuickBill",
     "description": "Create and send PDF invoices on WhatsApp. Free. No signup.",
     "start_url": "/create",
     "display": "standalone",
     "background_color": "#f9f9f6",
     "theme_color": "#1e3a5f",
     "icons": [{ "src": "/icon.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any" }]
   }
   ```

2. **Link the manifest and metadata** in `src/app/layout.tsx`:
   - `manifest: '/manifest.json'`
   - `appleWebApp` metadata
   - `viewport.themeColor`
   - icon metadata pointing to the temporary SVG asset

3. **Service worker** — use Serwist's Turbopack integration:

   ```bash
   pnpm add -D @serwist/turbopack serwist esbuild
   ```

   Implement:
   - `src/app/sw.ts` using `Serwist` and `defaultCache`
   - `src/app/serwist/[path]/route.ts` using `createSerwistRoute`
   - `src/components/providers/serwist-provider.tsx` for production registration
   - `next.config.ts` wrapped with `withSerwist`

4. **Offline experience**:
   - Navigation falls back to `/offline` when the app shell cannot reach the network
   - Static assets are cached through Serwist runtime caching
   - Saved invoices still live in IndexedDB and can be viewed once the app shell is available
   - Generating fresh PDFs still requires network access and backend availability

5. **Test installability**:
   - On Android Chrome: verify the "Add to Home Screen" prompt appears
   - On iOS Safari: verify "Add to Home Screen" from the share menu works
   - Verify the app opens in standalone mode (no browser chrome)

---

### Task 3.7 — "Pro Coming Soon" Teaser Banner

| Field            | Value                                                            |
| ---------------- | ---------------------------------------------------------------- |
| **Owner**        | Dev B                                                            |
| **Type**         | Code                                                             |
| **Effort**       | 3 hours                                                          |
| **Dependencies** | Task 0.2                                                         |
| **Outcome**      | Non-intrusive banner in the app captures emails for Pro waitlist |

**Placement:** Show a small banner at the top or bottom of the `/create` page (dismissable, remembers dismissal in localStorage):

_"QuickBill Pro — Remove watermark, add your logo, auto-recurring invoices. Coming soon. [Notify me]"_

**"Notify me" flow:**

1. User clicks "Notify me" → small inline email input + submit button appears
2. On submit: save the email to Supabase `pro_waitlist` through `/api/waitlist`
3. Show confirmation: "You're on the list! We'll notify you when Pro launches."
4. Dismiss the banner after signup

**Implementation note:** The current repo includes the API route, duplicate detection, honeypot handling, and inline/banner UI. PostHog event tracking for waitlist signup is still optional follow-up work if analytics depth is needed.

---

### Task 3.8 — SEO Landing Pages (3 more)

| Field            | Value                                                   |
| ---------------- | ------------------------------------------------------- |
| **Owner**        | Dev C                                                   |
| **Type**         | Code                                                    |
| **Effort**       | 2 days                                                  |
| **Dependencies** | Task 0.2                                                |
| **Outcome**      | 3 new SEO landing pages live and submitted for indexing |

**Pages to build:**

1. **`/whatsapp-billing-uae`** — Target: "whatsapp billing uae" (800 searches/mo)
   - Content angle: UAE business culture, VAT requirements, WhatsApp-first communication, AED currency support
   - 300–500 words + CTA + FAQ

2. **`/invoice-generator-pakistan`** — Target: "invoice generator pakistan" (900 searches/mo)
   - Content angle: Pakistani freelancer/SMB market, PKR support, WhatsApp dominance, mobile-first design
   - 300–500 words + CTA + FAQ

3. **`/stripe-invoice-alternative`** — Target: "stripe invoice alternative" (1,200 searches/mo)
   - Content angle: Stripe invoicing is expensive/complex for simple needs, QuickBill is free, comparison table
   - 300–500 words + CTA + FAQ

Each page must have:

- Unique `metadata` export with title, description, canonical URL
- JSON-LD `FAQPage` schema
- Internal links to `/create`, `/send-invoice-whatsapp`, and the blog (when it exists)
- Update `sitemap.ts` to include these pages

---

### Task 3.9 — Mobile Responsiveness Polish

| Field            | Value                                   |
| ---------------- | --------------------------------------- |
| **Owner**        | Dev B                                   |
| **Type**         | Code / QA                               |
| **Effort**       | 1 day                                   |
| **Dependencies** | Task 1.3, Task 1.4, Task 1.6            |
| **Outcome**      | App works perfectly on all screen sizes |

**Test on these devices/browsers (minimum):**

1. iPhone 14 — Safari
2. iPhone SE (small screen) — Safari
3. Samsung Galaxy S23 — Chrome
4. Samsung Galaxy A14 (budget phone) — Samsung Internet
5. iPad — Safari
6. Desktop — Chrome, Firefox, Safari, Edge
7. Small laptop (1366×768)

**What to check:**

- Invoice form doesn't overflow horizontally
- Line items table scrolls horizontally on small screens OR stacks vertically
- Preview toggle works on mobile
- All buttons are easily tappable (min 44×44px touch targets)
- Landing page looks good on all sizes
- Text is readable without zooming

---

### Task 3.10 — PDF Sharing Compatibility Test

| Field            | Value                                            |
| ---------------- | ------------------------------------------------ |
| **Owner**        | QA / Dev A                                       |
| **Type**         | ⚠️ MANUAL Testing                                |
| **Effort**       | 1 day                                            |
| **Dependencies** | Task 3.1 (sharing works)                         |
| **Outcome**      | Sharing verified on top 15 device/browser combos |

**Test matrix:**

| Device             | Browser          | Share Method  | Expected Result                  |
| ------------------ | ---------------- | ------------- | -------------------------------- |
| iPhone 14          | Safari           | Web Share API | Native share sheet with PDF file |
| iPhone 14          | Chrome           | Web Share API | Native share sheet with PDF file |
| Samsung Galaxy S23 | Chrome           | Web Share API | Native share sheet with PDF file |
| Samsung Galaxy A14 | Samsung Internet | Web Share API | Native share sheet with PDF file |
| Pixel 7            | Chrome           | Web Share API | Native share sheet with PDF file |
| Huawei (HMS)       | Huawei Browser   | Fallback      | Download + wa.me link            |
| Desktop Chrome     | —                | Fallback      | Download + wa.me link            |
| Desktop Firefox    | —                | Fallback      | Download + wa.me link            |
| Desktop Safari     | —                | Fallback      | Download + wa.me link            |

For each: verify PDF arrives correctly in the recipient's WhatsApp chat as a document attachment (not compressed as an image).

---

### Task 3.11 — PDF Quality Audit

| Field            | Value                                                 |
| ---------------- | ----------------------------------------------------- |
| **Owner**        | QA                                                    |
| **Type**         | ⚠️ MANUAL Testing                                     |
| **Effort**       | 3 hours                                               |
| **Dependencies** | Task 3.10                                             |
| **Outcome**      | PDFs verified in all major viewers, file size < 500KB |

**Viewers to test:**

- WhatsApp PDF viewer (Android)
- WhatsApp PDF viewer (iOS)
- Apple Preview (macOS)
- Adobe Acrobat Reader (Windows/Mac)
- Chrome built-in PDF viewer
- Firefox built-in PDF viewer
- Google Drive PDF viewer (Android)

**Check:** layout, fonts, colors, watermark visibility, special characters, file size

---

### Task 3.12 — Record Product Demo GIF

| Field            | Value                                                                              |
| ---------------- | ---------------------------------------------------------------------------------- |
| **Owner**        | PM                                                                                 |
| **Type**         | ⚠️ MANUAL                                                                          |
| **Effort**       | 2 hours                                                                            |
| **Dependencies** | Tasks 3.1–3.4 (all sharing works)                                                  |
| **Outcome**      | 30-second GIF showing: create invoice → generate PDF → share on WhatsApp in 3 taps |

**Instructions:**

1. Use a screen recorder (e.g., Kap on Mac, ShareX on Windows, or a mobile screen recorder)
2. Record on a real mobile device for authenticity
3. Flow: Open QuickBill → fill form quickly (pre-fill some fields) → tap "Generate" → tap "Send on WhatsApp" → show the PDF arriving in a WhatsApp chat
4. Keep it under 30 seconds
5. Convert to GIF (or use MP4 — GIFs are large). Optimized GIF < 5MB.
6. Add to the landing page hero section (Task 1.6)
7. Use this GIF in all social media posts and the future Product Hunt submission

---

### Sprint 3 Milestone Checklist

- [x] "Send on WhatsApp" works via Web Share API on supported mobile browsers
- [x] Fallback (download + wa.me) works on desktop and unsupported browsers
- [x] "Download PDF" works
- [x] "Share via Email" works
- [x] "Copy Caption" works
- [x] Invoice status updates to "sent" after sharing
- [x] App is installable as PWA from manifest + service worker integration
- [x] Offline fallback route and cached app shell are implemented
- [x] "Pro Coming Soon" banner captures emails
- [x] SEO pages live: `/whatsapp-billing-uae`, `/invoice-generator-pakistan`, `/stripe-invoice-alternative`
- [x] Mobile responsiveness improvements are implemented
- [ ] Manual verification on Android and iOS install flows completed
- [ ] Supabase waitlist submissions verified in production
- [ ] Mobile responsiveness verified on 10+ devices
- [ ] PDF sharing tested on 15 device/browser combos
- [ ] PDF quality verified in 7 viewers
- [ ] Product demo GIF recorded and added to landing page

---

## 8. Sprint 4 — Directory Blitz + Polish + Soft Launch (Days 36–42)

### Overview

Performance optimization, security hardening, cross-browser testing, bug fixes, startup directory submissions, first blog post, and the soft launch.

---

### Task 4.1 — Performance Audit (Lighthouse)

| Field            | Value                                                           |
| ---------------- | --------------------------------------------------------------- |
| **Owner**        | Dev A                                                           |
| **Type**         | Code + Testing                                                  |
| **Effort**       | 1 day                                                           |
| **Dependencies** | All Sprint 1–3 work                                             |
| **Outcome**      | Lighthouse PWA score > 90, Performance > 90, Accessibility > 90 |

**Subtasks:**

1. Run Lighthouse in Chrome DevTools on:
   - `/` (landing page)
   - `/create` (invoice form)
   - Each SEO landing page

2. **Common fixes needed:**
   - Image optimization: use Next.js `<Image>` component with WebP format
   - Font loading: use `next/font` for Google Fonts (avoids layout shift)
   - Bundle size: check with `pnpm build` → inspect `.next` output. Remove unused dependencies.
   - Code splitting: Next.js App Router does this by default, but verify large libs like `@react-pdf/renderer` are only imported server-side
   - Cache headers: Vercel sets these automatically for static assets
   - Eliminate render-blocking resources

3. **Target scores:**
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 95
   - PWA: passes all checks

---

### Task 4.2 — Security Hardening

| Field            | Value                                                       |
| ---------------- | ----------------------------------------------------------- |
| **Owner**        | Dev A                                                       |
| **Type**         | Code                                                        |
| **Effort**       | 1 day                                                       |
| **Dependencies** | Task 2.2 (API route exists)                                 |
| **Outcome**      | API routes are protected against abuse. Input is sanitized. |

**Subtasks:**

1. **Rate limiting on `/api/invoice/generate-pdf`**:
   - Implement IP-based rate limiting: max 10 PDF generations per IP per hour
   - Use Vercel's built-in `headers()` to get the client IP or a lightweight package like `next-rate-limit`
   - Return HTTP 429 when limit exceeded: `{ error: "Too many requests. Please try again later." }`

2. **Input sanitization**:
   - Sanitize all text fields in the invoice data before rendering in the PDF (prevent XSS in PDF — though @react-pdf/renderer doesn't execute scripts, sanitize anyway)
   - Strip HTML tags from all string inputs
   - Validate numeric fields (quantity, rate, tax, discount) are actual numbers
   - Validate currency code is in the allowed list
   - Validate date format

3. **Request size limit**:
   - Limit request body to 100KB (more than enough for invoice data)
   - In `next.config.ts`: set `api.bodyParser.sizeLimit: '100kb'`

4. **CORS headers**:
   - API routes should only accept requests from the app's own domain
   - Vercel handles this for same-origin requests, but verify with a test from a different origin

5. **Content Security Policy (CSP)**:
   - Add CSP headers in `next.config.ts` under `headers()`:
     - `default-src 'self'`
     - `script-src 'self' 'unsafe-inline' 'unsafe-eval'` (required for Next.js)
     - `img-src 'self' data: https:`
     - `connect-src 'self' https://*.supabase.co https://ipapi.co https://us.i.posthog.com`

---

### Task 4.3 — Cross-Browser Testing

| Field            | Value                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| **Owner**        | QA                                                                     |
| **Type**         | ⚠️ MANUAL Testing                                                      |
| **Effort**       | 0.5 days                                                               |
| **Dependencies** | All Sprint 1–3 work                                                    |
| **Outcome**      | App works correctly on Chrome, Safari, Firefox, Edge, Samsung Internet |

**Test each browser for:**

- Landing page renders correctly
- Invoice form works (add line items, select currency, set dates)
- PDF generation succeeds
- Share buttons work (or fallback correctly)
- PWA install works
- No console errors

---

### Task 4.4 — Bug Fixes from Internal Testing

| Field            | Value                                 |
| ---------------- | ------------------------------------- |
| **Owner**        | All Devs                              |
| **Type**         | Code                                  |
| **Effort**       | 1 day                                 |
| **Dependencies** | Tasks 4.1–4.3                         |
| **Outcome**      | All P0/P1 bugs from testing are fixed |

**Process:**

1. All testers log bugs in GitHub Issues with labels: `bug`, `P0` or `P1`
2. Assign bugs to developers
3. Fix + PR + deploy
4. Re-test

---

### Task 4.5 — Directory Submissions (10+)

| Field            | Value                                       |
| ---------------- | ------------------------------------------- |
| **Owner**        | PM                                          |
| **Type**         | ⚠️ MANUAL                                   |
| **Effort**       | 1 day                                       |
| **Dependencies** | App is functional and deployed              |
| **Outcome**      | QuickBill listed on 10+ startup directories |

**Directories to submit to:**

| #   | Directory      | URL                       | Category                                      | Notes                                        |
| --- | -------------- | ------------------------- | --------------------------------------------- | -------------------------------------------- |
| 1   | AlternativeTo  | alternativeto.net         | Alternative to Zoho Invoice, Stripe Invoicing | High DA backlink                             |
| 2   | BetaList       | betalist.com              | Finance / Invoicing                           | Early adopter audience                       |
| 3   | Free-for-Dev   | free-for.dev              | Invoicing                                     | Developer audience                           |
| 4   | SaaSHub        | saashub.com               | Invoice Software                              | Comparison site                              |
| 5   | Launching Next | launchingnext.com         | New Startups                                  | Early-stage visibility                       |
| 6   | IndieHackers   | indiehackers.com/products | Products                                      | Active community                             |
| 7   | StartupStash   | startupstash.com          | Tools                                         | Curated directory                            |
| 8   | SideProjectors | sideprojectors.com        | Side Projects                                 | Builder community                            |
| 9   | ToolPilot      | toolpilot.ai              | SaaS Tools                                    | Free listing                                 |
| 10  | MicroSaaS HQ   | microsaashq.com           | Micro-SaaS                                    | Niche community                              |
| 11  | Product Hunt   | producthunt.com           | Upcoming                                      | Add as "Upcoming" (actual launch is Phase 3) |

**For each submission, prepare:**

- Product name: QuickBill
- Tagline: "Free PDF invoices on WhatsApp. No signup."
- Description (100–200 words)
- URL: https://www.freeinvoicekit.com
- Screenshot / logo
- Category tags

---

### Task 4.6 — First Blog Post

| Field            | Value                                                           |
| ---------------- | --------------------------------------------------------------- |
| **Owner**        | PM (writer) + Dev C (implementation)                            |
| **Type**         | Code + ⚠️ MANUAL (writing)                                      |
| **Effort**       | 0.5 days                                                        |
| **Dependencies** | Task 0.2                                                        |
| **Outcome**      | Blog post published at `/blog/send-invoice-whatsapp-30-seconds` |

**Title:** "How to Send a Professional Invoice on WhatsApp in 30 Seconds"

**Implementation:**

1. Create blog infrastructure:
   - `src/app/blog/page.tsx` — blog index page
   - `src/app/blog/[slug]/page.tsx` — individual blog post page
   - For Phase 1, use MDX files or hardcoded content (no CMS needed)
2. Write the blog post (PM writes, dev implements):
   - 500–800 words
   - Include the demo GIF
   - Step-by-step walkthrough
   - CTA: "Try it free → www.freeinvoicekit.com/create"
3. SEO: unique title/description, canonical URL, OG image
4. Update sitemap.ts

---

### Task 4.7 — Personal Network Outreach (Soft Launch)

| Field            | Value                                  |
| ---------------- | -------------------------------------- |
| **Owner**        | PM / Founder                           |
| **Type**         | ⚠️ MANUAL                              |
| **Effort**       | 0.5 days                               |
| **Dependencies** | App is fully functional                |
| **Outcome**      | 50–100 people notified about QuickBill |

**Actions:**

1. Send personal WhatsApp messages to 50–100 freelancers, small business owners, and contacts who invoice clients
2. LinkedIn post: share the tool with a personal story
3. Ask 5–10 trusted contacts to try it and give feedback

**Message template:**

> "Hey [Name]! I just launched a free tool called QuickBill — you can create a PDF invoice and send it on WhatsApp in 30 seconds, no signup needed. Would love your feedback: www.freeinvoicekit.com"

---

### Task 4.8 — Twitter/X Soft Launch Announcement

| Field            | Value                   |
| ---------------- | ----------------------- |
| **Owner**        | PM                      |
| **Type**         | ⚠️ MANUAL               |
| **Effort**       | 30 minutes              |
| **Dependencies** | App is fully functional |
| **Outcome**      | Launch tweet published  |

**Post:**

> "I just launched QuickBill. Free PDF invoices on WhatsApp. No signup.
>
> → Create an invoice in 30 seconds
> → Generate a professional PDF
> → Send it on WhatsApp as an attachment
>
> It's free. Try it: www.freeinvoicekit.com
>
> #buildinpublic #indiehackers #saas"

---

### Sprint 4 Milestone Checklist (= Phase 1 Complete)

- [ ] Lighthouse scores > 90 across all categories
- [ ] API rate limiting active (10 req/IP/hour)
- [ ] Input sanitization on all API routes
- [ ] CSP headers configured
- [ ] App tested on Chrome, Safari, Firefox, Edge, Samsung Internet
- [ ] All P0/P1 bugs fixed
- [ ] Listed on 10+ startup directories
- [ ] Blog post #1 published
- [ ] 50–100 personal outreach messages sent
- [ ] Soft launch tweet published

---

## 9. Task Dependency Graph

```
Phase 0 (Foundation)
├── 0.1 Domain Purchase ─────────────────────────────┐
├── 0.2 GitHub Repo Setup ──────────────┐             │
├── 0.3 Vercel Deploy ←── 0.1 + 0.2    │             │
├── 0.4 Supabase Setup                  │             │
├── 0.5 Analytics ←── 0.2              │             │
├── 0.6 Google Search Console ←── 0.1 + 0.3          │
├── 0.7 Brand Assets (parallel)         │             │
├── 0.8 Twitter/X (parallel)            │             │
├── 0.9 Legal Docs ←── 0.1             │             │
└── 0.10 Stripe Atlas (background)      │             │
                                        │             │
Sprint 1 (Form + Landing)              │             │
├── 1.1 TypeScript Types ←── 0.2       │             │
├── 1.2 Currency/Geo Utils ←── 1.1     │             │
├── 1.3 Invoice Form ←── 1.1 + 1.2 + 0.2             │
├── 1.4 Preview Panel ←── 1.3          │             │
├── 1.5 IndexedDB Storage ←── 1.1      │             │
├── 1.6 Landing Page ←── 0.2 + 0.7     │             │
├── 1.7 SEO Meta/JSON-LD ←── 1.6       │             │
└── 1.8 Twitter Posts (parallel)        │             │
                                        │             │
Sprint 2 (PDF + Watermark)             │             │
├── 2.1 PDF Template ←── 1.1 + 0.7     │             │
├── 2.2 PDF API Route ←── 2.1 + 0.4    │             │
├── 2.3 Short ID Generation ←── 1.1    │             │
├── 2.4 Form → PDF Connection ←── 2.2 + 1.3          │
├── 2.5 PDF Quality Assurance ←── 2.4  │             │
├── 2.6 SEO Page: send-invoice ←── 0.2 + 1.6         │
├── 2.7 SEO Page: freelancers ←── 0.2 + 1.6          │
└── 2.8 Sitemap Submission ←── 0.6 + 2.6 + 2.7       │
                                        │             │
Sprint 3 (Sharing + PWA)               │             │
├── 3.1 WhatsApp Share ←── 2.2         │             │
├── 3.2 Download PDF ←── 2.2           │             │
├── 3.3 Email Share ←── 2.2            │             │
├── 3.4 Copy Caption ←── (none)        │             │
├── 3.5 Mark as Sent ←── 3.1 + 1.5    │             │
├── 3.6 PWA Config ←── 0.7 + 0.2      │             │
├── 3.7 Pro Teaser Banner ←── 0.2      │             │
├── 3.8 3 SEO Pages ←── 0.2           │             │
├── 3.9 Mobile Polish ←── 1.3 + 1.4 + 1.6            │
├── 3.10 Share Compat Test ←── 3.1     │             │
├── 3.11 PDF Quality Audit ←── 3.10    │             │
└── 3.12 Demo GIF ←── 3.1–3.4         │             │
                                        │             │
Sprint 4 (Polish + Launch)             │             │
├── 4.1 Lighthouse Audit ←── ALL       │             │
├── 4.2 Security Hardening ←── 2.2     │             │
├── 4.3 Cross-Browser Test ←── ALL     │             │
├── 4.4 Bug Fixes ←── 4.1–4.3         │             │
├── 4.5 Directory Submissions ←── app functional      │
├── 4.6 Blog Post #1 ←── 0.2          │             │
├── 4.7 Personal Outreach ←── app functional          │
└── 4.8 Launch Tweet ←── app functional               │
```

---

## 10. Manual / Non-Automatable Actions Checklist

These actions **cannot be performed by code or automation**. A human must do them.

| #   | Action                                        | Owner       | When       | Status |
| --- | --------------------------------------------- | ----------- | ---------- | ------ |
| 1   | Purchase domain (www.freeinvoicekit.com)               | PM          | Day 1      | ☐      |
| 2   | Create GitHub organization + repo             | Team Lead   | Day 1      | ☑      |
| 3   | Create Vercel account + connect repo          | Team Lead   | Day 1      | ☑      |
| 4   | Create Supabase project                       | Team Lead   | Day 1      | ☑      |
| 5   | Create PostHog account + get API key          | Team Lead   | Day 1      | ☑      |
| 6   | Verify domain in Google Search Console        | PM          | Day 2      | ☐      |
| 8   | Design logo, color palette, typography        | Designer/PM | Days 1–3   | ☐      |
| 9   | Design PDF watermark treatment                | Designer/PM | Days 1–3   | ☐      |
| 10  | Create Twitter/X account                      | PM          | Day 1      | ☐      |
| 11  | Write Privacy Policy & Terms of Service       | PM          | Days 3–5   | ☐      |
| 12  | Start Stripe Atlas LLC registration           | PM          | Day 1      | ☐      |
| 13  | Post 3 build-in-public tweets (weekly)        | PM          | Weekly     | ☐      |
| 14  | Submit sitemap in Google Search Console       | PM          | Day 20     | ☐      |
| 15  | Request URL indexing in Google Search Console | PM          | Day 20     | ☐      |
| 16  | Test PDF sharing on 15 physical devices       | QA          | Days 30–32 | ☐      |
| 17  | Record product demo GIF on real device        | PM          | Day 33     | ☐      |
| 18  | Submit to 10+ startup directories             | PM          | Days 36–38 | ☐      |
| 19  | Write first blog post content                 | PM          | Day 38     | ☐      |
| 20  | Send 50–100 personal outreach messages        | PM/Founder  | Day 40–42  | ☐      |
| 21  | Post soft launch tweet                        | PM          | Day 42     | ☐      |
| 22  | Set up branch protection rules on GitHub      | Team Lead   | Day 1      | ☐      |
| 23  | Add environment variables to Vercel dashboard | Team Lead   | Day 2      | ☑      |
| 24  | Configure custom domain on Vercel             | Team Lead   | Day 2      | ☐      |

---

## 11. Definition of Done (DoD) per Sprint

### Sprint 1 DoD

- All form fields functional and validated
- Line items dynamic (add/remove)
- Currency auto-detects on page load
- Live preview updates in real time
- Invoices persist in IndexedDB
- Landing page implemented with all sections
- SEO meta tags and structured data present
- Validation passed (`tsc --noEmit`, ESLint, `next build`)
- Code reviewed and merged to `main`
- Deployed to production on Vercel
- No console errors in manual QA

### Sprint 2 DoD

- PDF generation API returns a valid PDF
- PDF template matches approved design
- Watermark visible on every page of every PDF
- PDFs stored in Supabase Storage with public URLs
- PDFs < 500KB
- 2 SEO landing pages live and server-rendered
- Sitemap submitted to Google
- Code reviewed and merged
- Deployed to production

### Sprint 3 DoD

- WhatsApp sharing code path is implemented and manually verified on Android + iOS
- Desktop fallback works (download + wa.me)
- Download PDF works
- Email share works
- Copy caption works
- Invoice marked as "sent" after sharing
- App installable as PWA on mobile
- Offline fallback experience works in production
- 3 SEO pages live
- Pro teaser banner captures emails into Supabase
- Demo GIF recorded and on landing page
- Code reviewed, merged, and deployed

### Sprint 4 DoD

- Lighthouse scores > 90
- API rate limited and inputs sanitized
- CSP headers configured
- All browsers tested (Chrome, Safari, Firefox, Edge, Samsung Internet)
- All P0/P1 bugs fixed
- 10+ directory listings submitted
- Blog post #1 published
- Personal outreach completed
- Soft launch tweet posted
- **🚀 MVP IS LIVE — Phase 1 Complete**

---

## 12. Risk & Blockers Log

| #   | Risk                                                           | Likelihood | Impact | Mitigation                                                                                               | Owner     |
| --- | -------------------------------------------------------------- | ---------- | ------ | -------------------------------------------------------------------------------------------------------- | --------- |
| 1   | Web Share API file sharing not supported on older iOS versions | Medium     | High   | Implement robust fallback (Task 3.1). Test on iOS 15+.                                                   | Dev A     |
| 2   | @react-pdf/renderer doesn't support certain Unicode chars      | Low        | Medium | Test with Arabic, Urdu, Bengali early (Task 2.5). Register fallback fonts.                               | Dev B     |
| 3   | PDF generation slow (> 5s) on Vercel serverless                | Low        | Medium | Optimize template complexity. Consider edge function if needed. Monitor via logging.                     | Dev A     |
| 4   | Supabase Storage free tier bandwidth exceeded                  | Low        | Low    | Free tier: 2GB bandwidth. At 300KB/PDF, that's ~6,600 PDFs/month. Sufficient for Phase 1. Monitor usage. | Team Lead |
| 5   | ipapi.co rate limit (1000/day free)                            | Medium     | Low    | Cache geolocation result in localStorage. Only call once per user. Fallback to USD.                      | Dev A     |
| 6   | Domain name `www.freeinvoicekit.com` not available                      | Low        | Medium | Alternatives: quickbill.io, quickbill.co, getwww.freeinvoicekit.com                                               | PM        |
| 7   | Scope creep delays Sprint 4 soft launch                        | High       | High   | Strict rule: Phase 1 = form + PDF + share + watermark + landing. Nothing else.                           | PM        |
| 8   | Brand assets (logo/design) take too long                       | Medium     | Medium | Use a simple text logo initially. Iterate later. Don't block development.                                | PM        |
| 9   | PDF appears different in WhatsApp viewer vs Chrome             | Medium     | Medium | Test early and often (Task 2.5, Task 3.11). Stick to simple layouts and common fonts.                    | QA        |
| 10  | Vercel hobby tier function timeout (10s)                       | Low        | High   | PDF generation should complete in 2–3s. If slow, optimize or upgrade to Vercel Pro ($20/mo).             | Dev A     |

---

## Appendix A: Environment Variables Reference

```env
# .env.local (create this in the Next.js app root; do not commit to git)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# App
NEXT_PUBLIC_APP_URL=https://www.freeinvoicekit.com
```

---

## Appendix B: Useful Commands

```bash
# Development
pnpm dev                  # Start dev server (localhost:3000)
pnpm build                # Production build
pnpm start                # Start production server locally
pnpm lint                 # Run ESLint
pnpm format               # Run Prettier

# Deployment
git push origin main      # Triggers Vercel auto-deploy

# Dependencies
pnpm add <package>        # Add a dependency
pnpm add -D <package>     # Add a dev dependency

# shadcn/ui
pnpm dlx shadcn@latest add <component>  # Add a new component
```

---

_End of Phase 1 Implementation Plan. This document should be reviewed by the team lead before development begins. All tasks marked ⚠️ MANUAL require human action and cannot be automated._
