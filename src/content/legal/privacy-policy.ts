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
    'How FreeInvoiceKit collects, stores, and uses information across invoice creation, analytics, support, and future advertising.',
  lastUpdated: PRIVACY_LAST_UPDATED,
  highlights: [
    'Invoices and saved business details can be stored in your own browser using localStorage and IndexedDB.',
    'Minimal PostHog analytics may run only on non-indexed app pages such as invoice creation and history.',
    'Google advertising cookies may be used if AdSense is enabled on indexable content pages in the future.',
  ],
  sections: [
    {
      title: 'Overview',
      paragraphs: [
        `${LEGAL_ENTITY_NAME} operates ${APP_NAME}. This Privacy Policy explains what information we collect, how we use it, and the choices available to users when they visit the website or use the invoicing tool.`,
        `This policy applies to FreeInvoiceKit.com, including the invoice creator, learning content, waitlist signup, and any related support communication.`,
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
        'FreeInvoiceKit stores some information locally in your browser so you can create invoices faster and keep drafts available on the same device.',
        'This includes business details saved for reuse, invoice drafts, and a limited invoice history stored through browser technologies such as localStorage and IndexedDB.',
      ],
      items: [
        'Saved business name, email, phone number, and address',
        'Invoice drafts and generated invoice metadata',
        'Limited local app preferences, such as waitlist banner dismissal state',
      ],
    },
    {
      title: 'Automatically collected technical data',
      paragraphs: [
        'We may collect standard technical information such as IP address, browser type, device data, referral pages, and page interaction data to operate, secure, and improve the service.',
        'We also use a country and currency lookup flow to estimate a likely local currency for invoice creation. This is used to make the tool more useful at first load.',
      ],
    },
    {
      title: 'Analytics',
      paragraphs: [
        'FreeInvoiceKit uses PostHog only on non-indexed product pages such as the invoice creator and invoice history. Public SEO pages and blog content are intended to load without PostHog.',
        'Analytics are limited to explicit product events such as creating an invoice, downloading a PDF, or clicking a share action. Session recording, surveys, and broad automatic page interaction capture are disabled in this configuration.',
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
        'FreeInvoiceKit uses third-party infrastructure and services to operate parts of the website. These providers may process information on our behalf.',
      ],
      items: [
        'Supabase for backend data and file handling where configured',
        'PostHog for analytics',
        'Infrastructure and hosting providers needed to serve the site',
        'IP-based location lookup used to estimate local currency',
      ],
    },
    {
      title: 'Cookies and similar technologies',
      paragraphs: [
        'We use cookies and similar technologies to keep the site functional, understand usage, remember preferences, and support future advertising or consent flows where applicable.',
        'Because FreeInvoiceKit also relies on localStorage and IndexedDB, not all stored data is technically a cookie. This policy covers those similar browser-storage technologies as well.',
      ],
    },
    {
      title: 'Google AdSense and advertising cookies',
      paragraphs: [
        'If Google AdSense or similar advertising services are enabled on public content pages, Google and other third-party vendors may use cookies to serve ads based on a user’s prior visits to this website or other websites.',
        'Google may use advertising cookies, including the DoubleClick cookie or similar technologies, to help deliver personalized or non-personalized advertising. Users can learn more about how Google uses data in advertising through Google’s advertising and privacy settings resources.',
        'The invoice creator workflow is intended to remain ad-free, but advertising may appear on indexable informational pages in the future.',
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
