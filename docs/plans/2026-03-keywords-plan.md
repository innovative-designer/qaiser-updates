# Keywords Plan — Implementation Phases

Date: 2026-03  
Project: Free Invoice Kit  
Depends on: [Keyword-to-Pages SEO Strategy](2026-03-keyword-to-pages-seo-strategy.md)

## Overview

This plan turns the keyword strategy into phased tasks. Each phase has clear deliverables and acceptance criteria so we can ship incrementally and measure.

---

## Phase 1: Foundation (Industry + Modifiers)

**Goal:** Add high-value “invoice generator for [X]” landings and ensure core pages use “free” / “online” / “PDF” in titles and descriptions.

### Tasks

| # | Task | Where | Done |
|---|------|--------|------|
| 1.1 | Add industry page: **Small business** | `industries.ts` → slug `small-business` | ☑ |
| 1.2 | Add industry page: **Freelancers** (long-tail for /invoice-generator/freelancers) | `industries.ts` → slug `freelancers` | ☑ |
| 1.3 | Add industry page: **Amazon sellers** | `industries.ts` → slug `amazon-sellers` | ☑ |
| 1.4 | Add industry page: **Contractors** | `industries.ts` → slug `contractors` | ☑ |
| 1.5 | Audit existing industry/country pages: ensure every title includes at least one of **free**, **online**, or **PDF** where natural | `industries.ts`, `countries.ts` | ☑ |
| 1.6 | Add internal links from homepage or main landings to new industry pages | `page.tsx`, `free-invoice-maker-freelancers`, etc. | ☑ |

### Acceptance criteria

- Visiting `/invoice-generator/small-business`, `/invoice-generator/freelancers`, `/invoice-generator/amazon-sellers`, `/invoice-generator/contractors` returns 200 and full IndustryPage content.
- Each new page has unique title, description, H1, and keywords; FAQs match the audience.
- Sitemap includes new slugs (automatic if `generateStaticParams` uses `industryPages`).
- At least one existing industry/country page has “free” or “online” or “PDF” in the title if it did not already.

---

## Phase 2: More industry and use-case pages

**Goal:** Cover the next batch of “invoice generator for [X]” keywords with dedicated landings.

### Tasks

| # | Task | Slug / page | Done |
|---|------|-------------|------|
| 2.1 | Add **eBay sellers** | `invoice-generator/ebay-sellers` | ☑ |
| 2.2 | Add **Travel agency** | `invoice-generator/travel-agency` | ☑ |
| 2.3 | Add **Cleaning services** | `invoice-generator/cleaning-services` | ☑ |
| 2.4 | Add **Content creators / influencers** | `invoice-generator/content-creators` | ☑ |
| 2.5 | Add **Video editors** | `invoice-generator/video-editors` | ☑ |
| 2.6 | Add **Restaurants** | `invoice-generator/restaurants` | ☑ |
| 2.7 | Add **Self-employed / sole traders** | `invoice-generator/sole-traders` | ☑ |

### Acceptance criteria

- All new slugs live under `invoice-generator/[slug]` with full IndustryPage data.
- Related links and internal navigation point to /create, /send-invoice-whatsapp, and relevant industry/country pages.

---

## Phase 3: Country and geography gaps

**Goal:** Ensure “invoice generator for [country]” and “free invoice generator for [country]” are covered for priority regions.

### Tasks

| # | Task | Where | Done |
|---|------|--------|------|
| 3.1 | Confirm or add **Australia** | `countries.ts` → slug `australia` | ☑ |
| 3.2 | Confirm or add **UK** | `countries.ts` → slug `uk` | ☑ |
| 3.3 | Confirm India, Pakistan, UAE titles include “free” / “online” / “PDF” where missing | `countries.ts` | ☑ |
| 3.4 | Add “free invoice generator for [country]” style phrasing in title or description for each country page | `countries.ts` | ☑ |

### Acceptance criteria

- At least Australia and UK have dedicated country pages with correct locale and canonicals.
- Every country page title or description includes a clear “free” or “online” or “PDF” modifier where it fits.

---

## Phase 4: Core page metadata (About, Contact, FAQ)

**Goal:** Improve titles and descriptions for About, Contact, and FAQ so they are search-useful and brand-specific (per schema research).

### Tasks

| # | Task | File | Done |
|---|------|------|------|
| 4.1 | Rewrite **About** page title and description (unique, intent clear, brand + keyword) | `src/app/about/page.tsx` or about content | ☑ |
| 4.2 | Rewrite **Contact** page title and description | `src/app/contact/page.tsx` | ☑ |
| 4.3 | Rewrite **FAQ** page title and description | `src/app/faq/page.tsx` | ☑ |

### Acceptance criteria

- No generic-only titles (e.g. not just “About” or “Contact”).
- Each page has a unique meta description that matches the visible content and includes brand or product context.

---

## Phase 5: Platform and format (optional / later)

**Goal:** Address “invoice generator for Shopify/WooCommerce/WordPress/Excel” and “invoice format” without creating thin pages.

### Tasks

| # | Task | Approach | Done |
|---|------|----------|------|
| 5.1 | Add comparison or “works with” page for **Shopify / WooCommerce / WordPress** | `compare/[slug]` → shopify, woocommerce, wordpress | ☑ |
| 5.2 | Add FAQ or short section: **What to include on an invoice** / invoice format | Added to `src/content/site/faq.ts` + device FAQ | ☑ |
| 5.3 | Use “works on any device” (PC, Mac, iPhone, mobile) in homepage or key landing copy and meta | `page.tsx` metadata + highlights + FAQ | ☑ |

### Acceptance criteria

- No duplicate or near-duplicate content; each URL has a clear purpose.
- Device/platform phrases appear in meta or on-page copy where they add value.

---

## Tracking

- **Strategy reference:** [2026-03-keyword-to-pages-seo-strategy.md](2026-03-keyword-to-pages-seo-strategy.md)
- **Schema research:** [seo-schema-metadata-research-2026-03-18.md](../seo-schema-metadata-research-2026-03-18.md)
- **Content files:** `src/content/seo/industries.ts`, `src/content/seo/countries.ts`
- **Routes:** `src/app/invoice-generator/[slug]/page.tsx` (industry + country), sitemap via `src/app/sitemap.ts`

Update the “Done” column in each phase as tasks are completed.
