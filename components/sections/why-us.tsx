import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/config/site";

/**
 * "Why us" — a ruled ledger on the deep-green band. Mono numerals run down
 * the left; each point is one row with a title and a single line.
 */
export function WhyUs() {
  const { whyUsSection, whyUs } = siteConfig;

  return (
    <section
      id="why-us"
      className="relative scroll-mt-20 bg-primary py-16 text-primary-foreground sm:py-24"
    >
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow={whyUsSection.eyebrow}
              title={whyUsSection.heading}
              description={whyUsSection.sub}
              tone="inverted"
            />
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-7">
            <ul className="border-primary-foreground/15 border-y">
              {whyUs.map((item, index) => (
                <li
                  key={item.title}
                  className="flex flex-col gap-1 border-primary-foreground/15 py-5 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span className="w-14 shrink-0 font-mono text-accent text-sm">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold font-display text-xl tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-primary-foreground/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
