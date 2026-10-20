"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUp, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { CATEGORIES } from "@/lib/products";
import { WHATSAPP_DISPLAY, WHATSAPP_LINK } from "@/lib/site";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

const GALLERY = [
  "/images/business-cards.jpg",
  "/images/packaging-labels.jpg",
  "/images/mugs-gifts.jpg",
  "/images/stickers-decals.jpg",
  "/images/flyers-brochures.jpg",
  "/images/tshirts-apparel.jpg",
  "/images/banners-signage.jpg",
  "/images/event-materials.jpg",
  "/images/portfolio-open-sign.jpg",
];

/**
 * Zip footer rebuilt: three widgets (recent work, photo gallery, about with
 * subscribe form) on the dark footer background, then the angled copyright
 * strip with pentagon social icons and a back to top button.
 */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  async function subscribe(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setNote("");
    try {
      const token = await getRecaptchaToken("contact");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter subscriber",
          email,
          phone: "",
          message: "Please add me to the Asher Print mailing list for print offers.",
          recaptchaToken: token,
          recaptchaV2Token: "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
      setNote(res.ok ? "Thank you. You are on the list." : data.error || "Please enter a valid email address.");
      if (res.ok) setEmail("");
    } catch {
      setNote("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <footer className="footer-zip" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="widget-title !text-lg">Popular Products</h3>
              <ul className="mt-4 space-y-2.5">
                {CATEGORIES.slice(0, 5).map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/products?category=${cat.slug}`}
                      className="text-white/85 hover:!text-white"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/quote" className="font-bold text-white underline">
                    Build your free quote
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="widget-title !text-lg">Recent Work</h3>
              <div className="mt-4 grid w-fit grid-cols-3 gap-1">
                {GALLERY.map((src, i) => (
                  <Link key={src} href="/portfolio" aria-label={`View portfolio item ${i + 1}`}>
                    <Image
                      src={src}
                      alt=""
                      width={84}
                      height={74}
                      className="h-[74px] w-[84px] object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="widget-title !text-lg">About Asher Print</h3>
              <p className="mt-4 text-white/85">
                Nairobi printing and branding for businesses that want quality
                without the wait. Print it. Brand it. Own it.
              </p>
              <p className="mt-4 flex items-start gap-2 text-white/85">
                <MapPin size={16} className="mt-1 flex-none" aria-hidden="true" />
                Nairobi, Kenya. Delivery across Nairobi within 24 to 48 hours.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="!text-sm !leading-5 text-white">Email</h4>
                  <a href="mailto:hello@asherprint.co.ke" className="flex items-center gap-1.5 text-white/85">
                    <Mail size={14} aria-hidden="true" /> hello@asherprint.co.ke
                  </a>
                </div>
                <div>
                  <h4 className="!text-sm !leading-5 text-white">Phone</h4>
                  <a href={`tel:${WHATSAPP_DISPLAY}`} className="flex items-center gap-1.5 text-white/85">
                    <Phone size={14} aria-hidden="true" /> {WHATSAPP_DISPLAY}
                  </a>
                </div>
              </div>
              <form onSubmit={subscribe} className="mt-5" aria-label="Subscribe to print offers">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <div className="flex">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full border border-white/25 bg-white/10 px-3 py-2.5 text-white placeholder:text-white/60 focus:border-primary focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={busy}
                    aria-label="Subscribe"
                    className="flex items-center bg-primary px-4 text-white disabled:opacity-60"
                  >
                    <Send size={16} aria-hidden="true" />
                  </button>
                </div>
                {note ? <p aria-live="polite" className="mt-2 text-white">{note}</p> : null}
              </form>
            </div>
          </div>
        </div>
      </footer>

      <section className="copyright-zip angle-zip angle-zip-dark relative" aria-label="Copyright">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <ul className="relative z-10 flex list-none items-center justify-center gap-5 p-0">
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter" aria-label="Asher Print on Twitter">
                <span className="icon-pentagon-zip"><Twitter size={16} aria-hidden="true" /></span>
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Asher Print on Facebook">
                <span className="icon-pentagon-zip"><Facebook size={16} aria-hidden="true" /></span>
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Asher Print on Instagram">
                <span className="icon-pentagon-zip"><Instagram size={16} aria-hidden="true" /></span>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="Asher Print on LinkedIn">
                <span className="icon-pentagon-zip"><Linkedin size={16} aria-hidden="true" /></span>
              </a>
            </li>
          </ul>

          <nav aria-label="Legal" className="relative z-10 mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/legal/privacy-policy" className="text-white/80 hover:!text-white">Privacy Policy</Link>
            <Link href="/legal/terms" className="text-white/80 hover:!text-white">Terms of Service</Link>
            <Link href="/legal/cookie-policy" className="text-white/80 hover:!text-white">Cookie Policy</Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:!text-white">
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </nav>

          <div className="copyright-info-zip relative z-10">
            Copyright {new Date().getFullYear()} Asher Print, Nairobi. All rights reserved.
          </div>

          <button
            type="button"
            title="Back to Top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="btn-primary-zip solid relative z-10 mt-6 !px-4"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </section>
    </>
  );
}
