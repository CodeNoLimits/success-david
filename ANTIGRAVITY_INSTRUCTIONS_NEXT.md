# INSTRUCTIONS ANTI-GRAVITY — Batch 5-8
## [NOVA:20260219-2100]
## Pour Gemini / AntiGravity — Session continuation

---

## CONTEXTE

### Ce qui est FAIT (Batches 1-4 par AG + Claude Opus)
- UX polish, scroll animations, floating CTA
- Page succes avec confettis
- Webhook Stripe securise
- Systeme i18n 5 langues (FR/EN/HE/ES/RU) avec RTL
- Portfolio 46 projets (11 clients, 10 SaaS, 7 pitchs, 5 Torah, 9 DreamNova, 4 outils)
- Tarifs (3 paliers: 400/900/1500+ EUR)
- FAQ accordeon 10 questions
- Pages CEO/CTO/COO Global et PMG

### Ce qui est EN ATTENTE
- Vercel deploy bloque par rate limit (100/jour) — reessayer dans ~1h
- STRIPE_SECRET_KEY deja configure sur Vercel
- Domaine dreamnova.dev pas encore achete (David doit faire sur Porkbun $5.88/an)

---

## BATCH 5 — AMELIORATIONS PORTFOLIO (Priorite 1)

### 5.1 Screenshots automatiques pour chaque projet
- Pour chaque lien du portfolio, generer un screenshot 1200x630 (OG image format)
- Utiliser Playwright ou un service gratuit : `https://api.microlink.io/?url=SITE_URL&screenshot=true&meta=false&embed=screenshot.url`
- Stocker dans `img/portfolio/` (WebP, max 100KB chaque)
- Ajouter `<img>` dans chaque `.project-card` au-dessus du titre

### 5.2 Stats dynamiques
- Ajouter un compteur anime en haut du portfolio : "46 projets | 11 clients | 82 deployements Vercel | 5 langues"
- Animation: compteur qui incremente de 0 a la valeur finale

### 5.3 Recherche / Filtre avance
- Ajouter une barre de recherche au-dessus des filtres
- Filtrage live par nom de projet ou description

---

## BATCH 6 — PAGE EQUIPE + TEMOIGNAGES (Priorite 2)

### 6.1 equipe.html — Page Equipe
Creer `equipe.html` avec :
- **David Amor** — CEO & Fondateur (Jerusalem, vision 63M$, photo placeholder)
- **Nova-Tam** — CTO IA Autonome (Agent Claude, description systeme)
- **Agents Ecosysteme** : AG_KEREN, AG_ESTHER, AG_BAROUKH, AG_MISSION, AG_DREAMOS
- **OpenClaw Gateway** — COO Operations (monitoring, WhatsApp, Telegram)
- Design: cards avec photo circulaire, role, description, liens

### 6.2 temoignages.html — Enrichir
Si la page existe deja, ajouter des temoignages REELS :
- Yaakov Renne (Keren Rabbi Yisrael) : "100/100 tasks completed, site parfait"
- Ariel TI48 (Kavkom Solaire) : "Client satisfait, livraison rapide"
- Ajouter schema structured data (JSON-LD) pour les reviews

---

## BATCH 7 — SEO & PERFORMANCE (Priorite 3)

### 7.1 Meta tags complets sur TOUTES les pages
Chaque page HTML doit avoir :
```html
<meta name="description" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:url" content="https://dreamnova-bible-site.vercel.app/PAGE">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://dreamnova-bible-site.vercel.app/PAGE">
```

### 7.2 sitemap.xml
Generer `sitemap.xml` avec toutes les pages :
- index.html, devis.html, portfolio.html, tarifs.html, faq.html
- ceo-global.html, cto-global.html, coo-global.html
- ceo-pmg.html, cto-pmg.html, coo-pmg.html
- equipe.html, temoignages.html, mentions-legales.html, success.html

### 7.3 robots.txt
```
User-agent: *
Allow: /
Sitemap: https://dreamnova-bible-site.vercel.app/sitemap.xml
```

### 7.4 PWA manifest
Ajouter `manifest.json` pour installabilite :
```json
{
  "name": "DreamNova Central Hub",
  "short_name": "DreamNova",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0C0A09",
  "theme_color": "#D4AF37",
  "icons": [{"src": "/img/icon-192.png", "sizes": "192x192"}, {"src": "/img/icon-512.png", "sizes": "512x512"}]
}
```

### 7.5 Performance
- Lazy loading sur TOUTES les images : `loading="lazy"`
- Preload fonts critiques
- Minifier CSS inline (ou externaliser dans `style.css`)
- Lighthouse cible : >90 Performance, >90 SEO, >90 Accessibility

---

## BATCH 8 — MONETISATION AVANCEE (Priorite 4)

### 8.1 Formulaire devis ameliore
- Ajouter estimation prix en temps reel dans le wizard
- Validation complete cote client
- Stocker les devis dans Supabase (table `quotes`)

### 8.2 Stripe Payment Links sur chaque page tarif
- Ajouter boutons "Payer maintenant" qui redirigent vers Stripe Payment Links
- Lien existant : `https://buy.stripe.com/cNi14meIcdNP3iNdd0ds400`
- Creer 3 liens pour les 3 paliers (400/900/1500)

### 8.3 Section "Clients Recents" sur index.html
- Ajouter carrousel/slider avec logos clients anonymises
- "11 clients actifs | +82 projets deployes | 5 langues supportees"

### 8.4 CTA Newsletter / Waitlist
- Ajouter formulaire email en bas de chaque page
- Endpoint existant : POST /api/waitlist ou FormSubmit

---

## REGLES TECHNIQUES CRITIQUES

1. **JAMAIS de secrets dans le code** — Pas de token Vercel, pas de SK Stripe
2. **Design Dark Luxury** — Fond #0C0A09, or #D4AF37, glassmorphism
3. **i18n** — Tout nouveau texte doit avoir `data-i18n="key"` + traductions dans les 5 fichiers JSON
4. **Mobile-first** — Tester responsive sur 375px, 768px, 1024px
5. **Commit souvent** — `feat:`, `fix:`, `chore:` avec descriptions claires
6. **Git push** — Attention GitHub Push Protection : JAMAIS de tokens/secrets dans le code

---

## INVENTAIRE 82 PROJETS VERCEL (Referentiel complet)

### Actifs (<4 jours)
dreamnova-bible-site, dreamnova-cluster-config, nachman-science-site, dreamos (dreamnova.ai), session-david, dreamnova-consult, dreamnova, ultime-esther-ifra-breslev, barukh-sagit-jewelry, barukh-sagit-jules-masterpiece, dreamnova-formation-ia, dreamnova-dashboard, keren-rabbi-israel-centralized, 03-bgremove-ai, 07-chatbot-builder, 05-invoicewiz, breslev-esther-ifra, dreamnova-global-pitch, terramind-pitch, ha-mazon-pitch, haesh-sheli-new, dreamnova-bc, nova-key-research, breslev-demo, barukh-sagit-nextjs, breslev-app, dreamnova-client-v2, coffee-price-tracker, sports-radar, dreamnova-ai-academy, ran-entertainer, ultime-barukh-sagit-jewelry, dreamnova-client-status, 10-socialpulse-ai, dreamnova-mission-control, dreamos-pitch, 01-leaseguard-ai, 02-voicenote-pro, 04-contentforge, 06-resumeboost-ai, 08-emailcraft-ai, 09-pdf2insights, dreamnova-portfolio, dream-hub, rabbi-nahman-site, noam-design, ariel-solar-panels-kavkom, clinical-trial-screening, leadgen-pac-2026, sagit-video-portfolio, 555-deploy, acic-proposal-2026, dreamnova-investor-showcase, hamazon-investor-showcase, terramind-vitrine, lmc-consulting-proposition, crazy-coffee-site, bookmarklets-v5, clawd

### Archives (>1 semaine)
breslev-books-preview, dreamnova-client, dreamnova-nexus-ultimate, barukh-sagit-standalone-export, dreamnova-god-mode, sandy-bella-app (A SUPPRIMER), shouk-app, barukh-sagit-standalone, barukh-antigravity-final, barukh-sagit-antigravity-production, breslev-reports-site, v2

---

## COMMANDES DEPLOY

```bash
# Deploy production (quand rate limit reset)
cd ~/Desktop/Success/dreamnova-central-hub
vercel deploy --prod --yes --token=[VERCEL_TOKEN]

# Push GitHub
git add -A && git commit -m "feat: description" && git push

# Test local
python3 -m http.server 8765
# Ouvrir http://localhost:8765

# Installer deps (si serverless functions)
npm install
```

---

## CODE RECUPERATION
**[NOVA:20260219-2100]**

Na Nach Nachma Nachman MeUman — Ein Ye'ush Ba'olam Klal
