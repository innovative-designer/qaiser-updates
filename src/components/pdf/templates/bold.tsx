import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { APP_NAME, APP_TAGLINE, APP_URL, DEFAULT_ACCENT_COLOR } from '@/lib/constants';
import { formatCurrency } from '@/lib/currencies';
import { buildColors, defaultColors } from '@/components/pdf/shared/colors';
import { formatDate } from '@/components/pdf/shared/format';
import {
  getBillFromName,
  getBrandName,
  getBusinessLines,
  getClientLines,
} from '@/components/pdf/shared/parties';
import type { InvoiceDocumentProps } from '@/components/pdf/shared/types';

const styles = StyleSheet.create({
  page: {
    backgroundColor: defaultColors.paper,
    color: defaultColors.ink,
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 0,
    paddingRight: 36,
    paddingBottom: 78,
    paddingLeft: 42,
  },
  rail: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 5,
    backgroundColor: defaultColors.accent,
  },
  masthead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 36,
    marginBottom: 28,
  },
  brandBlock: {
    maxWidth: 270,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    marginLeft: 12,
  },
  businessName: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  businessLine: {
    fontSize: 9,
    color: defaultColors.slate,
    lineHeight: 1.45,
    marginBottom: 2,
  },
  invoiceLabel: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: defaultColors.accent,
    textAlign: 'right',
  },
  metaBlock: {
    marginBottom: 24,
    padding: 14,
    backgroundColor: defaultColors.accent,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 7.5,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: '#ffffff',
    opacity: 0.75,
    marginBottom: 3,
  },
  metaValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  addressCard: {
    width: '48%',
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: defaultColors.accent,
    borderLeftStyle: 'solid',
    backgroundColor: defaultColors.white,
  },
  sectionEyebrow: {
    fontSize: 7.5,
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: defaultColors.slate,
    marginBottom: 6,
  },
  clientName: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  clientLine: {
    fontSize: 9,
    color: defaultColors.slate,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  table: {
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: defaultColors.accent,
  },
  tableHeaderText: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.line,
    borderBottomStyle: 'solid',
  },
  descriptionCol: {
    flex: 1,
    paddingRight: 10,
  },
  qtyCol: {
    width: 54,
    textAlign: 'right',
  },
  rateCol: {
    width: 90,
    textAlign: 'right',
  },
  amountCol: {
    width: 102,
    textAlign: 'right',
  },
  itemTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  itemSubtle: {
    fontSize: 8,
    color: defaultColors.slate,
  },
  itemValue: {
    fontSize: 10,
    color: defaultColors.ink,
  },
  totalsWrap: {
    marginTop: 20,
    marginLeft: 'auto',
    width: 240,
    paddingTop: 8,
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
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: defaultColors.accentSoft,
    borderTopWidth: 2,
    borderTopColor: defaultColors.accent,
  },
  grandTotalLabel: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: defaultColors.ink,
  },
  grandTotalValue: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: defaultColors.accent,
  },
  notesSection: {
    marginTop: 24,
    padding: 15,
    borderLeftWidth: 3,
    borderLeftColor: defaultColors.accent,
    borderLeftStyle: 'solid',
    backgroundColor: defaultColors.white,
  },
  notesText: {
    fontSize: 9,
    color: defaultColors.slate,
    lineHeight: 1.6,
  },
  footer: {
    position: 'absolute',
    left: 42,
    right: 36,
    bottom: 26,
    paddingTop: 11,
    borderTopWidth: 2,
    borderTopColor: defaultColors.accent,
  },
  footerText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#8b98a8',
    letterSpacing: 0.4,
  },
});

export function BoldInvoiceDocument({ invoice, businessLogo, accentColor }: InvoiceDocumentProps) {
  const c =
    accentColor && accentColor !== DEFAULT_ACCENT_COLOR ? buildColors(accentColor) : null;

  const accent = c?.accent || defaultColors.accent;
  const accentDeep = c?.accentDeep || defaultColors.accentDeep;
  const accentSoft = c?.accentSoft || defaultColors.accentSoft;

  const brandName = getBrandName(invoice);
  const billFromName = getBillFromName(invoice);
  const businessLines = getBusinessLines(invoice);
  const clientLines = getClientLines(invoice);
  const lineItems = invoice.lineItems.filter((item) => item.description.trim());

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left accent rail */}
        <View style={[styles.rail, { backgroundColor: accent }]} fixed />

        {/* Masthead: logo + business info | INVOICE label */}
        <View style={styles.masthead}>
          <View style={styles.brandBlock}>
            <View style={styles.brandRow}>
              {businessLogo ? (
                <Image src={businessLogo} style={{ width: 52, height: 52, objectFit: 'contain' }} />
              ) : null}
              <View style={[styles.brandText, !businessLogo ? { marginLeft: 0 } : {}]}>
                <Text style={styles.businessName}>{brandName}</Text>
              </View>
            </View>
          </View>

          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start' }}>
            <Text style={[styles.invoiceLabel, { color: accent }]}>Invoice</Text>
          </View>
        </View>

        {/* Accent-colored meta block */}
        <View style={[styles.metaBlock, { backgroundColor: accent }]}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Invoice ID</Text>
            <Text style={styles.metaValue}>#{invoice.id}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Issued</Text>
            <Text style={styles.metaValue}>{formatDate(invoice.createdAt)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Due Date</Text>
            <Text style={styles.metaValue}>{formatDate(invoice.dueDate)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Status</Text>
            <Text style={styles.metaValue}>{invoice.status || 'Pending'}</Text>
          </View>
        </View>

        {/* Bill From / Bill To */}
        <View style={styles.addressSection}>
          <View style={[styles.addressCard, { borderLeftColor: accent }]}>
            <Text style={styles.sectionEyebrow}>Bill From</Text>
            <Text style={styles.clientName}>{billFromName}</Text>
            {businessLines.length > 0 ? (
              businessLines.map((line) => (
                <Text key={line} style={styles.clientLine}>
                  {line}
                </Text>
              ))
            ) : (
              <Text style={styles.clientLine}>Business details will appear here.</Text>
            )}
          </View>
          <View style={[styles.addressCard, { borderLeftColor: accent }]}>
            <Text style={styles.sectionEyebrow}>Bill To</Text>
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
        </View>

        {/* Line Items Table */}
        <View style={styles.table}>
          <View style={[styles.tableHeader, { backgroundColor: accent }]}>
            <Text style={[styles.tableHeaderText, styles.descriptionCol]}>Description</Text>
            <Text style={[styles.tableHeaderText, styles.qtyCol]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.rateCol]}>Rate</Text>
            <Text style={[styles.tableHeaderText, styles.amountCol]}>Amount</Text>
          </View>

          {lineItems.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <View style={styles.descriptionCol}>
                <Text style={styles.itemTitle}>{item.description}</Text>
                <Text style={styles.itemSubtle}>Prepared with Free Invoice Kit</Text>
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

          <View style={[styles.grandTotalRow, { backgroundColor: accentSoft, borderTopColor: accent }]}>
            <Text style={styles.grandTotalLabel}>Total Due</Text>
            <Text style={[styles.grandTotalValue, { color: accentDeep }]}>
              {formatCurrency(invoice.total, invoice.currency)}
            </Text>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes ? (
          <View style={[styles.notesSection, { borderLeftColor: accent }]}>
            <Text style={styles.sectionEyebrow}>Notes</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        ) : null}

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: accent }]} fixed>
          <Text style={styles.footerText}>
            Created with {APP_NAME} • {APP_TAGLINE} • {APP_URL.replace(/^https?:\/\//, '')}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
