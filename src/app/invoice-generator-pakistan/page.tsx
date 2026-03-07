import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Smartphone } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Invoice Generator Pakistan | Free PKR Invoice Maker',
  description:
    'Make professional PKR invoices online for free. QuickBill helps Pakistani freelancers and small businesses create and share invoice PDFs in seconds.',
  alternates: {
    canonical: 'https://quickbill.app/invoice-generator-pakistan',
  },
};

const faqs = [
  {
    question: 'Is this invoice generator free?',
    answer:
      'Yes. QuickBill core invoicing is free: create invoice, generate PDF, and share through WhatsApp or email.',
  },
  {
    question: 'Can I use PKR currency?',
    answer:
      'Yes. PKR is supported out of the box, and totals are automatically formatted for invoice output.',
  },
  {
    question: 'Do I need an account?',
    answer: 'No account is needed. Open the app and start creating an invoice immediately.',
  },
];

export default function InvoiceGeneratorPakistanPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="text-center">
          <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">
            Pakistan Freelancers
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Free Invoice Generator for Pakistan
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base leading-7">
            Create client-ready PKR invoices without spreadsheets or templates. Generate PDF, share
            on WhatsApp, and keep a local record in your browser.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <Link href="/create">
                Start Creating Invoice
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <FileText className="text-primary size-6" />
              <CardTitle className="text-lg">Professional PDFs</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Clean layout with invoice totals, due date, line items, and notes ready to send.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Smartphone className="text-primary size-6" />
              <CardTitle className="text-lg">Mobile Friendly</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Works great on mobile for freelancers who handle billing directly from phone.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CheckCircle2 className="text-primary size-6" />
              <CardTitle className="text-lg">Simple Workflow</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Fill details once, preview live, then download or share with one click.
            </CardContent>
          </Card>
        </section>

        <section className="mt-14 space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border p-4">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">{faq.answer}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
