import Image from "next/image";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

/**
 * Logo mark + business name. Everything reads from the config file so
 * swapping the logo is a single change in lib/config/site.ts.
 *
 * Pass `tone="inverted"` when rendering on a dark background (e.g. the
 * footer): it swaps in the light-on-dark logo mark and light text.
 */
export function SiteLogo({
  className,
  showTagline = true,
  tone = "default",
}: {
  className?: string;
  showTagline?: boolean;
  tone?: "default" | "inverted";
}) {
  const { logo, name, tagline } = siteConfig.business;
  const inverted = tone === "inverted";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={inverted ? logo.lightSrc : logo.src}
        alt={logo.alt}
        width={40}
        height={40}
        className="size-12 shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-semibold text-lg tracking-tight",
            inverted ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {name}
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 hidden font-medium text-[0.7rem] tracking-wide sm:block",
              inverted ? "text-primary-foreground/60" : "text-muted-foreground",
            )}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
