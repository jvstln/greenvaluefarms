"use client";

import { useOrder } from "@/lib/order-store";
import { siteConfig } from "@/lib/config/site";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";

/**
 * Persistent, unobtrusive sticky bar that appears once the order has items.
 * Shows the running count + total and opens the order summary sheet.
 */
export function FloatingOrderBar() {
  const { totalItems, totalPrice, openSheet } = useOrder();

  if (totalItems === 0) return null;

  const { floatingBar, products } = siteConfig;
  const label = totalItems === 1 ? floatingBar.itemLabel : floatingBar.itemsLabel;
  const currency = products[0]?.currency ?? "NGN";

  return (
    <section
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 backdrop-blur-md"
      aria-label="Order summary"
    >
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-muted-foreground">
            {totalItems} {label}
          </span>
          <span className="font-display text-xl font-semibold tabular-nums text-primary">
            {formatPrice(totalPrice, currency)}
          </span>
        </div>
        <Button
          type="button"
          onClick={openSheet}
          className="rounded-full"
          size="lg"
          aria-label={`${floatingBar.reviewLabel} (${totalItems} ${label})`}
        >
          <ShoppingBasket data-slot="icon" />
          {floatingBar.reviewLabel}
        </Button>
      </div>
    </section>
  );
}