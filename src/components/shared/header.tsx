import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

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
      className={cn('border-border/70 bg-background/80 border-b backdrop-blur-sm', className)}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-semibold tracking-tight transition-colors"
        >
          <span className="bg-primary/10 text-primary ring-primary/15 flex size-9 items-center justify-center rounded-xl ring-1">
            <Zap className="size-4" />
          </span>
          <span className="text-base">{APP_NAME}</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/history"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            History
          </Link>
          <Button asChild size="lg" className="shadow-sm">
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
