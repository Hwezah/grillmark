import type { Metadata } from "next";

import { CheckoutDetails } from "@/app/cart/details/checkout-details";

export const metadata: Metadata = {
  title: "Checkout · Delivery details",
  description:
    "Tell us where to bring your GrillMark order, then finish with Mobile Money on WhatsApp.",
};

export default function CheckoutDetailsPage() {
  return <CheckoutDetails />;
}
