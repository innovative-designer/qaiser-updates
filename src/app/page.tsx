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
import { InfoPanel } from '@/components/shared/info-panel';
import { JsonLd } from '@/components/shared/json-ld';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import { ProWaitlistBanner } from '@/components/pro-waitlist-banner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    description:
      'Invoices stay available locally in your browser, even when your connection is weak.',
    icon: Wifi,
  },
  {
    title: 'Auto currency',
    description:
      'Free Invoice Kit starts with a likely local currency, but you can switch at any time.',
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
    href: '/invoice-generator/graphic-designers',
    title: 'For creative services',
    description: 'Use profession-focused pages for designers, photographers, and other solo service work.',
  },
  {
    href: '/invoice-generator/india',
    title: 'For local-currency markets',
    description: 'Browse country pages for INR, PKR, AED, and NGN invoice flows.',
  },
  {
    href: '/compare/freshbooks',
    title: 'For software comparisons',
    description: 'Compare the lightweight invoice workflow against FreshBooks, Stripe, and Wave.',
  },
  {
    href: '/invoice-template/freelancer',
    title: 'For invoice templates',
    description: 'Start from template-driven pages when you want structure before opening the builder.',
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
        <PageSection className="section-space" spacing="none">
          <PageHero gridClassName="lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] lg:items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="bg-background/72 px-4 py-1.5">
                Free forever. No signup.
              </Badge>

              <div className="space-y-4">
                <p className="section-kicker">Editorial Utility</p>
                <h1 data-display="true" className="text-foreground max-w-3xl">
                  Send a polished invoice from your phone before the chat goes cold.
                </h1>
                <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
                  {APP_TAGLINE}. Build the invoice, review the essentials, generate the PDF, and
                  send it where the client already replies.
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
                  <Link href="#workflow">See the workflow</Link>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <InfoPanel key={stat.label} tone="quiet" className="p-4">
                    <p className="text-muted-foreground text-[0.72rem] tracking-[0.22em] uppercase">
                      {stat.label}
                    </p>
                    <p className="text-foreground mt-2 text-lg font-semibold tracking-tight tabular-nums">
                      {stat.value}
                    </p>
                  </InfoPanel>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="surface-card mx-auto max-w-[24rem] rounded-[1.7rem] border p-1.5 sm:p-3">
                <div className="surface-card rounded-[1.35rem] border p-3 sm:p-4">
                  <div className="flex items-center justify-between pb-4">
                    <div>
                      <p className="text-foreground text-sm font-semibold">Studio North</p>
                      <p className="text-muted-foreground mt-1 text-xs leading-5">
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

                  <InfoPanel tone="quiet" className="p-4">
                    <div className="border-border/70 flex items-start justify-between gap-4 border-b border-dashed pb-4">
                      <div>
                        <p className="text-muted-foreground text-[0.72rem] font-semibold tracking-[0.22em] uppercase">
                          Bill To
                        </p>
                        <p className="text-foreground mt-2 text-sm font-medium">Client Name</p>
                        <p className="text-muted-foreground mt-1 text-xs leading-5">
                          Client Company
                          <br />
                          client@example.com
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-background/78">
                        Due today
                      </Badge>
                    </div>

                    <div className="space-y-3 pt-4 text-sm">
                      <div className="grid grid-cols-[1fr_auto] gap-3">
                        <p className="text-foreground">Design retainer</p>
                        <p className="text-foreground font-medium tabular-nums">$500.00</p>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-3">
                        <p className="text-muted-foreground">WhatsApp-ready PDF</p>
                        <p className="text-muted-foreground tabular-nums">$0.00</p>
                      </div>
                      <div className="border-border/70 border-t border-dashed pt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Total</span>
                          <span className="text-primary text-lg font-semibold tabular-nums">
                            $500.00
                          </span>
                        </div>
                      </div>
                    </div>
                  </InfoPanel>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="bg-primary text-primary-foreground rounded-[var(--radius-button)] px-3 py-3 text-center text-sm font-medium">
                      Generate PDF
                    </div>
                    <div className="bg-secondary text-secondary-foreground rounded-[var(--radius-button)] px-3 py-3 text-center text-sm font-medium">
                      Send on WhatsApp
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </PageHero>
        </PageSection>

        <PageSection id="workflow">
          <div className="max-w-2xl">
            <p className="section-kicker">Workflow</p>
            <h2 data-display="true" className="text-foreground mt-3">
              Built for getting the invoice out, not getting lost in admin.
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-7">
              Free Invoice Kit keeps the path narrow: fill the essentials, check the live output,
              and send the finished document where the client already responds.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {workflow.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card key={step.title}>
                  <CardHeader>
                    <div className="bg-primary/10 text-primary mb-2 flex size-12 items-center justify-center rounded-[var(--radius-card)]">
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
        </PageSection>

        <PageSection>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <InfoPanel>
              <p className="section-kicker">Why it feels faster</p>
              <h2 data-display="true" className="text-foreground mt-3">
                The product follows the way freelancers already work on mobile.
              </h2>
              <div className="text-muted-foreground mt-5 space-y-4 text-sm leading-7 sm:text-base">
                <p>Most invoicing tools feel like desktop billing software shrunk onto a phone.</p>
                <p>
                  Free Invoice Kit is narrower by design: one focused form and one clean export
                  path.
                </p>
                <p>
                  That makes it easier to generate the invoice in the same moment you agree the work
                  or confirm the deliverable.
                </p>
              </div>
            </InfoPanel>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Card key={feature.title}>
                    <CardHeader>
                      <div className="bg-secondary text-secondary-foreground mb-2 flex size-12 items-center justify-center rounded-[var(--radius-card)]">
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
        </PageSection>

        <PageSection>
          <PageHero withGrid={false}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="section-kicker">Use Cases</p>
                <h2 data-display="true" className="text-foreground mt-3">
                  One product language, multiple invoicing paths.
                </h2>
                <p className="text-muted-foreground mt-3 leading-7">
                  Each guide and landing page now ladders back to the same mobile-first invoicing
                  workflow.
                </p>
              </div>
              <Badge className="px-4 py-1.5">Expanded across guides, comparisons, and templates</Badge>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="surface-card rounded-[var(--radius-card)] border p-4 sm:p-5 transition hover:-translate-y-1 hover:bg-[var(--surface-hover)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-foreground text-lg font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-6">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight className="text-primary mt-1 size-4" />
                  </div>
                </Link>
              ))}
            </div>
          </PageHero>
        </PageSection>

        <PageSection>
          <ProWaitlistBanner source="home" variant="banner" />
        </PageSection>

        <PageSection className="pb-16 sm:pb-20 lg:pb-28" spacing="none">
          <div className="text-primary-foreground rounded-[var(--radius-shell)] bg-[linear-gradient(135deg,color-mix(in_oklch,var(--primary)_92%,white_3%),color-mix(in_oklch,var(--primary)_78%,var(--accent)_18%))] px-4 py-6 shadow-[var(--shadow-hero)] sm:px-8 sm:py-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-primary-foreground/70 text-[0.72rem] font-semibold tracking-[0.24em] uppercase">
                  Start now
                </p>
                <h2 data-display="true" className="mt-3 text-3xl font-semibold sm:text-4xl">
                  Create the invoice while the project is still top of mind.
                </h2>
                <p className="text-primary-foreground/80 mt-3 max-w-xl text-sm leading-7 sm:text-base">
                  No signup ceremony. No billing-suite overhead. Just a clean invoice workflow that
                  respects how mobile freelancers actually get paid.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/create">
                    Open Invoice Builder
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/18 bg-white/8 text-white hover:bg-white/12 hover:text-white"
                >
                  <Link href="/history">View Saved Invoices</Link>
                </Button>
              </div>
            </div>
          </div>
        </PageSection>
      </main>

      <Footer />
    </div>
  );
}
