import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { aboutUs } from "@/lib/config/about-us";

/**
 * "The story so far" — the full narrative rendered as a numbered ledger of
 * five beats. The ordering is meaningful (founding → first flock → systems →
 * health & investment → today), so each paragraph gets a mono beat number.
 * The heading column stays sticky on desktop while you read down the file.
 */
export function StoryNarrative() {
  const { paragraphs, sections } = aboutUs;

  return (
    <section className="scroll-mt-20 bg-background py-16 sm:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <SectionHeading
            eyebrow={sections.narrative.eyebrow}
            title={sections.narrative.heading}
          />
          <p className="mt-6 border-foreground/15 border-t border-dashed pt-4 font-mono text-[0.65rem] text-muted-foreground uppercase tracking-[0.2em]">
            {String(paragraphs.length).padStart(2, "0")} chapters · in order
          </p>
        </Reveal>

        <Reveal delay={0.05} className="lg:col-span-8">
          <ol className="divide-y divide-dashed divide-foreground/15 border-foreground/15 border-y">
            {paragraphs.map((paragraph, index) => (
              <li key={paragraph} className="flex gap-5 py-6 sm:gap-8">
                <span className="shrink-0 pt-1 font-mono text-rust text-sm tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="max-w-2xl text-base text-foreground/90 leading-relaxed sm:text-lg">
                  {paragraph}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
