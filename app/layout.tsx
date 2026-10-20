import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./legacy-fonts.css";
import Providers from "@/components/Providers";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppButton from "@/components/WhatsAppButton";
import VoiceTour from "@/components/VoiceTour";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: Printing and Branding Services in Nairobi`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Asher Print is a Nairobi printing and branding company for business cards, banners, branded apparel, packaging, stickers and signage. Fast 24 to 48 hour turnaround, free design review and delivery across Nairobi. Print it. Brand it. Own it.",
  keywords: [
    "printing Nairobi",
    "branding services",
    "business cards Nairobi",
    "banner printing",
    "t-shirt printing",
    "packaging and labels",
    "stickers Nairobi",
    "signage",
  ],
  openGraph: {
    title: `${SITE_NAME}: ${SITE_TAGLINE}`,
    description:
      "Nairobi printing and branding: business cards, banners, branded merchandise, packaging and signage. Get a confirmed quote within 2 hours.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_KE",
    type: "website",
    images: [{ url: "/images/hero-printed-materials.jpg", width: 1200, height: 675, alt: "Colourful printed materials by Asher Print" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}: ${SITE_TAGLINE}`,
    description:
      "Printing and branding in Nairobi with 24 to 48 hour turnaround and delivery across the city.",
    images: ["/images/hero-printed-materials.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-KE">
      <head>
        {/*
          Lato exactly as the zip loads it (css/style.css line 37):
          family Lato, weights 100, 300, 400, 700, 900. Served over HTTPS.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <SmoothScroll />
          <LoadingScreen />
          <div className="relative overflow-hidden">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <CookieConsent />
          <WhatsAppButton />
          <VoiceTour />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
