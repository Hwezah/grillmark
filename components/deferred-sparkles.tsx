"use client";

import { useEffect, useState, type ComponentProps } from "react";
import dynamic from "next/dynamic";

import type { Sparkles } from "@/components/sparkles";

const LazySparkles = dynamic(
  () => import("@/components/sparkles").then((m) => m.Sparkles),
  { ssr: false }
);

/**
 * Sparkles are decorative, and Three.js is by far the heaviest thing the site
 * ships. Holding the import until the browser is idle (and skipping it for
 * reduced-motion or data-saver visitors) keeps ~340 kB off the critical path,
 * so the hero paints and becomes interactive first.
 */
export function DeferredSparkles(props: ComponentProps<typeof Sparkles>) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    // Honour Save-Data / very slow links by skipping the effect entirely.
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData || /^(slow-)?2g$/.test(conn?.effectiveType ?? "")) return;

    const idle =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => setShow(true), { timeout: 2000 });
    return () => cancel(handle as number);
  }, []);

  if (!show) return null;
  return <LazySparkles {...props} />;
}
