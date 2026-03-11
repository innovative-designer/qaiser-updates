import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ComparisonPage, buildComparisonPageMetadata } from '@/components/shared/seo/comparison-page';
import { comparisonPages } from '@/content/seo/comparisons';

function findPage(slug: string) {
  return comparisonPages.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return comparisonPages.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) return {};

  return buildComparisonPageMetadata(page);
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) notFound();

  return <ComparisonPage page={page} />;
}
