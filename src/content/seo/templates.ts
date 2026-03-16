import type { TemplatePageData } from '@/types/seo-page';

export const templatePages: TemplatePageData[] = [
  {
    slug: 'freelancer',
    path: '/invoice-template/freelancer',
    lastModified: '2026-03-11',
    title: 'Freelancer Invoice Template | Free PDF Invoice Workflow',
    description:
      'Use this freelancer invoice template guide to see what a strong freelance invoice should include, then create your PDF in Free Invoice Kit.',
    h1: 'Freelancer invoice template guidance for people who want a clean invoice without turning billing into admin debt.',
    badge: 'Invoice Template',
    intro:
      'Use this freelancer invoice template to understand the right structure, then turn it into a finished PDF invoice in a few quick steps.',
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
      title: 'Use the checklist as your template, then build the real invoice in the app.',
      body: [
        'Free Invoice Kit helps you create the final invoice directly, so you do not have to keep editing old documents or duplicate template files.',
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
          'It works as a practical template guide. When you are ready, you can open the builder and create a clean PDF invoice instead of downloading and editing a blank file.',
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
        description: 'See the full no-signup invoice flow built for freelancers and solo operators.',
      },
      {
        href: '/send-invoice-whatsapp',
        title: 'Send Invoice on WhatsApp',
        description: 'Move into the sharing guide when the next job is getting the PDF to the client fast.',
      },
    ],
    relatedTitle: 'Related invoice guides for freelancers',
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
      'Hourly billing works best when the invoice makes the time, rate, and scope obvious. Use this guide to structure it clearly, then create the PDF in Free Invoice Kit.',
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
      title: 'Start in the main builder and add hourly line items your way.',
      body: [
        'The hourly template guidance gives you the structure. The builder lets you turn that structure into a client-ready invoice without maintaining a separate spreadsheet.',
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
          'Yes. It works for any service business that bills by time, including consulting, development, editing, and support work.',
      },
      {
        question: 'Does Free Invoice Kit have a dedicated hourly template mode?',
        answer:
          'Not yet. You start in the main builder, add your hourly line items, and export the finished invoice PDF from there.',
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
    relatedTitle: 'Related guides for hourly invoicing',
  },
];
