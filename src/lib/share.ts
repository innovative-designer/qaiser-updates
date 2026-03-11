import { captureAnalyticsEvent } from '@/lib/analytics/posthog';
import { formatCurrency } from '@/lib/currencies';
import { saveInvoice } from '@/lib/db';
import type { InvoiceData } from '@/types/invoice';

type ShareMethod = NonNullable<InvoiceData['sentVia']>;
type ShareSource = 'create' | 'history';

export type WhatsAppShareResult = 'shared' | 'fallback' | 'cancelled';
export interface ShareTrackingContext {
  source: ShareSource;
}

function buildCaption(invoice: InvoiceData): string {
  const amount = formatCurrency(invoice.total, invoice.currency);
  const clientName = invoice.clientName || 'there';
  const businessName = invoice.businessName || 'my business';
  return `Hi ${clientName}, please find your invoice for ${amount}. - ${businessName}`;
}

async function downloadFile(url: string, fileName: string): Promise<void> {
  const response = await fetch(url);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = fileName;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
}

async function markAsSent(invoice: InvoiceData, via: ShareMethod): Promise<void> {
  const persistedPdfUrl =
    invoice.pdfUrl && !invoice.pdfUrl.startsWith('blob:') ? invoice.pdfUrl : undefined;

  await saveInvoice({
    ...invoice,
    pdfUrl: persistedPdfUrl,
    status: 'sent',
    sentAt: new Date().toISOString(),
    sentVia: via,
  });
}
export async function shareOnWhatsApp(
  invoice: InvoiceData,
  context: ShareTrackingContext,
): Promise<WhatsAppShareResult> {
  if (!invoice.pdfUrl) {
    return 'fallback';
  }

  const caption = buildCaption(invoice);
  captureAnalyticsEvent('share_clicked', {
    source: context.source,
    channel: 'whatsapp',
  });

  try {
    const response = await fetch(invoice.pdfUrl);
    const blob = await response.blob();
    const file = new File([blob], `invoice-${invoice.id}.pdf`, { type: 'application/pdf' });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: `Invoice for ${invoice.clientName || 'client'}`,
        text: caption,
        files: [file],
      });

      await markAsSent(invoice, 'whatsapp');
      return 'shared';
    }

    // Browser doesn't support file sharing — download the PDF as fallback
    await downloadFile(invoice.pdfUrl, `invoice-${invoice.id}.pdf`);
    captureAnalyticsEvent('pdf_downloaded', {
      source: context.source,
      channel: 'whatsapp_fallback',
    });
    await markAsSent(invoice, 'whatsapp');
    return 'fallback';
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return 'cancelled';
    }

    await downloadFile(invoice.pdfUrl, `invoice-${invoice.id}.pdf`);
    captureAnalyticsEvent('pdf_downloaded', {
      source: context.source,
      channel: 'whatsapp_fallback',
    });
    await markAsSent(invoice, 'whatsapp');
    return 'fallback';
  }
}

export async function downloadPdf(
  invoice: InvoiceData,
  context: ShareTrackingContext,
): Promise<boolean> {
  if (!invoice.pdfUrl) {
    return false;
  }

  await downloadFile(invoice.pdfUrl, `invoice-${invoice.id}.pdf`);
  captureAnalyticsEvent('pdf_downloaded', {
    source: context.source,
    channel: 'download',
  });
  await markAsSent(invoice, 'download');
  return true;
}

export async function shareViaEmail(invoice: InvoiceData): Promise<void> {
  const amount = formatCurrency(invoice.total, invoice.currency);
  const subject = encodeURIComponent(`Invoice from ${invoice.businessName || 'Business'}`);
  const body = encodeURIComponent(
    `Hi ${invoice.clientName || 'there'},\n\n` +
      `Please find your invoice for ${amount}.\n\n` +
      `Best regards,\n${invoice.businessName || ''}`
  );
  const recipient = encodeURIComponent(invoice.clientEmail || '');
  captureAnalyticsEvent('share_clicked', {
    source: 'create',
    channel: 'email',
  });
  await markAsSent(invoice, 'email');
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
}

export async function copyCaptionText(invoice: InvoiceData): Promise<void> {
  const caption = buildCaption(invoice);
  await navigator.clipboard.writeText(caption);
  captureAnalyticsEvent('share_clicked', {
    source: 'create',
    channel: 'copy_caption',
  });
  await markAsSent(invoice, 'copy');
}
