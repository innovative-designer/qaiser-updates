# Sprint 1 — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a fully functional invoice creation form with real-time preview, a landing page, IndexedDB storage, and SEO foundation — with deferred brand assets and a documented plug-in system.

**Architecture:** Client-heavy SPA for `/create` (useReducer form state, IndexedDB persistence). Server component for `/` (SEO). Shared header/footer. All branding text flows through `constants.ts`, all colors through CSS variables, all assets through `public/`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui v4, idb, nanoid, lucide-react, sonner

**Design Spec:** See `Sprint1_Frontend_Design_Spec.md` for aesthetic direction ("Sharp Finance"), color palette, typography, and per-component design rationale.

**Design Doc:** See `docs/plans/2026-03-07-sprint1-design.md` for approved architectural decisions.

---

## Task 1: TypeScript Types

**Files:**

- Create: `src/types/invoice.ts`

**Step 1: Create the types file**

```typescript
export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  id: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  lineItems: LineItem[];
  currency: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  notes: string;
  dueDate: string;
  createdAt: string;
  status: 'draft' | 'sent';
  pdfUrl?: string;
}

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}
```

**Step 2: Verify TypeScript compiles**

Run: `pnpm build`
Expected: No type errors related to `invoice.ts`

**Step 3: Commit**

```bash
git add src/types/invoice.ts
git commit -m "feat: add invoice TypeScript types"
```

---

## Task 2: App Constants

**Files:**

- Create: `src/lib/constants.ts`

**Step 1: Create the constants file**

```typescript
export const APP_NAME = 'Free Invoice Kit';
export const APP_URL = 'https://www.freeinvoicekit.com';
export const APP_TAGLINE = 'Free invoicing on WhatsApp';
export const APP_DESCRIPTION =
  'Create professional PDF invoices and send them on WhatsApp in 30 seconds. No signup required. Free forever.';

export const MAX_INVOICES = 10;
export const INVOICE_ID_LENGTH = 8;

export const DEFAULT_CURRENCY = 'USD';
export const DEFAULT_TAX_RATE = 0;
export const DEFAULT_DISCOUNT = 0;
```

> **BRANDING PLUG-IN:** When brand text changes, update `APP_NAME`, `APP_TAGLINE`, `APP_URL` here. All components import from this file.

**Step 2: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: add app constants"
```

---

## Task 3: Currency & Geolocation Utilities

**Files:**

- Create: `src/lib/currencies.ts`
- Create: `src/lib/geolocation.ts`

**Step 1: Create currencies file**

```typescript
import { CurrencyInfo } from '@/types/invoice';

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  { code: 'EUR', symbol: '\u20AC', name: 'Euro', locale: 'de-DE' },
  { code: 'GBP', symbol: '\u00A3', name: 'British Pound', locale: 'en-GB' },
  { code: 'AED', symbol: '\u062F.\u0625', name: 'UAE Dirham', locale: 'ar-AE' },
  { code: 'PKR', symbol: '\u20A8', name: 'Pakistani Rupee', locale: 'ur-PK' },
  { code: 'INR', symbol: '\u20B9', name: 'Indian Rupee', locale: 'en-IN' },
  { code: 'NGN', symbol: '\u20A6', name: 'Nigerian Naira', locale: 'en-NG' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', locale: 'en-ZA' },
  { code: 'BDT', symbol: '\u09F3', name: 'Bangladeshi Taka', locale: 'bn-BD' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
  { code: 'SAR', symbol: '\uFDFC', name: 'Saudi Riyal', locale: 'ar-SA' },
  { code: 'QAR', symbol: '\uFDFC', name: 'Qatari Riyal', locale: 'ar-QA' },
  { code: 'KWD', symbol: '\u062F.\u0643', name: 'Kuwaiti Dinar', locale: 'ar-KW' },
  { code: 'BHD', symbol: '\u062F.\u0628', name: 'Bahraini Dinar', locale: 'ar-BH' },
  { code: 'OMR', symbol: '\uFDFC', name: 'Omani Rial', locale: 'ar-OM' },
  { code: 'EGP', symbol: '\u00A3', name: 'Egyptian Pound', locale: 'ar-EG' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', locale: 'en-KE' },
  { code: 'GHS', symbol: '\u20B5', name: 'Ghanaian Cedi', locale: 'en-GH' },
  { code: 'TRY', symbol: '\u20BA', name: 'Turkish Lira', locale: 'tr-TR' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', locale: 'ms-MY' },
  { code: 'PHP', symbol: '\u20B1', name: 'Philippine Peso', locale: 'en-PH' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', locale: 'en-SG' },
  { code: 'JPY', symbol: '\u00A5', name: 'Japanese Yen', locale: 'ja-JP' },
  { code: 'CNY', symbol: '\u00A5', name: 'Chinese Yuan', locale: 'zh-CN' },
];

export function getCurrency(code: string): CurrencyInfo | undefined {
  return CURRENCIES.find((c) => c.code === code);
}

export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = getCurrency(currencyCode);
  return new Intl.NumberFormat(currency?.locale || 'en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
```

**Step 2: Create geolocation file**

```typescript
import { DEFAULT_CURRENCY } from '@/lib/constants';

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: 'USD',
  GB: 'GBP',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  AE: 'AED',
  PK: 'PKR',
  IN: 'INR',
  NG: 'NGN',
  ZA: 'ZAR',
  BD: 'BDT',
  CA: 'CAD',
  AU: 'AUD',
  SA: 'SAR',
  QA: 'QAR',
  KW: 'KWD',
  BH: 'BHD',
  OM: 'OMR',
  EG: 'EGP',
  KE: 'KES',
  GH: 'GHS',
  TR: 'TRY',
  MY: 'MYR',
  PH: 'PHP',
  SG: 'SGD',
  JP: 'JPY',
  CN: 'CNY',
};

interface GeoResponse {
  country_code: string;
  currency: string;
}

export async function detectCurrency(): Promise<string> {
  try {
    const res = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return DEFAULT_CURRENCY;
    const data: GeoResponse = await res.json();
    return COUNTRY_TO_CURRENCY[data.country_code] || data.currency || DEFAULT_CURRENCY;
  } catch {
    return DEFAULT_CURRENCY;
  }
}
```

**Step 3: Verify build**

Run: `pnpm build`
Expected: Compiles without errors

**Step 4: Commit**

```bash
git add src/lib/currencies.ts src/lib/geolocation.ts
git commit -m "feat: add currency list and geolocation utilities"
```

---

## Task 4: IndexedDB Local Storage

**Files:**

- Create: `src/lib/db.ts`
- Create: `src/hooks/use-local-invoices.ts`

**Step 1: Create the db helper**

```typescript
import { openDB, type IDBPDatabase } from 'idb';
import type { InvoiceData } from '@/types/invoice';
import { MAX_INVOICES } from '@/lib/constants';

const DB_NAME = 'quickbill';
const DB_VERSION = 1;
const STORE_NAME = 'invoices';

async function getDB(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function saveInvoice(invoice: InvoiceData): Promise<void> {
  const db = await getDB();
  const count = await db.count(STORE_NAME);
  if (count >= MAX_INVOICES) {
    const allInvoices = await db.getAll(STORE_NAME);
    allInvoices.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    await db.delete(STORE_NAME, allInvoices[0].id);
  }
  await db.put(STORE_NAME, invoice);
}

export async function getInvoice(id: string): Promise<InvoiceData | undefined> {
  const db = await getDB();
  return db.get(STORE_NAME, id);
}

export async function getAllInvoices(): Promise<InvoiceData[]> {
  const db = await getDB();
  const invoices = await db.getAll(STORE_NAME);
  return invoices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function deleteInvoice(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}
```

**Step 2: Create the React hook**

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { InvoiceData } from '@/types/invoice';
import { getAllInvoices, saveInvoice as dbSave, deleteInvoice as dbDelete } from '@/lib/db';

export function useLocalInvoices() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await getAllInvoices();
    setInvoices(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveInvoice = useCallback(
    async (invoice: InvoiceData) => {
      await dbSave(invoice);
      await refresh();
    },
    [refresh]
  );

  const deleteInvoice = useCallback(
    async (id: string) => {
      await dbDelete(id);
      await refresh();
    },
    [refresh]
  );

  return { invoices, loading, saveInvoice, deleteInvoice };
}
```

**Step 3: Verify build**

Run: `pnpm build`
Expected: Compiles without errors

**Step 4: Commit**

```bash
git add src/lib/db.ts src/hooks/use-local-invoices.ts
git commit -m "feat: add IndexedDB storage and useLocalInvoices hook"
```

---

## Task 5: Invoice Form Hook

**Files:**

- Create: `src/hooks/use-invoice-form.ts`

**Step 1: Create the form hook with useReducer**

```typescript
'use client';

import { useReducer, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import type { InvoiceData, LineItem } from '@/types/invoice';
import {
  INVOICE_ID_LENGTH,
  DEFAULT_CURRENCY,
  DEFAULT_TAX_RATE,
  DEFAULT_DISCOUNT,
} from '@/lib/constants';
import { detectCurrency } from '@/lib/geolocation';

function createLineItem(): LineItem {
  return { id: nanoid(6), description: '', quantity: 1, rate: 0, amount: 0 };
}

function createInitialState(): InvoiceData {
  return {
    id: nanoid(INVOICE_ID_LENGTH),
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    lineItems: [createLineItem()],
    currency: DEFAULT_CURRENCY,
    subtotal: 0,
    taxRate: DEFAULT_TAX_RATE,
    taxAmount: 0,
    discount: DEFAULT_DISCOUNT,
    total: 0,
    notes: '',
    dueDate: '',
    createdAt: new Date().toISOString(),
    status: 'draft',
  };
}

type Action =
  | { type: 'SET_FIELD'; field: keyof InvoiceData; value: string | number }
  | { type: 'SET_LINE_ITEM'; index: number; field: keyof LineItem; value: string | number }
  | { type: 'ADD_LINE_ITEM' }
  | { type: 'REMOVE_LINE_ITEM'; index: number }
  | { type: 'SET_CURRENCY'; currency: string }
  | { type: 'RESET' };

function recalculate(state: InvoiceData): InvoiceData {
  const lineItems = state.lineItems.map((item) => ({
    ...item,
    amount: item.quantity * item.rate,
  }));
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = subtotal * (state.taxRate / 100);
  const total = subtotal + taxAmount - state.discount;
  return { ...state, lineItems, subtotal, taxAmount, total };
}

function reducer(state: InvoiceData, action: Action): InvoiceData {
  switch (action.type) {
    case 'SET_FIELD':
      return recalculate({ ...state, [action.field]: action.value });

    case 'SET_LINE_ITEM': {
      const lineItems = state.lineItems.map((item, i) =>
        i === action.index ? { ...item, [action.field]: action.value } : item
      );
      return recalculate({ ...state, lineItems });
    }

    case 'ADD_LINE_ITEM':
      return { ...state, lineItems: [...state.lineItems, createLineItem()] };

    case 'REMOVE_LINE_ITEM': {
      if (state.lineItems.length <= 1) return state;
      const lineItems = state.lineItems.filter((_, i) => i !== action.index);
      return recalculate({ ...state, lineItems });
    }

    case 'SET_CURRENCY':
      return { ...state, currency: action.currency };

    case 'RESET':
      return createInitialState();

    default:
      return state;
  }
}

export interface ValidationErrors {
  businessName?: string;
  clientName?: string;
  lineItems?: string;
  dueDate?: string;
}

export function validateInvoice(state: InvoiceData): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!state.businessName.trim()) errors.businessName = 'Business name is required';
  if (!state.clientName.trim()) errors.clientName = 'Client name is required';
  const hasValidItem = state.lineItems.some((item) => item.description.trim() && item.rate > 0);
  if (!hasValidItem)
    errors.lineItems = 'At least one line item with description and rate is required';
  if (state.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(state.dueDate) < today) errors.dueDate = 'Due date must be today or later';
  }
  return errors;
}

export function useInvoiceForm() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  useEffect(() => {
    detectCurrency().then((currency) => {
      dispatch({ type: 'SET_CURRENCY', currency });
    });
  }, []);

  const setField = useCallback((field: keyof InvoiceData, value: string | number) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);

  const setLineItem = useCallback(
    (index: number, field: keyof LineItem, value: string | number) => {
      dispatch({ type: 'SET_LINE_ITEM', index, field, value });
    },
    []
  );

  const addLineItem = useCallback(() => dispatch({ type: 'ADD_LINE_ITEM' }), []);

  const removeLineItem = useCallback(
    (index: number) => dispatch({ type: 'REMOVE_LINE_ITEM', index }),
    []
  );

  const setCurrency = useCallback(
    (currency: string) => dispatch({ type: 'SET_CURRENCY', currency }),
    []
  );

  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return {
    invoice: state,
    setField,
    setLineItem,
    addLineItem,
    removeLineItem,
    setCurrency,
    reset,
    validate: () => validateInvoice(state),
  };
}
```

**Step 2: Verify build**

Run: `pnpm build`
Expected: Compiles without errors

**Step 3: Commit**

```bash
git add src/hooks/use-invoice-form.ts
git commit -m "feat: add invoice form hook with useReducer and validation"
```

---

## Task 6: Invoice Preview Panel

**Files:**

- Create: `src/components/invoice-preview/invoice-preview.tsx`

> Build the preview before the create page so it can be imported into the page layout.

**Step 1: Create the preview component**

```tsx
'use client';

import type { InvoiceData } from '@/types/invoice';
import { formatCurrency } from '@/lib/currencies';
import { APP_NAME, APP_TAGLINE, APP_URL } from '@/lib/constants';
import { Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface InvoicePreviewProps {
  invoice: InvoiceData;
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const fmt = (amount: number) => formatCurrency(amount, invoice.currency);

  return (
    <div className="w-full rounded-lg border bg-white p-6 shadow-sm dark:bg-zinc-950">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-foreground text-lg font-bold">
            {invoice.businessName || 'Your Business Name'}
          </p>
          {invoice.businessEmail && (
            <p className="text-muted-foreground text-xs">{invoice.businessEmail}</p>
          )}
          {invoice.businessPhone && (
            <p className="text-muted-foreground text-xs">{invoice.businessPhone}</p>
          )}
          {invoice.businessAddress && (
            <p className="text-muted-foreground text-xs">{invoice.businessAddress}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-primary text-xl font-bold tracking-tight">INVOICE</p>
          <p className="text-muted-foreground text-xs">#{invoice.id}</p>
          <p className="text-muted-foreground text-xs">
            {new Date(invoice.createdAt).toLocaleDateString()}
          </p>
          {invoice.dueDate && (
            <Badge variant="outline" className="mt-1 text-xs">
              Due: {new Date(invoice.dueDate).toLocaleDateString()}
            </Badge>
          )}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Bill To */}
      <div>
        <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          Bill To
        </p>
        <p className="text-foreground font-medium">{invoice.clientName || 'Client Name'}</p>
        {invoice.clientCompany && (
          <p className="text-muted-foreground text-xs">{invoice.clientCompany}</p>
        )}
        {invoice.clientEmail && (
          <p className="text-muted-foreground text-xs">{invoice.clientEmail}</p>
        )}
        {invoice.clientPhone && (
          <p className="text-muted-foreground text-xs">{invoice.clientPhone}</p>
        )}
      </div>

      <Separator className="my-4" />

      {/* Line Items */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted-foreground border-b text-xs font-semibold tracking-wide uppercase">
            <th className="pb-2 text-left">Description</th>
            <th className="pb-2 text-right">Qty</th>
            <th className="pb-2 text-right">Rate</th>
            <th className="pb-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.map((item) => (
            <tr key={item.id} className="border-b border-dashed">
              <td className="text-foreground py-2">{item.description || 'Item description'}</td>
              <td className="text-muted-foreground py-2 text-right">{item.quantity}</td>
              <td className="text-muted-foreground py-2 text-right">{fmt(item.rate)}</td>
              <td className="text-foreground py-2 text-right font-medium">{fmt(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="mt-4 flex flex-col items-end gap-1 text-sm">
        <div className="flex w-48 justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{fmt(invoice.subtotal)}</span>
        </div>
        {invoice.taxRate > 0 && (
          <div className="flex w-48 justify-between">
            <span className="text-muted-foreground">Tax ({invoice.taxRate}%)</span>
            <span>{fmt(invoice.taxAmount)}</span>
          </div>
        )}
        {invoice.discount > 0 && (
          <div className="flex w-48 justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span>-{fmt(invoice.discount)}</span>
          </div>
        )}
        <Separator className="my-1 w-48" />
        <div className="flex w-48 justify-between text-base font-bold">
          <span>Total</span>
          <span className="text-primary">{fmt(invoice.total)}</span>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <>
          <Separator className="my-4" />
          <div>
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              Notes
            </p>
            <p className="text-muted-foreground text-sm">{invoice.notes}</p>
          </div>
        </>
      )}

      {/* Watermark Footer */}
      {/* BRANDING PLUG-IN: Replace Zap icon with <Image src="/logo.svg" /> when available */}
      <Separator className="my-4" />
      <div className="text-muted-foreground/60 flex items-center justify-center gap-1.5 text-xs">
        <Zap className="size-3" />
        <span>
          Created with {APP_NAME} &mdash; {APP_TAGLINE} &rarr; {APP_URL}
        </span>
      </div>
    </div>
  );
}
```

**Step 2: Verify build**

Run: `pnpm build`
Expected: Compiles without errors

**Step 3: Commit**

```bash
git add src/components/invoice-preview/invoice-preview.tsx
git commit -m "feat: add invoice preview panel component"
```

---

## Task 7: Invoice Creation Page

**Files:**

- Create: `src/app/create/page.tsx`
- Modify: `src/app/layout.tsx` (add Toaster for sonner)

**Step 1: Add Toaster to the root layout**

In `src/app/layout.tsx`, add the Sonner `Toaster` component. Import and place it inside `<body>` after `{children}`:

```tsx
// Add import at top:
import { Toaster } from '@/components/ui/sonner';

// Inside <body>, after {children}:
<Toaster />;
```

> **Note:** Sonner's Toaster uses `next-themes` `useTheme()`. Since we don't have a ThemeProvider yet and we're light-mode only for Sprint 1, wrap Toaster with a minimal approach — it defaults to `system` theme which works fine.

**Step 2: Create the invoice creation page**

This is the largest file. Key sections:

- Business Info form card
- Client Info form card
- Line Items table with add/remove
- Financial Summary
- Currency + Due Date + Notes
- Save button
- Mobile preview toggle (Sheet)

```tsx
'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Trash2, Eye } from 'lucide-react';
import { useInvoiceForm, type ValidationErrors } from '@/hooks/use-invoice-form';
import { useLocalInvoices } from '@/hooks/use-local-invoices';
import { CURRENCIES } from '@/lib/currencies';
import { InvoicePreview } from '@/components/invoice-preview/invoice-preview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { formatCurrency } from '@/lib/currencies';

export default function CreateInvoicePage() {
  const { invoice, setField, setLineItem, addLineItem, removeLineItem, setCurrency, validate } =
    useInvoiceForm();
  const { saveInvoice } = useLocalInvoices();
  const [errors, setErrors] = useState<ValidationErrors>({});

  const fmt = (amount: number) => formatCurrency(amount, invoice.currency);

  async function handleSave() {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the errors before saving.');
      return;
    }
    await saveInvoice(invoice);
    toast.success('Invoice saved! PDF generation coming in the next update.');
  }

  return (
    <div className="bg-muted/50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create Invoice</h1>

          {/* Mobile preview toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <Eye className="mr-2 size-4" />
                Preview
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Invoice Preview</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <InvoicePreview invoice={invoice} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Business Info */}
            <Card>
              <CardHeader>
                <CardTitle>Your Business</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={invoice.businessName}
                    onChange={(e) => setField('businessName', e.target.value)}
                    placeholder="Acme Corp"
                  />
                  {errors.businessName && (
                    <p className="text-destructive mt-1 text-xs">{errors.businessName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="businessEmail">Email</Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    value={invoice.businessEmail}
                    onChange={(e) => setField('businessEmail', e.target.value)}
                    placeholder="you@business.com"
                  />
                </div>
                <div>
                  <Label htmlFor="businessPhone">Phone</Label>
                  <Input
                    id="businessPhone"
                    type="tel"
                    value={invoice.businessPhone}
                    onChange={(e) => setField('businessPhone', e.target.value)}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="businessAddress">Address</Label>
                  <Input
                    id="businessAddress"
                    value={invoice.businessAddress}
                    onChange={(e) => setField('businessAddress', e.target.value)}
                    placeholder="123 Main St, City, Country"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Client Info */}
            <Card>
              <CardHeader>
                <CardTitle>Client Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={invoice.clientName}
                    onChange={(e) => setField('clientName', e.target.value)}
                    placeholder="John Doe"
                  />
                  {errors.clientName && (
                    <p className="text-destructive mt-1 text-xs">{errors.clientName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="clientEmail">Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={invoice.clientEmail}
                    onChange={(e) => setField('clientEmail', e.target.value)}
                    placeholder="client@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="clientPhone">Phone</Label>
                  <Input
                    id="clientPhone"
                    type="tel"
                    value={invoice.clientPhone}
                    onChange={(e) => setField('clientPhone', e.target.value)}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="clientCompany">Company</Label>
                  <Input
                    id="clientCompany"
                    value={invoice.clientCompany}
                    onChange={(e) => setField('clientCompany', e.target.value)}
                    placeholder="Client Corp"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Line Items */}
            <Card>
              <CardHeader>
                <CardTitle>Line Items</CardTitle>
              </CardHeader>
              <CardContent>
                {errors.lineItems && (
                  <p className="text-destructive mb-3 text-xs">{errors.lineItems}</p>
                )}
                <div className="space-y-3">
                  {invoice.lineItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[1fr_80px_100px_100px_40px] items-end gap-2"
                    >
                      <div>
                        {index === 0 && <Label className="text-xs">Description</Label>}
                        <Input
                          value={item.description}
                          onChange={(e) => setLineItem(index, 'description', e.target.value)}
                          placeholder="Service or product"
                        />
                      </div>
                      <div>
                        {index === 0 && <Label className="text-xs">Qty</Label>}
                        <Input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            setLineItem(index, 'quantity', Math.max(1, Number(e.target.value)))
                          }
                        />
                      </div>
                      <div>
                        {index === 0 && <Label className="text-xs">Rate</Label>}
                        <Input
                          type="number"
                          min={0}
                          step="0.01"
                          value={item.rate || ''}
                          onChange={(e) =>
                            setLineItem(index, 'rate', Math.max(0, Number(e.target.value)))
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        {index === 0 && <Label className="text-xs">Amount</Label>}
                        <Input value={fmt(item.amount)} readOnly className="bg-muted" />
                      </div>
                      <div>
                        {index === 0 && <Label className="text-xs">&nbsp;</Label>}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLineItem(index)}
                          disabled={invoice.lineItems.length <= 1}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={addLineItem} className="mt-3">
                  <Plus className="mr-2 size-4" />
                  Add Line Item
                </Button>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Subtotal</span>
                  <span className="text-sm font-medium">{fmt(invoice.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="taxRate" className="text-muted-foreground text-sm">
                    Tax Rate (%)
                  </Label>
                  <Input
                    id="taxRate"
                    type="number"
                    min={0}
                    max={100}
                    step="0.1"
                    value={invoice.taxRate || ''}
                    onChange={(e) => setField('taxRate', Math.max(0, Number(e.target.value)))}
                    className="w-24 text-right"
                    placeholder="0"
                  />
                </div>
                {invoice.taxRate > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Tax ({invoice.taxRate}%)</span>
                    <span className="text-sm">{fmt(invoice.taxAmount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="discount" className="text-muted-foreground text-sm">
                    Discount
                  </Label>
                  <Input
                    id="discount"
                    type="number"
                    min={0}
                    step="0.01"
                    value={invoice.discount || ''}
                    onChange={(e) => setField('discount', Math.max(0, Number(e.target.value)))}
                    className="w-24 text-right"
                    placeholder="0.00"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-primary text-lg font-bold">{fmt(invoice.total)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Currency</Label>
                  <Select value={invoice.currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.code} — {c.name} ({c.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={invoice.dueDate}
                    onChange={(e) => setField('dueDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.dueDate && (
                    <p className="text-destructive mt-1 text-xs">{errors.dueDate}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={invoice.notes}
                    onChange={(e) => setField('notes', e.target.value)}
                    placeholder="Payment terms, thank you message, etc."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button onClick={handleSave} size="lg" className="w-full">
              Save Invoice
            </Button>
          </div>

          {/* Right: Desktop Preview (sticky) */}
          <div className="hidden lg:block">
            <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
              <InvoicePreview invoice={invoice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Verify build**

Run: `pnpm build`
Expected: Compiles. Page renders at `/create`.

**Step 4: Manual verification**

Run: `pnpm dev`

- Navigate to `http://localhost:3000/create`
- Fill in business name, client name, add line items
- Verify amounts auto-calculate
- Verify preview updates in real-time on desktop
- Verify mobile Sheet preview works (resize browser)
- Click "Save Invoice" — Sonner toast should appear
- Check browser DevTools > Application > IndexedDB > quickbill > invoices

**Step 5: Commit**

```bash
git add src/app/create/page.tsx src/app/layout.tsx
git commit -m "feat: add invoice creation page with form and preview"
```

---

## Task 8: Shared Layout Components

**Files:**

- Create: `src/components/shared/header.tsx`
- Create: `src/components/shared/footer.tsx`
- Create: `src/components/shared/json-ld.tsx`

**Step 1: Create the header**

```tsx
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';

// BRANDING PLUG-IN: Replace <Zap /> + text with <Image src="/logo.svg" />
export function Header() {
  return (
    <header className="bg-background/95 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-primary flex items-center gap-2 font-bold">
          <Zap className="size-5" />
          {APP_NAME}
        </Link>
        <Button asChild size="sm">
          <Link href="/create">Create Invoice</Link>
        </Button>
      </div>
    </header>
  );
}
```

**Step 2: Create the footer**

```tsx
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="text-muted-foreground mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-sm sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
        <nav className="flex gap-4">
          {/* Links point to # until legal pages are created */}
          <Link href="#" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-foreground">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
```

**Step 3: Create the JSON-LD component**

```tsx
import { APP_NAME, APP_URL, APP_DESCRIPTION } from '@/lib/constants';

export function SoftwareApplicationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: APP_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: APP_DESCRIPTION,
    url: APP_URL,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

**Step 4: Commit**

```bash
git add src/components/shared/header.tsx src/components/shared/footer.tsx src/components/shared/json-ld.tsx
git commit -m "feat: add shared header, footer, and JSON-LD components"
```

---

## Task 9: Landing Page

**Files:**

- Modify: `src/app/page.tsx` (full rewrite)

> **IMPORTANT:** Use the **frontend-design** skill when implementing this task. The landing page must look polished and production-grade, not like a generic template.

**Step 1: Rewrite page.tsx as landing page**

Replace the entire file. Server component (no `'use client'`). Import Header, Footer, JSON-LD. Sections:

1. **Header** (shared component)
2. **Hero** — headline, subheadline, CTA button, placeholder illustration
3. **How It Works** — 3-step cards with Lucide icons (ClipboardList, FileText, Send)
4. **Features Grid** — 6 cards with icons
5. **Pro Coming Soon** — text-only teaser
6. **Footer** (shared component)

```tsx
import Link from 'next/link';
import {
  Zap,
  ClipboardList,
  FileText,
  Send,
  UserX,
  FileCheck,
  MessageCircle,
  WifiOff,
  Globe,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { SoftwareApplicationJsonLd } from '@/components/shared/json-ld';
import { APP_NAME } from '@/lib/constants';

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Fill in your details',
    description: 'Add your business info, client details, and line items in a simple form.',
  },
  {
    icon: FileText,
    title: 'Generate a professional PDF',
    description: 'Get a clean, business-ready invoice PDF generated instantly.',
  },
  {
    icon: Send,
    title: 'Share on WhatsApp',
    description: 'Send the PDF directly to your client on WhatsApp in one tap.',
  },
];

const FEATURES = [
  {
    icon: UserX,
    title: 'No Signup Required',
    description: 'Start invoicing instantly. No account, no email, no friction.',
  },
  {
    icon: FileCheck,
    title: 'Professional PDFs',
    description: 'Clean, business-ready invoice templates your clients will trust.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Native',
    description: 'Send invoices as PDF attachments, not just links.',
  },
  {
    icon: WifiOff,
    title: 'Works Offline',
    description: 'Your invoices are saved locally. No internet needed to access them.',
  },
  {
    icon: Globe,
    title: 'Auto Currency Detection',
    description: 'Detects your country and sets the right currency automatically.',
  },
  {
    icon: DollarSign,
    title: '100% Free',
    description: 'No hidden fees. No credit card. Free forever for basic invoicing.',
  },
];

export default function HomePage() {
  return (
    <>
      <SoftwareApplicationJsonLd />
      <Header />

      <main>
        {/* Hero */}
        <section className="from-primary/5 to-background border-b bg-linear-to-b">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center lg:py-32">
            <div className="bg-background text-muted-foreground flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm">
              <Zap className="text-primary size-4" />
              Free forever &mdash; no signup needed
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight lg:text-6xl">
              Send Professional Invoices on WhatsApp in{' '}
              <span className="text-primary">30 Seconds</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Create a PDF invoice and share it directly on WhatsApp. No signup. No fees. Built for
              freelancers, small businesses, and anyone who bills clients.
            </p>
            <Button asChild size="lg" className="text-base">
              <Link href="/create">Create Your First Invoice &rarr;</Link>
            </Button>

            {/* BRANDING PLUG-IN: Replace this placeholder with demo GIF/screenshot */}
            <div className="border-muted-foreground/20 bg-muted/30 mt-4 flex h-64 w-full max-w-2xl items-center justify-center rounded-xl border-2 border-dashed">
              <div className="text-muted-foreground/40 text-center">
                <FileText className="mx-auto mb-2 size-12" />
                <p className="text-sm">Demo preview coming soon</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-b">
          <div className="mx-auto max-w-7xl px-4 py-20">
            <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <div key={step.title} className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 text-primary mb-4 flex size-14 items-center justify-center rounded-full">
                    <step.icon className="size-7" />
                  </div>
                  <p className="text-muted-foreground mb-1 text-sm font-medium">Step {i + 1}</p>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b">
          <div className="mx-auto max-w-7xl px-4 py-20">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Everything you need, nothing you don&apos;t
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <Card
                  key={feature.title}
                  className="hover:ring-primary/20 transition-colors duration-200"
                >
                  <CardContent className="pt-6">
                    <feature.icon className="text-primary mb-3 size-8" />
                    <h3 className="mb-1 font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pro Coming Soon */}
        <section className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center">
            <h2 className="mb-3 text-2xl font-bold">{APP_NAME} Pro &mdash; Coming Soon</h2>
            <p className="text-muted-foreground mx-auto max-w-lg">
              Remove the watermark, add your own logo, set up recurring invoices, and accept online
              payments. We&apos;re building it right now.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
```

**Step 2: Verify build and visual check**

Run: `pnpm dev`

- Navigate to `http://localhost:3000`
- Verify all 5 sections render
- Click "Create Your First Invoice" — should navigate to `/create`
- Check responsive layout on mobile

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add landing page with hero, features, and CTA"
```

---

## Task 10: SEO Foundation

**Files:**

- Modify: `src/app/layout.tsx` (metadata + Toaster was already added in Task 7)
- Create: `src/app/sitemap.ts`
- Create: `public/robots.txt`
- Modify: `src/app/globals.css` (placeholder brand color)

**Step 1: Update layout.tsx metadata**

Replace the existing `metadata` export in `src/app/layout.tsx`:

```typescript
import { APP_NAME, APP_DESCRIPTION, APP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — Free Invoice Maker for WhatsApp | Send PDF Invoices`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: `${APP_NAME} — Free Invoice Maker for WhatsApp`,
    description: APP_DESCRIPTION,
    images: ['/og-image.png'],
    type: 'website',
    url: APP_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} — Free Invoice Maker for WhatsApp`,
    description: 'Send professional PDF invoices on WhatsApp in 30 seconds.',
    images: ['/og-image.png'],
  },
};
```

**Step 2: Create sitemap**

```typescript
import type { MetadataRoute } from 'next';
import { APP_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: APP_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    {
      url: `${APP_URL}/create`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
```

**Step 3: Create robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://www.freeinvoicekit.com/sitemap.xml
```

**Step 4: Update globals.css with placeholder brand color**

Apply the "Sharp Finance" palette from `Sprint1_Frontend_Design_Spec.md`. Replace multiple values in the `:root` block:

```css
:root {
  /* Deep navy primary — authoritative, financial, trustworthy */
  --primary: oklch(0.39 0.07 260);
  --primary-foreground: oklch(0.985 0 0);

  /* Warm off-white background */
  --background: oklch(0.985 0.002 90);
  --foreground: oklch(0.145 0 0);

  /* Cards slightly brighter than background for lift */
  --card: oklch(0.995 0 0);
  --card-foreground: oklch(0.145 0 0);

  /* Warm gray muted tones */
  --muted: oklch(0.955 0.005 90);
  --muted-foreground: oklch(0.45 0.01 260);

  /* Teal accent for success moments */
  --accent: oklch(0.55 0.15 170);
  --accent-foreground: oklch(0.985 0 0);

  /* Softer borders */
  --border: oklch(0.9 0.005 90);
  --input: oklch(0.92 0.005 90);
  --ring: oklch(0.39 0.07 260);

  /* Keep the rest unchanged */
}
```

> **BRANDING PLUG-IN:** When brand colors arrive, replace these oklch values. All components using `bg-primary`, `text-primary`, etc. update automatically. See `Sprint1_Frontend_Design_Spec.md` for the full design rationale.

**Step 5: Verify everything**

Run: `pnpm build`
Expected: Builds successfully.

Run: `pnpm dev`

- Check `http://localhost:3000/sitemap.xml` returns XML
- Check `http://localhost:3000/robots.txt` returns text
- View page source at `/` — verify `<title>`, `<meta>` tags, JSON-LD script
- Verify the blue primary color is visible on buttons and headings

**Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/sitemap.ts src/app/globals.css public/robots.txt
git commit -m "feat: add SEO metadata, sitemap, robots.txt, and brand color"
```

---

## Task Dependency Graph

```
Task 1 (Types)
  ↓
Task 2 (Constants)
  ↓
Task 3 (Currencies + Geolocation) ──→ Task 5 (Form Hook) ──→ Task 7 (Create Page)
  ↓                                                              ↑
Task 4 (IndexedDB + Hook) ──────────────────────────────────────┘
                                                                  ↑
Task 6 (Preview Panel) ──────────────────────────────────────────┘
  ↓
Task 8 (Header + Footer + JSON-LD) ──→ Task 9 (Landing Page)
  ↓
Task 10 (SEO)
```

- Tasks 1-2 are pure foundation — do first
- Tasks 3-4 are independent of each other — can run in parallel
- Task 5 depends on 1, 2, 3
- Task 6 depends on 1, 2, 3
- Task 7 depends on 5, 6, 4
- Tasks 8-9-10 are sequential

---

## Branding Plug-in Guide

When brand assets are ready, follow this checklist. No code restructuring needed.

### Assets to provide

| Asset                  | Specs        | Destination                              |
| ---------------------- | ------------ | ---------------------------------------- |
| `logo.svg`             | Vector logo  | `public/logo.svg`                        |
| `favicon.ico`          | 32x32        | `src/app/favicon.ico` (replace existing) |
| `icon-192.png`         | 192x192 PNG  | `public/icon-192.png`                    |
| `icon-512.png`         | 512x512 PNG  | `public/icon-512.png`                    |
| `apple-touch-icon.png` | 180x180 PNG  | `public/apple-touch-icon.png`            |
| `og-image.png`         | 1200x630 PNG | `public/og-image.png`                    |

### Code changes

| #   | File                                                 | Change                                                                                               |
| --- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1   | `src/lib/constants.ts`                               | Update `APP_URL` if domain changes                                                                   |
| 2   | `src/app/globals.css`                                | Replace `--primary` and `--accent` oklch values in `:root` and `.dark`                               |
| 3   | `src/app/layout.tsx`                                 | Swap `Geist` font import for brand font. Add `metadata.icons` for new icon files                     |
| 4   | `src/components/shared/header.tsx`                   | Replace `<Zap /> Free Invoice Kit` with `<Image src="/logo.svg" alt="Free Invoice Kit" width={120} height={32} />` |
| 5   | `src/components/invoice-preview/invoice-preview.tsx` | Replace `<Zap />` in watermark footer with `<img src="/logo.svg" />`                                 |
| 6   | `src/app/page.tsx`                                   | Replace hero placeholder `<div>` with `<Image src="/demo.gif" />` or screenshot                      |

### How colors propagate

All shadcn components use Tailwind classes like `bg-primary`, `text-primary-foreground`, `border-border`. These resolve to CSS variables defined in `globals.css`. Changing the variable values in `:root` and `.dark` instantly updates every component — no per-file changes needed.

### How text propagates

All user-facing brand text (`APP_NAME`, `APP_TAGLINE`, `APP_DESCRIPTION`, `APP_URL`) is imported from `src/lib/constants.ts`. Updating that single file updates the header, footer, preview watermark, SEO metadata, and JSON-LD.

---

## Deferred Manual Tasks

| Task                         | Owner        | When            | Notes                                                                               |
| ---------------------------- | ------------ | --------------- | ----------------------------------------------------------------------------------- |
| Brand assets                 | PM/Designer  | Anytime         | Follow Branding Plug-in Guide above                                                 |
| Legal pages (Privacy, Terms) | PM           | Before launch   | Create `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`, update Footer links |
| Twitter/X posts              | PM           | During Sprint 1 | 3 build-in-public posts with screenshots                                            |
| Domain + DNS                 | PM/Team Lead | Before launch   | Update `APP_URL` in constants.ts, configure Vercel custom domain                    |
| Google Search Console        | PM           | After domain    | Verify domain, submit sitemap                                                       |
| Pro waitlist email capture   | Dev          | Sprint 3        | Wire up waitlist banner and API to Supabase                                         |
