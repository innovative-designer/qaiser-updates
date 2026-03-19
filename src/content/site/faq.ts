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
  {
    question: 'What should I include on an invoice?',
    answer:
      'A clear invoice usually includes: your business name and contact details, the client’s name and contact details, invoice number and date, due date, a list of line items (description, quantity, rate, amount), subtotal, any tax or discount, and the total amount due. Free Invoice Kit’s builder includes all of these fields so you can create a professional invoice format.',
  },
  {
    question: 'What is a standard invoice format?',
    answer:
      'A standard invoice format has a header (your business and “Invoice”), bill-to section (client details), invoice number and dates, a table of line items with description, quantity, rate, and amount, and a footer with subtotal, tax, discount, and total. Free Invoice Kit generates a PDF in this format so your invoices look professional and are easy for clients to understand.',
  },
  {
    question: 'Does Free Invoice Kit work on iPhone, Android, PC, and Mac?',
    answer:
      'Yes. Free Invoice Kit works in any modern browser on desktop and mobile. You can create and export invoice PDFs from a laptop, PC, Mac, iPhone, Android phone, or tablet—no separate app required.',
  },
];
