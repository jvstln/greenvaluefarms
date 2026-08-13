import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Consistent section heading: small eyebrow, display serif heading,
 * optional supporting description. `tone="inverted"` for use on the
 * deep-green sections (Why Us, Footer).
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
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.2em]",
            tone === "inverted" ? "text-accent" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]",
          tone === "inverted" ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "inverted"
              ? "text-primary-foreground/75"
              : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}