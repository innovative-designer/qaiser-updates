import Link from 'next/link';

import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('border-border/70 bg-muted/40 border-t', className)}>
      <div className="text-muted-foreground mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>
          © {new Date().getFullYear()} {APP_NAME}. Built for fast, clean invoicing.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Twitter
          </Link>
        </div>
      </div>
    </footer>
  );
}
