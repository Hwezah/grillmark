import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Beef, Flame, FlaskConical, Snowflake } from "lucide-react";

import { WA_MAIN } from "@/lib/constants";
import { Reveal } from "@/components/reveal";
import { CurveDividers, type CurveEntry } from "@/components/curve-dividers";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "GrillMark makes honest sausages and franks in Ntinda, Kampala — real cuts, bold seasoning, no fillers. Marked by flavour. Taste & see.",
};

const STEPS = [
  {
    num: "01",
    Icon: Beef,
    title: "Source the cut",
    body: "We start with real, properly sourced meat — the kind that would make a good meal on its own.",
  },
  {
    num: "02",
    Icon: FlaskConical,
    title: "Blend & season",
    body: "Spice blends built to be tasted, mixed in small batches until the flavour earns its mark.",
  },
  {
    num: "03",
    Icon: Flame,
    title: "Smoke & cure",
    body: "Slow-smoked over hardwood and cured for depth — the difference you taste in the first bite.",
  },
  {
    num: "04",
    Icon: Snowflake,
    title: "Raw & ready",
    body: "Packed and kept cold to your door, raw and ready so the final mark on the grill is yours.",
  },
];

const VALUES = [
  {
    num: "01",
    title: "Honest cuts",
    desc: "Real meat, properly sourced. If it would not make a good meal on its own, it does not go in the mix.",
  },
  {
    num: "02",
    title: "Seasoned to taste",
    desc: "Our spice blends are built to be noticed — the flavour that earns the GrillMark name on every link.",
  },
  {
    num: "03",
    title: "Raw & respectful",
    desc: "We hand you the link raw and the moment whole. The grill, the char and the timing stay yours.",
  },
];

const STATS = [
  { value: "100%", label: "Real cuts, no fillers" },
  { value: "8", label: "Sausages & franks" },
  { value: "Cold", label: "Chain to your door" },
  { value: "Ntinda", label: "Made in Kampala" },
];

const CURVES: CurveEntry[] = [
  { label: "Values", from: "#FBF6EE", to: "#200d0a" },
  { label: "Stats", from: "#200d0a", to: "#FFFFFF" },
];

const eyebrow = "font-mono text-[12.5px] uppercase tracking-[0.16em] text-brand-deep";

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden bg-cream text-ink">
      <CurveDividers entries={CURVES} />

      {/* ------------------------------- HERO ------------------------------- */}
      <header className="bg-cream px-[clamp(18px,4vw,46px)] pb-[clamp(56px,6vw,88px)] pt-[152px]">
        <div className="mx-auto max-w-[1080px] text-center">
          <Reveal className="mb-6 inline-flex items-center gap-2.5">
            <span className={eyebrow}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ember align-middle" />
              Our Story · Salvation Foods Ltd
            </span>
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            className="m-0 font-hanken text-[clamp(44px,7vw,98px)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-ink"
          >
            A mark you
            <br />
            can <span className="text-brand">taste</span>
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mx-auto mt-[26px] max-w-[560px] text-[clamp(16px,1.35vw,19px)] leading-[1.65] text-clay-700"
          >
            We are a Kampala sausage and frank maker with one stubborn belief:
            flavour should never be an afterthought. It is the whole point.
          </Reveal>
        </div>
      </header>

      {/* ------------------------------ PROCESS ----------------------------- */}
      <section className="bg-cream px-[clamp(18px,4vw,46px)] pb-[clamp(20px,3vw,40px)] pt-[clamp(60px,7vw,104px)]">
        <div className="mx-auto max-w-[1180px]">
          <Reveal className="mx-auto mb-[clamp(40px,5vw,64px)] max-w-[680px] text-center">
            <div className={`${eyebrow} mb-4`}>From cut to crate</div>
            <h2 className="m-0 font-hanken text-[clamp(30px,3.8vw,54px)] font-semibold uppercase leading-[1.04] tracking-[-0.025em] text-ink">
              How we make the mark
            </h2>
            <p className="mx-auto mt-[18px] max-w-[520px] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-clay-600">
              Four steps, no shortcuts. Every link earns its flavour before it
              ever reaches your grill.
            </p>
          </Reveal>
          <div className="grid grid-cols-4 gap-[clamp(16px,2vw,28px)] max-[1060px]:grid-cols-2 max-[620px]:grid-cols-1">
            {STEPS.map((st, i) => (
              <Reveal
                key={st.num}
                delay={i * 90}
                className="relative flex flex-col gap-[18px] rounded-[20px] border border-ink/[0.07] bg-cream-card p-[30px_24px_32px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-cocoa text-tan">
                    <st.Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <span className="font-hanken text-[clamp(40px,4vw,54px)] font-black leading-none text-ink/[0.14]">
                    {st.num}
                  </span>
                </div>
                <div>
                  <h3 className="mb-2 font-hanken text-[clamp(17px,1.5vw,21px)] font-semibold tracking-[-0.01em] text-ink">
                    {st.title}
                  </h3>
                  <p className="m-0 text-[14px] leading-[1.6] text-clay-600">
                    {st.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- STORY ------------------------------ */}
      <section className="bg-cream px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,116px)]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[0.85fr_1.15fr] items-start gap-[clamp(30px,5vw,76px)] max-[920px]:grid-cols-1">
          <Reveal className="sticky top-[110px] max-[920px]:static">
            <div className={`${eyebrow} mb-4`}>From Ntinda, with fire</div>
            <h2 className="m-0 font-hanken text-[clamp(30px,3.6vw,52px)] font-semibold uppercase leading-[1.04] tracking-[-0.025em] text-ink">
              It started with one good link
            </h2>
          </Reveal>
          <Reveal
            delay={100}
            className="flex flex-col gap-[22px] text-[clamp(16px,1.25vw,18px)] leading-[1.72] text-clay-800"
          >
            <p className="m-0">
              GrillMark began in a small kitchen in Ntinda, with a grill, a
              handful of spice jars, and a frustration: too many sausages tasted
              of everything except the meat inside them. So we set out to make
              the opposite — links built on honest cuts and seasoning you could
              actually taste.
            </p>
            <p className="m-0">
              We tested blend after blend on friends and family until a sausage
              came off the grill and the room went quiet. That was the mark we
              had been chasing — the{" "}
              <strong className="text-ink">GrillMark</strong>. Today, under
              Salvation Foods Ltd, we make sausages and franks the same honest
              way, just for more tables.
            </p>
            <p className="m-0">
              Everything we make leaves us{" "}
              <strong className="text-ink">raw and ready</strong>. We believe
              the best part of a great sausage is the moment you cook it — the
              smoke, the snap, the timing that is yours alone. We get the flavour
              right. You make the final mark.
            </p>
            <p className="mt-3.5 font-hanken text-[clamp(19px,1.7vw,25px)] font-medium italic leading-[1.5] text-ember">
              &ldquo;Marked by Flavour. Taste &amp; See — we never wanted a
              tagline you had to take on faith.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ VALUES ------------------------------ */}
      <section
        data-screen-label="Values"
        className="relative overflow-hidden bg-cocoa px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,116px)] text-cream-soft"
      >
        <div className="relative mx-auto max-w-[1180px]">
          <Reveal className="mb-[18px] font-mono text-[12.5px] uppercase tracking-[0.16em] text-tan">
            What we stand on
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="m-0 mb-[clamp(40px,5vw,64px)] max-w-[760px] font-hanken text-[clamp(32px,4.6vw,62px)] font-semibold uppercase leading-none tracking-[-0.025em] text-[#F7EFE2]"
          >
            No shortcuts, no apologies
          </Reveal>
          <div className="grid grid-cols-3 gap-[clamp(20px,2.4vw,36px)] max-[760px]:grid-cols-1">
            {VALUES.map((v, i) => (
              <Reveal
                key={v.num}
                delay={i * 90}
                className="flex flex-col gap-3.5 pt-6"
              >
                <div className="font-hanken text-[clamp(44px,4.6vw,62px)] font-black leading-none text-ember/[0.28]">
                  {v.num}
                </div>
                <h3 className="m-0 text-[clamp(19px,1.7vw,23px)] font-semibold tracking-[-0.01em] text-[#F7EFE2]">
                  {v.title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.64] text-[#CDB6A8]">
                  {v.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- STATS ------------------------------ */}
      <section
        data-screen-label="Stats"
        className="bg-white px-[clamp(18px,4vw,46px)] py-[clamp(54px,6vw,84px)]"
      >
        <div className="mx-auto grid max-w-[1180px] grid-cols-4 gap-[clamp(18px,2vw,32px)] max-[1060px]:grid-cols-2 max-[1060px]:gap-y-[38px]">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="text-center">
              <div className="font-anton text-[clamp(40px,5vw,72px)] leading-none text-brand">
                {s.value}
              </div>
              <div className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.1em] text-clay">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------- CTA ------------------------------- */}
      <section className="bg-white px-[clamp(18px,4vw,46px)] pb-[clamp(72px,8vw,116px)] pt-[clamp(56px,7vw,104px)]">
        <Reveal className="mx-auto max-w-[1180px] rounded-[28px] bg-gradient-to-br from-brand to-brand-deep p-[clamp(40px,5vw,72px)] text-center text-cream-light">
          <h2 className="m-0 font-hanken text-[clamp(34px,5vw,72px)] font-semibold uppercase leading-[0.98] tracking-[-0.025em]">
            Taste &amp; see for yourself
          </h2>
          <p className="mx-auto mt-[18px] max-w-[480px] text-[clamp(15px,1.25vw,18px)] leading-[1.6] text-[#F6D8CF]">
            The shortest way to understand GrillMark is to grill one. Order on
            WhatsApp and judge us by the smoke.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a
              href={WA_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-cream-light px-8 py-[17px] text-[15.5px] font-extrabold text-brand transition-transform hover:-translate-y-[3px]"
            >
              Order on WhatsApp <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
            </a>
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 rounded-full border-[1.6px] border-cream-light/40 px-8 py-[17px] text-[15.5px] font-bold text-cream-light transition-colors hover:border-cream-light"
            >
              See the range
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
