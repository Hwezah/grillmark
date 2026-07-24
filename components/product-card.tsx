"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, ShoppingCart } from "lucide-react";

import {
  formatUGX,
  waNotify,
  waOrder,
  PACK_SIZES,
  type PackSize,
  type Product,
} from "@/lib/constants";
import { useCart } from "@/context/cart-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const label =
  "font-mono text-[11.5px] uppercase tracking-[0.14em] text-brand-deep";

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
  const [size, setSize] = useState<PackSize>("500g");
  const [added, setAdded] = useState(false);

  const add = (s: PackSize) => {
    addItem(product.slug, s);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  const n = product.nutrition;
  const tiles = [
    { value: `${n.kcal} kcal`, label: "Energy" },
    { value: n.protein, label: "Protein" },
    { value: n.fat, label: "Fat" },
    { value: n.carbs, label: "Carbs" },
    { value: n.salt, label: "Salt" },
  ];

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

      {/* ------------------------- DETAILS MODAL ------------------------- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="grid max-h-[90svh] w-[min(1040px,calc(100vw-24px))] max-w-none grid-cols-[0.42fr_0.58fr] overflow-y-auto rounded-[24px] border-none bg-cream p-0 max-[820px]:grid-cols-1">
          {/* Left — pack shot panel */}
          <div className="relative bg-[#F0EBDF] max-[820px]:min-h-[280px]">
            <span className="absolute left-6 top-6 z-10 rounded-full bg-cream-card px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-clay-700 shadow-[0_6px_16px_-8px_rgba(32,13,10,0.3)]">
              {product.badge}
            </span>
            <div className="sticky top-0 flex h-full min-h-[420px] items-center justify-center p-8 max-[820px]:min-h-[280px] max-[820px]:p-5">
              <div className="relative aspect-[10/12] w-full max-w-[340px]">
                <Image
                  src={product.image}
                  alt={`${product.name} pack`}
                  fill
                  sizes="(max-width: 820px) 60vw, 340px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right — details */}
          <div className="p-[clamp(22px,3vw,36px)] pr-[clamp(22px,3.4vw,44px)]">
            <DialogTitle className="m-0 mb-0 pr-12 font-hanken text-[clamp(24px,2.4vw,32px)] font-bold tracking-[-0.02em] text-ink">
              {product.name}
            </DialogTitle>

            <div className="mt-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="font-hanken text-[clamp(21px,2vw,26px)] font-extrabold text-brand">
                {formatUGX(product.prices["1kg"])}
              </span>
              <span className="font-mono text-[13px] text-clay">
                / 1kg · {formatUGX(product.prices["500g"])} / 500g
              </span>
            </div>

            <DialogDescription className="m-0 mt-4 text-[15.5px] leading-[1.6] text-clay-800">
              {product.description}
            </DialogDescription>

            <hr className="my-5 border-ink/[0.08]" />

            <div className={label}>Ingredients</div>
            <p className="m-0 mt-2 text-[14px] leading-[1.62] text-clay-800">
              {product.ingredients}
            </p>

            <div className={`${label} mt-5`}>Nutrition · Per 100g</div>
            <div className="mt-2.5 grid grid-cols-3 gap-2.5 max-[480px]:grid-cols-2">
              {tiles.map((t) => (
                <div
                  key={t.label}
                  className="rounded-[12px] border border-ink/[0.07] bg-white px-4 py-3"
                >
                  <div className="font-hanken text-[17px] font-bold text-ink">
                    {t.value}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-clay">
                    {t.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-5 max-[480px]:grid-cols-1">
              <div>
                <div className={label}>Storage</div>
                <p className="m-0 mt-2 text-[13.5px] leading-[1.6] text-clay-800">
                  {product.storage}
                </p>
              </div>
              <div>
                <div className={label}>Cooking</div>
                <p className="m-0 mt-2 text-[13.5px] leading-[1.6] text-clay-800">
                  {product.cooking}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-clay">
                Choose size
              </span>
              <div className="flex gap-2">
                {PACK_SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn(
                      "rounded-full px-4 py-2 text-[13.5px] font-bold transition-colors",
                      s === size
                        ? "bg-brand text-cream-light"
                        : "border-[1.5px] border-ink/15 text-ink hover:border-ink"
                    )}
                  >
                    {s} · {formatUGX(product.prices[s])}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-[1.1fr_0.9fr] gap-3 max-[480px]:grid-cols-1">
              <button
                type="button"
                onClick={() => {
                  add(size);
                  setOpen(false);
                }}
                className="inline-flex items-center justify-center gap-2.5 rounded-[14px] bg-brand px-6 py-4 text-[15.5px] font-extrabold text-cream-light transition-transform hover:-translate-y-0.5"
              >
                <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={2} />
                Add to cart
              </button>
              <a
                href={waOrder(product.name, size)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-[14px] bg-[#1FAD52] px-6 py-4 text-[15.5px] font-extrabold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-[18px] w-[18px]" strokeWidth={2} />
                Order now
              </a>
            </div>
          </div>
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
