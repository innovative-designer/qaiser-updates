'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import {
  cancelScheduledPostHogInitialization,
  schedulePostHogInitialization,
} from '@/lib/analytics/posthog';

export function PostHogProvider() {
  const pathname = usePathname();

  useEffect(() => {
    schedulePostHogInitialization(pathname);

    return () => {
      cancelScheduledPostHogInitialization();
    };
  }, [pathname]);

  return null;
}
