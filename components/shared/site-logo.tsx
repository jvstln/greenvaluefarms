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
        <span className="font-display font-semibold text-foreground text-lg tracking-tight">
          {name}
        </span>
        {showTagline && (
          <span className="mt-1 hidden font-medium text-[0.7rem] text-muted-foreground tracking-wide sm:block">
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
