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
  var imagePromise;
  var iconPaths = {
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/>',
    whatsapp: '<path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.5L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.6Z"/><path d="M8 7.5c-2 2 2.5 7.7 5.9 8.4 1.3.3 2.5-.5 2.6-1.5l-2.4-1.2-1 1c-1.6-.7-2.9-2-3.6-3.6l1-1L9.4 7.3Z"/>',
    facebook: '<path d="M14.5 21v-8h3l.5-4h-3.5V7c0-1 .3-2 2-2H18V1.5A20 20 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v8"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>',
    link: '<path d="m10 13 4-4M8 15l-1 1a3.5 3.5 0 0 1-5-5l4-4a3.5 3.5 0 0 1 5 0m2 2 1-1a3.5 3.5 0 0 1 5 5l-4 4a3.5 3.5 0 0 1-5 0" transform="translate(1 1)"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>'
  };
  function decorate(control, name, label) {
    control.setAttribute('aria-label', label); control.setAttribute('title', label);
    control.classList.add('offer-icon-button');
    var icon = document.createElement('span'); icon.className = 'offer-icon'; icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + iconPaths[name] + '</svg>';
    control.appendChild(icon); return control;
  }
  function prepareImage() {
    if (!imagePromise) imagePromise = fetch('/images/novembre-bleu-2026.jpg').then(function (response) {
      if (!response.ok) throw new Error('Image unavailable');
      return response.blob();
    }).then(function (blob) { return new File([blob], 'serenity-relax-novembre-bleu-2026.jpg', {type: 'image/jpeg'}); }).catch(function (error) { imagePromise = null; throw error; });
    return imagePromise;
  }
  document.querySelectorAll('[data-offer-share]').forEach(function (host, index) {
    var trigger = document.createElement('button');
    trigger.type = 'button'; trigger.className = 'offer-share-trigger';
    trigger.textContent = '↗ ' + t[0];
    trigger.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    var panel = document.createElement('div');
    panel.className = 'offer-share-panel'; panel.id = 'offer-share-' + index; panel.hidden = false;
    panel.setAttribute('role', 'group'); panel.setAttribute('aria-label', t[0]);
    trigger.setAttribute('aria-controls', panel.id);
    function button(label, action, icon) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = label;
      b.addEventListener('click', action); panel.appendChild(b); if (icon) decorate(b, icon, label); return b;
    }
    function link(label, href, icon) {
      var a = document.createElement('a'); a.textContent = label; a.href = href;
      a.target = '_blank'; a.rel = 'noopener noreferrer'; panel.appendChild(a); if (icon) decorate(a, icon, label); return a;
    }
    if (typeof navigator.share === 'function') {
      button(t[7], async function () {
        try { await navigator.share({title: 'Novembre Bleu · Serenity & Relax by João', text: '90 min · 110 CHF · Cointrin, Genève · Jusqu’au 30 novembre 2026', url: url}); }
        catch (err) { if (err.name !== 'AbortError') { field.hidden = false; field.focus(); field.select(); status.textContent = t[6]; } }
      }, 'share');
    }
    link('WhatsApp', 'https://wa.me/?text=' + encodeURIComponent('Novembre Bleu · 90 min · 110 CHF · Jusqu’au 30 novembre 2026\n' + url), 'whatsapp');
    link('Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), 'facebook');
    var composer = document.createElement('div'); composer.className = 'offer-instagram'; composer.hidden = true;
    var message = document.createElement('textarea'); message.value = caption; message.rows = 8;
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
    decorate(copyMessage, 'copy', ig[2]); decorate(shareImage, 'share', ig[4]);
    var readyImage;
    shareImage.addEventListener('click', async function () {
      if (!readyImage) return;
      try {
        // No fetch or clipboard await here: retain the user's activation for the share sheet.
        await navigator.share({files: [readyImage], title: 'Novembre Bleu · Serenity & Relax by João', text: message.value});
      } catch (error) { if (error.name !== 'AbortError') igStatus.textContent = ig[6]; }
    });
    composer.appendChild(message); composer.appendChild(copyMessage); composer.appendChild(shareImage); composer.appendChild(instruction); composer.appendChild(igStatus);
    button('Instagram · ' + ig[0], async function () {
      composer.hidden = !composer.hidden;
      if (composer.hidden || readyImage) return;
      if (typeof navigator.share !== 'function' || typeof navigator.canShare !== 'function') { igStatus.textContent = ig[6]; return; }
      igStatus.textContent = ig[7];
      try {
        var image = await prepareImage();
        if (!navigator.canShare({files: [image]})) { igStatus.textContent = ig[6]; return; }
        readyImage = image; shareImage.disabled = false; igStatus.textContent = '';
      } catch (error) { igStatus.textContent = ig[6]; }
    }, 'instagram');
    panel.appendChild(composer);
    button(t[1], async function () {
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(url); status.textContent = t[2];
      } catch (err) { field.hidden = false; field.focus(); field.select(); status.textContent = t[6]; }
    }, 'link');
    var download = link(t[4], '/images/novembre-bleu-2026.jpg', 'download');
    download.download = 'serenity-relax-novembre-bleu-2026.jpg'; download.removeAttribute('target');
    var field = document.createElement('input'); field.type = 'url'; field.readOnly = true; field.value = url;
    field.setAttribute('aria-label', t[6]); field.hidden = true; panel.appendChild(field);
    var status = document.createElement('p'); status.setAttribute('role', 'status'); panel.appendChild(status);
    function close() { composer.hidden = true; }
    var closeComposer = document.createElement('button'); closeComposer.type = 'button'; closeComposer.textContent = t[5];
    decorate(closeComposer, 'close', t[5]); closeComposer.addEventListener('click', close); composer.appendChild(closeComposer);
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
