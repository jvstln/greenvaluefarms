import { contentType, makeOgImage, size } from "@/components/seo/og-image";
import { legal } from "@/lib/config/legal";
import { siteConfig } from "@/lib/config/site";

export { contentType, size };

export const alt = `Terms of Service — ${siteConfig.business.name}`;

export default async function OgImage() {
  const { business } = siteConfig;

  return makeOgImage({
    eyebrow: `Legal · ${business.name}`,
    title: "Terms of Service",
    subtitle: legal.terms.summary,
    footer: `Order on WhatsApp · ${business.contact.phoneDisplay}`,
  });
}
