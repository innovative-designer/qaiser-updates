import { post as malaysiaInvoiceFormatGuide } from '@/content/blog/malaysia-invoice-format-guide';
import { post as sendInvoiceWhatsApp } from '@/content/blog/send-invoice-whatsapp-30-seconds';
import { post as sendInvoicePdfSingaporeGuide } from '@/content/blog/send-invoice-pdf-singapore-guide';
import { post as sriLankaInvoiceGuide } from '@/content/blog/sri-lanka-invoice-guide';
import { post as thailandInvoiceFormatFreelancers } from '@/content/blog/thailand-invoice-format-freelancers';
import type { BlogPost } from '@/types/blog';

const posts: BlogPost[] = [
  sendInvoiceWhatsApp,
  thailandInvoiceFormatFreelancers,
  malaysiaInvoiceFormatGuide,
  sendInvoicePdfSingaporeGuide,
  sriLankaInvoiceGuide,
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
