"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { CONSENT_KEY } from "@/lib/site";

type Consent = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
};

/**
 * Step 11 cookie consent (absent from the zip).
 * Fixed bottom full width banner, Accept All and Manage Preferences,
 * modal toggles with Necessary locked, key asher_print_consent,
 * Kenya Data Protection Act 2019 wording.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function save(value: Omit<Consent, "necessary" | "savedAt">) {
    const consent: Consent = {
      necessary: true,
      ...value,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch {
      // Storage unavailable. The banner closes for this visit only.
    }
    setManage(false);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <>
      <div
        role="region"
        aria-label="Cookie consent"
        className="fixed inset-x-0 bottom-0 z-[9999] border-t-2 border-primary bg-white shadow-[0_-6px_24px_rgba(0,0,0,0.12)]"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl text-sm leading-6">
            We use cookies to run this website, remember your quote and, with
            your permission, understand how visitors use our pages. Under the
            Kenya Data Protection Act, 2019, you control which optional
            cookies we may use. Read our{" "}
            <a href="/legal/cookie-policy" className="font-bold text-primary underline">
              Cookie Policy
            </a>{" "}
            for details.
          </p>
          <div className="flex flex-none flex-wrap gap-3">
            <button
              type="button"
              className="btn-primary-zip solid"
              onClick={() => save({ functional: true, analytics: true, marketing: true })}
            >
              Accept All
            </button>
            <button
              type="button"
              className="btn-primary-zip"
              onClick={() => setManage(true)}
            >
              Manage Preferences
            </button>
          </div>
        </div>
      </div>

      {manage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-prefs-title"
          className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/50 p-4 sm:items-center"
        >
          <div className="w-full max-w-lg bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <h2 id="cookie-prefs-title" className="!text-xl !leading-7">
                Cookie Preferences
              </h2>
              <button
                type="button"
                aria-label="Close preferences"
                onClick={() => setManage(false)}
                className="p-1 text-heading"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-sm">
              Choose what we may store on your device. You can change your mind
              at any time from the Cookie Policy page. Your choice is saved on
              this device only.
            </p>

            <div className="mt-5 space-y-4">
              <Toggle
                label="Necessary"
                desc="Required for security, sign in and your quote basket. Always on."
                checked
                locked
                onChange={() => undefined}
              />
              <Toggle
                label="Functional"
                desc="Remembers choices such as your quote items and recently viewed products."
                checked={functional}
                onChange={setFunctional}
              />
              <Toggle
                label="Analytics"
                desc="Helps us count visits and improve popular pages. No names are collected."
                checked={analytics}
                onChange={setAnalytics}
              />
              <Toggle
                label="Marketing"
                desc="Used to measure adverts and show relevant offers on other sites."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary-zip solid"
                onClick={() => save({ functional, analytics, marketing })}
              >
                Save Preferences
              </button>
              <button
                type="button"
                className="btn-primary-zip"
                onClick={() => save({ functional: false, analytics: false, marketing: false })}
              >
                Reject Optional
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Toggle({
  label,
  desc,
  checked,
  locked = false,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  locked?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border border-hairline p-3">
      <div>
        <p className="font-bold text-heading">{label}</p>
        <p className="text-sm">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${label} cookies`}
        disabled={locked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 flex-none rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-hairline"
        } ${locked ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
