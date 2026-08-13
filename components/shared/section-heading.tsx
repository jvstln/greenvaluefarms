import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Consistent section heading: small eyebrow with a leading dash, display
 * serif heading, optional supporting description. `tone="inverted"` for use
 * on the deep-green sections (Why Us, Footer).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
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
            "inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-[0.2em]",
            inverted ? "text-accent" : "text-primary",
          )}
        >
          <span className="h-px w-6 bg-current" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-3 font-display font-semibold text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-[2.75rem]",
          inverted ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            inverted ? "text-primary-foreground/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
