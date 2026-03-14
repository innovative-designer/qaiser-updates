import type { PdfTemplateId } from '@/types/pdf-template';

export type PdfTemplateMeta = {
  id: PdfTemplateId;
  name: string;
  description: string;
  previewSrc: string;
};

export const PDF_TEMPLATES: PdfTemplateMeta[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Warm paper, clean hierarchy.',
    previewSrc: '/pdf-templates/classic.png',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Monochrome, typography-first.',
    previewSrc: '/pdf-templates/minimal.png',
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong rail, big totals.',
    previewSrc: '/pdf-templates/bold.png',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Airy grid, subtle accents.',
    previewSrc: '/pdf-templates/modern.png',
  },
  {
    id: 'ledger',
    name: 'Ledger',
    description: 'Table-forward, accountant vibe.',
    previewSrc: '/pdf-templates/ledger.png',
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Denser, chat-friendly export.',
    previewSrc: '/pdf-templates/compact.png',
  },
];
