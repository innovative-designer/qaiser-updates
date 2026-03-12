import type { Metadata } from 'next';

import { PostHogProvider } from '@/components/providers/posthog-provider';

export const metadata: Metadata = {
  title: 'Invoice Viewer',
  description: 'View and download a shared invoice PDF.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SharedInvoiceViewerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PostHogProvider />
      {children}
    </>
  );
}
