import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { APP_NAME, APP_TAGLINE, APP_URL, DEFAULT_ACCENT_COLOR } from '@/lib/constants';
import { formatCurrency } from '@/lib/currencies';
import { buildColors } from '@/components/pdf/shared/colors';
import { formatDate } from '@/components/pdf/shared/format';
import type { InvoiceDocumentProps } from '@/components/pdf/shared/types';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: 'Helvetica',
    fontSize: 9,
    paddingTop: 48,
    paddingRight: 48,
    paddingBottom: 72,
    paddingLeft: 48,
  },

  /* ── Masthead ── */
  masthead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d0d0d0',
    borderBottomStyle: 'solid',
  },
  brandBlock: {
    maxWidth: 260,
  },
  businessName: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    color: '#000000',
  },
  businessLine: {
    fontSize: 8.5,
    color: '#666666',
    lineHeight: 1.5,
    marginBottom: 1,
  },

  /* ── Invoice label + meta ── */
  invoiceBlock: {
    alignItems: 'flex-end',
  },
  invoiceLabel: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#000000',
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 3,
  },
  metaLabel: {
    fontSize: 8,
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    width: 60,
    textAlign: 'right',
    marginRight: 8,
  },
  metaValue: {
    fontSize: 8.5,
    color: '#1a1a1a',
    fontFamily: 'Helvetica-Bold',
    width: 80,
    textAlign: 'right',
  },

  /* ── Bill To ── */
  billToSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 7.5,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#999999',
    marginBottom: 5,
  },
  clientName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    marginBottom: 3,
  },
  clientLine: {
    fontSize: 8.5,
    color: '#666666',
    lineHeight: 1.5,
    marginBottom: 1,
  },

  /* ── Table ── */
  table: {
    marginTop: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
  },
  tableHeaderText: {
    fontSize: 7.5,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#999999',
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
    borderBottomStyle: 'solid',
  },
  descriptionCol: {
    flex: 1,
    paddingRight: 10,
  },
  qtyCol: {
    width: 50,
    textAlign: 'right',
  },
  rateCol: {
    width: 85,
    textAlign: 'right',
  },
  amountCol: {
    width: 95,
    textAlign: 'right',
  },
  itemDescription: {
    fontSize: 9,
    color: '#1a1a1a',
  },
  itemValue: {
    fontSize: 9,
    color: '#1a1a1a',
  },

  /* ── Totals ── */
  totalsWrap: {
    marginTop: 16,
    marginLeft: 'auto',
    width: 220,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 8.5,
    color: '#999999',
  },
  totalValue: {
    fontSize: 8.5,
    color: '#1a1a1a',
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#000000',
    borderTopStyle: 'solid',
  },
  grandTotalLabel: {
    fontSize: 11,
    color: '#000000',
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalValue: {
    fontSize: 11,
    color: '#000000',
    fontFamily: 'Helvetica-Bold',
  },

  /* ── Notes ── */
  notesSection: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#e5e5e5',
    borderTopStyle: 'solid',
  },
  notesText: {
    fontSize: 8.5,
    color: '#666666',
    lineHeight: 1.6,
  },

  /* ── Footer ── */
  footer: {
    position: 'absolute',
    left: 48,
    right: 48,
    bottom: 28,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#d0d0d0',
    borderTopStyle: 'solid',
  },
  footerText: {
    fontSize: 7,
    textAlign: 'center',
    color: '#bbbbbb',
    letterSpacing: 0.3,
  },
});

export function MinimalInvoiceDocument({
  invoice,
  businessLogo,
  accentColor,
}: InvoiceDocumentProps) {
  const c =
    accentColor && accentColor !== DEFAULT_ACCENT_COLOR ? buildColors(accentColor) : null;

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
        {/* ── Masthead ── */}
        <View style={styles.masthead}>
          <View style={styles.brandBlock}>
            {businessLogo ? (
              <Image
                src={businessLogo}
                style={{ width: 40, height: 40, marginBottom: 6, objectFit: 'contain' }}
              />
            ) : null}
            <Text style={styles.businessName}>{invoice.businessName || 'Your Business'}</Text>
            {invoice.senderName?.trim() ? (
              <Text style={styles.businessLine}>{invoice.senderName}</Text>
            ) : null}
            {businessLines.length > 0 ? (
              businessLines.map((line) => (
                <Text key={line} style={styles.businessLine}>
                  {line}
                </Text>
              ))
            ) : (
              <Text style={styles.businessLine}>
                Add your business details in Free Invoice Kit.
              </Text>
            )}
          </View>

          <View style={styles.invoiceBlock}>
            <Text style={styles.invoiceLabel}>Invoice</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Invoice</Text>
              <Text style={styles.metaValue}>#{invoice.id}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Issued</Text>
              <Text style={styles.metaValue}>{formatDate(invoice.createdAt)}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Due</Text>
              <Text style={styles.metaValue}>{formatDate(invoice.dueDate)}</Text>
            </View>
          </View>
        </View>

        {/* ── Bill To ── */}
        <View style={styles.billToSection}>
          <Text style={styles.sectionLabel}>Bill To</Text>
          <Text style={styles.clientName}>{invoice.clientName || 'Client Name'}</Text>
          {clientLines.length > 0 ? (
            clientLines.map((line) => (
              <Text key={line} style={styles.clientLine}>
                {line}
              </Text>
            ))
          ) : (
            <Text style={styles.clientLine}>Client details will appear here.</Text>
          )}
        </View>

        {/* ── Line Items Table ── */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.descriptionCol]}>Description</Text>
            <Text style={[styles.tableHeaderText, styles.qtyCol]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.rateCol]}>Rate</Text>
            <Text style={[styles.tableHeaderText, styles.amountCol]}>Amount</Text>
          </View>

          {lineItems.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.itemDescription, styles.descriptionCol]}>
                {item.description}
              </Text>
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

        {/* ── Totals ── */}
        <View style={styles.totalsWrap}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(invoice.subtotal, invoice.currency)}
            </Text>
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
            <Text style={[styles.grandTotalValue, c ? { color: c.accentDeep } : {}]}>
              {formatCurrency(invoice.total, invoice.currency)}
            </Text>
          </View>
        </View>

        {/* ── Notes ── */}
        {invoice.notes ? (
          <View style={styles.notesSection}>
            <Text style={styles.sectionLabel}>Notes</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        ) : null}

        {/* ── Footer ── */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Created with {APP_NAME} {'\u00B7'} {APP_TAGLINE} {'\u00B7'}{' '}
            {APP_URL.replace(/^https?:\/\//, '')}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
