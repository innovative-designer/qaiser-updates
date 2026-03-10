# Application Design Revamp Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refresh the entire Free Invoice Kit UI so it feels more polished, consistent, and mobile-first without changing copy, business logic, analytics, routes, saved data behavior, or invoice-generation workflows.

**Architecture:** Keep the existing App Router structure and current feature set intact, but centralize the visual language in global tokens and shared UI primitives before touching route-level screens. Treat the revamp as a foundation-first pass: typography and color tokens, then shared components, then page shells, then workflow screens, then marketing/content pages, then PDF polish, then regression QA.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui primitives, `next/font/google`, Sonner, `@react-pdf/renderer`

---

## Scope

This plan covers:

- Global design tokens, type system, spacing system, shadows, radii, and background treatment
- Shared UI primitives such as buttons, inputs, textareas, selects, cards, badges, tables, labels, and toasts
- Shared chrome such as header, footer, theme toggle, and waitlist banner
- Core workflow screens: home, create invoice, history
- Marketing and SEO landing pages
- Blog index, blog detail, and offline page
- The generated PDF invoice visual design

This plan does **not** allow:

- Copy/content rewrites
- Route changes
- New product features
- Data model changes
- Hook/API/storage changes
- Analytics changes
- Invoice calculation or sharing-flow changes

## Recommended Design Direction

### Option A: Conservative refinement

Keep Geist, keep current shells, only tighten spacing and component styling.

- Lowest risk
- Fastest to ship
- Least noticeable improvement

### Option B: Warm fintech utility system (Recommended)

Switch to a cleaner invoice-first type system, unify all surfaces around one warm editorial-fintech language, normalize all forms around touch-friendly utility patterns, and reduce the current overuse of large radii.

- Best balance of polish and safety
- Stronger consistency across app and marketing pages
- Matches the March 10 mobile-first research well

### Option C: Strong editorial redesign

Push harder into magazine-like layouts, more dramatic display type, and more asymmetry.

- Most visually distinctive
- Highest risk of reducing utility on dense screens
- Too aggressive for the invoice builder unless carefully restrained

## Current-State Audit Summary

### What is already working

- Warm off-white base palette is directionally correct
- Mobile sticky actions already exist on the create screen
- Labels are present on the main invoice form
- The create flow is already single-column friendly on small screens
- Shared primitives already exist, so visual consistency can be improved centrally

### Current gaps to fix

- Typography is inconsistent with the research direction: `Geist Sans` is used globally, numeric styling is not standardized, and headings/forms/data do not feel intentionally separated
- Several primitives drop to `text-sm` on larger breakpoints, which weakens form readability and breaks the “16px minimum form text” rule from the research doc
- Routes use multiple overlapping visual languages: `editorial-shell`, one-off gradient wrappers, rounded-full CTAs, and ad hoc card styles
- Cards, panels, and fields are too rounded in several places, which makes the product feel softer and less precise than an invoice tool should
- Marketing pages duplicate styling instead of reusing shared shells, so polish will drift unless common wrappers are introduced
- The create screen is functional but visually dense; section hierarchy, form grouping, and results-state emphasis can be improved without changing flow
- Waitlist banner still relies on placeholder-heavy email entry and does not match the main form system strongly enough
- History cards and blog/SEO pages are individually styled, but not systematized
- The PDF invoice looks serviceable but is visually behind the app shell

## Radius Direction

The redesign should move away from the current bubble-like radius choices and toward a more structured invoice-product feel.

Use this radius hierarchy:

- Inputs, selects, textareas: `12px`
- Standard buttons: `12px`
- Small buttons: `10px`
- Cards and content panels: `16px`
- Large hero shells and major marketing wrappers: `20px`
- Badges, pills, and status chips: fully rounded is acceptable

Apply these rules:

- Functional surfaces should feel precise, not pillowy
- Rounded-full should be reserved for badges, chips, and occasional small metadata elements
- Do not use `2xl`, `3xl`, or custom `2rem+` radii on ordinary form fields or standard cards unless there is a specific exception documented in the route
- If in doubt, choose the tighter radius

## Hard Guardrails

Do not change behavior in these files unless the change is purely visual:

- `src/hooks/use-invoice-form.ts`
- `src/hooks/use-local-invoices.ts`
- `src/lib/share.ts`
- `src/lib/currencies.ts`
- `src/lib/constants.ts`
- `src/app/api/**`
- `src/content/blog/**`

Do not change:

- Form field names
- Validation rules
- Save/generate/share/delete logic
- JSON-LD payloads
- Page copy, article copy, or CTA wording
- Invoice data shape

## Route Inventory To Include In QA

- `/`
- `/create`
- `/history`
- `/send-invoice-whatsapp`
- `/invoice-generator-pakistan`
- `/free-invoice-maker-freelancers`
- `/stripe-invoice-alternative`
- `/whatsapp-billing-uae`
- `/blog`
- `/blog/[slug]`
- `/offline`

## Task 1: Capture The Baseline Before Any Styling Changes

**Files:**
- Reference only: `src/app/page.tsx`
- Reference only: `src/app/create/page.tsx`
- Reference only: `src/app/history/page.tsx`
- Reference only: `src/app/send-invoice-whatsapp/page.tsx`
- Reference only: `src/app/blog/page.tsx`

**Steps:**
1. Run the app locally with `corepack pnpm dev`.
2. Capture baseline screenshots for desktop and mobile widths for every route in the QA inventory.
3. Record current interactive states for the create page:
   - Empty form
   - Validation error state
   - Generated invoice state
   - Sticky mobile action bar
4. Record the current PDF output for one sample invoice.
5. Store screenshots in a temporary local folder outside git or attach them to the task thread.

**Validation:**
- Baseline visuals exist before any CSS or component changes begin.

## Task 2: Establish The New Foundation Tokens

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Steps:**
1. Replace `Geist Sans` with `Inter` in `src/app/layout.tsx` for the primary sans font.
2. Keep `Geist_Mono` only if it is still needed for ids or code-like data; do not expose it as a major brand font.
3. Update `--font-sans` and `--font-display` in `src/app/globals.css` so body and headings both derive from the new type system.
4. Add explicit typography tokens in `:root` for:
   - body size
   - label size
   - caption size
   - h1, h2, h3 sizes
   - line-height values
   - tracking values
5. Add numeric utility support for invoice amounts and metadata:
   - `font-feature-settings: 'tnum' 1, 'liga' 1, 'calt' 1`
   - a reusable `.tabular-nums` utility if needed
6. Soften the current primary blue slightly per the research recommendation and increase contrast for muted text and input surfaces.
7. Define a tighter surface token set for:
   - app background
   - elevated panels
   - quiet panels
   - form field fill
   - hover fill
   - pressed fill
   - focus ring
8. Replace ad hoc gradient usage with a smaller set of reusable background recipes.
9. Normalize radius scale so shells, cards, fields, and pills feel related instead of independently rounded, with a clear bias toward tighter corners on functional UI.
10. Add reusable shadow recipes for:
   - hero shell
   - default card
   - active button
   - floating mobile bar

**Validation:**
- `corepack pnpm lint`
- Confirm no page loses legibility in light or dark mode after token changes.

## Task 3: Normalize Core UI Primitives

**Files:**
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`
- Modify: `src/components/ui/select.tsx`
- Modify: `src/components/ui/card.tsx`
- Modify: `src/components/ui/badge.tsx`
- Modify: `src/components/ui/label.tsx`
- Modify: `src/components/ui/table.tsx`
- Modify: `src/components/ui/sonner.tsx`

**Steps:**
1. Make all form controls visibly honor the mobile-first rules from the research doc:
   - minimum `44px` touch target
   - `16px` field text on mobile
   - clear focus ring
   - visible contrast against page background
2. Remove `md:text-sm` reductions from `Input` and `Textarea`; field text should stay readable across breakpoints.
3. Improve input padding and internal spacing so text no longer feels cramped.
4. Align `SelectTrigger` with `Input` height, font size, ring behavior, and border treatment.
5. Tighten placeholder styling so placeholders feel secondary but still readable.
6. Rework button variants so:
   - default CTA feels premium but restrained
   - outline buttons no longer look like generic shadcn defaults
   - destructive and ghost buttons remain visually distinct
   - icon buttons keep the same radius and shadow logic as other controls
7. Standardize `Card` shells so route files can stop overriding them inline, and remove oversized curvature from default cards.
8. Make `Badge` variants feel like part of the same system, especially outline and secondary states.
9. Improve `Table` defaults even if table usage is limited now; future screens should inherit the same polish.
10. Update toast styling in `sonner.tsx` to match the new surface/shadow/radius system.

**Validation:**
- Keyboard-tab through inputs, selects, and buttons on `/create`
- Confirm focus rings are visible in both themes
- Confirm no control falls below touch-friendly dimensions

## Task 4: Introduce Shared Layout Wrappers To Reduce Repetition

**Files:**
- Create: `src/components/shared/page-hero.tsx`
- Create: `src/components/shared/page-section.tsx`
- Create: `src/components/shared/info-panel.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/send-invoice-whatsapp/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/offline/page.tsx`

**Steps:**
1. Extract one shared hero shell component for marketing/content pages.
2. Extract one shared section wrapper that handles consistent `max-width`, padding, and vertical rhythm.
3. Extract one shared info panel/card wrapper for repeated supporting blocks.
4. Keep the extracted components purely presentational; no new state or logic.
5. Preserve each page’s existing content order and copy exactly.
6. Replace duplicated hero wrappers in representative pages first before touching all remaining landing pages.
7. Only proceed to the remaining pages once the new wrappers look correct on both desktop and mobile.

**Visual note:**
- Shared wrappers should use restrained radii; large marketing shells can be softer than core app cards, but they should still avoid the current over-rounded look

**Validation:**
- Representative pages render with less duplicated class noise
- No route loses existing links or semantic heading structure

## Task 5: Refresh Shared Chrome

**Files:**
- Modify: `src/components/shared/header.tsx`
- Modify: `src/components/shared/footer.tsx`
- Modify: `src/components/shared/theme-toggle.tsx`
- Modify: `src/components/pro-waitlist-banner.tsx`

**Steps:**
1. Tighten header hierarchy so the logo block, history link, theme toggle, and CTA feel aligned under the new type scale.
2. Make the sticky header slightly more intentional:
   - better contrast over content
   - clearer separation from the page body
   - calmer blur and border treatment
3. Refine the theme toggle so it feels like the same product family as buttons and pills.
4. Rebuild footer spacing and pill links so the footer feels less like a loose afterthought.
5. Restyle the waitlist banner to match the new field and button system.
6. Replace placeholder-only perception in the waitlist field by visually exposing the existing email label text without changing wording.
7. Keep dismissal, submit, and signed-up states unchanged in behavior.

**Validation:**
- Header remains sticky and functional on mobile
- Waitlist submit still works
- Footer links remain clickable and unchanged

## Task 6: Rebuild The Home Page Around The New System

**Files:**
- Modify: `src/app/page.tsx`

**Steps:**
1. Keep the current content structure and CTA copy intact.
2. Refine the hero shell so it feels more premium and less class-by-class assembled.
3. Improve the hierarchy between:
   - eyebrow
   - headline
   - supporting paragraph
   - CTA row
   - stat chips
4. Tighten the invoice mockup so it visually matches the real create/history surfaces.
5. Standardize all supporting cards with the new `Card` foundation instead of bespoke overrides where possible.
6. Normalize section spacing so transitions between workflow, highlights, use cases, waitlist, and final CTA feel deliberate.
7. Keep animation modest and CSS-driven only if added.

**Validation:**
- Desktop hero feels balanced at `1440px`
- Mobile hero keeps CTA and value proposition above the fold
- No content or links changed

## Task 7: Restructure The Create Page Shell Without Changing Workflow

**Files:**
- Modify: `src/app/create/page.tsx`
- Modify: `src/components/ui/separator.tsx` if needed for visual consistency only

**Steps:**
1. Preserve the current section order and all logic.
2. Improve the visual grouping of:
   - business info
   - client info
   - line items
   - financial summary
   - details
   - actions
   - generated invoice result
3. Give each section a clearer header hierarchy and spacing rhythm.
4. Make the mobile top strip feel like a deliberate tool header instead of a temporary compact bar.
5. Reduce visual density in the line-items area by improving row spacing, borders, and column emphasis.
6. Make the summary/totals card feel like a financial checkpoint with clearer emphasis on the final total.
7. Ensure the generated-result card reads as a success state that belongs to the same design system.
8. Keep the page fast to scan on phone-sized screens.
9. Remove oversized rounding from workflow-critical surfaces so the invoice builder feels sharper and more professional.

**Validation:**
- Empty state, partially filled state, and generated state all remain understandable on mobile
- No field order changes
- No button action wiring changes

## Task 8: Upgrade Form Micro-UX On The Create Page

**Files:**
- Modify: `src/app/create/page.tsx`
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`
- Modify: `src/components/ui/select.tsx`
- Modify: `src/components/ui/label.tsx`

**Steps:**
1. Standardize all field labels to sit clearly above controls with consistent gap and weight.
2. Tighten error styling so errors are noticeable without feeling alarming.
3. Use tabular numerals for:
   - totals
   - quantities
   - rates
   - amounts
   - invoice slot count
4. Improve date input styling so it feels consistent with other fields.
5. Make disabled business-info fields visibly read-only but still legible.
6. Improve the line-item amount display box so it visually aligns with active inputs while remaining non-editable.
7. Ensure the add/remove line-item controls feel intentional and easy to hit on touch devices.
8. Keep all existing labels, placeholders, and field ids.

**Validation:**
- iOS/Safari rule is respected: no input text smaller than `16px`
- Error and disabled states are distinguishable in both themes

## Task 9: Refine Sticky Actions And Completion States

**Files:**
- Modify: `src/app/create/page.tsx`
- Modify: `src/components/ui/button.tsx`

**Steps:**
1. Rebuild the mobile sticky action bar so it feels like a floating utility dock instead of a pinned strip.
2. Increase separation between the sticky dock and page content using shadow, blur, and inner spacing.
3. Ensure button emphasis follows the intended priority:
   - Generate Invoice = primary
   - Save Draft = secondary
4. Keep button copy exactly the same.
5. Refine loading states so spinners and text align cleanly.
6. Restyle the success card actions so WhatsApp, Download, Open PDF, and Copy Link feel like part of one action cluster.

**Validation:**
- Sticky bar does not overlap key content on small screens
- Save and Generate still trigger the same handlers
- Success actions all still work

## Task 10: Revamp The History Experience

**Files:**
- Modify: `src/app/history/page.tsx`

**Steps:**
1. Keep the current content and actions intact.
2. Improve the page hero so it aligns with the updated home/create language.
3. Make the loading and empty states feel deliberately designed, not placeholder blocks.
4. Rebuild invoice cards around a clearer hierarchy:
   - date/meta
   - client/business identity
   - total
   - metadata chips
   - actions
5. Improve action-button grouping so destructive, viewing, and sharing actions are easier to parse.
6. Use tabular numerals for totals and ids where appropriate.
7. Ensure cards work cleanly at one-column mobile widths before trusting the two-column desktop grid.

**Validation:**
- Delete, download, open, copy, and WhatsApp actions remain unchanged
- Cards do not overflow at narrow widths

## Task 11: Align All Marketing And SEO Landing Pages

**Files:**
- Modify: `src/app/send-invoice-whatsapp/page.tsx`
- Modify: `src/app/invoice-generator-pakistan/page.tsx`
- Modify: `src/app/free-invoice-maker-freelancers/page.tsx`
- Modify: `src/app/stripe-invoice-alternative/page.tsx`
- Modify: `src/app/whatsapp-billing-uae/page.tsx`
- Modify: `src/app/page.tsx`
- Modify: shared wrappers created in Task 4

**Steps:**
1. Migrate each landing page to the shared hero/section/panel system.
2. Keep existing copy blocks, JSON-LD, metadata, and CTA destinations unchanged.
3. Remove one-off radius, border, and shadow values wherever the shared system already covers them.
4. Replace ad hoc rounded-full CTA styling if it clashes with the new global button system.
5. Keep page-specific accents only where they strengthen the page, not where they fragment the app identity.
6. Review all supporting cards so icon blocks, eyebrow labels, and CTA panels feel like one family across routes.

**Visual note:**
- Marketing pages can retain slightly softer large containers, but standard cards and buttons should not return to the overly rounded style

**Validation:**
- Every landing page still reads as the same product
- Metadata and content remain unchanged

## Task 12: Align Blog And Offline Pages

**Files:**
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/offline/page.tsx`
- Modify: shared wrappers from Task 4

**Steps:**
1. Move blog pages closer to the same shell language as the app without flattening editorial richness.
2. Keep the prose layout readable and generous, especially on mobile.
3. Make article metadata, badges, and CTA blocks inherit the refreshed design system.
4. Tighten the offline page so it feels like part of the core app, not a separate microsite.
5. Keep all blog content, prose markup, and article HTML untouched.

**Validation:**
- Long-form prose still has strong readability
- Offline page remains simple and clear

## Task 13: Refresh The PDF Invoice Visual Design

**Files:**
- Modify: `src/components/pdf/invoice-document.tsx`

**Steps:**
1. Keep the current invoice data mapping exactly the same.
2. Modernize the PDF palette to align with the refreshed app system:
   - warm paper background
   - calmer accent blue
   - cleaner dividers
   - more deliberate hierarchy
3. Improve masthead spacing and meta-card styling.
4. Improve line-item table spacing, row rhythm, and numeric alignment.
5. Apply tabular-style alignment principles to totals even if the PDF font family stays system-safe.
6. Refine notes and footer styling so the document feels more premium and less template-like.
7. Do not change visible invoice wording beyond purely presentational casing/spacing adjustments if absolutely required.

**Validation:**
- Generate a PDF before and after the restyle
- Confirm invoice totals, dates, ids, and notes still render correctly

## Task 14: Dark Mode Consistency Pass

**Files:**
- Modify as needed across:
  - `src/app/globals.css`
  - shared UI primitives
  - route files touched earlier

**Steps:**
1. Review every updated surface in dark mode after the light theme is stable.
2. Reduce over-reliance on translucent gray panels if they muddy contrast.
3. Ensure input fills, focus rings, borders, and shadows stay readable in dark mode.
4. Check that success, destructive, and accent states remain clear without oversaturation.
5. Make sure the header, floating dock, hero shells, and cards all belong to the same dark palette logic.

**Validation:**
- Every route in the QA inventory is manually checked in dark mode
- Contrast remains acceptable for body text, muted text, and controls

## Task 15: Regression And Finish Pass

**Files:**
- Review all modified files

**Steps:**
1. Run `corepack pnpm lint`.
2. Run `corepack pnpm build`.
3. Manually test:
   - create invoice draft save
   - invoice validation
   - PDF generation
   - WhatsApp share path
   - PDF download
   - copy-link action
   - invoice delete
   - theme toggle
   - waitlist submit
4. Compare updated screens against the baseline screenshots from Task 1.
5. Fix visual regressions only; do not sneak in copy or behavior changes during cleanup.
6. Prepare before/after screenshots for home, create, history, one SEO route, blog, offline, and a PDF sample.

**Validation:**
- `corepack pnpm lint`
- `corepack pnpm build`
- Manual smoke test completed on desktop and mobile widths

## Implementation Notes For The Engineer

- Start with the shared system. Do not redesign routes first and hope the primitives catch up later.
- Use the March 10 research doc as the source of truth for font sizing, touch targets, and invoice-app mobile behavior.
- Favor extraction over copy-pasting new class stacks into every page.
- Preserve semantics: keep headings, links, buttons, and labels as they are.
- Treat corner radius as part of product tone: tighter corners for utility, softer corners only for supporting decorative elements.
- If a change feels like a feature, stop. This project is visual only.
- Keep commits small and thematic:
  - `feat: refresh global design tokens`
  - `feat: unify form and surface primitives`
  - `feat: restyle invoice builder and history views`
  - `feat: align marketing and blog layouts`
  - `feat: polish pdf invoice design`

## Definition Of Done

- The app looks like one coherent product instead of several adjacent styles
- Forms are easier to scan and use on mobile
- Inputs and actions meet touch-friendly sizing
- Typography feels invoice/data-friendly, especially around totals and metadata
- Home, create, history, blog, offline, and all SEO pages share the same visual grammar
- The PDF invoice feels visually upgraded
- No copy changed
- No functionality changed
- Lint/build/manual smoke checks pass
