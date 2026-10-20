"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CATEGORIES, PORTFOLIO } from "@/lib/products";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

/** Animation 3: portfolio masonry entrance stagger with Framer Motion. */
export default function PortfolioGrid({ limit }: { limit?: number }) {
  const [active, setActive] = useState("all");
  const filtered = useMemo(() => {
    const list = active === "all" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === active);
    return limit ? list.slice(0, limit) : list;
  }, [active, limit]);

  return (
    <div>
      <div role="tablist" aria-label="Filter portfolio by product type" className="flex flex-wrap gap-2">
        {[{ slug: "all", name: "All Work" }, ...CATEGORIES].map((cat) => (
          <button
            key={cat.slug}
            role="tab"
            aria-selected={active === cat.slug}
            type="button"
            onClick={() => setActive(cat.slug)}
            className={`btn-primary-zip !px-4 !py-2 !text-xs ${active === cat.slug ? "solid" : ""}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3"
      >
        {filtered.map((work) => (
          <motion.figure
            key={work.id}
            variants={item}
            className="mb-5 break-inside-avoid border border-hairline bg-white"
          >
            <Image
              src={work.image}
              alt={`${work.type}: ${work.caption}`}
              width={720}
              height={work.tall ? 900 : 560}
              className={`w-full object-cover ${work.tall ? "h-80" : "h-56"}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <figcaption className="p-4">
              <span className="text-xs font-bold uppercase tracking-wide text-primary">
                {work.type}
              </span>
              <span className="mt-1 block text-sm">{work.caption}</span>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </div>
  );
}
