import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { APP_NAME, APP_TAGLINE, APP_URL, DEFAULT_ACCENT_COLOR } from '@/lib/constants';
import { formatCurrency } from '@/lib/currencies';
import { buildColors, defaultColors } from '@/components/pdf/shared/colors';
import { formatDate } from '@/components/pdf/shared/format';
import type { InvoiceDocumentProps } from '@/components/pdf/shared/types';

const styles = StyleSheet.create({
  page: {
    backgroundColor: defaultColors.paper,
    color: defaultColors.ink,
    fontFamily: 'Helvetica',
    fontSize: 8,
    paddingTop: 24,
    paddingRight: 26,
    paddingBottom: 56,
    paddingLeft: 26,
  },
  masthead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.lineStrong,
    borderBottomStyle: 'solid',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    flexDirection: 'column',
  },
  businessName: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  businessLine: {
    fontSize: 7.5,
    color: defaultColors.slate,
    lineHeight: 1.4,
  },
  invoiceLabel: {
    fontSize: 18,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    color: defaultColors.accentDeep,
    textAlign: 'right',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
    gap: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 7,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: defaultColors.slate,
    marginRight: 4,
  },
  metaValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: defaultColors.ink,
  },
  metaSeparator: {
    fontSize: 8,
    color: defaultColors.line,
    marginHorizontal: 4,
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  addressBlock: {
    width: '48%',
  },
  addressLabel: {
    fontSize: 7,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: defaultColors.slate,
    marginBottom: 3,
  },
  addressName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  addressLine: {
    fontSize: 7.5,
    color: defaultColors.slate,
    lineHeight: 1.4,
  },
  table: {
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 6,
    paddingRight: 6,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.lineStrong,
    backgroundColor: defaultColors.quietPanel,
  },
  tableHeaderText: {
    fontSize: 7,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: defaultColors.slate,
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 6,
    paddingRight: 6,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.line,
    borderBottomStyle: 'solid',
  },
  descriptionCol: {
    flex: 1,
    paddingRight: 6,
  },
  qtyCol: {
    width: 36,
    textAlign: 'right',
  },
  rateCol: {
    width: 72,
    textAlign: 'right',
  },
  amountCol: {
    width: 80,
    textAlign: 'right',
  },
  itemText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  itemValue: {
    fontSize: 8,
    color: defaultColors.ink,
  },
  totalsWrap: {
    marginTop: 6,
    marginLeft: 'auto',
    width: 190,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 8,
    color: defaultColors.slate,
  },
  totalValue: {
    fontSize: 8,
    color: defaultColors.ink,
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: defaultColors.lineStrong,
  },
  grandTotalLabel: {
    fontSize: 10,
    color: defaultColors.ink,
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalValue: {
    fontSize: 10,
    color: defaultColors.accentDeep,
    fontFamily: 'Helvetica-Bold',
  },
  notesSection: {
    marginTop: 12,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: defaultColors.lineStrong,
    backgroundColor: defaultColors.white,
  },
  notesLabel: {
    fontSize: 7,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: defaultColors.slate,
    marginBottom: 3,
  },
  notesText: {
    fontSize: 7.5,
    color: defaultColors.slate,
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    left: 26,
    right: 26,
    bottom: 18,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: defaultColors.line,
  },
  footerText: {
    fontSize: 6.5,
    textAlign: 'center',
    color: '#8b98a8',
    letterSpacing: 0.3,
  },
});

export function CompactInvoiceDocument({
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
        {/* Masthead: logo + business name | INVOICE label */}
        <View style={styles.masthead}>
          <View style={styles.brandRow}>
            {businessLogo ? (
              <Image
                src={businessLogo}
                style={{ width: 32, height: 32, objectFit: 'contain' }}
              />
            ) : null}
            <View style={styles.brandText}>
              <Text style={styles.businessName}>{invoice.businessName || 'Your Business'}</Text>
            </View>
          </View>
          <Text style={[styles.invoiceLabel, c ? { color: c.accentDeep } : {}]}>Invoice</Text>
        </View>

        {/* Single-line meta: ID | Issued | Due */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>ID</Text>
            <Text style={styles.metaValue}>#{invoice.id}</Text>
          </View>
          <Text style={styles.metaSeparator}>|</Text>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Issued</Text>
            <Text style={styles.metaValue}>{formatDate(invoice.createdAt)}</Text>
          </View>
          <Text style={styles.metaSeparator}>|</Text>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Due</Text>
            <Text style={styles.metaValue}>{formatDate(invoice.dueDate)}</Text>
          </View>
        </View>

        {/* From / To side by side */}
        <View style={styles.addressSection}>
          <View style={styles.addressBlock}>
            <Text style={styles.addressLabel}>From</Text>
            <Text style={styles.addressName}>{invoice.senderName?.trim() || invoice.businessName || 'Your Business'}</Text>
            {businessLines.map((line) => (
              <Text key={line} style={styles.addressLine}>
                {line}
              </Text>
            ))}
          </View>
          <View style={styles.addressBlock}>
            <Text style={styles.addressLabel}>Bill To</Text>
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

        {/* Line items table */}
        <View style={styles.table}>
          <View style={[styles.tableHeader, c ? { backgroundColor: c.accentSoft } : {}]}>
            <Text style={[styles.tableHeaderText, styles.descriptionCol]}>Description</Text>
            <Text style={[styles.tableHeaderText, styles.qtyCol]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.rateCol]}>Rate</Text>
            <Text style={[styles.tableHeaderText, styles.amountCol]}>Amount</Text>
          </View>

          {lineItems.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.itemText, styles.descriptionCol]}>{item.description}</Text>
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

        {/* Totals */}
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

        {/* Notes */}
        {invoice.notes ? (
          <View style={styles.notesSection}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        ) : null}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Created with {APP_NAME} • {APP_TAGLINE} • {APP_URL.replace(/^https?:\/\//, '')}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
