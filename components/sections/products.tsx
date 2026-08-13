import { ProductCard } from "@/components/shared/product-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/config/site";

/**
 * Product grid — one card per item in the config, reflowing from 1 column
 * (mobile) to 2 (tablet) to 4 (desktop).
 */
export function Products() {
  const { productsSection, products } = siteConfig;

  return (
    <section id="products" className="scroll-mt-20 bg-muted/60 py-16 sm:py-24">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow={productsSection.eyebrow}
            title={productsSection.heading}
            description={productsSection.sub}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.06} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
