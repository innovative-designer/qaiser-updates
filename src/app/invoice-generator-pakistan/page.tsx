import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Smartphone } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
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
    <div className="min-h-screen">
      <Header />
      <main className="py-8 sm:py-10 lg:py-12">
        <PageSection width="wide" spacing="compact">
          <PageHero gridClassName="lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <Badge>Pakistan Freelancers</Badge>
              <div className="space-y-4">
                <h1 className="text-foreground max-w-3xl">
                  Make polished PKR invoices on your phone without spreadsheets or signup screens.
                </h1>
                <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg">
                  Build a client-ready invoice, generate the PDF, and send it in seconds. Free
                  Invoice Kit keeps the workflow lean for freelancers and small businesses in
                  Pakistan.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/create">
                    Start Creating Invoice
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/send-invoice-whatsapp">See the WhatsApp workflow</Link>
                </Button>
              </div>
            </div>

            <InfoPanel tone="quiet">
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Built for the real workflow
              </p>
              <div className="text-muted-foreground mt-5 space-y-4 text-sm leading-7">
                <p>Freelancers often share invoices from chat, not from a finance dashboard.</p>
                <p>
                  PKR support is already included, so you do not need to fight the currency setup.
                </p>
                <p>Your invoice can look finished before your client asks where to send payment.</p>
              </div>
            </InfoPanel>
          </PageHero>
        </PageSection>

        <PageSection width="wide" spacing="compact">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="py-0">
              <CardHeader className="px-5 py-5">
                <FileText className="text-primary size-6" />
                <CardTitle className="mt-4 text-lg font-semibold">Professional PDFs</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground px-5 pb-5 text-sm leading-6">
                Clean totals, line items, due date, and notes in a format that feels client-ready.
              </CardContent>
            </Card>
            <Card className="py-0">
              <CardHeader className="px-5 py-5">
                <Smartphone className="text-primary size-6" />
                <CardTitle className="mt-4 text-lg font-semibold">Mobile friendly</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground px-5 pb-5 text-sm leading-6">
                Designed for people invoicing between calls, rides, and client chats from their
                phones.
              </CardContent>
            </Card>
            <Card className="py-0">
              <CardHeader className="px-5 py-5">
                <CheckCircle2 className="text-primary size-6" />
                <CardTitle className="mt-4 text-lg font-semibold">Simple workflow</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground px-5 pb-5 text-sm leading-6">
                Fill, review, generate, send. No billing suite overhead and no account wall.
              </CardContent>
            </Card>
          </div>
        </PageSection>

        <PageSection width="wide" spacing="compact">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <InfoPanel>
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Why Pakistan users use it
              </p>
              <p className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em]">
                Quick invoice output without adopting a full bookkeeping tool.
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                If the goal is to send the invoice, get the PDF, and keep moving, this workflow is
                intentionally lighter than a traditional accounting platform.
              </p>
            </InfoPanel>
            <InfoPanel tone="accent">
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Start now
              </p>
              <p className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em]">
                Create a PKR invoice in under a minute.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/create">
                  Open Invoice Builder
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </InfoPanel>
          </div>
        </PageSection>

        <PageSection width="wide" spacing="compact">
          <div>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
              FAQ
            </p>
            <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Common questions from Pakistan-based users
            </h2>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <InfoPanel key={faq.question} className="p-5">
                <h3 className="text-foreground text-lg font-semibold">{faq.question}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-7">{faq.answer}</p>
              </InfoPanel>
            ))}
          </div>
        </PageSection>
      </main>
      <Footer />
    </div>
  );
}
