'use client';

import type { CSSProperties } from 'react';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'light' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'color-mix(in oklch, var(--surface-floating) 94%, transparent)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'color-mix(in oklch, var(--border) 78%, white 8%)',
          '--border-radius': 'var(--radius-card)',
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast border shadow-[var(--shadow-floating)] backdrop-blur-xl',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
