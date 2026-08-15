import { writeFileSync } from "node:fs";
import { products } from "../lib/config/products";
import { siteConfig } from "../lib/config/site";

/**
 * Generates `catalog.csv` — a product feed for the WhatsApp Business catalog
 * (bulk-imported via Meta Commerce Manager, or copied from while adding items
 * in the Business App). One row per product in `lib/config/site.ts`, so the
 * website and the catalog can't drift apart. Run with `pnpm catalog:csv`.
 *
 * The file starts with a UTF-8 BOM so Excel opens the naira-friendly copy
 * correctly.
 */

const header = [
  "id",
  "title",
  "description",
  "link",
  "image_link",
  "price",
  "availability",
  "condition",
  "unit",
];

const csvEscape = (value: string): string =>
  /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

const rows = products.map((product) => {
  const tags = product.tags as readonly string[];
  return [
    product.id,
    product.name,
    product.description,
    siteConfig.business.url,
    product.image,
    `${product.price.toFixed(2)} ${product.currency}`,
    tags.includes("By Request") ? "preorder" : "in stock",
    "new",
    product.unit,
  ]
    .map((value) => csvEscape(String(value)))
    .join(",");
});

const csv = `\uFEFF${[header.join(","), ...rows].join("\n")}\n`;
writeFileSync("catalog.csv", csv);
console.log(`Wrote catalog.csv (${rows.length} products).`);
