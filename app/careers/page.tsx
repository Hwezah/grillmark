import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Clock, Heart, TrendingUp, Users } from "lucide-react";

import { CONTACT, waLink } from "@/lib/constants";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the GrillMark crew — open roles in production, delivery, sales and the kitchen at Salvation Foods Ltd, Ntinda, Kampala.",
};

const eyebrow =
  "font-mono text-[12.5px] uppercase tracking-[0.16em] text-brand-deep";

const PERKS = [
  {
    num: "01",
    Icon: TrendingUp,
    title: "Grow with us",
    body: "A young brand scaling fast — real room to grow as we do.",
  },
  {
    num: "02",
    Icon: Users,
    title: "A tight crew",
    body: "Small team, big standards. Your work is seen and it matters.",
  },
  {
    num: "03",
    Icon: Clock,
    title: "Fair & flexible",
    body: "Honest pay and schedules that respect your time.",
  },
  {
    num: "04",
    Icon: Heart,
    title: "Made with pride",
    body: "Be part of a product that people genuinely love.",
  },
];

const STEPS = [
  {
    title: "1. Send your CV.",
    body: (
      <>
        Message us on WhatsApp or email{" "}
        <a
          href={`mailto:${CONTACT.emailGeneral}`}
          className="font-semibold text-brand hover:underline"
        >
          {CONTACT.emailGeneral}
        </a>{" "}
        with the role you&apos;re after and a little about yourself.
      </>
    ),
  },
  {
    title: "2. A quick chat.",
    body: "If it's a fit, we'll call you to talk through the role, your experience and what you're looking for.",
  },
  {
    title: "3. Come cook with us.",
    body: "Spend a short practical day with the team so we both know it's right — then we make it official.",
  },
];

const ROLES = [
  {
    title: "Production Assistant",
    tag: "Full-time · Ntinda",
    body: "Help make and pack our sausages & franks to the GrillMark quality standard.",
  },
  {
    title: "Delivery Rider",
    tag: "Full-time · Kampala",
    body: "Keep the cold chain moving and get orders to customers fresh and on time.",
  },
  {
    title: "Sales & Wholesale Rep",
    tag: "Full-time · Kampala",
    body: "Grow our restaurant, hotel, café and supermarket accounts across the city.",
  },
  {
    title: "Kitchen / R&D Cook",
    tag: "Part-time · Ntinda",
    body: "Test blends and help develop new GrillMark recipes and products.",
  },
];

const STATS = [
  { value: "4", label: "Roles open now" },
  { value: "Ntinda", label: "Where we're based" },
  { value: "Small", label: "Team, big standards" },
  { value: "Cold", label: "Chain, done right" },
];

function applyLink(role: string): string {
  return waLink(`Hi GrillMark! I'd like to apply for the ${role} role.`);
}

export default function CareersPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      {/* ------------------------------- HERO ------------------------------- */}
      <header className="px-[clamp(18px,4vw,46px)] pb-[clamp(40px,5vw,72px)] pt-[152px] text-center">
        <div className="mx-auto max-w-[880px]">
          <Reveal className="mb-5 inline-flex items-center gap-2.5">
            <span className={eyebrow}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ember align-middle" />
              Careers · Salvation Foods Ltd
            </span>
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            className="m-0 font-hanken text-[clamp(44px,7vw,98px)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em]"
          >
            Join the <span className="text-brand">crew</span>
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mx-auto mt-[22px] max-w-[560px] text-[clamp(16px,1.35vw,19px)] leading-[1.65] text-clay-700"
          >
            GrillMark is growing across Kampala, and we&apos;re always looking
            for people who care about doing things properly. Come make the mark
            with us.
          </Reveal>
        </div>
      </header>

      {/* ------------------------------- PERKS ------------------------------- */}
      <section className="px-[clamp(18px,4vw,46px)] pb-[clamp(56px,7vw,96px)]">
        <div className="mx-auto max-w-[1080px]">
          <Reveal className="mx-auto mb-[clamp(36px,4vw,52px)] max-w-[640px] text-center">
            <div className={`${eyebrow} mb-4`}>Why work here</div>
            <h2 className="m-0 font-hanken text-[clamp(28px,3.6vw,48px)] font-semibold uppercase leading-[1.05] tracking-[-0.02em]">
              More than a job
            </h2>
            <p className="mx-auto mt-4 max-w-[500px] text-[15.5px] leading-[1.7] text-clay-600">
              We&apos;re a small team with big standards, building a brand
              people love. Here&apos;s what you can expect working with us.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-[clamp(16px,2vw,28px)] max-[620px]:grid-cols-1">
            {PERKS.map((p, i) => (
              <Reveal
                key={p.num}
                delay={i * 80}
                className="rounded-[20px] bg-cream-card p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-cocoa text-tan">
                    <p.Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <span className="font-hanken text-[clamp(38px,4vw,50px)] font-black leading-none text-ink/[0.12]">
                    {p.num}
                  </span>
                </div>
                <h3 className="mb-2 mt-5 font-hanken text-[19px] font-bold">
                  {p.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.62] text-clay-600">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- HOW TO APPLY ---------------------------- */}
      <section className="px-[clamp(18px,4vw,46px)] pb-[clamp(64px,8vw,104px)]">
        <div className="mx-auto max-w-[880px]">
          <Reveal>
            <div className={`${eyebrow} mb-4`}>Getting hired</div>
            <h2 className="m-0 font-hanken text-[clamp(28px,3.6vw,48px)] font-semibold uppercase leading-[1.05] tracking-[-0.02em]">
              How to apply
            </h2>
          </Reveal>
          <div className="mt-7 grid gap-5">
            {STEPS.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 80}
                as="p"
                className="m-0 text-[clamp(15.5px,1.3vw,18px)] leading-[1.7] text-clay-800"
              >
                <strong className="text-ink">{s.title}</strong> {s.body}
              </Reveal>
            ))}
          </div>
          <Reveal
            delay={260}
            as="p"
            className="m-0 mt-8 font-hanken text-[clamp(18px,1.7vw,24px)] font-medium italic leading-[1.5] text-ember"
          >
            &ldquo;We hire for care and standards — the rest we&apos;ll teach
            you.&rdquo;
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ OPEN ROLES ----------------------------- */}
      <section
        id="roles"
        className="relative overflow-hidden bg-cocoa px-[clamp(18px,4vw,46px)] py-[clamp(64px,8vw,108px)] text-cream-soft"
      >
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
            Now hiring
          </Reveal>
          <Reveal
            as="h2"
            delay={60}
            className="m-0 mb-[clamp(32px,4vw,48px)] font-hanken text-[clamp(32px,4.6vw,60px)] font-semibold uppercase leading-none tracking-[-0.025em] text-[#F7EFE2]"
          >
            Open roles
          </Reveal>

          <div className="grid gap-4">
            {ROLES.map((r, i) => (
              <Reveal
                key={r.title}
                delay={i * 80}
                className="flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="min-w-0 flex-1 basis-[300px]">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="m-0 font-hanken text-[clamp(19px,1.8vw,24px)] font-bold text-[#F7EFE2]">
                      {r.title}
                    </h3>
                    <span className="rounded-full bg-white/10 px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-tan">
                      {r.tag}
                    </span>
                  </div>
                  <p className="m-0 mt-2 text-[14.5px] leading-[1.6] text-[#CDB6A8]">
                    {r.body}
                  </p>
                </div>
                <a
                  href={applyLink(r.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-[14.5px] font-extrabold text-white transition-transform hover:-translate-y-0.5"
                >
                  Apply <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- STATS -------------------------------- */}
      <section className="bg-white px-[clamp(18px,4vw,46px)] py-[clamp(54px,6vw,84px)]">
        <div className="mx-auto grid max-w-[1080px] grid-cols-4 gap-[clamp(18px,2vw,32px)] max-[720px]:grid-cols-2 max-[720px]:gap-y-[38px]">
          {STATS.map((s, i) => (
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
          <h2 className="m-0 font-hanken text-[clamp(28px,4.2vw,56px)] font-semibold uppercase leading-[0.98] tracking-[-0.025em]">
            Don&apos;t see your role?
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-[clamp(15px,1.25vw,18px)] leading-[1.6] text-[#F6D8CF]">
            We&apos;re always glad to meet good people. Send your CV and tell us
            how you&apos;d like to help GrillMark grow.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <a
              href={waLink("Hi GrillMark! I'd like to send my CV.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-cream-light px-8 py-[16px] text-[15.5px] font-extrabold text-brand transition-transform hover:-translate-y-[3px]"
            >
              Send your CV <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
            </a>
            <a
              href="#roles"
              className="inline-flex items-center gap-2.5 rounded-full border-[1.6px] border-cream-light/40 px-8 py-[16px] text-[15.5px] font-bold text-cream-light transition-colors hover:border-cream-light"
            >
              See open roles
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
