"use client";

import { useState } from "react";

import { COMING_SOON, PRODUCTS } from "@/lib/constants";
import { ProductCard, ComingSoonCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Sausages", "Franks", "Pork", "Smoked"] as const;
type Category = (typeof CATEGORIES)[number];

function countFor(cat: Category): number {
  if (cat === "All") return PRODUCTS.length + COMING_SOON.length;
  return (
    PRODUCTS.filter((p) => p.category === cat).length +
    COMING_SOON.filter((p) => p.category === cat).length
  );
}

/** Filterable range grid: live products first, then coming-soon cards. */
export function RangeGrid() {
  const [cat, setCat] = useState<Category>("All");

  const live = PRODUCTS.filter((p) => cat === "All" || p.category === cat);
  const soon = COMING_SOON.filter((p) => cat === "All" || p.category === cat);

  return (
    <>
      <div className="mb-[clamp(32px,4vw,52px)] flex flex-wrap gap-2.5">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors",
              c === cat
                ? "bg-brand text-cream-light"
                : "border-[1.5px] border-ink/12 text-ink hover:border-ink"
            )}
          >
            {c} <span className={c === cat ? "text-cream-light/70" : "text-clay"}>· {countFor(c)}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-[clamp(16px,2vw,28px)] max-[560px]:grid-cols-1 min-[1060px]:grid-cols-2">
        {live.map((product, i) => (
          <Reveal key={product.slug} delay={i * 70}>
            <ProductCard product={product} priority={i < 2} />
          </Reveal>
        ))}
        {soon.map((p, i) => (
          <Reveal key={p.slug} delay={(live.length + i) * 70}>
            <ComingSoonCard name={p.name} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
