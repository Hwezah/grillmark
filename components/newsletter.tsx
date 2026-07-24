"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "Join the grill list" signup — front-end only until a list provider lands. */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState("error");
      return;
    }
    setState("done");
  };

  if (state === "done") {
    return (
      <div className="rounded-[18px] border border-white/12 bg-white/[0.04] px-6 py-6 text-center">
        <p className="m-0 font-hanken text-[17px] font-bold text-cream-soft">
          You&apos;re on the grill list ✓
        </p>
        <p className="m-0 mt-1.5 text-[13.5px] text-[#9a877d]">
          Flavour news is headed to {email.trim()}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={submit}
        className="flex items-center gap-2 rounded-[18px] border border-white/12 bg-white/[0.04] p-2"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="Enter your email"
          aria-label="Email address"
          className="w-full min-w-0 flex-1 rounded-[12px] border border-white/10 bg-transparent px-4 py-3 text-[15px] text-cream-soft outline-none placeholder:text-[#8d7a70] focus:border-ember/60"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ember px-6 py-3 text-[14.5px] font-extrabold text-white transition-transform hover:-translate-y-0.5"
        >
          Subscribe <span aria-hidden>→</span>
        </button>
      </form>
      <p className="m-0 mt-3 font-mono text-[11.5px] tracking-[0.04em] text-[#8d7a70]">
        {state === "error"
          ? "Please enter a valid email address."
          : "We'll only email you about GrillMark. Unsubscribe anytime."}
      </p>
    </div>
  );
}
