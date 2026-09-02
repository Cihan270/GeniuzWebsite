# Fase 9 — QA checklist

**Datum:** 2026-08-04  
**Status:** afgerond  
**Acceptatie (plan):** lint / typecheck / build groen; a11y-, perf- en linkcontroles

---

## Commando’s

```bash
npm run lint
npm run typecheck
npm run qa          # IA + public links + content guards
npm run build
npm run qa:all      # lint → typecheck → qa → build
```

Na `npm run build`:

```bash
npm run start -- -p 3456
# daarna HTTP-smoke (zie § Links)
```

---

## Resultaten (deze ronde)

| Check | Resultaat |
|-------|-----------|
| `npm run lint` | Groen (0 errors, 0 warnings) |
| `npm run typecheck` | Groen |
| `npm run qa` | Groen (3/3 asserts) |
| `npm run build` | Groen — 26 static/SSG routes + API’s |
| HTTP smoke (prod `next start`) | Alle gepubliceerde NL-routes **200**; `/` → **307** `/nl`; `/en` → **307** NL; `/nl/cases` & dienst-detail → **404** |
| HTML smoke | `lang=nl`, skip-link → `#main-content`, geen LanguageSwitcher, prototype-label Website Scan, legal concept-banner, sitemap zonder `/en`/cases/details |

---

## Lint / typecheck / build

- [x] ESLint schoon
- [x] `tsc --noEmit` schoon
- [x] Production build schoon (Turbopack)
- [x] Geen publieke Cases- of EN-routes in build-output
- [x] Insights: precies 3 gepubliceerde artikelroutes

---

## Links (IA)

Geautomatiseerd via `scripts/qa.ts` → `assertFase1IaInvariants` + `assertFase1PublicLinks`:

- [x] Nav (primary + footer + header-CTA) wijst alleen naar gepubliceerde paden
- [x] Content-CTA’s (home, hubs, sectoren, scans, over-ons, opportunity next-steps) resolven
- [x] Development-ankers (`#ai-agents`, `#workflow-automatisering`, `#maatwerk-ai-software`, …) bestaan op de hub
- [x] Geen `/cases`, `/en`, of reserved dienst-detailpaden in publieke hrefs
- [x] HTTP: alle Fase-1 pagina’s + `sitemap.xml` / `robots.txt` bereikbaar; forbidden paden geblokkeerd/omgeleid

---

## Content guards

Via `assertFase1ContentGuards`:

- [x] ≤ 3 gepubliceerde insights
- [x] Opportunity-uitkomstlabel = “Indicatieve potentiële tijdswaarde”; score blijft “indicatief”
- [x] Outcome-copy zonder positieve “besparing” / “ROI” / “garantie”-claims
- [x] Website Scan `prototypeLabel` aanwezig en noemt prototype

---

## Accessibility (WCAG 2.2 AA-richtlijn — code review + HTML smoke)

- [x] `html lang="nl"`
- [x] Skip-link naar `#main-content`
- [x] Landmark: header nav met `aria-label`; consent dialog met labelledby/describedby
- [x] Formulieren: zichtbare labels (`htmlFor` / ids), `aria-invalid`, honeypot `aria-hidden`
- [x] Focus-visible rings op interactieve marketing-links
- [x] `prefers-reduced-motion`: CSS override + Motion `reducedMotion="user"`
- [x] Hero-procesvisual: `role="img"` + `aria-label`; decoratief `aria-hidden`
- [x] Scan step indicator: `aria-label` / `aria-current="step"`
- [ ] Volledige axe/Lighthouse a11y-audit in browser — handmatig vóór launch (Fase 10)

---

## Performance

- [x] Geen Three.js / zware 3D
- [x] Hero SVG + Motion (subtiel); pages grotendeels SSG
- [x] Fonts via `next/font` (Geist / Newsreader) — geen onnodige webfont cascade
- [x] Geen GA / Clarity loaders; Analytics alleen gated op consent
- [x] `cmdk` niet in Fase-1 UX-paden
- [ ] Lighthouse Performance/Best Practices op staging — bij Fase 10 deploy

---

## Artefacten

| Pad | Rol |
|-----|-----|
| `scripts/qa.ts` | Runner voor IA/links/content asserts |
| `lib/seo/assert-fase1-ia.ts` | Nav/sitemap/SEO-matrix invariants |
| `lib/seo/assert-fase1-links.ts` | Publieke links + content guards |
| `docs/fase-9-qa.md` | Deze checklist |

---

## Open tot Fase 10 / contentfase

- Vercel-deploy, productie-env, domein
- Persistente spambeveiliging (Turnstile / Upstash / Firewall)
- Browser Lighthouse + axe op staging
- Juridische review legal pages
- EN, Cases live, dienst-detail SEO-pagina’s — bewust later
