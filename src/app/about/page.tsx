import type { Metadata } from 'next';

import { ContentPage } from '@/components/shared/content-page';
import { aboutPage } from '@/content/site/about';
import { APP_NAME, APP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: aboutPage.description,
  alternates: {
    canonical: `${APP_URL}/about`,
  },
  openGraph: {
    title: `About | ${APP_NAME}`,
    description: aboutPage.description,
    url: `${APP_URL}/about`,
  },
};

export default function AboutPage() {
  return <ContentPage document={aboutPage} />;
}
