import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'surface-field text-foreground file:text-foreground placeholder:text-muted-foreground/78 focus-visible:border-primary/35 disabled:text-muted-foreground/92 aria-invalid:border-destructive/55 aria-invalid:ring-destructive/12 dark:aria-invalid:border-destructive/55 dark:aria-invalid:ring-destructive/20 [&::-webkit-date-and-time-value]:text-foreground h-11 w-full min-w-0 rounded-[var(--radius-field)] border px-4 py-2.5 text-base shadow-none transition-[border-color,box-shadow,background-color,color] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--surface-panel-quiet)] disabled:opacity-100 aria-invalid:ring-4',
        className
      )}
      {...props}
    />
  );
}

export { Input };
