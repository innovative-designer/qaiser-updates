import type { Metadata } from 'next';

import { PostHogProvider } from '@/components/providers/posthog-provider';

export const metadata: Metadata = {
  title: 'Invoice History',
  description: 'View, re-share, and manage your saved invoices.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PostHogProvider />
      {children}
    </>
  );
}
