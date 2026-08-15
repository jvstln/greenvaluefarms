import { CatalogCta } from "@/components/shared/catalog-cta";
import { ProductCard } from "@/components/shared/product-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { products } from "@/lib/config/products";
import { siteConfig } from "@/lib/config/site";

/**
 * Full menu page — a roomier catalog than the home grid: header band, the
 * complete product list, a delivery note and the "browse on WhatsApp" strip.
 */
export function ProductsPage() {
  const { productsPage } = siteConfig;

  return (
    <>
      <section className="border-border border-b bg-muted/50 py-16 sm:py-20">
        <div className="wrap">
          <SectionHeading
            eyebrow={productsPage.eyebrow}
            title={productsPage.heading}
            description={productsPage.sub}
          />
          <p className="mt-6 font-mono text-[0.7rem] text-muted-foreground uppercase tracking-[0.2em]">
            {products.length} cuts · {productsPage.countSuffix}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="wrap">
          <Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-10 max-w-2xl border-rust border-l-2 pl-4 text-muted-foreground text-sm leading-relaxed">
              {productsPage.note}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <CatalogCta />
          </Reveal>
        </div>
      </section>
    </>
  );
}
