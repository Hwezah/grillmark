"use client";

import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

interface RevealProps {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Scroll-reveal wrapper — mirrors the handoff's `data-reveal` behaviour.
 * Elements start hidden (`.reveal`) and animate in when they enter the
 * viewport, with an optional stagger `delay` (ms).
 */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect users who prefer reduced motion — reveal immediately.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            obs.disconnect();
          }
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: cn("reveal", className),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
      ...rest,
    },
    children
  );
}
