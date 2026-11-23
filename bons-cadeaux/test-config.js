// Test only. No Stripe secret or SMTP credentials belong in this file.
// Set projectId only after creating an isolated Firebase project ending in -test / -staging.
// Payment stays disabled until all private test functions and email flow are verified.
// Production (après accord de João) : mode: 'live', projectId: 'serenity-relax-gestion',
// enabled: true, termsVersion: date de la version validée des CGV. Actif uniquement sur serenityrelaxbyjoao.ch.
window.SERENITY_GIFT_TEST_CONFIG = Object.freeze({
  enabled: false,
  projectId: '',
  localEmulator: false,
});
