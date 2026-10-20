"use client";

/**
 * Client helpers for Google reCAPTCHA v3 (invisible) with a v2 fallback
 * widget when the server reports a low score. Only the public site key is
 * used here. The secret key stays on the server.
 */

type GrecaptchaV3 = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
  render: (el: HTMLElement, opts: { sitekey: string }) => number;
  getResponse: (id: number) => string;
};

declare global {
  interface Window {
    grecaptcha?: GrecaptchaV3;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
let loadPromise: Promise<boolean> | null = null;

export function recaptchaEnabled(): boolean {
  return Boolean(SITE_KEY);
}

function loadScript(): Promise<boolean> {
  if (!SITE_KEY) return Promise.resolve(false);
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.grecaptcha) return Promise.resolve(true);
  if (!loadPromise) {
    loadPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }
  return loadPromise;
}

export async function getRecaptchaToken(action: string): Promise<string> {
  const ready = await loadScript();
  if (!ready || !window.grecaptcha) return "";
  return new Promise((resolve) => {
    window.grecaptcha?.ready(async () => {
      try {
        const token = await window.grecaptcha?.execute(SITE_KEY, { action });
        resolve(token || "");
      } catch {
        resolve("");
      }
    });
  });
}

export async function renderV2Challenge(el: HTMLElement): Promise<number | null> {
  const ready = await loadScript();
  if (!ready || !window.grecaptcha) return null;
  try {
    return window.grecaptcha.render(el, { sitekey: SITE_KEY });
  } catch {
    return null;
  }
}

export function getV2Response(widgetId: number | null): string {
  if (widgetId === null || !window.grecaptcha) return "";
  try {
    return window.grecaptcha.getResponse(widgetId);
  } catch {
    return "";
  }
}
