# PostHog SEO-Focused Implementation Context

Date: 2026-03-11
Target site: https://www.freeinvoicekit.com
Reference PageSpeed report:
https://pagespeed.web.dev/analysis/https-www-freeinvoicekit-com/yil6gqfsg4?form_factor=desktop

## Goal
Implement a production analytics setup that preserves maximum SEO performance while still allowing useful product analytics on non-SEO app pages.

## Confirmed Findings From The PageSpeed Report
Desktop Performance score: 83/100

What is good:
- First Contentful Paint: 0.2 s
- Largest Contentful Paint: 0.6 s
- Speed Index: 0.6 s
- Time to Interactive: 1.9 s
- Cumulative Layout Shift: 0
- Root document response time: about 4 ms

What is hurting performance:
- Total Blocking Time: 390 ms
- Max Potential First Input Delay: 350 ms
- Main-thread work: 1.3 s
- JavaScript execution time: about 0.9 s
- Reduce unused JavaScript: estimated savings 171 KiB
- 3 long main-thread tasks were found

Main CPU / JS contributors in the report:
- https://us.i.posthog.com/static/array.js: about 370 ms total CPU time
- https://www.freeinvoicekit.com/_next/static/chunks/c617811a1525908c.js: about 206 ms total CPU time
- https://www.freeinvoicekit.com/_next/static/chunks/dfd1def1c0f53fa3.js: about 194 ms total CPU time
- https://us-assets.i.posthog.com/static/posthog-recorder.js?v=1.360.0: about 108 ms total CPU time

Longest tasks:
- posthog-recorder.js: 354 ms
- app chunk dfd1def1c0f53fa3.js: 150 ms
- posthog array.js: 76 ms

Unused JavaScript details from Lighthouse:
- posthog-recorder.js: about 55 KiB wasted
- posthog array.js: about 34 KiB wasted
- ee9d7c16d7cecaa9.js: about 34 KiB wasted
- c617811a1525908c.js: about 27 KiB wasted
- posthog surveys.js: about 26 KiB wasted

## Interpretation
The page paints quickly. The main issue is not server response time and not above-the-fold rendering.

The score is being pulled down mostly by JavaScript work after render, especially third-party PostHog scripts plus some app chunks. In other words:
- initial render is already fast
- the browser is doing too much JS work afterward
- PostHog replay / recorder is one of the biggest contributors

## Recommendation That Was Agreed
Use PostHog in production only in a minimal, route-based way.

Final agreed strategy:
- SEO pages: no PostHog at all
- App pages only: lazy-loaded PostHog after render / idle
- Disable heavy PostHog features
- Track only explicit, high-value events

Specific rules:
1. Do NOT load PostHog on SEO landing pages
   Examples:
   - home page
   - blog pages
   - marketing pages
   - tool landing pages

2. Load PostHog only on product / app pages
   Example:
   - /create

3. Lazy load PostHog after page render
   Intended behavior:
   - render UI first
   - then load analytics after idle / non-critical phase

4. Disable heavy PostHog features
   Disable:
   - session recording
   - surveys
   - autocapture
   - heatmaps if enabled anywhere

5. Track only essential business events
   Examples:
   - invoice_created
   - pdf_downloaded
   - share_clicked

## Important Product Decision
Question asked: should PostHog be used in production?

Answer:
- Yes, if product analytics are needed and it is configured minimally.
- No, not as a globally loaded full-feature setup on SEO pages.

The strongest recommendation for this site is:
- no PostHog on SEO pages
- minimal lazy-loaded analytics on app pages only

## Implementation Intent For The Next Session
The next session should implement the following in the actual FreeInvoiceKit codebase:

1. Find the current PostHog initialization point.
2. Move PostHog behind route gating.
3. Exclude all SEO pages from loading PostHog client-side.
4. Load PostHog only on app routes such as /create.
5. Lazy load PostHog after render or when the browser is idle.
6. Configure PostHog with heavy features disabled.
7. Replace broad tracking with explicit event calls only.
8. Verify that no PostHog network requests are made on SEO pages.
9. Verify that app pages still emit the required business events.
10. Re-run Lighthouse / PageSpeed after implementation.

## Suggested Technical Shape
The exact code depends on the app structure, but the intended architecture is:
- central analytics module
- route allowlist for analytics-enabled pages
- dynamic import for posthog-js
- client-only initialization
- deferred initialization using requestIdleCallback or a safe timeout fallback
- explicit helper methods for captureEvent()

Possible guard logic:
- if route is SEO page: do nothing
- if route is app page: schedule lazy import and init

PostHog config target:
- disable autocapture
- disable session recording
- disable surveys
- avoid loading recorder or survey extensions
- send only explicit events

## Blocker Encountered In This Session
Implementation was not possible in the current workspace because the FreeInvoiceKit codebase was not present.

What was checked:
- /mnt/c/pplus/ehr is the PsychPlus EHR repo
- /mnt/c/pplus/ui/ReactUI is a PsychPlus frontend monorepo
- no FreeInvoiceKit project was found in the current workspace
- no matching PostHog integration for FreeInvoiceKit was available to patch here

Because of that, no code changes were made in this session.

## What The Next Session Should Ask / Verify Immediately
- confirm the correct repo path for QuickBill / FreeInvoiceKit
- inspect package.json for posthog-js usage
- locate the app shell or root layout where analytics is initialized
- identify which routes are SEO pages vs app pages
- verify whether /create is indexed or acts as a landing page

## Acceptance Criteria
The work should be considered complete when:
- SEO pages load no PostHog script and make no PostHog requests
- app pages load PostHog only after render / idle
- session replay, surveys, and autocapture are disabled
- only explicit event tracking remains
- business-critical events still fire correctly
- Lighthouse / PageSpeed improves, especially Total Blocking Time and long tasks

## Notes For The New Session
The user said they will start a new session and refer to this file for implementation. The next session should work directly in the QuickBill / FreeInvoiceKit repo, not in the PsychPlus EHR repo.
