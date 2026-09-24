import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  ImageIcon,
  Instagram,
  MessageCircle,
  Star,
} from "lucide-react";

import { CONTACT, FLAVOR_COLLECTIONS, WA_MAIN } from "@/lib/constants";
import { REVIEWS } from "@/lib/reviews";
import { Reveal } from "@/components/reveal";
import {
  CurveDividers,
  type CurveEntry,
} from "@/components/curve-dividers";
import { SketchReveal } from "@/components/sketch-reveal";
import { HomeHero } from "@/components/home-hero";
import { HomeRange } from "@/components/home-range";
import { HomeWhy } from "@/components/home-why";
import { NewsletterForm } from "@/components/newsletter";

const eyebrow =
  "font-mono text-[12.5px] uppercase tracking-[0.16em] text-brand-deep";

/** TikTok glyph — lucide-react no longer ships brand marks, so inline it. */
function TikTok({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M16.5 3c.32 1.86 1.4 3.32 3.5 3.66v2.66c-1.28.03-2.47-.35-3.5-.98v5.9c0 3.32-2.68 6-6 6a5.99 5.99 0 0 1-6-6c0-3.32 2.68-6 6-6 .17 0 .33.01.5.02v2.76a3.25 3.25 0 0 0-.5-.04 3.26 3.26 0 1 0 3.26 3.26V3h2.74Z" />
    </svg>
  );
}

// The four flavor collections that frame how GrillMark develops products.
const COLLECTIONS = FLAVOR_COLLECTIONS.map((c, i) => ({
  num: String(i + 1).padStart(2, "0"),
  title: c.name,
  body: c.blurb,
}));

// The design's home strip shows Chef Andrew, A picky family and Busy parent.
const HOME_REVIEWS = [REVIEWS[0], REVIEWS[2], REVIEWS[5]];

const SOCIAL_TILES = [
  "Grill shot",
  "Sausage close-up",
  "Braai / party",
  "Breakfast plate",
  "Product pack",
  "Happy customer",
];

const CURVES: CurveEntry[] = [
  { label: "Story", from: "#7E1A1C", to: "#FBF6EE" },
  { label: "Range", from: "#FBF6EE", to: "#FFFFFF" },
  { label: "Why", from: "#FFFFFF", to: "#FBF6EE" },
  { label: "Raw", from: "#FBF6EE", to: "#7E1A1C" },
  { label: "Testimonials", from: "#7E1A1C", to: "#FFFFFF" },
  { label: "Hungry", from: "#FFFFFF", to: "#EFECE5" },
  { label: "Social", from: "#EFECE5", to: "#FBF6EE" },
  { label: "Newsletter", from: "#FBF6EE", to: "#7E1A1C" },
];

export default function HomePage() {
  return (
    <div className="overflow-x-clip bg-cream text-ink">
      <CurveDividers entries={CURVES} />
      {/* ------------------------------- HERO ------------------------------- */}
      <HomeHero />

      {/* ------------------------------- STORY ------------------------------ */}
      <section data-screen-label="Story" className="px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,96px)]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[1.05fr_0.95fr] items-start gap-[clamp(28px,4.5vw,72px)] max-[880px]:grid-cols-1">
          <Reveal className="relative">
            <span className="ml-[6%] inline-block -rotate-6 font-hanken text-[15px] font-bold leading-tight text-ink max-[880px]:text-[17px]">
              Creating food
              <br />
              people <span className="text-ember">remember</span>
            </span>
            {/* Doodle sits tight under the label, then clear air before the herd. */}
            <SketchReveal
              src="/images/doodle-arrow.png"
              width={675}
              height={439}
              className="pointer-events-none ml-[13%] mt-1 w-[42%] max-w-[210px] max-[880px]:ml-[16%] max-[880px]:mt-2 max-[880px]:w-[46%]"
            />
            <div className="relative mt-7 aspect-[1100/583] w-full max-[880px]:mt-8">
              <Image
                src="/images/story-bulls.webp"
                alt="Three bulls — the beef heritage behind GrillMark"
                fill
                sizes="(max-width: 880px) 92vw, 580px"
                className="object-contain"
              />
            </div>
          </Reveal>

          <Reveal delay={100} className="sticky top-[110px] self-start max-[880px]:static max-[880px]:text-center">
            <div className={`${eyebrow} mb-4`}>Our story</div>
            <h2 className="m-0 font-hanken text-[clamp(28px,3.4vw,44px)] font-bold uppercase leading-[1.06] tracking-[-0.02em]">
              It began with better food
            </h2>
            <p className="mt-5 max-w-[480px] text-[15.5px] leading-[1.72] text-clay-700 max-[880px]:mx-auto">
              GrillMark was founded with a simple ambition — to create food with
              character and flavor that people would be proud to serve and happy
              to share. Our first products gave us the chance to understand what
              people enjoy and refine our recipes.
            </p>
            <p className="mt-4 max-w-[480px] text-[15.5px] leading-[1.72] text-clay-700 max-[880px]:mx-auto">
              Every new product is another opportunity to explore flavor and add
              another mark to the GrillMark story. We are{" "}
              <strong className="text-ink">starting in Uganda</strong>, with a
              vision for much further ahead.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2.5 border-b-2 border-brand/30 pb-1 text-[15.5px] font-extrabold text-brand transition-colors hover:border-brand"
            >
              Read the full story <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- RANGE ------------------------------- */}
      <section data-screen-label="Range" className="bg-white px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-[clamp(30px,4vw,48px)] flex items-end justify-between gap-6 max-[880px]:flex-col max-[880px]:items-center max-[880px]:text-center">
            <Reveal>
              <div className={`${eyebrow} mb-3`}>The range</div>
              <h2 className="m-0 font-hanken text-[clamp(28px,3.6vw,48px)] font-bold uppercase leading-[1.04] tracking-[-0.02em]">
                Sausages
                <br className="max-[620px]:hidden" />
                <span className="hidden max-[620px]:inline"> </span>
                &amp; Franks
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand px-6 py-3 text-[14px] font-bold text-cream-light transition-transform hover:-translate-y-0.5"
              >
                View all products <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
              </Link>
            </Reveal>
          </div>
          <HomeRange />
        </div>
      </section>

      {/* ---------------------------- WHY / PLATE ---------------------------- */}
      <section data-screen-label="Why" className="overflow-hidden px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)]">
        <div className="mx-auto max-w-[1180px]">
          <Reveal className="mx-auto mb-[clamp(36px,4.5vw,60px)] max-w-[720px] text-center">
            <h2 className="m-0 font-hanken text-[clamp(26px,3.2vw,42px)] font-bold leading-[1.14] tracking-[-0.015em]">
              Our approach to flavor:{" "}
              <span className="text-brand">distinctive</span> by design.
            </h2>
            <SketchReveal
              src="/images/doodle-flourish.png"
              width={925}
              height={235}
              className="mx-auto mt-4 w-[200px] max-w-[62%]"
            />
            <p className="mx-auto mt-5 max-w-[560px] text-[15.5px] leading-[1.7] text-clay-700">
              Flavor is at the heart of everything we create. We explore
              ingredients, culinary traditions and combinations to develop
              flavors with their own identity — some familiar and refined,
              others less expected, each one unmistakably GrillMark.
            </p>
          </Reveal>
          <HomeWhy />
        </div>
      </section>

      {/* -------------------------- FLAVOR COLLECTIONS -------------------------- */}
      <section id="collections" data-screen-label="Raw" className="relative overflow-hidden bg-cocoa px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)] text-cream-soft">
        <Image
          src="/images/logo-cream.png"
          alt=""
          aria-hidden
          width={300}
          height={258}
          className="pointer-events-none absolute -bottom-24 -right-20 w-[clamp(280px,30vw,460px)] opacity-[0.06]"
        />
        <div className="relative mx-auto max-w-[1180px]">
          <Reveal className="mb-[18px] font-mono text-[12.5px] uppercase tracking-[0.16em] text-tan max-[880px]:text-center">
            Our flavor collections
          </Reveal>
          <Reveal
            as="h2"
            delay={60}
            className="m-0 mb-[clamp(32px,4vw,48px)] max-w-[640px] font-hanken text-[clamp(28px,3.8vw,52px)] font-bold uppercase leading-[1.08] tracking-[-0.02em] text-[#F7EFE2] max-[880px]:mx-auto max-[880px]:text-center"
          >
            Four ways to
            <br />
            explore <span className="text-ember">flavor</span>.
          </Reveal>

          <Reveal
            delay={100}
            className="grid grid-cols-2 gap-x-[clamp(28px,4vw,64px)] gap-y-[clamp(30px,4vw,52px)] rounded-[24px] bg-white/[0.035] p-[clamp(24px,3.5vw,48px)] max-[720px]:grid-cols-1"
          >
            {COLLECTIONS.map((p) => (
              <div key={p.num}>
                <div className="font-hanken text-[clamp(30px,3vw,40px)] font-black leading-none text-[#C98A2E]">
                  {p.num}
                </div>
                <h3 className="mb-2 mt-3.5 text-[clamp(17px,1.6vw,21px)] font-bold text-[#F7EFE2]">
                  {p.title}
                </h3>
                <p className="m-0 max-w-[420px] text-[14.5px] leading-[1.66] text-[#E8CDBB]">
                  {p.body}
                </p>
              </div>
            ))}
          </Reveal>
          <Reveal
            delay={140}
            className="mt-[clamp(24px,3vw,36px)] max-w-[620px] text-[14.5px] leading-[1.66] text-[#E8CDBB] max-[880px]:mx-auto max-[880px]:text-center"
          >
            These collections give us a framework for exploring flavor while
            leaving room for new ideas.
          </Reveal>
        </div>
      </section>

      {/* ---------------------------- TESTIMONIALS ---------------------------- */}
      <section data-screen-label="Testimonials" className="bg-white px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)]">
        <div className="mx-auto max-w-[1180px]">
          <Reveal className="mx-auto mb-[clamp(36px,4.5vw,56px)] max-w-[560px] text-center">
            <div className={`${eyebrow} mb-4`}>Straight from our customers</div>
            <h2 className="m-0 font-hanken text-[clamp(28px,3.6vw,46px)] font-bold uppercase leading-[1.08] tracking-[-0.02em]">
              Don&apos;t take our
              <br />
              word for it
            </h2>
            <SketchReveal
              src="/images/doodle-flourish.png"
              width={925}
              height={235}
              className="mx-auto mt-5 w-[210px] max-w-[64%]"
            />
          </Reveal>

          <div className="grid grid-cols-3 gap-[clamp(16px,2vw,28px)] max-[560px]:grid-cols-1">
            {HOME_REVIEWS.map((r, i) => (
              <Reveal
                key={r.name}
                delay={i * 90}
                className="flex flex-col rounded-[20px] border border-ink/[0.07] bg-cream-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex gap-0.5 text-[#E8A33D]"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </span>
                  <MessageCircle className="h-5 w-5 text-[#1FAD52]" />
                </div>
                <p className="m-0 mt-4 flex-1 text-[15px] leading-[1.66] text-clay-800">
                  {r.text}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-[12.5px] font-bold text-white"
                    style={{ backgroundColor: r.color }}
                  >
                    {r.initials}
                  </span>
                  <span>
                    <span className="block font-hanken text-[15px] font-bold">
                      {r.name}
                    </span>
                    <span className="block font-mono text-[11px] text-clay">
                      via WhatsApp
                    </span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-9 text-center">
            <Link
              href="/order"
              className="inline-flex items-center gap-2.5 rounded-full bg-brand px-7 py-[14px] text-[14.5px] font-extrabold text-cream-light transition-transform hover:-translate-y-0.5"
            >
              Read more reviews <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------- HUNGRY YET ----------------------------- */}
      <section data-screen-label="Hungry" className="bg-[#EFECE5] px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)] text-center">
        <Reveal className="mx-auto max-w-[640px]">
          <div className={`${eyebrow} mb-4`}>Experience GrillMark</div>
          <h2 className="m-0 font-hanken text-[clamp(36px,5.5vw,72px)] font-extrabold uppercase leading-[0.96] tracking-[-0.025em]">
            Bring more flavor
            <br />
            to the table
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] text-[clamp(15px,1.25vw,18px)] leading-[1.65] text-clay-700">
            At home, cooking for family and friends, or creating something for
            your customers — GrillMark is made to be enjoyed in many ways.
            Message us on WhatsApp to get started.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a
              href={WA_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-brand px-8 py-[16px] text-[15.5px] font-extrabold text-cream-light transition-transform hover:-translate-y-[3px]"
            >
              Order on WhatsApp <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
            </a>
            <a
              href={`tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2.5 rounded-full border-[1.6px] border-ink/20 px-8 py-[16px] text-[15.5px] font-bold text-ink transition-colors hover:border-ink"
            >
              Call {CONTACT.phonePrimary}
            </a>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------- SOCIAL ------------------------------- */}
      <section data-screen-label="Social" className="px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-[clamp(28px,3.5vw,44px)] flex items-end justify-between gap-6 max-[880px]:flex-col max-[880px]:items-center max-[880px]:text-center">
            <Reveal className="max-[880px]:w-full">
              <div className={`${eyebrow} mb-3`}>
                @grillmark · Follow the flavor
              </div>
              <h2 className="m-0 font-hanken text-[clamp(26px,3.2vw,42px)] font-bold uppercase leading-[1.08] tracking-[-0.02em]">
                Smoke, snap
                <br className="max-[620px]:hidden" />
                <span className="hidden max-[620px]:inline"> </span>
                &amp; good times
              </h2>
            </Reveal>
            <Reveal
              delay={80}
              className="flex gap-2.5 max-[720px]:w-full max-[720px]:justify-between"
            >
              <a
                href="https://tiktok.com/@grillmark"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[13.5px] font-bold text-cream-light transition-transform hover:-translate-y-0.5"
              >
                <TikTok className="h-4 w-4" /> TikTok
              </a>
              <a
                href="https://facebook.com/grillmark"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink/12 bg-white px-5 py-2.5 text-[13.5px] font-bold text-ink transition-colors hover:border-ink"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            </Reveal>
          </div>

          <div className="grid grid-cols-6 gap-[clamp(10px,1.4vw,18px)] max-[1020px]:grid-cols-3 max-[560px]:grid-cols-2">
            {SOCIAL_TILES.map((label, i) => (
              <Reveal
                key={label}
                delay={i * 60}
                className="relative flex aspect-[4/5] flex-col items-center justify-center gap-1.5 rounded-[16px] bg-[#EAE4D6] text-clay"
              >
                <ImageIcon className="h-6 w-6 opacity-60" strokeWidth={1.5} />
                <span className="px-3 text-center text-[12.5px] font-semibold">
                  {label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] opacity-60">
                  Coming soon
                </span>
                <Instagram className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 opacity-40" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- NEWSLETTER ----------------------------- */}
      <section data-screen-label="Newsletter" className="bg-cocoa px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,88px)] text-cream-soft">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[1fr_1.1fr] items-start gap-[clamp(28px,4vw,64px)] max-[880px]:grid-cols-1">
          <Reveal className="max-[880px]:text-center">
            <div className="mb-4 font-mono text-[12.5px] uppercase tracking-[0.16em] text-tan">
              Join the grill list
            </div>
            <h2 className="m-0 font-hanken text-[clamp(24px,2.8vw,38px)] font-bold uppercase leading-[1.1] tracking-[-0.015em] text-[#F7EFE2]">
              Flavor, straight to your inbox
            </h2>
            <p className="mt-4 max-w-[420px] text-[14.5px] leading-[1.68] text-[#E8CDBB] max-[880px]:mx-auto">
              New recipes, new ingredients, new combinations — and the new ideas
              still ahead. No spam, just what&apos;s next from GrillMark.
            </p>
          </Reveal>
          <Reveal delay={100} className="sticky top-[110px] self-start max-[880px]:static">
            <NewsletterForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
