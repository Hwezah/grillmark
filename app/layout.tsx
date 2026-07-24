import type { Metadata } from "next";
import { Anton, Hanken_Grotesk, Space_Mono } from "next/font/google";

import "./globals.css";
import { BRAND } from "@/lib/constants";
import { Providers } from "@/app/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthModals } from "@/components/auth/auth-modals";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GrillMark — Marked by Flavour",
    template: "%s — GrillMark",
  },
  description:
    "GrillMark makes honest sausages and franks in Ntinda, Kampala — real cuts, bold seasoning, no fillers. Marked by flavour. Taste & see.",
  metadataBase: new URL(BRAND.siteUrl),
  openGraph: {
    title: "GrillMark — Marked by Flavour",
    description:
      "Honest sausages and franks from Ntinda, Kampala. Real cuts, bold seasoning, no fillers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${spaceMono.variable} ${anton.variable}`}
    >
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AuthModals />
        </Providers>
      </body>
    </html>
  );
}
