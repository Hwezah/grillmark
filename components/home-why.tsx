"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { DeferredSparkles } from "@/components/deferred-sparkles";

// Card set and placement from the reference recording: two hugging the
// plate's shoulders, two at its lower rim.
const NOTES = [
  {
    title: "Bold, honest flavour",
    body: "Real smoke and spice in every link",
    className: "left-[3%] top-[7%] max-[900px]:static",
  },
  {
    title: "No fillers, ever",
    body: "Just clean meat and honest seasoning",
    className: "right-[3%] top-[3%] max-[900px]:static",
  },
  {
    title: "Grilled your way",
    body: "Sold raw and ready for the fire",
    className: "left-[3%] top-[56%] max-[900px]:static",
  },
  {
    title: "Made fresh in Ntinda",
    body: "Cured and delivered cold to your door",
    className: "right-[3%] top-[62%] max-[900px]:static",
  },
];

/**
 * "Why GrillMark" plate scene: bubbles popping around the plate (Three.js,
 * loaded after first paint) with the annotation cards and plate drifting on
 * CSS keyframes — see globals.css `gm-float-*` / `gm-plate-bob`.
 */
export function HomeWhy() {
  return (
    <div className="relative mx-auto max-w-[900px]">
      <div className="relative mx-auto w-[min(74vw,480px)] max-[900px]:w-[min(88vw,420px)]">
        {/* Bubbles popping around the plate */}
        <DeferredSparkles
          mode="pop"
          count={16}
          sizeRange={[0.06, 0.4]}
          speed={1}
          className="pointer-events-none absolute -inset-[24%]"
        />
        <div className="gm-plate-bob relative aspect-square">
          <Image
            src="/images/plate-sausages.png"
            alt="A plate of grilled GrillMark sausages with asparagus, potatoes and cherry tomatoes"
            fill
            sizes="(max-width: 900px) 88vw, 480px"
            className="object-contain drop-shadow-[0_40px_48px_rgba(32,13,10,0.3)]"
          />
        </div>
      </div>

      {/* Floating annotation cards — absolute on desktop, stacked on mobile */}
      <div className="max-[900px]:mt-7 max-[900px]:grid max-[900px]:gap-3">
        {NOTES.map((note, i) => (
          <div
            key={note.title}
            style={{ "--gm-dur": `${(2.6 + i * 0.35) * 2}s` } as CSSProperties}
            className={`${i % 2 ? "gm-float-down" : "gm-float-up"} absolute z-10 w-[230px] rounded-[16px] bg-white p-4 shadow-[0_22px_44px_-24px_rgba(32,13,10,0.4)] max-[900px]:w-full ${note.className}`}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </span>
              <span>
                <span className="block font-hanken text-[15px] font-bold text-ink">
                  {note.title}
                </span>
                <span className="mt-0.5 block text-[13px] leading-[1.5] text-clay-600">
                  {note.body}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/about"
          className="inline-flex items-center gap-2.5 rounded-full bg-brand px-8 py-[16px] text-[15px] font-extrabold text-cream-light transition-transform hover:-translate-y-[3px]"
        >
          Learn more about GrillMark <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
