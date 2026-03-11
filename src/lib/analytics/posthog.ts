'use client';

type AnalyticsPrimitive = string | number | boolean | null;
type AnalyticsProperties = Record<string, AnalyticsPrimitive | undefined>;
type IdleHandle = number;

interface PostHogGlobal extends Array<unknown> {
  [key: string]: unknown;
  __SV?: number;
  _i?: unknown[];
  init: (token: string, config: Record<string, unknown>, name?: string) => void;
  capture: (eventName: string, properties?: AnalyticsProperties) => void;
  people: PostHogGlobal;
  toString: (debug?: boolean) => string;
}

declare global {
  interface Window {
    posthog?: PostHogGlobal;
  }
}

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const ANALYTICS_ROUTE_PREFIXES = ['/create', '/history'] as const;
const POSTHOG_SCRIPT_SELECTOR = 'script[data-posthog-script="true"]';
const IDLE_TIMEOUT_MS = 1500;

const POSTHOG_METHODS = [
  'capture',
  'identify',
  'alias',
  'people.set',
  'people.set_once',
  'people.unset',
  'people.increment',
  'people.append',
  'people.remove',
  'people.group',
  'group',
  'reset',
  'debug',
  'on',
  'off',
  'opt_in_capturing',
  'opt_out_capturing',
  'has_opted_in_capturing',
  'has_opted_out_capturing',
  'clear_opt_in_out_capturing',
] as const;

let hasInjectedScript = false;
let hasInitialized = false;
let idleHandle: IdleHandle | null = null;

function canUsePostHog() {
  return typeof window !== 'undefined' && Boolean(POSTHOG_KEY && POSTHOG_HOST);
}

export function isAnalyticsRoute(pathname: string | null | undefined) {
  if (!pathname) {
    return false;
  }

  return ANALYTICS_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function attachMethod(target: PostHogGlobal, methodName: string) {
  const [groupName, nestedMethodName] = methodName.split('.');
  const host = nestedMethodName ? (target[groupName] as PostHogGlobal) : target;
  const resolvedMethodName = nestedMethodName ?? groupName;

  host[resolvedMethodName] = (...args: unknown[]) => {
    host.push([resolvedMethodName, ...args]);
  };
}

function createPostHogStub(): PostHogGlobal {
  const existing = window.posthog;

  if (existing?.__SV) {
    return existing;
  }

  const posthog = (existing ?? []) as PostHogGlobal;
  posthog._i = posthog._i ?? [];

  posthog.init = (token: string, config: Record<string, unknown>, name?: string) => {
    const instanceName = name ?? 'posthog';
    const instance = (name ? ((posthog[instanceName] as PostHogGlobal | undefined) ?? []) : posthog) as PostHogGlobal;

    instance.people = (instance.people ?? []) as PostHogGlobal;
    instance.toString = (debug?: boolean) => {
      const label = instanceName === 'posthog' ? 'posthog' : `posthog.${instanceName}`;
      return debug ? label : `${label} (stub)`;
    };
    instance.people.toString = () => `${instance.toString(true)}.people (stub)`;

    POSTHOG_METHODS.forEach((methodName) => attachMethod(instance, methodName));
    posthog._i?.push([token, config, instanceName]);
  };

  posthog.__SV = 1;
  window.posthog = posthog;
  return posthog;
}

function injectPostHogScript() {
  if (hasInjectedScript || document.querySelector(POSTHOG_SCRIPT_SELECTOR)) {
    hasInjectedScript = true;
    return;
  }

  const firstScript = document.getElementsByTagName('script')[0];
  const script = document.createElement('script');
  script.async = true;
  script.dataset.posthogScript = 'true';
  script.src = `${POSTHOG_HOST}/static/array.js`;

  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }

  hasInjectedScript = true;
}

export function initializePostHog() {
  if (!canUsePostHog() || hasInitialized) {
    return;
  }

  const posthog = createPostHogStub();
  injectPostHogScript();

  posthog.init(POSTHOG_KEY!, {
    api_host: POSTHOG_HOST,
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    disable_external_dependency_loading: true,
    disable_session_recording: true,
    disable_surveys: true,
    disable_surveys_automatic_display: true,
    disable_web_experiments: true,
    rageclick: false,
  });

  hasInitialized = true;
}

export function schedulePostHogInitialization(pathname: string | null | undefined) {
  if (!isAnalyticsRoute(pathname) || !canUsePostHog() || hasInitialized || idleHandle !== null) {
    return;
  }

  const start = () => {
    idleHandle = null;
    initializePostHog();
  };

  if (window.requestIdleCallback) {
    idleHandle = window.requestIdleCallback(() => {
      start();
    }, { timeout: IDLE_TIMEOUT_MS });
    return;
  }

  idleHandle = window.setTimeout(start, IDLE_TIMEOUT_MS);
}

export function cancelScheduledPostHogInitialization() {
  if (idleHandle === null) {
    return;
  }

  if (window.cancelIdleCallback) {
    window.cancelIdleCallback(idleHandle);
  } else {
    window.clearTimeout(idleHandle);
  }

  idleHandle = null;
}

export function captureAnalyticsEvent(eventName: string, properties?: AnalyticsProperties) {
  if (!canUsePostHog() || !isAnalyticsRoute(window.location.pathname)) {
    return;
  }

  initializePostHog();
  window.posthog?.capture(eventName, properties);
}
