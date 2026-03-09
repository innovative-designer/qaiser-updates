# Editorial Utility Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rework Free Invoice Kit into a cohesive Editorial Utility design system with a mobile-first invoice workflow and shared visual language across app, marketing, and content pages.

**Architecture:** Start by replacing the visual foundation in the global stylesheet, then refactor shared shell components so every route inherits the same language. After that, restyle the highest-traffic surfaces in descending product importance: landing and SEO templates, invoice creation, history, and blog pages, while preserving the existing invoice state and PDF workflows.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Lucide React, Sonner

---

## Completion Status (updated 2026-03-08)

| Task | Status | Notes |
|------|--------|-------|
| Task 1: Shared visual foundation | ✅ Done | `globals.css` — warm palette, editorial shells, paper-grid texture |
| Task 2: Shared chrome + promotional surfaces | ✅ Done | Header, footer, waitlist banner, button/card/input primitives |
| Task 3: Landing + SEO template system | ✅ Done | Home page + 5 SEO landing pages unified |
| Task 4: Invoice creation (touch-first) | ✅ Done | Card sections, sticky mobile bar, bottom-sheet preview, validation rings |
| Task 5: History + blog surfaces | ✅ Done | Card-first history, branded blog index + article shell |
| Task 6: Validation | ✅ Done | `pnpm lint` 0 errors, `pnpm build` 20 routes, 0 errors |

### Post-Redesign Mobile UX Refinements (2026-03-08)

| Refinement | Status | Commit |
|------------|--------|--------|
| Compact mobile tool header replacing editorial hero on `/create` | ✅ Done | `cab700a` |
| Editorial hero hidden on mobile, preserved on desktop (`lg:block`) | ✅ Done | `cab700a` |
| ProWaitlistBanner moved below form on mobile | ✅ Done | `cab700a` |
| Invoice Ready buttons: branded WhatsApp SVG icon, 2×2 grid layout | ✅ Done | `cab700a` |
| Unused `MessageCircle` import removed | ✅ Done | `cab700a` |

**Branch:** `ui-ux-update` — pushed to `origin/ui-ux-update`
**Build:** ✅ 20 routes, 0 errors
**Lint:** ✅ 0 errors

---

### Task 1: Establish the shared visual foundation

**Files:**
- Modify: `src/app/globals.css`
- Check: `src/app/layout.tsx`

**Step 1: Review the existing theme variables and font wiring**

Read:
- `src/app/globals.css`
- `src/app/layout.tsx`

Expected: confirm the current app uses Geist variables and a light-only theme provider.

**Step 2: Replace the current tokens with the Editorial Utility palette and surface system**

Implement:
- warm background and muted surface tokens
- stronger ink foreground tokens
- cobalt primary and mint accent tokens
- larger radii and updated shadows
- shared utility classes for section spacing, editorial shells, and atmospheric backgrounds
- body-level background treatment and improved selection styling

Expected: all routes inherit the new palette and spacing rhythm without changing route logic.

**Step 3: Verify there is no token drift**

Run:
```bash
rg --line-number "stone-|slate-|bg-white|text-stone|border-stone" src
```

Expected: identify components that still rely on ad hoc old palette values and need follow-up cleanup.

### Task 2: Refactor shared chrome and reusable promotional surfaces

**Files:**
- Modify: `src/components/shared/header.tsx`
- Modify: `src/components/shared/footer.tsx`
- Modify: `src/components/pro-waitlist-banner.tsx`
- Modify: `src/components/ui/button.tsx`
- Check: `src/components/ui/card.tsx`

**Step 1: Update the header to match the new mobile-first hierarchy**

Implement:
- cleaner logo treatment
- stronger CTA emphasis
- reduced visual noise on small screens
- better touch target sizing for navigation and CTA buttons

Expected: header feels consistent across marketing and app pages and remains easy to use on mobile.

**Step 2: Refactor the footer into a branded, lightweight closing surface**

Implement:
- updated background and border treatment
- more intentional content spacing
- stronger product continuity with the rest of the site

Expected: footer supports the new identity rather than feeling like a default scaffold.

**Step 3: Restyle the waitlist banner and button primitives**

Implement:
- tactile banner surface
- stronger form field and button contrast
- touch-friendly button sizing and motion feedback

Expected: banner, CTAs, and shared buttons align visually with the new design system.

### Task 3: Rebuild the landing and SEO template system

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/invoice-generator-pakistan/page.tsx`
- Modify: `src/app/send-invoice-whatsapp/page.tsx`
- Modify: `src/app/free-invoice-maker-freelancers/page.tsx`
- Modify: `src/app/stripe-invoice-alternative/page.tsx`
- Modify: `src/app/whatsapp-billing-uae/page.tsx`

**Step 1: Redesign the home page around a mobile product story**

Implement:
- a stronger hero with mobile-oriented invoice mockup
- alternating editorial sections instead of flat repeated grids
- visible CTA hierarchy and proof blocks
- smoother continuity between hero, feature story, and closing CTA

Expected: the home page communicates speed, trust, and WhatsApp-native invoicing immediately.

**Step 2: Convert SEO landing pages to a shared branded template**

Implement:
- common hero language
- shared card and FAQ treatment
- consistent CTA modules back to `/create`
- same palette, type, spacing, and surface language as the home page

Expected: SEO pages feel like variants of one product site rather than one-off pages.

**Step 3: Review for mobile readability**

Check:
- headings do not overpower small screens
- FAQ cards and CTA modules remain readable under ~390px width

Expected: no cramped sections or overflow on narrow devices.

### Task 4: Rework the invoice creation experience for touch-first use

**Files:**
- Modify: `src/app/create/page.tsx`
- Modify: `src/components/invoice-preview/invoice-preview.tsx`
- Check: `src/hooks/use-invoice-form.ts`
- Check: `src/components/ui/sheet.tsx`
- Check: `src/components/ui/input.tsx`
- Check: `src/components/ui/textarea.tsx`
- Check: `src/components/ui/select.tsx`

**Step 1: Preserve existing form logic and inventory the UI sections**

Read:
- `src/app/create/page.tsx`
- `src/hooks/use-invoice-form.ts`

Expected: confirm that changes should stay in presentation and interaction hierarchy, not state management.

**Step 2: Rebuild the page shell into a mobile-first workflow**

Implement:
- compact summary block near the top
- clearer section cards for Business, Client, Items, Totals, Notes
- improved spacing and labels for easier scanning
- tighter grouping of saved-business controls

Expected: the form reads as a guided workflow rather than a long dense canvas.

**Step 3: Add a sticky mobile action bar**

Implement:
- persistent mobile access to Preview, Save, and Generate
- loading and disabled states reflected in the bar
- safe spacing and clear primary action emphasis

Expected: key actions stay in thumb reach while scrolling.

**Step 4: Upgrade the preview presentation**

Implement:
- stronger invoice card styling
- better mobile sheet presentation
- desktop side preview that visually matches the new page shell

Expected: the preview feels premium and consistent with the product branding.

**Step 5: Make validation and status cues more obvious**

Implement:
- section-level error visibility
- clearer PDF/share readiness status
- less dependence on toast alone for critical feedback

Expected: users can understand what is missing or ready without hunting through the screen.

### Task 5: Redesign history and editorial content surfaces

**Files:**
- Modify: `src/app/history/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`

**Step 1: Rebuild invoice history as a card-first mobile experience**

Implement:
- richer invoice cards on mobile
- stronger action grouping with clearer labels or affordances
- desktop layout that remains denser but still uses the same component language

Expected: invoice history feels like part of the product, not a fallback admin screen.

**Step 2: Restyle the blog index**

Implement:
- branded page hero
- stronger article cards
- clearer metadata and reading cues

Expected: the blog index visually matches the product site.

**Step 3: Restyle the blog article shell**

Implement:
- editorial header treatment
- improved prose container and CTA block
- stronger spacing and contrast for reading on mobile

Expected: articles feel branded and polished while remaining readable.

### Task 6: Validate the redesign and remove visual regressions

**Files:**
- Check: `src/app/page.tsx`
- Check: `src/app/create/page.tsx`
- Check: `src/app/history/page.tsx`
- Check: `src/app/blog/page.tsx`
- Check: `src/app/blog/[slug]/page.tsx`
- Check: `src/app/invoice-generator-pakistan/page.tsx`
- Check: `src/app/send-invoice-whatsapp/page.tsx`

**Step 1: Run lint**

Run:
```bash
pnpm lint
```

Expected: PASS without introducing TypeScript or ESLint issues.

**Step 2: Run production build**

Run:
```bash
pnpm build
```

Expected: PASS and confirm route generation remains healthy.

**Step 3: Manual responsive review**

Check:
- `/`
- `/create`
- `/history`
- `/blog`
- one blog post
- one SEO landing page

Expected:
- no horizontal overflow on narrow screens
- primary actions remain obvious and touch-friendly
- header/footer/readability are visually consistent
- create flow remains functional with preview and action states

**Step 4: Prepare commit only if requested**

Run only if asked:
```bash
git status --short
git add src/app src/components docs/plans
git commit -m "feat: redesign Free Invoice Kit with editorial mobile-first UI"
```

Expected: commit stays optional and only happens on explicit user request.
