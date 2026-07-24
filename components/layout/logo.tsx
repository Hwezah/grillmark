import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Text wordmark placeholder standing in for the real `grillmark-logo-*.png`
 * assets (which can't travel through chat). Drop the PNGs into /public/uploads
 * and swap this for an <Image> when they're committed.
 */
export function Logo({
  variant = "ink",
  className,
  href = "/",
}: {
  variant?: "ink" | "cream";
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="GrillMark home"
      className={cn(
        "font-anton text-2xl leading-none tracking-[0.02em]",
        variant === "cream" ? "text-cream-light" : "text-ink",
        className
      )}
    >
      GRILL<span className="text-brand">MARK</span>
    </Link>
  );
}
