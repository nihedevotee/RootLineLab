# Team Experience — Creative Direction, Motion System & QA

Route: **`/team`** · Branch: `feature/premium-team-experience` · See also `TEAM_EXPERIENCE_AUDIT.md` and `TEAM_EXPERIENCE_RESEARCH.md`.

## 1. Concepts considered

| | Concept | Verdict |
|---|---|---|
| A | **Cinematic editorial** — huge portrait photography, layered type, art-directed transitions | Depends on professional portraits. None exist, and fake faces are off-limits, so this would ship looking unfinished. Its typography and pacing were kept |
| B | **Interactive studio roster** — exploratory grid, cursor-driven reveals, spatial depth | Fun, but drifts toward a playground; information gets hidden behind hover, and it says nothing specific about Rootline |
| C | **Digital engineering collective** — architectural grid, technical graphics, portraits | Right tone for an engineering studio, but "technical graphics" usually ends up as decoration (icons, fake dashboards) |
| **D** | **Root System — a drawing set** (chosen hybrid of A + C) | The company name *is* the metaphor. The page is set as an engineering drawing set: each leader is a numbered sheet, and the studio is drawn as a living root network. It works without photography, gets better with it, and every graphic element means something |

**Why D wins:** it is the only option that is (1) original to Rootline rather than borrowed from an agency reference, (2) honest about missing assets, since the root signatures are designed objects rather than placeholders, (3) structurally truthful: the network shows tiers (founders high, directors deep), all rooted in one trunk, without inventing reporting lines, and (4) restrained enough for a serious B2B studio.

## 2. Page structure

1. **Sheet 00 hero** (ink): title block with masked three-line headline, a legend of all six people, and the 3D root network. Hover a legend row and its root lights up in the drawing; hover or click a node and the reverse happens.
2. **Founders, Sheets 01–02** (paper): asymmetric 7/5 composition, with Maysha leading and Afnan offset down. Drawing frames with crop marks hold each root signature.
3. **Directors, Sheets 03–06** (ink): a typographic index rather than four cards. Hovering a row dims its siblings, slides the name, turns the arrow, and a trailing drawing-sheet preview follows the cursor.
4. **Profile sheet**: a native `<dialog>` panel that wipes in from the right. It shows sheet number, discipline, name, role, verified links only, a studio-email fallback when a person has no public links, and previous/next between members. It is deep-linkable as `?member=<slug>`, and Back closes it.
5. **Sheet 07 Assembly** (paper): "One root system". An assembly drawing of the trunk with six roots, one per discipline, aligned to a six-column list.
6. **CTA**: the existing `CTABand` with a page-specific title.

About page: the invented `teamPlaceholders` (TK/RS/MN/AI) are replaced by the real six, each linking to their profile.

## 3. Visual system

- Existing palette only, with ink and paper dominant. Lime is used for one accent per view: the headline full stop, the active node, the hover arrow. No glow, gradients, glass, or blobs.
- Inter at display sizes: `-0.05em` tracking and `0.9` leading. Mono (`--font-mono`) is reserved for drawing annotations such as sheet numbers, discipline codes, figure captions, and coordinates.
- Drafting details: 1px hairlines, crop marks that extend on hover, survey ticks on ground lines, column hairlines echoing the 12-column grid, and `Fig. 03 — Root signature` captions.
- **Root signatures** (`components/team/RootMark.js`): a deterministic line drawing per person, generated from their slug in `lib/rootSystem.js`. Every person gets a unique mark, the same on server and client. When `portrait` is set in `data/team.js`, the photo replaces the mark in the same frame.

## 4. Motion system

One motion language, three layers, cheapest first. Tokens live in `lib/motion.js` (JS) and as custom properties at the top of `app/team-experience.css` (CSS).

| Token | Value | Used for |
|---|---|---|
| `EASE.outExpo` / `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | every entrance and hover |
| `EASE.inOutQuart` / `--ease-in-out-quart` | `cubic-bezier(0.76, 0, 0.24, 1)` | profile wipe |
| `DURATION` / `--dur-*` | 0.35s / 0.7s / 1.15s | colour and opacity / movement / display type |
| `FOLLOW` | 0.045 parallax · 0.14 preview | per-frame lerp factors |

1. **CSS (compositor only).** Masked line rise for display type; native scroll-driven reveals (`animation-timeline: view()`), with hairlines drawing via `scaleX` and frames "unearthed" by a shrinking `scaleY` cover. The profile wipe is two opposed `translate3d` transitions. Hover is gated by `@media (any-hover: hover)`, and touch gets `:active` feedback instead. Without scroll-timeline support (Firefox today), final states are shown.
2. **WebGL** (`components/team/RootSystemCanvas.js`, three.js 0.186):
   - **Geometry:** roots at depth 0–2 are tapered tubes built with parallel-transport frames and merged into one indexed mesh. Rootlets at depth 3+ are hairlines. The survey grid and ground line share one more draw call, and the nodes are a `Points` shader. That makes four draw calls in total.
   - **Shading:** the tube shader has soft directional light, a lime rim light, depth fog to ink, growth via per-vertex birth time (the tip radius tapers in), and "signals" travelling outward by arc length (`dist0` from `lib/rootSystem.js`). All output is converted with `colorspace_fragment`, so brand colours are exact.
   - **Motion:** a cinematic dolly-in and turn over 3.4s while the system grows. The camera sits above the soil plane so the grid recedes in perspective.
   - **Performance:**
     - The scene is built in `requestIdleCallback` and shaders compile via `compileAsync`.
     - Resolution steps down when 90-frame averages exceed 22ms, and back up below 12ms, with at most 4 changes.
     - The DPR cap is 2, or 1.5 on lite.
     - The loop pauses off-screen and in hidden tabs. On touch devices it stops rendering once the system is grown and still.
     - Scroll uses cached offsets, so there are no layout reads per frame. Label styles are written only when they change.
   - **Input:**
     - Parallax follows the mouse across the whole hero, anchored to the network's centre on screen.
     - Picking runs only over open canvas area, never over text or the legend, and the canvas clears only hover states it set itself.
     - On touch, a horizontal drag turns the system (`touch-action: pan-y`) and a tap opens a profile.
3. **rAF/JS.** The directors preview plate is lerped, leans with velocity, is clamped to the names column, re-targets on scroll, and stops when idle.

**Capability tiers** (`useRenderTier`): `gl` (fine pointer), `gl-lite` (touch-first), or `svg`. The `svg` tier covers no WebGL, Data Saver or 2G, under 4 GB RAM, or under 4 cores. Reduced motion always gets the static SVG drawing.

**Mobile profile:** a bottom sheet. Drag the grab bar down to dismiss (120px or 0.6px/ms flick), or swipe horizontally to page between members. Close, Escape and the pager are always available. A JS close sequence gives every browser the same exit animation, and the scroll lock is a class toggle on `<html>`.

**Blender** (5.2, Cycles): the same exported geometry was rendered with subsurface roots, a lime rim light and DOF, then composited with the live page typography into `app/team/opengraph-image.jpg` (1200×630, 84 KB).

## 5. QA results (measured)

Production build (`next start`), Playwright 1.64 / Chromium. GPU numbers come from the real AMD Radeon (D3D11); the phone profile is emulated touch, 390×844 @3x, with a 4× CPU throttle.

| Check | Result |
|---|---|
| `npm run lint` (ESLint 10 + React Compiler rules) / `npm run build` | Pass / Pass (`/team` and `/team/opengraph-image.jpg` static) |
| 1920 / 1440 / 1280 / 1024 / 768 / 390 / 320 | 0px overflow, 0 console errors; profile opens with focus on Close; Back closes it |
| Keyboard, Escape, focus return, deep link, pager, backdrop close | Pass |
| Reduced motion / JavaScript disabled | Static SVG with 0 running animations / all names present |
| Mouse: legend highlight survives canvas picking; preview never covers role text | Pass (0px overlap) |
| Desktop GPU — growth / idle / scroll / dialog | 83 / 79 / 87 / 124 fps; CLS 0.0005 |
| Throttled phone — growth / idle / scroll / dialog | 67 / 129 / 109 / 91 fps; dialog 0 frames over 33ms; LCP 568ms; CLS 0 |
| Fixed during QA | Dialog-open stall 864ms → gone (`:has()` scroll lock replaced, signature DOM 60 → 8 elements); load long tasks 31 → 13 |

Not measured: Safari and Firefox (not installed here), real phones, Lighthouse.

## 6. Outstanding assets & confirmations

| Item | Status |
|---|---|
| Portraits | **All six added** (`public/team/<slug>.jpg`, 4:5, metadata stripped). Maheer (439×549) and Galib (480×600) were supplied small; replace with larger originals when available |
| Maysha: bio, links | Not supplied (full name and portrait supplied) |
| Afnan: bio, LinkedIn/portfolio | Not supplied (full name, email and portrait supplied) |
| Bios for everyone | Not supplied (rendered only when present) |
| Maheer's LinkedIn slug | Supplied `/in/younus-mohammad-maheer-a78a08348/`, but his portfolio links `/in/younus-mohammadmaheer`; confirm |
| Rupesh's LinkedIn `/in/rupesh-saha` | Login-walled; shown as supplied |

Confirmed: Galib = Khalid Al Galib (portfolio verified; his Messenger display name is "Galib Hasan"), Maheer = Younus Mohammad Maheer, Salman = Kazi Salman (`kazisalman.dev`, `kazisalman840@gmail.com`).
