"use client";

import { ShoppingBasket, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { WhatsAppIcon } from "@/components/shared/icons";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/config/site";
import { formatPrice } from "@/lib/format";
import { useOrder } from "@/lib/order-store";
import { cn } from "@/lib/utils";
import { buildWhatsAppOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Persistent order summary, shown as a slide-over panel. Lets the customer
 * review/edit their items, add optional name/delivery notes, and send the
 * whole thing to the farm as a WhatsApp message.
 *
 * No payment — the flow deliberately ends at WhatsApp.
 */
export function OrderSummarySheet() {
  const { lines, totalPrice, isOpen, closeSheet, setQty, remove, clear } =
    useOrder();

  const { orderSheet, business } = siteConfig;

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const href = useMemo(() => {
    const message = buildWhatsAppOrderMessage({
      lines,
      businessName: business.name,
      intro: business.orderIntro,
      details: { name, notes },
    });
    return buildWhatsAppUrl(business.contact.whatsappNumber, message);
  }, [lines, name, notes]);

  const empty = lines.length === 0;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeSheet()}>
      <SheetContent className="w-full! gap-0 p-0 sm:max-w-md" side="right">
        <SheetHeader className="border-border border-b px-5 py-4">
          <SheetTitle className="font-display text-xl">
            {orderSheet.title}
          </SheetTitle>
          <SheetDescription>
            {empty
              ? orderSheet.emptyTitle
              : `${lines.reduce((n, l) => n + l.qty, 0)} item${lines.reduce((n, l) => n + l.qty, 0) === 1 ? "" : "s"} selected`}
          </SheetDescription>
        </SheetHeader>

        {empty ? (
          /* Empty state */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-muted">
              <ShoppingBasket className="size-6 text-muted-foreground" />
            </span>
            <div>
              <p className="font-display font-semibold text-lg">
                {orderSheet.emptyTitle}
              </p>
              <p className="mt-1 text-muted-foreground text-sm">
                {orderSheet.emptyMessage}
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                closeSheet();
                document
                  .querySelector("#products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {orderSheet.browseLabel}
            </Button>
          </div>
        ) : (
          <>
            {/* Line items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {lines.map(({ product, qty }) => {
                  const currency = product.currency;
                  return (
                    <li key={product.id} className="flex items-center gap-3">
                      <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl border border-border">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-sm">
                          {product.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {formatPrice(product.price, currency)} {product.unit}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <QuantityStepper
                            value={qty}
                            onChange={(next) => setQty(product.id, next)}
                            min={0}
                          />
                          <span className="font-semibold text-sm tabular-nums">
                            {formatPrice(product.price * qty, currency)}
                          </span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Remove ${product.name} from order`}
                        onClick={() => remove(product.id)}
                      >
                        <Trash2 />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer: details + total + send */}
            <SheetFooter className="border-border border-t bg-muted/40 px-5 py-4">
              <div className="flex flex-col gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="order-name" className="text-xs">
                    {orderSheet.customerNameLabel}
                  </Label>
                  <Input
                    id="order-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={orderSheet.customerNamePlaceholder}
                    className="bg-background"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="order-notes" className="text-xs">
                    {orderSheet.customerDetailsLabel}
                  </Label>
                  <Input
                    id="order-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={orderSheet.customerDetailsPlaceholder}
                    className="bg-background"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-medium text-muted-foreground text-sm">
                    {orderSheet.subtotalLabel}
                  </span>
                  <span className="font-display font-semibold text-xl">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={orderSheet.sendButton}
                  className={cn(
                    buttonVariants({ variant: "accent", size: "lg" }),
                    "w-full rounded-full",
                  )}
                >
                  <WhatsAppIcon className="size-4" />
                  {orderSheet.sendButton}
                </a>

                <p className="text-center text-muted-foreground text-xs">
                  {orderSheet.note}
                </p>

                <button
                  type="button"
                  onClick={clear}
                  className="mx-auto font-medium text-muted-foreground text-xs underline-offset-4 hover:underline"
                >
                  Clear order
                </button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
