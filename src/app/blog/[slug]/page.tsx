import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — QuickBill`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild size="sm" className="mb-4 -ml-2">
          <Link href="/blog">← Back to Blog</Link>
        </Button>
        <h1 className="mb-3 text-3xl font-bold leading-tight">{post.title}</h1>
        <p className="text-muted-foreground text-sm">
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          · {post.readingTimeMin} min read
        </p>
      </div>

      <article
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <div className="mt-12 rounded-lg border p-6 text-center">
        <p className="mb-4 text-lg font-semibold">Ready to send your first invoice on WhatsApp?</p>
        <Button asChild size="lg">
          <Link href="/create">Create Invoice — It&apos;s Free</Link>
        </Button>
      </div>
    </main>
  );
}
