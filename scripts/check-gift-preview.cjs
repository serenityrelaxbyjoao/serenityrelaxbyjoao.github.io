const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const form = read('bons-cadeaux/index.html');
const script = read('bons-cadeaux/bons-cadeaux.js');
const config = read('bons-cadeaux/test-config.js');
for (const rel of ['conditions-bons-cadeaux.html', 'confidentialite-bons-cadeaux.html', 'bons-cadeaux/confirmation/index.html']) {
  assert.ok(fs.existsSync(path.join(root, rel)), rel + ' must exist');
}
assert.ok(form.includes('id="acceptTerms"') && form.includes('required'), 'CGV acceptance must be required');
assert.ok(form.includes('conditions-bons-cadeaux.html'), 'CGV link missing');
assert.ok(form.includes('confidentialite-bons-cadeaux.html'), 'Privacy policy link missing');
assert.ok(form.includes('./test-config.js'), 'Test config script missing');
assert.ok(form.includes('id="emailCode"'), 'Email verification control missing');
assert.ok(config.includes('enabled: false'), 'The purchase preview must ship with payments disabled');
assert.ok(script.includes('verifiedEmail !=='), 'Checkout must reject unverified email');
assert.ok(script.includes('checkout.stripe.com'), 'Only verified Stripe Checkout redirect should be accepted');
assert.ok(script.includes('getGiftCatalogTest'), 'Server-side catalog connection missing');
const cgv = read('conditions-bons-cadeaux.html');
const privacy = read('confidentialite-bons-cadeaux.html');
assert.ok(cgv.includes('douze mois'), 'Yearly advisory recommendation missing');
assert.ok(cgv.includes('confidentialite-bons-cadeaux.html'), 'CGV must link to separate privacy policy');
assert.ok(privacy.includes('Stripe') && privacy.includes('Firestore'), 'Privacy information incomplete');
assert.ok(!cgv.includes('TVA comprise'), 'No tax claim should be introduced');
console.log('Gift checkout preview structure and safety gates OK');
