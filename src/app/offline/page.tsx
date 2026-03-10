'use client';

import Link from 'next/link';
import { RefreshCw, WifiOff } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="flex min-h-[calc(100vh-12rem)] items-center py-8 sm:py-10 lg:py-12">
        <PageSection width="narrow" spacing="none" className="w-full">
          <PageHero withGrid={false} className="w-full">
            <div className="mx-auto max-w-3xl text-center">
              <Badge>Offline Mode</Badge>
              <div className="surface-card text-primary mx-auto mt-6 flex size-18 items-center justify-center rounded-[var(--radius-card)] border">
                <WifiOff className="size-8" />
              </div>

              <h1 className="text-foreground mt-6">You&apos;re offline right now</h1>
              <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base leading-7 sm:text-lg">
                Free Invoice Kit cached the app shell, but this page still needs a connection. Once
                you&apos;re back online, refresh and continue invoicing where you left off.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button asChild size="lg">
                  <Link href="/create">Go to Invoice Creator</Link>
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="size-4" />
                  Try Again
                </Button>
              </div>
            </div>
          </PageHero>
        </PageSection>
      </main>

      <Footer />
    </div>
  );
}
