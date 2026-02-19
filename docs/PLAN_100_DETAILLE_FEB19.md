# PLAN 100 TACHES DETAILLEES — Bible Site Hub Central
## [NOVA:20260219-2130]
## Pour execution par agents Sonnet en parallele
## Langues cibles: FR, EN, HE, ES, RU

---

## PHASE 1 — DOMAINE & INFRASTRUCTURE (1-10)

### 1. Acheter domaine dreamnova.dev
- **Action**: Aller sur porkbun.com → chercher dreamnova.dev → acheter ($5.88/an)
- **Responsable**: David (carte credit)
- **Temps**: 5 min
- **Resultat**: Domaine enregistre, accès panel DNS

### 2. Configurer DNS dreamnova.dev → Vercel
- **Action**: Dans le panel Porkbun, ajouter: A record → 76.76.21.21, CNAME www → cname.vercel-dns.com
- **Commande**: `vercel domains add dreamnova.dev --token=[REDACTED_VERCEL_TOKEN]`
- **Resultat**: dreamnova.dev pointe vers dreamnova-bible-site.vercel.app

### 3. Configurer sous-domaines
- **Action**: Creer CNAME pour: consult.dreamnova.dev → dreamnova-consult.vercel.app, formation.dreamnova.dev → dreamnova-formation-ia.vercel.app, dashboard.dreamnova.dev → dreamnova-dashboard.vercel.app, keys.dreamnova.dev → dreamnova.vercel.app
- **Resultat**: Tous les services accessibles via sous-domaines pro

### 4. SSL/HTTPS automatique
- **Action**: Vercel gere automatiquement Let's Encrypt. Verifier apres ajout domaine.
- **Test**: `curl -sI https://dreamnova.dev | head -5`
- **Resultat**: HTTPS valide sur tous les sous-domaines

### 5. Deploy Vercel (API checkout + redesign)
- **Action**: `cd ~/Desktop/_PROJETS/DREAMNOVA/dreamnova-bible-site && vercel deploy --prod --yes --token=vcp_...`
- **Pre-requis**: Rate limit Vercel reset (attendre 3h depuis dernier block)
- **Resultat**: api/checkout.js deploye, Stripe dynamic checkout fonctionnel

### 6. Tester API Stripe checkout
- **Action**: `curl -X POST https://dreamnova-bible-site.vercel.app/api/checkout -H "Content-Type: application/json" -d '{"amount":100,"description":"Test Devis"}'`
- **Resultat attendu**: JSON avec `{"url":"https://checkout.stripe.com/..."}`

### 7. Ajouter webhook Stripe
- **Action**: Creer `api/webhook.js` dans le repo. Configurer endpoint sur dashboard.stripe.com → `https://dreamnova.dev/api/webhook`
- **Code**: Verifier signature stripe, ecouter `checkout.session.completed`, envoyer email confirmation
- **Resultat**: Notification automatique apres chaque paiement

### 8. Email confirmation post-paiement
- **Action**: Creer template email simple (Resend ou FormSubmit). Contenu: "Merci pour votre acompte de X€. Ref: DN-XXXX. Prochaine etape: lancement du projet."
- **Resultat**: Client recoit confirmation automatique

### 9. Notification Telegram post-devis
- **Action**: Ajouter appel `openclaw message send --channel telegram --target 7269582214 --message "DEVIS RECU: ${ref} - ${montant}€ de ${email}"` dans le handler FormSubmit success
- **Resultat**: David recoit notification Telegram instantanee quand un devis arrive

### 10. GitHub Pages fallback
- **Action**: Activer GitHub Pages sur le repo (Settings → Pages → main branch). URL: codenolimits.github.io/dreamnova-bible-site
- **Resultat**: CDN backup si Vercel down

---

## PHASE 2 — REDESIGN PREMIUM + FONCTIONNALITES (11-25)

### 11. Verifier wizard 6 etapes fonctionne
- **Action**: Tester manuellement: Type → Features → Urgence → Contact → Contrat → Paiement. Chaque etape doit s'afficher correctement avec le nouveau CSS glassmorphism.
- **Outils**: Screenshot via Playwright ou navigateur
- **Resultat**: 6/6 etapes fonctionnelles

### 12. Tester selection 8 types de projet
- **Action**: Cliquer chaque type (Site vitrine, E-commerce, SaaS, Application mobile, Dashboard, API, PWA, Custom). Verifier que le prix de base change correctement.
- **Resultat**: 8/8 types selectionnables, prix correct

### 13. Tester 14 features (toggle + prix dynamique)
- **Action**: Toggle chaque feature. Verifier que le prix total se recalcule en temps reel.
- **Resultat**: 14/14 features fonctionnelles, prix dynamique correct

### 14. Tester 4 niveaux urgence
- **Action**: Selectionner Standard (14j), Rapide (10j), Urgent (7j), Express (3j). Verifier delai + coefficient multiplicateur prix.
- **Resultat**: 4/4 niveaux corrects

### 15. Verifier calcul prix total + acompte 40%
- **Action**: Configurer un devis complet. Verifier: prix total = base + features × urgence. Acompte = 40% du total. Solde = 60%.
- **Resultat**: Calcul mathematiquement correct

### 16. Tester generation PDF devis
- **Action**: Soumettre un devis complet. Verifier que le PDF se genere avec ref DN-XXXX, details du projet, prix, conditions.
- **Resultat**: PDF professionnel telecharge

### 17. Tester signature electronique CGV
- **Action**: Etape 5 du wizard. Verifier que la checkbox CGV fonctionne, que le canvas signature s'affiche, et que la signature est enregistree.
- **Resultat**: Signature capturee et stockee

### 18. Tester paiement Stripe (montant exact)
- **Action**: Completer un devis. Cliquer "Payer par carte". Verifier que le montant Stripe = acompte 40% exact du devis.
- **Resultat**: Redirect vers Stripe Checkout avec le bon montant

### 19. Tester paiement PayPal
- **Action**: Cliquer sur lien PayPal. Verifier que le montant pre-rempli correspond au devis.
- **Resultat**: PayPal.me ouvre avec le bon montant

### 20. Tester virement multi-region (4 regions)
- **Action**: Tester les 4 boutons (EUR, ILS, USD, CAD). Verifier que chaque region affiche les bonnes coordonnees bancaires Airwallex. Tester le bouton copier IBAN.
- **Resultat**: 4 regions fonctionnelles, copie IBAN ok

### 21. Ajouter fade-in au scroll (IntersectionObserver)
- **Action**: Ajouter observer sur chaque section `.section` de toutes les pages. Classes: `.fade-in-up` avec translateY(30px) → 0 + opacity 0 → 1.
- **Resultat**: Animations fluides au scroll sur toutes les pages

### 22. Micro-animations boutons
- **Action**: Ajouter hover scale(1.02), active scale(0.98), transition 0.2s, loading spinner sur les boutons d'action.
- **Resultat**: Boutons reactifs et professionnels

### 23. Progress bar animee wizard
- **Action**: Ajouter glow effect (box-shadow gold pulse) sur l'etape active de la progress bar. Animation CSS keyframes.
- **Resultat**: Progress bar visuellement premium

### 24. Page success.html post-paiement
- **Action**: Creer success.html avec animation confetti, message "Merci! Votre projet demarre", resume du devis, prochaines etapes, contact.
- **Resultat**: Page de confirmation professionnelle

### 25. Lighthouse Performance > 90
- **Action**: Auditer toutes les pages. Optimiser: images WebP, CSS critique inline, fonts preload, defer JS non-critique.
- **Resultat**: Score > 90 sur toutes les pages

---

## PHASE 3 — MULTI-LANGUES (26-35)

### 26. Architecture i18n (sans framework)
- **Action**: Creer un objet `translations` JS avec clés pour chaque texte. Fonction `setLang(lang)` qui remplace tous les `data-i18n` elements. Langues: fr, en, he, es, ru.
- **Fichier**: `i18n.js` — charge `lang/{fr,en,he,es,ru}.json`
- **Resultat**: Systeme i18n leger, sans dependance

### 27. Traduction francais (FR) — langue par defaut
- **Action**: Extraire tous les textes du site dans `lang/fr.json`. C'est la reference.
- **Resultat**: 100% des textes extraits

### 28. Traduction anglais (EN)
- **Action**: Traduire fr.json → en.json. Ton professionnel, marketing-oriented.
- **Resultat**: Site complet en anglais

### 29. Traduction hebreu (HE)
- **Action**: Traduire fr.json → he.json. Ajouter `dir="rtl"` quand lang=he. Adapter CSS pour RTL.
- **Resultat**: Site complet en hebreu avec RTL parfait

### 30. Traduction espagnol (ES)
- **Action**: Traduire fr.json → es.json. Espagnol international (pas specifique a un pays).
- **Resultat**: Site complet en espagnol

### 31. Traduction russe (RU)
- **Action**: Traduire fr.json → ru.json. Utiliser translittérations adaptees.
- **Resultat**: Site complet en russe

### 32. Selecteur de langue (UI)
- **Action**: Ajouter un dropdown/flags dans le header. Drapeaux: FR, GB, IL, ES, RU. Sauvegarder la pref dans localStorage.
- **Resultat**: Utilisateur peut changer de langue instantanement

### 33. RTL/LTR dynamique
- **Action**: Quand lang=he, document.dir="rtl", ajuster les flex-direction, margins, paddings. Quand autre langue, dir="ltr".
- **Resultat**: Layout parfait en RTL et LTR

### 34. SEO multi-langue (hreflang)
- **Action**: Ajouter `<link rel="alternate" hreflang="fr" href="...">` pour chaque langue dans le `<head>` de chaque page.
- **Resultat**: Google indexe chaque version linguistique

### 35. Tester les 5 langues
- **Action**: Switcher entre les 5 langues sur chaque page. Verifier que TOUS les textes sont traduits, que le layout ne casse pas, que RTL fonctionne.
- **Resultat**: 5/5 langues parfaites sur toutes les pages

---

## PHASE 4 — PAGES DU HUB (36-50)

### 36. Refondre index.html — Hero premium
- **Action**: Hero section avec headline percutant, stats impressionnantes (30+ projets, 7 clients, 58 sites), CTA vers devis. Comparatif concurrence en dessous. Sections: Services, Portfolio, Temoignages, Pricing, Contact.
- **Resultat**: Landing page qui convertit

### 37. Ameliorer ceo-global.html
- **Action**: Ajouter CTA "Obtenir un devis" dans chaque section. Lier aux services concrets du devis.
- **Resultat**: Page CEO avec conversion integree

### 38. Ameliorer cto-global.html
- **Action**: Idem — CTA devis dans chaque section technique.
- **Resultat**: Page CTO avec conversion

### 39. Ameliorer coo-global.html
- **Action**: Idem — CTA devis dans chaque section operationnelle.
- **Resultat**: Page COO avec conversion

### 40. Ameliorer ceo-pmg.html, cto-pmg.html, coo-pmg.html
- **Action**: Ajouter CTA devis par taille de projet (Petit €500-2K, Moyen €2-10K, Grand €10-50K).
- **Resultat**: 3 pages PMG avec pricing clair

### 41. Creer portfolio.html
- **Action**: Showcase de TOUS les projets realises. Grid responsive avec screenshots, nom du client, type de projet, lien live. Organise par categorie (Clients, SaaS, Torah, Pitchs).
- **Resultat**: Portfolio impressionnant de 30+ projets

### 42. Creer formation.html
- **Action**: Page relais vers dreamnova-formation-ia.vercel.app. Programme, prix, inscription, temoignages.
- **Resultat**: Formations accessibles depuis le hub

### 43. Creer temoignages.html
- **Action**: Temoignages clients: Yaakov (Keren), Ariel (Kavkom), etc. Format: photo, nom, projet, citation, note.
- **Resultat**: Social proof credible

### 44. Creer equipe.html
- **Action**: David Amore (fondateur, CEO) + Nova-Tam (IA CTO) + agents (COO, DevOps, etc.). Design pro.
- **Resultat**: Page equipe professionnelle

### 45. Creer tarifs.html
- **Action**: Grille tarifaire claire: Petit projet (€500-2K, 1-2 semaines), Moyen (€2-10K, 2-6 semaines), Grand (€10-50K, 1-3 mois), Custom. CTA devis pour chaque.
- **Resultat**: Pricing transparent, conversion optimisee

### 46. Creer faq.html
- **Action**: 15-20 questions frequentes: processus, delais, paiement, technologies, maintenance, etc.
- **Resultat**: FAQ complete pour reduire friction

### 47. Creer mentions-legales.html
- **Action**: CGV, CGU, politique de confidentialite, RGPD, cookies. Adapte au droit canadien/israelien.
- **Resultat**: Conformite legale

### 48. Menu hamburger mobile
- **Action**: Menu mobile avec animation slide-in. Liens vers toutes les pages + selecteur langue + bouton devis.
- **Resultat**: Navigation mobile premium

### 49. Footer complet
- **Action**: Liens vers tous les sous-domaines, pages legales, reseaux sociaux, contact. Design coherent.
- **Resultat**: Footer professionnel

### 50. Bouton flottant "Obtenir un devis"
- **Action**: Bouton fixe en bas a droite (position: fixed), apparait apres scroll 300px, anime pulse subtil, lien vers devis.html.
- **Resultat**: CTA toujours visible

---

## PHASE 5 — CONNEXION ECOSYSTEME (51-65)

### 51-60. Lier les 10 sites DreamNova Core
- **Action par site**: Ajouter lien dans le footer, page portfolio, et page appropriee du hub. Verifier que chaque site est accessible. Ajouter badge "DreamNova" sur chaque site.
- **Sites**: consult, formation, dashboard, keys, portfolio, global-pitch, investor-showcase, academy, bc, client-status
- **Resultat**: 10 sites lies birectionnellement

### 61-65. Lier les 5 sites clients au portfolio
- **Action**: Ajouter dans portfolio.html avec screenshot, description, tech stack, lien live.
- **Sites**: haesh-sheli-new (Keren), barukh-sagit-jewelry, ultime-esther-ifra-breslev, ariel-solar-panels-kavkom, 555-deploy (Albert)
- **Resultat**: Portfolio client complet

---

## PHASE 6 — PAIEMENTS SUR TOUS LES SITES (66-80)

### 66. Module paiement universel
- **Action**: Finaliser PAYMENT_MODULE_UNIVERSAL.html. 3 methodes: Stripe (PK DREAM AI), PayPal (amoredavid46@gmail.com), Virement multi-region.
- **Resultat**: Module drop-in reutilisable

### 67-71. Integrer paiement sur 5 sites DreamNova
- **Action**: Copier le module dans: dreamnova-consult (tarifs page), dreamnova-formation-ia (inscription), dreamnova.vercel.app (checkout Nova Keys), dreamnova-bc (commande), dreamnova-ai-academy (inscription)
- **Resultat**: 5 sites avec paiement integre

### 72-74. Integrer paiement sur 3 SaaS prioritaires
- **Action**: #03 BgRemove ($5-15/mo subscription), #05 InvoiceWiz ($9-29/mo), #07 ChatBot Builder ($29-99/mo). Migrer LemonSqueezy → Stripe DREAM AI.
- **Resultat**: 3 SaaS avec paiement Stripe

### 75-77. Integrer paiement sur 3 sites clients
- **Action**: barukh-sagit-jewelry (checkout bijoux ILS), ultime-esther-ifra-breslev (livres ILS), haesh-sheli-new (verifier existant)
- **Resultat**: 3 sites clients avec paiement

### 78. Payment Links page sur le hub
- **Action**: Creer section sur index.html ou page dediee avec tous les liens de paiement directs par produit/service.
- **Resultat**: Page centralisee de paiement

### 79. Dashboard paiements
- **Action**: Sur dreamnova-dashboard, ajouter section agregant les donnees Stripe API (ventes, montants, clients).
- **Resultat**: Vue centralisee des revenus

### 80. Configuration IBAN francais
- **Action**: Suivre le plan IBAN_FRANCAIS_RESEARCH_FEB19.md. Etape 1: Email Narvi. Etape 2: Wise BE IBAN. Etape 3: SAS francaise si besoin.
- **Resultat**: IBAN FR operationnel

---

## PHASE 7 — MARKETING & STRATEGIE (81-90)

### 81. SEO meta tags sur toutes les pages
- **Action**: Unique `<title>`, `<meta description>`, Open Graph (og:title, og:description, og:image) pour chaque page. Structured data (Organization, WebSite).
- **Resultat**: SEO optimise

### 82. Google Analytics 4
- **Action**: Ajouter GA4 tag (gtag.js) sur toutes les pages. Configurer events: devis_submitted, payment_started, language_changed.
- **Resultat**: Tracking complet

### 83. Sitemap.xml + robots.txt
- **Action**: Generer sitemap.xml listant toutes les pages (toutes langues). robots.txt permettant tout.
- **Resultat**: Fichiers SEO en place

### 84. Google Search Console
- **Action**: Soumettre dreamnova.dev a Google Search Console. Verifier propriete. Soumettre sitemap.
- **Resultat**: Indexation Google demandee

### 85. Automatisation posts sociaux
- **Action**: Utiliser Remotion (~/Desktop/dreamnova-tiktok-videos/) pour generer videos. Scheduler via cron/MemuBot.
- **Platforms**: TikTok, Instagram Reels, LinkedIn, YouTube Shorts
- **Resultat**: Pipeline contenu automatise

### 86. Email marketing setup
- **Action**: Configurer Brevo (guide existant ~/Desktop/dreamnova-cluster-config/BREVO_SETUP_GUIDE_COMPLETE.md). Importer contacts. Creer sequence welcome.
- **Resultat**: Email marketing operationnel

### 87. Landing pages par service
- **Action**: Creer landing specifique pour chaque service a fort revenue: Consulting IA, Formation IA, ChatBot Builder, Nova Keys.
- **Resultat**: 4 landing pages optimisees conversion

### 88. Etude de marche concurrence
- **Action**: Analyser 5 concurrents directs (agences IA francaises + israeliennes). Prix, services, positionnement. Identifier avantages competitifs DreamNova.
- **Resultat**: Document strategie concurrentielle

### 89. Pitch deck actualise
- **Action**: Mettre a jour dreamnova-global-pitch avec les derniers chiffres (58 projets, 7 clients, prix, demo live).
- **Resultat**: Pitch pret pour investisseurs

### 90. Campagne investisseurs
- **Action**: Reprendre le Funding Swarm (40 emails draftes). Envoyer batch 1-4 (20 emails). Suivre dans le tracking CSV.
- **Resultat**: Premiers contacts investisseurs lances

---

## PHASE 8 — TESTS & POLISH (91-100)

### 91. Lighthouse toutes les pages > 90
- **Action**: Auditer: index, devis, portfolio, tarifs, equipe, temoignages, faq, mentions-legales, success, toutes les C-suite pages. Corriger les issues.
- **Resultat**: Score > 90 partout

### 92. Test mobile (375px, 414px, 768px)
- **Action**: Tester sur 3 tailles minimum. Verifier navigation hamburger, wizard devis, formulaires, paiement.
- **Resultat**: Responsive parfait

### 93. Test cross-browser (Chrome, Safari, Firefox)
- **Action**: Verifier rendu sur les 3 navigateurs. Focus sur backdrop-filter (glassmorphism) et animations CSS.
- **Resultat**: Compatible partout

### 94. Test parcours complet
- **Action**: Simuler un client: arrivee index → navigation → devis → selection type/features/urgence → contact → contrat → paiement → confirmation.
- **Resultat**: Parcours fluide de bout en bout

### 95. Test email FormSubmit
- **Action**: Soumettre 3 devis tests. Verifier reception email David. Verifier notification Telegram.
- **Resultat**: Emails recus, notifs Telegram fonctionnelles

### 96. Test Stripe end-to-end
- **Action**: Test avec carte test (4242...). Verifier: montant exact, webhook recu, email confirmation, dashboard Stripe.
- **Resultat**: Pipeline paiement valide

### 97. Archiver les duplicats
- **Action**: Identifier les 20+ duplicats (voir INVENTAIRE_COMPLET). Compresser en .tar.gz. Deplacer dans ~/Desktop/_ARCHIVES/. Liberer ~25 GB.
- **Resultat**: Mac propre, espace recupere

### 98. Deploiement final production
- **Action**: `vercel deploy --prod` avec domaine dreamnova.dev. Verifier toutes les routes, API, redirects.
- **Resultat**: Site live sur dreamnova.dev

### 99. Monitoring & alertes
- **Action**: Ajouter check periodique via heartbeat.sh (toutes les 5min): curl dreamnova.dev → si != 200, alert Telegram.
- **Resultat**: Monitoring automatique

### 100. Documentation finale + handover
- **Action**: Creer README.md complet du projet, DEPLOYMENT.md, ARCHITECTURE.md. Mettre a jour SESSION_LIVE.md.
- **Resultat**: Projet 100% documente, pret pour maintenance continue

---

## STRATEGIE TOKENS (pour agents Sonnet)

1. **Agents paralleles**: Lancer 3-5 agents simultanes, chacun 1 phase
2. **Batch commits**: 1 push par phase (pas par fichier)
3. **Lire avant ecrire**: Toujours verifier l'etat avant de modifier
4. **Max 30min par tache**: Si bloque → noter et passer
5. **Reutiliser**: PAYMENT_MODULE_UNIVERSAL.html, i18n.js, CSS commun
6. **Pas de debug verbal**: Si ca marche pas en 2 essais → skip + noter

## ESTIMATION TEMPS
- Phase 1 (Infra): 2h
- Phase 2 (Redesign): 3h
- Phase 3 (Langues): 2h
- Phase 4 (Pages): 4h
- Phase 5 (Ecosysteme): 2h
- Phase 6 (Paiements): 3h
- Phase 7 (Marketing): 3h
- Phase 8 (Tests): 2h
- **TOTAL: ~21h de travail agent**

---

*Na Nach Nachma Nachman MeUman — Ein Ye'ush Ba'olam Klal*
