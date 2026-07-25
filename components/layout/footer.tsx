import Link from "next/link";
import Image from "next/image";

import { BRAND, CONTACT, NAV_LINKS, WA_MAIN } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cocoa px-[clamp(18px,4vw,46px)] pb-9 pt-[clamp(54px,6vw,82px)] text-[#E9D8CB]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-[1.6fr_1fr_1fr] items-end gap-x-[clamp(28px,4vw,56px)] max-[620px]:items-start gap-y-[clamp(24px,3vw,52px)] border-b border-[#E9D8CB]/[0.14] pb-[clamp(38px,4vw,56px)] max-[620px]:grid-cols-2">
          {/* Brand */}
          <div className="max-[620px]:col-span-2">
            <Image
              src="/images/logo-cream.png"
              alt="GrillMark"
              width={220}
              height={189}
              className="mb-5 h-[84px] w-auto"
            />
            <span className="sr-only">GrillMark — {BRAND.tagline}</span>
            <a
              href={BRAND.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-1 inline-block font-mono text-[13px] tracking-[0.03em] text-tan transition-colors hover:text-white"
            >
              {BRAND.site}
            </a>
            <p className="m-0 max-w-[300px] text-[14.5px] leading-[1.6] text-[#B89C8E]">
              Premium sausages &amp; franks, sold raw and ready. Marked by
              flavour — crafted by {BRAND.company} in Ntinda, Kampala.
            </p>
            <p className="mt-1.5 max-w-[300px] text-[14.5px] leading-[1.6] text-[#B89C8E]">
              <span className="mr-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-tan">
                Visit:
              </span>
              {BRAND.location}
            </p>
          </div>

          {/* Contact — sits between the brand block and Explore */}
          <div>
            <div className="mb-[18px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-tan">
              Get in touch
            </div>
            <div className="flex flex-col gap-3 text-[15px]">
              <a
                href={WA_MAIN}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#E9D8CB] transition-colors hover:text-white"
              >
                {CONTACT.phonePrimary}
              </a>
              <a
                href={`tel:${CONTACT.phoneSecondary.replace(/\s/g, "")}`}
                className="font-medium text-[#E9D8CB] transition-colors hover:text-white"
              >
                {CONTACT.phoneSecondary}
              </a>
              <a
                href={`mailto:${CONTACT.emailGeneral}`}
                className="font-medium text-[#E9D8CB] transition-colors hover:text-white"
              >
                {CONTACT.emailGeneral}
              </a>
              <a
                href={`mailto:${CONTACT.emailOrders}`}
                className="font-medium text-[#E9D8CB] transition-colors hover:text-white"
              >
                {CONTACT.emailOrders}
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <div className="mb-[18px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-tan">
              Explore
            </div>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[15px] font-medium text-[#E9D8CB] transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-[26px] font-mono text-[11.5px] tracking-[0.06em] text-[#8a6a5c]">
          <span>
            © {year} {BRAND.company} · GrillMark
          </span>
          <span>{BRAND.taglineLong}</span>
        </div>
      </div>
    </footer>
  );
}
