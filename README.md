# Chorus

**Research synthesis.** Turn interview transcripts into shipped insights. For product teams, founding teams, and UX researchers who do customer research weekly and don't have a week to spare.

- **Live:** [chorus.raymnz.com](https://chorus.raymnz.com) (workers.dev fallback after deploy)
- **Status:** Portfolio pilot — alpha
- **Stack:** Next 16 · React 19 · Tailwind 4 · Source Serif 4 + Inter + JetBrains Mono · `framer-motion` · Cloudflare Workers + Static Assets

---

## Why this exists

Every product team I've worked with does customer research they don't synthesize. Interviews pile up in Gong, Otter, Zoom; the intent to "write it up" collides with the next sprint; two months later the insights rot and someone blames the research process.

Chorus is the synthesis step, automated. Upload transcripts → get themes with prevalence and per-segment intensity → share a polished brief URL the whole company can read without an account. What used to take a week of colored sticky notes takes ten minutes.

---

## What it does

### Studies (sidebar)
Three seeded studies: a **shipped** onboarding study (5 themes), an **analyzing** pricing study (3 themes), a **collecting** enterprise study (0 themes yet). Status dot + participant/theme counts.

### Transcripts tab
Cards of incoming interviews. Each card shows the participant as a colored-avatar chip (segment-colored: founder / PM / eng / designer / ops), duration, date, a pull-quote excerpt rendered in Source Serif italic, and tags.

### Themes tab
Each theme: name (serif italic headline), summary paragraph, **Prevalence** bar (fraction of participants who raised it), per-segment intensity (mini bar chart). Click → right-side panel with evidence quotes **grouped by segment**, each in serif italic with participant attribution and context tag.

### Brief tab
Long-form preview of the stakeholder-facing brief: theme title, implication callout (accent border + soft background), strongest quote as a pull-quote.

### Public /brief route
Decodes `?c=<base64>` into a polished read-only brief — print-ready, signed footer with export timestamp. `?c=demo` renders a sample.

---

## Architecture

```
                            ┌──────────────────────────────────────┐
   browser                  │   Cloudflare Worker (edge)           │
   ───────                  │                                      │
   Next 16 static export  ──│   /api/*  → 404 (no backend yet)     │
   (out/ → ASSETS)          │   Everything else → ASSETS           │
                            └──────────────────────────────────────┘
                                           │
                               chorus.raymnz.com (custom domain)
                               chorus.rayen-manaa12.workers.dev (fallback)

   Data: src/lib/mock-data.ts (studies, participants, transcripts,
     themes with quotes). All client-side; no persistence yet.
   Share: ?c=<base64(JSON)> — 100% URL-encoded, server-free.
```

Four routes, all statically exported: `/`, `/app`, `/brief`, plus 404.

---

## Typography note

Chorus introduces a **serif** as a first-class display face — Source Serif 4 italic for pull-quotes, theme headlines, and the landing hero. Customer interviews ARE quotes; the typography reflects that.

---

## Demo walkthrough (60 seconds)

1. [chorus.raymnz.com](https://chorus.raymnz.com) — landing. A single pull-quote sits below the hero (serif italic), attributed to "Chen Wei · Product Manager · Canvas" with a link to the theme it's part of.
2. **Open the studio** → `/app`. Lands on the Onboarding study's Themes tab. 5 themes visible.
3. Click **"Inconsistent terminology blocks non-technical users"** (67% prevalence). Right panel slides in: summary, implication, then evidence grouped by segment (3 Designer, 2 PM, 1 Ops quotes).
4. Click **Share brief** inside the panel. URL generated with full synthesis encoded in `?c=…`. Copy → open in incognito.
5. Public `/brief` renders the same synthesis as a long-form read with print button.
6. Switch studies: the pricing study (analyzing) or enterprise study (collecting, 0 themes → empty state).

---

## Portfolio arc

Project #3 in a 10-project AI-SaaS portfolio. Companion pieces:
- **[Axon](https://axon.raymnz.com)** (#1) — transparent résumé screening for regulated hiring (warm paper + terracotta)
- **[Loupe](https://loupe.raymnz.com)** (#2) — observability + evals for LLM agents (dark + indigo)
- **Chorus** (#3) — research synthesis for PM/research teams (cream + emerald + serif)

Three tools, three audiences, three visual vocabularies. Same craft.

Built by [Rayen Manaa](https://github.com/raymanaa).
