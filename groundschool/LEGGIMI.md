# Ground School

Portale di formazione teorica per gli attestati europei di pilota UAS
**A1/A3** e **A2**, in italiano, allineato alla normativa applicabile in Italia.

Destinazione: `https://www.gioriva.it/groundschool/`

---

## Perché questo nome

La tua pagina di fotografia aerea si chiama Above Ground. *Ground school* è il
termine con cui l'aviazione chiama da sempre la parte teorica che si studia prima
di salire in volo. Le due pagine si parlano: una sta sopra il suolo, l'altra
racconta cosa serve sapere restando a terra. Funziona anche come URL, si scrive
in un modo solo e non ha bisogno di essere tradotto.

Alternative scartate: *Quota Zero* (bello ma opaco), *Preflight* (troppo generico),
*Briefing* (già usato da mezzo settore).

---

## Pubblicazione

Copia l'intera cartella in `gioriva.it/groundschool/`. Non serve build,
non serve Node, non serve un server applicativo: sono file statici.

```
groundschool/
├── index.html          home
├── a1a3.html           percorso A1/A3
├── a2.html             percorso A2
├── metar.html          decodificatore
├── glossario.html      glossario
├── modulo.html         vista modulo, parametro ?m=
├── area.html           area tematica, parametro ?a=
├── esame.html          simulazione, parametro ?p=
├── contatti.html       modulo Formspree
├── privacy.html        informativa, con ancora #cookie
├── sfondo-hero.jpg
├── og-groundschool.jpg
├── favicon.ico
├── favicon.svg
├── favicon-16.png
├── favicon-32.png
├── favicon-48.png
├── apple-touch-icon.png
├── icona-512.png
├── manifest.webmanifest
├── og-groundschool.png
├── design/            (sorgenti grafiche, non necessarie in produzione)
├── assets/
│   ├── style.css
│   ├── app.js
│   ├── corso-a1a3.js
│   ├── corso-a1a3b.js
│   ├── corso-meteo.js
│   ├── corso-a2.js
│   └── glossario.js
├── MEDIA.md
└── LEGGIMI.md
```

Nessuna dipendenza esterna a parte i tre font caricati da Google Fonts
(Fraunces, Instrument Sans, Geist Mono). Se preferisci ospitarli in proprio,
sostituisci il tag `<link>` nella testa di `index.html`.

---

## Struttura del portale

Il contenuto è navigabile in due modi, come da richiesta.

**Per attestato**
- A1/A3: nove moduli, dal I al IX
- A2: quattro moduli, spazio aereo più i tre specifici dal X al XII

**Per area tematica**
Sicurezza, regole e normativa, fattore umano, procedure operative, spazio aereo,
tecnica UAS, meteorologia, privacy e dati.

Il modulo *Spazio aereo e zone geografiche* compare in entrambi i percorsi:
serve già per l'A1/A3 e resta indispensabile per l'A2.

### I dodici moduli

| N | Modulo | Percorso | Area |
|---|---|---|---|
| I | Sicurezza operativa | A1/A3 | Sicurezza |
| II | Regolamentazione aeronautica | A1/A3 | Normativa |
| III | Idoneità al volo | A1/A3 | Fattore umano |
| IV | Procedure operative | A1/A3 | Procedure |
| V | Spazio aereo e zone geografiche | A1/A3 e A2 | Spazio aereo |
| VI | Conoscenza generale UAS | A1/A3 | Tecnica |
| VII | Privacy e protezione dei dati | A1/A3 | Privacy |
| VIII | Assicurazione | A1/A3 | Normativa |
| IX | Security e identificazione remota | A1/A3 | Sicurezza |
| X | Meteorologia | A2 | Meteorologia |
| XI | Pianificazione e mitigazione del rischio | A2 | Procedure |
| XII | Massa, equilibrio e batterie | A2 | Tecnica |

In totale 72 sezioni, 102 domande di verifica, 90 nozioni chiave, 104 voci di
glossario.

---

## Funzioni

**Ricerca rapida.** Si apre con `⌘K`, `Ctrl+K` o il tasto `/`. Indicizza tutte le
sezioni delle lezioni, le nozioni chiave e il glossario. Filtri per tipo,
navigazione da tastiera, evidenziazione dei termini nel frammento. Cerca per
sigla (`CAVOK`, `MTOM`, `NOTAM`), per numero (`150 metri`, `120`, `1013`) o per
concetto (`fly away`, `spread`, `regola 1:1`).

**Decodificatore METAR.** Riconosce tipo di messaggio, stazione ICAO, data e ora
Zulu con conversione all'ora italiana, vento con raffiche e variabilità, CAVOK,
visibilità anche direzionale, RVR, codici di tempo presente completi,
strati nuvolosi con CB e TCU, visibilità verticale, temperatura e punto di
rugiada con calcolo dello spread, QNH in ettopascal e in pollici, tempo recente,
wind shear, gruppi di tendenza e blocchi di probabilità. In cima produce una
lettura operativa con verdetto orientato al volo con drone. Sei esempi
precaricati su aeroporti italiani. Disponibile sia dentro il modulo di
meteorologia sia come strumento autonomo su `#/metar`.

**Verifiche e simulazioni.** Ogni modulo chiude con un quiz a risposta multipla
con spiegazione. Le due simulazioni d'esame replicano il formato reale:
40 domande in 60 minuti per l'A1/A3, 30 domande in 60 minuti per l'A2, soglia
75% in entrambi i casi, timer, correzione commentata al termine.

**Avanzamento.** Un modulo risulta superato quando la sua verifica raggiunge il
75%. L'indicatore in home traduce i moduli superati in quota, da 0 a 120 metri.
L'avanzamento è salvato nel browser locale, senza account e senza server.

**Lettura scura.** Interruttore in fondo al menu, la preferenza resta memorizzata.

**Ricerca.** In home il campo sta al centro dell'hero, con risultati in tempo reale e
cinque scorciatoie sotto. Sulle altre pagine, dove quel campo non c'è, la ricerca torna
in testata come pulsante. La scorciatoia da tastiera vale ovunque.

**Menu.** Pannello laterale che si apre dal pulsante in alto a destra. Contiene i
quattro percorsi del portale, con due sottovoci ciascuno per A1/A3 e A2, i tre
riferimenti ufficiali che aprono in una scheda nuova, i contatti e l'interruttore
della lettura scura. Si chiude con Esc, con la X o toccando fuori dal pannello.

**Consenso ai cookie.** Google Analytics, flusso `G-1ZCCJ6QBR4`, viene caricato solo
dopo un consenso esplicito e con IP anonimizzato. Prima di quel momento nessuno script
di terze parti entra nella pagina. La scelta si può rivedere in fondo alla pagina
privacy. L'identificativo sta in una sola riga di `assets/consenso.js`.

**Contatti.** Modulo con nome, cognome, email e messaggio, inviato a Formspree via
fetch senza abbandonare la pagina. Validazione lato client con evidenziazione dei
campi mancanti, campo esca contro i bot, conferma in linea a invio riuscito.

---

## Identità visiva

Il segno è ridotto a due elementi: la linea di terra e il punto sopra di essa.
Fra i due c'è solo aria, e la distanza è l'unica informazione. Regge la lettura
fino a sedici pixel senza bisogno di lettere.

L'anteprima di condivisione riprende invece la scala altimetrica del portale, con
le tacche alle soglie reali delle zone geografiche italiane (120, 60, 45, 25, 0)
e i colori esatti della codifica D-Flight. Il titolo è in Fraunces, lo stesso
carattere del sito.

I sorgenti stanno in `design/`: `og.py` genera l'anteprima, `favicon.py` genera
tutte le icone, `filosofia-visiva.md` spiega le scelte. Per rigenerare tutto
servono Python e Pillow, e i due file Fraunces in `design/fonts/`.

---

## Modificare i contenuti

Ogni modulo è un oggetto JavaScript in uno dei file `corso-*.js`:

```js
{
  id: 'sicurezza-operativa',
  num: 'I',
  titolo: 'Sicurezza operativa',
  area: 'sicurezza',
  percorsi: ['a1a3'],
  durata: 35,
  sommario: 'Una riga di presentazione.',
  sezioni: [ { id: 'comandante', titolo: 'Sei il comandante', html: `...` } ],
  ricorda: [ 'Nozione chiave in una riga.' ],
  quiz: [ { d: 'Domanda?', o: ['A','B','C','D'], c: 1, sp: 'Spiegazione.' } ]
}
```

Il campo `c` è l'indice della risposta corretta, contato da zero. Le sezioni
accettano HTML libero: sono già pronte le classi `nota`, `nota attenzione`,
`nota esame`, `nota italia`, `tab-wrap` per le tabelle, `dati` per i blocchi
numerici, `check` per le liste spuntabili.

Aggiungere un modulo richiede tre passi: creare l'oggetto, inserire il suo `id`
nell'array `ORDINE` in `app.js`, verificare che `area` esista nella mappa `AREE`.

### Aggiungere una voce al menu

Le voci di menu e i link del piede stanno in `assets/shell.js`, negli array `MENU`
e `PIEDE`. Ogni voce indica un'icona presa dalla mappa `ICONE` dello stesso file,
un testo, una nota breve e la destinazione. Le sottovoci si dichiarano nell'array
`figli`. Le icone sono SVG a tratto, disegnate sulla stessa griglia da 24 pixel.

### Come sono costruite le pagine

Ogni pagina è un documento autonomo con la stessa struttura minima: testata, un
`<main id="app">` con l'attributo `data-vista`, il pannello del menu, il piede.
Testata, menu e piede vengono costruiti da `shell.js` e restano identici ovunque
senza duplicare markup. Il contenuto lo produce `app.js` in base alla vista
dichiarata. Per aggiungere una pagina basta copiare un file esistente, cambiare
`data-vista` e scrivere la funzione corrispondente.

L'indice di ricerca si costruisce da solo all'avvio: non c'è nulla da rigenerare.

---

## Fonti dei contenuti

Il testo nasce dalle slide che mi hai passato, rilette e adattate su tre fronti.

**Sostituzione dei riferimenti nazionali.** Il materiale originale è olandese e
cita ILT, RDW, KNMI, LVNL, le zone di volo a bassa quota dei Paesi Bassi e i
limiti stradali locali. Tutto sostituito con ENAC, D-Flight, ENAV, la circolare
ATM-09A e le regole applicabili in Italia.

**Aggiornamento normativo.** Le slide sono ferme al 2024 e presentano ancora il
periodo transitorio per i droni senza marcatura di classe come se fosse in corso.
Ho allineato il testo al quadro in vigore: fine del regime transitorio per i
droni immessi sul mercato dopo il 31 dicembre 2023, decadenza degli scenari
standard nazionali IT-STS dal 1 gennaio 2026 e passaggio agli EU-STS con droni
C5 e C6, sistema a colori delle zone geografiche con i relativi tetti di quota.
Corrette anche alcune imprecisioni presenti nelle slide originali, fra cui una
tabella delle classi con associazioni sbagliate e l'affermazione che in aria
stabile la turbolenza sarebbe più intensa.

**Approfondimenti aggiunti.** Il modulo di meteorologia è stato ampliato in modo
sostanziale sulla parte METAR: le slide si fermavano a due esempi commentati,
qui trovi la trattazione di tutti i gruppi, la tabella dei codici di tempo
presente, i codici ICAO degli aeroporti italiani, la conversione oraria con il
tranello dell'ora legale, il TAF e il decodificatore interattivo. È nuovo anche
il modulo sullo spazio aereo, che nelle slide era disperso fra procedure
operative e lettura mappe.

**Verifiche.** Dati e procedure italiane sono stati controllati su fonti
pubbliche aggiornate al 2026. La normativa cambia: prima di pubblicare, vale la
pena una rilettura dei numeri d'esame e delle tariffe su enac.gov.it.

---

## Avvertenza

Il portale porta in fondo a ogni pagina una nota che chiarisce la natura non
ufficiale del materiale e rimanda a ENAC, D-Flight ed EASA. Vale la pena
lasciarla: è materiale di studio, non un documento normativo.

---

## Sfondo e animazione dell'hero

Lo sfondo è una carta batimetrica immaginaria generata da `design/sfondo.py`: un
campo scalare costruito da sorgenti gaussiane, letto per curve di livello e
attenuato verso sinistra perché il testo resti leggibile.

Sopra corre un livello SVG. Al caricamento si disegnano le quattro soglie
altimetriche delle zone geografiche italiane, ciascuna nel proprio colore D-Flight,
sotto una maschera radiale che le fa ritirare al centro dove sta il testo. Poi
compare la rotta tratteggiata e un piccolo quadricottero, visto dall'alto come si
conviene a una carta, che la percorre in trentaquattro secondi: eliche che girano a
coppie contrapposte, oscillazione lenta sull'asse di rollio, ombra che respira sulla
carta e luce di posizione che lampeggia. Vola nella fascia bassa dell'hero, sotto il
blocco di testo, e sale verso destra. Con `prefers-reduced-motion` attivo tutto si
ferma e resta il disegno statico.

Il payoff, "Il volo comincia a terra.", sta per ora nel piede di tutte le pagine.
Si cambia in una riga sola, la costante `PAYOFF` in `assets/shell.js`.

---

## Percorsi configurati

| Cosa | Dove |
|---|---|
| Sito | `https://www.gioriva.it/groundschool/` |
| Foto e video | `https://gioriva.github.io/album/groundschool/` |
| Google Analytics | `G-1ZCCJ6QBR4`, caricato solo dopo il consenso |
| Modulo contatti | Formspree `xeajpyrv` |

I collegamenti fra le pagine sono tutti relativi, quindi la cartella si può
spostare senza toccare il codice. Gli unici indirizzi assoluti stanno nei meta tag
di condivisione, in testa a ciascun file HTML, e nella costante `MEDIA_BASE` di
`assets/app.js` per i media.
