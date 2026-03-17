'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function buildPagePath(pathname: string, search: string) {
  return search ? `${pathname}?${search}` : pathname;
}

export function GoogleAnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasConfiguredGoogleAnalytics = useRef(false);
  const lastTrackedPage = useRef<string | null>(null);
  const search = searchParams.toString();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      ((...args: unknown[]) => {
        window.dataLayer.push(args);
      });

    if (!hasConfiguredGoogleAnalytics.current) {
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false,
      });
      hasConfiguredGoogleAnalytics.current = true;
    }

    const pagePath = buildPagePath(pathname, search);

    if (lastTrackedPage.current === pagePath) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      window.gtag?.('event', 'page_view', {
        page_path: pagePath,
        page_title: document.title,
        page_location: window.location.href,
      });
      lastTrackedPage.current = pagePath;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname, search]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
