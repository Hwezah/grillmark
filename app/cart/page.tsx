import type { Metadata } from "next";

import { CartView } from "@/app/cart/cart-view";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your GrillMark grill box and check out with Mobile Money via WhatsApp.",
};

export default function CartPage() {
  return <CartView />;
}
