export const APP_NAME = 'Free Invoice Kit';
export const APP_URL = 'https://www.freeinvoicekit.com';
export const APP_TAGLINE = 'Free invoicing on WhatsApp';
export const APP_DESCRIPTION =
  'Create professional PDF invoices and send them on WhatsApp in 30 seconds. No signup required. Free forever.';

export const MAX_INVOICES = 10;
export const INVOICE_ID_LENGTH = 8;
export const LINE_ITEM_ID_LENGTH = 6;

export const DEFAULT_CURRENCY = 'USD';
export const DEFAULT_TAX_RATE = 0;
export const DEFAULT_DISCOUNT = 0;

export const DEFAULT_ACCENT_COLOR = '#4266c4';

/** Two rows of accent color palettes for invoice theming. */
export const INVOICE_COLOR_PALETTES = [
  // Row 1: Classic / Professional
  [
    { hex: '#4266c4', label: 'Blue' },
    { hex: '#1a7f5a', label: 'Emerald' },
    { hex: '#7c3aed', label: 'Violet' },
    { hex: '#0891b2', label: 'Cyan' },
    { hex: '#4f46e5', label: 'Indigo' },
  ],
  // Row 2: Warm / Bold
  [
    { hex: '#dc2626', label: 'Red' },
    { hex: '#ea580c', label: 'Orange' },
    { hex: '#ca8a04', label: 'Amber' },
    { hex: '#db2777', label: 'Pink' },
    { hex: '#1a2433', label: 'Charcoal' },
  ],
] as const;
