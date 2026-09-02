# Fase 0 — Repository-audit, Next 16 (proxy/i18n), token-mapping, risico’s

**Datum:** 2026-08-04  
**Status:** afgerond (documentatie; geen productcode in deze fase)  
**Bronnen:** lokale Next.js 16.2.12 docs (`node_modules/next/dist/docs/`), `package.json`, `app/`, `components/`, uitvoeringsplan

Acceptatiecriteria Fase 0:

- [x] Audit-doc bevestigt stack en scaffold-status
- [x] Next 16 proxy- + i18n-docs gelezen en samengevat
- [x] Brand → shadcn token-mapping vastgelegd
- [x] Risico’s gelogd met mitigerende acties

---

## 1. Stack-bevestiging (geverifieerd)

| Laag | Verwacht (plan) | Geverifieerd |
|------|-----------------|--------------|
| Next.js | 16.2.12 (App Router; Turbopack default; `middleware` → `proxy.ts`) | `next@16.2.12` in `package.json` |
| React | 19.2.4 | `react` / `react-dom` 19.2.4 |
| TypeScript | 5.9.3, `strict` | `typescript@5.9.3`; `tsconfig` `strict: true` |
| Tailwind | v4.3.3, CSS-first, geen `tailwind.config` | `tailwindcss@4.3.3`; tokens in `app/globals.css` |
| shadcn | style `base-nova`, RSC, Base UI | `components.json` `style: "base-nova"`, `rsc: true`; `@base-ui/react@1.6.0` |
| Motion | `motion` 12.42.2 | `motion@12.42.2` |
| Forms | RHF + Zod (ongebruikt) | `react-hook-form@7.83.0`, `zod@4.4.3` — geen imports in app |
| Overig | lucide, next-themes, sonner, react-countup, cmdk, cva, clsx, tailwind-merge, tw-animate-css, shadcn CLI | aanwezig |

### Scaffold-status

| Item | Status |
|------|--------|
| `app/page.tsx`, `app/layout.tsx` | Create Next App boilerplate |
| `app/globals.css` | Neutrale shadcn OKLCH-tokens; **geen** Geniuz-tokens |
| `components/ui/*` | 24 primitives; **nergens** vanuit app geïmporteerd |
| `public/*` | Stock Next/Vercel SVG’s alleen |
| Logo / Geniuz-content | Afwezig |
| i18n / `[locale]` | Afwezig |
| `proxy.ts` / `middleware.ts` | Beide afwezig |
| API-routes / `.env.example` / MDX | Afwezig |
| Git | 0 commits op `main`; `origin/main [gone]` |

### Packages: Fase 1 toevoegen vs. niet

| Toevoegen bij implementatie | Niet toevoegen in fase 1 |
|-----------------------------|--------------------------|
| `resend` | Three.js / WebGL |
| `@vercel/analytics` | `next-intl` (native `[locale]` + dictionaries) |
| `@hookform/resolvers` | MDX-toolchain |
| `server-only` (indien niet transitief) | CMS, Clarity, GA |
| Optioneel voor locale-detectie: `negotiator` + `@formatjs/intl-localematcher` (officiële i18n-guide) | Extra carousel/marquee-libs |

---

## 2. Next.js 16 — proxy & i18n (docs-notities)

Gelezen:

- `01-app/03-api-reference/03-file-conventions/proxy.md`
- `01-app/02-guides/internationalization.md`
- `01-app/02-guides/upgrading/version-16.md` (sectie middleware → proxy + async `params` / `PageProps`)

### 2.1 `proxy.ts` (niet `middleware.ts`)

| Regel | Consequentie voor Geniuz |
|-------|--------------------------|
| File convention heet **`proxy`**; `middleware` is deprecated | Locale-redirect leeft in root `proxy.ts` |
| Export: named `proxy` of default; niet `middleware` | `export function proxy(request: NextRequest)` |
| Runtime = **Node.js**; Edge **niet** ondersteund in `proxy` | Geen Edge-assumpties; Node is OK voor Accept-Language + cookie |
| Matcher zonder exclusie raakt `_next/static`, images, `public` | Matcher moet `api`, `_next/static`, `_next/image`, favicon, sitemap, robots uitsluiten |
| Executie vóór render: redirects/rewrites/headers/cookies | Ideaal voor locale-prefix redirect + locale-cookie |
| Config-flags hernoemd (`skipProxyUrlNormalize`, …) | Alleen relevant bij geavanceerde URL-normalisatie |

**Voorgenomen matcher (Fase 3):**

```ts
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
```

### 2.2 Internationalization (App Router)

Officiële aanpak (geen `next-intl` in fase 1):

1. **`app/[locale]/…`** (docs gebruiken `[lang]`; project kiest `[locale]` consistent met plan).
2. **`proxy.ts`**: als pathname geen `nl`/`en`-prefix heeft → detecteer locale → `NextResponse.redirect` naar `/{locale}{pathname}`.
3. **Detectie:** cookievoorkeur eerst; anders `Accept-Language` (Negotiator + `intl-localematcher` of lichte eigen parser); default **`nl`**.
4. **Dictionaries:** server-only loader (`import 'server-only'`) + JSON/TS modules; `hasLocale` + `notFound()` bij ongeldige locale.
5. **Typing:** globale helpers `PageProps<'/[locale]/…'>` en `LayoutProps<'/[locale]'>`; `params` is **async** (`await params`).
6. **Static:** `generateStaticParams` → `[{ locale: 'nl' }, { locale: 'en' }]`.
7. **Root layout:** fonts/html shell; locale-layout zet `lang={locale}` op `<html>` (of nested layout-patroon volgens Fase 3).

**Geniuz-specifiek (plan):**

- Locales: `nl` (default), `en`
- EN = placeholder-shell voor page body; UI (nav/footer/CTA) wél vertaald
- Geen machinevertaling; `hreflang` + canonical per locale-URL
- Accept-Language alleen voor **eerste** redirect; daarna LanguageSwitcher + cookie

### 2.3 Overige Next 16 aandachtspunten

- Turbopack is default voor `dev`/`build` — huidige scripts zijn al zonder `--turbopack` flag (correct).
- Typed routes: na `next typegen` / build zijn `PageProps` / `LayoutProps` globaal beschikbaar.
- Async Request APIs: altijd `await params` / `await searchParams`.

---

## 3. Token-mapping (briefing → CSS / shadcn)

Bronkleuren blijven hex als bron van waarheid; implementatie in Fase 2 gebruikt OKLCH in `:root` (consistent met huidige `globals.css`).

### 3.1 Brand primitives

| Token | Hex | OKLCH (afgeleid) | Rol |
|-------|-----|------------------|-----|
| Ink | `#12212B` | `oklch(0.239 0.028 238.7)` | Primair tekst / primary |
| Ink Deep | `#0A151D` | `oklch(0.189 0.023 241.1)` | Donkere secties |
| Gold | `#D39A35` | `oklch(0.724 0.132 77.7)` | Accent / CTA-lijn (spaarzaam) |
| Gold Soft | `#E5BB68` | `oklch(0.812 0.113 83.0)` | Hover / zachte accenten |
| Canvas | `#F7F6F2` | `oklch(0.973 0.005 95.1)` | Pagina-achtergrond |
| Surface | `#EEEDE8` | `oklch(0.945 0.007 97.4)` | Alternerende secties |
| Border | `#DAD9D3` | `oklch(0.884 0.008 98.9)` | Randen |
| Muted | `#66717A` | `oklch(0.542 0.019 242.7)` | Secundaire tekst |
| White | `#FFFFFF` | `oklch(1.000 0.000 0)` | Op ink-secties / cards |

### 3.2 Mapping naar shadcn CSS-variabelen

| shadcn / theme var | Geniuz-bron | Opmerking |
|--------------------|-------------|-----------|
| `--background` | Canvas | Lichte site; geen user dark-mode in fase 1 |
| `--foreground` | Ink | Bodytekst |
| `--card` / `--popover` | White of Surface | Afhankelijk van context; default White |
| `--card-foreground` / `--popover-foreground` | Ink | |
| `--primary` | Ink | Buttons/CTA primair = ink, niet goud |
| `--primary-foreground` | White / Canvas | Contrast op primary |
| `--secondary` | Surface | |
| `--secondary-foreground` | Ink | |
| `--muted` | Surface | |
| `--muted-foreground` | Muted | |
| `--accent` | Gold | **Spaarzaam**; niet als bodytekstkleur op licht |
| `--accent-foreground` | Ink Deep | Tekst op goud-vlak |
| `--border` / `--input` | Border | |
| `--ring` | Gold of Ink | Focus-visible: voldoende contrast |
| `--destructive` | (bestaande shadcn rood) | Ongewijzigd tenzij brand-specifiek |
| `--radius` | **1rem–1.25rem** (16–20px) | Cards tot ~24px (`radius-xl`/`2xl`) |

### 3.3 Extra project-tokens (naast shadcn)

Te definiëren in `:root` / `@theme` in Fase 2:

```css
--geniuz-ink: …;
--geniuz-ink-deep: …;
--geniuz-gold: …;
--geniuz-gold-soft: …;
--geniuz-canvas: …;
--geniuz-surface: …;
--geniuz-border: …;
--geniuz-muted: …;
```

Section themes (utility classes / data-attrs): `canvas` | `surface` | `ink` | `ink-deep` — goud alleen als lijn/CTA-accent.

### 3.4 Typografie-mapping

| Rol | Font | CSS-var |
|-----|------|---------|
| Primair UI/body | Geist Sans (`next/font`) | `--font-sans` ← `--font-geist-sans` |
| Mono (indien nodig) | Geist Mono | `--font-mono` ← `--font-geist-mono` |
| Editorial accent | Newsreader (Google, max pull-quotes / insight-titels) | `--font-editorial` (nieuw) |

**Bekende bug (nu):** `layout.tsx` zet `--font-geist-sans`, maar `@theme` heeft `--font-sans: var(--font-sans)` (self-reference). Geist wordt daardoor niet toegepast. Fix in Fase 2: `--font-sans: var(--font-geist-sans)`.

### 3.5 Motion-tokens (referentie)

- Durations: 200 / 400 / 600ms  
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`  
- `prefers-reduced-motion: reduce` → instant / opacity-only  

### 3.6 Dark mode

Geen user toggle in fase 1. `.dark` in `globals.css` mag blijven voor shadcn-compatibiliteit; ThemeProvider alleen forceren voor Sonner indien nodig (`forcedTheme="light"`).

---

## 4. Risicolog

| ID | Risico | Impact | Mitigatie | Fase |
|----|--------|--------|-----------|------|
| R1 | Next 16 afwijkingen (`proxy`, async `params`, `PageProps`) | Foute i18n/routing of typefouten | Lokale docs volgen; `proxy.ts` i.p.v. middleware; typed helpers na typegen | 3+ |
| R2 | Font self-ref (`--font-sans: var(--font-sans)`) | Geist laadt niet; fallback system fonts | Map naar `--font-geist-sans` in `@theme` | 2 |
| R3 | `sonner.tsx` gebruikt `useTheme` zonder ThemeProvider | Runtime/theme-warnings of verkeerde toast-theme | ThemeProvider met `forcedTheme="light"` of theme hardcoden op Toaster | 2–3 |
| R4 | Zod v4 API ≠ v3; geen `@hookform/resolvers` | Formvalidatie faalt / verkeerde snippets | Install resolvers; Zod v4 docs; geen v3-voorbeelden kopiëren | 7 |
| R5 | Base UI ≠ Radix | Online shadcn/Radix-snippets breken | Alleen bestaande `components/ui` + Base UI docs | doorlopend |
| R6 | `react-countup` misbruikt voor marketingcijfers | Misleidende “stats” | Alleen voor berekende scan-scores | 6 |
| R7 | `cmdk` uitbreiden tot command palette | Scope creep op marketing site | Niet gebruiken in fase 1 | 1–9 |
| R8 | Geen Geniuz-logo | Zwakke brand in UI | Placeholder wordmark; tokens uit briefing; SVG later finetunen | 2–3 |
| R9 | Remote `origin/main [gone]`, 0 commits | Geen history / verwarring bij push | Baseline-commit scaffold, daarna feature-commits per fase | bij eerste commit |
| R10 | `proxy` Node-only (geen Edge) | Onverwachte runtime-annames | Locale-detectie in Node houden; geen Edge-only APIs | 3 |
| R11 | Proxy matcher te breed | CSS/JS/images geblokkeerd | Negatieve matcher (api/_next/static/_next/image/…) | 3 |
| R12 | EN placeholder zichtbaar bij launch | Zwakke EN UX | Shell + UI vertaald; optioneel EN verbergen tot copy klaar (open beslissing opdrachtgever) | 3 / launch |
| R13 | Resend/env ontbreekt | Forms “werken” niet in preview | Controlled “niet geconfigureerd”-response; geen fake success zonder flag | 7 |
| R14 | Legal/copy claims zonder juridische check | Compliance-risico | Placeholders + “juridisch te controleren”; geen Review-schema | 8 |
| R15 | Live website crawl / echte AI-analyse verwacht | Verkeerde verwachting | Mock providers + duidelijke disclaimers | 6 |

### Open beslissingen (geen architectuur-blockers)

| Item | Tijdelijke beslissing |
|------|----------------------|
| Logo | Placeholder wordmark |
| E-mail `info@geniuzaic.com` | Placeholder tot bevestiging |
| Legal body | Placeholder |
| Bookings | `BookingCta` → contact; later `bookingsUrl` |
| Domein / KvK / adres | Placeholders |
| EN bij launch | Zichtbare shell of tijdelijk verborgen — opdrachtgever |
| Vercel-deploy | Na Fase 9 (Fase 10) |

---

## 5. Implicaties voor volgende fases

| Fase | Directe follow-ups uit deze audit |
|------|-----------------------------------|
| **1** | Sitemap/nav/SEO als typed config; geen package-keuzes wijzigen |
| **2** | Tokens + font-fix + radius; Sonner/theme hardening; geen paarse defaults |
| **3** | `proxy.ts` + `app/[locale]`; dictionaries; cookie + Accept-Language; skip link / header |
| **4+** | Zie uitvoeringsplan; risico’s R6–R15 meenemen in QA (Fase 9) |

---

## 6. Conclusie

De scaffold komt overeen met het uitvoeringsplan. Fase 0 introduceert **geen** runtime-code: Next 16 proxy/i18n-pad is bevestigd via lokale docs, brand→shadcn mapping is vastgelegd (inclusief OKLCH-afleidingen), en risico’s zijn gelogd met fase-mitigaties. Implementatie start bij Fase 1 (config/content) en Fase 2 (tokens/fonts).
