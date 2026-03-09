import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Clock3, Sparkles } from 'lucide-react';

import { getAllPosts } from '@/lib/blog';
import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Blog — Free Invoice Kit',
  description: 'Tips and guides on invoicing, freelancing, and getting paid faster.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(65,95,196,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(13,148,136,0.12),transparent_30%)]" />

        <div className="relative mx-auto max-w-6xl space-y-10">
          <section className="overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.97),rgba(246,242,233,0.93))] p-6 shadow-[0_30px_80px_-50px_rgba(28,33,55,0.38)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-5">
              <Badge className="rounded-full bg-primary/10 px-3 py-1 text-[11px] tracking-[0.24em] uppercase text-primary hover:bg-primary/10">
                Editorial Dispatch
              </Badge>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                  Short reads for freelancers who want to invoice faster and get paid cleaner.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Practical guides on invoices, WhatsApp billing, pricing habits, and getting rid
                  of admin drag without adopting a heavy billing stack.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full px-6">
                  <Link href="/create">
                    Create Invoice
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-6">
                  <Link href="/send-invoice-whatsapp">Learn the WhatsApp workflow</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.6rem] border border-black/10 bg-white/80 p-5">
                <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                  Tone
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">Fast, useful, no fluff</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Each article is written to help a solo operator make one better billing decision.
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-primary/10 bg-primary/5 p-5">
                <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                  What you get
                </p>
                <div className="mt-3 space-y-2 text-sm leading-6 text-foreground">
                  <p>Invoice templates in plain language</p>
                  <p>WhatsApp-first billing tactics</p>
                  <p>Freelancer-friendly payment advice</p>
                </div>
              </div>
            </div>
          </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.5rem] border border-black/10 bg-white/90 p-5 shadow-[0_20px_50px_-40px_rgba(28,33,55,0.35)]">
            <Sparkles className="size-5 text-primary" />
            <p className="mt-4 text-lg font-semibold text-foreground">Actionable writing</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Focused guidance for real invoicing situations, not generic business filler.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-black/10 bg-white/90 p-5 shadow-[0_20px_50px_-40px_rgba(28,33,55,0.35)]">
            <Clock3 className="size-5 text-primary" />
            <p className="mt-4 text-lg font-semibold text-foreground">Quick to scan</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Built for people reading between calls, chats, and client work on their phones.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-black/10 bg-white/90 p-5 shadow-[0_20px_50px_-40px_rgba(28,33,55,0.35)]">
            <ArrowRight className="size-5 text-primary" />
            <p className="mt-4 text-lg font-semibold text-foreground">Linked back to action</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Every page keeps the path back to creating an invoice clear and immediate.
            </p>
          </div>
          </section>

          <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                Latest Articles
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
                Billing notes worth keeping open in another tab
              </h2>
            </div>
          </div>

          <div className="grid gap-4">
            {posts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                <Card className="rounded-[1.75rem] border border-black/10 bg-white/90 py-0 transition-transform duration-200 hover:-translate-y-0.5">
                  <CardHeader className="gap-3 px-5 py-5 sm:px-6 sm:py-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-[11px] tracking-[0.2em] uppercase text-primary"
                      >
                        Note {String(index + 1).padStart(2, '0')}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}{' '}
                        · {post.readingTimeMin} min read
                      </span>
                    </div>
                    <CardTitle className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="max-w-3xl text-sm leading-7 sm:text-base">
                      {post.description}
                    </CardDescription>
                    <div className="pt-2 text-sm font-medium text-primary">Read article</div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
