import { NextResponse } from "next/server";
import { CATEGORIES, getByCategory, startingPrice } from "@/lib/products";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const products = getByCategory(category).map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    categoryName: p.categoryName,
    image: p.image,
    blurb: p.blurb,
    unitPrice: p.unitPrice,
    unitLabel: p.unitLabel,
    minQty: p.minQty,
    startingPrice: startingPrice(p),
    turnaround: p.turnaround,
  }));
  return NextResponse.json({ categories: CATEGORIES, products });
}
