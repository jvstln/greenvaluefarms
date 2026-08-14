"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

/**
 * The hero's signature print rule — a sharp ledger line (ink, market yellow,
 * rust block) that draws itself in on load. No hand-drawn scribbles; this is
 * a geometric, printed-ticket rule. Honors prefers-reduced-motion.
 */
export function PrintRule() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { scaleX: 1 });
        return;
      }

      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          transformOrigin: "left center",
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="mt-5 flex items-center"
      style={{ transform: "scaleX(0)" }}
    >
      <span className="h-1.5 w-24 bg-primary sm:w-32" />
      <span className="h-1.5 w-10 bg-accent" />
      <span className="size-1.5 bg-rust" />
    </div>
  );
}
