import { APP_NAME } from '@/lib/constants';
import { LEGAL_ENTITY_NAME, PRIVACY_LAST_UPDATED, SUPPORT_EMAIL } from '@/lib/site';

export type ContentSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export type ContentDocument = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  highlights: string[];
  sections: ContentSection[];
};

export const privacyPolicy: ContentDocument = {
  eyebrow: 'Privacy Policy',
  title: `${APP_NAME} privacy policy`,
  description:
    'How Free Invoice Kit collects, stores, and uses information related to invoice creation, browser storage, analytics, and support.',
  lastUpdated: PRIVACY_LAST_UPDATED,
  highlights: [
    'Business details are stored in localStorage for reuse, and invoice drafts and history are stored in IndexedDB on your device.',
    'Google Analytics may run site-wide when analytics is configured, and PostHog may run on app routes for product analytics.',
    'Support and waitlist submissions may store your email address and related anti-abuse metadata.',
  ],
  sections: [
    {
      title: 'Overview',
      paragraphs: [
        `${LEGAL_ENTITY_NAME} operates ${APP_NAME}. This Privacy Policy explains what information we collect, how we use it, and the choices available to users when they visit the website or use the invoicing tool.`,
        `This policy applies to FreeInvoiceKit.com, including the invoice creator, public content pages, waitlist signup, shared invoice views, and related support communication.`,
      ],
    },
    {
      title: 'Information you provide directly',
      paragraphs: [
        'When you use the invoice creator, you may enter business information, client details, invoice line items, tax amounts, notes, and similar billing data.',
        'If you contact us or join a waitlist, you may also provide your email address and the contents of your message.',
      ],
    },
    {
      title: 'Information stored in your browser',
      paragraphs: [
        'Free Invoice Kit stores some information locally in your browser so you can create invoices faster and keep drafts available on the same device.',
        'Business details are saved in localStorage for reuse. Invoice drafts, invoice metadata, and local invoice history are stored in IndexedDB in that same browser profile.',
      ],
      items: [
        'Saved business name, email, phone number, and address',
        'Invoice drafts, totals, and generated invoice metadata',
        'Limited local app preferences, such as waitlist banner dismissal state',
      ],
    },
    {
      title: 'Automatically collected technical data',
      paragraphs: [
        'We may collect standard technical information such as IP address, browser type, device data, referral pages, and page interaction data to operate, secure, and improve the service.',
        'We also use an IP-based country and currency lookup flow to estimate a likely local currency when the invoice builder first loads.',
      ],
    },
    {
      title: 'Analytics',
      paragraphs: [
        'If analytics is configured, Free Invoice Kit may use Google Analytics across the site to understand traffic sources, pageviews, and acquisition performance.',
        'PostHog may also run on app routes such as the invoice creator, invoice history, and shared invoice views. PostHog analytics are limited to product events such as creating an invoice, downloading a PDF, or clicking a share action. Session recording, surveys, and broad automatic interaction capture are disabled in that setup.',
      ],
    },
    {
      title: 'Waitlist and support data',
      paragraphs: [
        'If you submit your email address through a waitlist or contact workflow, we may store your email address together with associated metadata such as IP address, source, and country information for spam prevention, product communication, and support.',
        'We do not sell support or waitlist submission data.',
      ],
    },
    {
      title: 'Third-party services',
      paragraphs: [
        'Free Invoice Kit uses third-party infrastructure and services to operate parts of the website. These providers may process information on our behalf.',
      ],
      items: [
        'Supabase for backend data and file handling where configured',
        'Google Analytics for website traffic measurement',
        'PostHog for analytics',
        'Infrastructure and hosting providers needed to serve the site',
        'IP-based location lookup used to estimate local currency',
      ],
    },
    {
      title: 'Cookies and similar technologies',
      paragraphs: [
        'We use cookies and similar technologies to keep the site functional, remember preferences, and understand app usage where analytics is enabled.',
        'Because Free Invoice Kit also relies on localStorage and IndexedDB, not all stored data is technically a cookie. This policy covers those browser-storage technologies as well.',
      ],
    },
    {
      title: 'Advertising',
      paragraphs: [
        'We do not rely on advertising cookies to run the invoice creator.',
        'If we introduce advertising on public content pages later, we will update this policy before those advertising technologies are used.',
      ],
    },
    {
      title: 'How we use information',
      paragraphs: [
        'We use collected information to provide the service, generate invoices, improve the site, respond to support requests, protect the service against abuse, and measure usage of the product and content.',
      ],
    },
    {
      title: 'Data retention',
      paragraphs: [
        'Information stored in your browser remains there until you clear it, overwrite it, or stop using the same device/browser profile.',
        'Support, analytics, or waitlist-related data may be retained for as long as reasonably necessary to operate, improve, secure, and support the service.',
      ],
    },
    {
      title: 'Security',
      paragraphs: [
        'We use reasonable technical and organizational measures to protect information, but no system is completely secure. You should avoid entering information you would not want stored in your browser or transmitted through ordinary web infrastructure.',
      ],
    },
    {
      title: 'Your choices',
      paragraphs: [
        'You can clear local browser data, control cookies in your browser settings, block analytics tools through browser extensions, and choose not to submit support or waitlist forms.',
        'Where consent mechanisms are required by law for analytics or advertising technologies, those controls should be used in addition to browser settings.',
      ],
    },
    {
      title: 'Changes to this policy',
      paragraphs: [
        'We may update this Privacy Policy from time to time. When we do, we will update the “Last updated” date shown on this page.',
      ],
    },
    {
      title: 'Contact',
      paragraphs: [
        `Privacy questions, support requests, or legal inquiries can be sent to ${SUPPORT_EMAIL}.`,
      ],
    },
  ],
};
