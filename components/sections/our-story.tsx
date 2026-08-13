import Image from "next/image";
import { siteConfig } from "@/lib/config/site";
import { Reveal } from "@/components/shared/reveal";

/**
 * Our Story — the family-farm angle. Placeholder copy in the config; swap
 * with the real story before launch.
 */
export function OurStory() {
  const { story, storySection, business } = siteConfig;

  return (
    <section id="story" className="scroll-mt-20 bg-muted/60 py-16 sm:py-24">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* image */}
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-md">
            <div aria-hidden className="absolute -inset-4 -rotate-2 rounded-[2.25rem] border-2 border-primary/30" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border shadow-lg">
              <Image
                src={story.image.src}
                alt={story.image.alt}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
            {/* small floating quote mark */}
            <div aria-hidden className="absolute -right-4 -bottom-6 flex size-16 rotate-6 items-center justify-center rounded-2xl bg-accent text-2xl text-accent-foreground shadow-lg">
              &ldquo;
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {storySection.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              {story.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-5 space-y-4">
              {story.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 border-l-4 border-accent pl-4 font-display text-xl font-semibold italic text-foreground">
              {story.highlight}
            </p>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              — The {business.name} family
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}