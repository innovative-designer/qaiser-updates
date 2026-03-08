import { getAllPosts } from '@/lib/blog';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — QuickBill',
  description: 'Tips and guides on invoicing, freelancing, and getting paid faster.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Blog</h1>
      <p className="text-muted-foreground mb-8">
        Tips on invoicing, freelancing, and getting paid faster.
      </p>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardDescription>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  · {post.readingTimeMin} min read
                </CardDescription>
                <p className="text-muted-foreground mt-1 text-sm">{post.description}</p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
