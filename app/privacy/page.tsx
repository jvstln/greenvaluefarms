import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/sections/site-header";
import { LegalContent } from "@/components/shared/legal-content";
import { legal } from "@/lib/config/legal";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `${legal.privacyPolicy.title} — ${siteConfig.business.name}`,
  description: legal.privacyPolicy.summary,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    siteName: siteConfig.business.name,
    title: `${legal.privacyPolicy.title} — ${siteConfig.business.name}`,
    description: legal.privacyPolicy.summary,
    url: "/privacy",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: `${legal.privacyPolicy.title} — ${siteConfig.business.name}`,
    description: legal.privacyPolicy.summary,
  },
};

export default function PrivacyPolicyPage() {
  const { privacyPolicy } = legal;

  return (
    <>
      <SiteHeader />
      <main id="content">
        <LegalContent
          eyebrow="Legal"
          title={privacyPolicy.title}
          summary={privacyPolicy.summary}
          lastUpdated={legal.lastUpdated}
          sections={privacyPolicy.sections}
        />
      </main>
      <Footer />
    </>
  );
}
