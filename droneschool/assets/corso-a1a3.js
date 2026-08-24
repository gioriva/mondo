/* Drone School · moduli del percorso A1/A3 (parte 1) */

window.MODULI_A1A3 = [

/* ==================================================================== I */
{
  id: 'sicurezza-operativa',
  num: 'I',
  titolo: 'Sicurezza operativa',
  area: 'sicurezza',
  percorsi: ['a1a3'],
  durata: 35,
  sommario: 'Chi comanda il volo, come si resta a vista, quali distanze valgono per ogni sottocategoria e chi conta come persona non coinvolta.',
  sezioni: [
    {
      id: 'comandante',
      titolo: 'Sei il comandante',
      html: `
<p>Quando alzi un drone all'aperto entri nel traffico aereo. Non conta se voli per hobby o per lavoro: la responsabilità del volo è tua e non è delegabile a nessun software di bordo.</p>
<p>Il regolamento europeo ti attribuisce cinque doveri che restano in capo a te dal momento in cui accendi il radiocomando a quando riponi le batterie.</p>
<ol>
<li>Sei il comandante dell'UAS e il responsabile principale del volo. Se operi da solo lo sei sempre.</li>
<li>Rispondi dell'uso dell'aeromobile mentre è in aria, quindi devi conoscere il manuale del costruttore prima di decollare.</li>
<li>Devi essere in grado di monitorare e controllare lo stato e le funzioni dell'UAS per tutta la durata dell'operazione.</li>
<li>Verifichi che le condizioni meteorologiche minime siano soddisfatte prima di ogni volo, non una volta al mese.</li>
<li>Piloti un aeromobile in grado di volare, con la massa corretta e in equilibrio.</li>
</ol>
<div class="nota">
<span class="eyebrow">Regola d'oro</span>
<p>Le regole scritte aumentano la sicurezza solo se qualcuno le applica. Un volo imprudente resta imprudente anche quando rispetta ogni distanza sulla carta.</p>
</div>`
    },
    {
      id: 'categorie',
      titolo: 'Le tre categorie operative',
      html: `
<p>Il regolamento (UE) 2019/947 classifica le operazioni con droni in base al rischio, non in base allo scopo. La distinzione tra volo amatoriale e volo professionale è sparita: conta cosa fai, non perché lo fai.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Categoria</th><th>Rischio</th><th>Cosa comprende</th></tr></thead>
<tbody>
<tr><td><b>Open</b> (aperta)</td><td>Basso</td><td>Volo sempre in VLOS, massa massima al decollo sotto i 25 kg, quota massima 120 m, fuori dallo spazio aereo controllato. Nessuna autorizzazione preventiva.</td></tr>
<tr><td><b>Specific</b> (specifica)</td><td>Medio</td><td>Operazioni che escono dai limiti della Open: oltre 25 kg, BVLOS, quote superiori. Servono uno scenario standard europeo (EU-STS) o un'autorizzazione operativa ENAC.</td></tr>
<tr><td><b>Certified</b> (certificata)</td><td>Alto</td><td>Trasporto di persone o di merci pericolose, sorvolo di assembramenti con aeromobili certificati. Regime simile all'aviazione con equipaggio.</td></tr>
</tbody></table></div>
<p>Esiste inoltre l'<b>U-Space</b>, uno spazio aereo dedicato ai servizi automatizzati per droni, in fase di implementazione progressiva.</p>
<div class="nota esame">
<span class="eyebrow">All'esame</span>
<p>Basso, medio e alto rischio corrispondono nell'ordine a Open, Specific e Certified. È una domanda ricorrente.</p>
</div>`
    },
    {
      id: 'vlos',
      titolo: 'Volare a vista',
      html: `
<p>Nella categoria Open si vola sempre in <b>VLOS</b>, Visual Line of Sight. Significa seguire il drone con i propri occhi, senza binocoli e senza monitor come sostituto della vista diretta.</p>
<p>Non esiste una distanza massima fissa tra pilota e drone. Esiste un vincolo di risultato: l'aeromobile deve restare chiaramente visibile. In un campo aperto con visibilità adeguata puoi allontanarti parecchio, in un contesto costruito molto meno.</p>
<h3>Dove il contatto visivo si perde in fretta</h3>
<ul>
<li>Zone abitate, dove edifici e alberi interrompono la linea di vista.</li>
<li>Cantieri e aree industriali, per la presenza di strutture verticali.</li>
<li>Sorvolo di boschi o crinali, dove il drone si confonde con lo sfondo.</li>
</ul>
<p>La visibilità minima di riferimento per operare in VMC nello spazio aereo di classe G è di <b>1500 metri</b>. Con un UAS non è consentito volare dentro le nuvole né in nebbia.</p>
<figure data-src="01-vlos.png" data-cap="Il contatto visivo si perde molto prima di quanto si creda: basta un edificio sulla linea di vista."></figure>
<div class="nota">
<span class="eyebrow">Volo FPV</span>
<p>Il volo con visore First Person View è ammesso nella categoria Open a condizione che accanto al pilota ci sia un osservatore che mantenga il contatto visivo diretto con il drone e che sia in grado di avvertirlo. L'osservatore non può usare ausili ottici.</p>
</div>`
    },
    {
      id: 'classi',
      titolo: 'Classi di marcatura da C0 a C4',
      html: `
<p>I droni immessi sul mercato europeo portano un'etichetta di classe, dalla <span class="mono">C0</span> alla <span class="mono">C6</span>. L'etichetta indica che il costruttore ha dichiarato la conformità a un pacchetto di requisiti tecnici: massa, velocità, identificazione remota, geo-consapevolezza, altezza limitabile.</p>
<figure>
<svg viewBox="0 0 720 250" role="img" aria-label="Scala delle classi di marcatura da C0 a C4 con le masse massime">
  <g font-family="var(--dato), monospace" font-size="11">
    <text x="14" y="24" fill="var(--grigio)" letter-spacing="2">CLASSE</text>
    <text x="120" y="24" fill="var(--grigio)" letter-spacing="2">MTOM</text>
    <text x="250" y="24" fill="var(--grigio)" letter-spacing="2">SOTTOCATEGORIA AMMESSA</text>
  </g>
  <g font-family="var(--dato), monospace" font-size="13">
    <line x1="14" y1="34" x2="706" y2="34" stroke="var(--linea)"/>
    <g>
      <text x="14" y="62" fill="var(--ottone)">C0</text><text x="120" y="62" fill="var(--inchiostro)">&lt; 250 g</text>
      <rect x="250" y="50" width="52" height="17" fill="var(--ottone)" opacity=".2"/><text x="258" y="63" fill="var(--inchiostro)">A1</text>
      <line x1="14" y1="76" x2="706" y2="76" stroke="var(--linea)"/>
    </g>
    <g>
      <text x="14" y="104" fill="var(--ottone)">C1</text><text x="120" y="104" fill="var(--inchiostro)">&lt; 900 g</text>
      <rect x="250" y="92" width="52" height="17" fill="var(--ottone)" opacity=".2"/><text x="258" y="105" fill="var(--inchiostro)">A1</text>
      <line x1="14" y1="118" x2="706" y2="118" stroke="var(--linea)"/>
    </g>
    <g>
      <text x="14" y="146" fill="var(--ottone)">C2</text><text x="120" y="146" fill="var(--inchiostro)">&lt; 4 kg</text>
      <rect x="250" y="134" width="52" height="17" fill="var(--ottone)" opacity=".35"/><text x="258" y="147" fill="var(--inchiostro)">A2</text>
      <rect x="312" y="134" width="52" height="17" fill="var(--ottone)" opacity=".2"/><text x="320" y="147" fill="var(--inchiostro)">A3</text>
      <line x1="14" y1="160" x2="706" y2="160" stroke="var(--linea)"/>
    </g>
    <g>
      <text x="14" y="188" fill="var(--ottone)">C3</text><text x="120" y="188" fill="var(--inchiostro)">&lt; 25 kg</text>
      <rect x="250" y="176" width="52" height="17" fill="var(--ottone)" opacity=".2"/><text x="258" y="189" fill="var(--inchiostro)">A3</text>
      <line x1="14" y1="202" x2="706" y2="202" stroke="var(--linea)"/>
    </g>
    <g>
      <text x="14" y="230" fill="var(--ottone)">C4</text><text x="120" y="230" fill="var(--inchiostro)">&lt; 25 kg</text>
      <rect x="250" y="218" width="52" height="17" fill="var(--ottone)" opacity=".2"/><text x="258" y="231" fill="var(--inchiostro)">A3</text>
      <text x="380" y="231" fill="var(--grigio)" font-size="11">aeromodelli senza comandi automatici</text>
    </g>
  </g>
</svg>
<figcaption>Classi di marcatura e sottocategoria di impiego. La massa indicata è la massa massima al decollo, batteria e payload compresi.</figcaption>
</figure>
<p>Le classi <span class="mono">C5</span> e <span class="mono">C6</span> non appartengono alla categoria Open: servono per gli scenari standard europei EU-STS-01 e EU-STS-02 nella categoria Specific.</p>
<figure data-src="02-marcatura.png" data-cap="Due contrassegni distinti: l'etichetta di classe la applica il costruttore, il numero di operatore lo applichi tu."></figure>
<div class="nota italia">
<span class="eyebrow">Droni senza marcatura</span>
<p>I droni privi di etichetta di classe si chiamano <b>legacy</b>. Sono ancora utilizzabili in Open, ma solo se immessi sul mercato europeo prima del 31 dicembre 2023. Sotto i 250 g rientrano in A1 con limitazioni, oltre i 250 g finiscono in A3. Questo regime prende il nome di <b>Open limitata</b>.</p>
</div>`
    },
    {
      id: 'sottocategorie',
      titolo: 'Sottocategorie e distanze',
      html: `
<p>Le tre sottocategorie della Open si distinguono per una sola cosa: quanto puoi avvicinarti alle persone che non partecipano all'operazione.</p>
<figure>
<svg viewBox="0 0 720 300" role="img" aria-label="Confronto tra le distanze richieste nelle sottocategorie A1, A2 e A3">
  <g font-family="var(--dato), monospace" font-size="11" letter-spacing="1.5">
    <text x="14" y="20" fill="var(--ottone)">A1</text>
    <text x="14" y="120" fill="var(--ottone)">A2</text>
    <text x="14" y="228" fill="var(--ottone)">A3</text>
  </g>
  <!-- A1 -->
  <line x1="60" y1="46" x2="700" y2="46" stroke="var(--linea)" stroke-dasharray="2 4"/>
  <circle cx="120" cy="46" r="6" fill="var(--ottone)"/>
  <text x="60" y="34" font-family="var(--dato), monospace" font-size="10" fill="var(--grigio)">DRONE</text>
  <circle cx="180" cy="46" r="4" fill="var(--grigio)"/>
  <circle cx="200" cy="46" r="4" fill="var(--grigio)"/>
  <text x="150" y="70" font-family="var(--testo), sans-serif" font-size="12" fill="var(--inchiostro)">sorvolo consentito, mai su assembramenti</text>
  <!-- A2 -->
  <line x1="60" y1="150" x2="700" y2="150" stroke="var(--linea)" stroke-dasharray="2 4"/>
  <circle cx="120" cy="150" r="6" fill="var(--ottone)"/>
  <line x1="120" y1="150" x2="300" y2="150" stroke="var(--z-arancione)" stroke-width="2"/>
  <text x="180" y="142" font-family="var(--dato), monospace" font-size="11" fill="var(--z-arancione)">30 m</text>
  <line x1="120" y1="172" x2="180" y2="172" stroke="var(--z-celeste)" stroke-width="2"/>
  <text x="188" y="176" font-family="var(--dato), monospace" font-size="11" fill="var(--z-celeste)">5 m in bassa velocità</text>
  <circle cx="312" cy="150" r="4" fill="var(--grigio)"/><circle cx="330" cy="150" r="4" fill="var(--grigio)"/>
  <text x="350" y="154" font-family="var(--testo), sans-serif" font-size="12" fill="var(--inchiostro)">persone non coinvolte</text>
  <!-- A3 -->
  <line x1="60" y1="258" x2="700" y2="258" stroke="var(--linea)" stroke-dasharray="2 4"/>
  <circle cx="120" cy="258" r="6" fill="var(--ottone)"/>
  <line x1="120" y1="258" x2="560" y2="258" stroke="var(--z-rossa)" stroke-width="2"/>
  <text x="300" y="250" font-family="var(--dato), monospace" font-size="11" fill="var(--z-rossa)">150 m da aree residenziali, commerciali, industriali, ricreative</text>
  <rect x="572" y="238" width="18" height="20" fill="var(--grigio)" opacity=".4"/>
  <rect x="596" y="230" width="18" height="28" fill="var(--grigio)" opacity=".4"/>
  <rect x="620" y="243" width="18" height="15" fill="var(--grigio)" opacity=".4"/>
</svg>
<figcaption>Le distanze minime nelle tre sottocategorie della categoria aperta.</figcaption>
</figure>
<div class="tab-wrap"><table>
<thead><tr><th>Sotto&shy;categoria</th><th>Classi</th><th>Persone non coinvolte</th><th>Edifici e aree</th></tr></thead>
<tbody>
<tr><td><b>A1</b></td><td>C0, C1</td><td>C0: sorvolo consentito. C1: sorvolo consentito ma da evitare, mai su assembramenti. Con C1 non sorvolare intenzionalmente persone non coinvolte.</td><td>Sorvolo di edifici consentito se il drone resta a vista.</td></tr>
<tr><td><b>A2</b></td><td>C2</td><td>Minimo 30 m in orizzontale. Riducibili a 5 m se la modalità a bassa velocità è attiva (massimo 3 m/s) e il pilota ha valutato meteo, prestazioni e area.</td><td>Volo in ambiente urbano ammesso, senza sorvolo diretto di persone non coinvolte.</td></tr>
<tr><td><b>A3</b></td><td>C2, C3, C4, legacy</td><td>Nessuna persona non coinvolta deve essere ragionevolmente presente. Distanza minima 30 m in caso di comparsa imprevista.</td><td>Almeno 150 m da aree residenziali, commerciali, industriali e ricreative.</td></tr>
</tbody></table></div>
<div class="nota attenzione">
<span class="eyebrow">Il tranello dei 5 metri</span>
<p>I 5 metri in A2 non sono un'alternativa libera ai 30. Sono una riduzione condizionata: serve la modalità a bassa velocità attiva e una valutazione preventiva della situazione. Senza quelle condizioni il riferimento resta 30 metri.</p>
</div>`
    },
    {
      id: 'coinvolte',
      titolo: 'Persone coinvolte e non coinvolte',
      html: `
<p>La differenza decide quasi tutto in fase di pianificazione. Una persona è <b>coinvolta</b> solo se soddisfa entrambe queste condizioni:</p>
<ul>
<li>ha dato un consenso esplicito e personale a partecipare all'operazione UAS;</li>
<li>ha ricevuto istruzioni chiare sul comportamento da tenere in caso di emergenza.</li>
</ul>
<p>Tutte le altre sono persone non coinvolte, incluso il passante che si ferma a guardare e il vicino che affaccia dal balcone.</p>
<h3>Assembramento</h3>
<p>Un assembramento è un gruppo di persone talmente denso da impedire ai singoli di allontanarsi liberamente in caso di incidente. Non conta il numero assoluto: conta la possibilità di evacuare. Un mercato, una fila all'ingresso di uno stadio e una spiaggia affollata rientrano nella definizione. Su un assembramento non si vola mai, con nessuna classe e in nessuna sottocategoria.</p>
<h3>Valutazione dell'area prima del decollo</h3>
<p>Spetta a te stabilire, prima di iniziare, che non sorvolerai persone non coinvolte. La verifica riguarda:</p>
<ul>
<li>strade, marciapiedi, sentieri e piste ciclabili presenti nell'area;</li>
<li>la possibilità concreta di delimitare la zona di decollo e atterraggio;</li>
<li>il volume di traffico e l'ora del giorno, perché lo stesso piazzale alle 7 del mattino e alle 18 sono due luoghi diversi.</li>
</ul>
<p>Se una persona non coinvolta entra nell'area durante il volo devi aumentare subito la distanza o spostare l'aeromobile. Se le persone diventano più di una o si forma un gruppo, l'operazione va interrotta.</p>
<figure data-src="03-lettura-area.png" data-cap="La stessa area letta in pianta: dove finirebbe il drone e chi si trova in quel punto."></figure>`
    },
    {
      id: 'veicoli',
      titolo: 'Strade, veicoli e animali',
      html: `
<p>Il rischio legato alle strade nasce da due meccanismi distinti. Il <b>pericolo diretto</b> è l'impatto del drone contro tetto o parabrezza di un veicolo in movimento, dove la gravità dipende dall'energia cinetica trasferita. Il <b>pericolo indiretto</b> è la manovra brusca di un automobilista che tenta di evitare il drone o i suoi rottami.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Sottocategoria</th><th>Sorvolo di veicoli in movimento</th><th>Condizioni</th></tr></thead>
<tbody>
<tr><td><b>A1</b></td><td>Attraversamento solo se necessario</td><td>Non sostare nei paraggi, non proseguire il volo in prossimità della carreggiata</td></tr>
<tr><td><b>A2</b></td><td>Attraversamento solo se necessario</td><td>Quota minima 20 m sopra il livello del suolo e sopra gli ostacoli, drone sempre in vista, nessuna distrazione per i conducenti</td></tr>
<tr><td><b>A3</b></td><td>Non consentito</td><td>Nessun veicolo in circolazione deve trovarsi sotto la traiettoria</td></tr>
</tbody></table></div>
<h3>Animali</h3>
<p>Il regolamento europeo non fissa distanze numeriche per gli animali. Vale il principio di non arrecare disturbo, con attenzione particolare agli uccelli durante la stagione riproduttiva. In Italia il volo sulle aree protette e sui siti Natura 2000 richiede in genere l'autorizzazione dell'ente gestore, e molte di queste aree compaiono su D-Flight come zone interdette.</p>`
    },
    {
      id: 'quote-notte',
      titolo: 'Quota massima e periodo di volo',
      html: `
<p>Nella categoria Open la quota massima è di <b>120 metri dal punto più vicino della superficie terrestre</b>. Non 120 metri dal punto di decollo: se voli lungo un pendio, il riferimento si sposta con il terreno.</p>
<p>Se devi ispezionare un ostacolo più alto di 120 metri, e hai il permesso del proprietario, puoi salire fino a 15 metri sopra la sommità dell'ostacolo, restando entro 50 metri in orizzontale da esso.</p>
<div class="nota italia">
<span class="eyebrow">Attenzione in Italia</span>
<p>I 120 metri sono un massimo teorico. Nelle zone geografiche UAS pubblicate su D-Flight il tetto scende a 60, 45 o 25 metri, fino al divieto totale nelle zone rosse. Il modulo <a href="#/m/spazio-aereo">Spazio aereo e zone geografiche</a> entra nel dettaglio.</p>
</div>
<h3>Voli notturni</h3>
<p>Nella categoria Open si vola nel <b>periodo di luce diurna uniforme</b> (Uniform Daylight Period, UDP), che inizia 15 minuti prima dell'alba e termina 15 minuti dopo il tramonto. Al di fuori di questa finestra servono condizioni particolari: il drone deve essere dotato di luce verde lampeggiante ben visibile e vanno rispettate le prescrizioni nazionali.</p>
<figure data-src="04-udp.png" data-cap="La finestra utile si apre 15 minuti prima dell'alba e si chiude 15 minuti dopo il tramonto."></figure>`
    },
    {
      id: 'equipaggio',
      titolo: 'Equipaggio e osservatore',
      html: `
<p>Su operazioni articolate il pilota fa parte di una squadra, che di norma va da due a quattro persone: comandante dell'UAS, osservatore, membro di equipaggio a terra ed eventualmente il committente.</p>
<h3>Cosa fa l'osservatore</h3>
<ul>
<li>Osserva continuamente lo spazio aereo in tutte le direzioni, a occhio nudo.</li>
<li>Si concentra sul traffico in avvicinamento: altri UAS, uccelli, aeromobili con equipaggio.</li>
<li>Avvisa il pilota in tempo utile perché possa manovrare.</li>
</ul>
<p>Resta vicino al pilota, in modo che la comunicazione sia immediata e verbale. Non può usare binocoli o altri ausili ottici.</p>
<h3>Precedenze in volo</h3>
<p>Un UAS dà <b>sempre</b> la precedenza ad aeroplani, elicotteri, alianti, palloni e dirigibili. Quando due aeromobili si incrociano alla stessa quota, la precedenza spetta a chi ha l'altro alla propria destra. In caso di avvicinamento frontale, entrambi accostano a destra. Gli aeromobili in decollo o atterraggio hanno la precedenza su tutto il resto.</p>
<p>Se vedi traffico con equipaggio alla tua stessa quota o più in basso, la prima azione è sempre <b>scendere</b>. La separazione orizzontale di riferimento è di almeno 500 metri: se non riesci a garantirla, atterra.</p>`
    },
    {
      id: 'merci',
      titolo: 'Merci pericolose',
      html: `
<p>Nella categoria Open non è consentito trasportare merci pericolose né rilasciare sostanze o materiali. Rientrano nella definizione i pesticidi, i prodotti chimici, il sangue non testato e in generale ogni carico che possa causare danno in caso di caduta.</p>
<p>Le batterie ai polimeri di litio non sono un payload, ma restano un rischio da trattare con cura: trasporto in borsa ignifuga, conservazione a temperatura controllata, ispezione dopo ogni atterraggio duro.</p>`
    }
  ],
  ricorda: [
    'Categoria Open: VLOS obbligatorio, MTOM sotto 25 kg, quota massima 120 m dal terreno.',
    'La visibilità minima per operare in VMC classe G è 1500 metri.',
    'A2: 30 metri dalle persone non coinvolte, riducibili a 5 metri solo in modalità a bassa velocità (max 3 m/s).',
    'A3: almeno 150 metri da aree residenziali, commerciali, industriali e ricreative.',
    'Una persona è coinvolta solo con consenso esplicito e istruzioni di sicurezza ricevute.',
    'Su un assembramento non si vola mai, con nessuna classe di drone.',
    'Il periodo di luce diurna uniforme inizia 15 minuti prima dell alba e finisce 15 minuti dopo il tramonto.',
    'Sopra un ostacolo più alto di 120 m si può salire fino a 15 m sopra la sommità, entro 50 m in orizzontale.',
    'Separazione minima dal traffico con equipaggio: 500 metri in orizzontale, altrimenti si atterra.'
  ],
  quiz: [
    { d: 'Qual è la quota massima consentita nella categoria Open?', o: ['100 metri dal punto di decollo', '120 metri dal punto più vicino della superficie terrestre', '150 metri sul livello del mare', '120 metri sul livello del mare'], c: 1,
      sp: 'Il riferimento è il terreno sottostante, non il punto di decollo. Volando lungo un pendio il limite si sposta con la superficie.' },
    { d: 'In sottocategoria A2, a quale distanza minima puoi avvicinarti a persone non coinvolte con la modalità a bassa velocità attiva?', o: ['30 metri', '15 metri', '5 metri', '1 metro'], c: 2,
      sp: 'I 30 metri scendono a 5 solo con modalità a bassa velocità attiva, cioè massimo 3 m/s, e dopo aver valutato meteo, prestazioni del drone e area di sorvolo.' },
    { d: 'Quando una persona è considerata coinvolta in un\'operazione UAS?', o: ['Quando si trova entro 30 metri dal pilota', 'Quando ha dato consenso esplicito e ha ricevuto istruzioni di sicurezza', 'Quando è un familiare del pilota', 'Quando indossa un giubbotto ad alta visibilità'], c: 1,
      sp: 'Servono entrambe le condizioni. Il giubbotto da solo non trasforma un passante in membro dell operazione.' },
    { d: 'Quale distanza minima devi mantenere in A3 dalle aree residenziali e industriali?', o: ['30 metri', '50 metri', '150 metri', '500 metri'], c: 2,
      sp: 'I 30 metri riguardano le persone non coinvolte che compaiono in modo imprevisto. I 150 metri riguardano le aree.' },
    { d: 'Quando inizia il periodo di luce diurna uniforme (UDP)?', o: ['All\'alba esatta', '15 minuti prima dell\'alba', '30 minuti prima dell\'alba', 'Un\'ora dopo l\'alba'], c: 1,
      sp: 'Inizia 15 minuti prima dell alba e termina 15 minuti dopo il tramonto.' },
    { d: 'Un drone incrocia un elicottero alla stessa quota. Cosa fai?', o: ['Mantieni la quota, hai la precedenza', 'Sali per superarlo', 'Scendi e dai la precedenza', 'Attivi il Return to Home'], c: 2,
      sp: 'Un UAS dà sempre la precedenza al traffico con equipaggio. La prima azione è scendere, poi si valuta se atterrare.' },
    { d: 'Quale classe di drone è ammessa esclusivamente in sottocategoria A2?', o: ['C1', 'C2', 'C3', 'C4'], c: 1,
      sp: 'La C2 (sotto i 4 kg) è la classe pensata per la A2. Può operare anche in A3, ma è l unica ammessa in A2.' },
    { d: 'Il volo FPV nella categoria Open è consentito?', o: ['Mai', 'Sì, se accanto al pilota c\'è un osservatore che mantiene il contatto visivo', 'Sì, senza alcuna condizione', 'Solo con droni sotto i 250 grammi'], c: 1,
      sp: 'L osservatore garantisce il rispetto del requisito VLOS mentre il pilota guarda dentro il visore. Non può usare ausili ottici.' },
    { d: 'Quale visibilità minima è richiesta per operare in condizioni VMC nello spazio aereo di classe G?', o: ['500 metri', '1000 metri', '1500 metri', '5000 metri'], c: 2,
      sp: 'Sotto i 1500 metri di visibilità le condizioni non sono più VMC. Con visibilità sotto i 1000 metri si parla di nebbia.' },
    { d: 'Devi ispezionare un traliccio alto 160 metri, con il permesso del proprietario. Fino a che quota puoi salire in categoria Open?', o: ['120 metri', '160 metri', '175 metri', 'Non è consentito'], c: 2,
      sp: 'Fino a 15 metri sopra la sommità dell ostacolo, quindi 175 metri, restando entro 50 metri in orizzontale.' }
  ]
},

/* =================================================================== II */
{
  id: 'regolamentazione',
  num: 'II',
  titolo: 'Regolamentazione aeronautica',
  area: 'normativa',
  percorsi: ['a1a3'],
  durata: 30,
  sommario: 'Chi scrive le regole, quali obblighi hai come pilota e come operatore, come ci si registra in Italia e cosa fare dopo un incidente.',
  sezioni: [
    {
      id: 'catena',
      titolo: 'Dalla ICAO a ENAC',
      html: `
<p>Le regole che applichi al parco sotto casa scendono da una catena di quattro livelli.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Livello</th><th>Chi</th><th>Cosa produce</th></tr></thead>
<tbody>
<tr><td>Mondiale</td><td><b>ICAO</b>, agenzia delle Nazioni Unite fondata nel 1944 con la Convenzione di Chicago</td><td>Standard e pratiche raccomandate, cartografia aeronautica standardizzata. Le divergenze nazionali vanno pubblicate nell'AIP di ciascun Paese.</td></tr>
<tr><td>Europeo</td><td><b>EASA</b>, Agenzia dell'Unione europea per la sicurezza aerea</td><td>Elabora le norme che la Commissione europea trasforma in regolamenti vincolanti.</td></tr>
<tr><td>Regolamenti</td><td>Commissione europea</td><td><b>(UE) 2019/947</b> su regole e procedure operative, <b>(UE) 2019/945</b> sui requisiti tecnici e sulle classi C0-C6.</td></tr>
<tr><td>Nazionale</td><td><b>ENAC</b>, Ente nazionale per l'aviazione civile</td><td>Regolamento UAS-IT, circolari (fra cui ATM-09A sulle zone geografiche), vigilanza, rilascio degli attestati.</td></tr>
</tbody></table></div>
<p>I regolamenti europei sono applicabili dal 31 dicembre 2020 e valgono negli Stati membri UE più Islanda, Liechtenstein, Norvegia e Svizzera.</p>`
    },
    {
      id: 'consentito',
      titolo: 'Cosa è consentito e cosa no',
      html: `
<div class="tab-wrap"><table>
<thead><tr><th>Consentito in Open</th><th>Vietato in Open</th></tr></thead>
<tbody>
<tr><td>Volare fino a 120 m dal terreno</td><td>Volare sopra un assembramento di persone</td></tr>
<tr><td>Operare in spazio aereo non controllato</td><td>Entrare in spazio aereo controllato senza autorizzazione</td></tr>
<tr><td>Volo a vista (VLOS)</td><td>BVLOS e voli autonomi</td></tr>
<tr><td>Uso ricreativo e professionale</td><td>Trasporto di persone o di merci pericolose</td></tr>
<tr><td>Massa massima al decollo fino a 25 kg</td><td>Rilascio di sostanze o materiali</td></tr>
</tbody></table></div>
<p>Il volo <b>automatico</b> è ammesso: il drone segue una rotta preimpostata ma il pilota può riprendere il comando in qualsiasi istante. Il volo <b>autonomo</b>, in cui l'aeromobile prende decisioni che il pilota non può correggere, non è ammesso in categoria Open.</p>`
    },
    {
      id: 'eta',
      titolo: 'Età minima',
      html: `
<p>L'età minima per pilotare nella categoria Open è di <b>16 anni</b>. Ogni Stato membro può abbassarla, ma mai sotto i 12 anni. In Italia il riferimento restano i 16 anni.</p>
<p>Chi ha meno di 16 anni può comunque pilotare in due casi: sotto la supervisione diretta di un pilota qualificato, oppure in autonomia con un UAS di classe C0. Non esiste invece un'età minima per seguire la formazione e sostenere l'esame.</p>`
    },
    {
      id: 'obblighi-pilota',
      titolo: 'Gli obblighi del pilota',
      html: `
<p>Prima di ogni operazione il pilota deve essere formato per la sottocategoria in cui opererà, disporre di informazioni aggiornate sulla zona di volo e verificare l'area per ostacoli e persone non coinvolte.</p>
<h3>Durante il volo</h3>
<ul>
<li>Mantenere l'UAS in VLOS e sorvegliare lo spazio aereo circostante.</li>
<li>Non pilotare sotto effetto di alcol o di sostanze psicoattive, né in condizioni di stanchezza, malattia o terapia farmacologica che riducano la prontezza.</li>
<li>Interrompere il volo se l'operazione mette in pericolo altri aeromobili, persone, animali, ambiente o beni.</li>
<li>Rispettare le zone geografiche pubblicate e mantenere aggiornata la geo-consapevolezza del drone.</li>
<li>Operare un solo UAS alla volta, senza guidare contemporaneamente un altro veicolo in movimento.</li>
<li>Restare lontano dalle aree in cui operano i servizi di emergenza, salvo autorizzazione esplicita.</li>
</ul>
<div class="nota attenzione">
<span class="eyebrow">Ausili visivi</span>
<p>Né il pilota né l'osservatore possono usare binocoli o altri strumenti per estendere la portata visiva. L'unica eccezione riguarda le emergenze, per esempio individuare il punto di un atterraggio forzato lontano.</p>
</div>`
    },
    {
      id: 'obblighi-operatore',
      titolo: 'Gli obblighi dell\'operatore',
      html: `
<p>Se voli nell'ambito di un'attività professionale, dietro il pilota c'è un <b>operatore UAS</b>: una persona fisica con partita IVA, una società o un ente. L'operatore risponde dell'organizzazione dell'attività.</p>
<ul>
<li>Sviluppare procedure operative specifiche per le missioni che svolge.</li>
<li>Usare la banda radio in modo efficiente e conforme.</li>
<li>Designare per ogni operazione un pilota addestrato ed eventuale personale di supporto.</li>
<li>Assicurarsi che pilota, osservatore e personale conoscano il manuale dell'aeromobile impiegato.</li>
<li>Fornire le informazioni sulle zone geografiche interessate e aggiornare la geo-consapevolezza del drone.</li>
<li>Garantire che l'aeromobile abbia la dichiarazione di conformità UE e l'etichetta di classe applicata.</li>
<li>Effettuare il briefing di sicurezza, nelle operazioni A2 e A3, per tutte le persone coinvolte, raccogliendone il consenso esplicito.</li>
</ul>`
    },
    {
      id: 'registrazione',
      titolo: 'Registrazione e attestati in Italia',
      html: `
<p>In Italia i due adempimenti viaggiano su portali diversi. La <b>registrazione dell'operatore</b> si fa su D-Flight, l'<b>esame</b> per l'attestato di pilota si fa sul portale ENAC.</p>
<h3>Registrazione operatore su D-Flight</h3>
<p>Ti registri come persona fisica o come impresa e ottieni un numero di operatore UAS, con relativo QR code da applicare in modo leggibile su ogni drone della tua flotta. Lo stesso numero va inserito nel sistema di identificazione remota dell'aeromobile.</p>
<p>La registrazione è obbligatoria quando il drone pesa 250 g o più, oppure quando, a qualsiasi peso, è dotato di telecamera, microfono o altro sensore in grado di raccogliere dati personali. Sono esclusi i giocattoli ai sensi della direttiva 2009/48/CE.</p>
<div class="nota italia">
<span class="eyebrow">In pratica</span>
<p>Un drone da 249 grammi con fotocamera va registrato. Il peso non basta come criterio: la telecamera fa scattare l'obbligo da sola.</p>
</div>
<h3>Attestato A1/A3</h3>
<p>Corso online e esame a risposta multipla sul portale ENAC dedicato ai piloti UAS. Serve SPID per i maggiorenni, con procedura assistita per i minorenni. L'esame conta <b>40 domande in 60 minuti</b> e si supera con almeno il 75% di risposte corrette. L'attestato ha <b>validità 5 anni</b>.</p>
<h3>Attestato A2</h3>
<p>Richiede tre condizioni: essere già in possesso dell'attestato A1/A3, dichiarare di aver completato l'addestramento pratico in autoistruzione nelle condizioni della sottocategoria A3, e superare un esame teorico aggiuntivo. L'esame conta <b>30 domande in 60 minuti</b>, 2 punti per risposta esatta, 0 per risposta errata o non data, e si supera con almeno 45 punti su 60, cioè il 75%. Si sostiene presso un'entità riconosciuta ENAC. Anche l'A2 vale 5 anni.</p>
<div class="dati">
<div class="dato"><b>40<span> dom</span></b><small>Esame A1/A3</small></div>
<div class="dato"><b>30<span> dom</span></b><small>Esame A2</small></div>
<div class="dato"><b>75<span> %</span></b><small>Soglia in entrambi</small></div>
<div class="dato"><b>5<span> anni</span></b><small>Validità attestati</small></div>
<div class="dato"><b>16<span> anni</span></b><small>Età minima in Italia</small></div>
</div>
<p>Gli attestati europei sono riconosciuti in tutti gli Stati che applicano il regolamento. Un A2 conseguito in Spagna o in Olanda vale in Italia, e viceversa.</p>`
    },
    {
      id: 'incidenti',
      titolo: 'Cosa segnalare e a chi',
      html: `
<p>La segnalazione degli eventi non è un adempimento burocratico fine a sé stesso: alimenta il sistema di sicurezza aeronautico. Vanno riportati:</p>
<ul>
<li>una quasi collisione (<b>AIRPROX</b>) con un altro aeromobile, subita o provocata;</li>
<li>un incidente o un inconveniente grave che coinvolge l'UAS;</li>
<li>danni all'aeromobile che ne compromettono l'aeronavigabilità;</li>
<li>un <b>fly away</b>, cioè la perdita completa del controllo con allontanamento del drone.</li>
</ul>
<p>Se l'evento avviene nell'intorno di un aeroporto controllato, il controllo del traffico aereo locale va informato immediatamente. L'operatore o il pilota deve inoltre segnalare l'evento a ENAC, in particolare per incidenti e inconvenienti gravi. In caso di fly away si annotano direzione, quota, velocità e batteria residua al momento della perdita, e si allerta anche l'autorità di pubblica sicurezza.</p>`
    }
  ],
  ricorda: [
    'I regolamenti di riferimento sono (UE) 2019/947 per le operazioni e (UE) 2019/945 per i requisiti tecnici.',
    'ENAC è l autorità dell aviazione civile italiana. La registrazione operatore avviene su D-Flight.',
    'Età minima in categoria Open: 16 anni in Italia, mai sotto i 12 anni in UE.',
    'Registrazione obbligatoria da 250 g, oppure a qualsiasi peso se il drone ha telecamera o sensori.',
    'Esame A1/A3: 40 domande in 60 minuti, soglia 75%. Esame A2: 30 domande in 60 minuti, soglia 45 punti su 60.',
    'Gli attestati di pilota hanno validità 5 anni.',
    'Il volo automatico è ammesso in Open, il volo autonomo no.',
    'Si opera un solo UAS alla volta e mai a bordo di un veicolo in movimento.'
  ],
  quiz: [
    { d: 'Quale organizzazione elabora le norme europee sulla sicurezza aerea?', o: ['ICAO', 'EASA', 'ENAC', 'Eurocontrol'], c: 1,
      sp: 'EASA elabora, la Commissione europea adotta i regolamenti, ENAC li applica in Italia. ICAO opera a livello mondiale.' },
    { d: 'Quale regolamento europeo definisce le classi di marcatura da C0 a C6?', o: ['(UE) 2019/947', '(UE) 2019/945', '(CE) 785/2004', '(UE) 2016/679'], c: 1,
      sp: 'Il 2019/945 riguarda i requisiti tecnici dei prodotti. Il 2019/947 riguarda le regole operative.' },
    { d: 'Un drone da 249 grammi dotato di fotocamera deve essere registrato?', o: ['No, è sotto i 250 grammi', 'Sì, la presenza della telecamera fa scattare l\'obbligo', 'Solo se usato professionalmente', 'Solo se vola oltre i 50 metri'], c: 1,
      sp: 'La soglia dei 250 g e la presenza di sensori per la raccolta di dati personali sono due criteri indipendenti. Basta uno dei due.' },
    { d: 'Quanto vale un attestato di pilota UAS rilasciato in categoria Open?', o: ['2 anni', '3 anni', '5 anni', 'A tempo indeterminato'], c: 2,
      sp: 'Cinque anni, poi va rinnovato. Vale in tutti gli Stati che applicano il regolamento europeo.' },
    { d: 'Qual è l\'età minima per pilotare in categoria Open in Italia?', o: ['12 anni', '14 anni', '16 anni', '18 anni'], c: 2,
      sp: 'Gli Stati membri possono abbassarla fino a 12 anni. L Italia si è attenuta ai 16.' },
    { d: 'Il volo autonomo è ammesso nella categoria Open?', o: ['Sì, sempre', 'No, è ammesso solo il volo automatico con possibilità di intervento del pilota', 'Sì, se il drone pesa meno di 900 grammi', 'Sì, se dichiarato a ENAC'], c: 1,
      sp: 'Nel volo autonomo il pilota non può correggere le decisioni dell aeromobile. In Open serve poter riprendere il comando in ogni momento.' },
    { d: 'Come si chiama la quasi collisione tra due aeromobili?', o: ['NOTAM', 'AIRPROX', 'AIRMET', 'SIGMET'], c: 1,
      sp: 'AIRPROX. Va segnalata anche se non si è verificato alcun contatto.' },
    { d: 'Chi deve effettuare il briefing di sicurezza alle persone coinvolte in un\'operazione A2 o A3?', o: ['Il committente', 'L\'operatore UAS', 'ENAC', 'Il proprietario del terreno'], c: 1,
      sp: 'L operatore garantisce il briefing e raccoglie il consenso esplicito delle persone presenti nell area di volo.' },
    { d: 'Il pilota può usare un binocolo per seguire il drone?', o: ['Sì, migliora la sicurezza', 'No, salvo situazioni di emergenza', 'Sì, se lo usa l\'osservatore', 'Sì, oltre i 500 metri di distanza'], c: 1,
      sp: 'Gli ausili ottici estenderebbero artificialmente il VLOS. L eccezione riguarda solo le emergenze, per esempio localizzare un atterraggio forzato.' },
    { d: 'Quante domande prevede l\'esame teorico per l\'attestato A2?', o: ['20', '30', '40', '60'], c: 1,
      sp: '30 domande in 60 minuti, 2 punti per risposta corretta, soglia 45 punti su 60 pari al 75%.' }
  ]
},

/* ================================================================== III */
{
  id: 'idoneita',
  num: 'III',
  titolo: 'Idoneità al volo',
  area: 'fattore-umano',
  percorsi: ['a1a3'],
  durata: 20,
  sommario: 'Il fattore umano: la checklist I.M.S.A.F.E., i farmaci che compromettono le prestazioni, i limiti della percezione a distanza.',
  sezioni: [
    {
      id: 'imsafe',
      titolo: 'La checklist I.M.S.A.F.E.',
      html: `
<p>La maggior parte degli inconvenienti con i droni non nasce da guasti tecnici. Nasce da un pilota che quel giorno non era nelle condizioni di pilotare. I.M.S.A.F.E. è un promemoria mutuato dall'aviazione generale, sei domande da farsi prima di uscire di casa.</p>
<ul class="check" data-check="imsafe">
<li><label><input type="checkbox"><span><b>I</b>llness, malattia. Sono malato o ho sintomi in arrivo?</span></label></li>
<li><label><input type="checkbox"><span><b>M</b>edication, farmaci. Ho assunto medicinali, anche da banco?</span></label></li>
<li><label><input type="checkbox"><span><b>S</b>tress. Sono sotto pressione o teso per motivi di lavoro o personali?</span></label></li>
<li><label><input type="checkbox"><span><b>A</b>lcohol, alcol. Ho bevuto nelle ultime ore?</span></label></li>
<li><label><input type="checkbox"><span><b>F</b>atigued, stanchezza. Ho dormito abbastanza?</span></label></li>
<li><label><input type="checkbox"><span><b>E</b>ating, alimentazione. Ho mangiato a sufficienza?</span></label></li>
</ul>
<p>La risposta a una di queste domande raramente è un no secco al volo. Più spesso indica di alzare il livello di attenzione, ridurre la complessità della missione o rimandarla.</p>
<div class="nota attenzione">
<span class="eyebrow">Alcol</span>
<p>Non esiste un tasso alcolemico tollerato per pilotare un UAS. Il regolamento vieta di operare sotto effetto di alcol o sostanze psicoattive. La regola di prudenza diffusa nell'aviazione generale prevede almeno dieci ore fra l'ultimo consumo e il volo, e comunque l'assenza di ogni effetto residuo.</p>
</div>`
    },
    {
      id: 'farmaci',
      titolo: 'Farmaci e prestazioni',
      html: `
<p>I farmaci da banco non sono innocui rispetto alla capacità di pilotare. Molti agiscono su attenzione, tempi di reazione e giudizio.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Categoria</th><th>Effetti rilevanti per il volo</th></tr></thead>
<tbody>
<tr><td>Antistaminici</td><td>Vertigini e sonnolenza, anche nelle formulazioni definite non sedative</td></tr>
<tr><td>Acido acetilsalicilico</td><td>Alterazione della temperatura corporea e della respirazione, fluidificazione del sangue</td></tr>
<tr><td>Sonniferi</td><td>Riduzione della reattività e della capacità di concentrazione, con effetti che si protraggono al mattino</td></tr>
<tr><td>Prodotti dimagranti</td><td>Contengono spesso stimolanti di tipo anfetaminico che alterano il giudizio</td></tr>
<tr><td>Antitosse, antidiarroici, antinausea, antiacidi</td><td>Sonnolenza, secchezza, disturbi della percezione</td></tr>
</tbody></table></div>
<p>Il disturbo più frequente fra i piloti resta comunque l'intossicazione alimentare, che si manifesta in fretta e senza preavviso.</p>`
    },
    {
      id: 'osservazione',
      titolo: 'I limiti dell\'osservazione',
      html: `
<p>Tenere il drone a vista sembra semplice finché non lo si prova in condizioni reali. La capacità di osservazione peggiora per cause che vale la pena riconoscere prima, non durante.</p>
<ul>
<li><b>Il pilota</b>: acuità visiva, stress, stanchezza, alcol.</li>
<li><b>Il terreno</b>: ostacoli, vegetazione, dislivelli che interrompono la linea di vista.</li>
<li><b>Il meteo</b>: foschia in lontananza, sole basso che abbaglia, controluce.</li>
<li><b>Il movimento del pilota</b>: seguire un drone stando su un'imbarcazione o su un veicolo in movimento è molto più difficile.</li>
<li><b>La distanza</b> che cresce mentre tu non puoi avvicinarti.</li>
</ul>
<h3>Quanto lontano posso spingermi</h3>
<p>La distanza massima non è un numero fisso: dipende dalle dimensioni del drone e dalle caratteristiche dell'area. Un multirotore bianco su cielo bianco sparisce a 150 metri, lo stesso drone contro un versante scuro resta visibile molto più lontano. In presenza di ostacoli, la distanza va ridotta. Tenere l'UAS relativamente basso aiuta anche a restare sotto il traffico con equipaggio, che normalmente vola più alto degli ostacoli.</p>`
    },
    {
      id: 'consapevolezza',
      titolo: 'Velocità, quota e consapevolezza situazionale',
      html: `
<p>Più veloce vola il drone, meno tempo hai per reagire. Molti radiocomandi mostrano velocità e quota via data link, ma a occhio dovresti comunque riconoscere se l'aeromobile sta accelerando o rallentando.</p>
<p>La quota indicata dall'app è riferita al punto di decollo, non al terreno sottostante. Su un terreno in pendenza i due valori divergono rapidamente: è un errore classico quando si vola in montagna o lungo le sponde di un lago.</p>
<h3>Consapevolezza situazionale</h3>
<p>Vuol dire osservare contemporaneamente tutti i fattori operativi e ambientali rilevanti, così da poter correggere l'UAS immediatamente. Il nemico principale è il volo per routine: fare sempre le stesse cose nello stesso posto abbassa la soglia di attenzione proprio quando serve.</p>
<h3>Volo con poca luce</h3>
<p>Al buio l'occhio si adatta gradualmente, ma non tutti allo stesso modo. Gli ostacoli poco illuminati diventano invisibili e si perde il riferimento dell'orientamento del drone. Se devi operare con poca luce, tieni l'aeromobile vicino, preferibilmente in un'area illuminata, e assicurati che la luce di posizione sia accesa e ben visibile.</p>`
    }
  ],
  ricorda: [
    'I.M.S.A.F.E.: Illness, Medication, Stress, Alcohol, Fatigued, Eating.',
    'Non esiste un tasso alcolemico tollerato: il regolamento vieta di operare sotto effetto di alcol o sostanze psicoattive.',
    'Gli antistaminici causano sonnolenza e vertigini anche nelle versioni dichiarate non sedative.',
    'La quota mostrata dall app è riferita al punto di decollo, non al terreno sottostante.',
    'Con traffico alla stessa quota: separazione minima 500 metri in orizzontale, altrimenti si atterra.',
    'Il volo per routine riduce la consapevolezza situazionale.'
  ],
  quiz: [
    { d: 'Cosa indica la lettera F nella checklist I.M.S.A.F.E.?', o: ['Fuel, carburante', 'Fatigued, stanchezza', 'Frequency, frequenza radio', 'Flight plan, piano di volo'], c: 1,
      sp: 'Illness, Medication, Stress, Alcohol, Fatigued, Eating.' },
    { d: 'Quale effetto tipico hanno gli antistaminici sul pilota?', o: ['Aumento della reattività', 'Vertigini e sonnolenza', 'Miglioramento della visione notturna', 'Nessun effetto rilevante'], c: 1,
      sp: 'Anche le formulazioni presentate come non sedative possono ridurre attenzione e tempi di reazione.' },
    { d: 'La quota indicata dall\'applicazione del drone è riferita a:', o: ['Il livello medio del mare', 'Il punto di decollo', 'Il terreno immediatamente sottostante', 'La quota di crociera impostata'], c: 1,
      sp: 'Volando su terreno in pendenza il valore mostrato e la reale altezza dal suolo divergono in fretta.' },
    { d: 'Quale fattore riduce la consapevolezza situazionale in modo subdolo?', o: ['Un vento leggero', 'Il volo per routine nello stesso luogo', 'La presenza di un osservatore', 'Una batteria nuova'], c: 1,
      sp: 'La ripetizione abbassa la soglia di attenzione. È un rischio riconosciuto in tutta l aviazione.' },
    { d: 'In presenza di ostacoli nell\'area di volo, la distanza pilota-drone deve essere:', o: ['Aumentata', 'Ridotta', 'Mantenuta a 500 metri', 'Indifferente'], c: 1,
      sp: 'Gli ostacoli interrompono la linea di vista, quindi il raggio operativo utile si accorcia.' },
    { d: 'Qual è il disturbo più frequente fra i piloti secondo il materiale di riferimento?', o: ['Emicrania', 'Intossicazione alimentare', 'Mal di schiena', 'Congiuntivite'], c: 1,
      sp: 'Si manifesta rapidamente e compromette la capacità di condurre l operazione.' }
  ]
},

/* =================================================================== IV */
{
  id: 'procedure-operative',
  num: 'IV',
  titolo: 'Procedure operative',
  area: 'procedure',
  percorsi: ['a1a3'],
  durata: 35,
  sommario: 'Preparazione del volo, controllo delle condizioni, modalità di pilotaggio, procedure di emergenza, registro voli e manutenzione.',
  sezioni: [
    {
      id: 'preparazione',
      titolo: 'Preparazione del volo',
      html: `
<p>La preparazione a tavolino costa dieci minuti e risolve la maggior parte dei problemi prima che si presentino. Su cosa concentrarsi:</p>
<ul>
<li><b>Zone geografiche</b>: aree interdette o soggette a limitazioni di quota. In Italia il riferimento è D-Flight.</li>
<li><b>Ostacoli</b>: pale eoliche, tralicci, cavi sospesi, gru. I cavi sono i più insidiosi perché quasi invisibili in volo.</li>
<li><b>Edifici e infrastrutture critiche</b>: porti, impianti industriali, centrali, carceri, siti militari.</li>
<li><b>Traffico</b>: strade, ferrovie, corsi d'acqua navigabili.</li>
<li><b>Persone non coinvolte</b>: presenza attesa e possibilità di delimitare l'area.</li>
</ul>
<p>Per il sopralluogo a distanza funzionano bene le viste satellitari e Street View, ma vanno incrociati con la mappa aeronautica e con lo stato aggiornato delle zone UAS.</p>
<h3>Il campo di prova</h3>
<p>Se non conosci bene l'aeromobile o hai cambiato payload, fai prima un volo di verifica in un campo aperto, senza edifici nelle vicinanze, senza traffico e senza persone.</p>`
    },
    {
      id: 'condizioni',
      titolo: 'Il controllo delle condizioni',
      html: `
<p>Cinque fattori ambientali incidono sulle prestazioni dell'aeromobile. I primi quattro sono ricordati con l'acronimo <b>H.H.H.H.</b>, a cui si aggiunge l'attività solare.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Fattore</th><th>Effetto</th></tr></thead>
<tbody>
<tr><td><b>Hot</b>, calore</td><td>Le temperature alte disturbano le celle delle batterie e possono far entrare in protezione l'elettronica. L'aria calda è meno densa, quindi le eliche generano meno portanza.</td></tr>
<tr><td><b>Height</b>, quota</td><td>Salendo, l'aria si rarefà. In montagna la stessa massa richiede più giri motore e consuma di più.</td></tr>
<tr><td><b>Humidity</b>, umidità</td><td>L'acqua assorbe le onde radio e degrada il collegamento con il radiocomando. Molti multirotori non sono impermeabili.</td></tr>
<tr><td><b>Heavy</b>, peso</td><td>Il payload sposta il centro di gravità e riduce autonomia e manovrabilità.</td></tr>
<tr><td><b>Indice Kp</b></td><td>Misura il disturbo geomagnetico legato all'attività solare. Con valori alti il posizionamento satellitare perde precisione. Il riferimento pratico: volare in modalità GPS con Kp fino a 4, evitare da 5 in su.</td></tr>
</tbody></table></div>
<h3>Vento</h3>
<p>Dalla forza 3 in poi il controllo diventa più impegnativo, soprattutto senza assistenza satellitare. Il limite pratico di riferimento è <b>10 metri al secondo, pari a circa 20 nodi</b>: da forza 5 in su l'operazione non è più responsabile.</p>
<p>Due accorgimenti che fanno la differenza: scegli un punto di decollo con il vento alle spalle del drone in fase di rientro, e conserva capacità di batteria sufficiente per il ritorno controvento, che consuma molto più dell'andata.</p>`
    },
    {
      id: 'controllo-uas',
      titolo: 'Controllo dell\'aeromobile',
      html: `
<ul class="check" data-check="preflight">
<li><label><input type="checkbox"><span>Danni visibili alla cellula e ai bracci</span></label></li>
<li><label><input type="checkbox"><span>Eliche integre, senza scheggiature o crepe, montate nel verso corretto</span></label></li>
<li><label><input type="checkbox"><span>Batterie a tensione corretta, senza rigonfiamenti o errori di cella</span></label></li>
<li><label><input type="checkbox"><span>Aeromobile bilanciato e massa al decollo entro il limite</span></label></li>
<li><label><input type="checkbox"><span>Ricevitore satellitare agganciato, numero di satelliti sufficiente</span></label></li>
<li><label><input type="checkbox"><span>Nessun messaggio di errore o avviso attivo</span></label></li>
<li><label><input type="checkbox"><span>Bussola calibrata, se richiesto dal sistema</span></label></li>
<li><label><input type="checkbox"><span>Failsafe impostato: quota e comportamento del Return to Home</span></label></li>
<li><label><input type="checkbox"><span>Numero di registrazione operatore inserito nel software e QR code applicato</span></label></li>
</ul>
<p>Non si vola con un UAS danneggiato o che non funziona in modo perfetto. Non esiste il volo breve che giustifica un'eccezione.</p>
<figure data-src="v01-preflight.mp4" data-cap="Il controllo prima del volo, voce per voce."></figure>
<h3>Durante il volo</h3>
<ul>
<li>Verifica che l'aeromobile resti in equilibrio e risponda con prontezza.</li>
<li>Tieni d'occhio il quadro meteo: precipitazioni in arrivo, rinforzi di vento, sviluppo di nubi convettive.</li>
<li>Controlla intensità del segnale di comando e andamento della batteria, cercando cali anomali.</li>
</ul>`
    },
    {
      id: 'modalita',
      titolo: 'Modalità di volo',
      html: `
<div class="tab-wrap"><table>
<thead><tr><th>Modalità</th><th>Comportamento</th><th>Quando serve</th></tr></thead>
<tbody>
<tr><td><b>GPS</b> (o modalità di posizionamento)</td><td>Il drone mantiene la posizione da solo, compensando il vento</td><td>Impostazione predefinita per decollo e atterraggio stabili</td></tr>
<tr><td><b>ATTI</b> (attitude)</td><td>Stabilizzazione solo sull'assetto. Il vento trascina l'aeromobile, la rotta va corretta a mano</td><td>Quando il segnale satellitare è disturbato o si vuole uscire da un volo automatico</td></tr>
<tr><td><b>Bassa velocità</b></td><td>Velocità limitata e risposta più morbida ai comandi</td><td>Requisito per la riduzione a 5 m in A2, e utile in spazi stretti</td></tr>
<tr><td><b>Sport</b></td><td>Giri motore più alti, risposta aggressiva, sensori di ostacolo spesso disattivati</td><td>Solo in area libera, con ampio margine</td></tr>
</tbody></table></div>
<p>Controlla sempre in quale modalità stai decollando. Non tutti gli aeromobili dispongono della modalità ATTI.</p>
<div class="nota">
<span class="eyebrow">Voli programmati</span>
<p>Con un modulo satellitare puoi programmare una rotta per waypoint. Resta un volo automatico: devi poter riprendere il comando in qualsiasi momento. Prima di lanciarlo, imposta il failsafe, compresa la quota di rientro, che deve superare l'ostacolo più alto lungo il percorso.</p>
</div>`
    },
    {
      id: 'emergenze',
      titolo: 'Procedure di emergenza',
      html: `
<p>Le procedure normali riguardano il volo previsto. Le procedure di emergenza riguardano quello che succede quando il volo previsto smette di essere tale.</p>
<h3>Traffico in avvicinamento</h3>
<p>Uno stormo di uccelli o un aeromobile che si avvicina alla tua quota o più in basso richiedono una sola prima azione: <b>scendere</b>. Poi si valuta se spostarsi o atterrare.</p>
<h3>Lost link</h3>
<p>La perdita del collegamento radio fra radiocomando e aeromobile. Un UAS in condizioni di volo ha un failsafe attivo per questo scopo, di norma il <b>Return to Home</b>: il modulo satellitare ha memorizzato il punto di decollo e l'aeromobile ci rientra da solo, salendo prima alla quota impostata.</p>
<p>Perché funzioni serve che il posizionamento satellitare fosse valido al decollo. Un RTH avviato senza home point registrato non porta il drone da nessuna parte.</p>
<figure data-src="v02-return-to-home.mp4" data-cap="Return to Home: perdita del collegamento, salita alla quota impostata, rientro, discesa."></figure>
<h3>Fly away</h3>
<p>Perdita del collegamento combinata con un modulo di posizionamento non funzionante. Il Return to Home non può avviarsi e l'aeromobile resta sospeso o prosegue. Cosa fare:</p>
<ol>
<li>Annota direzione, quota, velocità e batteria residua all'ultimo dato utile.</li>
<li>Allerta le forze dell'ordine.</li>
<li>Avvisa il controllo del traffico aereo locale se sei nell'intorno di un aeroporto.</li>
<li>Segnala l'evento a ENAC.</li>
</ol>
<div class="nota attenzione">
<span class="eyebrow">Atterraggio di fortuna</span>
<p>Se sei costretto a un atterraggio forzato, continua a pilotare fino all'impatto. Mantenere il controllo dell'assetto riduce l'energia trasferita e la probabilità di danni a terra.</p>
</div>`
    },
    {
      id: 'log',
      titolo: 'Registro voli e manutenzione',
      html: `
<p>Gli aeromobili evoluti registrano automaticamente ogni volo. Per gli operatori professionali il registro serve a stabilire quando intervenire sulla manutenzione: aeromobile, luogo, ora di inizio e fine, eventi rilevanti.</p>
<p>Un approccio semplice alla manutenzione preventiva:</p>
<ul>
<li>individua i componenti soggetti a usura (eliche, motori, batterie) e ispezionali dopo ogni volo;</li>
<li>definisci per ciascuno il numero massimo di voli prima della sostituzione;</li>
<li>annota riparazioni e sostituzioni per ogni aeromobile della flotta.</li>
</ul>
<p>Segui inoltre le indicazioni del costruttore: sono parte integrante dei requisiti di aeronavigabilità.</p>`
    }
  ],
  ricorda: [
    'Fattori H.H.H.H.: Hot, Height, Humidity, Heavy. A questi si aggiunge l indice Kp per l attività solare.',
    'Indice Kp: volo in modalità GPS fino a 4, meglio evitare da 5 in su.',
    'Limite pratico di vento: 10 m/s pari a circa 20 nodi. Da forza 5 in su non si vola.',
    'Modalità ATTI: stabilizzazione solo verticale, il vento trascina il drone.',
    'Lost link: si attiva il Return to Home, che richiede un home point registrato al decollo.',
    'Fly away: annotare direzione, quota, velocità e batteria, allertare le forze dell ordine e segnalare a ENAC.',
    'Il volo controvento consuma molto di più: conserva batteria per il rientro.'
  ],
  quiz: [
    { d: 'Cosa indica la seconda H dell\'acronimo H.H.H.H.?', o: ['Humidity, umidità', 'Height, quota', 'Heavy, peso', 'Heading, prua'], c: 1,
      sp: 'Hot, Height, Humidity, Heavy. Salendo di quota l aria si rarefà e la portanza cala.' },
    { d: 'Con quale valore massimo dell\'indice Kp è ragionevole volare in modalità GPS?', o: ['2', '4', '6', '8'], c: 1,
      sp: 'Da 5 in su il disturbo geomagnetico degrada il posizionamento satellitare in modo apprezzabile.' },
    { d: 'Qual è il limite pratico di velocità del vento per un UAS in categoria Open?', o: ['5 m/s', '10 m/s, circa 20 nodi', '15 m/s', '25 m/s'], c: 1,
      sp: 'Da forza 5 in poi, cioè oltre i 20 nodi, l operazione non è più responsabile.' },
    { d: 'Cosa succede in modalità ATTI?', o: ['Il drone mantiene la posizione da solo', 'Il drone è stabilizzato solo verticalmente e il vento lo trascina', 'I motori girano al massimo', 'Il drone rientra automaticamente'], c: 1,
      sp: 'Senza assistenza satellitare la rotta va corretta a mano. È la modalità da conoscere per uscire da un volo automatico.' },
    { d: 'Cosa serve perché il Return to Home funzioni correttamente?', o: ['Un collegamento video attivo', 'Un home point registrato al decollo con posizionamento satellitare valido', 'Una batteria carica almeno al 90%', 'La modalità sport disattivata'], c: 1,
      sp: 'Senza home point memorizzato l aeromobile non ha una destinazione a cui tornare.' },
    { d: 'Un aeromobile con equipaggio si avvicina alla tua stessa quota. Qual è la prima azione?', o: ['Salire', 'Scendere', 'Accelerare in direzione opposta', 'Spegnere i motori'], c: 1,
      sp: 'Sempre scendere per primo, poi valutare se spostarsi o atterrare.' },
    { d: 'Quale situazione descrive un fly away?', o: ['Perdita del segnale video', 'Perdita del collegamento radio con RTH funzionante', 'Perdita del collegamento con modulo di posizionamento non funzionante', 'Atterraggio in area non prevista'], c: 2,
      sp: 'Senza posizionamento il Return to Home non si avvia e l aeromobile diventa incontrollabile.' },
    { d: 'Quale controllo va fatto prima del decollo riguardo al carico?', o: ['Che il payload sia il più pesante possibile', 'Che la massa al decollo non superi il limite del costruttore e che l\'aeromobile sia bilanciato', 'Che il payload sia rimovibile in volo', 'Nessuno, ci pensa il software'], c: 1,
      sp: 'Massa massima al decollo e centraggio sono due condizioni distinte, entrambe necessarie.' }
  ]
}

];
