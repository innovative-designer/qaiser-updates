import { CURRENCIES } from '@/lib/currencies';
import { DEFAULT_PDF_TEMPLATE_ID } from '@/lib/constants';
import { PDF_TEMPLATES } from '@/lib/pdf-templates';
import type { PdfTemplateId } from '@/types/pdf-template';

/**
 * Strip HTML tags from a string to prevent injection in rendered output.
 */
export function stripHtml(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, '').trim();
}

/**
 * Clamp a number to a safe range and return 0 for non-finite values.
 */
export function safeNumber(value: unknown, min = 0, max = 1_000_000_000): number {
  const n = Number(value);
  if (!isFinite(n)) return 0;
  return Math.min(Math.max(n, min), max);
}

/**
 * Validate that a currency code is in the allowed list.
 * Returns 'USD' as fallback for unknown codes.
 */
const ALLOWED_CURRENCIES = new Set(CURRENCIES.map((c) => c.code));

export function safeCurrency(value: unknown): string {
  if (typeof value === 'string' && ALLOWED_CURRENCIES.has(value.toUpperCase())) {
    return value.toUpperCase();
  }
  return 'USD';
}

const ALLOWED_PDF_TEMPLATES = new Set<PdfTemplateId>(PDF_TEMPLATES.map((t) => t.id));

export function safePdfTemplateId(value: unknown): PdfTemplateId {
  if (typeof value === 'string' && ALLOWED_PDF_TEMPLATES.has(value as PdfTemplateId)) {
    return value as PdfTemplateId;
  }
  return DEFAULT_PDF_TEMPLATE_ID;
}
