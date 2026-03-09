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
      className={cn(
        'border-border/60 bg-background/75 sticky top-0 z-40 border-b backdrop-blur-xl',
        className
      )}
    >
      <div className="app-shell flex items-center justify-between gap-3 py-3 sm:py-4">
        <Link
          href="/"
          className="text-foreground hover:text-primary inline-flex min-w-0 items-center gap-3 transition-colors"
        >
          <span className="bg-primary/12 text-primary ring-primary/15 flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1">
            <Zap className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-semibold tracking-tight">{APP_NAME}</span>
            <span className="text-muted-foreground hidden text-[0.72rem] tracking-[0.18em] uppercase sm:block">
              Mobile Invoicing
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/history"
            className="text-muted-foreground hover:text-foreground hidden rounded-full px-3 py-2 text-sm font-medium transition-colors sm:inline-flex"
          >
            History
          </Link>
          <Link
            href="/history"
            className="bg-secondary/70 text-secondary-foreground inline-flex size-10 items-center justify-center rounded-2xl sm:hidden"
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
