"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Step 13 fallback loading screen (absent from the zip).
 * SVG printer with a sheet sliding out, percentage counter, 3 second max,
 * Skip after 1 second, role status, plain percentage under reduced motion.
 */
export default function LoadingScreen() {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [reduced, setReduced] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem("asher_print_loaded") === "1") return;
    setVisible(true);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);
    const duration = 2200;
    const start = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const value = Math.min(100, Math.round((elapsed / duration) * 100));
      setPercent(value);
      if (value >= 100 && !doneRef.current) {
        doneRef.current = true;
        window.clearInterval(tick);
        window.setTimeout(finish, 250);
      }
    }, 50);
    const skipTimer = window.setTimeout(() => setShowSkip(true), 1000);
    const hardStop = window.setTimeout(finish, 3000);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(skipTimer);
      window.clearTimeout(hardStop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    sessionStorage.setItem("asher_print_loaded", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label={`Loading Asher Print, ${percent} percent`}
      className="fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-white"
    >
      {reduced ? (
        <p className="text-lg text-heading">Loading: {percent}%</p>
      ) : (
        <>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
            <rect x="30" y="18" width="60" height="18" rx="3" fill="#e7e7e7" stroke="#323232" strokeWidth="2" />
            <rect x="16" y="42" width="88" height="34" rx="6" fill="#323232" />
            <rect x="16" y="42" width="88" height="10" rx="5" fill="#ee3b24" />
            <circle cx="92" cy="62" r="3.5" fill="#25d366" />
            <g className="printer-sheet">
              <rect x="32" y="72" width="56" height="34" rx="2" fill="#ffffff" stroke="#959595" strokeWidth="1.5" />
              <line x1="40" y1="82" x2="80" y2="82" stroke="#ee3b24" strokeWidth="3" />
              <line x1="40" y1="90" x2="72" y2="90" stroke="#6a6a6a" strokeWidth="2" />
              <line x1="40" y1="97" x2="76" y2="97" stroke="#6a6a6a" strokeWidth="2" />
            </g>
          </svg>
          <p className="mt-4 font-display text-xl uppercase tracking-wide text-heading">
            Asher Print
          </p>
          <p className="mt-1 text-sm text-body">Print it. Brand it. Own it.</p>
          <p aria-live="polite" className="mt-4 text-2xl font-bold text-heading">
            {percent}%
          </p>
          <div className="mt-3 h-1.5 w-52 overflow-hidden rounded-full bg-hairline">
            <div
              className="h-full bg-primary transition-[width] duration-100 ease-linear"
              style={{ width: `${percent}%` }}
            />
          </div>
        </>
      )}
      {showSkip ? (
        <button
          type="button"
          onClick={finish}
          className="btn-primary-zip mt-6"
        >
          Skip
        </button>
      ) : null}
    </div>
  );
}
