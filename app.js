/* Serenity & Relax by João — script commun */
(function () {
  var SR = window.SR || {};
  var ADS = 'AW-18220930952';
  var LABELS = { booking: 'bpnfCIP1ho8dEIivtfBD', whatsapp: '97HiCIb1ho8dEIivtfBD', phone: 'Q9zdCPn-jI8dEIivtfBD' };
  var KEY = 'sr-cookies', loaded = false;
  var bookingReady = false, bookingTimer = null;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };

  function getC() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setC(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  var GRANTED = { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'denied', analytics_storage: 'denied' };
  var DENIED = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' };
  gtag('consent', 'default', DENIED);
  gtag('set', 'ads_data_redaction', true);
  if (getC() === 'yes') gtag('consent', 'update', GRANTED);

  function loadAds() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', ADS);
  }

  function conv(label, extra) {
    if (!loaded) return;
    var p = { send_to: ADS + '/' + label, transport_type: 'beacon' };
    for (var k in (extra || {})) p[k] = extra[k];
    gtag('event', 'conversion', p);
  }

  loadAds();

  function bookingUrl(service) {
    if (!SR.exec) return '#reserver';
    return SR.exec + '?lang=' + encodeURIComponent(SR.lang || 'fr') + (service ? '&service=' + encodeURIComponent(service) : '');
  }

  function directBookingMode() {
    var ua = navigator.userAgent || '';
    var inApp = /FBAN|FBAV|Instagram|WhatsApp|Messenger|Line|; wv\)|\bwv\b|WebView/i.test(ua);
    var small = window.matchMedia ? window.matchMedia('(max-width: 900px)').matches : window.innerWidth <= 900;
    var touch = (navigator.maxTouchPoints || 0) > 0 || 'ontouchstart' in window;
    return inApp || (small && touch);
  }

  function bookingText() {
    var t = {
      fr: ['Le formulaire met du temps à s’afficher ?', 'Ouvrir la réservation directement'],
      pt: ['O formulário está a demorar para aparecer?', 'Abrir a reserva diretamente'],
      en: ['Is the booking form taking too long to appear?', 'Open booking directly'],
      es: ['¿El formulario tarda en aparecer?', 'Abrir la reserva directamente'],
      it: ['Il modulo tarda a comparire?', 'Apri direttamente la prenotazione'],
      de: ['Das Buchungsformular lädt nicht?', 'Buchung direkt öffnen']
    };
    return t[SR.lang] || t.fr;
  }

  function ensureBookingFallback(url) {
    var frame = $('#bookingFrame');
    if (!frame || !frame.parentNode) return null;
    var box = frame.parentNode;
    var fb = $('#bookingFallback');
    if (!fb) {
      var tx = bookingText();
      fb = document.createElement('div');
      fb.id = 'bookingFallback';
      fb.setAttribute('role', 'status');
      fb.style.cssText = 'display:none;padding:18px 64px 16px 18px;background:#fffdf8;border-bottom:1px solid #e3d8c4;font:500 15px/1.45 Jost,system-ui,sans-serif;color:#1c2621;text-align:center;';
      var p = document.createElement('div');
      p.textContent = tx[0];
      p.style.marginBottom = '10px';
      var a = document.createElement('a');
      a.id = 'bookingFallbackLink';
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = tx[1];
      a.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:9px 18px;border-radius:999px;background:#34503f;color:#fff;text-decoration:none;font-weight:500;';
      fb.appendChild(p);
      fb.appendChild(a);
      box.insertBefore(fb, frame);
    }
    var link = $('#bookingFallbackLink');
    if (link) link.href = url;
    return fb;
  }

  function markBookingReady() {
    bookingReady = true;
    if (bookingTimer) { clearTimeout(bookingTimer); bookingTimer = null; }
    var fb = $('#bookingFallback');
    if (fb) fb.style.display = 'none';
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (/wa\.me|whatsapp\.com/i.test(h)) conv(LABELS.whatsapp);
    else if (/^tel:/i.test(h)) conv(LABELS.phone);
  }, true);

  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || d.source !== 'sr-booking') return;
    if (!/(^https:\/\/script\.google\.com$)|(\.googleusercontent\.com$)/.test(e.origin)) return;

    var fr = $('#bookingFrame'), w = e.source, ok = false;
    try {
      for (var i = 0; w && i < 5; i++) {
        if (fr && w === fr.contentWindow) { ok = true; break; }
        if (w === w.parent) break;
        w = w.parent;
      }
    } catch (x) {}
    if (!ok) return;

    markBookingReady();

    if (d.type === 'height') {
      var f = $('#bookingFrame'), h = Number(d.height);
      if (f && h > 120 && h < 8000) f.style.height = (h + 20) + 'px';
    } else if (d.type === 'close') {
      var cb = $('#bookingClose'); if (cb) cb.click();
    } else if (d.type === 'scroll') {
      var ms = $('#bookingModal'), fs = $('#bookingFrame');
      if (ms && fs) ms.scrollTop = Math.max(0, fs.getBoundingClientRect().top - ms.getBoundingClientRect().top + ms.scrollTop + (Number(d.y) || 0) - 60);
    } else if (d.type === 'top') {
      var mt = $('#bookingModal'); if (mt) mt.scrollTop = 0;
    } else if (d.type === 'confirmed') {
      var m = $('#bookingModal'); if (m) m.scrollTop = 0;
      conv(LABELS.booking, { value: Number(d.value) || 0, currency: 'CHF', transaction_id: String(d.transactionId || '') });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var header = $('header'), mbar = $('.mbar');

    function onScroll() {
      if (!header) return;
      header.classList.toggle('solid', window.scrollY > 40 || header.classList.contains('open'));
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var burger = $('.burger');
    if (burger && header) burger.addEventListener('click', function () {
      var open = header.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      onScroll();
    });
    $$('.menu a').forEach(function (a) {
      a.addEventListener('click', function () { if (header) header.classList.remove('open'); onScroll(); });
    });

    var lb = $('.lang-btn'), lm = $('.lang-menu');
    function langMenu(open) {
      if (!lb || !lm) return;
      lm.hidden = !open;
      lb.setAttribute('aria-expanded', open);
    }
    if (lb && lm) {
      lb.addEventListener('click', function (e) {
        e.stopPropagation();
        langMenu(lm.hidden);
        if (!lm.hidden) { var c = lm.querySelector('[aria-current]') || lm.querySelector('a'); if (c) c.focus(); }
      });
      document.addEventListener('click', function (e) { if (!lm.hidden && !lm.contains(e.target) && e.target !== lb) langMenu(false); });
      document.addEventListener('keydown', function (e) {
        if (lm.hidden) return;
        var list = $$('a', lm), i = list.indexOf(document.activeElement);
        if (!list.length) return;
        if (e.key === 'Escape') { langMenu(false); lb.focus(); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1 + list.length) % list.length].focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
      });
      lm.addEventListener('focusout', function (e) { if (!lm.contains(e.relatedTarget) && e.relatedTarget !== lb) langMenu(false); });
    }

    var bar = $('#cookieBar');
    var modal = $('#bookingModal'), frame = $('#bookingFrame');
    function syncBar() {
      if (!mbar) return;
      var cookieOpen = !!(bar && !bar.hidden);
      var bookingOpen = !!(modal && !modal.hidden);
      mbar.classList.toggle('hide', cookieOpen || bookingOpen);
    }
    function clearAdsCookies() {
      document.cookie.split(';').forEach(function (c) {
        var n = c.split('=')[0].trim();
        if (/^(_gcl_|_gac_)/.test(n)) {
          document.cookie = n + '=; Max-Age=0; path=/';
          document.cookie = n + '=; Max-Age=0; path=/; domain=' + location.hostname;
        }
      });
    }
    function choose(v) {
      setC(v);
      if (bar) bar.hidden = true;
      syncBar();
      if (v === 'yes') gtag('consent', 'update', GRANTED);
      else { gtag('consent', 'update', DENIED); clearAdsCookies(); }
    }
    if (getC() === 'no') clearAdsCookies();
    var ckOk = $('#ckOk'), ckNo = $('#ckNo');
    if (ckOk) ckOk.onclick = function () { choose('yes'); };
    if (ckNo) ckNo.onclick = function () { choose('no'); };
    $$('[data-cookies]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); if (bar) { bar.hidden = false; syncBar(); } });
    });
    if (bar && !getC()) bar.hidden = false;

    var lastFocus = null;
    function openBooking(service) {
      var url = bookingUrl(service);
      if (!modal || !frame || !SR.exec) { window.location.assign(url); return; }

      bookingReady = false;
      var fb = ensureBookingFallback(url);
      if (fb) fb.style.display = 'none';
      if (bookingTimer) clearTimeout(bookingTimer);
      bookingTimer = setTimeout(function () {
        if (!bookingReady) {
          var fallback = ensureBookingFallback(url);
          if (fallback) fallback.style.display = 'block';
        }
      }, 4500);

      if (frame.getAttribute('src') !== url) frame.setAttribute('src', url);
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.classList.add('bk-open');
      modal.scrollTop = 0;
      syncBar();
      $$('body > *:not(#bookingModal)').forEach(function (el) { el.setAttribute('inert', ''); });
      var close = $('#bookingClose'); if (close) close.focus();
    }

    function goDirect(service) {
      window.location.assign(bookingUrl(service));
    }

    function closeBooking() {
      if (!modal) return;
      if (bookingTimer) { clearTimeout(bookingTimer); bookingTimer = null; }
      modal.hidden = true;
      document.body.classList.remove('bk-open');
      syncBar();
      $$('[inert]').forEach(function (el) { el.removeAttribute('inert'); });
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      if (/^#(reserver|reservar|book|booking|reservation)$/i.test(location.hash)) {
        var target = $('#reserver'); if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }

    if (modal && frame) {
      modal.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;
        var close = $('#bookingClose');
        var f = [close, frame].filter(Boolean), i = f.indexOf(document.activeElement);
        if (!f.length) return;
        e.preventDefault();
        f[(i + (e.shiftKey ? f.length - 1 : 1) + f.length) % f.length].focus();
      });
      var closeBtn = $('#bookingClose'); if (closeBtn) closeBtn.onclick = closeBooking;
      modal.addEventListener('click', function (e) { if (e.target === modal) closeBooking(); });
    }

    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('[data-book]') : null;
      if (!a) return;
      e.preventDefault();
      var service = a.getAttribute('data-book') || '';
      if (directBookingMode()) goDirect(service);
      else openBooking(service);
    });

    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal && !modal.hidden) closeBooking(); });

    function checkHash() {
      if (!/^#(reserver|reservar|book|booking|reservation)$/i.test(location.hash)) return;
      if (directBookingMode()) goDirect('');
      else openBooking('');
    }
    checkHash();
    window.addEventListener('hashchange', checkHash);
    syncBar();

    var res = $('#guideResult');
    if (res) {
      $$('.need').forEach(function (b) {
        b.addEventListener('click', function () {
          $$('.need').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
          var n = SR.needs && SR.needs[b.getAttribute('data-need')];
          if (!n) return;
          var html = '<p class="intro">' + n.intro + '</p><div class="picks">';
          n.picks.forEach(function (id, i) {
            var s = SR.services[id];
            if (!s) return;
            html += '<article class="pick"><span class="tag">' + (i === 0 ? SR.t.best : SR.t.alt) + '</span><h3>' + s.name +
              '</h3><p>' + s.desc + '</p><div class="row"><span class="prices">' + s.prices.map(function (p) { return '<span>' + p + '</span>'; }).join('') +
              '</span><a class="btn small" href="#reserver" data-book="' + id + '">' + SR.t.bookThis + '</a></div></article>';
          });
          res.innerHTML = html + '</div>';
        });
      });
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px' });
      $$('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      $$('.reveal').forEach(function (el) { el.classList.add('in'); });
    }
  });
})();
