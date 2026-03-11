import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, XCircle } from 'lucide-react';

import { InfoPanel } from '@/components/shared/info-panel';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import {
  SeoFaqSection,
  SeoPageShell,
  SeoRelatedLinksSection,
} from '@/components/shared/seo/seo-page-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { APP_NAME, APP_URL } from '@/lib/constants';
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata } from '@/lib/seo';
import type { ComparisonPageData } from '@/types/seo-page';

export function buildComparisonPageMetadata(page: ComparisonPageData): Metadata {
  return buildPageMetadata(page);
}

interface ComparisonPageProps {
  page: ComparisonPageData;
}

export function ComparisonPage({ page }: ComparisonPageProps) {
  const schemas = [
    buildFaqSchema(page.faqs),
    buildBreadcrumbSchema([
      { name: 'Home', item: APP_URL },
      { name: page.title.replace(` | ${APP_NAME}`, ''), item: `${APP_URL}${page.path}` },
    ]),
  ];

  return (
    <SeoPageShell data={schemas}>
      <PageSection width="wide" spacing="compact">
        <PageHero gridClassName="lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            <Badge>{page.badge}</Badge>
            <div className="space-y-4">
              <h1 className="text-foreground max-w-3xl">{page.h1}</h1>
              <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg">
                {page.intro}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={page.primaryCta.href}>
                  {page.primaryCta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              {page.secondaryCta ? (
                <Button asChild variant="outline" size="lg">
                  <Link href={page.secondaryCta.href}>{page.secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          </div>

          <InfoPanel tone={page.heroAside.tone ?? 'quiet'}>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
              {page.heroAside.eyebrow}
            </p>
            <div className="text-muted-foreground mt-5 space-y-4 text-sm leading-7">
              {page.heroAside.points.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </InfoPanel>
        </PageHero>
      </PageSection>

      <PageSection width="wide" spacing="compact">
        <Table className="min-w-[560px] text-left text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="text-foreground">Feature</TableHead>
              <TableHead className="text-primary">{APP_NAME}</TableHead>
              <TableHead>{page.competitorName}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {page.comparisonRows.map((row) => (
              <TableRow key={row.feature}>
                <TableCell className="text-foreground font-medium">{row.feature}</TableCell>
                <TableCell>
                  <span className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-3 py-1">
                    <CheckCircle2 className="size-4" />
                    {row.productValue}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="surface-quiet inline-flex items-center gap-2 rounded-[var(--radius-pill)] border px-3 py-1">
                    {row.competitorState === 'weak' ? (
                      <XCircle className="size-4 text-rose-500" />
                    ) : (
                      <Clock3 className="size-4 text-amber-500" />
                    )}
                    {row.competitorValue}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageSection>

      <PageSection width="wide" spacing="compact">
        <div className="grid gap-4 sm:grid-cols-2">
          {page.fitCards.map((card) => (
            <Card key={card.title} className="py-0">
              <CardHeader className="px-5 py-5">
                <CardTitle className="text-xl font-semibold tracking-[-0.02em]">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground px-5 pb-5 text-sm leading-7">
                {card.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>

      <SeoFaqSection faqs={page.faqs} title={page.faqTitle} />
      <SeoRelatedLinksSection links={page.relatedLinks} title={page.relatedTitle} />
    </SeoPageShell>
  );
}
