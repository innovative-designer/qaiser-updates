import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircleMore, Zap } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
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
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(249,247,242,1)_0%,rgba(255,255,255,1)_42%,rgba(241,247,245,1)_100%)] dark:bg-[linear-gradient(180deg,rgba(16,20,30,1)_0%,rgba(19,24,36,1)_44%,rgba(14,20,30,1)_100%)]">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(247,243,234,0.93))] p-6 shadow-[0_30px_80px_-50px_rgba(28,33,55,0.38)] dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(28,34,48,0.94),rgba(17,21,31,0.98))] dark:shadow-[0_30px_80px_-50px_rgba(0,0,0,0.68)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="rounded-full bg-primary/10 px-3 py-1 text-[11px] tracking-[0.24em] uppercase text-primary hover:bg-primary/10">
                UAE Invoicing
              </Badge>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                  Create AED invoices and send them on WhatsApp without leaving the client flow.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Free Invoice Kit is built for UAE freelancers and small service businesses that want
                  clean invoice PDFs, quick sharing, and almost no setup overhead.
                </p>
              </div>
              <Button asChild size="lg" className="h-12 rounded-full px-6">
                <Link href="/create">
                  Create Invoice in AED
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="rounded-[1.75rem] border border-black/10 bg-white/80 p-5 dark:border-white/10 dark:bg-card/80 sm:p-6">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                Why it fits UAE workflows
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>A lot of client communication already happens in WhatsApp.</p>
                <p>AED invoice output reduces friction when you need to send something immediately.</p>
                <p>The product stays useful even if you do not want to adopt a full billing platform.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {highlights.map((highlight) => (
            <Card key={highlight} className="rounded-[1.5rem] border border-black/10 bg-white/90 py-0 dark:border-white/10 dark:bg-card/90">
              <CardContent className="flex items-center gap-3 px-5 py-5 text-sm leading-6 text-foreground">
                <CheckCircle2 className="size-5 shrink-0 text-primary" />
                <p>{highlight}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="rounded-[1.6rem] border border-black/10 bg-white/90 py-0 dark:border-white/10 dark:bg-card/90">
            <CardHeader className="px-5 py-5">
              <MessageCircleMore className="size-6 text-primary" />
              <CardTitle className="mt-4 text-lg font-semibold">WhatsApp first</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm leading-6 text-muted-foreground">
              Built around the real workflow in the UAE: send invoice PDFs directly in chat.
            </CardContent>
          </Card>
          <Card className="rounded-[1.6rem] border border-black/10 bg-white/90 py-0 dark:border-white/10 dark:bg-card/90">
            <CardHeader className="px-5 py-5">
              <Zap className="size-6 text-primary" />
              <CardTitle className="mt-4 text-lg font-semibold">30-second setup</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm leading-6 text-muted-foreground">
              Fill one form, preview live, and export. No onboarding funnel or account wall.
            </CardContent>
          </Card>
          <Card className="rounded-[1.6rem] border border-black/10 bg-white/90 py-0 dark:border-white/10 dark:bg-card/90">
            <CardHeader className="px-5 py-5">
              <CheckCircle2 className="size-6 text-primary" />
              <CardTitle className="mt-4 text-lg font-semibold">Free forever core</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm leading-6 text-muted-foreground">
              Core invoice creation, PDF generation, and sharing stay free for everyone.
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
