import Link from 'next/link';
import {
  ArrowRight,
  FileCheck,
  FileText,
  Globe,
  MessageCircleMore,
  Sparkles,
  WalletCards,
  Wifi,
  Zap,
} from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { JsonLd } from '@/components/shared/json-ld';
import { ProWaitlistBanner } from '@/components/pro-waitlist-banner';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE, APP_URL } from '@/lib/constants';

const steps = [
  {
    title: 'Fill one focused form',
    description:
      'Business details, client details, and line items stay on one screen so you never lose context.',
    icon: FileText,
  },
  {
    title: 'Preview instantly',
    description:
      'The invoice updates as you type, so the document always looks polished before you send it.',
    icon: FileCheck,
  },
  {
    title: 'Send on WhatsApp',
    description:
      'Generate a professional PDF and send it directly as a WhatsApp attachment. Your client gets it instantly.',
    icon: MessageCircleMore,
  },
];

const features = [
  {
    title: 'No Signup',
    description:
      'Open the app and make an invoice immediately. No account wall, no setup ceremony.',
    icon: Zap,
  },
  {
    title: 'Professional PDFs',
    description:
      'Generate polished PDF invoices with a clean layout, proper currency formatting, and your business details.',
    icon: FileCheck,
  },
  {
    title: 'WhatsApp Native',
    description:
      'QuickBill is built around the reality of freelancers and small businesses sending invoices in chat.',
    icon: MessageCircleMore,
  },
  {
    title: 'Works Offline',
    description:
      'Invoices save locally in your browser with IndexedDB, so you can keep working without a backend.',
    icon: Wifi,
  },
  {
    title: 'Auto Currency',
    description:
      'The form detects a likely local currency up front, then still lets you switch any time.',
    icon: Globe,
  },
  {
    title: '100% Free',
    description:
      'Create and send unlimited invoices without signup fees, subscription charges, or hidden costs.',
    icon: WalletCards,
  },
];

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: APP_NAME,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          description: APP_DESCRIPTION,
          url: APP_URL,
        }}
      />

      <Header />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,oklch(0.94_0.035_255),transparent_55%)]" />
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:px-8 lg:py-32">
            <div className="relative z-10 flex flex-col items-start gap-6">
              <Badge variant="outline" className="bg-background rounded-full px-3 py-1 shadow-sm">
                Free forever, no signup
              </Badge>

              <div className="space-y-4">
                <h1 className="text-foreground max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Create polished invoices in <span className="text-primary">30 seconds</span>.
                </h1>
                <p className="text-muted-foreground max-w-xl text-lg leading-8">
                  {APP_TAGLINE}. Build the invoice, preview it live, and keep it saved locally in
                  your browser with zero onboarding friction.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/create"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium shadow-sm transition-colors"
                >
                  Create Invoice
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="border-border bg-background text-foreground hover:bg-muted inline-flex h-11 items-center justify-center rounded-lg border px-5 text-sm font-medium transition-colors"
                >
                  See how it works
                </Link>
              </div>
            </div>

            <div className="relative z-10">
              <div className="bg-card rounded-2xl border-border/40 border p-0 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.28)] sm:rounded-[1.75rem] sm:border-border/80 sm:p-5">
                <div className="bg-muted/30 rounded-2xl p-0 sm:rounded-[1.35rem] sm:border sm:border-dashed sm:border-border sm:p-6">
                  <div className="flex min-h-[24rem] flex-col justify-between rounded-2xl bg-white p-4 sm:rounded-[1.1rem] sm:border sm:border-border/80 sm:p-6 sm:shadow-sm">
                    <div className="border-border flex items-start justify-between gap-4 border-b border-dashed pb-5">
                      <div>
                        <p className="text-lg font-semibold tracking-tight">Your Business</p>
                        <p className="text-muted-foreground mt-1 text-xs leading-5">
                          hello@quickbill.app
                          <br />
                          +92 300 0000000
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-primary text-xl font-bold tracking-tight uppercase">
                          Invoice
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">Draft preview</p>
                      </div>
                    </div>

                    <div className="grid gap-6 py-6 text-sm">
                      <div className="grid grid-cols-[1fr_auto] gap-4">
                        <div>
                          <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
                            Bill To
                          </p>
                          <p className="mt-2 font-medium">Client Name</p>
                          <p className="text-muted-foreground text-xs leading-5">
                            Client Company
                            <br />
                            client@example.com
                          </p>
                        </div>
                        <Badge variant="outline">Due today</Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="border-border text-muted-foreground grid grid-cols-[1fr_80px_100px] border-b border-dashed pb-2 text-[11px] font-semibold tracking-[0.18em] uppercase">
                          <p>Description</p>
                          <p className="text-right">Qty</p>
                          <p className="text-right">Amount</p>
                        </div>
                        <div className="border-border grid grid-cols-[1fr_80px_100px] gap-2 border-b border-dashed pb-3 text-sm">
                          <p>Design retainer</p>
                          <p className="text-muted-foreground text-right">1</p>
                          <p className="text-right font-medium">$500.00</p>
                        </div>
                        <div className="ml-auto w-full max-w-48 space-y-2">
                          <div className="text-muted-foreground flex items-center justify-between">
                            <span>Subtotal</span>
                            <span>$500.00</span>
                          </div>
                          <div className="flex items-center justify-between font-semibold">
                            <span>Total</span>
                            <span className="text-primary">$500.00</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-border text-muted-foreground/70 flex items-center gap-2 border-t border-dashed pt-4 text-[11px] tracking-wide">
                      <span className="bg-primary/10 text-primary flex size-5 items-center justify-center rounded-full">
                        <Sparkles className="size-3" />
                      </span>
                      Try it now - create a real invoice in 30 seconds.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">
              How It Works
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              Built for fast invoice creation, not admin fatigue.
            </h2>
            <p className="text-muted-foreground">
              Every section is designed to keep the form direct and the output trustworthy.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card key={step.title}>
                  <CardHeader>
                    <div className="bg-primary/10 text-primary mb-3 flex size-14 items-center justify-center rounded-full">
                      <Icon className="size-6" />
                    </div>
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
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

        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">
              Features
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              Fast invoicing, now with real PDF output.
            </h2>
            <p className="text-muted-foreground">
              The workflow stays narrow on purpose: one clean form, one live preview, one dependable
              PDF export path.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="hover:ring-primary/20 transition-colors duration-200"
                >
                  <CardHeader>
                    <Icon className="text-primary mb-1 size-8" />
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="border-border/80 bg-muted/40 mx-auto max-w-4xl rounded-[2rem] border px-6 py-14 text-center shadow-sm sm:px-10">
            <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">
              Pro Coming Soon
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              More features are on the way.
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
              QuickBill is growing fast. WhatsApp sharing, recurring invoices, client management,
              and a Pro plan with custom branding are all in the pipeline.
            </p>
            <div className="mx-auto mt-8 max-w-xl text-left">
              <ProWaitlistBanner source="landing_page" variant="inline" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
