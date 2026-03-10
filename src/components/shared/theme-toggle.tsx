'use client';

import { MoonStar, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

const subscribe = () => () => {};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'surface-field h-11 w-[4.4rem] shrink-0 rounded-[var(--radius-pill)] border',
          className
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
        'surface-field group relative inline-flex h-11 w-[4.4rem] shrink-0 items-center rounded-[var(--radius-pill)] border p-1 transition-[transform,border-color,background-color,box-shadow] hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none',
        className
      )}
    >
      <span className="sr-only">{label}</span>
      <SunMedium
        className={cn(
          'absolute left-[0.7rem] size-3.5 transition-colors duration-300',
          isDark ? 'text-muted-foreground/55' : 'text-amber-500'
        )}
      />
      <MoonStar
        className={cn(
          'absolute right-[0.7rem] size-3.5 transition-colors duration-300',
          isDark ? 'text-primary' : 'text-muted-foreground/55'
        )}
      />
      <span
        className={cn(
          'absolute left-1 flex size-8 items-center justify-center rounded-full border border-white/70 bg-white/96 shadow-[0_12px_28px_-18px_rgba(26,38,64,0.6)] transition-transform duration-300 ease-out dark:border-white/10 dark:bg-[rgba(12,17,27,0.96)] dark:shadow-[0_14px_32px_-20px_rgba(0,0,0,0.8)]',
          isDark && 'translate-x-[1.95rem]'
        )}
      >
        {isDark ? (
          <MoonStar className="text-primary size-3.5" />
        ) : (
          <SunMedium className="size-3.5 text-amber-500" />
        )}
      </span>
    </button>
  );
}
