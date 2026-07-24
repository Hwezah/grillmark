import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Cart", href: "/cart" },
  { label: "Details", href: "/cart/details" },
  { label: "Payment", href: "/cart/payment" },
] as const;

/**
 * Shared checkout progress stepper. `current` is the active step index
 * (0 = Cart, 1 = Details, 2 = Payment). Completed and active steps light up
 * in brand red; completed steps link back so shoppers can step in and out.
 */
export function CheckoutSteps({ current }: { current: 0 | 1 | 2 }) {
  return (
    <ol className="m-0 mt-6 flex list-none items-center gap-0 p-0">
      {STEPS.map((step, i) => {
        const done = i < current;
        const lit = i <= current;
        const circle = (
          <span className="flex items-center gap-2.5">
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full font-mono text-[12.5px] font-bold transition-colors",
                lit ? "bg-brand text-cream-light" : "bg-ink/[0.08] text-clay"
              )}
            >
              {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
            </span>
            <span
              className={cn(
                "text-[14.5px] font-semibold transition-colors",
                lit ? "text-ink" : "text-clay"
              )}
            >
              {step.label}
            </span>
          </span>
        );

        return (
          <li key={step.label} className="flex items-center">
            {done ? (
              <Link href={step.href} className="transition-opacity hover:opacity-80">
                {circle}
              </Link>
            ) : (
              circle
            )}
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "mx-4 h-px w-[clamp(20px,5vw,56px)] transition-colors",
                  i < current ? "bg-brand" : "bg-ink/15"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
