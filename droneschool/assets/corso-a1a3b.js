/* Drone School · moduli del percorso A1/A3 (parte 2) */

window.MODULI_A1A3B = [

/* ==================================================================== V */
{
  id: 'spazio-aereo',
  num: 'V',
  titolo: 'Spazio aereo e zone geografiche',
  area: 'spazio-aereo',
  percorsi: ['a1a3', 'a2'],
  durata: 30,
  sommario: 'Classi di spazio aereo, CTR e ATZ, il sistema a colori delle zone UAS italiane, NOTAM e lettura della carta aeronautica.',
  sezioni: [
    {
      id: 'classi',
      titolo: 'Come è diviso il cielo',
      html: `
<p>Lo spazio aereo è suddiviso in classi identificate da lettere, dalla A alla G. Per un pilota di droni la distinzione che conta è una sola: <b>controllato</b> oppure <b>non controllato</b>.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Classe</th><th>Tipo</th><th>Rilevanza per l'UAS</th></tr></thead>
<tbody>
<tr><td>A, B, C, D, E</td><td>Controllato</td><td>Servizio di controllo del traffico aereo attivo. In categoria Open non si entra.</td></tr>
<tr><td>F, G</td><td>Non controllato</td><td>La classe G è dove si svolge normalmente l'attività con droni in Open.</td></tr>
</tbody></table></div>
<h3>Volumi da riconoscere</h3>
<ul>
<li><b>CTR</b>, Control Zone: volume controllato attorno a un aeroporto, dal suolo verso l'alto. Protegge gli aeromobili in decollo e atterraggio. In categoria Open non si vola dentro un CTR.</li>
<li><b>CTA</b>, Control Area: area di controllo in quota, protegge salite e discese.</li>
<li><b>TMA</b>, Terminal Manoeuvring Area: area di manovra terminale attorno a uno o più aeroporti.</li>
<li><b>ATZ</b>, Aerodrome Traffic Zone: zona di traffico d'aeroporto, tutela il traffico in prossimità della pista.</li>
<li><b>TMZ</b>, Transponder Mandatory Zone: richiede transponder Mode S a bordo.</li>
<li><b>RMZ</b>, Radio Mandatory Zone: richiede contatto radio bilaterale con l'ente ATS.</li>
<li><b>FIR</b>, Flight Information Region: la grande regione informazioni volo. L'Italia ne ha due, Milano e Roma.</li>
</ul>
<h3>Aree interdette o limitate</h3>
<ul>
<li><b>P</b>, prohibited: volo sempre vietato.</li>
<li><b>R</b>, restricted: volo soggetto a condizioni.</li>
<li><b>D</b>, danger: attività pericolosa in determinati periodi.</li>
<li><b>TSA</b> e <b>TRA</b>: aree temporaneamente segregate o riservate, attive solo in certe fasce orarie.</li>
</ul>`
    },
    {
      id: 'zone-italia',
      titolo: 'Le zone geografiche UAS in Italia',
      html: `
<p>L'articolo 15 del regolamento (UE) 2019/947 consente a ogni Stato di designare zone in cui le operazioni con droni sono vietate, limitate o subordinate a condizioni. In Italia queste zone sono pubblicate su <b>D-Flight</b> e codificate dalla circolare ENAC <b>ATM-09A</b> con un sistema a cinque colori. Ogni colore indica la quota, misurata in metri sul terreno, oltre la quale la categoria Open non è più ammessa.</p>
<figure>
<svg viewBox="0 0 720 300" role="img" aria-label="Le cinque zone geografiche UAS con i rispettivi limiti di quota">
  <defs><style>.zlab{font-family:var(--dato),monospace;font-size:11px;letter-spacing:1.4px}.zq{font-family:var(--dato),monospace;font-size:13px}</style></defs>
  <line x1="60" y1="262" x2="700" y2="262" stroke="var(--linea-forte)" stroke-width="1.5"/>
  <text x="60" y="282" class="zlab" fill="var(--grigio)">SUOLO</text>
  <!-- scala verticale -->
  <g stroke="var(--linea)" stroke-dasharray="2 4">
    <line x1="60" y1="42" x2="700" y2="42"/>
    <line x1="60" y1="152" x2="700" y2="152"/>
    <line x1="60" y1="192" x2="700" y2="192"/>
    <line x1="60" y1="226" x2="700" y2="226"/>
  </g>
  <g class="zlab" fill="var(--grigio)">
    <text x="14" y="46">120 m</text><text x="14" y="156">60 m</text><text x="14" y="196">45 m</text><text x="14" y="230">25 m</text>
  </g>
  <!-- colonne -->
  <g>
    <rect x="80" y="42" width="98" height="220" fill="var(--z-bianca)" stroke="var(--linea-forte)"/>
    <text x="129" y="284" class="zlab" fill="var(--grigio)" text-anchor="middle">BIANCA</text>
    <text x="129" y="34" class="zq" fill="var(--inchiostro)" text-anchor="middle">120 m</text>
  </g>
  <g>
    <rect x="200" y="152" width="98" height="110" fill="var(--z-celeste)" opacity=".85"/>
    <text x="249" y="284" class="zlab" fill="var(--grigio)" text-anchor="middle">CELESTE</text>
    <text x="249" y="144" class="zq" fill="var(--inchiostro)" text-anchor="middle">60 m</text>
  </g>
  <g>
    <rect x="320" y="192" width="98" height="70" fill="var(--z-gialla)" opacity=".9"/>
    <text x="369" y="284" class="zlab" fill="var(--grigio)" text-anchor="middle">GIALLA</text>
    <text x="369" y="184" class="zq" fill="var(--inchiostro)" text-anchor="middle">45 m</text>
  </g>
  <g>
    <rect x="440" y="226" width="98" height="36" fill="var(--z-arancione)" opacity=".9"/>
    <text x="489" y="284" class="zlab" fill="var(--grigio)" text-anchor="middle">ARANCIONE</text>
    <text x="489" y="218" class="zq" fill="var(--inchiostro)" text-anchor="middle">25 m</text>
  </g>
  <g>
    <line x1="560" y1="262" x2="658" y2="262" stroke="var(--z-rossa)" stroke-width="4"/>
    <text x="609" y="284" class="zlab" fill="var(--grigio)" text-anchor="middle">ROSSA</text>
    <text x="609" y="250" class="zq" fill="var(--z-rossa)" text-anchor="middle">0 m</text>
    <text x="609" y="150" class="zlab" fill="var(--z-rossa)" text-anchor="middle">OPEN VIETATA</text>
  </g>
</svg>
<figcaption>Quota massima ammessa in categoria Open per ciascuna zona geografica UAS. Il limite vale allo stesso modo per A1, A2 e A3.</figcaption>
</figure>
<div class="tab-wrap"><table>
<thead><tr><th>Zona</th><th>Limite Open</th><th>Oltre il limite</th></tr></thead>
<tbody>
<tr><td>Bianca</td><td>120 m AGL</td><td>Categoria Specific o Certified con autorizzazione</td></tr>
<tr><td>Celeste</td><td>60 m AGL</td><td>Specific con EU-STS o autorizzazione operativa, più nulla osta</td></tr>
<tr><td>Gialla</td><td>45 m AGL</td><td>Specific con EU-STS o autorizzazione operativa, più nulla osta</td></tr>
<tr><td>Arancione</td><td>25 m AGL</td><td>Specific con EU-STS o autorizzazione operativa, più nulla osta</td></tr>
<tr><td>Rossa</td><td>0 m, volo Open vietato</td><td>Solo autorizzazione operativa ENAC con nulla osta, NOTAM e coordinamento ATS</td></tr>
</tbody></table></div>
<div class="nota attenzione">
<span class="eyebrow">Il punto che sfugge</span>
<p>I limiti di quota delle zone colorate sono identici per A1, A2 e A3. Un C0 da 200 grammi in zona arancione ha lo stesso tetto di 25 metri di un C3 da 20 chili. Le sottocategorie cambiano le distanze dalle persone, non l'altimetria.</p>
</div>`
    },
    {
      id: 'ostacoli',
      titolo: 'L\'eccezione per gli ostacoli artificiali',
      html: `
<p>La circolare ATM-09A prevede una deroga per l'ispezione di strutture verticali, applicabile a tutte le sottocategorie Open.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Zona</th><th>Deroga</th></tr></thead>
<tbody>
<tr><td>Celeste, gialla, arancione</td><td>Entro 50 m di distanza laterale dall'ostacolo si può salire fino a 5 m sopra la sua sommità, anche superando il limite della zona. Serve il permesso del proprietario dell'ostacolo.</td></tr>
<tr><td>Rossa</td><td>Entro 10 m lateralmente e 3 m sopra l'ostacolo, restando oltre 500 m dal sedime aeroportuale. L'operazione resta comunque in categoria Specific.</td></tr>
</tbody></table></div>
<p>Da non confondere con la regola generale della categoria Open, che consente 15 metri sopra un ostacolo più alto di 120 metri entro 50 metri in orizzontale. Sono due deroghe distinte, con presupposti diversi.</p>`
    },
    {
      id: 'notam',
      titolo: 'NOTAM e informazioni aeronautiche',
      html: `
<p>Un <b>NOTAM</b> (Notice to Airmen) è un avviso che comunica una modifica temporanea allo spazio aereo o ai servizi: una zona R istituita per una manifestazione, un'esercitazione militare, un aeroporto chiuso. Viene pubblicato con qualche giorno di anticipo e ha una validità definita.</p>
<p>Le informazioni permanenti stanno invece nell'<b>AIP</b>, Aeronautical Information Publication, il manuale nazionale di informazioni aeronautiche.</p>
<div class="nota italia">
<span class="eyebrow">Prima di ogni volo</span>
<p>D-Flight è l'unico riferimento ufficiale per le zone geografiche UAS in Italia. Una zona può cambiare stato da un giorno all'altro: la verifica va fatta prima del volo, non una volta per tutte.</p>
</div>
<figure data-src="05-zone-geografiche.png" data-cap="Il sistema a colori delle zone geografiche e le quote che ne derivano."></figure>`
    },
    {
      id: 'carta',
      titolo: 'Leggere la carta aeronautica',
      html: `
<p>La carta ICAO in scala 1:500.000 è standardizzata a livello internazionale, quindi la legenda che impari su una carta italiana funziona ovunque. Gli elementi da riconoscere:</p>
<div class="tab-wrap"><table>
<thead><tr><th>Simbolo</th><th>Significato</th></tr></thead>
<tbody>
<tr><td>Linea continua spessa colorata</td><td>Confine di classe di spazio aereo</td></tr>
<tr><td>Tratteggio fitto attorno a un aeroporto</td><td>CTR, zona di controllo</td></tr>
<tr><td>Punteggiato attorno a un aeroporto minore</td><td>ATZ, zona di traffico d'aeroporto</td></tr>
<tr><td>Aree campite con sigla P, R o D</td><td>Zone proibite, regolamentate o pericolose</td></tr>
<tr><td>Simboli a torre con quota in piedi</td><td>Ostacoli: antenne, pale eoliche, ciminiere</td></tr>
<tr><td>Linea verde chiusa</td><td>Area naturale protetta</td></tr>
<tr><td>Simboli specifici</td><td>Eliporti, campi volo, siti per alianti, aree di lancio paracadutisti, campi di aeromodellismo</td></tr>
</tbody></table></div>
<p>Sulle carte le quote degli ostacoli sono espresse in piedi. Un aeroporto controllato si trova sempre dentro un CTR, mentre un campo non controllato può ricadere nel CTR di un aeroporto vicino: la sua presenza non implica libertà di volo.</p>
<figure data-src="06-carta-aeronautica.png" data-cap="I simboli della carta ICAO 1:500.000 che vale la pena riconoscere a colpo d'occhio."></figure>`
    }
  ],
  ricorda: [
    'Le zone geografiche UAS italiane sono pubblicate su D-Flight e codificate dalla circolare ENAC ATM-09A.',
    'Colori e quote: bianca 120 m, celeste 60 m, gialla 45 m, arancione 25 m, rossa volo Open vietato.',
    'I limiti di quota delle zone valgono identici per A1, A2 e A3.',
    'In un CTR non si vola in categoria Open. Un aeroporto controllato si trova sempre dentro un CTR.',
    'Deroga ostacoli in zona celeste, gialla e arancione: entro 50 m lateralmente si sale fino a 5 m sopra la sommità.',
    'NOTAM: avviso temporaneo. AIP: pubblicazione permanente di informazioni aeronautiche.',
    'TMZ richiede transponder Mode S, RMZ richiede contatto radio bilaterale.'
  ],
  quiz: [
    { d: 'Quale quota massima consente la categoria Open in una zona gialla su D-Flight?', o: ['120 m AGL', '60 m AGL', '45 m AGL', '25 m AGL'], c: 2,
      sp: 'Bianca 120, celeste 60, gialla 45, arancione 25, rossa vietata.' },
    { d: 'In zona arancione, un drone C0 in sottocategoria A1 può superare i 25 metri?', o: ['Sì, perché pesa meno di 250 grammi', 'No, il limite di quota è identico per tutte le sottocategorie', 'Sì, fino a 60 metri', 'Sì, con autocertificazione'], c: 1,
      sp: 'Le sottocategorie regolano le distanze dalle persone. I limiti altimetrici delle zone si applicano a tutte allo stesso modo.' },
    { d: 'Cosa indica la sigla CTR?', o: ['Control Area', 'Control Zone, volume controllato attorno a un aeroporto dal suolo', 'Controlled Traffic Route', 'Certified Take-off Range'], c: 1,
      sp: 'In categoria Open non si vola dentro un CTR. Un aeroporto controllato ne è sempre dotato.' },
    { d: 'Cosa richiede una TMZ?', o: ['Contatto radio bilaterale', 'Transponder Mode S a bordo', 'Piano di volo depositato', 'Autorizzazione ENAC'], c: 1,
      sp: 'Transponder Mandatory Zone. La RMZ, Radio Mandatory Zone, richiede invece il contatto radio.' },
    { d: 'Cos\'è un NOTAM?', o: ['Una pubblicazione permanente di informazioni aeronautiche', 'Un avviso su una modifica temporanea dello spazio aereo o dei servizi', 'Un rapporto meteorologico', 'Un certificato di aeronavigabilità'], c: 1,
      sp: 'Notice to Airmen. Le informazioni permanenti stanno nell AIP.' },
    { d: 'Quale sigla identifica una zona in cui il volo è sempre vietato?', o: ['R', 'D', 'P', 'TSA'], c: 2,
      sp: 'P sta per prohibited. R è restricted, D è danger.' },
    { d: 'Qual è il riferimento ufficiale per verificare le zone geografiche UAS in Italia?', o: ['Google Maps', 'D-Flight', 'L\'app del costruttore del drone', 'Il sito EASA'], c: 1,
      sp: 'La geo-consapevolezza integrata nel drone è un supporto, non una fonte ufficiale.' }
  ]
},

/* =================================================================== VI */
{
  id: 'conoscenza-uas',
  num: 'VI',
  titolo: 'Conoscenza generale UAS',
  area: 'tecnica',
  percorsi: ['a1a3'],
  durata: 35,
  sommario: 'Principi del volo, assi e comandi, componenti del multirotore, radiofrequenze, sensori, gestione delle batterie ai polimeri di litio.',
  sezioni: [
    {
      id: 'forze',
      titolo: 'Le quattro forze',
      html: `
<p>Un aeromobile in volo è soggetto a quattro forze. La prima legge di Newton spiega perché conta l'equilibrio fra loro: senza una forza esterna, la velocità di un corpo non cambia.</p>
<figure>
<svg viewBox="0 0 620 300" role="img" aria-label="Le quattro forze agenti su un multirotore in volo">
  <g stroke="var(--ottone)" stroke-width="2" fill="none" marker-end="url(#fr)">
    <defs><marker id="fr" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="var(--ottone)"/></marker></defs>
    <line x1="310" y1="140" x2="310" y2="46"/>
    <line x1="310" y1="160" x2="310" y2="254"/>
    <line x1="330" y1="150" x2="452" y2="150"/>
    <line x1="290" y1="150" x2="168" y2="150"/>
  </g>
  <g fill="var(--grigio)" opacity=".55">
    <rect x="270" y="142" width="80" height="9" rx="4"/>
    <rect x="222" y="132" width="46" height="4" rx="2"/><rect x="352" y="132" width="46" height="4" rx="2"/>
    <circle cx="245" cy="134" r="5"/><circle cx="375" cy="134" r="5"/>
  </g>
  <g font-family="var(--dato), monospace" font-size="11" letter-spacing="1.6" fill="var(--inchiostro)">
    <text x="322" y="42">PORTANZA</text>
    <text x="322" y="272">GRAVITÀ</text>
    <text x="462" y="154">SPINTA</text>
    <text x="60" y="154">RESISTENZA</text>
  </g>
  <text x="310" y="196" font-family="var(--dato), monospace" font-size="10" fill="var(--grigio)" text-anchor="middle">centro di gravità</text>
  <circle cx="310" cy="150" r="4" fill="var(--ottone)"/>
</svg>
<figcaption>Portanza, gravità, spinta e resistenza. Tutti e tre gli assi di rotazione passano per il centro di gravità.</figcaption>
</figure>
<h3>Come genera portanza un multirotore</h3>
<p>Le eliche aspirano aria dall'alto e la espellono verso il basso. La pressione sopra il disco rotore è più bassa di quella sotto: la differenza produce portanza. Perché il rendimento sia buono lo spazio deve essere libero sia sopra sia sotto, motivo per cui volare a ridosso di una parete o troppo vicino al suolo peggiora la stabilità.</p>
<p>Ogni rotore genera vortici. Un multirotore che scende troppo velocemente in verticale può ritrovarsi dentro il proprio flusso discendente, con perdita di portanza e oscillazioni. La soluzione è scendere con una componente di traslazione orizzontale, mai in verticale puro.</p>
<p>Il sistema <b>PID</b> della centralina calcola quanto correggere, e con quale intensità, per mantenere l'assetto stabile.</p>`
    },
    {
      id: 'assi',
      titolo: 'Assi e comandi',
      html: `
<p>La posizione dell'aeromobile nello spazio si descrive rispetto a tre assi, tutti passanti per il centro di gravità.</p>
<ul>
<li><b>Asse verticale</b>: perpendicolare al suolo. La rotazione attorno a esso è l'<b>imbardata</b> (yaw).</li>
<li><b>Asse longitudinale</b>: dalla coda al muso. La rotazione attorno a esso è il <b>rollio</b> (roll).</li>
<li><b>Asse trasversale</b>: da un'estremità all'altra, perpendicolare al longitudinale. La rotazione attorno a esso è il <b>beccheggio</b> (pitch).</li>
</ul>
<figure>
<svg viewBox="0 0 620 260" role="img" aria-label="Configurazione dei comandi in mode 2">
  <g font-family="var(--dato), monospace" font-size="10.5" letter-spacing="1.5">
    <text x="20" y="24" fill="var(--ottone)">MODE 2 · LO STANDARD IN EUROPA</text>
  </g>
  <!-- stick sinistro -->
  <circle cx="170" cy="140" r="66" fill="none" stroke="var(--linea)"/>
  <circle cx="170" cy="140" r="8" fill="var(--ottone)"/>
  <g stroke="var(--ottone)" stroke-width="1.6" marker-end="url(#a2)">
    <defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--ottone)"/></marker></defs>
    <line x1="170" y1="128" x2="170" y2="86"/><line x1="170" y1="152" x2="170" y2="194"/>
    <line x1="182" y1="140" x2="224" y2="140"/><line x1="158" y1="140" x2="116" y2="140"/>
  </g>
  <g font-family="var(--testo), sans-serif" font-size="11.5" fill="var(--inchiostro)" text-anchor="middle">
    <text x="170" y="76">salita</text><text x="170" y="212">discesa</text>
    <text x="252" y="144">imbardata dx</text><text x="88" y="144">imbardata sx</text>
    <text x="170" y="240" font-family="var(--dato), monospace" font-size="10" fill="var(--grigio)" letter-spacing="1.4">STICK SINISTRO</text>
  </g>
  <!-- stick destro -->
  <circle cx="450" cy="140" r="66" fill="none" stroke="var(--linea)"/>
  <circle cx="450" cy="140" r="8" fill="var(--ottone)"/>
  <g stroke="var(--ottone)" stroke-width="1.6" marker-end="url(#a2)">
    <line x1="450" y1="128" x2="450" y2="86"/><line x1="450" y1="152" x2="450" y2="194"/>
    <line x1="462" y1="140" x2="504" y2="140"/><line x1="438" y1="140" x2="396" y2="140"/>
  </g>
  <g font-family="var(--testo), sans-serif" font-size="11.5" fill="var(--inchiostro)" text-anchor="middle">
    <text x="450" y="76">avanti</text><text x="450" y="212">indietro</text>
    <text x="530" y="144">rollio dx</text><text x="370" y="144">rollio sx</text>
    <text x="450" y="240" font-family="var(--dato), monospace" font-size="10" fill="var(--grigio)" letter-spacing="1.4">STICK DESTRO</text>
  </g>
</svg>
<figcaption>Configurazione mode 2: stick sinistro per potenza e imbardata, stick destro per beccheggio e rollio.</figcaption>
</figure>
<h3>Come si muove un quadricottero</h3>
<p>Non ci sono superfici mobili: il controllo nasce da differenze di giri fra le eliche. Numerando i motori in senso orario a partire da quello anteriore destro:</p>
<div class="tab-wrap"><table>
<thead><tr><th>Movimento</th><th>Accelerano</th><th>Rallentano</th></tr></thead>
<tbody>
<tr><td>Beccheggio in avanti (asse trasversale)</td><td>Motori posteriori</td><td>Motori anteriori</td></tr>
<tr><td>Rollio a sinistra (asse longitudinale)</td><td>Motori di destra</td><td>Motori di sinistra</td></tr>
<tr><td>Imbardata a sinistra (asse verticale)</td><td>Motori che girano in senso orario</td><td>Motori che girano in senso antiorario</td></tr>
</tbody></table></div>
<p>L'imbardata funziona perché la coppia di reazione delle eliche non è più bilanciata: due motori girano in senso orario, due in senso antiorario, e sbilanciando le due coppie il velivolo ruota su sé stesso.</p>`
    },
    {
      id: 'componenti',
      titolo: 'Componenti e terminologia',
      html: `
<div class="tab-wrap"><table>
<thead><tr><th>Termine</th><th>Significato</th></tr></thead>
<tbody>
<tr><td><b>UAS</b></td><td>Unmanned Aircraft System: l'insieme di aeromobile, stazione di comando e collegamenti</td></tr>
<tr><td><b>UA</b> o <b>RPA</b></td><td>L'aeromobile vero e proprio</td></tr>
<tr><td><b>GCS</b></td><td>Ground Control Station: il radiocomando con cui il pilota interviene in ogni momento</td></tr>
<tr><td><b>Telaio</b></td><td>La struttura portante, detta anche cellula</td></tr>
<tr><td><b>Gimbal</b></td><td>Sospensione cardanica che stabilizza il carico utile</td></tr>
<tr><td><b>Payload</b></td><td>Carico utile: fotocamera, sensore, pacco trasportato</td></tr>
<tr><td><b>ESC</b></td><td>Electronic Speed Controller, regola la velocità di ciascun motore</td></tr>
<tr><td><b>FC</b></td><td>Flight Controller, la centralina, il cervello dell'aeromobile</td></tr>
<tr><td><b>Data link</b></td><td>Collegamento che porta a terra i parametri: quota, velocità, tensione, posizione</td></tr>
</tbody></table></div>
<h3>La catena di comando</h3>
<p>La centralina riceve i dati dai sensori e dal ricevitore radio, calcola le correzioni e comanda gli ESC, che regolano la velocità dei motori. L'aggiornamento del segnale verso i motori può arrivare a circa 1200 volte al secondo. I motori dei multirotori sono quasi sempre <b>brushless</b>, più efficienti di quelli a spazzole ma incapaci di funzionare senza ESC.</p>`
    },
    {
      id: 'sensori',
      titolo: 'Sensori e posizionamento',
      html: `
<div class="tab-wrap"><table>
<thead><tr><th>Grandezza corretta</th><th>Sensore</th></tr></thead>
<tbody>
<tr><td>Assetto</td><td>IMU (Inertial Measurement Unit), composta da giroscopi e accelerometri</td></tr>
<tr><td>Quota</td><td>Barometro, spesso affiancato da un sensore a ultrasuoni o ottico per le basse quote</td></tr>
<tr><td>Rotta</td><td>Bussola magnetica</td></tr>
<tr><td>Posizione</td><td>Ricevitore satellitare</td></tr>
</tbody></table></div>
<h3>GPS e GNSS</h3>
<p><b>GNSS</b> è il termine generale per i sistemi di navigazione satellitare. Il <b>GPS</b> statunitense è una delle costellazioni, con 31 satelliti; l'europea <b>Galileo</b> ne conta 27. Servono almeno <b>quattro satelliti</b> in vista per determinare latitudine, longitudine, quota e tempo.</p>
<p>Il ricevitore fornisce solo la posizione. Quota, direzione e velocità sono grandezze calcolate. La precisione in stazionamento può essere di circa mezzo metro, con deviazioni fino a un paio di metri negli spostamenti orizzontali, ma in condizioni sfavorevoli l'errore cresce parecchio. Volo in interni, presenza di grandi masse metalliche e attività geomagnetica intensa degradano il segnale.</p>
<div class="nota">
<span class="eyebrow">Bussola</span>
<p>La calibrazione della bussola va fatta lontano da armature metalliche, auto e linee elettriche. Una bussola calibrata male produce derive in stazionamento e rotazioni indesiderate: è una delle cause più frequenti di comportamenti anomali.</p>
</div>`
    },
    {
      id: 'radio',
      titolo: 'Radiofrequenze',
      html: `
<p>Il collegamento fra radiocomando e aeromobile viaggia su onde radio. La frequenza indica quante oscillazioni al secondo compie l'onda, misurate in hertz.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Banda</th><th>Uso</th><th>Potenza massima in uscita</th></tr></thead>
<tbody>
<tr><td><b>2,4 GHz</b></td><td>Controllo e video, buona penetrazione degli ostacoli</td><td>100 mW</td></tr>
<tr><td><b>5,8 GHz</b></td><td>Controllo e video ad alta banda, più sensibile agli ostacoli</td><td>25 mW</td></tr>
<tr><td>868 MHz</td><td>Telemetria a lungo raggio</td><td>Secondo normativa nazionale</td></tr>
<tr><td>35 e 40 MHz</td><td>Aeromodellismo storico. La banda 40 MHz è condivisa con altri usi</td><td>Secondo normativa nazionale</td></tr>
</tbody></table></div>
<p>Il controllo radio degli UAS ricade nelle bande <b>UHF</b> (da 300 MHz a 3 GHz) e <b>SHF</b> (da 3 a 30 GHz).</p>
<h3>Cosa degrada il segnale</h3>
<ul>
<li><b>Assorbimento</b>: perdita di energia nell'attraversare materiali come muri e vegetazione umida.</li>
<li><b>Riflessione</b>: i metalli rimandano indietro il segnale creando zone d'ombra.</li>
<li><b>Attenuazione</b>: barriere fisiche come vetro, cemento armato e strutture reticolari.</li>
<li><b>Interferenza</b>: altri trasmettitori sulla stessa banda, antenne, cabine elettriche.</li>
</ul>`
    },
    {
      id: 'batterie',
      titolo: 'Batterie ai polimeri di litio',
      html: `
<p>Le batterie <b>Lipo</b> immagazzinano molta energia in poco peso, e proprio per questo vanno trattate con metodo.</p>
<h3>I numeri da saper leggere</h3>
<ul>
<li><b>Capacità</b> in ampere-ora (Ah) o milliampere-ora (mAh): quanta carica contiene.</li>
<li><b>Energia</b> in wattora (Wh): capacità per tensione, è il dato richiesto dalle compagnie aeree.</li>
<li><b>S-rating</b>: numero di celle in serie, determina la tensione. Una cella carica sta a 4,2 V, quindi una 4S carica è a 16,8 V.</li>
<li><b>C-rating</b>: massima corrente di scarica continua, espressa come multiplo della capacità. Su una batteria da 20.000 mAh, 1C corrisponde a 20 A; un C-rating di 24C significa 480 A.</li>
</ul>
<p>Celle collegate <b>in serie</b> aumentano la tensione a parità di corrente. Celle <b>in parallelo</b> aumentano la capacità a parità di tensione.</p>
<div class="tab-wrap"><table>
<thead><tr><th></th><th>Carica</th><th>Scarica</th><th>Conservazione</th></tr></thead>
<tbody>
<tr><td>Temperatura</td><td>Ambiente, fra 0 e 45 °C</td><td>Evitare estremi</td><td>Fra -20 e 40 °C</td></tr>
<tr><td>Livello</td><td>Mai sovraccaricare, controllare le celle</td><td>Non scendere sotto il 20% residuo</td><td>Attorno al 60%, mai completamente scarica</td></tr>
<tr><td>Sicurezza</td><td>Borsa ignifuga, sorveglianza</td><td>Lasciare raffreddare 30 minuti dopo un volo impegnativo</td><td>Borsa ignifuga, non oltre 3-6 mesi senza uso</td></tr>
</tbody></table></div>
<p>Una batteria danneggiata va portata alla raccolta dei rifiuti pericolosi, non nel cestino di casa. Una Lipo trattata bene supera i 100-200 cicli. Per il trasporto aereo, mettila in borsa di sicurezza e verifica i limiti della compagnia, che di norma chiede una carica residua contenuta.</p>
<figure data-src="07-batterie.png" data-cap="I quattro numeri sull'etichetta di una batteria ai polimeri di litio e cosa significano."></figure>
<div class="nota attenzione">
<span class="eyebrow">Autoaccensione</span>
<p>Le Lipo possono incendiarsi spontaneamente se caricate in modo scorretto, se cadono o se subiscono un urto. Dopo ogni atterraggio duro ispeziona il pacco e mettilo in osservazione prima di riporlo.</p>
</div>`
    },
    {
      id: 'software',
      titolo: 'Hardware, software, firmware',
      html: `
<ul>
<li><b>Hardware</b>: tutte le parti fisiche, dai motori ai sensori alla centralina.</li>
<li><b>Software</b>: i programmi che girano sull'hardware e permettono all'utente di comandarlo.</li>
<li><b>Firmware</b>: software scritto dentro l'hardware, aggiornabile dal costruttore.</li>
</ul>
<p>L'aggiornamento del database di geo-consapevolezza è obbligatorio per i droni dotati di questa funzione e richiede una connessione a internet. Va aggiornato anche il numero di registrazione dell'operatore nel sistema di identificazione remota.</p>
<div class="nota">
<span class="eyebrow">Dopo un aggiornamento</span>
<p>Un aggiornamento porta miglioramenti ma può reintrodurre difetti o ripristinare impostazioni. Dopo ogni aggiornamento ricontrolla quota massima, distanza massima e comportamento in caso di perdita del collegamento.</p>
</div>`
    }
  ],
  ricorda: [
    'Le quattro forze: portanza, gravità, spinta, resistenza. Passano tutte per il centro di gravità.',
    'Imbardata sull asse verticale, rollio sul longitudinale, beccheggio sul trasversale.',
    'Mode 2: stick sinistro potenza e imbardata, stick destro beccheggio e rollio.',
    'Servono almeno 4 satelliti in vista per calcolare posizione, quota e tempo.',
    'Bande radio principali: 2,4 GHz con 100 mW e 5,8 GHz con 25 mW.',
    'Il controllo radio degli UAS ricade in UHF (300 MHz - 3 GHz) e SHF (3 - 30 GHz).',
    'Celle in serie: più tensione. Celle in parallelo: più capacità.',
    'Una cella Lipo completamente carica sta a 4,2 V. Una 4S carica sta a 16,8 V.',
    'Conservazione Lipo: circa 60% di carica, mai completamente scarica.'
  ],
  quiz: [
    { d: 'Attorno a quale asse avviene il beccheggio?', o: ['Asse verticale', 'Asse longitudinale', 'Asse trasversale', 'Asse di rollio'], c: 2,
      sp: 'Beccheggio sul trasversale, rollio sul longitudinale, imbardata sul verticale.' },
    { d: 'Nella configurazione mode 2, cosa comanda lo stick di destra in verticale?', o: ['Potenza', 'Imbardata', 'Beccheggio, avanti e indietro', 'Rollio'], c: 2,
      sp: 'Stick destro: beccheggio in verticale, rollio in orizzontale. Stick sinistro: potenza e imbardata.' },
    { d: 'Quanti satelliti servono come minimo per determinare posizione, quota e tempo?', o: ['2', '3', '4', '6'], c: 2,
      sp: 'Quattro. Con tre soli satelliti la quota non è determinabile in modo affidabile.' },
    { d: 'Quale tensione ha una cella Lipo completamente carica?', o: ['3,7 V', '4,2 V', '5 V', '12 V'], c: 1,
      sp: 'Una 4S carica sta quindi a 16,8 V, cioè 4,2 moltiplicato per quattro.' },
    { d: 'Collegando le celle di una batteria in parallelo si ottiene:', o: ['Più tensione', 'Meno tensione', 'Più capacità', 'Meno capacità'], c: 2,
      sp: 'In parallelo aumenta la capacità a parità di tensione. In serie aumenta la tensione a parità di corrente.' },
    { d: 'Qual è la potenza massima di uscita ammessa sulla banda 5,8 GHz?', o: ['10 mW', '25 mW', '100 mW', '500 mW'], c: 1,
      sp: '25 mW a 5,8 GHz e 100 mW a 2,4 GHz.' },
    { d: 'Cosa provoca la riflessione del segnale radio?', o: ['La vegetazione umida', 'Le superfici metalliche', 'La nebbia', 'Il calore'], c: 1,
      sp: 'I metalli rimandano indietro il segnale creando punti morti. Muri e vegetazione causano assorbimento e attenuazione.' },
    { d: 'A che percentuale di carica va conservata una batteria Lipo per lunghi periodi?', o: ['Completamente scarica', 'Circa al 60%', 'Completamente carica', 'Al 100% in frigorifero'], c: 1,
      sp: 'Circa il 60%, in borsa ignifuga, a temperatura ambiente, e mai lasciata scarica.' },
    { d: 'Cosa succede a un multirotore che scende troppo velocemente in verticale?', o: ['Guadagna portanza', 'Può entrare nel proprio flusso discendente e perdere stabilità', 'I motori si spengono', 'Il GPS si disattiva'], c: 1,
      sp: 'Serve una componente di traslazione orizzontale per uscire dal proprio vortice.' },
    { d: 'Cosa regola un ESC?', o: ['La posizione del gimbal', 'La velocità di un motore brushless', 'La frequenza radio', 'La quota barometrica'], c: 1,
      sp: 'Electronic Speed Controller. Riceve il comando dalla centralina e pilota il motore.' }
  ]
},

/* ================================================================== VII */
{
  id: 'privacy',
  num: 'VII',
  titolo: 'Privacy e protezione dei dati',
  area: 'privacy',
  percorsi: ['a1a3'],
  durata: 20,
  sommario: 'Cosa puoi riprendere, quando serve una base giuridica, cosa cambia fra pilota privato e operatore, come custodire le immagini.',
  sezioni: [
    {
      id: 'cos-e',
      titolo: 'Di cosa parliamo',
      html: `
<p>La privacy è la possibilità di condurre la propria vita senza che altri la conoscano, la violino o la condizionino. È un diritto fondamentale, e riguarda le informazioni personali: quelle che produci tu, quelle che condividi e quelle che altri raccolgono su di te.</p>
<p>Un drone con fotocamera raccoglie dati dall'alto, spesso in luoghi dove le persone hanno un'aspettativa di riservatezza: giardini privati, terrazzi, cortili interni. È qui che il tema diventa concreto.</p>`
    },
    {
      id: 'privati',
      titolo: 'Se voli da privato',
      html: `
<p>Il trattamento di dati personali svolto da una persona fisica per finalità esclusivamente personali o domestiche resta fuori dall'ambito del GDPR. Questo non significa che tutto sia permesso: restano applicabili le norme civili e penali sulla tutela della riservatezza, del domicilio e dell'immagine.</p>
<h3>Diritto all'immagine</h3>
<p>Il ritratto di una persona non può essere esposto o messo in commercio senza il suo consenso, salvo i casi in cui la riproduzione è giustificata dalla notorietà, dall'ufficio pubblico ricoperto, da necessità di giustizia o di polizia, oppure da scopi scientifici, didattici o culturali, o quando si collega a fatti di interesse pubblico. Il consenso non serve quando la persona non è riconoscibile o quando è un elemento accessorio di una scena più ampia.</p>
<div class="nota attenzione">
<span class="eyebrow">Volare sopra i vicini</span>
<p>Non esiste una legge dedicata ai droni in materia di riservatezza, ma i giudici hanno già affrontato il tema. Usare un drone sulla proprietà altrui in modo da violarne la sfera privata è illecito, e nei casi più gravi può configurare fattispecie penali come l'interferenza illecita nella vita privata. Il fatto che il volo rispetti le regole aeronautiche non lo rende automaticamente lecito sul piano della riservatezza.</p>
</div>`
    },
    {
      id: 'operatori',
      titolo: 'Se voli come operatore',
      html: `
<p>Imprese, professionisti ed enti sono soggetti al <b>GDPR</b>, il regolamento (UE) 2016/679, applicabile dal 25 maggio 2018. Quando raccogli immagini in cui persone sono identificabili, stai trattando dati personali.</p>
<h3>Le sei basi giuridiche</h3>
<ol>
<li><b>Consenso</b> dell'interessato.</li>
<li><b>Esecuzione di un contratto</b> di cui l'interessato è parte.</li>
<li><b>Obbligo legale</b> a cui è soggetto il titolare.</li>
<li><b>Interesse vitale</b>, in situazioni di pericolo per la vita.</li>
<li><b>Interesse pubblico</b> o esercizio di pubblici poteri, riservato a soggetti pubblici.</li>
<li><b>Legittimo interesse</b> del titolare o di terzi, bilanciato con i diritti dell'interessato.</li>
</ol>
<p>Per un operatore con fotocamera a bordo, le basi ricorrenti sono il consenso, l'esecuzione del contratto e il legittimo interesse.</p>
<div class="nota">
<span class="eyebrow">Una base giuridica non basta</span>
<p>Avere una base giuridica non esonera dal valutare l'impatto sulla riservatezza. Se devi ispezionare i tetti di un condominio, avvisare i residenti prima del volo è un passaggio dovuto, non una cortesia.</p>
</div>
<h3>Altri obblighi</h3>
<ul>
<li>Informativa alle persone interessate su finalità, base giuridica, tempi di conservazione e diritti.</li>
<li>Accordo sul trattamento con i fornitori che conservano i dati per tuo conto (servizi cloud, laboratori di post-produzione).</li>
<li>Minimizzazione: raccogliere solo ciò che serve alla finalità dichiarata.</li>
<li>Cancellazione dei dati non più necessari.</li>
</ul>`
    },
    {
      id: 'giornalismo',
      titolo: 'Giornalismo e cronaca',
      html: `
<p>Il GDPR prevede deroghe per il trattamento a scopi giornalistici e per l'espressione accademica, artistica o letteraria, con il bilanciamento fra protezione dei dati e libertà di informazione affidato alle norme nazionali. In Italia il riferimento sono le regole deontologiche relative al trattamento dei dati nell'esercizio dell'attività giornalistica.</p>
<p>In questi casi non è sempre necessario il consenso preventivo della persona ripresa, ma restano i limiti dell'essenzialità dell'informazione, della continenza e della dignità della persona.</p>`
    },
    {
      id: 'sicurezza-dati',
      titolo: 'Custodia delle riprese',
      html: `
<ul>
<li>Alcuni aeromobili professionali offrono una <b>modalità dati locali</b> che interrompe ogni comunicazione con internet: nessun dato esce e nessuno entra.</li>
<li>La scheda di memoria del drone è un archivio di dati personali a tutti gli effetti. Va rimossa dopo il volo e conservata al sicuro.</li>
<li>Usa cifratura del disco, password robuste e autenticazione a due fattori sugli account online.</li>
<li>Mantieni aggiornati firewall e antivirus sui dispositivi che trattano il materiale.</li>
<li>Con i servizi cloud serve un contratto che disciplini il trattamento e la localizzazione dei dati.</li>
</ul>`
    }
  ],
  ricorda: [
    'Il GDPR è il regolamento (UE) 2016/679, applicabile dal 25 maggio 2018.',
    'Le sei basi giuridiche: consenso, contratto, obbligo legale, interesse vitale, interesse pubblico, legittimo interesse.',
    'Il trattamento per finalità esclusivamente personali o domestiche resta fuori dall ambito del GDPR.',
    'Restano comunque applicabili le norme su riservatezza, domicilio e diritto all immagine.',
    'Con i fornitori che conservano i dati serve un accordo sul trattamento.',
    'La modalità dati locali interrompe ogni comunicazione del drone con internet.'
  ],
  quiz: [
    { d: 'Da quando è applicabile il GDPR?', o: ['25 maggio 2016', '25 maggio 2018', '31 dicembre 2020', '1 gennaio 2024'], c: 1,
      sp: 'Regolamento (UE) 2016/679, adottato nel 2016 e applicabile dal 25 maggio 2018.' },
    { d: 'Quante sono le basi giuridiche per il trattamento dei dati personali previste dal GDPR?', o: ['Quattro', 'Cinque', 'Sei', 'Otto'], c: 2,
      sp: 'Consenso, contratto, obbligo legale, interesse vitale, interesse pubblico, legittimo interesse.' },
    { d: 'Quale base giuridica è riservata ai soli soggetti pubblici?', o: ['Consenso', 'Legittimo interesse', 'Interesse pubblico o esercizio di pubblici poteri', 'Esecuzione di un contratto'], c: 2,
      sp: 'Riguarda compiti di interesse generale o l esercizio di pubblici poteri, quindi organi amministrativi.' },
    { d: 'Un privato che riprende il giardino del vicino con un drone:', o: ['È sempre nel giusto se rispetta i 120 metri', 'Può violare la sfera privata del vicino, anche rispettando le regole aeronautiche', 'Deve solo registrarsi su D-Flight', 'Non commette alcun illecito se non pubblica le immagini'], c: 1,
      sp: 'Le regole aeronautiche e la tutela della riservatezza sono due piani distinti. Rispettare le prime non mette al riparo dalle seconde.' },
    { d: 'Cosa fa la modalità dati locali di alcuni droni professionali?', o: ['Riduce la potenza dei motori', 'Interrompe ogni comunicazione con internet', 'Cancella le riprese dopo il volo', 'Aumenta la risoluzione video'], c: 1,
      sp: 'Nessun dato viene inviato o ricevuto via internet durante l operazione.' },
    { d: 'Un operatore che archivia le riprese su un servizio cloud deve:', o: ['Cancellarle entro 30 giorni', 'Stipulare un accordo sul trattamento con il fornitore', 'Chiedere autorizzazione a ENAC', 'Rendere pubbliche le immagini'], c: 1,
      sp: 'Il fornitore agisce come responsabile del trattamento e il rapporto va disciplinato contrattualmente.' }
  ]
},

/* ================================================================= VIII */
{
  id: 'assicurazione',
  num: 'VIII',
  titolo: 'Assicurazione',
  area: 'normativa',
  percorsi: ['a1a3'],
  durata: 12,
  sommario: 'Quando la copertura è obbligatoria, cosa cambia fra privato e operatore, quali esclusioni verificare prima di firmare.',
  sezioni: [
    {
      id: 'quadro',
      titolo: 'Il quadro europeo',
      html: `
<p>L'articolo 4 del regolamento (CE) <b>785/2004</b> stabilisce che gli esercenti di aeromobili devono essere assicurati per la responsabilità verso terzi. Lo scopo è garantire alle vittime di un incidente un risarcimento adeguato.</p>
<p>Il regolamento fissa massimali minimi in funzione della massa. Per gli aeromobili più leggeri il minimo di riferimento è di <b>750.000 diritti speciali di prelievo</b>, un valore che in euro si colloca attorno al milione. Sotto i 20 kg il regolamento europeo non impone l'obbligo, ma lascia agli Stati membri la facoltà di introdurlo.</p>
<div class="nota italia">
<span class="eyebrow">In Italia</span>
<p>ENAC richiede una copertura assicurativa per la responsabilità civile verso terzi adeguata alla tipologia di operazione, per tutti gli operatori registrati. In pratica la polizza va stipulata a prescindere dal peso del drone.</p>
</div>`
    },
    {
      id: 'privato-operatore',
      titolo: 'Privato oppure operatore',
      html: `
<p>Sei considerato <b>privato</b> quando ricorrono entrambe le condizioni: non operi tramite un'impresa o un'organizzazione, e non ricevi un compenso per l'attività. Se manca anche una sola delle due, sei un operatore.</p>
<div class="tab-wrap"><table>
<thead><tr><th></th><th>Privato</th><th>Operatore</th></tr></thead>
<tbody>
<tr><td>Tipo di polizza</td><td>Responsabilità civile personale con estensione esplicita ai droni</td><td>Polizza RC aeronautica dedicata, per ciascun aeromobile</td></tr>
<tr><td>Chi paga</td><td>L'assicurato</td><td>L'operatore, non il pilota</td></tr>
<tr><td>Kasko</td><td>Facoltativa</td><td>Facoltativa, va richiesta esplicitamente</td></tr>
</tbody></table></div>
<p>Attenzione a un caso frequente: organizzazioni come corpi volontari o istituti scolastici non chiedono compensi, ma il personale opera nell'ambito del proprio lavoro. In quel caso si rientra nel regime dell'operatore.</p>`
    },
    {
      id: 'controlli',
      titolo: 'Cosa verificare nel contratto',
      html: `
<ul>
<li><b>Estensione territoriale</b>: la copertura vale all'estero? Con quali limiti?</li>
<li><b>Esclusioni</b>: sabotaggio, terrorismo, guerra e disordini civili sono spesso esclusi o limitati.</li>
<li><b>Attività coperte</b>: volo ricreativo, volo professionale, riprese commerciali, volo notturno.</li>
<li><b>Massimale</b> per sinistro e per anno.</li>
<li><b>Condizione di validità</b>: quasi tutte le polizze coprono solo se il volo rispetta le regole. Un'operazione fuori norma può far decadere la copertura proprio quando serve.</li>
</ul>
<div class="nota attenzione">
<span class="eyebrow">Il punto decisivo</span>
<p>Sei assicurato solo se rispetti le regole. Volare in zona rossa, sopra un assembramento o senza attestato valido significa restare scoperto in caso di sinistro, indipendentemente dal premio pagato.</p>
</div>`
    }
  ],
  ricorda: [
    'Il riferimento europeo è il regolamento (CE) 785/2004, articolo 4.',
    'Il massimale minimo di riferimento per gli aeromobili più leggeri è 750.000 DSP, attorno al milione di euro.',
    'Sotto i 20 kg l obbligo europeo non scatta, ma in Italia ENAC richiede comunque la copertura RC verso terzi.',
    'Sei privato solo se non operi tramite un organizzazione e non percepisci compensi.',
    'La copertura vale solo se il volo rispetta le regole applicabili.'
  ],
  quiz: [
    { d: 'Quale regolamento europeo disciplina i requisiti assicurativi per gli esercenti di aeromobili?', o: ['(UE) 2019/947', '(CE) 785/2004', '(UE) 2016/679', '(UE) 2019/945'], c: 1,
      sp: 'L articolo 4 impone la copertura della responsabilità verso terzi.' },
    { d: 'Quando una persona è considerata pilota privato ai fini assicurativi?', o: ['Se vola meno di dieci volte all\'anno', 'Se non opera tramite un\'organizzazione e non percepisce compensi', 'Se il drone pesa meno di 250 grammi', 'Se vola solo nei giorni festivi'], c: 1,
      sp: 'Servono entrambe le condizioni. Se ne manca una si rientra nel regime dell operatore.' },
    { d: 'Un istituto scolastico usa droni per attività didattiche senza chiedere compensi. Come viene qualificato?', o: ['Privato', 'Operatore, perché il personale opera nell\'ambito del proprio lavoro', 'Esente da obblighi', 'Categoria certificata'], c: 1,
      sp: 'L assenza di corrispettivo non basta: conta l inserimento dell attività in un contesto organizzato.' },
    { d: 'La polizza copre un sinistro avvenuto durante un volo in zona rossa?', o: ['Sì, sempre', 'No, la copertura è condizionata al rispetto delle regole', 'Solo con franchigia doppia', 'Dipende dal peso del drone'], c: 1,
      sp: 'Le polizze condizionano l operatività al rispetto della normativa applicabile.' }
  ]
},

/* =================================================================== IX */
{
  id: 'security',
  num: 'IX',
  titolo: 'Security e identificazione remota',
  area: 'sicurezza',
  percorsi: ['a1a3'],
  durata: 18,
  sommario: 'Modifiche non consentite, marcatura CE, identificazione remota, interferenze intenzionali e sistemi anti drone.',
  sezioni: [
    {
      id: 'tre-rischi',
      titolo: 'Tre categorie di rischio',
      html: `
<p>Oltre alla safety, cioè la prevenzione degli incidenti, esiste la <b>security</b>: la protezione da azioni intenzionali di terzi e da alterazioni dell'aeromobile. Un'operazione UAS può essere compromessa da:</p>
<ul>
<li><b>Modifiche</b>: se l'UAS viene alterato tecnicamente e non rispetta più i requisiti della propria classe, la marcatura CE decade.</li>
<li><b>Interferenze</b>: disturbi al collegamento di comando o al posizionamento satellitare, intenzionali o accidentali.</li>
<li><b>Minacce</b>: sabotaggio, distruzione, appropriazione ostile dell'aeromobile.</li>
</ul>`
    },
    {
      id: 'ce',
      titolo: 'Marcatura CE',
      html: `
<p>Molti prodotti, droni compresi, possono essere immessi sul mercato dello Spazio economico europeo solo con la marcatura CE. Con essa il costruttore dichiara, sotto la propria responsabilità, che il prodotto rispetta i requisiti essenziali delle direttive applicabili in materia di sicurezza, salute e ambiente.</p>
<p>Le autorità nazionali non possono imporre requisiti aggiuntivi ai prodotti già marcati. La cornice normativa di riferimento è la decisione n. 768/2008/CE.</p>
<div class="nota attenzione">
<span class="eyebrow">Modificare un drone</span>
<p>Alterare un prodotto con marcatura CE approvata invalida la marcatura. Cambiare eliche non previste, aumentare la potenza, aggiungere payload oltre i limiti dichiarati o sbloccare i limiti software fa decadere sia la conformità sia, in genere, la copertura assicurativa.</p>
</div>`
    },
    {
      id: 'remote-id',
      titolo: 'Identificazione remota',
      html: `
<p>Il <b>Remote ID</b> permette a un drone di trasmettere in tempo reale la propria identità e la propria posizione. I dati possono essere ricevuti dalle autorità e da chiunque disponga di un ricevitore adatto. Serve a rendere le operazioni tracciabili e attribuibili.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Tipo</th><th>Come funziona</th></tr></thead>
<tbody>
<tr><td><b>Diretta</b> (broadcast)</td><td>L'aeromobile trasmette ai dispositivi nelle immediate vicinanze. Le uniche tecnologie approvate nell'UE sono Wi-Fi e Bluetooth.</td></tr>
<tr><td><b>Di rete</b> (network)</td><td>I dati passano attraverso le reti mobili verso un servizio centralizzato.</td></tr>
</tbody></table></div>
<h3>Chi ne è soggetto</h3>
<ul>
<li>Droni con etichetta da <b>C1 a C6</b>: l'identificazione diretta è integrata di serie. La classe <b>C0</b> ne è esente.</li>
<li>Droni <b>senza etichetta di classe</b> in categoria Open: non sono soggetti all'obbligo.</li>
<li>Droni senza etichetta in categoria <b>Specific</b>: devono soddisfare il requisito, quindi serve un modulo add-on oppure l'adeguamento tramite costruttore.</li>
</ul>
<p>Prima di ogni volo il pilota verifica che l'identificazione remota funzioni e che il numero di registrazione dell'operatore sia correttamente caricato nel sistema.</p>`
    },
    {
      id: 'interferenze',
      titolo: 'Interferenze e sistemi anti drone',
      html: `
<p>L'interferenza si verifica quando il segnale di comando viene disturbato da altri segnali presenti sulla stessa banda. Trasformatori, antenne radio e impianti industriali sono sorgenti tipiche.</p>
<p>Si può operare solo sulle frequenze designate. Volare su bande non autorizzate espone a interferenze immediate e, nei casi peggiori, alla perdita del controllo dell'aeromobile.</p>
<h3>Contromisure attive</h3>
<p>Nei pressi di siti sensibili possono essere presenti sistemi anti drone:</p>
<ul>
<li>disturbatori di segnale, fissi o mobili, che inibiscono il collegamento di comando in un raggio di alcuni chilometri;</li>
<li>dispositivi portatili per interventi puntuali;</li>
<li>sistemi che lanciano una rete per catturare l'aeromobile, spesso con paracadute per l'atterraggio;</li>
<li>in alcuni contesti, rapaci addestrati.</li>
</ul>
<p>Oltre al danno all'aeromobile, le conseguenze possono comprendere sequestro del mezzo, sanzioni amministrative e, nei casi più gravi, conseguenze penali.</p>`
    },
    {
      id: 'minacce',
      titolo: 'Minacce e custodia dell\'attrezzatura',
      html: `
<p>Tieni sotto controllo l'attrezzatura, aeromobile e radiocomando compresi. Il danno derivante da situazioni di conflitto rientra nella categoria delle minacce: conflitti armati, disordini civili, sommosse, terrorismo, sabotaggio.</p>
<p>Le polizze escludono di norma i danni da conflitto armato e da disordini civili. Per il terrorismo esistono coperture, ma con limiti complessivi definiti a livello di sistema assicurativo. Se prevedi di operare all'estero, verifica in anticipo le condizioni della polizza e le indicazioni di viaggio delle autorità.</p>
<div class="nota italia">
<span class="eyebrow">Competenza nazionale</span>
<p>Ogni Stato membro definisce le proprie zone geografiche e le misure di sicurezza applicabili. Le regole operative europee sono comuni, ma dove si può volare cambia da Paese a Paese.</p>
</div>`
    }
  ],
  ricorda: [
    'Modificare un drone con marcatura CE fa decadere la marcatura stessa.',
    'Nell UE le uniche tecnologie approvate per l identificazione remota diretta sono Wi-Fi e Bluetooth.',
    'I droni da C1 a C6 integrano il Remote ID. La classe C0 ne è esente.',
    'I droni senza etichetta di classe non hanno obbligo di Remote ID in categoria Open, ma lo hanno in Specific.',
    'Assorbimento, riflessione e attenuazione degradano il segnale senza che ci sia interferenza intenzionale.',
    'La cornice normativa della marcatura CE è la decisione n. 768/2008/CE.'
  ],
  quiz: [
    { d: 'Quali tecnologie sono approvate nell\'UE per l\'identificazione remota diretta?', o: ['Solo reti mobili 4G', 'Wi-Fi e Bluetooth', 'ADS-B e transponder', 'Radio VHF'], c: 1,
      sp: 'L identificazione remota di rete usa invece le reti mobili.' },
    { d: 'Quale classe di drone è esente dall\'obbligo di identificazione remota?', o: ['C0', 'C1', 'C2', 'C3'], c: 0,
      sp: 'Dalla C1 in su il Remote ID è integrato di serie.' },
    { d: 'Cosa comporta modificare tecnicamente un drone con marcatura CE?', o: ['Nulla, purché non cambi il peso', 'La marcatura CE cessa di essere valida', 'Serve una nuova registrazione su D-Flight', 'Il drone passa automaticamente in classe C4'], c: 1,
      sp: 'La dichiarazione di conformità copre il prodotto come immesso sul mercato. Una modifica la fa decadere.' },
    { d: 'Cosa causa la creazione di un punto morto senza onde radio?', o: ['L\'assorbimento da parte dei muri', 'La riflessione da parte delle superfici metalliche', 'L\'attenuazione da parte del vetro', 'L\'umidità dell\'aria'], c: 1,
      sp: 'Il metallo rimanda indietro il segnale. Muri e vegetazione producono assorbimento, vetro e cemento attenuazione.' },
    { d: 'Un drone senza etichetta di classe che vuole operare in categoria Specific:', o: ['È esente dal Remote ID', 'Deve soddisfare il requisito di Remote ID', 'Non può mai operare in Specific', 'Deve pesare meno di 250 grammi'], c: 1,
      sp: 'Servono un modulo add-on oppure l adeguamento tramite il costruttore.' }
  ]
}

];
