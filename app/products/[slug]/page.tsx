import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight, Clock } from "lucide-react";
import ProductDetailClient from "@/components/ProductDetailClient";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { Boxes } from "lucide-react";
import { PRODUCTS, getProduct, startingPrice } from "@/lib/products";
import { formatKES } from "@/lib/site";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} Printing in Nairobi`,
    description: `${product.blurb} From ${formatKES(startingPrice(product))} for ${product.minQty}. ${product.description.slice(0, 120)}`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | Asher Print`,
      description: product.blurb,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  ).slice(0, 3);

  return (
    <>
      <section className="!pb-10" aria-label={product.name}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1 text-sm text-muted">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/products" className="hover:text-primary">Products</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href={`/products?category=${product.category}`} className="hover:text-primary">
              {product.categoryName}
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page" className="text-heading">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Image
                src={product.image}
                alt={`${product.name} printed by Asher Print in Nairobi`}
                width={960}
                height={720}
                priority
                className="h-auto w-full border border-hairline object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="mt-5 border border-hairline bg-section p-5">
                <h2 className="!text-lg !leading-7">About This Product</h2>
                <p className="mt-2">{product.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Clock size={15} className="text-primary" aria-hidden="true" />
                    Typical turnaround: {product.turnaround}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-primary" aria-hidden="true" />
                    Free artwork and design review before printing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-primary" aria-hidden="true" />
                    Starting price {formatKES(startingPrice(product))} for {product.minQty} ({formatKES(product.unitPrice)} {product.unitLabel})
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                {product.categoryName}
              </p>
              <h1 className="mt-2 !text-3xl !leading-10 sm:!text-4xl sm:!leading-[48px]">
                {product.name}
              </h1>
              <p className="mt-3 text-lg leading-8">{product.blurb}</p>
              <div className="mt-7">
                <ProductDetailClient product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-section" aria-label="Related products">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              icon={<Boxes size={32} aria-hidden="true" />}
              title="You May Also Need"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
