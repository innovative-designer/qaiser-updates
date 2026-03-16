# Invoice Identity Grouping Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Separate brand identity from sender identity in the create invoice form so the logo and business name are grouped together while sender name lives in `Bill From`.

**Architecture:** Keep the current invoice data model and saved-business localStorage flow intact. Refactor only the `src/app/create/page.tsx` layout and read-only/editable rendering so the UI matches the existing PDF information architecture.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui

---

### Task 1: Document the approved UI direction

**Files:**
- Create: `docs/plans/2026-03-16-invoice-identity-grouping-design.md`
- Create: `docs/plans/2026-03-16-invoice-identity-grouping.md`

**Step 1: Write the design note**

Describe the problem, approved layout, and behavior constraints for brand identity vs sender identity.

**Step 2: Save the implementation plan**

Capture the concrete refactor steps, affected file, and validation commands.

### Task 2: Restructure the top invoice section

**Files:**
- Modify: `src/app/create/page.tsx`

**Step 1: Replace the top-left logo-only block**

Create a `Brand Identity` section that contains:

- logo upload
- `Business / Brand Name` field in edit mode
- compact brand preview in read-only mode

**Step 2: Preserve invoice metadata layout**

Keep `Invoice No.`, `Due Date`, and `Currency` in the top-right area, adjusting spacing only as needed to match the new brand card.

**Step 3: Keep validation signals intact**

Ensure `errors.businessName` visually maps to the new brand section instead of the old `From` block.

### Task 3: Move sender identity into Bill From

**Files:**
- Modify: `src/app/create/page.tsx`

**Step 1: Remove `Business Name` from `Bill From`**

Delete the field from the editable `From` form and the read-only summary.

**Step 2: Promote `senderName` inside `Bill From`**

Place the field at the top of the section, relabel it `Sender Name`, and keep it optional.

**Step 3: Update read-only content**

Show sender name first in the read-only `Bill From` view, followed by business contact fields.

### Task 4: Preserve save/edit/clear behavior

**Files:**
- Modify: `src/app/create/page.tsx`

**Step 1: Keep localStorage wiring unchanged**

Continue loading and saving `businessName`, `senderName`, business contact fields, and logo under the existing storage key.

**Step 2: Keep single editability toggle**

Ensure both the new `Brand Identity` block and the `Bill From` block respect the existing `businessEditable` state.

**Step 3: Adjust labels or helper copy if needed**

Make button copy and section copy accurate for the new grouping without expanding scope into a data-model redesign.

### Task 5: Validate the refactor

**Files:**
- Modify: `src/app/create/page.tsx`

**Step 1: Run lint for the touched file path through the project lint command**

Run: `pnpm lint`

Expected: No new lint errors from the refactor.

**Step 2: Review the diff**

Run: `git diff -- src/app/create/page.tsx docs/plans/2026-03-16-invoice-identity-grouping-design.md docs/plans/2026-03-16-invoice-identity-grouping.md`

Expected: Diff shows only the documented layout refactor and new planning docs.
