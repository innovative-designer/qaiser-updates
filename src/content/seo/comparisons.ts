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
      'If you need straightforward invoice creation and fast sharing, Free Invoice Kit removes the setup drag. Create the invoice, export the PDF, and send it in seconds.',
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
        'The right tool depends on whether your workflow is operationally heavy or intentionally light.',
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
        productValue: 'Under 1 minute',
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
          'Yes. The product is positioned around creating a finished invoice PDF quickly and moving it into the client conversation with minimal setup.',
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
    relatedTitle: 'Move the next click somewhere useful',
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
        productValue: 'Under 1 minute',
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
        description: 'Use a profession-focused page if your consulting work needs faster project billing.',
      },
    ],
    relatedTitle: 'Keep comparison traffic on adjacent high-intent pages',
  },
  {
    slug: 'wave',
    path: '/compare/wave',
    lastModified: '2026-03-11',
    title: 'Wave Invoice Alternative for Freelancers | Free Invoice Kit',
    description:
      'Looking for a Wave invoice alternative? Free Invoice Kit focuses on quick invoice PDFs, WhatsApp sharing, and low setup friction for freelancers.',
    h1: 'A Wave invoice alternative when free accounting software still feels heavier than the job.',
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
    faqTitle: 'Questions people ask when Wave still feels heavier than they want',
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
        description: 'Return to the broader freelancer page if the comparison route answered the software question.',
      },
    ],
    relatedTitle: 'Move comparison traffic into adjacent intent pages',
  },
];
