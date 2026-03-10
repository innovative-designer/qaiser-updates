'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DISMISSED_KEY = 'freeinvoicekit-pro-banner-dismissed';
const SIGNED_UP_KEY = 'freeinvoicekit-pro-waitlist-signed-up';

interface ProWaitlistBannerProps {
  source?: string;
  variant?: 'banner' | 'inline';
}

export function ProWaitlistBanner({
  source = 'banner',
  variant = 'banner',
}: ProWaitlistBannerProps) {
  const [hydrated, setHydrated] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISSED_KEY) === 'true');
    setSignedUp(localStorage.getItem(SIGNED_UP_KEY) === 'true');
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  if (variant === 'banner' && dismissed) {
    return null;
  }

  function dismissBanner() {
    setDismissed(true);
    localStorage.setItem(DISMISSED_KEY, 'true');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const nextEmail = email.trim();
    if (!nextEmail) {
      setError('Please enter your email');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: nextEmail,
          source,
          honeypot: honeypotRef.current?.value || '',
        }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to join waitlist');
      }

      setSignedUp(true);
      localStorage.setItem(SIGNED_UP_KEY, 'true');
      localStorage.removeItem(DISMISSED_KEY);
      setEmail('');
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : 'Failed to join waitlist';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (signedUp) {
    return (
      <div className="rounded-[var(--radius-card)] border border-emerald-200 bg-emerald-50/80 px-4 py-3.5 text-sm text-emerald-800 shadow-[0_18px_50px_-38px_rgba(16,185,129,0.45)] dark:border-emerald-500/25 dark:bg-emerald-500/12 dark:text-emerald-100">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-4" />
          <span>You&apos;re on the Pro waitlist. We&apos;ll notify you when it launches.</span>
        </div>
      </div>
    );
  }

  const wrapperClassName =
    variant === 'banner' ? 'editorial-shell hero-wash p-4 sm:p-5' : 'editorial-panel p-4 sm:p-5';

  return (
    <div className={wrapperClassName}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-primary inline-flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="size-4" />
            Pro Waitlist
          </p>
          <p className="text-foreground text-sm leading-6">
            Get early access to recurring invoices, custom branding, and online payments.
          </p>
        </div>
        {variant === 'banner' ? (
          <button
            type="button"
            onClick={dismissBanner}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss waitlist banner"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      <form className="mt-4 space-y-2" onSubmit={handleSubmit}>
        <input
          ref={honeypotRef}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />
        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="space-y-2">
            <Label htmlFor={`waitlist-email-${source}`}>Email address</Label>
            <Input
              id={`waitlist-email-${source}`}
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(event) => setEmail(event.target.value)}
              aria-label="Email address"
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="sm:self-end">
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Joining...
              </>
            ) : (
              'Join Waitlist'
            )}
          </Button>
        </div>
        {error ? <p className="text-destructive text-xs">{error}</p> : null}
      </form>
    </div>
  );
}
