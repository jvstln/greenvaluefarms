import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True when a config value is still an unresolved "TODO: ..." placeholder. */
export function isTodo(value: string | undefined | null): boolean {
  return typeof value === "string" && value.trim().startsWith("TODO");
}
