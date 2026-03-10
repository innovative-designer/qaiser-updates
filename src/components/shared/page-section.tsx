import * as React from 'react';

import { cn } from '@/lib/utils';

type SectionWidth = 'default' | 'wide' | 'narrow';
type SectionSpacing = 'default' | 'compact' | 'none';

const widthClasses: Record<SectionWidth, string> = {
  default: 'app-shell',
  wide: 'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8',
  narrow: 'mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8',
};

const spacingClasses: Record<SectionSpacing, string> = {
  default: 'pb-14 sm:pb-18 lg:pb-24',
  compact: 'pb-10 sm:pb-12 lg:pb-16',
  none: '',
};

interface PageSectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements;
  width?: SectionWidth;
  spacing?: SectionSpacing;
  innerClassName?: string;
}

export function PageSection({
  as: Comp = 'section',
  className,
  width = 'default',
  spacing = 'default',
  innerClassName,
  children,
  ...props
}: PageSectionProps) {
  const Tag = Comp as React.ElementType;
  return (
    <Tag className={cn(spacingClasses[spacing], className)} {...props}>
      <div className={cn(widthClasses[width], innerClassName)}>{children}</div>
    </Tag>
  );
}
