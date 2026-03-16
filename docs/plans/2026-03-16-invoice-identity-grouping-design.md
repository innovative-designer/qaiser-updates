# Invoice Identity Grouping Design

**Date:** 2026-03-16

**Problem**

The create invoice form currently mixes two different concepts inside the same area:

- `businessName` is brand identity and belongs with the logo in the invoice masthead.
- `senderName` is the person preparing or sending the invoice and belongs in `Bill From`.

This mismatch makes the form harder to scan and does not match how the generated PDF already presents the information.

**Approved Direction**

Use a three-part identity structure:

1. `Brand Identity` at the top of the invoice card
2. `Bill From` for sender and business contact details
3. `Bill To` for recipient details

**Layout**

- Replace the top-left logo-only block with a `Brand Identity` card.
- Keep the logo upload in that card.
- Move `Business Name` into that same brand card and relabel it `Business / Brand Name`.
- Keep invoice metadata (`Invoice No.`, `Due Date`, `Currency`) in the top-right companion card.
- Remove `Business Name` from the `From` block.
- Move `senderName` into `Bill From` and relabel it `Sender Name`.

**Behavior**

- Keep the existing saved-business localStorage behavior.
- Continue saving `businessName`, `senderName`, business contact details, and logo together for now.
- Preserve the existing read-only vs editable mode controlled by the saved business state.
- In read-only mode:
  - `Brand Identity` shows logo plus business/brand name.
  - `Bill From` shows sender name and business contact details.

**UX Goals**

- Make brand identity visually distinct from sender identity.
- Match the editor structure to the PDF structure.
- Improve scanability on mobile and desktop.
- Keep touch targets, labels, and helper copy clear and compact.

**Implementation Notes**

- Main work is in `src/app/create/page.tsx`.
- No data model change is required.
- Validation remains unchanged: `businessName` is still required.
