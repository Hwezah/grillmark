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
    default: "GrillMark — Marked by Flavor",
    template: "%s — GrillMark",
  },
  description:
    "GrillMark is a food brand inspired by the possibilities of flavor. Starting in Uganda with distinctive sausages and franks, and a growing world of foods to come. Marked by Flavor.",
  metadataBase: new URL(BRAND.siteUrl),
  openGraph: {
    title: "GrillMark — Marked by Flavor",
    description:
      "A food brand inspired by the possibilities of flavor, creating food people remember. By Salvation Foods Ltd. Made in Uganda.",
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
      <head>
        {/*
          Arms the scroll-reveal hidden states before first paint, and disarms
          them again if the app never hydrates (blocked bundle, offline copy),
          so a JS failure can't leave whole sections sitting at opacity 0.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('gm-js');" +
              "setTimeout(function(){if(!window.__gmReady)" +
              "document.documentElement.classList.remove('gm-js');},4000);",
          }}
        />
      </head>
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
