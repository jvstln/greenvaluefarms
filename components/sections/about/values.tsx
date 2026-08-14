import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { aboutUs } from "@/lib/config/about-us";

/**
 * "What we stand for" — the four farm standards as a grid of numbered ticket
 * cards. Each card is a ledger row: mono index, dashed top rule, hard offset
 * shadow, and a display heading over muted copy.
 */
export function Values() {
  const { values, sections } = aboutUs;

  return (
    <section className="scroll-mt-20 bg-muted/50 py-16 sm:py-24">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow={sections.values.eyebrow}
            title={sections.values.heading}
            description={sections.values.sub}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.05} className="h-full">
              <article className="flex h-full flex-col rounded-xl border border-foreground/20 bg-card p-5 shadow-[4px_4px_0_0_rgba(31,70,48,0.1)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(31,70,48,0.14)]">
                <span className="border-foreground/20 border-b border-dashed pb-2 font-mono text-[0.65rem] text-rust uppercase tracking-[0.18em]">
                  No. {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-bold font-display text-lg tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
