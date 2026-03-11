import type { InfoPanelTone } from '@/components/shared/seo/seo-page-shell';

export type SeoIconName =
  | 'briefcase'
  | 'camera'
  | 'check-circle'
  | 'clock'
  | 'file-check'
  | 'globe'
  | 'message-circle'
  | 'palette'
  | 'receipt'
  | 'smartphone'
  | 'wallet'
  | 'zap';

export interface SeoActionLink {
  href: string;
  label: string;
}

export interface SeoRelatedLink {
  href: string;
  title: string;
  description: string;
  ctaLabel?: string;
}

export interface SeoFaqEntry {
  question: string;
  answer: string;
}

export interface SeoHeroAside {
  eyebrow: string;
  points: string[];
  tone?: InfoPanelTone;
}

export interface SeoIconCard {
  title: string;
  description: string;
  icon: SeoIconName;
}

export interface SeoPanelContent {
  eyebrow: string;
  title: string;
  body: string[];
  tone?: InfoPanelTone;
}

export interface SeoCtaPanel extends SeoPanelContent {
  buttonHref: string;
  buttonLabel: string;
}

export interface SeoBasePageData {
  slug: string;
  path: `/${string}`;
  lastModified: string;
  title: string;
  description: string;
  h1: string;
  badge: string;
  intro: string;
  keywords?: string[];
  openGraphImage?: string;
  primaryCta: SeoActionLink;
  secondaryCta?: SeoActionLink;
  heroAside: SeoHeroAside;
  faqs: SeoFaqEntry[];
  faqTitle: string;
  relatedLinks: SeoRelatedLink[];
  relatedTitle: string;
}

export interface IndustryPageData extends SeoBasePageData {
  pageType: 'industry';
  benefitSectionEyebrow: string;
  benefitSectionTitle: string;
  benefitCards: SeoIconCard[];
  workflowPanel: SeoPanelContent;
  ctaPanel: SeoCtaPanel;
}

export interface ComparisonRow {
  feature: string;
  productValue: string;
  competitorValue: string;
  competitorState?: 'neutral' | 'weak';
}

export interface ComparisonPageData extends SeoBasePageData {
  competitorName: string;
  comparisonRows: ComparisonRow[];
  fitCards: {
    title: string;
    description: string;
  }[];
}

export interface CountryPageData extends SeoBasePageData {
  pageType: 'country';
  locale: string;
  alternatesLanguages: Record<string, string>;
  highlightCards: SeoIconCard[];
  contextPanel: SeoPanelContent;
  nuancePanel: SeoPanelContent;
  valuePanel: SeoPanelContent;
  ctaPanel: SeoCtaPanel;
}

export interface TemplatePageData extends SeoBasePageData {
  highlightCards: SeoIconCard[];
  checklistEyebrow: string;
  checklistTitle: string;
  checklistItems: string[];
  bestForPanel: SeoPanelContent;
  notesPanel: SeoPanelContent;
  ctaPanel: SeoCtaPanel;
}
