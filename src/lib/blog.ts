import { post as sendInvoiceWhatsApp } from '@/content/blog/send-invoice-whatsapp-30-seconds';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTimeMin: number;
  html: string;
};

const posts: BlogPost[] = [sendInvoiceWhatsApp];

export function getAllPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
