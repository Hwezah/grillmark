import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * The GrillMark badge. Uses the full-colour mark on light surfaces and the
 * cream mark on dark ones (footer, menu). Assets live in /public/images.
 */
export function Logo({
  variant = "ink",
  className,
  href = "/",
  priority = false,
}: {
  variant?: "ink" | "cream";
  className?: string;
  href?: string;
  priority?: boolean;
}) {
  const src =
    variant === "cream" ? "/images/logo-cream.png" : "/images/logo-full.png";

  return (
    <Link
      href={href}
      aria-label="GrillMark — Marked by Flavour"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={src}
        alt="GrillMark"
        width={186}
        height={160}
        priority={priority}
        className="h-[46px] w-auto max-[520px]:h-[38px]"
      />
    </Link>
  );
}
