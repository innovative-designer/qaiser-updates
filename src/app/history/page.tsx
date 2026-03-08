'use client';

import { useLocalInvoices } from '@/hooks/use-local-invoices';
import { formatCurrency } from '@/lib/currencies';
import { downloadPdf, shareOnWhatsApp, shareViaEmail } from '@/lib/share';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Mail, MessageCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function HistoryPage() {
  const { invoices, loading, deleteInvoice } = useLocalInvoices();

  if (loading) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <p className="text-muted-foreground text-center">Loading invoices…</p>
      </main>
    );
  }

  if (invoices.length === 0) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold">Invoice History</h1>
        <p className="text-muted-foreground mb-6">No invoices yet.</p>
        <Button asChild>
          <Link href="/create">Create your first invoice</Link>
        </Button>
      </main>
    );
  }

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
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Invoice History</h1>
        <Button asChild size="sm">
          <Link href="/create">New Invoice</Link>
        </Button>
      </div>

      {/* Mobile card view */}
      <div className="space-y-4 md:hidden">
        {invoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">
                  {invoice.clientName || 'Unknown Client'}
                </CardTitle>
                <Badge variant={invoice.status === 'sent' ? 'default' : 'secondary'}>
                  {invoice.status}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                {invoice.businessName || '—'} ·{' '}
                {new Date(invoice.createdAt).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-lg font-semibold">
                {formatCurrency(invoice.total, invoice.currency)}
              </p>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" title="Share on WhatsApp" onClick={() => handleWhatsApp(invoice)}>
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" title="Share via Email" onClick={() => handleEmail(invoice)}>
                  <Mail className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" title="Download PDF" onClick={() => handleDownload(invoice)}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  title="Delete"
                  className="text-destructive ml-auto"
                  onClick={() => handleDelete(invoice.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  {invoice.clientName || '—'}
                </TableCell>
                <TableCell>{invoice.businessName || '—'}</TableCell>
                <TableCell>
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{formatCurrency(invoice.total, invoice.currency)}</TableCell>
                <TableCell>
                  <Badge variant={invoice.status === 'sent' ? 'default' : 'secondary'}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Share on WhatsApp"
                      onClick={() => handleWhatsApp(invoice)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Share via Email"
                      onClick={() => handleEmail(invoice)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Download PDF"
                      onClick={() => handleDownload(invoice)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Delete"
                      className="text-destructive"
                      onClick={() => handleDelete(invoice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
