import type { Metadata } from "next";

import { OrderView } from "@/app/order/order-view";

export const metadata: Metadata = {
  title: "Order & Contact",
  description:
    "Build your GrillMark order and send it on WhatsApp, reach us directly, or enquire about wholesale supply across Kampala.",
};

export default function OrderPage() {
  return <OrderView />;
}
