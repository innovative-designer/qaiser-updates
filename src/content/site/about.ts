import { APP_NAME } from '@/lib/constants';
import { LEGAL_ENTITY_NAME } from '@/lib/site';
import type { ContentDocument } from '@/content/legal/privacy-policy';

export const aboutPage: ContentDocument = {
  eyebrow: 'About FreeInvoiceKit',
  title: `Why ${APP_NAME} exists`,
  description:
    'FreeInvoiceKit is built for freelancers and small service businesses that need fast, mobile-friendly invoicing without a heavyweight billing stack.',
  lastUpdated: 'March 10, 2026',
  highlights: [
    'Built for freelancers, solo operators, and small service businesses.',
    'Focused on fast PDF invoices and chat-friendly delivery instead of back-office complexity.',
    `Operated by ${LEGAL_ENTITY_NAME}.`,
  ],
  sections: [
    {
      title: 'Built for the way small operators actually invoice',
      paragraphs: [
        `${APP_NAME} exists because too many invoicing tools are built like finance software first and practical invoicing tools second. For a freelancer, consultant, creative studio, or small service business, the real job is often simple: get the invoice out quickly, make it look professional, and keep moving.`,
        'That is not how most invoicing products feel. Many of them start with account creation, settings, complicated dashboards, and a lot of setup before you can generate the first useful document.',
      ],
    },
    {
      title: 'Why mobile and chat-first workflows matter',
      paragraphs: [
        'A large share of small-business communication now happens on phones, inside chat apps, and in short working sessions between calls, rides, site visits, or client replies. FreeInvoiceKit is built around that reality.',
        'The product keeps the flow narrow on purpose: enter the invoice details, generate a clean PDF, and send it where the conversation is already happening. That is especially useful for operators who work through WhatsApp-first or phone-first client relationships.',
      ],
    },
    {
      title: 'Who the product is for',
      paragraphs: [
        'FreeInvoiceKit is intended for freelancers, solo founders, independent consultants, local service providers, and small teams that want a lighter invoicing workflow.',
        'It is especially relevant for businesses that want a clean invoice document without committing to a full accounting suite on day one.',
      ],
    },
    {
      title: 'Product philosophy',
      paragraphs: [
        'The guiding idea is utility over ceremony. A good invoicing tool should reduce friction, not introduce more of it. The app should open quickly, make the important fields obvious, and help users produce something they can confidently send.',
        'FreeInvoiceKit is operated by FreeInvoiceKit company and is being developed as a practical, direct tool for getting invoices out faster.',
      ],
    },
  ],
};
