import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
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
  const captcha = await verifyRecaptcha(
    parsed.data.recaptchaToken || "",
    parsed.data.recaptchaV2Token || "",
  );
  if (!captcha.success) {
    return NextResponse.json(
      { error: captcha.error || "CAPTCHA verification failed.", needsV2: captcha.needsV2 },
      { status: 400 },
    );
  }
  const mailed = await sendMail({
    subject: `Website message from ${parsed.data.name}`,
    replyTo: parsed.data.email,
    text: [
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      `Phone: ${parsed.data.phone || "Not provided"}`,
      "",
      parsed.data.message,
    ].join("\n"),
  });
  return NextResponse.json({
    ok: true,
    mailed,
    message: "Thank you. Your message has been received and we will reply shortly.",
  });
}
