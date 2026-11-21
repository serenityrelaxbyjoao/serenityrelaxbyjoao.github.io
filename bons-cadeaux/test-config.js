// Configuration de test des bons cadeaux. Aucun secret Stripe ici.
// La vente reste volontairement bloquée jusqu'à validation du test complet.
// Ne pas modifier enabled avant accord de João et revue de sécurité.
window.SERENITY_GIFT_TEST_CONFIG = Object.freeze({
  enabled: false,
  endpoint: 'https://europe-west6-serenity-relax-gestion.cloudfunctions.net/createGiftCheckoutTest',
  catalogEndpoint: 'https://europe-west6-serenity-relax-gestion.cloudfunctions.net/getGiftCatalogTest',
  sendCodeEndpoint: 'https://europe-west6-serenity-relax-gestion.cloudfunctions.net/requestGiftEmailCodeTest',
  confirmCodeEndpoint: 'https://europe-west6-serenity-relax-gestion.cloudfunctions.net/confirmGiftEmailCodeTest',
});
