import type { LegalSection } from "@/lib/config/legal";
import { cn } from "@/lib/utils";

/**
 * Renders a legal document (privacy policy / terms) as a numbered ledger,
 * matching the "dispatch board" design system: mono eyebrow, display heading,
 * and each section as a `No. 0X` row separated by dashed ticket rules.
 */
export function LegalContent({
  eyebrow,
  title,
  summary,
  lastUpdated,
  sections,
  className,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  lastUpdated: string;
  sections: readonly LegalSection[];
  className?: string;
}) {
  return (
    <section className={cn("py-14 sm:py-20", className)}>
      <div className="wrap max-w-3xl">
        <header>
          <span className="inline-flex items-center gap-2.5 font-medium font-mono text-[0.7rem] text-rust uppercase tracking-[0.2em]">
            <span className="size-2 bg-current" aria-hidden="true" />
            {eyebrow}
          </span>
          <h1 className="mt-3 text-balance font-bold font-display text-3xl leading-[1.05] tracking-tight sm:text-4xl md:text-[2.5rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
            {summary}
          </p>
          <p className="mt-4 font-mono text-[0.7rem] text-muted-foreground uppercase tracking-[0.2em]">
            Last updated · {lastUpdated}
          </p>
        </header>

        <ol className="mt-12 divide-y divide-dashed divide-border border-border border-t border-dashed">
          {sections.map((section, index) => (
            <li
              key={section.heading}
              className="grid gap-3 py-8 sm:grid-cols-[4.5rem_1fr] sm:gap-6"
            >
              <span className="font-medium font-mono text-[0.7rem] text-rust uppercase tracking-[0.18em]">
                No. 0{index + 1}
              </span>
              <div>
                <h2 className="font-bold font-display text-lg leading-snug tracking-tight">
                  {section.heading}
                </h2>
                <div className="mt-2 space-y-3">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-muted-foreground text-sm leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
