import { contentType, makeOgImage, size } from "@/components/seo/og-image";
import { products } from "@/lib/config/products";
import { siteConfig } from "@/lib/config/site";
import { formatPrice } from "@/lib/format";

export { contentType, size };

export const alt = `${siteConfig.business.name} — ${siteConfig.business.tagline}`;

export default async function OgImage() {
  const { business } = siteConfig;
  const heroProduct = products[0];

  /* Avoid the ₦ glyph — not in the bundled OG fonts, ImageResponse can't
     hot-download a fallback at runtime. Render "11,500 · NGN per bird". */
  const naira = formatPrice(heroProduct.price, heroProduct.currency);

  return makeOgImage({
    eyebrow: `${business.name} · Nsukka, Enugu`,
    title: "Farm-fresh chickens,\nraised right.",
    subtitle: business.description,
    ticket: {
      caption: `No. 01 · ${heroProduct.name}`,
      price: naira.replace("₦", ""),
      unit: `NGN · ${heroProduct.unit}`,
    },
    footer: `Order on WhatsApp · ${business.contact.phoneDisplay}`,
  });
}
