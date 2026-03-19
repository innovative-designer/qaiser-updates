import type { Metadata } from 'next';

import { ContentPage } from '@/components/shared/content-page';
import { JsonLd } from '@/components/shared/json-ld';
import { aboutPage } from '@/content/site/about';
import {
  APP_NAME,
  APP_URL,
  ORGANIZATION_CONTACT_POINT,
  ORGANIZATION_SAME_AS,
} from '@/lib/constants';
import { buildOrganizationSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: `About ${APP_NAME} | Free Invoice Generator for Freelancers & Small Business`,
  description:
    'Why Free Invoice Kit exists: a free invoice generator built for freelancers and small service businesses who need fast, mobile-friendly invoicing without a heavyweight billing stack.',
  alternates: {
    canonical: `${APP_URL}/about`,
  },
  openGraph: {
    title: `About ${APP_NAME} | Free Invoice Generator for Freelancers & Small Business`,
    description:
      'Why Free Invoice Kit exists: fast PDF invoicing for freelancers and small business, without signup or accounting software.',
    url: `${APP_URL}/about`,
  },
};

export default function AboutPage() {
  const orgSchema = buildOrganizationSchema({
    ...(ORGANIZATION_SAME_AS.length > 0 ? { sameAs: ORGANIZATION_SAME_AS } : {}),
    ...(ORGANIZATION_CONTACT_POINT ? { contactPoint: ORGANIZATION_CONTACT_POINT } : {}),
  });

  return (
    <>
      <JsonLd data={orgSchema} />
      <ContentPage document={aboutPage} />
    </>
  );
}
