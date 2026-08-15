import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/sections/site-header";
import { LegalContent } from "@/components/shared/legal-content";
import { legal } from "@/lib/config/legal";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `${legal.terms.title} — ${siteConfig.business.name}`,
  description: legal.terms.summary,
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    siteName: siteConfig.business.name,
    title: `${legal.terms.title} — ${siteConfig.business.name}`,
    description: legal.terms.summary,
    url: "/terms",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: `${legal.terms.title} — ${siteConfig.business.name}`,
    description: legal.terms.summary,
  },
};

export default function TermsOfServicePage() {
  const { terms } = legal;

  return (
    <>
      <SiteHeader />
      <main id="content">
        <LegalContent
          eyebrow="Legal"
          title={terms.title}
          summary={terms.summary}
          lastUpdated={legal.lastUpdated}
          sections={terms.sections}
        />
      </main>
      <Footer />
    </>
  );
}
