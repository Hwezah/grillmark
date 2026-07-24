"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, ShoppingCart } from "lucide-react";

import { PRODUCTS, formatUGX, waOrder } from "@/lib/constants";
import { useCart } from "@/context/cart-context";
import { Reveal } from "@/components/reveal";

/** Home range strip: four cards with Add-to-cart + a WhatsApp quick-order dot. */
export function HomeRange() {
  const { addItem } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  const add = (slug: string) => {
    addItem(slug, "500g");
    setAdded(slug);
    window.setTimeout(() => setAdded(null), 1200);
  };

  return (
    <div className="grid grid-cols-4 gap-[clamp(14px,1.8vw,24px)] max-[1020px]:grid-cols-2 max-[540px]:grid-cols-1">
      {PRODUCTS.map((p, i) => (
        <Reveal
          key={p.slug}
          delay={i * 80}
          className="flex flex-col overflow-hidden rounded-[20px] border border-ink/[0.06] bg-cream-card shadow-[0_18px_40px_-32px_rgba(32,13,10,0.4)]"
        >
          <div className="relative aspect-square overflow-hidden bg-[#EFE7D8]">
            <Image
              src={p.image}
              alt={`${p.name} pack`}
              fill
              sizes="(max-width: 540px) 90vw, (max-width: 1020px) 45vw, 260px"
              className="object-contain p-5"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="m-0 font-hanken text-[17px] font-semibold text-ink">
              {p.name}
            </h3>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="font-hanken text-[19px] font-extrabold text-brand">
                {formatUGX(p.prices["1kg"])}
              </span>
              <span className="text-[13px] text-clay">/ 1kg</span>
            </div>
            <div className="mt-0.5 font-mono text-[11.5px] text-clay">
              {formatUGX(p.prices["500g"])} · 500g
            </div>
            <div className="mt-auto flex items-center gap-2 pt-4">
              <button
                type="button"
                onClick={() => add(p.slug)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-[13.5px] font-bold text-cream-light transition-transform hover:-translate-y-0.5"
              >
                <ShoppingCart className="h-4 w-4" strokeWidth={2} />
                {added === p.slug ? "Added ✓" : "Add to cart"}
              </button>
              <a
                href={waOrder(p.name, "500g")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Order ${p.name} on WhatsApp`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1FAD52] text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-[18px] w-[18px]" strokeWidth={2} />
              </a>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
