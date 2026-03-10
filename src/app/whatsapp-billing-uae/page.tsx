import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircleMore, Zap } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'WhatsApp Billing UAE | Free Invoice Generator for UAE Freelancers',
  description:
    'Create professional invoices in AED and share on WhatsApp in seconds. Free Invoice Kit is free and works great for UAE freelancers and small businesses.',
  alternates: {
    canonical: 'https://www.freeinvoicekit.com/whatsapp-billing-uae',
  },
};

const highlights = [
  'Auto-calculate totals and tax-ready line items',
  'Generate polished PDF invoices in AED',
  'Share via WhatsApp, email, or direct download',
  'No signup required',
];

export default function WhatsAppBillingUaePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8 sm:py-10 lg:py-12">
        <PageSection width="wide" spacing="compact">
          <PageHero gridClassName="lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <Badge>UAE Invoicing</Badge>
              <div className="space-y-4">
                <h1 className="text-foreground max-w-3xl">
                  Create AED invoices and send them on WhatsApp without leaving the client flow.
                </h1>
                <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg">
                  Free Invoice Kit is built for UAE freelancers and small service businesses that
                  want clean invoice PDFs, quick sharing, and almost no setup overhead.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/create">
                  Create Invoice in AED
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <InfoPanel tone="quiet">
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Why it fits UAE workflows
              </p>
              <div className="text-muted-foreground mt-5 space-y-4 text-sm leading-7">
                <p>A lot of client communication already happens in WhatsApp.</p>
                <p>
                  AED invoice output reduces friction when you need to send something immediately.
                </p>
                <p>
                  The product stays useful even if you do not want to adopt a full billing platform.
                </p>
              </div>
            </InfoPanel>
          </PageHero>
        </PageSection>

        <PageSection width="wide" spacing="compact">
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <Card key={highlight} className="py-0">
                <CardContent className="text-foreground flex items-center gap-3 px-5 py-5 text-sm leading-6">
                  <CheckCircle2 className="text-primary size-5 shrink-0" />
                  <p>{highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageSection>

        <PageSection width="wide" spacing="compact">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="py-0">
              <CardHeader className="px-5 py-5">
                <MessageCircleMore className="text-primary size-6" />
                <CardTitle className="mt-4 text-lg font-semibold">WhatsApp first</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground px-5 pb-5 text-sm leading-6">
                Built around the real workflow in the UAE: send invoice PDFs directly in chat.
              </CardContent>
            </Card>
            <Card className="py-0">
              <CardHeader className="px-5 py-5">
                <Zap className="text-primary size-6" />
                <CardTitle className="mt-4 text-lg font-semibold">30-second setup</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground px-5 pb-5 text-sm leading-6">
                Fill one form, generate the PDF, and export. No onboarding funnel or account wall.
              </CardContent>
            </Card>
            <Card className="py-0">
              <CardHeader className="px-5 py-5">
                <CheckCircle2 className="text-primary size-6" />
                <CardTitle className="mt-4 text-lg font-semibold">Free forever core</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground px-5 pb-5 text-sm leading-6">
                Core invoice creation, PDF generation, and sharing stay free for everyone.
              </CardContent>
            </Card>
          </div>
        </PageSection>
      </main>
      <Footer />
    </div>
  );
}
