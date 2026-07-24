import Link from "next/link";

import { WA_MAIN } from "@/lib/constants";

/** Placeholder for routes whose designs aren't in the handoff yet. */
export function ComingSoon({
  title,
  blurb,
}: {
  title: string;
  blurb?: string;
}) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 pt-[120px] text-center">
      <span className="mb-5 font-mono text-[12.5px] uppercase tracking-[0.16em] text-brand-deep">
        Coming soon
      </span>
      <h1 className="m-0 font-hanken text-[clamp(40px,7vw,88px)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-ink">
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-[440px] text-[clamp(15px,1.25vw,18px)] leading-[1.65] text-clay-700">
        {blurb ??
          "This page is still on the grill. In the meantime, place your order on WhatsApp or read our story."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3.5">
        <a
          href={WA_MAIN}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full bg-brand px-8 py-[15px] text-[15px] font-extrabold text-cream-light transition-transform hover:-translate-y-[3px]"
        >
          Order on WhatsApp
        </a>
        <Link
          href="/about"
          className="inline-flex items-center gap-2.5 rounded-full border-[1.6px] border-ink/20 px-8 py-[15px] text-[15px] font-bold text-ink transition-colors hover:border-ink"
        >
          Our story
        </Link>
      </div>
    </section>
  );
}
