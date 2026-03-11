import type { Metadata } from 'next';

import { PostHogProvider } from '@/components/providers/posthog-provider';

export const metadata: Metadata = {
  title: 'Create Invoice',
  description:
    'Create a professional PDF invoice and send it on WhatsApp in 30 seconds. Free, no signup required.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PostHogProvider />
      {children}
    </>
  );
}
