import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Invoice',
  description:
    'Create a professional PDF invoice and send it on WhatsApp in 30 seconds. Free, no signup required.',
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
