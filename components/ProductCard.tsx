"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { Product } from "@/lib/products";
import { startingPrice } from "@/lib/products";
import { formatKES } from "@/lib/site";

/** Animation 2: product card hover lift with Framer Motion. */
export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      whileHover={{ y: -8, boxShadow: "0 18px 36px rgba(50,50,50,0.16)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex h-full flex-col border border-hairline bg-white"
    >
      <Link href={`/products/${product.slug}`} className="block overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.name} printed by Asher Print in Nairobi`}
          width={640}
          height={440}
          className="h-52 w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">
          {product.categoryName}
        </p>
        <h3 className="mt-1 !text-lg !leading-6">
          <Link href={`/products/${product.slug}`} className="text-heading hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm">{product.blurb}</p>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <Clock size={13} aria-hidden="true" /> Ready in {product.turnaround}
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-hairline pt-4">
          <p>
            <span className="block text-xs text-muted">Starting price</span>
            <span className="text-lg font-bold text-heading">
              {formatKES(startingPrice(product))}
            </span>
            <span className="block text-xs text-muted">
              {formatKES(product.unitPrice)} {product.unitLabel}, min {product.minQty}
            </span>
          </p>
          <Link href={`/products/${product.slug}`} className="btn-primary-zip solid !px-5">
            Get Quote
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
