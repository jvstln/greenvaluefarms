"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Compact quantity stepper — sized to sit comfortably beside a `sm` button
 * (e.g. the product card's "Add to order"). The buttons are real <button>s
 * so they work with the keyboard (tab + enter/space) out of the box.
 */
export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-background p-0.5",
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="rounded-full"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(clamp(value - 1))}
      >
        <Minus className="size-3" />
      </Button>
      <span
        aria-live="polite"
        className="min-w-6 text-center font-semibold text-sm tabular-nums"
      >
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="rounded-full"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(clamp(value + 1))}
      >
        <Plus className="size-3" />
      </Button>
    </div>
  );
}
