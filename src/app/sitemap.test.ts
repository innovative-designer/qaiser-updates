import { describe, expect, it } from 'vitest';

import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  it('does not include shared viewer routes', () => {
    const urls = sitemap().map((entry) => entry.url.toString());

    expect(urls.some((url) => url.includes('/v/'))).toBe(false);
  });
});
