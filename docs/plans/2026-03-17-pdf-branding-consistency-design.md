# PDF Branding Consistency Design

**Date:** 2026-03-17

**Problem**

The invoice PDF templates do not present branding and party details consistently:

- In some templates the logo and business name do not read as one branding unit.
- Some templates use `From` while others use `Bill From`.
- Some templates only show `Bill To`, leaving sender identity implied in the masthead.

This creates inconsistent invoice output and weakens the visual meaning of branding vs sender identity.

**Approved Direction**

Apply one shared information model across all PDF templates:

- Masthead = branding info
- `Bill From` = sender identity and business contact details
- `Bill To` = client identity and client contact details

**Branding Rule**

- Always render `businessLogo` and `businessName` together as one masthead brand block.
- The business name must sit naturally with the logo, either beside it or directly below it, depending on the template.
- The masthead should not use sender identity as the primary brand line.

**Bill From Rule**

- Use `senderName` as the primary `Bill From` name when present.
- If `senderName` is empty, fall back to `businessName`.
- Show business contact lines beneath that primary line.

**Bill To Rule**

- Use the label `Bill To` consistently in every template.
- Keep client name as the primary line with client details beneath.

**Template Scope**

The following templates must be normalized:

- `src/components/pdf/templates/modern.tsx`
- `src/components/pdf/templates/minimal.tsx`
- `src/components/pdf/templates/classic.tsx`
- `src/components/pdf/templates/bold.tsx`
- `src/components/pdf/templates/compact.tsx`
- `src/components/pdf/templates/ledger.tsx`

**Implementation Notes**

- Add shared PDF helper functions for:
  - business contact lines
  - client contact lines
  - `Bill From` display name fallback
- Update template layouts only as much as needed to express the shared model.
- Preserve each template’s overall visual character while normalizing information hierarchy.
