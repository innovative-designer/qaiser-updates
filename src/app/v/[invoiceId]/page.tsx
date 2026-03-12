import { PdfViewerShell } from '@/components/shared/pdf-viewer-shell';
import { downloadStoredInvoicePdf } from '@/lib/server/shared-pdf';
import { getSharedInvoicePdfPath } from '@/lib/shared-invoice-links';

type Props = {
  params: Promise<{ invoiceId: string }>;
};

export default async function SharedInvoiceViewerPage({ params }: Props) {
  const { invoiceId } = await params;
  const pdfInlinePath = getSharedInvoicePdfPath(invoiceId);
  const pdfDownloadPath = getSharedInvoicePdfPath(invoiceId, { download: true });

  try {
    await downloadStoredInvoicePdf(invoiceId);
  } catch (error) {
    if (error instanceof Error && error.message !== 'NOT_FOUND') {
      throw error;
    }

    return (
      <PdfViewerShell
        invoiceId={invoiceId}
        errorMessage="This invoice is unavailable."
      />
    );
  }

  return (
    <PdfViewerShell
      invoiceId={invoiceId}
      pdfInlinePath={pdfInlinePath}
      pdfDownloadPath={pdfDownloadPath}
    />
  );
}
