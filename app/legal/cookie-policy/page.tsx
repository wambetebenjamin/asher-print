import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import ResetConsent from "@/components/ResetConsent";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Asher Print uses cookies and local storage, and how to manage your choices under the Kenya Data Protection Act, 2019.",
  alternates: { canonical: "/legal/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalShell title="Cookie Policy" updated="20 October 2026">
      <p>
        Cookies are small files stored on your device. We also use browser
        local storage for similar purposes. This page explains each category
        and how to control it, in line with the Kenya Data Protection Act,
        2019.
      </p>

      <h2>1. Necessary (always on)</h2>
      <p>
        These keep the site secure and working: sign in sessions, CAPTCHA
        checks, and remembering the items in your quote basket while you shop.
        The site cannot function properly without them, so they do not need
        consent, but we still tell you about them here.
      </p>

      <h2>2. Functional (your choice)</h2>
      <p>
        These remember preferences such as recently viewed products and form
        details, so repeat visits feel faster. Rejecting them does not stop
        you ordering.
      </p>

      <h2>3. Analytics (your choice)</h2>
      <p>
        With your permission, privacy focused analytics help us count visits
        and see which pages help customers most. We use aggregated statistics,
        not your name or phone number.
      </p>

      <h2>4. Marketing (your choice)</h2>
      <p>
        With your permission, marketing cookies may measure our adverts and
        help show relevant offers on other platforms. We do not sell personal
        data.
      </p>

      <h2>5. Your saved choice</h2>
      <p>
        Your banner choice is stored on your device under the key
        asher_print_consent, together with the date you chose. It is not sent
        to advertisers. You can clear it at any time below, and the banner
        will ask again.
      </p>
      <ResetConsent />

      <h2>6. Browser controls</h2>
      <p>
        You can also block or delete cookies in your browser settings. Note
        that blocking necessary cookies may break sign in and the quote
        basket.
      </p>

      <h2>7. Questions</h2>
      <p>
        Email hello@asherprint.co.ke with any cookie question, or read the
        Privacy Policy for your wider rights under Kenyan law.
      </p>
    </LegalShell>
  );
}
