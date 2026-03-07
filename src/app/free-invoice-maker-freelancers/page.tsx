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
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6f8fb_0%,#ffffff_42%,#f8f5ef_100%)]">
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

      <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-stone-200 bg-white/90 p-8 shadow-[0_24px_90px_-70px_rgba(24,34,48,0.8)]">
          <p className="text-sm font-semibold tracking-[0.24em] text-stone-500 uppercase">
            Freelancer Invoice Tool
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
            Free invoice maker for freelancers who want speed, not bookkeeping overhead.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">
            {APP_NAME} keeps the workflow narrow on purpose: enter your client details, review a
            live preview, generate a clean PDF, and move on with your client work.
          </p>
          <Link
            href="/create"
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-sm font-medium shadow-sm transition-colors"
          >
            Create Your Free Invoice
            <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-stone-950">
            Why freelancers choose {APP_NAME}
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <Card key={benefit.title} className="border border-stone-200 bg-white/90 shadow-sm">
                  <CardHeader>
                    <Icon className="mb-1 size-8 text-primary" />
                    <CardTitle>{benefit.title}</CardTitle>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-16 rounded-[1.75rem] border border-primary/10 bg-primary/5 p-8">
          <h2 className="text-2xl font-bold tracking-tight text-stone-950">
            Start invoicing for free
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-stone-600">
            Build the invoice, generate the PDF, and deliver it without stepping into a billing
            platform you do not actually want to manage every day.
          </p>
        </section>

        <section className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold tracking-tight text-stone-950">
            Frequently asked questions
          </h2>

          <div className="grid gap-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-stone-200 bg-white/90 p-6">
                <h3 className="text-lg font-semibold text-stone-950">{faq.question}</h3>
                <p className="mt-2 leading-7 text-stone-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
