import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PRODUCT_CATEGORIES, WA_MAIN } from "@/lib/constants";
import { Reveal } from "@/components/reveal";
import {
  CurveDividers,
  type CurveEntry,
} from "@/components/curve-dividers";
import { SketchReveal } from "@/components/sketch-reveal";
import { RangeGrid } from "@/components/range-grid";
import { GrillBoxBuilder } from "@/components/grill-box-builder";
import { PackFinder } from "@/components/pack-finder";

export const metadata: Metadata = {
  title: "Products",
  description:
    "A growing world of GrillMark flavor. It begins with beef and chicken sausages and franks, prepared fresh and delivered cold across Kampala — with sauces, seasonings, marinades and more to come.",
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

const CURVES: CurveEntry[] = [
  { label: "BoxBuilder", from: "#FBF6EE", to: "#F5EDE0" },
  { label: "Finder", from: "#F5EDE0", to: "#EFECE5" },
  { label: "Steps", from: "#EFECE5", to: "#7E1A1C" },
  { label: "FireItUp", from: "#7E1A1C", to: "#EFECE5" },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <CurveDividers entries={CURVES} />
      {/* ------------------------------- HERO ------------------------------- */}
      <header className="px-[clamp(18px,4vw,46px)] pb-[clamp(28px,4vw,48px)] pt-[152px]">
        <div className="mx-auto max-w-[1080px] max-[880px]:text-center">
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
            className="mt-[22px] max-w-[560px] text-[clamp(16px,1.35vw,19px)] leading-[1.65] text-clay-700 max-[880px]:mx-auto"
          >
            Our sausages and franks are the{" "}
            <strong className="text-ink">first expression</strong> of the
            GrillMark flavor philosophy — distinctive spice blends, prepared
            fresh and delivered cold across Kampala.
          </Reveal>
        </div>
      </header>

      {/* ------------------------------- RANGE ------------------------------ */}
      <section className="px-[clamp(18px,4vw,46px)] pb-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1080px]">
          <RangeGrid />
        </div>
      </section>

      {/* --------------------------- GROWING WORLD --------------------------- */}
      <section className="bg-cream px-[clamp(18px,4vw,46px)] pb-[clamp(56px,7vw,96px)] pt-[clamp(8px,2vw,24px)]">
        <div className="mx-auto max-w-[1080px]">
          <Reveal className="mx-auto mb-[clamp(30px,4vw,48px)] max-w-[640px] text-center">
            <div className={`${eyebrow} mb-4`}>A growing world of flavor</div>
            <h2 className="m-0 font-hanken text-[clamp(28px,3.6vw,48px)] font-semibold uppercase leading-[1.05] tracking-[-0.02em] text-ink">
              More to come
            </h2>
            <p className="mx-auto mt-4 max-w-[540px] text-[15.5px] leading-[1.7] text-clay-600">
              GrillMark began with sausages, but our ambitions extend far beyond
              one category. We are building a range of foods for everyday meals
              and special occasions alike.
            </p>
          </Reveal>

          <div className="grid grid-cols-3 gap-[clamp(14px,1.8vw,24px)] max-[880px]:grid-cols-2 max-[540px]:grid-cols-1">
            {PRODUCT_CATEGORIES.map((c, i) => {
              const available = c.status === "Available now";
              return (
                <Reveal
                  key={c.name}
                  delay={i * 70}
                  className={`flex flex-col rounded-[20px] border p-6 ${
                    available
                      ? "border-brand/25 bg-cream-card"
                      : "border-ink/[0.07] bg-cream-card"
                  }`}
                >
                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] ${
                      available
                        ? "bg-brand/12 text-brand"
                        : "bg-ink/[0.06] text-clay"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        available ? "bg-brand" : "bg-clay/60"
                      }`}
                    />
                    {c.status}
                  </span>
                  <h3 className="mb-2 mt-4 font-hanken text-[19px] font-bold text-ink">
                    {c.name}
                  </h3>
                  <p className="m-0 text-[14.5px] leading-[1.62] text-clay-600">
                    {c.blurb}
                  </p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-[clamp(28px,3.5vw,44px)] text-center">
            <Link
              href="/#collections"
              className="inline-flex items-center gap-2.5 border-b-2 border-brand/30 pb-1 text-[15px] font-extrabold text-brand transition-colors hover:border-brand"
            >
              Explore our flavor collections{" "}
              <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------- BOX BUILDER ---------------------------- */}
      <section data-screen-label="BoxBuilder" className="bg-cream-soft px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,96px)]">
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
      <section data-screen-label="Finder" className="bg-[#EFECE5] px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,96px)]">
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
      <section data-screen-label="Steps" className="bg-cocoa px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)] text-cream-soft">
        <div className="mx-auto grid max-w-[1080px] grid-cols-3 gap-[clamp(24px,3vw,48px)] max-[760px]:grid-cols-1">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 90}>
              <div className="font-hanken text-[clamp(40px,4vw,54px)] font-black leading-none text-ember/[0.55]">
                {s.num}
              </div>
              <h3 className="mb-2 mt-4 text-[clamp(18px,1.6vw,22px)] font-semibold text-[#F7EFE2]">
                {s.title}
              </h3>
              <p className="m-0 text-[14.5px] leading-[1.64] text-[#E8CDBB]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------ FIRE IT UP ---------------------------- */}
      <section data-screen-label="FireItUp" className="bg-[#EFECE5] px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)] text-center">
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
