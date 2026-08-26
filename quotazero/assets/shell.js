/* ==========================================================================
   Quota Zero · guscio comune: logo, menu, piede, consenso
   Incluso in tutte le pagine. Costruisce testata e piede via JavaScript
   così che restino identici ovunque senza duplicazione di markup.
   ========================================================================== */

window.GS_SHELL = (function () {
'use strict';

/* --------------------------------------------------------------- icone */

var ICONE = {
  marchio: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="20.2" r="7.2" fill="currentColor"/><rect x="13.8" y="43.4" width="36.4" height="4.8" rx="2.4" fill="currentColor"/></svg>',

  a1a3: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="13" rx="2"/><path d="M7 7.5h6M7 11h4"/><circle cx="17" cy="18.5" r="3"/><path d="M15.4 20.8L14.6 24l2.4-1.3 2.4 1.3-.8-3.2"/></svg>',

  a2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="13" rx="2"/><path d="M7 7.5h6M7 11h4"/><circle cx="17" cy="18.5" r="3"/><path d="M15.4 20.8L14.6 24l2.4-1.3 2.4 1.3-.8-3.2"/><path d="M17.6 7.3l.7 1.5 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.6-.2z" fill="currentColor" stroke="none"/></svg>',

  metar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6.5 14.5a3.5 3.5 0 010-7 5 5 0 019.4 1.3A3.1 3.1 0 0115.5 15H6.5z"/><path d="M8 18.4h3M13.5 18.4h3M9.5 21.4h3"/></svg>',

  glossario: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.5C10.6 5.2 8.6 4.5 6 4.5H3.5v14H6c2.6 0 4.6.7 6 2 1.4-1.3 3.4-2 6-2h2.5v-14H18c-2.6 0-4.6.7-6 2z"/><path d="M12 6.5v14"/></svg>',

  torii: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M2.6 5.2c3.4 1 5.9 1.5 9.4 1.5s6-.5 9.4-1.5"/>' +
    '<path d="M4.4 9.1h15.2"/>' +
    '<path d="M6.6 6.5v13.9M17.4 6.5v13.9"/></svg>',

  contatti: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3.2 6.6L12 13l8.8-6.4"/></svg>',

  enac: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 4l9 6.5"/><path d="M5.2 10.5v8.3M9.7 10.5v8.3M14.3 10.5v8.3M18.8 10.5v8.3"/><path d="M3 19.5h18"/></svg>',

  dflight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3.2L3 5.5v15.3l6-2.3 6 2.3 6-2.3V3.2l-6 2.3z"/><path d="M9 3.2v15.3M15 5.5v15.3"/></svg>',

  easa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="8.6"/><g fill="currentColor" stroke="none"><circle cx="12" cy="5.6" r="1"/><circle cx="16.5" cy="7.5" r="1"/><circle cx="18.4" cy="12" r="1"/><circle cx="16.5" cy="16.5" r="1"/><circle cx="12" cy="18.4" r="1"/><circle cx="7.5" cy="16.5" r="1"/><circle cx="5.6" cy="12" r="1"/><circle cx="7.5" cy="7.5" r="1"/></g></svg>',

  aboveground: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M9.6 9.6L6.4 6.4M14.4 9.6l3.2-3.2M9.6 14.4l-3.2 3.2M14.4 14.4l3.2 3.2"/>' +
    '<rect x="9.1" y="9.1" width="5.8" height="5.8" rx="1.8"/>' +
    '<circle cx="5" cy="5" r="2.6"/><circle cx="19" cy="5" r="2.6"/>' +
    '<circle cx="5" cy="19" r="2.6"/><circle cx="19" cy="19" r="2.6"/></svg>',

  assicurazione: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M12 2.8l7.4 2.7v6c0 4.7-3.1 8.7-7.4 10.2C7.7 20.2 4.6 16.2 4.6 11.5v-6z"/>' +
    '<path d="M9.2 12.2l2 2 3.6-4"/></svg>',

  privacy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2"/><path d="M8 10.5V7.4a4 4 0 018 0v3.1"/><circle cx="12" cy="15.2" r="1.3"/></svg>',

  cookie: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 12.4A8.8 8.8 0 1111.6 3.2a3.4 3.4 0 004.6 4 3.4 3.4 0 004.6 5.2z"/><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="13" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="8.4" cy="15.6" r="1" fill="currentColor" stroke="none"/></svg>',

  pfAttestato: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M6.6 8.4h6M6.6 11.6h3.6"/><circle cx="17" cy="18.6" r="2.8"/><path d="M15.4 20.8L14.7 24l2.3-1.2 2.3 1.2-.7-3.2"/></svg>',

  pfQr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><path d="M14 14h3.2v3.2H14zM20.8 14v3.2M14 20.8h3.2M20.8 20.8h.01"/></svg>',

  pfScudo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8l7.4 2.7v6c0 4.7-3.1 8.7-7.4 10.2C7.7 20.2 4.6 16.2 4.6 11.5v-6z"/><path d="M9.2 12.2l2 2 3.6-4"/></svg>',

  pfZone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3.2L3 5.5v15.3l6-2.3 6 2.3 6-2.3V3.2l-6 2.3z"/><path d="M9 3.2v15.3M15 5.5v15.3"/><circle cx="12" cy="11" r="2.1"/></svg>',

  pfMeteo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 15.4a3.5 3.5 0 010-7 5 5 0 019.4 1.3 3.1 3.1 0 01-.4 5.7H6.5z"/><path d="M8.2 19.2h3M13.4 19.2h3M9.8 22h3"/></svg>',

  pfBatteria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7.4" width="17" height="9.2" rx="2.2"/><path d="M22 10.6v2.8"/><path d="M11.9 9.6L9.4 13h3.2l-2.5 3.4"/></svg>',

  tema: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z"/></svg>',

  sole: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6"/></svg>',

  cerca: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>',

  lente: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10.6" cy="10.6" r="6.6"/><path d="M19.4 19.4l-4.1-4.1M8 10.6h5.2M10.6 8v5.2"/></svg>',

  piu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5.5v13M5.5 12h13"/></svg>',

  meno: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5.5 12h13"/></svg>',

  chiudi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',

  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',

  esterno: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 5.5h5v5M18.5 5.5L11 13"/><path d="M17 14.5v3a2 2 0 01-2 2H6.5a2 2 0 01-2-2V9a2 2 0 012-2h3"/></svg>',

  freccia: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6.5l5.5 5.5L13 17.5"/></svg>',

  modulo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A1.5 1.5 0 015.5 4H19v16H5.5A1.5 1.5 0 014 18.5z"/><path d="M8 8.5h7M8 12h5"/></svg>',

  esame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="7.5"/><path d="M12 9.5V13l2.4 1.6M9.4 2.8h5.2"/></svg>'
};

function icona(nome, cls) {
  return '<span class="ico' + (cls ? ' ' + cls : '') + '" aria-hidden="true">' + (ICONE[nome] || '') + '</span>';
}

/* ------------------------------------------------------ voci del menu */

var PAYOFF = 'Il volo comincia <em>a terra</em>.';

var MENU = [
  {
    id: 'a1a3', icona: 'a1a3', testo: 'Attestato A1/A3', href: 'a1a3.html',
    nota: 'Nove moduli, il percorso di base',
    figli: [
      { testo: 'Apri il primo modulo', href: 'modulo.html?m=sicurezza-operativa', icona: 'modulo' },
      { testo: "Simulazione d'esame", href: 'esame.html?p=a1a3', icona: 'esame' }
    ]
  },
  {
    id: 'a2', icona: 'a2', testo: 'Attestato A2', href: 'a2.html',
    nota: 'Quattro moduli, per la classe C2',
    figli: [
      { testo: 'Apri il primo modulo', href: 'modulo.html?m=spazio-aereo', icona: 'modulo' },
      { testo: "Simulazione d'esame", href: 'esame.html?p=a2', icona: 'esame' }
    ]
  },
  { id: 'metar', icona: 'metar', testo: 'METAR', href: 'metar.html', nota: 'Decodificatore interattivo' },
  { id: 'glossario', icona: 'glossario', testo: 'Glossario', href: 'glossario.html', nota: '104 sigle e definizioni' },
  { sep: 'Riferimenti ufficiali' },
  { id: 'enac', icona: 'enac', testo: 'ENAC droni', href: 'https://www.enac.gov.it/sicurezza-aerea/droni', esterno: true, nota: "Autorità italiana dell'aviazione civile" },
  { id: 'dflight', icona: 'dflight', testo: 'D-Flight', href: 'https://www.d-flight.it', esterno: true, nota: 'Registrazione e zone geografiche' },
  { id: 'easa', icona: 'easa', testo: 'EASA', href: 'https://www.easa.europa.eu/en/domains/drones-air-mobility', esterno: true, nota: 'Agenzia europea per la sicurezza aerea' },
  { id: 'coverdrone', icona: 'assicurazione', testo: 'Coverdrone', href: 'https://www.coverdrone.com/it/', esterno: true, nota: 'Polizze RC verso terzi per droni' }
];

var PIEDE = [
  { icona: 'torii', testo: 'Gio Riva', href: 'https://www.gioriva.it/' },
  { icona: 'privacy', testo: 'Privacy & Cookie', href: 'privacy.html' },
  { icona: 'contatti', testo: 'Contatti', href: 'contatti.html' }
];

/* ------------------------------------------------------------ costruzione */

function costruisciTestata(attivo) {
  var h = '';
  h += '<a class="marchio" href="index.html" aria-label="Quota Zero, torna alla home">';
  h += '<span class="marchio-segno">' + ICONE.marchio + '</span>';
  h += '<span class="marchio-testo">Quota <em>Zero</em></span></a>';
  h += '<span class="spazio"></span>';
  /* In home la ricerca sta al centro dell'hero: in testata sarebbe ridondante. */
  if (attivo !== 'home') {
    h += '<button class="cerca-btn" id="apri-ricerca" aria-label="Cerca nel portale" title="Cerca">' + icona('cerca') +
         '<span>Cerca una regola o una sigla</span><kbd>&#8984;K</kbd></button>';
  }
  h += '<button class="menu-btn" id="apri-menu" aria-label="Apri il menu" aria-expanded="false" aria-controls="menu">' +
       '<span class="menu-barre"><i></i><i></i><i></i></span><span class="menu-eti">Menu</span></button>';
  return h;
}

function costruisciMenu(attivo) {
  var h = '<div class="menu-pannello" role="dialog" aria-modal="true" aria-label="Menu di navigazione">';
  h += '<div class="menu-testa"><span class="eyebrow">Naviga</span>';
  h += '<button class="icona-btn" id="chiudi-menu" aria-label="Chiudi il menu">' + ICONE.chiudi + '</button></div>';
  h += '<nav class="menu-voci">';

  MENU.forEach(function (v) {
    if (v.sep !== undefined) {
      h += '<div class="menu-sep">' + (v.sep ? '<span class="eyebrow">' + v.sep + '</span>' : '') + '</div>';
      return;
    }
    var att = attivo === v.id;
    h += '<a class="menu-voce' + (att ? ' attiva' : '') + '" href="' + v.href + '"' +
         (v.esterno ? ' target="_blank" rel="noopener"' : '') + (att ? ' aria-current="page"' : '') + '>';
    h += icona(v.icona);
    h += '<span class="menu-testi"><b>' + v.testo + '</b><small>' + v.nota + '</small></span>';
    h += v.esterno ? icona('esterno', 'ico-fine') : icona('freccia', 'ico-fine');
    h += '</a>';
    if (v.figli) {
      h += '<div class="menu-figli">';
      v.figli.forEach(function (f) {
        h += '<a href="' + f.href + '">' + icona(f.icona) + '<span>' + f.testo + '</span></a>';
      });
      h += '</div>';
    }
  });

  h += '</nav>';
  h += '<div class="menu-piede">';
  h += '<button class="tema-switch" id="tema" aria-label="Alterna lettura chiara e scura">' +
       '<span class="tema-ico chiaro">' + ICONE.sole + '</span>' +
       '<span class="tema-ico scuro">' + ICONE.tema + '</span>' +
       '<span class="tema-eti">Lettura</span><span class="tema-stato" data-stato>chiara</span></button>';
  h += '</div></div>';
  return h;
}

function costruisciPiede() {
  var h = '<div class="wrap">';
  h += '<div class="piede-marchio">' + ICONE.marchio + '</div>';
  h += '<p class="piede-payoff">' + PAYOFF + '</p>';
  h += '<p class="disclaimer">Quota Zero è materiale di studio non ufficiale, redatto a partire dal programma teorico europeo per la categoria Open. Non sostituisce i testi ENAC né la documentazione applicabile, che resta l\'unico riferimento valido. Le zone geografiche vanno sempre verificate su D-Flight prima di ogni volo. La normativa cambia: se una data o un numero non coincidono con quanto pubblicato dall\'autorità, vale l\'autorità.</p>';
  h += '<nav class="piede-riga" aria-label="Collegamenti di servizio">';
  PIEDE.forEach(function (v, i) {
    var est = /^https?:/.test(v.href);
    if (i) h += '<span class="piede-sep" aria-hidden="true">·</span>';
    h += '<a href="' + v.href + '"' + (est ? ' target="_blank" rel="noopener"' : '') + '>' +
         icona(v.icona) + '<span>' + v.testo + '</span></a>';
  });
  h += '</nav>';
  h += '</div>';
  return h;
}

return {
  ICONE: ICONE,
  icona: icona,
  MENU: MENU,
  costruisciTestata: costruisciTestata,
  costruisciMenu: costruisciMenu,
  costruisciPiede: costruisciPiede
};

})();
