# Bons cadeaux : prévisualisation non publiée

Cette branche prépare le formulaire d'achat, séparé de la page de réservation existante.

## Déjà réalisé dans cette PR
- Catalogue et sélection de massages, durées, occasions disponibles, dédicace et destinataire.
- Vérification de l'email en deux champs puis code de confirmation à 6 chiffres.
- Sélecteur international du téléphone avec libphonenumber-js.
- Acceptation des CGV, pages distinctes de vente et de confidentialité.
- Page de confirmation de retour Stripe, sans affirmation non vérifiée de paiement.
- Adaptateur de test vers Firebase pour les tarifs et Stripe Checkout.
- Contrôles automatiques du JavaScript et des liens juridiques.

## Backend en préparation
PR #46 du dépôt privé serenity-relax-gestion-patients : prix recalculés côté serveur, Stripe test Checkout, webhook signé, voucher Firestore, paiement comptable unique, PDF avec les visuels du cabinet, email transactionnel et renvoi par admin.

## Sécurité
`bons-cadeaux/test-config.js` reste sur `enabled: false`. Le bouton de paiement demeure désactivé tant que les secrets de test, l'envoi SMTP, les CGV définitives et les tests de bout en bout ne sont pas validés. Les identifiants Stripe et SMTP ne doivent jamais être placés dans les fichiers publics.

## Travaux bloquants avant lancement
1. Définir les secrets Stripe **de test uniquement** et les secrets SMTP côté Firebase Functions.
2. Déployer les fonctions de test dans un environnement Firebase isolé, sans connecter les ventes réelles.
3. Tester email OTP, Checkout Stripe test, webhook signé, génération et livraison PDF, renvoi et lien au rendez-vous.
4. Approuver visuellement les PDF, les CGV et la confidentialité avec un avocat genevois.
5. Valider les traductions, le mobile et les contrôles anti-abus, puis décider séparément de la publication.

La période conseillée d'utilisation des nouveaux bons cadeaux est de **12 mois**. Aucun code de cette branche n'est publié en production.
