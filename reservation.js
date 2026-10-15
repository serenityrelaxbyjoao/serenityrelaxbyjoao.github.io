/* Serenity & Relax by João — native booking form */
(function () {
  'use strict';

  var API = 'https://script.google.com/macros/s/AKfycbzMEVFIzDBtuAIOkuwgNSB42OtxRvoEhPibhT8O-vwhBVlixQx5LQKWhLQyTDjG6pkDMg/exec';
  var params = new URLSearchParams(location.search);
  var lang = params.get('lang') || 'fr';
  if (!/^(fr|pt|en|es|it|de)$/.test(lang)) lang = 'fr';
  var preselect = params.get('service') || '';
  document.documentElement.lang = lang;

  var TXT = {
    fr:{back:'← Retour au site',title:'Réserver votre séance',subtitle:'Cabinet à Cointrin, près de l’aéroport de Genève · 7 jours sur 7 · sur rendez-vous',step1:'1. Votre massage',serviceLabel:'Quel massage souhaitez-vous ?',loading:'Chargement…',duration:'Durée',step2:'2. Date et heure',date:'Date',time:'Heure',step3:'3. Vos précisions',areaLabel:'Zones à travailler en priorité, zones à éviter, tensions particulières ou demande à signaler (facultatif)',codeLabel:'Code promotionnel ou nom de la personne qui vous a recommandé (facultatif)',step4:'4. Vos coordonnées',firstName:'Prénom',lastName:'Nom',email:'Adresse e-mail',phone:'Numéro de téléphone',birthDate:'Date de naissance',birthdayOk:'J’accepte de recevoir un petit message le jour de mon anniversaire (facultatif).',address:'Adresse complète pour la facturation',street:'Rue et numéro',zip:'NPA',city:'Localité',country:'Pays',cancel:'Important : toute annulation à moins de 24 heures du rendez-vous ou absence sans prévenir entraîne la facturation intégrale de la séance réservée.',termsStart:'J’ai lu et j’accepte les',terms:'conditions générales',termsEnd:'et la politique de confidentialité.',confirm:'Confirmer la réservation',problem:'Un problème avec la réservation ?',direct:'Ouvrir le formulaire direct',whatsapp:'WhatsApp',doneTitle:'Votre séance est réservée',doneMail:'Un e-mail de confirmation vous a été envoyé.',anam:'Remplir la fiche d’anamnèse',backSite:'Retour au site',choose:'Choisir un massage',searching:'Recherche des horaires disponibles…',none:'Aucun horaire disponible ce jour-là. Essayez une autre date.',connection:'Connexion impossible pour le moment. Utilisez le formulaire direct ou WhatsApp.',pickMassage:'Choisissez un massage et une durée.',pickDate:'Choisissez une date et une heure.',nameErr:'Indiquez votre prénom et votre nom.',emailErr:'Indiquez une adresse e-mail valide.',phoneErr:'Indiquez un numéro de téléphone valide.',birthErr:'Indiquez votre date de naissance.',addressErr:'Indiquez votre adresse complète.',termsErr:'Veuillez accepter les conditions générales.',booking:'Réservation en cours…'},
    pt:{back:'← Voltar ao site',title:'Marcar a sua sessão',subtitle:'Gabinete em Cointrin, perto do aeroporto de Genebra · 7 dias por semana · por marcação',step1:'1. A sua massagem',serviceLabel:'Que massagem deseja?',loading:'A carregar…',duration:'Duração',step2:'2. Data e hora',date:'Data',time:'Hora',step3:'3. As suas indicações',areaLabel:'Zonas prioritárias, zonas a evitar, tensões ou pedido especial (facultativo)',codeLabel:'Código promocional ou nome de quem o recomendou (facultativo)',step4:'4. Os seus dados',firstName:'Nome',lastName:'Apelido',email:'E-mail',phone:'Telefone',birthDate:'Data de nascimento',birthdayOk:'Aceito receber uma pequena mensagem no meu aniversário (facultativo).',address:'Morada completa para faturação',street:'Rua e número',zip:'Código postal',city:'Localidade',country:'País',cancel:'Importante: cancelamentos com menos de 24 horas de antecedência ou faltas sem aviso implicam a faturação integral da sessão.',termsStart:'Li e aceito as',terms:'condições gerais',termsEnd:'e a política de privacidade.',confirm:'Confirmar a reserva',problem:'Problema com a reserva?',direct:'Abrir o formulário direto',whatsapp:'WhatsApp',doneTitle:'A sua sessão está reservada',doneMail:'Foi enviado um e-mail de confirmação.',anam:'Preencher a ficha de anamnese',backSite:'Voltar ao site',choose:'Escolher uma massagem',searching:'A procurar horários disponíveis…',none:'Nenhum horário disponível nesse dia. Tente outra data.',connection:'Não foi possível ligar ao sistema. Use o formulário direto ou o WhatsApp.',pickMassage:'Escolha uma massagem e uma duração.',pickDate:'Escolha uma data e uma hora.',nameErr:'Indique o seu nome e apelido.',emailErr:'Indique um e-mail válido.',phoneErr:'Indique um número de telefone válido.',birthErr:'Indique a sua data de nascimento.',addressErr:'Indique a sua morada completa.',termsErr:'Aceite as condições gerais.',booking:'Reserva em curso…'},
    en:{back:'← Back to site',title:'Book your session',subtitle:'Studio in Cointrin, near Geneva Airport · 7 days a week · by appointment',step1:'1. Your massage',serviceLabel:'Which massage would you like?',loading:'Loading…',duration:'Duration',step2:'2. Date and time',date:'Date',time:'Time',step3:'3. Your preferences',areaLabel:'Priority areas, areas to avoid, tension or special request (optional)',codeLabel:'Promo code or name of the person who referred you (optional)',step4:'4. Your details',firstName:'First name',lastName:'Last name',email:'Email address',phone:'Phone number',birthDate:'Date of birth',birthdayOk:'I agree to receive a small birthday message (optional).',address:'Full billing address',street:'Street and number',zip:'Postcode',city:'City',country:'Country',cancel:'Important: cancellations less than 24 hours before the appointment or no-shows are charged in full.',termsStart:'I have read and accept the',terms:'terms and conditions',termsEnd:'and privacy policy.',confirm:'Confirm booking',problem:'Problem with booking?',direct:'Open the direct form',whatsapp:'WhatsApp',doneTitle:'Your session is booked',doneMail:'A confirmation email has been sent.',anam:'Complete the health questionnaire',backSite:'Back to site',choose:'Choose a massage',searching:'Looking for available times…',none:'No times available that day. Try another date.',connection:'Unable to connect right now. Use the direct form or WhatsApp.',pickMassage:'Choose a massage and duration.',pickDate:'Choose a date and time.',nameErr:'Enter your first and last name.',emailErr:'Enter a valid email address.',phoneErr:'Enter a valid phone number.',birthErr:'Enter your date of birth.',addressErr:'Enter your full address.',termsErr:'Please accept the terms and conditions.',booking:'Booking…'},
    es:{back:'← Volver al sitio',title:'Reservar su sesión',subtitle:'Consulta en Cointrin, cerca del aeropuerto de Ginebra · 7 días a la semana · con cita previa',step1:'1. Su masaje',serviceLabel:'¿Qué masaje desea?',loading:'Cargando…',duration:'Duración',step2:'2. Fecha y hora',date:'Fecha',time:'Hora',step3:'3. Sus indicaciones',areaLabel:'Zonas prioritarias, zonas a evitar, tensiones o petición especial (opcional)',codeLabel:'Código promocional o nombre de quien le recomendó (opcional)',step4:'4. Sus datos',firstName:'Nombre',lastName:'Apellido',email:'Correo electrónico',phone:'Teléfono',birthDate:'Fecha de nacimiento',birthdayOk:'Acepto recibir un pequeño mensaje por mi cumpleaños (opcional).',address:'Dirección completa de facturación',street:'Calle y número',zip:'Código postal',city:'Localidad',country:'País',cancel:'Importante: las cancelaciones con menos de 24 horas o las ausencias sin aviso se facturan íntegramente.',termsStart:'He leído y acepto las',terms:'condiciones generales',termsEnd:'y la política de privacidad.',confirm:'Confirmar reserva',problem:'¿Problema con la reserva?',direct:'Abrir formulario directo',whatsapp:'WhatsApp',doneTitle:'Su sesión está reservada',doneMail:'Se ha enviado un correo de confirmación.',anam:'Completar el cuestionario de salud',backSite:'Volver al sitio',choose:'Elegir un masaje',searching:'Buscando horarios disponibles…',none:'No hay horarios disponibles ese día. Pruebe otra fecha.',connection:'No se puede conectar ahora. Use el formulario directo o WhatsApp.',pickMassage:'Elija un masaje y una duración.',pickDate:'Elija una fecha y una hora.',nameErr:'Indique su nombre y apellido.',emailErr:'Indique un correo válido.',phoneErr:'Indique un teléfono válido.',birthErr:'Indique su fecha de nacimiento.',addressErr:'Indique su dirección completa.',termsErr:'Acepte las condiciones generales.',booking:'Reservando…'},
    it:{back:'← Torna al sito',title:'Prenota la tua seduta',subtitle:'Studio a Cointrin, vicino all’aeroporto di Ginevra · 7 giorni su 7 · su appuntamento',step1:'1. Il tuo massaggio',serviceLabel:'Quale massaggio desideri?',loading:'Caricamento…',duration:'Durata',step2:'2. Data e ora',date:'Data',time:'Ora',step3:'3. Le tue indicazioni',areaLabel:'Zone prioritarie, zone da evitare, tensioni o richiesta speciale (facoltativo)',codeLabel:'Codice promozionale o nome di chi ti ha consigliato (facoltativo)',step4:'4. I tuoi dati',firstName:'Nome',lastName:'Cognome',email:'E-mail',phone:'Telefono',birthDate:'Data di nascita',birthdayOk:'Accetto di ricevere un piccolo messaggio per il compleanno (facoltativo).',address:'Indirizzo completo per la fatturazione',street:'Via e numero',zip:'CAP',city:'Località',country:'Paese',cancel:'Importante: le cancellazioni a meno di 24 ore dall’appuntamento o le assenze senza preavviso vengono addebitate per intero.',termsStart:'Ho letto e accetto le',terms:'condizioni generali',termsEnd:'e l’informativa sulla privacy.',confirm:'Conferma prenotazione',problem:'Problemi con la prenotazione?',direct:'Apri il modulo diretto',whatsapp:'WhatsApp',doneTitle:'La tua seduta è prenotata',doneMail:'È stata inviata un’e-mail di conferma.',anam:'Compila il questionario anamnestico',backSite:'Torna al sito',choose:'Scegli un massaggio',searching:'Ricerca degli orari disponibili…',none:'Nessun orario disponibile quel giorno. Prova un’altra data.',connection:'Connessione non disponibile. Usa il modulo diretto o WhatsApp.',pickMassage:'Scegli un massaggio e una durata.',pickDate:'Scegli una data e un orario.',nameErr:'Inserisci nome e cognome.',emailErr:'Inserisci un’e-mail valida.',phoneErr:'Inserisci un numero di telefono valido.',birthErr:'Inserisci la data di nascita.',addressErr:'Inserisci l’indirizzo completo.',termsErr:'Accetta le condizioni generali.',booking:'Prenotazione in corso…'},
    de:{back:'← Zurück zur Website',title:'Termin buchen',subtitle:'Praxis in Cointrin, nahe dem Flughafen Genf · 7 Tage die Woche · nach Vereinbarung',step1:'1. Ihre Massage',serviceLabel:'Welche Massage wünschen Sie?',loading:'Wird geladen…',duration:'Dauer',step2:'2. Datum und Uhrzeit',date:'Datum',time:'Uhrzeit',step3:'3. Ihre Angaben',areaLabel:'Prioritäre Bereiche, zu vermeidende Bereiche, Verspannungen oder besonderer Wunsch (optional)',codeLabel:'Aktionscode oder Name der empfehlenden Person (optional)',step4:'4. Ihre Kontaktdaten',firstName:'Vorname',lastName:'Nachname',email:'E-Mail-Adresse',phone:'Telefonnummer',birthDate:'Geburtsdatum',birthdayOk:'Ich möchte eine kleine Nachricht zu meinem Geburtstag erhalten (optional).',address:'Vollständige Rechnungsadresse',street:'Straße und Hausnummer',zip:'PLZ',city:'Ort',country:'Land',cancel:'Wichtig: Stornierungen weniger als 24 Stunden vor dem Termin oder Nichterscheinen werden vollständig berechnet.',termsStart:'Ich habe die',terms:'Allgemeinen Geschäftsbedingungen',termsEnd:'und die Datenschutzerklärung gelesen und akzeptiert.',confirm:'Buchung bestätigen',problem:'Problem bei der Buchung?',direct:'Direktes Formular öffnen',whatsapp:'WhatsApp',doneTitle:'Ihr Termin ist gebucht',doneMail:'Eine Bestätigungs-E-Mail wurde gesendet.',anam:'Anamnesebogen ausfüllen',backSite:'Zurück zur Website',choose:'Massage auswählen',searching:'Verfügbare Zeiten werden gesucht…',none:'An diesem Tag sind keine Zeiten verfügbar. Bitte wählen Sie ein anderes Datum.',connection:'Verbindung derzeit nicht möglich. Nutzen Sie das direkte Formular oder WhatsApp.',pickMassage:'Wählen Sie Massage und Dauer.',pickDate:'Wählen Sie Datum und Uhrzeit.',nameErr:'Geben Sie Vor- und Nachnamen ein.',emailErr:'Geben Sie eine gültige E-Mail-Adresse ein.',phoneErr:'Geben Sie eine gültige Telefonnummer ein.',birthErr:'Geben Sie Ihr Geburtsdatum ein.',addressErr:'Geben Sie Ihre vollständige Adresse ein.',termsErr:'Bitte akzeptieren Sie die AGB.',booking:'Buchung läuft…'}
  };
  var t = TXT[lang];

  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function tr(){
    document.querySelectorAll('[data-i18n]').forEach(function(el){ var k=el.getAttribute('data-i18n'); if(t[k]) el.textContent=t[k]; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){ var k=el.getAttribute('data-i18n-placeholder'); if(t[k]) el.placeholder=t[k]; });
    document.querySelectorAll('[data-lang]').forEach(function(a){ if(a.getAttribute('data-lang')===lang) a.setAttribute('aria-current','page'); });
  }
  tr();

  var direct = API + '?lang=' + encodeURIComponent(lang) + (preselect ? '&service=' + encodeURIComponent(preselect) : '');
  $('directFallback').href = direct;
  $('transportForm').action = API;

  var DIALS = [['+41','CH'],['+33','FR'],['+351','PT'],['+55','BR'],['+39','IT'],['+49','DE'],['+34','ES'],['+32','BE'],['+352','LU'],['+44','UK'],['+1','US/CA'],['other','+…']];
  $('phoneDial').innerHTML = DIALS.map(function(d){return '<option value="'+d[0]+'">'+(d[0]==='other'?'':d[0]+' ')+d[1]+'</option>';}).join('');
  $('phoneDial').onchange=function(){ $('phoneOther').hidden=this.value!=='other'; };

  var state={cfg:null,service:null,minutes:null,time:null,quote:null};
  var pending={};
  var bookingRequestId = makeId('booking');

  function makeId(prefix){
    var rnd = (self.crypto && crypto.randomUUID) ? crypto.randomUUID().replace(/-/g,'') : Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
    return prefix+'_'+Date.now().toString(36)+'_'+rnd;
  }
  function showMsg(text,type){ var m=$('msg'); m.className='msg '+(type||'error'); m.textContent=text; }
  function clearMsg(){ var m=$('msg'); m.className='msg'; m.textContent=''; }

  function callApi(action,payload,timeoutMs){
    return new Promise(function(resolve,reject){
      var id=makeId('tx');
      var timer=setTimeout(function(){ delete pending[id]; reject(new Error('timeout')); },timeoutMs||12000);
      pending[id]={resolve:resolve,reject:reject,timer:timer};
      $('transportAction').value=action;
      $('transportId').value=id;
      $('transportPayload').value=JSON.stringify(payload||{});
      $('transportForm').submit();
    });
  }

  window.addEventListener('message',function(e){
    if(!/(^https:\/\/script\.google\.com$)|(\.googleusercontent\.com$)/.test(e.origin)) return;
    var d=e.data;
    if(!d || d.source!=='sr-native-booking' || !d.transportId) return;
    var p=pending[d.transportId];
    if(!p) return;
    clearTimeout(p.timer); delete pending[d.transportId]; p.resolve(d.result);
  });

  function renderDurations(){
    var box=$('durations'); box.innerHTML='';
    if(!state.service){ $('durationBlock').hidden=true; return; }
    $('durationBlock').hidden=false;
    if(state.service.options.length===1) state.minutes=Number(state.service.options[0].minutes);
    state.service.options.forEach(function(o){
      var b=document.createElement('button'); b.type='button'; b.className='chip'; b.setAttribute('aria-pressed',state.minutes===Number(o.minutes)); b.textContent=o.minutes+' min · '+o.price+' CHF';
      b.onclick=function(){ state.minutes=Number(o.minutes); renderDurations(); loadSlots(); };
      box.appendChild(b);
    });
  }

  function quoteInput(){ return {serviceId:state.service?state.service.id:'',minutes:state.minutes,code:$('code').value.trim(),date:$('date').value}; }

  async function loadSlots(){
    state.time=null; state.quote=null; renderSummary(); clearMsg();
    if(!state.service || !state.minutes || !$('date').value){ $('slotsBlock').hidden=true; return; }
    $('slotsBlock').hidden=false; $('slots').innerHTML='<span class="loading">'+esc(t.searching)+'</span>';
    try{
      var res=await callApi('availability',quoteInput(),12000);
      if(!res || !res.ok){ $('slots').innerHTML=''; showMsg((res&&res.error)||t.connection); return; }
      state.quote=res.quote;
      if(!res.slots || !res.slots.length){ $('slots').innerHTML='<span class="loading">'+esc(t.none)+'</span>'; return; }
      $('slots').innerHTML='';
      res.slots.forEach(function(h){ var b=document.createElement('button'); b.type='button'; b.className='chip slot'; b.textContent=h; b.setAttribute('aria-pressed','false'); b.onclick=function(){ state.time=h; Array.from($('slots').children).forEach(function(x){ if(x.setAttribute)x.setAttribute('aria-pressed',x===b?'true':'false'); }); renderSummary(); }; $('slots').appendChild(b); });
    }catch(e){ $('slots').innerHTML=''; showMsg(t.connection); }
  }

  function fmtDate(s){ if(!s)return''; var p=s.split('-'); return p[2]+'.'+p[1]+'.'+p[0]; }
  function renderSummary(){
    var box=$('summary');
    if(!state.quote || !state.time || !$('date').value){ box.hidden=true; return; }
    box.hidden=false;
    box.innerHTML='<strong>'+esc(state.quote.service)+'</strong><br>'+esc(state.quote.totalMinutes)+' min'+(state.quote.extraMinutes?' (+'+esc(state.quote.extraMinutes)+' min)':'')+' · '+esc(state.quote.price)+' CHF<br>'+esc(fmtDate($('date').value))+' · '+esc(state.time)+'<br>Cointrin, Genève';
  }

  $('service').onchange=function(){ state.service=(state.cfg.services||[]).find(function(s){return s.id===$('service').value;})||null; state.minutes=null; renderDurations(); loadSlots(); };
  $('date').onchange=loadSlots;
  $('code').onchange=loadSlots;

  function validate(){
    var dial=$('phoneDial').value==='other'?$('phoneDialOther').value.trim():$('phoneDial').value;
    if(!state.service||!state.minutes){showMsg(t.pickMassage);return null;}
    if(!$('date').value||!state.time){showMsg(t.pickDate);return null;}
    if(!$('firstName').value.trim()||!$('lastName').value.trim()){showMsg(t.nameErr);return null;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('email').value.trim())){showMsg(t.emailErr);return null;}
    if(!/^\+\d{1,4}$/.test(dial)||!/[\d\s().\/-]{6,20}/.test($('phoneNumber').value.trim())){showMsg(t.phoneErr);return null;}
    if(!$('birthDate').value){showMsg(t.birthErr);return null;}
    if(!$('street').value.trim()||!$('zip').value.trim()||!$('city').value.trim()||!$('country').value.trim()){showMsg(t.addressErr);return null;}
    if(!$('accepted').checked){showMsg(t.termsErr);return null;}
    return Object.assign(quoteInput(),{time:state.time,firstName:$('firstName').value.trim(),lastName:$('lastName').value.trim(),email:$('email').value.trim(),phoneDial:dial,phoneNumber:$('phoneNumber').value.trim(),birthDate:$('birthDate').value,street:$('street').value.trim(),zip:$('zip').value.trim(),city:$('city').value.trim(),country:$('country').value.trim(),area:$('area').value.trim(),website:$('website').value.trim(),accepted:true,birthdayOk:$('birthdayOk').checked,requestId:bookingRequestId});
  }

  $('submit').onclick=async function(){
    clearMsg(); var data=validate(); if(!data)return;
    var btn=$('submit'); btn.disabled=true; btn.textContent=t.booking;
    try{
      var res=await callApi('book',data,20000);
      if(!res || !res.ok){ btn.disabled=false; btn.textContent=t.confirm; showMsg((res&&res.error)||t.connection); if(res&&res.error&&/créneau|horaire|slot|time/i.test(res.error)) loadSlots(); return; }
      var r=res.receipt||{};
      $('doneBox').innerHTML='<strong>'+esc(r.service||state.quote.service)+'</strong><br>'+esc(r.totalMinutes||state.quote.totalMinutes)+' min · '+esc(r.price||state.quote.price)+' CHF<br>'+esc(fmtDate(r.date||$('date').value))+' · '+esc(r.time||state.time)+'<br>'+esc(r.location||'Cointrin, Genève');
      if(r.anamnesisUrl) $('anamLink').href=r.anamnesisUrl; else if(state.cfg.anamnesisUrl) $('anamLink').href=state.cfg.anamnesisUrl;
      $('bookingCard').hidden=true; $('doneCard').hidden=false; window.scrollTo(0,0);
    }catch(e){ btn.disabled=false; btn.textContent=t.confirm; showMsg(t.connection); }
  };

  async function init(){
    clearMsg();
    try{
      var cfg=await callApi('config',{},12000);
      if(!cfg || !cfg.services) throw new Error('config');
      state.cfg=cfg;
      $('service').disabled=false;
      $('service').innerHTML='<option value="">'+esc(t.choose)+'</option>'+cfg.services.map(function(s){return '<option value="'+esc(s.id)+'">'+esc(s.name)+'</option>';}).join('');
      $('date').min=cfg.today||''; $('date').max=cfg.lastDate||''; $('birthDate').max=cfg.today||'';
      if(cfg.anamnesisUrl) $('anamLink').href=cfg.anamnesisUrl;
      $('submit').disabled=false;
      if(preselect && cfg.services.some(function(s){return s.id===preselect;})){ $('service').value=preselect; $('service').dispatchEvent(new Event('change')); }
    }catch(e){ $('service').innerHTML='<option>'+esc(t.connection)+'</option>'; showMsg(t.connection); $('submit').disabled=true; }
  }

  init();
})();
