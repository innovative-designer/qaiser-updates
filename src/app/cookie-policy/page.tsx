import type { Metadata } from 'next';

import { ContentPage } from '@/components/shared/content-page';
import { cookiePolicy } from '@/content/legal/cookie-policy';
import { APP_NAME, APP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: cookiePolicy.description,
  alternates: {
    canonical: `${APP_URL}/cookie-policy`,
  },
  openGraph: {
    title: `Cookie Policy | ${APP_NAME}`,
    description: cookiePolicy.description,
    url: `${APP_URL}/cookie-policy`,
  },
};

export default function CookiePolicyPage() {
  return <ContentPage document={cookiePolicy} />;
}
