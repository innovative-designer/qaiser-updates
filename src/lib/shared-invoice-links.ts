export function getSharedInvoiceViewerPath(invoiceId: string) {
  return `/v/${invoiceId}`;
}

export function getSharedInvoicePdfPath(
  invoiceId: string,
  options?: { download?: boolean },
) {
  return options?.download
    ? `/api/shared-invoices/${invoiceId}/pdf?download=1`
    : `/api/shared-invoices/${invoiceId}/pdf`;
}

export function isLegacyRemotePdfUrl(url: string | undefined) {
  return Boolean(url && !url.startsWith('blob:') && /^https?:\/\//.test(url));
}
