/* Drone School · modulo di meteorologia (percorso A2) */

window.MODULI_METEO = [
{
  id: 'meteorologia',
  num: 'X',
  titolo: 'Meteorologia',
  area: 'meteorologia',
  percorsi: ['a2'],
  durata: 55,
  sommario: 'Temperatura, pressione, vento, nubi e nebbia. Poi la lettura completa di un METAR, gruppo per gruppo, con il decodificatore interattivo.',
  sezioni: [
    {
      id: 'temperatura',
      titolo: 'Temperatura',
      html: `
<p>La temperatura misura il grado di calore dell'aria, espresso in gradi Celsius. Il riscaldamento non arriva direttamente dal sole: i raggi scaldano la superficie terrestre, e la superficie scalda l'aria dal basso.</p>
<p>L'angolo con cui la luce colpisce il suolo decide quanta energia arriva per unità di superficie. In estate il sole è alto e l'energia si concentra, in inverno è basso e la stessa quantità di luce si distribuisce su un'area maggiore.</p>
<h3>Gradiente verticale</h3>
<p>Salendo, l'aria si raffredda. Il valore da ricordare: circa <b>2 °C ogni 1000 piedi</b>, pari a circa 0,65 °C ogni 100 metri nell'atmosfera standard. A 120 metri di quota fa quindi meno di un grado in meno rispetto al suolo, una differenza trascurabile per il volo ma utile per capire come si formano le nubi.</p>
<h3>Variazione diurna</h3>
<p>L'andamento della temperatura nell'arco della giornata segue uno schema regolare. Il minimo si registra circa <b>un'ora dopo l'alba</b>, perché il suolo continua a cedere calore anche dopo il sorgere del sole. Il massimo arriva circa <b>due ore dopo il passaggio del sole al punto più alto</b>.</p>
<p>Il cielo sereno amplifica l'escursione: senza nubi il calore accumulato di giorno si disperde rapidamente di notte. Una notte limpida è più fredda di una notte coperta, a parità di massa d'aria.</p>
<h3>Acqua e città</h3>
<p>L'acqua è un conduttore di calore: impiega più tempo a scaldarsi rispetto alla terraferma, ma anche più tempo a raffreddarsi. È il motivo per cui i grandi laghi mitigano le temperature delle sponde e generano circolazioni locali.</p>
<p>Le città sono più calde delle campagne circostanti, soprattutto di notte. Cemento, asfalto e pietra assorbono e restituiscono calore, mentre gli edifici bloccano il vento. Il fenomeno si chiama <b>isola di calore urbana</b>.</p>
<div class="nota esame">
<span class="eyebrow">Unità di misura</span>
<p>Nell'aviazione internazionale le quote si esprimono in piedi. Un piede vale 0,3048 metri, quindi 1000 piedi corrispondono a circa 305 metri. All'esame ti aspetta almeno una domanda con le quote in piedi.</p>
</div>`
    },
    {
      id: 'pressione',
      titolo: 'Pressione atmosferica',
      html: `
<p>L'aria è una miscela di gas: azoto, ossigeno, vapore acqueo, anidride carbonica. La pressione atmosferica è il peso della colonna d'aria che poggia su una superficie di un metro quadrato e si estende fino al limite dell'atmosfera.</p>
<p>Si esprime in <b>ettopascal (hPa)</b> o in millibar, che sono numericamente equivalenti. La pressione standard al livello del mare vale <b>1013,25 hPa</b>.</p>
<h3>Convezione, divergenza, subsidenza</h3>
<p>L'aria riscaldata dal basso si espande e sale: questo movimento si chiama <b>convezione</b>. Attorno ai 12-13 km di quota la risalita si esaurisce e l'aria si allontana lateralmente, fenomeno chiamato <b>divergenza</b>, tipico delle aree di <b>bassa pressione</b>, indicate con la lettera <b>L</b>.</p>
<p>L'aria che si raffredda scende verso il suolo: è la <b>subsidenza</b>, tipica delle aree di <b>alta pressione</b>, indicate con la lettera <b>H</b>. L'aria che scende si comprime e si riscalda, quindi le nubi si dissolvono: ecco perché l'alta pressione porta bel tempo.</p>
<figure>
<svg viewBox="0 0 660 250" role="img" aria-label="Confronto fra bassa e alta pressione">
  <g font-family="var(--dato), monospace" font-size="11" letter-spacing="1.6">
    <text x="60" y="24" fill="var(--z-celeste)">L · BASSA PRESSIONE</text>
    <text x="400" y="24" fill="var(--z-arancione)">H · ALTA PRESSIONE</text>
  </g>
  <line x1="30" y1="216" x2="630" y2="216" stroke="var(--linea-forte)" stroke-width="1.5"/>
  <g stroke="var(--z-celeste)" stroke-width="2" fill="none" marker-end="url(#up)">
    <defs>
      <marker id="up" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--z-celeste)"/></marker>
      <marker id="dn" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--z-arancione)"/></marker>
    </defs>
    <line x1="100" y1="214" x2="100" y2="80"/><line x1="140" y1="214" x2="140" y2="80"/><line x1="180" y1="214" x2="180" y2="80"/>
  </g>
  <g stroke="var(--z-celeste)" stroke-width="2" fill="none" marker-end="url(#up)">
    <path d="M140 80 C140 60 100 60 70 60" transform="translate(0,0)"/>
    <path d="M140 80 C140 60 180 60 210 60"/>
  </g>
  <ellipse cx="140" cy="76" rx="76" ry="22" fill="var(--grigio)" opacity=".22"/>
  <text x="140" y="240" font-family="var(--testo), sans-serif" font-size="12" fill="var(--inchiostro)" text-anchor="middle">convezione, poi divergenza in quota</text>
  <g stroke="var(--z-arancione)" stroke-width="2" fill="none" marker-end="url(#dn)">
    <line x1="440" y1="70" x2="440" y2="200"/><line x1="480" y1="70" x2="480" y2="200"/><line x1="520" y1="70" x2="520" y2="200"/>
  </g>
  <g stroke="var(--z-arancione)" stroke-width="2" fill="none" marker-end="url(#dn)">
    <path d="M480 200 C480 210 440 210 400 210"/><path d="M480 200 C480 210 520 210 560 210"/>
  </g>
  <circle cx="480" cy="60" r="16" fill="var(--z-gialla)" opacity=".65"/>
  <text x="480" y="240" font-family="var(--testo), sans-serif" font-size="12" fill="var(--inchiostro)" text-anchor="middle">subsidenza, cielo sereno</text>
</svg>
<figcaption>Nella bassa pressione l'aria sale e si formano nubi. Nell'alta pressione scende, si comprime e il cielo si schiarisce.</figcaption>
</figure>
<h3>Aree particolari</h3>
<ul>
<li><b>Saccatura</b>: propaggine di un'area di bassa pressione. Aria instabile, tempo perturbato.</li>
<li><b>Promontorio</b>: propaggine di un'area di alta pressione. Tempo stabile e buono.</li>
<li><b>Sella</b>: punto compreso fra due aree di alta e due di bassa pressione. Tempo calmo e generalmente buono.</li>
</ul>
<p>La maggior parte dei fenomeni meteorologici avviene nella <b>troposfera</b>, lo strato più basso dell'atmosfera.</p>`
    },
    {
      id: 'vento',
      titolo: 'Vento',
      html: `
<p>Il vento è aria che si sposta da un'area di alta a una di bassa pressione. La sua direzione dipende dalla posizione dei centri di pressione e cambia di continuo.</p>
<h3>Isobare</h3>
<p>Un'isobara è una linea che unisce punti di uguale pressione. Il loro spaziamento racconta l'intensità del vento: <b>isobare vicine significano vento forte</b>, isobare distanti vento debole. Nella bassa pressione il valore cala verso il centro, sotto 1013 hPa; nell'alta pressione accade il contrario.</p>
<h3>Legge di Buys Ballot e rotazione</h3>
<p>Nell'emisfero nord il vento ruota <b>in senso antiorario</b> attorno a una bassa pressione, che si chiama circolazione <b>ciclonica</b>, e <b>in senso orario</b> attorno a un'alta pressione, circolazione <b>anticiclonica</b>. La rotazione terrestre devia il flusso verso destra.</p>
<p>Salendo, l'attrito con il suolo diminuisce: ogni 1000 piedi la direzione ruota di circa 5 gradi e la velocità aumenta di circa 5 nodi.</p>
<h3>Direzione del vento</h3>
<p>La direzione indica sempre <b>da dove</b> il vento proviene, non dove va. Un vento da 270 gradi arriva da ovest e soffia verso est.</p>
<figure>
<svg viewBox="0 0 420 420" role="img" aria-label="Rosa dei venti con gradi e denominazioni">
  <circle cx="210" cy="210" r="150" fill="none" stroke="var(--linea)"/>
  <circle cx="210" cy="210" r="118" fill="none" stroke="var(--linea)" stroke-dasharray="2 5"/>
  <g stroke="var(--linea-forte)">
    <line x1="210" y1="52" x2="210" y2="368"/><line x1="52" y1="210" x2="368" y2="210"/>
  </g>
  <g stroke="var(--linea)" stroke-dasharray="3 4">
    <line x1="98" y1="98" x2="322" y2="322"/><line x1="322" y1="98" x2="98" y2="322"/>
  </g>
  <g font-family="var(--dato), monospace" font-size="13" fill="var(--ottone)" text-anchor="middle" letter-spacing="1.4">
    <text x="210" y="34">N · 360</text><text x="210" y="398">S · 180</text>
    <text x="392" y="215">E · 090</text><text x="28" y="215">W · 270</text>
  </g>
  <g font-family="var(--dato), monospace" font-size="10.5" fill="var(--grigio)" text-anchor="middle" letter-spacing="1.2">
    <text x="330" y="88">NE 045</text><text x="330" y="344">SE 135</text>
    <text x="90" y="344">SW 225</text><text x="90" y="88">NW 315</text>
  </g>
  <g stroke="var(--ottone)" stroke-width="2.5" marker-end="url(#wv)">
    <defs><marker id="wv" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="var(--ottone)"/></marker></defs>
    <line x1="76" y1="210" x2="196" y2="210"/>
  </g>
  <text x="136" y="196" font-family="var(--dato), monospace" font-size="10" fill="var(--ottone)" text-anchor="middle">270°</text>
  <text x="210" y="248" font-family="var(--testo), sans-serif" font-size="12.5" fill="var(--inchiostro)" text-anchor="middle">vento da ovest</text>
</svg>
<figcaption>Rosa dei venti. In un METAR la direzione è espressa in gradi: devi saperla tradurre a parole.</figcaption>
</figure>
<div class="tab-wrap"><table>
<thead><tr><th>Gradi</th><th>Provenienza</th><th>Gradi</th><th>Provenienza</th></tr></thead>
<tbody>
<tr><td>360 o 000</td><td>Nord</td><td>180</td><td>Sud</td></tr>
<tr><td>045</td><td>Nord-est</td><td>225</td><td>Sud-ovest</td></tr>
<tr><td>090</td><td>Est</td><td>270</td><td>Ovest</td></tr>
<tr><td>135</td><td>Sud-est</td><td>315</td><td>Nord-ovest</td></tr>
</tbody></table></div>
<div class="nota esame">
<span class="eyebrow">Metodo rapido</span>
<p>Dividi i gradi per 45 e arrotonda: 0 nord, 1 nord-est, 2 est, 3 sud-est, 4 sud, 5 sud-ovest, 6 ovest, 7 nord-ovest. Con 270 gradi ottieni 6, quindi ovest.</p>
</div>`
    },
    {
      id: 'tipi-vento',
      titolo: 'Tipi di vento e turbolenza',
      html: `
<h3>Brezze</h3>
<p>La <b>brezza di mare</b> (o di lago) soffia dall'acqua verso terra durante il giorno: la terraferma si scalda più in fretta, l'aria sale e crea una bassa pressione locale che richiama aria dall'acqua. La <b>brezza di terra</b> è il fenomeno inverso, di notte, quando la terra si raffredda più rapidamente dell'acqua.</p>
<p>Nelle valli alpine il ciclo è simile: <b>brezza di valle</b> che risale i versanti di giorno, <b>brezza di monte</b> che scende di notte. Chi vola sui laghi prealpini conosce bene la regolarità di questi cicli e il momento in cui cambiano segno.</p>
<h3>Wind shear</h3>
<p>Il <b>gradiente del vento</b> è una variazione improvvisa di direzione e intensità del vento. Si genera in prossimità di nubi temporalesche, ai bordi delle correnti discendenti e nella scia di aeromobili. Per un multirotore leggero è una delle condizioni più insidiose, perché la correzione automatica arriva sempre con un ritardo.</p>
<h3>Turbolenza</h3>
<p>Un flusso d'aria che incontra un ostacolo si scompone in vortici. Al suolo si parla di vortici, in montagna di <b>rotori</b>. La turbolenza è più marcata sottovento agli edifici, ai filari di alberi e ai crinali.</p>
<h3>Raffiche</h3>
<p>Le raffiche (<b>gust</b>) sono brevi accelerazioni del vento. In un METAR compaiono con la lettera G. Nel decollo e nell'atterraggio contano più della velocità media, perché è la raffica a far perdere il controllo.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Forza Beaufort</th><th>Nodi</th><th>m/s</th><th>Effetto sull'operazione</th></tr></thead>
<tbody>
<tr><td>0-2</td><td>0-6</td><td>0-3</td><td>Condizioni ideali</td></tr>
<tr><td>3</td><td>7-10</td><td>3,5-5</td><td>Il controllo inizia a farsi sentire, soprattutto senza assistenza satellitare</td></tr>
<tr><td>4</td><td>11-16</td><td>5,5-8</td><td>Limite superiore per la maggior parte dei droni consumer</td></tr>
<tr><td>5</td><td>17-21</td><td>8,5-10,5</td><td>Operazione non più responsabile</td></tr>
<tr><td>6 e oltre</td><td>22+</td><td>11+</td><td>Volo da escludere</td></tr>
</tbody></table></div>
<div class="nota esame">
<span class="eyebrow">Conversioni da ricordare</span>
<p>1 nodo corrisponde a circa 0,5 metri al secondo. Oltre i 10 metri al secondo, cioè circa 20 nodi, pilotare un UAS non è più sicuro. La velocità del vento e la forza del vento sono due grandezze diverse: la prima si misura, la seconda è una scala descrittiva.</p>
</div>`
    },
    {
      id: 'nubi',
      titolo: 'Nubi, nebbia e punto di rugiada',
      html: `
<p>Un volume d'aria può contenere solo una certa quantità di acqua allo stato di vapore, e il limite dipende dalla temperatura: più l'aria è calda, più vapore trattiene. Quando l'aria si raffredda fino alla temperatura in cui il vapore inizia a condensare, si raggiunge il <b>punto di rugiada</b>.</p>
<div class="nota">
<span class="eyebrow">Lo spread</span>
<p>La differenza fra temperatura e punto di rugiada si chiama spread ed è il dato più utile che leggi in un METAR. Uno spread ampio significa aria secca e cielo limpido. Uno spread sotto i 2-3 gradi significa aria vicina alla saturazione: nebbia, foschia e nubi basse sono probabili nelle ore successive, soprattutto se la temperatura sta scendendo.</p>
</div>
<h3>Nubi da conoscere</h3>
<ul>
<li><b>Cumuli</b>: nubi spesse e bianche a forma di cavolfiore, base sotto i 7000 piedi. Segnalano convezione e possono dare piogge deboli. Sotto un cumulo l'aria sale, ai bordi scende.</li>
<li><b>Cumulonembi</b>: le nubi temporalesche. Durata da 30 a 90 minuti, diametro medio attorno ai 15 km, sviluppo verticale che può superare i 10 km. Producono raffiche violente, wind shear, grandine e fulmini. Non si vola nelle vicinanze, neanche quando la cellula sembra lontana.</li>
</ul>
<p>In inverno l'attenzione va alla formazione di ghiaccio sulle eliche: modifica il profilo, aumenta la massa e riduce la portanza.</p>
<figure data-src="08-nubi.png" data-cap="Base delle nubi in centinaia di piedi e copertura in ottavi di cielo."></figure>
<h3>Nebbia</h3>
<p>Si parla di nebbia quando la visibilità orizzontale scende sotto i <b>1000 metri</b>. L'umidità relativa in nebbia è compresa fra l'80 e il 100%. Con visibilità inferiore a 1500 metri le condizioni non sono più VMC nello spazio aereo di classe G, quindi non si vola.</p>
<figure data-src="09-spread.png" data-cap="Temperatura e punto di rugiada nell'arco di una giornata: quando le due curve si toccano, l'aria condensa."></figure>
<div class="tab-wrap"><table>
<thead><tr><th>Tipo di nebbia</th><th>Come si forma</th></tr></thead>
<tbody>
<tr><td><b>Da irraggiamento</b></td><td>Il suolo si raffredda rapidamente in una notte serena e poco ventosa, lo strato d'aria a contatto scende sotto il punto di rugiada. È la nebbia più comune nella Pianura Padana.</td></tr>
<tr><td><b>Da avvezione</b></td><td>Aria umida e relativamente mite scorre su una superficie fredda. Tipica dell'inverno e delle coste.</td></tr>
<tr><td><b>Da evaporazione</b></td><td>Si forma di notte dopo piogge intense: il suolo saturo cede vapore che condensa mentre si raffredda. Richiede vento assente o debole.</td></tr>
<tr><td><b>Da umidificazione</b></td><td>Aria molto fredda scorre su acqua più calda, come un fiume o un lago. La sera terra e aria si raffreddano più in fretta dell'acqua.</td></tr>
<tr><td><b>Frontale</b></td><td>Si forma dove una massa d'aria fredda incontra una massa d'aria calda, lungo il fronte.</td></tr>
<tr><td><b>Marina</b></td><td>Sale improvvisamente dal mare quando aria fredda scorre su acqua più calda, o viceversa.</td></tr>
</tbody></table></div>`
    },
    {
      id: 'copertura',
      titolo: 'Copertura nuvolosa in okta',
      html: `
<p>Nelle osservazioni aeronautiche il cielo viene diviso in otto parti, chiamate <b>okta</b>. Per ogni strato di nubi si riporta quanti ottavi di cielo copre e a quale altezza si trova la base.</p>
<figure>
<svg viewBox="0 0 700 170" role="img" aria-label="Le sigle di copertura nuvolosa espressa in ottavi">
  <g font-family="var(--dato), monospace" font-size="12" letter-spacing="1.4">
  <g transform="translate(30,20)">
    <rect width="88" height="66" fill="none" stroke="var(--linea-forte)"/>
    <text x="44" y="92" fill="var(--ottone)" text-anchor="middle">SKC/CLR</text>
    <text x="44" y="112" fill="var(--grigio)" font-size="10" text-anchor="middle">0 okta</text>
  </g>
  <g transform="translate(160,20)">
    <rect width="88" height="66" fill="none" stroke="var(--linea-forte)"/>
    <rect width="88" height="16" fill="var(--grigio)" opacity=".35"/>
    <text x="44" y="92" fill="var(--ottone)" text-anchor="middle">FEW</text>
    <text x="44" y="112" fill="var(--grigio)" font-size="10" text-anchor="middle">1-2 okta</text>
  </g>
  <g transform="translate(290,20)">
    <rect width="88" height="66" fill="none" stroke="var(--linea-forte)"/>
    <rect width="88" height="33" fill="var(--grigio)" opacity=".35"/>
    <text x="44" y="92" fill="var(--ottone)" text-anchor="middle">SCT</text>
    <text x="44" y="112" fill="var(--grigio)" font-size="10" text-anchor="middle">3-4 okta</text>
  </g>
  <g transform="translate(420,20)">
    <rect width="88" height="66" fill="none" stroke="var(--linea-forte)"/>
    <rect width="88" height="52" fill="var(--grigio)" opacity=".35"/>
    <text x="44" y="92" fill="var(--ottone)" text-anchor="middle">BKN</text>
    <text x="44" y="112" fill="var(--grigio)" font-size="10" text-anchor="middle">5-7 okta</text>
  </g>
  <g transform="translate(550,20)">
    <rect width="88" height="66" fill="none" stroke="var(--linea-forte)"/>
    <rect width="88" height="66" fill="var(--grigio)" opacity=".35"/>
    <text x="44" y="92" fill="var(--ottone)" text-anchor="middle">OVC</text>
    <text x="44" y="112" fill="var(--grigio)" font-size="10" text-anchor="middle">8 okta</text>
  </g>
  </g>
</svg>
<figcaption>Le sigle di copertura. La quota della base si legge moltiplicando per 100 il numero che segue la sigla, in piedi.</figcaption>
</figure>
<p>Il numero di tre cifre che segue la sigla indica la quota della base in centinaia di piedi. <span class="mono">FEW015</span> significa poche nubi con base a 1500 piedi. <span class="mono">BKN033</span> significa cielo prevalentemente coperto con base a 3300 piedi.</p>
<p>Altre sigle che compaiono nelle osservazioni automatiche: <span class="mono">NSC</span> nessuna nube significativa, <span class="mono">NCD</span> nessuna nube rilevata dal sensore, <span class="mono">VV</span> seguito da tre cifre indica visibilità verticale quando il cielo non è discernibile.</p>`
    },
    {
      id: 'servizi',
      titolo: 'Dove trovare le informazioni',
      html: `
<p>A livello internazionale il coordinamento spetta all'<b>Organizzazione meteorologica mondiale</b> (WMO), agenzia delle Nazioni Unite. Ogni Paese ha poi i propri servizi.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Fonte</th><th>Cosa fornisce</th></tr></thead>
<tbody>
<tr><td><b>METAR</b></td><td>Osservazione reale del tempo in un aeroporto, emessa una o due volte all'ora</td></tr>
<tr><td><b>TAF</b></td><td>Previsione per l'area terminale di un aeroporto, su 9, 24 o 30 ore</td></tr>
<tr><td><b>SIGMET</b> e <b>AIRMET</b></td><td>Avvisi su fenomeni pericolosi in rotta</td></tr>
<tr><td><b>ATIS</b></td><td>Servizio automatico di informazione d'aeroporto, trasmesso via radio in continuo</td></tr>
<tr><td><b>VOLMET</b></td><td>Bollettini meteorologici radiodiffusi per gli aeromobili in volo</td></tr>
</tbody></table></div>
<h3>Applicazioni utili in Italia</h3>
<ul>
<li>Radar delle precipitazioni per i temporali in avvicinamento nelle ore successive.</li>
<li>Applicazioni di modellistica del vento per direzione e intensità al suolo e in quota.</li>
<li>Applicazioni dedicate ai droni che aggregano vento, precipitazioni, numero di satelliti visibili e <b>indice Kp</b>.</li>
<li>Il servizio meteorologico dell'Aeronautica Militare per METAR e TAF italiani.</li>
</ul>
<div class="nota">
<span class="eyebrow">Un dato che vale i tre minuti che costa</span>
<p>Il METAR dell'aeroporto più vicino non descrive esattamente il tuo campo, ma ti dà tre informazioni affidabili: vento reale misurato, visibilità e spread fra temperatura e punto di rugiada. Sono i tre parametri che decidono se il volo si fa.</p>
</div>`
    },
    {
      id: 'metar-intro',
      titolo: 'METAR, il rapporto meteorologico d\'aeroporto',
      html: `
<p><b>METAR</b> sta per METeorological Aerodrome Report. È un'osservazione reale delle condizioni presenti in una stazione aeroportuale, non una previsione. Viene prodotto una o due volte all'ora, di norma al minuto 20 e al minuto 50, e resta valido fino all'emissione successiva.</p>
<p>Il formato è codificato a livello internazionale, quindi lo stesso schema vale a Malpensa e a Tokyo. Una volta imparata la struttura, la lettura richiede pochi secondi.</p>
<figure>
<svg viewBox="0 0 760 230" role="img" aria-label="Anatomia di un messaggio METAR con i suoi gruppi">
  <text x="20" y="46" font-family="var(--dato), monospace" font-size="17" letter-spacing="1" fill="var(--inchiostro)">
    <tspan fill="var(--ottone)">METAR</tspan> <tspan>LIMC</tspan> <tspan>170850Z</tspan> <tspan>27012G22KT</tspan> <tspan>230V300</tspan>
  </text>
  <text x="20" y="76" font-family="var(--dato), monospace" font-size="17" letter-spacing="1" fill="var(--inchiostro)">
    <tspan>9999</tspan> <tspan>FEW015</tspan> <tspan>BKN040</tspan> <tspan>18/13</tspan> <tspan>Q1018</tspan> <tspan>NOSIG=</tspan>
  </text>
  <g stroke="var(--ottone)" stroke-width="1" opacity=".65">
    <line x1="96" y1="54" x2="96" y2="98"/><line x1="180" y1="54" x2="180" y2="118"/>
    <line x1="290" y1="54" x2="290" y2="138"/><line x1="420" y1="54" x2="420" y2="158"/>
    <line x1="60" y1="84" x2="60" y2="178"/><line x1="140" y1="84" x2="140" y2="198"/>
    <line x1="330" y1="84" x2="330" y2="178"/><line x1="420" y1="84" x2="420" y2="198"/>
    <line x1="520" y1="84" x2="520" y2="218"/>
  </g>
  <g font-family="var(--dato), monospace" font-size="10.5" fill="var(--grigio)" letter-spacing="1.2">
    <text x="102" y="102">1 · STAZIONE ICAO</text>
    <text x="186" y="122">2 · GIORNO E ORA ZULU</text>
    <text x="296" y="142">3 · VENTO CON RAFFICA</text>
    <text x="426" y="162">4 · DIREZIONE VARIABILE</text>
    <text x="66" y="182">5 · VISIBILITÀ</text>
    <text x="146" y="202">6 · NUBI, DUE STRATI</text>
    <text x="336" y="182">7 · TEMPERATURA / RUGIADA</text>
    <text x="426" y="202">8 · QNH</text>
    <text x="526" y="222">9 · TENDENZA</text>
  </g>
</svg>
<figcaption>I nove gruppi essenziali di un METAR. L'uguale finale chiude il messaggio.</figcaption>
</figure>`
    },
    {
      id: 'metar-gruppi',
      titolo: 'I gruppi del METAR, uno per uno',
      html: `
<h3>1 · Identificativo della stazione</h3>
<p>Quattro lettere secondo il codice ICAO. La prima identifica l'area geografica, la seconda il Paese, le ultime due l'aeroporto. Tutti gli aeroporti italiani iniziano con <span class="mono">LI</span>.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Codice</th><th>Aeroporto</th><th>Codice</th><th>Aeroporto</th></tr></thead>
<tbody>
<tr><td><b>LIMC</b></td><td>Milano Malpensa</td><td><b>LIRF</b></td><td>Roma Fiumicino</td></tr>
<tr><td><b>LIML</b></td><td>Milano Linate</td><td><b>LIRA</b></td><td>Roma Ciampino</td></tr>
<tr><td><b>LIME</b></td><td>Bergamo Orio al Serio</td><td><b>LIPZ</b></td><td>Venezia Tessera</td></tr>
<tr><td><b>LIMF</b></td><td>Torino Caselle</td><td><b>LIPE</b></td><td>Bologna Borgo Panigale</td></tr>
<tr><td><b>LIMJ</b></td><td>Genova Sestri</td><td><b>LIPX</b></td><td>Verona Villafranca</td></tr>
<tr><td><b>LIRN</b></td><td>Napoli Capodichino</td><td><b>LICC</b></td><td>Catania Fontanarossa</td></tr>
</tbody></table></div>
<h3>2 · Giorno e ora</h3>
<p>Sei cifre seguite da <span class="mono">Z</span>: le prime due indicano il giorno del mese, le altre quattro l'ora in <b>tempo Zulu</b>, cioè UTC. <span class="mono">170850Z</span> significa giorno 17, ore 08:50 UTC.</p>
<div class="nota esame">
<span class="eyebrow">Conversione oraria</span>
<p>L'Italia è su CET, cioè UTC+1 in orario solare e UTC+2 in orario legale. Un METAR delle 08:50Z corrisponde alle 09:50 in inverno e alle 10:50 in estate. Il passaggio all'ora legale avviene l'ultima domenica di marzo, il ritorno all'ora solare l'ultima domenica di ottobre. Le domande d'esame giocano quasi sempre su questa conversione.</p>
</div>
<h3>3 · Vento</h3>
<p>Cinque cifre seguite dall'unità: le prime tre sono la direzione di provenienza in gradi rispetto al nord vero, le successive due la velocità. L'unità è quasi sempre <span class="mono">KT</span>, nodi, ma può essere <span class="mono">MPS</span>, metri al secondo.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Codice</th><th>Lettura</th></tr></thead>
<tbody>
<tr><td><span class="mono">27012KT</span></td><td>Vento da 270 gradi, cioè da ovest, a 12 nodi</td></tr>
<tr><td><span class="mono">27012G22KT</span></td><td>Come sopra, con raffiche fino a 22 nodi. G sta per gust</td></tr>
<tr><td><span class="mono">VRB03KT</span></td><td>Direzione variabile, non determinabile, 3 nodi. VRB si usa con vento debole</td></tr>
<tr><td><span class="mono">00000KT</span></td><td>Calma di vento</td></tr>
<tr><td><span class="mono">230V300</span></td><td>Gruppo aggiuntivo: la direzione oscilla fra 230 e 300 gradi</td></tr>
<tr><td><span class="mono">P99KT</span></td><td>Velocità superiore a 99 nodi</td></tr>
</tbody></table></div>
<h3>4 · Visibilità</h3>
<p>Quattro cifre che esprimono la visibilità orizzontale prevalente in metri.</p>
<ul>
<li><span class="mono">9999</span> significa visibilità pari o superiore a 10 chilometri.</li>
<li><span class="mono">0800</span> significa 800 metri, quindi nebbia.</li>
<li><span class="mono">0000</span> significa visibilità inferiore a 50 metri.</li>
<li>Un secondo gruppo con una direzione, per esempio <span class="mono">2000SW</span>, indica la visibilità minima in quel settore.</li>
</ul>
<p>Nei METAR di alcune stazioni può comparire il gruppo <b>RVR</b>, Runway Visual Range, nella forma <span class="mono">R35L/0600</span>: portata visuale di pista, riferita alla pista indicata. Riguarda gli aeromobili in atterraggio, non le operazioni con droni.</p>
<h3>5 · Tempo presente</h3>
<p>Un codice composto da un eventuale qualificatore di intensità, un descrittore e il fenomeno. Non è richiesto impararlo a memoria per l'esame, ma riconoscerlo aiuta parecchio nella pratica.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Prefisso</th><th>Intensità</th><th>Sigla</th><th>Fenomeno</th></tr></thead>
<tbody>
<tr><td><span class="mono">-</span></td><td>Debole</td><td><span class="mono">RA</span></td><td>Pioggia</td></tr>
<tr><td>nessuno</td><td>Moderato</td><td><span class="mono">SN</span></td><td>Neve</td></tr>
<tr><td><span class="mono">+</span></td><td>Forte</td><td><span class="mono">DZ</span></td><td>Pioviggine</td></tr>
<tr><td><span class="mono">VC</span></td><td>Nelle vicinanze</td><td><span class="mono">GR</span></td><td>Grandine</td></tr>
<tr><td><span class="mono">SH</span></td><td>Rovescio</td><td><span class="mono">FG</span></td><td>Nebbia</td></tr>
<tr><td><span class="mono">TS</span></td><td>Temporale</td><td><span class="mono">BR</span></td><td>Foschia</td></tr>
<tr><td><span class="mono">FZ</span></td><td>Congelantesi</td><td><span class="mono">HZ</span></td><td>Caligine</td></tr>
</tbody></table></div>
<p>I codici si combinano: <span class="mono">+TSRA</span> significa temporale con pioggia forte, <span class="mono">VCSH</span> rovesci nelle vicinanze, <span class="mono">-SHRA</span> rovescio di pioggia debole.</p>
<h3>6 · Nubi</h3>
<p>Sigla di copertura più tre cifre per la quota della base in centinaia di piedi. Possono comparire più strati, in ordine di quota crescente.</p>
<p><span class="mono">FEW015 BKN040</span> significa poche nubi a 1500 piedi e cielo prevalentemente coperto a 4000 piedi.</p>
<p>Se dopo la sigla compare <span class="mono">CB</span> ci sono cumulonembi, se compare <span class="mono">TCU</span> ci sono cumuli torreggianti. Entrambi sono un motivo sufficiente per rinviare l'operazione.</p>
<h3>7 · Temperatura e punto di rugiada</h3>
<p>Due valori separati da una barra, in gradi Celsius. La lettera <span class="mono">M</span> davanti indica un valore negativo.</p>
<ul>
<li><span class="mono">18/13</span>: temperatura 18 °C, punto di rugiada 13 °C, spread di 5 gradi.</li>
<li><span class="mono">02/M01</span>: temperatura 2 °C, punto di rugiada meno 1 °C.</li>
<li><span class="mono">M03/M04</span>: entrambi negativi, spread di un solo grado.</li>
</ul>
<h3>8 · Pressione</h3>
<p>La lettera <span class="mono">Q</span> seguita da quattro cifre indica il <b>QNH</b> in ettopascal: la pressione riportata al livello medio del mare, quella che si imposta sull'altimetro per leggere la quota sul mare. <span class="mono">Q1018</span> significa 1018 hPa.</p>
<p>Nei Paesi anglosassoni si usa la lettera <span class="mono">A</span> con la pressione in pollici di mercurio, per esempio <span class="mono">A2992</span>.</p>
<h3>9 · Tendenza e altri gruppi</h3>
<div class="tab-wrap"><table>
<thead><tr><th>Sigla</th><th>Significato</th></tr></thead>
<tbody>
<tr><td><span class="mono">NOSIG</span></td><td>Nessun cambiamento significativo previsto nelle due ore successive</td></tr>
<tr><td><span class="mono">BECMG</span></td><td>Cambiamento graduale in atto</td></tr>
<tr><td><span class="mono">TEMPO</span></td><td>Variazioni temporanee di durata inferiore a un'ora</td></tr>
<tr><td><span class="mono">AUTO</span></td><td>Osservazione prodotta da sistemi automatici, senza intervento umano</td></tr>
<tr><td><span class="mono">COR</span></td><td>Messaggio corretto rispetto a un'emissione precedente</td></tr>
<tr><td><span class="mono">RE</span> seguito da un fenomeno</td><td>Tempo recente, per esempio RERA pioggia recente</td></tr>
<tr><td><span class="mono">WS</span></td><td>Wind shear segnalato</td></tr>
<tr><td><span class="mono">NSW</span></td><td>Fine del fenomeno significativo</td></tr>
<tr><td><span class="mono">=</span></td><td>Fine del messaggio</td></tr>
</tbody></table></div>
<h3>CAVOK</h3>
<p><span class="mono">CAVOK</span>, Ceiling And Visibility OK, sostituisce in un colpo solo i gruppi di visibilità, tempo presente e nubi. Compare quando ricorrono tutte queste condizioni:</p>
<ul>
<li>visibilità pari o superiore a 10 chilometri;</li>
<li>nessuna nube al di sotto di 5000 piedi o al di sotto della minima altitudine di settore, se più alta;</li>
<li>nessun cumulonembo né cumulo torreggiante a qualsiasi quota;</li>
<li>nessun fenomeno meteorologico significativo in atto.</li>
</ul>
<p>Con <span class="mono">SKC</span> o <span class="mono">CLR</span>, cielo sereno, non tutte le condizioni di CAVOK sono necessariamente soddisfatte: la visibilità potrebbe comunque essere ridotta.</p>`
    },
    {
      id: 'metar-decoder',
      titolo: 'Decodificatore METAR',
      html: `
<p>Incolla un METAR reale, oppure scegli uno degli esempi, e il decodificatore lo scompone gruppo per gruppo. In fondo trovi una lettura sintetica orientata al volo con drone.</p>
<div id="metar-tool"></div>
<div class="nota attenzione">
<span class="eyebrow">Come usarlo</span>
<p>Il verdetto operativo è un aiuto allo studio, non un'autorizzazione. Il METAR descrive un aeroporto a una certa ora, non il campo dove stai per decollare, e non dice nulla sulle zone geografiche. La responsabilità della decisione resta del pilota.</p>
</div>`
    },
    {
      id: 'metar-esercizi',
      titolo: 'Leggere un METAR sotto esame',
      html: `
<p>Le domande d'esame seguono quasi sempre lo stesso schema: ti danno un METAR e ti chiedono un singolo dato. Ecco come arrivarci in pochi secondi.</p>
<div class="nota">
<span class="eyebrow">Esempio</span>
<p><span class="mono">METAR LIMC 011525Z 27015KT 230V290 9999 FEW038 18/09 Q1016 NOSIG=</span></p>
</div>
<div class="tab-wrap"><table>
<thead><tr><th>Domanda</th><th>Dove guardare</th><th>Risposta</th></tr></thead>
<tbody>
<tr><td>Da dove viene il vento, a parole?</td><td>Prime tre cifre del gruppo vento: 270</td><td>Da ovest</td></tr>
<tr><td>Qual è la velocità del vento?</td><td>Due cifre successive: 15</td><td>15 nodi, circa 7,5 m/s</td></tr>
<tr><td>A che quota sono le nubi?</td><td>FEW038, cioè 38 per 100</td><td>3800 piedi</td></tr>
<tr><td>Qual è lo spread?</td><td>18 meno 9</td><td>9 gradi, aria secca</td></tr>
<tr><td>Che ora è in Italia in estate?</td><td>15:25Z più due ore</td><td>17:25 locali</td></tr>
<tr><td>Qual è la pressione?</td><td>Q1016</td><td>1016 hPa, sopra la standard di 1013,25</td></tr>
</tbody></table></div>
<h3>Un secondo esempio, più insidioso</h3>
<div class="nota">
<span class="eyebrow">Esempio</span>
<p><span class="mono">METAR LIME 240620Z AUTO VRB02KT 0500 FG VV002 M01/M01 Q1024=</span></p>
</div>
<p>Qui il quadro cambia completamente. <span class="mono">AUTO</span> indica una stazione automatica. Il vento è calmo e variabile. La visibilità è di <b>500 metri</b> con nebbia (<span class="mono">FG</span>). <span class="mono">VV002</span> segnala visibilità verticale di 200 piedi, quindi il cielo non è discernibile. Temperatura e punto di rugiada coincidono a meno un grado: spread zero, aria completamente satura. Il volo non si fa, e non si farà nelle ore immediatamente successive.</p>
<h3>TAF, la previsione</h3>
<p>Il <b>TAF</b>, Terminal Aerodrome Forecast, usa la stessa codifica del METAR ma descrive una previsione per un periodo di validità, indicato con un gruppo come <span class="mono">1706/1806</span>: dal giorno 17 alle 06Z al giorno 18 alle 06Z. Al suo interno compaiono blocchi <span class="mono">BECMG</span>, <span class="mono">TEMPO</span> e <span class="mono">PROB30</span> o <span class="mono">PROB40</span>, che indicano la probabilità percentuale di un certo scenario.</p>
<p>Per pianificare un'operazione a distanza di ore, il TAF è più utile del METAR. Per decidere se decollare adesso, il METAR è il dato che conta.</p>
<figure data-src="v03-lettura-metar.mp4" data-cap="Un METAR reale letto gruppo per gruppo, fino alla decisione operativa."></figure>`
    }
  ],
  ricorda: [
    'La pressione standard al livello del mare è 1013,25 hPa.',
    'La temperatura cala di circa 2 °C ogni 1000 piedi di quota.',
    'Il minimo di temperatura si registra circa un ora dopo l alba, il massimo circa due ore dopo il mezzogiorno solare.',
    'Isobare vicine significano vento forte. In emisfero nord il vento gira antiorario attorno alla bassa pressione.',
    'Ogni 1000 piedi il vento ruota di circa 5 gradi e aumenta di circa 5 nodi.',
    'Nebbia: visibilità inferiore a 1000 metri. Umidità relativa fra 80 e 100 per cento.',
    'Un cumulonembo dura da 30 a 90 minuti e ha un diametro medio di circa 15 km.',
    'Okta: FEW 1-2, SCT 3-4, BKN 5-7, OVC 8. La quota si moltiplica per 100 e si legge in piedi.',
    'METAR: METeorological Aerodrome Report, osservazione reale, non previsione.',
    'Nel METAR la direzione del vento indica la provenienza. 9999 significa visibilità pari o superiore a 10 km.',
    'CAVOK: visibilità almeno 10 km, nessuna nube sotto 5000 piedi, nessun CB o TCU, nessun fenomeno significativo.',
    'Zulu è UTC. In Italia CET è UTC+1 in inverno e UTC+2 in orario legale.',
    'Lo spread è la differenza fra temperatura e punto di rugiada: sotto i 2-3 gradi la nebbia è probabile.',
    '1 nodo corrisponde a circa 0,5 m/s. Oltre 10 m/s, circa 20 nodi, non si vola.'
  ],
  quiz: [
    { d: 'Qual è la pressione atmosferica standard al livello del mare?', o: ['1003,25 hPa', '1013,25 hPa', '1023,25 hPa', '1033,25 hPa'], c: 1,
      sp: 'Valore di riferimento dell atmosfera standard internazionale, espresso in ettopascal o millibar.' },
    { d: 'Cosa significa wind shear?', o: ['Vento che cambia improvvisamente direzione e intensità', 'Flusso d\'aria che urta un ostacolo e diventa vortice', 'Breve momento di vento ad alta velocità', 'Vento generato da una bassa pressione locale'], c: 0,
      sp: 'La seconda definizione descrive la turbolenza, la terza le raffiche.' },
    { d: 'Cosa descrive la turbolenza?', o: ['Un cambio improvviso di direzione e forza del vento', 'Un flusso d\'aria che incontra ostacoli e si scompone in vortici', 'Una brezza di valle', 'La subsidenza in area di alta pressione'], c: 1,
      sp: 'Al suolo si parla di vortici, in montagna di rotori.' },
    { d: 'Quando si parla di nebbia?', o: ['Visibilità inferiore a 500 metri', 'Visibilità inferiore a 1000 metri', 'Visibilità inferiore a 1500 metri', 'Visibilità inferiore a 3000 metri'], c: 1,
      sp: 'Sotto i 1000 metri è nebbia. Sotto i 1500 metri non si è comunque più in VMC in classe G.' },
    { d: 'Qual è la durata media di un cumulonembo?', o: ['5 minuti', '20 minuti', '60 minuti', '180 minuti'], c: 2,
      sp: 'Da 30 a 90 minuti, quindi circa un ora, con diametro medio attorno ai 15 km.' },
    { d: 'Che tempo si trova in una sella barica?', o: ['Instabile', 'Instabile e tempestoso', 'Stabile e piovoso', 'Calmo e generalmente buono'], c: 3,
      sp: 'La sella si trova fra due aree di alta e due di bassa pressione: tempo calmo.' },
    { d: 'Che tempo porta un promontorio?', o: ['Instabile', 'Instabile e burrascoso', 'Stabile e piovoso', 'Stabile e buono'], c: 3,
      sp: 'Il promontorio è una propaggine di alta pressione, con aria discendente e cielo sereno.' },
    { d: 'METAR LIMC 171055Z AUTO 27010KT 9999 FEW042 SCT046 10/08 Q1015 NOSIG= Da dove viene il vento?', o: ['Da nord', 'Da est', 'Da sud', 'Da ovest'], c: 3,
      sp: '270 gradi corrisponde a ovest. Ricorda che la direzione indica la provenienza.' },
    { d: 'METAR LIML 011525Z 27015KT 230V290 9999 FEW038 18/09 Q1016 NOSIG= A quale quota si trovano le nubi?', o: ['9999 piedi', '3800 piedi', '1800 piedi', '900 piedi'], c: 1,
      sp: 'FEW038 significa 38 moltiplicato per 100, cioè 3800 piedi.' },
    { d: 'METAR LIME 011525Z 27015KT 9999 FEW038 18/09 Q1016 NOSIG= Qual è la velocità del vento?', o: ['15 nodi', '27 nodi', '9 nodi', '38 nodi'], c: 0,
      sp: 'Le prime tre cifre sono la direzione, le due successive la velocità: 15 nodi, circa 7,5 m/s.' },
    { d: 'Cosa indica il gruppo 230V300 in un METAR?', o: ['Visibilità variabile fra 230 e 300 metri', 'Direzione del vento variabile fra 230 e 300 gradi', 'Velocità del vento fra 230 e 300 nodi', 'Quota delle nubi fra 230 e 300 piedi'], c: 1,
      sp: 'È il gruppo aggiuntivo di variabilità della direzione, che segue il gruppo vento.' },
    { d: 'Cosa significa CAVOK?', o: ['Cielo coperto ma volo consentito', 'Visibilità almeno 10 km, nessuna nube sotto 5000 piedi, nessun fenomeno significativo', 'Osservazione automatica corretta', 'Vento calmo e nessuna raffica'], c: 1,
      sp: 'Ceiling And Visibility OK. Sostituisce i gruppi di visibilità, tempo presente e nubi.' },
    { d: 'Cosa indica la lettera M davanti a un valore di temperatura in un METAR?', o: ['Media', 'Valore in metri', 'Valore negativo', 'Misurazione manuale'], c: 2,
      sp: 'M01 significa meno un grado Celsius.' },
    { d: 'Un METAR riporta 15/14. Cosa suggerisce?', o: ['Aria molto secca', 'Aria prossima alla saturazione, nebbia probabile', 'Vento forte in arrivo', 'Pressione in aumento'], c: 1,
      sp: 'Lo spread è di un solo grado. Se la temperatura scende ancora, la condensazione è quasi certa.' },
    { d: 'Un METAR è emesso alle 08:50Z in luglio. Che ora è in Italia?', o: ['07:50', '08:50', '09:50', '10:50'], c: 3,
      sp: 'In orario legale l Italia è UTC+2, quindi 10:50.' },
    { d: 'Cosa significa la sigla BKN in un METAR?', o: ['1-2 ottavi di copertura', '3-4 ottavi', '5-7 ottavi', '8 ottavi'], c: 2,
      sp: 'FEW 1-2, SCT 3-4, BKN 5-7, OVC 8 ottavi.' },
    { d: 'Cosa indica la sigla Q seguita da quattro cifre?', o: ['La quota della tropopausa', 'Il QNH in ettopascal', 'La qualità dell\'osservazione', 'La visibilità in quarti di miglio'], c: 1,
      sp: 'Q1018 significa 1018 hPa riportati al livello medio del mare.' },
    { d: 'Cosa significa la sigla TEMPO in un messaggio meteorologico?', o: ['Nessun cambiamento previsto', 'Cambiamento graduale', 'Variazioni temporanee di durata inferiore a un\'ora', 'Osservazione automatica'], c: 2,
      sp: 'BECMG indica il cambiamento graduale, NOSIG l assenza di variazioni significative.' },
    { d: 'Ogni 1000 piedi di quota, come cambia il vento?', o: ['Ruota di 5 gradi e aumenta di 5 nodi', 'Ruota di 10 gradi e cala di 5 nodi', 'Resta invariato', 'Inverte la direzione'], c: 0,
      sp: 'Diminuendo l attrito con il suolo il vento accelera e ruota verso destra nell emisfero nord.' },
    { d: 'Di quanto cala la temperatura ogni 1000 piedi?', o: ['0,5 °C', '2 °C', '5 °C', '10 °C'], c: 1,
      sp: 'Circa 2 gradi ogni 1000 piedi, pari a circa 0,65 gradi ogni 100 metri.' }
  ]
}
];
