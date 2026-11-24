// Aucune clé Stripe ni identifiant SMTP dans ce fichier.
// Production : actif uniquement sur serenityrelaxbyjoao.ch, avec le projet de la gestion.
// L'ouverture réelle des ventes est contrôlée côté serveur (GIFT_LIVE_SALES_OPEN, liste d'adresses).
window.SERENITY_GIFT_TEST_CONFIG = Object.freeze({
  mode: 'live',
  enabled: true,
  projectId: 'serenity-relax-gestion',
  localEmulator: false,
  termsVersion: '2026-11-25',
});
