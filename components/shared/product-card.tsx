"use client";

import { Check, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/config/products";
import { formatPrice } from "@/lib/format";
import { useOrder } from "@/lib/order-store";

/**
 * One product, presented as a numbered market ticket: photo, mono ticket
 * number + tag, price in heavy display type, and the quantity/order control.
 */
export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { lines, add, setQty } = useOrder();
  const [justAdded, setJustAdded] = useState(false);

  const line = lines.find((l) => l.product.id === product.id);
  const quantity = line?.qty ?? 0;

  const handleAdd = () => {
    add(product.id, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-foreground/20 bg-card shadow-[4px_4px_0_0_rgba(31,70,48,0.1)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(31,70,48,0.14)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
          className="object-cover"
        />
      </div>

      <div className="flex items-center justify-between gap-2 border-foreground/20 border-b border-dashed px-4 py-2.5">
        <span className="font-medium font-mono text-[0.65rem] text-rust uppercase tracking-[0.18em]">
          No. 0{index + 1}
        </span>
        {product.tags.length > 0 && (
          <span className="bg-accent px-2 py-0.5 font-medium font-mono text-[0.6rem] text-accent-foreground uppercase tracking-[0.12em]">
            {product.tags[0]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-bold font-display text-lg leading-snug">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto pt-2">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-black font-display text-xl tracking-tight">
              {formatPrice(product.price, product.currency)}
            </span>
            <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wide">
              {product.unit}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-foreground/15 border-t border-dashed pt-3">
            <QuantityStepper
              value={quantity}
              onChange={(next) => setQty(product.id, next)}
              min={0}
            />
            <Button
              type="button"
              size="sm"
              variant={quantity > 0 ? "outline" : "default"}
              onClick={handleAdd}
              className="shrink-0"
            >
              {justAdded ? (
                <Check data-slot="icon" />
              ) : (
                <Plus data-slot="icon" />
              )}
              {quantity > 0 ? "Add more" : "Add to order"}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
