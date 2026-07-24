"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { Check } from "lucide-react";

const Sparkles = dynamic(
  () => import("@/components/sparkles").then((m) => m.Sparkles),
  { ssr: false }
);

const NOTES = [
  {
    title: "Grilled your way",
    body: "Sold raw and ready for the fire",
    className:
      "left-[-8%] top-[38%] min-[1100px]:left-[-16%] max-[840px]:static",
  },
  {
    title: "No fillers, ever",
    body: "Just clean meat and honest seasoning",
    className:
      "right-[-8%] top-[2%] min-[1100px]:right-[-16%] max-[840px]:static",
  },
  {
    title: "Made fresh in Ntinda",
    body: "Cured and delivered cold to your door",
    className:
      "bottom-[4%] right-[-6%] min-[1100px]:right-[-14%] max-[840px]:static",
  },
];

/**
 * "Why GrillMark" plate scene: Three.js sparkles glowing behind the plate,
 * GSAP floating the annotation cards and gently bobbing the plate.
 */
export function HomeWhy() {
  const scope = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? 10 : -10,
          duration: 2.6 + i * 0.35,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
      gsap.to("[data-plate]", {
        y: -12,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={scope} className="relative mx-auto max-w-[900px]">
      {/* Static soft blobs from the design */}
      <span aria-hidden className="absolute -left-6 top-[6%] h-14 w-14 rounded-full bg-ember/60 max-[840px]:hidden" />
      <span aria-hidden className="absolute left-[6%] top-[42%] h-9 w-9 rounded-full bg-[#F4CBA6] max-[840px]:hidden" />
      <span aria-hidden className="absolute right-[10%] top-[30%] h-4 w-4 rounded-full bg-ember max-[840px]:hidden" />
      <span aria-hidden className="absolute bottom-[10%] left-[16%] h-3 w-3 rounded-full bg-clay/60 max-[840px]:hidden" />
      <span aria-hidden className="absolute -left-10 bottom-[2%] h-10 w-10 rounded-full bg-[#F7DEC4] max-[840px]:hidden" />

      <div className="relative mx-auto w-[min(74vw,480px)] max-[840px]:w-[min(88vw,420px)]">
        {/* Sparkles glowing behind the plate */}
        <Sparkles
          mode="fountain"
          count={130}
          sizeRange={[0.06, 0.24]}
          speed={0.9}
          className="pointer-events-none absolute -inset-x-[26%] -bottom-[10%] -top-[30%]"
        />
        <div data-plate className="relative aspect-square">
          <Image
            src="/images/plate-sausages.png"
            alt="A plate of grilled GrillMark sausages with asparagus, potatoes and cherry tomatoes"
            fill
            sizes="(max-width: 840px) 88vw, 480px"
            className="object-contain drop-shadow-[0_40px_48px_rgba(32,13,10,0.3)]"
          />
        </div>
      </div>

      {/* Floating annotation cards — absolute on desktop, stacked on mobile */}
      <div className="max-[840px]:mt-7 max-[840px]:grid max-[840px]:gap-3">
        {NOTES.map((note) => (
          <div
            key={note.title}
            data-float
            className={`absolute z-10 w-[230px] rounded-[16px] bg-white p-4 shadow-[0_22px_44px_-24px_rgba(32,13,10,0.4)] max-[840px]:w-full ${note.className}`}
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
          Learn more about GrillMark <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
