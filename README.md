# Rootline Lab — Modern Company Website

A complete, production-ready marketing website and web platform for **Rootline Lab**, an engineering studio based in Dhaka, Bangladesh. Built with **Next.js (App Router)**, **JavaScript**, **Tailwind CSS**, and **Framer Motion**, adhering to an Apple-inspired aesthetic and "Morning Canopy" design palette.

---

## 1. Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (ES6+ / React 19)
- **Styling**: Tailwind CSS v4 with customized Morning Canopy design tokens & CSS variables
- **Motion & Interactions**: Framer Motion with Apple ease curves (`[0.22, 1, 0.36, 1]`) and `prefers-reduced-motion` support
- **Icons**: Lucide React
- **Email Service**: Nodemailer Route Handler (`/api/contact`) with SMTP support and honeypot spam prevention
- **Centralized Content**: All copy lives inside `/data/*.js` files

---

## 2. Design System: "Morning Canopy" Palette

| Token | Hex | Role |
|---|---|---|
| `--deep-teal` | `#146375` | Primary brand anchor, hero backgrounds, primary text, buttons |
| `--canopy-green` | `#3C8D70` | Secondary brand anchor, borders, glowing accents |
| `--leaf` | `#99CB5B` | Accents, highlights, chart/diagram fills |
| `--lime` | `#D4EA50` | Highlight accent, CTA glow, key emphasis words |
| `--cream` | `#F5EFB3` | Warm subheads on dark sections, soft surfaces, badges |
| `--ink-deep` | `#0E3D47` | Deep velvet teal dark section anchor |
| `--paper` | `#FBFAF2` | Warm off-white page background |
| `--mist` | `#EEF3EE` | Cards on light |

---

## 3. Site Map & Routes

- `/` — **Home**: Full-viewport hero with device mockups cluster, capabilities marquee, 11-service Bento grid, 4-phase methodology, solutions/products/industries/case-study teasers, and CTA band.
- `/services` — **Services**: All 11 engineering disciplines with alternating layouts, sticky anchor subnav, deliverables checklists, and process summary.
- `/solutions` — **Solutions**: Business-problem-oriented expandable drawers (sell online, automate workflows, launch SaaS, manage business, connect systems, modernize legacy).
- `/products` — **Products & Platforms**: Apple-style product tiles with CSS-built UI mockups (ERP, SaaS, Commerce, Scheduling, CRM) and a technology stack grid.
- `/industries` — **Industries**: 10 sector blueprints with interactive accessible modal details.
- `/case-studies` — **Case Studies**: Filterable project gallery with animated filter chips.
- `/case-studies/[slug]` — **Case Study Detail**: Challenge → Solution → Result → Tech used breakdown.
- `/about` — **About Us**: Founding story, mission/vision, core values, principles, leadership placeholders, and "Rooted in Dhaka, Building for the World".
- `/careers` — **Careers**: Culture, perks, 4-step hiring process, 4 open positions with expandable details and direct mailto apply button.
- `/blog` — **Blog & Resources**: Featured article showcase, category filter chips, search input, and article grid.
- `/blog/[slug]` — **Article Reader**: Clean 720px reader layout, author attribution, and related articles.
- `/contact` — **Contact**: Accessible form with validation, honeypot protection, response-time commitment, and studio info.
- `/_not-found` — Custom branded 404 page.
- `/sitemap.xml` & `/robots.txt` — Automated SEO generation.

---

## 4. Setup & Local Development

### Prerequisites
- Node.js 18+ (tested on Node.js v24.12.0)
- npm 9+

### Installation
```bash
git clone <repo-url> rootline-portfolio
cd rootline-portfolio
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

---

## 5. Environment Variables

Create a `.env.local` file in the root directory (based on `.env.example`):

```bash
# SMTP Configuration for Contact Form (e.g. Gmail App Password, AWS SES, or SendGrid)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=rootlinelab.info@gmail.com
SMTP_PASS=your-16-character-app-password

# Target inbox for contact form submissions (defaults to rootlinelab.info@gmail.com)
CONTACT_EMAIL=rootlinelab.info@gmail.com

# Site URL for metadata and XML sitemap generation
NEXT_PUBLIC_SITE_URL=https://rootlinelab.com
```

*Note: If SMTP variables are not set during local development, form submissions will log cleanly to the server console and return a simulated success response.*

---

## 6. How to Edit Content in `/data`

The entire website is designed so the business owner can edit copy without touching JSX or component code:

| File | Content Controlled |
|---|---|
| `data/site.js` | Company name, email, location, phone, tagline, navigation links, capabilities marquee |
| `data/services.js` | All 11 services, descriptions, feature bullet points, and deliverables |
| `data/solutions.js` | Business problems, technical approaches, services involved, and outcomes |
| `data/products.js` | Platforms, descriptions, feature tags, and technologies grid |
| `data/industries.js` | 10 industry sectors, "how we help" descriptions, and example blueprints |
| `data/caseStudies.js` | Case study titles, challenges, solutions, results, highlights, and tech stacks |
| `data/jobs.js` | Open positions, responsibilities, requirements, perks, and hiring steps |
| `data/posts.js` | Blog articles, categories, reading times, authors, and paragraph content |

---

## 7. Deployment to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. In **Project Settings → Environment Variables**, add:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `CONTACT_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
4. Click **Deploy**. Vercel will automatically build the Next.js App Router application with static prerendering across all 24 pages.
