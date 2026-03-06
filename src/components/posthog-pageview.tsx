"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run if PostHog was initialized (env vars present in the deployment).
    if (!window.posthog) return;

    const currentUrl = window.location.href;
    window.posthog.capture("$pageview", { $current_url: currentUrl });
  }, [pathname, searchParams]);

  return null;
}

