'use client';

import { MoonStar, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'h-11 w-[4.5rem] shrink-0 rounded-full border border-white/60 bg-white/60 shadow-[0_16px_40px_-28px_rgba(26,38,64,0.35)] dark:border-white/10 dark:bg-white/5',
          className,
        )}
      />
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'group relative inline-flex h-11 w-[4.5rem] shrink-0 items-center rounded-full border border-white/65 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(245,242,234,0.9))] p-1 shadow-[0_16px_40px_-28px_rgba(26,38,64,0.45)] transition-[transform,border-color,background-color,box-shadow] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/45 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(22,28,41,0.98),rgba(31,38,53,0.94))] dark:shadow-[0_18px_44px_-28px_rgba(0,0,0,0.72)]',
        className,
      )}
    >
      <span className="sr-only">{label}</span>
      <SunMedium
        className={cn(
          'absolute left-[0.7rem] size-3.5 transition-colors duration-300',
          isDark ? 'text-muted-foreground/55' : 'text-amber-500',
        )}
      />
      <MoonStar
        className={cn(
          'absolute right-[0.7rem] size-3.5 transition-colors duration-300',
          isDark ? 'text-primary' : 'text-muted-foreground/55',
        )}
      />
      <span
        className={cn(
          'absolute left-1 flex size-8 items-center justify-center rounded-full border border-white/70 bg-white/96 shadow-[0_12px_28px_-18px_rgba(26,38,64,0.6)] transition-transform duration-300 ease-out dark:border-white/10 dark:bg-[rgba(12,17,27,0.96)] dark:shadow-[0_14px_32px_-20px_rgba(0,0,0,0.8)]',
          isDark && 'translate-x-[2rem]',
        )}
      >
        {isDark ? (
          <MoonStar className="size-3.5 text-primary" />
        ) : (
          <SunMedium className="size-3.5 text-amber-500" />
        )}
      </span>
    </button>
  );
}
