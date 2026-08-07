// "What We Do" categories, shared between the homepage cards (WhatWeDo.tsx) and each
// category's own detail page (app/what-we-do/[slug]/page.tsx). Static data, no CMS — the site
// is a static export, so editing this file + redeploying is how content changes.
//
// `description` is the short line shown on the homepage card. `tagline` and `features` are
// the detail page's expanded content — written as a grounded extension of `description`
// rather than invented claims, since there's no real service copy to draw from yet. Swap
// these for real copy whenever it's provided.

export type Accent = "teal" | "magenta";

export type Feature = {
  title: string;
  description: string;
};

export type Pillar = {
  slug: string;
  title: string;
  description: string;
  accent: Accent;
  tagline: string;
  features: Feature[];
};

export const pillars: Pillar[] = [
  {
    slug: "commercial-strategy",
    title: "Commercial Strategy",
    description: "Growth consulting, go-to-market planning, and revenue strategy tailored to your business.",
    accent: "teal",
    tagline: "Assess. Plan. Grow.",
    features: [
      {
        title: "Growth Consulting",
        description: "We look at where your business is now and where it can realistically go, then map a plan that fits your team's actual capacity.",
      },
      {
        title: "Go-To-Market Planning",
        description: "Clear steps for launching new offers, entering markets, or repositioning what you already have, sequenced so nothing gets rushed.",
      },
      {
        title: "Revenue Strategy",
        description: "Pricing, channel mix, and sales targets set around your numbers, not industry averages, so the plan is something you can actually hit.",
      },
    ],
  },
  {
    slug: "market-intelligence-research",
    title: "Market Intelligence & Research",
    description: "Competitor analysis, customer personas, and market opportunity assessments.",
    accent: "magenta",
    tagline: "Look. Learn. Decide.",
    features: [
      {
        title: "Competitor Analysis",
        description: "A clear look at who else is competing for your customers, what they're doing well, and where there's room for you to stand out.",
      },
      {
        title: "Customer Personas",
        description: "Research-backed profiles of who you're actually selling to, built from real data rather than assumptions.",
      },
      {
        title: "Market Opportunity Assessments",
        description: "An honest read on where the demand is, so effort goes toward the openings worth pursuing.",
      },
    ],
  },
  {
    slug: "branding-creative",
    title: "Branding & Creative",
    description: "Brand identity, guidelines, and the collateral that carries your name.",
    accent: "teal",
    tagline: "Define. Design. Deliver.",
    features: [
      {
        title: "Brand Identity",
        description: "Logo, color palette, and typography built around who you are, not pulled from a template.",
      },
      {
        title: "Brand Guidelines",
        description: "A reference doc your team can actually use, so your brand looks consistent no matter who's making the next piece of content.",
      },
      {
        title: "Collateral",
        description: "Business cards, decks, social templates, and other everyday materials designed to match your identity.",
      },
    ],
  },
  {
    slug: "technology-digital-solutions",
    title: "Technology & Digital Solutions",
    description: "Websites, automation, and the tech stack that runs your business.",
    accent: "magenta",
    tagline: "Build. Automate. Run.",
    features: [
      {
        title: "Websites",
        description: "Sites built to load fast, work on mobile, and represent your business the way you actually want to be seen.",
      },
      {
        title: "Automation",
        description: "Repetitive back-office tasks handled by tools that connect to what you already use, freeing up your team's time.",
      },
      {
        title: "Tech Stack Support",
        description: "Help choosing and setting up the software your business runs on, without over-buying tools you won't use.",
      },
    ],
  },
];
