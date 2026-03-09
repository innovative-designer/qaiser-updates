# Sitewide Theme Toggle Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a persistent sitewide dark/light toggle in the header and make the main Free Invoice Kit surfaces readable in both themes.

**Architecture:** Use `next-themes` for persisted theming, a small client toggle component in the shared header, and token-level dark-mode styling in `globals.css`. Then patch the main page/card surfaces that currently rely on light-only white backgrounds so dark mode remains usable instead of becoming low-contrast.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, `next-themes`, shadcn/ui

---

### Task 1: Document the approved design

**Files:**
- Create: `docs/plans/2026-03-10-sitewide-theme-toggle-design.md`

**Step 1: Save the design note**

Document:
- sitewide scope
- header placement
- persisted theming
- editorial dark-mode direction

### Task 2: Enable real theming and add the shared toggle

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/shared/theme-toggle.tsx`
- Modify: `src/components/shared/header.tsx`

**Step 1: Stop forcing light mode**

Update the root `ThemeProvider` to:
- use `defaultTheme="system"`
- enable system theme support
- remove forced light mode
- disable transition flashes during theme changes

**Step 2: Add the header toggle**

Implement a client theme toggle with:
- mounted-state hydration guard
- sun/moon affordance
- clear `aria-label`
- minimum 44px touch target

### Task 3: Refine the dark theme foundation

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/shared/footer.tsx`
- Modify: `src/components/pro-waitlist-banner.tsx`
- Modify: `src/components/invoice-preview/invoice-preview.tsx`

**Step 1: Improve `.dark` tokens**

Keep the Editorial Utility look in dark mode by updating:
- background
- card/popover
- primary/accent
- muted/border/input/ring

**Step 2: Fix shared surfaces**

Add dark variants for:
- header/footer shell
- editorial shell/panel utilities
- waitlist banner
- invoice preview container

### Task 4: Patch route-level light-only cards and gradients

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/create/page.tsx`
- Modify: `src/app/history/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: representative SEO/offline pages under `src/app/`

**Step 1: Add dark variants where pages hardcode light whites**

Patch the main routes that currently use:
- `bg-white/*`
- `border-black/10`
- light-only gradient wrappers

**Step 2: Preserve readability**

Ensure dark surfaces still work with existing `text-foreground` and `text-muted-foreground` tokens.

### Task 5: Validate

**Files:**
- Check: repository search and lint/build results

**Step 1: Verify implementation**

Run:
- `corepack pnpm lint`
- `corepack pnpm build`

**Step 2: Sanity-check theme scope**

Search for remaining forced-light configuration:
- `rg -n "forcedTheme|defaultTheme=\\\"light\\\"" src`

Expected:
- no forced-light configuration remains
