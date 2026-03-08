'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  Loader2,
  Mail,
  Pencil,
  Plus,
  Save,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

import { InvoicePreview } from '@/components/invoice-preview/invoice-preview';
import { ProWaitlistBanner } from '@/components/pro-waitlist-banner';
import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useInvoiceForm, type ValidationErrors } from '@/hooks/use-invoice-form';
import { useLocalInvoices } from '@/hooks/use-local-invoices';
import { CURRENCIES, formatCurrency } from '@/lib/currencies';
import { MAX_INVOICES } from '@/lib/constants';
import { copyCaptionText, downloadPdf, shareOnWhatsApp, shareViaEmail } from '@/lib/share';
import { cn } from '@/lib/utils';

function getNumberValue(value: string) {
  if (!value) {
    return 0;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
}

function Field({ id, label, required, error, className, labelClassName, children }: FieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id} className={labelClassName}>
        {label}
        {required ? <span className="text-destructive">*</span> : null}
      </Label>
      {children}
      {error ? <p className="text-destructive text-xs">{error}</p> : null}
    </div>
  );
}

export default function CreateInvoicePage() {
  const {
    invoice,
    setField,
    setLineItem,
    addLineItem,
    removeLineItem,
    reset,
    setCurrency,
    setPdfUrl,
    validate,
  } = useInvoiceForm();
  const { invoices, loading, saveInvoice } = useLocalInvoices();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [hasSavedBusiness, setHasSavedBusiness] = useState(false);
  const [businessEditable, setBusinessEditable] = useState(true);

  const BUSINESS_STORAGE_KEY = 'quickbill_business_info';

  const today = useMemo(() => new Date().toISOString().split('T')[0] ?? '', []);
  const storageMessage = loading
    ? 'Checking saved invoices...'
    : `${invoices.length} of ${MAX_INVOICES} local slots used.`;
  const hasRemotePdf = Boolean(generatedPdfUrl && !generatedPdfUrl.startsWith('blob:'));
  const hasValidationErrors = Object.keys(errors).length > 0;
  const actionDisabled = isSaving || isGenerating;

  // Load saved business info on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BUSINESS_STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as Record<string, string>;
        if (data.businessName) setField('businessName', data.businessName);
        if (data.businessEmail) setField('businessEmail', data.businessEmail);
        if (data.businessPhone) setField('businessPhone', data.businessPhone);
        if (data.businessAddress) setField('businessAddress', data.businessAddress);
        setHasSavedBusiness(true);
        setBusinessEditable(false);
      }
    } catch {
      // ignore invalid localStorage data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveBusinessInfo = useCallback(() => {
    const data = {
      businessName: invoice.businessName,
      businessEmail: invoice.businessEmail,
      businessPhone: invoice.businessPhone,
      businessAddress: invoice.businessAddress,
    };
    localStorage.setItem(BUSINESS_STORAGE_KEY, JSON.stringify(data));
    setHasSavedBusiness(true);
    setBusinessEditable(false);
    toast.success('Business info saved for future invoices.');
  }, [invoice.businessName, invoice.businessEmail, invoice.businessPhone, invoice.businessAddress]);

  const handleClearBusinessInfo = useCallback(() => {
    localStorage.removeItem(BUSINESS_STORAGE_KEY);
    setField('businessName', '');
    setField('businessEmail', '');
    setField('businessPhone', '');
    setField('businessAddress', '');
    setHasSavedBusiness(false);
    setBusinessEditable(true);
  }, [setField]);

  useEffect(() => {
    return () => {
      if (generatedPdfUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(generatedPdfUrl);
      }
    };
  }, [generatedPdfUrl]);

  async function handleSaveInvoice() {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error('Fix the highlighted fields before saving.');
      return;
    }

    setIsSaving(true);

    try {
      const currentCurrency = invoice.currency;
      await saveInvoice(invoice);
      toast.success(`Invoice ${invoice.id} saved locally.`);
      reset();
      setCurrency(currentCurrency);
      setGeneratedPdfUrl(null);
      setErrors({});
    } catch {
      toast.error('Could not save the invoice in local storage.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleGenerateInvoice() {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error('Fix the highlighted fields before generating.');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/invoice/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoice),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorData?.error || 'Failed to generate PDF');
      }

      let resolvedPdfUrl: string;
      let persistedPdfUrl: string | undefined;

      if (response.headers.get('Content-Type')?.includes('application/pdf')) {
        const blob = await response.blob();
        resolvedPdfUrl = URL.createObjectURL(blob);
      } else {
        const data = (await response.json()) as { pdfUrl?: string };

        if (!data.pdfUrl) {
          throw new Error('PDF URL was not returned by the server');
        }

        resolvedPdfUrl = data.pdfUrl;
        persistedPdfUrl = data.pdfUrl;
      }

      if (generatedPdfUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(generatedPdfUrl);
      }

      setGeneratedPdfUrl(resolvedPdfUrl);

      if (persistedPdfUrl) {
        setPdfUrl(persistedPdfUrl);
      } else {
        setField('status', 'sent');
      }

      await saveInvoice({
        ...invoice,
        status: 'sent',
        pdfUrl: persistedPdfUrl,
      });

      toast.success('Invoice PDF generated successfully.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate PDF';
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleCreateAnotherInvoice() {
    const currentCurrency = invoice.currency;

    if (generatedPdfUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(generatedPdfUrl);
    }

    setGeneratedPdfUrl(null);
    reset();
    setCurrency(currentCurrency);
    setErrors({});
  }

  function getInvoiceForSharing() {
    return {
      ...invoice,
      pdfUrl: invoice.pdfUrl || generatedPdfUrl || undefined,
    };
  }

  async function handleShareWhatsApp() {
    const invoiceToShare = getInvoiceForSharing();

    if (!invoiceToShare.pdfUrl) {
      toast.error('Generate a PDF first before sharing.');
      return;
    }

    const result = await shareOnWhatsApp(invoiceToShare);

    if (result === 'shared') {
      toast.success('Invoice shared on WhatsApp.');
      return;
    }

    if (result === 'fallback') {
      toast.info('PDF downloaded. Attach it in the WhatsApp chat that opened.');
    }
  }

  async function handleDownloadPdf() {
    const success = await downloadPdf(getInvoiceForSharing());

    if (!success) {
      toast.error('Generate a PDF first before downloading.');
      return;
    }

    toast.success('PDF downloaded.');
  }

  async function handleShareEmail() {
    await shareViaEmail(getInvoiceForSharing());
    toast.info('Email client opened.');
  }

  async function handleCopyCaption() {
    try {
      await copyCaptionText(getInvoiceForSharing());
      toast.success('Caption copied to clipboard.');
    } catch {
      toast.error('Could not copy caption. Please try again.');
    }
  }

  return (
    <div className="min-h-screen">
      <Header ctaHref="/" ctaLabel="Back Home" />

      <main className="app-shell py-6 pb-32 sm:py-8 sm:pb-36 lg:py-10 lg:pb-12">
        {/* Mobile: compact tool header — form visible immediately */}
        <div className="flex items-center justify-between px-1 pb-4 lg:hidden">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground flex size-9 items-center justify-center rounded-xl transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">New Invoice</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
            >
              {invoice.status === 'sent' ? 'Ready' : 'Draft'}
            </Badge>
            <span className="text-muted-foreground text-xs tabular-nums">
              {invoices.length}/{MAX_INVOICES}
            </span>
          </div>
        </div>

        {/* Desktop: editorial hero with stat cards */}
        <section className="editorial-shell relative hidden overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:block">
          <div className="paper-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(77,92,255,0.14),transparent_55%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
              >
                <ArrowLeft className="size-4" />
                Back to landing page
              </Link>

              <div className="space-y-3">
                <Badge
                  variant="outline"
                  className="rounded-full bg-white/75 px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase"
                >
                  Mobile-first invoice workspace
                </Badge>
                <div>
                  <h1
                    data-display="true"
                    className="max-w-3xl text-4xl leading-[0.96] font-semibold text-foreground sm:text-5xl"
                  >
                    Generate the invoice before the payment conversation cools off.
                  </h1>
                  <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-7 sm:text-base">
                    Fill the essentials, watch the preview update live, and export a client-ready
                    PDF without bouncing between tabs or tools.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
              <div className="rounded-[1.4rem] border border-white/75 bg-white/72 p-4">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.18em] uppercase">
                  Output
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">PDF + local draft</p>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  Save a draft or generate the invoice immediately.
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-white/75 bg-white/72 p-4">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.18em] uppercase">
                  Status
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {invoice.status === 'sent' ? 'Ready to share' : 'Draft in progress'}
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  {hasValidationErrors
                    ? 'Some required fields still need attention.'
                    : 'The live preview tracks each edit in real time.'}
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-white/75 bg-white/72 p-4">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.18em] uppercase">
                  Storage
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">{storageMessage}</p>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  Generated invoices can also publish a hosted PDF when Supabase is configured.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop: banner after hero */}
        <div className="mt-6 hidden lg:block">
          <ProWaitlistBanner source="banner" variant="banner" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-6">
            <Card
              className={cn(
                'bg-white/90',
                errors.businessName ? 'ring-2 ring-destructive/20' : undefined
              )}
            >
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <CardTitle>Business Info</CardTitle>
                  <CardDescription>Tell the client who this invoice is from.</CardDescription>
                </div>
                <div className="flex items-center gap-1.5">
                  {!hasSavedBusiness && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleSaveBusinessInfo}
                      disabled={!invoice.businessName.trim()}
                    >
                      <Save className="size-3.5" />
                      Save
                    </Button>
                  )}
                  {hasSavedBusiness && !businessEditable && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setBusinessEditable(true)}
                    >
                      <Pencil className="size-3.5" />
                      Edit
                    </Button>
                  )}
                  {hasSavedBusiness && businessEditable && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleSaveBusinessInfo}
                      disabled={!invoice.businessName.trim()}
                    >
                      <Save className="size-3.5" />
                      Save
                    </Button>
                  )}
                  {hasSavedBusiness && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleClearBusinessInfo}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="size-3.5" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Field id="businessName" label="Business Name" required error={errors.businessName}>
                  <Input
                    id="businessName"
                    value={invoice.businessName}
                    placeholder="Studio North"
                    aria-invalid={Boolean(errors.businessName)}
                    disabled={hasSavedBusiness && !businessEditable}
                    onChange={(event) => setField('businessName', event.target.value)}
                  />
                </Field>

                <Field id="businessEmail" label="Email">
                  <Input
                    id="businessEmail"
                    type="email"
                    value={invoice.businessEmail}
                    placeholder="hello@studionorth.com"
                    disabled={hasSavedBusiness && !businessEditable}
                    onChange={(event) => setField('businessEmail', event.target.value)}
                  />
                </Field>

                <Field id="businessPhone" label="Phone">
                  <Input
                    id="businessPhone"
                    value={invoice.businessPhone}
                    placeholder="+1 (555) 123-4567"
                    disabled={hasSavedBusiness && !businessEditable}
                    onChange={(event) => setField('businessPhone', event.target.value)}
                  />
                </Field>

                <Field id="businessAddress" label="Address" className="sm:col-span-2">
                  <Textarea
                    id="businessAddress"
                    value={invoice.businessAddress}
                    placeholder="221B Market Street, Suite 8, San Francisco"
                    disabled={hasSavedBusiness && !businessEditable}
                    onChange={(event) => setField('businessAddress', event.target.value)}
                  />
                </Field>
              </CardContent>
            </Card>

            <Card className={cn('bg-white/90', errors.clientName ? 'ring-2 ring-destructive/20' : undefined)}>
              <CardHeader>
                <CardTitle>Client Info</CardTitle>
                <CardDescription>Who should receive and pay this invoice?</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Field id="clientName" label="Client Name" required error={errors.clientName}>
                  <Input
                    id="clientName"
                    value={invoice.clientName}
                    placeholder="Amina Yusuf"
                    aria-invalid={Boolean(errors.clientName)}
                    onChange={(event) => setField('clientName', event.target.value)}
                  />
                </Field>

                <Field id="clientCompany" label="Company">
                  <Input
                    id="clientCompany"
                    value={invoice.clientCompany}
                    placeholder="Yusuf Media"
                    onChange={(event) => setField('clientCompany', event.target.value)}
                  />
                </Field>

                <Field id="clientEmail" label="Email">
                  <Input
                    id="clientEmail"
                    type="email"
                    value={invoice.clientEmail}
                    placeholder="amina@yusufmedia.com"
                    onChange={(event) => setField('clientEmail', event.target.value)}
                  />
                </Field>

                <Field id="clientPhone" label="Phone">
                  <Input
                    id="clientPhone"
                    value={invoice.clientPhone}
                    placeholder="+92 300 0000000"
                    onChange={(event) => setField('clientPhone', event.target.value)}
                  />
                </Field>
              </CardContent>
            </Card>

            <Card className={cn('bg-white/90', errors.lineItems ? 'ring-2 ring-destructive/20' : undefined)}>
              <CardHeader>
                <CardTitle>Line Items</CardTitle>
                <CardDescription>Add the work, quantity, and rate for each charge.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-muted-foreground hidden grid-cols-[minmax(0,1fr)_72px_108px_108px_40px] gap-3 text-[11px] font-semibold tracking-[0.18em] uppercase sm:grid">
                  <p>Description</p>
                  <p className="text-right">Qty</p>
                  <p className="text-right">Rate</p>
                  <p className="text-right">Amount</p>
                  <span />
                </div>

                <div className="-mx-4 space-y-3 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                  {invoice.lineItems.map((item, index) => {
                    const rowInvalid =
                      Boolean(errors.lineItems) && (!item.description.trim() || item.rate <= 0);

                    return (
                      <div
                        key={item.id}
                        className="grid gap-3 rounded-[1.4rem] border border-border/70 bg-muted/55 p-3 sm:grid-cols-[minmax(0,1fr)_72px_108px_108px_40px] sm:items-end"
                      >
                        <Field
                          id={`line-item-description-${index}`}
                          label="Description"
                          className="sm:space-y-0"
                          labelClassName="sm:hidden"
                        >
                          <Input
                            id={`line-item-description-${index}`}
                            value={item.description}
                            placeholder="Website design retainer"
                            aria-invalid={rowInvalid && !item.description.trim()}
                            onChange={(event) =>
                              setLineItem(index, 'description', event.target.value)
                            }
                            className="bg-background/88"
                          />
                        </Field>

                        <Field
                          id={`line-item-quantity-${index}`}
                          label="Qty"
                          className="sm:space-y-0"
                          labelClassName="sm:hidden"
                        >
                          <Input
                            id={`line-item-quantity-${index}`}
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(event) =>
                              setLineItem(index, 'quantity', getNumberValue(event.target.value))
                            }
                            className="text-right"
                          />
                        </Field>

                        <Field
                          id={`line-item-rate-${index}`}
                          label="Rate"
                          className="sm:space-y-0"
                          labelClassName="sm:hidden"
                        >
                          <Input
                            id={`line-item-rate-${index}`}
                            type="number"
                            min={0}
                            step="0.01"
                            value={item.rate}
                            placeholder="0.00"
                            aria-invalid={rowInvalid && item.rate <= 0}
                            onChange={(event) =>
                              setLineItem(index, 'rate', getNumberValue(event.target.value))
                            }
                            className="text-right"
                          />
                        </Field>

                        <div className="space-y-2 sm:space-y-0">
                          <Label htmlFor={`line-item-amount-${index}`} className="sm:hidden">
                            Amount
                          </Label>
                          <div
                            id={`line-item-amount-${index}`}
                            className="flex h-11 items-center justify-end rounded-2xl border border-input bg-background/88 px-3.5 text-sm font-medium text-foreground"
                          >
                            {formatCurrency(item.amount, invoice.currency)}
                          </div>
                        </div>

                        <div className="flex items-end justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeLineItem(index)}
                            disabled={invoice.lineItems.length === 1}
                            className="text-muted-foreground hover:text-destructive size-10"
                          >
                            <Trash2 className="size-4" />
                            <span className="sr-only">Remove line item</span>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {errors.lineItems ? (
                  <p className="text-destructive text-xs">{errors.lineItems}</p>
                ) : null}

                <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
                  <Plus className="size-4" />
                  Add Line Item
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/90">
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Fine-tune totals before saving the invoice.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="taxRate" label="Tax Rate (%)">
                    <Input
                      id="taxRate"
                      type="number"
                      min={0}
                      step="0.01"
                      value={invoice.taxRate}
                      onChange={(event) => setField('taxRate', getNumberValue(event.target.value))}
                    />
                  </Field>

                  <Field id="discount" label="Discount (%)">
                    <Input
                      id="discount"
                      type="number"
                      min={0}
                      max={100}
                      step="0.01"
                      value={invoice.discount}
                      onChange={(event) => setField('discount', getNumberValue(event.target.value))}
                    />
                  </Field>
                </div>

                <div className="space-y-3 rounded-[1.4rem] border border-border/70 bg-muted/60 p-4">
                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                  </div>
                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <span>Tax Amount</span>
                    <span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
                  </div>
                  {invoice.discount > 0 ? (
                    <div className="text-muted-foreground flex items-center justify-between text-sm">
                      <span>Discount ({invoice.discount}%)</span>
                      <span>-{formatCurrency(invoice.discountAmount, invoice.currency)}</span>
                    </div>
                  ) : null}
                  <Separator />
                  <div className="flex items-center justify-between text-lg font-bold tracking-tight text-foreground">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatCurrency(invoice.total, invoice.currency)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={cn('bg-white/90', errors.dueDate ? 'ring-2 ring-destructive/20' : undefined)}>
              <CardHeader>
                <CardTitle>Details</CardTitle>
                <CardDescription>
                  Choose the invoice currency, due date, and any notes.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Field id="currency" label="Currency">
                  <Select value={invoice.currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency" className="w-full bg-background/88">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} · {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field id="dueDate" label="Due Date" error={errors.dueDate}>
                  <Input
                    id="dueDate"
                    type="date"
                    min={today}
                    value={invoice.dueDate}
                    aria-invalid={Boolean(errors.dueDate)}
                    onChange={(event) => setField('dueDate', event.target.value)}
                  />
                </Field>

                <Field id="notes" label="Notes" className="sm:col-span-2">
                  <Textarea
                    id="notes"
                    value={invoice.notes}
                    placeholder="Thanks for the opportunity. Payment is due within 7 days."
                    onChange={(event) => setField('notes', event.target.value)}
                  />
                </Field>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="bg-background/90"
                  disabled={actionDisabled}
                  onClick={handleSaveInvoice}
                >
                  {isSaving ? 'Saving draft...' : 'Save Draft'}
                </Button>

                <Button
                  type="button"
                  size="lg"
                  disabled={actionDisabled}
                  onClick={handleGenerateInvoice}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      Generate Invoice
                    </>
                  )}
                </Button>
              </div>

              <p className="text-muted-foreground text-center text-xs">{storageMessage}</p>
            </div>

            {/* Mobile: banner after form, before results */}
            <div className="lg:hidden">
              <ProWaitlistBanner source="banner" variant="banner" />
            </div>

            {generatedPdfUrl ? (
              <Card className="border border-emerald-200 bg-[linear-gradient(180deg,rgba(236,253,245,0.88),rgba(255,255,255,0.94))]">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-6 text-emerald-600" />
                    <div>
                      <CardTitle>Invoice Ready</CardTitle>
                      <CardDescription>
                        Your invoice for {invoice.clientName || 'this client'} is ready to download
                        {hasRemotePdf ? ', share,' : ''} and archive.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Primary: WhatsApp — light bg, green icon, native share-sheet feel */}
                  <Button
                    size="lg"
                    className="w-full border border-input bg-background/88 font-semibold text-[#075E54] shadow-sm hover:bg-accent"
                    onClick={handleShareWhatsApp}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5"
                      aria-hidden="true"
                    >
                      <path
                        fill="#25D366"
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                      />
                    </svg>
                    Send on WhatsApp
                  </Button>

                  {/* Secondary actions — 2-col grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="bg-background/88"
                      onClick={handleDownloadPdf}
                    >
                      <Download className="size-4" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-background/88"
                      onClick={handleShareEmail}
                    >
                      <Mail className="size-4" />
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-background/88"
                      onClick={handleCopyCaption}
                    >
                      <Copy className="size-4" />
                      Copy Text
                    </Button>
                    <Button asChild variant="outline" className="bg-background/88">
                      <a href={generatedPdfUrl} target="_blank" rel="noreferrer">
                        <Eye className="size-4" />
                        Open PDF
                      </a>
                    </Button>
                  </div>

                  <div className="rounded-[1.4rem] border border-emerald-200/80 bg-white/80 p-3 text-xs leading-6 text-muted-foreground">
                    {hasRemotePdf
                      ? 'Supabase storage is configured, so this invoice now has a hosted PDF URL.'
                      : 'Supabase storage is not configured yet, so this PDF is available as a direct browser download for this session.'}
                  </div>

                  <Button
                    variant="ghost"
                    className="text-muted-foreground w-full"
                    onClick={handleCreateAnotherInvoice}
                  >
                    Create Another Invoice
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-[1.75rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,245,238,0.9))] p-4 shadow-[0_30px_90px_-70px_rgba(24,34,48,0.85)]">
                <div className="flex items-start justify-between gap-4 border-b border-dashed border-border/70 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Live Preview</p>
                    <p className="text-muted-foreground mt-1 text-xs leading-5">
                      The layout below mirrors the invoice data used for PDF generation.
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-full bg-white px-3 py-1 text-[11px] tracking-[0.18em] uppercase"
                  >
                    {invoice.status}
                  </Badge>
                </div>

                <div className="mt-4">
                  <InvoicePreview invoice={invoice} className="border-white/80 shadow-none" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-background/92 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="app-shell px-0">
          <div className="editorial-panel flex items-center gap-2 px-2 py-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <Eye className="size-4" />
                  Preview
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] overflow-y-auto p-4">
                <SheetHeader className="px-4 pb-0">
                  <SheetTitle>Invoice Preview</SheetTitle>
                  <SheetDescription>
                    Live preview of the invoice as it will appear to your client.
                  </SheetDescription>
                </SheetHeader>
                <div className="pt-2">
                  <InvoicePreview invoice={invoice} />
                </div>
              </SheetContent>
            </Sheet>

            <Button
              type="button"
              variant="outline"
              className="flex-1"
              disabled={actionDisabled}
              onClick={handleSaveInvoice}
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save
                </>
              )}
            </Button>

            <Button
              type="button"
              className="flex-[1.15]"
              disabled={actionDisabled}
              onClick={handleGenerateInvoice}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Generating
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
