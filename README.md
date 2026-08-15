# GreenValueFarms

The website for a Nigerian chicken farm: a marketing landing page that sells the farm, plus a WhatsApp ordering flow that needs no backend, no accounts, and no payments.

An order is a pre-filled `wa.me` deep link — a customer builds an order in a slide-over panel and sends it straight to the farm's WhatsApp. The whole site is static and **config-driven**: every product, price, and line of copy lives in two TypeScript config files, so editing the business is a data change, not a code change.

## Tech stack

- **Next.js 16.3.0** — App Router, React 19, React Compiler, Turbopack
- **Tailwind CSS v4** — CSS-first (no `tailwind.config`); tokens live in `app/globals.css`
- **Biome** — linting + formatting (replaces ESLint & Prettier)
- **zustand** — client-side order cart, persisted to `localStorage`
- **GSAP + ScrollTrigger** — scroll-reveal and the hero's self-drawing print rule
- **Base UI** (`@base-ui/react`) — UI primitives, installed via shadcn 4.17 (not Radix)
- **lucide-react** — icons
- **qrcode** — the WhatsApp Catalog QR in the products strip (server-rendered SVG)
- **next/font** — Archivo (display), Hanken Grotesk (body), IBM Plex Mono (numerals)

No env vars, no test suite, no CI.

## Getting started

The repo is **pnpm-only** (pinned `pnpm@10.30.3`). Don't use npm/yarn.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The landing page is `/`, and the About / Our Story page is `/about-us`.

> On a fresh clone, run `pnpm dev` or `pnpm build` once before trusting `tsc` — route-aware globals (`LayoutProps<'/route'>`, `PageProps<'/route'>`) are generated into `.next/dev/types` by the dev/build step.

## Scripts

| Command                  | What it does                                                        |
| ------------------------ | ------------------------------------------------------------------- |
| `pnpm dev`               | Dev server on :3000                                                  |
| `pnpm build`             | Production build (Turbopack)                                         |
| `pnpm start`             | Serve the production build                                           |
| `pnpm lint`              | Biome check — read-only                                              |
| `pnpm format`            | `biome format --write` only                                          |
| `pnpm check`             | `biome check --write` — autofixes incl. Tailwind class sorting (`useSortedClasses`) and import organization |
| `pnpm exec tsc --noEmit` | Typecheck                                                            |
| `pnpm catalog:csv`       | Emit `catalog.csv` from `lib/config/site.ts` for the WhatsApp Catalog |

## Project structure

```
app/
  page.tsx              Landing page — composes home sections
  about-us/page.tsx     About / Our Story page — composes the about sections
  products/page.tsx     Full menu page — every product plus the catalog CTA
  privacy/page.tsx      Privacy Policy (from lib/config/legal.ts)
  terms/page.tsx        Terms of Service (from lib/config/legal.ts)
  layout.tsx            Root layout: fonts, header/footer shell, order provider
  globals.css           Design tokens, base styles, @utility wrap
components/
  sections/             Page-level sections (hero, products, why-us, …)
  sections/about/       Sections used only on the About page
  shared/               Cross-page pieces (reveal, section-heading, print-rule, team-photo, …)
  ui/                   Base UI primitives (button, sheet, input, …)
lib/
  config/site.ts        Single source of truth for all business copy (contact, nav, sections, FAQ)
  config/products.ts    Every product + the derived Product type
  config/about-us.ts    Single source of truth for company data (About page + story teaser)
  config/legal.ts       Privacy Policy + Terms content (NDPA 2023-aware)
  order-store.tsx       zustand cart (persisted), useOrder() hook, OrderProvider
  whatsapp.ts           Pure helpers: WhatsApp message, wa.me URL, catalog URL
  format.ts             formatPrice, digitsOnly
  types.ts              Order-flow types
  utils.ts              cn(), isTodo()
public/
  logo-icon.svg         Logo (light/dark variants)
  team/*.jpg            Team portraits (placeholder JPEGs until real photos land)
scripts/
  generate-catalog-csv.ts  Emits catalog.csv for the WhatsApp Catalog (pnpm catalog:csv)
docs/
  whatsapp-catalog.md   WhatsApp Catalog in-app setup guide
```

## How ordering works

There is **no backend and no payment step**. The flow is:

1. The customer adds products via the product cards / quantity stepper — `useOrder()` in `lib/order-store.tsx` (a **global zustand store**, not a React context; `OrderProvider` only rehydrates `localStorage` after mount).
2. The floating order bar / cart button opens the order summary sheet (`components/shared/order-summary-sheet.tsx`) to review quantities and add optional name / delivery notes.
3. `lib/whatsapp.ts` formats a readable message and builds `https://wa.me/<number>?text=…` — the flow ends when the customer opens WhatsApp.
4. Prices are confirmed by the farm directly on WhatsApp.

Gotchas:

- Prices are plain integers in the smallest currency unit (naira, `NGN`).
- The WhatsApp number in config is digits-only (no `+` / spaces); `buildWhatsAppUrl` strips non-digits as a safety net.
- The persisted cart key is `greenvaluefarms:order:v1` — bump it if the persisted shape ever changes.
- A future real checkout can consume `lines` / `totalPrice` from the store without touching the UI.

### WhatsApp Catalog (the in-chat menu)

Alongside the site flow, `business.catalog` in `lib/config/site.ts` drives a
"Browse our menu on WhatsApp" strip (button + QR + a dashed plain-chat
fallback) under the products grid and in the footer. It's the WhatsApp-side
menu — see `docs/whatsapp-catalog.md` for the in-app setup.

- `catalog.enabled: true` points everything at `wa.me/c/<number>` (requires a
  WhatsApp Business number with an active catalog).
- Set it to `false` if the number isn't a Business number: every catalog CTA
  self-heals to a plain `wa.me` chat link asking for the menu. WhatsApp can't
  report catalog availability programmatically, so this is the owner's switch.
- `pnpm catalog:csv` emits `catalog.csv` (one row per product) for a bulk
  import, keeping the site and catalog in sync.

## Where data lives

**All business copy, contact, nav, sections and FAQ** → `lib/config/site.ts`. Declared `as const`; `NavItem`, `FaqItem`, etc. are derived types. **Never hardcode business data in a component.**

**All products** (name, price, description, image, tags) → `lib/config/products.ts`. The `Product` type is derived here; the home grid, `/products`, the order cart, the catalog CSV and JSON-LD all read from it.

**Everything about the company** (narrative, values, milestones, team, and the home page's "Our Story" teaser) → `lib/config/about-us.ts`.

**Privacy Policy + Terms** (production-ready, NDPA 2023-aware) → `lib/config/legal.ts`, rendered by `components/shared/legal-content.tsx` on `/privacy` and `/terms`.

Values still waiting on the owner are marked `// TODO: owner` (e.g. real contact email, milestone years, team social URLs). Team photos live in `public/team/*.jpg`; `components/shared/team-photo.tsx` shows a monogram ticket until a file exists, so a missing photo can't break the page.

## Design system — "Nigerian market / dispatch board"

Warm paper background, deep-green ink, market-yellow accent, rust for annotations. Tight print-ticket corners, hard offset shadows, dashed ticket rules, and mono ledger labels throughout.

- Headings: `font-display font-bold` (Archivo; uppercase on the hero and page headers). Prices/counts: `font-mono` + `tabular-nums`. Eyebrows: mono uppercase (`text-[0.7rem] uppercase tracking-[0.2em]`).
- Buttons are squared (`rounded-lg`), with a print-style hard shadow on `default`/`accent` variants. Cards use `rounded-xl` + a hard offset shadow.
- Numbered ledger rows (`No. 0X`, `Step 0X`, …) separate by dashed ticket rules; the hero price ticket adds a mini barcode.
- `components/shared/section-heading.tsx` is the shared section header (mono eyebrow + block mark, `tone="inverted"` for deep-green bands).
- The only deliberate `rounded-full` exceptions: the floating order bar and the quantity stepper.

The design rules are deliberately strict — the codebase does **not** use blurred gradient blobs, heavy grain, circular "stamp" badges, hand-drawn underlines, or hover-lift icon cards. Keep new UI inside the existing system.

## Images & fonts

- `next/image` remote sources are whitelisted in `next.config.ts` — currently only `images.unsplash.com` (hero / story / product photos, URLs set in config). Adding another host requires a config change.
- Fonts load via `next/font/google` as CSS vars `--font-archivo` / `--font-hanken` / `--font-plex-mono`, mapped to `font-display` / `font-sans` / `font-mono` in `app/globals.css`.

## Deployment

A fully static Next.js build — any host that supports Next.js works (Vercel, Netlify, a VPS with `next start`). No env vars or build-time secrets are required.

## Development notes

- `"use client"` only where needed (zustand, GSAP, sheets); everything else stays a server component.
- `reactCompiler: true` is on — don't add manual memoization that React Compiler would flag.
- Section gutters come from the `wrap` utility (`@utility wrap` in `app/globals.css`); anchored sections carry `scroll-mt-20` to clear the sticky header.
- `gvf/` (if it ever appears) is a stray artifact excluded in `tsconfig.json` / `biome.json` — never create or commit it.