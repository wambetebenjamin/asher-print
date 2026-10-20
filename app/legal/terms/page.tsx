import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "@/components/LegalShell";
import { WHATSAPP_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using the Asher Print website and ordering printing and branding services in Nairobi, Kenya.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="20 October 2026">
      <p>
        These terms cover your use of the Asher Print website and our printing
        and branding services. By submitting a quote request or order, you
        agree to them. Kenyan law applies.
      </p>

      <h2>1. Quotes and pricing</h2>
      <ul>
        <li>Prices shown online, including calculator totals, are estimates in Kenya Shillings.</li>
        <li>A binding price is the final price our staff confirm with you, normally within 2 hours during working hours.</li>
        <li>Confirmed quotes are valid for 14 days unless we state otherwise, because material costs can move.</li>
        <li>Delivery within Nairobi is quoted with your order where it applies.</li>
      </ul>

      <h2>2. Artwork and approvals</h2>
      <ul>
        <li>You confirm you own, or have permission to print, every design, logo and image you send us.</li>
        <li>Our free design review checks print readiness. It does not check spelling, factual content or trademark rights, which remain your responsibility.</li>
        <li>Where we send a proof or mockup, production starts after your approval. Check it carefully, because approved proofs are printed as shown.</li>
        <li>Screen colours differ from print colours. Small colour variation between runs is normal in commercial printing.</li>
      </ul>

      <h2>3. Production and turnaround</h2>
      <ul>
        <li>Standard turnaround is 2 to 3 working days, express is 24 hours, and bulk runs are normally 5 working days, counted from artwork approval and payment.</li>
        <li>Many standard items finish within 24 to 48 hours, and we will tell you the expected time when we confirm your price.</li>
        <li>If a machine fault or material shortage affects your date, we will inform you promptly and offer the closest alternative.</li>
      </ul>

      <h2>4. Payment</h2>
      <p>
        Payment terms are confirmed with your quote. Production normally starts
        after payment or an agreed deposit. Business account terms can be
        arranged for regular corporate clients.
      </p>

      <h2>5. Delivery and collection</h2>
      <p>
        We deliver across Nairobi and can arrange courier services further
        afield. Please inspect goods on delivery. Keep the items and packaging
        if something looks wrong, and contact us within 2 working days with
        photos so we can put it right.
      </p>

      <h2>6. Reprints and refunds</h2>
      <ul>
        <li>If we print something materially different from the approved proof, or with a production defect, we will reprint or refund that item.</li>
        <li>We cannot reprint free of charge for errors in artwork you approved, low resolution files we warned about, or damage after delivery.</li>
        <li>Personalised goods cannot be returned for a change of mind.</li>
      </ul>

      <h2>7. Accounts</h2>
      <p>
        Keep your account password private. You are responsible for orders
        placed through your account. Tell us quickly on {WHATSAPP_DISPLAY} if
        you suspect misuse.
      </p>

      <h2>8. Acceptable use</h2>
      <p>
        Do not use this website to upload unlawful material, infringe the
        rights of others, or attempt to disrupt the service. We may decline
        work that is unlawful or that we reasonably believe infringes another
        party rights.
      </p>

      <h2>9. Liability</h2>
      <p>
        Nothing in these terms limits liability that cannot be limited under
        Kenyan law. Otherwise, our liability for a job is limited to the price
        paid for that job.
      </p>

      <h2>10. Privacy</h2>
      <p>
        We handle personal data as described in our{" "}
        <Link href="/legal/privacy-policy" className="font-bold text-primary underline">Privacy Policy</Link>,
        in line with the Kenya Data Protection Act, 2019.
      </p>
    </LegalShell>
  );
}
