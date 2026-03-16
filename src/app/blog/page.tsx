import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Clock3, Sparkles } from 'lucide-react';

import { JsonLd } from '@/components/shared/json-ld';
import { getAllPosts } from '@/lib/blog';
import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { APP_URL } from '@/lib/constants';
import { buildBreadcrumbSchema } from '@/lib/seo';

const popularPaths = [
  {
    href: '/invoice-generator/graphic-designers',
    title: 'Graphic designer invoices',
    description: 'Profession-focused billing guidance for design work, revisions, and retainers.',
  },
  {
    href: '/compare/freshbooks',
    title: 'FreshBooks alternative',
    description: 'A lightweight invoice route for freelancers who do not need a bigger software stack.',
  },
  {
    href: '/invoice-generator/india',
    title: 'India invoice generator',
    description: 'Country-specific guidance for INR invoicing and faster client handoff.',
  },
  {
    href: '/invoice-template/freelancer',
    title: 'Freelancer invoice template',
    description: 'Template-structured guidance that still leads into the real invoice builder.',
  },
];

export const metadata: Metadata = {
  title: 'Invoicing Tips for Freelancers',
  description:
    'Guides on sending invoices faster, WhatsApp billing, and getting paid without heavy invoicing software.',
  keywords: [
    'invoicing tips for freelancers',
    'how to send invoice on whatsapp',
    'freelancer invoice guide',
    'invoice template guide',
    'get paid faster freelance',
  ],
  alternates: {
    canonical: `${APP_URL}/blog`,
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', item: APP_URL },
          { name: 'Blog', item: `${APP_URL}/blog` },
        ])}
      />

      <Header />

      <main className="py-8 sm:py-10 lg:py-12">
        <PageSection width="wide" spacing="compact">
          <PageHero gridClassName="lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-5">
              <Badge>Invoice Guides</Badge>
              <div className="space-y-4">
                <h1 className="text-foreground max-w-3xl">
                  Invoice guides for freelancers who want to get paid with less friction.
                </h1>
                <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg">
                  Practical articles on invoice basics, WhatsApp billing, PDF sharing, and faster
                  client follow-up without moving into a heavy billing stack.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/create">
                    Create Invoice
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/send-invoice-whatsapp">Learn the WhatsApp workflow</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <InfoPanel tone="quiet" className="p-5">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                  What you&apos;ll find
                </p>
                <p className="text-foreground mt-3 text-lg font-semibold">
                  Clear advice you can use right away
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  Each article is written for freelancers and small service businesses that need a
                  faster, cleaner invoicing workflow.
                </p>
              </InfoPanel>
              <InfoPanel tone="accent" className="p-5">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                  Popular topics
                </p>
                <div className="text-foreground mt-3 space-y-2 text-sm leading-6">
                  <p>How to send invoices through WhatsApp</p>
                  <p>Invoice templates explained in plain language</p>
                  <p>Tips for billing clients faster</p>
                </div>
              </InfoPanel>
            </div>
          </PageHero>
        </PageSection>

        <PageSection width="wide" spacing="compact">
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoPanel className="p-5">
              <Sparkles className="text-primary size-5" />
              <p className="text-foreground mt-4 text-lg font-semibold">Actionable writing</p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Focused guidance for real invoicing situations, not generic business filler.
              </p>
            </InfoPanel>
            <InfoPanel className="p-5">
              <Clock3 className="text-primary size-5" />
              <p className="text-foreground mt-4 text-lg font-semibold">Quick to scan</p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Built for people reading between calls, chats, and client work on their phones.
              </p>
            </InfoPanel>
            <InfoPanel className="p-5">
              <ArrowRight className="text-primary size-5" />
              <p className="text-foreground mt-4 text-lg font-semibold">Linked back to action</p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Every page keeps the path back to creating an invoice clear and immediate.
              </p>
            </InfoPanel>
          </div>
        </PageSection>

        <PageSection width="wide" spacing="compact">
          <div>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
              Popular Paths
            </p>
            <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Explore more invoicing resources
            </h2>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {popularPaths.map((item) => (
              <Link key={item.href} href={item.href} className="block">
                <Card className="py-0 transition-transform duration-200 hover:-translate-y-0.5">
                  <CardHeader className="gap-3 px-5 py-5 sm:px-6 sm:py-6">
                    <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-7">
                      {item.description}
                    </CardDescription>
                    <div className="text-primary pt-2 text-sm font-medium">Open page</div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </PageSection>

        <PageSection width="wide" spacing="compact">
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                  Latest Articles
                </p>
                <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  Recent articles on invoicing and getting paid
                </h2>
              </div>
            </div>

            <div className="grid gap-4">
              {posts.map((post, index) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                  <Card className="py-0 transition-transform duration-200 hover:-translate-y-0.5">
                    <CardHeader className="gap-3 px-5 py-5 sm:px-6 sm:py-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className="border-primary/20 bg-primary/10 text-primary px-3 py-1"
                        >
                          Note {String(index + 1).padStart(2, '0')}
                        </Badge>
                        <span className="text-muted-foreground text-xs">
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
                      <div className="text-primary pt-2 text-sm font-medium">Read article</div>
                    </CardHeader>
                  </Card>
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
