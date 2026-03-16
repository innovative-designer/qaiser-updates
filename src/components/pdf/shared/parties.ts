import type { InvoiceData } from '@/types/invoice';

function getTrimmedValue(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function getBrandName(invoice: InvoiceData) {
  return getTrimmedValue(invoice.businessName) ?? 'Your Business';
}

export function getBillFromName(invoice: InvoiceData) {
  return getTrimmedValue(invoice.senderName) ?? getBrandName(invoice);
}

export function getBusinessLines(invoice: InvoiceData) {
  return [invoice.businessEmail, invoice.businessPhone, invoice.businessAddress]
    .map(getTrimmedValue)
    .filter((line): line is string => Boolean(line));
}

export function getClientLines(invoice: InvoiceData) {
  return [invoice.clientCompany, invoice.clientEmail, invoice.clientPhone]
    .map(getTrimmedValue)
    .filter((line): line is string => Boolean(line));
}
