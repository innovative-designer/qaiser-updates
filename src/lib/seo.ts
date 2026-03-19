import type { Metadata } from 'next';

import { APP_NAME, APP_URL } from '@/lib/constants';

export type JsonLdObject = Record<string, unknown>;

/** Optional Organization schema options (logo, sameAs, contactPoint). */
export interface OrganizationSchemaOptions {
  contactPoint?: {
    contactType?: string;
    email?: string;
    url?: string;
  };
  logo?: string;
  sameAs?: string[];
}

/** Optional WebSite schema options (e.g. for future searchAction). */
export interface WebSiteSchemaOptions {
  description?: string;
}

export function buildOrganizationSchema(options?: OrganizationSchemaOptions): JsonLdObject {
  const logoUrl = options?.logo ? toAbsoluteUrl(options.logo) : `${APP_URL}/icon-192.png`;
  const org: JsonLdObject = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: APP_NAME,
    url: APP_URL,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
    },
  };
  if (options?.sameAs?.length) {
    org.sameAs = options.sameAs;
  }
  if (options?.contactPoint) {
    org.contactPoint = {
      '@type': 'ContactPoint',
      contactType: options.contactPoint.contactType ?? 'customer service',
      ...(options.contactPoint.email ? { email: options.contactPoint.email } : {}),
      ...(options.contactPoint.url ? { url: options.contactPoint.url } : {}),
    };
  }
  return org;
}

export function buildWebSiteSchema(options?: WebSiteSchemaOptions): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: APP_NAME,
    url: APP_URL,
    ...(options?.description ? { description: options.description } : {}),
    publisher: {
      '@type': 'Organization',
      name: APP_NAME,
      url: APP_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/icon-192.png`,
      },
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HowToStepItem {
  name: string;
  text: string;
  url?: string;
}

interface BuildArticleSchemaOptions {
  description: string;
  image?: string;
  modifiedAt?: string;
  publishedAt: string;
  title: string;
  url: string;
}

interface BuildHowToSchemaOptions {
  description: string;
  name: string;
  steps: HowToStepItem[];
  totalTime?: string;
}

interface BuildPageMetadataOptions {
  description: string;
  keywords?: string[];
  languages?: Record<string, string>;
  locale?: string;
  openGraphImage?: string;
  path: string;
  title: string;
}

export function toAbsoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  return `${APP_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function buildFaqSchema(items: FaqItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildHowToSchema({
  description,
  name,
  steps,
  totalTime,
}: BuildHowToSchemaOptions): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      ...(step.url ? { url: step.url } : {}),
    })),
  };
}

export function buildArticleSchema({
  description,
  image,
  modifiedAt,
  publishedAt,
  title,
  url,
}: BuildArticleSchemaOptions): JsonLdObject {
  const resolvedImage = image ? toAbsoluteUrl(image) : `${APP_URL}/opengraph-image`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: modifiedAt ?? publishedAt,
    author: {
      '@type': 'Organization',
      name: APP_NAME,
      url: APP_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: APP_NAME,
      url: APP_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/icon-192.png`,
      },
    },
    image: [resolvedImage],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function buildPageMetadata({
  description,
  keywords,
  languages,
  locale,
  openGraphImage,
  path,
  title,
}: BuildPageMetadataOptions): Metadata {
  const url = toAbsoluteUrl(path);
  const imageUrl = openGraphImage ? toAbsoluteUrl(openGraphImage) : `${APP_URL}/opengraph-image`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: APP_NAME,
      ...(locale ? { locale } : {}),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
