import { DEFAULT_CURRENCY } from '@/lib/constants';

interface GeoApiResponse {
  currency?: string;
}

export async function detectCurrency(): Promise<string> {
  try {
    const response = await fetch('/api/geo', {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return DEFAULT_CURRENCY;
    }

    const data = (await response.json()) as GeoApiResponse;
    return data.currency || DEFAULT_CURRENCY;
  } catch {
    return DEFAULT_CURRENCY;
  }
}
