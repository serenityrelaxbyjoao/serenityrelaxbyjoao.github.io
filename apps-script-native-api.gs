/*
 * Serenity & Relax by João — API bridge for the native GitHub Pages booking form.
 *
 * Add this code to the SAME Apps Script project that already contains:
 * getConfiguration(), getAvailability(input), bookAppointment(input).
 *
 * The bridge uses POST -> hidden iframe -> postMessage. Personal data are never
 * placed in the URL and no CORS relaxation is required.
 */

var NATIVE_SITE_ORIGIN = 'https://serenityrelaxbyjoao.github.io';

function doPost(e) {
  var transportId = '';
  try {
    var p = (e && e.parameter) || {};
    var action = String(p.action || '');
    transportId = String(p.transportId || '');
    if (!/^[A-Za-z0-9_-]{10,100}$/.test(transportId)) throw new Error('Transport invalide.');

    var payload = {};
    if (p.payload) {
      payload = JSON.parse(String(p.payload));
      if (!payload || typeof payload !== 'object') throw new Error('Données invalides.');
    }

    var result;
    if (action === 'config') {
      result = getConfiguration();
    } else if (action === 'availability') {
      result = getAvailability(payload);
    } else if (action === 'book') {
      result = bookAppointment(payload);
    } else {
      throw new Error('Action inconnue.');
    }

    return nativeApiReply_(transportId, result);
  } catch (err) {
    return nativeApiReply_(transportId || 'unknown', {
      ok: false,
      error: (err && err.publicMessage) || 'Le service est temporairement indisponible. Réessayez ou contactez-moi sur WhatsApp.'
    });
  }
}

function nativeApiReply_(transportId, result) {
  var message = {
    source: 'sr-native-booking',
    transportId: String(transportId),
    result: result
  };

  var json = JSON.stringify(message)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  var html = '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
    '<script>try{window.top.postMessage(' + json + ',' + JSON.stringify(NATIVE_SITE_ORIGIN) + ');}catch(e){}<\/script>' +
    '</body></html>';

  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
