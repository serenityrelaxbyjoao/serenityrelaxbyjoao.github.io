# Parcours Bons cadeaux (aperçu isolé)

Cette branche introduit une page **non publiée** `/bons-cadeaux/` sans paiement fonctionnel et sans collecte persistante de données.

## Fonctions actuellement visibles
- Catalogue des neuf prestations et de leurs durées (prix CHF habituels).
- Black Friday à 90 CHF pour toutes les prestations de 90 minutes. Le drainage ne propose que 60 minutes : il est donc exclu.
- Lien de présélection envisagé : `/bons-cadeaux/?offre=black-friday`.
- Choix indépendant de l'offre commerciale et du graphisme du bon.
- Personnalisation immédiate ou ultérieure, dédicace suggérée, libre ou absente.
- Email saisi deux fois, erreur si divergence.
- Récapitulatif de prix et aperçu textuel du voucher.
- Le bouton de paiement reste **désactivé**.

## Ne pas commercialiser avant les éléments suivants
1. Une source de vérité unique et serveur pour les prestations / prix / disponibilité des promotions (Firestore ou autre solution validée), supprimer le tableau JS dupliqué dans ce prototype.
2. Une fonction serveur Stripe Checkout qui vérifie le tarif et une confirmation de paiement webhook authentifiée.
3. Un contrôle d'identité de l'email par code ou lien; double saisie seule insuffisante.
4. Sélecteur mondial des indicatifs et vérification de numéros avec `libphonenumber-js`; les quelques pays de la page ne sont que des exemples en attendant cette intégration.
5. Enregistrement sécurisé des commandes, génération et livraison du PDF, statuts d'envoi, récupération / renvoi.
6. Conditions de vente approuvées et acceptation explicite, respect de la protection des données.
7. Tests d'intégration, affichage mobile, accessibilité, conformité aux six langues du site.
8. Contrôle de l'offre Black Friday avec dates configurables côté serveur.
9. **Ne pas utiliser l'actuel lien Stripe autonome en tant que chemin de paiement public**, car il ne lie pas la commande au voucher.

## Précautions
Ne pas fusionner ou publier la branche en l'état. Ne pas modifier le système de réservation existant. Éviter les changements simultanés de ces fichiers par plusieurs assistants.

Ce prototype est volontairement conçu pour pouvoir être remplacé par une page connectée à la même API tarifaire que Gestion de Cabinet.
