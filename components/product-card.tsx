import Image from "next/image";

import { waOrder, type Product } from "@/lib/constants";

/** A single product tile — pack shot, name, weight and a WhatsApp order link. */
export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-[20px] border border-ink/[0.07] bg-cream-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-30px_rgba(32,13,10,0.55)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F2E9DA]">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.weight} pack`}
          fill
          sizes="(max-width: 620px) 90vw, (max-width: 1060px) 45vw, 280px"
          priority={priority}
          className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-cocoa/90 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-cream-soft">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-[22px]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-hanken text-[18px] font-semibold leading-tight tracking-[-0.01em] text-ink">
            {product.name}
          </h3>
          <span className="shrink-0 rounded-full bg-brand/10 px-2.5 py-1 font-mono text-[11px] font-bold text-brand">
            {product.weight}
          </span>
        </div>

        <p className="mt-2.5 text-[13.5px] leading-[1.6] text-clay-600">
          {product.blurb}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-[18px]">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-clay">
            {product.cook}
          </span>
          <a
            href={waOrder(product.name, product.weight)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[13px] font-bold text-cream-light transition-transform hover:-translate-y-0.5"
          >
            Order <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
