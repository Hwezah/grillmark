"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Hand-drawn doodle (PNG artwork) that "writes" itself in with a wipe that
 * follows the stroke direction whenever it scrolls into view — and resets
 * when it leaves, so it re-draws each time it re-enters.
 *
 * The clip lives on an inner element: clipping the observed element itself
 * would zero out its visible area and starve both IntersectionObserver and
 * the browser's lazy-loader. (see globals.css `.sketch-reveal`)
 */
export function SketchReveal({
  src,
  width,
  height,
  className,
  alt = "",
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
  alt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setDrawn(entry.isIntersecting),
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden={alt === ""}>
      <div className={cn("sketch-reveal", drawn && "is-drawn")}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="eager"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
