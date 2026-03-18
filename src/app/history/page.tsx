'use client';

import Link from 'next/link';
import { Copy, Download, Eye, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalInvoices } from '@/hooks/use-local-invoices';
import { captureAnalyticsEvent } from '@/lib/analytics/posthog';
import { formatCurrency } from '@/lib/currencies';
import { downloadPdf, getShareableInvoicePaths, shareOnWhatsApp } from '@/lib/share';

function formatInvoiceDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function HistoryPage() {
  const { invoices, loading, deleteInvoice } = useLocalInvoices();

  async function handleDelete(id: string) {
    await deleteInvoice(id);
    toast.success('Invoice deleted');
  }

  async function handleDownload(invoice: (typeof invoices)[number]) {
    const ok = await downloadPdf(invoice, { source: 'history' });
    if (!ok) toast.error('No PDF available for this invoice');
  }

  async function handleWhatsApp(invoice: (typeof invoices)[number]) {
    await shareOnWhatsApp(invoice, { source: 'history' });
  }

  function getViewerPath(invoice: (typeof invoices)[number]) {
    return getShareableInvoicePaths(invoice)?.viewerPath ?? null;
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-8 sm:py-10 lg:py-12">
        <PageSection spacing="compact">
          <PageHero withGrid={false}>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="space-y-4">
                <p className="section-kicker">History</p>
                <div>
                  <h1 data-display="true" className="text-foreground">
                    Saved invoices, ready to resend.
                  </h1>
                  <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-7 sm:text-base">
                    Reopen the invoices you already generated, then share, download, or clean up old
                    drafts from one touch-friendly history view.
                  </p>
                </div>
              </div>

              <Button asChild size="lg">
                <Link href="/create">
                  <Plus className="size-4" />
                  New Invoice
                </Link>
              </Button>
            </div>
          </PageHero>
        </PageSection>

        {loading ? (
          <PageSection>
            <InfoPanel className="text-muted-foreground text-center">Loading invoices…</InfoPanel>
          </PageSection>
        ) : null}

        {!loading && invoices.length === 0 ? (
          <PageSection>
            <InfoPanel className="text-center sm:p-12">
              <p className="section-kicker">No saved drafts yet</p>
              <h2 data-display="true" className="text-foreground mt-3">
                Your invoice history will appear here.
              </h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-lg text-sm leading-7 sm:text-base">
                Create the first invoice, generate the PDF, and Free Invoice Kit will keep a local
                record so you can resend it later.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/create">Create your first invoice</Link>
              </Button>
            </InfoPanel>
          </PageSection>
        ) : null}

        {!loading && invoices.length > 0 ? (
          <PageSection spacing="compact">
            <div className="grid gap-4 lg:grid-cols-2">
              {invoices.map((invoice) => (
                <Card key={invoice.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-muted-foreground text-[0.72rem] tracking-[0.22em] uppercase">
                          {formatInvoiceDate(invoice.createdAt)}
                        </p>
                        <CardTitle className="mt-2 text-xl">
                          {invoice.clientName || 'Unknown client'}
                        </CardTitle>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {invoice.businessName || 'No business name saved'}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                        onClick={() => handleDelete(invoice.id)}
                        aria-label="Delete invoice"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <InfoPanel tone="quiet" className="p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-muted-foreground text-sm">Invoice total</span>
                        <span className="text-primary text-xl font-semibold tracking-tight tabular-nums">
                          {formatCurrency(invoice.total, invoice.currency)}
                        </span>
                      </div>
                      <div className="text-muted-foreground mt-3 flex flex-wrap gap-2 text-xs">
                        <Badge variant="outline" className="bg-background/75">
                          {invoice.currency}
                        </Badge>
                        <Badge variant="outline" className="bg-background/75">
                          {invoice.lineItems.length} line item
                          {invoice.lineItems.length === 1 ? '' : 's'}
                        </Badge>
                        <Badge variant="outline" className="bg-background/75">
                          ID {invoice.id}
                        </Badge>
                      </div>
                    </InfoPanel>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="font-semibold text-[#075E54]"
                        onClick={() => handleWhatsApp(invoice)}
                      >
                        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                          <path
                            fill="#25D366"
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                          />
                        </svg>
                        WhatsApp
                      </Button>
                      <Button variant="outline" onClick={() => handleDownload(invoice)}>
                        <Download className="size-4" />
                        Download
                      </Button>
                      <Button asChild variant="outline">
                        <a href={getViewerPath(invoice) ?? '#'} target="_blank" rel="noreferrer">
                          <Eye className="size-4" />
                          Open PDF
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        disabled={!invoice.pdfUrl || invoice.pdfUrl.startsWith('blob:')}
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}${getViewerPath(invoice)}`);
                          captureAnalyticsEvent('share_clicked', {
                            source: 'history',
                            channel: 'copy_link',
                          });
                          toast.success('Link copied to clipboard.');
                        }}
                      >
                        <Copy className="size-4" />
                        Copy Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </PageSection>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
