import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { ProductsPage } from "@/components/sections/products-page";
import { SiteHeader } from "@/components/sections/site-header";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Products — ${siteConfig.business.name}`,
  description: siteConfig.productsPage.sub,
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    siteName: siteConfig.business.name,
    title: `Products — ${siteConfig.business.name}`,
    description: siteConfig.productsPage.sub,
    url: "/products",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: `Products — ${siteConfig.business.name}`,
    description: siteConfig.productsPage.sub,
  },
};

export default function ProductsRoute() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <ProductsPage />
      </main>
      <Footer />
    </>
  );
}
