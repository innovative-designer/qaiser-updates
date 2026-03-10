import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'surface-field text-foreground placeholder:text-muted-foreground/78 focus-visible:border-primary/35 disabled:text-muted-foreground/92 aria-invalid:border-destructive/55 aria-invalid:ring-destructive/12 dark:aria-invalid:border-destructive/55 dark:aria-invalid:ring-destructive/20 flex field-sizing-content min-h-32 w-full rounded-[var(--radius-field)] border px-4 py-3 text-base leading-7 transition-[border-color,box-shadow,background-color,color] outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)] disabled:cursor-not-allowed disabled:bg-[var(--surface-panel-quiet)] disabled:opacity-100 aria-invalid:ring-4',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
