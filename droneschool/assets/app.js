/* ==========================================================================
   Drone School · applicazione
   Ogni pagina è un documento autonomo. Il guscio comune (testata, menu,
   piede) viene costruito da shell.js, il contenuto dalla vista dichiarata
   nell'attributo data-vista di #app.
   ========================================================================== */

(function () {
'use strict';

var SH = window.GS_SHELL;

/* ---------------------------------------------------------------- dati */

var MODULI = []
  .concat(window.MODULI_A1A3 || [])
  .concat(window.MODULI_A1A3B || [])
  .concat(window.MODULI_METEO || [])
  .concat(window.MODULI_A2 || []);

var ORDINE = [
  'sicurezza-operativa', 'regolamentazione', 'idoneita', 'procedure-operative',
  'spazio-aereo', 'conoscenza-uas', 'privacy', 'assicurazione', 'security',
  'meteorologia', 'procedure-mitigazione', 'uas-avanzato'
];
MODULI.sort(function (a, b) { return ORDINE.indexOf(a.id) - ORDINE.indexOf(b.id); });

var AREE = {
  'sicurezza':     { nome: 'Sicurezza', desc: 'Comportamento del pilota, distanze, persone non coinvolte, protezione da interferenze e minacce.' },
  'normativa':     { nome: 'Regole e normativa', desc: 'Da ICAO a ENAC, obblighi di pilota e operatore, registrazione, assicurazione.' },
  'fattore-umano': { nome: 'Fattore umano', desc: 'Idoneità del pilota, farmaci, limiti della percezione a distanza.' },
  'procedure':     { nome: 'Procedure operative', desc: 'Preparazione del volo, condizioni, modalità di pilotaggio, emergenze, mitigazione.' },
  'spazio-aereo':  { nome: 'Spazio aereo', desc: 'Classi, CTR e ATZ, zone geografiche UAS italiane, NOTAM, lettura della carta.' },
  'tecnica':       { nome: 'Tecnica UAS', desc: 'Principi del volo, comandi, sensori, radiofrequenze, massa ed equilibrio, batterie.' },
  'meteorologia':  { nome: 'Meteorologia', desc: 'Temperatura, pressione, vento, nubi e nebbia, lettura completa del METAR.' },
  'privacy':       { nome: 'Privacy e dati', desc: 'GDPR, diritto all\'immagine, basi giuridiche, custodia delle riprese.' }
};

var PERCORSI = {
  a1a3: {
    sigla: 'A1/A3', nome: 'Attestato A1/A3', pagina: 'a1a3.html',
    desc: 'Il primo passo, obbligatorio per chiunque. Corso e esame online sul portale ENAC.',
    dati: ['40 domande', '60 minuti', 'soglia 75%', 'validità 5 anni'],
    prereq: 'Nessun prerequisito. Età minima 16 anni in Italia.'
  },
  a2: {
    sigla: 'A2', nome: 'Attestato A2', pagina: 'a2.html',
    desc: 'Serve per operare con droni di classe C2 vicino a persone non coinvolte, anche in ambito urbano.',
    dati: ['30 domande', '60 minuti', 'soglia 45/60', 'validità 5 anni'],
    prereq: 'Richiede l\'attestato A1/A3 e la dichiarazione di addestramento pratico in autoistruzione.'
  }
};

/* Le tavole e le animazioni viaggiano con il sito. Per spostarle su una repo
   esterna basta cambiare questa riga, per esempio con l'indirizzo dell'album. */
var MEDIA_BASE = 'media/';
var FORMSPREE = 'https://formspree.io/f/xeajpyrv';

/* --------------------------------------------------------- archiviazione */

var Store = (function () {
  var mem = {};
  var ok = false;
  try { window.localStorage.setItem('__gs', '1'); window.localStorage.removeItem('__gs'); ok = true; } catch (e) { ok = false; }
  return {
    get: function (k) {
      try { return ok ? window.localStorage.getItem('gs:' + k) : (mem[k] || null); }
      catch (e) { return mem[k] || null; }
    },
    set: function (k, v) {
      mem[k] = v;
      try { if (ok) window.localStorage.setItem('gs:' + k, v); } catch (e) {}
    }
  };
})();

var Progresso = {
  dati: (function () { try { return JSON.parse(Store.get('progresso') || '{}'); } catch (e) { return {}; } })(),
  salva: function () { Store.set('progresso', JSON.stringify(this.dati)); },
  segna: function (id, punti, totale) {
    this.dati[id] = { punti: punti, totale: totale, t: Date.now() };
    this.salva();
  },
  fatto: function (id) {
    var d = this.dati[id];
    return !!(d && d.totale && d.punti / d.totale >= 0.75);
  },
  completati: function () {
    var n = 0, self = this;
    MODULI.forEach(function (m) { if (self.fatto(m.id)) n++; });
    return n;
  }
};

/* ------------------------------------------------------------- utilità */

function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function el(tag, cls, html) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function norm(s) {
  s = String(s).toLowerCase();
  return s.normalize ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : s;
}
function spoglia(html) {
  var d = document.createElement('div');
  d.innerHTML = html;
  return (d.textContent || '').replace(/\s+/g, ' ').trim();
}
function mischia(a) {
  var r = a.slice();
  for (var i = r.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = r[i]; r[i] = r[j]; r[j] = t;
  }
  return r;
}
function modulo(id) {
  for (var i = 0; i < MODULI.length; i++) if (MODULI[i].id === id) return MODULI[i];
  return null;
}
function param(nome) {
  var m = new RegExp('[?&]' + nome + '=([^&#]*)').exec(window.location.search);
  return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
}
function ico(n, c) { return SH.icona(n, c); }

/* ------------------------------------------------------- indice ricerca */

var INDICE = [];
(function costruisciIndice() {
  MODULI.forEach(function (m) {
    m.sezioni.forEach(function (s) {
      INDICE.push({
        tipo: 'lezione', via: m.titolo, titolo: s.titolo, testo: spoglia(s.html),
        url: 'modulo.html?m=' + m.id + '&s=' + s.id
      });
    });
    (m.ricorda || []).forEach(function (r) {
      INDICE.push({
        tipo: 'nozione', via: m.titolo + ' · da ricordare', titolo: r, testo: r,
        url: 'modulo.html?m=' + m.id + '&s=ricorda'
      });
    });
  });
  (window.GLOSSARIO || []).forEach(function (g) {
    INDICE.push({
      tipo: 'glossario', via: 'Glossario', titolo: g.t + (g.e ? ' · ' + g.e : ''),
      testo: g.d + ' ' + g.e, url: 'glossario.html?t=' + encodeURIComponent(g.t)
    });
  });
  INDICE.forEach(function (v) { v._n = norm(v.titolo + ' ' + v.via + ' ' + v.testo); v._nt = norm(v.titolo); });
})();

function cerca(q, filtro, limite) {
  var termini = norm(q).split(/\s+/).filter(function (t) { return t.length > 1; });
  if (!termini.length) return [];
  var out = [];
  INDICE.forEach(function (v) {
    if (filtro && filtro !== 'tutto' && v.tipo !== filtro) return;
    var punti = 0, tutti = true;
    termini.forEach(function (t) {
      var iT = v._nt.indexOf(t), iC = v._n.indexOf(t);
      if (iC < 0) { tutti = false; return; }
      punti += 10;
      var re = new RegExp('(^|[^a-z0-9])' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9]|$)');
      if (re.test(v._n)) punti += 30;
      if (re.test(v._nt)) punti += 45;
      if (iT >= 0) punti += 40;
      if (iT === 0) punti += 25;
      if (v.tipo === 'glossario') punti += 8;
      if (v.tipo === 'nozione') punti += 5;
    });
    if (tutti) out.push({ v: v, p: punti });
  });
  out.sort(function (a, b) { return b.p - a.p; });
  return out.slice(0, limite || 24).map(function (o) { return o.v; });
}

function evidenzia(testo, q, len) {
  var termini = norm(q).split(/\s+/).filter(function (t) { return t.length > 1; });
  var nt = norm(testo), pos = -1;
  for (var i = 0; i < termini.length && pos < 0; i++) pos = nt.indexOf(termini[i]);
  if (pos < 0) pos = 0;
  var start = Math.max(0, pos - 45);
  var frammento = testo.slice(start, start + (len || 190));
  if (start > 0) frammento = '…' + frammento;
  if (start + (len || 190) < testo.length) frammento += '…';
  var html = esc(frammento);
  termini.forEach(function (t) {
    var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    html = html.replace(re, '<mark>$1</mark>');
  });
  return html;
}

/* ------------------------------------------------- decodificatore METAR */

var METEO_COD = {
  DZ: 'pioviggine', RA: 'pioggia', SN: 'neve', SG: 'nevischio', PL: 'granuli di ghiaccio',
  GR: 'grandine', GS: 'gragnola', UP: 'precipitazione non identificata',
  BR: 'foschia', FG: 'nebbia', FU: 'fumo', VA: 'ceneri vulcaniche', DU: 'polvere diffusa',
  SA: 'sabbia', HZ: 'caligine', PY: 'spruzzi',
  PO: 'vortici di polvere', SQ: 'groppo', FC: 'nube a imbuto', SS: 'tempesta di sabbia', DS: 'tempesta di polvere'
};
var METEO_DESC = { MI: 'sottile', BC: 'a banchi', PR: 'parziale', DR: 'sollevata dal vento', BL: 'sollevata in alto', SH: 'rovescio di', TS: 'temporale con', FZ: 'congelantesi' };
var COPERTURA = { FEW: ['poche nubi', '1-2 ottavi'], SCT: ['nubi sparse', '3-4 ottavi'], BKN: ['cielo prevalentemente coperto', '5-7 ottavi'], OVC: ['cielo coperto', '8 ottavi'] };
var SETTORI = ['nord', 'nord-nordest', 'nordest', 'est-nordest', 'est', 'est-sudest', 'sudest', 'sud-sudest', 'sud', 'sud-sudovest', 'sudovest', 'ovest-sudovest', 'ovest', 'ovest-nordovest', 'nordovest', 'nord-nordovest'];

function direzioneParole(g) {
  var i = Math.round((((g % 360) + 360) % 360) / 22.5) % 16;
  return SETTORI[i];
}

function decodificaMetar(testo) {
  var righe = [];
  var sintesi = { vento: null, raffica: null, vis: null, cb: false, ts: false, prec: null, t: null, td: null, cavok: false, ceiling: null };
  var grezzo = String(testo).toUpperCase().replace(/=/g, ' ').replace(/\s+/g, ' ').trim();
  if (!grezzo) return { righe: [], sintesi: sintesi };
  var token = grezzo.split(' ');
  var primaStazione = true;
  var visLetta = false;

  function aggiungi(g, eti, desc, ignoto) {
    righe.push({ gruppo: g, eti: eti, desc: desc, ignoto: !!ignoto });
  }

  for (var i = 0; i < token.length; i++) {
    var t = token[i], m;

    if (t === 'METAR') { aggiungi(t, 'Tipo di messaggio', 'Rapporto meteorologico di aeroporto, osservazione di routine.'); continue; }
    if (t === 'SPECI') { aggiungi(t, 'Tipo di messaggio', 'Osservazione speciale, emessa fuori orario per un cambiamento significativo.'); continue; }
    if (t === 'COR' || t === 'AMD') { aggiungi(t, 'Correzione', 'Messaggio corretto o emendato rispetto a un\'emissione precedente.'); continue; }
    if (t === 'AUTO') { aggiungi(t, 'Origine', 'Osservazione prodotta da una stazione automatica, senza intervento di un operatore.'); continue; }
    if (t === 'NIL') { aggiungi(t, 'Assenza', 'Osservazione non disponibile.'); continue; }
    if (t === 'RMK') {
      aggiungi(token.slice(i).join(' '), 'Note', 'Sezione di osservazioni supplementari, non standardizzata a livello internazionale.');
      break;
    }

    if (primaStazione && /^[A-Z]{4}$/.test(t) && !/^(CAVOK|NOSIG|NSC|NCD|TEMPO|BECMG)$/.test(t)) {
      var paese = t.slice(0, 2) === 'LI' ? 'Italia' : 'codice ICAO';
      aggiungi(t, 'Stazione', 'Identificativo ICAO dell\'aeroporto o della stazione di rilevamento (' + paese + ').');
      primaStazione = false;
      continue;
    }

    if ((m = t.match(/^(\d{2})(\d{2})(\d{2})Z$/))) {
      aggiungi(t, 'Giorno e ora', 'Giorno ' + m[1] + ' del mese, ore ' + m[2] + ':' + m[3] + ' Zulu (UTC). In Italia corrisponde alle ' +
        ((parseInt(m[2], 10) + 1) % 24 + '').padStart(2, '0') + ':' + m[3] + ' in orario solare e alle ' +
        ((parseInt(m[2], 10) + 2) % 24 + '').padStart(2, '0') + ':' + m[3] + ' in orario legale.');
      continue;
    }

    if ((m = t.match(/^(\d{3}|VRB)(\d{2,3})(G(\d{2,3}))?(KT|MPS|KMH)$/))) {
      var vel = parseInt(m[2], 10), un = m[5];
      var ms = un === 'KT' ? vel * 0.5144 : (un === 'MPS' ? vel : vel / 3.6);
      var d = m[1] === 'VRB' ? 'direzione variabile e non determinabile' : 'da ' + parseInt(m[1], 10) + ' gradi, cioè da ' + direzioneParole(parseInt(m[1], 10));
      var s = 'Vento ' + d + ', ' + vel + ' ' + (un === 'KT' ? 'nodi' : un === 'MPS' ? 'm/s' : 'km/h') +
        ' (circa ' + ms.toFixed(1) + ' m/s).';
      sintesi.vento = ms;
      if (m[4]) {
        var raf = parseInt(m[4], 10);
        var rms = un === 'KT' ? raf * 0.5144 : (un === 'MPS' ? raf : raf / 3.6);
        sintesi.raffica = rms;
        s += ' Raffiche fino a ' + raf + ' ' + (un === 'KT' ? 'nodi' : 'unità') + ' (circa ' + rms.toFixed(1) + ' m/s).';
      }
      if (vel === 0) s = 'Calma di vento.';
      aggiungi(t, 'Vento', s);
      continue;
    }

    if ((m = t.match(/^(\d{3})V(\d{3})$/))) {
      aggiungi(t, 'Variabilità', 'La direzione del vento oscilla fra ' + parseInt(m[1], 10) + ' e ' + parseInt(m[2], 10) + ' gradi, quindi fra ' + direzioneParole(parseInt(m[1], 10)) + ' e ' + direzioneParole(parseInt(m[2], 10)) + '.');
      continue;
    }

    if (t === 'CAVOK') {
      sintesi.cavok = true; if (sintesi.vis === null) sintesi.vis = 10000; visLetta = true;
      aggiungi(t, 'CAVOK', 'Visibilità pari o superiore a 10 km, nessuna nube sotto i 5000 piedi o sotto la minima altitudine di settore, nessun cumulonembo né cumulo torreggiante, nessun fenomeno significativo in atto.');
      continue;
    }

    if ((m = t.match(/^(\d{4})(NDV)?$/)) && !visLetta) {
      var v = parseInt(m[1], 10);
      visLetta = true;
      if (sintesi.vis === null || v < sintesi.vis) sintesi.vis = v;
      aggiungi(t, 'Visibilità', v >= 9999 ? 'Visibilità pari o superiore a 10 chilometri.' :
        (v === 0 ? 'Visibilità inferiore a 50 metri.' : 'Visibilità orizzontale prevalente di ' + v + ' metri.' + (v < 1000 ? ' Sotto i 1000 metri si è in condizioni di nebbia.' : '')));
      continue;
    }

    if ((m = t.match(/^(\d{4})(N|NE|E|SE|S|SW|W|NW)$/))) {
      aggiungi(t, 'Visibilità direzionale', 'Visibilità minima di ' + parseInt(m[1], 10) + ' metri nel settore ' + m[2] + '.');
      continue;
    }

    if ((m = t.match(/^R(\d{2}[LCR]?)\/([PM])?(\d{4})(V(\d{4}))?([UDN])?$/))) {
      aggiungi(t, 'RVR', 'Portata visuale della pista ' + m[1] + ': ' + (m[2] === 'P' ? 'oltre ' : m[2] === 'M' ? 'meno di ' : '') + parseInt(m[3], 10) + ' metri' + (m[5] ? ', variabile fino a ' + parseInt(m[5], 10) + ' metri' : '') + '. Riguarda gli aeromobili in atterraggio.');
      continue;
    }

    if ((m = t.match(/^(FEW|SCT|BKN|OVC)(\d{3})(CB|TCU)?$/))) {
      var q = parseInt(m[2], 10) * 100;
      var c = COPERTURA[m[1]];
      if ((m[1] === 'BKN' || m[1] === 'OVC') && (sintesi.ceiling === null || q < sintesi.ceiling)) sintesi.ceiling = q;
      if (m[3] === 'CB') sintesi.cb = true;
      aggiungi(t, 'Nubi', c[0] + ' (' + c[1] + ') con base a ' + q + ' piedi, circa ' + Math.round(q * 0.3048) + ' metri.' +
        (m[3] === 'CB' ? ' Presenza di cumulonembi: fenomeni temporaleschi in atto o imminenti.' : m[3] === 'TCU' ? ' Presenza di cumuli torreggianti, stadio che precede il temporale.' : ''));
      continue;
    }

    if ((m = t.match(/^VV(\d{3}|\/\/\/)$/))) {
      aggiungi(t, 'Visibilità verticale', m[1] === '///' ? 'Visibilità verticale non misurabile.' : 'Cielo non discernibile. Visibilità verticale di ' + parseInt(m[1], 10) * 100 + ' piedi.');
      continue;
    }

    if (t === 'NSC') { aggiungi(t, 'Nubi', 'Nessuna nube significativa.'); continue; }
    if (t === 'NCD') { aggiungi(t, 'Nubi', 'Nessuna nube rilevata dai sensori automatici.'); continue; }
    if (t === 'SKC' || t === 'CLR') { aggiungi(t, 'Nubi', 'Cielo sereno. A differenza di CAVOK non implica che tutte le altre condizioni favorevoli siano soddisfatte.'); continue; }
    if (t === 'NSW') { aggiungi(t, 'Tempo presente', 'Fine del fenomeno meteorologico significativo.'); continue; }

    if ((m = t.match(/^(RE)?([-+]|VC)?((?:MI|BC|PR|DR|BL|SH|TS|FZ)*)((?:DZ|RA|SN|SG|PL|GR|GS|UP|BR|FG|FU|VA|DU|SA|HZ|PY|PO|SQ|FC|SS|DS)+)$/)) && m[4]) {
      var parti = [];
      if (m[1]) parti.push('tempo recente:');
      if (m[2] === '-') parti.push('debole'); else if (m[2] === '+') parti.push('forte'); else if (m[2] === 'VC') parti.push('nelle vicinanze:');
      (m[3].match(/../g) || []).forEach(function (d) { if (METEO_DESC[d]) parti.push(METEO_DESC[d]); });
      (m[4].match(/../g) || []).forEach(function (f) { if (METEO_COD[f]) parti.push(METEO_COD[f]); });
      if (/TS/.test(m[3])) sintesi.ts = true;
      if (/RA|SN|DZ|GR|GS|PL/.test(m[4])) sintesi.prec = m[2] === '+' ? 'forte' : m[2] === '-' ? 'debole' : 'moderata';
      if (/FG/.test(m[4])) sintesi.vis = Math.min(sintesi.vis === null ? 9999 : sintesi.vis, 900);
      aggiungi(t, m[1] ? 'Tempo recente' : 'Tempo presente', parti.join(' ').replace(/^./, function (x) { return x.toUpperCase(); }) + '.');
      continue;
    }

    if ((m = t.match(/^(M?\d{2})\/(M?\d{2})$/))) {
      var tt = parseInt(m[1].replace('M', '-'), 10);
      var td = parseInt(m[2].replace('M', '-'), 10);
      sintesi.t = tt; sintesi.td = td;
      var sp = tt - td;
      aggiungi(t, 'Temperatura e rugiada', 'Temperatura ' + tt + ' °C, punto di rugiada ' + td + ' °C. Lo spread è di ' + sp + ' °C' +
        (sp <= 2 ? ': aria prossima alla saturazione, nebbia o nubi basse probabili.' : sp <= 5 ? ': aria umida.' : ': aria secca.'));
      continue;
    }

    if ((m = t.match(/^Q(\d{4})$/))) {
      var p = parseInt(m[1], 10);
      aggiungi(t, 'Pressione', 'QNH di ' + p + ' hPa, riportato al livello medio del mare. La pressione standard è 1013,25 hPa, quindi il valore è ' +
        (p > 1013 ? 'superiore alla standard.' : p < 1013 ? 'inferiore alla standard.' : 'in linea con la standard.'));
      continue;
    }
    if ((m = t.match(/^A(\d{4})$/))) {
      aggiungi(t, 'Pressione', 'Altimetro impostato su ' + (parseInt(m[1], 10) / 100).toFixed(2) + ' pollici di mercurio, circa ' + Math.round(parseInt(m[1], 10) / 100 * 33.8639) + ' hPa.');
      continue;
    }

    if (t === 'NOSIG') { aggiungi(t, 'Tendenza', 'Nessun cambiamento significativo previsto nelle due ore successive.'); continue; }
    if (t === 'BECMG') { visLetta = false; aggiungi(t, 'Tendenza', 'Cambiamento graduale in atto verso le condizioni indicate dai gruppi che seguono.'); continue; }
    if (t === 'TEMPO') { visLetta = false; aggiungi(t, 'Tendenza', 'Variazioni temporanee, di durata inferiore a un\'ora ciascuna.'); continue; }
    if ((m = t.match(/^(PROB)(\d{2})$/))) { aggiungi(t, 'Probabilità', 'Probabilità del ' + m[2] + '% che si verifichi lo scenario descritto dai gruppi seguenti.'); continue; }
    if ((m = t.match(/^(FM|TL|AT)(\d{4})$/))) {
      var eti = m[1] === 'FM' ? 'a partire dalle' : m[1] === 'TL' ? 'fino alle' : 'alle';
      aggiungi(t, 'Orario', 'Variazione ' + eti + ' ' + m[2].slice(0, 2) + ':' + m[2].slice(2) + ' Zulu.');
      continue;
    }
    if (t === 'WS') {
      var resto = token.slice(i + 1, i + 3).join(' ');
      aggiungi(t + (resto ? ' ' + resto : ''), 'Wind shear', 'Segnalazione di gradiente del vento. Condizione da evitare con un UAS leggero.');
      i += 2;
      continue;
    }
    if (/^\d{2}\/\/\/\/\/\/$/.test(t) || /^R\/SNOCLO$/.test(t) || /^\d{6}\/\/$/.test(t)) {
      aggiungi(t, 'Stato pista', 'Informazione sullo stato della pista, destinata agli aeromobili con equipaggio.');
      continue;
    }

    aggiungi(t, 'Gruppo non riconosciuto', 'Questo gruppo non rientra fra quelli decodificati. Può essere un codice nazionale o una nota locale.', true);
  }

  return { righe: righe, sintesi: sintesi };
}

function verdettoMetar(s) {
  var stop = [], attenzione = [];
  var v = Math.max(s.vento || 0, s.raffica || 0);
  if (v >= 10) stop.push('vento oltre i 10 m/s');
  else if (v >= 8) attenzione.push('vento vicino al limite operativo');
  if (s.vis !== null && s.vis < 1500) stop.push('visibilità sotto i 1500 metri');
  else if (s.vis !== null && s.vis < 5000) attenzione.push('visibilità ridotta');
  if (s.cb || s.ts) stop.push('attività temporalesca');
  if (s.prec === 'forte') stop.push('precipitazione forte');
  else if (s.prec) attenzione.push('precipitazione in atto');
  if (s.t !== null && s.td !== null && s.t - s.td <= 2) attenzione.push('spread minimo, nebbia probabile');
  if (s.t !== null && s.t <= 0) attenzione.push('rischio di formazione di ghiaccio e calo di resa delle batterie');
  if (s.ceiling !== null && s.ceiling < 500) attenzione.push('base delle nubi molto bassa');

  if (stop.length) return { classe: 'ko', testo: 'Non si vola', motivi: stop.concat(attenzione) };
  if (attenzione.length) return { classe: 'forse', testo: 'Valutare con attenzione', motivi: attenzione };
  return { classe: 'ok', testo: 'Condizioni compatibili', motivi: [] };
}

var METAR_ESEMPI = [
  { n: 'Malpensa, bel tempo', v: 'METAR LIMC 170850Z 27008KT 9999 FEW035 22/11 Q1019 NOSIG=' },
  { n: 'Linate, vento forte', v: 'METAR LIML 121220Z 25018G28KT 210V290 9999 SCT025 BKN040 16/08 Q1008 NOSIG=' },
  { n: 'Orio al Serio, nebbia', v: 'METAR LIME 240620Z AUTO VRB02KT 0500 FG VV002 M01/M01 Q1024=' },
  { n: 'Fiumicino, automatico', v: 'METAR LIRF 170855Z AUTO VRB02KT 9999 FEW011 BKN033 17/15 Q1019 NOSIG=' },
  { n: 'Torino, temporale', v: 'METAR LIMF 181650Z 20012G25KT 3000 TSRA BKN012 SCT025CB 19/17 Q1006 TEMPO 1500 +TSRA=' },
  { n: 'Venezia, CAVOK', v: 'METAR LIPZ 050950Z 09006KT CAVOK 24/09 Q1021 NOSIG=' }
];

function montaMetar(contenitore) {
  contenitore.innerHTML = '';
  var box = el('div', 'metar-tool');
  var inp = el('div', 'metar-input');
  inp.innerHTML = '<label class="eyebrow" for="metar-txt">Incolla un messaggio METAR</label>' +
    '<textarea id="metar-txt" spellcheck="false" autocapitalize="characters"></textarea>' +
    '<div class="metar-esempi"></div>';
  box.appendChild(inp);
  var out = el('div', 'metar-out');
  box.appendChild(out);
  contenitore.appendChild(box);

  var ta = $('#metar-txt', inp);
  var esempi = $('.metar-esempi', inp);
  METAR_ESEMPI.forEach(function (e) {
    var b = el('button', null, esc(e.n));
    b.type = 'button';
    b.addEventListener('click', function () { ta.value = e.v; rendi(); });
    esempi.appendChild(b);
  });

  function rendi() {
    var r = decodificaMetar(ta.value);
    out.innerHTML = '';
    if (!r.righe.length) {
      out.innerHTML = '<div class="metar-sintesi" style="background:transparent">Incolla un METAR oppure scegli uno degli esempi qui sopra.</div>';
      return;
    }
    var v = verdettoMetar(r.sintesi);
    var sint = el('div', 'metar-sintesi');
    sint.innerHTML = '<div><b>Lettura operativa.</b> ' +
      (v.motivi.length ? 'Elementi rilevanti: ' + esc(v.motivi.join(', ')) + '.' : 'Nessun elemento critico nei parametri decodificati.') +
      '</div><span class="verdetto ' + v.classe + '">' + esc(v.testo) + '</span>';
    out.appendChild(sint);
    r.righe.forEach(function (g) {
      var riga = el('div', 'metar-riga' + (g.ignoto ? ' ignoto' : ''));
      riga.innerHTML = '<div class="metar-gruppo">' + esc(g.gruppo) + '</div>' +
        '<div class="metar-desc"><span class="eti">' + esc(g.eti) + '</span>' + esc(g.desc) + '</div>';
      out.appendChild(riga);
    });
  }

  ta.addEventListener('input', rendi);
  ta.value = METAR_ESEMPI[0].v;
  rendi();
}

/* ---------------------------------------------------------------- quiz */

function montaQuiz(contenitore, mod) {
  var dom = mischia(mod.quiz);
  var risposte = {};
  var box = el('section', 'quiz');
  box.id = 'quiz';
  box.innerHTML = '<div class="quiz-testa"><h3>Verifica: ' + esc(mod.titolo) + '</h3>' +
    '<span class="punteggio" data-p>' + dom.length + ' domande</span></div>';
  var corpo = el('div', 'quiz-corpo');
  box.appendChild(corpo);

  dom.forEach(function (q, idx) {
    var d = el('div', 'domanda');
    d.innerHTML = '<div class="testo"><span class="n">' + (idx + 1 < 10 ? '0' : '') + (idx + 1) + '</span><span>' + esc(q.d) + '</span></div>';
    var opz = el('div', 'opzioni');
    q.o.forEach(function (testo, i) {
      var b = el('button', 'opz');
      b.type = 'button';
      b.innerHTML = '<span class="lettera">' + 'ABCD'[i] + '</span><span>' + esc(testo) + '</span>';
      b.addEventListener('click', function () {
        if (risposte[idx] !== undefined) return;
        risposte[idx] = i;
        $$('.opz', opz).forEach(function (x, j) {
          x.disabled = true;
          if (j === q.c) x.classList.add('giusta');
          else if (j === i) x.classList.add('sbagliata');
        });
        var sp = el('div', 'spiega', '<b>' + (i === q.c ? 'Corretto.' : 'Non è questa.') + '</b> ' + esc(q.sp));
        d.appendChild(sp);
        aggiornaPunteggio();
      });
      opz.appendChild(b);
    });
    d.appendChild(opz);
    corpo.appendChild(d);
  });

  function aggiornaPunteggio() {
    var date = 0, giuste = 0;
    dom.forEach(function (q, idx) {
      if (risposte[idx] !== undefined) { date++; if (risposte[idx] === q.c) giuste++; }
    });
    $('[data-p]', box).innerHTML = 'Risposte <b>' + giuste + '/' + date + '</b> su ' + dom.length;
    if (date === dom.length) {
      Progresso.segna(mod.id, giuste, dom.length);
      var perc = Math.round(giuste / dom.length * 100);
      var fine = el('div', 'spiega');
      fine.style.marginTop = '18px';
      fine.innerHTML = '<b>' + perc + '% di risposte corrette.</b> ' +
        (perc >= 75 ? 'Modulo superato. La soglia d\'esame è il 75%.' : 'Sotto la soglia d\'esame del 75%. Rileggi le sezioni e riprova.');
      corpo.appendChild(fine);
      var again = el('button', 'btn ghost', 'Rifai la verifica');
      again.style.marginTop = '16px';
      again.addEventListener('click', function () { montaQuiz(contenitore, mod); });
      corpo.appendChild(again);
      aggiornaRail();
    }
  }

  contenitore.innerHTML = '';
  contenitore.appendChild(box);
}

/* ---------------------------------------------------- simulazione esame */

function montaEsame(root, percorso) {
  var conf = percorso === 'a2'
    ? { n: 30, min: 60, soglia: 0.75, nome: 'A2', pool: MODULI.filter(function (m) { return m.percorsi.indexOf('a2') >= 0; }) }
    : { n: 40, min: 60, soglia: 0.75, nome: 'A1/A3', pool: MODULI.filter(function (m) { return m.percorsi.indexOf('a1a3') >= 0; }) };

  var banca = [];
  conf.pool.forEach(function (m) { m.quiz.forEach(function (q) { banca.push(q); }); });
  var dom = mischia(banca).slice(0, Math.min(conf.n, banca.length));
  var risposte = new Array(dom.length);
  var restanti = conf.min * 60;
  var finito = false;

  root.innerHTML = '';
  var testa = el('div', 'sim-testa');
  testa.innerHTML = '<span class="eyebrow">Simulazione ' + conf.nome + '</span>' +
    '<span class="timer" data-timer>' + conf.min + ':00</span>' +
    '<span class="sim-avanz"><i data-av></i></span>' +
    '<span class="punteggio" data-conta>0 / ' + dom.length + '</span>';
  root.appendChild(testa);

  var corpo = el('div', 'prosa');
  root.appendChild(corpo);

  dom.forEach(function (q, idx) {
    var d = el('div', 'domanda');
    d.style.marginBottom = '34px';
    d.innerHTML = '<div class="testo"><span class="n">' + (idx + 1 < 10 ? '0' : '') + (idx + 1) + '</span><span>' + esc(q.d) + '</span></div>';
    var opz = el('div', 'opzioni');
    q.o.forEach(function (testo, i) {
      var b = el('button', 'opz');
      b.type = 'button';
      b.innerHTML = '<span class="lettera">' + 'ABCD'[i] + '</span><span>' + esc(testo) + '</span>';
      b.addEventListener('click', function () {
        if (finito) return;
        risposte[idx] = i;
        $$('.opz', opz).forEach(function (x) { x.classList.remove('scelta'); });
        b.classList.add('scelta');
        aggiorna();
      });
      opz.appendChild(b);
    });
    d.appendChild(opz);
    corpo.appendChild(d);
  });

  var consegna = el('button', 'btn', 'Consegna e correggi');
  corpo.appendChild(consegna);
  consegna.addEventListener('click', function () { chiudi(false); });

  function aggiorna() {
    var n = risposte.filter(function (r) { return r !== undefined; }).length;
    $('[data-conta]', testa).textContent = n + ' / ' + dom.length;
    $('[data-av]', testa).style.width = (n / dom.length * 100) + '%';
  }

  var tic = setInterval(function () {
    restanti--;
    var mm = Math.floor(restanti / 60), ss = restanti % 60;
    var t = $('[data-timer]', testa);
    if (!t) { clearInterval(tic); return; }
    t.textContent = mm + ':' + (ss < 10 ? '0' : '') + ss;
    if (restanti <= 300) t.classList.add('rosso');
    if (restanti <= 0) { clearInterval(tic); chiudi(true); }
  }, 1000);

  function chiudi(scaduto) {
    if (finito) return;
    finito = true;
    clearInterval(tic);
    var giuste = 0;
    dom.forEach(function (q, i) { if (risposte[i] === q.c) giuste++; });
    var perc = giuste / dom.length;
    var passato = perc >= conf.soglia;

    root.innerHTML = '';
    var e = el('div', 'esito');
    e.innerHTML = '<span class="eyebrow">Esito simulazione ' + conf.nome + '</span>' +
      '<div class="voto ' + (passato ? 'ok' : 'ko') + '">' + Math.round(perc * 100) + '%</div>' +
      '<p style="margin-top:14px">' + giuste + ' risposte corrette su ' + dom.length + '. La soglia è il 75%.' +
      (scaduto ? ' Tempo scaduto.' : '') + '</p>' +
      '<p style="color:var(--tenue)">' + (passato ? 'Con questo risultato l\'esame sarebbe superato.' : 'Sotto soglia. Rivedi i moduli in cui hai sbagliato di più.') + '</p>';
    root.appendChild(e);

    var az = el('div');
    az.style.cssText = 'display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:40px';
    var rifai = el('button', 'btn', 'Nuova simulazione');
    rifai.addEventListener('click', function () { montaEsame(root, percorso); });
    az.appendChild(rifai);
    var home = el('a', 'btn ghost', 'Torna al programma');
    home.href = PERCORSI[percorso === 'a2' ? 'a2' : 'a1a3'].pagina;
    az.appendChild(home);
    root.appendChild(az);

    var rev = el('div', 'prosa');
    rev.innerHTML = '<h2>Correzione</h2>';
    dom.forEach(function (q, idx) {
      var d = el('div', 'domanda');
      d.style.marginBottom = '30px';
      d.innerHTML = '<div class="testo"><span class="n">' + (idx + 1 < 10 ? '0' : '') + (idx + 1) + '</span><span>' + esc(q.d) + '</span></div>';
      var opz = el('div', 'opzioni');
      q.o.forEach(function (testo, i) {
        var b = el('button', 'opz');
        b.type = 'button'; b.disabled = true;
        if (i === q.c) b.classList.add('giusta');
        else if (risposte[idx] === i) b.classList.add('sbagliata');
        b.innerHTML = '<span class="lettera">' + 'ABCD'[i] + '</span><span>' + esc(testo) + '</span>';
        opz.appendChild(b);
      });
      d.appendChild(opz);
      d.appendChild(el('div', 'spiega', esc(q.sp)));
      rev.appendChild(d);
    });
    root.appendChild(rev);
    window.scrollTo(0, 0);
  }
}

/* --------------------------------------------------------- media remoti */

function montaMedia(radice) {
  $$('figure[data-src]', radice).forEach(function (f) {
    var file = f.dataset.src;
    var cap = f.dataset.cap || '';
    var video = /\.(mp4|webm)$/i.test(file);

    var seg = el('div', 'media-slot');
    seg.innerHTML = '<div><span class="eyebrow">Media non disponibile</span><code>' + esc(file) + '</code></div>';
    f.innerHTML = '';

    function fallisci(nodo) {
      if (f.querySelector('.media-slot')) return;
      f.insertBefore(seg, f.firstChild);
      if (nodo && nodo.parentNode) f.removeChild(nodo);
    }

    if (!video) {
      var img = new Image();
      img.alt = cap;
      img.loading = 'lazy';
      img.onerror = function () { fallisci(img); };
      img.src = MEDIA_BASE + file;
      f.appendChild(img);
    } else {
      /* Due sorgenti: WebM per i browser senza codec proprietari, MP4 per tutti
         gli altri. Il segnaposto compare solo se il file non c'è davvero, non
         quando manca il codec: quello lo segnala già il browser. */
      var base = file.replace(/\.(mp4|webm)$/i, '');
      var v = document.createElement('video');
      v.controls = true;
      v.playsInline = true;
      v.preload = 'metadata';
      if (cap) v.setAttribute('aria-label', cap);

      ['webm', 'mp4'].forEach(function (est) {
        var so = document.createElement('source');
        so.src = MEDIA_BASE + base + '.' + est;
        so.type = 'video/' + est;
        v.appendChild(so);
      });
      f.appendChild(v);

      fetch(MEDIA_BASE + base + '.mp4', { method: 'HEAD' })
        .then(function (r) { if (!r.ok) fallisci(v); })
        .catch(function () { fallisci(v); });
    }

    if (cap) f.appendChild(el('figcaption', null, esc(cap)));
  });
}

function glifo(k) {
  var g = {
    'sicurezza': '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3z"/></svg>',
    'normativa': '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 3v18M5 7h14M7 7l-3 7h6L7 7zm10 0l-3 7h6l-3-7z"/></svg>',
    'fattore-umano': '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>',
    'procedure': '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 6h16M4 12h16M4 18h10"/><path d="M18 16l2 2 3-3"/></svg>',
    'spazio-aereo': '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3C9 6 9 18 12 21"/></svg>',
    'tecnica': '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="3"/><path d="M6 6h.01M18 6h.01M6 18h.01M18 18h.01M8 8l2 2m6-2l-2 2m-4 6l2-2m4 2l-2-2"/></svg>',
    'meteorologia': '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M7 16a4 4 0 010-8 5.5 5.5 0 0110.5 1.5A3.5 3.5 0 0117 16H7z"/><path d="M9 20l-1 2M13 20l-1 2M17 20l-1 2"/></svg>',
    'privacy': '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>'
  };
  return g[k] || '';
}

/* -------------------------------------------------------- ricerca globale */

var Ricerca = {
  filtro: 'tutto',
  apri: function (q) {
    var ov = $('#ricerca');
    ov.hidden = false;
    var inp = $('#ricerca-input');
    if (q) inp.value = q;
    inp.focus(); inp.select();
    this.aggiorna();
    document.body.style.overflow = 'hidden';
  },
  chiudi: function () {
    $('#ricerca').hidden = true;
    document.body.style.overflow = '';
  },
  aggiorna: function () {
    var q = $('#ricerca-input').value.trim();
    var box = $('#ricerca-risultati');
    box.innerHTML = '';
    if (!q) {
      box.innerHTML = '<div class="cerca-vuoto">Cerca una regola, una sigla o un numero. Prova con <b>CAVOK</b>, <b>150 metri</b>, <b>Kp</b>, <b>okta</b>.</div>';
      return;
    }
    var res = cerca(q, this.filtro);
    if (!res.length) {
      box.innerHTML = '<div class="cerca-vuoto">Nessun risultato per <b>' + esc(q) + '</b>. Prova con un termine più corto o con la sigla.</div>';
      return;
    }
    res.forEach(function (r, i) {
      var a = el('a', 'ris' + (i === 0 ? ' sel' : ''));
      a.href = r.url;
      a.innerHTML = '<span class="via">' + esc(r.via) + '</span><b>' + evidenzia(r.titolo, q, 120) + '</b><p>' + evidenzia(r.testo, q, 190) + '</p>';
      box.appendChild(a);
    });
  },
  muovi: function (dir) {
    var voci = $$('#ricerca-risultati .ris');
    if (!voci.length) return;
    var i = -1;
    voci.forEach(function (v, k) { if (v.classList.contains('sel')) i = k; });
    voci.forEach(function (v) { v.classList.remove('sel'); });
    var n = Math.max(0, Math.min(voci.length - 1, i + dir));
    voci[n].classList.add('sel');
    voci[n].scrollIntoView({ block: 'nearest' });
  },
  scegli: function () {
    var s = $('#ricerca-risultati .ris.sel');
    if (s) window.location.href = s.getAttribute('href');
  }
};

/* --------------------------------------------------------------- menu */

var Menu = {
  apri: function () {
    var m = $('#menu');
    m.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#apri-menu').setAttribute('aria-expanded', 'true');
    $('#apri-menu').classList.add('aperto');
    requestAnimationFrame(function () { m.classList.add('visibile'); });
    var primo = $('.menu-voce', m);
    if (primo) primo.focus();
  },
  chiudi: function () {
    var m = $('#menu');
    m.classList.remove('visibile');
    $('#apri-menu').setAttribute('aria-expanded', 'false');
    $('#apri-menu').classList.remove('aperto');
    document.body.style.overflow = '';
    setTimeout(function () { m.hidden = true; }, 260);
  },
  aperto: function () { return !$('#menu').hidden; }
};

/* ---------------------------------------------------------- vista: home */

function droneSvg() {
  /* Quadricottero visto dall'alto, come lo vedrebbe la carta che sorvola.
     Quattro bracci, quattro rotori controrotanti, una luce di posizione. */
  var rotori = [[-10, -6.6, 'oraria'], [10, -6.6, 'antioraria'], [10, 6.6, 'oraria'], [-10, 6.6, 'antioraria']];
  var g = '';

  g += '<ellipse class="drone-ombra" cx="0" cy="21" rx="10" ry="2.4"/>';
  g += '<g class="drone-oscilla" fill="none" stroke="#E8C173" stroke-linecap="round">';

  g += '<g stroke-width="1.25">';
  rotori.forEach(function (r) { g += '<line x1="0" y1="0" x2="' + r[0] + '" y2="' + r[1] + '"/>'; });
  g += '</g>';

  g += '<rect x="-4.8" y="-3.6" width="9.6" height="7.2" rx="2.6" fill="#0A1622" stroke="#E8C173" stroke-width="1.25"/>';
  g += '<circle class="drone-luce" cx="0" cy="0" r="1.35" fill="#E8C173" stroke="none"/>';

  rotori.forEach(function (r) {
    g += '<g transform="translate(' + r[0] + ',' + r[1] + ')">';
    g += '<circle r="6" stroke="#E8C173" stroke-width=".8" opacity=".3"/>';
    g += '<g class="pala ' + r[2] + '">';
    g += '<ellipse rx="5.6" ry="1" fill="#E8C173" stroke="none" opacity=".5"/>';
    g += '<ellipse rx="1" ry="5.6" fill="#E8C173" stroke="none" opacity=".5"/>';
    g += '</g></g>';
  });

  g += '</g>';
  return g;
}

function heroAnimazione() {
  /* Le quattro soglie di quota delle zone geografiche italiane, la rotta e il
     drone che la percorre. Una maschera radiale fa ritirare il disegno al
     centro, dove sta il testo. */
  var q = [120, 60, 45, 25];
  var y = { 120: 96, 60: 250, 45: 292, 25: 334 };
  var col = { 120: 'var(--z-bianca)', 60: 'var(--z-celeste)', 45: 'var(--z-gialla)', 25: 'var(--z-arancione)' };

  var h = '<svg class="hero-anima" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">';
  h += '<defs>';
  h += '<path id="rotta" d="M-70 336 C 180 316, 330 226, 560 236 S 900 156, 1270 96" fill="none"/>';
  h += '<linearGradient id="sfuma" x1="0" x2="1">';
  h += '<stop offset="0" stop-color="#D9A94F" stop-opacity="0"/>';
  h += '<stop offset=".3" stop-color="#D9A94F" stop-opacity=".5"/>';
  h += '<stop offset="1" stop-color="#D9A94F" stop-opacity=".12"/></linearGradient>';
  h += '<radialGradient id="varco" cx=".5" cy=".46" r=".62">';
  h += '<stop offset="0" stop-color="#000"/><stop offset=".52" stop-color="#000"/>';
  h += '<stop offset=".86" stop-color="#fff"/><stop offset="1" stop-color="#fff"/></radialGradient>';
  h += '<mask id="mvarco"><rect x="-100" y="-100" width="1400" height="620" fill="url(#varco)"/></mask>';
  h += '</defs>';

  h += '<g mask="url(#mvarco)">';
  h += '<g class="anima-livelli">';
  q.forEach(function (v, i) {
    h += '<line class="lvl" style="--i:' + i + '" x1="0" y1="' + y[v] + '" x2="1200" y2="' + y[v] + '" stroke="' + col[v] + '"/>';
  });
  h += '</g>';
  h += '<use class="anima-rotta" href="#rotta" stroke="url(#sfuma)" fill="none"/>';
  h += '</g>';

  h += '<g class="anima-drone">' + droneSvg();
  h += '<animateMotion dur="38s" repeatCount="indefinite" rotate="auto" calcMode="linear">';
  h += '<mpath href="#rotta"/></animateMotion></g>';

  h += '</svg>';
  return h;
}

function vistaHome() {
  var h = '<header class="hero hero-home">';
  h += '<div class="hero-sfondo" aria-hidden="true"></div>';
  h += heroAnimazione();
  h += '<div class="hero-inner">';
  h += '<h1>Prima di salire,<br><em>si studia a terra.</em></h1>';
  h += '<p class="hero-occhiello">Il programma teorico per gli attestati europei A1/A3 e A2, in italiano e allineato alla normativa applicabile in Italia.</p>';

  h += '<form class="hero-cerca" id="hero-cerca" role="search" autocomplete="off">';
  h += '<label class="solo-lettori" for="hero-q">Cerca nel portale</label>';
  h += '<span class="hero-cerca-ico">' + SH.ICONE.cerca + '</span>';
  h += '<input id="hero-q" type="search" placeholder="Cerca una regola, una sigla, un numero" spellcheck="false">';
  h += '<button type="button" class="hero-cerca-x" id="hero-x" aria-label="Svuota il campo">' + SH.ICONE.chiudi + '</button>';
  h += '<div class="hero-ris" id="hero-ris" hidden></div>';
  h += '</form>';

  h += '<div class="hero-chip">';
  ['CAVOK', '150 metri', 'regola 1:1', 'indice Kp', 'fly away'].forEach(function (c) {
    h += '<button type="button" data-chip="' + esc(c) + '">' + esc(c) + '</button>';
  });
  h += '</div>';

  h += '</div></header>';

  h += '<div class="wrap">';

  h += '<section class="blocco" id="percorsi"><div class="blocco-testa"><h2>Due <em>attestati</em></h2><span class="riga"></span><p>Il primo si prende online e vale per tutti. Il secondo si aggiunge quando serve avvicinarsi alle persone.</p></div>';
  var tappe = {
    a1a3: [
      'Registrati come operatore UAS su D-Flight e applica il QR code sul drone. Serve da 250 grammi in su, oppure a qualsiasi peso se il drone ha telecamera o sensori.',
      'Accedi al portale ENAC dedicato ai piloti UAS con SPID e paga il diritto fisso.',
      'Studia il programma, che trovi qui nei moduli da I a IX.',
      'Sostieni l\'esame online: 40 domande in 60 minuti, soglia 75%.',
      'Scarica l\'attestato dalla tua area riservata. Vale 5 anni in tutta l\'Unione europea.'
    ],
    a2: [
      'Devi già avere l\'attestato A1/A3.',
      'Completa e dichiara l\'addestramento pratico in autoistruzione, svolto nelle condizioni della sottocategoria A3.',
      'Studia i moduli da X a XII, oltre al ripasso di tutto il programma A1/A3.',
      'Prenota l\'esame presso un\'entità riconosciuta ENAC: 30 domande in 60 minuti, 2 punti per risposta corretta, soglia 45 punti su 60.'
    ]
  };

  h += '<div class="percorsi">';
  ['a1a3', 'a2'].forEach(function (k) {
    var p = PERCORSI[k];
    var mods = MODULI.filter(function (m) { return m.percorsi.indexOf(k) >= 0; });
    var domande = mods.reduce(function (n, m) { return n + m.quiz.length; }, 0);
    h += '<div class="percorso">';
    h += '<div class="sigla">' + p.sigla.replace('/', '<span>/</span>') + '</div>';
    h += '<h3>' + esc(p.nome) + '</h3><p>' + esc(p.desc) + '</p>';
    h += '<ul>' + p.dati.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>';
    h += '<ol class="passo-lista">';
    tappe[k].forEach(function (t) { h += '<li>' + t + '</li>'; });
    h += '</ol>';
    h += '<a class="btn-percorso" href="' + p.pagina + '">';
    h += '<span class="bp-testi"><b>Vai al programma ' + esc(p.sigla) + '</b>';
    h += '<small>' + mods.length + ' moduli · ' + domande + ' domande di verifica</small></span>';
    h += '<span class="bp-freccia" aria-hidden="true">' + SH.ICONE.freccia + '</span></a>';
    h += '</div>';
  });
  h += '</div></section>';

  h += '<section class="blocco" id="aree"><div class="blocco-testa"><h2>Otto <em>aree tematiche</em></h2><span class="riga"></span><p>Se preferisci studiare per argomento invece che per attestato, entra da qui.</p></div>';
  h += '<div class="aree">';
  Object.keys(AREE).forEach(function (k) {
    var a = AREE[k];
    var n = MODULI.filter(function (m) { return m.area === k; }).length;
    h += '<a class="area" href="area.html?a=' + k + '"><div class="glifo">' + glifo(k) + '</div><h3>' + esc(a.nome) + '</h3><p>' + esc(a.desc) + '</p><span class="conta">' + n + (n === 1 ? ' modulo' : ' moduli') + '</span></a>';
  });
  h += '</div></section>';

  h += '<section class="blocco" id="strumenti"><div class="blocco-testa"><h2>Strumenti</h2><span class="riga"></span></div><div class="strumenti">';
  h += '<a class="strumento" href="metar.html"><span class="tag">Decodificatore</span><h3>METAR</h3><p>Incolla un\'osservazione reale e leggila gruppo per gruppo, con la sintesi operativa per il volo con drone.</p></a>';
  h += '<a class="strumento" href="glossario.html"><span class="tag">Riferimento</span><h3>Glossario</h3><p>Oltre cento sigle aeronautiche e termini UAS, con la definizione essenziale.</p></a>';
  h += '<a class="strumento" href="esame.html?p=a1a3"><span class="tag">Simulazione</span><h3>Esame A1/A3</h3><p>Quaranta domande estratte a caso, un\'ora di tempo, correzione commentata.</p></a>';
  h += '<a class="strumento" href="esame.html?p=a2"><span class="tag">Simulazione</span><h3>Esame A2</h3><p>Trenta domande sui moduli della sottocategoria A2, con la stessa soglia dell\'esame reale.</p></a>';
  h += '</div></section>';

  h += '</div>';   /* la fascia della checklist esce dal contenitore: va a tutta larghezza */
  h += '<section class="preflight" id="preflight"><div class="wrap">';
  h += '<div class="pf-testa">';
  h += '<span class="eyebrow">Checklist</span>';
  h += '<h2>Prima di <em>ogni volo</em></h2>';
  h += '<p>Sei voci, due minuti. Sono anche le prime che un controllo sul campo verifica.</p>';
  h += '<span class="pf-conta" data-pf-conta><b>0</b> / 6</span>';
  h += '</div>';

  var controlli = [
    ['pfAttestato', 'Attestato valido', 'A1/A3 oppure A2, entro i cinque anni di validità'],
    ['pfQr', 'Registrazione operatore', 'QR code applicato sul drone e numero caricato nel software'],
    ['pfScudo', 'Copertura assicurativa', 'Responsabilità civile verso terzi in corso'],
    ['pfZone', 'Zone geografiche', 'Verificate oggi su D-Flight, non la settimana scorsa'],
    ['pfMeteo', 'Condizioni meteo', 'Vento, visibilità, spread fra temperatura e rugiada, indice Kp'],
    ['pfBatteria', 'Batterie', 'Drone e radiocomando carichi, celle integre, nessun rigonfiamento']
  ];
  h += '<div class="pf-griglia">';
  controlli.forEach(function (v, i) {
    h += '<button type="button" class="pf-voce" aria-pressed="false">';
    h += '<span class="pf-ico">' + SH.ICONE[v[0]] + '</span>';
    h += '<span class="pf-testi"><b>' + esc(v[1]) + '</b><small>' + esc(v[2]) + '</small></span>';
    h += '<span class="pf-num">' + (i + 1 < 10 ? '0' : '') + (i + 1) + '</span>';
    h += '</button>';
  });
  h += '</div></div></section>';

  return h;
}

/* ---------------------------------------------------- vista: percorso */

function vistaPercorso(k) {
  var p = PERCORSI[k];
  if (!p) return vistaHome();
  var mods = MODULI.filter(function (m) { return m.percorsi.indexOf(k) >= 0; });
  var min = mods.reduce(function (s, m) { return s + m.durata; }, 0);

  var h = '<header class="hero hero-corto"><div class="hero-sfondo" aria-hidden="true"></div><div class="hero-inner">';
  h += '<div class="strip-coord"><a href="index.html">Drone School</a><span>Percorso <b>' + esc(p.sigla) + '</b></span><span>' + mods.length + ' moduli</span><span>circa <b>' + Math.round(min / 60 * 10) / 10 + ' ore</b> di studio</span></div>';
  h += '<h1>' + esc(p.nome) + '</h1><p class="occhiello">' + esc(p.desc) + ' ' + esc(p.prereq) + '</p>';
  h += '<div class="hero-azioni"><a class="btn" href="modulo.html?m=' + mods[0].id + '">Apri il primo modulo</a><a class="btn ghost" href="esame.html?p=' + k + '">Simulazione d\'esame</a></div>';
  h += '</div></header><div class="wrap"><section class="blocco">';
  h += '<div class="blocco-testa"><h2>Programma</h2><span class="riga"></span></div><div class="aree">';
  mods.forEach(function (m) {
    var f = Progresso.fatto(m.id);
    h += '<a class="area" href="modulo.html?m=' + m.id + '"><div class="glifo"><span class="romano">MODULO ' + m.num + '</span></div>';
    h += '<h3>' + esc(m.titolo) + '</h3><p>' + esc(m.sommario) + '</p>';
    h += '<span class="conta">' + m.durata + ' min · ' + m.quiz.length + ' domande' + (f ? ' · superato' : '') + '</span></a>';
  });
  h += '</div></section></div>';
  return h;
}

/* -------------------------------------------------------- vista: area */

function vistaArea(k) {
  var a = AREE[k];
  if (!a) return vistaHome();
  var mods = MODULI.filter(function (m) { return m.area === k; });
  var h = '<header class="hero hero-corto"><div class="hero-sfondo" aria-hidden="true"></div><div class="hero-inner">';
  h += '<div class="strip-coord"><a href="index.html">Drone School</a><span>Area tematica</span><span>' + mods.length + (mods.length === 1 ? ' modulo' : ' moduli') + '</span></div>';
  h += '<h1>' + esc(a.nome) + '</h1><p class="occhiello">' + esc(a.desc) + '</p></div></header>';
  h += '<div class="wrap"><section class="blocco"><div class="blocco-testa"><h2>Moduli</h2><span class="riga"></span></div><div class="aree">';
  mods.forEach(function (m) {
    h += '<a class="area" href="modulo.html?m=' + m.id + '"><div class="glifo"><span class="romano">MODULO ' + m.num + '</span></div><h3>' + esc(m.titolo) + '</h3><p>' + esc(m.sommario) + '</p>';
    h += '<span class="conta">' + m.percorsi.map(function (x) { return PERCORSI[x].sigla; }).join(' · ') + ' · ' + m.durata + ' min</span></a>';
  });
  h += '</div></section>';
  h += '<section class="blocco" style="border-bottom:none"><div class="blocco-testa"><h2>Altre <em>aree</em></h2><span class="riga"></span></div><div class="aree">';
  Object.keys(AREE).filter(function (x) { return x !== k; }).forEach(function (x) {
    h += '<a class="area" href="area.html?a=' + x + '"><div class="glifo">' + glifo(x) + '</div><h3>' + esc(AREE[x].nome) + '</h3></a>';
  });
  h += '</div></section></div>';
  return h;
}

/* ------------------------------------------------------ vista: modulo */

function vistaModulo(id) {
  var m = modulo(id);
  if (!m) return vistaHome();
  var i = MODULI.indexOf(m);
  var prec = MODULI[i - 1], succ = MODULI[i + 1];

  var h = '<div class="quota-lezione"><i data-avanzamento></i></div>';
  h += '<div class="lezione-layout"><aside class="rail" id="rail">' + railHtml(m) + '</aside><div class="lezione">';
  h += '<div class="lezione-testa"><div class="lezione-meta"><span class="pill ott">Modulo ' + m.num + '</span>';
  m.percorsi.forEach(function (p) { h += '<span class="pill">' + esc(PERCORSI[p].sigla) + '</span>'; });
  h += '<span class="pill">' + esc(AREE[m.area].nome) + '</span><span class="pill">' + m.durata + ' min</span></div>';
  h += '<h1 style="font-size:clamp(2rem,4.4vw,3rem)">' + esc(m.titolo) + '</h1>';
  h += '<p class="somm">' + esc(m.sommario) + '</p></div>';

  h += '<div class="prosa">';
  m.sezioni.forEach(function (s) { h += '<h2 id="s-' + s.id + '">' + esc(s.titolo) + '</h2>' + s.html; });
  if (m.ricorda && m.ricorda.length) {
    h += '<h2 id="s-ricorda">Punti da ricordare</h2><div class="nota"><span class="eyebrow">Sintesi del modulo</span><ul style="margin-bottom:0">';
    m.ricorda.forEach(function (r) { h += '<li>' + esc(r) + '</li>'; });
    h += '</ul></div>';
  }
  h += '</div><div id="quiz-slot"></div>';

  h += '<nav class="lezione-piede">';
  if (prec) h += '<a class="nav-lez" href="modulo.html?m=' + prec.id + '"><span class="eyebrow">Modulo precedente</span><b>' + esc(prec.titolo) + '</b></a>';
  if (succ) h += '<a class="nav-lez avanti" href="modulo.html?m=' + succ.id + '"><span class="eyebrow">Modulo successivo</span><b>' + esc(succ.titolo) + '</b></a>';
  h += '</nav></div></div>';
  return h;
}

function railHtml(attivo) {
  var h = '<button class="rail-toggle" type="button" aria-expanded="false">';
  h += '<span>Indice dei moduli</span>';
  h += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9.5l6 6 6-6"/></svg>';
  h += '</button><div class="rail-corpo">';
  var giaEspanso = false;
  ['a1a3', 'a2'].forEach(function (k) {
    var mods = MODULI.filter(function (m) { return m.percorsi.indexOf(k) >= 0; });
    h += '<div class="rail-gruppo"><span class="eyebrow">' + esc(PERCORSI[k].nome) + '</span>';
    mods.forEach(function (m) {
      var att = attivo && m.id === attivo.id;
      h += '<a href="modulo.html?m=' + m.id + '" class="' + (att ? 'attivo' : '') + '"><span class="num">' + m.num + '</span><span>' + esc(m.titolo) + '</span>' + (Progresso.fatto(m.id) ? '<span class="fatto">&#10003;</span>' : '') + '</a>';
      if (att && !giaEspanso) {
        giaEspanso = true;
        h += '<div class="rail-sez">';
        m.sezioni.forEach(function (s) { h += '<a href="#s-' + s.id + '">' + esc(s.titolo) + '</a>'; });
        h += '<a href="#quiz" style="color:var(--ottone)">Verifica</a></div>';
      }
    });
    h += '</div>';
  });
  h += '<div class="rail-gruppo"><span class="eyebrow">Strumenti</span>';
  h += '<a href="metar.html"><span class="num">·</span><span>Decodificatore METAR</span></a>';
  h += '<a href="glossario.html"><span class="num">·</span><span>Glossario</span></a>';
  h += '<a href="esame.html?p=a1a3"><span class="num">·</span><span>Simulazione A1/A3</span></a>';
  h += '<a href="esame.html?p=a2"><span class="num">·</span><span>Simulazione A2</span></a></div>';
  h += '</div>';
  return h;
}

function aggiornaRail() {
  var r = $('#rail');
  if (!r) return;
  var id = param('m');
  var eraAperto = r.classList.contains('aperto');
  r.innerHTML = railHtml(id ? modulo(id) : null);
  if (eraAperto) r.classList.add('aperto');
  agganciaRail();
}

function agganciaRail() {
  var r = $('#rail');
  if (!r) return;
  var b = $('.rail-toggle', r);
  if (!b) return;
  b.setAttribute('aria-expanded', r.classList.contains('aperto') ? 'true' : 'false');
  b.addEventListener('click', function () {
    var ap = r.classList.toggle('aperto');
    b.setAttribute('aria-expanded', ap ? 'true' : 'false');
  });
}

/* --------------------------------------------------- vista: glossario */

function vistaGlossario() {
  var h = '<header class="hero hero-corto"><div class="hero-sfondo" aria-hidden="true"></div><div class="hero-inner">';
  h += '<div class="strip-coord"><a href="index.html">Drone School</a><span>Riferimento</span><span>' + GLOSSARIO.length + ' voci</span></div>';
  h += '<h1>Glossario</h1><p class="occhiello">Le sigle che incontri nei manuali, nelle carte aeronautiche e nei messaggi meteorologici.</p></div></header>';
  h += '<div class="wrap-stretto" style="padding-top:44px;padding-bottom:70px">';
  h += '<div class="glo-filtro"><input id="glo-q" type="search" placeholder="Filtra per sigla o parola" autocomplete="off"></div>';
  h += '<dl class="glo-lista" id="glo-lista"></dl></div>';
  return h;
}

function rendiGlossario(q) {
  var lista = $('#glo-lista');
  if (!lista) return;
  var nq = norm(q || '');
  lista.innerHTML = '';
  var voci = GLOSSARIO.filter(function (g) { return !nq || norm(g.t + ' ' + g.e + ' ' + g.d).indexOf(nq) >= 0; });
  if (!voci.length) { lista.innerHTML = '<div class="cerca-vuoto">Nessuna voce corrisponde.</div>'; return; }
  voci.forEach(function (g) {
    var d = el('div', 'glo-voce');
    d.id = 'g-' + norm(g.t).replace(/[^a-z0-9]/g, '');
    d.innerHTML = '<dt>' + esc(g.t) + (g.e ? '<small>' + esc(g.e) + '</small>' : '') + '</dt><dd>' + esc(g.d) + '</dd>';
    lista.appendChild(d);
  });
}

/* ------------------------------------------------------- vista: METAR */

function vistaMetar() {
  var h = '<header class="hero hero-corto"><div class="hero-sfondo" aria-hidden="true"></div><div class="hero-inner">';
  h += '<div class="strip-coord"><a href="index.html">Drone School</a><span>Strumento</span><span>METeorological Aerodrome Report</span></div>';
  h += '<h1>Decodificatore <em>METAR</em></h1><p class="occhiello">Incolla un\'osservazione reale e leggila gruppo per gruppo. In cima trovi la sintesi orientata al volo con drone.</p></div></header>';
  h += '<div class="wrap-stretto" style="padding-top:40px;padding-bottom:70px"><div id="metar-tool"></div>';
  h += '<div class="prosa" style="margin-top:44px"><h2>Promemoria rapido</h2>';
  h += '<div class="tab-wrap"><table><thead><tr><th>Gruppo</th><th>Forma</th><th>Lettura</th></tr></thead><tbody>';
  h += '<tr><td>Stazione</td><td class="mono">LIMC</td><td>Codice ICAO. Gli aeroporti italiani iniziano per LI</td></tr>';
  h += '<tr><td>Data e ora</td><td class="mono">170850Z</td><td>Giorno 17, ore 08:50 UTC. In Italia più una o più due ore</td></tr>';
  h += '<tr><td>Vento</td><td class="mono">27012G22KT</td><td>Da 270 gradi, 12 nodi, raffiche a 22</td></tr>';
  h += '<tr><td>Variabilità</td><td class="mono">230V300</td><td>Direzione oscillante fra 230 e 300 gradi</td></tr>';
  h += '<tr><td>Visibilità</td><td class="mono">9999</td><td>10 km o più. 0500 significa 500 metri</td></tr>';
  h += '<tr><td>Nubi</td><td class="mono">BKN040</td><td>5-7 ottavi con base a 4000 piedi</td></tr>';
  h += '<tr><td>Temperatura</td><td class="mono">18/13</td><td>18 gradi, rugiada 13, spread 5</td></tr>';
  h += '<tr><td>Pressione</td><td class="mono">Q1018</td><td>QNH 1018 hPa</td></tr>';
  h += '<tr><td>Tendenza</td><td class="mono">NOSIG</td><td>Nessun cambiamento significativo</td></tr>';
  h += '</tbody></table></div>';
  h += '<p>La trattazione completa, con tutti i codici di tempo presente e la lettura del TAF, è nel modulo <a href="modulo.html?m=meteorologia">Meteorologia</a>.</p></div></div>';
  return h;
}

/* ------------------------------------------------------- vista: esame */

function vistaEsame(k) {
  var p = PERCORSI[k] || PERCORSI.a1a3;
  var n = k === 'a2' ? 30 : 40;
  var h = '<header class="hero hero-corto"><div class="hero-sfondo" aria-hidden="true"></div><div class="hero-inner">';
  h += '<div class="strip-coord"><a href="index.html">Drone School</a><span>Simulazione</span><span>' + n + ' domande</span><span>60 minuti</span><span>soglia <b>75%</b></span></div>';
  h += '<h1>Simulazione ' + esc(p.sigla) + '</h1><p class="occhiello">Domande estratte a caso dalla banca del percorso. Al termine trovi la correzione commentata di ogni risposta.</p></div></header>';
  h += '<div class="wrap-stretto" style="padding-top:34px;padding-bottom:70px"><div id="esame-root"></div></div>';
  return h;
}

/* ---------------------------------------------------- vista: contatti */

function vistaContatti() {
  var h = '<header class="hero hero-corto"><div class="hero-sfondo" aria-hidden="true"></div><div class="hero-inner">';
  h += '<div class="strip-coord"><a href="index.html">Drone School</a><span>Contatti</span></div>';
  h += '<h1>Scrivimi <em>due righe</em></h1><p class="occhiello">Una correzione, una domanda sul programma, una segnalazione su un dato che non torna.</p></div></header>';

  h += '<div class="wrap-stretto" style="padding-top:46px;padding-bottom:80px"><div class="contatti-griglia">';

  h += '<form class="modulo-contatti" id="form-contatti" novalidate>';
  h += '<div class="campo-riga">';
  h += '<div class="campo"><label for="c-nome">Nome</label><input id="c-nome" name="nome" type="text" autocomplete="given-name"></div>';
  h += '<div class="campo"><label for="c-cognome">Cognome</label><input id="c-cognome" name="cognome" type="text" autocomplete="family-name"></div>';
  h += '</div>';
  h += '<div class="campo"><label for="c-email">Email</label><input id="c-email" name="email" type="email" autocomplete="email"></div>';
  h += '<div class="campo"><label for="c-messaggio">Messaggio</label><textarea id="c-messaggio" name="messaggio" rows="7"></textarea></div>';
  h += '<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" class="esca">';
  h += '<p class="campo-nota">I dati che inserisci servono solo a risponderti. Nessun altro uso, nessuna newsletter. Dettagli nella <a href="privacy.html">privacy policy</a>.</p>';
  h += '<div class="campo-azioni"><button type="submit" class="btn" data-invia>Invia il messaggio</button><span class="campo-esito" data-esito role="status"></span></div>';
  h += '</form>';

  h += '<aside class="contatti-lato">';
  h += '<div class="nota"><span class="eyebrow">Prima di scrivere</span><p>Se la domanda riguarda una regola, prova la ricerca: tutto il programma è indicizzato, comprese le nozioni chiave e il glossario.</p></div>';
  h += '<div class="nota italia"><span class="eyebrow">Cosa non posso fare</span><p>Non rilascio attestati e non sostituisco ENAC. Per le pratiche ufficiali, la registrazione e le zone geografiche il riferimento resta D-Flight.</p></div>';
  h += '<div class="contatti-link">';
  h += '<a href="https://www.gioriva.it/drone/" target="_blank" rel="noopener">' + ico('aboveground') + '<span>Above Ground</span></a>';
  h += '<a href="https://www.gioriva.it" target="_blank" rel="noopener">' + ico('torii') + '<span>Gio Riva</span></a>';
  h += '</div></aside>';

  h += '</div></div>';
  return h;
}

function montaContatti() {
  var f = $('#form-contatti');
  if (!f) return;
  var esito = $('[data-esito]', f);
  var bottone = $('[data-invia]', f);

  f.addEventListener('submit', function (e) {
    e.preventDefault();
    esito.className = 'campo-esito';
    esito.textContent = '';

    var mancanti = [];
    ['c-nome', 'c-cognome', 'c-email', 'c-messaggio'].forEach(function (id) {
      var c = document.getElementById(id);
      c.parentNode.classList.remove('errore');
      if (!c.value.trim()) { mancanti.push(c); c.parentNode.classList.add('errore'); }
    });
    var email = $('#c-email');
    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
      if (mancanti.indexOf(email) < 0) mancanti.push(email);
      email.parentNode.classList.add('errore');
    }
    if (mancanti.length) {
      esito.className = 'campo-esito ko';
      esito.textContent = 'Controlla i campi evidenziati.';
      mancanti[0].focus();
      return;
    }

    var dati = new FormData(f);
    dati.append('_subject', 'Drone School · messaggio da ' + $('#c-nome').value.trim() + ' ' + $('#c-cognome').value.trim());
    bottone.disabled = true;
    bottone.textContent = 'Invio in corso';

    fetch(FORMSPREE, { method: 'POST', body: dati, headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('ko'); return r.json(); })
      .then(function () {
        f.innerHTML = '<div class="contatti-fatto">' + ico('contatti') +
          '<h3>Messaggio inviato</h3><p>Grazie. Ti rispondo all\'indirizzo che hai indicato appena possibile.</p></div>';
      })
      .catch(function () {
        bottone.disabled = false;
        bottone.textContent = 'Invia il messaggio';
        esito.className = 'campo-esito ko';
        esito.textContent = 'Invio non riuscito. Riprova fra poco.';
      });
  });
}

/* ----------------------------------------------------- vista: privacy */

function vistaPrivacy() {
  var h = '<header class="hero hero-corto"><div class="hero-sfondo" aria-hidden="true"></div><div class="hero-inner">';
  h += '<div class="strip-coord"><a href="index.html">Drone School</a><span>Informativa</span><span>Reg. UE <b>2016/679</b></span></div>';
  h += '<h1>Privacy <em>&amp; Cookie</em></h1><p class="occhiello">Cosa raccoglie questo sito, perché, per quanto tempo e come fermarlo. Una pagina sola, senza rimandi.</p></div></header>';

  h += '<div class="wrap-stretto" style="padding-top:46px;padding-bottom:80px"><div class="prosa">';

  h += '<nav class="pp-indice" aria-label="Indice della pagina">';
  [['titolare', 'Chi tratta i dati'], ['dati', 'Quali dati'], ['basi', 'Base giuridica'],
   ['destinatari', 'Destinatari'], ['diritti', 'I tuoi diritti'], ['cookie', 'Cookie']].forEach(function (v) {
    h += '<a href="#' + v[0] + '">' + esc(v[1]) + '</a>';
  });
  h += '</nav>';

  h += '<h2 id="titolare">Chi tratta i dati</h2>';
  h += '<p>Il titolare del trattamento è Giorgio Riva, che gestisce questo sito a titolo personale. Per qualsiasi richiesta puoi usare il <a href="contatti.html">modulo di contatto</a>.</p>';

  h += '<h2 id="dati">Quali dati vengono raccolti</h2>';
  h += '<div class="tab-wrap"><table><thead><tr><th>Dato</th><th>Quando</th><th>Perché</th><th>Conservazione</th></tr></thead><tbody>';
  h += '<tr><td>Nome, cognome, email, messaggio</td><td>Solo se compili il modulo di contatto</td><td>Rispondere alla tua richiesta</td><td>Il tempo necessario alla risposta e alle eventuali comunicazioni successive</td></tr>';
  h += '<tr><td>Dati di navigazione aggregati: pagine viste, provenienza, tipo di dispositivo</td><td>Solo dopo il tuo consenso ai cookie analitici</td><td>Capire quali contenuti vengono letti</td><td>Secondo le impostazioni di Google Analytics</td></tr>';
  h += '<tr><td>Avanzamento nei moduli, preferenza di lettura, scelta sui cookie</td><td>Mentre usi il portale</td><td>Ricordare dove eri arrivato</td><td>Restano nel tuo browser, non vengono trasmessi</td></tr>';
  h += '</tbody></table></div>';

  h += '<div class="nota"><span class="eyebrow">Un punto che vale la pena chiarire</span><p>I risultati delle verifiche e la quota raggiunta non lasciano mai il tuo dispositivo. Sono salvati nella memoria locale del browser: nessun account, nessun server, nessuna trasmissione. Se cancelli i dati del sito, spariscono.</p></div>';

  h += '<h2 id="basi">Su quale base giuridica</h2>';
  h += '<ul><li><b>Modulo di contatto</b>: esecuzione di misure precontrattuali o legittimo interesse a rispondere a chi scrive.</li>';
  h += '<li><b>Cookie analitici</b>: consenso, revocabile in ogni momento.</li>';
  h += '<li><b>Memoria locale funzionale</b>: non è profilazione e serve al funzionamento richiesto da chi naviga.</li></ul>';

  h += '<h2 id="destinatari">A chi vengono comunicati</h2>';
  h += '<p>I messaggi inviati dal modulo di contatto passano attraverso <b>Formspree</b>, che agisce come responsabile del trattamento e recapita il contenuto per posta elettronica. Le statistiche di navigazione sono elaborate da <b>Google Analytics</b>. Nessun dato viene ceduto ad altri e non c\'è alcuna profilazione pubblicitaria.</p>';
  h += '<p>Entrambi i servizi possono comportare un trasferimento di dati fuori dallo Spazio economico europeo, effettuato sulla base delle garanzie previste dal capo V del regolamento.</p>';

  h += '<h2 id="diritti">I tuoi diritti</h2>';
  h += '<p>Puoi chiedere in ogni momento accesso, rettifica, cancellazione, limitazione e portabilità dei dati, e opporti al trattamento. Puoi anche proporre reclamo al Garante per la protezione dei dati personali. Per esercitare i diritti basta il <a href="contatti.html">modulo di contatto</a>.</p>';

  h += '<h2 id="cookie">Cookie</h2>';
  h += '<p>Questo sito non usa cookie di profilazione né cookie pubblicitari. Usa due sole categorie.</p>';
  h += '<div class="tab-wrap"><table><thead><tr><th>Categoria</th><th>Cosa fa</th><th>Serve il consenso</th></tr></thead><tbody>';
  h += '<tr><td><b>Tecnici e funzionali</b><br><span class="mono">gs:progresso</span> <span class="mono">gs:tema</span> <span class="mono">gs:consenso</span></td><td>Ricordano i moduli superati, la preferenza di lettura e la scelta fatta su questa pagina. Sono voci di memoria locale, non cookie trasmessi a un server.</td><td>No</td></tr>';
  h += '<tr><td><b>Analitici di terza parte</b><br>Google Analytics</td><td>Misurano in forma aggregata quante persone visitano il sito e quali pagine leggono, con indirizzo IP anonimizzato.</td><td>Sì</td></tr>';
  h += '</tbody></table></div>';

  h += '<div class="consenso-stato" id="consenso-stato"></div>';

  h += '<h2 id="aggiornamenti">Aggiornamenti</h2>';
  h += '<p>Questa informativa può cambiare se cambiano gli strumenti usati dal sito. La versione pubblicata qui è sempre quella in vigore.</p>';

  h += '</div></div>';
  return h;
}

function montaPrivacy() {
  var box = $('#consenso-stato');
  if (!box || !window.GS_CONSENSO) return;

  function rendi() {
    var st = window.GS_CONSENSO.stato();
    var testo = st === 'accetta' ? 'Hai acconsentito ai cookie analitici.'
      : st === 'rifiuta' ? 'Hai rifiutato i cookie analitici. Nessuno script di statistica viene caricato.'
      : 'Non hai ancora espresso una scelta sui cookie analitici.';
    box.innerHTML = '<div class="nota"><span class="eyebrow">La tua scelta</span><p>' + esc(testo) + '</p>' +
      '<button class="btn ghost" type="button" data-revoca>Rivedi la scelta</button></div>';
    $('[data-revoca]', box).addEventListener('click', function () {
      window.GS_CONSENSO.revoca();
      setTimeout(rendi, 80);
    });
  }
  rendi();
}

/* ------------------------------------------------- avanzamento lettura */

function avanzamentoLettura() {
  var b = $('[data-avanzamento]');
  if (!b) return;
  var doc = document.documentElement;
  var max = doc.scrollHeight - doc.clientHeight;
  var p = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
  b.style.width = (p * 100) + '%';
}

/* ----------------------------------------------- checklist prima del volo */

function montaPreflight() {
  var griglia = $('.pf-griglia');
  if (!griglia) return;
  var conta = $('[data-pf-conta]');
  var voci = $$('.pf-voce', griglia);

  function aggiorna() {
    var n = voci.filter(function (v) { return v.classList.contains('fatta'); }).length;
    conta.innerHTML = '<b>' + n + '</b> / ' + voci.length;
    conta.classList.toggle('completa', n === voci.length);
  }

  voci.forEach(function (v) {
    v.addEventListener('click', function () {
      var attiva = v.classList.toggle('fatta');
      v.setAttribute('aria-pressed', attiva ? 'true' : 'false');
      aggiorna();
    });
  });
}

/* -------------------------------------------------------- ricerca hero */

function montaHeroCerca() {
  var inp = $('#hero-q');
  if (!inp) return;
  var box = $('#hero-ris');
  var form = $('#hero-cerca');
  var x = $('#hero-x');

  function rendi() {
    var q = inp.value.trim();
    form.classList.toggle('pieno', !!q);
    if (!q) { box.hidden = true; box.innerHTML = ''; return; }
    var res = cerca(q, 'tutto', 7);
    box.hidden = false;
    if (!res.length) {
      box.innerHTML = '<div class="cerca-vuoto">Nessun risultato per <b>' + esc(q) + '</b>.</div>';
      return;
    }
    box.innerHTML = '';
    res.forEach(function (r, i) {
      var a = el('a', 'ris' + (i === 0 ? ' sel' : ''));
      a.href = r.url;
      a.innerHTML = '<span class="via">' + esc(r.via) + '</span><b>' + evidenzia(r.titolo, q, 110) + '</b><p>' + evidenzia(r.testo, q, 150) + '</p>';
      box.appendChild(a);
    });
    var tutti = el('a', 'ris ris-tutti', '<span>Apri la ricerca completa</span>');
    tutti.href = '#';
    tutti.addEventListener('click', function (e) { e.preventDefault(); Ricerca.apri(inp.value); });
    box.appendChild(tutti);
  }

  inp.addEventListener('input', rendi);
  inp.addEventListener('focus', rendi);
  x.addEventListener('click', function () { inp.value = ''; rendi(); inp.focus(); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var s = $('.ris.sel', box);
    if (s && s.getAttribute('href') !== '#') window.location.href = s.getAttribute('href');
    else if (inp.value.trim()) Ricerca.apri(inp.value);
  });
  inp.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    var voci = $$('.ris', box);
    if (!voci.length) return;
    var i = -1;
    voci.forEach(function (v, k) { if (v.classList.contains('sel')) i = k; });
    voci.forEach(function (v) { v.classList.remove('sel'); });
    var n = Math.max(0, Math.min(voci.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)));
    voci[n].classList.add('sel');
  });

  document.addEventListener('click', function (e) {
    if (form.contains(e.target)) return;
    if (e.target.closest && e.target.closest('.hero-chip')) return;
    box.hidden = true;
  });

  $$('[data-chip]').forEach(function (b) {
    b.addEventListener('click', function () {
      inp.value = b.dataset.chip;
      inp.focus();
      rendi();
    });
  });
}

/* ---------------------------------------------------------------- avvio */

function applicaTema(t) {
  document.documentElement.setAttribute('data-tema', t);
  var s = $('[data-stato]');
  if (s) s.textContent = t === 'notte' ? 'scura' : 'chiara';
}

function vociAttiva(vista, app) {
  if (vista === 'percorso') return app.dataset.p === 'a2' ? 'a2' : 'a1a3';
  if (vista === 'modulo') {
    var m = modulo(param('m'));
    return m && m.percorsi.indexOf('a1a3') >= 0 ? 'a1a3' : 'a2';
  }
  if (vista === 'esame') return param('p') === 'a2' ? 'a2' : 'a1a3';
  return vista;
}

document.addEventListener('DOMContentLoaded', function () {
  var app = $('#app');
  var vista = app ? (app.dataset.vista || 'home') : 'home';

  $('#testata').innerHTML = SH.costruisciTestata(vista);
  $('#menu').innerHTML = SH.costruisciMenu(vociAttiva(vista, app));
  $('#piede').innerHTML = SH.costruisciPiede();

  applicaTema(Store.get('tema') || 'notte');

  $('#apri-menu').addEventListener('click', function () { Menu.aperto() ? Menu.chiudi() : Menu.apri(); });
  $('#chiudi-menu').addEventListener('click', function () { Menu.chiudi(); });
  $('#menu').addEventListener('click', function (e) { if (e.target.id === 'menu') Menu.chiudi(); });
  $('#tema').addEventListener('click', function () {
    var n = document.documentElement.getAttribute('data-tema') === 'notte' ? 'chiaro' : 'notte';
    applicaTema(n);
    Store.set('tema', n);
  });

  var btnCerca = $('#apri-ricerca');
  if (btnCerca) btnCerca.addEventListener('click', function () { Ricerca.apri(); });
  $('#ricerca-chiudi').addEventListener('click', function () { Ricerca.chiudi(); });
  $('#ricerca').addEventListener('click', function (e) { if (e.target.id === 'ricerca') Ricerca.chiudi(); });
  $('#ricerca-input').addEventListener('input', function () { Ricerca.aggiorna(); });
  $$('.cerca-filtri button').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.cerca-filtri button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      Ricerca.filtro = b.dataset.f;
      Ricerca.aggiorna();
    });
  });

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); Ricerca.apri(); return; }
    if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) { e.preventDefault(); Ricerca.apri(); return; }
    if (e.key === 'Escape') {
      if (!$('#ricerca').hidden) Ricerca.chiudi();
      else if (Menu.aperto()) Menu.chiudi();
      return;
    }
    if ($('#ricerca').hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); Ricerca.muovi(1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); Ricerca.muovi(-1); }
    if (e.key === 'Enter') { e.preventDefault(); Ricerca.scegli(); }
  });

  var html;
  if (vista === 'percorso') html = vistaPercorso(app.dataset.p);
  else if (vista === 'area') html = vistaArea(param('a') || 'sicurezza');
  else if (vista === 'modulo') html = vistaModulo(param('m') || MODULI[0].id);
  else if (vista === 'glossario') html = vistaGlossario();
  else if (vista === 'metar') html = vistaMetar();
  else if (vista === 'esame') html = vistaEsame(param('p') || 'a1a3');
  else if (vista === 'contatti') html = vistaContatti();
  else if (vista === 'privacy') html = vistaPrivacy();
  else html = vistaHome();
  app.innerHTML = html;

  montaMedia(app);
  var mt = $('#metar-tool');
  if (mt) montaMetar(mt);

  if (vista === 'modulo') {
    agganciaRail();
    var m = modulo(param('m'));
    if (m) montaQuiz($('#quiz-slot'), m);
    var s = param('s');
    if (s) {
      var t = document.getElementById('s-' + s);
      if (t) setTimeout(function () { t.scrollIntoView({ block: 'start' }); }, 60);
    }
  }
  if (vista === 'glossario') {
    rendiGlossario('');
    var gq = $('#glo-q');
    gq.addEventListener('input', function () { rendiGlossario(gq.value); });
    var t2 = param('t');
    if (t2) { gq.value = t2; rendiGlossario(t2); }
  }
  if (vista === 'esame') montaEsame($('#esame-root'), param('p') || 'a1a3');
  if (vista === 'contatti') montaContatti();
  if (vista === 'privacy') montaPrivacy();
  if (vista === 'home') { montaHeroCerca(); montaPreflight(); }

  window.addEventListener('scroll', avanzamentoLettura, { passive: true });
});

window.GS = { MODULI: MODULI, decodificaMetar: decodificaMetar, MEDIA_BASE: MEDIA_BASE };

})();
