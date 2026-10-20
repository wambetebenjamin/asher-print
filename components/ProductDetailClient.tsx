"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { CheckCircle2, FileUp, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { quotePrice } from "@/lib/products";
import { formatKES } from "@/lib/site";
import { useQuoteStore } from "@/lib/quote-store";

const BulkChart = dynamic(() => import("@/components/BulkChart"), { ssr: false });

/**
 * Product detail purchase panel.
 * Animation 4: GSAP tweens the displayed total whenever quantity changes.
 * Animation 9: upload progress bar uses a CSS width transition.
 */
export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useQuoteStore((s) => s.addItem);
  const [materialId, setMaterialId] = useState(product.materials[0].id);
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const [qty, setQty] = useState(product.minQty);
  const [notes, setNotes] = useState("");
  const [artworkUrl, setArtworkUrl] = useState("");
  const [artworkName, setArtworkName] = useState("");
  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const [uploadNote, setUploadNote] = useState("");
  const [added, setAdded] = useState(false);
  const priceRef = useRef<HTMLSpanElement>(null);
  const displayedRef = useRef(0);

  const material = product.materials.find((m) => m.id === materialId) ?? product.materials[0];
  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];
  const pricing = useMemo(
    () => quotePrice(product, materialId, sizeId, qty),
    [product, materialId, sizeId, qty],
  );

  useEffect(() => {
    const el = priceRef.current;
    if (!el) return;
    const state = { value: displayedRef.current };
    const tween = gsap.to(state, {
      value: pricing.total,
      duration: 0.55,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = formatKES(state.value);
      },
      onComplete: () => {
        displayedRef.current = pricing.total;
      },
    });
    return () => {
      tween.kill();
    };
  }, [pricing.total]);

  function upload(file: File) {
    setUploadPct(0);
    setUploadNote("");
    setArtworkName(file.name);
    const form = new FormData();
    form.append("file", file);
    form.append("orderRef", `product-${product.slug}`);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload/artwork");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setUploadPct(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText) as {
          url?: string;
          error?: string;
          note?: string;
        };
        if (xhr.status >= 200 && xhr.status < 300 && data.url) {
          setArtworkUrl(data.url);
          setUploadPct(100);
          setUploadNote(data.note || "Artwork uploaded and attached to this item.");
        } else {
          setUploadPct(null);
          setUploadNote(data.error || "Upload failed. You can also send artwork on WhatsApp.");
        }
      } catch {
        setUploadPct(null);
        setUploadNote("Upload failed. You can also send artwork on WhatsApp.");
      }
    };
    xhr.onerror = () => {
      setUploadPct(null);
      setUploadNote("Upload failed. Check your connection and try again.");
    };
    xhr.send(form);
  }

  function addToQuote() {
    addItem({
      slug: product.slug,
      name: product.name,
      material: material.label,
      size: size.label,
      qty,
      unitPrice: Math.round(pricing.unit * 100) / 100,
      total: Math.round(pricing.total),
      artworkUrl,
      notes,
    });
    setAdded(true);
    window.setTimeout(() => router.push("/quote"), 700);
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="material" className="mb-1.5 block font-bold text-heading">
          Material and finish
        </label>
        <select
          id="material"
          value={materialId}
          onChange={(e) => setMaterialId(e.target.value)}
          className="input-zip"
        >
          {product.materials.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
              {m.multiplier !== 1 ? ` (${m.multiplier > 1 ? "+" : ""}${Math.round((m.multiplier - 1) * 100)}%)` : ""}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="size" className="mb-1.5 block font-bold text-heading">
          Size
        </label>
        <select
          id="size"
          value={sizeId}
          onChange={(e) => setSizeId(e.target.value)}
          className="input-zip"
        >
          {product.sizes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
              {s.multiplier !== 1 ? ` (${s.multiplier > 1 ? "+" : ""}${Math.round((s.multiplier - 1) * 100)}%)` : ""}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="qty" className="mb-1.5 block font-bold text-heading">
          Quantity (minimum {product.minQty})
        </label>
        <div className="flex items-stretch">
          <button
            type="button"
            aria-label="Reduce quantity"
            className="border border-hairline bg-section px-3 text-heading"
            onClick={() => setQty((q) => Math.max(product.minQty, q - product.step))}
          >
            <Minus size={16} aria-hidden="true" />
          </button>
          <input
            id="qty"
            type="number"
            min={product.minQty}
            step={product.step}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || product.minQty))}
            onBlur={() => setQty((q) => Math.max(product.minQty, q))}
            className="input-zip !border-x-0 text-center"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            className="border border-hairline bg-section px-3 text-heading"
            onClick={() => setQty((q) => q + product.step)}
          >
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {[1, 2, 5, 10].map((mult) => (
            <button
              key={mult}
              type="button"
              onClick={() => setQty(product.minQty * mult)}
              className={`border px-3 py-1 text-xs font-bold ${
                qty === product.minQty * mult
                  ? "border-primary bg-primary text-white"
                  : "border-hairline text-heading"
              }`}
            >
              {(product.minQty * mult).toLocaleString("en-KE")}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="artwork" className="mb-1.5 flex items-center gap-2 font-bold text-heading">
          <FileUp size={17} className="text-primary" aria-hidden="true" />
          Upload your artwork (optional)
        </label>
        <input
          id="artwork"
          type="file"
          accept=".pdf,.ai,.eps,.svg,.png,.jpg,.jpeg,.tif,.tiff,.psd,.cdr,.zip"
          className="input-zip"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
          }}
        />
        <p className="mt-1.5 text-xs text-muted">
          Best formats: PDF, AI or EPS with fonts outlined. PNG and JPG at 300dpi also work.
        </p>
        {uploadPct !== null ? (
          <div className="mt-2" aria-live="polite">
            <div className="h-2.5 w-full bg-hairline">
              <div
                className="upload-progress-bar h-full bg-primary"
                style={{ width: `${uploadPct}%` }}
              />
            </div>
            <p className="mt-1 text-xs">
              {artworkName}: {uploadPct}%
            </p>
          </div>
        ) : null}
        {uploadNote ? <p className="mt-1.5 text-xs text-heading">{uploadNote}</p> : null}
        {artworkUrl ? (
          <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-heading">
            <CheckCircle2 size={14} className="text-primary" aria-hidden="true" />
            Artwork attached to this item.
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="notes" className="mb-1.5 block font-bold text-heading">
          Design notes
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Example: print both sides, logo on the left chest, sizes 20 small and 30 medium."
          className="input-zip"
        />
      </div>

      <div className="border border-hairline bg-section p-5" aria-live="polite">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs text-muted">
              {formatKES(pricing.unit)} {product.unitLabel}
              {pricing.discount > 0 ? `, bulk saving ${Math.round(pricing.discount * 100)}% applied` : ""}
            </p>
            <p className="text-sm text-body">Estimated total for {qty.toLocaleString("en-KE")}</p>
            <span ref={priceRef} className="text-3xl font-bold text-heading">
              {formatKES(pricing.total)}
            </span>
          </div>
          <button type="button" onClick={addToQuote} className="btn-primary-zip solid" disabled={added}>
            <ShoppingBag size={16} aria-hidden="true" />
            {added ? "Added" : "Add to Quote"}
          </button>
        </div>
        <p className="mt-3 text-xs text-muted">
          This is an online estimate. Staff confirm the final price within 2
          hours after you submit the quote, before any payment is taken.
        </p>
      </div>

      <BulkChart
        product={product}
        materialMultiplier={material.multiplier}
        sizeMultiplier={size.multiplier}
      />
    </div>
  );
}
