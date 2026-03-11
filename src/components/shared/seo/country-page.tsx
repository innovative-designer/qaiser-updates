import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { InfoPanel } from '@/components/shared/info-panel';
import { PageHero } from '@/components/shared/page-hero';
import { PageSection } from '@/components/shared/page-section';
import {
  SeoFaqSection,
  SeoPageShell,
  SeoRelatedLinksSection,
} from '@/components/shared/seo/seo-page-shell';
import { SeoIcon } from '@/components/shared/seo/seo-icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_URL } from '@/lib/constants';
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata } from '@/lib/seo';
import type { CountryPageData } from '@/types/seo-page';

export function buildCountryPageMetadata(page: CountryPageData): Metadata {
  return buildPageMetadata({
    ...page,
    languages: page.alternatesLanguages,
    locale: page.locale,
  });
}

interface CountryPageProps {
  page: CountryPageData;
}

export function CountryPage({ page }: CountryPageProps) {
  const schemas = [
    buildFaqSchema(page.faqs),
    buildBreadcrumbSchema([
      { name: 'Home', item: APP_URL },
      { name: page.title, item: `${APP_URL}${page.path}` },
    ]),
  ];

  return (
    <SeoPageShell data={schemas}>
      <PageSection width="wide" spacing="compact">
        <PageHero gridClassName="lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
        <div className="grid gap-4 sm:grid-cols-3">
          {page.highlightCards.map((card) => (
            <Card key={card.title} className="py-0">
              <CardHeader className="px-5 py-5">
                <SeoIcon name={card.icon} className="text-primary size-6" />
                <CardTitle className="mt-4 text-lg font-semibold">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground px-5 pb-5 text-sm leading-6">
                {card.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection width="wide" spacing="compact">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <InfoPanel>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
              {page.contextPanel.eyebrow}
            </p>
            <p className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em]">
              {page.contextPanel.title}
            </p>
            <div className="text-muted-foreground mt-3 space-y-3 text-sm leading-7">
              {page.contextPanel.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel tone={page.nuancePanel.tone ?? 'quiet'}>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
              {page.nuancePanel.eyebrow}
            </p>
            <p className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em]">
              {page.nuancePanel.title}
            </p>
            <div className="text-muted-foreground mt-3 space-y-3 text-sm leading-7">
              {page.nuancePanel.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </InfoPanel>
        </div>
      </PageSection>

      <PageSection width="wide" spacing="compact">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <InfoPanel>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
              {page.valuePanel.eyebrow}
            </p>
            <p className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em]">
              {page.valuePanel.title}
            </p>
            <div className="text-muted-foreground mt-3 space-y-3 text-sm leading-7">
              {page.valuePanel.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel tone={page.ctaPanel.tone ?? 'accent'}>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
              {page.ctaPanel.eyebrow}
            </p>
            <p className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em]">
              {page.ctaPanel.title}
            </p>
            <div className="text-muted-foreground mt-3 space-y-3 text-sm leading-7">
              {page.ctaPanel.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Button asChild size="lg" className="mt-6">
              <Link href={page.ctaPanel.buttonHref}>
                {page.ctaPanel.buttonLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </InfoPanel>
        </div>
      </PageSection>

      <SeoFaqSection faqs={page.faqs} title={page.faqTitle} />
      <SeoRelatedLinksSection links={page.relatedLinks} title={page.relatedTitle} />
    </SeoPageShell>
  );
}
