# Team Experience — Repository Audit & Integration Plan

_Branch: `feature/premium-team-experience` · Audited 2026-10-23 · Every source file was read; lint, build and a Playwright sweep were run._

## 1. Architecture

| Area | What exists |
|---|---|
| Framework | Next.js **16.4.2** App Router, Turbopack, `cacheComponents: true`, `partialPrefetching: true` (`next.config.mjs`) |
| Language | Plain JavaScript (no TypeScript). Path alias `@/*` → repo root (`jsconfig.json`) |
| React | 19.3.1 |
| Styling | Tailwind CSS v4 via `@import "tailwindcss"` + `@theme` tokens in `app/globals.css`. `tailwind.config.js` exists but is **not loaded** (v4 ignores it without `@config`). Components mostly use arbitrary hex values (`text-[#146375]`) rather than the theme tokens |
| Motion | `framer-motion` 14.6 (`RevealOnScroll`, `AnimatePresence` drawers, `layoutId` filter pill). Shared easing `APPLE_EASE = [0.22, 1, 0.36, 1]` in `lib/animations.js`. No GSAP/Lenis/three.js |
| Icons | `lucide-react` |
| Fonts | Inter via `next/font/google` (`--font-inter`) |
| Images | `next/image` for the logo + preloader icon only. No photography anywhere in the repo |
| Content | All copy in `data/*.js` (site, services, solutions, products, industries, caseStudies, jobs, posts) |
| Testing | ESLint 10 (`eslint-config-next` core-web-vitals). No unit/e2e tests. `@playwright/test` added as devDependency in this branch |
| SEO | `metadata` exports per server page, `sitemap.js`, `robots.js`, Organization JSON-LD on home |

## 2. Page & navigation structure

- **Navbar** (`components/layout/Navbar.js`): floating pill; desktop (xl) shows a hardcoded `navItems` list of 8 routes (no Careers, no Contact — Contact is a separate pill button). Below xl a hamburger opens `MenuOverlay`, which renders `siteConfig.navLinks` (10 routes, numbered `01`–`10`).
- **Footer** (`components/layout/Footer.js`): link columns from `siteConfig.footerLinks`.
- **About** (`app/about/page.js`): hero → story → mission/vision → values → principles → **"Our Engineering Leads"** (4 `teamPlaceholders` with invented initials TK/RS/MN/AI and roles that do not match the real leadership) → Dhaka band → `CTABand`.

## 3. Visual system (verified in code)

Palette tokens: `#146375` deep teal (primary text + dark hero), `#0E3D47` ink-deep, `#3C8D70` canopy green, `#99CB5B` leaf, `#D4EA50` lime accent, `#F5EFB3` cream, `#FBFAF2` paper, `#EEF3EE` mist, body copy `#0B2A33`. Note: the brief's `#288B83` does not appear anywhere in the repo.

Recurring patterns: dark teal gradient hero (`from-[#146375] via-[#125360] to-[#0E3D47]`, `pt-36 sm:pt-44`), mono uppercase kicker pills, `rounded-3xl` cards with `border-[#146375]/15`, numbered indices (`01`, `02`), `CTABand` closing every page. Heading scale: h1 `text-4xl → md:text-7xl`, bold, `tracking-tight`.

## 4. Reusable pieces for the team page

`Container`, `Section`, `Button`, `CTABand`, `Logo`, `APPLE_EASE`, the hero gradient, `siteConfig` (email/location). `Modal` exists but has no focus trap (Tab escapes to the page — confirmed in Playwright), so the profile view needs its own dialog.

## 5. Limitations & risks found

| # | Finding | Evidence |
|---|---|---|
| 1 | `RevealOnScroll` renders content at `opacity: 0` in server HTML; if JS fails, all of it stays invisible. Reduced motion still starts at opacity 0 | `components/ui/RevealOnScroll.js`; Playwright counted 11–22 still-hidden blocks after scrolling home/services/products |
| 2 | `CTABand` ignores its `title` prop — every custom title passed by pages is never shown | `components/sections/CTABand.js:9,25`; Playwright on `/case-studies` |
| 3 | Home industry chips link to `/industries#<id>` but no element has that id | Playwright: target missing, scrollY 0 |
| 4 | Services sub-nav is `sticky top-16` but the fixed navbar bottom sits at 96px → 32px overlap | Playwright measurement |
| 5 | Client-component pages (`/blog`, `/case-studies`, `/industries`, `/solutions`, `/careers`) cannot export `metadata`; they fall back to the default site title | Playwright titles |
| 6 | Preloader renders a second `<h1>` and appears after hydration (content flashes, then is covered). Its exit animation never runs (`return null` before `AnimatePresence`) | `components/layout/Preloader.js:55` |
| 7 | Contact API interpolates user input unescaped into the HTML email; no length limits (a 500 KB message was accepted) or rate limit | `app/api/contact/route.js:66-76`; Playwright API probe |
| 8 | `Button` drops `onClick` when `href` is set | `components/ui/Button.js:58-63` |
| 9 | Case-study detail shows an internal "Note for Rootline Lab" to the public | `app/case-studies/[slug]/page.js:110` |
| 10 | Footer shows fabricated status text ("All systems operational", "● Live Studio") | `components/layout/Footer.js:195,207` |

Items 1–10 are pre-existing and **out of scope** for this branch unless they block the team page. The team page will not depend on `RevealOnScroll`.

## 6. Integration plan

- **Route:** new dedicated `/team` (server page → exports `metadata` + Person JSON-LD, client islands for interaction).
- **About:** replace the invented `teamPlaceholders` block with a compact, real teaser of the six leaders linking to `/team` (keeps About honest and makes `/team` discoverable).
- **Navigation:** add Team to `siteConfig.navLinks`, the desktop `navItems`, `footerLinks.company`, and `sitemap.js`.
- **Data:** a single `data/team.js` (JSDoc-typed, since the project is JS) holding all six members, with verification flags per link so unverified links are kept in data but never rendered.
- **Motion:** framer-motion (already installed) + CSS. No new animation dependency.
- **Assets:** no team photography exists; the design must look finished without portraits while having a slot that real photos can drop into.
