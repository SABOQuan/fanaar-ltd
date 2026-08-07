// Your services and their tiers live here as plain data.
// Because the site is static, editing this file + redeploying updates the
// pages. No database or CMS needed for marketing content.

export type Tier = {
  name: string;
  summary: string;
  features: string[];
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  tiers: Tier[];
};

export const services: Service[] = [
  {
    slug: "contact-center",
    title: "Contact Center",
    description:
      "Inbound and outbound voice, chat, and email support handled by trained agents.",
    tiers: [
      {
        name: "Essential",
        summary: "Core coverage for growing teams.",
        features: ["Business-hours support", "Email + chat", "Monthly reporting"],
      },
      {
        name: "Professional",
        summary: "Extended coverage with voice.",
        features: ["Extended hours", "Voice + chat + email", "Weekly reporting"],
      },
      {
        name: "Enterprise",
        summary: "Round-the-clock, fully managed.",
        features: ["24/7 coverage", "Dedicated team", "Custom SLAs"],
      },
    ],
  },
  {
    slug: "finance-accounting",
    title: "Finance & Accounting",
    description:
      "Bookkeeping, accounts payable/receivable, and reporting handled off-site.",
    tiers: [
      {
        name: "Essential",
        summary: "Books kept clean.",
        features: ["Bookkeeping", "Monthly statements", "AP/AR tracking"],
      },
      {
        name: "Professional",
        summary: "Deeper financial operations.",
        features: ["Payroll support", "Reconciliation", "Quarterly reviews"],
      },
      {
        name: "Enterprise",
        summary: "A full off-site finance function.",
        features: ["Dedicated controller", "Custom reporting", "Audit support"],
      },
    ],
  },
];
