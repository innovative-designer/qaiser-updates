import type { Metadata } from 'next';

import { ContentPage } from '@/components/shared/content-page';
import { privacyPolicy } from '@/content/legal/privacy-policy';
import { APP_NAME, APP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: privacyPolicy.description,
  alternates: {
    canonical: `${APP_URL}/privacy-policy`,
  },
  openGraph: {
    title: `Privacy Policy | ${APP_NAME}`,
    description: privacyPolicy.description,
    url: `${APP_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return <ContentPage document={privacyPolicy} />;
}
