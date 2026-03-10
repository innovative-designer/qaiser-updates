import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice History',
  description: 'View, re-share, and manage your saved invoices.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
