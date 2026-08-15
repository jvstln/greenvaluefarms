# WhatsApp Catalog — menu inside the chat

The site's ordering flow (browse → cart → `wa.me` message) is the **shop**. The
WhatsApp Catalog is the **menu that lives inside WhatsApp itself**: customers
browse photos, prices and quantities in the chat, build a cart, and send it to
you. The two work together — the catalog is a shareable, always-on menu, not a
replacement for the site.

This guide is the zero-code, in-app setup. The only code-side piece is the
`catalog.enabled` switch in `lib/config/site.ts` that decides what every
"Browse our menu on WhatsApp" button, QR code and footer link points at.

## 1. Confirm the number is a WhatsApp Business number

A catalog only works on a **WhatsApp Business** number:

1. Install the **WhatsApp Business** app (a separate app from regular WhatsApp).
2. Verify the business number in-app (the farm's existing number can be moved).
3. Open the app → **Settings → Catalog** and confirm you can see the catalog
   setup screen.

> **Fallback if it isn't:** set `catalog.enabled: false` in
> `lib/config/site.ts`. Every catalog CTA then points at a plain `wa.me` chat
> link that pre-fills *"Please send us your current menu and prices."* — the
> site keeps working with any WhatsApp number. WhatsApp can't tell us
> programmatically whether a number has a catalog, so this one boolean is the
> owner's switch after testing the link once.

## 2. Create the catalog items

In **WhatsApp Business → Settings → Catalog → Add items**, one per product in
`lib/config/site.ts` (they must match — see step 6):

| Site product | Catalog item | Price |
| --- | --- | --- |
| Whole Chicken (Medium) | Whole Chicken (Medium) | 11,500 NGN |
| Whole Chicken (Large) | Whole Chicken (Large) | 12,000 NGN |
| Chicken Parts | Chicken Parts (per kg) | 7,500 NGN |
| Live Birds | Live Birds (per bird) | 10,000 NGN |

Each item gets a photo (reuse the product photos already in config), a short
description, a price, and availability. Use **collections** to group them —
e.g. *Whole Birds*, *Parts & Cuts*, *Live Birds*.

## 3. Bulk-import from the config (optional)

The repo ships a generator that turns `lib/config/site.ts` into a feed:

```bash
pnpm catalog:csv
```

Writes `catalog.csv` (one row per product, price as `11500.00 NGN`, availability
`in stock` / `preorder`) — upload it via **Meta Commerce Manager → Catalog →
Data sources** if you'd rather not type items by hand, or just copy from it
while adding items in the app. Re-run it whenever products change so the two
never drift.

## 4. Turn on the in-chat cart

**WhatsApp Business → Settings → Catalog → cart**: enable it so customers can
add several items and send them as one order message. The cart lives per
chat thread and clears once sent.

## 5. Quick Replies, away message, business hours

Keep the ordering conversation fast with:

- **Quick Replies** for the two questions that come up every time:
  - *Delivery* → the delivery areas + fee guidance (reuse the FAQ answer).
  - *Lead time* → same-day / next-day guidance from `siteConfig.faq`.
- **Away message** + **business hours** so customers know when to expect a reply.

## 6. Keep site and catalog in sync

The website and the catalog are maintained separately (site = config file,
catalog = in-app), so check periodically:

- Product names, prices and units match `lib/config/site.ts`.
- New products / price changes are updated in **both** places.
- The catalog's `wa.me/c/<number>` link still opens (test from a friend's phone).

## 7. Share the catalog

- The site already renders the catalog link in three places (products strip +
  QR, footer). The QR is print-ready for packaging and receipts.
- In the Business App you can also **send the catalog** into any chat or share
  the `wa.me/c/2348105805818` link on social media and status.

Every catalog CTA also carries a dashed **"No catalog? Just message us"** link —
the always-working plain-chat fallback, so a customer never hits a dead end.