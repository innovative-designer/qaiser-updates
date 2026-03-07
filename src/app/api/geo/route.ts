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
  country_code?: string;
  currency?: string;
}

export async function GET() {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(3000),
      headers: {
        'User-Agent': 'QuickBill/1.0',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ currency: DEFAULT_CURRENCY, country: null });
    }

    const data = (await response.json()) as GeoResponse;
    const currency =
      (data.country_code ? COUNTRY_TO_CURRENCY[data.country_code] : undefined) ||
      data.currency ||
      DEFAULT_CURRENCY;

    return NextResponse.json({
      currency,
      country: data.country_code || null,
    });
  } catch {
    return NextResponse.json({ currency: DEFAULT_CURRENCY, country: null });
  }
}
