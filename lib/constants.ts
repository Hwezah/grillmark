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

/** Primary nav — hrefs point at routes; pages not yet designed fall back to /. */
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Butcher Shop", href: "/about" },
  { label: "Recipes", href: "/recipes" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/order" },
] as const;
