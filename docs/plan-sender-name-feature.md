# Plan: Add `senderName` Field & Fix Duplicate Business Info in PDF Templates

**Status:** Ready for implementation
**Estimated touchpoints:** 12 files
**Branch:** `invoice-templates-feature`

---

## Problem Statement

Three PDF templates (Modern, Compact, Ledger) display business info (name, email, phone, address) in **two places**:

1. **Header/masthead** — business name + email + phone + address
2. **"From" section** — business name + email + phone + address (100% duplicate)

Additionally, there is no way to distinguish the **person issuing the invoice** (e.g., an employee) from the **business entity** itself.

---

## Solution

1. Add an optional `senderName` field — the person generating the invoice.
2. Restructure the 3 duplicating templates so the **header shows only branding** (business name + logo) and the **"From" section shows contact details**.
3. In the 3 non-duplicating templates (Classic, Minimal, Bold), show `senderName` as a subtitle under `businessName` in the masthead — no layout restructure needed.

---

## Edge Case Matrix

Read this table carefully before implementing. Every code path must handle all 4 cases.

| Case | `businessName` | `senderName` | Header shows | "From" section shows | Email sign-off | WhatsApp caption |
|------|---------------|-------------|-------------|---------------------|---------------|-----------------|
| **A. Solo freelancer (typical)** | `"Jane Design"` | `""` (empty) | `"Jane Design"` | `"Jane Design"` + contact | `"Jane Design"` | `"Jane Design"` |
| **B. Employee at company** | `"Acme Corp"` | `"John Smith"` | `"Acme Corp"` | `"John Smith"` + contact | `"John Smith"` | `"Acme Corp"` |
| **C. Both filled, identical** | `"Jane Design"` | `"Jane Design"` | `"Jane Design"` | `"Jane Design"` + contact | `"Jane Design"` | `"Jane Design"` |
| **D. Old invoice (no field)** | `"Acme Corp"` | `undefined` | `"Acme Corp"` | `"Acme Corp"` + contact | `"Acme Corp"` | `"Acme Corp"` |

**Golden rule for fallback:**

```
displayName = invoice.senderName?.trim() || invoice.businessName || 'Your Business'
```

Use this pattern everywhere in the "From" section and email sign-off. WhatsApp caption always uses `businessName` (it's brand-facing).

---

## Step-by-Step Implementation

### Step 1: Update Type Definition

**File:** `src/types/invoice.ts`

**What to do:** Add `senderName` as an **optional** string field to the `InvoiceData` interface.

**Current code (line 37):**

```typescript
  pdfTemplateId?: PdfTemplateId;
}
```

**Change to:**

```typescript
  pdfTemplateId?: PdfTemplateId;
  senderName?: string;
}
```

**Why optional?** Old invoices stored in IndexedDB won't have this field. Making it optional means they deserialize without errors and the fallback logic handles `undefined` gracefully.

---

### Step 2: Update the Invoice Form Hook

**File:** `src/hooks/use-invoice-form.ts`

#### 2a. Add to `EditableInvoiceField` type union

**Current code (lines 16-29):**

```typescript
type EditableInvoiceField =
  | 'businessName'
  | 'businessEmail'
  | 'businessPhone'
  | 'businessAddress'
  | 'clientName'
  | 'clientEmail'
  | 'clientPhone'
  | 'clientCompany'
  | 'taxRate'
  | 'discount'
  | 'notes'
  | 'dueDate'
  | 'status';
```

**Change to (add after `'businessAddress'`):**

```typescript
type EditableInvoiceField =
  | 'businessName'
  | 'businessEmail'
  | 'businessPhone'
  | 'businessAddress'
  | 'senderName'
  | 'clientName'
  // ... rest unchanged
```

#### 2b. Add to `createInitialState()`

**Current code (lines 87-90):**

```typescript
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
```

**Change to:**

```typescript
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    senderName: '',
```

#### 2c. Validation — NO changes needed

`senderName` is optional. Do NOT add any validation for it. `businessName` remains the only required business field.

---

### Step 3: Update the Create Page (Form UI + Storage)

**File:** `src/app/create/page.tsx`

This step has 5 sub-parts. Do them all in this file.

#### 3a. Load `senderName` from localStorage on mount

**Find the `useEffect` block that loads business info (approx line 131-138).** The block starts with:

```typescript
const saved = localStorage.getItem(BUSINESS_STORAGE_KEY);
if (saved) {
  const data = JSON.parse(saved) as Record<string, string>;
  if (data.businessName) setField('businessName', data.businessName);
  if (data.businessEmail) setField('businessEmail', data.businessEmail);
  if (data.businessPhone) setField('businessPhone', data.businessPhone);
  if (data.businessAddress) setField('businessAddress', data.businessAddress);
  if (data.businessLogo) setLogoPreview(data.businessLogo);
```

**Add after the `businessAddress` line:**

```typescript
  if (data.senderName) setField('senderName', data.senderName);
```

#### 3b. Save `senderName` to localStorage

**Find `handleSaveBusinessInfo` callback (approx line 164-178).** The data object is:

```typescript
const data: Record<string, string> = {
  businessName: invoice.businessName,
  businessEmail: invoice.businessEmail,
  businessPhone: invoice.businessPhone,
  businessAddress: invoice.businessAddress,
};
```

**Add to the data object:**

```typescript
const data: Record<string, string> = {
  businessName: invoice.businessName,
  businessEmail: invoice.businessEmail,
  businessPhone: invoice.businessPhone,
  businessAddress: invoice.businessAddress,
  senderName: invoice.senderName || '',
};
```

**Also update the `useCallback` dependency array** — add `invoice.senderName` (it's currently missing since the field doesn't exist yet):

```typescript
}, [invoice.businessName, invoice.businessEmail, invoice.businessPhone, invoice.businessAddress, invoice.senderName, logoPreview]);
```

#### 3c. Clear `senderName` on business info clear

**Find `handleClearBusinessInfo` callback (approx line 201-213).** It clears fields one by one:

```typescript
setField('businessName', '');
setField('businessEmail', '');
setField('businessPhone', '');
setField('businessAddress', '');
```

**Add after `businessAddress`:**

```typescript
setField('senderName', '');
```

#### 3d. Show `senderName` in saved/read preview

**Find the saved business info preview block (approx line 631-656).** It shows business name, address, email, phone when not in edit mode.

**Add after the `invoice.businessPhone` block and before the `!invoice.businessName` fallback:**

```tsx
{invoice.senderName && (
  <p className="mt-0.5 text-xs text-muted-foreground italic">
    Issued by: {invoice.senderName}
  </p>
)}
```

The full order in the preview should be:
1. `businessName` (bold)
2. `businessAddress`
3. `businessEmail`
4. `businessPhone`
5. `senderName` (italic, with "Issued by:" prefix)
6. Fallback "Click to add business info" (if no businessName)

#### 3e. Add `senderName` input field in edit form

**Find the form fields section (approx line 658-698).** After the Address field block and before the closing `</div>` of the `space-y-3` container, add:**

```tsx
<Field id="senderName" label="Your Name">
  <Input
    id="senderName"
    value={invoice.senderName || ''}
    placeholder="John Smith (optional)"
    onChange={(event) => setField('senderName', event.target.value)}
    className="h-9"
  />
</Field>
```

**Important notes:**
- The label says "Your Name" — this is intentionally personal, not "Sender Name" which sounds technical.
- The placeholder includes "(optional)" to signal it's not required.
- Use `invoice.senderName || ''` (not just `invoice.senderName`) because the field is optional on the type and could be `undefined`.

---

### Step 4: Update PDF Templates — Modern, Compact, Ledger (Remove Duplication)

These 3 templates have business info in **both** the header and the "From" section. We will:
- **Header:** Remove email, phone, address lines. Keep only `businessName` + logo.
- **"From" section:** Use `senderName || businessName` as the name. Keep email, phone, address.

#### 4a. Modern Template

**File:** `src/components/pdf/templates/modern.tsx`

**Header/masthead section (approx lines 283-295):** Currently shows businessName + all businessLines.

**Remove the businessLines mapping from the masthead.** Keep only:

```tsx
<Text style={styles.businessName}>{invoice.businessName || 'Your Business'}</Text>
<View style={[styles.businessUnderline, { backgroundColor: accent }]} />
```

Delete the `{businessLines.length > 0 ? businessLines.map(...) : ...}` block that follows the underline in the masthead.

**"From" section (approx lines 322-331):** Currently shows `businessName` + businessLines.

**Change the name line to use the fallback pattern:**

```tsx
<Text style={styles.addressName}>
  {invoice.senderName?.trim() || invoice.businessName || 'Your Business'}
</Text>
```

Keep the businessLines mapping as-is (email, phone, address stay in "From").

#### 4b. Compact Template

**File:** `src/components/pdf/templates/compact.tsx`

**Header/masthead section (approx lines 271-278):** Currently shows businessName + businessLines joined with ` | `.

**Remove the businessLines display from the masthead.** Keep only:

```tsx
<Text style={styles.businessName}>{invoice.businessName || 'Your Business'}</Text>
```

Delete the `{businessLines.length > 0 ? <Text>{businessLines.join('  |  ')}</Text> : ...}` block.

**"From" section (approx lines 306-311):**

**Change the name line:**

```tsx
<Text style={styles.addressName}>
  {invoice.senderName?.trim() || invoice.businessName || 'Your Business'}
</Text>
```

Keep the businessLines mapping as-is.

#### 4c. Ledger Template

**File:** `src/components/pdf/templates/ledger.tsx`

**Header section (approx lines 314-326):** Currently shows businessName + businessLines.

**Remove the businessLines mapping from the header.** Keep only:

```tsx
<Text style={styles.businessName}>{invoice.businessName || 'Your Business'}</Text>
```

Delete the `{businessLines.length > 0 ? businessLines.map(...) : ...}` block from the header.

**"From" section (approx lines 350-355):**

**Change the name line:**

```tsx
<Text style={styles.partyName}>
  {invoice.senderName?.trim() || invoice.businessName || 'Your Business'}
</Text>
```

Keep the businessLines mapping as-is.

---

### Step 5: Update PDF Templates — Classic, Minimal, Bold (Add senderName subtitle)

These 3 templates show business info only in the masthead. They do NOT have duplication, so we do NOT restructure them. We just add a `senderName` line below `businessName` when present.

#### 5a. Classic Template

**File:** `src/components/pdf/templates/classic.tsx`

**Find (approx line 276):**

```tsx
<Text style={styles.businessName}>{invoice.businessName || 'Your Business'}</Text>
```

**Add immediately after:**

```tsx
{invoice.senderName?.trim() ? (
  <Text style={styles.businessLine}>{invoice.senderName}</Text>
) : null}
```

This renders the sender name in the same `businessLine` style (smaller, muted text) right below the business name, before the email/phone/address lines.

#### 5b. Minimal Template

**File:** `src/components/pdf/templates/minimal.tsx`

**Same pattern.** Find the `businessName` Text element (approx line 261) and add the same conditional block after it.

#### 5c. Bold Template

**File:** `src/components/pdf/templates/bold.tsx`

**Same pattern.** Find the `businessName` Text element (approx line 268) and add the same conditional block after it.

---

### Step 6: Update Share Functions

**File:** `src/lib/share.ts`

#### 6a. WhatsApp caption (`buildCaption` function, approx line 27-32)

**Current:**

```typescript
const businessName = invoice.businessName || 'my business';
return `Hi ${clientName}, please find your invoice for ${amount}. - ${businessName}`;
```

**Keep as-is.** WhatsApp caption should use `businessName` — it's a brand-facing message. The business is sending the invoice, not the individual.

#### 6b. Email subject (approx line 140)

**Current:**

```typescript
const subject = encodeURIComponent(`Invoice from ${invoice.businessName || 'Business'}`);
```

**Keep as-is.** Subject line should reference the business name.

#### 6c. Email body sign-off (approx line 144)

**Current:**

```typescript
`Best regards,\n${invoice.businessName || ''}`
```

**Change to:**

```typescript
`Best regards,\n${invoice.senderName?.trim() || invoice.businessName || ''}`
```

**Why:** Email sign-offs are personal. "Best regards, John Smith" is more natural than "Best regards, Acme Corp". Falls back to businessName when senderName is empty.

---

### Step 7: Update API Route (Sanitization)

**File:** `src/app/api/invoice/generate-pdf/route.ts`

**Find the sanitized object (approx lines 58-82).**

**Add after `businessAddress: stripHtml(body.businessAddress),`:**

```typescript
senderName: stripHtml(body.senderName ?? ''),
```

**Note:** Use `body.senderName ?? ''` (nullish coalescing) because old clients may not send this field at all, and `stripHtml(undefined)` could throw.

---

### Step 8: Verify No Changes Needed (Intentional)

These files require **NO changes** — verify you did not accidentally modify them:

| File | Reason |
|------|--------|
| `src/lib/db.ts` | IndexedDB stores the full `InvoiceData` object. An optional field needs no schema migration. `DB_VERSION` stays at `1`. |
| `src/app/history/page.tsx` | History cards show `businessName` which is the correct business identifier. `senderName` is not relevant here. |
| `src/app/v/[invoiceId]/page.tsx` | The shared viewer renders a stored PDF file. Business/sender info is already baked into the PDF. |
| `src/lib/constants.ts` | No new constants needed. |
| `src/types/pdf-template.ts` | Template IDs unchanged. |

---

## File Change Summary

| # | File | Change type | Priority |
|---|------|------------|----------|
| 1 | `src/types/invoice.ts` | Add field | Critical |
| 2 | `src/hooks/use-invoice-form.ts` | Add to type union + initial state | Critical |
| 3 | `src/app/create/page.tsx` | localStorage load/save/clear + form field + preview | High |
| 4 | `src/components/pdf/templates/modern.tsx` | Remove contact from header, update "From" name | High |
| 5 | `src/components/pdf/templates/compact.tsx` | Remove contact from header, update "From" name | High |
| 6 | `src/components/pdf/templates/ledger.tsx` | Remove contact from header, update "From" name | High |
| 7 | `src/components/pdf/templates/classic.tsx` | Add senderName subtitle in masthead | Medium |
| 8 | `src/components/pdf/templates/minimal.tsx` | Add senderName subtitle in masthead | Medium |
| 9 | `src/components/pdf/templates/bold.tsx` | Add senderName subtitle in masthead | Medium |
| 10 | `src/lib/share.ts` | Update email sign-off only | Medium |
| 11 | `src/app/api/invoice/generate-pdf/route.ts` | Add senderName sanitization | High |

---

## Manual QA Checklist

After implementation, test **every** scenario below. Mark each as pass/fail.

### A. Form Behavior

- [ ] **A1.** Open `/create` with **no saved business info**. The form should show all fields including "Your Name" (senderName). The senderName field should be empty and show placeholder text "(optional)".
- [ ] **A2.** Fill in only `businessName` + one line item + client name. Leave `senderName` empty. Confirm the form validates and allows PDF generation (no error on senderName).
- [ ] **A3.** Fill in `businessName` = "Acme Corp" and `senderName` = "John Smith". Click "Save" on business info. Reload the page. Confirm both values are restored from localStorage.
- [ ] **A4.** Click "Clear" on business info. Confirm `senderName` is also cleared (empty). Check localStorage — the key `freeinvoicekit_business_info` should be removed entirely.
- [ ] **A5.** In the saved/read-only preview (collapsed state), confirm `senderName` appears with "Issued by:" prefix when filled, and is hidden when empty.
- [ ] **A6.** Click the saved preview to expand back to edit mode. Confirm `senderName` field retains its value.

### B. PDF Templates — Duplication Fix (Modern, Compact, Ledger)

For **each** of Modern, Compact, and Ledger templates:

- [ ] **B1.** Generate a PDF with `businessName` = "Acme Corp", `senderName` = "". Confirm:
  - Header shows "Acme Corp" (+ logo if uploaded). **No email/phone/address in header.**
  - "From" section shows "Acme Corp" + email + phone + address.
- [ ] **B2.** Generate a PDF with `businessName` = "Acme Corp", `senderName` = "John Smith". Confirm:
  - Header shows "Acme Corp". **No email/phone/address in header.**
  - "From" section shows **"John Smith"** (not "Acme Corp") + email + phone + address.
- [ ] **B3.** Generate a PDF with `businessName` = "Acme Corp", `senderName` = "   " (whitespace only). Confirm:
  - "From" section falls back to "Acme Corp" (whitespace-only senderName is treated as empty).
- [ ] **B4.** Generate a PDF with no email, no phone, no address filled. Confirm:
  - Header shows only business name + logo.
  - "From" section shows the name and the fallback text (e.g., "Business details will appear here." or just the name with no lines below).
- [ ] **B5.** Generate a PDF with all fields filled. Visually confirm **no information is duplicated** between header and "From".

### C. PDF Templates — senderName Subtitle (Classic, Minimal, Bold)

For **each** of Classic, Minimal, and Bold templates:

- [ ] **C1.** Generate a PDF with `senderName` = "". Confirm the masthead looks **exactly the same as before** — no extra blank line or spacing.
- [ ] **C2.** Generate a PDF with `senderName` = "John Smith". Confirm it appears as a subtle line below `businessName` in the masthead, before the email/phone/address lines.
- [ ] **C3.** Generate a PDF with a very long `senderName` (50+ characters). Confirm it doesn't break the layout or overflow.

### D. Share Functions

- [ ] **D1.** With `senderName` = "John Smith" and `businessName` = "Acme Corp", click **WhatsApp share**. Confirm the caption ends with `- Acme Corp` (NOT "John Smith"). WhatsApp is brand-facing.
- [ ] **D2.** With `senderName` = "John Smith" and `businessName` = "Acme Corp", click **Email share**. Confirm:
  - Subject line: `Invoice from Acme Corp`
  - Body sign-off: `Best regards, John Smith` (NOT "Acme Corp")
- [ ] **D3.** With `senderName` = "" and `businessName` = "Acme Corp", click **Email share**. Confirm sign-off falls back to `Best regards, Acme Corp`.
- [ ] **D4.** Click **Copy link**. Confirm caption uses `businessName` (not senderName).

### E. Backward Compatibility

- [ ] **E1.** If you have existing invoices in IndexedDB (created before this feature), open them from the history page. Confirm they load without errors.
- [ ] **E2.** Edit an old invoice (without `senderName`). Confirm the `senderName` field appears empty in the form and the PDF generates correctly with `businessName` as fallback.
- [ ] **E3.** Open browser DevTools > Application > IndexedDB > `freeinvoicekit` > `invoices`. Check that old invoices don't have `senderName` and new ones do. Both should coexist without issues.
- [ ] **E4.** Open browser DevTools > Application > localStorage. Check the `freeinvoicekit_business_info` key. Old format (without `senderName`) should load without errors.

### F. Edge Cases

- [ ] **F1.** Set `senderName` to contain HTML characters: `<script>alert('xss')</script>`. Generate a PDF. Confirm the text is escaped/stripped (no script execution, no raw HTML in PDF).
- [ ] **F2.** Set `senderName` to contain special characters: `José María García-López`. Confirm it renders correctly in the PDF (UTF-8 support).
- [ ] **F3.** Set `senderName` to a very long string (100+ characters). Confirm the PDF doesn't break — text should wrap or truncate gracefully.
- [ ] **F4.** Rapidly toggle between templates after setting senderName. Confirm the senderName persists across template switches.
- [ ] **F5.** Generate PDF, then change `senderName`, then generate again. Confirm the new PDF reflects the updated name.

### G. Build & Lint

- [ ] **G1.** Run `pnpm build` — no TypeScript errors.
- [ ] **G2.** Run `pnpm lint` — no ESLint errors.
- [ ] **G3.** Run `pnpm dev` — page loads without console errors.

---

## Notes for the Developer

1. **Do NOT bump `DB_VERSION` in `db.ts`.** The field is optional, IndexedDB handles it fine.
2. **Do NOT add `senderName` to the validation function.** It must remain optional.
3. **Always use the fallback pattern:** `invoice.senderName?.trim() || invoice.businessName || 'Your Business'`. The `?.trim()` handles both `undefined` (old invoices) and whitespace-only strings.
4. **Test all 6 templates** — even the 3 that only get a subtitle change. Regression is easy to miss.
5. When modifying the masthead in Modern/Compact/Ledger, be careful not to remove the `businessLogo` rendering — only remove the `businessLines` (email/phone/address).
