import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline',
  description: 'Offline fallback page for Free Invoice Kit.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
