import { NextResponse } from "next/server";
import { quoteSubmitSchema, TURNAROUND_LABELS } from "@/lib/schemas";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { newQuoteRef, saveQuote } from "@/lib/store-kv";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = quoteSubmitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 },
    );
  }
  const data = parsed.data;
  const captcha = await verifyRecaptcha(
    data.recaptchaToken || "",
    data.recaptchaV2Token || "",
  );
  if (!captcha.success) {
    return NextResponse.json(
      { error: captcha.error || "CAPTCHA verification failed.", needsV2: captcha.needsV2 },
      { status: 400 },
    );
  }

  const ref = newQuoteRef();
  const total = data.items.reduce((sum, item) => sum + item.total, 0);
  const quote = {
    ref,
    createdAt: new Date().toISOString(),
    name: data.name,
    company: data.company || "",
    phone: data.phone,
    email: data.email,
    deliveryAddress: data.deliveryAddress,
    turnaround: data.turnaround,
    items: data.items,
    total,
    status: "Received. Staff will confirm the final price within 2 hours.",
  };
  await saveQuote(quote);

  const lines = data.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name}, ${item.material}, ${item.size}, qty ${item.qty}, item total KES ${Math.round(item.total).toLocaleString("en-KE")}${item.artworkUrl ? `, artwork: ${item.artworkUrl}` : ""}${item.notes ? `, notes: ${item.notes}` : ""}`,
    )
    .join("\n");
  const mailed = await sendMail({
    subject: `New quote request ${ref} from ${data.name}`,
    replyTo: data.email,
    text: [
      `Quote reference: ${ref}`,
      `Name: ${data.name}`,
      `Company: ${data.company || "Not provided"}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Delivery address: ${data.deliveryAddress}`,
      `Preferred turnaround: ${TURNAROUND_LABELS[data.turnaround] || data.turnaround}`,
      "",
      "Items:",
      lines,
      "",
      `Estimated total: KES ${Math.round(total).toLocaleString("en-KE")}`,
      "Staff to confirm the final price within 2 hours.",
    ].join("\n"),
  });

  return NextResponse.json({
    ref,
    total,
    turnaround: TURNAROUND_LABELS[data.turnaround] || data.turnaround,
    mailed,
    message: "Quote request received. Staff will confirm the final price within 2 hours.",
  });
}
