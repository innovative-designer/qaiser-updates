import Link from 'next/link';
import { ArrowRight, Clock3, Zap } from 'lucide-react';

import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export function Header({
  className,
  ctaHref = '/create',
  ctaLabel = 'Create Invoice',
}: HeaderProps) {
  return (
    <header
      className={cn('border-border/70 surface-floating sticky top-0 z-40 border-b', className)}
    >
      <div className="app-shell flex items-center justify-between gap-3 py-3">
        <Link
          href="/"
          className="text-foreground hover:text-primary inline-flex min-w-0 items-center gap-3 transition-colors"
        >
          <span className="bg-primary/12 text-primary ring-primary/12 flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-card)] ring-1">
            <Zap className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[1.02rem] font-semibold tracking-[var(--tracking-heading)]">
              {APP_NAME}
            </span>
            <span className="text-muted-foreground hidden text-[0.72rem] font-semibold tracking-[0.18em] uppercase sm:block">
              Mobile Invoicing
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/history"
            className="text-muted-foreground hover:text-foreground hidden rounded-[var(--radius-button)] px-3.5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--surface-hover)] sm:inline-flex"
          >
            History
          </Link>
          <Link
            href="/history"
            className="surface-field text-secondary-foreground inline-flex size-10 items-center justify-center rounded-[var(--radius-button)] border sm:hidden"
            aria-label="View invoice history"
          >
            <Clock3 className="size-4" />
          </Link>
          <ThemeToggle />
          <Button asChild size="lg">
            <Link href={ctaHref}>
              {ctaLabel}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
