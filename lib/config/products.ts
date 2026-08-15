/**
 * GreenValueFarms — products
 * ---------------------------------------------------------------------------
 * Every product the farm sells, in one place. The home grid, the /products
 * page, the order cart, the WhatsApp Catalog CSV and the Product JSON-LD all
 * read from here — edit THIS file and nothing else when prices or products
 * change.
 *
 * Price is stored in the smallest currency unit as a plain number; `currency`
 * is the ISO code. The order summary / WhatsApp message derives all totals
 * from these numbers, so keep them accurate. `image` is a real Unsplash photo
 * (the host is whitelisted in next.config.ts) — edit the URL here if the
 * owner wants a different shot.
 */
export const products = [
  {
    id: "whole-chicken-medium",
    name: "Whole Chicken (Medium)",
    description: "Approx. 1.2–1.5kg, farm-raised, dressed and ready to cook.",
    price: 11500,
    currency: "NGN",
    unit: "per bird",
    image:
      "https://images.unsplash.com/photo-1672787153720-e85fe802fd9f?w=800&q=70&auto=format&fit=crop",
    tags: ["Best Seller"],
  },
  {
    id: "whole-chicken-large",
    name: "Whole Chicken (Large)",
    description: "Approx. 1.8–2.2kg, farm-raised, dressed and ready to cook.",
    price: 12000,
    currency: "NGN",
    unit: "per bird",
    image:
      "https://images.unsplash.com/photo-1672787153655-0c19308dcc60?w=800&q=70&auto=format&fit=crop",
    tags: ["Large"],
  },
  {
    id: "chicken-parts",
    name: "Chicken Parts",
    description:
      "Mixed cuts — drumsticks, thighs, wings and breast. Packed frozen.",
    price: 7500,
    currency: "NGN",
    unit: "per kg",
    image:
      "https://images.unsplash.com/photo-1759493321741-883fbf9f433c?w=800&q=70&auto=format&fit=crop",
    tags: [],
  },
  {
    id: "live-birds",
    name: "Live Birds",
    description: "Healthy, fully-grown birds for breeding or home slaughter.",
    price: 10000,
    currency: "NGN",
    unit: "per bird",
    image:
      "https://images.unsplash.com/photo-1556316918-880f9e893822?w=800&q=70&auto=format&fit=crop",
    tags: ["By Request"],
  },
] as const;

export type Product = (typeof products)[number];
