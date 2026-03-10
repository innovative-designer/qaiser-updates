import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[transform,background-color,border-color,box-shadow,color] outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/15 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[var(--shadow-button-active)] hover:-translate-y-0.5 hover:bg-[color-mix(in_oklch,var(--primary)_92%,white_5%)] focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)]',
        outline:
          'surface-field text-foreground shadow-none hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] aria-expanded:bg-[var(--surface-hover)] aria-expanded:text-foreground focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)]',
        secondary:
          'bg-secondary text-secondary-foreground shadow-none hover:-translate-y-0.5 hover:bg-[color-mix(in_oklch,var(--secondary)_84%,var(--primary)_6%)] aria-expanded:bg-secondary focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)]',
        ghost:
          'text-muted-foreground hover:bg-[var(--surface-hover)] hover:text-foreground aria-expanded:bg-[var(--surface-hover)] aria-expanded:text-foreground focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)]',
        destructive:
          'border-destructive/18 bg-destructive/10 text-destructive hover:-translate-y-0.5 hover:bg-destructive/14 focus-visible:border-destructive/40 focus-visible:ring-4 focus-visible:ring-destructive/18 dark:bg-destructive/16 dark:hover:bg-destructive/24 dark:focus-visible:ring-destructive/30',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-11 gap-1.5 px-4 text-[0.95rem] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        xs: "h-8 gap-1 rounded-[var(--radius-button-sm)] px-2.5 text-xs in-data-[slot=button-group]:rounded-[var(--radius-button-sm)] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-10 gap-1.5 rounded-[var(--radius-button-sm)] px-3.5 text-sm in-data-[slot=button-group]:rounded-[var(--radius-button-sm)] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-12 gap-2 px-5 text-[0.95rem] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',
        icon: 'size-11',
        'icon-xs':
          "size-8 rounded-[var(--radius-button-sm)] in-data-[slot=button-group]:rounded-[var(--radius-button-sm)] [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-10 rounded-[var(--radius-button-sm)] in-data-[slot=button-group]:rounded-[var(--radius-button-sm)]',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
