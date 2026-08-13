/**
 * Small pure formatting helpers used by the order flow.
 * Kept framework-free so they're trivial to unit test and reuse.
 */

/** Format a number of naira as a readable price, e.g. 8500 -> "₦8,500". */
export function formatPrice(amount: number, currency = "NGN"): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Strip non-digit characters — used when normalising a phone number. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}
