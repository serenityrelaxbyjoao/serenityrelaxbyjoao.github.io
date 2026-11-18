/* PR39: Public promotional content only. No patient data or authentication tokens.
 * Lit publicCampaigns/current (lecture publique, règles Firestore) et adapte le bloc « offre » de la page.
 * Le prix final reste validé par Google Apps Script au moment de la réservation. */
(function () {
  'use strict';
  var url = 'https://firestore.googleapis.com/v1/projects/serenity-relax-gestion/databases/(default)/documents/publicCampaigns/current';
  var locale = (document.documentElement.lang || 'fr').toLowerCase();
  var languages = {
    fr:{offer:'Offre du mois',book:'Réserver cette offre',usual:'au lieu de',minutes:'min'},
    pt:{offer:'Oferta do mês',book:'Reservar esta oferta',usual:'em vez de',minutes:'min'},
    en:{offer:'Offer of the month',book:'Book this offer',usual:'instead of',minutes:'min'},
    es:{offer:'Oferta del mes',book:'Reservar esta oferta',usual:'en vez de',minutes:'min'},
    it:{offer:'Offerta del mese',book:'Prenota questa offerta',usual:'invece di',minutes:'min'},
    de:{offer:'Angebot des Monats',book:'Dieses Angebot buchen',usual:'statt',minutes:'Min.'}
  };
  var t = languages[locale] || languages.fr;
  function get(fields,key) {
    var f = fields && fields[key];
    if (!f) return null;
    if (Object.prototype.hasOwnProperty.call(f,'stringValue')) return f.stringValue;
    if (Object.prototype.hasOwnProperty.call(f,'integerValue')) return Number(f.integerValue);
    if (Object.prototype.hasOwnProperty.call(f,'doubleValue')) return Number(f.doubleValue);
    if (Object.prototype.hasOwnProperty.call(f,'booleanValue')) return f.booleanValue;
    return null;
  }
  /* Texte traduit (translations.<langue>.title / description), sinon le texte français. */
  function translated(fields, key) {
    var tr = fields.translations && fields.translations.mapValue && fields.translations.mapValue.fields;
    var entry = tr && tr[locale] && tr[locale].mapValue && tr[locale].mapValue.fields;
    var value = entry ? get(entry, key) : null;
    return value || get(fields, key) || '';
  }
  function today() {
    return new Date().toLocaleDateString('sv-SE',{timeZone:'Europe/Zurich'});
  }
  function isExpired(d) {
    return !!d.endsOn && today() > d.endsOn;
  }
  function active(d) {
    var now = today();
    return d.active === true && d.kind === 'offre' && !!d.title && d.duration > 0 &&
      Number.isFinite(d.price) && d.price >= 0 &&
      (!d.startsOn || now >= d.startsOn) && (!d.endsOn || now <= d.endsOn);
  }
  function elt(tag,text,className) {
    var e=document.createElement(tag);
    if(text != null) e.textContent=String(text);
    if(className)e.className=className;
    return e;
  }
  function updateOffer(d) {
    var card = document.querySelector('.hero-promo');
    if(card) {
      /* Hide the old campaign artwork when the new campaign is active. */
      var image = card.querySelector('img');
      if(image) image.hidden=true;
      var link = card.querySelector('.hero-promo-button');
      if(link)link.hidden=true;
      var share = card.querySelector('[data-offer-share]');
      if(share)share.hidden=true;
      var panel=elt('div',null,'sr-dynamic-monthly-offer');
      panel.style.cssText='padding:22px;border-radius:18px;background:#f7f2e7;color:#21372c;text-align:left;max-width:340px;box-shadow:0 10px 28px rgba(0,0,0,.15)';
      panel.appendChild(elt('small',t.offer));
      panel.appendChild(elt('h2',d.localTitle));
      if(d.localDescription)panel.appendChild(elt('p',d.localDescription));
      var price=elt('p',d.duration+' '+t.minutes+' · '+d.price+' CHF');
      price.style.fontWeight='bold';
      if(d.originalPrice != null && d.originalPrice > d.price)price.appendChild(elt('span',' '+t.usual+' '+d.originalPrice+' CHF'));
      panel.appendChild(price);
      var button=elt('a',t.book,'btn gold');
      button.href='reservation/?lang='+encodeURIComponent(locale)+'&service=offre-du-mois';
      panel.appendChild(button);
      card.appendChild(panel);
    }
    var dlg=document.getElementById('offer-dialog');
    if(dlg) {
      var title=dlg.querySelector('#offer-dialog-title');
      if(title) title.textContent=d.localTitle;
      var para=dlg.querySelector('.monthly-promo-content > p:not([class])');
      if(para && d.localDescription)para.textContent=d.localDescription;
      var sum=dlg.querySelector('.monthly-promo-offer');
      if(sum) sum.textContent=d.duration+' '+t.minutes;
      var priceField=dlg.querySelector('.monthly-promo-price');
      if(priceField) {
        priceField.textContent='';
        priceField.appendChild(elt('strong',d.price+' CHF'));
        if(d.originalPrice != null && d.originalPrice>d.price)priceField.appendChild(elt('s',d.originalPrice+' CHF'));
      }
      var note=dlg.querySelector('.monthly-promo-note');
      if(note) note.hidden=true; /* Never display hardcoded previous expiry. */
    }
  }
  /* Après la date de fin, le bloc de l'ancienne campagne n'est plus affiché. */
  function hideExpiredOffer() {
    var card = document.querySelector('.hero-promo');
    if(card) card.hidden=true;
  }
  function boot() {
    if (typeof fetch !== 'function') return;
    fetch(url,{method:'GET',mode:'cors',cache:'no-store'}).then(function(response){
      if(!response.ok)throw Error('No published offer');
      return response.json();
    }).then(function(data){
      var f=data.fields||{};
      var d={active:get(f,'active'),kind:get(f,'kind'),title:get(f,'title'),
        description:get(f,'description')||'',duration:Number(get(f,'duration')),
        price:Number(get(f,'price')),originalPrice:get(f,'originalPrice'),
        startsOn:get(f,'startsOn')||'',endsOn:get(f,'endsOn')||'',
        localTitle:translated(f,'title'),localDescription:translated(f,'description')};
      if(active(d)) updateOffer(d);
      else if(d.kind==='offre' && isExpired(d)) hideExpiredOffer();
    }).catch(function(){/* Keep existing published design if Firestore is unavailable. */});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
  else boot();
}());
