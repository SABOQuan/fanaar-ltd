<p align="center">
  <img src="public/logo2.png" alt="Fanaar Ltd logo" width="560" />
</p>

<h1 align="center">Fanaar Ltd</h1>

<p align="center"><strong>Your Partner from Idea to Execution</strong></p>

<p align="center">
  Marketing website for Fanaar Ltd, an outsourced growth and BPO partner for SMEs.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="AWS Lambda" src="https://img.shields.io/badge/AWS-Lambda-FF9900?logo=awslambda&logoColor=white" />
</p>

---

## About

Fanaar Ltd was an outsourced growth partner for SMEs that needed to scale but
lacked the in-house time, team, or expertise to do it. The site presents four
service pillars:

- **Commercial Strategy**: growth consulting, go-to-market planning, and revenue strategy
- **Market Intelligence & Research**: competitor analysis, customer personas, and market opportunity assessments
- **Branding & Creative**: brand identity, guidelines, and collateral
- **Technology & Digital Solutions**: websites, automation, and tech stack support

It also covers managed **Contact Center** and **Finance & Accounting**
services, each offered in Essential, Professional, and Enterprise tiers.

The site was published at [fanaarltd.com](https://fanaarltd.com).

## Features

- **Fully static site.** Next.js App Router with `output: "export"`, so the
  build is plain HTML, CSS, and JS that any static host or CDN can serve.
- **Animated landing page.** GSAP-driven smooth scrolling and section animations.
- **Data-driven service pages.** One detail page per pillar, generated from
  `src/lib/pillars.ts` at `/what-we-do/[slug]/`.
- **Serverless contact form.** A Zod-validated form posts to an AWS Lambda
  that stores each lead in DynamoDB and sends an email notification through SES.
- **Spam protection.** A honeypot field, with validation on both the client
  and the server from the same schema.
- **SEO basics.** `sitemap.xml` and `robots.txt` are generated at build time.
- **Policy center.** Static legal and policy pages in `public/policies/`
  (privacy, cookies, terms, data protection, and more).

## Tech stack

| Area       | Tools                                            |
| ---------- | ------------------------------------------------ |
| Framework  | Next.js 16 (App Router, static export), React 19 |
| Language   | TypeScript                                       |
| Styling    | Tailwind CSS 4, custom ITC Avant Garde fonts     |
| Animation  | GSAP                                             |
| Validation | Zod                                              |
| Backend    | AWS Lambda + API Gateway, DynamoDB, SES          |
| Hosting    | Static files on S3, served through Cloudflare    |

## Project structure

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Landing page
│   │   ├── services/page.tsx         # Services and pricing tiers
│   │   ├── what-we-do/[slug]/        # One page per service pillar
│   │   ├── contact/page.tsx          # Contact page
│   │   ├── sitemap.ts, robots.ts     # SEO
│   │   └── layout.tsx, globals.css
│   ├── components/                   # Hero, WhatWeDo, ServicesSection, ContactForm, Footer, ...
│   └── lib/
│       ├── pillars.ts                # Content for the four pillars
│       ├── services.ts               # Service and tier content
│       └── validation.ts             # Shared Zod contact schema
├── lambda/
│   └── contact.mjs                   # Contact form handler (Lambda)
├── public/                           # Logos, SVG art, fonts, policy pages
├── .env.example
└── next.config.ts
```

## Getting started

### Requirements

- Node.js 20.9 or newer
- npm

### Run locally

```bash
git clone https://github.com/SABOQuan/fanaar-ltd.git
cd fanaar-ltd
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | What it does                               |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start the development server               |
| `npm run build` | Build the static site into `out/`          |
| `npm run start` | Serve a production build                   |
| `npm run lint`  | Run ESLint                                 |

## Environment variables

### Website (`.env.local`)

| Variable                       | Description                                                 |
| ------------------------------ | ----------------------------------------------------------- |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | URL of the API Gateway route that invokes the contact Lambda |

Without this value the site still runs; only contact form submissions fail.

### Lambda

| Variable     | Description                                  |
| ------------ | -------------------------------------------- |
| `TABLE_NAME` | DynamoDB table that stores form submissions  |
| `FROM_EMAIL` | SES-verified sender address                  |
| `TO_EMAIL`   | Address that receives new enquiry emails     |

Never commit real values. `.gitignore` excludes every `.env*` file except `.env.example`.

## Deployment

### Website

```bash
npm run build
```

This writes the whole site to `out/`. Upload that folder to any static host.
The original setup used an S3 bucket behind Cloudflare. `trailingSlash: true`
is set so routes are emitted as `about/index.html`, which is the layout S3
static hosting expects.

### Contact form backend

1. Create a DynamoDB table (partition key `id`, string).
2. Verify the sender address (or domain) in Amazon SES.
3. Install the Lambda's dependencies and zip it:
   ```bash
   cd lambda
   npm install
   zip -r function.zip .
   ```
4. Create a Node.js Lambda function from `function.zip` with the handler
   `contact.handler`, and set `TABLE_NAME`, `FROM_EMAIL`, and `TO_EMAIL`.
5. Give its role `dynamodb:PutItem` on the table and `ses:SendEmail`.
6. Add an API Gateway HTTP API with a `POST` route to the function, and put
   that URL in `NEXT_PUBLIC_CONTACT_ENDPOINT`.

The Lambda currently allows any origin (`Access-Control-Allow-Origin: *`).
For production, restrict it to your domain.

## License

All rights reserved. The Fanaar Ltd name, logos, artwork, and fonts are
proprietary and are not licensed for reuse.
