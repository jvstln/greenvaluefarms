/**
 * GreenValueFarms — single source of truth
 * ---------------------------------------------------------------------------
 * EVERYTHING business-related lives in this file. If a family member or a
 * future developer needs to change copy, prices, contact details, products,
 * or nav links, they should edit THIS file and nothing else.
 *
 * Every value that is a placeholder is marked with a `// TODO: replace
 * placeholder` comment so it's obvious what still needs real data before
 * launch.
 *
 * The object is declared `as const` so TypeScript infers precise literal
 * types (see the derived `Product`, `NavItem`, etc. types at the bottom).
 * Do not hardcode any business data inside component files.
 */
export const siteConfig = {
  business: {
    name: "GreenValueFarms",
    tagline: "Farm-fresh chickens, raised right.",
    description:
      "A family-run farm bringing healthy, well-raised chickens straight to your table — no middlemen, no shortcuts.",
    // TODO: replace placeholder — this is a made-up welcome message used at the top of every WhatsApp order.
    orderIntro: "Hello GreenValueFarms! I'd like to place an order:",
    logo: {
      // Placeholder — swap this file/path when the real logo is ready.
      src: "/logo-placeholder.svg",
      alt: "GreenValueFarms logo — a stylised egg with a sprouting leaf",
    },
    contact: {
      // TODO: replace placeholder — international format, digits only, no "+" or spaces.
      whatsappNumber: "2348000000000",
      phoneDisplay: "+234 800 000 0000", // TODO: replace placeholder
      email: "hello@greenvaluefarms.com", // TODO: replace placeholder
      address: "Placeholder Farm Road, Lagos, Nigeria", // TODO: replace placeholder
    },
    socials: {
      // TODO: replace placeholder links.
      instagram: "https://instagram.com/greenvaluefarms",
      facebook: "https://facebook.com/greenvaluefarms",
    },
    familyLine: "Family-run since day one — every bird is raised, dressed and packed by our own hands.",
  },

  /* In-page navigation. `href` must match a section id on the page. */
  nav: [
    { label: "Products", href: "#products" },
    { label: "Why Us", href: "#why-us" },
    { label: "How to Order", href: "#ordering" },
    { label: "Our Story", href: "#story" },
    { label: "Contact", href: "#contact" },
  ],

  /* -------------------------------------------------------------------------
     Products — price is stored in the smallest currency unit as a plain
     number; `currency` is the ISO code. The order summary / WhatsApp
     message derives all totals from these numbers, so keep them accurate.
     `image` paths point at placeholder SVGs in /public/products — swap the
     file (or point at a real photo) when real imagery is ready.
  ------------------------------------------------------------------------- */
  products: [
    {
      id: "whole-chicken-medium",
      name: "Whole Chicken (Medium)",
      description: "Approx. 1.2–1.5kg, farm-raised, dressed and ready to cook.",
      price: 8500,
      currency: "NGN",
      unit: "per bird",
      image: "/products/whole-chicken.svg", // placeholder image
      tags: ["Best Seller"],
    },
    {
      id: "whole-chicken-large",
      name: "Whole Chicken (Large)",
      description: "Approx. 1.8–2.2kg, farm-raised, dressed and ready to cook.",
      price: 12000,
      currency: "NGN",
      unit: "per bird",
      image: "/products/whole-chicken-large.svg", // placeholder image
      tags: ["Family Size"],
    },
    {
      id: "chicken-parts",
      name: "Chicken Parts",
      description: "Mixed cuts — drumsticks, thighs, wings and breast. Packed frozen.",
      price: 4800,
      currency: "NGN",
      unit: "per kg",
      image: "/products/chicken-parts.svg", // placeholder image
      tags: [],
    },
    {
      id: "live-birds",
      name: "Live Birds",
      description: "Healthy, fully-grown birds for breeding or home slaughter.",
      price: 6500,
      currency: "NGN",
      unit: "per bird",
      image: "/products/live-birds.svg", // placeholder image
      tags: ["By Request"],
    },
  ],

  /* Why-us cards — icons are lucide-react icon names (see WhyUs section). */
  whyUs: [
    {
      icon: "leaf",
      title: "Farm Fresh",
      description: "Raised on our own farm, not sourced from a middleman.",
    },
    {
      icon: "shield-check",
      title: "No Hormones or Shortcuts",
      description: "TODO: replace placeholder — describe your real feeding & care practice.",
    },
    {
      icon: "hand-heart",
      title: "Family-Run, Personally Handled",
      description: "Every order is packed and checked by our own hands.",
    },
    {
      icon: "truck",
      title: "Fast Local Delivery",
      description: "TODO: replace placeholder — replace with your actual delivery info & areas.",
    },
  ],

  /* Ordering flow steps, rendered as a numbered connector. */
  orderingSteps: [
    {
      step: 1,
      title: "Pick your products",
      description: "Browse our chickens and choose what you need.",
    },
    {
      step: 2,
      title: "Add to your order",
      description: "Select the quantity for each product you want.",
    },
    {
      step: 3,
      title: "Send via WhatsApp",
      description: "Review your order summary and send it to us on WhatsApp.",
    },
    {
      step: 4,
      title: "We confirm & deliver",
      description: "We'll confirm availability, price and delivery details directly with you.",
    },
  ],

  /* Our Story — optional section, placeholders throughout. */
  story: {
    // TODO: replace placeholder copy.
    heading: "A small farm doing things properly",
    body: [
      "TODO: replace placeholder — write your real story here. Keep it warm and human: who runs the farm, why you started, and how you raise your birds.",
      "TODO: replace placeholder — a second paragraph. Mention your growing plans — GreenValueFarms isn't stopping at chickens.",
    ],
    image: {
      // Placeholder photo (Unsplash, CC) — swap for a real farm photo when ready.
      src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=70&auto=format&fit=crop",
      alt: "Green fields on a family farm at dusk",
    },
    highlight: "Family-run. Farm-raised. Zero shortcuts.",
  },

  /* FAQ — optional, keeps the page focused. */
  faq: [
    {
      question: "Where do you deliver?",
      answer: "TODO: replace placeholder — list the areas you cover and any delivery fee or minimum order.",
    },
    {
      question: "Are the birds really hormone-free?",
      answer: "TODO: replace placeholder — describe how your birds are raised, fed, and cared for.",
    },
    {
      question: "How does the WhatsApp ordering work?",
      answer: "Add your products, review the summary, and press 'Send Order via WhatsApp' — your order arrives as a message we reply to directly.",
    },
    {
      question: "Can I come visit the farm?",
      answer: "TODO: replace placeholder — tell customers when visits are possible and how to arrange one.",
    },
  ],

  /* Hero + generic section headings */
  hero: {
    eyebrow: "Family-run · Lagos, Nigeria",
    heading: "Farm-fresh chickens, raised right.",
    sub: "Healthy, well-raised chickens from our farm to your table — dressed, ready to cook, and handled by family hands from start to finish.",
    ctaPrimary: "View Our Chickens",
    ctaSecondary: "Order on WhatsApp",
    // Small trust badges under the CTAs.
    trust: [
      "Raised on our own farm",
      "No hormones or shortcuts",
      "Dressed & ready to cook",
    ],
    image: {
      // Placeholder photo (Unsplash, CC) — swap for a real farm/chicken photo when ready.
      src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=70&auto=format&fit=crop",
      alt: "Golden sunlight over a farm field at dusk",
    },
    // Little floating chip that overlaps the hero image.
    chipTitle: "Whole Chicken",
    chipSub: "from",
    chipPrice: 8500,
    chipUnit: "per bird",
    // Circular "stamp" badge overlapping the hero image.
    stamp: "Family-run since day one",
  },

  productsSection: {
    eyebrow: "Our Produce",
    heading: "Choose your chickens",
    sub: "Every bird is raised on the farm, dressed to order, and priced honestly.",
  },

  whyUsSection: {
    eyebrow: "Why GreenValueFarms",
    heading: "Small farm values, no compromises.",
    sub: "We're not a big operation — and that's exactly the point.",
  },

  orderingSection: {
    eyebrow: "How it works",
    heading: "Ordering is as easy as a text message.",
    sub: "Four simple steps from your screen to our farm.",
    ctaLabel: "Send Order via WhatsApp",
    ctaHint: "No account needed. No payment at checkout — we confirm everything with you directly.",
  },

  storySection: {
    eyebrow: "Our Story",
  },

  faqSection: {
    eyebrow: "Good to know",
    heading: "Frequently asked questions",
  },

  orderSheet: {
    title: "Your Order",
    emptyTitle: "Your order is empty",
    emptyMessage: "Browse the products and add some chickens to your order.",
    browseLabel: "Browse products",
    customerNameLabel: "Your name (optional)",
    customerNamePlaceholder: "e.g. Adaeze O.",
    customerDetailsLabel: "Delivery notes (optional)",
    customerDetailsPlaceholder: "e.g. Address or preferred pickup time",
    sendButton: "Send Order via WhatsApp",
    subtotalLabel: "Estimated total",
    note: "Prices are estimates — we confirm final price and delivery with you on WhatsApp.",
  },

  floatingBar: {
    reviewLabel: "Review order",
    itemLabel: "item", // singular
    itemsLabel: "items", // plural
  },

  footer: {
    contactHeading: "Get in touch",
    quickLinksHeading: "Explore",
    ctaHeading: "Hungry already?",
    ctaText: "Send us a message on WhatsApp and we'll get back to you the same day.",
    ctaButton: "Chat with us on WhatsApp",
    copyrightSuffix: "All rights reserved.",
  },
} as const;

/* ---------------------------------------------------------------------------
   Derived types — components consume these, so editing the config above is
   type-checked everywhere it's used.
--------------------------------------------------------------------------- */
export type SiteConfig = typeof siteConfig;
export type Product = (typeof siteConfig.products)[number];
export type NavItem = (typeof siteConfig.nav)[number];
export type WhyUsItem = (typeof siteConfig.whyUs)[number];
export type OrderingStep = (typeof siteConfig.orderingSteps)[number];
export type FaqItem = (typeof siteConfig.faq)[number];