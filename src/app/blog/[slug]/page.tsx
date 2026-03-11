import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { JsonLd } from '@/components/shared/json-ld';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { APP_NAME, APP_URL } from '@/lib/constants';
import { buildArticleSchema, buildBreadcrumbSchema, toAbsoluteUrl } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

const relatedResources = [
  {
    href: '/send-invoice-whatsapp',
    title: 'WhatsApp Invoice Workflow',
    description: 'See the step-by-step flow for generating a PDF invoice and sending it in chat.',
  },
  {
    href: '/free-invoice-maker-freelancers',
    title: 'Free Invoice Maker For Freelancers',
    description: 'Explore the fastest invoice setup for solo operators who want less admin drag.',
  },
  {
    href: '/blog',
    title: 'More Invoicing Guides',
    description: 'Browse the rest of the blog for invoicing, payment, and workflow advice.',
  },
];

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const canonicalUrl = `${APP_URL}/blog/${post.slug}`;
  const imageUrl = toAbsoluteUrl(post.ogImage ?? '/og-image.png');

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      siteName: APP_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} — ${APP_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const canonicalUrl = `${APP_URL}/blog/${post.slug}`;
  const schemas = [
    buildArticleSchema({
      title: post.title,
      description: post.description,
      publishedAt: post.publishedAt,
      modifiedAt: post.updatedAt,
      url: canonicalUrl,
      image: post.ogImage,
    }),
    buildBreadcrumbSchema([
      { name: 'Home', item: APP_URL },
      { name: 'Blog', item: `${APP_URL}/blog` },
      { name: post.title, item: canonicalUrl },
    ]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd data={schemas} />

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

        <PageSection width="narrow" spacing="compact">
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                Related Resources
              </p>
              <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                More guides you might find useful
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {relatedResources.map((resource) => (
                <Link key={resource.href} href={resource.href} className="block">
                  <InfoPanel className="h-full p-5 transition-transform duration-200 hover:-translate-y-0.5">
                    <h3 className="text-foreground text-lg font-semibold">{resource.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-7">
                      {resource.description}
                    </p>
                    <div className="text-primary mt-4 text-sm font-medium">Open resource</div>
                  </InfoPanel>
                </Link>
              ))}
            </div>
          </div>
        </PageSection>
      </main>

      <Footer />
    </div>
  );
}
