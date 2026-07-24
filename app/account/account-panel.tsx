"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

function initialsFrom(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

export function AccountPanel() {
  const { user, loading, configured, openModal } = useAuth();

  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(120%_120%_at_50%_0%,#2a110d_0%,#1b0b08_60%)] px-5 py-10">
      <div className="w-full max-w-[440px] rounded-[24px] bg-cream p-[38px_34px_34px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
        <div className="mb-[18px] flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
          <span className="h-[7px] w-[7px] rounded-full bg-ember shadow-[0_0_10px_1px_rgba(226,79,2,0.6)]" />
          GrillMark Account
        </div>

        {loading ? (
          <div className="py-6 text-[14.5px] text-clay">Loading…</div>
        ) : user ? (
          <>
            <div className="mb-[26px] flex items-center gap-[15px]">
              <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-brand font-anton text-[22px] text-cream-light">
                {initialsFrom(fullName)}
              </div>
              <div className="min-w-0">
                <div className="text-[19px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink">
                  {fullName}
                </div>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[13.5px] text-clay">
                  {user.email}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="h-[50px] w-full border-brand/[0.28] text-brand hover:bg-[#fdeceb]"
              onClick={() => openModal("signout")}
            >
              Sign out
            </Button>
          </>
        ) : (
          <>
            <div className="mb-2 font-anton text-[30px] leading-[1.05] tracking-[0.01em] text-ink">
              Welcome to
              <br />
              the grill.
            </div>
            <p className="m-0 mb-6 text-[14.5px] leading-[1.55] text-clay-700">
              Sign in to track orders, save your grill box, and check out
              faster.
            </p>
            <div className="flex gap-[11px] max-[560px]:flex-col">
              <Button
                className="h-[50px] flex-1"
                onClick={() => openModal("login")}
              >
                Sign in
              </Button>
              <Button
                variant="outline"
                className="h-[50px] flex-1"
                onClick={() => openModal("signup")}
              >
                Create account
              </Button>
            </div>
          </>
        )}

        <div className="mt-[22px] border-t border-ink/10 pt-4 font-mono text-[10.5px] leading-[1.5] tracking-[0.03em] text-[#a2917f]">
          {configured
            ? "Secured by Supabase authentication."
            : "Session preview · add Supabase keys to switch on real accounts."}
        </div>
      </div>
    </div>
  );
}
