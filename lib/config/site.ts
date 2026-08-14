/**
 * GreenValueFarms — single source of truth
 * ---------------------------------------------------------------------------
 * EVERYTHING business-related lives in this file. If the owner or a future
 * developer needs to change copy, prices, contact details, products, or nav
 * links, they should edit THIS file and nothing else.
 *
 * Values that still need real data from the owner (phone, email, address,
 * socials, logo, imagery) are marked with a `// TODO: owner` comment. All
 * marketing copy is written to read as a professional, established business.
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
      "Healthy, well-raised chickens delivered fresh from our farm — no middlemen, no shortcuts.",
    // Used at the top of every WhatsApp order.
    orderIntro: "Hello GreenValueFarms! I would like to place an order:",
    logo: {
      // TODO: owner — swap this file/path when the real logo is ready.
      src: "/logo-icon.svg",
      // Light-on-dark variant (greens replaced with white) for the footer.
      lightSrc: "/logo-icon-light.svg",
      alt: "GreenValueFarms logo — a stylised hen with vine tendrils",
    },
    contact: {
      // TODO: owner — international format, digits only, no "+" or spaces.
      whatsappNumber: "2348000000000",
      phoneDisplay: "+234 800 000 0000", // TODO: owner
      email: "hello@greenvaluefarms.com", // TODO: owner
      address: "No 140 Orba Road Nsukka, Enugu, Nigeria", // TODO: owner
    },
    socials: {
      // TODO: owner — replace with the real profiles.
      instagram: "https://instagram.com/greenvaluefarms",
      facebook: "https://facebook.com/greenvaluefarms",
    },
    aboutLine:
      "Farm-raised in Nigeria — dressed, packed and delivered with care.",
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
     `image` is a real Unsplash photo (the host is whitelisted in
     next.config.ts) — edit the URL here if the owner wants a different shot.
  ------------------------------------------------------------------------- */
  products: [
    {
      id: "whole-chicken-medium",
      name: "Whole Chicken (Medium)",
      description: "Approx. 1.2–1.5kg, farm-raised, dressed and ready to cook.",
      price: 10500,
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
      price: 8500,
      currency: "NGN",
      unit: "per bird",
      image:
        "https://images.unsplash.com/photo-1556316918-880f9e893822?w=800&q=70&auto=format&fit=crop",
      tags: ["By Request"],
    },
  ],

  /* Why-us rows — rendered as a numbered ledger in the WhyUs section. */
  whyUs: [
    {
      title: "Farm Fresh",
      description: "Raised on our own farm, not sourced from a middleman.",
    },
    {
      title: "No Hormones or Shortcuts",
      description:
        "Clean feed program, room to grow, and consistent care — no hormones, no overcrowding, no shortcuts.",
    },
    {
      title: "Handled with Care",
      description:
        "Every bird is dressed, inspected and packed with care before it leaves the farm.",
    },
    {
      title: "Fast Local Delivery",
      description:
        "Same-day or next-day delivery across Nigeria. Confirm your area and timing on WhatsApp.",
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
      description:
        "We'll confirm availability, price and delivery details directly with you.",
    },
  ],

  /* Our Story — presents a confident, growing business. */
  story: {
    heading: "Raising chickens the right way.",
    body: [
      "GreenValueFarms was built around one idea: chicken should be simple, healthy and honest. Our birds are raised on a clean, consistent feed program with room to move — then dressed, packed and delivered fresh, with no middlemen in between.",
      "We're growing with the market. Chickens are our focus today, and we're investing in the sourcing, raising, dressing and delivery systems we'll carry into a wider range of farm products in the years ahead.",
    ],
    image: {
      // Placeholder photo (Unsplash, CC) — swap for a real farm photo when ready.
      src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=70&auto=format&fit=crop",
      alt: "Green fields on the farm at dusk",
    },
    highlight: "Farm-raised. Hormone-free. Zero shortcuts.",
  },

  /* FAQ — keeps the page focused. */
  faq: [
    {
      question: "Where do you deliver?",
      answer:
        "We currently deliver across Nigeria, with same-day or next-day delivery depending on your area. Message us on WhatsApp to confirm coverage, timing and delivery fee for your location.",
    },
    {
      question: "Are the birds really hormone-free?",
      answer:
        "Yes. Our birds are raised without hormones or routine antibiotics, on a consistent feed program and with room to move. Happy to walk you through exactly how they are raised.",
    },
    {
      question: "How does the WhatsApp ordering work?",
      answer:
        "Add your products, review the summary, and press \u2018Send Order via WhatsApp\u2019. Your order arrives as a message we reply to directly — we confirm price, delivery and pickup before anything is final.",
    },
    {
      question: "Can I visit the farm?",
      answer:
        "We are happy to host visits by appointment. Send us a message on WhatsApp and we will arrange a time that works for you.",
    },
  ],

  /* Hero + generic section headings */
  hero: {
    eyebrow: "Farm-fresh · Enugu, Nigeria",
    heading: "Farm-fresh chickens, raised right.",
    sub: "Healthy, well-raised chickens from our farm to your table — dressed, ready to cook, and delivered fresh to your door.",
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
      src: "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=1400&q=70&auto=format&fit=crop",
      alt: "A farm-raised brown chicken pecking on green grass",
    },
    // Little floating chip that overlaps the hero image.
    chipTitle: "Whole Chicken",
    chipSub: "from",
    chipPrice: 10500,
    chipUnit: "per bird",
    // Circular "stamp" badge overlapping the hero image.
    stamp: "Farm-fresh since day one",
  },

  productsSection: {
    eyebrow: "Our Produce",
    heading: "Choose your chickens",
    sub: "Every bird is raised on the farm, dressed to order, and priced honestly.",
  },

  whyUsSection: {
    eyebrow: "Why GreenValueFarms",
    heading: "Raising standards, no compromises.",
    sub: "A focused operation doing one thing exceptionally well: healthy, honest chicken.",
  },

  orderingSection: {
    eyebrow: "How it works",
    heading: "Ordering is as easy as a text message.",
    sub: "Four simple steps from your screen to our farm.",
    ctaLabel: "Send Order via WhatsApp",
    ctaHint:
      "No account needed. No payment at checkout — we confirm everything with you directly.",
  },

  storySection: {
    eyebrow: "Our Story",
  },

  faqSection: {
    eyebrow: "Good to know",
    heading: "Frequently asked questions",
  },

  orderSheet: {
    title: "Review your order",
    emptyTitle: "Your order is empty",
    emptyMessage: "Browse the products and add some chickens to your order.",
    browseLabel: "Browse products",
    customerNameLabel: "Your name (optional)",
    customerNamePlaceholder: "e.g. Adaeze O.",
    customerDetailsLabel: "Delivery notes (optional)",
    customerDetailsPlaceholder:
      "e.g. Delivery address or preferred pickup time",
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
    ctaText:
      "Send us a message on WhatsApp and we'll get back to you the same day.",
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
