# Media di Quota Zero

Tutti i media sono **già presenti** nella cartella `media/` del sito e vengono
richiamati automaticamente dai moduli. Non c'è nulla da caricare per pubblicare.

Sono dieci tavole illustrate e quattro animazioni, disegnate nello stesso
linguaggio visivo del portale: blu notte, ottone, la codifica cromatica delle
zone geografiche italiane, i caratteri Fraunces, Instrument Sans e Geist Mono.
Non sono fotografie: sono schemi tecnici, che per un portale di formazione
spiegano cose che una fotografia non può mostrare.

---

## Le dieci tavole

| File | Modulo | Cosa spiega |
|---|---|---|
| `01-vlos.png` | I · Sicurezza operativa | Il cono visivo del pilota, il drone distinguibile e quello nascosto da un edificio |
| `02-marcatura.png` | I · Sicurezza operativa | Etichetta di classe e QR operatore sullo stesso drone, con i rispettivi obblighi |
| `03-lettura-area.png` | I · Sicurezza operativa | Pianta in scala con anello dei 30 m e quota dei 150 m fino all'edificato |
| `04-udp.png` | I · Sicurezza operativa | La linea del tempo del periodo di luce diurna uniforme |
| `05-zone-geografiche.png` | V · Spazio aereo | Le cinque zone a colori e la scala altimetrica affiancata |
| `06-carta-aeronautica.png` | V · Spazio aereo | CTR, ATZ, area R, ostacoli quotati in piedi, legenda dei simboli |
| `07-batterie.png` | VI · Conoscenza UAS | Celle in serie, lettura dell'etichetta, fasce di carica |
| `08-nubi.png` | X · Meteorologia | Cumuli e cumulonembo in scala di piedi, riga degli ottavi |
| `09-spread.png` | X · Meteorologia | Temperatura e punto di rugiada su 24 ore che convergono verso la nebbia |
| `10-equilibrio.png` | XII · Massa ed equilibrio | Multirotore equilibrato e sbilanciato a confronto |

Formato: PNG, 2400x1350, fondo scuro coerente con la lettura predefinita del
sito. La dimensione è volutamente maggiore di quella di lettura: serve alla
lente, che ingrandisce fino al 600%.

## Le quattro animazioni

| File | Modulo | Durata | Cosa mostra |
|---|---|---|---|
| `v01-preflight` | IV · Procedure operative | 20 s | Il controllo prima del volo che si spunta voce per voce |
| `v02-return-to-home` | IV · Procedure operative | 18 s | Perdita del collegamento, salita alla quota impostata, rientro, discesa |
| `v03-lettura-metar` | X · Meteorologia | 24 s | Un METAR letto gruppo per gruppo fino alla decisione operativa |
| `v04-regola-1-1` | XI · Mitigazione del rischio | 14 s | Quota e distanza orizzontale che salgono insieme |

Ogni animazione esiste in due formati, `.mp4` in H.264 e `.webm` in VP9. Il
portale li dichiara entrambi come sorgenti: il browser sceglie quello che sa
decodificare. Sono mute e senza riproduzione automatica.

Peso complessivo della cartella `media/`: poco meno di 4 MB.

---

## Rigenerare o modificare i media

I sorgenti stanno in `design/`:

| File | Cosa genera |
|---|---|
| `comune.py` | Primitive condivise: tavolozza, caratteri, drone, quote, etichette |
| `tavole1.py` | Tavole 01 e 02 |
| `tavole2.py` | Tavole 03 e 04 |
| `tavole3.py` | Tavole 05 e 06 |
| `tavole4.py` | Tavole 07, 08, 09 e 10 |
| `animazioni.py` | Le quattro animazioni |
| `og.py` | Immagine di anteprima social |
| `favicon.py` | Segno e icone |
| `sfondo.py` | Carta batimetrica dell'hero |

Servono Python con Pillow e numpy, ffmpeg per i video, e i due file Fraunces in
`design/fonts/`. Le animazioni si generano una alla volta:

```bash
python3 design/animazioni.py v03
```

Dopo aver prodotto un nuovo MP4, la versione WebM si ricava con:

```bash
ffmpeg -i media/v03-lettura-metar.mp4 -c:v libvpx-vp9 -crf 34 -b:v 0 \
       -row-mt 1 -cpu-used 5 -pix_fmt yuv420p media/v03-lettura-metar.webm
```

---

## Aggiungere fotografie tue

Se un domani vorrai affiancare alle tavole delle fotografie vere, il meccanismo
è già pronto. Ovunque nei file dei contenuti puoi inserire:

```html
<figure data-src="nome-file.jpg" data-cap="Didascalia della figura."></figure>
```

Il portale costruisce da solo il tag immagine o video in base all'estensione,
aggiunge la didascalia e mostra un segnaposto se il file manca.

Per tenere le fotografie su una repo esterna invece che dentro il sito, cambia
una riga in `assets/app.js`:

```js
var MEDIA_BASE = 'media/';
```

sostituendola per esempio con `https://gioriva.github.io/album/quotazero/`.
In quel caso ricordati di spostare lì anche le tavole e le animazioni.

---

## Nota sulla riservatezza

Le tavole non ritraggono persone reali: le figure umane sono schematiche. Se
aggiungi fotografie con persone riconoscibili, valgono le stesse regole spiegate
nel modulo VII.
