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
    paddingTop: 40,
    paddingRight: 36,
    paddingBottom: 78,
    paddingLeft: 36,
  },
  masthead: {
    marginBottom: 24,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.lineStrong,
    borderBottomStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  eyebrow: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.9,
    color: defaultColors.slate,
    marginBottom: 6,
  },
  businessName: {
    fontSize: 19,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  businessLine: {
    fontSize: 9,
    color: defaultColors.slate,
    lineHeight: 1.45,
    marginBottom: 2,
  },
  invoiceBlock: {
    width: 180,
    alignItems: 'flex-end',
  },
  invoiceLabel: {
    fontSize: 27,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: defaultColors.accentDeep,
    fontFamily: 'Helvetica-Bold',
  },
  metaCard: {
    width: '100%',
    marginTop: 12,
    padding: 13,
    borderWidth: 1,
    borderColor: defaultColors.lineStrong,
    backgroundColor: defaultColors.accentSoft,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metaRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: defaultColors.slate,
  },
  metaValue: {
    fontSize: 9,
    color: defaultColors.ink,
    fontFamily: 'Helvetica-Bold',
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  addressCard: {
    width: '48%',
    padding: 16,
    borderWidth: 1,
    borderColor: defaultColors.lineStrong,
    backgroundColor: defaultColors.white,
  },
  addressName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  addressLine: {
    fontSize: 9,
    color: defaultColors.slate,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  table: {
    marginTop: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.lineStrong,
    backgroundColor: defaultColors.quietPanel,
    paddingTop: 7,
    paddingLeft: 10,
    paddingRight: 10,
  },
  tableHeaderText: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: defaultColors.slate,
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingTop: 11,
    paddingRight: 10,
    paddingBottom: 11,
    paddingLeft: 10,
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
    width: 236,
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
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: defaultColors.lineStrong,
  },
  grandTotalLabel: {
    fontSize: 12.5,
    color: defaultColors.ink,
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalValue: {
    fontSize: 13,
    color: defaultColors.accentDeep,
    fontFamily: 'Helvetica-Bold',
  },
  notesSection: {
    marginTop: 24,
    padding: 15,
    borderWidth: 1,
    borderColor: defaultColors.lineStrong,
    backgroundColor: defaultColors.white,
  },
  notesText: {
    fontSize: 9,
    color: defaultColors.slate,
    lineHeight: 1.6,
  },
  placeholderBox: {
    marginTop: 18,
    padding: 12,
    backgroundColor: defaultColors.quietPanel,
    borderWidth: 1,
    borderColor: defaultColors.lineStrong,
  },
  placeholderText: {
    fontSize: 8,
    color: defaultColors.slate,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    left: 36,
    right: 36,
    bottom: 26,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: defaultColors.line,
  },
  footerText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#8b98a8',
    letterSpacing: 0.4,
  },
});

export function ClassicInvoiceDocument({ invoice, businessLogo, accentColor }: InvoiceDocumentProps) {
  const c = accentColor && accentColor !== DEFAULT_ACCENT_COLOR ? buildColors(accentColor) : null;
  const brandName = getBrandName(invoice);
  const billFromName = getBillFromName(invoice);
  const businessLines = getBusinessLines(invoice);
  const clientLines = getClientLines(invoice);
  const lineItems = invoice.lineItems.filter((item) => item.description.trim());

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.masthead}>
          <View style={styles.brandBlock}>
            <View style={styles.brandRow}>
              {businessLogo ? (
                <Image src={businessLogo} style={{ width: 48, height: 48, objectFit: 'contain' }} />
              ) : null}
              <View style={[styles.brandText, !businessLogo ? { marginLeft: 0 } : {}]}>
                <Text style={styles.eyebrow}>Brand</Text>
                <Text style={styles.businessName}>{brandName}</Text>
              </View>
            </View>
          </View>

          <View style={styles.invoiceBlock}>
            <Text style={[styles.invoiceLabel, c ? { color: c.accentDeep } : {}]}>Invoice</Text>
            <View style={[styles.metaCard, c ? { backgroundColor: c.accentSoft } : {}]}>
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
            <Text style={styles.eyebrow}>Bill From</Text>
            <Text style={styles.addressName}>{billFromName}</Text>
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
          <View style={[styles.tableHeader, c ? { backgroundColor: c.accentSoft } : {}]}>
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
