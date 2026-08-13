import Image from "next/image";
import { siteConfig } from "@/lib/config/site";
import { formatPrice } from "@/lib/format";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Check, Egg } from "lucide-react";

/**
 * Hero — deliberately asymmetric: copy on the left, an arch-cropped photo
 * with layered shapes + overlapping chips on the right. No centered-over-
 * image cliché.
 */
export function Hero() {
  const { hero, business } = siteConfig;

  return (
    <section id="hero" className="grain relative overflow-hidden bg-background">
      {/* soft decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 -left-32 size-80 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="wrap relative grid items-center gap-14 pb-16 pt-14 lg:grid-cols-12 lg:gap-6 lg:pb-24 lg:pt-20">
        {/* -------- Copy -------- */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {hero.heading}
              {/* hand-drawn underline */}
              <svg
                viewBox="0 0 220 12"
                className="mt-2 h-3 w-48 text-accent sm:w-56"
                aria-hidden="true"
                focusable="false"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9 C 40 3, 80 3, 112 7 C 145 11, 185 10, 217 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {hero.sub}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#products">
                <Button size="lg" className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90">
                  {hero.ctaPrimary}
                </Button>
              </a>
              <WhatsAppButton label={hero.ctaSecondary} variant="outline" size="lg" className="h-12 rounded-full px-7" />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5" aria-label="Why shop with us">
              {hero.trust.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* -------- Visual -------- */}
        <Reveal delay={0.1} className="lg:col-span-6 xl:col-span-6">
          <div className="relative mx-auto w-full max-w-[440px]">
            {/* offset outline frame behind the photo */}
            <div
              aria-hidden
              className="absolute -inset-4 rotate-3 rounded-[2.5rem] border-2 border-accent/60 sm:-inset-5"
            />
            <div
              aria-hidden
              className="absolute -top-10 -right-8 size-40 rounded-full bg-primary/10 blur-2xl"
            />

            {/* arch-cropped photo */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-b-[2rem] rounded-t-[9rem] border border-border shadow-xl">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                sizes="(min-width: 1024px) 440px, 100vw"
                priority
                className="object-cover"
              />
            </div>

            {/* stamp badge */}
            <div className="absolute -top-5 -left-4 flex size-28 -rotate-6 items-center justify-center rounded-full border-4 border-background bg-primary text-center shadow-lg sm:-left-8">
              <p className="px-2 font-display text-[0.72rem] font-semibold italic leading-tight text-primary-foreground">
                {hero.stamp}
              </p>
            </div>

            {/* price chip */}
            <div className="absolute -bottom-5 right-3 flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 pr-5 shadow-lg sm:-right-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent/20">
                <Egg className="size-5 text-primary" aria-hidden />
              </span>
              <div className="leading-tight">
                <p className="font-display text-sm font-semibold">{hero.chipTitle}</p>
                <p className="text-xs text-muted-foreground">
                  {hero.chipSub}{" "}
                  <span className="font-semibold text-foreground">
                    {formatPrice(hero.chipPrice, "NGN")}
                  </span>{" "}
                  {hero.chipUnit}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* farm name marker along the bottom edge */}
      <div className="wrap relative pb-6">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">
          {business.name}
        </p>
      </div>
    </section>
  );
}