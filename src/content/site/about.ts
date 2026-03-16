import { APP_NAME } from '@/lib/constants';
import { LEGAL_ENTITY_NAME } from '@/lib/site';
import type { ContentDocument } from '@/content/legal/privacy-policy';

export const aboutPage: ContentDocument = {
  eyebrow: 'About Free Invoice Kit',
  title: `Why ${APP_NAME} exists`,
  description:
    'Free Invoice Kit is a free invoice generator for freelancers and small service businesses that need fast, mobile-friendly invoicing without a heavyweight billing stack.',
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
        `${APP_NAME} exists because too many invoicing tools are built like accounting platforms first and practical invoicing tools second. For a freelancer, consultant, creative studio, or local service business, the real job is usually simple: send a clear invoice quickly, make it look professional, and get back to the work.`,
        'That is not how many invoicing products feel in practice. They often start with account creation, setup steps, and dashboard complexity long before you can create the first usable invoice.',
      ],
    },
    {
      title: 'Why mobile and chat-first workflows matter',
      paragraphs: [
        'A lot of small-business communication now happens on phones, inside chat apps, and in short work sessions between calls, site visits, deliveries, or client replies. Free Invoice Kit is built around that reality.',
        'The product keeps the flow narrow on purpose: enter the invoice details, generate a clean PDF, and send it where the conversation is already happening. That is especially useful for businesses that rely on WhatsApp, email, or other fast client handoffs.',
      ],
    },
    {
      title: 'Who the product is for',
      paragraphs: [
        'Free Invoice Kit is intended for freelancers, solo founders, independent consultants, local service providers, and small teams that want a lighter invoicing workflow.',
        'It is especially useful for businesses that want a clean invoice document without committing to a full accounting suite on day one.',
      ],
    },
    {
      title: 'Product philosophy',
      paragraphs: [
        'The guiding idea is utility over ceremony. A good invoicing tool should reduce friction, not introduce more of it. The app should open quickly, make the important fields obvious, and help users produce something they can confidently send.',
        `${APP_NAME} is being developed as a practical, direct tool for getting invoices out faster without piling more admin onto small operators.`,
      ],
    },
  ],
};
