import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { siteConfig } from "@/lib/config/site";

/**
 * "How to order" — a ledger of four steps, each opened by a solid top rule,
 * ending in the WhatsApp CTA on a hard-outlined panel.
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

        <Reveal delay={0.05}>
          <ol className="mt-12 grid gap-x-8 gap-y-10 lg:grid-cols-4">
            {orderingSteps.map((step, index) => (
              <li key={step.step} className="border-primary border-t-2 pt-4">
                <span className="font-medium font-mono text-[0.7rem] text-rust uppercase tracking-[0.2em]">
                  Step 0{index + 1}
                </span>
                <h3 className="mt-2 font-bold font-display text-xl tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-16">
          <div className="flex flex-col items-start gap-5 rounded-xl border border-foreground/25 bg-card p-7 shadow-[6px_6px_0_0_rgba(31,70,48,0.12)] sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-md text-muted-foreground text-sm leading-relaxed">
              {orderingSection.ctaHint}
            </p>
            <WhatsAppButton
              label={orderingSection.ctaLabel}
              size="lg"
              className="h-12 shrink-0 px-8"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
