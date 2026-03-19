import type { ComparisonPageData } from '@/types/seo-page';

export const comparisonPages: ComparisonPageData[] = [
  {
    slug: 'stripe',
    path: '/compare/stripe',
    lastModified: '2026-03-11',
    title: 'Free Stripe Invoice Alternative - No Signup Required',
    description:
      'Looking for a free Stripe invoice alternative? Free Invoice Kit skips signup and focuses on fast invoice PDF creation and WhatsApp sharing.',
    h1: 'A simpler Stripe invoice alternative when the goal is just to send the invoice.',
    badge: 'Comparison',
    intro:
      'If you need straightforward invoice creation and fast sharing, Free Invoice Kit removes the setup friction. Create the invoice, export the PDF, and send it quickly.',
    keywords: [
      'stripe invoice alternative',
      'free stripe invoice alternative',
      'whatsapp invoice alternative',
    ],
    competitorName: 'Stripe',
    primaryCta: {
      href: '/create',
      label: 'Try Free Invoice Kit Free',
    },
    heroAside: {
      eyebrow: 'Best fit',
      points: [
        'Free Invoice Kit is for fast invoice delivery and low setup overhead.',
        'Stripe is stronger when you need deeper payment automation and billing infrastructure.',
        'The right tool depends on whether you need a focused invoice workflow or a broader billing stack.',
      ],
      tone: 'quiet',
    },
    comparisonRows: [
      {
        feature: 'Signup required',
        productValue: 'No',
        competitorValue: 'Yes',
      },
      {
        feature: 'Time to first invoice',
        productValue: 'Quick start',
        competitorValue: 'Longer setup',
      },
      {
        feature: 'WhatsApp sharing flow',
        productValue: 'Built in',
        competitorValue: 'Not built for it',
        competitorState: 'weak',
      },
      {
        feature: 'Core invoicing price',
        productValue: 'Free',
        competitorValue: 'Depends on workflow',
      },
    ],
    fitCards: [
      {
        title: 'When Free Invoice Kit is better',
        description:
          'Best for freelancers and service businesses that want fast invoicing and direct sharing without account setup overhead.',
      },
      {
        title: 'When Stripe is better',
        description:
          'Better fit if you need deeper payment workflows, full billing stack automation, and enterprise-grade integrations.',
      },
    ],
    faqs: [
      {
        question: 'When is Free Invoice Kit a better fit than Stripe invoices?',
        answer:
          'It is a better fit when you want fast invoice creation, no signup friction, and quick PDF delivery instead of a heavier billing workflow.',
      },
      {
        question: 'When is Stripe still the better option?',
        answer:
          'Stripe is stronger when you need deeper payment automation, billing infrastructure, and a broader payment stack around invoicing.',
      },
      {
        question: 'Does Free Invoice Kit support WhatsApp sharing more directly?',
        answer:
          'Yes. Free Invoice Kit focuses on creating the PDF quickly so you can share it in chat or by email without extra setup.',
      },
    ],
    faqTitle: 'Comparison questions people ask before switching',
    relatedLinks: [
      {
        href: '/compare/freshbooks',
        title: 'FreshBooks Alternative',
        description: 'Compare against a heavier invoicing suite built around recurring software workflows.',
      },
      {
        href: '/compare/wave',
        title: 'Wave Alternative',
        description: 'See where a lighter invoice flow fits against free accounting-oriented software.',
      },
      {
        href: '/free-invoice-maker-freelancers',
        title: 'Freelancer Invoice Maker',
        description: 'Return to the broader no-signup invoice flow outside the comparison context.',
      },
    ],
    relatedTitle: 'Related comparisons and freelancer invoice guides',
  },
  {
    slug: 'freshbooks',
    path: '/compare/freshbooks',
    lastModified: '2026-03-11',
    title: 'FreshBooks Alternative for Fast Invoicing | Free Invoice Kit',
    description:
      'Need a FreshBooks alternative for quick, no-signup invoicing? Free Invoice Kit focuses on fast PDF generation and direct sharing instead of a full accounting stack.',
    h1: 'A FreshBooks alternative for freelancers who want the invoice out before the admin work expands.',
    badge: 'Comparison',
    intro:
      'FreshBooks is useful when you want broader accounting and client-management workflows. Free Invoice Kit is better when the main job is creating a clean invoice PDF and sending it quickly.',
    keywords: [
      'freshbooks alternative',
      'freshbooks invoicing alternative',
      'free freshbooks alternative',
    ],
    competitorName: 'FreshBooks',
    primaryCta: {
      href: '/create',
      label: 'Create Free Invoice',
    },
    secondaryCta: {
      href: '/compare/stripe',
      label: 'Compare Stripe too',
    },
    heroAside: {
      eyebrow: 'Best fit',
      points: [
        'Free Invoice Kit is for lightweight invoicing without onboarding drag.',
        'FreshBooks is stronger when you need time tracking, client management, and broader bookkeeping features.',
        'Choose based on whether you need a focused invoice workflow or a fuller business dashboard.',
      ],
      tone: 'quiet',
    },
    comparisonRows: [
      {
        feature: 'Time to first invoice',
        productValue: 'Quick start',
        competitorValue: 'Longer setup',
      },
      {
        feature: 'Account required',
        productValue: 'No',
        competitorValue: 'Yes',
      },
      {
        feature: 'Built for WhatsApp delivery',
        productValue: 'Yes',
        competitorValue: 'No',
        competitorState: 'weak',
      },
      {
        feature: 'Broader accounting features',
        productValue: 'Focused only on invoicing',
        competitorValue: 'Yes',
      },
    ],
    fitCards: [
      {
        title: 'When Free Invoice Kit is better',
        description:
          'Better when you want to create one professional invoice fast without starting a broader software setup process.',
      },
      {
        title: 'When FreshBooks is better',
        description:
          'Better when your workflow depends on recurring accounting software features, time tracking, and a larger back-office system.',
      },
    ],
    faqs: [
      {
        question: 'Is Free Invoice Kit trying to replace all of FreshBooks?',
        answer:
          'No. It is intentionally narrower. The product focuses on creating and sharing invoices quickly instead of matching a full accounting suite.',
      },
      {
        question: 'Who should prefer Free Invoice Kit over FreshBooks?',
        answer:
          'Freelancers and service businesses that only need a polished invoice flow and do not want another subscription or onboarding step are the better fit.',
      },
      {
        question: 'When should I still choose FreshBooks?',
        answer:
          'Choose FreshBooks when you need broader accounting, tracking, and client-management workflows that go beyond fast invoice delivery.',
      },
    ],
    faqTitle: 'Questions people ask before choosing a lighter FreshBooks alternative',
    relatedLinks: [
      {
        href: '/compare/wave',
        title: 'Wave Alternative',
        description: 'Compare against another accounting-oriented option before deciding how light you want the stack to be.',
      },
      {
        href: '/compare/stripe',
        title: 'Stripe Alternative',
        description: 'See the same lightweight invoicing position against a payments-heavy platform.',
      },
      {
        href: '/invoice-generator/consultants',
        title: 'Invoice Generator for Consultants',
        description: 'See a consultant-focused invoice guide built for quick project and retainer billing.',
      },
    ],
    relatedTitle: 'Related alternatives and invoicing guides',
  },
  {
    slug: 'wave',
    path: '/compare/wave',
    lastModified: '2026-03-11',
    title: 'Wave Invoice Alternative for Freelancers | Free Invoice Kit',
    description:
      'Looking for a Wave invoice alternative? Free Invoice Kit focuses on quick invoice PDFs, WhatsApp sharing, and low setup friction for freelancers.',
    h1: 'A Wave invoice alternative when free accounting software feels like more than you need.',
    badge: 'Comparison',
    intro:
      'Wave is useful when you want free accounting software with invoicing attached. Free Invoice Kit is better when the work is simply to make the invoice, export the PDF, and send it fast.',
    keywords: ['wave invoice alternative', 'wave alternative invoicing', 'free wave alternative'],
    competitorName: 'Wave',
    primaryCta: {
      href: '/create',
      label: 'Create Free Invoice',
    },
    secondaryCta: {
      href: '/compare/freshbooks',
      label: 'Compare FreshBooks too',
    },
    heroAside: {
      eyebrow: 'Best fit',
      points: [
        'Free Invoice Kit is for low-friction invoicing and chat-native delivery.',
        'Wave is stronger when you want accounting software beyond the invoice itself.',
        'The choice depends on whether you need a focused invoice tool or a free accounting environment.',
      ],
      tone: 'quiet',
    },
    comparisonRows: [
      {
        feature: 'Setup friction',
        productValue: 'Minimal',
        competitorValue: 'Higher',
      },
      {
        feature: 'WhatsApp-first delivery',
        productValue: 'Yes',
        competitorValue: 'No',
        competitorState: 'weak',
      },
      {
        feature: 'Accounting workflow depth',
        productValue: 'Focused invoicing only',
        competitorValue: 'Broader accounting',
      },
      {
        feature: 'Core invoicing cost',
        productValue: 'Free',
        competitorValue: 'Free',
      },
    ],
    fitCards: [
      {
        title: 'When Free Invoice Kit is better',
        description:
          'Better when invoicing speed matters more than accounting breadth, especially for solo operators who mostly bill from chat or email.',
      },
      {
        title: 'When Wave is better',
        description:
          'Better when you want free accounting software tied to the invoicing workflow and are comfortable with more setup.',
      },
    ],
    faqs: [
      {
        question: 'Is Free Invoice Kit only for people leaving Wave?',
        answer:
          'No. It is for anyone who wants a lighter invoicing workflow, especially if accounting software feels like too much overhead for the volume of invoices they send.',
      },
      {
        question: 'When should I keep using Wave instead?',
        answer:
          'Keep using Wave if the accounting side of the product is important to your workflow and not just the invoice creation itself.',
      },
      {
        question: 'What makes Free Invoice Kit different?',
        answer:
          'The product is optimized around fast invoice PDF generation and direct sharing, especially for freelancers and small service businesses.',
      },
    ],
    faqTitle: 'Questions people ask when Wave feels like more software than they need',
    relatedLinks: [
      {
        href: '/compare/freshbooks',
        title: 'FreshBooks Alternative',
        description: 'Compare another software-heavy path against a lightweight invoice flow.',
      },
      {
        href: '/compare/stripe',
        title: 'Stripe Alternative',
        description: 'See how the same product positioning works against a payments-led platform.',
      },
      {
        href: '/free-invoice-maker-freelancers',
        title: 'Freelancer Invoice Maker',
        description: 'See the broader no-signup invoice workflow if you want a faster way to bill clients.',
      },
    ],
    relatedTitle: 'More alternatives and invoicing guides',
  },
  {
    slug: 'shopify',
    path: '/compare/shopify',
    lastModified: '2026-03-18',
    title: 'Invoice Generator for Shopify Users | Free PDF Invoicing Without Signup',
    description:
      'Need an invoice generator that works with your Shopify workflow? Free Invoice Kit creates professional PDF invoices you can send to buyers or partners—no Shopify app or signup required.',
    h1: 'Invoice generator for Shopify sellers who need a clean PDF without another app.',
    badge: 'Comparison',
    intro:
      'Free Invoice Kit is not a Shopify app—it is a standalone free invoice generator. Create a professional PDF invoice, download or share it by email, and use it for B2B orders, buyer requests, or your own records alongside your Shopify store.',
    keywords: [
      'invoice generator for shopify',
      'shopify invoice generator',
      'free invoice generator shopify',
    ],
    competitorName: 'Shopify',
    primaryCta: { href: '/create', label: 'Create Free Invoice' },
    secondaryCta: { href: '/compare/woocommerce', label: 'Compare WooCommerce' },
    heroAside: {
      eyebrow: 'Best fit',
      points: [
        'Free Invoice Kit is for fast PDF invoices without installing another app or signing up.',
        'Use it when you need a one-off or standalone invoice alongside your Shopify store.',
        'The PDF is client-ready for email or download—you choose how to send it.',
      ],
      tone: 'quiet',
    },
    comparisonRows: [
      { feature: 'Signup required', productValue: 'No', competitorValue: 'Shopify account' },
      { feature: 'Time to first invoice', productValue: 'Immediate', competitorValue: 'Depends on store setup' },
      { feature: 'Standalone PDF invoice', productValue: 'Yes', competitorValue: 'Via apps or built-in' },
      { feature: 'Core cost', productValue: 'Free', competitorValue: 'Store + optional app' },
    ],
    fitCards: [
      {
        title: 'When Free Invoice Kit is better',
        description:
          'When you need a quick, professional PDF invoice for a buyer or partner without adding another Shopify app or subscription.',
      },
      {
        title: 'When to use Shopify invoicing',
        description:
          'When you want invoicing fully inside the Shopify admin or tied to orders and payments in the same platform.',
      },
    ],
    faqs: [
      {
        question: 'Is Free Invoice Kit a Shopify app?',
        answer:
          'No. It is a standalone free invoice generator. You create the invoice in your browser, export the PDF, and use it however you need—email, download, or for your records—alongside your Shopify store.',
      },
      {
        question: 'Can I use this for Shopify B2B or buyer invoices?',
        answer:
          'Yes. The PDF invoice includes your business details, line items, and totals in a format suitable for buyers or partners. You send or share the PDF yourself.',
      },
      {
        question: 'Do I need a Shopify account to use Free Invoice Kit?',
        answer:
          'No. Free Invoice Kit does not require Shopify or any other platform. You can use it with or without a Shopify store.',
      },
    ],
    faqTitle: 'Questions Shopify sellers ask about invoice generators',
    relatedLinks: [
      { href: '/compare/woocommerce', title: 'WooCommerce Invoice Generator', description: 'Same free PDF invoicing for WooCommerce store owners.' },
      { href: '/compare/wordpress', title: 'WordPress Invoice Generator', description: 'Free invoice generator for WordPress users.' },
      { href: '/invoice-generator/amazon-sellers', title: 'Invoice Generator for Amazon Sellers', description: 'Free invoicing for marketplace sellers.' },
    ],
    relatedTitle: 'More invoice generators for ecommerce and marketplaces',
  },
  {
    slug: 'woocommerce',
    path: '/compare/woocommerce',
    lastModified: '2026-03-18',
    title: 'Invoice Generator for WooCommerce | Free PDF Invoicing Without Plugins',
    description:
      'Need an invoice generator for WooCommerce? Free Invoice Kit creates professional PDF invoices you can send to customers or B2B—no WooCommerce plugin or signup required.',
    h1: 'Invoice generator for WooCommerce store owners who want a clean PDF without another plugin.',
    badge: 'Comparison',
    intro:
      'Free Invoice Kit is a standalone free invoice generator. Create a professional PDF invoice in your browser, download or share it by email, and use it for orders or B2B alongside your WooCommerce store—no plugin required.',
    keywords: [
      'invoice generator for woocommerce',
      'woocommerce invoice generator',
      'free invoice generator woocommerce',
    ],
    competitorName: 'WooCommerce',
    primaryCta: { href: '/create', label: 'Create Free Invoice' },
    secondaryCta: { href: '/compare/wordpress', label: 'Compare WordPress' },
    heroAside: {
      eyebrow: 'Best fit',
      points: [
        'Free Invoice Kit is for fast PDF invoices without installing a WooCommerce plugin.',
        'Use it when you need a standalone or one-off invoice alongside your store.',
        'The PDF is client-ready for email or download.',
      ],
      tone: 'quiet',
    },
    comparisonRows: [
      { feature: 'Signup required', productValue: 'No', competitorValue: 'WooCommerce/site required' },
      { feature: 'Time to first invoice', productValue: 'Immediate', competitorValue: 'Depends on site + plugin' },
      { feature: 'Standalone PDF invoice', productValue: 'Yes', competitorValue: 'Via plugins' },
      { feature: 'Core cost', productValue: 'Free', competitorValue: 'Hosting + optional plugin' },
    ],
    fitCards: [
      {
        title: 'When Free Invoice Kit is better',
        description:
          'When you want a quick, professional PDF invoice without adding or configuring another WooCommerce plugin.',
      },
      {
        title: 'When to use WooCommerce invoicing plugins',
        description:
          'When you want invoicing fully inside WordPress/WooCommerce and tied to orders in the same system.',
      },
    ],
    faqs: [
      {
        question: 'Is Free Invoice Kit a WooCommerce plugin?',
        answer:
          'No. It is a standalone free invoice generator. You create the invoice in your browser, export the PDF, and use it for customers or B2B alongside your WooCommerce store.',
      },
      {
        question: 'Can I use this for WooCommerce order invoices?',
        answer:
          'Yes. You can create a PDF invoice with your business and line items and send or share it yourself. It is not automatically tied to WooCommerce orders—you use it as a separate tool.',
      },
      {
        question: 'Do I need WordPress or WooCommerce to use Free Invoice Kit?',
        answer:
          'No. Free Invoice Kit works in any browser. You can use it with or without a WooCommerce store.',
      },
    ],
    faqTitle: 'Questions WooCommerce users ask about invoice generators',
    relatedLinks: [
      { href: '/compare/wordpress', title: 'WordPress Invoice Generator', description: 'Free invoice generator for WordPress users.' },
      { href: '/compare/shopify', title: 'Shopify Invoice Generator', description: 'Same free PDF invoicing for Shopify sellers.' },
      { href: '/invoice-generator/small-business', title: 'Invoice Generator for Small Business', description: 'Free invoicing for small business.' },
    ],
    relatedTitle: 'More invoice generators for stores and small business',
  },
  {
    slug: 'wordpress',
    path: '/compare/wordpress',
    lastModified: '2026-03-18',
    title: 'Invoice Generator for WordPress Users | Free Online PDF Invoicing',
    description:
      'Need an invoice generator for WordPress? Free Invoice Kit creates professional PDF invoices in your browser—no WordPress plugin or signup. Works on any device.',
    h1: 'Invoice generator for WordPress users who need a clean PDF without another plugin.',
    badge: 'Comparison',
    intro:
      'Free Invoice Kit is a standalone free invoice generator that works in any browser. Create a professional PDF invoice, download or share it by email, and use it for clients or projects—with or without WordPress. No plugin or signup required.',
    keywords: [
      'invoice generator for wordpress',
      'wordpress invoice generator',
      'free invoice generator wordpress',
    ],
    competitorName: 'WordPress',
    primaryCta: { href: '/create', label: 'Create Free Invoice' },
    secondaryCta: { href: '/compare/woocommerce', label: 'Compare WooCommerce' },
    heroAside: {
      eyebrow: 'Best fit',
      points: [
        'Free Invoice Kit works in any browser—no WordPress site or plugin needed.',
        'Use it when you want a quick PDF invoice without adding plugins to your site.',
        'Works on PC, Mac, and mobile so you can invoice from any device.',
      ],
      tone: 'quiet',
    },
    comparisonRows: [
      { feature: 'Signup required', productValue: 'No', competitorValue: 'Not for this tool' },
      { feature: 'WordPress or plugin required', productValue: 'No', competitorValue: 'Plugins available' },
      { feature: 'Works on any device', productValue: 'Yes', competitorValue: 'Depends on setup' },
      { feature: 'Core cost', productValue: 'Free', competitorValue: 'Hosting + optional plugin' },
    ],
    fitCards: [
      {
        title: 'When Free Invoice Kit is better',
        description:
          'When you want a simple PDF invoice without installing or maintaining a WordPress plugin, or when you invoice from multiple devices.',
      },
      {
        title: 'When to use WordPress invoicing plugins',
        description:
          'When you want invoicing fully inside your WordPress site and tied to your theme or other plugins.',
      },
    ],
    faqs: [
      {
        question: 'Do I need WordPress to use Free Invoice Kit?',
        answer:
          'No. Free Invoice Kit runs in your browser. You can use it with or without a WordPress site. It is not a WordPress plugin.',
      },
      {
        question: 'Can I use this on my phone or only on desktop?',
        answer:
          'Yes. Free Invoice Kit works on PC, Mac, laptop, iPhone, and Android—any device with a modern browser. Create and export the PDF from any device.',
      },
      {
        question: 'Is this an alternative to WordPress invoice plugins?',
        answer:
          'It is a standalone option. If you prefer not to add another plugin to your WordPress site, you can create invoices in Free Invoice Kit and share the PDF yourself.',
      },
    ],
    faqTitle: 'Questions WordPress users ask about invoice generators',
    relatedLinks: [
      { href: '/compare/woocommerce', title: 'WooCommerce Invoice Generator', description: 'Free invoice generator for WooCommerce.' },
      { href: '/compare/shopify', title: 'Shopify Invoice Generator', description: 'Free invoice generator for Shopify users.' },
      { href: '/invoice-generator/freelancers', title: 'Invoice Generator for Freelancers', description: 'No-signup invoicing for freelancers.' },
    ],
    relatedTitle: 'More invoice generators for freelancers and stores',
  },
];
