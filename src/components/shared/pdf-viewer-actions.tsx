'use client';

import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { captureAnalyticsEvent } from '@/lib/analytics/posthog';

interface PdfViewerActionsProps {
  invoiceId: string;
  pdfDownloadPath?: string;
}

export function PdfViewerActions({ invoiceId, pdfDownloadPath }: PdfViewerActionsProps) {
  if (!pdfDownloadPath) {
    return null;
  }

  return (
    <Button asChild size="sm">
      <a
        href={pdfDownloadPath}
        onClick={() => {
          captureAnalyticsEvent('shared_invoice_downloaded', {
            invoice_id: invoiceId,
          });
        }}
      >
        <Download className="size-4" />
        Download PDF
      </a>
    </Button>
  );
}
