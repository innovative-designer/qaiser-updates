import Link from 'next/link';

import { APP_NAME } from '@/lib/constants';
import { LEGAL_PAGE_PATHS, SUPPORT_EMAIL } from '@/lib/site';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const allLinks = [
  { href: LEGAL_PAGE_PATHS.about, label: 'About' },
  { href: LEGAL_PAGE_PATHS.contact, label: 'Contact' },
  { href: LEGAL_PAGE_PATHS.faq, label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: LEGAL_PAGE_PATHS.privacy, label: 'Privacy' },
  { href: LEGAL_PAGE_PATHS.terms, label: 'Terms' },
  { href: LEGAL_PAGE_PATHS.cookies, label: 'Cookies' },
];

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('border-border/60 mt-12 border-t bg-transparent', className)}>
      <div className="app-shell py-6">
        <div className="editorial-shell hero-wash px-5 py-5 sm:px-8">
          {/* Single row: copyright · links · email */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} {APP_NAME}
            </p>

            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                {allLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
