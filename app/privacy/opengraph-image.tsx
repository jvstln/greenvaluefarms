import { contentType, makeOgImage, size } from "@/components/seo/og-image";
import { legal } from "@/lib/config/legal";
import { siteConfig } from "@/lib/config/site";

export { contentType, size };

export const alt = `Privacy Policy — ${siteConfig.business.name}`;

export default async function OgImage() {
  const { business } = siteConfig;

  return makeOgImage({
    eyebrow: `Legal · ${business.name}`,
    title: "Privacy Policy",
    subtitle: legal.privacyPolicy.summary,
    footer: `Order on WhatsApp · ${business.contact.phoneDisplay}`,
  });
}
