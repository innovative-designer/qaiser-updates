import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { APP_NAME, APP_TAGLINE, APP_URL, DEFAULT_ACCENT_COLOR } from '@/lib/constants';
import { formatCurrency } from '@/lib/currencies';
import { buildColors, defaultColors } from '@/components/pdf/shared/colors';
import { formatDate } from '@/components/pdf/shared/format';
import type { InvoiceDocumentProps } from '@/components/pdf/shared/types';

const bg = '#f8f9fa';
const borderMedium = '#dee2e6';
const borderLight = '#e9ecef';
const textDark = '#212529';
const textMuted = '#6c757d';
const stripeRow = '#f1f3f5';

const styles = StyleSheet.create({
  page: {
    backgroundColor: bg,
    color: textDark,
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 32,
    paddingRight: 36,
    paddingBottom: 72,
    paddingLeft: 36,
  },

  /* ── Header: business info left, invoice meta right ── */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 14,
    borderBottomWidth: 2,
    borderBottomColor: borderMedium,
    borderBottomStyle: 'solid',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    maxWidth: 300,
  },
  logo: {
    width: 42,
    height: 42,
    marginRight: 10,
    objectFit: 'contain',
  },
  businessName: {
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3,
  },
  businessLine: {
    fontSize: 8.5,
    color: textMuted,
    lineHeight: 1.45,
    marginBottom: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  invoiceLabel: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 3,
  },
  metaLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: textMuted,
    width: 60,
    textAlign: 'right',
    marginRight: 8,
  },
  metaValue: {
    fontSize: 9,
    fontFamily: 'Courier-Bold',
    width: 90,
    textAlign: 'right',
  },

  /* ── From / To row ── */
  parties: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  partyBlock: {
    width: '48%',
  },
  partyLabel: {
    fontSize: 7.5,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: textMuted,
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold',
  },
  partyName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3,
  },
  partyLine: {
    fontSize: 8.5,
    color: textMuted,
    lineHeight: 1.5,
    marginBottom: 1,
  },

  /* ── Table ── */
  table: {
    borderWidth: 1,
    borderColor: borderMedium,
    borderStyle: 'solid',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  tableHeaderText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopWidth: 1,
    borderTopColor: borderLight,
    borderTopStyle: 'solid',
  },
  tableRowStripe: {
    backgroundColor: stripeRow,
  },
  descCol: {
    flex: 1,
    paddingRight: 8,
  },
  qtyCol: {
    width: 55,
    textAlign: 'right',
    paddingRight: 8,
    borderLeftWidth: 1,
    borderLeftColor: borderLight,
    borderLeftStyle: 'solid',
    paddingLeft: 8,
  },
  rateCol: {
    width: 90,
    textAlign: 'right',
    paddingRight: 8,
    borderLeftWidth: 1,
    borderLeftColor: borderLight,
    borderLeftStyle: 'solid',
    paddingLeft: 8,
  },
  amountCol: {
    width: 100,
    textAlign: 'right',
    borderLeftWidth: 1,
    borderLeftColor: borderLight,
    borderLeftStyle: 'solid',
    paddingLeft: 8,
  },
  itemDesc: {
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  itemNum: {
    fontSize: 10,
    fontFamily: 'Courier',
  },

  /* ── Totals ── */
  totalsWrap: {
    marginTop: 16,
    marginLeft: 'auto',
    width: 250,
    borderWidth: 1,
    borderColor: borderMedium,
    borderStyle: 'solid',
    padding: 12,
    backgroundColor: '#ffffff',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  totalLabel: {
    fontSize: 9,
    color: textMuted,
  },
  totalValue: {
    fontSize: 9,
    fontFamily: 'Courier-Bold',
  },
  doubleLine: {
    borderTopWidth: 1,
    borderTopColor: borderMedium,
    borderTopStyle: 'solid',
    marginTop: 4,
    paddingTop: 3,
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: textDark,
    borderTopStyle: 'solid',
  },
  grandTotalLabel: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalValue: {
    fontSize: 12,
    fontFamily: 'Courier-Bold',
  },

  /* ── Notes ── */
  notesSection: {
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: borderLight,
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
  },
  notesLabel: {
    fontSize: 7.5,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: textMuted,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 9,
    color: textMuted,
    lineHeight: 1.6,
  },

  /* ── Footer ── */
  footer: {
    position: 'absolute',
    left: 36,
    right: 36,
    bottom: 24,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: borderMedium,
  },
  footerText: {
    fontSize: 7.5,
    textAlign: 'center',
    color: textMuted,
    letterSpacing: 0.4,
  },
});

export function LedgerInvoiceDocument({
  invoice,
  businessLogo,
  accentColor,
}: InvoiceDocumentProps) {
  const c =
    accentColor && accentColor !== DEFAULT_ACCENT_COLOR ? buildColors(accentColor) : null;

  const accent = c ? c.accent : defaultColors.accent;
  const accentDeep = c ? c.accentDeep : defaultColors.accentDeep;

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
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {businessLogo ? <Image src={businessLogo} style={styles.logo} /> : null}
            <View>
              <Text style={styles.businessName}>{invoice.businessName || 'Your Business'}</Text>
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
          </View>

          <View style={styles.headerRight}>
            <Text style={[styles.invoiceLabel, { color: accentDeep }]}>Invoice</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>No.</Text>
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

        {/* ── From / To ── */}
        <View style={styles.parties}>
          <View style={styles.partyBlock}>
            <Text style={styles.partyLabel}>From</Text>
            <Text style={styles.partyName}>{invoice.businessName || 'Your Business'}</Text>
            {businessLines.map((line) => (
              <Text key={line} style={styles.partyLine}>
                {line}
              </Text>
            ))}
          </View>
          <View style={styles.partyBlock}>
            <Text style={styles.partyLabel}>Bill To</Text>
            <Text style={styles.partyName}>{invoice.clientName || 'Client Name'}</Text>
            {clientLines.length > 0 ? (
              clientLines.map((line) => (
                <Text key={line} style={styles.partyLine}>
                  {line}
                </Text>
              ))
            ) : (
              <Text style={styles.partyLine}>Client details will appear here.</Text>
            )}
          </View>
        </View>

        {/* ── Line Items Table ── */}
        <View style={styles.table}>
          <View style={[styles.tableHeader, { backgroundColor: accent }]}>
            <Text style={[styles.tableHeaderText, styles.descCol]}>Description</Text>
            <Text style={[styles.tableHeaderText, styles.qtyCol, { borderLeftColor: 'transparent' }]}>
              Qty
            </Text>
            <Text style={[styles.tableHeaderText, styles.rateCol, { borderLeftColor: 'transparent' }]}>
              Rate
            </Text>
            <Text style={[styles.tableHeaderText, styles.amountCol, { borderLeftColor: 'transparent' }]}>
              Amount
            </Text>
          </View>

          {lineItems.map((item, idx) => (
            <View
              key={item.id}
              style={[styles.tableRow, idx % 2 === 1 ? styles.tableRowStripe : {}]}
            >
              <Text style={[styles.itemDesc, styles.descCol]}>{item.description}</Text>
              <Text style={[styles.itemNum, styles.qtyCol]}>{item.quantity}</Text>
              <Text style={[styles.itemNum, styles.rateCol]}>
                {formatCurrency(item.rate, invoice.currency)}
              </Text>
              <Text style={[styles.itemNum, styles.amountCol]}>
                {formatCurrency(item.amount, invoice.currency)}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Totals Box ── */}
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

          {/* Double rule above grand total */}
          <View style={styles.doubleLine} />
          <View style={[styles.grandTotalRow, { borderTopColor: accentDeep }]}>
            <Text style={styles.grandTotalLabel}>Total Due</Text>
            <Text style={[styles.grandTotalValue, { color: accentDeep }]}>
              {formatCurrency(invoice.total, invoice.currency)}
            </Text>
          </View>
        </View>

        {/* ── Notes ── */}
        {invoice.notes ? (
          <View style={styles.notesSection}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        ) : null}

        {/* ── Footer ── */}
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
