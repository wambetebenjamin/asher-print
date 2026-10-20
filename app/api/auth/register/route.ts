import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { signUpSchema } from "@/lib/schemas";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { getUser, saveUser } from "@/lib/store-kv";
import { hashPassword } from "@/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = signUpSchema.safeParse(body);
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
  const captcha = await verifyRecaptcha(parsed.data.recaptchaToken || "");
  if (!captcha.success) {
    return NextResponse.json(
      { error: captcha.error || "CAPTCHA verification failed.", needsV2: captcha.needsV2 },
      { status: 400 },
    );
  }
  const existing = await getUser(parsed.data.email);
  if (existing) {
    return NextResponse.json(
      { error: "An account with that email already exists. Please sign in instead." },
      { status: 409 },
    );
  }
  await saveUser({
    id: randomUUID(),
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    phone: parsed.data.phone,
    passwordHash: hashPassword(parsed.data.password),
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json({
    ok: true,
    message: "Account created. You can now sign in.",
  });
}
