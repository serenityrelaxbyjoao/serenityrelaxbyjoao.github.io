/* Novembre Bleu : la promotion n'est plus présentée ni réservable après le 30 novembre 2026 (heure de Genève).
 * Changer OFFER_LAST_DAY pour prolonger l'offre. Le formulaire de réservation fait la même vérification. */
(function () {
  'use strict';
  var OFFER_LAST_DAY = '2026-11-30';
  var today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Zurich' });
  if (today <= OFFER_LAST_DAY) return;
  function run() {
    var card = document.querySelector('.hero-promo');
    if (card) card.hidden = true;
    document.querySelectorAll('a[href*="offre-du-mois"]').forEach(function (a) { a.hidden = true; });
    document.querySelectorAll('[data-offer-share]').forEach(function (s) { s.hidden = true; });
    if (document.querySelector('[data-campaign-booking]') === null && document.querySelector('.offer-ended-note') === null && /novembre-bleu/.test(location.pathname)) {
      var note = document.createElement('p');
      note.className = 'offer-ended-note';
      note.textContent = 'Cette offre est terminée.';
      var main = document.querySelector('main') || document.body;
      main.insertBefore(note, main.firstChild);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
}());
