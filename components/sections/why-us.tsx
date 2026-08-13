import type { LucideIcon } from "lucide-react";
import { HandHeart, Leaf, ShieldCheck, Truck } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/config/site";

/* Icon name -> lucide component. Config stores icon names as strings so the
   config file stays readable for non-developers; this map resolves them. */
const iconMap: Record<string, LucideIcon> = {
  leaf: Leaf,
  "shield-check": ShieldCheck,
  "hand-heart": HandHeart,
  truck: Truck,
};

/**
 * "Why us" — deliberately inverted (deep green) so it reads as a distinct
 * moment in the page against the cream Products section above it.
 */
export function WhyUs() {
  const { whyUsSection, whyUs } = siteConfig;

  return (
    <section
      id="why-us"
      className="relative scroll-mt-20 overflow-hidden bg-primary py-16 text-primary-foreground sm:py-24"
    >
      {/* soft organic shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-8rem] size-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 left-[-6rem] size-96 rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>

      <div className="wrap relative">
        <Reveal>
          <SectionHeading
            eyebrow={whyUsSection.eyebrow}
            title={whyUsSection.heading}
            description={whyUsSection.sub}
            tone="inverted"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {whyUs.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Leaf;
            return (
              <Reveal key={item.title} delay={index * 0.06} className="h-full">
                <div className="group flex h-full flex-col gap-4 rounded-3xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-6 transition-colors duration-300 hover:bg-primary-foreground/[0.08]">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-sm transition-transform duration-300 group-hover:-rotate-6">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="font-display font-semibold text-xl tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
