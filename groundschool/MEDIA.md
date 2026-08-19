# Media del portale Ground School

I file elencati qui sotto **non esistono ancora**: sono foto e video che devi
riprendere tu. Vanno poi caricati in una sola cartella piatta:

```
https://gioriva.github.io/album/groundschool/
```

Il portale li richiama da lì. Finché un file non esiste, al suo posto compare un
riquadro tratteggiato con il nome atteso, quindi puoi pubblicare subito e caricare
i media un po' alla volta senza rompere nulla.

Se vuoi cambiare la cartella, modifica una sola riga in `assets/app.js`:

```js
var MEDIA_BASE = 'https://gioriva.github.io/album/groundschool/';
```

---

## Specifiche tecniche

| Tipo | Formato | Dimensione | Peso indicativo |
|---|---|---|---|
| Foto | JPG qualità 80 | 1600 px sul lato lungo, 16:9 | sotto 400 KB |
| Schermate | PNG | 1600 px di larghezza | sotto 600 KB |
| Video | MP4 H.264, audio AAC o muto | 1920x1080, 30 fps | sotto 15 MB, durata 40-90 s |
| Anteprima social | PNG | 1200x630 | sotto 400 KB |

I video vengono mostrati con i controlli nativi e senza riproduzione automatica.
Se sono muti, aggiungi sottotitoli aperti in fase di montaggio: il portale non
carica file di sottotitoli separati.

---

## Elenco dei file attesi

### Foto

| File | Modulo | Cosa deve mostrare |
|---|---|---|
| `01-vlos-campo-aperto.jpg` | I · Sicurezza operativa | Drone in volo su campo aperto, ripreso da terra, con l'aeromobile piccolo ma nettamente distinguibile contro il cielo. Serve a far capire cosa significa davvero tenerlo a vista. |
| `02-etichetta-classe.jpg` | I · Sicurezza operativa | Primo piano dell'etichetta di classe C0 o C1 sulla scocca del drone. Se il tuo Mini non ce l'ha, va bene anche il QR code operatore applicato. |
| `03-persone-non-coinvolte.jpg` | I · Sicurezza operativa | Lungolago o piazza in una giornata feriale, con persone in movimento. Volti non riconoscibili: inquadratura dall'alto o di spalle. |
| `04-tramonto-udp.jpg` | I · Sicurezza operativa | Tramonto sul lago, ripreso da terra o da drone. Illustra la chiusura del periodo di luce diurna uniforme. |
| `05-dflight-mappa.png` | V · Spazio aereo | Schermata di D-Flight sull'area di Como, con le zone colorate visibili. Ritaglia le parti di interfaccia inutili. |
| `06-carta-icao.jpg` | V · Spazio aereo | Estratto di carta aeronautica ICAO 1:500.000, meglio se con un CTR e alcuni ostacoli quotati. Va bene una foto della carta cartacea appoggiata sul tavolo. |
| `07-batterie-safebag.jpg` | VI · Conoscenza UAS | Batterie in borsa ignifuga, con il tester o l'indicatore di carica in vista. |
| `08-cumuli.jpg` | X · Meteorologia | Cumuli in sviluppo sopra le Prealpi. Ottimo se hai già del materiale d'archivio. |
| `09-nebbia.jpg` | X · Meteorologia | Nebbia mattutina sul lago o in pianura, con la linea d'orizzonte che sparisce. |
| `10-equilibrio-payload.jpg` | XII · Massa ed equilibrio | Mani che sostengono il multirotore alle estremità dell'asse trasversale per verificarne l'equilibrio. |

### Video

| File | Modulo | Contenuto |
|---|---|---|
| `v01-preflight.mp4` | IV · Procedure operative | Controllo pre volo completo: ispezione eliche, verifica batteria, satelliti agganciati, impostazione della quota di Return to Home, QR code a bordo. Riprendi dall'alto sul cofano o su un tavolo. |
| `v02-return-to-home.mp4` | IV · Procedure operative | Dimostrazione di Return to Home: attivazione, salita alla quota impostata, rientro sull'home point, discesa. Riprendi in split fra schermo del radiocomando e drone. |
| `v03-lettura-metar.mp4` | X · Meteorologia | Lettura di un METAR reale in tempo reale, gruppo per gruppo, fino alla decisione operativa. Basta uno screen recording del decodificatore con la tua voce sopra. |
| `v04-regola-1-1.mp4` | XI · Mitigazione del rischio | Regola 1:1 sul campo: drone a 30 metri di quota e misurazione della distanza orizzontale corrispondente. |

### Già pronti, niente da fare

Questi file sono nella cartella del portale e non vanno caricati sulla repo dei media:

| File | Uso |
|---|---|
| `og-groundschool.jpg` | Anteprima di condivisione 1200x630, richiamata dai meta tag |
| `og-groundschool.png` | Stessa immagine senza compressione, se ti serve altrove |
| `sfondo-hero.jpg` | Carta batimetrica di fondo dell'hero |
| `favicon.ico`, `favicon.svg` | Segno nella scheda del browser |
| `favicon-16/32/48.png` | Versioni raster di riserva |
| `apple-touch-icon.png` | Icona per la schermata home su iOS |
| `icona-512.png` | Icona per il manifest |

Sono già pronte anche le dieci illustrazioni tecniche (classi C0-C4, distanze delle
sottocategorie, zone geografiche, rosa dei venti, ottavi di copertura, anatomia del
METAR, assi e comandi, quattro forze, alta e bassa pressione, regola 1:1). Sono
disegni vettoriali scritti dentro il codice: si adattano al tema chiaro e scuro,
si stampano bene e non richiedono alcun caricamento.

---

## Aggiungere nuovi media

Ovunque nei file dei contenuti puoi inserire questo blocco:

```html
<figure data-src="nome-file.jpg" data-cap="Didascalia della figura."></figure>
```

Il portale costruisce da solo il tag immagine o video in base all'estensione,
aggiunge la didascalia e gestisce il caso di file mancante.

---

## Nota sulla riservatezza

Le foto che ritraggono persone finiscono in un portale pubblico. Scegli
inquadrature in cui i volti non siano riconoscibili, oppure raccogli il consenso.
È lo stesso principio spiegato nel modulo VII.
