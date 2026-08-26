/* ==========================================================================
   Quota Zero · consenso e statistiche
   Google Analytics viene caricato soltanto dopo il consenso esplicito.
   Prima di quel momento nessuno script di terze parti entra nella pagina.
   ========================================================================== */

(function () {
'use strict';

/* Identificativo di misurazione Google Analytics, lo stesso usato su gioriva.it. */
var GA_ID = 'G-1ZCCJ6QBR4';

var CHIAVE = 'gs:consenso';

function leggi() {
  try { return window.localStorage.getItem(CHIAVE); } catch (e) { return null; }
}
function scrivi(v) {
  try { window.localStorage.setItem(CHIAVE, v); } catch (e) {}
}

function caricaAnalytics() {
  if (!GA_ID) return;
  if (window.__gsGA) return;
  window.__gsGA = true;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

function rimuoviBanner() {
  var b = document.getElementById('cookie-banner');
  if (b) b.parentNode.removeChild(b);
}

function mostraBanner() {
  if (document.getElementById('cookie-banner')) return;
  var b = document.createElement('div');
  b.id = 'cookie-banner';
  b.className = 'cookie-banner';
  b.setAttribute('role', 'dialog');
  b.setAttribute('aria-label', 'Cookie e privacy');
  b.innerHTML =
    '<div class="cookie-corpo">' +
      '<span class="eyebrow">Cookie &amp; privacy</span>' +
      '<p>Questo sito usa cookie analitici (Google Analytics) per capire come viene visitato. ' +
      'Sono attivati solo con il tuo consenso. Maggiori dettagli nella ' +
      '<a href="privacy.html">privacy policy</a>.</p>' +
    '</div>' +
    '<div class="cookie-azioni">' +
      '<button class="btn ghost" data-scelta="rifiuta">Rifiuta</button>' +
      '<button class="btn" data-scelta="accetta">Accetta</button>' +
    '</div>';
  document.body.appendChild(b);

  b.addEventListener('click', function (e) {
    var t = e.target.closest('[data-scelta]');
    if (!t) return;
    var scelta = t.dataset.scelta;
    scrivi(scelta);
    rimuoviBanner();
    if (scelta === 'accetta') caricaAnalytics();
  });

  requestAnimationFrame(function () { b.classList.add('visibile'); });
}

function avvia() {
  var c = leggi();
  if (c === 'accetta') { caricaAnalytics(); return; }
  if (c === 'rifiuta') return;
  mostraBanner();
}

/* Permette di riaprire la scelta dalla pagina privacy */
window.GS_CONSENSO = {
  stato: leggi,
  revoca: function () {
    scrivi('');
    try { window.localStorage.removeItem(CHIAVE); } catch (e) {}
    mostraBanner();
  },
  attivo: function () { return leggi() === 'accetta'; },
  configurato: function () { return !!GA_ID; }
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvia);
else avvia();

})();
