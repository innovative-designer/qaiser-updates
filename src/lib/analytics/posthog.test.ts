import { describe, expect, it } from 'vitest';

import { isAnalyticsRoute } from '@/lib/analytics/posthog';

describe('isAnalyticsRoute', () => {
  it('treats shared invoice viewer routes as analytics-enabled', () => {
    expect(isAnalyticsRoute('/v/abc12345')).toBe(true);
  });

  it('does not enable analytics for seo routes', () => {
    expect(isAnalyticsRoute('/blog/send-invoice-whatsapp-30-seconds')).toBe(false);
  });
});
