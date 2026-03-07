'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Eye,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

import { InvoicePreview } from '@/components/invoice-preview/invoice-preview';
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

  const today = useMemo(() => new Date().toISOString().split('T')[0] ?? '', []);
  const storageMessage = loading
    ? 'Checking saved invoices...'
    : `${invoices.length} of ${MAX_INVOICES} local slots used.`;
  const hasRemotePdf = Boolean(generatedPdfUrl && !generatedPdfUrl.startsWith('blob:'));

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

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(244,246,241,0.96)_0%,rgba(248,246,240,0.92)_36%,rgba(250,248,244,1)_100%)]">
      <Header ctaHref="/" ctaLabel="Back Home" />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section className="relative overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white/80 px-5 py-6 shadow-[0_30px_100px_-60px_rgba(24,34,48,0.55)] backdrop-blur sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(33,69,98,0.12),transparent_55%)] lg:block" />

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
                  className="rounded-full border-stone-300 bg-stone-50 px-3 py-1 text-[11px] tracking-[0.2em] uppercase"
                >
                  Sprint 2 Workspace
                </Badge>
                <div>
                  <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">
                    Generate a polished PDF invoice without leaving the form.
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                    Fill the essentials, preview the document live, then export a client-ready PDF
                    with the same layout and totals shown on screen.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
              <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-4">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-stone-500 uppercase">
                  Output
                </p>
                <p className="mt-2 text-lg font-semibold text-stone-950">PDF + local draft</p>
                <p className="mt-1 text-xs leading-5 text-stone-600">
                  Save a draft or generate the invoice immediately.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-4">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-stone-500 uppercase">
                  Status
                </p>
                <p className="mt-2 text-lg font-semibold text-stone-950">
                  {invoice.status === 'sent' ? 'Ready to share' : 'Draft in progress'}
                </p>
                <p className="mt-1 text-xs leading-5 text-stone-600">
                  The live preview tracks each edit in real time.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-4">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-stone-500 uppercase">
                  Storage
                </p>
                <p className="mt-2 text-lg font-semibold text-stone-950">{storageMessage}</p>
                <p className="mt-1 text-xs leading-5 text-stone-600">
                  Generated invoices can also publish a hosted PDF when Supabase is configured.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 flex items-center justify-end lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="bg-white">
                <Eye className="size-4" />
                Preview
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[88vh] overflow-y-auto px-0">
              <SheetHeader className="px-4 pb-0">
                <SheetTitle>Invoice Preview</SheetTitle>
                <SheetDescription>
                  Live preview of the invoice as it will appear to your client.
                </SheetDescription>
              </SheetHeader>
              <div className="p-4 pt-2">
                <InvoicePreview invoice={invoice} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-6">
            <Card className="border border-stone-200/90 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle>Business Info</CardTitle>
                <CardDescription>Tell the client who this invoice is from.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Field id="businessName" label="Business Name" required error={errors.businessName}>
                  <Input
                    id="businessName"
                    value={invoice.businessName}
                    placeholder="Studio North"
                    aria-invalid={Boolean(errors.businessName)}
                    onChange={(event) => setField('businessName', event.target.value)}
                  />
                </Field>

                <Field id="businessEmail" label="Email">
                  <Input
                    id="businessEmail"
                    type="email"
                    value={invoice.businessEmail}
                    placeholder="hello@studionorth.com"
                    onChange={(event) => setField('businessEmail', event.target.value)}
                  />
                </Field>

                <Field id="businessPhone" label="Phone">
                  <Input
                    id="businessPhone"
                    value={invoice.businessPhone}
                    placeholder="+1 (555) 123-4567"
                    onChange={(event) => setField('businessPhone', event.target.value)}
                  />
                </Field>

                <Field id="businessAddress" label="Address" className="sm:col-span-2">
                  <Textarea
                    id="businessAddress"
                    value={invoice.businessAddress}
                    placeholder="221B Market Street, Suite 8, San Francisco"
                    onChange={(event) => setField('businessAddress', event.target.value)}
                  />
                </Field>
              </CardContent>
            </Card>

            <Card className="border border-stone-200/90 bg-white/90 shadow-sm">
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

            <Card className="border border-stone-200/90 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle>Line Items</CardTitle>
                <CardDescription>Add the work, quantity, and rate for each charge.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="hidden grid-cols-[minmax(0,1fr)_72px_108px_108px_40px] gap-3 text-[11px] font-semibold tracking-[0.18em] text-stone-500 uppercase sm:grid">
                  <p>Description</p>
                  <p className="text-right">Qty</p>
                  <p className="text-right">Rate</p>
                  <p className="text-right">Amount</p>
                  <span />
                </div>

                <div className="space-y-3 overflow-x-auto">
                  {invoice.lineItems.map((item, index) => {
                    const rowInvalid =
                      Boolean(errors.lineItems) && (!item.description.trim() || item.rate <= 0);

                    return (
                      <div
                        key={item.id}
                        className="grid gap-3 rounded-2xl border border-stone-200 bg-stone-50/70 p-3 sm:grid-cols-[minmax(0,1fr)_72px_108px_108px_40px] sm:items-end"
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
                            className="bg-white"
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
                            className="flex h-8 items-center justify-end rounded-lg border border-stone-200 bg-white px-2.5 text-sm font-medium text-stone-900"
                          >
                            {formatCurrency(item.amount, invoice.currency)}
                          </div>
                        </div>

                        <div className="flex items-end justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => removeLineItem(index)}
                            disabled={invoice.lineItems.length === 1}
                            className="text-muted-foreground hover:text-destructive"
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

            <Card className="border border-stone-200/90 bg-white/90 shadow-sm">
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

                  <Field id="discount" label="Discount">
                    <Input
                      id="discount"
                      type="number"
                      min={0}
                      step="0.01"
                      value={invoice.discount}
                      onChange={(event) => setField('discount', getNumberValue(event.target.value))}
                    />
                  </Field>
                </div>

                <div className="space-y-3 rounded-2xl border border-stone-200 bg-stone-50/80 p-4">
                  <div className="flex items-center justify-between text-sm text-stone-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-stone-600">
                    <span>Tax Amount</span>
                    <span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
                  </div>
                  {invoice.discount > 0 ? (
                    <div className="flex items-center justify-between text-sm text-stone-600">
                      <span>Discount</span>
                      <span>-{formatCurrency(invoice.discount, invoice.currency)}</span>
                    </div>
                  ) : null}
                  <Separator />
                  <div className="flex items-center justify-between text-lg font-bold tracking-tight text-stone-950">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatCurrency(invoice.total, invoice.currency)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-stone-200/90 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle>Details</CardTitle>
                <CardDescription>
                  Choose the invoice currency, due date, and any notes.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Field id="currency" label="Currency">
                  <Select value={invoice.currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency" className="w-full bg-white">
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
                  className="bg-white shadow-sm"
                  disabled={isSaving || isGenerating}
                  onClick={handleSaveInvoice}
                >
                  {isSaving ? 'Saving draft...' : 'Save Draft'}
                </Button>

                <Button
                  type="button"
                  size="lg"
                  className="shadow-sm"
                  disabled={isSaving || isGenerating}
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

              <p className="text-center text-xs text-stone-500">{storageMessage}</p>
            </div>

            {generatedPdfUrl ? (
              <Card className="border border-emerald-200 bg-[linear-gradient(180deg,rgba(236,253,245,0.88),rgba(255,255,255,0.94))] shadow-sm">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-6 text-emerald-600" />
                    <div>
                      <CardTitle>Invoice Ready</CardTitle>
                      <CardDescription>
                        Your invoice for {invoice.clientName || 'this client'} is ready to
                        download{hasRemotePdf ? ', share,' : ''} and archive.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button asChild variant="outline" className="bg-white">
                      <a href={generatedPdfUrl} download={`invoice-${invoice.id}.pdf`}>
                        <Download className="size-4" />
                        Download PDF
                      </a>
                    </Button>

                    <Button asChild className="shadow-sm">
                      <a href={generatedPdfUrl} target="_blank" rel="noreferrer">
                        <Eye className="size-4" />
                        Open PDF
                      </a>
                    </Button>
                  </div>

                  <div className="rounded-2xl border border-emerald-200/80 bg-white/80 p-3 text-xs leading-6 text-stone-600">
                    {hasRemotePdf
                      ? 'Supabase storage is configured, so this invoice now has a hosted PDF URL.'
                      : 'Supabase storage is not configured yet, so this PDF is available as a direct browser download for this session.'}
                  </div>

                  <Button variant="ghost" className="w-full" onClick={handleCreateAnotherInvoice}>
                    Create Another Invoice
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-[1.75rem] border border-stone-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(246,243,236,0.9))] p-4 shadow-[0_30px_90px_-70px_rgba(24,34,48,0.85)]">
                <div className="flex items-start justify-between gap-4 border-b border-dashed border-stone-200 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-stone-950">Live Preview</p>
                    <p className="mt-1 text-xs leading-5 text-stone-600">
                      The layout below mirrors the invoice data used for PDF generation.
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-full border-stone-300 bg-white px-3 py-1 text-[11px] tracking-[0.18em] uppercase"
                  >
                    {invoice.status}
                  </Badge>
                </div>

                <div className="mt-4">
                  <InvoicePreview invoice={invoice} className="border-stone-200 shadow-none" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
