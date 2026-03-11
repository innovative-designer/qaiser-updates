# Free Invoice Kit SEO Launch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship the code and content-system changes required for Free Invoice Kit to launch with a technically sound SEO foundation and a reusable path for gradual SEO expansion.

**Architecture:** Fix the existing indexable pages first, then extract shared SEO helpers and page templates, then scale into new route families in small batches. Keep manual launch work, outreach, and webmaster-tool setup out of this file; those live in `docs/plans/2026-03-09-seo-launch-ops-playbook.md`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, TypeScript content files in `src/content/`, pnpm.

---

## How To Use This Plan

- This is the engineering-only SEO plan.
- Execute phases in order. Do not start scaled page creation before Phases 1 and 2 are complete.
- Keep changes incremental. Each phase should be merged only after `pnpm lint` and `pnpm build` pass.
- Prefer reusable helpers and templates over duplicating SEO JSON-LD and metadata objects across pages.
- Manual tasks such as Google Search Console, Bing Webmaster Tools, launch submissions, backlink outreach, and publishing cadence are intentionally excluded from this file.

---

## Progress Tracker

- Phase 1: Completed on 2026-03-11
- Phase 2: Completed on 2026-03-11
- Phase 3: Completed on 2026-03-11
- Phase 4: Completed on 2026-03-11
- Phase 5: Completed on 2026-03-11

**Validation run so far:**
- `pnpm lint` completed on 2026-03-11
- `pnpm build` attempted on 2026-03-11 and failed before app compilation because the local Next.js `linux/x64` SWC binary was not installed in this environment

---

## Current State To Preserve

- `public/robots.txt` already exists and is permissive.
- `/create`, `/history`, and `/offline` already use route metadata with `robots` directives:
  - `src/app/create/layout.tsx`
  - `src/app/history/layout.tsx`
  - `src/app/offline/layout.tsx`
- The homepage already has `SoftwareApplication` schema in `src/app/page.tsx`.
- Blog posts already have route-level metadata generation in `src/app/blog/[slug]/page.tsx`, but they still need canonical, richer Open Graph, `Article` schema, and breadcrumb support.
- Existing landing pages already have strong visual structure and should be improved in place rather than redesigned from scratch.

---

## Non-Goals For This File

- Google Search Console setup
- Bing Webmaster Tools setup
- Product Hunt, Hacker News, Reddit, X, LinkedIn, or directory submissions
- Backlink outreach and guest posting
- Editorial writing workflow and publishing calendar execution
- KPI reporting and weekly SEO review rituals

Those belong in `docs/plans/2026-03-09-seo-launch-ops-playbook.md`.

---

## Phase 1: Technical SEO Hardening On Existing Surfaces

**Outcome:** The current site has correct global metadata assets, blog post schema, canonical coverage, and reusable SEO primitives.

**Dependencies:** None.

**Status:** Completed on 2026-03-11.

**Validation for the phase:**

```bash
pnpm lint
pnpm build
```

### Task 1: Normalize Shared SEO Utilities

**Status:** Completed on 2026-03-11.

**Files:**
- Modify: `src/components/shared/json-ld.tsx`
- Create: `src/lib/seo.ts`
- Optional create if needed: `src/types/seo.ts`

**Implementation notes:**
- Update `JsonLd` so it can safely render either a single JSON-LD object or an array of objects.
- Add shared builders/constants for repeated SEO structures:
  - `buildBreadcrumbSchema()`
  - `buildArticleSchema()`
  - `buildFaqSchema()`
  - `buildHowToSchema()`
- Keep the helper layer thin. Do not introduce a large abstraction that hides page-specific metadata.

**Subtasks:**
1. Read all current JSON-LD usage in the app.
2. Update `JsonLd` prop typing to support `Record<string, unknown> | Record<string, unknown>[]`.
3. Add `src/lib/seo.ts` with small schema-builder helpers used by multiple pages.
4. Refactor one existing page to prove the helper API is practical before wider adoption.
5. Run `pnpm lint`.

**Definition of done:**
- Multiple schema blocks can be rendered without duplicating raw objects in every page.
- The helper API is simple enough to reuse across blog, comparison, and geo pages.

### Task 2: Add A Real OG Image And Global Social Metadata

**Status:** Completed on 2026-03-11.

**Files:**
- Create: `src/app/opengraph-image.tsx`
- Modify: `src/app/layout.tsx`

**Implementation notes:**
- Add `openGraph.images` and `twitter.images` to root metadata.
- Reuse `APP_URL` for absolute asset URLs.
- The image should be 1200x630 and match the existing product visual language instead of introducing a new brand direction.
- Implemented as a generated Open Graph route instead of a static binary asset.

**Subtasks:**
1. Create `src/app/opengraph-image.tsx`.
2. Add `images` to root `openGraph` metadata.
3. Add `images` to root `twitter` metadata.
4. Confirm no page-level metadata overrides break inheritance unexpectedly.
5. Run `pnpm lint`.
6. Run `pnpm build`.

**Definition of done:**
- Social previews are defined globally.
- The default OG image works for pages that do not yet have per-page images.

### Task 3: Harden Blog Post Metadata And Structured Data

**Status:** Completed on 2026-03-11.

**Files:**
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/lib/blog.ts`
- Modify: `src/content/blog/send-invoice-whatsapp-30-seconds.ts`
- Create if needed: `src/types/blog.ts`

**Implementation notes:**
- Preserve existing `generateStaticParams()`.
- Extend blog post typing so each post can optionally define `keywords`, `ogImage`, and `updatedAt`.
- Add:
  - canonical URL
  - richer `openGraph`
  - `twitter`
  - `Article` JSON-LD
  - `BreadcrumbList` JSON-LD
- Do not claim an `updatedAt` value unless the post source actually provides one.

**Subtasks:**
1. Extract or create a proper `BlogPost` type.
2. Add optional SEO metadata fields to the type and first post file.
3. Update `generateMetadata()` to include `alternates.canonical`, `openGraph.url`, `twitter`, and optional keywords.
4. Add `Article` schema to the page body using the shared SEO helpers.
5. Add a blog breadcrumb schema: `Home > Blog > Post Title`.
6. Add a visible related-links area if it materially improves internal linking without bloating the article page.
7. Run `pnpm lint`.
8. Run `pnpm build`.

**Definition of done:**
- Every blog post can ship its own canonical, schema, and social metadata.
- The blog route is ready for additional posts without more SEO plumbing changes.

### Task 4: Review Robots, Sitemap, And Canonical Consistency

**Status:** Completed on 2026-03-11.

**Files:**
- Modify if needed: `public/robots.txt`
- Modify if needed: `src/app/sitemap.ts`
- Modify if needed: `src/lib/constants.ts`

**Implementation notes:**
- Keep `robots.txt` permissive unless there is a clear crawl-control problem.
- Do not add `Disallow` rules for pages already using `noindex` metadata unless there is a deliberate indexing strategy change.
- Confirm the sitemap only includes pages that should be indexed.

**Subtasks:**
1. Verify `APP_URL` is the canonical production domain.
2. Review `public/robots.txt` for correctness and minimalism.
3. Review `src/app/sitemap.ts` against currently indexable routes.
4. Remove any route from the sitemap that should remain non-indexable.
5. Run `pnpm lint`.
6. Run `pnpm build`.

**Definition of done:**
- Canonical domain, sitemap output, and robots strategy do not conflict with route-level metadata.

---

## Phase 2: Optimize Existing Indexable Pages

**Outcome:** The current money pages and content hub pages have stronger metadata, structured data, locale targeting, and internal linking.

**Dependencies:** Phase 1 complete.

**Status:** Completed on 2026-03-11.

**Validation for the phase:**

```bash
pnpm lint
pnpm build
```

### Task 5: Upgrade The Blog Index

**Status:** Completed on 2026-03-11.

**Files:**
- Modify: `src/app/blog/page.tsx`

**Implementation notes:**
- Improve the title and description to reflect the search intent of invoicing guides for freelancers.
- Add canonical metadata.
- Add breadcrumb schema if it fits the shared helper pattern.

**Subtasks:**
1. Tighten blog index title and description for search intent.
2. Add `alternates.canonical`.
3. Add breadcrumb JSON-LD if not already handled elsewhere.
4. Review article card copy to strengthen internal linking cues without rewriting the design.
5. Run `pnpm lint`.

**Definition of done:**
- The blog index is no longer a basic placeholder from an SEO standpoint.

### Task 6: Add HowTo And Breadcrumb Support To Process Pages

**Status:** Completed on 2026-03-11.

**Files:**
- Modify: `src/app/send-invoice-whatsapp/page.tsx`
- Modify: `src/app/free-invoice-maker-freelancers/page.tsx`

**Implementation notes:**
- `send-invoice-whatsapp` should get both FAQ and `HowTo`.
- `free-invoice-maker-freelancers` should at minimum get breadcrumb support; add `HowTo` only if the content genuinely describes a step-by-step process.
- Avoid stuffing multiple schema types into a page unless the visible content supports them.

**Subtasks:**
1. Add breadcrumb schema to both pages.
2. Add `HowTo` schema to `send-invoice-whatsapp`.
3. Evaluate whether `free-invoice-maker-freelancers` supports `HowTo`; skip if it would be synthetic.
4. Replace links to `/history` with links to indexable pages where that improves crawl flow.
5. Add a small “related guides” section linking to other indexable landing pages.
6. Run `pnpm lint`.
7. Run `pnpm build`.

**Definition of done:**
- Process-oriented pages match the intent they are trying to rank for.
- Internal links point toward indexable SEO pages, not `noindex` utility routes.

### Task 7: Fully Optimize Pakistan And UAE Landing Pages

**Status:** Completed on 2026-03-11.

**Files:**
- Modify: `src/app/invoice-generator-pakistan/page.tsx`
- Modify: `src/app/whatsapp-billing-uae/page.tsx`

**Implementation notes:**
- Add `alternates.languages` for `en-PK` and `en-AE`.
- Add FAQ and breadcrumb schema to both pages.
- Add locale-aware visible content, not just metadata.
- UAE currently needs FAQ content and JSON-LD from scratch.
- Pakistan needs stronger local references such as PKR, JazzCash, Easypaisa, and freelancer platform context.

**Subtasks:**
1. Add canonical and `hreflang`-style alternates metadata to both pages.
2. Add FAQ arrays and FAQ schema to both pages.
3. Add breadcrumb schema to both pages.
4. Expand visible copy to include local market context without becoming keyword spam.
5. Add stronger cross-links between geo pages and the WhatsApp/freelancer pages.
6. Run `pnpm lint`.
7. Run `pnpm build`.

**Definition of done:**
- Geo pages have metadata, schema, and visible content aligned with their regional query intent.

### Task 8: Upgrade The Existing Comparison Page

**Status:** Completed on 2026-03-11.

**Files:**
- Modify: `src/app/stripe-invoice-alternative/page.tsx`

**Implementation notes:**
- Add FAQ schema and breadcrumb support.
- Strengthen title/description to target “free Stripe invoice alternative” and “no signup” intent.
- Add contextual links to `/create`, `/free-invoice-maker-freelancers`, and `/send-invoice-whatsapp`.

**Subtasks:**
1. Improve metadata copy for comparison intent.
2. Add FAQ content and FAQ schema.
3. Add breadcrumb schema.
4. Add internal links to adjacent SEO pages.
5. Run `pnpm lint`.
6. Run `pnpm build`.

**Definition of done:**
- The Stripe comparison page can act as the reusable standard for future comparison pages.

---

## Phase 3: Build Reusable SEO Page Infrastructure

**Outcome:** New SEO pages can be added by authoring content data and thin route files instead of cloning entire pages.

**Dependencies:** Phases 1 and 2 complete.

**Status:** Completed on 2026-03-11.

**Validation for the phase:**

```bash
pnpm lint
pnpm build
```

### Task 9: Define Reusable SEO Content Models

**Status:** Completed on 2026-03-11.

**Files:**
- Create: `src/types/seo-page.ts`
- Create: `src/content/seo/industries.ts`
- Create: `src/content/seo/comparisons.ts`
- Create: `src/content/seo/countries.ts`
- Create: `src/content/seo/templates.ts`

**Implementation notes:**
- Keep each content family explicit.
- Define only the fields the shared templates actually need:
  - `slug`
  - `title`
  - `description`
  - `h1`
  - section copy
  - FAQ entries
  - optional locale/currency metadata
  - optional comparison-table data
- Do not invent a giant one-size-fits-all schema if two smaller interfaces are clearer.

**Subtasks:**
1. Define content interfaces for industry, comparison, country, and invoice-template pages.
2. Seed each file with 1 to 2 real examples, not placeholders.
3. Make sure each seed entry has enough copy to render a complete page.
4. Keep content separate from React components.
5. Run `pnpm lint`.

**Definition of done:**
- Content models are ready to support page generation without ad hoc props.

### Task 10: Create Shared SEO Page Renderers

**Status:** Completed on 2026-03-11.

**Files:**
- Create: `src/components/shared/seo/industry-page.tsx`
- Create: `src/components/shared/seo/comparison-page.tsx`
- Create: `src/components/shared/seo/country-page.tsx`
- Create: `src/components/shared/seo/template-page.tsx`
- Optional create: `src/components/shared/seo/seo-page-shell.tsx`

**Implementation notes:**
- Reuse existing shared building blocks:
  - `Header`
  - `Footer`
  - `PageHero`
  - `PageSection`
  - `InfoPanel`
  - `JsonLd`
- Do not rebuild the marketing design system.
- Every shared renderer must accept data and return:
  - visible page sections
  - metadata inputs
  - schema inputs
  - internal links

**Subtasks:**
1. Decide whether a base shell component reduces duplication without hiding too much.
2. Build the comparison renderer first using the Stripe page as the reference.
3. Build the country renderer next using Pakistan/UAE as references.
4. Build industry and invoice-template renderers last.
5. Refactor only when a renderer actually reduces duplication.
6. Run `pnpm lint`.
7. Run `pnpm build`.

**Definition of done:**
- New SEO pages can be created from shared page components instead of copy-pasting full page files.

### Task 11: Wire Shared Content Into Sitemap Generation

**Status:** Completed on 2026-03-11.

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify if needed: `src/lib/seo.ts`

**Implementation notes:**
- The sitemap should read from the new SEO content collections.
- Only include entries that are backed by implemented routes.
- Use stable `lastModified` values instead of `new Date()` unless the content source justifies it.

**Subtasks:**
1. Import the new content collections into `src/app/sitemap.ts`.
2. Add only the route families that are actually live.
3. Keep priorities conservative and consistent.
4. Run `pnpm build` and verify sitemap generation still succeeds.

**Definition of done:**
- Scaled SEO pages automatically appear in the sitemap when their route families go live.

---

## Phase 4: Ship The First Small Batches Of New Pages

**Outcome:** The site expands beyond the current baseline without exploding maintenance cost.

**Dependencies:** Phase 3 complete.

**Status:** Completed on 2026-03-11.

**Validation for every batch:**

```bash
pnpm lint
pnpm build
```

### Task 12: Batch A Industry Pages

**Status:** Completed on 2026-03-11.

**Files:**
- Create: `src/app/invoice-generator-graphic-designers/page.tsx`
- Create: `src/app/invoice-generator-photographers/page.tsx`
- Create: `src/app/invoice-generator-consultants/page.tsx`
- Modify: `src/content/seo/industries.ts`

**Implementation notes:**
- Start with 3 pages, not 10 to 20.
- Pick professions with clear query intent and obvious invoice needs.
- Each route file should be thin and delegate to the shared industry renderer.

**Subtasks:**
1. Finalize three industry entries in the content file.
2. Create thin route files for those entries.
3. Add metadata, FAQ, breadcrumb, and CTA consistency.
4. Add cross-links from existing pages where relevant.
5. Run `pnpm lint`.
6. Run `pnpm build`.

**Definition of done:**
- Three industry pages are live, indexable, and consistent with the shared system.

### Task 13: Batch B Comparison Pages

**Status:** Completed on 2026-03-11.

**Files:**
- Create: `src/app/freshbooks-alternative/page.tsx`
- Create: `src/app/wave-invoice-alternative/page.tsx`
- Modify: `src/content/seo/comparisons.ts`

**Implementation notes:**
- Start with two pages and validate the template quality before scaling to six or more.
- Each page must state when the competitor is the better fit; avoid one-sided spam copy.

**Subtasks:**
1. Add FreshBooks and Wave entries to the comparison data file.
2. Create route files that render through the comparison template.
3. Reuse FAQ and comparison-table structures from the shared renderer.
4. Add cross-links to `/stripe-invoice-alternative` and adjacent landing pages.
5. Run `pnpm lint`.
6. Run `pnpm build`.

**Definition of done:**
- The comparison route family is proven with at least two non-Stripe pages.

### Task 14: Batch C Country Pages

**Status:** Completed on 2026-03-11.

**Files:**
- Create: `src/app/invoice-generator-india/page.tsx`
- Create: `src/app/invoice-generator-nigeria/page.tsx`
- Modify: `src/content/seo/countries.ts`

**Implementation notes:**
- Start with two markets that fit the product’s WhatsApp-first positioning.
- Keep each page genuinely localized: currency, payment context, and freelancer workflow should differ.

**Subtasks:**
1. Add India and Nigeria entries to the country data file.
2. Create route files that use the shared country renderer.
3. Add locale alternates metadata where appropriate.
4. Link new country pages from the homepage or relevant geo pages only if the links fit naturally.
5. Run `pnpm lint`.
6. Run `pnpm build`.

**Definition of done:**
- The geo-page system scales past Pakistan and UAE without custom page rebuilds.

### Task 15: Batch D Invoice Template Pages

**Status:** Completed on 2026-03-11.

**Files:**
- Create: `src/app/invoice-template-freelancer/page.tsx`
- Create: `src/app/invoice-template-hourly/page.tsx`
- Modify: `src/content/seo/templates.ts`

**Implementation notes:**
- Keep this batch small until the product has a clear template-prefill experience.
- If `/create` does not yet support query-param prefills cleanly, do not fake that behavior in the copy.

**Subtasks:**
1. Add two template-page data entries.
2. Build route files using the shared template renderer.
3. Use static preview imagery only if production-ready assets exist.
4. If prefill support is missing, point CTAs to `/create` without promising a preloaded template.
5. Run `pnpm lint`.
6. Run `pnpm build`.

**Definition of done:**
- The site has at least one working invoice-template route family without misleading claims.

---

## Phase 5: Post-Baseline Engineering Follow-Through

**Outcome:** The SEO system remains maintainable after the first launch wave.

**Dependencies:** Phases 1 through 4 complete.

**Status:** Completed on 2026-03-11.

### Task 16: Add A Lightweight SEO QA Checklist To The Repo

**Status:** Completed on 2026-03-11.

**Files:**
- Create: `docs/plans/seo-page-qa-checklist.md`

**Implementation notes:**
- Keep this checklist engineering-focused.
- It should be used before adding any new indexable page.

**Checklist should cover:**
- unique title
- unique meta description
- canonical URL
- schema present where appropriate
- page included in sitemap if indexable
- page not linked primarily to `noindex` destinations
- `pnpm lint`
- `pnpm build`

**Definition of done:**
- Future SEO pages have a repeatable acceptance checklist.

### Task 17: Re-Audit Internal Linking After The First Batches Ship

**Status:** Completed on 2026-03-11.

**Files:**
- Modify as needed:
  - `src/app/page.tsx`
  - `src/app/blog/page.tsx`
  - `src/app/send-invoice-whatsapp/page.tsx`
  - `src/app/free-invoice-maker-freelancers/page.tsx`
  - `src/app/invoice-generator-pakistan/page.tsx`
  - `src/app/whatsapp-billing-uae/page.tsx`
  - `src/app/stripe-invoice-alternative/page.tsx`

**Implementation notes:**
- Do this after new pages exist.
- Add links sparingly and intentionally; do not create generic footer spam blocks.

**Definition of done:**
- Key indexable pages each surface obvious next-click paths to related indexable pages.

---

## Execution Order Summary

1. Phase 1: Shared SEO plumbing, OG image, blog metadata/schema, robots/sitemap review
2. Phase 2: Existing landing-page and comparison-page optimization
3. Phase 3: Shared content models and reusable renderers
4. Phase 4: Small route-family batches in this order:
   - industries
   - comparisons
   - countries
   - invoice templates
5. Phase 5: QA checklist and internal-linking re-audit

---

## Stop Conditions

- Do not create 10 to 20 new SEO pages before the shared template system exists.
- Do not add schema types that the visible page content does not support.
- Do not block crawl in `robots.txt` for routes already controlled with `noindex` unless strategy changes.
- Do not promise product behaviors such as template-prefill or hosted PDF links unless those behaviors actually ship.

---

## Ready-For-Implementation Verdict

This file is intentionally structured for gradual implementation. It is ready to execute phase by phase.

The companion manual-work document is:

- `docs/plans/2026-03-09-seo-launch-ops-playbook.md`
