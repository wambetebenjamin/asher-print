import type { Metadata } from "next";
import { Boxes } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProductsExplorer from "@/components/ProductsExplorer";

export const metadata: Metadata = {
  title: "Products and Starting Prices",
  description:
    "Full Asher Print catalogue: business cards, flyers, banners, signage, printed t-shirts, branded mugs, packaging, labels, stickers and event materials with Nairobi starting prices.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  return (
    <section aria-label="Product catalogue">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          icon={<Boxes size={32} aria-hidden="true" />}
          title="Product Catalogue"
          desc="Filter by category, compare starting prices, then open a product to choose materials and quantity. Your final price is confirmed by staff within 2 hours of submitting a quote."
        />
        <ProductsExplorer initialCategory={params.category || "all"} />
      </div>
    </section>
  );
}
