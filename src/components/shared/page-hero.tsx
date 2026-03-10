import * as React from 'react';

import { cn } from '@/lib/utils';

interface PageHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  gridClassName?: string;
  withGrid?: boolean;
}

export function PageHero({
  className,
  gridClassName,
  withGrid = true,
  children,
  ...props
}: PageHeroProps) {
  return (
    <div
      className={cn(
        'editorial-shell hero-wash relative overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10',
        className
      )}
      {...props}
    >
      {withGrid ? (
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-25" />
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_65%)] opacity-80" />
      <div className={cn('relative grid gap-8 lg:items-end', gridClassName)}>{children}</div>
    </div>
  );
}
