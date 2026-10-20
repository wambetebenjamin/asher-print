"use client";

import { useEffect, useRef } from "react";
import { renderV2Challenge, getV2Response } from "@/lib/recaptcha-client";

/**
 * Step 12 fallback: shown when the server reports a reCAPTCHA v3 score
 * below 0.5. Renders the v2 challenge and reports its token upward.
 */
export default function RecaptchaV2({
  show,
  onToken,
}: {
  show: boolean;
  onToken: (token: string) => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<number | null>(null);

  useEffect(() => {
    if (!show || !boxRef.current) return;
    let cancelled = false;
    renderV2Challenge(boxRef.current).then((id) => {
      if (!cancelled) widgetRef.current = id;
    });
    const poll = window.setInterval(() => {
      const token = getV2Response(widgetRef.current);
      if (token) {
        onToken(token);
        window.clearInterval(poll);
      }
    }, 800);
    return () => {
      cancelled = true;
      window.clearInterval(poll);
    };
  }, [show, onToken]);

  if (!show) return null;
  return (
    <div className="border border-hairline bg-section p-4">
      <p className="mb-3 text-sm text-heading">
        One extra check: please confirm you are human, then submit again.
      </p>
      <div ref={boxRef} />
    </div>
  );
}
