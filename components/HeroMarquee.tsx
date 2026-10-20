import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/products";

/** Animation 5: hero product images carousel, CSS scroll (marquee). */
export default function HeroMarquee() {
  const doubled = [...CATEGORIES, ...CATEGORIES];
  return (
    <div className="overflow-hidden border-y border-hairline bg-section py-4" aria-label="Product categories carousel">
      <div className="hero-marquee-track gap-4 px-2">
        {doubled.map((cat, i) => (
          <Link
            key={`${cat.slug}-${i}`}
            href={`/products?category=${cat.slug}`}
            className="group relative block w-56 flex-none overflow-hidden"
            tabIndex={i < CATEGORIES.length ? 0 : -1}
            aria-hidden={i >= CATEGORIES.length}
          >
            <Image
              src={cat.image}
              alt={i < CATEGORIES.length ? `${cat.name} by Asher Print` : ""}
              width={448}
              height={300}
              className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="224px"
            />
            <span className="absolute inset-x-0 bottom-0 bg-heading/75 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
