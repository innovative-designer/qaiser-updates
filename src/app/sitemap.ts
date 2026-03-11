import type { MetadataRoute } from 'next';

import { APP_URL } from '@/lib/constants';
import { getAllPosts } from '@/lib/blog';
import { comparisonPages } from '@/content/seo/comparisons';
import { countryPages } from '@/content/seo/countries';
import { industryPages } from '@/content/seo/industries';
import { templatePages } from '@/content/seo/templates';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticLastModified = new Date('2026-03-10T00:00:00.000Z');
  const contentDrivenPages = [
    ...comparisonPages.map((page) => ({
      url: `${APP_URL}${page.path}`,
      lastModified: new Date(page.lastModified),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...countryPages.map((page) => ({
      url: `${APP_URL}${page.path}`,
      lastModified: new Date(page.lastModified),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...industryPages.map((page) => ({
      url: `${APP_URL}${page.path}`,
      lastModified: new Date(page.lastModified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...templatePages.map((page) => ({
      url: `${APP_URL}${page.path}`,
      lastModified: new Date(page.lastModified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      url: APP_URL,
      lastModified: staticLastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${APP_URL}/about`,
      lastModified: staticLastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${APP_URL}/contact`,
      lastModified: staticLastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${APP_URL}/faq`,
      lastModified: staticLastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${APP_URL}/privacy-policy`,
      lastModified: staticLastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${APP_URL}/terms-of-service`,
      lastModified: staticLastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${APP_URL}/cookie-policy`,
      lastModified: staticLastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${APP_URL}/send-invoice-whatsapp`,
      lastModified: staticLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${APP_URL}/free-invoice-maker-freelancers`,
      lastModified: staticLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${APP_URL}/blog`,
      lastModified: staticLastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...contentDrivenPages,
    ...getAllPosts().map((post) => ({
      url: `${APP_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
