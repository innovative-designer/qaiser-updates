import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, LifeBuoy, Newspaper } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page Not Found | Free Invoice Kit',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-8 sm:py-10 lg:py-12">
        <PageSection width="narrow" spacing="compact">
          <PageHero withGrid={false}>
            <div className="space-y-5">
              <p className="section-kicker">404</p>
              <div className="space-y-4">
                <h1 className="text-foreground max-w-3xl">
                  The page you tried to open is not here.
                </h1>
                <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg">
                  Use one of the main routes below to get back to the invoice tool, the learning
                  content, or support.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/">
                    Go home
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/create">Open invoice creator</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <InfoPanel className="p-5">
                <Newspaper className="text-primary size-5" />
                <p className="text-foreground mt-4 text-lg font-semibold">Read the blog</p>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  Visit the learning content if you were looking for invoicing guidance.
                </p>
                <Link href="/blog" className="text-primary mt-4 inline-flex text-sm font-medium">
                  Go to blog
                </Link>
              </InfoPanel>
              <InfoPanel className="p-5">
                <LifeBuoy className="text-primary size-5" />
                <p className="text-foreground mt-4 text-lg font-semibold">Need help?</p>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  Use the contact page if you expected something else to be here.
                </p>
                <Link href="/contact" className="text-primary mt-4 inline-flex text-sm font-medium">
                  Contact support
                </Link>
              </InfoPanel>
            </div>
          </PageHero>
        </PageSection>
      </main>

      <Footer />
    </div>
  );
}
