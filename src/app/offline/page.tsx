'use client';

import Link from 'next/link';
import { RefreshCw, WifiOff } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(249,247,242,1)_0%,rgba(255,255,255,1)_42%,rgba(240,247,245,1)_100%)]">
      <Header />

      <main className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-5xl items-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="w-full overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(247,243,234,0.93))] p-6 shadow-[0_30px_80px_-50px_rgba(28,33,55,0.38)] sm:p-8 lg:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="rounded-full bg-primary/10 px-3 py-1 text-[11px] tracking-[0.24em] uppercase text-primary hover:bg-primary/10">
              Offline Mode
            </Badge>
            <div className="mx-auto mt-6 flex size-18 items-center justify-center rounded-[1.5rem] bg-white/80 text-primary shadow-[0_18px_40px_-30px_rgba(28,33,55,0.35)]">
              <WifiOff className="size-8" />
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
              You&apos;re offline right now
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Free Invoice Kit cached the app shell, but this page still needs a connection. Once
              you&apos;re back online, refresh and continue invoicing where you left off.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button asChild size="lg" className="h-12 rounded-full px-6">
                <Link href="/create">Go to Invoice Creator</Link>
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="h-12 rounded-full px-6"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="size-4" />
                Try Again
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
