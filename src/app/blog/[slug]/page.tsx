import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Free Invoice Kit`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(65,95,196,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(13,148,136,0.12),transparent_28%)]" />

        <div className="relative mx-auto max-w-5xl space-y-8">
          <section className="rounded-[2rem] border border-black/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(247,243,234,0.93))] p-6 shadow-[0_30px_80px_-50px_rgba(28,33,55,0.38)] sm:p-8 lg:p-10">
          <Button variant="ghost" asChild size="sm" className="-ml-2 h-11 rounded-full px-4">
            <Link href="/blog">
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="mt-4 space-y-5">
            <Badge className="rounded-full bg-primary/10 px-3 py-1 text-[11px] tracking-[0.24em] uppercase text-primary hover:bg-primary/10">
              Free Invoice Kit Journal
            </Badge>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                {post.title}
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                · {post.readingTimeMin} min read
              </p>
            </div>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              {post.description}
            </p>
          </div>
          </section>

          <article
            className="prose prose-neutral max-w-none rounded-[2rem] border border-black/10 bg-white/95 px-5 py-8 text-[15px] leading-8 shadow-[0_24px_60px_-45px_rgba(28,33,55,0.28)] sm:px-8 lg:px-12 lg:py-12 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.03em] [&_h3]:text-xl [&_h3]:font-semibold [&_blockquote]:rounded-r-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:bg-primary/5 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_ul>li]:marker:text-primary"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-black/10 bg-white/90 p-6">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              Why this matters
            </p>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Free Invoice Kit is built around short, clear billing flows. The same idea applies to the
              advice here: fewer steps, fewer delays, better follow-through.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-6">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              Ready to apply it?
            </p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
              Create an invoice and send it while the conversation is still active.
            </p>
            <Button asChild size="lg" className="mt-6 h-12 rounded-full px-6">
              <Link href="/create">
                Create Invoice
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
