/* Serenity & Relax · Bons cadeaux · aperçu non transactionnel */
(() => {
  'use strict';
  let services = [
    { id: 'therapeutique', name: 'Massage thérapeutique', prices: { 60: 110, 90: 150 } },
    { id: 'sportif', name: 'Massage sportif', prices: { 60: 110, 90: 150 } },
    { id: 'relaxant', name: 'Massage relaxant', prices: { 60: 110, 90: 150 } },
    { id: 'thai', name: 'Massage thaï', prices: { 60: 110, 90: 150 } },
    { id: 'myofascial', name: 'Massage myofascial', prices: { 60: 110, 90: 150 } },
    { id: 'deep-tissue', name: 'Deep Tissue', prices: { 60: 120, 90: 170 } },
    { id: 'deep-relax', name: 'Deep Relax', prices: { 60: 120, 90: 170 } },
    { id: 'drainage', name: 'Drainage lymphatique', prices: { 60: 110 } },
    { id: 'signature', name: 'Massage Signature', prices: { 90: 170, 120: 220 } },
  ];
  const designs = [
    ['anniversaire', 'Anniversaire', 'Joyeux anniversaire ! Que cette parenthèse de détente vous apporte douceur et bien-être.'],
    ['noel', 'Noël', 'Un doux moment de détente à savourer. Joyeux Noël !'],
    ['saint-valentin', 'Saint-Valentin', 'Pour toi, mon amour. Un moment de douceur rien que pour toi.'],
    ['fete-meres', 'Fête des Mères', 'Bonne fête ! Un moment de douceur rien que pour toi.'],
    ['fete-peres', 'Fête des Pères', 'Bonne fête ! Un moment de détente bien mérité.'],
    ['mariage', 'Mariage', 'Félicitations ! Un moment de sérénité à savourer.'],
    ['black-friday', 'Black Friday', 'Une pause bien méritée, un instant de détente rien que pour vous.'],
  ];
  const $ = id => document.getElementById(id);
  const chosenOffer = () => document.querySelector('input[name="offer"]:checked').value;
  const chosenService = () => services.find(service => service.id === $('service').value);
  // Black Friday : seulement les massages dont le tarif habituel 90 min est de 150 CHF (liste fournie par le serveur).
  let blackFridayIds = null;
  const blackFridayEligible = service => Boolean(service) && (blackFridayIds ? blackFridayIds.includes(service.id) : service.prices[90] === 150);
  const option = (value, label) => {
    const element = document.createElement('option');
    element.value = value;
    element.textContent = label;
    return element;
  };
  function fillServices() {
    $('service').replaceChildren(...services.map(item => option(item.id, item.name)));
  }
  function fillDesigns() {
    $('design').replaceChildren(...designs.map(([id, name]) => option(id, name)));
  }
  function synchronizeDurations() {
    const offer = chosenOffer();
    const service = chosenService();
    if (!service) return;
    if (offer === 'black-friday' && !blackFridayEligible(service)) {
      const fallback = services.find(blackFridayEligible);
      if (fallback && fallback.id !== service.id) { $('service').value = fallback.id; return synchronizeDurations(); }
    }
    const eligible = Object.keys(service.prices).map(Number).filter(duration => offer !== 'black-friday' || duration === 90);
    $('duration').replaceChildren(...eligible.map(d => option(String(d), d + ' minutes')));
    $('service').querySelectorAll('option').forEach(optionElement => {
      const selected = services.find(s => s.id === optionElement.value);
      optionElement.disabled = offer === 'black-friday' && !blackFridayEligible(selected);
    });
    if (!eligible.length) {
      const fallback = services.find(s => s.prices[90] !== undefined);
      $('service').value = fallback.id;
      return synchronizeDurations();
    }
    $('duration').value = String(offer === 'black-friday' ? 90 : eligible[0]);
    updateSummary();
  }
  function quote() {
    const service = chosenService();
    const duration = Number($('duration').value);
    const offer = chosenOffer();
    const regular = service?.prices[duration];
    if (!Number.isFinite(regular)) return null;
    if (offer === 'black-friday' && duration !== 90) return null;
    return { service, duration, offer, amount: offer === 'black-friday' ? 90 : regular };
  }
  function updateSummary() {
    const q = quote();
    if (!q) return;
    $('promoNotice').hidden = q.offer !== 'black-friday';
    $('summaryService').textContent = q.service.name;
    $('summaryDuration').textContent = q.duration + ' min';
    $('summaryOffer').textContent = q.offer === 'black-friday' ? 'Black Friday' : 'Tarif habituel';
    $('summaryTotal').textContent = q.amount + ' CHF';
    $('previewService').textContent = q.service.name + ' · ' + q.duration + ' minutes';
    const recipient = $('recipientMode').value === 'gift' ? $('recipient').value.trim() : '';
    $('previewRecipient').textContent = recipient ? 'Pour ' + recipient : '';
    const mode = $('dedicationMode').value;
    const standard = designs.find(([id]) => id === $('design').value)?.[2] || '';
    $('previewDedication').textContent = mode === 'none' ? '' : mode === 'custom' ? $('dedication').value.trim() : standard;
  }
  function updatePersonalization() {
    $('recipientField').hidden = $('recipientMode').value !== 'gift';
    $('dedicationField').hidden = $('dedicationMode').value !== 'custom';
    updateSummary();
  }
  function checkEmails() {
    const email = $('email').value.trim();
    const confirmation = $('emailAgain').value.trim();
    if (!confirmation) {
      $('emailError').textContent = '';
      return false;
    }
    if (email.toLocaleLowerCase() !== confirmation.toLocaleLowerCase()) {
      $('emailError').textContent = 'Les deux adresses email ne correspondent pas.';
      return false;
    }
    if (!$('email').checkValidity()) {
      $('emailError').textContent = 'Veuillez saisir une adresse email valide.';
      return false;
    }
    $('emailError').textContent = '';
    return true;
  }
  function initializeWorldPhoneSelector() {
    const lib = window.libphonenumber;
    if (!lib?.getCountries || !lib?.getCountryCallingCode || !lib?.parsePhoneNumberFromString) {
      $('phoneError').textContent = 'Validation internationale momentanément indisponible.';
      return false;
    }
    const names = new Intl.DisplayNames(['fr'], { type: 'region' });
    const options = lib.getCountries().map(code => ({
      code,
      name: names.of(code) || code,
      callingCode: lib.getCountryCallingCode(code),
    })).sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    $('countryCode').replaceChildren(...options.map(item =>
      option(item.code, item.name + ' (+' + item.callingCode + ')')
    ));
    $('countryCode').value = 'CH';
    return true;
  }
  function validatedPhoneE164() {
    const lib = window.libphonenumber;
    if (!lib?.parsePhoneNumberFromString) return null;
    const raw = $('phone').value.trim();
    if (!raw) return null;
    try {
      const number = lib.parsePhoneNumberFromString(raw, $('countryCode').value);
      return number?.isValid() ? number.number : null;
    } catch { return null; }
  }
  function checkPhonePreview() {
    const raw = $('phone').value.trim();
    const formatted = validatedPhoneE164();
    $('phoneError').textContent = raw && !formatted ? 'Numéro incomplet ou invalide pour le pays choisi.' : '';
    return Boolean(formatted);
  }
  document.querySelectorAll('input[name="offer"]').forEach(radio => {
    radio.addEventListener('change', synchronizeDurations);
  });
  $('service').addEventListener('change', synchronizeDurations);
  $('duration').addEventListener('change', updateSummary);
  ['design', 'recipientMode', 'dedicationMode'].forEach(id => $(id).addEventListener('change', updatePersonalization));
  ['recipient', 'dedication'].forEach(id => $(id).addEventListener('input', updateSummary));
  ['email', 'emailAgain'].forEach(id => $(id).addEventListener('input', checkEmails));
  $('phone').addEventListener('input', checkPhonePreview);
  $('countryCode').addEventListener('change', checkPhonePreview);
  // Checkout stays disabled until backend, signed webhook, email ownership check,
  // consent pages, PDF and transactional delivery are validated in staging.
  const testConfig = window.SERENITY_GIFT_TEST_CONFIG || {};
  const testProjectId = String(testConfig.projectId || '');
  // Never send buyer information to the live clinic Firebase project from this preview.
  const validStagingProject = /^[a-z0-9][a-z0-9-]{3,58}-(test|staging|sandbox)$/.test(testProjectId) &&
    testProjectId !== 'serenity-relax-gestion';
  const hostname = window.location.hostname;
  const localPreview = hostname === 'localhost' || hostname === '127.0.0.1';
  const liveSite = /^(?:[a-z0-9-]+\.)*(?:serenityrelaxbyjoao\.ch|serenityrelaxbyjoao\.github\.io)$/.test(hostname);
  const localEmulator = localPreview && testConfig.localEmulator === true &&
    testProjectId.startsWith('demo-') && validStagingProject;
  // Production : seulement sur le site publié, avec le projet de la gestion et mode: 'live' explicite.
  const LIVE_PROJECT = 'serenity-relax-gestion';
  const liveMode = testConfig.mode === 'live' && testProjectId === LIVE_PROJECT && liveSite;
  const TERMS_VERSION = typeof testConfig.termsVersion === 'string' ? testConfig.termsVersion : '2026-11-21-draft';
  const base = liveMode
    ? 'https://europe-west6-' + LIVE_PROJECT + '.cloudfunctions.net/'
    : localEmulator
    ? 'http://127.0.0.1:5007/' + testProjectId + '/europe-west6/'
    : validStagingProject
    ? 'https://europe-west6-' + testProjectId + '.cloudfunctions.net/'
    : '';
  const CHECKOUT_TEST = Object.freeze({
    enabled: liveMode ? testConfig.enabled === true
      : testConfig.enabled === true && validStagingProject && !liveSite &&
        (testConfig.localEmulator !== true || localEmulator),
    endpoint: base + 'createGiftCheckoutTest',
    catalogEndpoint: base + 'getGiftCatalogTest',
    sendCodeEndpoint: base + 'requestGiftEmailCodeTest',
    confirmCodeEndpoint: base + 'confirmGiftEmailCodeTest',
  });
  let verifiedEmail = '';
  let emailProof = '';
  let catalogReady = false;
  async function sendEmailCodeTest() {
    if (!CHECKOUT_TEST.enabled || !CHECKOUT_TEST.sendCodeEndpoint || !checkEmails()) return;
    $('sendEmailCode').disabled = true;
    $('emailVerifyStatus').textContent = 'Envoi du code…';
    try {
      const result = await fetch(CHECKOUT_TEST.sendCodeEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: $('email').value.trim(), emailConfirmation: $('emailAgain').value.trim() }),
      });
      if (!result.ok) throw new Error((await result.json()).error || 'Envoi impossible.');
      $('emailVerifyStatus').textContent = 'Consultez votre messagerie et saisissez le code à 6 chiffres.';
      $('confirmEmailCode').disabled = false;
    } catch (error) {
      $('emailVerifyStatus').textContent = error instanceof Error ? error.message : 'Envoi impossible.';
    } finally {
      $('sendEmailCode').disabled = !CHECKOUT_TEST.enabled;
    }
  }
  async function confirmEmailCodeTest() {
    if (!CHECKOUT_TEST.enabled || !CHECKOUT_TEST.confirmCodeEndpoint || !checkEmails()) return;
    $('confirmEmailCode').disabled = true;
    const email = $('email').value.trim();
    const emailConfirmation = $('emailAgain').value.trim();
    try {
      const result = await fetch(CHECKOUT_TEST.confirmCodeEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, emailConfirmation,
          code: $('emailCode').value.trim(),
        }),
      });
      const confirmation = await result.json();
      if (!result.ok || typeof confirmation.emailProof !== 'string') {
        throw new Error(confirmation.error || 'Code incorrect.');
      }
      if ($('email').value.trim() !== email || $('emailAgain').value.trim() !== emailConfirmation) return;
      verifiedEmail = email.toLowerCase();
      emailProof = confirmation.emailProof;
      $('emailVerifyStatus').textContent = 'Adresse email vérifiée.';
      $('checkout').disabled = !catalogReady;
      $('checkout').textContent = liveMode ? 'Payer par carte' : 'Payer avec Stripe (test)';
    } catch (error) {
      verifiedEmail = '';
      emailProof = '';
      $('emailVerifyStatus').textContent = error instanceof Error ? error.message : 'Vérification impossible.';
      $('confirmEmailCode').disabled = false;
    }
  }
  $('sendEmailCode').addEventListener('click', () => { void sendEmailCodeTest(); });
  $('confirmEmailCode').addEventListener('click', () => { void confirmEmailCodeTest(); });
  ['email', 'emailAgain'].forEach(id => $(id).addEventListener('input', () => {
    verifiedEmail = '';
    emailProof = '';
    $('checkout').disabled = true;
    $('checkout').textContent = 'Vérifiez votre adresse email pour continuer';
    $('emailVerifyStatus').textContent = 'Adresse email à vérifier.';
  }));
  async function startCheckoutTest() {
    if (!CHECKOUT_TEST.enabled || !CHECKOUT_TEST.endpoint || !catalogReady || !emailProof) return;
    const q = quote();
    if (!q || !checkEmails() || !$('giftForm').reportValidity() || !$('acceptTerms').checked ||
        verifiedEmail !== $('email').value.trim().toLowerCase()) return;
    const phoneE164 = validatedPhoneE164();
    if (!phoneE164) {
      $('phoneError').textContent = 'Veuillez vérifier le pays et le numéro de téléphone.';
      return;
    }
    const recipientMode = $('recipientMode').value;
    if (recipientMode === 'gift' && !$('recipient').value.trim()) {
      $('recipient').focus();
      return;
    }
    const currentDedication = $('dedicationMode').value;
    const proposed = designs.find(([id]) => id === $('design').value)?.[2] || '';
    const dedication = currentDedication === 'none' ? '' :
      currentDedication === 'custom' ? $('dedication').value.trim() : proposed;
    $('checkout').disabled = true;
    $('checkout').textContent = 'Ouverture du paiement sécurisé…';
    try {
      const response = await fetch(CHECKOUT_TEST.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: q.service.id,
          durationMinutes: q.duration,
          offerId: q.offer,
          buyerName: $('fullName').value.trim(),
          email: $('email').value.trim(),
          emailConfirmation: $('emailAgain').value.trim(),
          phoneE164,
          emailProof,
          recipientMode,
          recipient: $('recipient').value.trim(),
          design: $('design').value,
          dedication,
          acceptedTerms: true,
          acceptedTermsVersion: TERMS_VERSION,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Paiement indisponible.');
      const redirect = new URL(result.checkoutUrl);
      if (redirect.protocol !== 'https:' || redirect.hostname !== 'checkout.stripe.com') {
        throw new Error('Adresse de paiement non reconnue.');
      }
      location.assign(redirect.href);
    } catch (error) {
      $('checkout').textContent = error instanceof Error ? error.message : 'Paiement indisponible.';
      $('checkout').disabled = false;
    }
  }
  $('checkout').addEventListener('click', () => { void startCheckoutTest(); });
  $('giftForm').addEventListener('submit', event => event.preventDefault());
  async function loadCatalogWhenConfigured() {
    if (!CHECKOUT_TEST.enabled || !CHECKOUT_TEST.catalogEndpoint) return;
    try {
      const response = await fetch(CHECKOUT_TEST.catalogEndpoint, { method: 'GET', cache: 'no-store' });
      if (!response.ok) throw new Error('Catalogue indisponible.');
      const catalogue = await response.json();
      if (!Array.isArray(catalogue.services) || catalogue.currency !== 'chf') {
        throw new Error('Catalogue invalide.');
      }
      services = catalogue.services.filter(item =>
        item && typeof item.id === 'string' && typeof item.name === 'string' &&
        item.prices && typeof item.prices === 'object'
      );
      if (!services.length) throw new Error('Aucune prestation disponible.');
      fillServices();
      if (Array.isArray(catalogue.offers?.blackFriday?.serviceIds)) blackFridayIds = catalogue.offers.blackFriday.serviceIds;
      if (!catalogue.offers?.blackFriday?.enabled) {
        document.querySelector('input[name="offer"][value="standard"]').checked = true;
        document.querySelector('input[name="offer"][value="black-friday"]').closest('label').hidden = true;
      }
      synchronizeDurations();
      catalogReady = true;
      $('checkout').disabled = !emailProof;
    } catch (error) {
      $('checkout').disabled = true;
      $('checkout').textContent = 'Tarifs indisponibles, réessayez plus tard';
      console.warn('Impossible de charger les tarifs officiels', error);
    }
  }
  fillServices();
  fillDesigns();
  initializeWorldPhoneSelector();
  $('sendEmailCode').disabled = !CHECKOUT_TEST.enabled;
  if (CHECKOUT_TEST.enabled) {
    $('previewTerms').textContent = liveMode ? '' : 'Aperçu de test. Utilisez uniquement une carte de test Stripe.';
    $('checkout').textContent = 'Vérifiez votre adresse email pour continuer';
    $('checkoutStatus').textContent = liveMode
      ? 'Paiement sécurisé par Stripe. Votre bon cadeau en PDF vous est envoyé par e-mail dès la confirmation du paiement.'
      : 'Le PDF est envoyé après confirmation du paiement simulé.';
  }
  if (new URLSearchParams(window.location.search).get('offre') === 'black-friday') {
    document.querySelector('input[name="offer"][value="black-friday"]').checked = true;
  }
  synchronizeDurations();
  updatePersonalization();
  void loadCatalogWhenConfigured();
})();
