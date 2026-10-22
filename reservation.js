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
    fr:{back:'← Retour au site',title:'Réserver votre séance',subtitle:'Cabinet à Cointrin, près de l’aéroport de Genève · 7 jours sur 7 · sur rendez-vous',step1:'1. Votre massage',serviceLabel:'Quel massage souhaitez-vous ?',loading:'Chargement…',duration:'Durée',step2:'2. Date et heure',date:'Date',time:'Heure',step3:'3. Vos précisions',areaWork:'Zones à travailler en priorité (facultatif)',areaAvoid:'Zones à éviter (facultatif)',areaOther:'Tensions particulières ou autre demande (facultatif)',codeLabel:'Code promotionnel ou nom de la personne qui vous a recommandé (facultatif)',step4:'4. Vos coordonnées',firstName:'Prénom',lastName:'Nom',email:'Adresse e-mail',phone:'Numéro de téléphone',birthDate:'Date de naissance',birthdayOk:'J’accepte de recevoir un petit message le jour de mon anniversaire (facultatif).',marketingOk:'Je souhaite recevoir occasionnellement des offres et nouvelles de Serenity & Relax by João, ainsi qu’un message après ma séance pour donner mon avis (facultatif, désinscription à tout moment).',address:'Adresse complète pour la facturation',street:'Rue et numéro',zip:'NPA',city:'Localité',country:'Pays',cancel:'Important : toute annulation à moins de 24 heures du rendez-vous ou absence sans prévenir entraîne la facturation intégrale de la séance réservée.',termsStart:'J’ai lu et j’accepte les',terms:'conditions générales',termsEnd:'et la politique de confidentialité. Je consens au traitement de mes données de santé (fiche d’anamnèse) afin d’adapter mes séances.',confirm:'Confirmer la réservation',problem:'Un problème avec la réservation ?',direct:'Ouvrir le formulaire direct',whatsapp:'WhatsApp',doneTitle:'Votre séance est réservée',doneMail:'Un e-mail de confirmation vous a été envoyé. Vous ne le voyez pas dans quelques minutes ? Regardez dans votre dossier « Spam » ou « Courrier indésirable ».',anam:'Remplir la fiche d’anamnèse',backSite:'Retour au site',choose:'Choisir un massage',searching:'Recherche des horaires disponibles…',none:'Aucun horaire disponible ce jour-là. Essayez une autre date.',connection:'Connexion impossible pour le moment. Utilisez le formulaire direct ou WhatsApp.',pickMassage:'Choisissez un massage et une durée.',pickDate:'Choisissez une date et une heure.',nameErr:'Indiquez votre prénom et votre nom.',emailErr:'Indiquez une adresse e-mail valide.',phoneErr:'Indiquez un numéro de téléphone valide.',birthErr:'Indiquez votre date de naissance.',addressErr:'Indiquez votre adresse complète.',termsErr:'Veuillez accepter les conditions générales.',booking:'Réservation en cours…',sentTo:'Confirmation envoyée à :',checkEmail:'Vérifiez bien votre adresse e-mail : la confirmation y sera envoyée (elle arrive parfois dans les spams).'},
    pt:{back:'← Voltar ao site',title:'Marcar a sua sessão',subtitle:'Gabinete em Cointrin, perto do aeroporto de Genebra · 7 dias por semana · por marcação',step1:'1. A sua massagem',serviceLabel:'Que massagem deseja?',loading:'A carregar…',duration:'Duração',step2:'2. Data e hora',date:'Data',time:'Hora',step3:'3. As suas indicações',areaWork:'Zonas a trabalhar em prioridade (facultativo)',areaAvoid:'Zonas a evitar (facultativo)',areaOther:'Tensões ou outro pedido (facultativo)',codeLabel:'Código promocional ou nome de quem o recomendou (facultativo)',step4:'4. Os seus dados',firstName:'Nome',lastName:'Apelido',email:'E-mail',phone:'Telefone',birthDate:'Data de nascimento',birthdayOk:'Aceito receber uma pequena mensagem no meu aniversário (facultativo).',marketingOk:'Desejo receber ocasionalmente ofertas e novidades da Serenity & Relax by João, bem como uma mensagem após a sessão para dar a minha opinião (opcional, posso cancelar a qualquer momento).',address:'Morada completa para faturação',street:'Rua e número',zip:'Código postal',city:'Localidade',country:'País',cancel:'Importante: cancelamentos com menos de 24 horas de antecedência ou faltas sem aviso implicam a faturação integral da sessão.',termsStart:'Li e aceito as',terms:'condições gerais',termsEnd:'e a política de privacidade. Autorizo o tratamento dos meus dados de saúde (ficha de anamnese) para adaptar as minhas sessões.',confirm:'Confirmar a reserva',problem:'Problema com a reserva?',direct:'Abrir o formulário direto',whatsapp:'WhatsApp',doneTitle:'A sua sessão está reservada',doneMail:'Foi enviado um e-mail de confirmação. Não o vê dentro de alguns minutos? Verifique a pasta «Spam» ou «Lixo eletrónico».',anam:'Preencher a ficha de anamnese',backSite:'Voltar ao site',choose:'Escolher uma massagem',searching:'A procurar horários disponíveis…',none:'Nenhum horário disponível nesse dia. Tente outra data.',connection:'Não foi possível ligar ao sistema. Use o formulário direto ou o WhatsApp.',pickMassage:'Escolha uma massagem e uma duração.',pickDate:'Escolha uma data e uma hora.',nameErr:'Indique o seu nome e apelido.',emailErr:'Indique um e-mail válido.',phoneErr:'Indique um número de telefone válido.',birthErr:'Indique a sua data de nascimento.',addressErr:'Indique a sua morada completa.',termsErr:'Aceite as condições gerais.',booking:'Reserva em curso…',sentTo:'Confirmação enviada para:',checkEmail:'Verifique bem o seu e-mail: a confirmação será enviada para lá (por vezes chega ao spam).'},
    en:{back:'← Back to site',title:'Book your session',subtitle:'Studio in Cointrin, near Geneva Airport · 7 days a week · by appointment',step1:'1. Your massage',serviceLabel:'Which massage would you like?',loading:'Loading…',duration:'Duration',step2:'2. Date and time',date:'Date',time:'Time',step3:'3. Your preferences',areaWork:'Areas to focus on (optional)',areaAvoid:'Areas to avoid (optional)',areaOther:'Particular tension or other request (optional)',codeLabel:'Promo code or name of the person who referred you (optional)',step4:'4. Your details',firstName:'First name',lastName:'Last name',email:'Email address',phone:'Phone number',birthDate:'Date of birth',birthdayOk:'I agree to receive a small birthday message (optional).',marketingOk:'I would like to receive occasional offers and news from Serenity & Relax by João, and a message after my session asking for my feedback (optional, unsubscribe at any time).',address:'Full billing address',street:'Street and number',zip:'Postcode',city:'City',country:'Country',cancel:'Important: cancellations less than 24 hours before the appointment or no-shows are charged in full.',termsStart:'I have read and accept the',terms:'terms and conditions',termsEnd:'and privacy policy. I consent to the processing of my health data (health questionnaire) so that my sessions can be adapted.',confirm:'Confirm booking',problem:'Problem with booking?',direct:'Open the direct form',whatsapp:'WhatsApp',doneTitle:'Your session is booked',doneMail:'A confirmation email has been sent. Not there within a few minutes? Please check your Spam or Junk folder.',anam:'Complete the health questionnaire',backSite:'Back to site',choose:'Choose a massage',searching:'Looking for available times…',none:'No times available that day. Try another date.',connection:'Unable to connect right now. Use the direct form or WhatsApp.',pickMassage:'Choose a massage and duration.',pickDate:'Choose a date and time.',nameErr:'Enter your first and last name.',emailErr:'Enter a valid email address.',phoneErr:'Enter a valid phone number.',birthErr:'Enter your date of birth.',addressErr:'Enter your full address.',termsErr:'Please accept the terms and conditions.',booking:'Booking…',sentTo:'Confirmation sent to:',checkEmail:'Please double-check your email address: the confirmation will be sent there (it sometimes lands in spam).'},
    es:{back:'← Volver al sitio',title:'Reservar su sesión',subtitle:'Consulta en Cointrin, cerca del aeropuerto de Ginebra · 7 días a la semana · con cita previa',step1:'1. Su masaje',serviceLabel:'¿Qué masaje desea?',loading:'Cargando…',duration:'Duración',step2:'2. Fecha y hora',date:'Fecha',time:'Hora',step3:'3. Sus indicaciones',areaWork:'Zonas a trabajar con prioridad (opcional)',areaAvoid:'Zonas a evitar (opcional)',areaOther:'Tensiones u otra petición (opcional)',codeLabel:'Código promocional o nombre de quien le recomendó (opcional)',step4:'4. Sus datos',firstName:'Nombre',lastName:'Apellido',email:'Correo electrónico',phone:'Teléfono',birthDate:'Fecha de nacimiento',birthdayOk:'Acepto recibir un pequeño mensaje por mi cumpleaños (opcional).',marketingOk:'Deseo recibir ocasionalmente ofertas y novedades de Serenity & Relax by João, así como un mensaje después de mi sesión para dar mi opinión (opcional, puedo darme de baja en cualquier momento).',address:'Dirección completa de facturación',street:'Calle y número',zip:'Código postal',city:'Localidad',country:'País',cancel:'Importante: las cancelaciones con menos de 24 horas o las ausencias sin aviso se facturan íntegramente.',termsStart:'He leído y acepto las',terms:'condiciones generales',termsEnd:'y la política de privacidad. Consiento el tratamiento de mis datos de salud (ficha de salud) para adaptar mis sesiones.',confirm:'Confirmar reserva',problem:'¿Problema con la reserva?',direct:'Abrir formulario directo',whatsapp:'WhatsApp',doneTitle:'Su sesión está reservada',doneMail:'Se ha enviado un correo de confirmación. ¿No lo ve en unos minutos? Revise su carpeta de «Spam» o «Correo no deseado».',anam:'Completar el cuestionario de salud',backSite:'Volver al sitio',choose:'Elegir un masaje',searching:'Buscando horarios disponibles…',none:'No hay horarios disponibles ese día. Pruebe otra fecha.',connection:'No se puede conectar ahora. Use el formulario directo o WhatsApp.',pickMassage:'Elija un masaje y una duración.',pickDate:'Elija una fecha y una hora.',nameErr:'Indique su nombre y apellido.',emailErr:'Indique un correo válido.',phoneErr:'Indique un teléfono válido.',birthErr:'Indique su fecha de nacimiento.',addressErr:'Indique su dirección completa.',termsErr:'Acepte las condiciones generales.',booking:'Reservando…',sentTo:'Confirmación enviada a:',checkEmail:'Revise bien su correo: la confirmación se enviará allí (a veces llega al spam).'},
    it:{back:'← Torna al sito',title:'Prenota la tua seduta',subtitle:'Studio a Cointrin, vicino all’aeroporto di Ginevra · 7 giorni su 7 · su appuntamento',step1:'1. Il tuo massaggio',serviceLabel:'Quale massaggio desideri?',loading:'Caricamento…',duration:'Durata',step2:'2. Data e ora',date:'Data',time:'Ora',step3:'3. Le tue indicazioni',areaWork:'Zone da trattare in priorità (facoltativo)',areaAvoid:'Zone da evitare (facoltativo)',areaOther:'Tensioni o altra richiesta (facoltativo)',codeLabel:'Codice promozionale o nome di chi ti ha consigliato (facoltativo)',step4:'4. I tuoi dati',firstName:'Nome',lastName:'Cognome',email:'E-mail',phone:'Telefono',birthDate:'Data di nascita',birthdayOk:'Accetto di ricevere un piccolo messaggio per il compleanno (facoltativo).',marketingOk:'Desidero ricevere occasionalmente offerte e novità da Serenity & Relax by João, e un messaggio dopo la seduta per lasciare la mia opinione (facoltativo, posso disiscrivermi in qualsiasi momento).',address:'Indirizzo completo per la fatturazione',street:'Via e numero',zip:'CAP',city:'Località',country:'Paese',cancel:'Importante: le cancellazioni a meno di 24 ore dall’appuntamento o le assenze senza preavviso vengono addebitate per intero.',termsStart:'Ho letto e accetto le',terms:'condizioni generali',termsEnd:'e l’informativa sulla privacy. Acconsento al trattamento dei miei dati sanitari (scheda anamnestica) per adattare le mie sedute.',confirm:'Conferma prenotazione',problem:'Problemi con la prenotazione?',direct:'Apri il modulo diretto',whatsapp:'WhatsApp',doneTitle:'La tua seduta è prenotata',doneMail:'È stata inviata un’e-mail di conferma. Non la vedi entro pochi minuti? Controlla la cartella «Spam» o «Posta indesiderata».',anam:'Compila il questionario anamnestico',backSite:'Torna al sito',choose:'Scegli un massaggio',searching:'Ricerca degli orari disponibili…',none:'Nessun orario disponibile quel giorno. Prova un’altra data.',connection:'Connessione non disponibile. Usa il modulo diretto o WhatsApp.',pickMassage:'Scegli un massaggio e una durata.',pickDate:'Scegli una data e un orario.',nameErr:'Inserisci nome e cognome.',emailErr:'Inserisci un’e-mail valida.',phoneErr:'Inserisci un numero di telefono valido.',birthErr:'Inserisci la data di nascita.',addressErr:'Inserisci l’indirizzo completo.',termsErr:'Accetta le condizioni generali.',booking:'Prenotazione in corso…',sentTo:'Conferma inviata a:',checkEmail:'Controlla bene il tuo indirizzo e-mail: la conferma verrà inviata lì (a volte finisce nello spam).'},
    de:{back:'← Zurück zur Website',title:'Termin buchen',subtitle:'Praxis in Cointrin, nahe dem Flughafen Genf · 7 Tage die Woche · nach Vereinbarung',step1:'1. Ihre Massage',serviceLabel:'Welche Massage wünschen Sie?',loading:'Wird geladen…',duration:'Dauer',step2:'2. Datum und Uhrzeit',date:'Datum',time:'Uhrzeit',step3:'3. Ihre Angaben',areaWork:'Bereiche mit Priorität (optional)',areaAvoid:'Zu vermeidende Bereiche (optional)',areaOther:'Besondere Verspannungen oder anderer Wunsch (optional)',codeLabel:'Aktionscode oder Name der empfehlenden Person (optional)',step4:'4. Ihre Kontaktdaten',firstName:'Vorname',lastName:'Nachname',email:'E-Mail-Adresse',phone:'Telefonnummer',birthDate:'Geburtsdatum',birthdayOk:'Ich möchte eine kleine Nachricht zu meinem Geburtstag erhalten (optional).',marketingOk:'Ich möchte gelegentlich Angebote und Neuigkeiten von Serenity & Relax by João sowie nach meiner Sitzung eine Nachricht mit der Bitte um meine Bewertung erhalten (freiwillig, jederzeit abbestellbar).',address:'Vollständige Rechnungsadresse',street:'Straße und Hausnummer',zip:'PLZ',city:'Ort',country:'Land',cancel:'Wichtig: Stornierungen weniger als 24 Stunden vor dem Termin oder Nichterscheinen werden vollständig berechnet.',termsStart:'Ich habe die',terms:'Allgemeinen Geschäftsbedingungen',termsEnd:'und die Datenschutzerklärung gelesen und akzeptiert. Ich willige in die Bearbeitung meiner Gesundheitsdaten (Gesundheitsfragebogen) ein, damit meine Sitzungen angepasst werden können.',confirm:'Buchung bestätigen',problem:'Problem bei der Buchung?',direct:'Direktes Formular öffnen',whatsapp:'WhatsApp',doneTitle:'Ihr Termin ist gebucht',doneMail:'Eine Bestätigungs-E-Mail wurde gesendet. Nicht innerhalb weniger Minuten erhalten? Bitte prüfen Sie Ihren Spam- bzw. Junk-Ordner.',anam:'Anamnesebogen ausfüllen',backSite:'Zurück zur Website',choose:'Massage auswählen',searching:'Verfügbare Zeiten werden gesucht…',none:'An diesem Tag sind keine Zeiten verfügbar. Bitte wählen Sie ein anderes Datum.',connection:'Verbindung derzeit nicht möglich. Nutzen Sie das direkte Formular oder WhatsApp.',pickMassage:'Wählen Sie Massage und Dauer.',pickDate:'Wählen Sie Datum und Uhrzeit.',nameErr:'Geben Sie Vor- und Nachnamen ein.',emailErr:'Geben Sie eine gültige E-Mail-Adresse ein.',phoneErr:'Geben Sie eine gültige Telefonnummer ein.',birthErr:'Geben Sie Ihr Geburtsdatum ein.',addressErr:'Geben Sie Ihre vollständige Adresse ein.',termsErr:'Bitte akzeptieren Sie die AGB.',booking:'Buchung läuft…',sentTo:'Bestätigung wird gesendet an:',checkEmail:'Bitte prüfen Sie Ihre E-Mail-Adresse: Die Bestätigung wird dorthin gesendet (manchmal landet sie im Spam).'}
  };
  var t = TXT[lang];

  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function tr(){
    document.querySelectorAll('[data-i18n]').forEach(function(el){ var k=el.getAttribute('data-i18n'); if(t[k]) el.textContent=t[k]; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){ var k=el.getAttribute('data-i18n-placeholder'); if(t[k]) el.placeholder=t[k]; });
    document.querySelectorAll('[data-lang]').forEach(function(a){ if(a.getAttribute('data-lang')===lang) a.setAttribute('aria-current','page'); });
    document.querySelectorAll('[data-lang]').forEach(function(a){
      var code=a.getAttribute('data-lang');
      a.href='./?lang='+encodeURIComponent(code)+(preselect?'&service='+encodeURIComponent(preselect):'');
    });
  }
  tr();

  var cookieText = {
    fr:['Avec votre accord, Google Analytics et Google Ads mesurent les visites et réservations, sans les données du formulaire. Refuser ne bloque pas la réservation.','Refuser','Accepter','Choix des cookies'],
    pt:['Com a sua autorização, Google Analytics e Google Ads medem visitas e reservas, sem os dados do formulário. Recusar não impede a reserva.','Recusar','Aceitar','Escolha de cookies'],
    en:['With your consent, Google Analytics and Google Ads measure visits and bookings, without form data. Declining does not prevent booking.','Decline','Accept','Cookie choices'],
    es:['Con su permiso, Google Analytics y Google Ads miden visitas y reservas, sin datos del formulario. Rechazar no impide reservar.','Rechazar','Aceptar','Opciones de cookies'],
    it:['Con il suo consenso, Google Analytics e Google Ads misurano visite e prenotazioni, senza i dati del modulo. Rifiutare non impedisce la prenotazione.','Rifiuta','Accetta','Scelte sui cookie'],
    de:['Mit Ihrer Zustimmung messen Google Analytics und Google Ads Besuche und Buchungen, ohne Formulardaten. Ablehnen verhindert keine Buchung.','Ablehnen','Akzeptieren','Cookie-Auswahl']
  }[lang];
  if($('bookingCookieText')) {
    $('bookingCookieText').textContent=cookieText[0];
    $('ckNo').textContent=cookieText[1]; $('ckOk').textContent=cookieText[2];
    $('bookingCookieSettings').textContent=cookieText[3];
  }

  var direct = API + '?lang=' + encodeURIComponent(lang) + (preselect ? '&service=' + encodeURIComponent(preselect) : '');
  $('directFallback').href = direct;
  $('transportForm').action = API;

  var DIALS = [['+41','CH'],['+33','FR'],['+351','PT'],['+55','BR'],['+39','IT'],['+49','DE'],['+34','ES'],['+32','BE'],['+352','LU'],['+44','UK'],['+1','US/CA'],['other','+…']];
  $('phoneDial').innerHTML = DIALS.map(function(d){return '<option value="'+d[0]+'">'+(d[0]==='other'?'':d[0]+' ')+d[1]+'</option>';}).join('');
  $('phoneDial').onchange=function(){ $('phoneOther').hidden=this.value!=='other'; };

  var state={cfg:null,service:null,minutes:null,time:null,quote:null,availabilitySeq:0};
  var pending={};
  var bookingRequestId = makeId('booking');

  function makeId(prefix){
    var rnd = (self.crypto && crypto.randomUUID) ? crypto.randomUUID().replace(/-/g,'') : Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
    return prefix+'-'+Date.now().toString(36)+'-'+rnd;
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
      b.onclick=function(){ state.minutes=Number(o.minutes); renderDurations(); loadSlots({preserveTime:false}); };
      box.appendChild(b);
    });
  }

  function quoteInput(){ return {serviceId:state.service?state.service.id:'',minutes:state.minutes,code:$('code').value.trim(),date:$('date').value,lang:lang}; }

  async function loadSlots(opts){
    opts=opts||{};
    var seq=++state.availabilitySeq;
    var previousTime=opts.preserveTime ? state.time : null;
    if(!opts.preserveTime) state.time=null;
    state.quote=null; renderSummary(); clearMsg();
    if(!state.service || !state.minutes || !$('date').value){ $('slotsBlock').hidden=true; return; }
    $('slotsBlock').hidden=false; $('slots').innerHTML='<span class="loading">'+esc(t.searching)+'</span>';
    try{
      var res=await callApi('availability',quoteInput(),12000);
      if(seq!==state.availabilitySeq) return;
      if(!res || !res.ok){ $('slots').innerHTML=''; showMsg((res&&res.error)||t.connection); return; }
      state.quote=res.quote;
      if(!res.slots || !res.slots.length){ $('slots').innerHTML='<span class="loading">'+esc(t.none)+'</span>'; return; }
      $('slots').innerHTML='';
      res.slots.forEach(function(h){
        var b=document.createElement('button'); b.type='button'; b.className='chip slot'; b.textContent=h;
        var selected=previousTime===h;
        if(selected) state.time=h;
        b.setAttribute('aria-pressed',selected?'true':'false');
        b.onclick=function(){ state.time=h; Array.from($('slots').children).forEach(function(x){ if(x.setAttribute)x.setAttribute('aria-pressed',x===b?'true':'false'); }); renderSummary(); };
        $('slots').appendChild(b);
      });
      renderSummary();
    }catch(e){
      if(seq!==state.availabilitySeq) return;
      $('slots').innerHTML=''; showMsg(t.connection);
    }
  }

  function fmtDate(s){ if(!s)return''; var p=s.split('-'); return p[2]+'.'+p[1]+'.'+p[0]; }
  function emailLine(){
    var v=$('email').value.trim();
    if(!v) return '<div class="sum-email"><small>'+esc(t.checkEmail)+'</small></div>';
    return '<div class="sum-email">'+esc(t.sentTo)+' <strong>'+esc(v)+'</strong><br><small>'+esc(t.checkEmail)+'</small></div>';
  }
  function renderSummary(){
    var box=$('summary');
    if(!state.quote || !state.time || !$('date').value){ box.hidden=true; return; }
    box.hidden=false;
    box.innerHTML='<strong>'+esc(state.quote.service)+'</strong><br>'+esc(state.quote.totalMinutes)+' min'+(state.quote.extraMinutes?' (+'+esc(state.quote.extraMinutes)+' min)':'')+' · '+esc(state.quote.price)+' CHF<br>'+esc(fmtDate($('date').value))+' · '+esc(state.time)+'<br>Cointrin, Genève'+emailLine();
  }

  $('service').onchange=function(){ state.service=(state.cfg.services||[]).find(function(s){return s.id===$('service').value;})||null; state.minutes=null; renderDurations(); loadSlots({preserveTime:false}); };
  $('email').addEventListener('input',renderSummary);
  $('date').onchange=function(){ loadSlots({preserveTime:false}); };
  $('code').onchange=function(){ loadSlots({preserveTime:true}); };

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
    return Object.assign(quoteInput(),{time:state.time,firstName:$('firstName').value.trim(),lastName:$('lastName').value.trim(),email:$('email').value.trim(),phoneDial:dial,phoneNumber:$('phoneNumber').value.trim(),birthDate:$('birthDate').value,street:$('street').value.trim(),zip:$('zip').value.trim(),city:$('city').value.trim(),country:$('country').value.trim(),area:[['À travailler',$('areaWork').value],['À éviter',$('areaAvoid').value],['Autre',$('area').value]].map(function(x){return [x[0],x[1].trim()];}).filter(function(x){return x[1];}).map(function(x){return x[0]+' : '+x[1];}).join(' | '),website:$('website').value.trim(),accepted:true,birthdayOk:$('birthdayOk').checked,marketingOk:$('marketingOk').checked,lang:lang,requestId:bookingRequestId});
  }

  $('submit').onclick=async function(){
    clearMsg(); var data=validate(); if(!data)return;
    var btn=$('submit'); btn.disabled=true; btn.textContent=t.booking;
    try{
      var res=await callApi('book',data,20000);
      if(!res || !res.ok){ btn.disabled=false; btn.textContent=t.confirm; showMsg((res&&res.error)||t.connection); if(res&&res.error&&/créneau|horaire|slot|time/i.test(res.error)) loadSlots({preserveTime:false}); return; }
      var r=res.receipt||{};
      $('doneBox').innerHTML='<strong>'+esc(r.service||state.quote.service)+'</strong><br>'+esc(r.totalMinutes||state.quote.totalMinutes)+' min · '+esc(r.price||state.quote.price)+' CHF<br>'+esc(fmtDate(r.date||$('date').value))+' · '+esc(r.time||state.time)+'<br>'+esc(r.location||'Cointrin, Genève');
      if(r.anamnesisUrl) $('anamLink').href=r.anamnesisUrl; else if(state.cfg.anamnesisUrl) $('anamLink').href=state.cfg.anamnesisUrl;
      $('bookingCard').hidden=true; $('doneCard').hidden=false; window.scrollTo(0,0);
      try{
        if(window.SR && typeof window.SR.trackBooking==='function') window.SR.trackBooking(bookingRequestId);
      }catch(trackErr){}
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

  // Conditions générales : la case ne se coche qu'après lecture (comme le formulaire direct)
  (function(){
    var CGT={fr:{read:'J’accepte les conditions générales',close:'Fermer',note:''},
      pt:{read:'Aceito as condições gerais',close:'Fechar',note:'O texto das condições gerais está em francês; a versão francesa é a que faz fé.'},
      en:{read:'I accept the terms and conditions',close:'Close',note:'The terms are in French; the French version is legally binding.'},
      es:{read:'Acepto las condiciones generales',close:'Cerrar',note:'Las condiciones generales están en francés; la versión francesa es la que prevalece.'},
      it:{read:'Accetto le condizioni generali',close:'Chiudi',note:'Le condizioni generali sono in francese; fa fede la versione francese.'},
      de:{read:'Ich akzeptiere die AGB',close:'Schliessen',note:'Die AGB sind auf Französisch; massgebend ist die französische Fassung.'}};
    var c=CGT[lang]||CGT.fr, box=$('accepted'); if(!box) return;
    var link=box.parentNode.querySelector('a'), url=link?link.getAttribute('href'):'../conditions.html';
    var read=false, html=null, modal=null, last=null;
    function build(){
      modal=document.createElement('div'); modal.className='cg-modal'; modal.hidden=true;
      modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true'); modal.setAttribute('aria-label',c.read);
      modal.innerHTML='<div class="cg-box"><button type="button" class="cg-x" aria-label="'+esc(c.close)+'">×</button>'+
        (c.note?'<p class="cg-note">'+esc(c.note)+'</p>':'')+'<div class="cg-body"></div>'+
        '<button type="button" class="main cg-ok">'+esc(c.read)+'</button></div>';
      document.body.appendChild(modal);
      modal.querySelector('.cg-body').innerHTML=html;
      modal.querySelector('.cg-x').onclick=close;
      modal.addEventListener('click',function(e){ if(e.target===modal) close(); });
      modal.querySelector('.cg-ok').onclick=function(){ read=true; box.checked=true; close(); clearMsg(); };
      document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&!modal.hidden) close(); });
    }
    function close(){ modal.hidden=true; document.body.style.overflow=''; (last||box).focus(); }
    function open(){
      last=document.activeElement;
      if(html===null){
        fetch(url,{cache:'no-cache'}).then(function(r){ if(!r.ok) throw 0; return r.text(); }).then(function(txt){
          var doc=new DOMParser().parseFromString(txt,'text/html'), card=doc.querySelector('.card.cg')||doc.body;
          card.querySelectorAll('a.back,script').forEach(function(n){ n.remove(); });
          html=card.innerHTML; build(); open();
        }).catch(function(){ window.open(url,'_blank','noopener'); read=true; });
        return;
      }
      modal.hidden=false; document.body.style.overflow='hidden'; modal.querySelector('.cg-box').scrollTop=0; modal.querySelector('.cg-ok').focus({preventScroll:true});
    }
    box.addEventListener('click',function(e){ if(box.checked&&!read){ e.preventDefault(); box.checked=false; open(); } });
    if(link) link.addEventListener('click',function(e){ e.preventDefault(); open(); });
  })();

  init();
})();
