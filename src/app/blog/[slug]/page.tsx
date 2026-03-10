import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
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

      <main className="py-8 sm:py-10 lg:py-12">
        <PageSection width="narrow" spacing="compact">
          <PageHero withGrid={false}>
            <Button variant="ghost" asChild size="sm" className="-ml-2">
              <Link href="/blog">
                <ArrowLeft className="size-4" />
                Back to Blog
              </Link>
            </Button>

            <div className="mt-4 space-y-5">
              <Badge>Free Invoice Kit Journal</Badge>
              <div className="space-y-3">
                <h1 className="text-foreground max-w-4xl">{post.title}</h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  · {post.readingTimeMin} min read
                </p>
              </div>
              <p className="text-muted-foreground max-w-3xl text-base leading-7 sm:text-lg">
                {post.description}
              </p>
            </div>
          </PageHero>
        </PageSection>

        <PageSection width="narrow" spacing="compact">
          <article
            className="surface-card prose prose-neutral dark:prose-invert [&_blockquote]:border-primary/40 [&_blockquote]:bg-primary/5 [&_ul>li]:marker:text-primary max-w-none rounded-[var(--radius-shell)] border px-5 py-8 text-[15px] leading-8 sm:px-8 lg:px-12 lg:py-12 [&_blockquote]:rounded-r-[var(--radius-card)] [&_blockquote]:border-l-4 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.03em] [&_h3]:text-xl [&_h3]:font-semibold"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </PageSection>

        <PageSection width="narrow" spacing="compact">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <InfoPanel>
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Why this matters
              </p>
              <p className="text-muted-foreground mt-3 text-base leading-7">
                Free Invoice Kit is built around short, clear billing flows. The same idea applies
                to the advice here: fewer steps, fewer delays, better follow-through.
              </p>
            </InfoPanel>
            <InfoPanel tone="accent">
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Ready to apply it?
              </p>
              <p className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em]">
                Create an invoice and send it while the conversation is still active.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/create">
                  Create Invoice
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </InfoPanel>
          </div>
        </PageSection>
      </main>

      <Footer />
    </div>
  );
}
