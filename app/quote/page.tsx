import type { Metadata } from "next";
import QuoteBuilder from "@/components/QuoteBuilder";

export const metadata: Metadata = {
  title: "Get a Printing Quote",
  description:
    "Build your Asher Print quote online. Add products, choose quantities, and send. Staff confirm the final price within 2 hours, with standard, express and bulk turnaround options.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return <QuoteBuilder />;
}
