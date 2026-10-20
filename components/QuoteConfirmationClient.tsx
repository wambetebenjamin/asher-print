"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Download } from "lucide-react";
import QRCode from "qrcode";
import { formatKES, WHATSAPP_NUMBER } from "@/lib/site";

type QuoteData = {
  ref: string;
  name: string;
  company: string;
  turnaround: string;
  items: {
    name: string;
    material: string;
    size: string;
    qty: number;
    total: number;
  }[];
  total: number;
  status: string;
};

/** Animation 6: quote confirmation slip reveal with Framer Motion scale. */
export default function QuoteConfirmationClient({ refCode }: { refCode: string }) {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [error, setError] = useState("");
  const [qr, setQr] = useState("");
  const slipRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!refCode) {
      setError("No quote reference was provided. If you just submitted a quote, check your email, or message us on WhatsApp.");
      return;
    }
    fetch(`/api/quote/${encodeURIComponent(refCode)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Quote not found.");
        setQuote(data as QuoteData);
      })
      .catch(() => {
        setError(
          "We could not load that quote reference here. Your request may still have been received. Please keep your reference and message us on WhatsApp so we can confirm.",
        );
      });
    QRCode.toDataURL(`Asher Print quote ${refCode}`, { width: 180, margin: 1 })
      .then(setQr)
      .catch(() => setQr(""));
  }, [refCode]);

  async function downloadPdf() {
    if (!slipRef.current || !quote) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(slipRef.current, { scale: 2, backgroundColor: "#ffffff" });
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "mm", format: "a4" });
      const pageWidth = 190;
      const ratio = (canvas.height / canvas.width) * pageWidth;
      pdf.addImage(img, "PNG", 10, 10, pageWidth, Math.min(ratio, 270));
      pdf.save(`asher-print-quote-${quote.ref}.pdf`);
    } catch {
      // The slip stays on screen if PDF generation is unavailable.
    } finally {
      setDownloading(false);
    }
  }

  const discussLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Asher Print, I would like to discuss my quote ${refCode}.`,
  )}`;

  return (
    <section aria-label="Quote confirmation">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div ref={slipRef} className="border-2 border-heading bg-white p-6 sm:p-8">
            <p className="flex items-center gap-2 font-bold text-heading">
              <CheckCircle2 size={20} className="text-primary" aria-hidden="true" />
              Quote request received
            </p>
            <h1 className="mt-2 !text-3xl !leading-10">Thank You</h1>
            <p className="mt-3">
              Keep your quote reference safe. <strong className="text-heading">Staff will confirm the final price within 2 hours</strong>{" "}
              during working hours, by phone, WhatsApp or email.
            </p>

            <div className="mt-6 grid gap-6 border-y border-dashed border-hairline py-5 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm text-muted">Quote reference</p>
                <p className="text-2xl font-bold tracking-wide text-heading">
                  {refCode || "Not provided"}
                </p>
                {quote ? (
                  <>
                    <p className="mt-3 text-sm">
                      Name: <strong className="text-heading">{quote.name}</strong>
                      {quote.company ? `, ${quote.company}` : ""}
                    </p>
                    <p className="text-sm">
                      Estimated turnaround: <strong className="text-heading">{quote.turnaround}</strong>
                    </p>
                    <p className="text-sm">Status: {quote.status}</p>
                  </>
                ) : error ? (
                  <p role="alert" className="mt-3 text-sm text-heading">{error}</p>
                ) : (
                  <p className="mt-3 text-sm">Loading your items...</p>
                )}
              </div>
              {qr ? (
                <figure className="text-center">
                  <Image src={qr} alt={`QR code for quote reference ${refCode}`} width={120} height={120} unoptimized />
                  <figcaption className="mt-1 text-xs text-muted">Scan to reference this quote</figcaption>
                </figure>
              ) : null}
            </div>

            {quote ? (
              <>
                <h2 className="mt-6 !text-lg !leading-7">Your Items</h2>
                <ul className="mt-3 divide-y divide-hairline">
                  {quote.items.map((item, i) => (
                    <li key={`${item.name}-${i}`} className="flex flex-wrap items-baseline justify-between gap-2 py-2.5">
                      <span>
                        <strong className="text-heading">{item.name}</strong>
                        <span className="block text-sm">
                          {item.material}, {item.size}, qty {item.qty.toLocaleString("en-KE")}
                        </span>
                      </span>
                      <span className="font-bold text-heading">{formatKES(item.total)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-right">
                  Estimated total:{" "}
                  <span className="text-2xl font-bold text-heading">{formatKES(quote.total)}</span>
                </p>
              </>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={discussLink} target="_blank" rel="noopener noreferrer" className="btn-primary-zip solid">
              Discuss This Quote on WhatsApp
            </a>
            <button type="button" onClick={downloadPdf} disabled={!quote || downloading} className="btn-primary-zip">
              <Download size={16} aria-hidden="true" />
              {downloading ? "Preparing PDF..." : "Download Quote Slip (PDF)"}
            </button>
            <Link href="/products" className="btn-primary-zip">
              Continue Shopping
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">
            Need to send artwork for these items? Use the{" "}
            <Link href="/upload" className="font-bold text-primary underline">
              design upload portal
            </Link>{" "}
            and quote your reference {refCode}.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
