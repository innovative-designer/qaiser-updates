import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CountryPage, buildCountryPageMetadata } from '@/components/shared/seo/country-page';
import { IndustryPage, buildIndustryPageMetadata } from '@/components/shared/seo/industry-page';
import { countryPages } from '@/content/seo/countries';
import { industryPages } from '@/content/seo/industries';
import type { CountryPageData, IndustryPageData } from '@/types/seo-page';

type PageEntry =
  | { type: 'industry'; data: IndustryPageData }
  | { type: 'country'; data: CountryPageData };

function findPage(slug: string): PageEntry | undefined {
  const industry = industryPages.find((p) => p.slug === slug);
  if (industry) return { type: 'industry', data: industry };

  const country = countryPages.find((p) => p.slug === slug);
  if (country) return { type: 'country', data: country };

  return undefined;
}

export function generateStaticParams() {
  return [
    ...industryPages.map((p) => ({ slug: p.slug })),
    ...countryPages.map((p) => ({ slug: p.slug })),
  ];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = findPage(slug);
  if (!entry) return {};

  return entry.type === 'industry'
    ? buildIndustryPageMetadata(entry.data)
    : buildCountryPageMetadata(entry.data);
}

export default async function InvoiceGeneratorPage({ params }: Props) {
  const { slug } = await params;
  const entry = findPage(slug);
  if (!entry) notFound();

  return entry.type === 'industry' ? (
    <IndustryPage page={entry.data} />
  ) : (
    <CountryPage page={entry.data} />
  );
}
