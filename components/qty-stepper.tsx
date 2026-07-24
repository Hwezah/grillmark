"use client";

import { cn } from "@/lib/utils";

/** The design's − / n / + pill stepper. */
export function QtyStepper({
  value,
  onChange,
  label,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <button
        type="button"
        aria-label={`Remove one ${label}`}
        disabled={value <= 0}
        onClick={() => onChange(Math.max(0, value - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-white text-[17px] font-bold text-ink transition-colors hover:border-ink disabled:opacity-35 disabled:hover:border-ink/15"
      >
        −
      </button>
      <span
        className={cn(
          "w-7 text-center font-mono text-[15px] font-bold",
          value > 0 ? "text-brand" : "text-clay"
        )}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label={`Add one ${label}`}
        onClick={() => onChange(value + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand text-[17px] font-bold text-cream-light transition-transform hover:-translate-y-px"
      >
        +
      </button>
    </div>
  );
}
