import { APP_NAME } from '@/lib/constants';
import { COOKIE_LAST_UPDATED, SUPPORT_EMAIL } from '@/lib/site';
import type { ContentDocument } from '@/content/legal/privacy-policy';

export const cookiePolicy: ContentDocument = {
  eyebrow: 'Cookie Policy',
  title: `${APP_NAME} cookie policy`,
  description:
    'How FreeInvoiceKit uses cookies and similar browser-storage technologies, including analytics, preferences, and future advertising support.',
  lastUpdated: COOKIE_LAST_UPDATED,
  highlights: [
    'This site uses both cookies and non-cookie browser storage technologies.',
    'Analytics are currently supported through PostHog in production.',
    'Advertising cookies may be introduced later if AdSense is enabled on public content pages.',
  ],
  sections: [
    {
      title: 'What this policy covers',
      paragraphs: [
        'This Cookie Policy explains how FreeInvoiceKit uses cookies and similar technologies when you visit the website or use the product.',
      ],
    },
    {
      title: 'What cookies are',
      paragraphs: [
        'Cookies are small text files stored on your device by websites you visit. They can help remember preferences, support analytics, and enable advertising or consent workflows.',
      ],
    },
    {
      title: 'Similar technologies we use',
      paragraphs: [
        'FreeInvoiceKit also uses browser-based storage technologies that are not technically cookies, including localStorage and IndexedDB. These technologies may hold invoice drafts, saved business details, and app state on your device.',
      ],
      items: [
        'localStorage for business info and UI state',
        'IndexedDB for invoice history and invoice data',
      ],
    },
    {
      title: 'Categories of technologies used',
      paragraphs: [
        'We may use essential, analytics, preference, and advertising-related technologies depending on the page and the current production configuration.',
      ],
      items: [
        'Essential technologies needed to operate the site or store user-requested data',
        'Analytics technologies used to understand traffic and product usage',
        'Preference technologies used to remember UI state or prior actions',
        'Advertising technologies that may be used later on public content pages',
      ],
    },
    {
      title: 'Analytics technologies',
      paragraphs: [
        'PostHog is currently used in production to capture pageview and usage analytics. These tools help us understand which pages are used and how the product can be improved.',
      ],
    },
    {
      title: 'Advertising technologies',
      paragraphs: [
        'If Google AdSense or similar advertising services are added in the future, Google and other third-party vendors may use cookies to serve personalized or non-personalized ads based on prior visits to this site or other sites.',
        'The invoice-creation workflow is intended to remain ad-free even if advertising is later enabled on public content pages.',
      ],
    },
    {
      title: 'How to control cookies and browser storage',
      paragraphs: [
        'You can manage cookies through your browser settings, clear local storage data, and use device or browser controls that block tracking technologies.',
        'If a consent banner or consent-management platform is shown, you should also use those controls where required by law.',
      ],
    },
    {
      title: 'Changes to this policy',
      paragraphs: [
        'We may update this Cookie Policy from time to time. Updates will be reflected by changing the Last updated date on this page.',
      ],
    },
    {
      title: 'Contact',
      paragraphs: [
        `Questions about cookies, browser storage, or consent can be sent to ${SUPPORT_EMAIL}.`,
      ],
    },
  ],
};
