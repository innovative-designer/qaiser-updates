'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DISMISSED_KEY = 'quickbill-pro-banner-dismissed';
const SIGNED_UP_KEY = 'quickbill-pro-waitlist-signed-up';

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
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-700">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-4" />
          <span>You&apos;re on the Pro waitlist. We&apos;ll notify you when it launches.</span>
        </div>
      </div>
    );
  }

  const wrapperClassName =
    variant === 'banner'
      ? 'rounded-2xl border border-stone-200/90 bg-white/90 p-4 shadow-sm sm:p-5'
      : 'rounded-2xl border border-stone-200/80 bg-white/80 p-4 sm:p-5';

  return (
    <div className={wrapperClassName}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-primary inline-flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="size-4" />
            Pro Waitlist
          </p>
          <p className="text-sm text-stone-700">
            Get early access to recurring invoices, custom branding, and online payments.
          </p>
        </div>
        {variant === 'banner' ? (
          <button
            type="button"
            onClick={dismissBanner}
            className="text-stone-500 transition-colors hover:text-stone-800"
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
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(event) => setEmail(event.target.value)}
            aria-label="Email address"
            className="bg-white"
            required
          />
          <Button type="submit" disabled={isSubmitting}>
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
