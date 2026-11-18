// Tests du lecteur d'offre du mois (monthly-offer-firestore.js) avec DOM et fetch simulés.
// Lancer : node --test tests/monthly-offer-firestore.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'monthly-offer-firestore.js'), 'utf8');

function el(tag) {
  return {
    tag, textContent: '', className: '', href: '', hidden: false, style: {}, children: [],
    appendChild(c) { this.children.push(c); return c; },
    querySelector() { return null; }
  };
}

function field(value) {
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  const fields = {};
  for (const [k, v] of Object.entries(value)) fields[k] = field(v);
  return { mapValue: { fields } };
}

async function run({ lang = 'de', doc, fetchOk = true }) {
  const card = el('div');
  const document = {
    documentElement: { lang },
    readyState: 'complete',
    querySelector: sel => (sel === '.hero-promo' ? card : null),
    getElementById: () => null,
    createElement: el,
    addEventListener() {}
  };
  const fetch = () => Promise.resolve({
    ok: fetchOk,
    json: () => Promise.resolve({ fields: Object.fromEntries(Object.entries(doc).map(([k, v]) => [k, field(v)])) })
  });
  vm.runInNewContext(source, { document, fetch, Promise, Number, Object, Error, String, Math, encodeURIComponent, Date });
  await new Promise(r => setTimeout(r, 20));
  return { card };
}

const future = '2999-12-31';
const offer = (over = {}) => ({
  active: true, kind: 'offre', title: 'Novembre Bleu', description: 'Texte FR',
  duration: 90, price: 110, originalPrice: 150, startsOn: '2000-01-01', endsOn: future,
  translations: {
    de: { title: 'Blauer November', description: 'Text DE' },
    pt: { title: 'Novembro Azul', description: '' }
  },
  ...over
});

test('active offer: shows the German title and description, with the server price and link', async () => {
  const { card } = await run({ lang: 'de', doc: offer() });
  assert.equal(card.hidden, false);
  assert.equal(card.children.length, 1);
  const panel = card.children[0];
  const heading = panel.children.find(c => c.tag === 'h2');
  assert.equal(heading.textContent, 'Blauer November');
  const description = panel.children.find(c => c.tag === 'p' && c.textContent === 'Text DE');
  assert.ok(description, 'translated description shown');
  const price = panel.children.find(c => c.tag === 'p' && c.textContent.includes('CHF'));
  assert.equal(price.textContent, '90 Min. · 110 CHF');
  const button = panel.children.find(c => c.tag === 'a');
  assert.equal(button.href, 'reservation/?lang=de&service=offre-du-mois');
});

test('missing translation falls back to the French text', async () => {
  const { card } = await run({ lang: 'pt', doc: offer({ translations: { de: { title: 'x', description: '' } } }) });
  const heading = card.children[0].children.find(c => c.tag === 'h2');
  assert.equal(heading.textContent, 'Novembre Bleu');
});

test('translation in the visitor language is used (Portuguese)', async () => {
  const { card } = await run({ lang: 'pt', doc: offer() });
  const heading = card.children[0].children.find(c => c.tag === 'h2');
  assert.equal(heading.textContent, 'Novembro Azul');
});

test('expired offer: the promotional block is hidden and no offer is shown', async () => {
  const { card } = await run({ lang: 'fr', doc: offer({ endsOn: '2000-01-02' }) });
  assert.equal(card.hidden, true);
  assert.equal(card.children.length, 0);
});

test('inactive offer: the existing block is left as it is', async () => {
  const { card } = await run({ lang: 'fr', doc: offer({ active: false }) });
  assert.equal(card.hidden, false);
  assert.equal(card.children.length, 0);
});

test('offer not yet started: nothing is replaced', async () => {
  const { card } = await run({ lang: 'fr', doc: offer({ startsOn: '2999-01-01' }) });
  assert.equal(card.children.length, 0);
  assert.equal(card.hidden, false);
});

test('Firestore unavailable: the existing design is kept', async () => {
  const { card } = await run({ lang: 'fr', doc: offer(), fetchOk: false });
  assert.equal(card.hidden, false);
  assert.equal(card.children.length, 0);
});
