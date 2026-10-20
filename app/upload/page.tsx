import type { Metadata } from "next";
import UploadPortal from "@/components/UploadPortal";

export const metadata: Metadata = {
  title: "Upload Print Ready Artwork",
  description:
    "Upload PDF, AI, EPS, PNG and other print ready artwork files for your Asher Print quote or order. Guest uploads welcome with a quote reference.",
  alternates: { canonical: "/upload" },
};

export default function UploadPage() {
  return <UploadPortal />;
}
