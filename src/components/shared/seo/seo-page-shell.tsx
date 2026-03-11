import Link from 'next/link';
import type * as React from 'react';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { InfoPanel } from '@/components/shared/info-panel';
import { JsonLd } from '@/components/shared/json-ld';
import { PageSection } from '@/components/shared/page-section';
import type { FaqItem, JsonLdObject } from '@/lib/seo';

export type InfoPanelTone = 'default' | 'quiet' | 'accent';

interface SeoPageShellProps {
  children: React.ReactNode;
  data: JsonLdObject | JsonLdObject[];
}

interface SeoSectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

interface SeoFaqSectionProps {
  faqs: FaqItem[];
  title: string;
}

interface SeoRelatedLinksSectionProps {
  links: {
    href: string;
    title: string;
    description: string;
    ctaLabel?: string;
  }[];
  title: string;
}

export function SeoPageShell({ children, data }: SeoPageShellProps) {
  return (
    <div className="min-h-screen">
      <JsonLd data={data} />

      <Header />
      <main className="py-8 sm:py-10 lg:py-12">{children}</main>
      <Footer />
    </div>
  );
}

export function SeoSectionHeading({ eyebrow, title, description }: SeoSectionHeadingProps) {
  return (
    <div>
      <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
        {eyebrow}
      </p>
      <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-7 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function SeoFaqSection({ faqs, title }: SeoFaqSectionProps) {
  return (
    <PageSection width="wide" spacing="compact">
      <SeoSectionHeading eyebrow="FAQ" title={title} />
      <div className="mt-4 grid gap-4">
        {faqs.map((faq) => (
          <InfoPanel key={faq.question} className="p-5">
            <h3 className="text-foreground text-lg font-semibold">{faq.question}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-7">{faq.answer}</p>
          </InfoPanel>
        ))}
      </div>
    </PageSection>
  );
}

export function SeoRelatedLinksSection({ links, title }: SeoRelatedLinksSectionProps) {
  return (
    <PageSection width="wide" spacing="compact">
      <SeoSectionHeading eyebrow="Related Guides" title={title} />
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <InfoPanel className="h-full p-5 transition-transform duration-200 hover:-translate-y-0.5">
              <h3 className="text-foreground text-lg font-semibold">{item.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-7">{item.description}</p>
              <div className="text-primary mt-4 text-sm font-medium">
                {item.ctaLabel ?? 'Open guide'}
              </div>
            </InfoPanel>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
