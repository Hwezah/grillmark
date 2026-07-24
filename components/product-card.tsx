"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import {
  formatUGX,
  waNotify,
  PACK_SIZES,
  type Product,
} from "@/lib/constants";
import { useCart } from "@/context/cart-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/** Range card from the design: pack shot, /kg price, 500g price, Add + Details. */
export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const add = (size: (typeof PACK_SIZES)[number]) => {
    addItem(product.slug, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-[22px] bg-cream-card shadow-[0_18px_40px_-30px_rgba(32,13,10,0.35)]">
      <div className="relative aspect-[10/11] overflow-hidden bg-[#EFE7D8]">
        <Image
          src={product.image}
          alt={`${product.name} pack`}
          fill
          sizes="(max-width: 620px) 90vw, (max-width: 1060px) 45vw, 300px"
          priority={priority}
          className="object-contain p-6"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-5">
        <h3 className="m-0 font-hanken text-[19px] font-semibold tracking-[-0.01em] text-ink">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="font-hanken text-[21px] font-extrabold text-brand">
            {formatUGX(product.prices["1kg"])}
          </span>
          <span className="text-[14px] text-clay">/ 1kg</span>
        </div>
        <div className="mt-1 font-mono text-[12.5px] text-clay">
          {formatUGX(product.prices["500g"])} · 500g each
        </div>

        <div className="mt-auto flex gap-2.5 pt-5">
          <button
            type="button"
            onClick={() => add("500g")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-[14.5px] font-bold text-cream-light transition-transform hover:-translate-y-0.5"
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={2} />
            {added ? "Added ✓" : "Add"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex flex-1 items-center justify-center rounded-full border-[1.5px] border-ink/15 px-5 py-3 text-[14.5px] font-bold text-ink transition-colors hover:border-ink"
          >
            Details
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>{product.blurb}</DialogDescription>
          </DialogHeader>
          <div className="relative mx-auto aspect-[10/11] w-full max-w-[240px] rounded-[16px] bg-[#EFE7D8]">
            <Image
              src={product.image}
              alt={`${product.name} pack`}
              fill
              sizes="240px"
              className="object-contain p-4"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            {PACK_SIZES.map((size) => (
              <div
                key={size}
                className="flex items-center justify-between rounded-[14px] border border-ink/10 bg-cream px-4 py-3"
              >
                <span className="font-mono text-[13px] text-clay-700">
                  {size} · {formatUGX(product.prices[size])}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    add(size);
                    setOpen(false);
                  }}
                  className="rounded-full bg-brand px-4 py-1.5 text-[13px] font-bold text-cream-light"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
          <p className="m-0 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-clay">
            Grill · Roast · Fry — sold raw &amp; ready
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/** Greyed "coming soon" range card with a WhatsApp notify link. */
export function ComingSoonCard({
  name,
}: {
  name: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[22px] bg-[#EFE9DE]">
      <div className="relative flex aspect-[10/11] flex-col items-center justify-center gap-2 text-clay">
        <span className="absolute left-5 top-5 rounded-full bg-brand-deep px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-cream-light">
          Coming soon
        </span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-8 w-8 opacity-60"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="text-[14px]">Coming soon</span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-4">
        <h3 className="m-0 font-hanken text-[19px] font-semibold tracking-[-0.01em] text-ink">
          {name}
        </h3>
        <div className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] text-clay">
          Coming soon
        </div>
        <a
          href={waNotify(name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-[14.5px] font-bold text-cream-soft transition-transform hover:-translate-y-0.5"
        >
          Notify me <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
