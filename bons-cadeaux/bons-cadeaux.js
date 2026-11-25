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
    ['remerciement', 'Juste un remerciement', 'Juste un remerciement. Que cette parenthèse de détente vous apporte douceur et bien-être.'],
  ];
  const $ = id => document.getElementById(id);
  // Étape 1 : offres promotionnelles (prix fixe pour 90 min) ou occasions au tarif habituel.
  const PROMOS = { 'black-friday': { price: 90, label: 'Black Friday' }, 'novembre-bleu': { price: 110, label: 'Novembre Bleu' } };
  const directBlackFriday = new URLSearchParams(location.search).get('offre') === 'black-friday';
  const titles = {
    anniversaire: 'Joyeux anniversaire', noel: 'Joyeux Noël',
    'saint-valentin': 'Joyeuse Saint-Valentin', 'fete-meres': 'Joyeuse fête des Mères',
    'fete-peres': 'Joyeuse fête des Pères', mariage: 'Félicitations pour votre mariage',
    remerciement: 'Juste un remerciement', 'novembre-bleu': 'Novembre Bleu', 'black-friday': 'Black Friday',
  };
  const chosenChoice = () => document.querySelector('input[name="offer"]:checked')?.value || 'anniversaire';
  const chosenOffer = () => PROMOS[chosenChoice()] ? chosenChoice() : 'standard';
  const isPromo = offer => Boolean(PROMOS[offer]);
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
    const current = $('service').value;
    $('service').replaceChildren(...services.map(item => option(item.id, item.name)));
    if (services.some(service => service.id === current)) $('service').value = current;
  }
  function synchronizeDurations() {
    const offer = chosenOffer();
    const service = chosenService();
    if (!service) return;
    if (isPromo(offer) && !blackFridayEligible(service)) {
      const fallback = services.find(blackFridayEligible);
      if (fallback && fallback.id !== service.id) { $('service').value = fallback.id; return synchronizeDurations(); }
    }
    const eligible = Object.keys(service.prices).map(Number).filter(duration => !isPromo(offer) || duration === 90);
    const previousDuration = Number($('duration').value);
    $('duration').replaceChildren(...eligible.map(d => option(String(d), d + ' minutes')));
    $('service').querySelectorAll('option').forEach(optionElement => {
      const selected = services.find(s => s.id === optionElement.value);
      optionElement.disabled = isPromo(offer) && !blackFridayEligible(selected);
    });
    if (!eligible.length) {
      const fallback = services.find(s => s.prices[90] !== undefined);
      $('service').value = fallback.id;
      return synchronizeDurations();
    }
    $('duration').value = String(eligible.includes(previousDuration) ? previousDuration : eligible[0]);
    updateSummary();
  }
  function quote() {
    const service = chosenService();
    const duration = Number($('duration').value);
    const offer = chosenOffer();
    const regular = service?.prices[duration];
    if (!Number.isFinite(regular)) return null;
    if (isPromo(offer) && duration !== 90) return null;
    return { service, duration, offer, amount: isPromo(offer) ? PROMOS[offer].price : regular };
  }
  function updateSummary() {
    const q = quote();
    if (!q) return;
    $('summaryService').textContent = q.service.name;
    $('summaryDuration').textContent = q.duration + ' min';
    $('summaryOffer').textContent = isPromo(q.offer) ? PROMOS[q.offer].label : 'Tarif habituel';
    $('summaryTotal').textContent = q.amount + ' CHF';
    renderCertificate(q);
  }
  function updatePersonalization() {
    $('recipientField').hidden = $('recipientMode').value !== 'gift';
    $('dedicationField').hidden = $('dedicationMode').value !== 'custom';
    $('dedication').setCustomValidity('');
    updateSummary();
  }
  function checkEmails() {
    const email = $('email').value.trim();
    // L'adresse est confirmée par le code envoyé : plus besoin de la saisir deux fois.
    if (!email) {
      $('emailError').textContent = '';
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
  // Choisir une occasion règle aussi le modèle du bon (modifiable à l'étape 3).
  const ART = {anniversaire:'anniversaire',remerciement:'anniversaire',noel:'noel','saint-valentin':'saint-valentin','fete-meres':'fete-des-meres','fete-peres':'fete-des-peres',mariage:'mariage','black-friday':'black-friday'};
  const certificate = $('giftCertificate');
  const certificateFrame = certificate.parentElement;
  function resizeCertificate() {
    certificate.style.transform = 'scale(' + certificateFrame.clientWidth / 1536 + ')';
  }

  new ResizeObserver(resizeCertificate).observe(certificateFrame);
  resizeCertificate();

  function fitCertificateText() {
    certificate.querySelectorAll('[data-fit]').forEach(node => {
      if (!node.getClientRects().length) return;
      const minimum = Number(node.dataset.min);
      let size = Number(node.dataset.fit);
      node.style.fontSize = size + 'px';
      while (size > minimum && (node.scrollHeight > node.clientHeight + 1 || node.scrollWidth > node.clientWidth + 1)) {
        size -= 1;
        node.style.fontSize = size + 'px';
      }
    });
  }
  void document.fonts.ready.then(fitCertificateText);

  function certificateDesign() {
    const choice = chosenChoice();
    return designs.find(([id]) => id === choice) || [choice, titles[choice], ''];
  }

  function dedicationText() {
    return $('dedicationMode').value === 'custom' ? $('dedication').value.trim() : certificateDesign()[2];
  }

  function renderCertificate({service, duration}) {
    const [design, occasion] = certificateDesign();
    const isBlackFriday = design === 'black-friday';
    const recipient = $('recipientMode').value === 'gift' ? $('recipient').value.trim() : '';
    const message = dedicationText();
    const artwork = 'artwork/' + (ART[design] || 'anniversaire') + '.webp';

    certificate.className = 'gift-certificate gift-design-' + design;
    if ($('certificateArtwork').getAttribute('src') !== artwork) $('certificateArtwork').src = artwork;
    $('certificateTitle').textContent = ['anniversaire', 'remerciement', 'novembre-bleu'].includes(design)
      ? 'BON CADEAU · MASSAGE & BIEN-ÊTRE' : 'BON CADEAU · ' + occasion.toLocaleUpperCase('fr');
    $('certificateBlackFriday').hidden = !isBlackFriday;
    $('certificateStandard').hidden = isBlackFriday;
    $('certificateOccasion').textContent = $('giftTitle').value.trim() || titles[design];
    $('certificateRecipient').textContent = recipient;
    $('certificateDedication').textContent = message;
    $('certificateService').textContent = 'Soin offert · ' + service.name + ' · ' + duration + ' minutes';
    $('certificatePromoService').textContent = service.name;
    $('certificatePromoDuration').textContent = duration + ' MINUTES';
    $('certificatePromoMessage').textContent = message;
    $('certificatePromoRecipient').textContent = recipient ? 'Nom : ' + recipient : '';
    fitCertificateText();
  }
  function syncOffer(resetTitle) {
    const choice = chosenChoice();
    const blackFriday = choice === 'black-friday';
    const direct = directBlackFriday && blackFriday;
    $('offerPanel').hidden = direct;
    $('directOffer').hidden = !direct;
    $('offerUnavailable').hidden = !directBlackFriday || blackFriday;
    $('titleField').hidden = blackFriday;
    $('giftTitle').disabled = blackFriday;
    if (resetTitle) $('giftTitle').value = titles[choice];
    ['serviceStep', 'personalizationStep', 'contactStep', 'termsStep'].forEach((id, index) => {
      $(id).textContent = index + (direct ? 1 : 2);
    });
    synchronizeDurations();
    updatePersonalization();
  }
  document.querySelectorAll('input[name="offer"]').forEach(radio => {
    radio.addEventListener('change', () => syncOffer(true));
  });
  // Les offres promotionnelles ne sont visibles que pendant leur période (le serveur le vérifie aussi).
  function showPromo(id, visible) {
    const label = document.querySelector('[data-promo="' + id + '"]');
    if (!label) return;
    label.hidden = !visible;
    if (!visible && label.querySelector('input').checked) document.querySelector('input[name="offer"][value="anniversaire"]').checked = true;
  }
  const swissToday = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Zurich' });
  const promoPreview = /[?&]bf=apercu(&|$)/.test(location.search);
  showPromo('black-friday', promoPreview || (swissToday >= '2026-11-25' && swissToday <= '2026-11-30'));
  showPromo('novembre-bleu', false);
  $('service').addEventListener('change', synchronizeDurations);
  $('duration').addEventListener('change', updateSummary);
  ['recipientMode', 'dedicationMode'].forEach(id => $(id).addEventListener('change', updatePersonalization));
  ['giftTitle', 'recipient', 'dedication'].forEach(id => $(id).addEventListener('input', updatePersonalization));
  $('email').addEventListener('input', checkEmails);
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
        body: JSON.stringify({ email: $('email').value.trim(), emailConfirmation: $('email').value.trim() }),
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
    const emailConfirmation = email;
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
      if ($('email').value.trim() !== email) return;
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
  ['email'].forEach(id => $(id).addEventListener('input', () => {
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
    const [model] = certificateDesign();
    const title = model === 'black-friday' ? '' : $('giftTitle').value.trim();
    // The current PDF service prints the personalized heading before the message.
    const dedication = [title, dedicationText()].filter(Boolean).join('\n');
    if (dedication.length > 300) {
      $('dedication').setCustomValidity('Le titre et le message doivent totaliser 300 caractères maximum.');
      $('dedication').reportValidity();
      return;
    }
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
          emailConfirmation: $('email').value.trim(),
          phoneE164,
          emailProof,
          recipientMode,
          recipient: $('recipient').value.trim(),
          design: model === 'novembre-bleu' ? 'anniversaire' : model,
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
      const previousChoice = chosenChoice();
      showPromo('black-friday', catalogue.offers?.blackFriday?.enabled === true);
      showPromo('novembre-bleu', catalogue.offers?.novembreBleu?.enabled === true);
      syncOffer(previousChoice !== chosenChoice());
      catalogReady = true;
      $('checkout').disabled = !emailProof;
    } catch (error) {
      $('checkout').disabled = true;
      $('checkout').textContent = 'Tarifs indisponibles, réessayez plus tard';
      console.warn('Impossible de charger les tarifs officiels', error);
    }
  }
  fillServices();
  initializeWorldPhoneSelector();
  $('sendEmailCode').disabled = !CHECKOUT_TEST.enabled;
  if (CHECKOUT_TEST.enabled) {
    $('previewTerms').textContent = liveMode ? '' : 'Aperçu de test. Utilisez uniquement une carte de test Stripe.';
    $('checkout').textContent = 'Vérifiez votre adresse email pour continuer';
    $('checkoutStatus').textContent = liveMode
      ? 'Paiement sécurisé par Stripe. Votre bon cadeau en PDF vous est envoyé par e-mail dès la confirmation du paiement.'
      : 'Le PDF est envoyé après confirmation du paiement simulé.';
  }
  const requested = new URLSearchParams(window.location.search).get('offre');
  const requestedInput = requested && document.querySelector('input[name="offer"][value="' + CSS.escape(requested) + '"]');
  if (requestedInput && !requestedInput.closest('label').hidden) requestedInput.checked = true;
  syncOffer(true);
  void loadCatalogWhenConfigured();
})();
