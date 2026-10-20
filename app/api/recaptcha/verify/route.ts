import { NextResponse } from "next/server";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    token?: string;
    v2Token?: string;
  };
  const result = await verifyRecaptcha(body.token || "", body.v2Token || "");
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
