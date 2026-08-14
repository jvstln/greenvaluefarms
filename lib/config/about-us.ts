/**
 * GreenValueFarms — About Us / Our Story
 * ---------------------------------------------------------------------------
 * Data for the standalone `/about-us` page and the "Our Story" teaser section
 * on the home page. Single source of truth for everything about the company:
 * the narrative, values, milestones, and the team behind the farm.
 *
 * `story` and `storySection` were moved here from `lib/config/site.ts` when the
 * About page landed — edit them here, not in site.ts.
 *
 * Values still pending from the owner (team photo files, social URLs,
 * milestone years) are marked with a `// TODO: owner` comment. Team photos
 * live in `/public/team/*.jpg` — drop the files in and the page picks them up
 * (a monogram ticket placeholder shows until then).
 *
 * Declared `as const` so TypeScript infers precise literal types; the derived
 * `TeamMember`, `Value`, `Milestone`, … types are at the bottom. Never
 * hardcode any of this data inside component files.
 */
export const aboutUs = {
  sectionLabel: "Our Story",

  headline: "Built on family expertise, run like a real farm business.",
  summary:
    "GreenValueFarms began as a single family's effort to raise healthier, better birds — and grew into a structured operation with dedicated leadership across production, technology, and advisory. We're still family-founded, but every part of how we operate is built to be trusted like any standard agricultural company.",

  /* The home-page teaser section (kept so the homepage's Our Story stays). */
  story: {
    heading: "Raising stocks the right way.",
    body: [
      "GreenValueFarms was built around one idea: chicken should be simple, healthy and honest. Our birds are raised on a clean, consistent feed program with room to move — then dressed, packed and delivered fresh, with no middlemen in between.",
      "We're growing with the market. Poultry is our focus today, and we're investing in the sourcing, raising, dressing and delivery systems we'll carry into a wider range of farm products in the years ahead.",
    ],
    image: {
      // Placeholder photo (Unsplash, CC) — swap for a real farm photo when ready.
      src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=70&auto=format&fit=crop",
      alt: "Green fields on the farm at dusk",
    },
    highlight: "Farm-raised. Hormone-free. Zero shortcuts.",
  },

  storySection: {
    eyebrow: "Our Story",
  },

  /* The full narrative — five beats, in order. Rendered as a numbered ledger. */
  paragraphs: [
    "GreenValueFarms started when Modesta Ezema, the company's founder, set out to prove that a small farm could consistently raise healthier, better-cared-for birds than what was commonly available locally. What began as an idea quickly became a working operation.",
    "The first successful flock — the batch that proved the model actually worked — was raised with Mirabel Ezema, a medical scientist whose hands-on production discipline and science-first hygiene standards still underpin GreenValueFarms' processes today. That early success is what turned the idea into a real business.",
    "As the operation grew, it needed more than good instincts in the field — it needed systems, research, and reliable infrastructure. That's where Justin Ezema stepped in, applying a technology and research background to how the farm operates, tracks quality, and now, how it reaches customers online.",
    "Alongside the operational side, Daniel Ezema backed the business with significant financial investment and lends his medical background to how GreenValueFarms thinks about health, hygiene, and food-safety practices on the farm.",
    "Today, GreenValueFarms is still fully family-founded — and run with the structure, roles, and standards of a proper agricultural company. Chickens are where we started; it's not where we plan to stop.",
  ],

  values: [
    {
      title: "Hands-On Quality",
      description:
        "Every process traces back to practices proven on our own farm, not copied from elsewhere.",
    },
    {
      title: "Health & Safety First",
      description:
        "Farm hygiene and food-safety practices are treated as core operations, not an afterthought.",
    },
    {
      title: "Built to Grow",
      description:
        "Systems, research, and technology are put in place early so the business can expand beyond poultry.",
    },
    {
      title: "Family Accountability",
      description:
        "Leadership is invested personally and financially — there's no layer of distance between us and the product.",
    },
  ],

  milestones: [
    {
      year: "TODO: add year",
      title: "GreenValueFarms founded",
      description:
        "Modesta Ezema founds the business with the goal of raising healthier, better-managed birds.",
    },
    {
      year: "TODO: add year",
      title: "First successful flock raised",
      description:
        "Modesta and Mirabel Ezema raise the farm's first successful batch — validating the model.",
    },
    {
      year: "TODO: add year",
      title: "Operations formalized",
      description:
        "Daniel Ezema's investment and Justin Ezema's operational/technical systems put the farm on a structured footing.",
    },
    {
      year: "2026",
      title: "GreenValueFarms goes online",
      description:
        "Launch of the official GreenValueFarms website, bringing ordering online for the first time.",
    },
  ],

  team: [
    {
      id: "modesta-ezema",
      name: "Modesta Ezema",
      role: "Founder & CEO",
      roleTag: "Founder",
      bio: "Modesta founded GreenValueFarms with a simple goal: raise healthier, better-cared-for birds than what was commonly available. She originated the idea behind the business and continues to set its direction and standards today.",
      credentials: [],
      image: {
        src: "/team/modesta-ezema.jpg",
        alt: "Modesta Ezema, Founder & CEO of GreenValueFarms",
      },
      socials: {
        linkedin: "TODO: add LinkedIn URL", // TODO: owner
        instagram: "TODO: add Instagram URL", // TODO: owner
        email: "TODO: add email", // TODO: owner
      },
      externalVenture: null,
    },
    {
      id: "mirabel-ezema",
      name: "Mirabel Ezema",
      role: "Co-Founder & Head of Farm Operations",
      roleTag: "Co-Founder",
      bio: "Mirabel was hands-on in raising GreenValueFarms' first successful flock — the batch that proved the model worked. A medical scientist by training, she leads day-to-day farm operations and production standards, putting science first in every hygiene and food-safety decision.",
      credentials: ["Medical Scientist"],
      image: {
        src: "/team/mirabel-ezema.jpg",
        alt: "Mirabel Ezema, Co-Founder & Head of Farm Operations at GreenValueFarms",
      },
      socials: {
        linkedin: "TODO: add LinkedIn URL", // TODO: owner
        instagram: "TODO: add Instagram URL", // TODO: owner
        email: "TODO: add email", // TODO: owner
      },
      externalVenture: {
        name: "Gwen Pastries",
        description: "Founder & Owner",
        url: "TODO: add Gwen Pastries URL", // TODO: owner
      },
    },
    {
      id: "justin-ezema",
      name: "Justin Ezema",
      role: "Co-Founder & Head of Technology & Operations",
      roleTag: "Co-Founder",
      bio: "Justin oversees the farm's operational maintenance and technical infrastructure, including the systems and research that keep the business running efficiently — and built the GreenValueFarms website itself. He holds a degree in Computer Science, bringing an engineering and research-driven approach to how the farm operates and grows.",
      credentials: [
        // "Computer Scientist"
      ],
      image: {
        src: "/team/justin-ezema.jpg",
        alt: "Justin Ezema, Co-Founder & Head of Technology & Operations at GreenValueFarms",
      },
      socials: {
        linkedin: "TODO: add LinkedIn URL", // TODO: owner
        instagram: "TODO: add Instagram URL", // TODO: owner
        github: "TODO: add GitHub URL", // TODO: owner
        email: "TODO: add email", // TODO: owner
      },
      externalVenture: null,
    },
    {
      id: "daniel-ezema",
      name: "Daniel Ezema",
      role: "Board Member & Health Advisor",
      roleTag: "Advisor",
      bio: "Daniel provided significant financial investment that helped establish GreenValueFarms' operations. As a practicing medical doctor, he keeps health, hygiene, and food-safety practice at the core of how the farm runs — our hygiene standards are built to hold up to clinical scrutiny.",
      credentials: ["Medical Doctor (M.D.)"],
      image: {
        src: "/team/daniel-ezema.jpg",
        alt: "Daniel Ezema, Board Member & Health Advisor at GreenValueFarms",
      },
      socials: {
        linkedin: "TODO: add LinkedIn URL", // TODO: owner
        instagram: "TODO: add Instagram URL", // TODO: owner
        email: "TODO: add email", // TODO: owner
      },
      externalVenture: null,
    },
  ],

  /* Section labels + copy for the about page's own sections. */
  sections: {
    header: {
      metaLine: "Family-founded · Farm-run · Nsukka, Enugu",
    },
    narrative: {
      eyebrow: "The story so far",
      heading: "How GreenValueFarms came to be.",
    },
    values: {
      eyebrow: "What we stand for",
      heading: "Four standards, no shortcuts.",
      sub: "The principles every bird on our farm is raised against.",
    },
    milestones: {
      eyebrow: "Milestones",
      heading: "How the farm grew.",
      sub: "From first flock to first website.",
    },
    team: {
      eyebrow: "The team",
      heading: "The family behind the farm.",
      sub: "Medical science, engineering, and hands-on farm practice — the people running the farm stand behind every bird they sell.",
    },
  },
} as const;

/* ---------------------------------------------------------------------------
   Derived types — components consume these, so editing the config above is
   type-checked everywhere it's used.
--------------------------------------------------------------------------- */
export type AboutUsConfig = typeof aboutUs;
export type Story = typeof aboutUs.story;
export type Value = (typeof aboutUs.values)[number];
export type Milestone = (typeof aboutUs.milestones)[number];
export type TeamMember = (typeof aboutUs.team)[number];
