"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config/site";
import { useOrder } from "@/lib/order-store";
import { SiteLogo } from "@/components/shared/site-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, ShoppingBasket } from "lucide-react";

/**
 * Sticky header: logo, section links (desktop), an "Order Now" CTA and a
 * cart button. On mobile the links collapse into a slide-over menu.
 */
export function SiteHeader() {
  const { totalItems, openSheet } = useOrder();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = siteConfig.nav.map((item) => (
    <a
      key={item.href}
      href={item.href}
      onClick={() => setMenuOpen(false)}
      className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
    >
      {item.label}
    </a>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        {/* Logo — links back to the top of the page */}
        <a href="#hero" aria-label="Back to top" className="shrink-0">
          <SiteLogo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navLinks}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="hidden rounded-full md:inline-flex"
            onClick={openSheet}
            aria-label={`Review order, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
          >
            <ShoppingBasket data-slot="icon" />
            {totalItems > 0 && (
              <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[0.65rem] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>

          <a href="#products">
            <Button size="sm" className="rounded-full">
              Order Now
            </Button>
          </a>

          {/* Mobile menu trigger */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button type="button" variant="outline" size="icon-sm" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full! sm:max-w-xs">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col gap-8 px-4 py-6">
                <SiteLogo />
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  {siteConfig.nav.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <a
                        href={item.href}
                        className="rounded-xl px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-muted hover:text-primary"
                      >
                        {item.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-3">
                  <SheetClose asChild>
                    <Button
                      onClick={openSheet}
                      variant="outline"
                      className="rounded-full"
                      aria-label="Review your order"
                    >
                      <ShoppingBasket data-slot="icon" />
                      Review order
                      {totalItems > 0 && (
                        <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[0.65rem] font-bold text-primary-foreground">
                          {totalItems}
                        </span>
                      )}
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <a href="#products">
                      <Button className="w-full rounded-full">Order Now</Button>
                    </a>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}