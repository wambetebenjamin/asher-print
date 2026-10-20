import type { Metadata } from "next";
import QuoteConfirmationClient from "@/components/QuoteConfirmationClient";

export const metadata: Metadata = {
  title: "Quote Confirmation",
  description:
    "Your Asher Print quote reference, item list and estimated turnaround. Staff confirm the final price within 2 hours.",
  alternates: { canonical: "/quote-confirmation" },
  robots: { index: false },
};

export default async function QuoteConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const params = await searchParams;
  return <QuoteConfirmationClient refCode={(params.ref || "").toUpperCase()} />;
}
