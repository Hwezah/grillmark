"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

import { PRODUCTS, waLink, type PackSize } from "@/lib/constants";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

const EATERS = ["Just me", "Two of us", "Family of 4–6", "Party crowd"];
const CUTS = ["Beef", "Chicken", "Mix it up"];
const SPICE = ["Easy on spice", "Balanced", "Bring the heat"];
const HEAT = ["Grill", "Pan", "Air-fryer", "Shallow-fry"];

const PACKS_FOR_EATERS: Record<string, number> = {
  "Just me": 1,
  "Two of us": 2,
  "Family of 4–6": 4,
  "Party crowd": 6,
};

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1.5">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-[14px] border border-ink/10 bg-white px-4 py-3.5 text-[15px] text-ink outline-none focus:border-brand"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

/** "Find the perfect grill pack" — quiz selects that suggest a box. */
export function PackFinder() {
  const { addItem } = useCart();
  const [eaters, setEaters] = useState("");
  const [cut, setCut] = useState("");
  const [spice, setSpice] = useState("");
  const [heat, setHeat] = useState("");
  const [showPicks, setShowPicks] = useState(false);
  const [addedPicks, setAddedPicks] = useState(false);

  const picks = useMemo(() => {
    const packs = PACKS_FOR_EATERS[eaters] ?? 2;
    const pool =
      cut === "Beef"
        ? PRODUCTS.filter((p) => p.slug.startsWith("beef"))
        : cut === "Chicken"
          ? PRODUCTS.filter((p) => p.slug.startsWith("chicken"))
          : PRODUCTS;
    const size: PackSize = packs >= 4 ? "1kg" : "500g";
    // Spread the pack count across the pool, sausages first.
    const result = new Map<string, { name: string; size: PackSize; qty: number }>();
    for (let i = 0; i < packs; i++) {
      const p = pool[i % pool.length];
      const cur = result.get(p.slug);
      if (cur) cur.qty += 1;
      else result.set(p.slug, { name: p.name, size, qty: 1 });
    }
    return Array.from(result.entries()).map(([slug, v]) => ({ slug, ...v }));
  }, [eaters, cut]);

  const waMessage = waLink(
    [
      "Hi GrillMark! Help me pick a grill pack:",
      eaters && `• Eating: ${eaters}`,
      cut && `• Cut: ${cut}`,
      spice && `• Spice: ${spice}`,
      heat && `• Cooking on: ${heat}`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  const addPicks = () => {
    for (const p of picks) addItem(p.slug, p.size, p.qty);
    setAddedPicks(true);
    window.setTimeout(() => setAddedPicks(false), 1600);
  };

  return (
    <div className="mx-auto max-w-[900px] rounded-[24px] bg-white p-[clamp(20px,3vw,30px)] shadow-[0_24px_50px_-38px_rgba(32,13,10,0.5)]">
      <div className="flex flex-wrap gap-3">
        <Select label="Who's eating?" value={eaters} options={EATERS} onChange={setEaters} />
        <Select label="Pick your cut" value={cut} options={CUTS} onChange={setCut} />
        <Select label="Spice level" value={spice} options={SPICE} onChange={setSpice} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Select label="Cooking on" value={heat} options={HEAT} onChange={setHeat} />
        <button
          type="button"
          onClick={() => setShowPicks(true)}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-[15px] font-extrabold text-cream-light transition-transform hover:-translate-y-0.5"
        >
          See my picks <ArrowRight className="h-[17px] w-[17px]" aria-hidden />
        </button>
      </div>

      {showPicks && (
        <div className="mt-5 rounded-[16px] border border-ink/[0.08] bg-cream p-5">
          <div className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-brand-deep">
            Our pick for you
          </div>
          <ul className="m-0 mt-2.5 flex list-none flex-col gap-1.5 p-0 text-[15px] text-ink">
            {picks.map((p) => (
              <li key={p.slug}>
                {p.name} ({p.size}) × {p.qty}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={addPicks}
              className="rounded-full bg-cocoa px-5 py-2.5 text-[13.5px] font-bold text-cream-soft transition-transform hover:-translate-y-0.5"
            >
              {addedPicks ? "Added to your box ✓" : "Add picks to my box"}
            </button>
            <a
              href={waMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-[1.5px] border-ink/15 px-5 py-2.5 text-[13.5px] font-bold text-ink transition-colors hover:border-ink"
            >
              Ask us instead
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
