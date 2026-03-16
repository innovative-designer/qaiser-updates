import { APP_NAME } from '@/lib/constants';
import { GOVERNING_LAW, LEGAL_ENTITY_NAME, SUPPORT_EMAIL, TERMS_LAST_UPDATED } from '@/lib/site';
import type { ContentDocument } from '@/content/legal/privacy-policy';

export const termsOfService: ContentDocument = {
  eyebrow: 'Terms of Service',
  title: `${APP_NAME} terms of service`,
  description:
    'The rules that govern access to FreeInvoiceKit, including acceptable use, invoice-accuracy responsibility, disclaimers, and limitation of liability.',
  lastUpdated: TERMS_LAST_UPDATED,
  highlights: [
    'Users remain responsible for the accuracy, legality, and compliance of invoices they create.',
    `${APP_NAME} is a tool for generating invoices, not a source of accounting, tax, or legal advice.`,
    `These Terms are governed by the laws of the State of ${GOVERNING_LAW}.`,
  ],
  sections: [
    {
      title: 'Acceptance of terms',
      paragraphs: [
        `By accessing or using ${APP_NAME}, you agree to these Terms of Service. If you do not agree, do not use the service.`,
      ],
    },
    {
      title: 'Service description',
      paragraphs: [
        `${APP_NAME} provides a web-based invoice creation tool together with related informational content and support channels.`,
        'Features may include local invoice storage, PDF generation, sharing workflows, waitlist signup, shared invoice links, and educational content.',
      ],
    },
    {
      title: 'Eligibility and lawful use',
      paragraphs: [
        'You may use the service only in compliance with applicable law. You are responsible for ensuring your use of the service is lawful in the jurisdictions relevant to you and your clients.',
      ],
    },
    {
      title: 'User responsibility for invoice content',
      paragraphs: [
        'You are solely responsible for all information entered into the service, including names, addresses, pricing, tax amounts, due dates, banking details, and any statements included in an invoice.',
        'You are also responsible for verifying the correctness and legal adequacy of any invoice before sending or relying on it.',
      ],
    },
    {
      title: 'No professional advice',
      paragraphs: [
        `${APP_NAME} is not a law firm, accounting firm, tax advisor, or financial advisor. Nothing on the site constitutes legal, tax, accounting, compliance, or financial advice.`,
      ],
    },
    {
      title: 'Storage and availability',
      paragraphs: [
        'Some invoice data may be stored locally in your browser. Local browser data can be lost if you clear storage, change devices, reset your browser profile, or encounter device or browser issues.',
        'We do not guarantee uninterrupted availability of the service, permanent storage, or recovery of lost invoice data.',
      ],
    },
    {
      title: 'Third-party services',
      paragraphs: [
        'Parts of the service may depend on third-party providers, including infrastructure, analytics, storage, or file-delivery services. We are not responsible for outages or failures caused by third-party services outside our reasonable control.',
      ],
    },
    {
      title: 'Prohibited use',
      paragraphs: [
        'You may not use the service for unlawful, fraudulent, abusive, infringing, or harmful conduct, including attempts to disrupt the site or misuse other people’s information.',
      ],
    },
    {
      title: 'Intellectual property',
      paragraphs: [
        'The FreeInvoiceKit website, branding, design, and original site content are protected by applicable intellectual-property laws. These Terms do not transfer ownership of our intellectual property to you.',
      ],
    },
    {
      title: 'Disclaimer of warranties',
      paragraphs: [
        `The service is provided on an “as is” and “as available” basis without warranties of any kind, whether express or implied, to the fullest extent permitted by law.`,
      ],
    },
    {
      title: 'Limitation of liability',
      paragraphs: [
        `To the fullest extent permitted by law, ${LEGAL_ENTITY_NAME} will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, lost revenue, lost data, or business interruption arising from or related to the service.`,
      ],
    },
    {
      title: 'Governing law',
      paragraphs: [
        `These Terms are governed by the laws of the State of ${GOVERNING_LAW}, without regard to its conflict of laws principles.`,
        'Nothing in these Terms limits any non-waivable rights a user may have under applicable law.',
      ],
    },
    {
      title: 'Changes to these terms',
      paragraphs: [
        'We may update these Terms from time to time. Continued use of the service after updated Terms are posted means you accept the revised Terms.',
      ],
    },
    {
      title: 'Contact',
      paragraphs: [`Questions about these Terms can be sent to ${SUPPORT_EMAIL}.`],
    },
  ],
};
