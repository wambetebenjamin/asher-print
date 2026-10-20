export type Category = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export type OptionChoice = {
  id: string;
  label: string;
  multiplier: number;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  unitPrice: number;
  unitLabel: string;
  minQty: number;
  step: number;
  image: string;
  blurb: string;
  description: string;
  materials: OptionChoice[];
  sizes: OptionChoice[];
  turnaround: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "business-cards",
    name: "Business Cards",
    blurb: "Crisp cards that make a strong first impression at every meeting.",
    image: "/images/business-cards.jpg",
  },
  {
    slug: "flyers-brochures",
    name: "Flyers and Brochures",
    blurb: "Bright flyers and folded brochures for offers, events and menus.",
    image: "/images/flyers-brochures.jpg",
  },
  {
    slug: "banners-signage",
    name: "Banners and Signage",
    blurb: "Roll-up banners, shop signs and large format prints that get noticed.",
    image: "/images/banners-signage.jpg",
  },
  {
    slug: "tshirts-apparel",
    name: "T-Shirts and Branded Apparel",
    blurb: "Printed and embroidered tees, hoodies and workwear for your team.",
    image: "/images/tshirts-apparel.jpg",
  },
  {
    slug: "mugs-gifts",
    name: "Branded Mugs and Gifts",
    blurb: "Mugs, bottles and gift sets with your logo in full colour.",
    image: "/images/mugs-gifts.jpg",
  },
  {
    slug: "packaging-labels",
    name: "Packaging and Labels",
    blurb: "Boxes, bags and labels that make your product ready for the shelf.",
    image: "/images/packaging-labels.jpg",
  },
  {
    slug: "stickers-decals",
    name: "Stickers and Decals",
    blurb: "Waterproof vinyl stickers and decals, cut to any shape you need.",
    image: "/images/stickers-decals.jpg",
  },
  {
    slug: "event-materials",
    name: "Event Materials",
    blurb: "Backdrops, wristbands, programmes and everything for event day.",
    image: "/images/event-materials.jpg",
  },
];

const std = (label: string): OptionChoice => ({ id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label, multiplier: 1 });
const opt = (label: string, multiplier: number): OptionChoice => ({
  id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  label,
  multiplier,
});

export const PRODUCTS: Product[] = [
  {
    slug: "standard-business-cards",
    name: "Standard Business Cards",
    category: "business-cards",
    categoryName: "Business Cards",
    unitPrice: 9,
    unitLabel: "per card",
    minQty: 100,
    step: 50,
    image: "/images/business-cards.jpg",
    blurb: "Our best selling card on sturdy 350gsm stock with a smooth matte finish.",
    description:
      "Full colour business cards printed on premium 350gsm card. Choose matte or gloss lamination for a finish that survives wallets, pockets and busy networking days. Artwork is checked free of charge before we print, and standard orders are ready within 24 to 48 hours.",
    materials: [std("350gsm matte"), opt("350gsm gloss", 1.1), opt("400gsm premium", 1.35)],
    sizes: [std("85mm by 55mm"), opt("90mm by 50mm", 1.05), opt("55mm by 55mm square", 1.1)],
    turnaround: "24 to 48 hours",
  },
  {
    slug: "premium-velvet-business-cards",
    name: "Premium Velvet Business Cards",
    category: "business-cards",
    categoryName: "Business Cards",
    unitPrice: 16,
    unitLabel: "per card",
    minQty: 100,
    step: 50,
    image: "/images/portfolio-paper-stack.jpg",
    blurb: "Soft touch velvet lamination with optional spot gloss on your logo.",
    description:
      "Velvet soft touch cards that feel as good as they look. Add spot gloss to lift your logo off the card. Ideal for executives, consultants and anyone who wants their card kept, not tossed.",
    materials: [std("400gsm velvet"), opt("400gsm velvet with spot gloss", 1.5)],
    sizes: [std("85mm by 55mm"), opt("90mm by 50mm", 1.05)],
    turnaround: "2 to 3 days",
  },
  {
    slug: "kraft-business-cards",
    name: "Kraft Business Cards",
    category: "business-cards",
    categoryName: "Business Cards",
    unitPrice: 12,
    unitLabel: "per card",
    minQty: 100,
    step: 50,
    image: "/images/portfolio-kraft-labels.jpg",
    blurb: "Warm recycled kraft board for organic and handmade brands.",
    description:
      "Printed on natural brown kraft board with rich black or white ink. A favourite for coffee shops, bakers, craft brands and agri businesses across Nairobi.",
    materials: [std("300gsm recycled kraft"), opt("350gsm recycled kraft", 1.2)],
    sizes: [std("85mm by 55mm"), opt("55mm by 55mm square", 1.1)],
    turnaround: "24 to 48 hours",
  },
  {
    slug: "a5-flyers",
    name: "A5 Flyers",
    category: "flyers-brochures",
    categoryName: "Flyers and Brochures",
    unitPrice: 14,
    unitLabel: "per flyer",
    minQty: 100,
    step: 50,
    image: "/images/flyers-brochures.jpg",
    blurb: "Sharp A5 flyers for offers, church events, schools and launches.",
    description:
      "Full colour A5 flyers on 150gsm gloss art paper. Single or double sided. We check your artwork for print readiness at no cost, and bulk runs above 1,000 pieces attract our best rates.",
    materials: [std("150gsm gloss"), opt("170gsm gloss", 1.15), opt("250gsm gloss card", 1.6)],
    sizes: [std("A5"), opt("A6", 0.75), opt("DL", 0.9)],
    turnaround: "24 to 48 hours",
  },
  {
    slug: "a4-tri-fold-brochures",
    name: "A4 Tri-fold Brochures",
    category: "flyers-brochures",
    categoryName: "Flyers and Brochures",
    unitPrice: 38,
    unitLabel: "per brochure",
    minQty: 100,
    step: 25,
    image: "/images/portfolio-paper-sheets.jpg",
    blurb: "Six panel brochures, scored and folded, ready to hand out.",
    description:
      "A4 sheets printed full colour on both sides, then scored and tri-folded to DL size. Perfect for company profiles, hotel menus, school prospectuses and product guides.",
    materials: [std("150gsm gloss"), opt("170gsm matte", 1.2), opt("250gsm gloss card", 1.7)],
    sizes: [std("A4 folded to DL"), opt("A3 folded to A4", 1.9)],
    turnaround: "2 to 3 days",
  },
  {
    slug: "company-profiles",
    name: "Company Profiles and Booklets",
    category: "flyers-brochures",
    categoryName: "Flyers and Brochures",
    unitPrice: 450,
    unitLabel: "per booklet",
    minQty: 10,
    step: 5,
    image: "/images/event-materials.jpg",
    blurb: "Saddle stitched profiles from 8 to 32 pages with a heavy cover.",
    description:
      "Multi page company profiles and booklets with a 300gsm cover and 150gsm inner pages, saddle stitched for a clean finish. Send a print ready PDF or let our team lay out your content.",
    materials: [std("Gloss inner, matte cover"), opt("All matte premium", 1.25)],
    sizes: [std("A4, 12 pages"), opt("A4, 20 pages", 1.5), opt("A5, 16 pages", 0.8)],
    turnaround: "3 to 5 days",
  },
  {
    slug: "roll-up-banners",
    name: "Roll-up Banners",
    category: "banners-signage",
    categoryName: "Banners and Signage",
    unitPrice: 5500,
    unitLabel: "per banner with stand",
    minQty: 1,
    step: 1,
    image: "/images/banners-signage.jpg",
    blurb: "Wide base roll-ups that set up in one minute, carry bag included.",
    description:
      "High resolution print on curl free banner material, mounted on a sturdy wide base stand. Supplied with a padded carry bag. A staple for receptions, expos, churches and retail counters.",
    materials: [std("Standard wide base"), opt("Premium heavy base", 1.3), opt("Double sided", 1.7)],
    sizes: [std("850mm by 2000mm"), opt("1000mm by 2000mm", 1.2), opt("1200mm by 2000mm", 1.4)],
    turnaround: "24 hours",
  },
  {
    slug: "pvc-banners",
    name: "PVC Banners with Eyelets",
    category: "banners-signage",
    categoryName: "Banners and Signage",
    unitPrice: 1200,
    unitLabel: "per square metre",
    minQty: 1,
    step: 1,
    image: "/images/portfolio-open-sign.jpg",
    blurb: "Weatherproof outdoor banners, hemmed with brass eyelets.",
    description:
      "Heavy duty PVC printed with UV stable inks for outdoor use. Hemmed edges and brass eyelets are included, so your banner goes up straight away at the gate, fence or building front.",
    materials: [std("440gsm PVC"), opt("510gsm heavy PVC", 1.25), opt("Mesh PVC for windy sites", 1.35)],
    sizes: [std("2m by 1m"), opt("3m by 1m", 1.5), opt("4m by 2m", 4)],
    turnaround: "24 to 48 hours",
  },
  {
    slug: "shop-sign-boards",
    name: "Shop Sign Boards",
    category: "banners-signage",
    categoryName: "Banners and Signage",
    unitPrice: 8500,
    unitLabel: "per sign",
    minQty: 1,
    step: 1,
    image: "/images/banners-signage.jpg",
    blurb: "Rigid signs on aluminium composite, cut and finished in house.",
    description:
      "Your design printed and mounted on 3mm aluminium composite panel for a flat, durable finish. Fixings advice is included, and installation across Nairobi can be arranged on request.",
    materials: [std("Aluminium composite 3mm"), opt("Forex board 5mm indoor", 0.7), opt("Acrylic face mounted", 1.8)],
    sizes: [std("1200mm by 600mm"), opt("1800mm by 900mm", 1.8), opt("2400mm by 1200mm", 3.2)],
    turnaround: "2 to 3 days",
  },
  {
    slug: "printed-t-shirts",
    name: "Printed T-Shirts",
    category: "tshirts-apparel",
    categoryName: "T-Shirts and Branded Apparel",
    unitPrice: 750,
    unitLabel: "per shirt",
    minQty: 10,
    step: 5,
    image: "/images/tshirts-apparel.jpg",
    blurb: "180gsm cotton tees with your design in vinyl, screen print or DTF.",
    description:
      "Quality cotton t-shirts in a wide colour range, branded with the best method for your artwork and quantity. Mixed sizes in one order are welcome. Send your size breakdown in the design notes.",
    materials: [std("Cotton 180gsm, vinyl print"), opt("Cotton 180gsm, screen print", 1.1), opt("Cotton 220gsm heavy", 1.3), opt("Polo shirt embroidered", 1.9)],
    sizes: [std("Mixed S to XL"), opt("Kids sizes", 0.85), opt("2XL and above", 1.15)],
    turnaround: "2 to 3 days",
  },
  {
    slug: "branded-hoodies",
    name: "Branded Hoodies",
    category: "tshirts-apparel",
    categoryName: "T-Shirts and Branded Apparel",
    unitPrice: 1850,
    unitLabel: "per hoodie",
    minQty: 10,
    step: 5,
    image: "/images/portfolio-apparel-rail.jpg",
    blurb: "Warm fleece hoodies with chest print or embroidery.",
    description:
      "Heavy fleece hoodies that hold print and embroidery well. Popular for staff kits, campus groups and sports teams. We confirm a digital mockup with you before production starts.",
    materials: [std("Fleece, chest print"), opt("Fleece, embroidered chest logo", 1.25), opt("Zip hoodie", 1.2)],
    sizes: [std("Mixed S to XL"), opt("2XL and above", 1.15)],
    turnaround: "3 to 5 days",
  },
  {
    slug: "caps-and-aprons",
    name: "Caps and Aprons",
    category: "tshirts-apparel",
    categoryName: "T-Shirts and Branded Apparel",
    unitPrice: 550,
    unitLabel: "per piece",
    minQty: 20,
    step: 10,
    image: "/images/tshirts-apparel.jpg",
    blurb: "Embroidered caps and printed aprons for crews and activations.",
    description:
      "Six panel caps with crisp embroidery and sturdy aprons with bold print. Ideal for restaurants, salons, market activations and field teams who need to look uniform on day one.",
    materials: [std("Cap, embroidered"), opt("Apron, printed", 1.4), opt("Cap and apron set", 2.1)],
    sizes: [std("One size adult"), opt("Kids cap", 0.85)],
    turnaround: "2 to 3 days",
  },
  {
    slug: "printed-ceramic-mugs",
    name: "Printed Ceramic Mugs",
    category: "mugs-gifts",
    categoryName: "Branded Mugs and Gifts",
    unitPrice: 650,
    unitLabel: "per mug",
    minQty: 10,
    step: 5,
    image: "/images/mugs-gifts.jpg",
    blurb: "Full colour wrap print on glossy 330ml ceramic mugs.",
    description:
      "Bright, dishwasher safe prints wrapped around a classic 330ml mug. Each mug comes in an individual box, ready to gift to clients, staff or event guests.",
    materials: [std("White ceramic 330ml"), opt("Two tone colour inner", 1.2), opt("Magic colour change", 1.6)],
    sizes: [std("330ml (11oz)"), opt("440ml (15oz)", 1.25)],
    turnaround: "24 to 48 hours",
  },
  {
    slug: "thermal-travel-mugs",
    name: "Thermal Travel Mugs and Bottles",
    category: "mugs-gifts",
    categoryName: "Branded Mugs and Gifts",
    unitPrice: 1450,
    unitLabel: "per piece",
    minQty: 10,
    step: 5,
    image: "/images/portfolio-mug-hand.jpg",
    blurb: "Insulated steel with laser engraving or full colour print.",
    description:
      "Double wall steel travel mugs and sport bottles that keep drinks hot or cold for hours. Laser engraving gives a premium tone on tone finish that never peels.",
    materials: [std("Steel, full colour print"), opt("Steel, laser engraved", 1.3), opt("Sport bottle 750ml", 0.8)],
    sizes: [std("500ml"), opt("750ml", 1.2)],
    turnaround: "2 to 3 days",
  },
  {
    slug: "corporate-gift-sets",
    name: "Corporate Gift Sets",
    category: "mugs-gifts",
    categoryName: "Branded Mugs and Gifts",
    unitPrice: 2900,
    unitLabel: "per set",
    minQty: 10,
    step: 5,
    image: "/images/portfolio-mug-close.jpg",
    blurb: "Notebook, pen and mug in a branded gift box, ready to present.",
    description:
      "A coordinated set with a hardcover notebook, metal pen and ceramic mug, all carrying your brand and packed in a gift box. A reliable choice for conferences and end year client gifts.",
    materials: [std("Standard set"), opt("Executive set with flask", 1.7)],
    sizes: [std("A5 notebook set"), opt("A4 notebook set", 1.3)],
    turnaround: "3 to 5 days",
  },
  {
    slug: "mailer-boxes",
    name: "Printed Mailer Boxes",
    category: "packaging-labels",
    categoryName: "Packaging and Labels",
    unitPrice: 180,
    unitLabel: "per box",
    minQty: 100,
    step: 50,
    image: "/images/packaging-labels.jpg",
    blurb: "Sturdy e-flute mailer boxes printed inside and out.",
    description:
      "Self locking mailer boxes that protect your product and carry your brand from shelf to doorstep. Supplied flat to save space. Dielines are provided free once you confirm a size.",
    materials: [std("Kraft e-flute"), opt("White e-flute", 1.15), opt("Full colour both sides", 1.5)],
    sizes: [std("25 by 20 by 8cm"), opt("32 by 25 by 10cm", 1.4), opt("40 by 30 by 12cm", 1.9)],
    turnaround: "5 days bulk",
  },
  {
    slug: "product-labels-on-rolls",
    name: "Product Labels on Rolls",
    category: "packaging-labels",
    categoryName: "Packaging and Labels",
    unitPrice: 8,
    unitLabel: "per label",
    minQty: 500,
    step: 250,
    image: "/images/portfolio-white-boxes.jpg",
    blurb: "Waterproof roll labels for jars, bottles and tubs.",
    description:
      "Roll labels with strong adhesive that survive fridges, freezers and wet hands. Round, square or custom shapes. We help you confirm the exact size against your container before printing.",
    materials: [std("White vinyl waterproof"), opt("Clear vinyl", 1.2), opt("Kraft paper", 0.85), opt("Chrome silver", 1.6)],
    sizes: [std("50mm round"), opt("70mm round", 1.5), opt("90mm by 60mm", 1.8)],
    turnaround: "2 to 3 days",
  },
  {
    slug: "paper-carrier-bags",
    name: "Printed Paper Carrier Bags",
    category: "packaging-labels",
    categoryName: "Packaging and Labels",
    unitPrice: 95,
    unitLabel: "per bag",
    minQty: 100,
    step: 50,
    image: "/images/portfolio-white-box.jpg",
    blurb: "Strong paper bags with twisted handles and bold branding.",
    description:
      "Durable kraft or white paper carrier bags printed on both sides. A walking billboard for boutiques, pharmacies, bakeries and takeaway brands across the city.",
    materials: [std("Brown kraft 120gsm"), opt("White kraft 120gsm", 1.1), opt("Laminated luxury bag", 2.6)],
    sizes: [std("Small A5"), opt("Medium A4", 1.35), opt("Large A3", 1.8)],
    turnaround: "3 to 5 days",
  },
  {
    slug: "die-cut-vinyl-stickers",
    name: "Die Cut Vinyl Stickers",
    category: "stickers-decals",
    categoryName: "Stickers and Decals",
    unitPrice: 25,
    unitLabel: "per sticker",
    minQty: 100,
    step: 50,
    image: "/images/stickers-decals.jpg",
    blurb: "Custom shaped, waterproof and scratch resistant.",
    description:
      "Your artwork cut precisely to shape on outdoor grade vinyl with a protective laminate. Laptops, helmets, packaging seals and giveaway packs all covered. Kiss cut sheets also available.",
    materials: [std("White vinyl matte"), opt("White vinyl gloss", 1.05), opt("Clear vinyl", 1.2), opt("Holographic", 1.7)],
    sizes: [std("50mm"), opt("75mm", 1.6), opt("100mm", 2.4)],
    turnaround: "24 to 48 hours",
  },
  {
    slug: "window-and-wall-decals",
    name: "Window and Wall Decals",
    category: "stickers-decals",
    categoryName: "Stickers and Decals",
    unitPrice: 1800,
    unitLabel: "per square metre",
    minQty: 1,
    step: 1,
    image: "/images/portfolio-stickers-laptop.jpg",
    blurb: "One way vision, frosted and full colour glass branding.",
    description:
      "Transform plain glass and walls with one way vision prints, frosting with cut lettering or full colour decals. Site measurement and installation in Nairobi can be quoted with your order.",
    materials: [std("One way vision"), opt("Frosted vinyl", 1.1), opt("Clear printed vinyl", 1.05)],
    sizes: [std("1 square metre"), opt("2 square metres", 2), opt("5 square metres", 5)],
    turnaround: "2 to 3 days",
  },
  {
    slug: "vehicle-decals",
    name: "Vehicle Decals and Branding",
    category: "stickers-decals",
    categoryName: "Stickers and Decals",
    unitPrice: 9500,
    unitLabel: "per vehicle from",
    minQty: 1,
    step: 1,
    image: "/images/hero-printed-materials.jpg",
    blurb: "Cut lettering and panel prints for cars, vans and bikes.",
    description:
      "Turn every trip into advertising with door logos, contact lettering and full panel prints. We use vehicle grade vinyl with lamination for colour that lasts on the road.",
    materials: [std("Cut vinyl lettering"), opt("Printed panels with laminate", 1.8), opt("Reflective vinyl", 1.6)],
    sizes: [std("Saloon car"), opt("Van or pickup", 1.7), opt("Truck side panels", 3.2)],
    turnaround: "2 to 3 days",
  },
  {
    slug: "event-backdrops",
    name: "Event Backdrops",
    category: "event-materials",
    categoryName: "Event Materials",
    unitPrice: 18500,
    unitLabel: "per backdrop from",
    minQty: 1,
    step: 1,
    image: "/images/event-materials.jpg",
    blurb: "Photo ready media walls printed and framed, delivered to venue.",
    description:
      "Seamless step and repeat backdrops on blockout material, stretched on a timber or aluminium frame. We can deliver and install at your venue within Nairobi.",
    materials: [std("Blockout banner on timber frame"), opt("Fabric tension backdrop", 1.5)],
    sizes: [std("3m by 2.4m"), opt("4m by 2.4m", 1.35), opt("6m by 3m", 2.2)],
    turnaround: "2 to 3 days",
  },
  {
    slug: "wristbands-and-lanyards",
    name: "Wristbands and Lanyards",
    category: "event-materials",
    categoryName: "Event Materials",
    unitPrice: 60,
    unitLabel: "per piece",
    minQty: 100,
    step: 50,
    image: "/images/flyers-brochures.jpg",
    blurb: "Tyvek wristbands and printed lanyards with badge holders.",
    description:
      "Secure, tamper proof Tyvek wristbands in bright colours, plus full colour polyester lanyards with hooks and optional badge holders. Numbering available for gate control.",
    materials: [std("Tyvek wristband"), opt("Vinyl wristband", 1.4), opt("Lanyard with hook", 3.2), opt("Lanyard, holder and printed badge", 5.5)],
    sizes: [std("Standard adult"), opt("Numbered", 1.2)],
    turnaround: "24 to 48 hours",
  },
  {
    slug: "event-programmes",
    name: "Event Programmes and Invitations",
    category: "event-materials",
    categoryName: "Event Materials",
    unitPrice: 85,
    unitLabel: "per piece",
    minQty: 50,
    step: 25,
    image: "/images/portfolio-paper-sheets.jpg",
    blurb: "Elegant programmes and invitation cards for weddings and galas.",
    description:
      "Invitations and order of service programmes on textured or pearl card, with matching table cards and menus on request. Foil accents available on selected stocks.",
    materials: [std("300gsm matte card"), opt("Pearl shimmer card", 1.5), opt("Textured linen card", 1.4)],
    sizes: [std("A5 card"), opt("A4 folded programme", 1.6), opt("DL card", 0.8)],
    turnaround: "2 to 3 days",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getByCategory(category?: string | null): Product[] {
  if (!category || category === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export function startingPrice(product: Product): number {
  return product.unitPrice * product.minQty;
}

export function bulkDiscount(qty: number, minQty: number): number {
  const ratio = qty / Math.max(minQty, 1);
  if (ratio >= 20) return 0.3;
  if (ratio >= 10) return 0.25;
  if (ratio >= 5) return 0.2;
  if (ratio >= 3) return 0.15;
  if (ratio >= 2) return 0.1;
  return 0;
}

export function quotePrice(
  product: Product,
  materialId: string,
  sizeId: string,
  qty: number,
): { unit: number; discount: number; total: number } {
  const material = product.materials.find((m) => m.id === materialId) ?? product.materials[0];
  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];
  const unit = product.unitPrice * material.multiplier * size.multiplier;
  const discount = bulkDiscount(qty, product.minQty);
  const total = unit * qty * (1 - discount);
  return { unit, discount, total };
}

export type PortfolioItem = {
  id: string;
  image: string;
  type: string;
  category: string;
  caption: string;
  tall: boolean;
};

export const PORTFOLIO: PortfolioItem[] = [
  { id: "pf1", image: "/images/packaging-labels.jpg", type: "Packaging", category: "packaging-labels", caption: "Kraft mailer boxes with printed labels for a clothing brand in Westlands.", tall: false },
  { id: "pf2", image: "/images/business-cards.jpg", type: "Business cards", category: "business-cards", caption: "Matte laminated business cards on 350gsm stock, ready for collection.", tall: false },
  { id: "pf3", image: "/images/flyers-brochures.jpg", type: "Flyers", category: "flyers-brochures", caption: "Full colour A5 flyers printed for a community clean-up drive.", tall: true },
  { id: "pf4", image: "/images/banners-signage.jpg", type: "Signage", category: "banners-signage", caption: "Hanging shop sign produced for a retail opening in the CBD.", tall: false },
  { id: "pf5", image: "/images/mugs-gifts.jpg", type: "Branded mugs", category: "mugs-gifts", caption: "Ceramic mugs prepared for wrap print, boxed individually for gifting.", tall: true },
  { id: "pf6", image: "/images/stickers-decals.jpg", type: "Stickers", category: "stickers-decals", caption: "Die cut vinyl laptop stickers with a matte protective laminate.", tall: false },
  { id: "pf7", image: "/images/tshirts-apparel.jpg", type: "Apparel", category: "tshirts-apparel", caption: "Blank tees on the rail, checked and counted before a bulk print run.", tall: false },
  { id: "pf8", image: "/images/event-materials.jpg", type: "Event prints", category: "event-materials", caption: "Art prints and programmes collated for a gallery event pack.", tall: true },
  { id: "pf9", image: "/images/portfolio-white-boxes.jpg", type: "Packaging", category: "packaging-labels", caption: "White mailer boxes prepared for a cosmetics product launch.", tall: false },
  { id: "pf10", image: "/images/portfolio-open-sign.jpg", type: "Signage", category: "banners-signage", caption: "Door sign with bold lettering, finished and ready to hang.", tall: true },
  { id: "pf11", image: "/images/portfolio-paper-stack.jpg", type: "Flyers", category: "flyers-brochures", caption: "Fresh stacks of printed sheets cooling before trimming and folding.", tall: false },
  { id: "pf12", image: "/images/portfolio-mug-hand.jpg", type: "Branded mugs", category: "mugs-gifts", caption: "Quality check on a printed mug order before packing and delivery.", tall: false },
];

export const TESTIMONIALS = [
  {
    name: "Wanjiru Kamau",
    role: "Owner, Kaya Skincare, Westlands",
    quote:
      "Our labels and mailer boxes finally look like the big brands. Asher Print checked my files, fixed a sizing mistake free of charge, and delivered in two days.",
    initials: "WK",
  },
  {
    name: "Otieno Odhiambo",
    role: "Marketing Lead, Savannah Tours",
    quote:
      "We order roll-ups and vehicle decals before every expo. The colours stay sharp, the stands are sturdy, and I always get a confirmed price the same morning.",
    initials: "DO",
  },
  {
    name: "Njoroge Faith",
    role: "Administrator, Brightpath Academy",
    quote:
      "Programmes, certificates and banners for our graduation were perfect. They delivered to the school gate a day early. I do not call anyone else now.",
    initials: "FW",
  },
];
