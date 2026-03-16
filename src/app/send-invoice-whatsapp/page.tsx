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
import { buildBreadcrumbSchema, buildFaqSchema, buildHowToSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'How to Send an Invoice on WhatsApp Quickly - Free PDF Invoice Maker',
  description:
    'Send professional PDF invoices on WhatsApp without signup. Create, generate, and share invoice PDFs quickly from your phone or desktop.',
  keywords: [
    'how to send invoice on whatsapp',
    'send pdf invoice on whatsapp',
    'whatsapp invoice pdf',
    'invoice generator whatsapp',
    'free invoice maker no signup',
  ],
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
    description: 'Generate a professional invoice PDF that is ready to download or share.',
    icon: Send,
  },
  {
    title: 'Send on WhatsApp',
    description:
      'Share the PDF directly on supported devices, or download it and send it in your client chat.',
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
      'Free Invoice Kit generates a PDF file. On supported devices you can share that file directly; otherwise you can download it and attach it in WhatsApp yourself.',
  },
  {
    question: 'Can I customize the invoice with my business logo?',
    answer:
      'The current version includes your business name and contact details in a clean professional layout. Custom logo support is a follow-up feature.',
  },
];

const relatedGuides = [
  {
    href: '/free-invoice-maker-freelancers',
    title: 'Free Invoice Maker For Freelancers',
    description: 'See the no-signup invoicing flow built for solo operators and service work.',
  },
  {
    href: '/invoice-template/freelancer',
    title: 'Freelancer Invoice Template',
    description: 'Review the invoice structure first, then jump into the same builder to create it.',
  },
  {
    href: '/invoice-generator/india',
    title: 'Invoice Generator India',
    description: 'See the same WhatsApp-first invoicing pattern localized for INR billing.',
  },
];

export default function SendInvoiceWhatsAppPage() {
  const schemas = [
    buildFaqSchema(faqs),
    buildHowToSchema({
      name: 'How to Send an Invoice on WhatsApp',
      description:
        'Create a professional PDF invoice and send it on WhatsApp in a few quick steps.',
      totalTime: 'PT5M',
      steps: [
        {
          name: 'Open Free Invoice Kit',
          text: 'Go to the invoice builder. No signup is required.',
          url: `${APP_URL}/create`,
        },
        {
          name: 'Fill in your invoice',
          text: 'Enter your business details, client information, and line items.',
        },
        {
          name: 'Generate the PDF',
          text: 'Create a finished invoice PDF that is ready to share.',
        },
        {
          name: 'Send it on WhatsApp',
          text: 'Download the PDF and share it into the client chat.',
        },
      ],
    }),
    buildBreadcrumbSchema([
      { name: 'Home', item: APP_URL },
      { name: 'Send Invoice on WhatsApp', item: `${APP_URL}/send-invoice-whatsapp` },
    ]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd data={schemas} />

      <Header />

      <main className="py-8 sm:py-10 lg:py-12">
        <PageSection spacing="compact">
          <PageHero gridClassName="lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-5">
              <Badge>WhatsApp Invoice Guide</Badge>
              <div className="space-y-4">
                <h1 className="text-foreground max-w-3xl">
                  Send an invoice on WhatsApp without turning billing into a slow admin task.
                </h1>
                <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg">
                  Many freelancers close work in chat and need the invoice to follow quickly.
                  {` ${APP_NAME}`} helps you create a clean PDF, then share or download it for
                  WhatsApp without account setup getting in the way.
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
                  <Link href="/free-invoice-maker-freelancers">See freelancer workflow</Link>
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
                Clients can save it, forward it, and open it later without losing the layout on
                phone or desktop. That keeps the payment step simple when you want the invoice to
                feel complete the moment you send it.
              </p>
            </InfoPanel>

            <InfoPanel tone="accent">
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Start now
              </p>
              <p className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em]">
                Create your first WhatsApp-ready invoice in a few quick steps.
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

        <PageSection spacing="compact">
          <div>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
              Related Guides
            </p>
            <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              More ways to speed up your invoicing
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {relatedGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className="block">
                <InfoPanel className="h-full p-5 transition-transform duration-200 hover:-translate-y-0.5">
                  <h3 className="text-foreground text-lg font-semibold">{guide.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-7">{guide.description}</p>
                  <div className="text-primary mt-4 text-sm font-medium">Open guide</div>
                </InfoPanel>
              </Link>
            ))}
          </div>
        </PageSection>
      </main>

      <Footer />
    </div>
  );
}
