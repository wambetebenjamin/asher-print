export const SITE_NAME = "Asher Print";
export const SITE_TAGLINE = "Print it. Brand it. Own it.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://asherprint.co.ke";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254112272061";
export const WHATSAPP_DISPLAY = "+254112272061";
export const WHATSAPP_MESSAGE =
  "Hello Asher Print, I would like to get a quote for printing or branding.";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const CONSENT_KEY = "asher_print_consent";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/quote", label: "Get a Quote" },
  { href: "/upload", label: "Upload Artwork" },
];

export function formatKES(amount: number): string {
  return `KES ${Math.round(amount).toLocaleString("en-KE")}`;
}
