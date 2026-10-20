import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Boxes,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FolderOpen,
  Layers,
  Percent,
  Printer,
  Quote,
  Rocket,
  SearchCheck,
  Timer,
  Truck,
  UploadCloud,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import HeroMarquee from "@/components/HeroMarquee";
import PortfolioGrid from "@/components/PortfolioGrid";
import { CATEGORIES, TESTIMONIALS } from "@/lib/products";
import { SITE_URL, WHATSAPP_DISPLAY, WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Asher Print: Printing and Branding Services in Nairobi",
  description:
    "Business cards, banners, branded apparel, mugs, packaging, stickers and signage printed in Nairobi. Standard orders ready in 24 to 48 hours with delivery across Nairobi.",
  alternates: { canonical: "/" },
};

const HOW_IT_WORKS = [
  {
    icon: <UploadCloud size={30} aria-hidden="true" />,
    title: "1. Upload Your Design, Or Use Ours",
    text: "Send print ready artwork, or tell us your idea and our team will set it up for you. Every file gets a free design review before printing.",
  },
  {
    icon: <Layers size={30} aria-hidden="true" />,
    title: "2. Choose Material, Size, Quantity",
    text: "Pick the stock and finish that suit your budget. The price updates as you go, with bulk discounts applied automatically.",
  },
  {
    icon: <CreditCard size={30} aria-hidden="true" />,
    title: "3. Confirm And Pay",
    text: "Submit your quote online. Staff confirm the final price within 2 hours, then you approve and pay. No surprises later.",
  },
  {
    icon: <Truck size={30} aria-hidden="true" />,
    title: "4. We Print And Deliver",
    text: "We print, finish and deliver across Nairobi. Standard orders are ready within 24 to 48 hours, express within 24 hours.",
  },
];

const WHY = [
  {
    icon: <Timer size={26} aria-hidden="true" />,
    title: "Fast Turnaround",
    text: "24 to 48 hours for standard orders, with a 24 hour express option when the deadline is tight.",
  },
  {
    icon: <SearchCheck size={26} aria-hidden="true" />,
    title: "Free Design Review",
    text: "We check resolution, bleed, colours and sizes on every file, and flag problems before a single sheet is printed.",
  },
  {
    icon: <Truck size={26} aria-hidden="true" />,
    title: "Delivery Across Nairobi",
    text: "From the CBD to Westlands, Kilimani, Embakasi and beyond. Carefully packed and tracked to your door.",
  },
  {
    icon: <Percent size={26} aria-hidden="true" />,
    title: "Honest Bulk Discounts",
    text: "The more you print, the less you pay per piece. Discounts show in the calculator before you commit.",
  },
];

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Asher Print",
  slogan: "Print it. Brand it. Own it.",
  url: SITE_URL,
  telephone: WHATSAPP_DISPLAY,
  description:
    "Printing and branding services company in Nairobi offering business cards, banners, branded merchandise, packaging and signage.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: "Nairobi",
  priceRange: "KES",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />

      {/* Hero, modelled on the zip cd-hero half width slide */}
      <section className="!py-0" aria-label="Introduction">
        <div className="grid lg:min-h-[640px] lg:grid-cols-2">
          <div className="flex items-center px-4 py-16 sm:px-6 lg:py-24 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-12">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                <Printer size={18} aria-hidden="true" /> Nairobi Printing And Branding
              </p>
              <h1 className="mt-4 !text-4xl !leading-[52px] sm:!text-5xl sm:!leading-[60px]">
                Print It. Brand It. Own It.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8">
                Business cards, banners, branded apparel, packaging and signage,
                printed to a standard your customers can feel. Order online, get
                a confirmed quote within 2 hours, and receive delivery across
                Nairobi within 24 to 48 hours.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Free design review on every file",
                  "Standard orders ready in 24 to 48 hours",
                  "Bulk discounts shown before you pay",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2.5">
                    <CheckCircle2 size={17} className="flex-none text-primary" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/quote" className="btn-primary-zip solid">
                  Get a Quote
                </Link>
                <Link href="/products" className="btn-primary-zip">
                  Shop Products
                </Link>
              </div>
              <p className="mt-6 text-sm text-muted">
                Prefer to talk first? WhatsApp us on{" "}
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-bold text-heading">
                  {WHATSAPP_DISPLAY}
                </a>
              </p>
            </div>
          </div>
          <div className="relative min-h-[320px]">
            <Image
              src="/images/hero-printed-materials.jpg"
              alt="Vibrant printed materials flat lay with colour stickers and stationery"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        <HeroMarquee />
      </section>

      {/* Product categories, zip service section with angled edge */}
      <section className="angle-zip" aria-label="Product categories">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            icon={<Boxes size={32} aria-hidden="true" />}
            title="What We Print"
            desc="Eight product families covering almost everything a growing Kenyan business needs to look established. Tap a category to see starting prices."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group block border border-hairline bg-white transition-shadow hover:shadow-lg"
              >
                <span className="block overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={`${cat.name} printing in Nairobi`}
                    width={560}
                    height={380}
                    className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </span>
                <span className="block p-5">
                  <span className="font-display text-base uppercase leading-6 tracking-wide text-heading group-hover:text-primary">
                    {cat.name}
                  </span>
                  <span className="mt-1.5 block text-sm text-body">{cat.blurb}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-section" aria-label="How it works">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            icon={<ClipboardList size={32} aria-hidden="true" />}
            title="How It Works"
            desc="Four simple steps from artwork to delivery. Most customers go from first click to printed stock in under three days."
          />
          <div className="grid gap-10 pt-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.title} className="text-center">
                <span className="service-icon-zip" aria-hidden="true">
                  {step.icon}
                </span>
                <h3 className="mt-10 !text-base !leading-6">{step.title}</h3>
                <p className="mt-2 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center">
            <Link href="/products" className="btn-primary-zip solid">
              Start With Step One
            </Link>
          </p>
        </div>
      </section>

      {/* Why Asher Print, zip image block pattern */}
      <section className="!p-0" aria-label="Why Asher Print">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[300px]">
            <Image
              src="/images/packaging-labels.jpg"
              alt="Printed kraft packaging boxes with labels produced by Asher Print"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="bg-image-block px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Why Asher Print</p>
            <h2 className="mt-2 !text-3xl !leading-10">Printed Properly, Priced Fairly</h2>
            <div className="mt-8 space-y-7">
              {WHY.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span
                    className="flex h-[60px] w-[60px] flex-none items-center justify-center rounded-full bg-primary text-white"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="!text-base !leading-6">{item.title}</h3>
                    <p className="mt-1 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-9 flex items-center gap-2 font-bold text-heading">
              <BadgeCheck size={18} className="text-primary" aria-hidden="true" />
              Every order is checked by a person before it goes on the machine.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio preview */}
      <section aria-label="Portfolio">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            icon={<FolderOpen size={32} aria-hidden="true" />}
            title="Recent Work"
            desc="A selection of finished jobs from our Nairobi workshop. Filter by product type, then visit the full portfolio for more."
          />
          <PortfolioGrid limit={6} />
          <p className="mt-10 text-center">
            <Link href="/portfolio" className="btn-primary-zip">
              View Full Portfolio
            </Link>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-section" aria-label="Testimonials">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            icon={<Quote size={32} aria-hidden="true" />}
            title="What Clients Say"
            desc="Small businesses, schools and marketing teams across Nairobi trust us with work that carries their name."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex h-full flex-col border border-hairline bg-white p-6">
                <Quote size={22} className="text-primary" aria-hidden="true" />
                <blockquote className="mt-3 flex-1">
                  <p className="italic leading-7 text-body">{t.quote}</p>
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-hairline pt-4">
                  <span
                    className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-primary font-display text-sm text-white"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-bold text-heading">{t.name}</span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section aria-label="Get started">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="service-icon-zip" aria-hidden="true">
            <Rocket size={30} aria-hidden="true" />
          </span>
          <h2 className="mt-12">Ready To Print Something Great?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8">
            Build your quote online in a few minutes, or message us on WhatsApp
            and talk it through with the team. Either way, you will have a
            confirmed price within 2 hours during working hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/quote" className="btn-primary-zip solid">
              Get a Quote
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary-zip">
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
