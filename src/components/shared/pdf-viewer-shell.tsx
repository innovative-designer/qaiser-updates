'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FileText, Home, Zap } from 'lucide-react';

import { PdfViewerActions } from '@/components/shared/pdf-viewer-actions';
import { PdfViewerFrame } from '@/components/shared/pdf-viewer-frame';
import { captureAnalyticsEvent } from '@/lib/analytics/posthog';
import { APP_NAME } from '@/lib/constants';

interface PdfViewerShellProps {
  invoiceId: string;
  pdfInlinePath?: string;
  pdfDownloadPath?: string;
  errorMessage?: string;
}

export function PdfViewerShell({
  invoiceId,
  pdfInlinePath,
  pdfDownloadPath,
  errorMessage,
}: PdfViewerShellProps) {
  useEffect(() => {
    if (errorMessage) {
      return;
    }

    captureAnalyticsEvent('shared_invoice_viewed', {
      invoice_id: invoiceId,
    });
  }, [errorMessage, invoiceId]);

  return (
    <div className="min-h-screen">
      <header className="border-border/60 surface-floating sticky top-0 z-40 border-b">
        <div className="app-shell flex items-center justify-between gap-3 py-3">
          <Link
            href="/"
            className="text-foreground hover:text-primary inline-flex min-w-0 items-center gap-3 transition-colors"
          >
            <span className="bg-primary/12 text-primary ring-primary/12 flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-card)] ring-1">
              <Zap className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-[var(--tracking-heading)] sm:text-[1.02rem]">
                {APP_NAME}
              </span>
              <span className="text-muted-foreground hidden text-[0.7rem] font-semibold tracking-[0.18em] uppercase sm:block">
                PDF Viewer
              </span>
            </span>
          </Link>
          <PdfViewerActions invoiceId={invoiceId} pdfDownloadPath={pdfDownloadPath} />
        </div>
      </header>

      <main className="app-shell py-4 sm:py-6">
        <section className="surface-card overflow-hidden rounded-[var(--radius-shell)] border">
          <div className="border-border/60 surface-quiet flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <p className="text-muted-foreground text-[0.72rem] font-semibold tracking-[0.2em] uppercase">
                Shared Invoice
              </p>
              <div className="mt-1 flex items-center gap-2">
                <FileText className="text-primary size-4 shrink-0" />
                <p className="text-foreground truncate text-sm font-semibold tabular-nums sm:text-base">
                  {invoiceId}
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground hidden items-center gap-2 text-sm font-medium transition-colors sm:inline-flex"
            >
              <Home className="size-4" />
              Home
            </Link>
          </div>

          <div className="bg-muted/20 p-2 sm:p-3">
            {errorMessage ? (
              <div className="bg-background flex min-h-[28rem] flex-col items-center justify-center rounded-[calc(var(--radius-card)-4px)] border px-6 py-10 text-center">
                <p className="text-foreground text-lg font-semibold tracking-tight">
                  Invoice unavailable
                </p>
                <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">
                  {errorMessage}
                </p>
                <Link
                  href="/"
                  className="text-primary mt-5 text-sm font-medium transition-colors hover:opacity-80"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <PdfViewerFrame src={pdfInlinePath!} title="Invoice PDF Viewer" />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
