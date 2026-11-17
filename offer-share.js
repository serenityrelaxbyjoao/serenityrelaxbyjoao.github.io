/* Sharing is initiated only by the visitor. No automatic posts or messages. */
(function () {
  'use strict';
  var url = 'https://serenityrelaxbyjoao.ch/offres/novembre-bleu-2026.html';
  var words = {
    fr: ['Partager l’offre', 'Copier le lien', 'Lien copié', 'Descarregar', 'Télécharger l’image', 'Fermer', 'Copiez ce lien pour le partager', 'Partager avec une application', 'Pour Instagram : téléchargez l’image et ajoutez le lien à votre story.'],
    pt: ['Partilhar a oferta', 'Copiar link', 'Link copiado', '', 'Descarregar imagem', 'Fechar', 'Copie este link para partilhar', 'Partilhar numa aplicação', 'Para Instagram: descarregue a imagem e adicione o link à sua história.'],
    en: ['Share this offer', 'Copy link', 'Link copied', '', 'Download image', 'Close', 'Copy this link to share', 'Share with an app', 'For Instagram: download the image and add the link to your story.'],
    de: ['Angebot teilen', 'Link kopieren', 'Link kopiert', '', 'Bild herunterladen', 'Schließen', 'Diesen Link zum Teilen kopieren', 'Mit einer App teilen', 'Für Instagram: Bild herunterladen und den Link zur Story hinzufügen.'],
    es: ['Compartir la oferta', 'Copiar enlace', 'Enlace copiado', '', 'Descargar imagen', 'Cerrar', 'Copia este enlace para compartir', 'Compartir con una aplicación', 'Para Instagram: descarga la imagen y añade el enlace a tu historia.'],
    it: ['Condividi l’offerta', 'Copia link', 'Link copiato', '', 'Scarica immagine', 'Chiudi', 'Copia questo link per condividerlo', 'Condividi con un’app', 'Per Instagram: scarica l’immagine e aggiungi il link alla tua storia.']
  };
  var t = words[document.documentElement.lang.split('-')[0]] || words.fr;
  document.querySelectorAll('[data-offer-share]').forEach(function (host, index) {
    var trigger = document.createElement('button');
    trigger.type = 'button'; trigger.className = 'offer-share-trigger';
    trigger.textContent = '↗ ' + t[0];
    trigger.setAttribute('aria-expanded', 'false');
    var panel = document.createElement('div');
    panel.className = 'offer-share-panel'; panel.id = 'offer-share-' + index; panel.hidden = true;
    trigger.setAttribute('aria-controls', panel.id);
    function button(label, action) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = label;
      b.addEventListener('click', action); panel.appendChild(b); return b;
    }
    function link(label, href) {
      var a = document.createElement('a'); a.textContent = label; a.href = href;
      a.target = '_blank'; a.rel = 'noopener noreferrer'; panel.appendChild(a); return a;
    }
    if (typeof navigator.share === 'function') {
      button(t[7], async function () {
        try { await navigator.share({title: 'Novembre Bleu · Serenity & Relax by João', text: '90 min · 110 CHF · Cointrin, Genève · Jusqu’au 30 novembre 2026', url: url}); }
        catch (err) { if (err.name !== 'AbortError') { field.hidden = false; field.focus(); field.select(); status.textContent = t[6]; } }
      });
    }
    link('WhatsApp', 'https://wa.me/?text=' + encodeURIComponent('Novembre Bleu · 90 min · 110 CHF · Jusqu’au 30 novembre 2026\n' + url));
    link('Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url));
    button(t[1], async function () {
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(url); status.textContent = t[2];
      } catch (err) { field.hidden = false; field.focus(); field.select(); status.textContent = t[6]; }
    });
    var download = link(t[4], '/images/novembre-bleu-2026.jpg');
    download.download = 'serenity-relax-novembre-bleu-2026.jpg'; download.removeAttribute('target');
    var note = document.createElement('p'); note.textContent = t[8]; panel.appendChild(note);
    var field = document.createElement('input'); field.type = 'url'; field.readOnly = true; field.value = url;
    field.setAttribute('aria-label', t[6]); field.hidden = true; panel.appendChild(field);
    var status = document.createElement('p'); status.setAttribute('role', 'status'); panel.appendChild(status);
    function close() { panel.hidden = true; trigger.setAttribute('aria-expanded', 'false'); }
    button(t[5], function () { close(); trigger.focus(); });
    trigger.addEventListener('click', function () { panel.hidden = !panel.hidden; trigger.setAttribute('aria-expanded', String(!panel.hidden)); });
    host.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !panel.hidden) { event.preventDefault(); event.stopPropagation(); close(); trigger.focus(); } });
    document.addEventListener('click', function (event) { if (!host.contains(event.target)) close(); });
    host.appendChild(trigger); host.appendChild(panel);
  });
  var booking = document.querySelector('[data-campaign-booking]');
  if (booking && new Date() >= new Date('2026-12-01T00:00:00+01:00')) {
    booking.hidden = true;
    document.getElementById('offer-expired').hidden = false;
  }
})();
