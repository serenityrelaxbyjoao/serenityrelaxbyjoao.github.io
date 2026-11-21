/* Serenity & Relax · Bons cadeaux · aperçu non transactionnel */
(() => {
  'use strict';
  const services = [
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
    ['paques', 'Pâques', 'Joyeuses Pâques ! Une belle occasion de prendre du temps pour soi.'],
    ['fete-meres', 'Fête des Mères', 'Bonne fête ! Un moment de douceur rien que pour toi.'],
    ['fete-peres', 'Fête des Pères', 'Bonne fête ! Un moment de détente bien mérité.'],
    ['mariage', 'Mariage', 'Félicitations ! Un moment de sérénité à savourer.'],
    ['black-friday', 'Black Friday', 'Une pause bien méritée, un instant de détente rien que pour vous.'],
    ['classique', 'Classique', 'Un moment de bien-être et de sérénité à savourer pleinement.'],
  ];
  const $ = id => document.getElementById(id);
  const chosenOffer = () => document.querySelector('input[name="offer"]:checked').value;
  const chosenService = () => services.find(service => service.id === $('service').value);
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
    const eligible = Object.keys(service.prices).map(Number).filter(duration => offer !== 'black-friday' || duration === 90);
    $('duration').replaceChildren(...eligible.map(d => option(String(d), d + ' minutes')));
    $('service').querySelectorAll('option').forEach(optionElement => {
      const selected = services.find(s => s.id === optionElement.value);
      optionElement.disabled = offer === 'black-friday' && !Object.prototype.hasOwnProperty.call(selected.prices, '90');
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
  // This preview deliberately does not pretend to validate global numbers.
  // A country-aware libphonenumber implementation and verification code are
  // required before enabling the payment button.
  function checkPhonePreview() {
    const digits = $('phone').value.replace(/\D/g, '');
    $('phoneError').textContent = digits && digits.length < 6 ? 'Numéro incomplet.' : '';
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
  $('giftForm').addEventListener('submit', event => event.preventDefault());
  fillServices();
  fillDesigns();
  if (new URLSearchParams(window.location.search).get('offre') === 'black-friday') {
    document.querySelector('input[name="offer"][value="black-friday"]').checked = true;
  }
  synchronizeDurations();
  updatePersonalization();
})();
