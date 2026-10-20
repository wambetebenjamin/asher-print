import type { Metadata } from "next";
import { SignUpForm } from "@/components/AuthForms";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a free Asher Print account for faster quotes, artwork uploads and reorders in Nairobi.",
  alternates: { canonical: "/auth/signup" },
  robots: { index: false },
};

export default function SignUpPage() {
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  return <SignUpForm googleEnabled={googleEnabled} />;
}
