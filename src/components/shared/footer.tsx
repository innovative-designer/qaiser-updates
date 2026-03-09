import Link from 'next/link';

import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('border-border/60 mt-12 border-t bg-white/35 dark:bg-background/40', className)}>
      <div className="app-shell py-8 sm:py-10">
        <div className="editorial-shell flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="section-kicker">Free Invoice Kit</p>
            <p className="mt-3 text-lg font-semibold tracking-tight text-foreground">
              Fast, chat-native invoicing for freelancers and small businesses.
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              © {new Date().getFullYear()} {APP_NAME}. Create polished invoice PDFs, save locally,
              and send them without billing-platform overhead.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link href="#" className="bg-secondary/70 hover:bg-secondary inline-flex rounded-full px-4 py-2 transition-colors">
            Privacy
          </Link>
            <Link href="#" className="bg-secondary/70 hover:bg-secondary inline-flex rounded-full px-4 py-2 transition-colors">
            Terms
          </Link>
            <Link href="#" className="bg-secondary/70 hover:bg-secondary inline-flex rounded-full px-4 py-2 transition-colors">
            Twitter
          </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
