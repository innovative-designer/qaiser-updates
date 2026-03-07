'use client';

import { SerwistProvider as BaseSerwistProvider } from '@serwist/turbopack/react';

interface SerwistProviderProps {
  children: React.ReactNode;
}

export function SerwistProvider({ children }: SerwistProviderProps) {
  return (
    <BaseSerwistProvider
      swUrl="/serwist/sw.js"
      disable={process.env.NODE_ENV !== 'production'}
      cacheOnNavigation
      register
      reloadOnOnline
      options={{ scope: '/' }}
    >
      {children}
    </BaseSerwistProvider>
  );
}
