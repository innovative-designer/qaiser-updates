export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: 'Is Free Invoice Kit really free?',
    answer:
      'The core invoice workflow is free. You can create invoices, generate PDF output, and use the tool without going through a signup wall.',
  },
  {
    question: 'Do I need an account to create an invoice?',
    answer: 'No. The current workflow is designed to work without mandatory account creation.',
  },
  {
    question: 'Where are my invoices stored?',
    answer:
      'Invoice data can be stored locally in your browser using technologies such as localStorage and IndexedDB. Some file-related features may also use backend services when configured.',
  },
  {
    question: 'Is it safe to add client information?',
    answer:
      'You should only enter information you are comfortable handling through a normal web app workflow. FreeInvoiceKit uses reasonable protections, but no web service can promise absolute security.',
  },
  {
    question: 'Can I download my invoice as a PDF?',
    answer:
      'Yes. The invoice flow is built around generating a professional PDF document you can download and share.',
  },
  {
    question: 'Can I send invoices on WhatsApp?',
    answer:
      'Yes. The product is intentionally designed around WhatsApp-friendly invoice delivery and mobile-first workflows.',
  },
  {
    question: 'What currencies are supported?',
    answer:
      'FreeInvoiceKit supports multiple commonly used currencies, and the product can estimate a likely local currency based on location signals.',
  },
  {
    question: 'Does this replace accounting software?',
    answer:
      'No. FreeInvoiceKit is an invoicing utility, not a full accounting platform or a source of tax or legal advice.',
  },
  {
    question: 'Can I add tax and discounts?',
    answer:
      'Yes. The invoice workflow supports tax and discount handling as part of the invoice calculation flow.',
  },
  {
    question: 'How can I contact support?',
    answer:
      'You can contact support, privacy, or legal inquiries by emailing support@freeinvoicekit.com.',
  },
];
