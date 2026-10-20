import type { Metadata } from "next";
import Link from "next/link";
import { FolderOpen } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio of Printed Work",
  description:
    "See finished printing and branding work from Asher Print in Nairobi: packaging, business cards, signage, mugs, stickers, apparel and event materials.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <section aria-label="Portfolio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          icon={<FolderOpen size={32} aria-hidden="true" />}
          title="Our Portfolio"
          desc="Real finished work, photographed before it left the workshop. Use the filters to see examples of the product you have in mind."
        />
        <PortfolioGrid />
        <div className="mt-14 border border-hairline bg-section p-8 text-center">
          <h2 className="!text-2xl">Like What You See?</h2>
          <p className="mx-auto mt-3 max-w-xl">
            Tell us which piece caught your eye and we will quote the same
            finish for your brand, with a confirmed price within 2 hours.
          </p>
          <p className="mt-6">
            <Link href="/quote" className="btn-primary-zip solid">
              Get a Similar Quote
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
