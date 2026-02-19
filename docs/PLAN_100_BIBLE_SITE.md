# PLAN 100 POINTS — DreamNova Bible Site (Hub Central)
## [NOVA:20260219-1900]
**Objectif** : Site hub magnifique, pro, fonctionnel, qui connecte TOUT l'écosystème DreamNova.
**Exécution** : Sonnet + agents parallèles. Max 30min par tâche.
**URL** : https://dreamnova-bible-site.vercel.app (+ GitHub Pages fallback)
**Repo** : ~/Desktop/_PROJETS/DREAMNOVA/dreamnova-bible-site/

---

## PHASE 1 — FONDATIONS (1-15)

### Domaine & Infrastructure
- [ ] 1. Acheter un domaine DreamNova (recherche en cours)
- [ ] 2. Pointer dreamnova.ai vers le bible-site (hub central) au lieu de dreamos
- [ ] 3. Configurer sous-domaines : consult.dreamnova.ai, formation.dreamnova.ai, dashboard.dreamnova.ai, keys.dreamnova.ai, os.dreamnova.ai
- [ ] 4. SSL/HTTPS + redirect www → apex
- [ ] 5. GitHub Pages comme CDN fallback (codenolimits.github.io/dreamnova-bible-site)

### Stripe Production (compte DREAM AI)
- [ ] 6. Configurer env var `STRIPE_SECRET_KEY` sur Vercel (FAIT)
- [ ] 7. Tester API Checkout en prod — vérifier que le montant exact du devis est envoyé à Stripe
- [ ] 8. Ajouter webhook Stripe (`/api/webhook`) pour confirmation de paiement
- [ ] 9. Email automatique de confirmation après paiement (via Resend ou FormSubmit)
- [ ] 10. Configurer payouts sur le compte DREAM AI (compte bancaire déjà ajouté par David)

### FormSubmit & Contact
- [ ] 11. Vérifier réception email FormSubmit (ACTIVÉ — tester à nouveau)
- [ ] 12. Ajouter notification Telegram quand un devis est soumis
- [ ] 13. Page de confirmation après envoi du formulaire (merci + prochaines étapes)
- [ ] 14. Auto-répondeur email au client ("Nous avons reçu votre demande")
- [ ] 15. Stocker les devis soumis dans un Google Sheet (via FormSubmit webhook ou Zapier)

---

## PHASE 2 — REDESIGN PREMIUM (16-35)

### Design System
- [ ] 16. Vérifier que le redesign glassmorphism ne casse aucune fonctionnalité JS
- [ ] 17. Tester les 6 étapes du wizard (type → features → urgence → contact → contrat → paiement)
- [ ] 18. Tester sélection de chaque type de projet (8 types)
- [ ] 19. Tester toutes les 14 features (toggle + prix dynamique)
- [ ] 20. Tester les 4 niveaux d'urgence (délai change correctement)
- [ ] 21. Vérifier calcul de prix total + acompte 40% + solde 60%
- [ ] 22. Tester la génération du devis PDF (ref DN-XXXX)
- [ ] 23. Tester signature électronique du contrat CGV
- [ ] 24. Tester virement multi-région (EUR/ILS/USD/CAD + copier)
- [ ] 25. Tester paiement Stripe (redirect vers checkout avec montant exact)
- [ ] 26. Tester paiement PayPal (montant pré-rempli)

### Animations & UX
- [ ] 27. Ajouter fade-in au scroll pour chaque section (IntersectionObserver)
- [ ] 28. Transition smooth entre les 6 étapes du wizard
- [ ] 29. Micro-animations sur les boutons (hover, click, loading)
- [ ] 30. Progress bar animée avec glow sur l'étape active
- [ ] 31. Particules ou effet subtle en background (CSS uniquement, léger)
- [ ] 32. Animation de succès après paiement/envoi formulaire
- [ ] 33. Loading skeleton pendant les appels API
- [ ] 34. Lighthouse Performance > 90 (vérifier après animations)
- [ ] 35. Mobile responsive parfait (tester 375px, 414px, 768px, 1024px, 1440px)

---

## PHASE 3 — PAGES DU HUB (36-55)

### Pages existantes à améliorer
- [ ] 36. index.html — Hero magnifique + comparatif concurrence + CTA vers devis
- [ ] 37. ceo-global.html — Lien vers devis en CTA de chaque section
- [ ] 38. cto-global.html — Même chose
- [ ] 39. coo-global.html — Même chose
- [ ] 40. ceo-pmg.html — CTA devis par taille de projet
- [ ] 41. cto-pmg.html — Même chose
- [ ] 42. coo-pmg.html — Même chose

### Nouvelles pages à créer
- [ ] 43. portfolio.html — Showcase de TOUS les projets réalisés (30+ sites avec screenshots)
- [ ] 44. formation.html — Redirect ou iframe vers dreamnova-formation-ia.vercel.app
- [ ] 45. temoignages.html — Témoignages clients (Yaakov, Ariel, etc.)
- [ ] 46. equipe.html — David Amore + IA (Nova-Tam, agents)
- [ ] 47. tarifs.html — Grille tarifaire claire (petit/moyen/grand projet)
- [ ] 48. faq.html — Questions fréquentes
- [ ] 49. mentions-legales.html — CGV, CGU, politique de confidentialité
- [ ] 50. success.html — Page après paiement réussi ("Merci, votre projet commence")

### Navigation
- [ ] 51. Menu hamburger mobile avec animation slide
- [ ] 52. Footer avec liens vers tous les sous-domaines
- [ ] 53. Breadcrumb sur chaque page
- [ ] 54. Bouton flottant "Obtenir un devis" sur toutes les pages
- [ ] 55. SEO meta tags + Open Graph pour chaque page

---

## PHASE 4 — CONNEXION ÉCOSYSTÈME (56-75)

### Liens vers sites DreamNova (TOUS)
- [ ] 56. Lien : dreamnova-consult.vercel.app (Agence Consult)
- [ ] 57. Lien : dreamnova-formation-ia.vercel.app (Formation IA)
- [ ] 58. Lien : dreamnova-dashboard.vercel.app (Dashboard)
- [ ] 59. Lien : dreamnova.vercel.app (Nova Keys / NFC)
- [ ] 60. Lien : dreamnova-portfolio.vercel.app (Portfolio)
- [ ] 61. Lien : dreamnova-global-pitch.vercel.app (Pitch investisseurs)
- [ ] 62. Lien : dreamnova-investor-showcase.vercel.app (Showcase investisseurs)
- [ ] 63. Lien : dreamnova-ai-academy.vercel.app (Academy IA)
- [ ] 64. Lien : dreamnova-bc.vercel.app (Business Card)
- [ ] 65. Lien : dreamnova-client-status.vercel.app (Statut clients)

### Liens vers sites clients (portfolio proof)
- [ ] 66. Lien : haesh-sheli-new.vercel.app (Keren Rabbi Yisrael — boutique Breslov)
- [ ] 67. Lien : barukh-sagit-jewelry.vercel.app (Bijoux luxe)
- [ ] 68. Lien : ultime-esther-ifra-breslev.vercel.app (Livres Breslev)
- [ ] 69. Lien : ariel-solar-panels-kavkom.vercel.app (Panneaux solaires)
- [ ] 70. Lien : 555-deploy.vercel.app (Projet Albert)

### Liens vers pitchs & produits
- [ ] 71. Lien : ha-mazon-pitch.vercel.app (Ha-Mazon investisseurs)
- [ ] 72. Lien : terramind-pitch.vercel.app (TerraMind investisseurs)
- [ ] 73. Lien : 03-bgremove-ai.vercel.app (SaaS BgRemove)
- [ ] 74. Lien : 05-invoicewiz.vercel.app (SaaS InvoiceWiz)
- [ ] 75. Lien : 07-chatbot-builder.vercel.app (SaaS ChatBot Builder)

---

## PHASE 5 — PAIEMENTS SUR TOUS LES SITES (76-90)

### Intégrer Stripe DREAM AI partout
- [ ] 76. dreamnova-consult → ajouter bouton paiement (page devis/tarifs)
- [ ] 77. dreamnova-formation-ia → ajouter paiement formation (prix fixe)
- [ ] 78. dreamnova.vercel.app → checkout Nova Keys ($63/$99/$149)
- [ ] 79. barukh-sagit-jewelry → checkout bijoux (ILS)
- [ ] 80. ultime-esther-ifra-breslev → checkout livres (ILS)
- [ ] 81. haesh-sheli-new → vérifier paiements existants (Stripe + PayPal)
- [ ] 82. 03-bgremove-ai → paiement SaaS ($5-15/mo)
- [ ] 83. 05-invoicewiz → paiement SaaS ($9-29/mo)
- [ ] 84. 07-chatbot-builder → paiement SaaS ($29-99/mo)
- [ ] 85. Module paiement universel (PAYMENT_MODULE_UNIVERSAL.html) utilisé partout

### Virement bancaire multi-région partout
- [ ] 86. Ajouter options virement (EUR/ILS/USD/CAD) sur tous les sites clients
- [ ] 87. Coordonnées Airwallex standardisées (copier depuis PAYMENT_ACCOUNTS.md)
- [ ] 88. PayPal (amoredavid46@gmail.com) sur tous les sites
- [ ] 89. Page confirmation paiement unifiée pour tous les sites
- [ ] 90. Tableau de bord paiements sur dreamnova-dashboard (agrège Stripe API)

---

## PHASE 6 — POLISH & LAUNCH (91-100)

### Tests finaux
- [ ] 91. Test Lighthouse sur TOUTES les pages (score > 90)
- [ ] 92. Test mobile sur 3 tailles d'écran minimum
- [ ] 93. Test cross-browser (Chrome, Safari, Firefox)
- [ ] 94. Test du parcours complet : arrivée → devis → paiement → confirmation
- [ ] 95. Test email : formulaire contact → email reçu par David
- [ ] 96. Test Stripe : paiement test → dashboard → webhook → confirmation

### SEO & Analytics
- [ ] 97. Google Analytics 4 sur toutes les pages
- [ ] 98. Meta tags + structured data (Organization, WebSite)
- [ ] 99. Sitemap.xml + robots.txt
- [ ] 100. Soumettre à Google Search Console

---

## ANNEXE — INVENTAIRE COMPLET VERCEL (58 projets)

### Sites DreamNova Core
| # | Projet | URL | Type |
|---|--------|-----|------|
| 1 | dreamnova-bible-site | dreamnova-bible-site.vercel.app | HUB CENTRAL |
| 2 | dreamnova-consult | dreamnova-consult.vercel.app | Agence |
| 3 | dreamnova-formation-ia | dreamnova-formation-ia.vercel.app | Formation |
| 4 | dreamnova-dashboard | dreamnova-dashboard.vercel.app | Dashboard |
| 5 | dreamnova | dreamnova.vercel.app | Nova Keys/NFC |
| 6 | dreamnova-portfolio | dreamnova-portfolio.vercel.app | Portfolio |
| 7 | dreamnova-bc | dreamnova-bc.vercel.app | Business Card |
| 8 | dreamnova-ai-academy | dreamnova-ai-academy.vercel.app | Academy |
| 9 | dreamnova-client-status | dreamnova-client-status.vercel.app | Client Status |
| 10 | dreamnova-client-v2 | dreamnova-client-v2.vercel.app | Client V2 |
| 11 | dreamnova-investor-showcase | dreamnova-investor-showcase.vercel.app | Investors |
| 12 | dreamnova-consult-ai-v3 | dreamnova-consult-ai-v3.vercel.app | Consult V3 |
| 13 | dreamnova-mission-control | dreamnova-mission-control.vercel.app | Mission Control |
| 14 | dreamnova-cluster-config | dreamnova-cluster-config.vercel.app | Config Sync |

### Sites Clients
| # | Projet | URL | Client |
|---|--------|-----|--------|
| 15 | haesh-sheli-new | haesh-sheli-new.vercel.app | Yaakov (Keren) |
| 16 | keren-rabbi-israel-centralized | keren-rabbi-israel-centralized.vercel.app | Yaakov (Keren) |
| 17 | barukh-sagit-jewelry | barukh-sagit-jewelry.vercel.app | Baroukh |
| 18 | barukh-sagit-nextjs | barukh-sagit-nextjs.vercel.app | Baroukh |
| 19 | barukh-sagit-antigravity | barukh-sagit-antigravity-integratio.vercel.app | Baroukh |
| 20 | sagit-video-portfolio | sagit-video-portfolio.vercel.app | Baroukh |
| 21 | ultime-barukh-sagit-jewelry | ultime-barukh-sagit-jewelry.vercel.app | Baroukh |
| 22 | ultime-esther-ifra-breslev | ultime-esther-ifra-breslev.vercel.app | Esther |
| 23 | breslev-esther-ifra | breslev-esther-ifra.vercel.app | Esther |
| 24 | breslev-demo | breslev-demo.vercel.app | Esther |
| 25 | breslev-app | breslev-app.vercel.app | Esther |
| 26 | ariel-solar-panels-kavkom | ariel-solar-panels-kavkom.vercel.app | Ariel |
| 27 | 555-deploy | 555-deploy.vercel.app | Albert |
| 28 | noam-design | noam-design.vercel.app | Meir Agartal |

### Pitchs Investisseurs
| # | Projet | URL | Cible |
|---|--------|-----|-------|
| 29 | dreamnova-global-pitch | dreamnova-global-pitch.vercel.app | DreamNova Global |
| 30 | ha-mazon-pitch | ha-mazon-pitch.vercel.app | Ha-Mazon |
| 31 | terramind-pitch | terramind-pitch.vercel.app | TerraMind |
| 32 | hamazon-investor-showcase | hamazon-investor-showcase.vercel.app | Ha-Mazon |
| 33 | terramind-vitrine | terramind-vitrine.vercel.app | TerraMind |
| 34 | leadgen-pac-2026 | leadgen-pac-2026.vercel.app | LeadGen |
| 35 | acic-proposal-2026 | acic-proposal-2026.vercel.app | ACIC |
| 36 | dreamos-pitch | dreamos-pitch.vercel.app | DreamOS |

### Micro-SaaS Cash Machines
| # | Projet | URL | Revenu cible |
|---|--------|-----|-------------|
| 37 | 01-leaseguard-ai | 01-leaseguard-ai.vercel.app | $5-15/mo |
| 38 | 03-bgremove-ai | 03-bgremove-ai.vercel.app | $5-15/mo |
| 39 | 05-invoicewiz | 05-invoicewiz.vercel.app | $9-29/mo |
| 40 | 07-chatbot-builder | 07-chatbot-builder.vercel.app | $29-99/mo |
| 41 | 10-socialpulse-ai | 10-socialpulse-ai.vercel.app | $5-15/mo |

### Autres
| # | Projet | URL | Type |
|---|--------|-----|------|
| 42 | dreamos | dreamnova.ai | DreamOS Portal |
| 43 | nachman-science-site | nachman-science-site.vercel.app | Torah/Science |
| 44 | session-david | session-david.vercel.app | Session David |
| 45 | nova-key-research | nova-key-research.vercel.app | Research |
| 46 | clinical-trial-screening | clinical-trial-screening.vercel.app | Health |
| 47 | clinical-trial-screening-assistant | clinical-trial-screening-assistant.vercel.app | Health |
| 48 | ran-entertainer | ran-entertainer.vercel.app | Ran Badran |
| 49 | crazy-coffee-site | crazy-coffee-site.vercel.app | Coffee |
| 50 | sports-radar | sports-radar.vercel.app | Sports |
| 51 | coffee-price-tracker | coffee-price-tracker.vercel.app | Coffee |

---

## STRATÉGIE TOKENS (CRITIQUE)

### Règles pour économiser les tokens :
1. **Plan d'abord, exécute ensuite** — jamais d'exploration sans but
2. **Agents parallèles** — 3-5 agents en simultané, chacun 1 tâche précise
3. **Pas de debug verbal** — si ça marche pas en 2 essais, noter et passer
4. **Batch les commits** — 1 push par phase, pas par edit
5. **Réutiliser le code** — PAYMENT_MODULE_UNIVERSAL.html partout
6. **Sonnet uniquement** — Opus seulement pour la planification
7. **Lire avant d'écrire** — toujours vérifier le fichier avant de modifier
8. **Max 30min par tâche** — timer mental, si bloqué → skip

---

*Na Nach Nachma Nachman MeUman — Ein Ye'ush Ba'olam Klal*
