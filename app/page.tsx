import Link from "next/link";

import { BRAND, WA_MAIN } from "@/lib/constants";
import { Reveal } from "@/components/reveal";

/**
 * Home landing. No dedicated design was in the handoff yet, so this is a
 * faithful-to-system placeholder hero — swap it when the Home design lands.
 */
export default function HomePage() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-cream px-[clamp(18px,4vw,46px)] pt-[120px]">
      <div className="mx-auto w-full max-w-[1080px] text-center">
        <Reveal className="mb-6 inline-flex items-center gap-2.5">
          <span className="font-mono text-[12.5px] uppercase tracking-[0.16em] text-brand-deep">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ember align-middle" />
            {BRAND.company} · Ntinda, Kampala
          </span>
        </Reveal>

        <Reveal
          as="h1"
          delay={60}
          className="m-0 font-hanken text-[clamp(48px,8.5vw,120px)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-ink"
        >
          Marked by
          <br />
          <span className="text-brand">flavour</span>
        </Reveal>

        <Reveal
          as="p"
          delay={120}
          className="mx-auto mt-7 max-w-[560px] text-[clamp(16px,1.35vw,19px)] leading-[1.65] text-clay-700"
        >
          Honest sausages and franks from Kampala — real cuts, bold seasoning,
          no fillers. Sold raw and ready, so the final mark on the grill is
          yours.
        </Reveal>

        <Reveal
          delay={180}
          className="mt-9 flex flex-wrap justify-center gap-3.5"
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
            href="/about"
            className="inline-flex items-center gap-2.5 rounded-full border-[1.6px] border-ink/20 px-8 py-[17px] text-[15.5px] font-bold text-ink transition-colors hover:border-ink"
          >
            Our story <span>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
