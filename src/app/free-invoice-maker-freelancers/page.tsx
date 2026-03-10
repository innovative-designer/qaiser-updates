import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, FileCheck, Globe, Smartphone, WalletCards, Zap } from 'lucide-react';

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
  title: 'Free Invoice Maker for Freelancers - No Signup, No Fees',
  description:
    'Create professional invoices for free. No monthly fees, no signup required. Built for freelancers who need to invoice fast and get paid via WhatsApp.',
  alternates: { canonical: `${APP_URL}/free-invoice-maker-freelancers` },
};

const benefits = [
  {
    title: 'No monthly fees',
    description:
      'Free Invoice Kit is free, not a trial. Create invoices without chasing a subscription decision first.',
    icon: WalletCards,
  },
  {
    title: 'No signup required',
    description:
      'Open the app, fill in the invoice, and generate a PDF. No email verification or onboarding maze.',
    icon: Zap,
  },
  {
    title: 'Professional PDF output',
    description:
      'Invoices export with a clean structure, proper totals, and your business details already in place.',
    icon: FileCheck,
  },
  {
    title: 'WhatsApp-first delivery',
    description:
      'Most freelancer conversations already happen in chat. Free Invoice Kit keeps the invoice flow close to that reality.',
    icon: Smartphone,
  },
  {
    title: 'Auto currency detection',
    description:
      'The app detects your likely local currency and still lets you switch before sending.',
    icon: Globe,
  },
  {
    title: 'Ready in 30 seconds',
    description: 'One focused screen, one generate action, less setup, faster invoicing.',
    icon: Clock,
  },
];

const faqs = [
  {
    question: 'Is Free Invoice Kit really free for freelancers?',
    answer:
      'Yes. There are no hidden subscription charges in the current invoice workflow. The core invoicing flow is free.',
  },
  {
    question: 'Can I use this for my freelance business?',
    answer:
      'Yes. It is designed for freelancers, solopreneurs, and small businesses that need a fast invoice builder.',
  },
  {
    question: 'Where are my invoices stored?',
    answer:
      'Draft invoices are stored locally in your browser. Generated PDFs can also be stored remotely when Supabase is configured.',
  },
  {
    question: 'What currencies are supported?',
    answer:
      'Free Invoice Kit supports multiple commonly used currencies including USD, EUR, GBP, AED, PKR, INR, NGN, and more.',
  },
];

export default function FreeInvoiceMakerFreelancersPage() {
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
        <PageSection width="wide" spacing="compact">
          <PageHero gridClassName="lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <Badge>Freelancer Invoice Tool</Badge>
              <div className="space-y-4">
                <h1 className="text-foreground max-w-4xl">
                  Free invoice maker for freelancers who want speed, not bookkeeping overhead.
                </h1>
                <p className="text-muted-foreground max-w-3xl text-base leading-7 sm:text-lg">
                  {APP_NAME} keeps the flow narrow on purpose: enter your client details, tune the
                  invoice on one focused screen, generate a clean PDF, and move on with the actual
                  client work.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/create">
                    Create Your Free Invoice
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/history">See saved invoices</Link>
                </Button>
              </div>
            </div>

            <InfoPanel tone="quiet">
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Why freelancers stick with it
              </p>
              <div className="text-muted-foreground mt-5 space-y-4 text-sm leading-7">
                <p>No setup ceremony before you can create the first invoice.</p>
                <p>No dense back office UI when all you need is one polished PDF.</p>
                <p>
                  No pressure to run your whole business through a billing suite you did not ask
                  for.
                </p>
              </div>
            </InfoPanel>
          </PageHero>
        </PageSection>

        <PageSection width="wide" spacing="compact">
          <div>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
              Why it fits freelance work
            </p>
            <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              The invoice tool is lightweight because your workflow already is.
            </h2>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <Card key={benefit.title} className="py-0">
                  <CardHeader className="gap-3 px-5 py-5">
                    <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-[var(--radius-card)]">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                      {benefit.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-7">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </PageSection>

        <PageSection width="wide" spacing="compact">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <InfoPanel>
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                What this replaces
              </p>
              <p className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em]">
                Spreadsheets, repeated templates, and awkward chat attachments.
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                Free Invoice Kit works best when you need a clean invoice fast and do not want
                another platform to manage every detail of the business.
              </p>
            </InfoPanel>

            <InfoPanel tone="accent">
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Start invoicing
              </p>
              <p className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em]">
                Make the invoice and send it before the task slips into admin backlog.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/create">
                  Start for Free
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
              Questions freelancers usually ask first
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
