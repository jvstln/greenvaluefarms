import { siteConfig } from "@/lib/config/site";

/**
 * JSON-LD structured-data helpers, rendered as `<script type="application/ld+json">`
 * blocks. All values come from the config files — no business data is hardcoded here.
 * Components are server-rendered so the markup lands in the initial HTML.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD payload built from config, never user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** LocalBusiness (Farm) schema — mounted once in the root layout. */
export function JsonLdLocalBusiness() {
  const { business, products } = siteConfig;
  const { contact, socials, url, name, description, logo } = business;

  const [streetAddress, addressRegion, addressCountry] =
    contact.address.split(", ");

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Farm",
        name,
        url,
        image: `${url}/opengraph-image`,
        logo: `${url}${logo.src}`,
        description,
        telephone: `+${contact.whatsappNumber}`,
        email: contact.email,
        priceRange: `₦${Math.min(...products.map((p) => p.price))} – ₦${Math.max(
          ...products.map((p) => p.price),
        )}`,
        address: {
          "@type": "PostalAddress",
          streetAddress,
          addressRegion,
          addressCountry,
        },
        sameAs: Object.values(socials),
      }}
    />
  );
}

/** Product list schema — mounted in the Products section on the home page. */
export function JsonLdProducts() {
  const { business, products } = siteConfig;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${business.name} products`,
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.image,
            url: `${business.url}/#products`,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: product.currency,
              availability: "https://schema.org/InStock",
              url: `${business.url}/#products`,
            },
          },
        })),
      }}
    />
  );
}

/** FAQ schema — mounted in the FAQ section on the home page. */
export function JsonLdFaq() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: siteConfig.faq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}
