export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMin: number;
  html: string;
  keywords?: string[];
  ogImage?: string;
}
