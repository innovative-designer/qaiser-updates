export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  id: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  lineItems: LineItem[];
  currency: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  discountAmount: number;
  total: number;
  notes: string;
  dueDate: string;
  createdAt: string;
  status: 'draft' | 'sent';
  pdfUrl?: string;
  sentAt?: string;
  sentVia?: 'whatsapp' | 'email' | 'download' | 'copy';
}

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}
