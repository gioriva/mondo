/* Tarcisio Riva | Formula 3 — script condiviso */
(function () {
  "use strict";

  /* ---------- configurazione ---------- */

  var FOTO_BASE = "https://gioriva.github.io/album/formula3";
  var GA_ID = "G-1ZCCJ6QBR4";

  var FOTO = [];
  for (var i = 1; i <= 62; i++) FOTO.push("tarcisio" + i + ".jpg");
  for (var j = 1; j <= 9; j++) FOTO.push("Tarcisio_" + j + ".JPEG");

  /* ---------- consenso cookie e Google Analytics ---------- */

  var CHIAVE = "tr_consenso_cookie";

  function caricaGA() {
    if (window._gaCaricato) return;
    window._gaCaricato = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
  }

  function mostraAvviso() {
    var avviso = document.getElementById("cookie-avviso");
    if (avviso) avviso.classList.add("visibile");
  }

  function nascondiAvviso() {
    var avviso = document.getElementById("cookie-avviso");
    if (avviso) avviso.classList.remove("visibile");
  }

  function inizializzaConsenso() {
    var scelta = null;
    try { scelta = localStorage.getItem(CHIAVE); } catch (e) {}

    if (scelta === "si") {
      caricaGA();
    } else if (scelta !== "no") {
      mostraAvviso();
    }

    var accetta = document.getElementById("cookie-accetta");
    var rifiuta = document.getElementById("cookie-rifiuta");
    var riapri = document.getElementById("apri-cookie");

    if (accetta) accetta.addEventListener("click", function () {
      try { localStorage.setItem(CHIAVE, "si"); } catch (e) {}
      nascondiAvviso();
      caricaGA();
    });
    if (rifiuta) rifiuta.addEventListener("click", function () {
      try { localStorage.setItem(CHIAVE, "no"); } catch (e) {}
      nascondiAvviso();
    });
    if (riapri) riapri.addEventListener("click", function () {
      mostraAvviso();
    });
  }

  /* ---------- galleria e visore ---------- */

  var indiceCorrente = 0;
  var PER_PAGINA = 25;
  var paginaCorrente = 0;

  function urlThumb(nome) { return FOTO_BASE + "/thumbs/" + nome; }
  function urlIntera(nome) { return FOTO_BASE + "/" + nome; }

  function numeroPagine() { return Math.ceil(FOTO.length / PER_PAGINA); }

  function mostraPagina(p, scorri) {
    var griglia = document.getElementById("griglia");
    if (!griglia) return;
    paginaCorrente = p;
    griglia.innerHTML = "";

    var inizio = p * PER_PAGINA;
    var fine = Math.min(inizio + PER_PAGINA, FOTO.length);

    for (var idx = inizio; idx < fine; idx++) {
      (function (i) {
        var nome = FOTO[i];
        var card = document.createElement("button");
        card.className = "scatto";
        card.type = "button";
        card.setAttribute("aria-label", "Apri la foto " + (i + 1) + " di " + FOTO.length);

        var img = document.createElement("img");
        img.loading = "lazy";
        img.decoding = "async";
        img.src = urlThumb(nome);
        img.alt = "Tarcisio Riva, Formula 3, foto " + (i + 1);

        var num = document.createElement("span");
        num.className = "numero";
        num.textContent = i + 1;

        card.appendChild(img);
        card.appendChild(num);
        card.addEventListener("click", function () { apriVisore(i); });
        griglia.appendChild(card);
      })(idx);
    }

    aggiornaPaginazione();
    if (scorri) {
      var sezione = document.getElementById("galleria");
      if (sezione) sezione.scrollIntoView({ behavior: "smooth" });
    }
  }

  function aggiornaPaginazione() {
    var nav = document.getElementById("paginazione");
    if (!nav) return;
    nav.innerHTML = "";
    for (var p = 0; p < numeroPagine(); p++) {
      (function (pp) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "pagina-btn" + (pp === paginaCorrente ? " attiva" : "");
        b.textContent = pp + 1;
        b.setAttribute("aria-label", "Pagina " + (pp + 1) + " di " + numeroPagine());
        if (pp === paginaCorrente) b.setAttribute("aria-current", "page");
        b.addEventListener("click", function () {
          if (pp !== paginaCorrente) mostraPagina(pp, true);
        });
        nav.appendChild(b);
      })(p);
    }
  }

  function costruisciGalleria() {
    if (!document.getElementById("griglia")) return;
    mostraPagina(0, false);
  }

  function apriVisore(idx) {
    indiceCorrente = idx;
    var visore = document.getElementById("visore");
    if (!visore) return;
    aggiornaVisore();
    visore.classList.add("aperto");
    document.body.style.overflow = "hidden";
    var chiudi = visore.querySelector(".chiudi");
    if (chiudi) chiudi.focus();
  }

  function chiudiVisore() {
    var visore = document.getElementById("visore");
    if (!visore) return;
    visore.classList.remove("aperto");
    document.body.style.overflow = "";
  }

  function aggiornaVisore() {
    var img = document.getElementById("visore-foto");
    var contatore = document.getElementById("visore-contatore");
    if (!img) return;
    img.src = urlIntera(FOTO[indiceCorrente]);
    img.alt = "Tarcisio Riva, Formula 3, foto " + (indiceCorrente + 1) + " di " + FOTO.length;
    if (contatore) contatore.textContent = "Scatto " + (indiceCorrente + 1) + " / " + FOTO.length;

    /* precarica la foto successiva e la precedente */
    [indiceCorrente + 1, indiceCorrente - 1].forEach(function (k) {
      if (k >= 0 && k < FOTO.length) { (new Image()).src = urlIntera(FOTO[k]); }
    });
  }

  function vai(passo) {
    indiceCorrente = (indiceCorrente + passo + FOTO.length) % FOTO.length;
    aggiornaVisore();
  }

  function inizializzaVisore() {
    var visore = document.getElementById("visore");
    if (!visore) return;

    visore.querySelector(".chiudi").addEventListener("click", chiudiVisore);
    visore.querySelector(".prec").addEventListener("click", function () { vai(-1); });
    visore.querySelector(".succ").addEventListener("click", function () { vai(1); });
    visore.addEventListener("click", function (ev) {
      if (ev.target === visore) chiudiVisore();
    });

    document.addEventListener("keydown", function (ev) {
      if (!visore.classList.contains("aperto")) return;
      if (ev.key === "Escape") chiudiVisore();
      if (ev.key === "ArrowLeft") vai(-1);
      if (ev.key === "ArrowRight") vai(1);
    });
  }

  /* ---------- avvio ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    inizializzaConsenso();
    costruisciGalleria();
    inizializzaVisore();

    var eroeFoto = document.getElementById("eroe-foto");
    if (eroeFoto) eroeFoto.src = urlIntera("tarcisio13.jpg");
  });
})();
