"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, PRODUCTS, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

/**
 * Animation 7: category filter tab switch with Framer Motion layout.
 * Used on /products with ?category= support through initialCategory.
 */
export default function ProductsExplorer({
  initialCategory = "all",
  limit,
}: {
  initialCategory?: string;
  limit?: number;
}) {
  const valid = ["all", ...CATEGORIES.map((c) => c.slug)];
  const [active, setActive] = useState(
    valid.includes(initialCategory) ? initialCategory : "all",
  );

  const filtered: Product[] = useMemo(() => {
    const list = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);
    return limit ? list.slice(0, limit) : list;
  }, [active, limit]);

  return (
    <div>
      <div role="tablist" aria-label="Filter products by category" className="flex flex-wrap gap-2">
        {[{ slug: "all", name: "All Products" }, ...CATEGORIES].map((cat) => {
          const selected = active === cat.slug;
          return (
            <button
              key={cat.slug}
              role="tab"
              aria-selected={selected}
              type="button"
              onClick={() => setActive(cat.slug)}
              className={`btn-primary-zip !px-4 !py-2 !text-xs ${selected ? "solid" : ""}`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center">No products in this category yet. Ask us on WhatsApp and we will help.</p>
      ) : null}
    </div>
  );
}
