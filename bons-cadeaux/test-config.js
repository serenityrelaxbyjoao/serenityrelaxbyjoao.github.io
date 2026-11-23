// Test only. No Stripe secret or SMTP credentials belong in this file.
// Set projectId only after creating an isolated Firebase project ending in -test / -staging.
// Payment stays disabled until all private test functions and email flow are verified.
window.SERENITY_GIFT_TEST_CONFIG = Object.freeze({
  enabled: false,
  projectId: '',
  localEmulator: false,
});
