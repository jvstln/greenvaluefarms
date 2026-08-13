/**
 * Shared types for the ordering flow (cart + WhatsApp message).
 * Product/nav/config types are derived directly from the config in
 * `lib/config/site.ts` so there's a single source of truth.
 */

import type { Product } from "@/lib/config/site";

/** A single line in the customer's order: a product + how many. */
export interface OrderLine {
  product: Product;
  qty: number;
}

/** Optional customer-provided details appended to the WhatsApp message. */
export interface CustomerDetails {
  name?: string;
  notes?: string;
}

/** Everything `buildWhatsAppOrderMessage` needs to format the message. */
export interface WhatsAppOrderInput {
  lines: OrderLine[];
  businessName: string;
  /** Intro line, e.g. "Hello GreenValueFarms! I'd like to place an order:" */
  intro?: string;
  details?: CustomerDetails;
}
