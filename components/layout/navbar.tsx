"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { BRAND, CONTACT, NAV_LINKS, WA_MAIN } from "@/lib/constants";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { Logo } from "@/components/layout/logo";

// The four links shown inline in the bar (the full set lives in the menu).
const BAR_LINKS = NAV_LINKS.filter((l) =>
  ["Home", "Products", "Butcher Shop", "Contact"].includes(l.label)
);

const POPULAR = ["Pork sausages", "Beef franks", "Smoked classics"];

export function Navbar() {
  const pathname = usePathname();
  const { user, toggleAccount } = useAuth();
  const { count } = useCart();

  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid((window.scrollY || 0) > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the fullscreen menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close overlays on route change + Escape.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Home opens on the dark hero — run the bar in cream until it goes solid.
  const onDark = pathname === "/" && !solid;

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-[clamp(18px,4vw,46px)] py-5 transition-[background,box-shadow,border-color] duration-300",
          solid
            ? "border-ink/[0.07] bg-cream/95 shadow-[0_14px_36px_-22px_rgba(0,0,0,0.55)] backdrop-blur-[14px]"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Left — inline links */}
        <div className="flex min-w-0 flex-1 items-center gap-[clamp(16px,2.2vw,36px)] max-[920px]:hidden">
          {BAR_LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.label}
                href={l.href}
                className={cn(
                  "whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.09em] transition-colors",
                  active
                    ? onDark
                      ? "font-bold text-ember"
                      : "font-bold text-brand"
                    : onDark
                      ? "text-cream-soft hover:text-ember"
                      : "text-ink hover:text-brand"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Logo — centred on desktop, pinned to the extreme left on mobile
            (where the inline links are hidden). */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-[920px]:static max-[920px]:mr-auto max-[920px]:translate-x-0 max-[920px]:translate-y-0">
          <Logo priority variant={onDark ? "cream" : "ink"} />
        </div>

        {/* Right — actions */}
        <div className="flex min-w-0 flex-1 items-center justify-end gap-[clamp(10px,1.4vw,18px)]">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className={cn(
              "flex p-1.5 transition-colors",
              onDark ? "text-cream-soft hover:text-ember" : "text-ink hover:text-brand"
            )}
          >
            <Search className="h-7 w-7" strokeWidth={1.6} />
          </button>

          <button
            type="button"
            onClick={toggleAccount}
            aria-label="Account"
            className={cn(
              "relative flex p-1.5 transition-colors",
              onDark ? "text-cream-soft hover:text-ember" : "text-ink hover:text-brand"
            )}
          >
            <User className="h-7 w-7" strokeWidth={1.6} />
            {user && (
              <span
                aria-hidden
                className="absolute right-0 top-0.5 h-[9px] w-[9px] rounded-full bg-dot shadow-[0_0_0_2px_rgba(20,8,6,0.35)]"
              />
            )}
          </button>

          <Link
            href="/cart"
            aria-label="Cart"
            className={cn(
              "relative flex p-1.5 transition-colors",
              onDark ? "text-cream-soft hover:text-ember" : "text-ink hover:text-brand"
            )}
          >
            <ShoppingCart className="h-7 w-7" strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute -right-[3px] -top-px flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-[5px] font-mono text-[11px] font-bold leading-[18px] text-cream-light">
                {count}
              </span>
            )}
          </Link>

          <a
            href={WA_MAIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand px-[22px] py-[11px] text-[13.5px] font-bold tracking-[0.04em] text-cream-light transition-transform hover:-translate-y-0.5 max-[760px]:hidden"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-dot shadow-[0_0_0_3px_rgba(123,227,139,0.3)]" />
            Shop Online
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
            className={cn(
              "flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-current",
              onDark ? "text-cream-soft" : "text-ink"
            )}
          >
            <Menu className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
      </nav>

      {/* ---------------------------- SEARCH SHEET ---------------------------- */}
      <div
        className={cn(
          "fixed inset-0 z-[70] transition-[opacity,visibility]",
          searchOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        )}
      >
        <button
          type="button"
          aria-label="Close search"
          onClick={() => setSearchOpen(false)}
          className="absolute inset-0 cursor-default bg-[rgba(20,8,6,0.28)]"
        />
        <div
          className={cn(
            "absolute inset-x-0 top-0 bg-cream px-[clamp(18px,4vw,46px)] py-[clamp(38px,6vh,72px)] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.4)] transition-transform duration-500",
            searchOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="mx-auto flex max-w-[1280px] items-center gap-[clamp(16px,3vw,40px)] border-b-2 border-ink">
            <input
              type="text"
              autoFocus={searchOpen}
              placeholder="Search for products …"
              className="w-full min-w-0 flex-1 bg-transparent px-0.5 py-2.5 text-[clamp(24px,3.2vw,42px)] font-semibold tracking-[-0.01em] text-ink outline-none placeholder:text-[#a89384]"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="-my-3.5 flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full text-ink transition-transform hover:rotate-90"
            >
              <X className="h-[30px] w-[30px]" strokeWidth={2} />
            </button>
          </div>
          <div className="mx-auto mt-[22px] flex max-w-[1280px] flex-wrap items-center gap-2.5">
            <span className="mr-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#9a877d]">
              Popular
            </span>
            {POPULAR.map((term) => (
              <Link
                key={term}
                href="/products"
                onClick={() => setSearchOpen(false)}
                className="rounded-full border border-ink/10 bg-white px-4 py-2 text-[13px] text-ink"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------------- FULLSCREEN MENU --------------------------- */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-[opacity,visibility]",
          menuOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 cursor-default bg-[rgba(20,8,6,0.45)]"
        />
        <div
          className={cn(
            "absolute inset-[clamp(12px,2.4vw,28px)] flex flex-col overflow-hidden rounded-[28px] bg-cocoa p-[clamp(30px,5vw,68px)] transition-all duration-500",
            menuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          )}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="absolute right-[clamp(20px,2.4vw,34px)] top-[clamp(20px,2.4vw,34px)] flex h-[54px] w-[54px] items-center justify-center rounded-full text-cream-soft transition-transform hover:rotate-90"
          >
            <X className="h-[42px] w-[42px]" strokeWidth={1.3} />
          </button>

          <nav className="mt-[clamp(48px,9vh,104px)] flex flex-col gap-[clamp(12px,1.8vh,24px)]">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "font-hanken text-[clamp(26px,2.8vw,34px)] font-light tracking-[-0.01em] transition-colors hover:text-ember",
                  isActive(l.href) ? "text-ember" : "text-cream-soft"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-wrap items-center justify-center gap-x-7 gap-y-3.5 text-center font-mono text-[12px] tracking-[0.08em] text-[#9a877d]">
            <span>{BRAND.location}</span>
            <span>{CONTACT.phonePrimary}</span>
            <span>{CONTACT.phoneSecondary}</span>
            <span>{BRAND.tagline}</span>
          </div>
        </div>
      </div>
    </>
  );
}
