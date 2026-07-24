"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";

const Sparkles = dynamic(
  () => import("@/components/sparkles").then((m) => m.Sparkles),
  { ssr: false }
);

/**
 * Home hero from the design: full-height cocoa screen, ember sparkles
 * (Three.js), centred cream badge and CTAs. GSAP staggers the entrance.
 */
export function HomeHero() {
  const scope = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-logo]", { scale: 0.9, opacity: 0, duration: 1.1 })
        .from(
          "[data-hero-item]",
          { y: 26, opacity: 0, duration: 0.7, stagger: 0.12 },
          "-=0.55"
        );
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-cocoa px-[clamp(18px,4vw,46px)] py-[140px]"
    >
      {/* Warm vignette + ember sparkles */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,79,2,0.10),transparent_58%)]"
      />
      <Sparkles mode="drift" count={110} sizeRange={[0.03, 0.12]} speed={0.8} />

      <div className="relative mx-auto flex max-w-[760px] flex-col items-center text-center">
        <p
          data-hero-item
          className="m-0 mb-7 font-mono text-[12.5px] uppercase tracking-[0.2em] text-tan"
        >
          Salvation Foods · Ntinda, Kampala
        </p>

        <div data-hero-logo>
          <Image
            src="/images/logo-cream.png"
            alt="GrillMark — Marked by Flavour · Taste & See"
            width={740}
            height={637}
            priority
            className="h-auto w-[clamp(250px,34vw,380px)]"
          />
        </div>

        <p
          data-hero-item
          className="m-0 mt-8 max-w-[480px] text-[clamp(16px,1.4vw,19px)] leading-[1.6] text-cream-soft/90"
        >
          Premium sausages &amp; franks — sold raw, made to be grilled.
        </p>

        <div data-hero-item className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-ember to-brand px-8 py-[16px] text-[15px] font-extrabold text-white shadow-[0_18px_40px_-16px_rgba(226,79,2,0.65)] transition-transform hover:-translate-y-[3px]"
          >
            Our Sausages and Franks <span aria-hidden>→</span>
          </Link>
          <Link
            href="/order#wholesale"
            className="inline-flex items-center gap-2.5 rounded-full border-[1.6px] border-cream-soft/30 px-8 py-[16px] text-[15px] font-bold text-cream-soft transition-colors hover:border-cream-soft"
          >
            Wholesale Enquiries
          </Link>
        </div>
      </div>
    </section>
  );
}
