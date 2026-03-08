import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText, MessageCircleMore, Send, Smartphone } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { JsonLd } from '@/components/shared/json-ld';
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
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(249,247,242,1)_0%,rgba(255,255,255,1)_44%,rgba(240,247,245,1)_100%)]">
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
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="rounded-full bg-primary/10 px-3 py-1 text-[11px] tracking-[0.24em] uppercase text-primary hover:bg-primary/10">
                WhatsApp Invoice Guide
              </Badge>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                  Send an invoice on WhatsApp without turning a simple task into admin work.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Most clients answer faster in chat than email. {APP_NAME} helps you create a
                  clean PDF, then move it into WhatsApp with almost no setup friction.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full px-6">
                  <Link href="/create">
                    Create Invoice
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-6">
                  <Link href="/history">View saved invoices</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-black/10 bg-white/80 p-5 sm:p-6">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                Why this works
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>WhatsApp gets opened. Email often gets postponed.</p>
                <p>A PDF attachment feels finished and easy to forward to finance or a cofounder.</p>
                <p>The faster you move from agreement to invoice, the faster you usually get paid.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                4-step flow
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
                From blank screen to client-ready invoice
              </h2>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card key={step.title} className="rounded-[1.6rem] border border-black/10 bg-white/90 py-0">
                  <CardHeader className="gap-3 px-5 py-5">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <p className="text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
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
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-black/10 bg-white/90 p-6">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              Why PDF instead of a link
            </p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
              A PDF travels better through chat and keeps the invoice looking finished.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Clients can save it, forward it, open it offline, and keep the layout intact on
              phone or desktop. That lowers friction compared with sending people through another
              interface.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-6">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              Start now
            </p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
              Create your first WhatsApp-ready invoice in under 30 seconds.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Fill your details, generate the PDF, and move it into chat before the conversation
              goes cold.
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
              Questions about the WhatsApp invoice flow
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
