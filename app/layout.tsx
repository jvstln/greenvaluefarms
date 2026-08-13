import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/lib/config/site";
import { OrderProvider } from "@/lib/order-store";
import { OrderSummarySheet } from "@/components/shared/order-summary-sheet";
import { FloatingOrderBar } from "@/components/shared/floating-order-bar";
import "./globals.css";

/* Fraunces — characterful variable serif used for all headings. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

/* Plus Jakarta Sans — clean geometric sans for body / UI. */
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.business.name} — ${siteConfig.business.tagline}`,
  description: siteConfig.business.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrderProvider>
          {children}
          <OrderSummarySheet />
          <FloatingOrderBar />
        </OrderProvider>
      </body>
    </html>
  );
}