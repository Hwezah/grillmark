import Image from "next/image";
import Link from "next/link";

import { BRAND, PRODUCTS, WA_MAIN } from "@/lib/constants";

const FEATURED_PRODUCTS = PRODUCTS.slice(0, 3);
import { Reveal } from "@/components/reveal";
import { CurveDividers, type CurveEntry } from "@/components/curve-dividers";
import { ProductCard } from "@/components/product-card";

const eyebrow =
  "font-mono text-[12.5px] uppercase tracking-[0.16em] text-brand-deep";

const CURVES: CurveEntry[] = [
  { label: "Story", from: "#FBF6EE", to: "#200d0a" },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-cream text-ink">
      <CurveDividers entries={CURVES} />

      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative overflow-hidden px-[clamp(18px,4vw,46px)] pb-[clamp(48px,6vw,88px)] pt-[128px]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[1.05fr_0.95fr] items-center gap-[clamp(24px,4vw,64px)] max-[880px]:grid-cols-1 max-[880px]:text-center">
          <div className="max-[880px]:mx-auto max-[880px]:max-w-[600px]">
            <Reveal className="mb-6 inline-flex items-center gap-2.5">
              <span className={eyebrow}>
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ember align-middle" />
                {BRAND.company} · Ntinda, Kampala
              </span>
            </Reveal>

            <Reveal
              as="h1"
              delay={60}
              className="m-0 font-hanken text-[clamp(46px,7.5vw,104px)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-ink"
            >
              Marked by
              <br />
              <span className="text-brand">flavour</span>
            </Reveal>

            <Reveal
              as="p"
              delay={120}
              className="mt-7 max-w-[520px] text-[clamp(16px,1.35vw,19px)] leading-[1.65] text-clay-700 max-[880px]:mx-auto"
            >
              Honest sausages and franks from Kampala — real cuts, bold
              seasoning, no fillers. Sold raw and ready, so the final mark on
              the grill is yours.
            </Reveal>

            <Reveal
              delay={180}
              className="mt-9 flex flex-wrap gap-3.5 max-[880px]:justify-center"
            >
              <a
                href={WA_MAIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-brand px-8 py-[17px] text-[15.5px] font-extrabold text-cream-light transition-transform hover:-translate-y-[3px]"
              >
                <span className="h-[7px] w-[7px] rounded-full bg-dot shadow-[0_0_0_3px_rgba(123,227,139,0.3)]" />
                Order on WhatsApp
              </a>
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 rounded-full border-[1.6px] border-ink/20 px-8 py-[17px] text-[15.5px] font-bold text-ink transition-colors hover:border-ink"
              >
                See the range <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>

          {/* Plate */}
          <Reveal delay={120} className="relative max-[880px]:mx-auto max-[880px]:w-full max-[880px]:max-w-[440px]">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,79,2,0.16),rgba(181,33,38,0.05)_55%,transparent_72%)] blur-[6px]"
            />
            <div className="relative aspect-square w-full">
              <Image
                src="/images/plate-sausages.png"
                alt="A plate of grilled GrillMark sausages with asparagus, potatoes and cherry tomatoes"
                fill
                priority
                sizes="(max-width: 880px) 90vw, 500px"
                className="object-contain drop-shadow-[0_36px_44px_rgba(32,13,10,0.28)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ RANGE ------------------------------- */}
      <section className="px-[clamp(18px,4vw,46px)] py-[clamp(48px,6vw,88px)]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-[clamp(32px,4vw,52px)] flex items-end justify-between gap-6 max-[620px]:flex-col max-[620px]:items-start">
            <Reveal>
              <div className={`${eyebrow} mb-3`}>Fresh off the block</div>
              <h2 className="m-0 font-hanken text-[clamp(30px,4vw,56px)] font-semibold uppercase leading-[1.02] tracking-[-0.025em] text-ink">
                The range
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border-[1.6px] border-ink/15 px-6 py-3 text-[14px] font-bold text-ink transition-colors hover:border-ink"
              >
                See all {" "}
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-3 gap-[clamp(16px,2vw,28px)] max-[880px]:grid-cols-2 max-[520px]:grid-cols-1">
            {FEATURED_PRODUCTS.map((product, i) => (
              <Reveal key={product.slug} delay={i * 80}>
                <ProductCard product={product} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- STORY ------------------------------ */}
      <section
        data-screen-label="Story"
        className="relative overflow-hidden bg-cocoa px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,116px)] text-cream-soft"
      >
        <div className="mx-auto grid max-w-[1180px] grid-cols-[1fr_1fr] items-center gap-[clamp(30px,5vw,72px)] max-[880px]:grid-cols-1">
          <Reveal className="order-2 max-[880px]:order-none">
            <div className="relative aspect-[1100/583] w-full overflow-hidden rounded-[22px] border border-white/[0.06]">
              <Image
                src="/images/story-bulls.webp"
                alt="Three bulls — the beef heritage behind GrillMark"
                fill
                sizes="(max-width: 880px) 90vw, 540px"
                className="object-contain"
              />
            </div>
          </Reveal>

          <Reveal delay={80} className="order-1 max-[880px]:order-none">
            <div className="mb-4 font-mono text-[12.5px] uppercase tracking-[0.16em] text-tan">
              From Ntinda, with fire
            </div>
            <h2 className="m-0 font-hanken text-[clamp(30px,4.2vw,58px)] font-semibold uppercase leading-[1.02] tracking-[-0.025em] text-[#F7EFE2]">
              Real cuts, honest links
            </h2>
            <p className="mt-5 max-w-[480px] text-[clamp(15px,1.25vw,18px)] leading-[1.72] text-[#CDB6A8]">
              GrillMark started in a small Ntinda kitchen with a grill, a
              handful of spice jars, and one stubborn belief: flavour should
              never be an afterthought. We get the seasoning and the smoke
              right — you make the final mark.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-cream-light px-8 py-[16px] text-[15.5px] font-extrabold text-cocoa transition-transform hover:-translate-y-[3px]"
            >
              Read our story <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
