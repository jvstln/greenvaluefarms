import { contentType, makeOgImage, size } from "@/components/seo/og-image";
import { aboutUs } from "@/lib/config/about-us";
import { siteConfig } from "@/lib/config/site";

export { contentType, size };

export const alt = `${aboutUs.sectionLabel} — ${siteConfig.business.name}`;

export default async function OgImage() {
  const { business } = siteConfig;

  return makeOgImage({
    eyebrow: `About · ${business.name}`,
    title: "Built on family expertise,\nrun like a real farm business.",
    subtitle: aboutUs.summary,
    footer: `Order on WhatsApp · ${business.contact.phoneDisplay}`,
  });
}
