import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { siteConfig } from "@/lib/config/site";

/**
 * "How to order" — a numbered, connected flow ending in the WhatsApp CTA.
 * Mobile: vertical connector on the left. Desktop: horizontal dashed line
 * behind the numbered badges.
 */
export function HowToOrder() {
  const { orderingSection, orderingSteps } = siteConfig;

  return (
    <section
      id="ordering"
      className="scroll-mt-20 bg-background py-16 sm:py-24"
    >
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow={orderingSection.eyebrow}
            title={orderingSection.heading}
            description={orderingSection.sub}
          />
        </Reveal>

        <div className="relative mt-14">
          {/* connector lines (behind the badges) */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-7 hidden border-primary/20 border-l-2 border-dashed lg:hidden"
          />
          <div
            aria-hidden
            className="absolute inset-x-16 top-7 hidden border-primary/20 border-t-2 border-dashed lg:block"
          />

          <ol className="grid gap-x-6 gap-y-10 lg:grid-cols-4">
            {orderingSteps.map((step, index) => (
              <li key={step.step}>
                <Reveal delay={index * 0.08}>
                  <div className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center">
                    {/* numbered badge */}
                    <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-accent font-display font-semibold text-accent-foreground text-xl shadow-md ring-4 ring-background">
                      {step.step}
                    </span>
                    <div className="lg:max-w-[14rem]">
                      <h3 className="font-display font-semibold text-lg tracking-tight">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <Reveal className="mt-16 text-center">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-3xl border border-border bg-muted/50 p-8 sm:p-10">
            <WhatsAppButton
              label={orderingSection.ctaLabel}
              size="lg"
              className="h-13 w-full rounded-full sm:w-auto sm:px-8"
            />
            <p className="max-w-md text-muted-foreground text-sm">
              {orderingSection.ctaHint}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
