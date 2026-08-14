import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { FloatingOrderBar } from "@/components/shared/floating-order-bar";
import { OrderSummarySheet } from "@/components/shared/order-summary-sheet";
import { siteConfig } from "@/lib/config/site";
import { LightboxProvider } from "@/lib/lightbox-store";
import { OrderProvider } from "@/lib/order-store";
import "./globals.css";

/* Archivo — confident, slightly condensed sans for headlines. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

/* Hanken Grotesk — friendly, readable grotesque for body / UI. */
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

/* IBM Plex Mono — numerals, labels and ticket data. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.business.name} — ${siteConfig.business.tagline}`,
  description: siteConfig.business.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e7" },
    { media: "(prefers-color-scheme: dark)", color: "#141a12" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${hankenGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#content"
          className="sr-only rounded-md bg-accent px-4 py-2 font-semibold text-accent-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        <OrderProvider>
          <LightboxProvider>
            {children}
            <OrderSummarySheet />
            <FloatingOrderBar />
          </LightboxProvider>
        </OrderProvider>
      </body>
    </html>
  );
}
