"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CheckCircle2, FileUp, UploadCloud } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { WHATSAPP_DISPLAY, WHATSAPP_LINK } from "@/lib/site";

type Uploaded = { name: string; url: string; note: string };

/**
 * Design upload portal. Works signed in, or as a guest with an order or
 * quote reference. Animation 9: progress bar with CSS transition.
 */
export default function UploadPortal() {
  const { data: session } = useSession();
  const [orderRef, setOrderRef] = useState("");
  const [pct, setPct] = useState<number | null>(null);
  const [current, setCurrent] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<Uploaded[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function uploadFile(file: File) {
    setError("");
    setCurrent(file.name);
    setPct(0);
    const form = new FormData();
    form.append("file", file);
    form.append("orderRef", orderRef.trim() || session?.user?.email || "guest");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload/artwork");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) setPct(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText) as {
          url?: string;
          error?: string;
          note?: string;
          stored?: string;
        };
        if (xhr.status >= 200 && xhr.status < 300 && data.url) {
          setPct(100);
          setDone((prev) => [
            { name: file.name, url: data.url || "", note: data.note || `Stored: ${data.stored || "ok"}` },
            ...prev,
          ]);
        } else {
          setPct(null);
          setError(data.error || "Upload failed. Please try again.");
        }
      } catch {
        setPct(null);
        setError("Upload failed. Please try again, or send the file on WhatsApp.");
      }
    };
    xhr.onerror = () => {
      setPct(null);
      setError("Upload failed. Check your connection and try again.");
    };
    xhr.send(form);
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    for (const file of Array.from(files)) uploadFile(file);
  }

  return (
    <section aria-label="Design upload portal">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          icon={<UploadCloud size={32} aria-hidden="true" />}
          title="Upload Your Artwork"
          desc="Send print ready files for an existing quote or order. Sign in so we can match files to your account, or continue as a guest with your quote reference, for example AP-2026-1234."
        />

        {!session?.user ? (
          <p className="mb-6 border border-hairline bg-section p-4">
            You are uploading as a guest.{" "}
            <Link href="/auth/signin" className="font-bold text-primary underline">
              Sign in
            </Link>{" "}
            for a faster checkout next time, or simply enter your quote
            reference below so we can match your files.
          </p>
        ) : (
          <p className="mb-6 border border-hairline bg-section p-4">
            Signed in as <strong className="text-heading">{session.user.name || session.user.email}</strong>.
            Files will be matched to your account. A quote reference still helps us work faster.
          </p>
        )}

        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <label htmlFor="order-ref" className="mb-1.5 block font-bold text-heading">
              Quote or order reference
            </label>
            <input
              id="order-ref"
              value={orderRef}
              onChange={(e) => setOrderRef(e.target.value)}
              placeholder="Example: AP-2026-1234"
              className="input-zip"
            />

            <div
              role="button"
              tabIndex={0}
              aria-label="Drop artwork files here, or press Enter to browse"
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
              className={`mt-5 flex cursor-pointer flex-col items-center justify-center border-2 border-dashed p-10 text-center transition-colors ${
                dragging ? "border-primary bg-section" : "border-hairline bg-white"
              }`}
            >
              <FileUp size={36} className="text-primary" aria-hidden="true" />
              <p className="mt-3 font-bold text-heading">Drop files here, or click to browse</p>
              <p className="mt-1 text-sm">You can send several files, one after another.</p>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept=".pdf,.ai,.eps,.svg,.png,.jpg,.jpeg,.tif,.tiff,.psd,.cdr,.zip"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {pct !== null ? (
              <div className="mt-4" aria-live="polite">
                <div className="h-3 w-full bg-hairline">
                  <div className="upload-progress-bar h-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1 text-sm">
                  Uploading {current}: {pct}%
                </p>
              </div>
            ) : null}

            {error ? (
              <p role="alert" className="mt-4 border border-primary bg-section p-3 text-sm font-bold text-heading">
                {error}
              </p>
            ) : null}

            {done.length > 0 ? (
              <div className="mt-6">
                <h2 className="!text-lg !leading-7">Received Files</h2>
                <ul className="mt-3 space-y-3">
                  {done.map((f) => (
                    <li key={`${f.name}-${f.url}`} className="border border-hairline bg-white p-3">
                      <p className="flex items-center gap-2 font-bold text-heading">
                        <CheckCircle2 size={16} className="text-primary" aria-hidden="true" />
                        {f.name}
                      </p>
                      <p className="mt-1 break-all text-xs text-muted">{f.url}</p>
                      <p className="text-xs">{f.note}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">
                  Tell us the files are in:{" "}
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline">
                    WhatsApp {WHATSAPP_DISPLAY}
                  </a>{" "}
                  with your reference, and we will confirm the design review.
                </p>
              </div>
            ) : null}
          </div>

          <aside className="border border-hairline bg-section p-5 md:col-span-2" aria-label="Artwork guidelines">
            <h2 className="!text-lg !leading-7">File Guidelines</h2>
            <h3 className="mt-4 !text-sm !leading-5">Accepted formats</h3>
            <p className="text-sm">PDF, AI, EPS, SVG, PNG, JPG, TIFF, PSD, CDR, or a ZIP containing your artwork and fonts.</p>
            <h3 className="mt-4 !text-sm !leading-5">File size guidance</h3>
            <p className="text-sm">
              Up to 50MB per file here. For larger files, share a Google Drive
              or WeTransfer link on WhatsApp with your reference.
            </p>
            <h3 className="mt-4 !text-sm !leading-5">For the sharpest print</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              <li>Add 3mm bleed on all sides for trimmed items.</li>
              <li>Convert text to outlines, or include the font files.</li>
              <li>Use CMYK colours where possible. We convert RGB carefully.</li>
              <li>Keep images at 300dpi at the final print size.</li>
              <li>For large banners, artwork at 100dpi at full size is fine.</li>
            </ul>
            <p className="mt-4 text-sm">
              Not sure your file is ready? Send it anyway. The free design
              review catches problems before printing, and we will explain any
              fix in plain language.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
