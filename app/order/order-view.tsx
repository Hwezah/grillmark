"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Download,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";

import {
  BRAND,
  CONTACT,
  PACK_SIZES,
  PRODUCTS,
  buildOrderMessage,
  formatUGX,
  waLink,
} from "@/lib/constants";
import { computeTotals, formatGrams } from "@/lib/cart-totals";
import { REVIEWS } from "@/lib/reviews";
import { useCart } from "@/context/cart-context";
import { QtyStepper } from "@/components/qty-stepper";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const eyebrow =
  "font-mono text-[12.5px] uppercase tracking-[0.16em] text-brand-deep";

/* --------------------------------- FAQ data -------------------------------- */

const FAQS = [
  {
    q: "Are GrillMark sausages sold raw?",
    a: "Yes — every pack leaves us raw and ready, packed cold. We get the cuts and seasoning right; the grill, the char and the timing stay yours.",
  },
  {
    q: "How do I place an order?",
    a: "Build your box on this page or on Products, then send it on WhatsApp. We confirm the total, delivery fee and a delivery slot in minutes — payment is by Mobile Money.",
  },
  {
    q: "Do you deliver across Kampala?",
    a: "Yes — we run cold-chain delivery across Kampala and surrounding areas. The delivery fee depends on your zone and is quoted when we confirm on WhatsApp.",
  },
  {
    q: "How should I store the sausages?",
    a: "Keep them frozen until the day you cook. In the fridge, cook within 48 hours of thawing. Never refreeze a fully thawed pack.",
  },
  {
    q: "What's in the spice blend?",
    a: "Real cuts and our house spice blend — no fillers. Allergen note: our sausages and franks contain wheat; viennas also contain milk.",
  },
  {
    q: "Can I mix sausages and franks in one order?",
    a: "Absolutely — that's the grill box. Mix any packs you like, and when your box hits 4 packs or more, 10% comes off automatically.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-[18px] bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-hanken text-[16.5px] font-bold text-ink">
          {q}
        </span>
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-soft text-ink transition-transform",
            open && "rotate-45"
          )}
        >
          <Plus className="h-4.5 w-4.5" strokeWidth={2.4} />
        </span>
      </button>
      {open && (
        <p className="m-0 px-6 pb-5 text-[14.5px] leading-[1.65] text-clay-700">
          {a}
        </p>
      )}
    </div>
  );
}

/* ---------------------------- wholesale enquiry ---------------------------- */

const BIZ_TYPES = ["Restaurant", "Hotel", "Café", "Caterer", "Supermarket", "Other"];

function WholesaleForm() {
  const [biz, setBiz] = useState("");
  const [person, setPerson] = useState("");
  const [location, setLocation] = useState("");
  const [volume, setVolume] = useState("");
  const [type, setType] = useState("");
  const [interest, setInterest] = useState("");

  const href = waLink(
    [
      "Hi GrillMark! Wholesale enquiry:",
      biz && `• Business: ${biz}`,
      person && `• Contact: ${person}`,
      location && `• Location: ${location}`,
      volume && `• Est. monthly volume: ${volume}`,
      type && `• Type: ${type}`,
      interest && `• Interested in: ${interest}`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  const field =
    "w-full rounded-[14px] border border-white/15 bg-white/[0.04] px-4 py-3.5 text-[15px] text-cream-soft outline-none placeholder:text-[#8d7a70] focus:border-ember";

  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-[clamp(20px,3vw,32px)]">
      <div className="mb-5 font-mono text-[12px] uppercase tracking-[0.14em] text-tan">
        Wholesale enquiry
      </div>
      <div className="grid gap-3">
        <input className={field} placeholder="Business name" value={biz} onChange={(e) => setBiz(e.target.value)} />
        <input className={field} placeholder="Contact person" value={person} onChange={(e) => setPerson(e.target.value)} />
        <input className={field} placeholder="Location (area / town)" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input className={field} placeholder="Est. monthly volume (e.g. 50kg)" value={volume} onChange={(e) => setVolume(e.target.value)} />
      </div>

      <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8d7a70]">
        Type of business
      </div>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {BIZ_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={cn(
              "rounded-full px-4 py-2 text-[13.5px] font-bold transition-colors",
              type === t
                ? "bg-brand text-cream-light"
                : "border border-white/20 text-cream-soft hover:border-white/50"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <textarea
        className={`${field} mt-4 min-h-[90px] resize-y`}
        placeholder="Products of interest — e.g. beef sausages, chicken franks…"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
      />

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-2.5 rounded-[16px] bg-ember px-6 py-4 text-[15.5px] font-extrabold text-white transition-transform hover:-translate-y-0.5"
      >
        Send enquiry on WhatsApp <span aria-hidden>→</span>
      </a>
      <p className="m-0 mt-3.5 text-center text-[13px] text-[#8d7a70]">
        Prefer email?{" "}
        <a href={`mailto:${CONTACT.emailOrders}`} className="text-tan underline-offset-2 hover:underline">
          {CONTACT.emailOrders}
        </a>
      </p>
    </div>
  );
}

/* --------------------------------- the page -------------------------------- */

export function OrderView() {
  const { items, setQty } = useCart();
  const totals = computeTotals(items);

  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [notes, setNotes] = useState("");

  const qtyOf = (slug: string, size: (typeof PACK_SIZES)[number]) =>
    items.find((i) => i.productId === slug && i.size === size)?.qty ?? 0;

  const waHref = totals.lines.length
    ? buildOrderMessage(totals.lines, totals, { name, area, notes })
    : waLink("Hi GrillMark! I'd like to place an order.");

  const field =
    "w-full rounded-[14px] border border-ink/10 bg-cream px-4 py-3.5 text-[15px] text-ink outline-none placeholder:text-clay focus:border-brand";

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      {/* ------------------------------- HERO ------------------------------- */}
      <header className="px-[clamp(18px,4vw,46px)] pb-[clamp(24px,3vw,40px)] pt-[152px]">
        <div className="mx-auto max-w-[880px]">
          <Reveal className="mb-5 inline-flex items-center gap-2.5">
            <span className={eyebrow}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ember align-middle" />
              Order &amp; Contact
            </span>
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            className="m-0 font-hanken text-[clamp(40px,6.5vw,88px)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em]"
          >
            Build your <span className="text-brand">order</span>
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mt-5 max-w-[560px] text-[clamp(16px,1.35vw,19px)] leading-[1.65] text-clay-700"
          >
            Pick what you want, add the details, and we&apos;ll open WhatsApp
            with your order written out — ready to send.
          </Reveal>
        </div>
      </header>

      {/* ---------------------------- ORDER BUILDER --------------------------- */}
      <section className="px-[clamp(18px,4vw,46px)] pb-[clamp(24px,3vw,36px)]">
        <div className="mx-auto max-w-[880px] rounded-[24px] bg-cream-card p-[clamp(22px,3vw,36px)]">
          <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-clay-700">
            1 · Choose your items
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
            {PRODUCTS.map((p) => {
              const active = PACK_SIZES.some((s) => qtyOf(p.slug, s) > 0);
              return (
                <div
                  key={p.slug}
                  className={cn(
                    "rounded-[18px] border p-5 transition-colors",
                    active
                      ? "border-brand/40 bg-brand/[0.045]"
                      : "border-ink/[0.08] bg-cream"
                  )}
                >
                  <div className="font-hanken text-[17px] font-bold">
                    {p.name}
                  </div>
                  <div className="mt-3 grid gap-2.5">
                    {PACK_SIZES.map((size) => (
                      <div
                        key={size}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="font-mono text-[12.5px] text-clay-700">
                          {size} · {formatUGX(p.prices[size])}
                        </span>
                        <QtyStepper
                          value={qtyOf(p.slug, size)}
                          onChange={(n) => setQty(p.slug, size, n)}
                          label={`${p.name} ${size}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-clay-700">
            2 · Your details
          </div>
          <div className="mt-4 grid gap-3">
            <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className={field} placeholder="Delivery area (e.g. Ntinda)" value={area} onChange={(e) => setArea(e.target.value)} />
            <textarea
              className={`${field} min-h-[96px] resize-y`}
              placeholder="Notes — preferred delivery time, landmarks, anything else"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3.5 max-[640px]:grid-cols-1">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center gap-2.5 rounded-[16px] px-6 py-4 text-[15.5px] font-extrabold transition-transform",
                totals.lines.length
                  ? "bg-[#1FAD52] text-white hover:-translate-y-0.5"
                  : "pointer-events-none bg-ink/[0.07] text-clay"
              )}
            >
              <span className="h-[7px] w-[7px] rounded-full bg-dot shadow-[0_0_0_3px_rgba(123,227,139,0.3)]" />
              Send order on WhatsApp <span aria-hidden>→</span>
            </a>
            <Link
              href="/cart"
              className={cn(
                "flex items-center justify-center gap-2.5 rounded-[16px] px-6 py-4 text-[15.5px] font-extrabold transition-transform",
                totals.lines.length
                  ? "bg-brand text-cream-light hover:-translate-y-0.5"
                  : "pointer-events-none bg-ink/[0.07] text-clay"
              )}
            >
              <ShoppingCart className="h-[18px] w-[18px]" /> Proceed to cart{" "}
              <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="m-0 mt-4 text-center text-[13.5px] text-clay-600">
            Send instantly on WhatsApp, or review everything in your cart and
            check out with Mobile Money.
          </p>
        </div>
      </section>

      {/* ------------------------------ SUMMARY ------------------------------ */}
      <section className="px-[clamp(18px,4vw,46px)]">
        <div className="mx-auto max-w-[880px] rounded-[24px] bg-cocoa p-[clamp(22px,3vw,36px)] text-cream-soft">
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-tan">
              Order summary
            </span>
            {totals.grams > 0 && (
              <span className="font-mono text-[12px] text-[#9a877d]">
                {formatGrams(totals.grams)} total
              </span>
            )}
          </div>
          {totals.lines.length ? (
            <div className="mt-4 grid gap-2 border-b border-white/10 pb-4">
              {totals.lines.map((l) => (
                <div
                  key={`${l.slug}-${l.size}`}
                  className="flex items-baseline justify-between gap-4 text-[15px]"
                >
                  <span>
                    {l.name} {l.size} × {l.qty}
                  </span>
                  <span className="font-semibold">{formatUGX(l.total)}</span>
                </div>
              ))}
              {totals.discount > 0 && (
                <div className="flex items-baseline justify-between text-[14px] text-dot">
                  <span>Box discount (10%)</span>
                  <span>-{formatUGX(totals.discount)}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="mt-4 border-b border-white/10 pb-4 text-[15px] text-[#9a877d]">
              Nothing picked yet — your items will appear here.
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-tan">
              Estimated total
            </span>
            <span className="font-anton text-[clamp(26px,3vw,34px)] leading-none text-ember">
              {formatUGX(totals.total)}
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------ CONTACT ------------------------------ */}
      <section className="px-[clamp(18px,4vw,46px)] pt-6">
        <div className="mx-auto max-w-[880px] rounded-[24px] bg-cream-card p-[clamp(22px,3vw,36px)]">
          <div className="mb-5 font-mono text-[12px] uppercase tracking-[0.14em] text-clay-700">
            Reach us directly
          </div>
          <div className="grid gap-4">
            {[
              {
                Icon: MessageCircle,
                color: "#1FAD52",
                label: "WhatsApp / Call",
                value: CONTACT.phonePrimary,
                href: `https://wa.me/${CONTACT.whatsappNumber}`,
              },
              {
                Icon: Phone,
                color: "#231512",
                label: "Call",
                value: CONTACT.phoneSecondary,
                href: `tel:${CONTACT.phoneSecondary.replace(/\s/g, "")}`,
              },
              {
                Icon: Mail,
                color: "#E24F02",
                label: "Email",
                value: CONTACT.emailGeneral,
                href: `mailto:${CONTACT.emailGeneral}`,
              },
              {
                Icon: MapPin,
                color: "#B52126",
                label: "Find us",
                value: BRAND.location,
              },
            ].map(({ Icon, color, label, value, href }) => (
              <div
                key={label}
                className="flex items-center gap-4 border-b border-ink/[0.06] pb-4 last:border-b-0 last:pb-0"
              >
                <Icon className="h-6 w-6 shrink-0" style={{ color }} strokeWidth={1.8} />
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-clay">
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-[16.5px] font-bold text-ink transition-colors hover:text-brand"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-[16.5px] font-bold text-ink">
                      {value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-ink/[0.08] pt-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-clay">
              Opening hours
            </div>
            <div className="mt-2.5 flex items-baseline justify-between text-[15.5px]">
              <span>Monday – Saturday</span>
              <span className="font-bold">8:00 – 19:00</span>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between text-[15.5px] text-clay-600">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ REVIEWS ------------------------------ */}
      <section className="px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)]">
        <div className="mx-auto max-w-[880px]">
          <Reveal className="mb-[clamp(32px,4vw,48px)] text-center">
            <div className={`${eyebrow} mb-4`}>Straight from our customers</div>
            <h2 className="m-0 font-hanken text-[clamp(28px,3.6vw,48px)] font-bold leading-[1.06] tracking-[-0.02em]">
              Real grills, <span className="text-brand">real messages</span>
            </h2>
          </Reveal>

          <div className="grid gap-4">
            {REVIEWS.map((r, i) => (
              <Reveal
                key={r.name}
                delay={i * 60}
                className="rounded-[20px] bg-cream-card p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full font-mono text-[13px] font-bold text-white"
                      style={{ backgroundColor: r.color }}
                    >
                      {r.initials}
                    </span>
                    <span>
                      <span className="block font-hanken text-[16px] font-bold">
                        {r.name}
                      </span>
                      <span className="block font-mono text-[11.5px] text-clay">
                        via WhatsApp
                      </span>
                    </span>
                  </div>
                  <MessageCircle className="h-5 w-5 text-[#1FAD52]" />
                </div>
                <div
                  className="mt-3 flex gap-0.5 text-[#E8A33D]"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="m-0 mt-3 text-[15px] leading-[1.65] text-clay-800">
                  {r.text}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3.5 text-center">
            <span className="font-anton text-[clamp(30px,3.4vw,42px)] leading-none text-ink">
              4.9
            </span>
            <span className="flex gap-0.5 text-[#E8A33D]" aria-hidden>
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-[18px] w-[18px] fill-current" />
              ))}
            </span>
            <span className="text-[14px] text-clay-700">
              Rated by GrillMark customers ·{" "}
              <strong className="text-ink">shared on WhatsApp</strong>
            </span>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------- WHOLESALE ----------------------------- */}
      <section id="wholesale" className="relative overflow-hidden bg-cocoa px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)] text-cream-soft">
        <div className="mx-auto grid max-w-[1080px] grid-cols-[1fr_1.05fr] items-start gap-[clamp(28px,4vw,56px)] max-[900px]:grid-cols-1">
          <div>
            <Reveal className="mb-4 font-mono text-[12.5px] uppercase tracking-[0.16em] text-tan">
              For business · B2B
            </Reveal>
            <Reveal
              as="h2"
              delay={60}
              className="m-0 font-hanken text-[clamp(30px,4vw,54px)] font-semibold uppercase leading-[1.04] tracking-[-0.025em] text-[#F7EFE2]"
            >
              Wholesale &amp;
              <br />
              bulk supply
            </Reveal>
            <Reveal
              as="p"
              delay={110}
              className="mt-5 max-w-[460px] text-[15.5px] leading-[1.7] text-[#CDB6A8]"
            >
              We supply restaurants, hotels, cafés, caterers and supermarkets
              with premium sausages and franks at wholesale rates — packed cold
              and delivered on schedule.
            </Reveal>

            <Reveal delay={150} className="mt-5 flex flex-wrap gap-2">
              {["Restaurants", "Hotels", "Cafés", "Caterers", "Supermarkets"].map(
                (c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/20 px-4 py-2 text-[13.5px] font-semibold"
                  >
                    {c}
                  </span>
                )
              )}
            </Reveal>

            <Reveal delay={190} className="mt-7 grid gap-4">
              {[
                {
                  t: "Bulk pricing",
                  d: "Tiered wholesale rates that improve as your volumes grow.",
                },
                {
                  t: "Minimum order quantities",
                  d: "Sensible MOQs with flexible standing-order schedules.",
                },
                {
                  t: "Multiple delivery zones",
                  d: "Cold-chain delivery across Kampala and surrounding areas.",
                },
              ].map((b) => (
                <div key={b.t} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block font-hanken text-[16px] font-bold text-[#F7EFE2]">
                      {b.t}
                    </span>
                    <span className="block text-[14px] text-[#CDB6A8]">
                      {b.d}
                    </span>
                  </span>
                </div>
              ))}
            </Reveal>

            <Reveal delay={230}>
              <a
                href={waLink(
                  "Hi GrillMark! Please send me your wholesale product catalogue."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-white/25 px-6 py-3.5 text-[14.5px] font-bold text-cream-soft transition-colors hover:border-white/60"
              >
                <Download className="h-4 w-4" /> Request product catalogue
              </a>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <WholesaleForm />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------- FAQ -------------------------------- */}
      <section className="bg-[#EFECE5] px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)]">
        <div className="mx-auto grid max-w-[1080px] grid-cols-[0.9fr_1.1fr] gap-[clamp(28px,4vw,56px)] max-[900px]:grid-cols-1">
          <div>
            <Reveal className={`${eyebrow} mb-4`}>Good to know</Reveal>
            <Reveal
              as="h2"
              delay={60}
              className="m-0 font-hanken text-[clamp(28px,3.6vw,48px)] font-bold leading-[1.06] tracking-[-0.02em] text-ink"
            >
              Questions? <span className="text-brand">We&apos;ve got answers.</span>
            </Reveal>
            <Reveal
              as="p"
              delay={110}
              className="mt-5 max-w-[380px] text-[15.5px] leading-[1.7] text-clay-700"
            >
              Everything about ordering, delivery and grilling GrillMark —
              sorted. Still stuck? Message us and we&apos;ll help.
            </Reveal>
            <Reveal delay={150}>
              <a
                href={waLink("Hi GrillMark! Quick question…")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-brand px-7 py-[15px] text-[15px] font-extrabold text-cream-light transition-transform hover:-translate-y-0.5"
              >
                Ask us anything <span aria-hidden>→</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={120} className="grid gap-3">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
