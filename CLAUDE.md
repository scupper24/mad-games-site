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
| `--color-secondary` | `#FF8C20` | Orange accent |
| `--color-bg` | `#0a0a10` | Page background |
| `--color-surface` | `#111118` / `#181820` | Cards/sections |
| `--color-text` | `#F0F0F8` | Body text |

Fonts: **Unbounded** (display/headings) · **Inter/Figtree** (body). Fluid sizing via `clamp()`.

## Public assets

Game images follow the pattern `public/images/games/{slug}/{cover.jpg, screen1.jpg, screen2.jpg}`. The slug must match the `id` field in `src/data/games.ts`. About illustrations are `public/images/about/illus-{1,2,3}.png`.

`_refs/` contains design reference screenshots — read-only, not served.

## Key interaction patterns

- **Hero parallax** (`index.astro`): RAF loop with sine/cosine ambient drift + mouse-following offset on floating game cards.
- **Stats ticker**: Scroll-driven infinite loop; resets transform at −50% to create seamless repeat.
- **Scroll reveals**: `IntersectionObserver` in `BaseLayout.astro` triggers `.reveal` → `visible` class; stagger controlled by `--reveal-delay` inline style.
- **Contact form** (`jobs.astro`): `mailto:` link only — no backend.

## Path alias

`@/*` resolves to `src/*` (configured in `tsconfig.json`).
