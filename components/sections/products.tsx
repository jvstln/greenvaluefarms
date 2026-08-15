import { JsonLdProducts } from "@/components/seo/json-ld";
import { ProductCard } from "@/components/shared/product-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/config/site";

/**
 * Product grid — one ticket per item in the config, reflowing from 1 column
 * (mobile) to 2 (tablet) to 4 (desktop).
 */
export function Products() {
  const { productsSection, products } = siteConfig;

  return (
    <section id="products" className="scroll-mt-20 bg-muted/50 py-16 sm:py-24">
      <JsonLdProducts />
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <SectionHeading
              eyebrow={productsSection.eyebrow}
              title={productsSection.heading}
              description={productsSection.sub}
            />
            <p className="font-mono text-[0.7rem] text-muted-foreground uppercase tracking-[0.2em]">
              {products.length} cuts · farm-raised
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
