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
  var instagramWords = {
    fr: ['Préparer pour Instagram', 'Message à partager', 'Copier le message', 'Message copié', 'Partager l’image et le message', 'Choisissez Instagram si proposé. Si le texte n’est pas repris, copiez le message puis collez-le dans Instagram.', 'Sur cet appareil, téléchargez l’image puis copiez le message pour les ajouter dans Instagram.', 'Préparation de l’image…', 'Sélectionnez et copiez le message ci-dessus.'],
    pt: ['Preparar para Instagram', 'Mensagem para partilhar', 'Copiar mensagem', 'Mensagem copiada', 'Partilhar imagem e mensagem', 'Escolha Instagram se aparecer. Se o texto não for incluído, copie a mensagem e cole-a no Instagram.', 'Neste aparelho, descarregue a imagem e copie a mensagem para as adicionar no Instagram.', 'A preparar imagem…', 'Selecione e copie a mensagem acima.'],
    en: ['Prepare for Instagram', 'Message to share', 'Copy message', 'Message copied', 'Share image and message', 'Choose Instagram if offered. If the text is missing, copy the message and paste it into Instagram.', 'On this device, download the image and copy the message to add them in Instagram.', 'Preparing image…', 'Select and copy the message above.'],
    de: ['Für Instagram vorbereiten', 'Nachricht zum Teilen', 'Nachricht kopieren', 'Nachricht kopiert', 'Bild und Nachricht teilen', 'Wählen Sie Instagram, falls angeboten. Wenn der Text fehlt, kopieren Sie die Nachricht und fügen Sie sie in Instagram ein.', 'Laden Sie das Bild herunter und kopieren Sie die Nachricht, um sie in Instagram einzufügen.', 'Bild wird vorbereitet…', 'Nachricht oben auswählen und kopieren.'],
    es: ['Preparar para Instagram', 'Mensaje para compartir', 'Copiar mensaje', 'Mensaje copiado', 'Compartir imagen y mensaje', 'Elige Instagram si aparece. Si falta el texto, copia el mensaje y pégalo en Instagram.', 'En este dispositivo, descarga la imagen y copia el mensaje para añadirlos en Instagram.', 'Preparando imagen…', 'Selecciona y copia el mensaje de arriba.'],
    it: ['Prepara per Instagram', 'Messaggio da condividere', 'Copia messaggio', 'Messaggio copiato', 'Condividi immagine e messaggio', 'Scegli Instagram, se disponibile. Se manca il testo, copia il messaggio e incollalo in Instagram.', 'Su questo dispositivo, scarica l’immagine e copia il messaggio per aggiungerli in Instagram.', 'Preparazione immagine…', 'Seleziona e copia il messaggio qui sopra.']
  };
  var ig = instagramWords[document.documentElement.lang.split('-')[0]] || instagramWords.fr;
  var captions = {
    fr: 'Un moment pour soi 💙\nNovembre Bleu : 90 minutes de massage à 110 CHF au lieu de 150 CHF.\n📍 Cointrin, Genève · Offre ouverte à toutes et à tous, jusqu’au 30 novembre 2026.\n@serenity.relax.by.joao\nDécouvrez l’offre et réservez : ',
    pt: 'Um momento para cuidar de si 💙\nNovembro Azul: 90 minutos de massagem por 110 CHF em vez de 150 CHF.\n📍 Cointrin, Genebra · Oferta para todas as pessoas, até 30 de novembro de 2026.\n@serenity.relax.by.joao\nVeja a oferta e reserve: ',
    en: 'A moment for yourself 💙\nBlue November: a 90-minute massage for 110 CHF instead of 150 CHF.\n📍 Cointrin, Geneva · Open to everyone, until 30 November 2026.\n@serenity.relax.by.joao\nDiscover the offer and book: ',
    de: 'Ein Moment für Sie 💙\nBlauer November: 90 Minuten Massage für 110 CHF statt 150 CHF.\n📍 Cointrin, Genf · Für alle, bis zum 30. November 2026.\n@serenity.relax.by.joao\nAngebot entdecken und buchen: ',
    es: 'Un momento para ti 💙\nNoviembre Azul: 90 minutos de masaje por 110 CHF en lugar de 150 CHF.\n📍 Cointrin, Ginebra · Para todas las personas, hasta el 30 de noviembre de 2026.\n@serenity.relax.by.joao\nDescubre la oferta y reserva: ',
    it: 'Un momento per te 💙\nNovembre Blu: 90 minuti di massaggio a 110 CHF invece di 150 CHF.\n📍 Cointrin, Ginevra · Per tutti, fino al 30 novembre 2026.\n@serenity.relax.by.joao\nScopri l’offerta e prenota: '
  };
  var caption = (captions[document.documentElement.lang.split('-')[0]] || captions.fr) + url;
  var imagePromises = {};
  function prepareImage(src, name, mime) {
    if (!imagePromises[src]) imagePromises[src] = fetch(src).then(function (response) {
      if (!response.ok) throw new Error('Image unavailable');
      return response.blob();
    }).then(function (blob) { return new File([blob], name, {type: mime}); }).catch(function (error) { imagePromises[src] = null; throw error; });
    return imagePromises[src];
  }
  document.querySelectorAll('[data-offer-share]').forEach(function (host, index) {
    var shareUrl = host.dataset.shareUrl || url;
    var shareTitle = host.dataset.shareTitle || 'Novembre Bleu · Serenity & Relax by João';
    var shareText = host.dataset.shareText || '90 min · 110 CHF · Cointrin, Genève · Jusqu’au 30 novembre 2026';
    var shareWa = host.dataset.shareWa || 'Novembre Bleu · 90 min · 110 CHF · Jusqu’au 30 novembre 2026';
    var shareCaption = host.dataset.shareCaption ? host.dataset.shareCaption + shareUrl : caption;
    var shareImg = host.dataset.shareImage || '/images/novembre-bleu-2026.jpg';
    var shareFile = host.dataset.shareFile || 'serenity-relax-novembre-bleu-2026.jpg';
    var shareMime = host.dataset.shareMime || 'image/jpeg';
    var trigger = document.createElement('button');
    trigger.type = 'button'; trigger.className = 'offer-share-trigger';
    trigger.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V3m0 0L7 8m5-5 5 5M4 14v6h16v-6"/></svg>'; trigger.appendChild(document.createTextNode(' ' + t[0])); trigger.setAttribute('aria-label', t[0]); trigger.title = t[0];
    trigger.setAttribute('aria-expanded', 'false');
    var panel = document.createElement('div');
    panel.className = 'offer-share-panel'; panel.id = 'offer-share-' + index; panel.hidden = true;
    trigger.setAttribute('aria-controls', panel.id);
    function icon(name) {
      var paths = {
        whatsapp: '<path d="M20.5 11.7a8.5 8.5 0 0 1-12.3 7.6L3 21l1.8-5A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="M8.3 7.6c-.5.6-.8 1.2-.5 2.2.6 2 2.7 4.3 4.8 5.2 1 .4 2 .3 2.7-.4l.7-.9-2.4-1.2-1 1c-1.5-.6-2.7-1.8-3.4-3.3l.9-1.1-1.3-2.3Z"/>',
        facebook: '<path d="M14 21v-8h3l.5-4H14V7c0-1.1.4-2 2-2h2V2.3A20 20 0 0 0 15 2c-3.1 0-5 1.8-5 5v2H7v4h3v8"/>',
        instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.7" r=".7" fill="currentColor" stroke="none"/>',
        copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
        download: '<path d="M12 3v12m0 0-5-5m5 5 5-5M4 17v4h16v-4"/>',
        share: '<path d="M12 16V3m0 0L7 8m5-5 5 5M4 14v6h16v-6"/>',
        close: '<path d="M5 5l14 14M19 5 5 19"/>'
      };
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      svg.innerHTML = paths[name] || paths.share;
      return svg;
    }
    function iconControl(el, label, name) {
      el.classList.add('offer-share-icon');
      el.textContent = '';
      el.appendChild(icon(name));
      el.setAttribute('aria-label', label);
      el.title = label;
      return el;
    }
    function button(label, action) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = label;
      b.addEventListener('click', action); iconControl(b, label, label === t[1] ? 'copy' : label === t[5] ? 'close' : label.indexOf('Instagram') === 0 ? 'instagram' : 'share'); panel.appendChild(b); return b;
    }
    function link(label, href) {
      var a = document.createElement('a'); a.textContent = label; a.href = href;
      a.target = '_blank'; a.rel = 'noopener noreferrer'; iconControl(a, label, label === 'WhatsApp' ? 'whatsapp' : label === 'Facebook' ? 'facebook' : 'download'); panel.appendChild(a); return a;
    }
    if (typeof navigator.share === 'function') {
      button(t[7], async function () {
        try { await navigator.share({title: shareTitle, text: shareText, url: shareUrl}); }
        catch (err) { if (err.name !== 'AbortError') { field.hidden = false; field.focus(); field.select(); status.textContent = t[6]; } }
      });
    }
    link('WhatsApp', 'https://wa.me/?text=' + encodeURIComponent(shareWa + '\n' + shareUrl));
    link('Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl));
    var composer = document.createElement('div'); composer.className = 'offer-instagram'; composer.hidden = true;
    var message = document.createElement('textarea'); message.value = shareCaption; message.rows = 8;
    message.setAttribute('aria-label', ig[1]);
    var instruction = document.createElement('p'); instruction.textContent = ig[5];
    var igStatus = document.createElement('p'); igStatus.setAttribute('role', 'status');
    var copyMessage = document.createElement('button'); copyMessage.type = 'button'; copyMessage.textContent = ig[2];
    copyMessage.addEventListener('click', async function () {
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(message.value); igStatus.textContent = ig[3];
      } catch (error) { message.focus(); message.select(); igStatus.textContent = ig[8]; }
    });
    var shareImage = document.createElement('button'); shareImage.type = 'button'; shareImage.textContent = ig[4]; shareImage.disabled = true;
    var readyImage;
    shareImage.addEventListener('click', async function () {
      if (!readyImage) return;
      try {
        // No fetch or clipboard await here: retain the user's activation for the share sheet.
        await navigator.share({files: [readyImage], title: shareTitle, text: message.value});
      } catch (error) { if (error.name !== 'AbortError') igStatus.textContent = ig[6]; }
    });
    composer.appendChild(message); composer.appendChild(copyMessage); composer.appendChild(shareImage); composer.appendChild(instruction); composer.appendChild(igStatus);
    button('Instagram · ' + ig[0], async function () {
      composer.hidden = !composer.hidden;
      if (composer.hidden || readyImage) return;
      if (typeof navigator.share !== 'function' || typeof navigator.canShare !== 'function') { igStatus.textContent = ig[6]; return; }
      igStatus.textContent = ig[7];
      try {
        var image = await prepareImage(shareImg, shareFile, shareMime);
        if (!navigator.canShare({files: [image]})) { igStatus.textContent = ig[6]; return; }
        readyImage = image; shareImage.disabled = false; igStatus.textContent = '';
      } catch (error) { igStatus.textContent = ig[6]; }
    });
    panel.appendChild(composer);
    button(t[1], async function () {
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(shareUrl); status.textContent = t[2];
      } catch (err) { field.hidden = false; field.focus(); field.select(); status.textContent = t[6]; }
    });
    var download = link(t[4], shareImg);
    download.download = shareFile; download.removeAttribute('target');
    
    var field = document.createElement('input'); field.type = 'url'; field.readOnly = true; field.value = shareUrl;
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
