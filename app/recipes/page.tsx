import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CookingPot,
  Flame,
  ImageIcon,
  Microwave,
  Utensils,
} from "lucide-react";

import { WA_MAIN } from "@/lib/constants";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Recipes and cooking ideas for GrillMark sausages and franks — on the grill, in the pan, shallow-fried or air-fried.",
};

const eyebrow =
  "font-mono text-[12.5px] uppercase tracking-[0.16em] text-brand-deep";

const METHODS = [
  {
    num: "01",
    Icon: Flame,
    title: "On the grill",
    body: "Medium coals, turn often, 12–15 min until charred and cooked through.",
  },
  {
    num: "02",
    Icon: CookingPot,
    title: "In the pan",
    body: "A little oil over medium heat, 10–14 min, turning for an even golden skin.",
  },
  {
    num: "03",
    Icon: Utensils,
    title: "Shallow-fried",
    body: "Our customers' favourite — crisped with onions & tomato for a fuller plate.",
  },
  {
    num: "04",
    Icon: Microwave,
    title: "Air-fryer",
    body: "190°C for 8–10 min, no oil needed — crisp skin, juicy centre.",
  },
];

const RECIPES = [
  {
    tag: "Lunch · 20 min",
    title: "Classic Beef Burger",
    body: "Beef sausage meat pressed into patties, seared hard and stacked with cheese and onion.",
  },
  {
    tag: "Breakfast · 15 min",
    title: "Sausage Breakfast Plate",
    body: "Shallow-fried sausages with eggs, chapati and chai — the GrillMark morning.",
  },
  {
    tag: "Snack · 12 min",
    title: "Beef Frank Sandwich",
    body: "Sliced franks, caramelised onion and mustard tucked into a soft roll.",
  },
  {
    tag: "Guide · Braai",
    title: "Braai & BBQ Tips",
    body: "Low and slow, turn often and rest before serving for the perfect char.",
  },
  {
    tag: "Dinner · 25 min",
    title: "Loaded Pizza Toppings",
    body: "Sliced sausage and franks over melting mozzarella for a loaded home pizza.",
  },
  {
    tag: "Quick · 8 min",
    title: "Air-Fryer Franks",
    body: "Eight minutes at 190°C for crisp-skinned, juicy franks with zero oil.",
  },
];

const TIPS = [
  {
    num: "01",
    title: "Don't prick them",
    body: "Piercing the skin lets the juices escape. Leave them whole for a juicier bite.",
  },
  {
    num: "02",
    title: "Medium heat wins",
    body: "Too hot chars the outside before the middle cooks. Keep it steady and turn often.",
  },
  {
    num: "03",
    title: "Rest before serving",
    body: "Give them 2–3 minutes off the heat so the juices settle back in.",
  },
];

const TIMES = [
  { value: "15 min", label: "On the grill" },
  { value: "12 min", label: "In the pan" },
  { value: "8 min", label: "Air-fryer" },
  { value: "3 min", label: "Rest & serve" },
];

export default function RecipesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      {/* ------------------------------- HERO ------------------------------- */}
      <header className="px-[clamp(18px,4vw,46px)] pb-[clamp(40px,5vw,72px)] pt-[152px] text-center">
        <div className="mx-auto max-w-[880px]">
          <Reveal className="mb-5 inline-flex items-center gap-2.5">
            <span className={eyebrow}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ember align-middle" />
              Recipes &amp; cooking ideas
            </span>
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            className="m-0 font-hanken text-[clamp(44px,7vw,98px)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em]"
          >
            Make your <span className="text-brand">mark</span>
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mx-auto mt-[22px] max-w-[560px] text-[clamp(16px,1.35vw,19px)] leading-[1.65] text-clay-700"
          >
            We get the flavour right — you make the final mark on the grill, in
            the pan or in the air-fryer. Here&apos;s how our customers cook
            GrillMark best.
          </Reveal>
        </div>
      </header>

      {/* ------------------------------ METHODS ------------------------------ */}
      <section className="px-[clamp(18px,4vw,46px)] pb-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1080px]">
          <Reveal className="mx-auto mb-[clamp(36px,4vw,52px)] max-w-[640px] text-center">
            <div className={`${eyebrow} mb-4`}>In the kitchen</div>
            <h2 className="m-0 font-hanken text-[clamp(28px,3.6vw,48px)] font-semibold uppercase leading-[1.05] tracking-[-0.02em]">
              Four ways to cook it
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[15.5px] leading-[1.7] text-clay-600">
              Sold raw and ready, GrillMark takes to any heat. Pick your method
              and timing — the mark is yours to make.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-[clamp(16px,2vw,28px)] max-[620px]:grid-cols-1">
            {METHODS.map((m, i) => (
              <Reveal
                key={m.num}
                delay={i * 80}
                className="rounded-[20px] bg-cream-card p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-cocoa text-tan">
                    <m.Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <span className="font-hanken text-[clamp(38px,4vw,50px)] font-black leading-none text-ink/[0.12]">
                    {m.num}
                  </span>
                </div>
                <h3 className="mb-2 mt-5 font-hanken text-[19px] font-bold">
                  {m.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.62] text-clay-600">
                  {m.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- RECIPE BOX ----------------------------- */}
      <section className="bg-cream-soft px-[clamp(18px,4vw,46px)] py-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1080px]">
          <Reveal className="mx-auto mb-[clamp(36px,4vw,52px)] max-w-[640px] text-center">
            <div className={`${eyebrow} mb-4`}>The recipe box</div>
            <h2 className="m-0 font-hanken text-[clamp(28px,3.6vw,48px)] font-semibold uppercase leading-[1.05] tracking-[-0.02em]">
              Ideas for every plate
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 gap-[clamp(16px,2vw,28px)] max-[620px]:grid-cols-1">
            {RECIPES.map((r, i) => (
              <Reveal
                key={r.title}
                delay={i * 70}
                className="overflow-hidden rounded-[20px] bg-cream-card"
              >
                <div className="flex aspect-[16/9] flex-col items-center justify-center gap-2 bg-[#EAE4D6] text-clay">
                  <ImageIcon className="h-7 w-7 opacity-60" strokeWidth={1.5} />
                  <span className="text-[13.5px]">Photo coming soon</span>
                </div>
                <div className="p-6">
                  <div className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-brand">
                    {r.tag}
                  </div>
                  <h3 className="mb-2 mt-2 font-hanken text-[20px] font-bold">
                    {r.title}
                  </h3>
                  <p className="m-0 text-[14.5px] leading-[1.62] text-clay-600">
                    {r.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ PRO TIPS ------------------------------ */}
      <section className="relative overflow-hidden bg-cocoa px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)] text-cream-soft">
        <Image
          src="/images/logo-cream.png"
          alt=""
          aria-hidden
          width={560}
          height={482}
          className="pointer-events-none absolute -right-24 -top-16 w-[clamp(280px,32vw,480px)] opacity-[0.05]"
        />
        <div className="relative mx-auto max-w-[1080px]">
          <Reveal className="mb-[18px] font-mono text-[12.5px] uppercase tracking-[0.16em] text-tan">
            Pro tips
          </Reveal>
          <Reveal
            as="h2"
            delay={60}
            className="m-0 mb-[clamp(36px,4.5vw,56px)] font-hanken text-[clamp(30px,4.4vw,58px)] font-semibold uppercase leading-[1.02] tracking-[-0.025em] text-[#F7EFE2]"
          >
            Grill it like we would
          </Reveal>
          <div className="grid max-w-[720px] gap-[clamp(28px,3.5vw,44px)]">
            {TIPS.map((t, i) => (
              <Reveal key={t.num} delay={i * 90}>
                <div className="font-hanken text-[clamp(36px,3.6vw,48px)] font-black leading-none text-ember/[0.55]">
                  {t.num}
                </div>
                <h3 className="mb-1.5 mt-3 text-[clamp(18px,1.7vw,23px)] font-bold text-[#F7EFE2]">
                  {t.title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.64] text-[#CDB6A8]">
                  {t.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- TIMES -------------------------------- */}
      <section className="bg-white px-[clamp(18px,4vw,46px)] py-[clamp(54px,6vw,84px)]">
        <div className="mx-auto grid max-w-[1080px] grid-cols-4 gap-[clamp(18px,2vw,32px)] max-[720px]:grid-cols-2 max-[720px]:gap-y-[38px]">
          {TIMES.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="text-center">
              <div className="font-anton text-[clamp(34px,4.2vw,58px)] leading-none text-brand">
                {s.value}
              </div>
              <div className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.1em] text-clay">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------- CTA --------------------------------- */}
      <section className="bg-white px-[clamp(18px,4vw,46px)] pb-[clamp(72px,8vw,116px)] pt-[clamp(20px,3vw,40px)]">
        <Reveal className="mx-auto max-w-[1080px] rounded-[28px] bg-gradient-to-br from-brand to-brand-deep p-[clamp(36px,5vw,64px)] text-center text-cream-light">
          <h2 className="m-0 font-hanken text-[clamp(30px,4.6vw,60px)] font-semibold uppercase leading-[0.98] tracking-[-0.025em]">
            Hungry now?
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-[clamp(15px,1.25vw,18px)] leading-[1.6] text-[#F6D8CF]">
            Reading about it only gets you so far. Order a pack on WhatsApp and
            put a recipe to the test tonight.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <a
              href={WA_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-cream-light px-8 py-[16px] text-[15.5px] font-extrabold text-brand transition-transform hover:-translate-y-[3px]"
            >
              Order on WhatsApp <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
            </a>
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 rounded-full border-[1.6px] border-cream-light/40 px-8 py-[16px] text-[15.5px] font-bold text-cream-light transition-colors hover:border-cream-light"
            >
              See the range
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
