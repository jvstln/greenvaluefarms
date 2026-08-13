"use client";

import { Check, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/config/site";
import { formatPrice } from "@/lib/format";
import { useOrder } from "@/lib/order-store";

/**
 * One product in the grid. The quantity stepper reflects what's actually in
 * the order, and the action button switches between "Add to order" and
 * "Add more" as the shopper builds their basket. Data flows through the
 * shared order store (see lib/order-store.tsx).
 */
export function ProductCard({ product }: { product: Product }) {
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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.tags.length > 0 && (
          <span className="absolute top-4 left-4 rounded-lg border-2 border-accent-foreground/10 bg-accent px-3 py-1 font-bold text-accent-foreground text-xs uppercase tracking-wide shadow-md">
            {product.tags[0]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display font-semibold text-foreground text-lg leading-snug">
            {product.name}
          </h3>
          <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex items-baseline gap-1.5 pt-1">
          <span className="font-display font-semibold text-primary text-xl">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-muted-foreground text-xs">{product.unit}</span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
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
            className="shrink-0 rounded-full"
          >
            {justAdded ? <Check data-slot="icon" /> : <Plus data-slot="icon" />}
            {quantity > 0 ? "Add more" : "Add to order"}
          </Button>
        </div>
      </div>
    </article>
  );
}
