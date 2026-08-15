import { contentType, makeOgImage, size } from "@/components/seo/og-image";
import { products } from "@/lib/config/products";
import { siteConfig } from "@/lib/config/site";
import { formatPrice } from "@/lib/format";

export { contentType, size };

export const alt = `Products — ${siteConfig.business.name}`;

export default async function OgImage() {
  const { business } = siteConfig;
  const heroProduct = products[0];

  /* Avoid the ₦ glyph — not in the bundled OG fonts (see app/opengraph-image.tsx). */
  const naira = formatPrice(heroProduct.price, heroProduct.currency);

  return makeOgImage({
    eyebrow: `Products · ${business.name}`,
    title: "Every cut,\npriced honestly.",
    subtitle:
      "Whole birds, parts and live birds — farm-raised in Nsukka, delivered across Nigeria.",
    ticket: {
      caption: `No. 01 · ${heroProduct.name}`,
      price: naira.replace("₦", ""),
      unit: `NGN · ${heroProduct.unit}`,
    },
    footer: `Order on WhatsApp · ${business.contact.phoneDisplay}`,
  });
}
