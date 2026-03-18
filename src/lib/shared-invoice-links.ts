export function getSharedInvoiceViewerPath(sharedInvoiceId: string) {
  return `/v/${encodeURIComponent(sharedInvoiceId)}`;
}

export function getSharedInvoicePdfPath(
  sharedInvoiceId: string,
  options?: { download?: boolean },
) {
  const encodedId = encodeURIComponent(sharedInvoiceId);

  return options?.download
    ? `/api/shared-invoices/${encodedId}/pdf?download=1`
    : `/api/shared-invoices/${encodedId}/pdf`;
}

export function extractSharedInvoiceIdFromPdfUrl(url: string | undefined) {
  if (!url || url.startsWith('blob:')) {
    return null;
  }

  try {
    const parsedUrl = new URL(url, 'https://www.freeinvoicekit.com');
    const match = parsedUrl.pathname.match(/^\/api\/shared-invoices\/([^/]+)\/pdf$/);

    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

export function isLegacyRemotePdfUrl(url: string | undefined) {
  return Boolean(url && !url.startsWith('blob:') && /^https?:\/\//.test(url));
}
