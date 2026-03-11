# SEO Page QA Checklist

Use this checklist before merging any new indexable SEO page.

## Metadata

- Confirm the page title is unique across the site.
- Confirm the meta description is unique and matches the visible page intent.
- Confirm `alternates.canonical` points at the final production URL.
- Confirm locale alternates are present for geo-targeted pages when relevant.
- Confirm Open Graph and Twitter metadata inherit correctly or override intentionally.

## Content And Schema

- Confirm the H1 and supporting copy match the target search intent without synthetic filler.
- Confirm FAQ, breadcrumb, `HowTo`, or other schema is only present when supported by visible page content.
- Confirm the rendered JSON-LD includes the correct canonical URL and page-specific labels.
- Confirm no page promises unsupported product behavior such as fake template prefills or hosted PDF flows.

## Linking And Indexing

- Confirm the page is included in `src/app/sitemap.ts` if it should be indexable.
- Confirm the page is not primarily linked toward `noindex` utility routes.
- Confirm at least one existing indexable page links to the new page naturally.
- Confirm the page links onward to adjacent indexable pages with real topical relevance.

## Validation

- Run `corepack pnpm lint`.
- Run `pnpm build` outside the sandbox before release.
