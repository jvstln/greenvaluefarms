import { PrintRule } from "@/components/shared/print-rule";
import { Reveal } from "@/components/shared/reveal";
import { aboutUs } from "@/lib/config/about-us";
import { siteConfig } from "@/lib/config/site";

/**
 * The About page header — the farm's "company record". Mono ledger eyebrow,
 * oversized display headline, the signature print rule, a summary line and a
 * dashed mono strip along the bottom edge. All copy comes from the config.
 */
export function CompanyRecord() {
  const { sectionLabel, headline, summary, sections } = aboutUs;
  const { business } = siteConfig;

  return (
    <section className="bg-background pt-12 pb-10 sm:pt-16 sm:pb-14">
      <div className="wrap">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 border border-foreground/20 bg-background px-2.5 py-1 font-medium font-mono text-[0.7rem] text-rust uppercase tracking-[0.2em]">
            <span className="size-2 bg-current" aria-hidden="true" />
            {sectionLabel}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-3xl text-balance font-black font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
            {headline}
          </h1>
          <PrintRule />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
            {summary}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 border-foreground/15 border-t border-dashed pt-5 font-mono text-[0.65rem] text-muted-foreground uppercase tracking-[0.3em]">
            {sections.header.metaLine} · {business.name}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
