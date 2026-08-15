"use client";

import { Menu, ShoppingBasket } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SectionLink } from "@/components/shared/section-link";
import { SiteLogo } from "@/components/shared/site-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/config/site";
import { useOrder } from "@/lib/order-store";
import { cn } from "@/lib/utils";

/**
 * Sticky header: logo, section links (desktop), an "Order Now" CTA and a
 * cart button. On mobile the links collapse into a slide-over menu.
 */
export function SiteHeader() {
  const { totalItems, openSheet } = useOrder();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = siteConfig.nav.map((item) => (
    <SectionLink
      key={item.href}
      href={item.href}
      onClick={() => setMenuOpen(false)}
      className="font-medium text-foreground/80 text-sm decoration-2 decoration-rust underline-offset-4 transition-colors hover:text-primary hover:underline"
    >
      {item.label}
    </SectionLink>
  ));

  const scrollToProducts = () => {
    if (pathname === "/") {
      document
        .querySelector("#products")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.assign("/#products");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-border border-b bg-background/80 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        {/* Logo — links back to the top of the page */}
        <SectionLink href="#hero" aria-label="Back to top" className="shrink-0">
          <SiteLogo />
        </SectionLink>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="default"
            className="hidden rounded-lg md:inline-flex"
            onClick={openSheet}
            aria-label={`Review order, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
          >
            <ShoppingBasket data-slot="icon" />
            {totalItems > 0 && (
              <span className="flex size-4 items-center justify-center rounded-full bg-primary font-bold text-[0.65rem] text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>

          <SectionLink
            href="#products"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden rounded-lg sm:inline-flex",
            )}
          >
            Order Now
          </SectionLink>

          {/* Mobile menu trigger */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-lg"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu />
                </Button>
              }
            />
            <SheetContent side="right" className="w-full! sm:max-w-xs">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col gap-8 px-4 py-6">
                <SiteLogo />
                <nav
                  className="flex flex-col gap-1"
                  aria-label="Mobile navigation"
                >
                  {siteConfig.nav.map((item) => (
                    <SectionLink
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-3 py-3 font-medium text-base text-foreground/85 transition-colors hover:bg-muted hover:text-primary"
                    >
                      {item.label}
                    </SectionLink>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-3">
                  <SheetClose
                    render={
                      <Button
                        onClick={openSheet}
                        variant="outline"
                        className="rounded-lg"
                        aria-label="Review your order"
                      >
                        <ShoppingBasket data-slot="icon" />
                        Review order
                        {totalItems > 0 && (
                          <span className="flex size-4 items-center justify-center rounded-full bg-primary font-bold text-[0.65rem] text-primary-foreground">
                            {totalItems}
                          </span>
                        )}
                      </Button>
                    }
                  />
                  <Button
                    onClick={() => {
                      setMenuOpen(false);
                      scrollToProducts();
                    }}
                    className="w-full rounded-lg"
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
