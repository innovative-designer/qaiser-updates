# Playwright Local Test Handoff

## Purpose

Use this document to hand Sprint 1 local QA to Playwright MCP.

The goal is to verify the implemented Sprint 1 experience locally before push:

- landing page at `/`
- invoice creation page at `/create`
- live invoice preview
- validation
- local save flow
- basic SEO surface

## Local Run Instructions

Start the app locally before running Playwright MCP.

Preferred:

```bash
pnpm dev
```

If `pnpm` is not available:

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm dev
```

Expected local URL:

```text
http://localhost:3000
```

Use `http://127.0.0.1:3000` as fallback if needed.

## Important Context

- This document is for Sprint 1 local QA scope only.
- PDF generation is implemented in the current repo, but it was intentionally out of scope for the original Sprint 1 Playwright pass.
- "Pro Coming Soon" was intentionally text-only in Sprint 1. The real waitlist capture shipped later in Sprint 3.
- Invoices save to browser local storage via IndexedDB.
- Currency may auto-detect on load. Do not hard-fail tests on the default currency value unless the user explicitly changes it in the test.

## Recommended Playwright MCP Approach

- Use visible text, labels, and roles first.
- Prefer assertions on user-visible outcomes over CSS details.
- Treat responsive/mobile preview as a separate scenario using a mobile viewport.
- For persistence checks, use the same browser context unless the specific step says reload.
- If a toast appears, assert the text content rather than animation timing.

## Test Scope

### 1. Landing Page Smoke Test

Navigate to `/`.

Verify:

- Header shows `QuickBill`
- Main CTA `Create Invoice` is visible
- Secondary CTA `See how it works` is visible
- Hero headline includes `Create polished invoices in 30 seconds.`
- Section heading `How It Works` exists
- Section heading `Features` exists
- Section heading `Pro Coming Soon` exists
- Footer contains `Privacy` and `Terms`

### 2. Landing Page Navigation

From `/`:

- click `Create Invoice`
- verify navigation to `/create`
- verify page heading `Create Invoice`

Then:

- click `Back to landing page`
- verify navigation back to `/`

### 3. Create Page Initial Render

Navigate to `/create`.

Verify these sections render:

- `Business Info`
- `Client Info`
- `Line Items`
- `Financial Summary`
- `Details`
- desktop text `Live Preview` when viewport is desktop

Verify these fields render:

- `Business Name`
- `Email`
- `Phone`
- `Address`
- `Client Name`
- `Company`
- `Tax Rate (%)`
- `Discount`
- `Currency`
- `Due Date`
- `Notes`

Verify one line item row exists by default.

### 4. Validation Test

On `/create`, without filling required fields:

- click `Save Invoice`

Verify:

- inline error `Business name is required`
- inline error `Client name is required`
- line item validation text `At least one line item with description and rate is required`
- toast text `Fix the highlighted fields before saving.`

### 5. Live Calculation Test

On `/create`, enter:

- `Business Name`: `Studio North`
- `Client Name`: `Amina Yusuf`
- first line item `Description`: `Website design retainer`
- first line item `Qty`: `2`
- first line item `Rate`: `150`
- `Tax Rate (%)`: `10`
- `Discount`: `20`
- `Notes`: `Thank you for your business.`

Verify in the form:

- line item amount becomes `300.00` in the selected currency format
- subtotal reflects `300.00`
- tax amount reflects `30.00`
- total reflects `310.00`

Verify in the preview:

- `Studio North` appears
- `Amina Yusuf` appears
- `Website design retainer` appears
- notes text appears
- total reflects the same computed amount as the form

Do not hardcode the currency symbol if auto-detect selected a non-USD currency. Assert the numeric amount and consistent formatting where possible.

### 6. Line Item Add/Remove Test

On `/create`:

- click `Add Line Item`
- verify there are now at least two line item descriptions
- fill the second row description with `Hosting`
- fill second row qty with `1`
- fill second row rate with `50`
- verify totals increase accordingly

Then:

- remove the second line item using the trash button
- verify `Hosting` no longer appears
- verify totals drop back accordingly

Also verify:

- the only remaining initial row cannot be removed into zero rows

### 7. Due Date Validation

On `/create`:

- fill required business/client fields and one valid line item
- set `Due Date` to a past date if the browser allows manual input
- click `Save Invoice`

Verify:

- inline error `Due date must be today or later`

If the native date input blocks invalid past-date entry in the browser, note that behavior as acceptable and do not fail the run.

### 8. Save Invoice Success Flow

On `/create`, enter a valid invoice:

- `Business Name`: `Studio North`
- `Client Name`: `Amina Yusuf`
- first line item `Description`: `Website design retainer`
- first line item `Qty`: `1`
- first line item `Rate`: `500`

Optional:

- set a future due date

Click `Save Invoice`.

Verify:

- success toast appears with text starting `Invoice`
- success toast includes `saved locally.`
- required fields reset after save
- page remains on `/create`

### 9. IndexedDB Persistence Sanity Check

After a successful save on `/create`:

- reload the page
- verify the helper text near the save button shows at least `1 of 10 slots used.`

This confirms the browser-local invoice count was read back.

### 10. Mobile Preview Sheet Test

Run this scenario in a mobile viewport.

Navigate to `/create`.

Verify:

- `Preview` button is visible near the top

After entering:

- `Business Name`: `Studio North`
- `Client Name`: `Amina Yusuf`
- first line item `Description`: `Consulting`
- first line item `Rate`: `250`

Then:

- open the `Preview` sheet

Verify inside the sheet:

- heading `Invoice Preview`
- `Studio North`
- `Amina Yusuf`
- `Consulting`
- watermark text starting `Created with QuickBill`

### 11. SEO Surface Checks

Check:

- `/robots.txt` loads successfully
- page source or DOM contains JSON-LD script with `SoftwareApplication`
- homepage title is not the default Next.js starter title

### 12. Console and Runtime Cleanliness

For both `/` and `/create`:

- capture browser console messages
- fail on uncaught exceptions
- fail on obvious React render/runtime errors

Do not fail on harmless dev-server noise unless it is user-impacting.

## Known Expected Behavior

- "Pro Coming Soon" has no email input in Sprint 1.
- Save action stores locally only; it does not generate a PDF.
- Currency may vary by environment because geolocation can fallback or detect differently.
- Preview watermark is text-based and should include `Created with QuickBill`.

## Suggested Pass Criteria

Mark the local run as passing if:

- all primary landing page checks pass
- create flow validation works
- live preview updates correctly
- save flow succeeds
- persistence sanity check succeeds
- mobile preview sheet works
- no blocking console/runtime errors appear

## Suggested Prompt To Give Playwright MCP

Use this app running locally at `http://localhost:3000`. Execute the scenarios in `documentation/Playwright_Local_Test_Handoff.md`. Prioritize user-visible behavior over styling details. Record any failures with exact step, observed behavior, expected behavior, and whether the issue is blocking for Sprint 1 release.

---

## Local QA Run Results — 2026-03-07

**Run by:** Playwright MCP (Claude Sonnet 4.6)
**Overall verdict: PASS — Sprint 1 is clear for release**

| #   | Test                               | Result                             |
| --- | ---------------------------------- | ---------------------------------- |
| 1   | Landing Page Smoke Test            | ✅ PASS                            |
| 2   | Landing Page Navigation            | ✅ PASS                            |
| 3   | Create Page Initial Render         | ✅ PASS                            |
| 4   | Validation Test                    | ✅ PASS                            |
| 5   | Live Calculation Test              | ✅ PASS                            |
| 6   | Line Item Add/Remove               | ✅ PASS                            |
| 7   | Due Date Validation                | ✅ PASS                            |
| 8   | Save Invoice Success Flow          | ✅ PASS                            |
| 9   | IndexedDB Persistence Sanity Check | ✅ PASS                            |
| 10  | Mobile Preview Sheet               | ✅ PASS                            |
| 11  | SEO Surface Checks                 | ✅ PASS                            |
| 12  | Console & Runtime Cleanliness      | ⚠️ PASS with non-blocking warnings |

### Issues Found

#### Issue 1 — Hydration Mismatch on `/create` (Non-blocking)

- **Symptom:** React logs `Hydration failed because the server rendered text didn't match the client`
- **Root cause:** Line item element IDs are generated with `nanoid` at render time. The server generates one ID (e.g. `line-item-description-q7wlGiiY`) and the client regenerates a different one (e.g. `line-item-description-6QGx-8lG`). React detects the mismatch and re-renders from client state.
- **User impact:** None — the page recovers automatically and all interactions work correctly.
- **Blocking for Sprint 1:** No
- **Status:** Fixed in later implementation work by replacing unstable element IDs with stable index-based IDs on the create form.

#### Issue 2 — CORS Errors from `ipapi.co` (Non-blocking)

- **Symptom:** Console logs `Access to fetch at 'https://ipapi.co/json/' has been blocked by CORS policy` (two requests per page load)
- **Root cause:** The currency auto-detection fetch runs client-side directly against `ipapi.co`, which does not return CORS headers for `localhost` origins.
- **User impact:** None — currency falls back to USD automatically and the user can still switch currency manually.
- **Blocking for Sprint 1:** No
- **Status:** Fixed in later implementation work by routing geolocation through `/api/geo`.
