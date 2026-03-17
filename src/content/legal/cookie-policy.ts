import { APP_NAME } from '@/lib/constants';
import { COOKIE_LAST_UPDATED, SUPPORT_EMAIL } from '@/lib/site';
import type { ContentDocument } from '@/content/legal/privacy-policy';

export const cookiePolicy: ContentDocument = {
  eyebrow: 'Cookie Policy',
  title: `${APP_NAME} cookie policy`,
  description:
    'How Free Invoice Kit uses cookies and similar browser-storage technologies for app functionality, preferences, and analytics.',
  lastUpdated: COOKIE_LAST_UPDATED,
  highlights: [
    'This site uses both cookies and non-cookie browser storage technologies.',
    'Business details and invoice data can be stored locally in your browser through localStorage and IndexedDB.',
    'Google Analytics may run site-wide when analytics is configured, and PostHog may run on app routes.',
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
        'Free Invoice Kit also uses browser-based storage technologies that are not technically cookies, including localStorage and IndexedDB. These technologies can hold invoice drafts, saved business details, and app state on your device.',
      ],
      items: [
        'localStorage for saved business details and UI state',
        'IndexedDB for invoice drafts, invoice history, and invoice data',
      ],
    },
    {
      title: 'Categories of technologies used',
      paragraphs: [
        'We use a small set of technologies to run the app, remember preferences, and measure product usage where analytics is enabled.',
      ],
      items: [
        'Essential technologies needed to operate the site or store user-requested data',
        'Analytics technologies used to understand site traffic and product usage where analytics is enabled',
        'Preference technologies used to remember UI state or prior actions',
      ],
    },
    {
      title: 'Analytics technologies',
      paragraphs: [
        'If analytics is configured, Google Analytics may load across the site to measure traffic, pageviews, and acquisition performance.',
        'PostHog may also load on app routes such as invoice creation, invoice history, and shared invoice views for product events like invoice creation, PDF download, and share actions. Session recording, surveys, and broad automatic interaction capture are disabled in that setup.',
      ],
    },
    {
      title: 'Advertising technologies',
      paragraphs: [
        'The invoice creator does not depend on advertising cookies.',
        'If advertising technologies are introduced on public content pages later, this policy will be updated before those cookies are used.',
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
