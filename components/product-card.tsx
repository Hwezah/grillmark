"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle, ShoppingCart, X } from "lucide-react";

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
  DialogClose,
  DialogContent,
  DialogDescription,
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
  const [size, setSize] = useState<PackSize>("500g");

  const add = (packSize: PackSize) => {
    addItem(product.slug, packSize);
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
        <DialogContent
          hideClose
          className="grid w-[min(940px,calc(100vw-28px))] max-w-[940px] max-h-[calc(100dvh-32px)] grid-cols-1 overflow-hidden overflow-y-auto rounded-[26px] border-0 bg-cream-light p-0 shadow-[0_40px_90px_-30px_rgba(20,8,6,0.6)] md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]"
        >
          <DialogClose
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream-soft/90 text-ink shadow-sm backdrop-blur transition-colors hover:bg-cream-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </DialogClose>

          {/* Left — pack shot */}
          <div className="relative flex min-h-[260px] items-center justify-center bg-[#EFE7D8] p-8 md:min-h-full">
            {product.badge && (
              <span className="absolute left-6 top-6 rounded-full bg-cream-card px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                {product.badge}
              </span>
            )}
            <div className="relative aspect-[10/11] w-full max-w-[320px]">
              <Image
                src={product.image}
                alt={`${product.name} pack`}
                fill
                sizes="(max-width: 768px) 80vw, 340px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right — details */}
          <div className="flex flex-col gap-5 p-7 sm:p-9">
            <div>
              <DialogTitle className="mb-0 text-[28px] leading-[1.1] sm:text-[30px]">
                {product.name}
              </DialogTitle>
              <div className="mt-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-hanken text-[22px] font-extrabold text-brand">
                  {formatUGX(product.prices["1kg"])}
                </span>
                <span className="font-mono text-[12.5px] text-clay">
                  / 1kg · {formatUGX(product.prices["500g"])} / 500g
                </span>
              </div>
              <DialogDescription className="mb-0 mt-3 text-[15.5px] leading-[1.55] text-clay-700">
                {product.blurb}
              </DialogDescription>
            </div>

            <hr className="border-ink/10" />

            {/* Ingredients */}
            <div>
              <h4 className="m-0 mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                Ingredients
              </h4>
              <p className="m-0 text-[15px] leading-[1.55] text-clay-700">
                {product.ingredients}
              </p>
            </div>

            {/* Nutrition */}
            <div>
              <h4 className="m-0 mb-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                Nutrition · per 100g
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {(
                  [
                    ["energy", "Energy"],
                    ["protein", "Protein"],
                    ["fat", "Fat"],
                    ["carbs", "Carbs"],
                    ["salt", "Salt"],
                  ] as const
                ).map(([key, label]) => (
                  <div
                    key={key}
                    className="rounded-[14px] border border-ink/10 bg-cream-card px-3.5 py-3"
                  >
                    <div className="font-hanken text-[18px] font-extrabold leading-none text-ink">
                      {product.nutrition[key]}
                    </div>
                    <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-clay">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage + cooking */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <h4 className="m-0 mb-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                  Storage
                </h4>
                <p className="m-0 text-[14px] leading-[1.5] text-clay-700">
                  {product.storage}
                </p>
              </div>
              <div>
                <h4 className="m-0 mb-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                  Cooking
                </h4>
                <p className="m-0 text-[14px] leading-[1.5] text-clay-700">
                  {product.cooking}
                </p>
              </div>
            </div>

            <hr className="border-ink/10" />

            {/* Size selector */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-clay">
                Choose size
              </span>
              <div className="flex gap-2">
                {PACK_SIZES.map((packSize) => {
                  const active = size === packSize;
                  return (
                    <button
                      key={packSize}
                      type="button"
                      onClick={() => setSize(packSize)}
                      aria-pressed={active}
                      className={`rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
                        active
                          ? "bg-brand text-cream-light"
                          : "border-[1.5px] border-ink/15 text-ink hover:border-ink"
                      }`}
                    >
                      {packSize} · {formatUGX(product.prices[packSize])}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => add(size)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-[15px] font-bold text-cream-light transition-colors hover:bg-brand-dark"
              >
                <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={2} />
                {added ? "Added ✓" : "Add to cart"}
              </button>
              <a
                href={waOrder(product.name, size)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1FA45A] px-5 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#188647]"
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
          Notify me <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
        </a>
      </div>
    </div>
  );
}
