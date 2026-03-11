import type { CountryPageData } from '@/types/seo-page';

export const countryPages: CountryPageData[] = [
  {
    pageType: 'country',
    slug: 'pakistan',
    path: '/invoice-generator/pakistan',
    lastModified: '2026-03-11',
    title: 'Invoice Generator Pakistan | Free PKR Invoice Maker',
    description:
      'Make professional PKR invoices online for free. Free Invoice Kit helps Pakistani freelancers and small businesses create and share invoice PDFs in seconds.',
    h1: 'Make polished PKR invoices on your phone without spreadsheets or signup screens.',
    badge: 'Pakistan Freelancers',
    intro:
      'Build a client-ready invoice, generate the PDF, and send it in seconds. Free Invoice Kit keeps the workflow lean for freelancers and small businesses in Pakistan.',
    keywords: ['invoice generator pakistan', 'pkr invoice maker', 'invoice maker pakistan'],
    locale: 'en_PK',
    alternatesLanguages: {
      'en-PK': '/invoice-generator/pakistan',
      en: '/invoice-generator/pakistan',
    },
    primaryCta: {
      href: '/create',
      label: 'Start Creating Invoice',
    },
    secondaryCta: {
      href: '/send-invoice-whatsapp',
      label: 'See the WhatsApp workflow',
    },
    heroAside: {
      eyebrow: 'Built for the real workflow',
      points: [
        'Freelancers often share invoices from chat, not from a finance dashboard.',
        'PKR support is already included, so you do not need to fight the currency setup.',
        'Your invoice can look finished before your client asks where to send payment.',
      ],
      tone: 'quiet',
    },
    highlightCards: [
      {
        title: 'Professional PDFs',
        description:
          'Clean totals, line items, due date, and notes in a format that feels client-ready.',
        icon: 'file-check',
      },
      {
        title: 'Mobile friendly',
        description:
          'Designed for people invoicing between calls, rides, and client chats from their phones.',
        icon: 'smartphone',
      },
      {
        title: 'Simple workflow',
        description:
          'Fill, review, generate, send. No billing suite overhead and no account wall.',
        icon: 'check-circle',
      },
    ],
    contextPanel: {
      eyebrow: 'Local freelancer context',
      title: 'PKR invoices should fit the real collection flow, not a generic global template.',
      body: [
        'Many Pakistan-based freelancers invoice after work from Upwork, Fiverr, or direct client referrals, and they need the invoice out before the payment conversation cools off.',
        'That is why this page leans into PKR support, mobile-friendly PDF output, and a workflow that still fits familiar payment options such as bank transfer, JazzCash, or Easypaisa.',
      ],
    },
    nuancePanel: {
      eyebrow: 'Localization note',
      title: 'This page is written for Pakistan-based freelancers, not a generic keyword insertion.',
      body: [
        'The language, currency framing, and client context are all meant to match how invoice conversations actually happen in the market.',
      ],
      tone: 'quiet',
    },
    valuePanel: {
      eyebrow: 'Why Pakistan users use it',
      title: 'Quick invoice output without adopting a full bookkeeping tool.',
      body: [
        'If the goal is to send the invoice, get the PDF, and keep moving, this workflow is intentionally lighter than a traditional accounting platform.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a PKR invoice in under a minute.',
      body: [
        'Open the builder, add the client and line items, then export a polished PDF that is ready to send.',
      ],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'Is this invoice generator free?',
        answer:
          'Yes. Free Invoice Kit core invoicing is free: create invoice, generate PDF, and share through WhatsApp or email.',
      },
      {
        question: 'Can I use PKR currency?',
        answer:
          'Yes. PKR is supported out of the box, and totals are automatically formatted for invoice output.',
      },
      {
        question: 'Do I need an account?',
        answer: 'No account is needed. Open the app and start creating an invoice immediately.',
      },
    ],
    faqTitle: 'Common questions from Pakistan-based users',
    relatedLinks: [
      {
        href: '/invoice-generator/india',
        title: 'Invoice Generator India',
        description: 'See the same mobile-first invoicing model adapted for INR workflows.',
      },
      {
        href: '/invoice-generator/uae',
        title: 'UAE Billing Guide',
        description: 'Compare the same WhatsApp-first billing flow in AED.',
      },
      {
        href: '/send-invoice-whatsapp',
        title: 'Send Invoice on WhatsApp',
        description: 'Move a finished invoice PDF straight into client chat after you create it.',
      },
    ],
    relatedTitle: 'Keep the internal linking path useful',
  },
  {
    pageType: 'country',
    slug: 'uae',
    path: '/invoice-generator/uae',
    lastModified: '2026-03-11',
    title: 'WhatsApp Billing UAE | Free Invoice Generator for UAE Freelancers',
    description:
      'Create professional invoices in AED and share on WhatsApp in seconds. Free Invoice Kit is free and works great for UAE freelancers and small businesses.',
    h1: 'Create AED invoices and send them on WhatsApp without leaving the client flow.',
    badge: 'UAE Invoicing',
    intro:
      'Free Invoice Kit is built for UAE freelancers and small service businesses that want clean invoice PDFs, quick sharing, and almost no setup overhead.',
    keywords: ['whatsapp billing uae', 'uae invoice generator', 'aed invoice maker'],
    locale: 'en_AE',
    alternatesLanguages: {
      'en-AE': '/invoice-generator/uae',
      en: '/invoice-generator/uae',
    },
    primaryCta: {
      href: '/create',
      label: 'Create Invoice in AED',
    },
    heroAside: {
      eyebrow: 'Why it fits UAE workflows',
      points: [
        'A lot of client communication already happens in WhatsApp.',
        'AED invoice output reduces friction when you need to send something immediately.',
        'The product stays useful even if you do not want to adopt a full billing platform.',
      ],
      tone: 'quiet',
    },
    highlightCards: [
      {
        title: 'WhatsApp first',
        description: 'Built around the real workflow in the UAE: send invoice PDFs directly in chat.',
        icon: 'message-circle',
      },
      {
        title: '30-second setup',
        description: 'Fill one form, generate the PDF, and export. No onboarding funnel or account wall.',
        icon: 'zap',
      },
      {
        title: 'Free forever core',
        description: 'Core invoice creation, PDF generation, and sharing stay free for everyone.',
        icon: 'check-circle',
      },
    ],
    contextPanel: {
      eyebrow: 'UAE freelancer context',
      title: 'AED support matters because the invoice has to feel ready to send, not adapted later.',
      body: [
        'UAE freelancers often need to invoice quickly after a client discussion, and the document needs to look finished the first time.',
        'This page is designed around fast PDF output, WhatsApp delivery, and a workflow that fits consultants, designers, developers, and other small service businesses invoicing from a phone or laptop.',
      ],
    },
    nuancePanel: {
      eyebrow: 'Market nuance',
      title: 'This route keeps the product positioned around communication speed, not bookkeeping depth.',
      body: [
        'The value here is fast delivery inside the channels clients already use, especially when invoice turnaround helps close payment faster.',
      ],
      tone: 'quiet',
    },
    valuePanel: {
      eyebrow: 'What users get',
      title: 'Clean AED invoices that can move directly into the client conversation.',
      body: [
        'The page keeps the billing promise narrow on purpose: create the invoice, generate the PDF, and send it without operational drag.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create an AED invoice and get it into the client conversation fast.',
      body: [
        'Open the builder, add the invoice details, and send a polished PDF without signup overhead.',
      ],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'Does Free Invoice Kit support AED invoices?',
        answer:
          'Yes. You can create invoice PDFs in AED and share them with UAE clients through WhatsApp, email, or download.',
      },
      {
        question: 'Do I need to create an account first?',
        answer:
          'No. The core invoicing flow is no-signup, so you can open the builder and create an invoice immediately.',
      },
      {
        question: 'Is this useful for UAE freelancers and small service businesses?',
        answer:
          'Yes. The product is designed for fast invoice creation when the main goal is getting a clean PDF to the client without setup drag.',
      },
    ],
    faqTitle: 'Questions UAE users ask first',
    relatedLinks: [
      {
        href: '/invoice-generator/india',
        title: 'Invoice Generator India',
        description: 'See another fast-growing market using the same mobile-first invoice flow.',
      },
      {
        href: '/invoice-generator/pakistan',
        title: 'Pakistan Invoice Generator',
        description: 'Compare the same workflow in PKR for another WhatsApp-heavy market.',
      },
      {
        href: '/send-invoice-whatsapp',
        title: 'Send Invoice on WhatsApp',
        description: 'Return to the practical guide for creating and sending invoice PDFs in chat.',
      },
    ],
    relatedTitle: 'Move users into adjacent indexable pages',
  },
  {
    pageType: 'country',
    slug: 'india',
    path: '/invoice-generator/india',
    lastModified: '2026-03-11',
    title: 'Invoice Generator India | Free INR Invoice Maker for Freelancers',
    description:
      'Create INR invoices online for free. Free Invoice Kit helps Indian freelancers and service businesses generate client-ready PDF invoices without signup.',
    h1: 'Create INR invoices fast without turning a client handoff into a back-office task.',
    badge: 'India Freelancers',
    intro:
      'Free Invoice Kit helps India-based freelancers make polished INR invoices, export the PDF, and send it fast through the channels clients already check.',
    keywords: ['invoice generator india', 'inr invoice maker', 'invoice maker india freelancer'],
    locale: 'en_IN',
    alternatesLanguages: {
      'en-IN': '/invoice-generator/india',
      en: '/invoice-generator/india',
    },
    primaryCta: {
      href: '/create',
      label: 'Create Invoice in INR',
    },
    secondaryCta: {
      href: '/send-invoice-whatsapp',
      label: 'See WhatsApp workflow',
    },
    heroAside: {
      eyebrow: 'Why India users use it',
      points: [
        'INR support helps invoices look ready without manual currency cleanup.',
        'The product fits freelancers billing from chat-heavy workflows.',
        'Fast PDF output helps when invoices need to follow a completed task immediately.',
      ],
      tone: 'quiet',
    },
    highlightCards: [
      {
        title: 'INR-ready output',
        description: 'Generate a client-ready invoice in Indian Rupees without manual formatting.',
        icon: 'receipt',
      },
      {
        title: 'Phone-first workflow',
        description: 'Useful for freelancers who invoice between calls, messages, and project delivery.',
        icon: 'smartphone',
      },
      {
        title: 'Quick sending flow',
        description: 'Export the PDF and move it into WhatsApp or email before the payment thread cools off.',
        icon: 'message-circle',
      },
    ],
    contextPanel: {
      eyebrow: 'Local freelancer context',
      title: 'A lot of India-based freelance invoicing happens in the same window as project delivery.',
      body: [
        'Designers, developers, consultants, and marketers often need to invoice right after a deliverable, not after logging into a larger accounting setup.',
        'That makes a narrow invoice workflow useful: the document is ready fast, the currency is right, and the client can receive the PDF immediately.',
      ],
    },
    nuancePanel: {
      eyebrow: 'Payment context',
      title: 'The page is localized around fast collection conversations, not generic geography copy.',
      body: [
        'India-based freelancers often collect through bank transfer or other familiar digital payment routes, so the invoice mainly needs to be clear, fast, and easy to forward.',
      ],
      tone: 'quiet',
    },
    valuePanel: {
      eyebrow: 'Why this matters',
      title: 'The lighter the invoice workflow, the easier it is to bill while momentum still exists.',
      body: [
        'The product focuses on getting the invoice into the client conversation quickly instead of expanding into a broader business dashboard.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create an INR invoice and send it while the project handoff is still active.',
      body: [
        'Open the builder, add the essentials, and export a polished PDF in one short pass.',
      ],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'Can I create invoices in INR?',
        answer:
          'Yes. INR is supported, so you can generate invoice PDFs that are already formatted for India-based billing workflows.',
      },
      {
        question: 'Is this useful for Indian freelancers and agencies?',
        answer:
          'Yes. The workflow is useful for freelancers, solo consultants, and small service businesses that want quick invoice delivery without software overhead.',
      },
      {
        question: 'Do I need an account to start?',
        answer:
          'No. Free Invoice Kit is designed so you can open the builder and start creating the invoice immediately.',
      },
    ],
    faqTitle: 'Questions India-based users ask before switching invoice tools',
    relatedLinks: [
      {
        href: '/invoice-generator/pakistan',
        title: 'Invoice Generator Pakistan',
        description: 'Compare a neighboring market using the same fast, currency-localized invoice flow.',
      },
      {
        href: '/invoice-generator/uae',
        title: 'WhatsApp Billing UAE',
        description: 'See how the product adapts for AED and WhatsApp-heavy business workflows.',
      },
      {
        href: '/invoice-template/freelancer',
        title: 'Freelancer Invoice Template',
        description: 'Move into a template-style page if you want a simpler starting point for solo work.',
      },
    ],
    relatedTitle: 'Stay on adjacent geo and freelancer billing pages',
  },
  {
    pageType: 'country',
    slug: 'nigeria',
    path: '/invoice-generator/nigeria',
    lastModified: '2026-03-11',
    title: 'Invoice Generator Nigeria | Free NGN Invoice Maker for Freelancers',
    description:
      'Create NGN invoices online for free. Free Invoice Kit helps Nigeria-based freelancers generate polished PDF invoices and send them fast.',
    h1: 'Create NGN invoices fast when the payment conversation is already happening in chat.',
    badge: 'Nigeria Freelancers',
    intro:
      'Free Invoice Kit helps Nigeria-based freelancers and service businesses make clear NGN invoices, export the PDF, and send it before the client thread loses momentum.',
    keywords: ['invoice generator nigeria', 'ngn invoice maker', 'invoice maker nigeria'],
    locale: 'en_NG',
    alternatesLanguages: {
      'en-NG': '/invoice-generator/nigeria',
      en: '/invoice-generator/nigeria',
    },
    primaryCta: {
      href: '/create',
      label: 'Create Invoice in NGN',
    },
    secondaryCta: {
      href: '/send-invoice-whatsapp',
      label: 'See WhatsApp workflow',
    },
    heroAside: {
      eyebrow: 'Why Nigeria users use it',
      points: [
        'NGN support helps the invoice look ready from the first export.',
        'The product works well for mobile-first and chat-heavy billing habits.',
        'Fast PDF output helps you invoice while the client still expects the next step.',
      ],
      tone: 'quiet',
    },
    highlightCards: [
      {
        title: 'NGN-ready invoices',
        description: 'Create clean Nigerian Naira invoices without cleaning up generic currency defaults.',
        icon: 'receipt',
      },
      {
        title: 'Fast PDF generation',
        description: 'Useful when clients need the invoice immediately after the work is delivered or approved.',
        icon: 'zap',
      },
      {
        title: 'Built for direct sending',
        description: 'Export the invoice and share it through WhatsApp or email without extra workflow overhead.',
        icon: 'message-circle',
      },
    ],
    contextPanel: {
      eyebrow: 'Local freelancer context',
      title: 'A lot of Nigeria-based freelance billing happens close to the delivery moment.',
      body: [
        'Developers, designers, marketers, and other service providers often need the invoice ready as soon as work is approved.',
        'That makes a focused invoice tool more useful than a full bookkeeping setup when the real need is a polished document and fast sharing.',
      ],
    },
    nuancePanel: {
      eyebrow: 'Payment context',
      title: 'The document needs to be clear and quick to forward, not trapped in a heavier workflow.',
      body: [
        'For many freelancers, the operational value is speed: invoice in NGN, send the PDF, and keep the payment discussion moving.',
      ],
      tone: 'quiet',
    },
    valuePanel: {
      eyebrow: 'Why this matters',
      title: 'The shorter the billing step, the easier it is to invoice while the client is responsive.',
      body: [
        'Free Invoice Kit keeps the path intentionally narrow so the invoice gets created and delivered before admin work piles up.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create an NGN invoice and send it before the conversation cools off.',
      body: [
        'Open the builder, enter the essentials, and export a professional PDF with almost no setup friction.',
      ],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'Can I create invoices in NGN?',
        answer:
          'Yes. Free Invoice Kit supports NGN so the invoice can be generated in Nigerian Naira without manual currency cleanup.',
      },
      {
        question: 'Is this useful for Nigeria-based freelancers?',
        answer:
          'Yes. The workflow is built for freelancers and small service businesses that want fast invoice creation and direct PDF sharing.',
      },
      {
        question: 'Do I need to sign up first?',
        answer:
          'No. The invoice builder is designed so you can start creating the invoice immediately.',
      },
    ],
    faqTitle: 'Questions Nigeria-based users ask before switching invoice tools',
    relatedLinks: [
      {
        href: '/invoice-generator/india',
        title: 'Invoice Generator India',
        description: 'See another freelancer-heavy market using the same quick, localized invoice flow.',
      },
      {
        href: '/free-invoice-maker-freelancers',
        title: 'Freelancer Invoice Maker',
        description: 'Return to the broader freelancer landing page if that is the better fit.',
      },
      {
        href: '/send-invoice-whatsapp',
        title: 'Send Invoice on WhatsApp',
        description: 'Use the WhatsApp-first guide when client billing mostly happens in chat.',
      },
    ],
    relatedTitle: 'Stay on geo and freelancer pages that match the same intent',
  },
];
