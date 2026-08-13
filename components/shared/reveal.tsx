"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Fade/slide-in on scroll wrapper. Animates once per view with ScrollTrigger
 * and respects the OS "reduce motion" setting. Use `delay` for staggering.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope },
  );

  return (
    <div ref={scope} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
