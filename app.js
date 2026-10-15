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

  window.addEventListener('sr-booking-complete', function (e) {
    var d = e && e.detail ? e.detail : {};
    conv(LABELS.booking, {
      value: Number(d.price) || 0,
      currency: d.currency || 'CHF'
    });
  });

  function bookingUrl(service) {
    var base = 'reservation/?lang=' + encodeURIComponent(SR.lang || 'fr');
    return base + (service ? '&service=' + encodeURIComponent(service) : '');
  }

  function goBooking(service, replaceHistory) {
    var url = bookingUrl(service || '');
    if (replaceHistory) window.location.replace(url);
    else window.location.assign(url);
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (/wa\.me|whatsapp\.com/i.test(h)) conv(LABELS.whatsapp);
    else if (/^tel:/i.test(h)) conv(LABELS.phone);
  }, true);

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
        if (!lm.hidden) {
          var c = lm.querySelector('[aria-current]') || lm.querySelector('a');
          if (c) c.focus();
        }
      });
      document.addEventListener('click', function (e) {
        if (!lm.hidden && !lm.contains(e.target) && e.target !== lb) langMenu(false);
      });
      document.addEventListener('keydown', function (e) {
        if (lm.hidden) return;
        var list = $$('a', lm), i = list.indexOf(document.activeElement);
        if (!list.length) return;
        if (e.key === 'Escape') { langMenu(false); lb.focus(); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1 + list.length) % list.length].focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
      });
      lm.addEventListener('focusout', function (e) {
        if (!lm.contains(e.relatedTarget) && e.relatedTarget !== lb) langMenu(false);
      });
    }

    var bar = $('#cookieBar');
    function syncBar() {
      if (!mbar) return;
      mbar.classList.toggle('hide', !!(bar && !bar.hidden));
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
      a.addEventListener('click', function (e) {
        e.preventDefault();
        if (bar) { bar.hidden = false; syncBar(); }
      });
    });
    if (bar && !getC()) bar.hidden = false;
    syncBar();

    $$('[data-book]').forEach(function (a) {
      a.setAttribute('href', bookingUrl(a.getAttribute('data-book') || ''));
      a.removeAttribute('target');
      a.removeAttribute('rel');
    });

    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('[data-book]') : null;
      if (!a) return;
      e.preventDefault();
      goBooking(a.getAttribute('data-book') || '');
    });

    function checkHash() {
      if (/^#(reserver|reservar|book|booking|reservation)$/i.test(location.hash)) goBooking('', true);
    }
    checkHash();
    window.addEventListener('hashchange', checkHash);

    var res = $('#guideResult');
    if (res) {
      $$('.need').forEach(function (b) {
        b.addEventListener('click', function () {
          $$('.need').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
          var n = SR.needs && SR.needs[b.getAttribute('data-need')];
          if (!n) return;
          var html = '<p class="intro">' + n.intro + '</p><div class="picks">';
          n.picks.forEach(function (id, i) {
            var s = SR.services && SR.services[id];
            if (!s) return;
            html += '<article class="pick"><span class="tag">' + (i === 0 ? SR.t.best : SR.t.alt) + '</span><h3>' + s.name +
              '</h3><p>' + s.desc + '</p><div class="row"><span class="prices">' + s.prices.map(function (p) { return '<span>' + p + '</span>'; }).join('') +
              '</span><a class="btn small" href="' + bookingUrl(id) + '" data-book="' + id + '">' + SR.t.bookThis + '</a></div></article>';
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
