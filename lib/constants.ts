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

/* --------------------------------- range --------------------------------- */

export type PackSize = "500g" | "1kg";

export const PACK_SIZES: PackSize[] = ["500g", "1kg"];

/** Grams per pack, used for box-weight totals. */
export const PACK_GRAMS: Record<PackSize, number> = {
  "500g": 500,
  "1kg": 1000,
};

/** Per-100g nutrition panel shown in the product details modal. */
export type Nutrition = {
  energy: string;
  protein: string;
  fat: string;
  carbs: string;
  salt: string;
};

/** The GrillMark range (design handoff pricing). Images live in /public/images. */
export type Product = {
  slug: string;
  name: string;
  category: "Sausages" | "Franks";
  /** UGX per pack size. */
  prices: Record<PackSize, number>;
  image: string;
  blurb: string;
  /** Small pill shown over the pack shot in the details modal. */
  badge?: string;
  /** Full ingredient declaration. */
  ingredients: string;
  /** Nutrition per 100g. */
  nutrition: Nutrition;
  /** Storage / shelf-life guidance. */
  storage: string;
  /** How to cook it. */
  cooking: string;
};

const STORAGE_STD =
  "Keep refrigerated at 0–4°C. Use within 4 days of delivery, or freeze on the day for up to 1 month.";

export const PRODUCTS: Product[] = [
  {
    slug: "beef-sausages",
    name: "Beef Sausages",
    category: "Sausages",
    prices: { "500g": 17_500, "1kg": 35_000 },
    image: "/images/pack-beef-sausage.png",
    blurb:
      "Coarse-ground beef sausage, seasoned to be tasted. Built for the centre of the plate.",
    badge: "HEARTY",
    ingredients:
      "Beef (78%), water, GrillMark spice blend (salt, black pepper, garlic, herbs, natural spices), potato starch. No fillers, no MSG, no artificial colours.",
    nutrition: {
      energy: "260 kcal",
      protein: "18g",
      fat: "20g",
      carbs: "3g",
      salt: "1.8g",
    },
    storage: STORAGE_STD,
    cooking:
      "Grill or pan-fry over medium heat 12–16 min, turning often, until browned and cooked through. Rest a minute before serving.",
  },
  {
    slug: "chicken-sausages",
    name: "Chicken Sausages",
    category: "Sausages",
    prices: { "500g": 15_000, "1kg": 30_000 },
    image: "/images/pack-chicken-viennas.png",
    blurb:
      "Lighter, gently smoked and juicy — the easy-going link the whole family reaches for.",
    badge: "LEAN",
    ingredients:
      "Chicken (86%), water, GrillMark mild spice blend (salt, garlic, herbs, natural spices), potato starch. No fillers, no MSG, no artificial colours.",
    nutrition: {
      energy: "210 kcal",
      protein: "16g",
      fat: "15g",
      carbs: "3g",
      salt: "1.6g",
    },
    storage: STORAGE_STD,
    cooking:
      "Grill or pan-fry over medium heat 10–14 min, turning often, until cooked through and golden. Stays beautifully juicy.",
  },
  {
    slug: "beef-franks",
    name: "Beef Franks",
    category: "Franks",
    prices: { "500g": 16_000, "1kg": 32_000 },
    image: "/images/pack-beef-franks.png",
    blurb:
      "Classic beef franks with a proper snap — real cuts and bold seasoning, no fillers.",
    badge: "CLASSIC",
    ingredients:
      "Beef (80%), water, GrillMark spice blend (salt, black pepper, paprika, garlic), potato starch. No fillers, no MSG, no artificial colours.",
    nutrition: {
      energy: "250 kcal",
      protein: "14g",
      fat: "21g",
      carbs: "3g",
      salt: "1.9g",
    },
    storage: STORAGE_STD,
    cooking:
      "Simmer, grill or pan-fry 6–10 min until hot through with a proper snap. Great in a bun or on the board.",
  },
  {
    slug: "chicken-franks",
    name: "Chicken Franks",
    category: "Franks",
    prices: { "500g": 14_000, "1kg": 28_000 },
    image: "/images/pack-chicken-franks.png",
    blurb:
      "Lean, juicy chicken franks the whole table reaches for — a lighter link with the same mark.",
    badge: "LEAN",
    ingredients:
      "Chicken (82%), water, GrillMark mild spice blend (salt, garlic, herbs, natural spices), potato starch. No fillers, no MSG, no artificial colours.",
    nutrition: {
      energy: "190 kcal",
      protein: "15g",
      fat: "13g",
      carbs: "3g",
      salt: "1.5g",
    },
    storage: STORAGE_STD,
    cooking:
      "Simmer, grill or pan-fry 6–10 min until hot through. Lean, juicy and family-friendly.",
  },
];

/** Range entries that exist in the plan but aren't packed yet. */
export const COMING_SOON = [
  { slug: "pork-sausages", name: "Pork Sausages", category: "Pork" },
  { slug: "pork-franks", name: "Pork Franks", category: "Pork" },
  { slug: "smoked-sausages", name: "Smoked Sausages", category: "Smoked" },
] as const;

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** "UGX 17,500" — the mono-friendly format used across the design. */
export function formatUGX(amount: number): string {
  return `UGX ${amount.toLocaleString("en-US")}`;
}

/** Box discount from the design: 10% off at 4+ packs. */
export const BOX_DISCOUNT = { minPacks: 4, rate: 0.1 } as const;

/** wa.me link pre-filled to order a specific product. */
export function waOrder(name: string, size: PackSize): string {
  return waLink(`Hi GrillMark! I'd like to order ${name} (${size}).`);
}

/** wa.me link asking to be notified about a coming-soon product. */
export function waNotify(name: string): string {
  return waLink(`Hi GrillMark! Please notify me when ${name} launch.`);
}

export type OrderLine = { name: string; size: PackSize; qty: number; total: number };

/** Compose the WhatsApp order text used by the box builder, cart and order page. */
export function buildOrderMessage(
  lines: OrderLine[],
  totals: { subtotal: number; discount: number; total: number; grams: number },
  details?: { name?: string; area?: string; notes?: string }
): string {
  const parts = [
    "Hi GrillMark! I'd like to order:",
    ...lines.map(
      (l) => `• ${l.name} (${l.size}) × ${l.qty} — ${formatUGX(l.total)}`
    ),
  ];
  if (totals.discount > 0) {
    parts.push(`Subtotal: ${formatUGX(totals.subtotal)}`);
    parts.push(`Box discount (10%): -${formatUGX(totals.discount)}`);
  }
  parts.push(
    `Total: ${formatUGX(totals.total)} · ${
      totals.grams >= 1000 ? `${totals.grams / 1000}kg` : `${totals.grams}g`
    }`
  );
  if (details?.name) parts.push(`Name: ${details.name}`);
  if (details?.area) parts.push(`Delivery area: ${details.area}`);
  if (details?.notes) parts.push(`Notes: ${details.notes}`);
  return waLink(parts.join("\n"));
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
