"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accessible quantity stepper. The buttons are real <button>s so they work
 * with the keyboard (tab + enter/space) out of the box.
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
        "inline-flex items-center rounded-full border border-border bg-background p-1",
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(clamp(value - 1))}
      >
        <Minus />
      </Button>
      <span
        aria-live="polite"
        className="w-8 text-center text-sm font-semibold tabular-nums"
      >
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(clamp(value + 1))}
      >
        <Plus />
      </Button>
    </div>
  );
}