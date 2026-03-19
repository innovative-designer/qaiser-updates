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
        'Free Invoice Kit helps you capture that moment with a clean PDF invoice while the project details and approval context are still fresh.',
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
        description: 'Review a clean invoice structure before opening the builder for your next client.',
      },
      {
        href: '/send-invoice-whatsapp',
        title: 'Send Invoice on WhatsApp',
        description: 'Move the finished PDF into chat when clients reply faster there than by email.',
      },
    ],
    relatedTitle: 'More invoicing guides for creative freelancers',
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
          'If your clients already coordinate sessions in WhatsApp, the finished invoice can follow in the same conversation.',
        icon: 'message-circle',
      },
    ],
    workflowPanel: {
      eyebrow: 'Common billing moment',
      title: 'The client has the previews. The invoice should not become another delayed admin task.',
      body: [
        'Photography businesses often invoice around booking, delivery, or upgrade requests, and those moments move quickly.',
        'Free Invoice Kit keeps the process short enough that you can send the document while the client is still replying and the project details are easy to confirm.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a photography invoice that matches the way shoots are actually sold.',
      body: [
        'Open the builder, add the session details, and export the PDF while the delivery conversation is still active.',
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
    relatedTitle: 'Related invoice guides for creative work',
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
      'Consultants often need to bill after a call, a milestone, or a monthly retainer checkpoint. Free Invoice Kit helps you package that work into a clear PDF invoice without a long setup process.',
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
        'Consulting work often closes loops quickly: a workshop ends, the recap is sent, and the invoice needs to follow while the context is still fresh.',
        'Free Invoice Kit makes that handoff feel immediate and professional by turning your scope, hours, or milestone into a polished PDF without extra setup.',
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
        description: 'See the faster no-signup invoice workflow built for solo consultants and service businesses.',
      },
    ],
    relatedTitle: 'More invoicing resources for consultants',
  },
  {
    pageType: 'industry',
    slug: 'small-business',
    path: '/invoice-generator/small-business',
    lastModified: '2026-03-18',
    title: 'Free Invoice Generator for Small Business | Online PDF Invoice Maker',
    description:
      'Create professional invoice PDFs for free. Free Invoice Kit helps small businesses and sole traders send clear invoices online without signup or accounting software.',
    h1: 'Invoice generator for small business that need to get paid without the admin overhead.',
    badge: 'Small Business',
    intro:
      'Free Invoice Kit gives small businesses a short path from job done to invoice sent: enter client and line items, generate a clean PDF, and share it by WhatsApp or email without a billing suite or signup wall.',
    keywords: [
      'invoice generator for small business',
      'free invoice generator for small business',
      'best invoice generator for small business',
      'online invoice generator for business',
    ],
    primaryCta: {
      href: '/create',
      label: 'Create Invoice',
    },
    secondaryCta: {
      href: '/invoice-template/freelancer',
      label: 'See invoice template',
    },
    heroAside: {
      eyebrow: 'Why small businesses use it',
      points: [
        'No signup or account setup—start invoicing in one flow.',
        'PDF output is client-ready and works for bank transfers, PayPal, or local payment.',
        'Works on phone or laptop so you can invoice from the shop, office, or home.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Small business workflow',
    benefitSectionTitle: 'Built for businesses that need to invoice often without turning it into a full-time admin job.',
    benefitCards: [
      {
        title: 'Clear line items',
        description:
          'List services, products, or hours in a format that clients and bookkeepers can read at a glance.',
        icon: 'receipt',
      },
      {
        title: 'Fast PDF export',
        description:
          'Generate a polished invoice PDF and send it the same day the work is done or the order is fulfilled.',
        icon: 'file-check',
      },
      {
        title: 'Share where clients are',
        description:
          'Send the invoice by WhatsApp, email, or download so it fits how you already communicate with customers.',
        icon: 'message-circle',
      },
    ],
    workflowPanel: {
      eyebrow: 'Common moment',
      title: 'The job is done. The invoice should follow before the conversation goes cold.',
      body: [
        'Small businesses often lose time when invoicing is delayed or buried in spreadsheets.',
        'Free Invoice Kit keeps the path short: fill the form, get the PDF, and send it while the client is still responsive.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a free invoice and send it in under a minute.',
      body: ['Open the builder, add your business and client details, and export a PDF ready to send.'],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'Is this invoice generator really free for small businesses?',
        answer:
          'Yes. Core invoice creation, PDF generation, and sharing are free. No signup is required to start.',
      },
      {
        question: 'Can I use this for services and product sales?',
        answer:
          'Yes. The builder supports line items for both—list services, one-off products, or a mix so the invoice matches how you bill.',
      },
      {
        question: 'Can I send the invoice by WhatsApp or email?',
        answer:
          'Yes. Export the PDF and share it through whichever channel your clients use—WhatsApp, email, or download.',
      },
    ],
    faqTitle: 'Questions small businesses ask before switching',
    relatedLinks: [
      {
        href: '/invoice-generator/freelancers',
        title: 'Invoice Generator for Freelancers',
        description: 'Same free workflow built for solo service providers and contractors.',
      },
      {
        href: '/free-invoice-maker-freelancers',
        title: 'Freelancer Invoice Maker',
        description: 'See the no-signup invoicing flow for freelancers and small teams.',
      },
      {
        href: '/send-invoice-whatsapp',
        title: 'Send Invoice on WhatsApp',
        description: 'Use the WhatsApp sending guide when clients reply faster in chat.',
      },
    ],
    relatedTitle: 'More invoicing guides for small business',
  },
  {
    pageType: 'industry',
    slug: 'freelancers',
    path: '/invoice-generator/freelancers',
    lastModified: '2026-03-18',
    title: 'Free Invoice Generator for Freelancers | Online PDF Invoice Maker',
    description:
      'Create professional invoice PDFs for freelancers in minutes. Free Invoice Kit helps freelancers and independent contractors send clean invoices online without signup.',
    h1: 'Invoice generator for freelancers who need the invoice out before the thread goes quiet.',
    badge: 'Freelancers',
    intro:
      'Free Invoice Kit is built for freelancers: add client and project details, generate a clean PDF, and send it by WhatsApp or email without creating an account or opening a billing suite.',
    keywords: [
      'invoice generator for freelancers',
      'free invoice generator for freelancers',
      'best invoice generator for freelancers',
      'online invoice generator for freelancers',
      'pdf invoice generator for freelancers',
    ],
    primaryCta: {
      href: '/create',
      label: 'Create Freelancer Invoice',
    },
    secondaryCta: {
      href: '/free-invoice-maker-freelancers',
      label: 'Freelancer invoice guide',
    },
    heroAside: {
      eyebrow: 'Why freelancers use it',
      points: [
        'No signup—create and export an invoice in one flow.',
        'PDF is client-ready for Upwork, Fiverr, direct clients, or Payoneer.',
        'Works on phone and laptop so you can invoice right after delivery.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Freelancer workflow',
    benefitSectionTitle: 'Useful when you bill per project, per hour, or on retainer—without the overhead.',
    benefitCards: [
      {
        title: 'Project and hourly friendly',
        description:
          'List fixed-price deliverables, hourly work, or monthly retainers so the invoice matches how you actually bill.',
        icon: 'clock',
      },
      {
        title: 'Send where clients are',
        description:
          'Export the PDF and move it into WhatsApp, email, or platform messages so payment follows the same conversation.',
        icon: 'message-circle',
      },
      {
        title: 'Lightweight and fast',
        description:
          'No accounting software commitment—just the invoice when you need it, from any device.',
        icon: 'zap',
      },
    ],
    workflowPanel: {
      eyebrow: 'Common billing moment',
      title: 'The deliverable is sent. The invoice should be next, not next week.',
      body: [
        'Freelancers often get paid faster when the invoice follows right after approval or delivery.',
        'Free Invoice Kit keeps that path short: fill once, generate PDF, send—without signup or extra tools.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a freelancer invoice and send it in under a minute.',
      body: ['Open the builder, add client and line items, and export a PDF ready for WhatsApp or email.'],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'Is this free for freelancers with no signup?',
        answer:
          'Yes. The core workflow is free and no-signup—create and export invoice PDFs immediately.',
      },
      {
        question: 'Can I use this for Payoneer or platform payouts?',
        answer:
          'Yes. The PDF invoice is client-ready and can be used for direct clients, marketplaces, or Payoneer-style payouts.',
      },
      {
        question: 'Can I send the invoice on WhatsApp?',
        answer:
          'Yes. Export the PDF and share it in chat—the product is built for fast WhatsApp-friendly sending.',
      },
    ],
    faqTitle: 'Questions freelancers ask before switching',
    relatedLinks: [
      {
        href: '/free-invoice-maker-freelancers',
        title: 'Freelancer Invoice Maker',
        description: 'Deep dive on the no-signup freelancer invoicing workflow.',
      },
      {
        href: '/invoice-generator/contractors',
        title: 'Invoice Generator for Contractors',
        description: 'Similar flow for contractors and independent workers.',
      },
      {
        href: '/send-invoice-whatsapp',
        title: 'Send Invoice on WhatsApp',
        description: 'Step-by-step guide for sending invoice PDFs in WhatsApp.',
      },
    ],
    relatedTitle: 'More invoicing guides for freelancers',
  },
  {
    pageType: 'industry',
    slug: 'amazon-sellers',
    path: '/invoice-generator/amazon-sellers',
    lastModified: '2026-03-18',
    title: 'Free Invoice Generator for Amazon Sellers | Online PDF Invoice Maker',
    description:
      'Create professional invoice PDFs for Amazon sellers and FBA businesses. Free Invoice Kit helps you send clean invoices online without signup.',
    h1: 'Invoice generator for Amazon sellers who need a clean PDF without extra software.',
    badge: 'Amazon Sellers',
    intro:
      'Free Invoice Kit helps Amazon sellers create client-ready invoice PDFs for B2B orders, reimbursements, or buyer requests. Enter details, generate the PDF, and send it by email or download—no account or billing software required.',
    keywords: [
      'invoice generator for amazon',
      'invoice generator for amazon seller',
      'free invoice generator for amazon',
      'online invoice generator for amazon',
    ],
    primaryCta: {
      href: '/create',
      label: 'Create Amazon Seller Invoice',
    },
    secondaryCta: {
      href: '/invoice-generator/small-business',
      label: 'See small business invoices',
    },
    heroAside: {
      eyebrow: 'Why Amazon sellers use it',
      points: [
        'No signup—create and download or send the PDF in one flow.',
        'Clean line items for products, quantities, and amounts so buyers get a clear document.',
        'Works on any device so you can invoice from wherever you manage orders.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Amazon seller workflow',
    benefitSectionTitle: 'Useful when you need to send an invoice to a buyer, partner, or for your own records.',
    benefitCards: [
      {
        title: 'Product and quantity ready',
        description:
          'List SKUs, product names, quantities, and prices in a format that looks professional for B2B or buyer requests.',
        icon: 'receipt',
      },
      {
        title: 'PDF in seconds',
        description:
          'Generate a polished invoice PDF and email it or download it without opening a separate billing app.',
        icon: 'file-check',
      },
      {
        title: 'Currency flexible',
        description:
          'Use your preferred currency so the invoice matches the marketplace or buyer’s expectation.',
        icon: 'wallet',
      },
    ],
    workflowPanel: {
      eyebrow: 'Common moment',
      title: 'The order or request is in. The invoice should be ready to send without delay.',
      body: [
        'Amazon sellers often need to send an invoice quickly when a buyer or partner asks for one.',
        'Free Invoice Kit keeps the path short: enter business and order details, generate the PDF, and send or download.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create an Amazon seller invoice and export the PDF.',
      body: ['Open the builder, add your business and order details, and generate a client-ready PDF.'],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'Is this free for Amazon sellers?',
        answer:
          'Yes. Core invoice creation and PDF export are free. No signup is required to use the builder.',
      },
      {
        question: 'Can I use this for B2B orders or buyer requests?',
        answer:
          'Yes. The invoice PDF includes business details, line items, and totals in a format suitable for buyers or partners.',
      },
      {
        question: 'Can I send the invoice by email?',
        answer:
          'Yes. Export the PDF and attach it to an email or share it through your usual channel.',
      },
    ],
    faqTitle: 'Questions Amazon sellers ask',
    relatedLinks: [
      {
        href: '/invoice-generator/small-business',
        title: 'Invoice Generator for Small Business',
        description: 'Same free workflow for small business and sole traders.',
      },
      {
        href: '/invoice-generator/freelancers',
        title: 'Invoice Generator for Freelancers',
        description: 'No-signup invoicing for freelancers and contractors.',
      },
      {
        href: '/create',
        title: 'Create Invoice',
        description: 'Open the builder and create your first invoice in under a minute.',
      },
    ],
    relatedTitle: 'More invoicing guides for sellers',
  },
  {
    pageType: 'industry',
    slug: 'contractors',
    path: '/invoice-generator/contractors',
    lastModified: '2026-03-18',
    title: 'Free Invoice Generator for Contractors | Online PDF Invoice Maker',
    description:
      'Create professional invoice PDFs for contractors and independent workers. Free Invoice Kit helps you bill for hours worked or by project without signup or accounting software.',
    h1: 'Invoice generator for contractors who need to bill for hours worked or by job.',
    badge: 'Contractors',
    intro:
      'Free Invoice Kit helps contractors turn completed work into a clear invoice: add client and job details, list hours or line items, generate a PDF, and send it by WhatsApp or email without a billing suite.',
    keywords: [
      'invoice generator for contractor',
      'invoice generator for independent contractors',
      'invoice generator for hours worked',
      'free invoice generator for contractors',
    ],
    primaryCta: {
      href: '/create',
      label: 'Create Contractor Invoice',
    },
    secondaryCta: {
      href: '/invoice-template/hourly',
      label: 'See hourly template',
    },
    heroAside: {
      eyebrow: 'Why contractors use it',
      points: [
        'Bill by job, by hour, or by line item in one simple form.',
        'PDF is client-ready for general contractors, subs, or clients who pay on receipt.',
        'No signup—create and send the invoice from your phone or laptop.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Contractor workflow',
    benefitSectionTitle: 'Built for contractors who need to invoice after the work is done, not after opening a heavy app.',
    benefitCards: [
      {
        title: 'Hours and line items',
        description:
          'List labor hours, materials, or fixed-price jobs so the invoice matches how you actually bill.',
        icon: 'clock',
      },
      {
        title: 'Fast PDF export',
        description:
          'Generate a professional invoice PDF and send it the same day so payment doesn’t get delayed.',
        icon: 'file-check',
      },
      {
        title: 'Works on any device',
        description:
          'Create the invoice from the job site, truck, or office without desktop-only software.',
        icon: 'smartphone',
      },
    ],
    workflowPanel: {
      eyebrow: 'Common billing moment',
      title: 'The job is done. The invoice should go out before the next job starts.',
      body: [
        'Contractors often get paid faster when the invoice follows right after completion or approval.',
        'Free Invoice Kit keeps that path short: enter client and work details, get the PDF, and send it without signup or extra tools.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a contractor invoice and send it in under a minute.',
      body: ['Open the builder, add client and job details, and export a PDF ready to send or download.'],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      {
        question: 'Can I bill for hours worked and materials on the same invoice?',
        answer:
          'Yes. Add separate line items for labor hours, materials, or fixed-price jobs so the invoice reflects how you bill.',
      },
      {
        question: 'Is this free for independent contractors?',
        answer:
          'Yes. The core invoice creation and PDF export are free. No signup is required.',
      },
      {
        question: 'Can I send the invoice by WhatsApp or email?',
        answer:
          'Yes. Export the PDF and share it through WhatsApp, email, or download—whatever your client prefers.',
      },
    ],
    faqTitle: 'Questions contractors ask before switching',
    relatedLinks: [
      {
        href: '/invoice-generator/freelancers',
        title: 'Invoice Generator for Freelancers',
        description: 'Same no-signup workflow for freelancers and solo service providers.',
      },
      {
        href: '/invoice-template/hourly',
        title: 'Hourly Invoice Template',
        description: 'See a clean structure for hourly and project-based billing.',
      },
      {
        href: '/send-invoice-whatsapp',
        title: 'Send Invoice on WhatsApp',
        description: 'Use the WhatsApp sending guide when clients reply in chat.',
      },
    ],
    relatedTitle: 'More invoicing guides for contractors',
  },
  {
    pageType: 'industry',
    slug: 'ebay-sellers',
    path: '/invoice-generator/ebay-sellers',
    lastModified: '2026-03-18',
    title: 'Free Invoice Generator for eBay Sellers | Online PDF Invoice Maker',
    description:
      'Create professional invoice PDFs for eBay sellers. Free Invoice Kit helps you send clean B2B or buyer invoices online without signup.',
    h1: 'Invoice generator for eBay sellers who need a clean PDF fast.',
    badge: 'eBay Sellers',
    intro:
      'Free Invoice Kit helps eBay sellers create client-ready invoice PDFs for buyers or partners. Enter details, generate the PDF, and send or download—no account or billing software required.',
    keywords: [
      'invoice generator for ebay',
      'free invoice generator for ebay',
      'ebay seller invoice',
    ],
    primaryCta: { href: '/create', label: 'Create eBay Invoice' },
    secondaryCta: { href: '/invoice-generator/amazon-sellers', label: 'See Amazon seller invoices' },
    heroAside: {
      eyebrow: 'Why eBay sellers use it',
      points: [
        'No signup—create and export the PDF in one flow.',
        'Clear line items for products, quantities, and amounts.',
        'Works on any device so you can invoice from wherever you manage sales.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'eBay seller workflow',
    benefitSectionTitle: 'Useful when you need to send an invoice to a buyer or partner quickly.',
    benefitCards: [
      { title: 'Product-ready line items', description: 'List items, quantities, and prices in a professional format.', icon: 'receipt' },
      { title: 'PDF in seconds', description: 'Generate a polished invoice PDF and send or download without extra apps.', icon: 'file-check' },
      { title: 'Currency flexible', description: 'Use your preferred currency for the invoice.', icon: 'wallet' },
    ],
    workflowPanel: {
      eyebrow: 'Common moment',
      title: 'The order or request is in. The invoice should be ready without delay.',
      body: [
        'eBay sellers often need to send an invoice when a buyer or partner asks for one.',
        'Free Invoice Kit keeps the path short: enter details, generate the PDF, and send or download.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create an eBay seller invoice and export the PDF.',
      body: ['Open the builder, add your business and order details, and generate a client-ready PDF.'],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      { question: 'Is this free for eBay sellers?', answer: 'Yes. Core invoice creation and PDF export are free. No signup required.' },
      { question: 'Can I use this for B2B or buyer requests?', answer: 'Yes. The PDF includes business details, line items, and totals in a clear format.' },
      { question: 'Can I send the invoice by email?', answer: 'Yes. Export the PDF and attach it to an email or share it as needed.' },
    ],
    faqTitle: 'Questions eBay sellers ask',
    relatedLinks: [
      { href: '/invoice-generator/amazon-sellers', title: 'Invoice Generator for Amazon Sellers', description: 'Same free workflow for marketplace sellers.' },
      { href: '/invoice-generator/small-business', title: 'Invoice Generator for Small Business', description: 'Free invoicing for small business and sole traders.' },
      { href: '/create', title: 'Create Invoice', description: 'Open the builder and create your first invoice.' },
    ],
    relatedTitle: 'More invoicing guides for sellers',
  },
  {
    pageType: 'industry',
    slug: 'travel-agency',
    path: '/invoice-generator/travel-agency',
    lastModified: '2026-03-18',
    title: 'Free Invoice Generator for Travel Agency | Online PDF Invoice Maker',
    description:
      'Create professional invoice PDFs for travel agencies and tour operators. Free Invoice Kit helps you bill clients online without signup.',
    h1: 'Invoice generator for travel agencies that need to send clean invoices fast.',
    badge: 'Travel & Tours',
    intro:
      'Free Invoice Kit helps travel agencies and tour operators create client-ready invoices for bookings, packages, or add-ons. Enter details, generate the PDF, and send by email or WhatsApp.',
    keywords: [
      'invoice generator for travel agency',
      'online invoice generator for travel agency',
      'travel agency invoice maker',
    ],
    primaryCta: { href: '/create', label: 'Create Travel Invoice' },
    secondaryCta: { href: '/invoice-generator/small-business', label: 'See small business invoices' },
    heroAside: {
      eyebrow: 'Why travel agencies use it',
      points: [
        'No signup—create and send the invoice in one flow.',
        'List packages, trips, and add-ons as clear line items.',
        'Works on phone or laptop so you can invoice from the office or on the go.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Travel agency workflow',
    benefitSectionTitle: 'Useful when you need to invoice after a booking or before departure.',
    benefitCards: [
      { title: 'Package and add-on friendly', description: 'List trips, packages, and extras in a format clients understand.', icon: 'receipt' },
      { title: 'Fast PDF export', description: 'Generate a professional invoice and send it the same day.', icon: 'file-check' },
      { title: 'Share where clients are', description: 'Send the PDF by email or WhatsApp.', icon: 'message-circle' },
    ],
    workflowPanel: {
      eyebrow: 'Common moment',
      title: 'The booking is confirmed. The invoice should follow quickly.',
      body: [
        'Travel agencies often need to send an invoice right after a booking or when the client requests it.',
        'Free Invoice Kit keeps the path short: enter details, get the PDF, and send.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a travel agency invoice and send it in under a minute.',
      body: ['Open the builder, add client and booking details, and export a PDF ready to send.'],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      { question: 'Is this free for travel agencies?', answer: 'Yes. Core invoice creation and PDF export are free. No signup required.' },
      { question: 'Can I list multiple trips or packages on one invoice?', answer: 'Yes. Add separate line items for each booking, package, or add-on.' },
      { question: 'Can I send the invoice by WhatsApp?', answer: 'Yes. Export the PDF and share it in chat or email.' },
    ],
    faqTitle: 'Questions travel agencies ask',
    relatedLinks: [
      { href: '/invoice-generator/small-business', title: 'Invoice Generator for Small Business', description: 'Free invoicing for small business and hospitality.' },
      { href: '/invoice-generator/small-business', title: 'Invoice Generator for Small Business', description: 'Free invoicing for small business.' },
      { href: '/send-invoice-whatsapp', title: 'Send Invoice on WhatsApp', description: 'Guide for sending invoice PDFs in WhatsApp.' },
    ],
    relatedTitle: 'More invoicing guides for travel and hospitality',
  },
  {
    pageType: 'industry',
    slug: 'cleaning-services',
    path: '/invoice-generator/cleaning-services',
    lastModified: '2026-03-18',
    title: 'Free Invoice Generator for Cleaning Services | Online PDF Invoice Maker',
    description:
      'Create professional invoice PDFs for cleaning businesses. Free Invoice Kit helps cleaning services bill clients online without signup.',
    h1: 'Invoice generator for cleaning services that need to get paid without the admin.',
    badge: 'Cleaning Services',
    intro:
      'Free Invoice Kit helps cleaning businesses create clear invoices for one-off jobs, recurring services, or add-ons. Enter client and job details, generate the PDF, and send by WhatsApp or email.',
    keywords: [
      'invoice generator for cleaning services',
      'cleaning service invoice',
      'free invoice generator for cleaning',
    ],
    primaryCta: { href: '/create', label: 'Create Cleaning Invoice' },
    secondaryCta: { href: '/invoice-generator/contractors', label: 'See contractor invoices' },
    heroAside: {
      eyebrow: 'Why cleaning services use it',
      points: [
        'No signup—create and send the invoice from your phone or laptop.',
        'List jobs, recurring visits, or extras as clear line items.',
        'PDF is client-ready for bank transfer or cash payment.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Cleaning workflow',
    benefitSectionTitle: 'Useful when you need to invoice after a visit or at the end of the week.',
    benefitCards: [
      { title: 'Job and visit friendly', description: 'Bill per visit, per room, or for add-ons in a clear format.', icon: 'receipt' },
      { title: 'Fast PDF', description: 'Generate the invoice and send it the same day so payment is not delayed.', icon: 'file-check' },
      { title: 'Works on any device', description: 'Create the invoice from the job site or office.', icon: 'smartphone' },
    ],
    workflowPanel: {
      eyebrow: 'Common moment',
      title: 'The job is done. The invoice should go out before the next one.',
      body: [
        'Cleaning services get paid faster when the invoice follows right after the visit.',
        'Free Invoice Kit keeps the path short: enter details, get the PDF, and send.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a cleaning service invoice and send it in under a minute.',
      body: ['Open the builder, add client and job details, and export a PDF ready to send.'],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      { question: 'Is this free for cleaning businesses?', answer: 'Yes. Core invoice creation and PDF export are free. No signup required.' },
      { question: 'Can I bill for recurring weekly or monthly cleaning?', answer: 'Yes. Add line items for each visit or use a single line for the period—whatever matches how you bill.' },
      { question: 'Can I send the invoice by WhatsApp?', answer: 'Yes. Export the PDF and share it in chat—many cleaning clients prefer WhatsApp.' },
    ],
    faqTitle: 'Questions cleaning services ask',
    relatedLinks: [
      { href: '/invoice-generator/contractors', title: 'Invoice Generator for Contractors', description: 'Same workflow for contractors and field services.' },
      { href: '/invoice-generator/small-business', title: 'Invoice Generator for Small Business', description: 'Free invoicing for small business.' },
      { href: '/send-invoice-whatsapp', title: 'Send Invoice on WhatsApp', description: 'Guide for sending invoice PDFs in WhatsApp.' },
    ],
    relatedTitle: 'More invoicing guides for cleaning and field services',
  },
  {
    pageType: 'industry',
    slug: 'content-creators',
    path: '/invoice-generator/content-creators',
    lastModified: '2026-03-18',
    title: 'Free Invoice Generator for Content Creators & Influencers | Online PDF Maker',
    description:
      'Create professional invoice PDFs for content creators and influencers. Free Invoice Kit helps you bill brands and clients online without signup.',
    h1: 'Invoice generator for content creators and influencers who need to get paid on time.',
    badge: 'Content Creators',
    intro:
      'Free Invoice Kit helps content creators and influencers turn sponsored posts, collaborations, and deliverables into clear invoice PDFs. Enter client and project details, generate the PDF, and send by email or WhatsApp.',
    keywords: [
      'invoice generator for content creator',
      'invoice generator for influencers',
      'free invoice generator for creators',
    ],
    primaryCta: { href: '/create', label: 'Create Creator Invoice' },
    secondaryCta: { href: '/invoice-generator/freelancers', label: 'See freelancer invoices' },
    heroAside: {
      eyebrow: 'Why creators use it',
      points: [
        'No signup—create and send the invoice in one flow.',
        'List deliverables, posts, or campaign fees as clear line items.',
        'PDF is brand-ready for agencies and direct clients.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Creator workflow',
    benefitSectionTitle: 'Useful when you need to invoice after a campaign or collaboration.',
    benefitCards: [
      { title: 'Deliverable-friendly', description: 'Bill per post, per video, or per campaign in a format brands understand.', icon: 'receipt' },
      { title: 'Fast PDF export', description: 'Generate a professional invoice and send it while the collaboration is still active.', icon: 'file-check' },
      { title: 'Share where clients are', description: 'Send the PDF by email or WhatsApp.', icon: 'message-circle' },
    ],
    workflowPanel: {
      eyebrow: 'Common moment',
      title: 'The content is delivered. The invoice should follow before the thread goes cold.',
      body: [
        'Content creators often get paid faster when the invoice follows right after delivery or approval.',
        'Free Invoice Kit keeps the path short: enter details, get the PDF, and send.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a content creator invoice and send it in under a minute.',
      body: ['Open the builder, add client and project details, and export a PDF ready to send.'],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      { question: 'Is this free for content creators and influencers?', answer: 'Yes. Core invoice creation and PDF export are free. No signup required.' },
      { question: 'Can I invoice for sponsored posts or campaign fees?', answer: 'Yes. Add line items for each deliverable, post, or campaign so the invoice matches how you bill.' },
      { question: 'Can I send the invoice by WhatsApp?', answer: 'Yes. Export the PDF and share it in chat or email.' },
    ],
    faqTitle: 'Questions content creators ask',
    relatedLinks: [
      { href: '/invoice-generator/freelancers', title: 'Invoice Generator for Freelancers', description: 'Same no-signup workflow for freelancers.' },
      { href: '/invoice-generator/photographers', title: 'Invoice Generator for Photographers', description: 'Similar workflow for visual creators.' },
      { href: '/send-invoice-whatsapp', title: 'Send Invoice on WhatsApp', description: 'Guide for sending invoice PDFs in WhatsApp.' },
    ],
    relatedTitle: 'More invoicing guides for creators',
  },
  {
    pageType: 'industry',
    slug: 'video-editors',
    path: '/invoice-generator/video-editors',
    lastModified: '2026-03-18',
    title: 'Free Invoice Generator for Video Editors | Online PDF Invoice Maker',
    description:
      'Create professional invoice PDFs for video editors and post-production. Free Invoice Kit helps you bill for edits, projects, or hours without signup.',
    h1: 'Invoice generator for video editors who need to bill after the cut is done.',
    badge: 'Video & Post-Production',
    intro:
      'Free Invoice Kit helps video editors turn completed edits, projects, or hourly work into clear invoice PDFs. Enter client and project details, generate the PDF, and send by email or WhatsApp.',
    keywords: [
      'invoice generator for video editing',
      'video editor invoice',
      'free invoice generator for video editors',
    ],
    primaryCta: { href: '/create', label: 'Create Video Editor Invoice' },
    secondaryCta: { href: '/invoice-template/hourly', label: 'See hourly template' },
    heroAside: {
      eyebrow: 'Why video editors use it',
      points: [
        'No signup—create and send the invoice in one flow.',
        'List projects, hours, or revisions as clear line items.',
        'PDF is client-ready for agencies and direct clients.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Video editing workflow',
    benefitSectionTitle: 'Useful when you need to invoice after delivery or at milestone.',
    benefitCards: [
      { title: 'Project and hourly friendly', description: 'Bill per project, per hour, or per revision in a clear format.', icon: 'clock' },
      { title: 'Fast PDF export', description: 'Generate the invoice and send it while the client still has the project in mind.', icon: 'file-check' },
      { title: 'Works on any device', description: 'Create the invoice from your editing setup or phone.', icon: 'smartphone' },
    ],
    workflowPanel: {
      eyebrow: 'Common moment',
      title: 'The edit is delivered. The invoice should follow before the next project.',
      body: [
        'Video editors often get paid faster when the invoice follows right after delivery or approval.',
        'Free Invoice Kit keeps the path short: enter details, get the PDF, and send.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a video editor invoice and send it in under a minute.',
      body: ['Open the builder, add client and project details, and export a PDF ready to send.'],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      { question: 'Is this free for video editors?', answer: 'Yes. Core invoice creation and PDF export are free. No signup required.' },
      { question: 'Can I bill by the hour or per project?', answer: 'Yes. Add line items for hours, fixed-fee projects, or revisions—whatever matches how you bill.' },
      { question: 'Can I send the invoice by WhatsApp?', answer: 'Yes. Export the PDF and share it in chat or email.' },
    ],
    faqTitle: 'Questions video editors ask',
    relatedLinks: [
      { href: '/invoice-generator/consultants', title: 'Invoice Generator for Consultants', description: 'Similar workflow for project-based billing.' },
      { href: '/invoice-generator/photographers', title: 'Invoice Generator for Photographers', description: 'Another creative-service invoice flow.' },
      { href: '/invoice-template/hourly', title: 'Hourly Invoice Template', description: 'Structure for hourly and project-based billing.' },
    ],
    relatedTitle: 'More invoicing guides for video and creative work',
  },
  {
    pageType: 'industry',
    slug: 'restaurants',
    path: '/invoice-generator/restaurants',
    lastModified: '2026-03-18',
    title: 'Free Invoice Generator for Restaurants | Online PDF Invoice Maker',
    description:
      'Create professional invoice PDFs for restaurants and catering. Free Invoice Kit helps you bill for events, catering, or B2B orders without signup.',
    h1: 'Invoice generator for restaurants that need to send clean invoices to clients or suppliers.',
    badge: 'Restaurants & Catering',
    intro:
      'Free Invoice Kit helps restaurants and caterers create client-ready invoices for events, catering orders, or B2B supply. Enter client and order details, generate the PDF, and send by email or WhatsApp.',
    keywords: [
      'invoice generator for restaurant',
      'free invoice generator for restaurant',
      'restaurant invoice maker',
    ],
    primaryCta: { href: '/create', label: 'Create Restaurant Invoice' },
    secondaryCta: { href: '/invoice-generator/small-business', label: 'See small business invoices' },
    heroAside: {
      eyebrow: 'Why restaurants use it',
      points: [
        'No signup—create and send the invoice in one flow.',
        'List events, catering orders, or items as clear line items.',
        'PDF is client-ready for payment on receipt.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Restaurant workflow',
    benefitSectionTitle: 'Useful when you need to invoice after an event or order.',
    benefitCards: [
      { title: 'Order and event friendly', description: 'Bill for catering, events, or B2B orders in a clear format.', icon: 'receipt' },
      { title: 'Fast PDF export', description: 'Generate the invoice and send it the same day.', icon: 'file-check' },
      { title: 'Share where clients are', description: 'Send the PDF by email or WhatsApp.', icon: 'message-circle' },
    ],
    workflowPanel: {
      eyebrow: 'Common moment',
      title: 'The order or event is done. The invoice should go out quickly.',
      body: [
        'Restaurants and caterers get paid faster when the invoice follows right after the order or event.',
        'Free Invoice Kit keeps the path short: enter details, get the PDF, and send.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a restaurant invoice and send it in under a minute.',
      body: ['Open the builder, add client and order details, and export a PDF ready to send.'],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      { question: 'Is this free for restaurants?', answer: 'Yes. Core invoice creation and PDF export are free. No signup required.' },
      { question: 'Can I use this for catering and events?', answer: 'Yes. Add line items for events, menus, or orders—whatever matches how you bill.' },
      { question: 'Can I send the invoice by WhatsApp?', answer: 'Yes. Export the PDF and share it in chat or email.' },
    ],
    faqTitle: 'Questions restaurants ask',
    relatedLinks: [
      { href: '/invoice-generator/small-business', title: 'Invoice Generator for Small Business', description: 'Free invoicing for small business.' },
      { href: '/invoice-generator/small-business', title: 'Invoice Generator for Small Business', description: 'Free invoicing for small business.' },
      { href: '/send-invoice-whatsapp', title: 'Send Invoice on WhatsApp', description: 'Guide for sending invoice PDFs in WhatsApp.' },
    ],
    relatedTitle: 'More invoicing guides for restaurants and hospitality',
  },
  {
    pageType: 'industry',
    slug: 'sole-traders',
    path: '/invoice-generator/sole-traders',
    lastModified: '2026-03-18',
    title: 'Free Invoice Generator for Sole Traders & Self-Employed | Online PDF Maker',
    description:
      'Create professional invoice PDFs for sole traders and self-employed. Free Invoice Kit helps you bill clients online without signup or accounting software.',
    h1: 'Invoice generator for sole traders and self-employed who need to get paid without the admin.',
    badge: 'Sole Traders',
    intro:
      'Free Invoice Kit helps sole traders and self-employed workers create clear invoices for clients. Enter your details and line items, generate the PDF, and send by WhatsApp or email—no account or billing suite required.',
    keywords: [
      'invoice generator for self employed',
      'invoice generator for sole trader',
      'free invoice generator for sole traders',
    ],
    primaryCta: { href: '/create', label: 'Create Sole Trader Invoice' },
    secondaryCta: { href: '/invoice-generator/freelancers', label: 'See freelancer invoices' },
    heroAside: {
      eyebrow: 'Why sole traders use it',
      points: [
        'No signup—create and send the invoice in one flow.',
        'PDF is client-ready for bank transfer or payment on receipt.',
        'Works on phone or laptop so you can invoice from anywhere.',
      ],
      tone: 'quiet',
    },
    benefitSectionEyebrow: 'Sole trader workflow',
    benefitSectionTitle: 'Useful when you need to invoice often without a full accounting setup.',
    benefitCards: [
      { title: 'Clear line items', description: 'List services or products in a format clients and HMRC (or your tax authority) can read.', icon: 'receipt' },
      { title: 'Fast PDF export', description: 'Generate the invoice and send it the same day so payment is not delayed.', icon: 'file-check' },
      { title: 'Lightweight', description: 'No billing suite commitment—just the invoice when you need it.', icon: 'zap' },
    ],
    workflowPanel: {
      eyebrow: 'Common moment',
      title: 'The job is done. The invoice should go out before the next one.',
      body: [
        'Sole traders get paid faster when the invoice follows right after the work is done.',
        'Free Invoice Kit keeps the path short: enter details, get the PDF, and send.',
      ],
    },
    ctaPanel: {
      eyebrow: 'Start now',
      title: 'Create a sole trader invoice and send it in under a minute.',
      body: ['Open the builder, add client and job details, and export a PDF ready to send.'],
      tone: 'accent',
      buttonHref: '/create',
      buttonLabel: 'Open Invoice Builder',
    },
    faqs: [
      { question: 'Is this free for sole traders and self-employed?', answer: 'Yes. Core invoice creation and PDF export are free. No signup required.' },
      { question: 'Can I use this for UK sole traders or other countries?', answer: 'Yes. The invoice PDF is suitable for sole traders in the UK, Australia, and other markets—use your local currency.' },
      { question: 'Can I send the invoice by WhatsApp?', answer: 'Yes. Export the PDF and share it in chat or email.' },
    ],
    faqTitle: 'Questions sole traders ask',
    relatedLinks: [
      { href: '/invoice-generator/freelancers', title: 'Invoice Generator for Freelancers', description: 'Same no-signup workflow for freelancers.' },
      { href: '/invoice-generator/uk', title: 'Invoice Generator UK', description: 'Free invoice generator for UK freelancers and sole traders.' },
      { href: '/invoice-generator/australia', title: 'Invoice Generator Australia', description: 'Free invoice generator for Australia.' },
    ],
    relatedTitle: 'More invoicing guides for sole traders',
  },
];
