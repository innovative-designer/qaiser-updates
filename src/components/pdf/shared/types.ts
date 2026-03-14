import type { InvoiceData } from '@/types/invoice';

export interface InvoiceDocumentProps {
  invoice: InvoiceData;
  businessLogo?: string;
  accentColor?: string;
}
