/* Serenity & Relax by João — script commun */
(function () {
  var SR = window.SR || {};
  var ADS = 'AW-18220930952';
  var LABELS = { booking: 'bpnfCIP1ho8dEIivtfBD', whatsapp: '97HiCIb1ho8dEIivtfBD', phone: 'Q9zdCPn-jI8dEIivtfBD' };
  var KEY = 'sr-cookies', loaded = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  function getC() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setC(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function loadAds() {
    if (loaded) return; loaded = true;
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS;
    document.head.appendChild(s);
    gtag('js', new Date()); gtag('config', ADS);
  }
  function conv(label, extra) {
    if (!loaded) return;
    var p = { send_to: ADS + '/' + label, transport_type: 'beacon' };
    for (var k in (extra || {})) p[k] = extra[k];
    gtag('event', 'conversion', p);
  }
  if (getC() === 'yes') loadAds();

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (/wa\.me|whatsapp\.com/i.test(h)) conv(LABELS.whatsapp);
    else if (/^tel:/i.test(h)) conv(LABELS.phone);
  }, true);

  // Formulaire de réservation (iframe) : hauteur + conversion confirmée
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || d.source !== 'sr-booking') return;
    if (!/(^https:\/\/script\.google\.com$)|(\.googleusercontent\.com$)/.test(e.origin)) return;
    var fr = $('#bookingFrame'), w = e.source, ok = false;
    try { for (var i = 0; w && i < 5; i++) { if (fr && w === fr.contentWindow) { ok = true; break; } if (w === w.parent) break; w = w.parent; } } catch (x) {}
    if (!ok) return;
    if (d.type === 'height') {
      var f = $('#bookingFrame'), h = Number(d.height);
      if (f && h > 300 && h < 6000) f.style.height = (h + 20) + 'px';
    } else if (d.type === 'confirmed') {
      var m = $('#bookingModal'); if (m) m.scrollTop = 0;
      conv(LABELS.booking, { value: Number(d.value) || 0, currency: 'CHF', transaction_id: String(d.transactionId || '') });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var header = $('header'), mbar = $('.mbar');

    // En-tête : fond plein après le héros, menu mobile
    function onScroll() { header.classList.toggle('solid', window.scrollY > 40 || header.classList.contains('open')); }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    var burger = $('.burger');
    if (burger) burger.addEventListener('click', function () {
      var open = header.classList.toggle('open'); burger.setAttribute('aria-expanded', open); onScroll();
    });
    $$('.menu a').forEach(function (a) { a.addEventListener('click', function () { header.classList.remove('open'); onScroll(); }); });

    // Cookies
    var bar = $('#cookieBar');
    function syncBar() { if (mbar) mbar.classList.toggle('hide', !bar.hidden || !$('#bookingModal').hidden); }
    function choose(v) { setC(v); bar.hidden = true; syncBar(); if (v === 'yes') loadAds(); else if (loaded) location.reload(); }
    $('#ckOk').onclick = function () { choose('yes'); };
    $('#ckNo').onclick = function () { choose('no'); };
    $$('[data-cookies]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); bar.hidden = false; syncBar(); }); });
    if (!getC()) bar.hidden = false;

    // Réservation dans une fenêtre
    var modal = $('#bookingModal'), frame = $('#bookingFrame');
    function bookingUrl(service) {
      return SR.exec + '?lang=' + encodeURIComponent(SR.lang || 'fr') + (service ? '&service=' + encodeURIComponent(service) : '');
    }
    var lastFocus = null;
    function openBooking(service) {
      var url = bookingUrl(service);
      if (frame.getAttribute('src') !== url) frame.setAttribute('src', url);
      lastFocus = document.activeElement;
      modal.hidden = false; document.body.classList.add('bk-open'); modal.scrollTop = 0; syncBar();
      $$('body > *:not(#bookingModal)').forEach(function (el) { el.setAttribute('inert', ''); });
      $('#bookingClose').focus();
    }
    function closeBooking() {
      modal.hidden = true; document.body.classList.remove('bk-open'); syncBar();
      $$('[inert]').forEach(function (el) { el.removeAttribute('inert'); });
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    modal.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = [$('#bookingClose'), frame], i = f.indexOf(document.activeElement);
      e.preventDefault(); f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
    });
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('[data-book]') : null;
      if (!a) return;
      e.preventDefault(); openBooking(a.getAttribute('data-book') || '');
    });
    $('#bookingClose').onclick = closeBooking;
    modal.addEventListener('click', function (e) { if (e.target === modal) closeBooking(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeBooking(); });
    function checkHash() { if (/^#(reserver|reservar|book|booking|reservation)$/i.test(location.hash)) openBooking(''); }
    checkHash(); window.addEventListener('hashchange', checkHash);
    syncBar();

    // Guide « quel massage pour moi ? »
    var res = $('#guideResult');
    $$('.need').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.need').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        var n = SR.needs[b.getAttribute('data-need')];
        var html = '<p class="intro">' + n.intro + '</p><div class="picks">';
        n.picks.forEach(function (id, i) {
          var s = SR.services[id];
          html += '<article class="pick"><span class="tag">' + (i === 0 ? SR.t.best : SR.t.alt) + '</span><h3>' + s.name +
            '</h3><p>' + s.desc + '</p><div class="row"><span class="prices">' + s.prices.map(function (p) { return '<span>' + p + '</span>'; }).join('') +
            '</span><a class="btn small" href="#reserver" data-book="' + id + '">' + SR.t.bookThis + '</a></div></article>';
        });
        res.innerHTML = html + '</div>';
      });
    });

    // Apparition douce
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px' });
      $$('.reveal').forEach(function (el) { io.observe(el); });
    } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }
  });
})();
