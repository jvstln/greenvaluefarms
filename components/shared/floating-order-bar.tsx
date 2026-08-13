"use client";

import { ShoppingBasket } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { formatPrice } from "@/lib/format";
import { useOrder } from "@/lib/order-store";
import { cn } from "@/lib/utils";

/**
 * Floating "review order" pill, matching the gvf reference: it appears once
 * the order has items, sits bottom-center on mobile and bottom-right from
 * `sm` up, and opens the order summary sheet. It's hidden while the sheet is
 * open. Always rendered so show/hide can be a smooth CSS transition.
 */
export function FloatingOrderBar() {
  const { totalItems, totalPrice, isOpen, openSheet } = useOrder();

  const visible = totalItems > 0 && !isOpen;

  const { floatingBar, products } = siteConfig;
  const label =
    totalItems === 1 ? floatingBar.itemLabel : floatingBar.itemsLabel;
  const currency = products[0]?.currency ?? "NGN";

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed bottom-5 left-1/2 z-40 -translate-x-1/2 transition-all duration-300 sm:right-6 sm:bottom-6 sm:left-auto sm:translate-x-0",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <button
        type="button"
        onClick={openSheet}
        aria-label={`${floatingBar.reviewLabel} — ${totalItems} ${label} in order`}
        className="flex items-center gap-3 rounded-full bg-primary py-2.5 pr-5 pl-2.5 text-primary-foreground shadow-primary/20 shadow-xl transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0"
      >
        <span className="relative flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <ShoppingBasket className="size-4" aria-hidden="true" />
          <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary-foreground font-bold text-[11px] text-primary">
            {totalItems}
          </span>
        </span>
        <span className="font-semibold text-sm tabular-nums">
          {formatPrice(totalPrice, currency)}
        </span>
      </button>
    </div>
  );
}
