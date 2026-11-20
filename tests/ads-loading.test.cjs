const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('app.js', 'utf8');
const ADS = 'AW-18220930952';

// Runs app.js in a fake browser. Nothing touches the network or Google: the "script" is only recorded.
function boot({ path = '/', consent = null, ready = 'loading' } = {}) {
  const handlers = {}, timers = [], appended = [];
  const store = consent ? { 'sr-cookies': consent } : {};
  const add = (type, fn) => { (handlers[type] = handlers[type] || []).push(fn); };
  const del = (type, fn) => { handlers[type] = (handlers[type] || []).filter(f => f !== fn); };
  const location = { origin: 'https://serenityrelaxbyjoao.ch', pathname: path, search: '', hash: '', href: 'https://serenityrelaxbyjoao.ch' + path };
  const ctx = {
    location, navigator: {},
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = v; } },
    sessionStorage: { getItem: () => null, setItem() {} },
    document: {
      readyState: ready, referrer: '', cookie: '',
      head: { appendChild: el => appended.push(el) },
      createElement: () => ({}),
      querySelector: () => null, querySelectorAll: () => [], getElementById: () => null,
      addEventListener: add, removeEventListener: del,
    },
    addEventListener: add, removeEventListener: del,
    setTimeout: (fn, ms) => { timers.push({ fn, ms, live: true }); return timers.length; },
    clearTimeout: id => { if (timers[id - 1]) timers[id - 1].live = false; },
    SR: { lang: 'fr' },
  };
  ctx.window = ctx;
  vm.runInNewContext(source, ctx);
  const fire = (type, ev = {}) => (handlers[type] || []).slice().forEach(fn => fn(ev));
  const calls = () => Array.from(ctx.dataLayer || []).map(a => Array.from(a));
  const runTimers = () => timers.filter(t => t.live).forEach(t => { t.live = false; t.fn(); });
  return { ctx, fire, calls, appended, runTimers, timers, location };
}
const tagInjected = env => env.appended.some(s => /googletagmanager\.com\/gtag\/js\?id=AW-/.test(s.src || ''));

test('new visitor: consent is denied first and the Google script is NOT requested during first render', () => {
  const env = boot();
  assert.deepEqual(env.calls()[0].slice(0, 2), ['consent', 'default']);
  assert.equal(env.calls()[0][2].analytics_storage, 'denied');
  assert.equal(env.calls()[0][2].ad_storage, 'denied');
  assert.equal(tagInjected(env), false);
  assert.equal(env.calls().some(c => c[0] === 'config'), false);
});

test('new visitor: Google script loads 4 s after the page load, still with consent denied and no GA4', () => {
  const env = boot();
  env.fire('load');
  assert.equal(tagInjected(env), false);
  assert.ok(env.timers.some(t => t.ms === 4000));
  env.runTimers();
  assert.equal(tagInjected(env), true);
  assert.ok(env.calls().some(c => c[0] === 'config' && c[1] === ADS));
  assert.equal(env.calls().some(c => c[0] === 'config' && c[1] === 'G-CCB168JXJR'), false);
  assert.equal(env.ctx['ga-disable-G-CCB168JXJR'], true);
});

test('new visitor: first touch or click loads the Google script right away (once)', () => {
  const env = boot({ ready: 'complete' });
  assert.equal(tagInjected(env), false);
  env.fire('pointerdown');
  env.fire('keydown');
  assert.equal(env.appended.length, 1);
});

test('visitor who already accepted: script and GA4 start immediately', () => {
  const env = boot({ consent: 'yes' });
  assert.equal(tagInjected(env), true);
  assert.ok(env.calls().some(c => c[0] === 'consent' && c[1] === 'update' && c[2].analytics_storage === 'granted'));
  assert.ok(env.calls().some(c => c[0] === 'config' && c[1] === 'G-CCB168JXJR'));
});

test('visitor who declined: still deferred, and GA4 stays disabled', () => {
  const env = boot({ consent: 'no' });
  assert.equal(tagInjected(env), false);
  env.fire('pointerdown');
  assert.equal(env.ctx['ga-disable-G-CCB168JXJR'], true);
  assert.equal(env.calls().some(c => c[0] === 'config' && c[1] === 'G-CCB168JXJR'), false);
});

test('booking page loads the Google tag immediately', () => {
  assert.equal(tagInjected(boot({ path: '/reservation/' })), true);
});

function click(env, anchor) {
  let prevented = false;
  const ev = { target: { closest: sel => (sel === 'a[href]' ? anchor : null) }, defaultPrevented: false, button: 0, preventDefault() { prevented = true; } };
  env.fire('click', ev);
  return () => prevented;
}
const wa = { getAttribute: () => 'https://wa.me/41783336823', href: 'https://wa.me/41783336823', target: '' };

test('WhatsApp click before the tag is ready: conversion queued, navigation held until Google is told', () => {
  const env = boot({ ready: 'complete' });
  const prevented = click(env, wa);
  assert.equal(prevented(), true);
  assert.equal(env.location.href.includes('wa.me'), false);
  const conv = env.calls().find(c => c[0] === 'event' && c[1] === 'conversion');
  assert.equal(conv[2].send_to, ADS + '/97HiCIb1ho8dEIivtfBD');
  assert.equal(tagInjected(env), true);
  const order = env.calls().map(c => c[0]);
  assert.ok(order.indexOf('config') < order.indexOf('event'), 'config is queued before the conversion');
  conv[2].event_callback();
  assert.equal(env.location.href, 'https://wa.me/41783336823');
});

test('WhatsApp click: navigation still happens if Google never answers (1.2 s safety net)', () => {
  const env = boot({ ready: 'complete' });
  click(env, wa);
  env.timers.filter(t => t.ms === 1200).forEach(t => t.fn());
  assert.equal(env.location.href, 'https://wa.me/41783336823');
});

test('WhatsApp click when the tag is ready: nothing is delayed and the conversion is sent', () => {
  const env = boot({ consent: 'yes' });
  env.ctx.google_tag_manager = { [ADS]: {} };
  const prevented = click(env, wa);
  assert.equal(prevented(), false);
  assert.equal(env.calls().filter(c => c[0] === 'event' && c[1] === 'conversion').length, 1);
});

test('phone link keeps its conversion label', () => {
  const env = boot({ ready: 'complete' });
  click(env, { getAttribute: () => 'tel:+41783336823', href: 'tel:+41783336823', target: '' });
  const conv = env.calls().find(c => c[0] === 'event' && c[1] === 'conversion');
  assert.equal(conv[2].send_to, ADS + '/Q9zdCPn-jI8dEIivtfBD');
});

test('confirmed booking is measured once, only with consent, and only for a valid id', () => {
  const noConsent = boot({ path: '/reservation/' });
  assert.equal(noConsent.ctx.SR.trackBooking('booking-abc123'), false);
  const env = boot({ path: '/reservation/', consent: 'yes' });
  assert.equal(env.ctx.SR.trackBooking('<script>'), false);
  assert.equal(env.ctx.SR.trackBooking('booking-abc123'), true);
  assert.equal(env.ctx.SR.trackBooking('booking-abc123'), false);
  const names = env.calls().filter(c => c[0] === 'event').map(c => c[1] + ':' + (c[2].send_to || ''));
  assert.deepEqual(names, ['booking_complete:G-CCB168JXJR', 'conversion:' + ADS + '/JmD-CMfCmKYdEIivtfBD']);
});
