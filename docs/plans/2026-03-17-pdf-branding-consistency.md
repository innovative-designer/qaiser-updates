# PDF Branding Consistency Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make all invoice PDF templates present branding as a unified masthead block and standardize `Bill From` / `Bill To` behavior across templates.

**Architecture:** Introduce a small shared helper module for party display logic, then refactor each PDF template to use the same sender fallback and contact-line derivation. Keep each template’s visual identity, but align its masthead and address semantics to one shared model.

**Tech Stack:** Next.js, TypeScript, React PDF (`@react-pdf/renderer`)

---

### Task 1: Document the approved PDF direction

**Files:**
- Create: `docs/plans/2026-03-17-pdf-branding-consistency-design.md`
- Create: `docs/plans/2026-03-17-pdf-branding-consistency.md`

**Step 1: Write the design note**

Capture the masthead branding rule, the `Bill From` fallback rule, and the cross-template normalization scope.

**Step 2: Save the implementation plan**

Document the shared helper approach, touched templates, and validation commands.

### Task 2: Add shared PDF party helpers

**Files:**
- Create: `src/components/pdf/shared/parties.ts`

**Step 1: Add a `getBillFromName()` helper**

Return trimmed `senderName` when present, otherwise trimmed `businessName`, otherwise `Your Business`.

**Step 2: Add `getBusinessLines()` and `getClientLines()` helpers**

Return filtered contact-detail arrays for sender and client sections.

### Task 3: Normalize masthead branding blocks

**Files:**
- Modify: `src/components/pdf/templates/modern.tsx`
- Modify: `src/components/pdf/templates/minimal.tsx`
- Modify: `src/components/pdf/templates/classic.tsx`
- Modify: `src/components/pdf/templates/bold.tsx`
- Modify: `src/components/pdf/templates/compact.tsx`
- Modify: `src/components/pdf/templates/ledger.tsx`

**Step 1: Update masthead structure**

Ensure each template’s masthead groups `businessLogo` and `businessName` as one visible branding unit.

**Step 2: Preserve template character**

Use each template’s existing layout language where possible instead of forcing one identical masthead layout across all files.

### Task 4: Standardize `Bill From` and `Bill To`

**Files:**
- Modify: `src/components/pdf/templates/modern.tsx`
- Modify: `src/components/pdf/templates/minimal.tsx`
- Modify: `src/components/pdf/templates/classic.tsx`
- Modify: `src/components/pdf/templates/bold.tsx`
- Modify: `src/components/pdf/templates/compact.tsx`
- Modify: `src/components/pdf/templates/ledger.tsx`

**Step 1: Replace any `From` labels with `Bill From`**

Apply the same label everywhere.

**Step 2: Add explicit `Bill From` blocks where missing**

For templates that currently only render `Bill To`, introduce a matching `Bill From` section.

**Step 3: Use the shared fallback**

Primary name in `Bill From` must use `senderName` first, then `businessName`.

### Task 5: Validate the refactor

**Files:**
- Modify: `src/components/pdf/shared/parties.ts`
- Modify: `src/components/pdf/templates/modern.tsx`
- Modify: `src/components/pdf/templates/minimal.tsx`
- Modify: `src/components/pdf/templates/classic.tsx`
- Modify: `src/components/pdf/templates/bold.tsx`
- Modify: `src/components/pdf/templates/compact.tsx`
- Modify: `src/components/pdf/templates/ledger.tsx`

**Step 1: Run lint**

Run: `corepack pnpm lint`

Expected: No errors. Existing warnings outside the changed scope may remain.

**Step 2: Review the diff**

Run: `git diff -- src/components/pdf/shared/parties.ts src/components/pdf/templates/modern.tsx src/components/pdf/templates/minimal.tsx src/components/pdf/templates/classic.tsx src/components/pdf/templates/bold.tsx src/components/pdf/templates/compact.tsx src/components/pdf/templates/ledger.tsx docs/plans/2026-03-17-pdf-branding-consistency-design.md docs/plans/2026-03-17-pdf-branding-consistency.md`

Expected: Diff shows only the shared helper addition, template normalization, and planning docs.
