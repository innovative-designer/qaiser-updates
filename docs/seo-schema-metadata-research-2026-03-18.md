# SEO Schema And Metadata Research

Date: 2026-03-18

Project: Free Invoice Kit  
Canonical URL: `https://www.freeinvoicekit.com`

## Scope

This note summarizes:

- Current SEO schema and metadata implementation in the codebase
- Gaps against current Google Search Central and Schema.org guidance
- Practical improvement priorities
- Realistic upside from schema and metadata work

## Executive Summary

Free Invoice Kit already has a solid SEO foundation:

- Canonical tags are present on major indexable pages
- `robots.txt` and `sitemap.xml` are implemented
- Utility routes like `/create`, `/history`, and shared viewer routes are excluded from indexing
- Structured data is already used for `SoftwareApplication`, `Article`, `BreadcrumbList`, `FAQPage`, and `HowTo`
- Programmatic SEO content exists for country, industry, comparison, template, and blog pages

The current setup is better than average for an early-stage product site. The main issue is not absence of schema. The issue is that part of the schema strategy is focused on markup types that now have limited or no Google rich-result upside for this kind of site.

My overall assessment:

- Technical SEO foundation: strong
- Metadata coverage: decent
- Schema strategy quality: mixed
- Overall SEO implementation score: about `6.5/10`

## Current State In The Repo

### Core Technical SEO

- Global metadata is defined in `src/app/layout.tsx`
- `robots.txt` is present in `public/robots.txt`
- Sitemap generation is implemented in `src/app/sitemap.ts`
- Non-indexable routes are correctly marked with `robots.index = false` where appropriate

Relevant files:

- `src/app/layout.tsx`
- `public/robots.txt`
- `src/app/sitemap.ts`
- `src/app/create/layout.tsx`
- `src/app/history/layout.tsx`
- `src/app/v/[invoiceId]/layout.tsx`

### Structured Data Already Implemented

- Homepage: `SoftwareApplication`
- Blog posts: `Article` plus `BreadcrumbList`
- FAQ page: `FAQPage`
- WhatsApp landing page: `FAQPage`, `HowTo`, `BreadcrumbList`
- Freelancer landing page: `FAQPage`, `BreadcrumbList`
- Country, industry, comparison, and template pages: `FAQPage` and `BreadcrumbList`

Relevant files:

- `src/app/page.tsx`
- `src/lib/seo.ts`
- `src/app/blog/[slug]/page.tsx`
- `src/app/faq/page.tsx`
- `src/app/send-invoice-whatsapp/page.tsx`
- `src/app/free-invoice-maker-freelancers/page.tsx`
- `src/components/shared/seo/country-page.tsx`
- `src/components/shared/seo/industry-page.tsx`
- `src/components/shared/seo/comparison-page.tsx`
- `src/components/shared/seo/template-page.tsx`

### Indexable Content Footprint

From the current content files, the site has roughly:

- 12 country pages
- 3 industry pages
- 3 comparison pages
- 2 template pages
- 5 blog posts
- Core marketing and legal pages

This is enough surface area for schema and metadata improvements to matter, but not enough that schema alone will drive major traffic growth.

### Project Status Constraints

The project status document says:

- SEO and content system are live
- `pnpm lint` passed
- `pnpm test` and `pnpm build` are currently blocked by local environment issues

Relevant file:

- `docs/project-status.md`

This matters because launch-quality SEO work is not only markup. It also depends on a stable build pipeline and production validation.

## What Is Good Right Now

### 1. Indexation Hygiene Is Good

This is one of the strongest parts of the setup.

- `robots.txt` exists and points to the sitemap
- The sitemap includes major indexable marketing and content routes
- Internal utility pages are not indexable

That prevents wasted crawl budget on thin or user-state pages.

### 2. Canonical Coverage Is Consistent

The shared metadata helper in `src/lib/seo.ts` standardizes canonical handling across programmatic pages. That reduces accidental duplication and is a good pattern.

### 3. Breadcrumb Schema Is Worth Keeping

`BreadcrumbList` is still useful and aligns well with the site architecture. This is one of the schema types worth continuing to maintain carefully.

### 4. Blog Metadata Is Better Than The Average Marketing Site

Blog posts already include:

- Canonical URLs
- Open Graph article metadata
- Publish and modified timestamps
- Structured data

That gives a good base for article indexing and sharing.

## Main Weaknesses

### 1. Missing Strong Brand/Entity Schema

The homepage currently exposes `SoftwareApplication`, but I do not see a proper `WebSite` schema or a full `Organization` schema.

Why this matters:

- `WebSite` helps Google understand the site-level entity and naming context
- `Organization` helps consolidate brand signals like logo, site identity, contact info, and external profiles

This is the single largest schema gap in the current implementation.

### 2. Too Much Emphasis On FAQ And HowTo Markup

The codebase uses `FAQPage` widely and also uses `HowTo` on the WhatsApp guide page.

This is valid Schema.org markup, but the Google search upside is much lower than it used to be. For most commercial and content sites, this should not be treated as a primary SEO lever anymore.

Practical takeaway:

- Keep it only where it clearly matches visible on-page content
- Do not treat expansion of FAQ/HowTo schema as a growth strategy

### 3. Metadata Titles Are Sometimes Too Generic

Some key pages use titles like:

- `About`
- `Contact`
- `FAQ`

These are technically valid but weak for search intent, brand context, and click-through rate.

### 4. Blog Schema Is Generic Instead Of Best-Fit

Blog posts use generic `Article` schema. A stronger fit would usually be `BlogPosting`.

Also, the page visibly shows the published date, but does not visibly show an updated date even though `modifiedTime` and `dateModified` are already present in metadata/schema.

That is a missed trust and freshness signal.

### 5. Overuse Of `meta keywords`

The site includes `keywords` metadata in many places. Google does not use the `keywords` meta tag for web search ranking.

This is not harmful by itself, but it is low-value work and should not be treated as part of the real SEO strategy.

### 6. OG/Twitter Imagery Is Underused As A Page-Level Asset

The site has a good global Open Graph image, but most major landing pages do not appear to have dedicated page-specific social images.

That affects:

- Share quality
- CTR in some social and messaging surfaces
- Potential consistency for branded content previews

## Factual Guidance From Current Sources

Based on current Google Search Central and Schema.org references:

- `BreadcrumbList`, `Article`, `Organization`, `WebSite`, and `SoftwareApplication` remain useful schema types
- `FAQPage` markup has much narrower practical Google rich-result upside than many older SEO guides imply
- `HowTo` markup is not where most commercial sites should expect meaningful search gains now
- Good titles and meta descriptions still matter for title link generation and snippet quality
- `meta keywords` should not be prioritized
- Robots/meta preview controls such as larger image previews can still influence how pages appear in search

## Recommended Improvement Priorities

### Priority 1: Add Site-Level `WebSite` And `Organization` Schema

Add:

- `WebSite` schema on the homepage
- `Organization` schema on the homepage or About page

Recommended properties:

- `name`
- `url`
- `logo`
- `sameAs` for any real brand profiles
- `contactPoint` if you want to expose support contact in a structured way

Impact:

- High relative to the amount of work
- Helps brand/entity understanding more than more FAQ markup would

### Priority 2: Upgrade Metadata On Core Pages

Tighten titles and descriptions for:

- Homepage
- `About`
- `Contact`
- `FAQ`
- Blog index
- Core SEO landings like `/send-invoice-whatsapp` and `/free-invoice-maker-freelancers`

Rules:

- Make every title unique
- Make the intent obvious
- Put the strongest keyword and brand framing early
- Match the visible on-page promise

Impact:

- High CTR upside on any page that already gets impressions

### Priority 3: Upgrade Blog Schema From `Article` To `BlogPosting`

For blog posts:

- Use `BlogPosting`
- Keep canonical, image, published date, modified date, and breadcrumb
- Consider stronger author identity instead of only organization-level authorship if the content is genuinely editorial

Also:

- Show updated date visibly on the page when a post has been refreshed

Impact:

- Moderate
- Improves consistency between visible content and metadata/schema

### Priority 4: Add Page-Specific Open Graph Images

Create dedicated OG images for the highest-value pages first:

- Homepage
- `/send-invoice-whatsapp`
- `/free-invoice-maker-freelancers`
- Best-performing country pages
- Best-performing comparison pages

Impact:

- Moderate for sharing and snippet quality
- Small direct ranking effect, but real presentation upside

### Priority 5: Add Better Preview Controls

Consider adding robots metadata such as:

- `max-image-preview: large`

Only for indexable content/marketing pages where appropriate.

Impact:

- Low to moderate
- Mostly a presentation improvement

### Priority 6: Reduce Attention Spent On `FAQPage` And `HowTo`

Do not remove them blindly if they match visible content, but do not expand them as a primary growth tactic.

Use them only when:

- The content is fully visible on page
- The page genuinely functions as that content type
- The markup is not being used as SEO filler

Impact:

- Strategic clarity rather than direct gains

## Page-Type Recommendations

### Homepage

Current state:

- Good title and description
- `SoftwareApplication` schema present
- Missing stronger site/entity schema

Recommended:

- Add `WebSite`
- Add `Organization`
- Keep `SoftwareApplication`, potentially using `WebApplication`

### Blog Posts

Current state:

- Good canonical and OG setup
- `Article` schema present
- Dates are mostly handled well

Recommended:

- Move to `BlogPosting`
- Show visible updated date when relevant
- Keep breadcrumb schema

### Country, Industry, Comparison, Template Pages

Current state:

- Consistent metadata helper usage
- Canonicals are standardized
- Breadcrumb plus FAQ schema is present

Recommended:

- Keep breadcrumb
- Keep FAQ only where it is genuinely helpful and visible
- Improve titles and descriptions based on actual target queries
- Add dedicated OG images for top performers

### About, Contact, FAQ

Current state:

- Pages exist and are indexable
- Metadata is present but generic

Recommended:

- Rewrite titles and descriptions to be search-useful and brand-specific
- Add `Organization` support where appropriate

## Realistic SEO Upside

Schema and metadata improvements can help, but they are not the main growth driver by themselves.

### What Schema/Metadata Can Realistically Improve

- Click-through rate from existing rankings
- Brand understanding
- Snippet quality
- Consistency between content and search presentation
- Sharing previews

### What They Usually Do Not Do Alone

- Create large ranking gains without stronger content and links
- Compensate for weak topical depth
- Replace content expansion in competitive search spaces

### Estimated Impact

Reasonable estimates for this project:

- CTR uplift on pages already getting impressions: about `10% to 25%`
- Sitewide traffic uplift from schema/meta work alone: about `5% to 15%`

These are directional estimates, not guarantees.

The biggest upside is likely to come from:

- Better titles and descriptions
- Stronger site/entity schema
- Better blog/article markup
- Better content expansion and internal linking after that

## Recommended Action Plan

### Immediate

1. Add `WebSite` schema
2. Add `Organization` schema
3. Upgrade weak generic titles and descriptions
4. Add `max-image-preview: large` where appropriate

### Short-Term

1. Convert blog schema from `Article` to `BlogPosting`
2. Show updated dates visibly on refreshed posts
3. Create page-specific OG images for top landing pages

### Ongoing

1. Stop treating `meta keywords` as a real SEO lever
2. Keep breadcrumb schema accurate
3. Use FAQ/HowTo only where they genuinely match page structure
4. Grow content depth in countries, comparisons, templates, and blog based on Search Console data

## Suggested Repo-Level Follow-Up

If implemented in code, the best next patch would be:

1. Extend `src/lib/seo.ts` with builders for `Organization` and `WebSite`
2. Attach those schemas to the homepage
3. Improve metadata on `about`, `contact`, and `faq`
4. Upgrade blog schema to `BlogPosting`
5. Add preview controls for indexable content pages

## Source Links

Primary external references used for this research:

- Google site names: <https://developers.google.com/search/docs/appearance/site-names>
- Google organization structured data: <https://developers.google.com/search/docs/appearance/structured-data/organization>
- Google software app structured data: <https://developers.google.com/search/docs/appearance/structured-data/software-app>
- Google article structured data: <https://developers.google.com/search/docs/appearance/structured-data/article>
- Google FAQ structured data: <https://developers.google.com/search/docs/appearance/structured-data/faqpage>
- Google structured data overview: <https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data>
- Google appearance documentation index: <https://developers.google.com/search/docs/appearance>
- Google robots and preview controls: <https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag>
- Google special meta tags: <https://developers.google.com/search/docs/crawling-indexing/special-tags>
- Google on `meta keywords`: <https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag>
- Schema.org `WebSite`: <https://schema.org/WebSite>
- Schema.org `Organization`: <https://schema.org/Organization>
- Schema.org `SoftwareApplication`: <https://schema.org/SoftwareApplication>
- Schema.org `Article`: <https://schema.org/Article>

## Repo References

- `docs/project-status.md`
- `public/robots.txt`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/sitemap.ts`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/faq/page.tsx`
- `src/app/send-invoice-whatsapp/page.tsx`
- `src/app/free-invoice-maker-freelancers/page.tsx`
- `src/lib/seo.ts`
- `src/components/shared/seo/country-page.tsx`
- `src/components/shared/seo/industry-page.tsx`
- `src/components/shared/seo/comparison-page.tsx`
- `src/components/shared/seo/template-page.tsx`
