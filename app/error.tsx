"use client";

import Link from "next/link";
import { Printer } from "lucide-react";
import { WHATSAPP_DISPLAY, WHATSAPP_LINK } from "@/lib/site";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section aria-label="Something went wrong">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <span className="service-icon-zip" aria-hidden="true">
          <Printer size={32} aria-hidden="true" />
        </span>
        <h1 className="mt-12">Something Jammed</h1>
        <p className="mt-3 text-lg">
          Even the best printers jam now and then. Nothing you did caused this.
          Try again, and if it keeps happening, talk to a person instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => reset()} className="btn-primary-zip solid">
            Try Again
          </button>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary-zip">
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <Link href="/products" className="btn-primary-zip">
            Browse Products
          </Link>
        </div>
        <p className="mt-6 text-sm text-muted">
          You can also call or WhatsApp {WHATSAPP_DISPLAY} and we will take your
          order directly.
        </p>
      </div>
    </section>
  );
}
