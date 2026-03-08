'use client';

import Link from 'next/link';
import { Download, Mail, MessageCircle, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalInvoices } from '@/hooks/use-local-invoices';
import { formatCurrency } from '@/lib/currencies';
import { downloadPdf, shareOnWhatsApp, shareViaEmail } from '@/lib/share';

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
    const ok = await downloadPdf(invoice);
    if (!ok) toast.error('No PDF available for this invoice');
  }

  async function handleWhatsApp(invoice: (typeof invoices)[number]) {
    await shareOnWhatsApp(invoice);
  }

  async function handleEmail(invoice: (typeof invoices)[number]) {
    await shareViaEmail(invoice);
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="app-shell py-8 sm:py-10 lg:py-12">
        <section className="editorial-shell overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="space-y-4">
              <p className="section-kicker">History</p>
              <div>
                <h1 data-display="true" className="text-4xl font-semibold text-foreground sm:text-5xl">
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
        </section>

        {loading ? (
          <section className="py-14">
            <div className="editorial-panel p-8 text-center text-muted-foreground">
              Loading invoices…
            </div>
          </section>
        ) : null}

        {!loading && invoices.length === 0 ? (
          <section className="py-14">
            <div className="editorial-panel p-8 text-center sm:p-12">
              <p className="section-kicker">No saved drafts yet</p>
              <h2 data-display="true" className="mt-3 text-3xl font-semibold text-foreground">
                Your invoice history will appear here.
              </h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-lg text-sm leading-7 sm:text-base">
                Create the first invoice, generate the PDF, and QuickBill will keep a local record
                so you can resend it later.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/create">Create your first invoice</Link>
              </Button>
            </div>
          </section>
        ) : null}

        {!loading && invoices.length > 0 ? (
          <section className="py-8 sm:py-10">
            <div className="grid gap-4 lg:grid-cols-2">
              {invoices.map((invoice) => (
                <Card key={invoice.id} className="bg-white/88">
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
                      <Badge
                        variant={invoice.status === 'sent' ? 'default' : 'outline'}
                        className="rounded-full px-3 py-1 capitalize"
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="rounded-[1.25rem] bg-muted/70 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-muted-foreground text-sm">Invoice total</span>
                        <span className="text-primary text-xl font-semibold tracking-tight">
                          {formatCurrency(invoice.total, invoice.currency)}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full bg-white/80 px-3 py-1">{invoice.currency}</span>
                        <span className="rounded-full bg-white/80 px-3 py-1">
                          {invoice.lineItems.length} line item
                          {invoice.lineItems.length === 1 ? '' : 's'}
                        </span>
                        <span className="rounded-full bg-white/80 px-3 py-1">
                          ID {invoice.id}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => handleWhatsApp(invoice)}
                      >
                        <MessageCircle className="size-4" />
                        WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => handleEmail(invoice)}
                      >
                        <Mail className="size-4" />
                        Email
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => handleDownload(invoice)}
                      >
                        <Download className="size-4" />
                        PDF
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start text-destructive hover:text-destructive"
                        onClick={() => handleDelete(invoice.id)}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
