'use client';

import Link from 'next/link';
import { RefreshCw, WifiOff } from 'lucide-react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(244,246,241,0.96)_0%,rgba(248,246,240,0.92)_36%,rgba(250,248,244,1)_100%)]">
      <Header />

      <main className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-4xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <section className="w-full rounded-[2rem] border border-stone-200/80 bg-white/90 p-8 shadow-[0_30px_100px_-60px_rgba(24,34,48,0.55)] backdrop-blur sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-stone-100 text-stone-700">
              <WifiOff className="size-8" />
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">
              You&apos;re offline right now
            </h1>
            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              QuickBill cached the app shell, but this page needs a network connection. Once
              you&apos;re back online, your app will refresh and you can continue invoicing.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/create">Go to Invoice Creator</Link>
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="bg-white"
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
