import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircleMore, Zap } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'WhatsApp Billing UAE | Free Invoice Generator for UAE Freelancers',
  description:
    'Create professional invoices in AED and share on WhatsApp in seconds. QuickBill is free and works great for UAE freelancers and small businesses.',
  alternates: {
    canonical: 'https://quickbill.app/whatsapp-billing-uae',
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
    <div className="bg-background min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="text-center">
          <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">
            UAE Invoicing
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            WhatsApp Billing for UAE Freelancers
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base leading-7">
            Create invoice PDFs in AED and send them directly to clients on WhatsApp. QuickBill is
            built for fast billing workflows used by solo founders and small service businesses.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <Link href="/create">
                Create Invoice in AED
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-2">
          {highlights.map((highlight) => (
            <Card key={highlight}>
              <CardContent className="flex items-center gap-3 pt-6">
                <CheckCircle2 className="text-primary size-5" />
                <p className="text-sm">{highlight}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <MessageCircleMore className="text-primary size-6" />
              <CardTitle className="text-lg">WhatsApp First</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Built around the real workflow in the UAE: send invoice PDFs directly in chat.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="text-primary size-6" />
              <CardTitle className="text-lg">30-Second Setup</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Fill one form, preview live, and export. No onboarding funnel or account wall.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CheckCircle2 className="text-primary size-6" />
              <CardTitle className="text-lg">Free Forever Core</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Core invoice creation, PDF generation, and sharing stay free for everyone.
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
