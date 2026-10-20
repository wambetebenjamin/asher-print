import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "@/components/LegalShell";
import { WHATSAPP_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Asher Print collects, uses and protects your personal data under the Kenya Data Protection Act, 2019.",
  alternates: { canonical: "/legal/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="20 October 2026">
      <p>
        Asher Print is a printing and branding company based in Nairobi, Kenya.
        This policy explains what personal data we collect through this
        website, why we collect it, and the rights you have under the Kenya
        Data Protection Act, 2019. Where this policy and the Act differ, the
        Act prevails.
      </p>

      <h2>1. Data we collect</h2>
      <ul>
        <li>Quote and contact details: your name, company, phone number, email address and delivery address.</li>
        <li>Order details: products, quantities, material and size choices, design notes and artwork files you upload.</li>
        <li>Account details: name, email, phone number and a securely hashed password when you register.</li>
        <li>Technical data: basic device and browser information, and cookie choices stored on your device.</li>
      </ul>

      <h2>2. Why we use your data</h2>
      <ul>
        <li>To prepare, confirm and deliver your quote, print job and delivery.</li>
        <li>To contact you about your order by phone, WhatsApp or email.</li>
        <li>To keep your account secure and prevent fraud, including CAPTCHA checks.</li>
        <li>To meet legal duties such as tax records.</li>
        <li>Only with your consent, to send offers and to measure website use.</li>
      </ul>
      <p>We do not sell your personal data to anyone.</p>

      <h2>3. Artwork files</h2>
      <p>
        Files you upload are used only to review, print and deliver your job.
        Do not upload artwork you do not have the right to print. We keep job
        files for a reasonable period to make reorders easy, and you may ask
        us to delete them at any time.
      </p>

      <h2>4. Sharing</h2>
      <p>
        We share data only where needed to serve you: delivery riders receive
        your name, phone number and address; our hosting, storage and email
        providers process data on our instructions; and we disclose data where
        Kenyan law requires it. Service providers may process data outside
        Kenya with safeguards required by the Act.
      </p>

      <h2>5. Retention and security</h2>
      <p>
        Quote and order records are kept for up to seven years for accounting,
        then deleted or anonymised. Passwords are stored hashed, never in
        plain text. We use HTTPS, access controls and reputable cloud
        providers, while recognising that no online system is completely risk
        free.
      </p>

      <h2>6. Your rights</h2>
      <p>Under the Kenya Data Protection Act, 2019, you may:</p>
      <ul>
        <li>Ask what personal data we hold about you, and receive a copy.</li>
        <li>Ask us to correct inaccurate data, or delete data we no longer need.</li>
        <li>Object to, or restrict, certain uses of your data, and withdraw consent at any time.</li>
        <li>Complain to the Office of the Data Protection Commissioner of Kenya if you believe we have mishandled your data.</li>
      </ul>
      <p>
        To use any of these rights, email hello@asherprint.co.ke or WhatsApp{" "}
        {WHATSAPP_DISPLAY}. We respond within the timelines set by the Act.
      </p>

      <h2>7. Cookies</h2>
      <p>
        See our <Link href="/legal/cookie-policy" className="font-bold text-primary underline">Cookie Policy</Link>{" "}
        for how cookies work on this site and how to change your choices.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update this policy as our services grow. The current version
        always lives on this page, with the date at the top.
      </p>
    </LegalShell>
  );
}
