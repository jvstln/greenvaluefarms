import { siteConfig } from "@/lib/config/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** Short FAQ — keeps the page focused without bloat. */
export function Faq() {
  const { faqSection, faq } = siteConfig;

  return (
    <section id="faq" className="scroll-mt-20 bg-background py-16 sm:py-24">
      <div className="wrap max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={faqSection.eyebrow} title={faqSection.heading} />
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="mt-10">
            {faq.map((item) => (
              <AccordionItem key={item.question} value={item.question} className="border-border">
                <AccordionTrigger className="font-display text-base font-semibold py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}