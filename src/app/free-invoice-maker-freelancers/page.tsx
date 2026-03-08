import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  FileCheck,
  Globe,
  Smartphone,
  WalletCards,
  Zap,
} from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { JsonLd } from '@/components/shared/json-ld';
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
      'QuickBill is free, not a trial. Create invoices without chasing a subscription decision first.',
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
      'Most freelancer conversations already happen in chat. QuickBill keeps the invoice flow close to that reality.',
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
    description:
      'One focused screen, one preview, one generate action. Less setup, faster invoicing.',
    icon: Clock,
  },
];

const faqs = [
  {
    question: 'Is QuickBill really free for freelancers?',
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
      'QuickBill supports multiple commonly used currencies including USD, EUR, GBP, AED, PKR, INR, NGN, and more.',
  },
];

export default function FreeInvoiceMakerFreelancersPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(249,247,242,1)_0%,rgba(255,255,255,1)_42%,rgba(242,247,245,1)_100%)]">
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

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(247,243,234,0.93))] p-6 shadow-[0_30px_80px_-50px_rgba(28,33,55,0.38)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="rounded-full bg-primary/10 px-3 py-1 text-[11px] tracking-[0.24em] uppercase text-primary hover:bg-primary/10">
                Freelancer Invoice Tool
              </Badge>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                  Free invoice maker for freelancers who want speed, not bookkeeping overhead.
                </h1>
                <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {APP_NAME} keeps the flow narrow on purpose: enter your client details, review a
                  live preview, generate a clean PDF, and move on with the actual client work.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full px-6">
                  <Link href="/create">
                    Create Your Free Invoice
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-6">
                  <Link href="/history">See saved invoices</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-black/10 bg-white/80 p-5 sm:p-6">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                Why freelancers stick with it
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>No setup ceremony before you can create the first invoice.</p>
                <p>No dense back office UI when all you need is one polished PDF.</p>
                <p>No pressure to run your whole business through a billing suite you did not ask for.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              Why it fits freelance work
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
              The invoice tool is lightweight because your workflow already is.
            </h2>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <Card key={benefit.title} className="rounded-[1.6rem] border border-black/10 bg-white/90 py-0">
                  <CardHeader className="gap-3 px-5 py-5">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
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
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.75rem] border border-black/10 bg-white/90 p-6">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              What this replaces
            </p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
              Spreadsheets, repeated templates, and awkward chat attachments.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              QuickBill works best when you need a clean invoice fast and do not want another
              platform to manage every detail of the business.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-6">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              Start invoicing
            </p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
              Make the invoice and send it before the task slips into admin backlog.
            </p>
            <Button asChild size="lg" className="mt-6 h-12 rounded-full px-6">
              <Link href="/create">
                Start for Free
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
              Questions freelancers usually ask first
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
