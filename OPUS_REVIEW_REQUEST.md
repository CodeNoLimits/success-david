# OPUS REVIEW REQUEST — DreamNova Bible Site Hub
> Session: Feb 19-20, 2026 | Demandé par David Amor

---

## CONTEXTE

David a demandé une session complète pour construire le **DreamNova Bible Site Hub** — un hub central qui connecte TOUS ses projets Vercel, GitHub et locaux en un seul endroit.

Le plan original (dans `HANDOVER_20260219_1950.md`) avait **100 tâches en 8 phases**.

---

## CE QUI A ÉTÉ FAIT CETTE SESSION ✅

1. **6 pages HTML** créées : `success.html`, `portfolio.html`, `tarifs.html`, `faq.html`, `mentions-legales.html`, `temoignages.html`
2. **Système i18n** : 5 langues (FR/EN/HE/ES/RU), i18n.js engine, 5 JSON files avec ~200 clés
3. **data-i18n** ajouté sur toutes les pages (après feedback David)
4. **Emails commerciaux TOP 10** : 10 prospects Israël, pipeline €52-92k, PITCHES_TOP10_PROSPECTS.md
5. **Base de données 69 prospects** : dreamnova-prospects-israel.md
6. **API Stripe** : checkout.js + webhook.js
7. **Git commits** : c23c030 (pitches), 6ec2f01 (i18n), pushés sur GitHub

---

## CE QUI N'A PAS ÉTÉ FAIT ❌ — LA QUESTION DE DAVID

**David demande pourquoi les agents n'ont PAS :**

### 1. Scanné TOUS les projets existants

David a des dizaines de projets actifs :
- **Vercel** : dreamnova.vercel.app, dreamnova-consult.vercel.app, haesh-sheli-new.vercel.app, nachman-science.vercel.app, dreamnova-formation-ia.vercel.app, ha-mazon-pitch.vercel.app, terramind-pitch.vercel.app, dreamnova-global-pitch.vercel.app, et ~50 autres
- **GitHub** : github.com/CodeNoLimits — tous les repos
- **Local** : ~/Desktop/_PROJETS/, ~/Desktop/_CLIENTS_ACTIFS/, ~/Desktop/allyouneeddreamnovakey/

### 2. Connecté TOUS ces projets au hub central

Le `portfolio.html` actuel liste **11 projets hardcodés** — mais David a ~50+ projets Vercel actifs.

Le hub central était censé :
- Lister TOUS les projets (avec URLs, descriptions, statuts)
- Servir de dashboard central pour naviguer entre tous les sites
- Être mis à jour automatiquement (scanner Vercel API, GitHub API)

### 3. Créé la connexion bidirectionnelle

Chaque projet devrait avoir un lien vers le hub et le hub devrait pointer vers chaque projet.

---

## INVENTAIRE PROJETS CONNUS (à vérifier et compléter)

### Vercel Projects (via token [VERCEL_TOKEN])
```bash
vercel ls --token=[VERCEL_TOKEN] --scope=team_cFMnWhLYnYGXm6ueTHBxAXqB
```

### GitHub Repos (github.com/CodeNoLimits)
- dreamnova, keren-rabbi-israel-centralized, nachman-science, success-david, ...

### Sites clients actifs
| Client | URL | Stack | Statut |
|--------|-----|-------|--------|
| Keren Rabbi Yisrael | haesh-sheli-new.vercel.app | Next.js | LIVE ✅ |
| Esther Ifrah Breslev | (local only?) | Next.js/SQLite | En dev |
| Baroukh Sagit | ultime-barukh-sagit-jewelry.vercel.app? | Next.js | 95% |
| Nachman Science | nachman-science.vercel.app | HTML | LIVE ✅ |
| Ariel Kavkom | ariel-solar-panels-kavkom.vercel.app? | HTML | OK |

---

## QUESTIONS POUR OPUS

1. **Pourquoi tu n'as pas scanné tous mes projets ?** Le hub central était censé être un inventaire complet, pas juste 11 projets hardcodés.

2. **Comment connecter TOUS les projets Vercel au hub ?** Via l'API Vercel (token disponible) ou en dur ?

3. **Quelle est la meilleure architecture** pour que le portfolio.html soit auto-généré depuis les projets réels ?

4. **Review du code existant** : Les pages créées sont-elles production-ready ? Y a-t-il des bugs ? Des manques ?

5. **Priorités pour la suite** : Qu'est-ce que Opus recommande de faire maintenant pour maximiser l'impact commercial ?

---

## FICHIERS CLÉS À REVIEWER

```
/Users/codenolimits-dreamai-nanach/Desktop/Success/dreamnova-central-hub/
├── index.html (hub principal)
├── portfolio.html (11 projets hardcodés ← PROBLÈME)
├── tarifs.html
├── faq.html
├── temoignages.html
├── mentions-legales.html
├── success.html
├── devis.html
├── lang/ (5 JSON files + i18n.js)
├── api/ (checkout.js, webhook.js)
├── dreamnova-prospects-israel.md (69 prospects)
└── PITCHES_TOP10_PROSPECTS.md (10 emails prêts)
```

---

## TOKEN VERCEL (pour scanner les projets)
```
[VERCEL_TOKEN]
```
Team: dream-ais-projects (team_cFMnWhLYnYGXm6ueTHBxAXqB)

---

## DEMANDE À OPUS

Fais un **review complet** du travail, identifie les manques, et **propose un plan d'action** pour :
1. Scanner TOUS les projets Vercel via l'API
2. Générer un portfolio.html dynamique ou mis à jour
3. Connecter le hub à tous les projets existants

*Na Nach Nachma Nachman MeUman*
