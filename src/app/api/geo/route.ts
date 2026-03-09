import { NextResponse } from 'next/server';

import { DEFAULT_CURRENCY } from '@/lib/constants';

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: 'USD',
  GB: 'GBP',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  AE: 'AED',
  PK: 'PKR',
  IN: 'INR',
  NG: 'NGN',
  ZA: 'ZAR',
  BD: 'BDT',
  CA: 'CAD',
  AU: 'AUD',
  SA: 'SAR',
  QA: 'QAR',
  KW: 'KWD',
  BH: 'BHD',
  OM: 'OMR',
  EG: 'EGP',
  KE: 'KES',
  GH: 'GHS',
  TR: 'TRY',
  MY: 'MYR',
  PH: 'PHP',
  SG: 'SGD',
  JP: 'JPY',
  CN: 'CNY',
};

interface GeoResponse {
  countryCode?: string;
  currency?: string;
}

export async function GET() {
  try {
    const response = await fetch('http://ip-api.com/json/?fields=countryCode,currency', {
      signal: AbortSignal.timeout(3000),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ currency: DEFAULT_CURRENCY, country: null });
    }

    const data = (await response.json()) as GeoResponse;
    const currency =
      (data.countryCode ? COUNTRY_TO_CURRENCY[data.countryCode] : undefined) ||
      data.currency ||
      DEFAULT_CURRENCY;

    return NextResponse.json({
      currency,
      country: data.countryCode || null,
    });
  } catch {
    return NextResponse.json({ currency: DEFAULT_CURRENCY, country: null });
  }
}
