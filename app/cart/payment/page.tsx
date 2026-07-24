import type { Metadata } from "next";

import { CheckoutPayment } from "@/app/cart/payment/checkout-payment";

export const metadata: Metadata = {
  title: "Checkout · Payment",
  description:
    "Finish your GrillMark order with Mobile Money on WhatsApp — we confirm the total and delivery.",
};

export default function CheckoutPaymentPage() {
  return <CheckoutPayment />;
}
