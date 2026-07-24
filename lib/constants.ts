/** Brand-wide constants pulled from the GrillMark design handoff. */

export const BRAND = {
  name: "GrillMark",
  company: "Salvation Foods Ltd",
  tagline: "Marked by Flavour",
  taglineLong: "Marked by Flavour · Taste & See",
  location: "Ntinda · Kampala, Uganda",
  site: "www.grillmark.co.ug",
  siteUrl: "https://grillmark.co.ug",
} as const;

export const CONTACT = {
  whatsappNumber: "256776401100", // MoMo / WhatsApp line, digits only
  phonePrimary: "+256 776 401 100",
  phoneSecondary: "+256 751 401 198",
  emailGeneral: "grillmark@gmail.com",
  emailOrders: "orders@grillmark.co.ug",
} as const;

/** Build a wa.me deep link with a pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

export const WA_MAIN = waLink("Hi GrillMark! I'd like to place an order.");

/** The GrillMark range. Images live in /public/images. */
export type Product = {
  slug: string;
  name: string;
  category: "Beef" | "Chicken";
  weight: string;
  tagline: string;
  cook: string;
  image: string;
  blurb: string;
  featured?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    slug: "beef-franks",
    name: "Fresh Beef Franks",
    category: "Beef",
    weight: "1kg",
    tagline: "Meaty · Juicy · Flavourful",
    cook: "Grill · Roast · Fry",
    image: "/images/pack-beef-franks.png",
    blurb:
      "Classic beef franks with a proper snap — real cuts and bold seasoning, no fillers.",
    featured: true,
  },
  {
    slug: "beef-sausage",
    name: "Fresh Beef Sausage",
    category: "Beef",
    weight: "1kg",
    tagline: "Meaty · Juicy · Flavourful",
    cook: "Grill · Roast · Fry",
    image: "/images/pack-beef-sausage.png",
    blurb:
      "Coarse-ground beef sausage, seasoned to be tasted. Built for the centre of the plate.",
    featured: true,
  },
  {
    slug: "chicken-franks",
    name: "Fresh Chicken Franks",
    category: "Chicken",
    weight: "1kg",
    tagline: "Meaty · Juicy · Flavourful",
    cook: "Grill · Roast · Fry",
    image: "/images/pack-chicken-franks.png",
    blurb:
      "Lean, juicy chicken franks the whole table reaches for — a lighter link with the same mark.",
    featured: true,
  },
  {
    slug: "chicken-viennas",
    name: "Smoked Chicken Viennas",
    category: "Chicken",
    weight: "500g",
    tagline: "Meaty · Juicy · Flavourful",
    cook: "Grill · Roast · Fry",
    image: "/images/pack-chicken-viennas.png",
    blurb:
      "Gently smoked chicken viennas — tender, ready in minutes, and gone even faster.",
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured);

/** wa.me link pre-filled to order a specific product. */
export function waOrder(name: string, weight: string): string {
  return waLink(`Hi GrillMark! I'd like to order ${name} (${weight}).`);
}

/** Primary nav — hrefs point at routes; pages not yet designed fall back to /. */
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Butcher Shop", href: "/about" },
  { label: "Recipes", href: "/recipes" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/order" },
] as const;
