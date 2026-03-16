// ...existing code...
// ...existing code...
// ...existing code...
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { APP_NAME, APP_TAGLINE, APP_URL, DEFAULT_ACCENT_COLOR } from '@/lib/constants';
import { formatCurrency } from '@/lib/currencies';
import { buildColors, defaultColors } from '@/components/pdf/shared/colors';
import { formatDate } from '@/components/pdf/shared/format';
import type { InvoiceDocumentProps } from '@/components/pdf/shared/types';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    color: defaultColors.ink,
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 0,
    paddingRight: 48,
    paddingBottom: 80,
    paddingLeft: 48,
  },
  accentBar: {
    height: 4,
    backgroundColor: defaultColors.accent,
    marginLeft: -48,
    marginRight: -48,
    marginBottom: 48,
  },
  masthead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 36,
  },
  brandBlock: {
    maxWidth: 280,
  },
  businessName: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  businessUnderline: {
    height: 2,
    width: 40,
    backgroundColor: defaultColors.accent,
    marginBottom: 10,
  },
  businessLine: {
    fontSize: 9,
    color: defaultColors.slate,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  invoiceBlock: {
    alignItems: 'flex-end',
  },
  invoiceLabel: {
    fontSize: 28,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: defaultColors.accent,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  metaLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: defaultColors.slate,
    width: 70,
    textAlign: 'right',
    marginRight: 10,
  },
  metaValue: {
    fontSize: 9,
    color: defaultColors.ink,
    fontFamily: 'Helvetica-Bold',
    width: 90,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 28,
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  addressCard: {
    width: '47%',
  },
  addressLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: defaultColors.slate,
    marginBottom: 8,
  },
  addressName: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  addressNameLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: defaultColors.slate,
    marginBottom: 2,
  },
  addressLine: {
    fontSize: 9,
    color: defaultColors.slate,
    lineHeight: 1.55,
    marginBottom: 2,
  },
  table: {
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomWidth: 2,
    borderBottomColor: defaultColors.accent,
    borderBottomStyle: 'solid',
  },
  tableHeaderText: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: defaultColors.slate,
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 12,
    paddingRight: 12,
  },
  tableRowEven: {
    backgroundColor: '#f9fafb',
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
    width: 90,
    textAlign: 'right',
  },
  amountCol: {
    width: 100,
    textAlign: 'right',
  },
  itemTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 1,
  },
  itemValue: {
    fontSize: 10,
    color: defaultColors.ink,
  },
  totalsWrap: {
    marginTop: 24,
    marginLeft: 'auto',
    width: 240,
    paddingTop: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 9,
    color: defaultColors.slate,
  },
  totalValue: {
    fontSize: 9,
    color: defaultColors.ink,
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: defaultColors.accent,
    borderTopStyle: 'solid',
  },
  grandTotalLabel: {
    fontSize: 13,
    color: defaultColors.ink,
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalValue: {
    fontSize: 14,
    color: defaultColors.accent,
    fontFamily: 'Helvetica-Bold',
  },
  notesSection: {
    marginTop: 28,
    paddingLeft: 14,
    borderLeftWidth: 3,
    borderLeftColor: defaultColors.accent,
    borderLeftStyle: 'solid',
  },
  notesLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: defaultColors.slate,
    marginBottom: 6,
  },
  notesText: {
    fontSize: 9,
    color: defaultColors.slate,
    lineHeight: 1.65,
  },
  footer: {
    position: 'absolute',
    left: 48,
    right: 48,
    bottom: 28,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderTopStyle: 'solid',
  },
  footerText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#9ca3af',
    letterSpacing: 0.3,
  },
});

export function ModernInvoiceDocument({
  invoice,
  businessLogo,
  accentColor,
}: InvoiceDocumentProps) {
  const c =
    accentColor && accentColor !== DEFAULT_ACCENT_COLOR ? buildColors(accentColor) : null;

  const accent = c ? c.accent : defaultColors.accent;

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
        {/* Accent stripe at top */}
        <View style={[styles.accentBar, { backgroundColor: accent }]} />

        {/* Masthead: logo + business info | invoice label + meta */}
        <View style={styles.masthead}>
          <View style={styles.brandBlock}>
            {businessLogo ? (
              <Image
                src={businessLogo}
                style={{ width: 52, height: 52, marginBottom: 10, objectFit: 'contain' }}
              />
            ) : null}
          </View>

          <View style={styles.invoiceBlock}>
            <Text style={styles.businessName}>{invoice.businessName || 'Your Business'}</Text>
            <View style={[styles.businessUnderline, { backgroundColor: accent }]} />
            <Text style={[styles.invoiceLabel, { color: accent }]}>Invoice</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Invoice ID</Text>
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

        {/* Thin divider */}
        <View style={styles.divider} />

        {/* Two-column from / bill-to */}
        <View style={styles.addressSection}>
          <View style={styles.addressCard}>
            <Text style={styles.addressLabel}>Bill From</Text>
            {invoice.senderName ? (
              <>
                <Text style={styles.addressNameLabel}>Name</Text>
                <Text style={styles.addressName}>{invoice.senderName}</Text>
              </>
            ) : null}
            {businessLines.length > 0 ? (
              businessLines.map((line) => (
                <Text key={line} style={styles.addressLine}>
                  {line}
                </Text>
              ))
            ) : (
              <Text style={styles.addressLine}>Business details will appear here.</Text>
            )}
          </View>
          <View style={styles.addressCard}>
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
          <View
            style={[styles.tableHeader, c ? { borderBottomColor: c.accent } : {}]}
          >
            <Text style={[styles.tableHeaderText, styles.descriptionCol]}>Description</Text>
            <Text style={[styles.tableHeaderText, styles.qtyCol]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.rateCol]}>Rate</Text>
            <Text style={[styles.tableHeaderText, styles.amountCol]}>Amount</Text>
          </View>

          {lineItems.map((item, index) => (
            <View
              key={item.id}
              style={[styles.tableRow, index % 2 === 1 ? styles.tableRowEven : {}]}
            >
              <View style={styles.descriptionCol}>
                <Text style={styles.itemTitle}>{item.description}</Text>
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

          <View
            style={[styles.grandTotalRow, c ? { borderTopColor: c.accent } : {}]}
          >
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={[styles.grandTotalValue, { color: accent }]}>
              {formatCurrency(invoice.total, invoice.currency)}
            </Text>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes ? (
          <View style={[styles.notesSection, c ? { borderLeftColor: c.accent } : {}]}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        ) : null}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Created with {APP_NAME} {'\u2022'} {APP_TAGLINE} {'\u2022'}{' '}
            {APP_URL.replace(/^https?:\/\//, '')}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
