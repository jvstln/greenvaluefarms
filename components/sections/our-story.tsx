import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/config/site";

/**
 * Our Story — one hard-framed photo beside the copy. Copy lives in the
 * config; update it there, not here.
 */
export function OurStory() {
  const { story, storySection, business } = siteConfig;

  return (
    <section id="story" className="scroll-mt-20 bg-muted/50 py-16 sm:py-24">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* image */}
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-foreground/25 bg-muted shadow-[8px_8px_0_0_rgba(31,70,48,0.12)]">
              <Image
                src={story.image.src}
                alt={story.image.alt}
                fill
                sizes="(min-width: 1024px) 440px, 100vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <p className="mt-4 font-mono text-[0.65rem] text-muted-foreground uppercase tracking-[0.18em]">
              {story.image.alt}
            </p>
          </div>
        </Reveal>

        {/* copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading
              eyebrow={storySection.eyebrow}
              title={story.heading}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-5 space-y-4">
              {story.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-8 max-w-md border-accent border-l-4 pl-5 font-bold font-display text-xl tracking-tight">
              {story.highlight}
            </p>
            <p className="mt-4 font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
              — The {business.name} team
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
