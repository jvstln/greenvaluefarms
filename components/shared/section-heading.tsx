import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Consistent section heading: mono eyebrow with a solid block mark, display
 * sans heading and an optional supporting description. `tone="inverted"` for
 * use on the deep-green sections (Why Us, Footer).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "default" | "inverted";
  className?: string;
}) {
  const inverted = tone === "inverted";
  const centered = align === "center";

  return (
    <div
      className={cn("max-w-2xl", centered && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2.5 font-medium font-mono text-[0.7rem] uppercase tracking-[0.2em]",
            inverted ? "text-accent" : "text-rust",
          )}
        >
          <span className="size-2 bg-current" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-3 text-balance font-bold font-display text-3xl leading-[1.05] tracking-tight sm:text-4xl md:text-[2.5rem]",
          inverted ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-xl text-base leading-relaxed sm:text-lg",
            inverted ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
