import { NextResponse } from "next/server";
import { getProduct, startingPrice } from "@/lib/products";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const product = getProduct(slug);
  if (!product) {
    return NextResponse.json(
      { error: "This product is not in our catalogue." },
      { status: 404 },
    );
  }
  return NextResponse.json({ ...product, startingPrice: startingPrice(product) });
}
