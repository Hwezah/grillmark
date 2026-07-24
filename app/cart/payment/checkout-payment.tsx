"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, MessageCircle, Pencil } from "lucide-react";

import { buildOrderMessage, formatUGX } from "@/lib/constants";
import { computeTotals, formatGrams } from "@/lib/cart-totals";
import { readDelivery, type Delivery } from "@/lib/checkout";
import { useCart } from "@/context/cart-context";
import { CheckoutSteps } from "@/components/checkout-steps";

export function CheckoutPayment() {
  const router = useRouter();
  const { items } = useCart();
  const totals = computeTotals(items);

  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [ready, setReady] = useState(false);

  // Delivery details are required to reach this step.
  useEffect(() => {
    const saved = readDelivery();
    if (!saved || !saved.name || !saved.phone) {
      router.replace("/cart/details");
      return;
    }
    setDelivery(saved);
    setReady(true);
  }, [router]);

  const waHref = delivery
    ? buildOrderMessage(totals.lines, totals, {
        name: delivery.name,
        area: delivery.area,
        notes: `Mobile Money: ${delivery.phone}`,
      })
    : undefined;

  return (
    <div className="min-h-screen bg-cream px-[clamp(18px,4vw,46px)] pb-[clamp(64px,8vw,108px)] pt-[132px] text-ink">
      <div className="mx-auto max-w-[880px]">
        <nav className="font-mono text-[12px] uppercase tracking-[0.14em] text-clay">
          <Link href="/products" className="transition-colors hover:text-brand">
            Shop
          </Link>
          <span className="mx-2 text-ink/30">/</span>
          <Link href="/cart" className="transition-colors hover:text-brand">
            Cart
          </Link>
        </nav>
        <h1 className="m-0 mt-3 font-hanken text-[clamp(38px,5.5vw,64px)] font-extrabold uppercase leading-none tracking-[-0.03em]">
          Your cart
        </h1>

        <CheckoutSteps current={2} />

        {totals.lines.length === 0 ? (
          <div className="mt-14 rounded-[24px] bg-cream-card p-[clamp(32px,5vw,56px)] text-center">
            <p className="m-0 font-hanken text-[clamp(20px,2vw,26px)] font-semibold">
              Your grill box is empty.
            </p>
            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-brand px-8 py-[15px] text-[15px] font-extrabold text-cream-light transition-transform hover:-translate-y-0.5"
            >
              Browse the range
            </Link>
          </div>
        ) : !ready ? null : (
          <>
            {/* --------------------------- PAYMENT --------------------------- */}
            <div className="mt-10 rounded-[24px] bg-cream-card p-[clamp(24px,3.5vw,40px)]">
              <h2 className="m-0 font-hanken text-[clamp(22px,2.2vw,28px)] font-extrabold tracking-[-0.01em]">
                Payment
              </h2>
              <p className="m-0 mt-1.5 text-[15px] leading-[1.6] text-clay-600">
                We take payment on Mobile Money. Send your order on WhatsApp and
                we&apos;ll confirm the total, delivery, and a payment prompt to
                your phone.
              </p>

              {/* Delivery recap */}
              <div className="mt-6 rounded-[16px] border border-ink/[0.08] bg-cream p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-clay">
                    Delivering to
                  </span>
                  <Link
                    href="/cart/details"
                    className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand transition-colors hover:text-brand-dark"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Link>
                </div>
                <div className="grid gap-1 text-[15px]">
                  <div className="font-semibold">{delivery?.name}</div>
                  <div className="text-clay-700">{delivery?.phone}</div>
                  <div className="text-clay-700">{delivery?.area}</div>
                </div>
              </div>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2.5 rounded-[16px] bg-[#1FAD52] px-6 py-[17px] text-[16px] font-extrabold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-[18px] w-[18px]" strokeWidth={2} />
                Place order on WhatsApp
              </a>
              <Link
                href="/cart/details"
                className="mt-3 flex items-center justify-center gap-2 text-[14.5px] font-bold text-ink transition-colors hover:text-brand"
              >
                <ArrowLeft className="h-[17px] w-[17px]" aria-hidden /> Back to details
              </Link>
            </div>

            {/* --------------------------- SUMMARY --------------------------- */}
            <div className="mt-8 rounded-[24px] bg-cream-card p-[clamp(24px,3.5vw,40px)]">
              <h2 className="m-0 font-hanken text-[clamp(19px,1.8vw,24px)] font-bold">
                Order summary
              </h2>
              <div className="mt-5 grid gap-2.5 border-b border-ink/[0.08] pb-4">
                {totals.lines.map((l) => (
                  <div
                    key={`${l.slug}-${l.size}`}
                    className="flex items-baseline justify-between gap-4 text-[15px]"
                  >
                    <span className="text-clay-800">
                      {l.name} ({l.size}) × {l.qty}
                    </span>
                    <span className="font-semibold">{formatUGX(l.total)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-baseline justify-between text-[15.5px]">
                <span className="text-clay-700">Subtotal</span>
                <span className="font-bold">{formatUGX(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="mt-2 flex items-baseline justify-between text-[15.5px]">
                  <span className="text-clay-700">Box discount (10%)</span>
                  <span className="font-bold text-brand">
                    -{formatUGX(totals.discount)}
                  </span>
                </div>
              )}
              <div className="mt-4 flex items-start justify-between border-t border-ink/[0.08] pt-4">
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
              <p className="m-0 mt-6 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-clay">
                <Lock className="h-3.5 w-3.5" /> Secure Mobile Money checkout
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
