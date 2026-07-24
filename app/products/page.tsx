import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <ComingSoon
      title="The Range"
      blurb="Our sausages and franks — beef and chicken, 500g and 1kg — are getting their own home here. For now, order the full range on WhatsApp."
    />
  );
}
