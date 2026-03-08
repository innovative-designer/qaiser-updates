import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice History',
  description: 'View, re-share, and manage your saved invoices.',
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
