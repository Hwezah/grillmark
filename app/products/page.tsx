import type { Metadata } from "next";
import Link from "next/link";

import { PRODUCTS, WA_MAIN } from "@/lib/constants";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The GrillMark range — beef and chicken sausages and franks, sold raw and ready. Marked by flavour.",
};

const eyebrow =
  "font-mono text-[12.5px] uppercase tracking-[0.16em] text-brand-deep";

export default function ProductsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      {/* ------------------------------- HERO ------------------------------- */}
      <header className="px-[clamp(18px,4vw,46px)] pb-[clamp(28px,4vw,48px)] pt-[152px]">
        <div className="mx-auto max-w-[1180px] text-center">
          <Reveal className="mb-5 inline-flex items-center gap-2.5">
            <span className={eyebrow}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ember align-middle" />
              The Range · {PRODUCTS.length} links
            </span>
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            className="m-0 font-hanken text-[clamp(44px,7vw,98px)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-ink"
          >
            Pick your <span className="text-brand">mark</span>
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mx-auto mt-[22px] max-w-[560px] text-[clamp(16px,1.35vw,19px)] leading-[1.65] text-clay-700"
          >
            Beef and chicken, franks and sausages — all sold raw and ready.
            Tap Order to send your box straight to us on WhatsApp.
          </Reveal>
        </div>
      </header>

      {/* ------------------------------- GRID ------------------------------- */}
      <section className="px-[clamp(18px,4vw,46px)] pb-[clamp(56px,7vw,96px)] pt-[clamp(24px,3vw,40px)]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-4 gap-[clamp(16px,2vw,28px)] max-[1060px]:grid-cols-2 max-[520px]:grid-cols-1">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.slug} delay={i * 80}>
              <ProductCard product={product} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------- CTA ------------------------------- */}
      <section className="px-[clamp(18px,4vw,46px)] pb-[clamp(72px,8vw,116px)]">
        <Reveal className="mx-auto max-w-[1180px] rounded-[28px] bg-gradient-to-br from-brand to-brand-deep p-[clamp(36px,5vw,64px)] text-center text-cream-light">
          <h2 className="m-0 font-hanken text-[clamp(30px,4.4vw,58px)] font-semibold uppercase leading-[0.98] tracking-[-0.025em]">
            Ordering a bigger box?
          </h2>
          <p className="mx-auto mt-4 max-w-[460px] text-[clamp(15px,1.25vw,18px)] leading-[1.6] text-[#F6D8CF]">
            Mixed crates, bulk links and event catering are all a message away.
            Tell us what you are grilling and we will sort the rest.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <a
              href={WA_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-cream-light px-8 py-[16px] text-[15.5px] font-extrabold text-brand transition-transform hover:-translate-y-[3px]"
            >
              Order on WhatsApp <span aria-hidden>→</span>
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 rounded-full border-[1.6px] border-cream-light/40 px-8 py-[16px] text-[15.5px] font-bold text-cream-light transition-colors hover:border-cream-light"
            >
              Our story
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
