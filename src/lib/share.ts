import { formatCurrency } from '@/lib/currencies';
import { saveInvoice } from '@/lib/db';
import type { InvoiceData } from '@/types/invoice';

type ShareMethod = NonNullable<InvoiceData['sentVia']>;

export type WhatsAppShareResult = 'shared' | 'fallback' | 'cancelled';

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

async function fallbackWhatsAppShare(invoice: InvoiceData, caption: string): Promise<'fallback'> {
  const encodedCaption = encodeURIComponent(`${caption}\n\nPlease attach the PDF invoice.`);
  window.open(`https://web.whatsapp.com/send?text=${encodedCaption}`, '_blank', 'noopener,noreferrer');

  if (invoice.pdfUrl) {
    await downloadFile(invoice.pdfUrl, `invoice-${invoice.id}.pdf`);
  }

  await markAsSent(invoice, 'whatsapp');
  return 'fallback';
}

function isWindowsDesktop(): boolean {
  return /Windows/.test(navigator.userAgent);
}

export async function shareOnWhatsApp(invoice: InvoiceData): Promise<WhatsAppShareResult> {
  if (!invoice.pdfUrl) {
    return 'fallback';
  }

  const caption = buildCaption(invoice);

  if (isWindowsDesktop()) {
    return fallbackWhatsAppShare(invoice, caption);
  }

  // Mac and mobile: use native Web Share API with file attachment
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

    return fallbackWhatsAppShare(invoice, caption);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return 'cancelled';
    }

    return fallbackWhatsAppShare(invoice, caption);
  }
}

export async function downloadPdf(invoice: InvoiceData): Promise<boolean> {
  if (!invoice.pdfUrl) {
    return false;
  }

  await downloadFile(invoice.pdfUrl, `invoice-${invoice.id}.pdf`);
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
  await markAsSent(invoice, 'email');
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
}

export async function copyCaptionText(invoice: InvoiceData): Promise<void> {
  const caption = buildCaption(invoice);
  await navigator.clipboard.writeText(caption);
  await markAsSent(invoice, 'copy');
}
