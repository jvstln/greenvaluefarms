/**
 * WhatsApp order helpers.
 * ---------------------------------------------------------------------------
 * Pure, framework-free functions that turn an order into a readable WhatsApp
 * message and a wa.me deep-link. Keep UI out of here so this logic can be
 * unit-tested and reused anywhere (e.g. a future "checkout" step).
 *
 * There is deliberately NO payment integration — ordering ends with the
 * customer sending a pre-filled WhatsApp message. A payment step could be
 * slotted in later between "review order" and "send" without touching this.
 */
import type { WhatsAppOrderInput } from "@/lib/types";
import { formatPrice, digitsOnly } from "@/lib/format";

/** Format one order line as "*• Name × qty @ price each — line total*". */
function formatLine(
  name: string,
  qty: number,
  unitPrice: number,
  currency: string,
): string {
  const price = formatPrice(unitPrice, currency);
  const total = formatPrice(unitPrice * qty, currency);
  return `• ${name} × ${qty} @ ${price} each — ${total}`;
}

/**
 * Build the full text message sent to the business via WhatsApp.
 *
 * @example
 * buildWhatsAppOrderMessage({
 *   lines, businessName: "GreenValueFarms", intro, details: { name, notes },
 * })
 */
export function buildWhatsAppOrderMessage(input: WhatsAppOrderInput): string {
  const { lines, businessName, intro, details } = input;

  if (lines.length === 0) {
    return "";
  }

  const currency = lines[0]?.product.currency ?? "NGN";
  const total = lines.reduce((sum, line) => sum + line.qty * line.product.price, 0);

  const parts: string[] = [];

  if (intro) parts.push(intro);
  parts.push("");

  parts.push(...lines.map((line) =>
    formatLine(line.product.name, line.qty, line.product.price, currency),
  ));

  parts.push("");
  parts.push(`Total: ${formatPrice(total, currency)}`);
  parts.push("");

  // Optional customer details (name / delivery notes) — appended if provided.
  const detailLines: string[] = [];
  if (details?.name?.trim()) detailLines.push(`Name: ${details.name.trim()}`);
  if (details?.notes?.trim()) detailLines.push(`Notes: ${details.notes.trim()}`);
  if (detailLines.length > 0) {
    parts.push(...detailLines);
    parts.push("");
  }

  parts.push(`— ${businessName}`);
  return parts.join("\n");
}

/**
 * Build a wa.me deep-link. Digits-only phone number is enforced so a
 * config typo (spaces, "+") can't break the link.
 */
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  return `https://wa.me/${digitsOnly(phoneNumber)}?text=${encodeURIComponent(message)}`;
}