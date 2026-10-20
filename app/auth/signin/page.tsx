import type { Metadata } from "next";
import { SignInForm } from "@/components/AuthForms";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Asher Print account to upload artwork and manage quotes faster.",
  alternates: { canonical: "/auth/signin" },
  robots: { index: false },
};

export default function SignInPage() {
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  return <SignInForm googleEnabled={googleEnabled} />;
}
