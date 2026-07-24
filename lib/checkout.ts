/** Delivery details captured at checkout, carried between the steps. */
export type Delivery = { name: string; phone: string; area: string };

const KEY = "gm-checkout";

export function readDelivery(): Delivery | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Partial<Delivery>;
    return {
      name: d.name ?? "",
      phone: d.phone ?? "",
      area: d.area ?? "",
    };
  } catch {
    return null;
  }
}

export function writeDelivery(d: Delivery) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    /* storage may be unavailable — non-fatal */
  }
}
