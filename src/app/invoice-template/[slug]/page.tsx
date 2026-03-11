import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { TemplatePage, buildTemplatePageMetadata } from '@/components/shared/seo/template-page';
import { templatePages } from '@/content/seo/templates';

function findPage(slug: string) {
  return templatePages.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return templatePages.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) return {};

  return buildTemplatePageMetadata(page);
}

export default async function InvoiceTemplatePage({ params }: Props) {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) notFound();

  return <TemplatePage page={page} />;
}
