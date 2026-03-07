import { NextRequest, NextResponse } from 'next/server';

import { supabaseAdmin } from '@/lib/supabase';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com',
  'dispostable.com',
  'fakeinbox.com',
  'guerrillamail.com',
  'guerrillamailblock.com',
  'grr.la',
  'maildrop.cc',
  'mailinator.com',
  'mailnesia.com',
  'sharklasers.com',
  'temp-mail.org',
  'tempmail.com',
  'throwaway.email',
  'trashmail.com',
  'yopmail.com',
]);

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function getCountry(request: NextRequest): string | null {
  return request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || null;
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const currentEntry = rateLimitMap.get(ip);

  if (!currentEntry || now > currentEntry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  currentEntry.count += 1;
  return currentEntry.count > RATE_LIMIT_MAX;
}

function isValidEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email) && email.length <= 254;
}

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? DISPOSABLE_DOMAINS.has(domain) : false;
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = (await request.json()) as {
      email?: string;
      source?: string;
      honeypot?: string;
    };

    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    if (!body.email || typeof body.email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const normalizedEmail = body.email.trim().toLowerCase();
    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    if (isDisposableEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please use a non-disposable email address' },
        { status: 400 }
      );
    }

    const { data: existing, error: checkError } = await supabaseAdmin
      .from('pro_waitlist')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (checkError) {
      console.error('Waitlist duplicate-check error:', checkError);
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ success: true });
    }

    const source =
      typeof body.source === 'string' && body.source.length > 0 ? body.source : 'banner';

    const { error: insertError } = await supabaseAdmin.from('pro_waitlist').insert({
      email: normalizedEmail,
      source,
      ip,
      country: getCountry(request),
    });

    if (insertError) {
      if (insertError.code === '23505') {
        return NextResponse.json({ success: true });
      }

      console.error('Waitlist insert error:', insertError);
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist route error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
