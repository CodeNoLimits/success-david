# SETUP_PAYMENTS.md — DreamNova Bible Site

## État actuel (post-déploiement)
- Contrat CGV : LIVE (HTML dans devis.html, aucune dépendance externe)
- Virement bancaire : LIVE (mailto: configuré)
- PayPal : LIVE (lien https://paypal.me/DreamNovaJerusalem)
- Stripe : PLACEHOLDER (voir ci-dessous)
- Formspree : PLACEHOLDER (voir ci-dessous)
- API /api/contact : DÉPLOYÉE (nécessite RESEND_API_KEY)

---

## 1. Stripe — Créer un Payment Link

1. Connectez-vous sur https://dashboard.stripe.com (compte admin@holyrentals.com)
2. Menu gauche : Products → Payment Links → + New
3. Créez un produit "DreamNova Acompte" — prix variable (custom amount)
4. Copiez le lien généré (format: https://buy.stripe.com/XXXXXXXX)
5. Dans devis.html, ligne 1 du script, remplacez :
   ```javascript
   const STRIPE_PAYMENT_LINK = 'https://stripe.com'; // PLACEHOLDER
   ```
   par :
   ```javascript
   const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/VOTRE_LIEN_ICI';
   ```
6. `git add devis.html && git commit -m "feat: stripe payment link configured" && git push`
7. Redéployer sur Vercel (auto si GitHub connecté)

---

## 2. Formspree — Configurer le formulaire de contact

1. Allez sur https://formspree.io
2. Connectez-vous avec dreamnovaultimate@gmail.com
3. Créez un nouveau formulaire "DreamNova Devis"
4. Copiez l'ID du formulaire (format: xpznzwby)
5. Dans devis.html, trouvez cette ligne :
   ```html
   <form id="contact-form" ... action="https://formspree.io/f/FORMSPREE_ID"
   ```
   Remplacez `FORMSPREE_ID` par votre ID réel, ex: `xpznzwby`
6. `git add devis.html && git commit -m "feat: formspree contact configured" && git push`

---

## 3. Resend — Configurer l'email via API /api/contact

L'API serverless /api/contact.js envoie les emails via Resend.

1. Allez sur https://resend.com (inscrivez-vous avec dreamnovaultimate@gmail.com)
2. Créez une API Key : Settings → API Keys → Add API Key
3. Copiez la clé (format: re_XXXXXXXXXXXXXXXX)
4. Allez sur Vercel : https://vercel.com/dream-ais-projects/dreamnova-bible-site/settings/environment-variables
5. Ajoutez : `RESEND_API_KEY` = votre clé Resend
6. Redéployez (ou attendez le prochain deploy)

Note : Pour que l'email "from" fonctionne, il faut vérifier le domaine dreamnova.vercel.app
OU utiliser l'adresse Resend par défaut : from: 'onboarding@resend.dev'

---

## 4. PayPal — Créer le compte DreamNovaJerusalem

1. Allez sur https://paypal.com
2. Créez un compte avec dreamnovaultimate@gmail.com
3. Dans le profil : PayPal.Me → Personnalisez l'URL → DreamNovaJerusalem
4. URL finale : https://paypal.me/DreamNovaJerusalem (déjà configuré dans devis.html)

---

## Architecture de paiement

```
Client remplit devis.html
    ↓
Etape 5: Signe les CGV (checkbox + nom = signature électronique)
    ↓
Etape 6: Choisit mode paiement
    ├── Virement → mailto: dreamnovaultimate@gmail.com (objet auto-rempli)
    ├── Stripe → Payment Link (à configurer)
    └── PayPal → paypal.me/DreamNovaJerusalem
    
    + Formulaire contact → Formspree (email direct)
    + API /api/contact → Resend (email HTML branded)
```

---

## Checklist rapide (5 min par item)

- [ ] Stripe Payment Link créé et configuré dans devis.html
- [ ] Formspree ID configuré dans devis.html
- [ ] Compte Resend créé + RESEND_API_KEY sur Vercel
- [ ] Compte PayPal créé avec URL DreamNovaJerusalem
- [ ] Test end-to-end : remplir devis → signer CGV → tester les 3 paiements

---

Na Nach Nachman MeUman — Ein Ye'ush Ba'olam Klal
