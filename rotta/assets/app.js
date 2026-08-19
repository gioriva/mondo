/* ============================================================
   Rotta | comportamenti comuni a tutte le pagine
   consenso cookie, Consent Mode v2, anno nel piede
   ============================================================ */
(function () {
  "use strict";

  var GA_ID = "G-1ZCCJ6QBR4";
  var K_COOKIE = "rotta:cookie";

  /* ---------- memoria locale a prova di blocco ---------- */
  function get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- consenso ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  // Consent Mode v2: tutto negato finché la persona non sceglie
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500
  });

  function grant(on) {
    gtag("consent", "update", {
      analytics_storage: on ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
  }

  function loadGA() {
    if (document.getElementById("ga-lib")) return;
    var s = document.createElement("script");
    s.id = "ga-lib";
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  function initConsent() {
    var banner = document.getElementById("cookie");
    var choice = get(K_COOKIE);

    if (choice === "si") { grant(true); loadGA(); }
    else if (choice !== "no" && banner) { setTimeout(function () { banner.classList.add("up"); }, 700); }

    function decide(v) {
      set(K_COOKIE, v);
      grant(v === "si");
      if (v === "si") loadGA();
      if (banner) banner.classList.remove("up");
    }

    var ok = document.getElementById("ck-ok");
    var no = document.getElementById("ck-no");
    if (ok) ok.addEventListener("click", function () { decide("si"); });
    if (no) no.addEventListener("click", function () { decide("no"); });

    // riapertura dal piede o dalla pagina cookie
    Array.prototype.forEach.call(document.querySelectorAll("[data-cookie-open]"), function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        if (banner) banner.classList.add("up");
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      });
    });
  }

  /* ---------- anno nel piede ---------- */
  function initYear() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initConsent();
    initYear();
  });
})();
