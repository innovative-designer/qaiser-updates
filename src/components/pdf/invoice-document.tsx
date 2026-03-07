import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { APP_NAME, APP_TAGLINE, APP_URL } from '@/lib/constants';
import { formatCurrency } from '@/lib/currencies';
import type { InvoiceData } from '@/types/invoice';

const colors = {
  ink: '#182230',
  slate: '#5d6b7d',
  line: '#d8dde5',
  accent: '#214562',
  accentSoft: '#eef4f8',
  paper: '#fffdf8',
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.paper,
    color: colors.ink,
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 42,
    paddingRight: 40,
    paddingBottom: 82,
    paddingLeft: 40,
  },
  masthead: {
    marginBottom: 26,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    borderBottomStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brandBlock: {
    maxWidth: 270,
  },
  eyebrow: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: colors.slate,
    marginBottom: 6,
  },
  businessName: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  businessLine: {
    fontSize: 9,
    color: colors.slate,
    lineHeight: 1.45,
    marginBottom: 2,
  },
  invoiceBlock: {
    width: 180,
    alignItems: 'flex-end',
  },
  invoiceLabel: {
    fontSize: 28,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
  },
  metaCard: {
    width: '100%',
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.accentSoft,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  metaRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: colors.slate,
  },
  metaValue: {
    fontSize: 9,
    color: colors.ink,
    fontFamily: 'Helvetica-Bold',
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  addressCard: {
    width: '48%',
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: '#ffffff',
  },
  addressName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  addressLine: {
    fontSize: 9,
    color: colors.slate,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  table: {
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  tableHeaderText: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: colors.slate,
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    borderBottomStyle: 'solid',
  },
  descriptionCol: {
    flex: 1,
    paddingRight: 10,
  },
  qtyCol: {
    width: 52,
    textAlign: 'right',
  },
  rateCol: {
    width: 86,
    textAlign: 'right',
  },
  amountCol: {
    width: 96,
    textAlign: 'right',
  },
  itemTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  itemSubtle: {
    fontSize: 8,
    color: colors.slate,
  },
  itemValue: {
    fontSize: 10,
    color: colors.ink,
  },
  totalsWrap: {
    marginTop: 18,
    marginLeft: 'auto',
    width: 220,
    paddingTop: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  totalLabel: {
    fontSize: 9,
    color: colors.slate,
  },
  totalValue: {
    fontSize: 9,
    color: colors.ink,
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  grandTotalLabel: {
    fontSize: 12,
    color: colors.ink,
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalValue: {
    fontSize: 12,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
  },
  notesSection: {
    marginTop: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: '#ffffff',
  },
  notesText: {
    fontSize: 9,
    color: colors.slate,
    lineHeight: 1.6,
  },
  placeholderBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.line,
  },
  placeholderText: {
    fontSize: 8,
    color: colors.slate,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    left: 40,
    right: 40,
    bottom: 28,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  footerText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#8b98a8',
    letterSpacing: 0.4,
  },
});

function formatDate(value: string) {
  if (!value) {
    return 'Not set';
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

interface InvoiceDocumentProps {
  invoice: InvoiceData;
}

export function InvoiceDocument({ invoice }: InvoiceDocumentProps) {
  const businessLines = [
    invoice.businessEmail,
    invoice.businessPhone,
    invoice.businessAddress,
  ].filter(Boolean);
  const clientLines = [invoice.clientCompany, invoice.clientEmail, invoice.clientPhone].filter(
    Boolean
  );
  const lineItems = invoice.lineItems.filter((item) => item.description.trim());

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.masthead}>
          <View style={styles.brandBlock}>
            <Text style={styles.eyebrow}>Invoice From</Text>
            <Text style={styles.businessName}>{invoice.businessName || 'Your Business'}</Text>
            {businessLines.length > 0 ? (
              businessLines.map((line) => (
                <Text key={line} style={styles.businessLine}>
                  {line}
                </Text>
              ))
            ) : (
              <Text style={styles.businessLine}>Add your business details in QuickBill.</Text>
            )}
          </View>

          <View style={styles.invoiceBlock}>
            <Text style={styles.invoiceLabel}>Invoice</Text>
            <View style={styles.metaCard}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Invoice ID</Text>
                <Text style={styles.metaValue}>#{invoice.id}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Issued</Text>
                <Text style={styles.metaValue}>{formatDate(invoice.createdAt)}</Text>
              </View>
              <View style={styles.metaRowLast}>
                <Text style={styles.metaLabel}>Due</Text>
                <Text style={styles.metaValue}>{formatDate(invoice.dueDate)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.addressSection}>
          <View style={styles.addressCard}>
            <Text style={styles.eyebrow}>Bill To</Text>
            <Text style={styles.addressName}>{invoice.clientName || 'Client Name'}</Text>
            {clientLines.length > 0 ? (
              clientLines.map((line) => (
                <Text key={line} style={styles.addressLine}>
                  {line}
                </Text>
              ))
            ) : (
              <Text style={styles.addressLine}>Client details will appear here.</Text>
            )}
          </View>

        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.descriptionCol]}>Description</Text>
            <Text style={[styles.tableHeaderText, styles.qtyCol]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.rateCol]}>Rate</Text>
            <Text style={[styles.tableHeaderText, styles.amountCol]}>Amount</Text>
          </View>

          {lineItems.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <View style={styles.descriptionCol}>
                <Text style={styles.itemTitle}>{item.description}</Text>
                <Text style={styles.itemSubtle}>Prepared with QuickBill</Text>
              </View>
              <Text style={[styles.itemValue, styles.qtyCol]}>{item.quantity}</Text>
              <Text style={[styles.itemValue, styles.rateCol]}>
                {formatCurrency(item.rate, invoice.currency)}
              </Text>
              <Text style={[styles.itemValue, styles.amountCol]}>
                {formatCurrency(item.amount, invoice.currency)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsWrap}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.subtotal, invoice.currency)}</Text>
          </View>

          {invoice.taxRate > 0 ? (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax ({invoice.taxRate}%)</Text>
              <Text style={styles.totalValue}>
                {formatCurrency(invoice.taxAmount, invoice.currency)}
              </Text>
            </View>
          ) : null}

          {invoice.discount > 0 ? (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Discount ({invoice.discount}%)</Text>
              <Text style={styles.totalValue}>
                -{formatCurrency(invoice.discountAmount, invoice.currency)}
              </Text>
            </View>
          ) : null}

          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>
              {formatCurrency(invoice.total, invoice.currency)}
            </Text>
          </View>
        </View>

        {invoice.notes ? (
          <View style={styles.notesSection}>
            <Text style={styles.eyebrow}>Notes</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        ) : null}

        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>Online payment options coming soon</Text>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Created with {APP_NAME} • {APP_TAGLINE} • {APP_URL.replace(/^https?:\/\//, '')}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
