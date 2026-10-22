# Team Experience Research — "Meet the Team" for Rootline Lab

Research date: 2026-10-23 · Branch: `feature/premium-team-experience`
Method: headless Chromium (Playwright 1.64) at 1440×900 and 390×844 (mobile UA + touch), plus `reducedMotion: 'reduce'` emulation runs. For each page I measured: first-load frame (600 ms) and settled frame, stepped scrolling with screenshots, hover with computed-style diffs at +120 ms and +1.3 s, computed `transition` / `animation` values, `position: sticky`, `clip-path`, `will-change`, globals (GSAP, ScrollTrigger, Lenis, THREE, etc.), loaded scripts, response sizes by MIME type, `prefers-reduced-motion` media rules in same-origin stylesheets, and image formats and sizes. Screenshots are kept in the session scratchpad only, not in this repo, because the third-party pages are copyrighted.

**Evidence labels used below**

| Label | Meaning |
|---|---|
| **[M]** | Measured in a real browser session (computed styles, DOM, network) |
| **[S]** | Read from public source code (for example a GitHub repo), not from the running page |
| **[G]** | Inferred from an Awwwards gallery page or its preview video, so not verified on the live site |
| **[I]** | My interpretation or inference from measured data |

Caveats: Byte totals come from the `content-length` header. Compressed or chunked responses report 0, so JS and CSS totals are undercounted, while video and image totals are reliable. Headless Chromium renders WebGL in software, so WebGL-heavy pages (Lusion, Locomotive, basement) ran much slower than on real hardware. Their frame rate is not representative.

---

## 0. Rootline live site baseline

URLs: `https://root-line-lab.vercel.app/` and `/about`, both HTTP 200.

**Stack [M]:** Next.js (Turbopack chunks), no GSAP, Lenis or three.js, 0 canvases and 0 videos. One font family: Inter 400/500/600/700, a single 48 KB woff2. Images go through `next/image` as WebP, and only the two logos are images. Native `scroll-behavior: smooth` on `<html>` switches to `auto` under reduced motion. There is one global `prefers-reduced-motion: reduce` rule: under emulation, every transition collapses to `1e-05s` and the count of transformed elements drops from 17 to 0. That is a solid kill switch that already exists.

**Visual language [M]:**
- Palette as briefed. The hero is a vertical gradient `#146375 → #125360 → #0E3D47`. Section backgrounds alternate paper `#FBFAF2` / mist `#EEF3EE` / ink `#0E3D47`. Lime `#D4EA50` is reserved for kickers, initials and CTAs. Body text colour is teal `rgb(20,99,117)`.
- The floating pill navbar (rounded and translucent over the hero, solid teal once scrolled) has numbered nav items such as "07 About". That numbering idea can carry over to member indices.
- Kickers are a mono uppercase `tracking-widest` pill ("STUDIO PHILOSOPHY", "LEADERSHIP & CRAFT").
- Cards use `rounded-3xl` (24 px), a 1 px `#146375/15` border, very soft shadows and a mist fill.

**Typography scale [M]** (Inter, bold 700, negative tracking ≈ −0.025 to −0.03 em):

| Element | 1440 px | 390 px |
|---|---|---|
| Home H1 | 96 / 100.8 px, ls −2.4 px | 36 / 37.8 px |
| About H1 | 72 / 77.76 px, ls −1.8 px | 36 / 38.9 px |
| Section H2 (SectionHeading) | 60 / 64.8 px, ls −1.8 px | 30 / 32.4 px |
| Story H2 | 36 / 40 px | 30 / 36 px |
| H3 / card titles | 30 / 36 px, ls −0.75 px | 24 / 32 px |
| Body | 16 px | 16 px |

**Section rhythm [M]** (`/about`): hero padding is 176 top / 112 bottom at desktop and 144 / 80 at mobile. Content sections use 176 px top and bottom at desktop (`py-44`) and 96 px at mobile. The CTA band uses 128 px, and the footer starts at 80 px. The page is 7,258 px tall at 1440 and 8,349 px at 390, with no horizontal overflow at either width. Section order is: Hero → Story → Mission/Vision → Values (2×2) → Principles → **Engineering Leads (4 initial-avatar cards)** → Dhaka band (ink) → CTA → Footer.

**Current team section [M]:** 4 cards in a `lg:grid-cols-4` grid (1 column at 390). Each card has an 80 px circular gradient avatar with lime mono initials (TK / RS / MN / AI), a role in teal bold and a focus area in mono green. There are no names and no photos. The source comment says "No fake bios as required", and this research respects that constraint.

**Motion [M + source]:**
- Tailwind default transitions: 150 / 200 / 300 ms with `cubic-bezier(0.4, 0, 0.2, 1)`.
- `RevealOnScroll` (framer-motion `whileInView`, `once: true`, `amount: 0.15`) uses opacity 0→1, y 32→0, 0.7 s, `APPLE_EASE = [0.22, 1, 0.36, 1]`, with 0.08–0.1 s index-based delays. It respects `useReducedMotion`.
- The home H1 uses `text-focus-in` for 1 s with `cubic-bezier(0.55, 0.085, 0.68, 0.53)`. That curve is an ease-in (slow start, fast finish), which is unusual for an entrance; every reference below uses ease-out curves for entrances.
- The marquee is 35 s linear and infinite.

**Implementation gotcha found in the repo:** `components/ui/Section.js` adds `overflow-hidden` to every `<section>`. `overflow: hidden` makes the section a scroll container, so **any `position: sticky` child will stick to the section instead of the viewport, which means it will not stick at all.** If the team page uses a sticky portrait or sticky header, give that section `overflow-clip` (which clips without creating a scroll container) or drop the overflow class there.

---

## 1. Reference index

| # | Reference | Intended thing | Load status |
|---|---|---|---|
| 1 | awwwards.com/inspiration/meet-the-team-elef → elef.studio | "Meet the Team", by Digidop | Gallery: 200. Live site: 200, **but the team section no longer exists**, and the nav link `/talents` returns **404** |
| 2 | awwwards.com/inspiration/team-members-wa-studio → wa-studio.co/about | Team hover post-its | Gallery: 200. Live: `/about` **404**, and the **domain now hosts a Korean casino spam site**, so do not link to it |
| 3 | awwwards.com/inspiration/team-interactive-scrolling-story-bright-biotech → brightbiotech.co.uk | Team scrolling story, by Lyon & Lyon | Gallery: 200. Live `/careers/`: 200. The team lives at `/our-mission/` (200); `/mission-team/` returns 404 |
| 4 | basement.studio/people | People page | 200, fully measured |
| 5 | locomotive.ca/en/agency | Agency page with team list | 200, fully measured (Awwwards also lists `/en/team`) |
| 6 | lusion.co (team on /about) | 3D studio, team on About | 200. The team section was **reached only through the DOM**: virtual scroll plus software WebGL kept it off-screen in headless runs |
| 7 | awwwards.com/inspiration/meet-the-team-made-in-evolve-1 → madeinevolve.com/pages/about | Sticky team | Gallery: 200. Live: redirects to `/about`, 200, fully measured |
| 8 | awwwards.com/inspiration/about-and-team-page → wantedfornothing.com | About and team page, 2023 | Gallery: 200. Live: **403 Forbidden** to both Playwright and WebFetch, so it blocks automation. Gallery video only |
| 9 | thoughtbot.com/team (found) | Engineering consultancy team grid | 200, fully measured |
| 10 | Awwwards "Our People — ODA Architecture" → oda.us.com/our-people/ (found) | Team hover storytelling | 200, fully measured. Note: `oda-architecture.com/people` is a 404 on a different domain |
| 11 | metalab.com/about (found) | "A global team" section | 200, fully measured |
| 12 | area17.com/about (found) | Culture and leadership | Redirects to `/culture`, 200, measured |
| 13 | Codrops "Grid Item Hover Effect" (found) — tympanus.net/Development/GridItemHoverEffect/ and github.com/codrops/GridItemHoverEffect | Grid hover technique | Demo: 200, measured. The article page was intermittently behind a **Cloudflare bot challenge** (WebFetch 403), so values were also read from the MIT repo [S] |

Also checked and dropped: `evilmartians.com/martians` and `/team` both redirect to the homepage, so there is no team page. `pentagram.com/about/partners` returns 404. `pentagram.com/about`, `fantasy.co/about`, `ustwo.com/about-us` and `instrument.com/about` have no team grid.

---

## 2. Reference notes

### 2.1 ELEF — elef.studio (Digidop, Paris)
- **Status:** the live homepage loads (200), but **no team section exists anymore**. The only matches for "team" are "Talents" nav links, and `/talents` returns 404 [M]. Team observations below come from the Awwwards video (May 2025) **[G]**.
- **Visual [G]:** one studio group photo of four standing people on a seamless grey backdrop, with "Meet / *the team*" in a sans plus italic-serif pairing. The photo sits inside a frame that insets as you scroll, revealing a blue gradient border.
- **Interaction [G]:** a small white **hotspot dot sits on each person**. Hovering a person shows a white tag card with "NAME / *Role* →" pinned next to the dot. One photo carries the whole team.
- **Motion stack, live site [M]:** Webflow with GSAP 3.15.0, ScrollTrigger, SplitText, Lenis 1.1.18 (unpkg) and Swiper 11. The dominant transition is `transform 0.3s ease` (73 elements). Five `levitate` animations run 10 s `ease-in-out` infinite. Scroll parallax is driven by inline `transform: translate(0, −436px)` values on hero rocks.
- **Performance / accessibility [M]:** 11 MB of MP4 and 4.2 MB of GIF on the homepage. **0 `prefers-reduced-motion` rules.** Under reduce emulation the `levitate` loops still run and Lenis stays active.
- **Learn:** a single real group photo with focusable hotspots is a warm, low-cost way to show a small team, which fits a 4-person studio.
- **Avoid:** hover-only labels, which do not work on touch; un-gated infinite ambient motion; a broken team URL left in the nav.

### 2.2 WA Studio — wa-studio.co
- **Status:** `/about` returns 404, and **the domain now serves a casino spam site** [M]. Nothing live was observed and it must not be linked. Everything below is **[G]** (Awwwards video, Sept 2024).
- **Visual [G]:** a 5-column grid of **full-body cutout photos** of each person standing on light grey, all the same scale, so it reads like a cast line-up.
- **Interaction [G]:** hovering a person makes a **handwritten post-it note** appear in their hands (orange, teal or yellow) with a personal line. It is a playful "image making" trick, built from a second photo or overlay per person.
- **Learn:** a uniform photographic system makes even a large team feel designed, and a personal note on hover adds humanity.
- **Avoid:** it needs a professional shoot with matching poses per person, the note is hover-only, and a lapsed domain shows that portfolio sites rot.

### 2.3 Bright Biotech — brightbiotech.co.uk/our-mission/ (Lyon & Lyon)
- **Status:** 200, measured at 1440 [M]. The team is one "step" of a full-screen story.
- **Visual [M]:** deep green `#00473E`-ish panels with lime `#C0FF6B` accents, which is **remarkably close to Rootline's palette**. Team cards alternate lime and pink backgrounds behind cut-out portraits, with a round LinkedIn badge, large names and a superscript "PhD". A mascot card ("YOO") appears in the line-up, and a separate "Board members" text list sits below.
- **Interaction [M]:** the page is **scroll-hijacked**. `<html>` carries `lenis lenis-stopped`, `scrollY` stays at 207 and the document is only 1,107 px tall, while wheel input advances discrete steps. One 120 px wheel tick with a 2.6 s wait moved one step, and the team appeared at step 6. Fast wheeling (8 ticks per step) **skipped the team entirely** and landed on the footer. The team itself is a Splide carousel with ← → arrows.
- **Motion [M]:** steps slide `translateY(-100% / 0% / 100%)` with `transform 1.5s cubic-bezier(0.4, 0.5, 0, 1)`. There is a `bottom 1s` stepper, `opacity 1s ease`, a `rotate 12s linear infinite` badge and anime.js 3.2.2 from cdnjs.
- **Performance / accessibility [M]:** `mission.mp4` was range-requested repeatedly, about **51 MB in one session**. Portraits are 700×700 PNG with **`alt=""`** on every person. **0 reduced-motion rules.** The left dot pager visibly **overlaps the "Board members" text** at 1440.
- **Learn:** palette affinity (green plus lime works for a team page), and a carousel card with a credential superscript.
- **Avoid:** step-based scroll hijacking, video as a scroll scrubber, empty alt text on people, and UI overlapping content.

### 2.4 basement.studio/people
- **Status:** 200 at 1440, 390 and under reduced motion [M].
- **Visual [M]:** black background, Geist 600 type, an H1 "People" at 98/88 px with −3.92 px tracking (about −0.04 em, very tight). "The Crew" sets an H2 at 76 px against a huge count ("**38**") on the same baseline. Black-and-white studio portraits sit in a 6-column grid with 1 px borders and a diagonal-hatch texture. A **left-hand index table** (A–Z, grouped Management / Design / Development…) lists name, role and social links.
- **Interaction [M]:** hovering an index row raises its text from `rgba(230,230,230,0.5)` to full `rgb(230,230,230)` and fades in a diagonal-lines overlay (opacity 0→1). The **matching portrait in the grid gets the same hatch highlight**, so list and grid are linked. At +120 ms nothing had changed yet; by +1.3 s the change was complete, so it is JS-driven state followed by a CSS `opacity 0.2s cubic-bezier(0.4,0,0.2,1)`. The values section uses `lg:sticky` stacked cards ("Push Together as a Team", "Improve by 1% Every Day") that overlap as you scroll. A persistent "HUMAN / MACHINE" toggle pill stays on screen.
- **Motion [M]:** 153 elements use `opacity 0.2s cubic-bezier(0.4,0,0.2,1)` and 105 use `0.06s linear`. Keyframes include `machine-reveal` and `machine-flicker`.
- **Images [M]:** `next/image` delivers AVIF (645 KB) and WebP. Crew portraits are 308×348 shown at 149×171 (about 2×, correct). Large culture photos are 1674×1620 shown at 461 px. Crew portraits have `alt` set to the person's name, but culture photos have `alt=""`.
- **Performance [M]:** the People page **still loads three.js r180 plus GLB models (office, cars, godrays…) and 11.3 MB of KTX2 lightmaps, plus 265 KB of WASM**. That is the site-wide 3D scene, and it stays the same under reduced-motion emulation (2 canvases).
- **Mobile 390 [M]:** the index table disappears and portraits regroup by department in a 4-column grid with headers. Values become a normal stack.
- **Learn:** **list ↔ portrait linking**, a confident headcount number, department grouping, social links per person, and a clean mobile regroup.
- **Avoid:** shipping a 3D scene's assets to a people page, and decorative culture photos with empty alt.

### 2.5 Locomotive — locomotive.ca/en/agency
- **Status:** 200 at 1440, 390 and under reduced motion [M]. The first `innerText` read was **scrambled glyphs** ("mel&ahO oxeQBQNJqq…"), a text-scramble intro written into the DOM [M].
- **Visual [M]:** a red full-bleed section with black HelveticaNowDisplay 400 at 26 px (body 15 px). It is a pure **typographic ledger**: department head rows ("01 · Design · 9 people", "02 · Development · 10 people", "03 · Operations · 8 people"), then rows of **Name | Role | Year joined** on a 12-column grid (cols 1–6, 7–11, 12).
- **Interaction [M]:** each row is covered by a full-size `<button>` (absolute, `font-size: 0`). Hover sets `border-bottom-color: currentcolor` **instantly, with no transition**, and swaps the year for "(+)". A fixed `.c-team-list_canvas` (50 % width, `pointer-events: none`, z-index 800) renders the **hovered person as a volumetric 3D capture walking**, a three.js r165 scene. Clicking opens a full-screen modal: big serif name, department glyph, "Last projects / Role / Since", and a quick-nav of all 27 people grouped by department.
- **Motion [M]:** Lenis is active (`html.lenis`). Transitions are 0.2–0.3 s `cubic-bezier(0.215, 0.61, 0.355, 1)` (easeOutCubic), plus `opacity 0.15s cubic-bezier(0.23,1,0.32,1)`. There is a JPEG image sequence (`/sequences/model/0000.jpg…`) for a hero model.
- **Performance [M]:** about **21 MB of `application/octet-stream`** (volumetric data) arrived during the hover and modal session, plus 7.2 MB of JPEG.
- **Accessibility [M]:** the good part is **5 reduced-motion media rules**, including `(prefers-reduced-motion: no-preference)` gating, and focus moves to "Close" when the modal opens. The bad parts: the modal has **no `role="dialog"` or `aria-modal`**, **Escape did not close it** (visibility stayed `visible`), and all 27 row buttons share the identical label **"Read more"**.
- **Mobile 390 [M]:** two columns (name left, role right-aligned), the year column is hidden, and there is no hover canvas. Still perfectly readable.
- **Learn:** the **ledger format** (Name / Role / Since) reads as serious and engineering-like, department counters work well, and a profile modal with "Last projects" is the right metadata.
- **Avoid:** volumetric WebGL people, scrambled DOM text, generic button labels, and a modal without dialog semantics or Escape.

### 2.6 Lusion — lusion.co/about
- **Status:** 200 [M]. A **virtual-scroll** site: `body { overflow: hidden }`, `window.scrollY` is 0 at every step, and content moves through inline `translate3d(0, −6276px, 0)`. Forty 400 px wheel steps never reached the team section in headless mode; the hero camera-spline scene consumed them. **The team UI was therefore read from the DOM and network only, not seen on screen.**
- **Team mechanism [M from DOM/network]:** one person at a time, with counter text "[[ 001 ]]", name "Edan Kwan", job "Cofounder & Creative Director", and a mobile hint "Swipe to change". Each person loads a **3D face model** (`/assets/team/team.json`, `edan.buf`) rendered into the single fixed full-screen canvas (three.js r158, Astro). The UI includes a custom face cursor, compass ticks and a progress indicator.
- **Motion [M]:** the dominant transition is `transform 0.4s cubic-bezier(0.4, 0, 0.1, 1)` (69 elements), plus `cubic-bezier(0.35, 0, 0, 1)` at 0.4–0.6 s and one `cubic-bezier(0.16, 1, 0.3, 1)`. 94 elements carry `will-change`. A 1.3 MB `audio/ogg` file loads.
- **Accessibility [M]:** **0 reduced-motion rules**, and reduce emulation changes nothing.
- **Learn:** the bracketed index counter "[[ 001 ]]" pairs nicely with Rootline's mono kickers and numbered nav, and the "one person, big" spotlight format suits a team of four.
- **Avoid:** WebGL faces, virtual scroll that breaks native scrolling, find-in-page and assistive tech, and audio.

### 2.7 Made in Evolve — madeinevolve.com/about
- **Status:** 200 at 1440, 390 and under reduced motion [M]. Built on Next.js with Webflow-export classes (`w-dyn-item`) plus Lenis.
- **Visual [M]:** a dark `#111` page with a faint vertical grid. The team section uses a **3-column layout**: a sticky candid portrait on the left (not a headshot, for example a person walking through a hall), a long list of 29 names in the middle (neue-haas-grotesk 28/25.2 px, role at 11.9 px), and intro copy plus "JOIN THE TEAM" on the right.
- **Interaction [M]:** `.wg__left` is `position: sticky; top: 72px`. Scrolling alone did **not** change the portrait. **Hovering a name swapped the portrait**, and at +150 ms the new image already had inline `opacity: 1; visibility: inherit` (a GSAP autoAlpha signature), so it is effectively a hard cut. Non-active names sit at opacity 0.5.
- **Motion [M]:** `padding 0.65s cubic-bezier(0.19, 1, 0.22, 1)` (easeOutExpo), `transform 0.45s cubic-bezier(0.65, 0, 0, 1)` and `height 0.7s cubic-bezier(0.19,1,0.22,1)`. **151 elements with `will-change`**, which is excessive.
- **Performance / accessibility [M]:** 16.9 MB WebP and 1.5 MB AVIF on one About page. **0 reduced-motion rules**, and Lenis stays on under reduce.
- **Mobile 390 [M]:** the sticky portrait is gone and **only names remain**, so the people lose their faces on phones.
- **Learn:** sticky portrait plus scrolling name list is a strong editorial pattern, and candid photography feels more human than headshots.
- **Avoid:** a hover-only swap with no touch or focus equivalent, losing photos on mobile, and blanket `will-change`.

### 2.8 Wanted for Nothing — wantedfornothing.com
- **Status:** **403 Forbidden** to Playwright and WebFetch (nginx), so the site blocks automation. Everything here is **[G]** (Awwwards video, 2023).
- **Visual [G]:** a black page with a huge grey grotesk ("VIBES", "WORK WITH US?"), a candid group dinner photo, then a staggered masonry of candid portraits. Names are uppercase with **emoji next to them** ("DINA 🌺", "ANNA 🌸"), and a grey bio card ("ANDREW · TECH LEAD · …brews a batch at home") includes a LinkedIn icon. A small red dot cursor follows the pointer.
- **Learn:** short bios with one personal fact make people memorable.
- **Avoid:** an all-caps bio paragraph (hard to read), and blocking legitimate crawlers.

### 2.9 thoughtbot — thoughtbot.com/team (closest peer: an engineering consultancy)
- **Status:** 200 at 1440 and 390 [M].
- **Visual [M]:** a dark warm background, H1 "The humans of thoughtbot" (Cosmica 700, 49.5 px), and 53 people in a 4-column grid. Each portrait sits in a **brand-colour frame (purple / red / green / blue) cut by one of 5 SVG clip-path masks**, giant rounded "notch" shapes assigned with `.person:nth-child(5n+k) .person-photo-frame { clip-path: url(#person-photo-mask-k) }`. Each card shows the name, role (dimmed, heading weight) and a GitHub link where available.
- **Interaction / motion [M]:** **none on the team grid.** Hover diffs were empty; only links transition (`color, text-decoration 0.15s ease-in-out`). The hero's looping people animation (`loop-person-1/2` keyframes, opacity and 2 px translateY) is wrapped in `@media screen and (prefers-reduced-motion: no-preference)` [M].
- **Accessibility [M]:** **13 reduced-motion media rules**, plus a skip link and descriptive alt text such as "A silhouetted headshot of Aji Slater against …". No smooth-scroll library.
- **Performance [M]:** 53 PNG portraits at 320×320 shown at 315 px (under-resolved on 2× screens), 5.1 MB of PNG. It would be lighter and sharper as AVIF/WebP at 640 px.
- **Mobile 390 [M]:** a single column 26,630 px tall. That is very long and needs filtering or grouping at this headcount.
- **Learn:** **brand identity carried by colour frames and shape masks costs zero JS**, and calm, legible, fast is what credibility looks like for engineers. Linking GitHub is a strong signal for a technical team.
- **Avoid:** an un-grouped single column at scale, and PNG portraits.

### 2.10 ODA Architecture — oda.us.com/our-people/
- **Status:** 200 at 1440 [M]. WordPress, Elementor and Swiper.
- **Visual [M]:** **cut-out portraits whose heads break out of the top of a coloured square** (green / blue / yellow), names in navy bold Montserrat with a suffix ("Stephen Overcash, RA"), and a spaced-caps role ("FOUNDING PARTNER"). Light background with a mint band.
- **Interaction [M]:** hover fades in a `.back` layer behind the person, an **illustrated pattern of their personal interests** (books, glasses…). It runs `opacity 0 → 1` with `transition 0.5s ease` (measured 0.295 at +120 ms, consistent with `ease`), and the title colour switches instantly from `#5E5E62` to `#121111`. There is also a culture carousel (Swiper, `translate3d(−3275px)` after scroll).
- **Accessibility [M]:** 5 reduced-motion rules. The group photo alt text is "Image of fun group picture". PNG assets total 8.1 MB.
- **Learn:** **"personal artifacts" behind the portrait** tell a story without words or video. Credentials as name suffixes fit an engineering team, for example "AWS SA-Pro".
- **Avoid:** hover-only storytelling, and heavy PNGs.

### 2.11 Metalab — metalab.com/about
- **Status:** 200 at 1440 and under reduced motion [M]. Next.js, Lenis and Lottie.
- **Visual [M]:** black background, PP Eiko serif display plus Basis Grotesque. "A global team" is followed by a **list of cities with large photos scrolling past**, then a **stats ledger**: "Countries represented 17 / Global employees 160 / Time zones 14", followed by "40% / 80% / 28% / 17% / 45%" diversity stats with thin column rules. A draggable grid of employee quote cards ("Eight years later, and I'm still…", with name, role and pronouns) has a "Drag" cursor badge.
- **Motion [M]:** image containers start with `clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%)` (collapsed to the bottom edge) and wipe up to full, a **clip-path reveal**. Transitions are 0.2–0.4 s `ease`. A GSAP-style inline transform drives the cities parallax (`translate(0, 900px)`).
- **Performance [M]:** 20 MB MP4 and 10 MB WebP on the About page. 5 reduced-motion rules, but Lenis stays on under reduce.
- **Learn:** **team-as-data** (counts, time zones) suits an engineering studio, quotes in the team's own words build trust, and a clip-path wipe is a cheap, elegant image entrance.
- **Avoid:** video weight, and drag-only interaction without buttons.

### 2.12 AREA 17 — area17.com/about → /culture
- **Status:** 200 at 1440 [M]. `/about` redirects to `/culture`, with swup page transitions.
- **Visual [M]:** a white page in SuisseIntl 500 with values as large statements ("Principles over pixels", "Enhance life—don't distract from it"), coloured value tags (Impact, Soul…), a typographic list of "Belonging" topics, and a **"Leadership"** portrait row at the end. A sticky in-page header uses `sticky top-0` with a `data-[locked]` attribute.
- **Motion [M]:** `opacity 1s cubic-bezier(0.33, 1, 0.68, 1)` (easeOutCubic) on 64 images (lazy fade-in), plus `opacity, transform 0.5s cubic-bezier(0.4,0,0.2,1)`.
- **Performance [M]:** 12 short MP4 loops, 20.6 MB. 1 reduced-motion rule.
- **Learn:** for a serious studio, values-first copy with leadership as the closing proof is the right order, and a 1 s easeOutCubic image fade is calm.
- **Avoid:** autoplay-video weight.

### 2.13 Codrops — Grid Item Hover Effect (demo + MIT repo)
- **Status:** demo 200 [M]; values cross-checked in the repo source [S]. GSAP 3.12.2 plus Splitting.js.
- **Measured [M]:** on hover, the image scales **1 → 0.85** while `filter` goes to **`saturate(2) brightness(0.7)`**. At +120 ms the scale was 0.876, about 83 % of the way, which is consistent with an expo-out curve. Four corner boxes with chamfered `clip-path: polygon(…20px…)` slide in from ±24 px to 0 while fading from opacity 0.83 to 1.
- **Source [S]:** enter runs `duration: 0.5, ease: 'expo'` and leave runs `duration: 0.8, ease: 'expo'`, so **exit is slower than enter**. Text characters stagger at 0.1 s. Variant 2 is **direction-aware**: it computes the entry edge from the last mouse position and moves from that side with `0.7s expo`, `grayscale(40%) → 0%`.
- **Accessibility [M]:** 0 reduced-motion rules. It is a demo, so that is expected.
- **Learn:** precise micro-timing. Hover entry around 0.5 s on expo-out with a slightly longer exit feels expensive. A small scale-down "press" plus a filter shift is enough.
- **Avoid:** character-scramble text on names (it hurts readability), and saturate(200 %) on real skin tones.

---

## 3. Cross-reference timing and easing table (measured unless marked)

| Site | Typical UI transition | Hover entrance | Big moves |
|---|---|---|---|
| Rootline (now) | 150–300 ms `cubic-bezier(0.4,0,0.2,1)` | colour only | Reveal 0.7 s `[0.22,1,0.36,1]` y 32 |
| basement | 200 ms `cubic-bezier(0.4,0,0.2,1)` | text alpha 0.5→1 plus hatch overlay | sticky stacked cards |
| Locomotive | 200–300 ms `cubic-bezier(0.215,0.61,0.355,1)` | border instant, "(+)" swap | Lenis, WebGL |
| Lusion | 400 ms `cubic-bezier(0.4,0,0.1,1)` | — | virtual scroll, WebGL |
| Evolve | 450–700 ms `cubic-bezier(0.19,1,0.22,1)` / `(0.65,0,0,1)` | portrait swap within 150 ms | sticky portrait |
| Bright | 1.5 s `cubic-bezier(0.4,0.5,0,1)` | — | full-screen steps |
| ODA | 500 ms `ease` | back layer opacity 0→1 | — |
| AREA 17 | 500 ms `cubic-bezier(0.4,0,0.2,1)`; 1 s `cubic-bezier(0.33,1,0.68,1)` for image fade | — | swup page transitions |
| Metalab | 200–400 ms `ease` | — | clip-path wipe reveal |
| Codrops | — | 0.5 s expo in / 0.8 s expo out [S] | — |
| thoughtbot | 150 ms `ease-in-out` (links only) | none | none |

**Pattern [I]:** colour and opacity feedback lands at 150–250 ms. Image and transform entrances land at 450–700 ms on a strong ease-out (expo, quint or cubic-out). Exits are equal to or slower than entrances. Rootline's existing `[0.22, 1, 0.36, 1]` (an easeOutQuint-like curve) sits squarely in this band, so **keep it as the single motion signature** rather than introducing new curves.

---

## 4. Comparative recommendation for Rootline's team page

**Context:** a serious engineering studio, currently 4 leads, no real names or photos yet (initials placeholders, and "no fake bios" is a stated requirement). The stack is Next.js 16, framer-motion 14 and Tailwind 4, with no WebGL and no smooth-scroll library. Native scroll and the global reduced-motion kill switch are assets to keep.

### 4.1 Techniques that fit (ranked by value / cost)

1. **Engineering ledger index (from Locomotive and basement).** Rows of `Index · Name · Role · Focus · Since`, with mono `01–04` indices that echo the "07 About" nav numbering and Lusion's "[[ 001 ]]" counter. Each row is a real `<button>` or `<a>` with a **unique accessible name** ("Open profile: Lead Architect"). Hover and focus get the same treatment: text alpha 0.6→1 and a 1 px teal underline, over **200 ms** with `[0.22,1,0.36,1]`. It works without photos.
2. **Linked preview pane (from basement and Evolve).** A `sticky` panel (top ≈ 96 px, clearing the floating navbar) shows the active member's portrait or monogram tile. Hovering, focusing or tapping a row updates it with a **crossfade of about 250 ms** using framer-motion `AnimatePresence mode="popLayout"` plus opacity, or a `clip-path: inset(0 0 100% 0) → inset(0)` wipe over **500 ms**. **Requires `overflow-clip` instead of `overflow-hidden` on that `Section`** (see §0). On mobile (<1024 px), drop the pane and put the portrait inline in each row, and never hide it the way Evolve does.
3. **Brand-framed portraits with shape masks (from thoughtbot and ODA).** Rotate Rootline colours per member (teal, canopy, leaf, lime-on-ink) with 2–4 CSS `clip-path` or `border-radius` "root-notch" shapes chosen with `nth-child`. Zero JS, and it reads as identity, not decoration. A head breaking the frame top, as at ODA, is an optional upgrade once real cut-out photos exist.
4. **Department grouping with counters (from Locomotive and basement).** For example "Engineering · 02", "Design · 01", "Quality · 01", or one confident total ("04 leads") set big next to the H2 the way basement sets "38". Honest numbers only.
5. **Team-as-data strip (from Metalab).** 3–4 mono stats with thin rules: time zone (GMT+6, Dhaka), combined years of experience, stacks owned, client regions. These must be **real** numbers, or the strip is cut.
6. **Profile drawer or dialog with structured metadata (from Locomotive, done accessibly).** "Role / Focus / Since / Recent projects / GitHub". Use native `<dialog>` with `showModal()`, or `role="dialog" aria-modal="true"`, with Escape to close, a focus trap, focus returned to the triggering row, and `aria-labelledby` pointing at the name. Enter with opacity plus y 24 px at 400 ms and exit at 300 ms. Give it a deep link (`/about/team/[slug]` or `?member=`) so it is shareable and SEO-friendly.
7. **Image entrance by clip-path wipe (from Metalab), scroll-revealed once.** `inset(100% 0 0 0) → inset(0)` over **600–700 ms** with `[0.22,1,0.36,1]`, staggered 80 ms. This replaces the generic fade-up for portraits only, which gives the section its own signature without adding weight. It must be skipped under `useReducedMotion`.
8. **Personal artifact on hover and focus (from ODA, WA Studio and Wanted for Nothing), text-first.** A small mono "currently: …" or "tool of choice: …" line revealed at **200 ms**. It must also show on focus and be visible on touch, either always on mobile or behind a tap. It humanises the page without needing a photo shoot, and should only appear once each person provides the content.
9. **Group-photo hotspots (from ELEF), only if a real studio photo exists.** One photo with absolutely positioned `<button>` hotspots and name tags, backed by a plain list for mobile and screen readers. It is warm and cheap to host.
10. **Image hygiene (from basement, done better than thoughtbot or Bright).** `next/image` with AVIF/WebP, portraits at about 2× display size (≈640 px), `sizes` set, lazy below the fold, and **descriptive alt text** (thoughtbot style). Before configuring `formats`, check the Next 16 image docs in `node_modules/next/dist/docs/` as AGENTS.md requires.

### 4.2 Flashy but wrong for Rootline (with evidence)

- **WebGL people and 3D scenes.** Locomotive's volumetric captures pulled about 21 MB on hover. Lusion loads a `.buf` 3D face per person. basement ships 11.3 MB of KTX2 plus GLB models to its People page. None of them changes behaviour under reduced motion. That weight contradicts Rootline's own "sub-second loads, 90+ Lighthouse" promise on the About page. **Not justified.**
- **Scroll hijacking and virtual scroll.** At Bright, a fast wheel skipped the whole team, the page is 1,107 px tall with Lenis stopped, and about 51 MB of video was range-requested. At Lusion, `scrollY` is always 0 and the team section could not be reached by scrolling. Both break find-in-page, anchor links and assistive tech.
- **Smooth-scroll libraries that ignore reduced motion.** Locomotive, Metalab, Evolve and ELEF all kept Lenis active under reduce emulation. Rootline's native `scroll-behavior` already flips to `auto` correctly, so keep it native.
- **Hover-only information.** Evolve's portraits exist only on hover and vanish at 390. ELEF and WA Studio labels are hover-only. Locomotive hides the year column and canvas on mobile. Every reveal needs a focus and touch equivalent.
- **Scrambled or split text in the DOM.** Locomotive's first `innerText` read was glyph noise, and Codrops scrambles name characters. Names are content: never animate them per character.
- **Un-gated ambient loops.** ELEF's `levitate` loops (10 s, infinite) and Bright's rotating badge (12 s) keep running under reduce. Rootline's global rule already covers CSS loops; make sure any JS loop also checks `useReducedMotion`.
- **Generic controls and weak semantics.** Locomotive has 27 identical "Read more" buttons and a modal with no dialog role and no Escape. Bright and basement leave `alt=""` on people photos.
- **`will-change` everywhere.** Evolve sets it on 151 elements and Lusion on 94. Apply it only during an active animation, or leave it to framer-motion.
- **Faking it.** Mascots (Bright's "YOO"), stock portraits or invented bios would undercut the "Honest Advisory" value. Until real people and photos exist, ship the ledger with role and focus plus monogram tiles; it is honest and still premium.

### 4.3 Suggested motion budget (summary)

| Interaction | Duration | Ease | Reduced motion |
|---|---|---|---|
| Row hover / focus (colour, underline, alpha) | 200 ms | `[0.22,1,0.36,1]` | instant (global rule) |
| Preview portrait swap | 250 ms crossfade, or 500 ms clip wipe | same | instant swap, no wipe |
| Portrait scroll entrance (once) | 600–700 ms, 80 ms stagger | same | none, shown immediately |
| Profile dialog in / out | 400 ms / 300 ms, y 24 px | same | opacity only, ≤ 150 ms |
| Section reveal (existing) | 0.7 s, y 32 | same | already handled |

No new libraries are needed: framer-motion (`whileInView`, `AnimatePresence`, `useReducedMotion`, all of which the repo already uses or which ship with framer-motion) plus CSS `position: sticky`, `clip-path` and Tailwind transitions cover everything above. Check any framer-motion 14 API detail beyond what the repo already uses against the installed package before relying on it.
