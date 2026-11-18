// Contrat minimal: le prix de l'offre affiché par le serveur est transmis à la réservation.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('booking uses quoted monthly-offer price for server-side verification', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'reservation.js'), 'utf8');
  const submit = source.split("  $('submit').onclick=async function(){")[1]?.split("  async function init(){")[0];
  assert.ok(submit, 'booking submission handler must be present');
  assert.match(submit, /data\.serviceId === 'offre-du-mois'/);
  assert.match(submit, /state\.quote/);
  assert.match(submit, /data\.expectedPrice\s*=\s*Number\(state\.quote\.price\)/);
  assert.match(submit, /callApi\('book',data,/);
});
