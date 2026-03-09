'use client';

import { Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/currencies';
import { APP_NAME, APP_TAGLINE, APP_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { InvoiceData } from '@/types/invoice';

interface InvoicePreviewProps {
  invoice: InvoiceData;
  className?: string;
}

function formatDate(value: string) {
  if (!value) {
    return 'Not set';
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

export function InvoicePreview({ invoice, className }: InvoicePreviewProps) {
  const businessLines = [
    invoice.businessEmail,
    invoice.businessPhone,
    invoice.businessAddress,
  ].filter(Boolean);

  const clientLines = [invoice.clientCompany, invoice.clientEmail, invoice.clientPhone].filter(
    Boolean
  );

  return (
    <div
      className={cn(
        'rounded-[1.65rem] border border-white/80 bg-white/92 p-6 shadow-[0_20px_60px_-45px_rgba(26,38,64,0.35)] dark:border-white/10 dark:bg-card/94 dark:shadow-[0_20px_60px_-45px_rgba(0,0,0,0.75)] lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto',
        className
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="border-border flex flex-col gap-6 border-b border-dashed pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <p className="text-foreground text-lg font-semibold tracking-tight">
              {invoice.businessName || 'Your Business'}
            </p>
            <div className="text-muted-foreground space-y-1 text-xs leading-5">
              {businessLines.length > 0 ? (
                businessLines.map((line, i) => <p key={i}>{line}</p>)
              ) : (
                <p>Add your business details to personalize this invoice.</p>
              )}
            </div>
          </div>

          <div className="space-y-2 sm:text-right">
            <p className="text-primary text-xl font-semibold tracking-tight uppercase">Invoice</p>
            <div className="text-muted-foreground space-y-1 text-xs" suppressHydrationWarning>
              <p suppressHydrationWarning>Invoice ID: {invoice.id || 'Draft'}</p>
              <p suppressHydrationWarning>Issued: {formatDate(invoice.createdAt)}</p>
            </div>
            <Badge variant="outline" className="mt-1 rounded-full bg-background/80">
              Due {formatDate(invoice.dueDate)}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
          <div className="space-y-1.5">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
              Bill To
            </p>
            <p className="text-foreground font-medium">{invoice.clientName || 'Client name'}</p>
            <div className="text-muted-foreground space-y-1 text-xs leading-5">
              {clientLines.length > 0 ? (
                clientLines.map((line, i) => <p key={i}>{line}</p>)
              ) : (
                <p>Add client details to complete the invoice.</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5 text-left sm:text-right">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
              Status
            </p>
            <Badge variant="secondary" className="rounded-full capitalize">
              {invoice.status}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div className="overflow-x-auto">
            <div className="min-w-[420px] space-y-2">
              <div className="border-border text-muted-foreground grid grid-cols-[1fr_64px_96px_110px] gap-3 border-b border-dashed pb-2 text-[11px] font-semibold tracking-[0.18em] uppercase">
                <p>Description</p>
                <p className="text-right">Qty</p>
                <p className="text-right">Rate</p>
                <p className="text-right">Amount</p>
              </div>

              {invoice.lineItems.map((item) => (
                <div
                  key={item.id}
                  className="border-border grid grid-cols-[1fr_64px_96px_110px] gap-3 border-b border-dashed py-2 text-sm last:border-b-0"
                >
                  <div>
                    <p className="text-foreground font-medium">
                      {item.description || 'Untitled item'}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-right">{item.quantity}</p>
                  <p className="text-muted-foreground text-right">
                    {formatCurrency(item.rate, invoice.currency)}
                  </p>
                  <p className="text-foreground text-right font-medium">
                    {formatCurrency(item.amount, invoice.currency)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ml-auto w-full max-w-56 space-y-2 rounded-[1.35rem] bg-muted/45 p-4 text-sm">
          <div className="text-muted-foreground flex items-center justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
          </div>

          {invoice.taxRate > 0 ? (
            <div className="text-muted-foreground flex items-center justify-between">
              <span>Tax ({invoice.taxRate}%)</span>
              <span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
            </div>
          ) : null}

          {invoice.discount > 0 ? (
            <div className="text-muted-foreground flex items-center justify-between">
              <span>Discount ({invoice.discount}%)</span>
              <span>-{formatCurrency(invoice.discountAmount, invoice.currency)}</span>
            </div>
          ) : null}

          <Separator />

          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(invoice.total, invoice.currency)}</span>
          </div>
        </div>

        {invoice.notes ? (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
                Notes
              </p>
              <p className="text-muted-foreground text-sm leading-6">{invoice.notes}</p>
            </div>
          </>
        ) : null}

        <div className="border-border text-muted-foreground/70 flex items-center gap-2 border-t border-dashed pt-4 text-[11px] tracking-wide">
          <Zap className="text-primary size-3" />
          <span>
            Created with {APP_NAME} • {APP_TAGLINE} • {APP_URL.replace(/^https?:\/\//, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
