import { safePdfTemplateId } from '@/lib/sanitize';
import type { InvoiceData } from '@/types/invoice';
import { ClassicInvoiceDocument } from '@/components/pdf/templates/classic';
import { MinimalInvoiceDocument } from '@/components/pdf/templates/minimal';
import { BoldInvoiceDocument } from '@/components/pdf/templates/bold';
import { ModernInvoiceDocument } from '@/components/pdf/templates/modern';
import { LedgerInvoiceDocument } from '@/components/pdf/templates/ledger';
import { CompactInvoiceDocument } from '@/components/pdf/templates/compact';

export interface InvoiceDocumentProps {
  invoice: InvoiceData;
  businessLogo?: string;
  accentColor?: string;
}

export function InvoiceDocument(props: InvoiceDocumentProps) {
  const templateId = safePdfTemplateId(props.invoice.pdfTemplateId);
  switch (templateId) {
    case 'minimal':
      return MinimalInvoiceDocument(props);
    case 'bold':
      return BoldInvoiceDocument(props);
    case 'modern':
      return ModernInvoiceDocument(props);
    case 'ledger':
      return LedgerInvoiceDocument(props);
    case 'compact':
      return CompactInvoiceDocument(props);
    case 'classic':
    default:
      return ClassicInvoiceDocument(props);
  }
}
