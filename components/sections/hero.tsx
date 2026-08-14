import { Check } from "lucide-react";
import Image from "next/image";
import { PrintRule } from "@/components/shared/print-rule";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import { formatPrice } from "@/lib/format";

/**
 * Hero — a nigerian market pitch. Oversized condensed headline on paper stock,
 * a single hard-framed photo with a corner stamp, and a printed price ticket
 * that leans on the image. No blobs, no grain, no decorative frames.
 */
export function Hero() {
  const { hero, business } = siteConfig;

  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="wrap grid items-center gap-16 pt-12 pb-10 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-14">
        {/* -------- Copy -------- */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex border border-foreground/20 bg-background px-2.5 py-1 font-medium font-mono text-[0.7rem] text-muted-foreground uppercase tracking-[0.2em]">
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-2xl text-balance font-black font-display text-[2.75rem] uppercase leading-[0.95] tracking-tight sm:text-6xl xl:text-7xl">
              {hero.heading}
            </h1>
            <PrintRule />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              {hero.sub}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#products">
                <Button size="lg" className="h-12 px-7 font-semibold text-base">
                  {hero.ctaPrimary}
                </Button>
              </a>
              <WhatsAppButton
                label={hero.ctaSecondary}
                variant="outline"
                size="lg"
                className="h-12 px-7"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul
              className="mt-10 max-w-lg border-border border-t"
              aria-label="Why shop with us"
            >
              {hero.trust.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-border border-b py-3 text-muted-foreground text-sm"
                >
                  <Check className="size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* -------- Visual -------- */}
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[400px] lg:max-w-none">
            {/* hard-framed photo */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-foreground/25 bg-muted shadow-[10px_10px_0_0_rgba(31,70,48,0.12)]">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                priority
                className="object-cover"
              />
              {/* corner stamp */}
              <span className="absolute top-3 left-3 bg-accent px-2.5 py-1.5 font-medium font-mono text-[0.65rem] text-accent-foreground uppercase tracking-[0.15em]">
                {hero.stamp}
              </span>
            </div>

            {/* printed price ticket */}
            <div className="absolute -bottom-6 -left-2 max-w-[16rem] rounded-lg border border-foreground/25 bg-card px-4 py-3 shadow-[5px_5px_0_0_rgba(31,70,48,0.12)] sm:-left-6">
              <p className="font-medium font-mono text-[0.6rem] text-rust uppercase tracking-[0.2em]">
                No. 01 · {hero.chipTitle}
              </p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="font-black font-display text-2xl tracking-tight">
                  {formatPrice(hero.chipPrice, "NGN")}
                </span>
                <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wide">
                  {hero.chipUnit}
                </span>
              </p>
              {/* perforation + barcode */}
              <div className="mt-2 border-foreground/25 border-t border-dashed pt-2">
                <div className="flex items-end gap-[2px]" aria-hidden="true">
                  <span className="h-3 w-0.5 bg-foreground/60" />
                  <span className="h-2 w-[3px] bg-foreground/60" />
                  <span className="h-3.5 w-0.5 bg-foreground/60" />
                  <span className="h-2 w-px bg-foreground/60" />
                  <span className="h-3 w-[3px] bg-foreground/60" />
                  <span className="h-2.5 w-0.5 bg-foreground/60" />
                  <span className="h-3.5 w-px bg-foreground/60" />
                  <span className="h-2 w-[3px] bg-foreground/60" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* farm marker along the bottom edge */}
      <div className="wrap relative pb-6">
        <p className="border-foreground/15 border-t pt-5 font-mono text-[0.65rem] text-muted-foreground uppercase tracking-[0.3em]">
          {business.name} · Farm-fresh, dressed & delivered
        </p>
      </div>
    </section>
  );
}
