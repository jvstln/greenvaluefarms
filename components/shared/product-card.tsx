"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/config/site";
import { useOrder } from "@/lib/order-store";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { Check, ShoppingBasket } from "lucide-react";

/**
 * One product in the grid: image, name, description, price + unit, a local
 * quantity stepper and an "Add to Order" button. Adding pushes the selected
 * quantity into the shared order store (see lib/order-store.tsx).
 */
export function ProductCard({ product }: { product: Product }) {
  const { add } = useOrder();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product.id, qty);
    setAdded(true);
    setQty(1);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* image */}
      <div className="relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={800}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <Badge key={tag} className="rounded-full bg-primary text-primary-foreground">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* copy */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl font-semibold tracking-tight">
            {product.name}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex items-baseline gap-1.5">
          <span className="font-display text-2xl font-semibold text-primary">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-sm text-muted-foreground">{product.unit}</span>
        </div>

        {/* actions */}
        <div className="flex items-center justify-between gap-3">
          <QuantityStepper value={qty} onChange={setQty} min={1} />
          <Button
            type="button"
            onClick={handleAdd}
            className="flex-1 rounded-full"
            aria-label={`Add ${product.name} to order`}
          >
            {added ? (
              <Check data-slot="icon" />
            ) : (
              <ShoppingBasket data-slot="icon" />
            )}
            {added ? "Added" : "Add to Order"}
          </Button>
        </div>
      </div>
    </article>
  );
}