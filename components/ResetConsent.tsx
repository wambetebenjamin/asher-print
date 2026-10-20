"use client";

import { useState } from "react";
import { CONSENT_KEY } from "@/lib/site";

export default function ResetConsent() {
  const [note, setNote] = useState("");
  return (
    <p>
      <button
        type="button"
        className="btn-primary-zip"
        onClick={() => {
          try {
            localStorage.removeItem(CONSENT_KEY);
          } catch {
            // Nothing to clear.
          }
          setNote("Saved choice cleared. Reloading so you can choose again.");
          window.setTimeout(() => window.location.reload(), 900);
        }}
      >
        Reset My Cookie Choice
      </button>
      {note ? <span aria-live="polite" className="ml-3 text-sm font-bold text-heading">{note}</span> : null}
    </p>
  );
}
