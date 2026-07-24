import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Your Grill Box" };

export default function CartPage() {
  return (
    <ComingSoon
      title="Your Grill Box"
      blurb="Your cart and checkout land here once the Products page is wired up. It'll sync to your account so your box follows you across devices."
    />
  );
}
