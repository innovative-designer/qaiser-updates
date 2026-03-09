import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Smartphone } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Invoice Generator Pakistan | Free PKR Invoice Maker',
  description:
    'Make professional PKR invoices online for free. Free Invoice Kit helps Pakistani freelancers and small businesses create and share invoice PDFs in seconds.',
  alternates: {
    canonical: 'https://www.freeinvoicekit.com/invoice-generator-pakistan',
  },
};

const faqs = [
  {
    question: 'Is this invoice generator free?',
    answer:
      'Yes. Free Invoice Kit core invoicing is free: create invoice, generate PDF, and share through WhatsApp or email.',
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
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(249,247,242,1)_0%,rgba(255,255,255,1)_42%,rgba(241,247,245,1)_100%)]">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(247,243,234,0.93))] p-6 shadow-[0_30px_80px_-50px_rgba(28,33,55,0.38)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="rounded-full bg-primary/10 px-3 py-1 text-[11px] tracking-[0.24em] uppercase text-primary hover:bg-primary/10">
                Pakistan Freelancers
              </Badge>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                  Make polished PKR invoices on your phone without spreadsheets or signup screens.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Build a client-ready invoice, generate the PDF, and send it in seconds. Free Invoice Kit
                  keeps the workflow lean for freelancers and small businesses in Pakistan.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full px-6">
                  <Link href="/create">
                    Start Creating Invoice
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-6">
                  <Link href="/send-invoice-whatsapp">See the WhatsApp workflow</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-black/10 bg-white/80 p-5 sm:p-6">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                Built for the real workflow
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>Freelancers often share invoices from chat, not from a finance dashboard.</p>
                <p>PKR support is already included, so you do not need to fight the currency setup.</p>
                <p>Your invoice can look finished before your client asks where to send payment.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="rounded-[1.5rem] border border-black/10 bg-white/90 py-0">
            <CardHeader className="px-5 py-5">
              <FileText className="size-6 text-primary" />
              <CardTitle className="mt-4 text-lg font-semibold">Professional PDFs</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm leading-6 text-muted-foreground">
              Clean totals, line items, due date, and notes in a format that feels client-ready.
            </CardContent>
          </Card>
          <Card className="rounded-[1.5rem] border border-black/10 bg-white/90 py-0">
            <CardHeader className="px-5 py-5">
              <Smartphone className="size-6 text-primary" />
              <CardTitle className="mt-4 text-lg font-semibold">Mobile friendly</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm leading-6 text-muted-foreground">
              Designed for people invoicing between calls, rides, and client chats from their phones.
            </CardContent>
          </Card>
          <Card className="rounded-[1.5rem] border border-black/10 bg-white/90 py-0">
            <CardHeader className="px-5 py-5">
              <CheckCircle2 className="size-6 text-primary" />
              <CardTitle className="mt-4 text-lg font-semibold">Simple workflow</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm leading-6 text-muted-foreground">
              Fill, preview, generate, send. No billing suite overhead and no account wall.
            </CardContent>
          </Card>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.75rem] border border-black/10 bg-white/90 p-6">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              Why Pakistan users use it
            </p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
              Quick invoice output without adopting a full bookkeeping tool.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              If the goal is to send the invoice, get the PDF, and keep moving, this workflow is
              intentionally lighter than a traditional accounting platform.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-6">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              Start now
            </p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
              Create a PKR invoice in under a minute.
            </p>
            <Button asChild size="lg" className="mt-6 h-12 rounded-full px-6">
              <Link href="/create">
                Open Invoice Builder
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              FAQ
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
              Common questions from Pakistan-based users
            </h2>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[1.5rem] border border-black/10 bg-white/90 p-5">
                <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
