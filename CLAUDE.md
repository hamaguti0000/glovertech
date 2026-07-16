# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`glovertech` (npm package name `nagasaki-ai`) is the marketing/landing site for a Nagasaki-based AI adoption consulting service (「グラバーテック」). It's a Japanese-language, content-driven static site — no backend, no database, no auth. All copy is in Japanese; keep new UI copy in Japanese to match.

## Commands

```bash
npm ci               # install (Node 20 recommended)
npm run dev           # dev server at http://localhost:3000
npm run typecheck      # vue-tsc --noEmit
npm run generate       # static build to .output/public/ (nitro preset: static)
npm run preview        # preview the generated output locally
```

There is no test suite and no lint script configured. `npm run typecheck` and `npm run generate` are the checks CI runs on every PR (`.github/workflows/ci.yml`) — run both before considering a change done. No `.env` is needed for local dev; this app has no runtime environment variables (see `.env.example`, which only documents GitHub Actions deploy secrets).

## Architecture

**Stack**: Nuxt 3 (Vue 3 + TypeScript) with `@nuxtjs/tailwindcss` and `@nuxtjs/sitemap`. `nitro.preset: 'static'` — the entire site is prerendered to static HTML (`nuxt generate`), including the `/works`, `/articles`, and each `/articles/:slug` route explicitly listed in `nuxt.config.ts` (`nitro.prerender.routes`). **Any new article slug or dynamic route that must be in the static build has to be added to that list**, or it won't get generated.

**Data-driven content, not a CMS**: There is no database. Nearly all page copy lives in two typed data files:
- `data/site.ts` — site metadata, header/footer, hero, problems/services/pricing/FAQ sections, profile, contact, and the static content for `/about`, `/privacy`, `/tokushoho`, `/report-sample`, and `/works`. Several fields are literal Japanese placeholders like `【メールアドレスをご記入ください】` awaiting real business info — don't "fix" these without being asked, they're intentional TODOs (also marked with `// TODO:` comments).
- `data/articles.ts` — the `/articles` column content, an array of `Article` objects with `sections` that can each carry `body` paragraphs, `steps` (rendered via `ArticleSteps.vue`), a `note`, and/or a named `diagram` (`'chatgpt-mechanism' | 'subsidy-layers' | 'application-timeline'`, rendered by matching components in `components/figures/`).

Pages (`pages/*.vue`) import from these data files and pass props down to section components in `components/`; they generally don't own content themselves beyond SEO (`useHead`) and JSON-LD calls.

**Subsidy data** is separate: `public/subsidies.json` is a static JSON list of grant/subsidy programs, served as-is by `server/api/subsidies.get.ts` (a Nitro API route that just reads and returns the file). Update the JSON file directly to add/edit subsidies; there's no admin UI.

**Layout**: `app.vue` → `layouts/default.vue` (renders `SiteHeader`/`SiteFooter` from `data/site.ts` around `<slot />`) → page components → section components (`HeroSection`, `ProblemsSection`, `ServicesSection`, `SubsidySection`, `PricingSection`, `FlowSection`, `ProfileSection`, `FaqSection`, `ContactSection`, etc.), each taking its content as props from `data/site.ts`. `components/figures/` holds SVG/chart diagram components used inside article sections and the homepage (`SupportScopeChart`, `RealCostChart`).

**Composables** (`composables/`):
- `useRevealOnce.ts` / the `v-reveal` directive (`plugins/reveal.ts`) — scroll-reveal animation via `IntersectionObserver`, respecting `prefers-reduced-motion`. Prefer the `v-reveal` directive for simple fade-up-on-scroll; use `useRevealOnce` when a component needs the `revealed` ref directly.
- `useJsonLd.ts` — emits `ProfessionalService` + `FAQPage` JSON-LD (used on the homepage). Article pages build their own `Article` JSON-LD inline (see `pages/articles/[slug].vue`).
- `useSubsidyCalc.ts` — pure calculation helpers (`calcRealCost`, `formatManYen`) behind `RealCostSimulator.vue`; `covered` is rounded first and `real` is derived as `cost - covered` so the two always sum exactly to the input cost — don't reorder that.
- `useNumericSplit.ts` — splits a formatted string like "約16.7万円" into numeric vs. non-numeric spans so numerals can be styled with the Barlow Condensed font (`font-barlow`) while the rest uses the Japanese sans stack.

**Styling conventions**: Tailwind only, no CSS-in-JS. Shared classes are defined in `assets/css/main.css` under `@layer components` (`.section`, `.section-title`, `.card`, `.btn-cta`, `.field-input`, `.badge-pill`, etc.) — reuse these instead of re-authoring section/card/button styles inline. Brand colors (`navy`, `yellow`, `cta`, `line`, `surface`) are defined in `tailwind.config.ts`; the same hex values are duplicated as CSS custom properties (`--navy`, `--yellow`, etc.) in `main.css` for use in `<style scoped>` blocks (e.g. custom range-input thumbs) where Tailwind utilities can't reach.

## Deployment

Deploys are push-triggered, not something Claude Code should run manually:
- Push to `main` → `.github/workflows/deploy.yml`: `npm ci && npm run generate`, then `rsync`s `.output/public/` to a VPS over SSH (key-based auth via the `SSH_PRIVATE_KEY` secret) and reloads nginx using `deploy/nginx.conf.template`.
- `.github/workflows/setup-glovertech-domain.yml` (manual `workflow_dispatch`) provisions the `glovertech.jp` domain + Let's Encrypt cert on the VPS using `deploy/glovertech-jp-bootstrap.conf.template` then `deploy/glovertech-jp.conf.template`.
- `.github/workflows/diagnose.yml` (manual `workflow_dispatch`) is an ad hoc SSH-based troubleshooting script for the VPS/nginx setup — not part of normal CI/CD.
- All deploy/diagnose secrets (`VPS_HOST`, `VPS_USER`, `VPS_PORT`, `VPS_APP_DIR`, `SSH_PRIVATE_KEY`) live in GitHub Actions secrets, not `.env`.
