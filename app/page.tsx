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

import { CONTACT, WA_MAIN } from "@/lib/constants";
import { REVIEWS } from "@/lib/reviews";
import { Reveal } from "@/components/reveal";
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

const PILLARS = [
  {
    num: "01",
    title: "Sold Raw & Ready",
    body: "We deliver fresh, raw links so you own the grill — the char, the snap, the moment it is done just right.",
  },
  {
    num: "02",
    title: "Real Cuts, No Fillers",
    body: "Honest meat and clean seasoning. Nothing stretched, nothing you cannot pronounce.",
  },
  {
    num: "03",
    title: "Marked by Flavour",
    body: "Signature spice blends that brand every bite with the GrillMark taste.",
  },
  {
    num: "04",
    title: "Made in Ntinda",
    body: "Crafted in Kampala by Salvation Foods and delivered cold, straight to your door.",
  },
];

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

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-cream text-ink">
      {/* ------------------------------- HERO ------------------------------- */}
      <HomeHero />

      {/* ------------------------------- STORY ------------------------------ */}
      <section className="px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,96px)]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[1.05fr_0.95fr] items-center gap-[clamp(28px,4.5vw,72px)] max-[880px]:grid-cols-1">
          <Reveal className="relative">
            <span className="ml-[6%] inline-block -rotate-6 font-hanken text-[15px] font-bold leading-tight text-ink max-[880px]:text-[17px]">
              Made from <span className="text-ember">100%</span>
              <br />
              organic meat
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

          <Reveal delay={100}>
            <div className={`${eyebrow} mb-4`}>Our story</div>
            <h2 className="m-0 font-hanken text-[clamp(28px,3.4vw,44px)] font-bold uppercase leading-[1.06] tracking-[-0.02em]">
              A mark you can taste
            </h2>
            <p className="mt-5 max-w-[480px] text-[15.5px] leading-[1.72] text-clay-700">
              GrillMark began in a small kitchen in Ntinda with one stubborn
              belief — that a sausage should taste of the meat inside it, not
              the fillers around it. So we built our own blends, sourced honest
              cuts, and left the rest out.
            </p>
            <p className="mt-4 max-w-[480px] text-[15.5px] leading-[1.72] text-clay-700">
              Every link leaves us <strong className="text-ink">raw and ready</strong>{" "}
              — so the final mark is yours to make on the grill. We just make
              sure flavour gets there first.
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
      <section className="bg-white px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-[clamp(30px,4vw,48px)] flex items-end justify-between gap-6 max-[620px]:flex-col max-[620px]:items-center max-[620px]:text-center">
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
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-cocoa px-6 py-3 text-[14px] font-bold text-cream-soft transition-transform hover:-translate-y-0.5"
              >
                View all products <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
              </Link>
            </Reveal>
          </div>
          <HomeRange />
        </div>
      </section>

      {/* ---------------------------- WHY / PLATE ---------------------------- */}
      <section className="overflow-hidden px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)]">
        <div className="mx-auto max-w-[1180px]">
          <Reveal className="mx-auto mb-[clamp(36px,4.5vw,60px)] max-w-[720px] text-center">
            <h2 className="m-0 font-hanken text-[clamp(26px,3.2vw,42px)] font-bold leading-[1.14] tracking-[-0.015em]">
              Why GrillMark? Because the{" "}
              <span className="text-brand">flavour speaks</span> for itself.
            </h2>
            <SketchReveal
              src="/images/doodle-flourish.png"
              width={925}
              height={235}
              className="mx-auto mt-4 w-[200px] max-w-[62%]"
            />
            <p className="mx-auto mt-5 max-w-[560px] text-[15.5px] leading-[1.7] text-clay-700">
              From the very first bite the difference is clear. Real cuts, real
              smoke and clean seasoning — sold raw and ready so the final mark
              is yours to make on the grill.
            </p>
          </Reveal>
          <HomeWhy />
        </div>
      </section>

      {/* --------------------------- RAW ON ARRIVAL --------------------------- */}
      <section className="relative overflow-hidden bg-cocoa px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)] text-cream-soft">
        <Image
          src="/images/logo-cream.png"
          alt=""
          aria-hidden
          width={560}
          height={482}
          className="pointer-events-none absolute -bottom-24 -right-20 w-[clamp(280px,30vw,460px)] opacity-[0.06]"
        />
        <div className="relative mx-auto max-w-[1180px]">
          <Reveal className="mb-[18px] font-mono text-[12.5px] uppercase tracking-[0.16em] text-tan max-[560px]:text-center">
            Why GrillMark
          </Reveal>
          <Reveal
            as="h2"
            delay={60}
            className="m-0 mb-[clamp(32px,4vw,48px)] max-w-[640px] font-hanken text-[clamp(28px,3.8vw,52px)] font-bold uppercase leading-[1.08] tracking-[-0.02em] text-[#F7EFE2] max-[560px]:mx-auto max-[560px]:text-center"
          >
            Raw on arrival.
            <br />
            <span className="text-ember">Yours</span> on the grill.
          </Reveal>

          <Reveal
            delay={100}
            className="grid grid-cols-2 gap-x-[clamp(28px,4vw,64px)] gap-y-[clamp(30px,4vw,52px)] rounded-[24px] bg-white/[0.035] p-[clamp(24px,3.5vw,48px)] max-[720px]:grid-cols-1"
          >
            {PILLARS.map((p) => (
              <div key={p.num}>
                <div className="font-hanken text-[clamp(30px,3vw,40px)] font-black leading-none text-[#8a6d54]">
                  {p.num}
                </div>
                <h3 className="mb-2 mt-3.5 text-[clamp(17px,1.6vw,21px)] font-bold text-[#F7EFE2]">
                  {p.title}
                </h3>
                <p className="m-0 max-w-[420px] text-[14.5px] leading-[1.66] text-[#CDB6A8]">
                  {p.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------------------- TESTIMONIALS ---------------------------- */}
      <section className="bg-white px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)]">
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
      <section className="bg-[#EFECE5] px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)] text-center">
        <Reveal className="mx-auto max-w-[640px]">
          <div className={`${eyebrow} mb-4`}>Order today · Delivered cold</div>
          <h2 className="m-0 font-hanken text-[clamp(36px,5.5vw,72px)] font-extrabold uppercase leading-[0.96] tracking-[-0.025em]">
            Hungry yet?
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] text-[clamp(15px,1.25vw,18px)] leading-[1.65] text-clay-700">
            Send us a message on WhatsApp and we&apos;ll have your GrillMark
            order on its way across Kampala.
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
      <section className="px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-[clamp(28px,3.5vw,44px)] flex items-end justify-between gap-6 max-[720px]:flex-col max-[720px]:items-center max-[720px]:text-center">
            <Reveal className="max-[720px]:w-full">
              <div className={`${eyebrow} mb-3`}>
                @grillmark · Follow the flavour
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
                className="inline-flex items-center gap-2 rounded-full bg-cocoa px-5 py-2.5 text-[13.5px] font-bold text-cream-soft transition-transform hover:-translate-y-0.5"
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
      <section className="bg-cocoa px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,88px)] text-cream-soft">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[1fr_1.1fr] items-center gap-[clamp(28px,4vw,64px)] max-[880px]:grid-cols-1">
          <Reveal>
            <div className="mb-4 font-mono text-[12.5px] uppercase tracking-[0.16em] text-tan">
              Join the grill list
            </div>
            <h2 className="m-0 font-hanken text-[clamp(24px,2.8vw,38px)] font-bold uppercase leading-[1.1] tracking-[-0.015em] text-[#F7EFE2]">
              Flavour, straight to your inbox
            </h2>
            <p className="mt-4 max-w-[420px] text-[14.5px] leading-[1.68] text-[#CDB6A8]">
              New product drops, recipes and cooking ideas, seasonal promotions
              and holiday specials — no spam, just the good stuff.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <NewsletterForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
