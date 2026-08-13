import Image from "next/image";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

/**
 * Logo mark + business name. Everything reads from the config file so
 * swapping the logo is a single change in lib/config/site.ts.
 */
export function SiteLogo({
  className,
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  const { logo, name, tagline } = siteConfig.business;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={logo.src}
        alt={logo.alt}
        width={40}
        height={40}
        className="size-10 shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          {name}
        </span>
        {showTagline && (
          <span className="mt-1 text-[0.7rem] font-medium tracking-wide text-muted-foreground">
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}