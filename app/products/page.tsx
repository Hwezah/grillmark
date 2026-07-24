import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { WA_MAIN } from "@/lib/constants";
import { Reveal } from "@/components/reveal";
import { SketchReveal } from "@/components/sketch-reveal";
import { RangeGrid } from "@/components/range-grid";
import { GrillBoxBuilder } from "@/components/grill-box-builder";
import { PackFinder } from "@/components/pack-finder";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The GrillMark range — beef and chicken sausages and franks, sold raw and ready, delivered cold across Kampala.",
};

const eyebrow =
  "font-mono text-[12.5px] uppercase tracking-[0.16em] text-brand-deep";

const STEPS = [
  {
    num: "01",
    title: "Order on WhatsApp",
    body: "Send your picks and quantities. We confirm the total and a delivery slot in minutes.",
  },
  {
    num: "02",
    title: "Packed cold & raw",
    body: "Everything leaves us fresh and raw, sealed and chilled to hold the cold chain to your door.",
  },
  {
    num: "03",
    title: "You make the mark",
    body: "Fire up the grill or pan. The char, the snap and the timing are yours to own.",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      {/* ------------------------------- HERO ------------------------------- */}
      <header className="px-[clamp(18px,4vw,46px)] pb-[clamp(28px,4vw,48px)] pt-[152px]">
        <div className="mx-auto max-w-[1080px] max-[560px]:text-center">
          <Reveal className="mb-5 inline-flex items-center gap-2.5">
            <span className={eyebrow}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ember align-middle" />
              The GrillMark range
            </span>
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            className="m-0 font-hanken text-[clamp(44px,7vw,98px)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-ink"
          >
            Sausages
            <br />
            &amp; <span className="text-brand">franks</span>
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mt-[22px] max-w-[560px] text-[clamp(16px,1.35vw,19px)] leading-[1.65] text-clay-700 max-[560px]:mx-auto"
          >
            Every link is sold <strong className="text-ink">raw and ready</strong>{" "}
            — premium cuts, signature spice, and the grill left to you.
            Delivered cold across Kampala.
          </Reveal>
        </div>
      </header>

      {/* ------------------------------- RANGE ------------------------------ */}
      <section className="px-[clamp(18px,4vw,46px)] pb-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1080px]">
          <RangeGrid />
        </div>
      </section>

      {/* ---------------------------- BOX BUILDER ---------------------------- */}
      <section className="bg-cream-soft px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1080px]">
          <Reveal className="mx-auto mb-[clamp(36px,4vw,56px)] max-w-[640px] text-center">
            <div className={`${eyebrow} mb-4`}>Mix your own · Save 10%</div>
            <h2 className="m-0 font-hanken text-[clamp(30px,4vw,54px)] font-semibold uppercase leading-[1.04] tracking-[-0.025em] text-ink">
              Build your grill box
            </h2>
            <p className="mx-auto mt-[18px] max-w-[540px] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-clay-600">
              Stack packs of any sausages and franks into one mixed box. We
              total the weight and price as you go — and knock{" "}
              <strong className="text-ink">10% off</strong> when your box hits 4
              packs or more.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <GrillBoxBuilder />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ FINDER ------------------------------ */}
      <section className="bg-[#EFECE5] px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1080px]">
          <Reveal className="mx-auto mb-[clamp(30px,3.5vw,44px)] max-w-[640px] text-center">
            <div className={`${eyebrow} mb-4`}>Not sure where to start?</div>
            <h2 className="m-0 font-hanken text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
              Find the <span className="text-brand">perfect grill pack</span>{" "}
              for your table
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <PackFinder />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- STEPS ------------------------------- */}
      <section className="bg-cocoa px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)] text-cream-soft">
        <div className="mx-auto grid max-w-[1080px] grid-cols-3 gap-[clamp(24px,3vw,48px)] max-[760px]:grid-cols-1">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 90}>
              <div className="font-hanken text-[clamp(40px,4vw,54px)] font-black leading-none text-ember/[0.55]">
                {s.num}
              </div>
              <h3 className="mb-2 mt-4 text-[clamp(18px,1.6vw,22px)] font-semibold text-[#F7EFE2]">
                {s.title}
              </h3>
              <p className="m-0 text-[14.5px] leading-[1.64] text-[#CDB6A8]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------ FIRE IT UP ---------------------------- */}
      <section className="bg-[#EFECE5] px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)] text-center">
        <Reveal className="mx-auto max-w-[640px]">
          <h2 className="m-0 font-hanken text-[clamp(34px,5vw,64px)] font-extrabold uppercase leading-[0.98] tracking-[-0.025em] text-ink">
            Fire it up
          </h2>
          <SketchReveal
            src="/images/doodle-flourish.png"
            width={925}
            height={235}
            className="mx-auto mt-4 w-[200px] max-w-[60%]"
          />
          <p className="mx-auto mt-4 max-w-[520px] text-[clamp(15px,1.25vw,18px)] leading-[1.65] text-clay-700">
            Know what you want already? Tell us on WhatsApp and we&apos;ll pack
            it cold and get it moving across Kampala.
          </p>
          <a
            href={WA_MAIN}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-brand px-9 py-[17px] text-[15.5px] font-extrabold text-cream-light transition-transform hover:-translate-y-[3px]"
          >
            Order on WhatsApp <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
          </a>
        </Reveal>
      </section>
    </div>
  );
}
