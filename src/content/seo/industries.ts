import type { IndustryPageData } from '@/types/seo-page';

export const industryPages: IndustryPageData[] = [
  {
    pageType: 'industry',
    slug: 'graphic-designers',
    path: '/invoice-generator/graphic-designers',
    lastModified: '2026-03-11',
    title: 'Invoice Generator for Graphic Designers | Free Design Invoice Maker',
    description:
      'Create polished design invoices in minutes. Free Invoice Kit helps graphic designers turn approved work into clean PDF invoices without signup friction.',
    h1: 'Invoice generator for graphic designers who would rather send the invoice than reopen the project file.',
    badge: 'Creative Services',
    intro:
      'Free Invoice Kit keeps design invoicing simple: add the client, list the deliverables, generate the PDF, and move the invoice into chat or email before the approval thread goes quiet.',
    keywords: [
      'invoice generator for graphic designers',
      'graphic design invoice template',
      'design invoice maker',
    ],
    primaryCta: {
      href: '/create',
      label: 'Create Design Invoice',
    },
    secondaryCta: {
      href: '/invoice-template/freelancer',
      label: 'See freelancer template',
    },
    heroAside: {
      eyebrow: 'Why designers use it',
      points: [
        'Package flat-fee work, revisions, or retainers on one clean invoice.',
        'Send the PDF fast while the client is still in the review conversation.',
        'Keep admin lighter than a full bookkeeping tool.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Design workflow',
    benefitSectionTitle: 'Built for projects that move from approval to billing in one sitting.',
    benefitCards: [
      {
        title: 'List deliverables clearly',
        description:
          'Brand kits, social packs, website mockups, and revision rounds can all sit on one invoice without looking messy.',
        icon: 'palette',
      },
      {
        title: 'Keep retainers simple',
        description:
          'Monthly design support or ad creative retainers stay easy to explain when line items are already structured for you.',
        icon: 'receipt',
      },
      {
        title: 'Invoice from the same device',
        description:
          'Create the invoice from your phone or laptop right after approval instead of waiting to open a spreadsheet later.',
        icon: 'smartphone',
      },
    ],
    workflowPanel: {
      eyebrow: 'Common billing moment',
      title: 'The design is approved. The invoice should follow immediately.',
      body: [
        'Most designers lose time when they finish the work, send the files, and only remember the invoice later.',
        'This page is built around that exact moment: generate the invoice while the work is still fresh and the client already expects the next step.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Make a clean design invoice before the handoff thread disappears.',
      body: [
        'Open the builder, enter the project details, and export a client-ready PDF in one short pass.',
      ],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'Can I invoice fixed-price design work and hourly revisions?',
        answer:
          'Yes. You can add separate line items for the main project, revisions, rush fees, or retainers so the invoice reflects how the work was actually sold.',
      },
      {
        question: 'Does this work for freelance graphic designers without an account?',
        answer:
          'Yes. The core workflow is no-signup, so you can create and export a design invoice immediately.',
      },
      {
        question: 'Can I send the invoice by WhatsApp after exporting the PDF?',
        answer:
          'Yes. The product is built around fast PDF generation so you can move the invoice directly into client chat or email.',
      },
    ],
    faqTitle: 'Questions graphic designers ask before switching from templates',
    relatedLinks: [
      {
        href: '/free-invoice-maker-freelancers',
        title: 'Freelancer Invoice Maker',
        description: 'See the broader no-signup invoicing workflow for solo service work.',
      },
      {
        href: '/invoice-template/freelancer',
        title: 'Freelancer Invoice Template',
        description: 'Start from a template-minded page if you want a simpler setup framing.',
      },
      {
        href: '/send-invoice-whatsapp',
        title: 'Send Invoice on WhatsApp',
        description: 'Move the finished PDF into chat when clients reply faster there than by email.',
      },
    ],
    relatedTitle: 'Keep the next click inside the design billing path',
  },
  {
    pageType: 'industry',
    slug: 'photographers',
    path: '/invoice-generator/photographers',
    lastModified: '2026-03-11',
    title: 'Invoice Generator for Photographers | Free Photography Invoice Maker',
    description:
      'Create professional photography invoices for shoots, edits, and retainers. Free Invoice Kit helps photographers send clean PDF invoices without signup.',
    h1: 'Invoice generator for photographers who need the invoice out before the gallery link gets buried.',
    badge: 'Photography Billing',
    intro:
      'Whether you bill for a wedding package, a portrait session, or monthly content work, Free Invoice Kit helps you turn the shoot details into a clean PDF invoice fast.',
    keywords: [
      'invoice generator for photographers',
      'photography invoice maker',
      'photographer invoice template',
    ],
    primaryCta: {
      href: '/create',
      label: 'Create Photography Invoice',
    },
    secondaryCta: {
      href: '/invoice-template/hourly',
      label: 'See hourly template',
    },
    heroAside: {
      eyebrow: 'Why photographers use it',
      points: [
        'Bill for the shoot, editing, travel, and add-ons without clutter.',
        'Export the PDF quickly while delivery and payment are still part of the same conversation.',
        'Work well for phone-first businesses that rely on WhatsApp or email follow-up.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Photography workflow',
    benefitSectionTitle: 'Useful for sessions with deposits, edits, and post-shoot follow-through.',
    benefitCards: [
      {
        title: 'Package and add-on friendly',
        description:
          'List the shoot package, album upgrade, extra edited photos, or travel fee as separate invoice lines.',
        icon: 'camera',
      },
      {
        title: 'Keep post-production visible',
        description:
          'Retouching, editing hours, and delivery extras can be billed clearly instead of buried in one vague total.',
        icon: 'file-check',
      },
      {
        title: 'Send from chat-native workflows',
        description:
          'If your clients already coordinate sessions in WhatsApp, the invoice PDF can follow the same route.',
        icon: 'message-circle',
      },
    ],
    workflowPanel: {
      eyebrow: 'Common billing moment',
      title: 'The client has the previews. The invoice should not become another delayed admin task.',
      body: [
        'Photography businesses often invoice around booking, delivery, or upgrade requests, and those moments move quickly.',
        'This page keeps the invoice flow short enough that you can send the document while the client is still actively responding.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a photography invoice that matches the way shoots are actually sold.',
      body: [
        'Open the builder, add the session details, and export the PDF before the delivery thread cools off.',
      ],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'Can I use this for wedding packages and small portrait shoots?',
        answer:
          'Yes. The invoice builder works for larger packaged work and smaller single-session jobs because the line items are flexible.',
      },
      {
        question: 'Can I separate the shoot fee from editing or travel?',
        answer:
          'Yes. Add each part as its own line item so the client can see exactly what is being billed.',
      },
      {
        question: 'Is this useful for photographers who mostly invoice from a phone?',
        answer:
          'Yes. Free Invoice Kit is designed for mobile-friendly, low-friction invoicing instead of a desktop-heavy accounting flow.',
      },
    ],
    faqTitle: 'Questions photographers ask before replacing manual invoices',
    relatedLinks: [
      {
        href: '/invoice-generator/graphic-designers',
        title: 'Invoice Generator for Graphic Designers',
        description: 'See another creative-service invoice flow built around quick client handoff.',
      },
      {
        href: '/invoice-template/hourly',
        title: 'Hourly Invoice Template',
        description: 'Useful if your photography billing is anchored around editing or day-rate hours.',
      },
      {
        href: '/send-invoice-whatsapp',
        title: 'Send Invoice on WhatsApp',
        description: 'Use the WhatsApp-first sending flow when client communication already lives in chat.',
      },
    ],
    relatedTitle: 'Move into adjacent billing pages that still fit creative work',
  },
  {
    pageType: 'industry',
    slug: 'consultants',
    path: '/invoice-generator/consultants',
    lastModified: '2026-03-11',
    title: 'Invoice Generator for Consultants | Free Consulting Invoice Maker',
    description:
      'Create consulting invoices for strategy work, advisory retainers, and project hours. Free Invoice Kit keeps invoicing light and client-ready.',
    h1: 'Invoice generator for consultants who need to bill cleanly without adding a finance platform to the engagement.',
    badge: 'Consulting Billing',
    intro:
      'Consultants often need to bill after a call, a milestone, or a monthly retainer checkpoint. Free Invoice Kit helps you package that work into a clear PDF invoice without account setup drag.',
    keywords: [
      'invoice generator for consultants',
      'consulting invoice maker',
      'consultant invoice template',
    ],
    primaryCta: {
      href: '/create',
      label: 'Create Consulting Invoice',
    },
    secondaryCta: {
      href: '/invoice-template/hourly',
      label: 'See hourly template',
    },
    heroAside: {
      eyebrow: 'Why consultants use it',
      points: [
        'Works for strategy sessions, advisory retainers, and project-based billing.',
        'Makes scope, hours, and milestone charges easier to explain.',
        'Stays lighter than adopting a billing suite for a few invoices per month.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Consulting workflow',
    benefitSectionTitle: 'Useful when work is sold as time, outcomes, or monthly support.',
    benefitCards: [
      {
        title: 'Clear project summaries',
        description:
          'Bill for discovery, audits, workshops, and retainers with line items that read like actual consulting work.',
        icon: 'briefcase',
      },
      {
        title: 'Better scope visibility',
        description:
          'Separate hours, meetings, implementation support, or travel so approval and payment conversations stay clean.',
        icon: 'file-check',
      },
      {
        title: 'Stay focused on delivery',
        description:
          'Generate the invoice fast and return to the engagement instead of opening bookkeeping software for one task.',
        icon: 'clock',
      },
    ],
    workflowPanel: {
      eyebrow: 'Common billing moment',
      title: 'The meeting is over. The invoice should be the next action, not next week’s action.',
      body: [
        'Consulting work often closes loops quickly: a workshop ends, the recap is sent, and the invoice needs to follow while the momentum is still there.',
        'This page keeps the billing step short so the handoff from advice to payment feels immediate and professional.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a consulting invoice that reads clearly to procurement, finance, or the client founder.',
      body: [
        'Open the builder, structure the work in plain language, and export the PDF without onboarding overhead.',
      ],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'Can I use this for consulting retainers and milestone billing?',
        answer:
          'Yes. The invoice builder works for monthly retainers, fixed-fee advisory work, or milestone-based consulting projects.',
      },
      {
        question: 'Can I itemize meetings, analysis, and implementation support separately?',
        answer:
          'Yes. Separate line items help make the invoice easier for clients or finance teams to approve.',
      },
      {
        question: 'Does this require a consulting firm account setup first?',
        answer:
          'No. The core workflow is no-signup, so you can create and export a consulting invoice immediately.',
      },
    ],
    faqTitle: 'Questions consultants ask before dropping spreadsheet invoices',
    relatedLinks: [
      {
        href: '/invoice-template/hourly',
        title: 'Hourly Invoice Template',
        description: 'Useful if your consulting work is sold by the hour or by workshop blocks.',
      },
      {
        href: '/compare/freshbooks',
        title: 'FreshBooks Alternative',
        description: 'Compare a lightweight invoice flow against a more feature-heavy software stack.',
      },
      {
        href: '/free-invoice-maker-freelancers',
        title: 'Freelancer Invoice Maker',
        description: 'Return to the broader no-signup invoicing page for solo operators.',
      },
    ],
    relatedTitle: 'Keep users on the consulting billing path',
  },
];
