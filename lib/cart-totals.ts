import {
  BOX_DISCOUNT,
  PACK_GRAMS,
  productBySlug,
  type OrderLine,
  type PackSize,
} from "@/lib/constants";
import type { CartItem } from "@/context/cart-context";

export interface CartTotals {
  lines: (OrderLine & { slug: string; image: string; unit: number })[];
  packs: number;
  grams: number;
  subtotal: number;
  discount: number;
  total: number;
  /** Packs still needed to unlock the 10% box discount (0 = unlocked). */
  packsToDiscount: number;
}

/** Price up the cart: line totals, weight, and the 4-pack 10% box discount. */
export function computeTotals(items: CartItem[]): CartTotals {
  const lines = items.flatMap((i) => {
    const product = productBySlug(i.productId);
    if (!product || i.qty <= 0) return [];
    const size = i.size as PackSize;
    const unit = product.prices[size];
    return [
      {
        slug: product.slug,
        image: product.image,
        name: product.name,
        size,
        qty: i.qty,
        unit,
        total: unit * i.qty,
      },
    ];
  });

  const packs = lines.reduce((n, l) => n + l.qty, 0);
  const grams = lines.reduce((n, l) => n + PACK_GRAMS[l.size] * l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.total, 0);
  const discount =
    packs >= BOX_DISCOUNT.minPacks
      ? Math.round(subtotal * BOX_DISCOUNT.rate)
      : 0;

  return {
    lines,
    packs,
    grams,
    subtotal,
    discount,
    total: subtotal - discount,
    packsToDiscount: Math.max(0, BOX_DISCOUNT.minPacks - packs),
  };
}

export function formatGrams(grams: number): string {
  return grams >= 1000 ? `${grams / 1000}kg` : `${grams}g`;
}
