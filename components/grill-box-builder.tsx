"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import {
  buildOrderMessage,
  formatUGX,
  PRODUCTS,
  type PackSize,
} from "@/lib/constants";
import { computeTotals, formatGrams } from "@/lib/cart-totals";
import { useCart } from "@/context/cart-context";
import { QtyStepper } from "@/components/qty-stepper";
import { cn } from "@/lib/utils";

/**
 * "Build your grill box" from the Products design — a size toggle, one stepper
 * row per product, and a dark live summary. Operates directly on the shared
 * cart so the navbar badge and /cart stay in sync.
 */
export function GrillBoxBuilder() {
  const { items, setQty } = useCart();
  const [size, setSize] = useState<PackSize>("500g");
  const totals = computeTotals(items);

  const qtyOf = (slug: string) =>
    items.find((i) => i.productId === slug && i.size === size)?.qty ?? 0;

  return (
    <div className="mx-auto grid max-w-[1080px] gap-6">
      {/* Pack picker */}
      <div className="rounded-[24px] bg-cream-card p-[clamp(22px,3vw,34px)]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-clay-700">
            Add your packs
          </span>
          <div className="flex gap-2">
            {(["500g", "1kg"] as PackSize[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "rounded-full px-5 py-2 text-[14px] font-bold transition-colors",
                  s === size
                    ? "bg-brand text-cream-light"
                    : "border-[1.5px] border-ink/15 text-ink hover:border-ink"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {PRODUCTS.map((p) => {
            const qty = qtyOf(p.slug);
            return (
              <div
                key={p.slug}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-[16px] border px-5 py-4 transition-colors",
                  qty > 0
                    ? "border-brand/40 bg-brand/[0.05]"
                    : "border-ink/[0.08] bg-cream"
                )}
              >
                <div>
                  <div className="font-hanken text-[16.5px] font-semibold text-ink">
                    {p.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[12px] text-clay">
                    {formatUGX(p.prices[size])} · {size} pack
                  </div>
                </div>
                <QtyStepper
                  value={qty}
                  onChange={(n) => setQty(p.slug, size, n)}
                  label={`${p.name} ${size}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Live summary */}
      <div className="rounded-[24px] bg-cocoa p-[clamp(22px,3vw,34px)] text-cream-soft">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-tan">
            Your grill box
          </span>
          <span className="text-right font-mono text-[12px] text-[#9a877d]">
            {totals.grams > 0 ? `${formatGrams(totals.grams)} total` : "Empty"}
          </span>
        </div>

        {totals.lines.length > 0 ? (
          <div className="mt-4 grid gap-2 border-b border-white/10 pb-4">
            {totals.lines.map((l) => (
              <div
                key={`${l.slug}-${l.size}`}
                className="flex items-baseline justify-between gap-4 text-[15px]"
              >
                <span>
                  {l.name} ({l.size}) × {l.qty}
                </span>
                <span className="font-semibold">{formatUGX(l.total)}</span>
              </div>
            ))}
            <div className="mt-1 flex items-baseline justify-between text-[14px] text-[#CDB6A8]">
              <span>Subtotal</span>
              <span>{formatUGX(totals.subtotal)}</span>
            </div>
            {totals.discount > 0 && (
              <div className="flex items-baseline justify-between text-[14px] text-dot">
                <span>Box discount (10%)</span>
                <span>-{formatUGX(totals.discount)}</span>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-4 border-b border-white/10 pb-4 text-[15px] text-[#9a877d]">
            Use the steppers above to stack packs into your box.
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-tan">
            Box total
          </span>
          <span className="font-anton text-[clamp(26px,3vw,34px)] leading-none text-ember">
            {formatUGX(totals.total)}
          </span>
        </div>
        {totals.packsToDiscount > 0 && totals.packs > 0 && (
          <p className="mt-2 text-[13.5px] text-[#CDB6A8]">
            Add {totals.packsToDiscount} more pack
            {totals.packsToDiscount > 1 ? "s" : ""} to unlock 10% off.
          </p>
        )}

        <a
          href={
            totals.lines.length
              ? buildOrderMessage(totals.lines, totals)
              : undefined
          }
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!totals.lines.length}
          className={cn(
            "mt-5 flex items-center justify-center gap-2.5 rounded-[16px] px-6 py-4 text-[16px] font-extrabold transition-transform",
            totals.lines.length
              ? "bg-[#1FAD52] text-white hover:-translate-y-0.5"
              : "pointer-events-none bg-white/10 text-white/40"
          )}
        >
          <span className="h-[7px] w-[7px] rounded-full bg-dot shadow-[0_0_0_3px_rgba(123,227,139,0.3)]" />
          Order my box on WhatsApp <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
        </a>
      </div>
    </div>
  );
}
