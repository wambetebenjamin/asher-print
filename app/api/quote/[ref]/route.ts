import { NextResponse } from "next/server";
import { getQuote } from "@/lib/store-kv";
import { TURNAROUND_LABELS } from "@/lib/schemas";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ ref: string }> },
) {
  const { ref } = await context.params;
  const quote = await getQuote(ref.toUpperCase());
  if (!quote) {
    return NextResponse.json(
      { error: "We could not find that quote reference." },
      { status: 404 },
    );
  }
  return NextResponse.json({
    ref: quote.ref,
    createdAt: quote.createdAt,
    name: quote.name,
    company: quote.company,
    turnaround: TURNAROUND_LABELS[quote.turnaround] || quote.turnaround,
    items: quote.items,
    total: quote.total,
    status: quote.status,
  });
}
