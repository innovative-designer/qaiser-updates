import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, XCircle } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
    <div className="min-h-screen">
      <Header />
      <main className="py-8 sm:py-10 lg:py-12">
        <PageSection width="wide" spacing="compact">
          <PageHero gridClassName="lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-5">
              <Badge>Comparison</Badge>
              <div className="space-y-4">
                <h1 className="text-foreground max-w-3xl">
                  A simpler Stripe invoice alternative when the goal is just to send the invoice.
                </h1>
                <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg">
                  If you need straightforward invoice creation and fast sharing, Free Invoice Kit
                  removes the setup drag. Create the invoice, export the PDF, and send it in
                  seconds.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/create">
                  Try Free Invoice Kit Free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <InfoPanel tone="quiet">
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Best fit
              </p>
              <div className="text-muted-foreground mt-5 space-y-4 text-sm leading-7">
                <p>Free Invoice Kit is for fast invoice delivery and low setup overhead.</p>
                <p>
                  Stripe is better when you need deeper payment automation and billing
                  infrastructure.
                </p>
                <p>
                  The right tool depends on whether your workflow is operationally heavy or
                  intentionally light.
                </p>
              </div>
            </InfoPanel>
          </PageHero>
        </PageSection>

        <PageSection width="wide" spacing="compact">
          <Table className="min-w-[560px] text-left text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Feature</TableHead>
                <TableHead className="text-primary">Free Invoice Kit</TableHead>
                <TableHead>Stripe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonRows.map((row) => (
                <TableRow key={row.feature}>
                  <TableCell className="text-foreground font-medium">{row.feature}</TableCell>
                  <TableCell>
                    <span className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-3 py-1">
                      <CheckCircle2 className="size-4" />
                      {row.freeInvoiceKit}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <span className="surface-quiet inline-flex items-center gap-2 rounded-[var(--radius-pill)] border px-3 py-1">
                      {row.stripe === 'Not built for it' ? (
                        <XCircle className="size-4 text-rose-500" />
                      ) : (
                        <Clock3 className="size-4 text-amber-500" />
                      )}
                      {row.stripe}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PageSection>

        <PageSection width="wide" spacing="compact">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="py-0">
              <CardHeader className="px-5 py-5">
                <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                  When Free Invoice Kit is better
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground px-5 pb-5 text-sm leading-7">
                Best for freelancers and service businesses that want fast invoicing and direct
                sharing without account setup overhead.
              </CardContent>
            </Card>
            <Card className="py-0">
              <CardHeader className="px-5 py-5">
                <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                  When Stripe is better
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground px-5 pb-5 text-sm leading-7">
                Better fit if you need deeper payment workflows, full billing stack automation, and
                enterprise-grade integrations.
              </CardContent>
            </Card>
          </div>
        </PageSection>
      </main>
      <Footer />
    </div>
  );
}
