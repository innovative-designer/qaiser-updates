import { SUPPORT_EMAIL } from '@/lib/site';

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: 'Is Free Invoice Kit really free?',
    answer:
      'Yes. The core invoice workflow is free, including invoice creation, PDF generation, and download or share actions.',
  },
  {
    question: 'Do I need an account to create an invoice?',
    answer: 'No. You can open the builder, fill in your invoice, and generate a PDF without creating an account.',
  },
  {
    question: 'Where are my invoices stored?',
    answer:
      'Saved business details are stored locally in your browser for reuse, and invoice drafts and history are stored in IndexedDB on the same device and browser profile.',
  },
  {
    question: 'Is it safe to add client information?',
    answer:
      'Use the same care you would with any web app that handles business information. Free Invoice Kit uses standard web protections, but you should only store information you are comfortable keeping in your browser.',
  },
  {
    question: 'Can I download my invoice as a PDF?',
    answer:
      'Yes. The builder generates a client-ready PDF invoice that you can download, save, and share.',
  },
  {
    question: 'Can I send invoices on WhatsApp?',
    answer:
      'Yes. On supported mobile devices, you can share the PDF through the native share sheet. If direct sharing is not available, you can download the PDF first and send it in WhatsApp yourself.',
  },
  {
    question: 'What currencies are supported?',
    answer:
      'Free Invoice Kit supports a range of commonly used currencies and can suggest a likely local currency when the builder first loads.',
  },
  {
    question: 'Does this replace accounting software?',
    answer:
      'No. Free Invoice Kit is a focused invoicing tool, not a full accounting platform and not a source of tax or legal advice.',
  },
  {
    question: 'Can I add tax and discounts?',
    answer:
      'Yes. You can add tax rates and discounts, and the builder recalculates totals automatically.',
  },
  {
    question: 'How can I contact support?',
    answer: `You can reach support, privacy, or legal contacts at ${SUPPORT_EMAIL}.`,
  },
];
