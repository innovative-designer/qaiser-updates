import type { Metadata } from 'next';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { JsonLd } from '@/components/shared/json-ld';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import { faqItems } from '@/content/site/faq';
import { APP_NAME, APP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about FreeInvoiceKit, including storage, pricing, PDF generation, WhatsApp workflows, and support.',
  alternates: {
    canonical: `${APP_URL}/faq`,
  },
  openGraph: {
    title: `FAQ | ${APP_NAME}`,
    description:
      'Answers to common questions about FreeInvoiceKit, including storage, pricing, PDF generation, WhatsApp workflows, and support.',
    url: `${APP_URL}/faq`,
  },
};

export default function FaqPage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((faq) => ({
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

      <main className="py-8 sm:py-10 lg:py-12">
        <PageSection width="wide" spacing="compact">
          <PageHero gridClassName="lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-5">
              <p className="section-kicker">FAQ</p>
              <div className="space-y-4">
                <h1 className="text-foreground max-w-4xl">
                  Common questions about creating and sending invoices with FreeInvoiceKit
                </h1>
                <p className="text-muted-foreground max-w-3xl text-base leading-7 sm:text-lg">
                  These answers cover pricing, storage, PDF generation, WhatsApp sharing, browser
                  safety, and support so you know how the invoice workflow works before you start.
                </p>
              </div>
            </div>

            <InfoPanel tone="quiet">
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Quick topics
              </p>
              <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-7">
                <p>Where invoice data is stored</p>
                <p>How PDF download and sharing work</p>
                <p>What the product is built to do</p>
              </div>
            </InfoPanel>
          </PageHero>
        </PageSection>

        <PageSection width="narrow" spacing="compact">
          <div className="grid gap-4">
            {faqItems.map((faq) => (
              <InfoPanel key={faq.question} className="p-5">
                <h2 className="text-foreground text-lg font-semibold tracking-tight">
                  {faq.question}
                </h2>
                <p className="text-muted-foreground mt-3 text-sm leading-7">{faq.answer}</p>
              </InfoPanel>
            ))}
          </div>
        </PageSection>
      </main>

      <Footer />
    </div>
  );
}
