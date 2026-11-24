/* Affiche le bandeau Black Friday du 25 au 30 novembre 2026 (heure de Genève).
 * Aperçu avant la date : ajouter ?bf=apercu à l'adresse. */
(function () {
  'use strict';
  var bar = document.querySelector('[data-bf-topbar]');
  if (!bar) return;
  var today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Zurich' });
  var preview = /[?&]bf=apercu(&|$)/.test(location.search);
  if (preview || (today >= '2026-11-25' && today <= '2026-11-30')) {
    bar.hidden = false;
    document.documentElement.classList.add('bf-topbar-on');
  }
}());
