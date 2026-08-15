"use client";

import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Route-aware anchor. Section links (`#products`, `#contact`, …) only exist on
 * the home page, so when rendered anywhere else they resolve to `/#products` —
 * navigating home and scrolling to the section. Page routes pass through
 * untouched.
 */
export function SectionLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const pathname = usePathname();
  const isHash = href.startsWith("#");
  const resolved = isHash && pathname !== "/" ? `/${href}` : href;

  return (
    <a href={resolved} {...props}>
      {children}
    </a>
  );
}
