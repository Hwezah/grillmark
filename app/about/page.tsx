import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, FlaskConical, Globe, Sparkles } from "lucide-react";

import { WA_MAIN } from "@/lib/constants";
import { Reveal } from "@/components/reveal";
import { CurveDividers, type CurveEntry } from "@/components/curve-dividers";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "GrillMark is a food brand by Salvation Foods Ltd, inspired by the possibilities of flavor. Starting in Uganda with sausages, and a vision for much further ahead. Marked by Flavor.",
};

// Our approach to flavor — four moves that shape every GrillMark product.
const STEPS = [
  {
    num: "01",
    Icon: Compass,
    title: "Explore",
    body: "We explore ingredients, culinary traditions and combinations from near and far.",
  },
  {
    num: "02",
    Icon: FlaskConical,
    title: "Develop",
    body: "We develop flavors with their own identity, each with a character of its own.",
  },
  {
    num: "03",
    Icon: Sparkles,
    title: "Refine",
    body: "Some flavors are familiar and refined — balanced and made with the GrillMark touch.",
  },
  {
    num: "04",
    Icon: Globe,
    title: "Surprise",
    body: "Others introduce combinations and influences that are a little less expected.",
  },
];

const VALUES = [
  {
    num: "01",
    title: "Thoughtfully made",
    desc: "Every product is developed with care — enjoyable to eat and recognizable by its taste.",
  },
  {
    num: "02",
    title: "Distinctive by design",
    desc: "Each creation has its own character, while remaining unmistakably GrillMark.",
  },
  {
    num: "03",
    title: "Made to be remembered",
    desc: "We build around one pursuit: creating food people remember and want to share.",
  },
];

const STATS = [
  { value: "4", label: "Flavor collections" },
  { value: "5", label: "Product categories & growing" },
  { value: "Uganda", label: "Where the journey begins" },
  { value: "More", label: "To come" },
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
            Marked
            <br />
            by <span className="text-brand">flavor</span>
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mx-auto mt-[26px] max-w-[580px] text-[clamp(16px,1.35vw,19px)] leading-[1.65] text-clay-700"
          >
            GrillMark is a food brand inspired by the possibilities of flavor.
            We create foods with distinctive character — exploring ingredients,
            recipes and culinary influences to bring something memorable to the
            table.
          </Reveal>
        </div>
      </header>

      {/* ------------------------------- VISION ----------------------------- */}
      <section
        id="vision"
        className="scroll-mt-[120px] bg-cream px-[clamp(18px,4vw,46px)] py-[clamp(48px,6vw,88px)]"
      >
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <div className={`${eyebrow} mb-4`}>Our vision</div>
            <h2 className="m-0 font-hanken text-[clamp(28px,3.6vw,50px)] font-semibold uppercase leading-[1.04] tracking-[-0.025em] text-ink">
              A food brand known for flavor
            </h2>
          </Reveal>
          <Reveal
            delay={100}
            className="mx-auto mt-[22px] flex max-w-[620px] flex-col gap-[18px] text-[clamp(15px,1.2vw,17px)] leading-[1.72] text-clay-700"
          >
            <p className="m-0">
              We believe flavor has the power to transform an ordinary meal into
              something worth remembering. Our vision is to build a food brand
              with a distinctive approach to flavor — products that are
              thoughtfully made, enjoyable to eat and recognizable by their
              taste.
            </p>
            <p className="m-0">
              Our journey begins with sausages and continues into a wider world
              of foods, seasonings, sauces, marinades and other creations.
              GrillMark is built for a world of flavor.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ APPROACH ---------------------------- */}
      <section className="bg-cream px-[clamp(18px,4vw,46px)] pb-[clamp(20px,3vw,40px)] pt-[clamp(40px,5vw,72px)]">
        <div className="mx-auto max-w-[1180px]">
          <Reveal className="mx-auto mb-[clamp(40px,5vw,64px)] max-w-[680px] text-center">
            <div className={`${eyebrow} mb-4`}>Our approach to flavor</div>
            <h2 className="m-0 font-hanken text-[clamp(30px,3.8vw,54px)] font-semibold uppercase leading-[1.04] tracking-[-0.025em] text-ink">
              Distinctive by design
            </h2>
            <p className="mx-auto mt-[18px] max-w-[520px] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-clay-600">
              Flavor is at the heart of everything we create. Here is how a
              GrillMark flavor comes to life.
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
          <Reveal className="sticky top-[110px] max-[920px]:static max-[920px]:text-center">
            <div className={`${eyebrow} mb-4`}>The GrillMark story</div>
            <h2 className="m-0 font-hanken text-[clamp(30px,3.6vw,52px)] font-semibold uppercase leading-[1.04] tracking-[-0.025em] text-ink">
              It began with better food
            </h2>
          </Reveal>
          <Reveal
            delay={100}
            className="flex flex-col gap-[22px] text-[clamp(16px,1.25vw,18px)] leading-[1.72] text-clay-800"
          >
            <p className="m-0">
              GrillMark was founded with a simple ambition: to create food with
              character and flavor that people would be proud to serve and happy
              to share. Our first products gave us the opportunity to understand
              what people enjoy, refine our recipes and begin developing the
              standards that guide the brand.
            </p>
            <p className="m-0">
              Today, we are continuing to build on that foundation. Every new
              product gives us another opportunity to explore flavor, create
              something distinctive and add another mark to the{" "}
              <strong className="text-ink">GrillMark</strong> story.
            </p>
            <p className="m-0">
              We are <strong className="text-ink">starting in Uganda</strong>,
              with a vision for much further ahead — from our flagship sausages
              to the foods and flavors we will introduce in the years to come.
            </p>
            <p className="mt-3.5 font-hanken text-[clamp(19px,1.7vw,25px)] font-medium italic leading-[1.5] text-ember">
              &ldquo;Flavor gives food its identity — it creates memories,
              shapes experiences and brings people together.&rdquo;
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
            What we stand for
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="m-0 mb-[clamp(40px,5vw,64px)] max-w-[760px] font-hanken text-[clamp(32px,4.6vw,62px)] font-semibold uppercase leading-none tracking-[-0.025em] text-[#F7EFE2] max-[1020px]:mx-auto max-[1020px]:text-center"
          >
            Built around flavor
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

      {/* ---------------------------- WHAT'S AHEAD --------------------------- */}
      <section className="bg-white px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,104px)]">
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <div className={`${eyebrow} mb-4`}>What&apos;s ahead</div>
            <h2 className="m-0 font-hanken text-[clamp(28px,3.6vw,50px)] font-semibold uppercase leading-[1.04] tracking-[-0.025em] text-ink">
              There is a lot more to GrillMark
            </h2>
          </Reveal>
          <Reveal
            delay={100}
            className="mx-auto mt-[22px] max-w-[620px] text-[clamp(15px,1.2vw,17px)] leading-[1.72] text-clay-700"
          >
            <p className="m-0">
              As the brand grows, so will our range of foods. New recipes, new
              ingredients, new combinations, new ways to enjoy familiar foods —
              and entirely new ideas. Our ambition is a food brand people
              associate with distinctive flavor, thoughtful products and the
              excitement of discovering something new.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-7">
            <span className="font-hanken text-[clamp(18px,1.6vw,22px)] font-semibold italic text-ember">
              The journey has begun.
            </span>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------- CTA ------------------------------- */}
      <section className="bg-white px-[clamp(18px,4vw,46px)] pb-[clamp(72px,8vw,116px)] pt-[clamp(24px,3vw,48px)]">
        <Reveal className="mx-auto max-w-[1180px] rounded-[28px] bg-gradient-to-br from-brand to-brand-deep p-[clamp(40px,5vw,72px)] text-center text-cream-light">
          <h2 className="m-0 font-hanken text-[clamp(34px,5vw,72px)] font-semibold uppercase leading-[0.98] tracking-[-0.025em]">
            Bring more flavor to the table
          </h2>
          <p className="mx-auto mt-[18px] max-w-[480px] text-[clamp(15px,1.25vw,18px)] leading-[1.6] text-[#F6D8CF]">
            Discover our products and find your own way to bring GrillMark to
            the table. Message us on WhatsApp to get started.
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
              Explore products
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
