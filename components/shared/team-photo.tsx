"use client";

import Image from "next/image";
import { useState } from "react";
import type { TeamMember } from "@/lib/config/about-us";
import { useLightbox } from "@/lib/lightbox-store";
import { cn } from "@/lib/utils";

/**
 * A team member's portrait. Shows the photo from `/public/team/*.jpg` and
 * falls back to a monogram ticket (first two letters of the first name) if
 * the file is missing — so a missing photo can never break the card. Clicking
 * a loaded photo opens the global lightbox (`useLightbox`).
 */
export function TeamPhoto({
  member,
  className,
}: {
  member: TeamMember;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const { open } = useLightbox();
  const monogram = member.name.split(" ")[0]?.slice(0, 2).toUpperCase() ?? "GV";

  return (
    <div className={cn("relative overflow-hidden bg-secondary", className)}>
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <span className="font-black font-display text-4xl text-primary tracking-tight">
            {monogram}
          </span>
          <span className="font-mono text-[0.6rem] text-muted-foreground uppercase tracking-[0.2em]">
            Photo pending
          </span>
        </div>
      ) : (
        <button
          type="button"
          onClick={() =>
            open({
              src: member.image.src,
              alt: member.image.alt,
              caption: `${member.name} · ${member.role}`,
            })
          }
          aria-label={`View full-size photo of ${member.name}`}
          className="absolute inset-0 cursor-zoom-in"
        >
          <Image
            src={member.image.src}
            alt={member.image.alt}
            fill
            // sizes="(min-width: 1024px) 176px, 100vw"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        </button>
      )}
    </div>
  );
}
