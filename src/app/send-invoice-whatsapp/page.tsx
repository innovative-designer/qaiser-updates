import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText, MessageCircleMore, Send, Smartphone } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { JsonLd } from '@/components/shared/json-ld';
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
    title: 'Open QuickBill',
    description:
      'No signup, no account creation. Open the app and start filling in your invoice immediately.',
    icon: Smartphone,
  },
  {
    title: 'Fill in your invoice',
    description:
      'Add your business details, client info, line items, tax, and discount while the live preview updates as you type.',
    icon: FileText,
  },
  {
    title: 'Generate PDF',
    description:
      'Click Generate Invoice to create a professional PDF with the same polished layout shown in preview.',
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
      'Yes. QuickBill is free with no signup required. You can create invoices and share the PDF on WhatsApp without paying anything.',
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
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f6f2_0%,#ffffff_46%,#f3f8f6_100%)]">
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
        <section className="grid gap-10 rounded-[2rem] border border-stone-200 bg-white/80 p-8 shadow-[0_24px_90px_-70px_rgba(24,34,48,0.8)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <p className="text-sm font-semibold tracking-[0.24em] text-stone-500 uppercase">
              WhatsApp Invoice Guide
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
              How to send an invoice on WhatsApp without turning it into admin work.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-600">
              Most clients reply faster on WhatsApp than email. {APP_NAME} helps you generate a
              clean PDF invoice, then move it into chat without extra account setup or export
              friction.
            </p>
            <Link
              href="/create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium shadow-sm transition-colors"
            >
              Create Invoice
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="rounded-[1.75rem] border border-stone-200 bg-[linear-gradient(180deg,#f9fbff_0%,#eef6f2_100%)] p-6">
            <p className="text-sm font-semibold tracking-[0.2em] text-stone-500 uppercase">
              Why it works
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-stone-700">
              <p>WhatsApp gets opened. Email often gets ignored.</p>
              <p>A PDF attachment feels like a finished business document, not a loose message.</p>
              <p>
                The faster you move from quote acceptance to invoice delivery, the faster you get
                paid.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-stone-950">
            4 steps to send a WhatsApp invoice
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card key={step.title} className="border border-stone-200 bg-white/90 shadow-sm">
                  <CardHeader>
                    <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-stone-500 uppercase">
                      Step {index + 1}
                    </p>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-stone-200 bg-stone-50/80 p-8">
            <h2 className="text-2xl font-bold tracking-tight text-stone-950">Why PDF, not a link?</h2>
            <p className="mt-4 leading-7 text-stone-600">
              PDF invoices land directly in chat, work offline, and keep their layout intact across
              devices. That makes them easier for a client to forward to finance, archive, or pay
              against without needing another click.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-8">
            <h2 className="text-2xl font-bold tracking-tight text-stone-950">
              Create your first WhatsApp invoice now
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-stone-600">
              Fill in your details, generate a PDF, and move it into WhatsApp in under 30 seconds.
            </p>
            <Link
              href="/create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-sm font-medium shadow-sm transition-colors"
            >
              Open Invoice Builder
              <ArrowRight className="size-4" />
            </Link>
          </div>
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
