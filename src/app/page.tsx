import Link from 'next/link';
import {
  ArrowRight,
  FileCheck2,
  Globe2,
  MessageCircleMore,
  ReceiptText,
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

const workflow = [
  {
    title: 'Enter the essentials',
    description: 'Business, client, due date, and line items stay together in one calm flow.',
    icon: ReceiptText,
  },
  {
    title: 'Preview as you type',
    description: 'The invoice stays client-ready while totals and layout update in real time.',
    icon: FileCheck2,
  },
  {
    title: 'Generate and send',
    description: 'Export a polished PDF, then move it directly into WhatsApp or email.',
    icon: MessageCircleMore,
  },
];

const highlights = [
  {
    title: 'No signup wall',
    description: 'Start invoicing immediately instead of entering a setup funnel.',
    icon: Zap,
  },
  {
    title: 'Works offline',
    description: 'Invoices stay available locally in your browser, even when your connection is weak.',
    icon: Wifi,
  },
  {
    title: 'Auto currency',
    description: 'Free Invoice Kit starts with a likely local currency, but you can switch at any time.',
    icon: Globe2,
  },
  {
    title: 'Free forever core',
    description: 'Core invoice creation, PDF generation, and sharing stay free.',
    icon: WalletCards,
  },
];

const useCases = [
  {
    href: '/free-invoice-maker-freelancers',
    title: 'For freelancers',
    description: 'Fast invoicing without turning your client work into bookkeeping admin.',
  },
  {
    href: '/send-invoice-whatsapp',
    title: 'For WhatsApp billing',
    description: 'Built around chat-native delivery instead of email-first invoicing habits.',
  },
  {
    href: '/invoice-generator-pakistan',
    title: 'For PKR invoices',
    description: 'Create local-currency invoices with a mobile-friendly workflow.',
  },
  {
    href: '/whatsapp-billing-uae',
    title: 'For UAE freelancers',
    description: 'Generate AED invoices and send them in the channels clients already use.',
  },
];

const stats = [
  { label: 'Time to first invoice', value: '30 sec' },
  { label: 'Signup required', value: 'None' },
  { label: 'Primary workflow', value: 'Phone-first' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
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
        <section className="app-shell section-space">
          <div className="editorial-shell relative overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <div className="paper-grid pointer-events-none absolute inset-0 opacity-30" />
            <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(77,92,255,0.18),transparent_62%)]" />

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] lg:items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="rounded-full bg-white/70 px-4 py-1.5">
                  Free forever. No signup.
                </Badge>

                <div className="space-y-4">
                  <p className="section-kicker">Editorial Utility</p>
                  <h1
                    data-display="true"
                    className="max-w-3xl text-4xl leading-[0.95] font-semibold text-foreground sm:text-5xl lg:text-6xl"
                  >
                    Send a polished invoice from your phone before the chat goes cold.
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                    {APP_TAGLINE}. Build the invoice, preview it live, generate the PDF, and send
                    it where the client already replies.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/create"
                    className="bg-primary text-primary-foreground inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-medium shadow-[0_18px_36px_-22px_rgba(77,92,255,0.7)] transition hover:-translate-y-0.5"
                  >
                    Create Invoice
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="#workflow"
                    className="border-border/80 bg-white/70 text-foreground inline-flex h-12 items-center justify-center rounded-2xl border px-5 text-sm font-medium transition hover:bg-white"
                  >
                    See the workflow
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-[1.35rem] border border-white/80 bg-white/72 p-4">
                      <p className="text-muted-foreground text-[0.72rem] tracking-[0.22em] uppercase">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="mx-auto max-w-[24rem] rounded-[2.25rem] border border-[rgba(36,44,72,0.08)] bg-[linear-gradient(180deg,rgba(245,246,255,0.98),rgba(255,255,255,0.96))] p-3 shadow-[0_35px_110px_-48px_rgba(26,38,64,0.55)]">
                  <div className="rounded-[1.85rem] border border-white/80 bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Studio North</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          hello@studionorth.com
                          <br />
                          +92 300 0000000
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-primary text-xl font-semibold tracking-tight uppercase">
                          Invoice
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">Ready in 30 sec</p>
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] bg-muted/55 p-4">
                      <div className="flex items-start justify-between gap-4 border-b border-dashed border-border/70 pb-4">
                        <div>
                          <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                            Bill To
                          </p>
                          <p className="mt-2 text-sm font-medium text-foreground">Client Name</p>
                          <p className="text-muted-foreground mt-1 text-xs leading-5">
                            Client Company
                            <br />
                            client@example.com
                          </p>
                        </div>
                        <Badge variant="outline" className="rounded-full bg-white">
                          Due today
                        </Badge>
                      </div>

                      <div className="space-y-3 pt-4 text-sm">
                        <div className="grid grid-cols-[1fr_auto] gap-3">
                          <p className="text-foreground">Design retainer</p>
                          <p className="font-medium text-foreground">$500.00</p>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-3">
                          <p className="text-muted-foreground">WhatsApp-ready PDF</p>
                          <p className="text-muted-foreground">$0.00</p>
                        </div>
                        <div className="border-t border-dashed border-border/70 pt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Total</span>
                            <span className="text-primary text-lg font-semibold">$500.00</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <div className="rounded-[1.15rem] bg-primary px-3 py-3 text-center text-sm font-medium text-primary-foreground">
                        Generate PDF
                      </div>
                      <div className="rounded-[1.15rem] bg-secondary px-3 py-3 text-center text-sm font-medium text-secondary-foreground">
                        Send on WhatsApp
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-1 top-8 hidden rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-lg sm:block">
                  Live preview
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="app-shell pb-14 sm:pb-18 lg:pb-24">
          <div className="max-w-2xl">
            <p className="section-kicker">Workflow</p>
            <h2 data-display="true" className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              Built for getting the invoice out, not getting lost in admin.
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-7">
              Free Invoice Kit keeps the path narrow: fill the essentials, check the live output, and send
              the finished document where the client already responds.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {workflow.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card key={step.title}>
                  <CardHeader>
                    <div className="bg-primary/10 text-primary mb-2 flex size-12 items-center justify-center rounded-2xl">
                      <Icon className="size-5" />
                    </div>
                    <p className="text-muted-foreground text-[0.72rem] tracking-[0.22em] uppercase">
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

        <section className="app-shell pb-14 sm:pb-18 lg:pb-24">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="editorial-panel p-6 sm:p-8">
              <p className="section-kicker">Why it feels faster</p>
              <h2 data-display="true" className="mt-3 text-3xl font-semibold text-foreground">
                The product follows the way freelancers already work on mobile.
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                <p>Most invoicing tools feel like desktop billing software shrunk onto a phone.</p>
                <p>
                  Free Invoice Kit is narrower by design: one focused form, one trustworthy preview, one
                  clean export path.
                </p>
                <p>
                  That makes it easier to generate the invoice in the same moment you agree the work
                  or confirm the deliverable.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Card key={feature.title}>
                    <CardHeader>
                      <div className="bg-secondary text-secondary-foreground mb-2 flex size-12 items-center justify-center rounded-2xl">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="app-shell pb-14 sm:pb-18 lg:pb-24">
          <div className="editorial-shell px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="section-kicker">Use Cases</p>
                <h2 data-display="true" className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
                  One product language, multiple invoicing paths.
                </h2>
                <p className="text-muted-foreground mt-3 leading-7">
                  Each guide and landing page now ladders back to the same mobile-first invoicing
                  workflow.
                </p>
              </div>
              <Badge className="rounded-full px-4 py-1.5">Modernized across all routes</Badge>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {useCases.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.5rem] border border-white/80 bg-white/75 p-5 transition hover:-translate-y-1 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-6">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 size-4 text-primary" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="app-shell pb-14 sm:pb-18 lg:pb-24">
          <ProWaitlistBanner source="home" variant="banner" />
        </section>

        <section className="app-shell pb-16 sm:pb-20 lg:pb-28">
          <div className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(77,92,255,0.96),rgba(50,87,177,0.96))] px-5 py-7 text-primary-foreground shadow-[0_32px_90px_-48px_rgba(50,87,177,0.8)] sm:px-8 sm:py-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[0.72rem] font-semibold tracking-[0.24em] uppercase text-primary-foreground/70">
                  Start now
                </p>
                <h2 data-display="true" className="mt-3 text-3xl font-semibold sm:text-4xl">
                  Create the invoice while the project is still top of mind.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-primary-foreground/80 sm:text-base">
                  No signup ceremony. No billing-suite overhead. Just a clean invoice workflow that
                  respects how mobile freelancers actually get paid.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/create"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-medium text-primary transition hover:-translate-y-0.5"
                >
                  Open Invoice Builder
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/history"
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/20 px-5 text-sm font-medium text-white/92 transition hover:bg-white/8"
                >
                  View Saved Invoices
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
