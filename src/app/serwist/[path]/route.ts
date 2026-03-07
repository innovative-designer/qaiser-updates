import { createSerwistRoute } from '@serwist/turbopack';
import type { NextRequest } from 'next/server';

const serwistRoute = createSerwistRoute({
  swSrc: 'src/app/sw.ts',
  useNativeEsbuild: true,
  additionalPrecacheEntries: ['/offline'],
});

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;
export const generateStaticParams = serwistRoute.generateStaticParams;

export async function GET(request: NextRequest, context: { params: Promise<unknown> }) {
  return serwistRoute.GET(request, context as { params: Promise<{ path: string }> });
}
