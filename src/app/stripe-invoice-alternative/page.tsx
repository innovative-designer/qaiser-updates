import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, XCircle } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Free Stripe Invoice Alternative | QuickBill',
  description:
    'Looking for a Stripe invoice alternative? QuickBill is free, no-signup, and optimized for fast invoice PDF creation and WhatsApp sharing.',
  alternates: {
    canonical: 'https://quickbill.app/stripe-invoice-alternative',
  },
};

const comparisonRows = [
  {
    feature: 'Signup required',
    quickbill: 'No',
    stripe: 'Yes',
  },
  {
    feature: 'Time to first invoice',
    quickbill: 'Under 1 minute',
    stripe: 'Longer setup',
  },
  {
    feature: 'WhatsApp sharing flow',
    quickbill: 'Built in',
    stripe: 'Not built for it',
  },
  {
    feature: 'Core invoicing price',
    quickbill: 'Free',
    stripe: 'Depends on workflow',
  },
];

export default function StripeInvoiceAlternativePage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="text-center">
          <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">
            Comparison
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            A Simpler Stripe Invoice Alternative
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base leading-7">
            If you need straightforward invoice creation and fast sharing, QuickBill removes the
            setup friction. Create the invoice, export PDF, and send it to clients in seconds.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <Link href="/create">
                Try QuickBill Free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-14 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b bg-stone-50/70">
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-semibold text-emerald-700">QuickBill</th>
                <th className="px-4 py-3 font-semibold text-stone-600">Stripe</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{row.feature}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="size-4 text-emerald-600" />
                      {row.quickbill}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    <span className="inline-flex items-center gap-1.5">
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
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">When QuickBill Is Better</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm leading-6">
              Best for freelancers and service businesses that want fast invoicing and direct
              sharing without account setup overhead.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">When Stripe Is Better</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm leading-6">
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
