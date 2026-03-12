import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PdfViewerShell } from '@/components/shared/pdf-viewer-shell';

describe('PdfViewerShell', () => {
  it('renders the app brand and download action', () => {
    render(
      <PdfViewerShell
        invoiceId="abc12345"
        pdfInlinePath="/api/shared-invoices/abc12345/pdf"
        pdfDownloadPath="/api/shared-invoices/abc12345/pdf?download=1"
      />,
    );

    expect(screen.getByRole('link', { name: /free invoice kit/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download pdf/i })).toBeInTheDocument();
  });

  it('links the brand to the homepage', () => {
    render(
      <PdfViewerShell
        invoiceId="abc12345"
        pdfInlinePath="/api/shared-invoices/abc12345/pdf"
        pdfDownloadPath="/api/shared-invoices/abc12345/pdf?download=1"
      />,
    );

    expect(screen.getByRole('link', { name: /free invoice kit/i })).toHaveAttribute('href', '/');
  });

  it('renders the inline pdf frame using the same-origin stream path', () => {
    render(
      <PdfViewerShell
        invoiceId="abc12345"
        pdfInlinePath="/api/shared-invoices/abc12345/pdf"
        pdfDownloadPath="/api/shared-invoices/abc12345/pdf?download=1"
      />,
    );

    expect(screen.getByTitle(/invoice pdf viewer/i)).toHaveAttribute(
      'src',
      '/api/shared-invoices/abc12345/pdf',
    );
  });

  it('shows a clean fallback message when the invoice is unavailable', () => {
    render(
      <PdfViewerShell
        invoiceId="missing"
        errorMessage="This invoice is unavailable."
      />,
    );

    expect(screen.getByText(/this invoice is unavailable/i)).toBeInTheDocument();
    expect(screen.queryByTitle(/invoice pdf viewer/i)).not.toBeInTheDocument();
  });
});
