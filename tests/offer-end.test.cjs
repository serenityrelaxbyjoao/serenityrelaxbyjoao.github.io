// Fin de l'offre Novembre Bleu (offer-end.js) avec dates fictives, avant et après le 30/11/2026 (Genève).
// Lancer : node --test tests/offer-end.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'offer-end.js'), 'utf8');

function run(isoNow, pathname) {
  const hero = { hidden: false };
  const link = { hidden: false };
  const share = { hidden: false };
  const inserted = [];
  const document = {
    readyState: 'complete',
    body: {},
    querySelector: sel => (sel === '.hero-promo' ? hero : sel === '[data-campaign-booking]' ? null : sel === '.offer-ended-note' ? null : sel === 'main' ? null : null),
    querySelectorAll: sel => (sel.includes('offre-du-mois') ? [link] : sel === '[data-offer-share]' ? [share] : []),
    createElement: () => ({ textContent: '', className: '' }),
    addEventListener() {}
  };
  const RealDate = Date;
  class FakeDate extends RealDate { constructor(...a) { super(...(a.length ? a : [isoNow])); } }
  FakeDate.now = () => new RealDate(isoNow).getTime();
  vm.runInNewContext(source, { document, Date: FakeDate, location: { pathname } });
  return { hero, link, share };
}

test('before 1 December, the offer stays visible and bookable', () => {
  const r = run('2026-11-30T10:00:00Z', '/');
  assert.equal(r.hero.hidden, false);
  assert.equal(r.link.hidden, false);
});

test('from 1 December (Geneva time), the hero and booking link are hidden', () => {
  const r = run('2026-12-01T10:00:00Z', '/');
  assert.equal(r.hero.hidden, true);
  assert.equal(r.link.hidden, true);
  assert.equal(r.share.hidden, true);
});

test('the boundary is Geneva midnight, not UTC', () => {
  // 2026-11-30 23:30 UTC is already 1 December in Geneva.
  const r = run('2026-11-30T23:30:00Z', '/');
  assert.equal(r.hero.hidden, true);
});
