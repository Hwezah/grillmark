import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Contact & Orders" };

export default function OrderPage() {
  return (
    <ComingSoon
      title="Get in Touch"
      blurb="Contact and the Mobile Money checkout flow live here soon. For now, reach us on WhatsApp to place an order."
    />
  );
}
