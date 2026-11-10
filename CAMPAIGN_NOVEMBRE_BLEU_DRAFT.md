# Campagne mensuelle — Novembre Bleu 2026 (BROUILLON)

**Ne pas publier avant activation côté Google Apps Script.**

## Offre
- Intitulé: Offre du mois — Novembre Bleu 2026
- 90 minutes de massage au prix de 60 minutes.
- Prix total: **110 CHF** (tarif habituel de 90 minutes: 150 CHF).
- Séances ouvertes à tous les patients, nouveaux et habitués, réservations multiples autorisées.
- Séances du 10 au 30 novembre 2026 inclus, heure Europe/Zurich. Après la date limite, masquer le bloc et rendre la prestation non réservable.
- Non cumulable avec d'autres promotions. Le code de parrainage ne doit pas réduire le tarif davantage.
- Sensibilisation à la santé masculine, sans partenariat revendiqué avec Movember.
- Pas de formulation « 30 minutes offertes » dans les éléments marketing.
- URL cible, **après activation backend**: https://serenityrelaxbyjoao.ch/reservation/?lang=fr&service=offre-du-mois

## Bloqueur technique
Le projet Google Apps Script utilisé par le formulaire n'est pas représenté intégralement par `apps-script-native-api.gs`. Ce fichier est un pont vers des fonctions absentes du repo:
`getConfiguration()`, `getAvailability(input)`, `bookAppointment(input)`.
Pour permettre la publication, le script réellement déployé doit:
1. Ajouter service id stable `offre-du-mois` à `getConfiguration().services`, options `[{minutes:90, price:110}]` et traductions.
2. Valider dans `getAvailability` et `bookAppointment` les 90 minutes, 110 CHF, dates valides et conflits d'agenda côté serveur. Ne jamais faire confiance au seul frontend.
3. Vérifier les autres réductions (pas de cumul), plusieurs réservations du même patient permises.
4. Faire figurer 110 CHF et 90 minutes sur la confirmation et dans la fiche rendez-vous.
5. Tester sans créer de vrais rendez-vous ni envoyer de vrais messages aux patients.
6. Retirer la prestation au-delà du 30 novembre; pour les campagnes suivantes, modifier période et communication.

## Publication
- Ne pas fusionner ce pull request tant que le service n'existe pas.
- Les six pages d'accueil préparent le visuel et le lien de réservation direct via `data-book="offre-du-mois"` (script app.js réécrit les `href` selon cet attribut).
- Visuel: bleu profond, photo de cabinet présente sur le site. Illustration sociale bleue originale créée séparément dans la conversation.
- Après test et validation: fusionner, puis publier sur Facebook, Instagram, Instagram Story, et fiche Google Business.
- Instagram publication: lien en bio; Instagram Story: sticker de lien. Facebook et Google: lien vers l'offre après activation.

## Texte Facebook et Instagram (FR)
**NOVEMBRE BLEU | SENSIBILISATION À LA SANTÉ MASCULINE**

Prendre soin de soi, c'est aussi prendre soin de sa santé.

Ce mois-ci chez Serenity & Relax by João, profitez de **90 minutes de massage au prix de 60 minutes : 110 CHF au lieu de 150 CHF**.

Massage relaxant, sportif ou thérapeutique, selon vos besoins. Offre ouverte à toutes et à tous, nouveaux patients et habitués. Réservations multiples possibles jusqu'au 30 novembre 2026, selon les disponibilités.

Cabinet à Cointrin, Genève. Réservez votre séance depuis le lien dans notre bio (Instagram), ou via notre site.

Le massage favorise la détente et le bien-être, sans remplacer le dépistage ou le suivi médical.

## Texte Google Business (FR)
**Novembre Bleu : 90 minutes de massage au prix de 60 minutes.**
À l'occasion du mois de sensibilisation à la santé masculine, prenez du temps pour vous. Profitez d'une séance de 90 minutes à **110 CHF au lieu de 150 CHF**, au cabinet Serenity & Relax by João à Cointrin, Genève. Offre ouverte à toutes et à tous, réservations multiples possibles, jusqu'au 30 novembre 2026 selon disponibilités. Réservez en ligne. Le massage ne remplace pas un suivi médical.

## Texte court Story
**NOVEMBRE BLEU**
90 minutes de massage au prix de 60 minutes
**110 CHF** au lieu de 150 CHF
Ouvert à toutes et à tous · jusqu'au 30 novembre
**RÉSERVER**
