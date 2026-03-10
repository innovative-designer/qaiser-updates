import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText, MessageCircleMore, Send, Smartphone } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { JsonLd } from '@/components/shared/json-ld';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME, APP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Send an Invoice on WhatsApp - Free PDF Invoice Maker',
  description:
    'Send professional PDF invoices on WhatsApp in 30 seconds. No signup needed. Free forever. Create, generate, and share invoices as WhatsApp attachments.',
  alternates: { canonical: `${APP_URL}/send-invoice-whatsapp` },
};

const steps = [
  {
    title: 'Open Free Invoice Kit',
    description:
      'No signup, no account creation. Open the app and start filling in your invoice immediately.',
    icon: Smartphone,
  },
  {
    title: 'Fill in your invoice',
    description:
      'Add your business details, client info, line items, tax, and discount in one focused invoice workspace.',
    icon: FileText,
  },
  {
    title: 'Generate PDF',
    description: 'Click Generate Invoice to create a professional PDF ready to download and share.',
    icon: Send,
  },
  {
    title: 'Send on WhatsApp',
    description:
      'Download the PDF and drop it into your client chat so they receive the invoice instantly.',
    icon: MessageCircleMore,
  },
];

const faqs = [
  {
    question: 'Is it really free to send invoices on WhatsApp?',
    answer:
      'Yes. Free Invoice Kit is free with no signup required. You can create invoices and share the PDF on WhatsApp without paying anything.',
  },
  {
    question: 'Do my clients need to install an app?',
    answer:
      'No. Your client receives a standard PDF file in WhatsApp and can open it with any PDF viewer on phone or desktop.',
  },
  {
    question: 'Is the invoice sent as a link or as a file?',
    answer:
      'The current Sprint 2 flow generates a PDF file. When Supabase storage is configured, the app can also return a hosted PDF URL.',
  },
  {
    question: 'Can I customize the invoice with my business logo?',
    answer:
      'The current version includes your business name and contact details in a clean professional layout. Custom logo support is a follow-up feature.',
  },
];

export default function SendInvoiceWhatsAppPage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }}
      />

      <Header />

      <main className="py-8 sm:py-10 lg:py-12">
        <PageSection spacing="compact">
          <PageHero gridClassName="lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-5">
              <Badge>WhatsApp Invoice Guide</Badge>
              <div className="space-y-4">
                <h1 className="text-foreground max-w-3xl">
                  Send an invoice on WhatsApp without turning a simple task into admin work.
                </h1>
                <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg">
                  Most clients answer faster in chat than email. {APP_NAME} helps you create a clean
                  PDF, then move it into WhatsApp with almost no setup friction.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/create">
                    Create Invoice
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/history">View saved invoices</Link>
                </Button>
              </div>
            </div>

            <InfoPanel tone="quiet">
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Why this works
              </p>
              <div className="text-muted-foreground mt-5 space-y-4 text-sm leading-7">
                <p>WhatsApp gets opened. Email often gets postponed.</p>
                <p>
                  A PDF attachment feels finished and easy to forward to finance or a cofounder.
                </p>
                <p>
                  The faster you move from agreement to invoice, the faster you usually get paid.
                </p>
              </div>
            </InfoPanel>
          </PageHero>
        </PageSection>

        <PageSection spacing="compact">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                4-step flow
              </p>
              <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                From blank screen to client-ready invoice
              </h2>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card key={step.title} className="py-0">
                  <CardHeader className="gap-3 px-5 py-5">
                    <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-[var(--radius-card)]">
                      <Icon className="size-5" />
                    </div>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.22em] uppercase">
                      Step {index + 1}
                    </p>
                    <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-7">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </PageSection>

        <PageSection spacing="compact">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <InfoPanel>
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Why PDF instead of a link
              </p>
              <p className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em]">
                A PDF travels better through chat and keeps the invoice looking finished.
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                Clients can save it, forward it, open it offline, and keep the layout intact on
                phone or desktop. That lowers friction compared with sending people through another
                interface.
              </p>
            </InfoPanel>

            <InfoPanel tone="accent">
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Start now
              </p>
              <p className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em]">
                Create your first WhatsApp-ready invoice in under 30 seconds.
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                Fill your details, generate the PDF, and move it into chat before the conversation
                goes cold.
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

        <PageSection spacing="compact">
          <div>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
              FAQ
            </p>
            <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Questions about the WhatsApp invoice flow
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
