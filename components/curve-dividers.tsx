"use client";

import { useEffect } from "react";

export interface CurveEntry {
  /** Matches a section's `data-screen-label`. The curve sits at its top edge. */
  label: string;
  /** Colour of the section above the boundary. */
  from: string;
  /** Colour of the section below the boundary. */
  to: string;
}

interface CurveDividersProps {
  entries: CurveEntry[];
  span?: number;
  max?: number;
  idleAmp?: number;
}

const NS = "http://www.w3.org/2000/svg";

/**
 * React port of the handoff's `curve-dividers.js`. Paints a living quadratic
 * curve between two coloured sections — the bend glides with scroll and
 * breathes gently at rest. Only the curve's bulge is painted, so it never
 * covers the next section's content.
 */
export function CurveDividers({
  entries,
  span = 40,
  max = 64,
  idleAmp = 6,
}: CurveDividersProps) {
  useEffect(() => {
    if (!entries.length) return;

    const SPAN = span;
    const VB = SPAN * 2;

    const layer = document.createElement("div");
    layer.setAttribute("data-gm-curves", "");
    layer.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:0;z-index:5;pointer-events:none;";
    document.body.appendChild(layer);

    type Curve = {
      sec: Element;
      wrap: HTMLDivElement;
      top: SVGPathElement;
      bot: SVGPathElement;
      phase: number;
    };

    const curves: Curve[] = [];

    entries.forEach((e, i) => {
      const sec = document.querySelector(`[data-screen-label="${e.label}"]`);
      if (!sec) return;

      const wrap = document.createElement("div");
      wrap.style.cssText = `position:absolute;left:0;width:100%;height:${VB}px;overflow:visible;pointer-events:none;will-change:transform;`;

      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("viewBox", `0 0 1000 ${VB}`);
      svg.setAttribute("preserveAspectRatio", "none");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.style.cssText = "display:block;overflow:visible;";

      const top = document.createElementNS(NS, "path");
      top.setAttribute("fill", e.from || "#ffffff");
      const bot = document.createElementNS(NS, "path");
      bot.setAttribute("fill", e.to || "#ffffff");
      svg.appendChild(top);
      svg.appendChild(bot);
      wrap.appendChild(svg);
      layer.appendChild(wrap);

      curves.push({ sec, wrap, top, bot, phase: i * 1.7 });
    });

    // A curve's document offset only moves when layout does, so measure it on
    // resize rather than every frame — reading getBoundingClientRect in the
    // rAF loop forced a reflow per curve, per frame.
    const offsets = new Map<Curve, number>();
    const measure = () => {
      const sy = window.scrollY || window.pageYOffset || 0;
      for (const c of curves) {
        const top = c.sec.getBoundingClientRect().top + sy;
        offsets.set(c, top);
        c.wrap.style.top = `${top - SPAN}px`;
      }
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(document.body);

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const paint = (c: Curve, bend: number) => {
      const cpY = (SPAN + bend).toFixed(1);
      if (bend <= 0) {
        c.bot.setAttribute(
          "d",
          `M0,${SPAN + 4} L0,${SPAN} Q500.0,${cpY} 1000,${SPAN} L1000,${SPAN + 4} Z`
        );
        c.top.setAttribute("d", "");
      } else {
        c.top.setAttribute(
          "d",
          `M0,${SPAN - 4} L0,${SPAN} Q500.0,${cpY} 1000,${SPAN} L1000,${SPAN - 4} Z`
        );
        c.bot.setAttribute("d", "");
      }
    };

    // Reduced motion: paint each seam flat once and skip the loop entirely.
    if (reduced) {
      for (const c of curves) paint(c, 0);
      return () => {
        ro.disconnect();
        if (layer.parentNode) layer.parentNode.removeChild(layer);
      };
    }

    let raf = 0;
    const t0 = performance.now();

    const frame = (now: number) => {
      const vh = window.innerHeight || 800;
      const sy = window.scrollY || window.pageYOffset || 0;
      const scrollBend = Math.sin((sy / (vh * 1.5)) * Math.PI) * max;
      const tt = (now - t0) / 1000;

      for (const c of curves) {
        // Skip seams that are nowhere near the viewport — off-screen curves
        // cost a style recalc for something nobody can see.
        const top = offsets.get(c) ?? 0;
        if (top < sy - vh || top > sy + vh * 2) continue;
        paint(c, scrollBend + Math.sin(tt * 0.5 + c.phase) * idleAmp);
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      if (layer.parentNode) layer.parentNode.removeChild(layer);
    };
  }, [entries, span, max, idleAmp]);

  return null;
}
