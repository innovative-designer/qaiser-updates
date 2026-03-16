'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Save,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

import { InvoiceColorPicker } from '@/components/shared/invoice-color-picker';
import { PdfTemplatePicker } from '@/components/shared/pdf-template-picker';
import { SidebarDesign } from '@/components/shared/sidebar-design';
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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useInvoiceForm, type ValidationErrors } from '@/hooks/use-invoice-form';
import { useLocalInvoices } from '@/hooks/use-local-invoices';
import { captureAnalyticsEvent } from '@/lib/analytics/posthog';
import { CURRENCIES, formatCurrency } from '@/lib/currencies';
import { DEFAULT_ACCENT_COLOR, DEFAULT_PDF_TEMPLATE_ID, MAX_INVOICES } from '@/lib/constants';
import { downloadPdf, shareOnWhatsApp } from '@/lib/share';
import { getSharedInvoicePdfPath } from '@/lib/shared-invoice-links';
import type { PdfTemplateId } from '@/types/pdf-template';
import { cn } from '@/lib/utils';

function getNumberValue(value: string) {
  if (!value) {
    return 0;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function selectAll(event: React.FocusEvent<HTMLInputElement>) {
  event.currentTarget.select();
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
      <Label htmlFor={id} className={cn('text-[11px] font-semibold tracking-[0.08em] uppercase text-muted-foreground', labelClassName)}>
        {label}
        {required ? <span className="text-destructive ml-0.5">*</span> : null}
      </Label>
      {children}
      {error ? <p className="text-destructive text-xs font-medium">{error}</p> : null}
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
  const [generatedViewerPath, setGeneratedViewerPath] = useState<string | null>(null);
  const invoiceReadyRef = useRef<HTMLDivElement>(null);
  const [hasSavedBusiness, setHasSavedBusiness] = useState(false);
  const [businessEditable, setBusinessEditable] = useState(true);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT_COLOR);
  const [pdfTemplateId, setPdfTemplateId] = useState<PdfTemplateId>(DEFAULT_PDF_TEMPLATE_ID);

  const BUSINESS_STORAGE_KEY = 'freeinvoicekit_business_info';
  const ACCENT_COLOR_KEY = 'freeinvoicekit_accent_color';
  const PDF_TEMPLATE_KEY = 'freeinvoicekit_pdf_template';

  const today = useMemo(() => new Date().toISOString().split('T')[0] ?? '', []);
  const storageMessage = loading
    ? 'Checking saved invoices...'
    : `${invoices.length} of ${MAX_INVOICES} local slots used.`;
  const hasRemotePdf = Boolean(generatedViewerPath);
  const hasGeneratedPdf = Boolean(generatedPdfUrl || generatedViewerPath);
  const openPdfHref = generatedViewerPath ?? generatedPdfUrl;
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
        if (data.senderName) setField('senderName', data.senderName);
        if (data.businessLogo) setLogoPreview(data.businessLogo);
        setHasSavedBusiness(true);
        setBusinessEditable(false);
      }
    } catch {
      // ignore invalid localStorage data
    }

    // Load accent color preference
    try {
      const savedColor = localStorage.getItem(ACCENT_COLOR_KEY);
      if (savedColor) setAccentColor(savedColor);
    } catch {
      // ignore
    }

    // Load PDF template preference
    try {
      const savedTemplate = localStorage.getItem(PDF_TEMPLATE_KEY);
      if (savedTemplate) setPdfTemplateId(savedTemplate as PdfTemplateId);
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveBusinessInfo = useCallback(() => {
    const data: Record<string, string> = {
      businessName: invoice.businessName,
      businessEmail: invoice.businessEmail,
      businessPhone: invoice.businessPhone,
      businessAddress: invoice.businessAddress,
      senderName: invoice.senderName || '',
    };
    if (logoPreview && !logoPreview.startsWith('blob:')) {
      data.businessLogo = logoPreview;
    }
    localStorage.setItem(BUSINESS_STORAGE_KEY, JSON.stringify(data));
    setHasSavedBusiness(true);
    setBusinessEditable(false);
    toast.success('Business info saved for future invoices.');
  }, [invoice.businessName, invoice.businessEmail, invoice.businessPhone, invoice.businessAddress, invoice.senderName, logoPreview]);

  const handleAccentColorChange = useCallback((color: string) => {
    setAccentColor(color);
    try {
      localStorage.setItem(ACCENT_COLOR_KEY, color);
    } catch {
      // ignore
    }
  }, []);

  const handleTemplateChange = useCallback((id: PdfTemplateId) => {
    setPdfTemplateId(id);
    try {
      localStorage.setItem(PDF_TEMPLATE_KEY, id);
    } catch {
      // ignore
    }
    if (hasGeneratedPdf) {
      toast.info('Layout changed. Generate again to update the PDF.');
    }
  }, [hasGeneratedPdf]);

  const handleClearBusinessInfo = useCallback(() => {
    localStorage.removeItem(BUSINESS_STORAGE_KEY);
    setField('businessName', '');
    setField('businessEmail', '');
    setField('businessPhone', '');
    setField('businessAddress', '');
    setField('senderName', '');
    setLogoPreview(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
    setHasSavedBusiness(false);
    setBusinessEditable(true);
  }, [setField]);

  function handleLogoSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }

    if (file.size > 512 * 1024) {
      toast.error('Logo must be under 512KB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleLogoRemove() {
    setLogoPreview(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  }

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
      setGeneratedViewerPath(null);
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
        body: JSON.stringify({ ...invoice, businessLogo: logoPreview || undefined, accentColor, pdfTemplateId }),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorData?.error || 'Failed to generate PDF');
      }

      let resolvedPdfUrl: string | null = null;
      let resolvedViewerPath: string | null = null;
      let persistedPdfUrl: string | undefined;

      if (response.headers.get('Content-Type')?.includes('application/pdf')) {
        const blob = await response.blob();
        resolvedPdfUrl = URL.createObjectURL(blob);
      } else {
        const data = (await response.json()) as { viewerPath?: string };

        if (!data.viewerPath) {
          throw new Error('Viewer path was not returned by the server');
        }

        resolvedViewerPath = data.viewerPath;
        persistedPdfUrl = getSharedInvoicePdfPath(invoice.id);
      }

      if (generatedPdfUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(generatedPdfUrl);
      }

      setGeneratedPdfUrl(resolvedPdfUrl);
      setGeneratedViewerPath(resolvedViewerPath);
      setTimeout(() => {
        const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
        if (isDesktop) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          invoiceReadyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);

      if (persistedPdfUrl) {
        setPdfUrl(persistedPdfUrl);
      } else {
        setField('status', 'sent');
      }

      await saveInvoice({
        ...invoice,
        status: 'sent',
        pdfUrl: persistedPdfUrl,
        pdfTemplateId,
      });

      captureAnalyticsEvent('invoice_created', {
        source: 'create',
        currency: invoice.currency,
        line_item_count: invoice.lineItems.length,
        has_discount: invoice.discount > 0,
        has_tax: invoice.taxRate > 0,
        has_logo: Boolean(logoPreview),
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
    setGeneratedViewerPath(null);
    reset();
    setCurrency(currentCurrency);
    setErrors({});
  }

  function getInvoiceForSharing() {
    return {
      ...invoice,
      pdfUrl:
        invoice.pdfUrl ||
        (generatedViewerPath ? getSharedInvoicePdfPath(invoice.id) : generatedPdfUrl) ||
        undefined,
    };
  }

  async function handleShareWhatsApp() {
    const invoiceToShare = getInvoiceForSharing();

    if (!invoiceToShare.pdfUrl) {
      toast.error('Generate a PDF first before sharing.');
      return;
    }

    const result = await shareOnWhatsApp(invoiceToShare, { source: 'create' });

    if (result === 'shared') {
      toast.success('Invoice shared on WhatsApp.');
      return;
    }

    if (result === 'fallback') {
      toast.info('PDF downloaded. Attach it in the WhatsApp chat that opened.');
    }
  }

  async function handleDownloadPdf() {
    const success = await downloadPdf(getInvoiceForSharing(), { source: 'create' });

    if (!success) {
      toast.error('Generate a PDF first before downloading.');
      return;
    }

    toast.success('PDF downloaded.');
  }

  return (
    <div className="min-h-screen">
      <Header ctaHref="/" ctaLabel="Back Home" />

      <main className="app-shell py-6 pb-32 sm:py-8 sm:pb-36 lg:py-10 lg:pb-16">

        {/* Mobile: compact tool header */}
        <div className="surface-floating flex items-center justify-between rounded-[var(--radius-card)] border px-3 py-2.5 lg:hidden">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground flex size-9 items-center justify-center rounded-[var(--radius-button-sm)] transition-colors hover:bg-[var(--surface-hover)]"
              aria-label="Back to home"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <h1 className="text-foreground text-lg font-semibold tracking-tight">New Invoice</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-2.5 py-0.5 text-[11px] font-medium">
              {invoice.status === 'sent' ? 'Ready' : 'Draft'}
            </Badge>
            <span className="text-muted-foreground text-xs tabular-nums">
              {invoices.length}/{MAX_INVOICES}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {/* Pro waitlist banner */}
          <div className="hidden md:block">
            <ProWaitlistBanner source="create-top" variant="banner" />
          </div>

          {/* ── DESKTOP TWO-COLUMN LAYOUT ── */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-5">

          {/* ── INVOICE DOCUMENT CARD ── */}
          <div
            className={cn(
              'w-full min-w-0 rounded-[var(--radius-card)] border bg-card shadow-[var(--shadow-card)]',
              (errors.businessName || errors.clientName || errors.lineItems || errors.dueDate)
                ? 'ring-2 ring-destructive/20'
                : undefined
            )}
            style={{ '--invoice-accent': accentColor } as React.CSSProperties}
          >

            {/* ── SECTION 1: Invoice Header ── */}
            <div className="grid grid-cols-1 items-stretch gap-5 border-b border-border/60 p-5 sm:grid-cols-2 sm:p-6">

              {/* Left: Logo upload */}
              <div className="flex h-full flex-col gap-2">
                <label
                  htmlFor="business-logo-input"
                  className="group relative flex h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border/50 bg-muted/20 transition-all hover:border-primary/40 hover:bg-muted/30"
                >
                  {logoPreview ? (
                    <>
                      <Image
                        src={logoPreview}
                        alt="Business logo"
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-contain p-2"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <ImagePlus className="size-4 text-white" />
                        <span className="text-[10px] font-medium text-white">Change Logo</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5">
                      <ImagePlus className="size-5 text-muted-foreground/50 transition-colors group-hover:text-primary/60" />
                      <span className="text-[11px] font-medium text-muted-foreground/50 transition-colors group-hover:text-primary/60">
                        Add your logo
                      </span>
                      <span className="text-[10px] text-muted-foreground/35">PNG, JPG, SVG · max 512KB</span>
                    </div>
                  )}
                  <input
                    ref={logoInputRef}
                    id="business-logo-input"
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleLogoSelect}
                  />
                </label>
                {logoPreview && (
                  <button
                    type="button"
                    onClick={handleLogoRemove}
                    className="text-center text-[11px] text-muted-foreground underline-offset-2 transition-colors hover:text-destructive hover:underline"
                  >
                    Remove logo
                  </button>
                )}
              </div>

              {/* Right: Invoice number + dates + currency */}
              <div className="grid grid-cols-2 gap-3">
                <Field id="invoice-number-display" label="Invoice No.">
                  <div className="flex h-9 items-center rounded-[var(--radius-field)] border border-border/60 bg-muted/20 px-3 text-sm font-mono font-medium text-foreground/70">
                    #{invoice.id}
                  </div>
                </Field>

                <Field id="dueDate" label="Due Date" error={errors.dueDate}>
                  <Input
                    id="dueDate"
                    type="date"
                    min={today}
                    value={invoice.dueDate}
                    aria-invalid={Boolean(errors.dueDate)}
                    onChange={(event) => setField('dueDate', event.target.value)}
                    className="h-9"
                  />
                </Field>

                <Field id="currency" label="Currency">
                  <Select value={invoice.currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency" className="h-9 w-full">
                      <SelectValue placeholder="Currency" />
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

                <div className="flex items-end pb-0.5">
                  <p className="text-muted-foreground text-xs tabular-nums">{storageMessage}</p>
                </div>
              </div>
            </div>

            {/* ── SECTION 2: From / Bill To ── */}
            <div className="grid grid-cols-1 gap-0 border-b border-border/60 sm:grid-cols-2 sm:divide-x sm:divide-border/60">

              {/* FROM — Business Info */}
              <div
                className={cn(
                  'group relative border-b border-border/60 p-6 sm:border-b-0 sm:p-8',
                  errors.businessName ? 'bg-destructive/[0.03]' : undefined
                )}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: 'var(--invoice-accent)' }}>
                    From
                  </span>
                  <div className="flex items-center gap-1">
                    {!hasSavedBusiness && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleSaveBusinessInfo}
                        disabled={!invoice.businessName.trim()}
                        className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <Save className="size-3" />
                        Save
                      </Button>
                    )}
                    {hasSavedBusiness && !businessEditable && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setBusinessEditable(true)}
                        className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="size-3" />
                        Edit
                      </Button>
                    )}
                    {hasSavedBusiness && businessEditable && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleSaveBusinessInfo}
                        disabled={!invoice.businessName.trim()}
                        className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <Save className="size-3" />
                        Save
                      </Button>
                    )}
                    {hasSavedBusiness && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleClearBusinessInfo}
                        className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-destructive"
                      >
                        <X className="size-3" />
                        Clear
                      </Button>
                    )}
                  </div>
                </div>

                {/* Saved / read view */}
                {hasSavedBusiness && !businessEditable ? (
                  <div
                    className="cursor-pointer rounded-lg border border-dashed border-border/60 p-3 transition-colors hover:border-primary/30 hover:bg-muted/20"
                    onClick={() => setBusinessEditable(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setBusinessEditable(true)}
                    aria-label="Edit business info"
                  >
                    {invoice.businessName && (
                      <p className="text-sm font-semibold text-foreground">{invoice.businessName}</p>
                    )}
                    {invoice.businessAddress && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{invoice.businessAddress}</p>
                    )}
                    {invoice.businessEmail && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{invoice.businessEmail}</p>
                    )}
                    {invoice.businessPhone && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{invoice.businessPhone}</p>
                    )}
                    {invoice.senderName && (
                      <p className="mt-0.5 text-xs text-muted-foreground italic">
                        Issued by: {invoice.senderName}
                      </p>
                    )}
                    {!invoice.businessName && (
                      <p className="text-xs text-muted-foreground/50 italic">Click to add business info</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Field id="businessName" label="Business Name" required error={errors.businessName}>
                      <Input
                        id="businessName"
                        value={invoice.businessName}
                        placeholder="Studio North"
                        aria-invalid={Boolean(errors.businessName)}
                        onChange={(event) => setField('businessName', event.target.value)}
                        className="h-9"
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field id="businessEmail" label="Email">
                        <Input
                          id="businessEmail"
                          type="email"
                          value={invoice.businessEmail}
                          placeholder="hello@studio.com"
                          onChange={(event) => setField('businessEmail', event.target.value)}
                          className="h-9"
                        />
                      </Field>
                      <Field id="businessPhone" label="Phone">
                        <Input
                          id="businessPhone"
                          value={invoice.businessPhone}
                          placeholder="+1 555 0000"
                          onChange={(event) => setField('businessPhone', event.target.value)}
                          className="h-9"
                        />
                      </Field>
                    </div>
                    <Field id="businessAddress" label="Address">
                      <Input
                        id="businessAddress"
                        value={invoice.businessAddress}
                        placeholder="221B Market St, San Francisco"
                        onChange={(event) => setField('businessAddress', event.target.value)}
                        className="h-9"
                      />
                    </Field>
                    <Field id="senderName" label="Your Name">
                      <Input
                        id="senderName"
                        value={invoice.senderName || ''}
                        placeholder="John Smith (optional)"
                        onChange={(event) => setField('senderName', event.target.value)}
                        className="h-9"
                      />
                    </Field>
                  </div>
                )}
              </div>

              {/* BILL TO — Client Info */}
              <div
                className={cn(
                  'p-6 sm:p-8',
                  errors.clientName ? 'bg-destructive/[0.03]' : undefined
                )}
              >
                <div className="mb-3">
                  <span className="text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: 'var(--invoice-accent)' }}>
                    Bill To
                  </span>
                </div>

                <div className="space-y-3">
                  <Field id="clientName" label="Client Name" required error={errors.clientName}>
                    <Input
                      id="clientName"
                      value={invoice.clientName}
                      placeholder="Amina Yusuf"
                      aria-invalid={Boolean(errors.clientName)}
                      onChange={(event) => setField('clientName', event.target.value)}
                      className="h-9"
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field id="clientEmail" label="Email">
                      <Input
                        id="clientEmail"
                        type="email"
                        value={invoice.clientEmail}
                        placeholder="amina@yusuf.com"
                        onChange={(event) => setField('clientEmail', event.target.value)}
                        className="h-9"
                      />
                    </Field>
                    <Field id="clientPhone" label="Phone">
                      <Input
                        id="clientPhone"
                        value={invoice.clientPhone}
                        placeholder="+92 300 0000"
                        onChange={(event) => setField('clientPhone', event.target.value)}
                        className="h-9"
                      />
                    </Field>
                  </div>
                  <Field id="clientCompany" label="Company">
                    <Input
                      id="clientCompany"
                      value={invoice.clientCompany}
                      placeholder="Yusuf Media"
                      onChange={(event) => setField('clientCompany', event.target.value)}
                      className="h-9"
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* ── SECTION 3: Line Items ── */}
            <div
              className={cn(
                'border-b border-border/60',
                errors.lineItems ? 'bg-destructive/[0.03]' : undefined
              )}
            >
              {/* Table header — desktop */}
              <div className="hidden grid-cols-[minmax(0,1fr)_72px_120px_120px_40px] gap-3 border-b border-border/40 px-8 py-2.5 lg:grid" style={{ backgroundColor: `color-mix(in srgb, var(--invoice-accent) 8%, transparent)` }}>
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: 'var(--invoice-accent)' }}>Description</p>
                <p className="text-right text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: 'var(--invoice-accent)' }}>Qty</p>
                <p className="text-right text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: 'var(--invoice-accent)' }}>Rate</p>
                <p className="text-right text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: 'var(--invoice-accent)' }}>Amount</p>
                <span />
              </div>

              {/* Rows */}
              <div className="divide-y divide-border/40 px-6 sm:px-8 lg:px-0">
                {invoice.lineItems.map((item, index) => {
                  const rowInvalid =
                    Boolean(errors.lineItems) && (!item.description.trim() || item.rate <= 0);

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        'group py-3',
                        'lg:grid lg:grid-cols-[minmax(0,1fr)_72px_120px_120px_40px] lg:items-center lg:gap-3 lg:px-8 lg:py-2.5'
                      )}
                    >
                      {/* Mobile: amount top-right + delete */}
                      <div className="mb-2 flex items-center justify-between lg:hidden">
                        <p className="text-sm font-semibold tabular-nums text-foreground">
                          {formatCurrency(item.amount, invoice.currency)}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLineItem(index)}
                          disabled={invoice.lineItems.length === 1}
                          className="text-muted-foreground hover:text-destructive -mr-1 size-7"
                        >
                          <Trash2 className="size-3.5" />
                          <span className="sr-only">Remove line item</span>
                        </Button>
                      </div>

                      {/* Description */}
                      <div className="flex items-center gap-2 lg:contents">
                        <span className="shrink-0 text-[10px] font-semibold tracking-wider uppercase text-muted-foreground/60 lg:hidden">
                          Item
                        </span>
                        <Input
                          id={`line-item-description-${index}`}
                          value={item.description}
                          placeholder="Item or service description"
                          aria-label="Description"
                          aria-invalid={rowInvalid && !item.description.trim()}
                          onChange={(event) => setLineItem(index, 'description', event.target.value)}
                          className="h-10 min-w-0 flex-1 text-sm lg:h-9"
                        />
                      </div>

                      {/* Mobile: qty × rate row */}
                      <div className="mt-2 flex items-center gap-3 lg:contents">
                        <div className="flex items-center gap-2 lg:contents">
                          <span className="shrink-0 text-[10px] font-semibold tracking-wider uppercase text-muted-foreground/60 lg:hidden">
                            Qty
                          </span>
                          <Input
                            id={`line-item-quantity-${index}`}
                            type="number"
                            min={1}
                            value={item.quantity}
                            aria-label="Quantity"
                            onChange={(event) =>
                              setLineItem(index, 'quantity', getNumberValue(event.target.value))
                            }
                            onFocus={selectAll}
                            className="h-10 w-14 shrink-0 text-center tabular-nums lg:h-9 lg:w-full lg:text-right"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 items-center gap-2 lg:contents">
                          <span className="shrink-0 text-[10px] font-semibold tracking-wider uppercase text-muted-foreground/60 lg:hidden">
                            Rate
                          </span>
                          <Input
                            id={`line-item-rate-${index}`}
                            type="number"
                            min={0}
                            step="0.01"
                            value={item.rate}
                            placeholder="0.00"
                            aria-label="Rate"
                            aria-invalid={rowInvalid && item.rate <= 0}
                            onChange={(event) =>
                              setLineItem(index, 'rate', getNumberValue(event.target.value))
                            }
                            onFocus={selectAll}
                            className="h-10 min-w-0 flex-1 text-right tabular-nums lg:h-9 lg:w-full"
                          />
                        </div>
                      </div>

                      {/* Desktop: amount + delete */}
                      <p className="hidden h-9 items-center justify-end text-sm font-medium tabular-nums text-foreground lg:flex">
                        {formatCurrency(item.amount, invoice.currency)}
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLineItem(index)}
                        disabled={invoice.lineItems.length === 1}
                        className="text-muted-foreground hover:text-destructive hidden size-8 opacity-0 transition-opacity group-hover:opacity-100 lg:flex"
                      >
                        <Trash2 className="size-3.5" />
                        <span className="sr-only">Remove line item</span>
                      </Button>
                    </div>
                  );
                })}
              </div>

              {errors.lineItems && (
                <p className="text-destructive px-6 pb-2 text-xs sm:px-8">{errors.lineItems}</p>
              )}

              {/* Add line item — dashed full-width button */}
              <div className="px-6 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={addLineItem}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border/50 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/20 hover:text-primary/80"
                >
                  <Plus className="size-4" />
                  Add line item
                </button>
              </div>
            </div>

            {/* ── SECTION 4: Summary + Tax/Discount + Notes ── */}
            <div className="border-b border-border/60 p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                {/* Left: Tax, Discount, Notes */}
                <div className="flex-1 space-y-4 lg:max-w-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <Field id="taxRate" label="Tax Rate (%)">
                      <Input
                        id="taxRate"
                        type="number"
                        min={0}
                        step="0.01"
                        value={invoice.taxRate}
                        onFocus={selectAll}
                        onChange={(event) => setField('taxRate', getNumberValue(event.target.value))}
                        className="h-9"
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
                        onFocus={selectAll}
                        onChange={(event) => setField('discount', getNumberValue(event.target.value))}
                        className="h-9"
                      />
                    </Field>
                  </div>

                  <Field id="notes" label="Notes">
                    <Textarea
                      id="notes"
                      value={invoice.notes}
                      placeholder="Payment terms, thank-you notes, or any other details…"
                      onChange={(event) => setField('notes', event.target.value)}
                      className="min-h-[80px] resize-none text-sm"
                    />
                  </Field>
                </div>

                {/* Right: Invoice summary block */}
                <div className="w-full rounded-xl border border-border/60 bg-muted/20 p-5 lg:w-[260px] lg:shrink-0">
                  <p className="mb-3 text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: 'var(--invoice-accent)' }}>
                    Summary
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm tabular-nums">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm tabular-nums">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium text-foreground">{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
                    </div>
                    {invoice.discount > 0 && (
                      <div className="flex items-center justify-between text-sm tabular-nums">
                        <span className="text-muted-foreground">Discount ({invoice.discount}%)</span>
                        <span className="font-medium text-foreground">-{formatCurrency(invoice.discountAmount, invoice.currency)}</span>
                      </div>
                    )}
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between tabular-nums">
                    <span className="text-sm font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold tracking-tight" style={{ color: 'var(--invoice-accent)' }}>
                      {formatCurrency(invoice.total, invoice.currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Mobile Design (Color + Template) ── */}
            <div className="pt-2 pb-1 px-5 sm:px-6 lg:hidden">
              <SidebarDesign
                accentColor={accentColor}
                onAccentColorChange={handleAccentColorChange}
                pdfTemplateId={pdfTemplateId}
                onTemplateChange={handleTemplateChange}
                collapsible
              />
            </div>

            {/* ── SECTION 5: Primary Actions ── */}
            <div className="flex flex-col items-center gap-3 px-5 pb-6 pt-2 sm:flex-row sm:justify-end sm:gap-2.5 sm:px-6">
              <Button
                type="button"
                variant="outline"
                disabled={actionDisabled}
                onClick={handleSaveInvoice}
                className="w-full gap-2 sm:w-auto"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save Draft
                  </>
                )}
              </Button>
              <Button
                type="button"
                disabled={actionDisabled}
                onClick={handleGenerateInvoice}
                className="w-full gap-2 sm:w-auto"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    {hasGeneratedPdf ? 'Regenerate Invoice' : 'Generate Invoice'}
                  </>
                )}
              </Button>
            </div>
          </div>
          {/* ── END INVOICE DOCUMENT CARD ── */}

          {/* ── RIGHT SIDEBAR (desktop only) ── */}
          <div className="hidden lg:block lg:w-72 lg:shrink-0">
            <div className="sticky top-6 space-y-[7px]">
              <div
                className={cn(
                  'rounded-(--radius-card) border bg-card p-4 shadow-(--shadow-card) transition-all',
                  generatedPdfUrl
                    ? 'border-emerald-200 bg-[linear-gradient(180deg,rgba(236,253,245,0.88),rgba(255,255,255,0.94))] shadow-[0_24px_70px_-44px_rgba(16,185,129,0.34)] dark:bg-[linear-gradient(180deg,rgba(6,78,59,0.18),rgba(20,24,32,0.92))]'
                    : undefined
                )}
              >
                {/* Header */}
                <div className="mb-4 flex items-center gap-2">
                  {hasGeneratedPdf ? (
                    <CheckCircle2 className="size-4 text-emerald-600" />
                  ) : (
                    <div className="size-4 rounded-full border-2 border-border/50" />
                  )}
                  <p className="text-sm font-semibold text-foreground">
                    {hasGeneratedPdf ? 'Invoice Ready' : 'Share & Export'}
                  </p>
                </div>

                {hasGeneratedPdf && (
                  <p className="mb-4 text-xs text-muted-foreground">
                    Ready for {invoice.clientName || 'your client'}.
                  </p>
                )}

                <div className="space-y-2">
                  {/* WhatsApp */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start gap-2 font-medium text-[#075E54] disabled:opacity-40"
                    disabled={!hasGeneratedPdf}
                    onClick={handleShareWhatsApp}
                  >
                    <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true">
                      <path
                        fill="#25D366"
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                      />
                    </svg>
                    Send on WhatsApp
                  </Button>

                  {/* Download */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start gap-2 disabled:opacity-40"
                    disabled={!hasGeneratedPdf}
                    onClick={handleDownloadPdf}
                  >
                    <Download className="size-4 shrink-0" />
                    Download PDF
                  </Button>

                  {/* Open PDF */}
                  {openPdfHref ? (
                    <Button size="sm" variant="outline" className="w-full justify-start gap-2" asChild>
                      <a href={openPdfHref} target="_blank" rel="noreferrer">
                        <Eye className="size-4 shrink-0" />
                        Open PDF
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full justify-start gap-2 disabled:opacity-40" disabled>
                      <Eye className="size-4 shrink-0" />
                      Open PDF
                    </Button>
                  )}

                  {/* Copy link */}
                  {hasRemotePdf && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}${generatedViewerPath}`);
                        toast.success('Link copied to clipboard.');
                      }}
                    >
                      <Copy className="size-4 shrink-0" />
                      Copy Link
                    </Button>
                  )}
                </div>

                {/* Hint when not yet generated */}
                {!hasGeneratedPdf && (
                  <p className="mt-4 text-center text-[11px] text-muted-foreground/60">
                    Generate the invoice to unlock sharing options.
                  </p>
                )}

                {/* Create another */}
                {hasGeneratedPdf && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 w-full text-muted-foreground"
                    onClick={handleCreateAnotherInvoice}
                  >
                    Create Another Invoice
                  </Button>
                )}
              </div>

              {/* ── Design (Color + Template) ── */}
              <SidebarDesign
                accentColor={accentColor}
                onAccentColorChange={handleAccentColorChange}
                pdfTemplateId={pdfTemplateId}
                onTemplateChange={handleTemplateChange}
              />

            </div>
          </div>
          {/* ── END RIGHT SIDEBAR ── */}

          </div>
          {/* ── END DESKTOP TWO-COLUMN LAYOUT ── */}

          {/* Invoice Ready card — mobile only, shown after PDF generated */}
          {hasGeneratedPdf ? (
            <Card
              ref={invoiceReadyRef}
              className="border border-emerald-200 bg-[linear-gradient(180deg,rgba(236,253,245,0.88),rgba(255,255,255,0.94))] shadow-[0_24px_70px_-44px_rgba(16,185,129,0.34)] dark:bg-[linear-gradient(180deg,rgba(6,78,59,0.18),rgba(20,24,32,0.92))] lg:hidden"
            >
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
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full font-semibold text-[#075E54]"
                  onClick={handleShareWhatsApp}
                >
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                    <path
                      fill="#25D366"
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    />
                  </svg>
                  Send on WhatsApp
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={handleDownloadPdf}>
                    <Download className="size-4" />
                    Download
                  </Button>
                  <Button asChild variant="outline" disabled={!openPdfHref}>
                    <a href={openPdfHref ?? '#'} target="_blank" rel="noreferrer">
                      <Eye className="size-4" />
                      Open PDF
                    </a>
                  </Button>
                </div>

                {hasRemotePdf && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}${generatedViewerPath}`);
                      toast.success('Link copied to clipboard.');
                    }}
                  >
                    <Copy className="size-4" />
                    Copy Link
                  </Button>
                )}

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
      </main>

      {/* Mobile sticky bottom bar */}
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 px-4 py-3 lg:hidden">
        <div className="app-shell px-0">
          <div className="surface-floating flex items-center gap-2 rounded-(--radius-shell) border px-2 py-2">
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
