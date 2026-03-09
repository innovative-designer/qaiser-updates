import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, XCircle } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Free Stripe Invoice Alternative | Free Invoice Kit',
  description:
    'Looking for a Stripe invoice alternative? Free Invoice Kit is free, no-signup, and optimized for fast invoice PDF creation and WhatsApp sharing.',
  alternates: {
    canonical: 'https://www.freeinvoicekit.com/stripe-invoice-alternative',
  },
};

const comparisonRows = [
  {
    feature: 'Signup required',
    freeInvoiceKit: 'No',
    stripe: 'Yes',
  },
  {
    feature: 'Time to first invoice',
    freeInvoiceKit: 'Under 1 minute',
    stripe: 'Longer setup',
  },
  {
    feature: 'WhatsApp sharing flow',
    freeInvoiceKit: 'Built in',
    stripe: 'Not built for it',
  },
  {
    feature: 'Core invoicing price',
    freeInvoiceKit: 'Free',
    stripe: 'Depends on workflow',
  },
];

export default function StripeInvoiceAlternativePage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(249,247,242,1)_0%,rgba(255,255,255,1)_44%,rgba(240,247,245,1)_100%)] dark:bg-[linear-gradient(180deg,rgba(16,20,30,1)_0%,rgba(19,24,36,1)_44%,rgba(14,20,30,1)_100%)]">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(247,243,234,0.93))] p-6 shadow-[0_30px_80px_-50px_rgba(28,33,55,0.38)] dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(28,34,48,0.94),rgba(17,21,31,0.98))] dark:shadow-[0_30px_80px_-50px_rgba(0,0,0,0.68)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="rounded-full bg-primary/10 px-3 py-1 text-[11px] tracking-[0.24em] uppercase text-primary hover:bg-primary/10">
                Comparison
              </Badge>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                  A simpler Stripe invoice alternative when the goal is just to send the invoice.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  If you need straightforward invoice creation and fast sharing, Free Invoice Kit removes
                  the setup drag. Create the invoice, export the PDF, and send it in seconds.
                </p>
              </div>
              <Button asChild size="lg" className="h-12 rounded-full px-6">
                <Link href="/create">
                  Try Free Invoice Kit Free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="rounded-[1.75rem] border border-black/10 bg-white/80 p-5 dark:border-white/10 dark:bg-card/80 sm:p-6">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                Best fit
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>Free Invoice Kit is for fast invoice delivery and low setup overhead.</p>
                <p>Stripe is better when you need deeper payment automation and billing infrastructure.</p>
                <p>The right tool depends on whether your workflow is operationally heavy or intentionally light.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.9rem] border border-black/10 bg-white/95 p-3 shadow-[0_24px_60px_-45px_rgba(28,33,55,0.28)] dark:border-white/10 dark:bg-card/95 dark:shadow-[0_24px_60px_-45px_rgba(0,0,0,0.68)] sm:p-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="px-4 py-4 font-semibold text-foreground">Feature</th>
                  <th className="px-4 py-4 font-semibold text-primary">Free Invoice Kit</th>
                  <th className="px-4 py-4 font-semibold text-muted-foreground">Stripe</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-black/10 last:border-0 dark:border-white/10">
                    <td className="px-4 py-4 font-medium text-foreground">{row.feature}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
                        <CheckCircle2 className="size-4" />
                        {row.freeInvoiceKit}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1">
                        {row.stripe === 'Not built for it' ? (
                          <XCircle className="size-4 text-rose-500" />
                        ) : (
                          <Clock3 className="size-4 text-amber-500" />
                        )}
                        {row.stripe}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card className="rounded-[1.6rem] border border-black/10 bg-white/90 py-0 dark:border-white/10 dark:bg-card/90">
            <CardHeader className="px-5 py-5">
              <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                When Free Invoice Kit is better
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm leading-7 text-muted-foreground">
              Best for freelancers and service businesses that want fast invoicing and direct
              sharing without account setup overhead.
            </CardContent>
          </Card>
          <Card className="rounded-[1.6rem] border border-black/10 bg-white/90 py-0 dark:border-white/10 dark:bg-card/90">
            <CardHeader className="px-5 py-5">
              <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                When Stripe is better
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm leading-7 text-muted-foreground">
              Better fit if you need deeper payment workflows, full billing stack automation, and
              enterprise-grade integrations.
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
