"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Lock, Trash2 } from "lucide-react";

import { buildOrderMessage, formatUGX } from "@/lib/constants";
import { computeTotals, formatGrams } from "@/lib/cart-totals";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

const STEPS = ["Cart", "Details", "Payment"];

export function CartView() {
  const { items, setQty, removeItem } = useCart();
  const totals = computeTotals(items);

  const [promo, setPromo] = useState("");
  const [promoNote, setPromoNote] = useState("");

  const applyPromo = () => {
    if (!promo.trim()) return;
    setPromoNote(
      `We'll apply "${promo.trim().toUpperCase()}" when we confirm your order on WhatsApp.`
    );
  };

  return (
    <div className="min-h-screen bg-cream px-[clamp(18px,4vw,46px)] pb-[clamp(64px,8vw,108px)] pt-[132px] text-ink">
      <div className="mx-auto max-w-[880px]">
        {/* Breadcrumb + title + stepper */}
        <nav className="font-mono text-[12px] uppercase tracking-[0.14em] text-clay">
          <Link href="/products" className="transition-colors hover:text-brand">
            Shop
          </Link>
          <span className="mx-2 text-ink/30">/</span>
          <span className="text-brand">Cart</span>
        </nav>
        <h1 className="m-0 mt-3 font-hanken text-[clamp(38px,5.5vw,64px)] font-extrabold uppercase leading-none tracking-[-0.03em]">
          Your cart
        </h1>

        <ol className="m-0 mt-6 flex list-none items-center gap-0 p-0">
          {STEPS.map((step, i) => (
            <li key={step} className="flex items-center">
              <span className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full font-mono text-[12.5px] font-bold",
                    i === 0
                      ? "bg-brand text-cream-light"
                      : "bg-ink/[0.08] text-clay"
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={cn(
                    "text-[14.5px] font-semibold",
                    i === 0 ? "text-ink" : "text-clay"
                  )}
                >
                  {step}
                </span>
              </span>
              {i < STEPS.length - 1 && (
                <span aria-hidden className="mx-4 h-px w-[clamp(20px,5vw,56px)] bg-ink/15" />
              )}
            </li>
          ))}
        </ol>

        {totals.lines.length === 0 ? (
          /* ----------------------------- EMPTY ----------------------------- */
          <div className="mt-14 rounded-[24px] bg-cream-card p-[clamp(32px,5vw,56px)] text-center">
            <p className="m-0 font-hanken text-[clamp(20px,2vw,26px)] font-semibold">
              Your grill box is empty.
            </p>
            <p className="mx-auto mt-2.5 max-w-[380px] text-[15px] leading-[1.6] text-clay-600">
              Stack some sausages and franks into it — we&apos;ll keep the cold
              chain ready.
            </p>
            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-brand px-8 py-[15px] text-[15px] font-extrabold text-cream-light transition-transform hover:-translate-y-0.5"
            >
              Browse the range <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
            </Link>
          </div>
        ) : (
          <>
            {/* ----------------------------- ITEMS ----------------------------- */}
            <div className="mt-10 overflow-hidden rounded-[20px] bg-cream-card">
              <div className="flex items-center justify-between bg-[#F2EBDD] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-clay-700">
                <span>Product</span>
                <span className="flex gap-10 max-[560px]:hidden">
                  <span>Quantity</span>
                  <span>Total</span>
                </span>
              </div>

              {totals.lines.map((l) => (
                <div
                  key={`${l.slug}-${l.size}`}
                  className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink/[0.06] px-6 py-5"
                >
                  <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[12px] bg-[#EFE7D8]">
                    <Image
                      src={l.image}
                      alt={`${l.name} pack`}
                      fill
                      sizes="72px"
                      className="object-contain p-1.5"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-hanken text-[17px] font-semibold">
                      {l.name}
                    </div>
                    <div className="mt-1 font-mono text-[12px] text-clay">
                      {l.size} pack · {formatUGX(l.unit)} each
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(l.slug, l.size)}
                      className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold text-brand transition-colors hover:text-brand-dark"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-1.5 py-1">
                    <button
                      type="button"
                      aria-label={`Remove one ${l.name}`}
                      onClick={() => setQty(l.slug, l.size, l.qty - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[16px] font-bold text-ink transition-colors hover:bg-ink/[0.06]"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-mono text-[14.5px] font-bold">
                      {l.qty}
                    </span>
                    <button
                      type="button"
                      aria-label={`Add one ${l.name}`}
                      onClick={() => setQty(l.slug, l.size, l.qty + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[16px] font-bold text-cream-light"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-[110px] text-right font-hanken text-[17px] font-extrabold text-ink max-[560px]:w-auto">
                    {formatUGX(l.total)}
                  </div>
                </div>
              ))}
            </div>

            {/* ---------------------- CONTINUE + PROMO ---------------------- */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-[15px] font-bold text-ink transition-colors hover:text-brand"
              >
                <ArrowLeft className="h-[17px] w-[17px]" aria-hidden /> Continue shopping
              </Link>
              <div className="flex items-center overflow-hidden rounded-full border border-ink/10 bg-white pl-5">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="PROMO CODE"
                  className="w-[130px] bg-transparent py-3 font-mono text-[12.5px] uppercase tracking-[0.08em] text-ink outline-none placeholder:text-clay"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  className="m-1 rounded-full bg-cocoa px-5 py-2 text-[13.5px] font-bold text-cream-soft"
                >
                  Apply
                </button>
              </div>
            </div>
            {promoNote && (
              <p className="mt-2.5 text-right font-mono text-[12px] text-clay-700">
                {promoNote}
              </p>
            )}

            {/* --------------------------- SUMMARY --------------------------- */}
            <div className="mt-8 rounded-[24px] bg-cream-card p-[clamp(24px,3.5vw,40px)]">
              <h2 className="m-0 font-hanken text-[clamp(19px,1.8vw,24px)] font-bold">
                Order summary
              </h2>

              <div className="mt-5 flex items-baseline justify-between border-b border-ink/[0.08] pb-3.5 text-[15.5px]">
                <span className="text-clay-700">Subtotal</span>
                <span className="font-bold">{formatUGX(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex items-baseline justify-between border-b border-ink/[0.08] py-3.5 text-[15.5px]">
                  <span className="text-clay-700">Box discount (10%)</span>
                  <span className="font-bold text-brand">
                    -{formatUGX(totals.discount)}
                  </span>
                </div>
              )}
              <div className="flex items-baseline justify-between border-b border-ink/[0.08] py-3.5 text-[15.5px]">
                <span className="text-clay-700">Delivery</span>
                <span className="text-right font-semibold">
                  Quoted on
                  <br className="min-[480px]:hidden" /> WhatsApp
                </span>
              </div>

              <div className="mt-4 flex items-start justify-between">
                <span className="pt-1.5 text-[16px] font-bold">Total</span>
                <span className="text-right">
                  <span className="block font-anton text-[clamp(28px,3.4vw,40px)] leading-none text-brand">
                    {formatUGX(totals.total)}
                  </span>
                  <span className="mt-1.5 block font-mono text-[12px] text-clay">
                    {formatGrams(totals.grams)} total
                  </span>
                </span>
              </div>

              {totals.packsToDiscount > 0 && (
                <div className="mt-5 rounded-[12px] border border-[#E8C46A] bg-[#FDF6E3] px-4 py-3 text-[14px] text-[#8a6d1d]">
                  Add {totals.packsToDiscount} more pack
                  {totals.packsToDiscount > 1 ? "s" : ""} to unlock 10% off.
                </div>
              )}

              <a
                href={buildOrderMessage(totals.lines, totals)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2.5 rounded-[16px] bg-brand px-6 py-[17px] text-[16px] font-extrabold text-cream-light transition-transform hover:-translate-y-0.5"
              >
                Proceed to checkout <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
              </a>
              <p className="m-0 mt-4 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-clay">
                <Lock className="h-3.5 w-3.5" /> Secure Mobile Money checkout
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
