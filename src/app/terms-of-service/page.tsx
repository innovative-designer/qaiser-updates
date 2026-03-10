import type { Metadata } from 'next';

import { ContentPage } from '@/components/shared/content-page';
import { termsOfService } from '@/content/legal/terms-of-service';
import { APP_NAME, APP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: termsOfService.description,
  alternates: {
    canonical: `${APP_URL}/terms-of-service`,
  },
  openGraph: {
    title: `Terms of Service | ${APP_NAME}`,
    description: termsOfService.description,
    url: `${APP_URL}/terms-of-service`,
  },
};

export default function TermsOfServicePage() {
  return <ContentPage document={termsOfService} />;
}
