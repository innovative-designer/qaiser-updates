import type { Metadata } from 'next';
import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import { Button } from '@/components/ui/button';
import { APP_NAME, APP_URL } from '@/lib/constants';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact FreeInvoiceKit for support, legal, or privacy-related questions through the public support email.',
  alternates: {
    canonical: `${APP_URL}/contact`,
  },
  openGraph: {
    title: `Contact | ${APP_NAME}`,
    description:
      'Contact FreeInvoiceKit for support, legal, or privacy-related questions through the public support email.',
    url: `${APP_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-8 sm:py-10 lg:py-12">
        <PageSection width="wide" spacing="compact">
          <PageHero gridClassName="lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-5">
              <p className="section-kicker">Contact</p>
              <div className="space-y-4">
                <h1 className="text-foreground max-w-4xl">Contact FreeInvoiceKit</h1>
                <p className="text-muted-foreground max-w-3xl text-base leading-7 sm:text-lg">
                  For support, privacy, legal questions, or product feedback, email the address
                  below and include enough detail for a useful reply.
                </p>
              </div>
              <Button asChild size="lg">
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </Button>
            </div>

            <div className="grid gap-4">
              <InfoPanel tone="quiet">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                  Best for
                </p>
                <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-7">
                  <p>Support questions about invoice creation and PDF workflows</p>
                  <p>Privacy and legal requests related to this website</p>
                  <p>Product feedback or partnership outreach</p>
                </div>
              </InfoPanel>
              <InfoPanel tone="accent">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                  Response expectation
                </p>
                <p className="text-foreground mt-3 text-lg font-semibold tracking-tight">
                  Email-first support
                </p>
                <p className="text-muted-foreground mt-3 text-sm leading-7">
                  The support inbox is the main contact channel for FreeInvoiceKit. Include your
                  question, device, browser, and any invoice workflow issue if you need help
                  troubleshooting.
                </p>
              </InfoPanel>
            </div>
          </PageHero>
        </PageSection>
      </main>

      <Footer />
    </div>
  );
}
