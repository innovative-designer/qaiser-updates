import type { TemplatePageData } from '@/types/seo-page';

export const templatePages: TemplatePageData[] = [
  {
    slug: 'freelancer',
    path: '/invoice-template/freelancer',
    lastModified: '2026-03-11',
    title: 'Freelancer Invoice Template | Free PDF Invoice Workflow',
    description:
      'Use this freelancer invoice template page to understand what a clean freelance invoice should include, then create one fast in Free Invoice Kit.',
    h1: 'Freelancer invoice template guidance for people who want a clean invoice without turning templates into admin debt.',
    badge: 'Invoice Template',
    intro:
      'This page shows what a strong freelancer invoice should cover, then points you to the fastest way to turn that structure into a finished PDF.',
    keywords: ['freelancer invoice template', 'free freelancer invoice template', 'freelance invoice format'],
    primaryCta: {
      href: '/create',
      label: 'Create Freelancer Invoice',
    },
    secondaryCta: {
      href: '/free-invoice-maker-freelancers',
      label: 'See freelancer workflow',
    },
    heroAside: {
      eyebrow: 'What a freelancer invoice needs',
      points: [
        'Client and business details that are easy to verify.',
        'Clear line items so the client knows what they are paying for.',
        'A finished PDF that is ready to send without copy-paste cleanup.',
      ],
      tone: 'quiet',
    },
    highlightCards: [
      {
        title: 'No stale documents',
        description:
          'Use the template logic as guidance, then create the invoice in one focused builder instead of duplicating old files.',
        icon: 'file-check',
      },
      {
        title: 'Made for solo work',
        description:
          'The workflow fits retainers, one-off projects, and small service jobs without software overhead.',
        icon: 'wallet',
      },
      {
        title: 'Easy to send fast',
        description:
          'Generate the PDF and move it into WhatsApp or email before the billing task gets delayed.',
        icon: 'smartphone',
      },
    ],
    checklistEyebrow: 'Checklist',
    checklistTitle: 'A freelancer invoice should include the essentials and nothing confusing.',
    checklistItems: [
      'Your business name and contact details',
      'The client name or company name',
      'Line items that describe the work clearly',
      'Currency, subtotal, and final total',
      'Due date and optional notes for payment context',
    ],
    bestForPanel: {
      eyebrow: 'Best for',
      title: 'Freelancers who want a simple invoice format without keeping a folder of outdated templates.',
      body: [
        'This is especially useful if you work across clients, projects, and currencies and want one clean structure every time.',
      ],
    },
    notesPanel: {
      eyebrow: 'Important note',
      title: 'The page explains the template structure. The CTA still leads to the main invoice builder.',
      body: [
        'There is no fake promise of a prefilled template here. The current product flow sends you to the regular builder so you can create the invoice properly.',
      ],
      tone: 'quiet',
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Use the template logic, then generate a real invoice PDF.',
      body: [
        'Open the builder, enter the client and line items, and export a polished invoice without template file maintenance.',
      ],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'Is this a downloadable freelancer invoice template?',
        answer:
          'This page is a template guide and a path into the invoice builder. The current product flow creates the invoice directly rather than promising a downloadable prefilled template file.',
      },
      {
        question: 'What should a freelancer invoice always include?',
        answer:
          'It should include business details, client details, clear line items, totals, the currency, and the due date so the client can approve and pay without confusion.',
      },
      {
        question: 'Can I still send the invoice through WhatsApp after creating it?',
        answer:
          'Yes. The generated invoice PDF is designed to be shared quickly through WhatsApp, email, or download.',
      },
    ],
    faqTitle: 'Questions people ask when looking for a freelancer invoice template',
    relatedLinks: [
      {
        href: '/invoice-template/hourly',
        title: 'Hourly Invoice Template',
        description: 'Switch to an hourly framing if your work is billed by time instead of project value.',
      },
      {
        href: '/free-invoice-maker-freelancers',
        title: 'Freelancer Invoice Maker',
        description: 'Return to the broader freelancer route if you want the bigger workflow context.',
      },
      {
        href: '/send-invoice-whatsapp',
        title: 'Send Invoice on WhatsApp',
        description: 'Move into the sharing guide when the next job is getting the PDF to the client fast.',
      },
    ],
    relatedTitle: 'Keep template traffic inside invoice-ready pages',
  },
  {
    slug: 'hourly',
    path: '/invoice-template/hourly',
    lastModified: '2026-03-11',
    title: 'Hourly Invoice Template | Free Hourly Billing Workflow',
    description:
      'Use this hourly invoice template guide to structure time-based billing clearly, then create the invoice fast in Free Invoice Kit.',
    h1: 'Hourly invoice template guidance for freelancers and consultants who need the math to look obvious.',
    badge: 'Invoice Template',
    intro:
      'Hourly billing only feels easy when the invoice explains the work clearly. This page shows the structure, then points you to the fastest way to generate a clean PDF invoice.',
    keywords: ['hourly invoice template', 'hourly billing invoice template', 'free hourly invoice format'],
    primaryCta: {
      href: '/create',
      label: 'Create Hourly Invoice',
    },
    secondaryCta: {
      href: '/invoice-generator/consultants',
      label: 'See consultant billing page',
    },
    heroAside: {
      eyebrow: 'What an hourly invoice needs',
      points: [
        'Clear descriptions of the work and the hours billed.',
        'Rates and totals that the client can verify quickly.',
        'A finished invoice PDF that does not require spreadsheet cleanup.',
      ],
      tone: 'quiet',
    },
    highlightCards: [
      {
        title: 'Clear time-based billing',
        description:
          'Useful for consulting, development, editing, and any service work sold in hours or day-rate blocks.',
        icon: 'clock',
      },
      {
        title: 'Cleaner line items',
        description:
          'The invoice can separate discovery, meetings, production, or support hours in a way clients can approve quickly.',
        icon: 'receipt',
      },
      {
        title: 'Low-friction export',
        description:
          'Generate the PDF and send it immediately instead of maintaining another hourly template spreadsheet.',
        icon: 'zap',
      },
    ],
    checklistEyebrow: 'Checklist',
    checklistTitle: 'A strong hourly invoice makes the time, rate, and scope obvious at a glance.',
    checklistItems: [
      'Dates or service descriptions that explain what the hours covered',
      'Hours billed per task, block, or project phase',
      'Rate information the client can verify quickly',
      'Subtotal, total, and currency',
      'Due date and any short payment notes',
    ],
    bestForPanel: {
      eyebrow: 'Best for',
      title: 'Consultants, developers, editors, and other service providers billing by time instead of flat project fees.',
      body: [
        'If your clients ask how the hours were used, a cleaner invoice structure reduces the back-and-forth before payment.',
      ],
    },
    notesPanel: {
      eyebrow: 'Important note',
      title: 'The current CTA leads to the standard builder, not a prefilled hourly invoice mode.',
      body: [
        'That keeps the page honest. The structure guidance is template-driven, but the product flow still starts from the same core invoice builder.',
      ],
      tone: 'quiet',
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Turn the hourly template structure into a real invoice PDF.',
      body: [
        'Open the builder, add your time-based line items, and export the invoice without spreadsheet maintenance.',
      ],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'What should an hourly invoice include?',
        answer:
          'It should show what work was done, how many hours were billed, the rate, the final totals, and the due date so the client can approve quickly.',
      },
      {
        question: 'Can I use this for consulting or freelance development work?',
        answer:
          'Yes. The page is meant for any service business where the invoice is based on time, not just one profession.',
      },
      {
        question: 'Does the current product prefill an hourly template automatically?',
        answer:
          'No. The page explains the structure honestly and routes you to the main builder without promising prefilled behavior that does not exist yet.',
      },
    ],
    faqTitle: 'Questions people ask when looking for an hourly invoice template',
    relatedLinks: [
      {
        href: '/invoice-template/freelancer',
        title: 'Freelancer Invoice Template',
        description: 'Switch to a broader freelance invoicing format if you are not always billing by time.',
      },
      {
        href: '/invoice-generator/consultants',
        title: 'Invoice Generator for Consultants',
        description: 'Move into a profession-specific page if your hourly billing is consultant-led.',
      },
      {
        href: '/compare/freshbooks',
        title: 'FreshBooks Alternative',
        description: 'Compare a lighter invoice workflow against heavier software used for time-based work.',
      },
    ],
    relatedTitle: 'Move template traffic into hourly and consulting pages',
  },
];
