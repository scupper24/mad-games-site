# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:4321)
npm run build     # Production build to /dist
npm run preview   # Preview production build
```

No test or lint runner is configured.

## Architecture

**Stack:** Astro 4.16 (static site generator) + TypeScript + vanilla CSS/JS. No framework (React/Vue/etc.), no CSS utility library.

**Routing:** File-based via `src/pages/` — `index.astro`, `games.astro`, `jobs.astro`, `404.astro`.

**Data layer:** `src/data/games.ts` and `src/data/jobs.ts` export typed arrays. These are the single source of truth for site content — adding/editing games or jobs means editing those files only.

**Components:** `src/components/` holds reusable `.astro` pieces (`GameCard`, `JobCard`, `Header`, `Footer`, `VideoEmbed`). All interactivity is vanilla JS in `<script>` blocks inside the component.

**Layout:** `src/layouts/BaseLayout.astro` wraps every page — injects `<head>` with Google Fonts, meta tags, Header, Footer, and the global `IntersectionObserver` scroll-reveal system (`.reveal` class + `--reveal-delay` CSS custom property).

**Styles:** `src/styles/global.css` defines all CSS custom properties (colors, radii, fonts) and global utility classes (`.btn`, `.btn-primary`, `.btn-outline`, `.tag`, `.reveal`). Component-level styles live in `<style>` blocks within each `.astro` file.

## Design tokens (from `global.css`)

| Token | Value | Role |
|---|---|---|
| `--color-accent` | `#E83455` | Primary red accent |
| `--color-accent-2` | `#FF8C20` | Orange accent |
| `--color-bg` | `#0a0a10` | Page background |
| `--color-surface` | `#111118` | Cards / section bg |
| `--color-surface-2` | `#181820` | Nested card bg |
| `--color-text` | `#F0F0F8` | Body text |
| `--color-text-muted` | `#5e5e78` | Muted text |
| `--color-accent-purple` | `#AE80EE` | Purple accent (CTA sections bg) |

Global easing: `--transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)`.

Fonts: **Unbounded** (`--font-display`, headings) · **Inter** (`--font-body`, body). Fluid sizing via `clamp()`. Note: `BaseLayout.astro` also loads **Figtree** from Google Fonts, but it is not referenced in any CSS variable — `--font-body` still resolves to Inter.

## Public assets

- Game images: `public/images/games/{slug}/{cover.jpg, screen1.jpg, screen2.jpg}`. Slug must match `slug` field in `src/data/games.ts`.
- About illustrations: `public/images/about/illus-{1,2,3}.png`
- Videos: `public/videos/` — e.g. `games-section-bg.mp4` (main page), `games-showreel.mp4` (games hero)
- `_refs/` — design reference screenshots, read-only, not served

## Key interaction patterns

- **Global smooth scroll** (`BaseLayout.astro`): custom RAF-based ease-out scroll (factor 0.025) intercepts `wheel` events on non-touch devices. `scroll-behavior: auto` in `global.css` is intentional — do not change it to `smooth`, as that would conflict with the custom implementation.
- **Hero canvas frame sequence** (`index.astro`): 145 JPG frames in `public/images/hero-frames/frame-001.jpg…frame-145.jpg` rendered onto a `<canvas>`. Driven by scroll progress through `.hero-scroll-wrapper { height: 167vh }` wrapping a `position: sticky` `.hero`. **Do NOT put `overflow: hidden` (or `overflow-x: hidden`) on `<html>`** — it breaks the sticky and produces a giant ~67vh gap after the hero. `body { overflow-x: hidden }` alone is safe.
- **Hero parallax** (`index.astro`): RAF loop with sine/cosine ambient drift + mouse-following offset on floating game cards (`data-depth`, `data-rotate` attributes drive per-card intensity).
- **Stacking game cards** (`games.astro`): `position: sticky` stage + `position: absolute` cards. JS computes translateY/scale targets per-card from scroll position, then lerps current state toward target each RAF frame (EASE=0.1 ≈ 150ms settle). Cards park at `translateY(110vh)` before their turn; last card skips scale-down.
- **Stats ticker** (`index.astro`): scroll-delta driven; offset resets at −50% of track width for seamless loop. Mobile uses a higher `speed` constant (chosen at init via `matchMedia('(max-width: 768px)')`) so the ticker keeps pace with shorter mobile scroll distances.
- **Perks ticker** (`jobs.astro`): pure CSS `@keyframes perks-loop` animation (not JS-driven). Track is duplicated in HTML for a seamless loop; `animation-play-state` is never paused by hover.
- **Scroll reveals**: `IntersectionObserver` in `BaseLayout.astro` adds `.visible` to `.reveal` elements; stagger via `--reveal-delay` inline style.
- **Contact form** (`jobs.astro`): `mailto:` only — no backend.

## Header behaviour

`Header.astro` adds class `.scrolled` (dark backdrop + blur) when `window.scrollY > 60` via a scroll listener. To force the scrolled appearance on a specific page without touching the shared component, add class `always-scrolled` from that page's `<script>` and override it with `:global(.header.always-scrolled)` in that page's `<style>`. Currently applied on `games.astro` and `jobs.astro`.

The mobile menu (`.mobile-menu`) inside the header collapses with `max-height: 0; overflow: hidden`. Because all elements use `box-sizing: border-box`, padding cannot be compressed below its declared value via `max-height` — so vertical padding must be `0` in the collapsed state and re-applied via `.mobile-menu.open { padding: 24px 20px }`. Both `max-height` and `padding` are in the transition list.

## Mobile horizontal-scroll containment

Horizontal scroll on mobile is prevented by `body { overflow-x: hidden }` plus targeted `overflow: hidden` on individual sections whose drifting/absolutely-positioned children can extend beyond the viewport (e.g. `.join-section` contains the `.jobj` drift). Do **not** add `overflow-x` to `<html>` — see hero canvas note above. When introducing new sections with absolute/transform-animated children, add `overflow: hidden` on the section itself rather than relying on a document-level rule.

## CTA-баннеры (по одному в конце каждой страницы)

Каждая страница заканчивается CTA-баннером. Все три — это самостоятельные `<section>` без общего компонента.

| Страница | Секция | Фон | Заголовок |
|---|---|---|---|
| `index.astro` | `.join-section` | `#AE80EE` | «Присоединяйся к команде» |
| `games.astro` | `.games-cta` | `#AE80EE` | «Хочешь работать над нашими играми?» |
| `jobs.astro` | `.apply-section` | `#fff` | «Хочешь к нам?» |

`index.astro` и `games.astro` — фиолетовые баннеры с кнопками на белом фоне (`.btn-gcta`, `.btn-join`). `jobs.astro` — белый баннер с формой-откликом (`mailto:`).

CTA inner containers (`.join-inner`, `.gcta-inner`, `.apply-info`) use **explicit `margin-bottom` on each child** instead of a uniform parent `gap`. This is needed because the spacing tokens (see below) require *different* gaps between eyebrow→title and title→content — a single parent `gap` cannot express that. Don't re-introduce parent `gap` on these containers.

## Section spacing tokens (eyebrow / title / content)

Applied to every block that has the eyebrow + main title + content structure (the heroes and content-only blocks like the games slider on `/games` are exceptions).

| Pair | Desktop | Mobile (≤768px) |
|---|---|---|
| Eyebrow → Title | 24px | 16px |
| Title → Content (cards/slider/list/desc) | 52px | 32px |

Currently enforced via per-element `margin-bottom` in CTA banners and via parent `gap` / `margin-bottom` in section headers (`.about-header`/`.about-inner`, `.section-header`, `.jobs-header`). When adding a new section, follow the same values and add a mobile override in the existing `@media (max-width: 768px)` block.

Standard horizontal padding on inner containers: **32px desktop, 20px mobile** (matches `.container` in `global.css`).

## Coloured section pattern (purple CTA)

Sections with `background: #AE80EE` require local overrides for all child elements — the global `.tag` class renders a red `■` via `::before` and is incompatible with coloured backgrounds. Use a local eyebrow class (e.g. `.apply-eyebrow`, `.gcta-eyebrow`) instead. The global `.btn-primary:hover` adds a red box-shadow; suppress it with `box-shadow: none` in the local hover override.

## Video backgrounds

Pattern used on `index.astro` (games section) and `games.astro` (hero): `<video autoplay muted loop playsinline>` absolutely positioned with `object-fit: cover`, covered by a semi-transparent overlay div. Overlay opacity typically `rgba(10, 10, 16, 0.62–0.72)`.

## Fixed background pattern (`jobs.astro`)

The jobs hero uses a `position: fixed` image that stays pinned to the viewport. Subsequent sections (with solid or gradient backgrounds) scroll over it, creating a layered reveal effect. This differs from the video background pattern — no `<video>` element is used.

## `VideoEmbed` component

Wraps a YouTube (or any embed) URL in a lazy-loaded 16:9 `<iframe>`. Used for game trailers referenced via `trailerUrl` in `src/data/games.ts`. Currently all `trailerUrl` and `storeUrl` values in games data are placeholder `"#"` links.

## Path alias

`@/*` resolves to `src/*` (configured in `tsconfig.json`).

## Git rules

**Never run `git push` without explicit user instruction.** Wait for the user to say "запушь" / "push" before pushing to remote.
