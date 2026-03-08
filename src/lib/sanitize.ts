import { CURRENCIES } from '@/lib/currencies';

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
