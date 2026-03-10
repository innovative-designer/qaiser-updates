import * as React from 'react';

import { cn } from '@/lib/utils';

type InfoPanelTone = 'default' | 'quiet' | 'accent';

const toneClasses: Record<InfoPanelTone, string> = {
  default: 'editorial-panel',
  quiet: 'surface-quiet rounded-[var(--radius-card)] border',
  accent:
    'rounded-[var(--radius-card)] border border-primary/12 bg-primary/6 shadow-[var(--shadow-card)]',
};

interface InfoPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: InfoPanelTone;
}

export function InfoPanel({ className, tone = 'default', children, ...props }: InfoPanelProps) {
  return (
    <div className={cn('p-6 sm:p-7', toneClasses[tone], className)} {...props}>
      {children}
    </div>
  );
}
