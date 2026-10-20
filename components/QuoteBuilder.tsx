"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ClipboardList, Trash2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import RecaptchaV2 from "@/components/RecaptchaV2";
import { useQuoteStore } from "@/lib/quote-store";
import { formatKES } from "@/lib/site";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { zodResolver } from "@/lib/zod-resolver";
import { quoteSubmitSchema, TURNAROUND_LABELS, type QuoteSubmitInput } from "@/lib/schemas";

type FormShape = Omit<QuoteSubmitInput, "items" | "recaptchaV2Token">;

export default function QuoteBuilder() {
  const router = useRouter();
  const { data: session } = useSession();
  const items = useQuoteStore((s) => s.items);
  const removeItem = useQuoteStore((s) => s.removeItem);
  const updateQty = useQuoteStore((s) => s.updateQty);
  const clear = useQuoteStore((s) => s.clear);
  const [mounted, setMounted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [needsV2, setNeedsV2] = useState(false);
  const [v2Token, setV2Token] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setMounted(true), []);
  const onV2 = useCallback((t: string) => setV2Token(t), []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormShape>({
    resolver: zodResolver(
      quoteSubmitSchema.omit({ items: true, recaptchaV2Token: true }) as never,
    ),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      deliveryAddress: "",
      turnaround: "standard",
      recaptchaToken: "",
    },
  });

  useEffect(() => {
    if (session?.user) {
      if (session.user.name) setValue("name", session.user.name);
      if (session.user.email) setValue("email", session.user.email);
    }
  }, [session, setValue]);

  const total = items.reduce((sum, i) => sum + i.total, 0);

  async function onSubmit(values: FormShape) {
    setServerError("");
    if (items.length === 0) {
      setServerError("Your quote is empty. Add a product first, then come back here.");
      return;
    }
    setSubmitting(true);
    try {
      const token = await getRecaptchaToken("quote_submit");
      const res = await fetch("/api/quote/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          recaptchaToken: token,
          recaptchaV2Token: v2Token,
          items: items.map((i) => ({
            slug: i.slug,
            name: i.name,
            material: i.material,
            size: i.size,
            qty: i.qty,
            unitPrice: i.unitPrice,
            total: i.total,
            artworkUrl: i.artworkUrl,
            notes: i.notes,
          })),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ref?: string;
        error?: string;
        needsV2?: boolean;
      };
      if (!res.ok) {
        if (data.needsV2) setNeedsV2(true);
        setServerError(data.error || "We could not send your quote. Please try again.");
        return;
      }
      const ref = data.ref || "";
      clear();
      router.push(`/quote-confirmation?ref=${encodeURIComponent(ref)}`);
    } catch {
      setServerError("We could not send your quote. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section aria-label="Quote builder">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          icon={<ClipboardList size={32} aria-hidden="true" />}
          title="Build Your Quote"
          desc="Everything you added from product pages is listed here. Adjust quantities, add your details, and send. Staff confirm the final price within 2 hours during working hours."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="!text-xl !leading-7">Your Items</h2>
            {!mounted ? (
              <p className="mt-4">Loading your quote items...</p>
            ) : items.length === 0 ? (
              <div className="mt-4 border border-hairline bg-section p-6 text-center">
                <p>Your quote is empty for now.</p>
                <p className="mt-2 text-sm">
                  Browse the catalogue, choose materials and quantity on any
                  product, then use Add to Quote.
                </p>
                <p className="mt-5">
                  <Link href="/products" className="btn-primary-zip solid">
                    Shop Products
                  </Link>
                </p>
              </div>
            ) : (
              <ul className="mt-4 space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="border border-hairline bg-white p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="!text-base !leading-6">{item.name}</h3>
                        <p className="text-sm">
                          {item.material}, {item.size}
                        </p>
                        {item.notes ? <p className="text-sm text-muted">Notes: {item.notes}</p> : null}
                        {item.artworkUrl ? (
                          <p className="text-sm text-muted">Artwork: attached</p>
                        ) : (
                          <p className="text-sm text-muted">
                            Artwork: not attached yet. You can add it on the{" "}
                            <Link href="/upload" className="font-bold text-primary underline">
                              upload page
                            </Link>
                            .
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name} from quote`}
                        className="flex items-center gap-1 text-sm font-bold text-primary"
                      >
                        <Trash2 size={15} aria-hidden="true" /> Remove
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-3">
                      <label className="flex items-center gap-2 text-sm font-bold text-heading">
                        Qty
                        <input
                          type="number"
                          min={1}
                          value={item.qty}
                          onChange={(e) => updateQty(item.id, Number(e.target.value))}
                          className="input-zip !w-28 !py-1.5 text-center"
                          aria-label={`Quantity for ${item.name}`}
                        />
                      </label>
                      <p className="text-sm">
                        {formatKES(item.unitPrice)} each:{" "}
                        <span className="text-base font-bold text-heading">{formatKES(item.total)}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {mounted && items.length > 0 ? (
              <p className="mt-5 border border-hairline bg-section p-4 text-right">
                Estimated total:{" "}
                <span className="text-2xl font-bold text-heading">{formatKES(total)}</span>
                <span className="block text-xs text-muted">
                  Final price confirmed by staff within 2 hours.
                </span>
              </p>
            ) : null}
          </div>

          <div className="lg:col-span-2">
            <h2 className="!text-xl !leading-7">Your Details</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 space-y-4 border border-hairline bg-white p-5">
              <Field label="Full name" error={errors.name?.message}>
                <input id="q-name" className="input-zip" autoComplete="name" {...register("name")} />
              </Field>
              <Field label="Company (optional)" error={errors.company?.message}>
                <input id="q-company" className="input-zip" autoComplete="organization" {...register("company")} />
              </Field>
              <Field label="Phone (WhatsApp preferred)" error={errors.phone?.message}>
                <input id="q-phone" className="input-zip" autoComplete="tel" placeholder="+254..." {...register("phone")} />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input id="q-email" type="email" className="input-zip" autoComplete="email" {...register("email")} />
              </Field>
              <Field label="Delivery address in Nairobi" error={errors.deliveryAddress?.message}>
                <textarea id="q-address" rows={2} className="input-zip" placeholder="Estate, street, building and a landmark" {...register("deliveryAddress")} />
              </Field>

              <fieldset>
                <legend className="mb-2 font-bold text-heading">Preferred turnaround</legend>
                <div className="space-y-2">
                  {Object.entries(TURNAROUND_LABELS).map(([value, label]) => (
                    <label key={value} className="flex cursor-pointer items-center gap-2.5 border border-hairline px-3 py-2.5">
                      <input type="radio" value={value} {...register("turnaround")} className="h-4 w-4 accent-[#ee3b24]" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                {errors.turnaround?.message ? (
                  <p className="mt-1 text-sm text-primary">{errors.turnaround.message}</p>
                ) : null}
              </fieldset>

              <RecaptchaV2 show={needsV2} onToken={onV2} />

              {serverError ? (
                <p role="alert" className="border border-primary bg-section p-3 text-sm font-bold text-heading">
                  {serverError}
                </p>
              ) : null}

              <button type="submit" disabled={submitting} className="btn-primary-zip solid w-full">
                {submitting ? "Sending..." : "Send Quote Request"}
              </button>
              <p className="text-xs text-muted">
                This form is protected by reCAPTCHA. By sending, you agree to
                our Privacy Policy. No payment is taken at this stage.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const id = (children as React.ReactElement<{ id?: string }>).props.id;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-bold text-heading">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-sm text-primary">{error}</p> : null}
    </div>
  );
}
