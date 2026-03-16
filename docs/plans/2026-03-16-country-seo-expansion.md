# Country SEO Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Expand the site's country-focused SEO footprint by improving existing country pages, adding new country pages for Asia and Europe, and publishing supporting country-targeted blog content that links into the invoice builder and related landing pages.

**Architecture:** The country route system is already data-driven through `src/content/seo/countries.ts` and rendered by `src/app/invoice-generator/[slug]/page.tsx`, so new country pages only require new entries in the content dataset. Blog content is also data-driven via `src/content/blog/*` and `src/lib/blog.ts`, which keeps the sitemap generation automatic through `src/app/sitemap.ts`.

**Tech Stack:** Next.js App Router, TypeScript, content-driven SEO datasets, static blog exports, shared metadata helpers in `src/lib/seo.ts`.

---

### Task 1: Improve existing country pages

**Files:**
- Modify: `src/content/seo/countries.ts`

**Steps:**
1. Review the existing `pakistan`, `uae`, `india`, and `nigeria` entries for keyword alignment, specificity, and internal-link consistency.
2. Strengthen intros, FAQs, and related links so they target country-level search intent more directly.
3. Keep all claims aligned to the current product: no-signup core flow, PDF export, local/browser storage, WhatsApp-friendly sharing.
4. Update `lastModified` values for the edited entries.

### Task 2: Add new country landing pages

**Files:**
- Modify: `src/content/seo/countries.ts`

**Steps:**
1. Add new `CountryPageData` entries for `thailand`, `malaysia`, `singapore`, `sri-lanka`, `germany`, `france`, `spain`, and `italy`.
2. For each entry, set country-relevant title, description, H1, keywords, locale, hero copy, FAQs, and related links.
3. Keep the content useful and concrete: mention local currency and common freelancer/service-business invoicing context without implying unsupported payments or tax/legal compliance features.
4. Point each page back to `/create`, `/send-invoice-whatsapp`, and nearby geo/template pages where appropriate.

### Task 3: Add supporting blog posts

**Files:**
- Create: `src/content/blog/*.ts`
- Modify: `src/lib/blog.ts`

**Steps:**
1. Add 3-5 country-focused blog posts targeting practical search intent around invoice creation and PDF sending.
2. Prefer posts that reinforce the new and existing country pages rather than duplicating the same landing-page copy.
3. Include internal links to the matching country pages, `/create`, and closely related guides/templates.
4. Register the new posts in `src/lib/blog.ts` so they appear on `/blog` and in the sitemap.

### Task 4: Verify metadata and sitemap inclusion

**Files:**
- Review: `src/app/sitemap.ts`
- Review: `src/components/shared/seo/country-page.tsx`
- Review: `src/lib/seo.ts`

**Steps:**
1. Confirm the new country entries are automatically included in the sitemap through `countryPages`.
2. Confirm new blog posts are automatically included via `getAllPosts()`.
3. Check that page titles, descriptions, keywords, and locales are all propagated through existing metadata builders.

### Task 5: Validate content quality

**Files:**
- Modify as needed: files touched in Tasks 1-3

**Steps:**
1. Run targeted grep checks for prompt leakage, unsupported speed claims, and placeholder/legal-residue wording.
2. Run targeted ESLint on every touched content and route file.
3. Review diff output for tone consistency and internal-link quality before handoff.
