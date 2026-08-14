import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { aboutUs } from "@/lib/config/about-us";
import { isTodo } from "@/lib/utils";

/**
 * "How the farm grew" — milestones as dated tickets on the deep-green band.
 * The year is the primary marker (accent when real, a subdued "Year TBD" tag
 * until the owner fills it in), then a title and a single line of copy.
 */
export function Milestones() {
  const { milestones, sections } = aboutUs;

  return (
    <section className="scroll-mt-20 bg-primary py-16 text-primary-foreground sm:py-24">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow={sections.milestones.eyebrow}
            title={sections.milestones.heading}
            description={sections.milestones.sub}
            tone="inverted"
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.title}
                className="border-primary-foreground/20 border-t-2 pt-4"
              >
                <span className="font-medium font-mono text-sm tabular-nums tracking-wide">
                  {isTodo(milestone.year) ? (
                    <span className="text-primary-foreground/50">
                      Year TBD · No. {String(index + 1).padStart(2, "0")}
                    </span>
                  ) : (
                    <span className="text-accent">{milestone.year}</span>
                  )}
                </span>
                <h3 className="mt-2 font-bold font-display text-lg tracking-tight">
                  {milestone.title}
                </h3>
                <p className="mt-1.5 text-primary-foreground/70 text-sm leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
