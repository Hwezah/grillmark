"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";

import { formatUGX } from "@/lib/constants";
import { computeTotals, formatGrams } from "@/lib/cart-totals";
import { readDelivery, writeDelivery } from "@/lib/checkout";
import { useCart } from "@/context/cart-context";
import { CheckoutSteps } from "@/components/checkout-steps";

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  autoComplete,
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  error?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13.5px] font-bold text-ink">{label}</span>
      <input
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-[16px] border bg-white px-5 py-4 text-[16px] text-ink outline-none transition-colors placeholder:text-clay/70 focus:border-brand ${
          error ? "border-brand" : "border-ink/12"
        }`}
      />
    </label>
  );
}

export function CheckoutDetails() {
  const router = useRouter();
  const { items } = useCart();
  const totals = computeTotals(items);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [tried, setTried] = useState(false);

  // Restore anything already entered on this checkout.
  useEffect(() => {
    const saved = readDelivery();
    if (saved) {
      setName(saved.name);
      setPhone(saved.phone);
      setArea(saved.area);
    }
  }, []);

  const nameErr = tried && !name.trim();
  const phoneErr = tried && phone.replace(/\D/g, "").length < 9;
  const areaErr = tried && !area.trim();

  const onContinue = () => {
    setTried(true);
    if (!name.trim() || phone.replace(/\D/g, "").length < 9 || !area.trim())
      return;
    writeDelivery({ name: name.trim(), phone: phone.trim(), area: area.trim() });
    router.push("/cart/payment");
  };

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

        <CheckoutSteps current={1} />

        {totals.lines.length === 0 ? (
          <div className="mt-14 rounded-[24px] bg-cream-card p-[clamp(32px,5vw,56px)] text-center">
            <p className="m-0 font-hanken text-[clamp(20px,2vw,26px)] font-semibold">
              Your grill box is empty.
            </p>
            <p className="mx-auto mt-2.5 max-w-[380px] text-[15px] leading-[1.6] text-clay-600">
              Add some sausages and franks before checking out.
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
            {/* --------------------------- DETAILS --------------------------- */}
            <div className="mt-10 rounded-[24px] bg-cream-card p-[clamp(24px,3.5vw,40px)]">
              <h2 className="m-0 font-hanken text-[clamp(22px,2.2vw,28px)] font-extrabold tracking-[-0.01em]">
                Delivery details
              </h2>
              <p className="m-0 mt-1.5 text-[15px] text-clay-600">
                Where should we bring your order?
              </p>

              <div className="mt-6 grid gap-5">
                <Field
                  label="Full name"
                  placeholder="e.g. Aisha Namutebi"
                  value={name}
                  onChange={setName}
                  autoComplete="name"
                  error={nameErr}
                />
                <Field
                  label="Phone (Mobile Money number)"
                  placeholder="e.g. 0776 401 100"
                  value={phone}
                  onChange={setPhone}
                  type="tel"
                  autoComplete="tel"
                  error={phoneErr}
                />
                <Field
                  label="Delivery area"
                  placeholder="e.g. Ntinda, Kampala"
                  value={area}
                  onChange={setArea}
                  error={areaErr}
                />
              </div>

              {tried && (nameErr || phoneErr || areaErr) && (
                <p className="mt-3 text-[13.5px] font-semibold text-brand">
                  Please add your name, a valid phone number, and a delivery area.
                </p>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-ink/15 px-6 py-4 text-[15px] font-bold text-ink transition-colors hover:border-ink sm:flex-none"
                >
                  <ArrowLeft className="h-[17px] w-[17px]" aria-hidden /> Back to cart
                </Link>
                <button
                  type="button"
                  onClick={onContinue}
                  className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-brand px-6 py-4 text-[15.5px] font-extrabold text-cream-light transition-transform hover:-translate-y-0.5"
                >
                  Continue to payment <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
                </button>
              </div>
            </div>

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
                <span className="text-right font-semibold">Quoted on WhatsApp</span>
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
