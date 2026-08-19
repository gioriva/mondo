/* Ground School · moduli del percorso A2 */

window.MODULI_A2 = [

/* ================================================================== XI */
{
  id: 'procedure-mitigazione',
  num: 'XI',
  titolo: 'Pianificazione e mitigazione del rischio',
  area: 'procedure',
  percorsi: ['a2'],
  durata: 30,
  sommario: 'I rischi specifici della classe C2, come si costruisce una pianificazione scritta, quali misure riducono concretamente il rischio a terra.',
  sezioni: [
    {
      id: 'rischi-c2',
      titolo: 'Perché la A2 richiede più attenzione',
      html: `
<p>Con un aeromobile di classe C2 puoi operare dentro un centro abitato. Non sopra un assembramento, non sopra persone non coinvolte, ma comunque nel loro spazio quotidiano. Il salto rispetto a C0 e C1 non è normativo, è fisico.</p>
<p>Un multirotore fra 900 grammi e 4 chili che cade da 30 metri arriva al suolo con un'energia cinetica di un altro ordine di grandezza rispetto a un drone da 250 grammi. Le conseguenze cambiano di conseguenza:</p>
<ul>
<li>più persone potenzialmente coinvolte in un singolo evento;</li>
<li>lesioni più gravi a parità di impatto;</li>
<li>danni materiali significativi a veicoli, vetrate, coperture.</li>
</ul>
<p>A questo si aggiungono i rischi che non dipendono dalla massa: collisione con altro traffico aereo, caduta su infrastrutture critiche, perdita di controllo sopra una via di comunicazione.</p>
<div class="nota">
<span class="eyebrow">Il ragionamento della A2</span>
<p>Tutta la sottocategoria A2 ruota attorno a una domanda: se il drone cadesse in questo istante, dove finirebbe e chi c'è in quel punto? Ogni misura di mitigazione serve a rendere accettabile la risposta.</p>
</div>`
    },
    {
      id: 'pianificazione',
      titolo: 'Pianificare un\'operazione',
      html: `
<p>Una pianificazione utile raccoglie cinque blocchi di informazioni. Non serve un documento lungo: serve che le cinque risposte esistano prima di uscire di casa.</p>
<ol>
<li><b>Specifiche dell'operazione</b>: scopo, tipo di volo, quota prevista, durata, composizione dell'equipaggio.</li>
<li><b>Aeromobile e payload</b>: modello, classe, massa al decollo effettiva.</li>
<li><b>Luogo, data e ora</b>: punto di decollo e atterraggio, orario previsto.</li>
<li><b>Informazioni sull'area</b>: zona geografica UAS, NOTAM attivi, ostacoli, edifici, strade, presenza attesa di persone.</li>
<li><b>Meteo</b>: previsione per l'orario scelto e osservazione corrente della stazione più vicina.</li>
</ol>
<h3>Un esempio completo</h3>
<div class="nota">
<span class="eyebrow">Scenario</span>
<p><b>Scopo</b>: ripresa aerea di un borgo e dei dintorni.<br>
<b>Tipo</b>: VLOS, quota massima 20 metri, in prossimità di edifici.<br>
<b>Durata</b>: massimo 10 minuti.<br>
<b>Equipaggio</b>: pilota comandante più un membro a terra.<br>
<b>Aeromobile</b>: multirotore di classe C2, massa al decollo 960 grammi.<br>
<b>Luogo</b>: prato ampio ai margini dell'abitato, giovedì alle 15:30.<br>
<b>Area</b>: spazio aereo non controllato, zona bianca su D-Flight, nessun NOTAM attivo. Edifici e strada comunale nelle vicinanze: persone non coinvolte possibili.<br>
<b>Meteo</b>: tempo stabile, vento forza 1, visibilità oltre 10 km, indice Kp 2.</p>
</div>
<p>Il quadro dice che l'operazione ricade in categoria Open e che il pilota ha entrambi gli attestati. Individua però un rischio preciso: la possibile comparsa di persone non coinvolte. Da lì partono quattro domande operative.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Domanda</th><th>Risposta pianificata</th></tr></thead>
<tbody>
<tr><td>Quale sarà la rotta e il profilo di volo?</td><td>L'aeromobile mantiene la stessa direzione. Dopo il decollo sale al massimo a 20 metri e resta sopra il prato.</td></tr>
<tr><td>Cosa può incontrare lungo il percorso?</td><td>Nessun traffico atteso, la traiettoria non attraversa la strada.</td></tr>
<tr><td>Come evito di sorvolare persone non coinvolte?</td><td>Il membro di equipaggio tiene il pubblico a distanza dal perimetro.</td></tr>
<tr><td>Cosa faccio se compaiono all'improvviso?</td><td>Il membro di equipaggio le avvisa e le ferma. Se si forma un gruppo, il pilota fa atterrare l'aeromobile.</td></tr>
</tbody></table></div>
<p>Ogni rischio identificato genera una procedura. Una procedura è un piano in pochi passi, deciso prima e comunicato a tutti i presenti. La responsabilità di definirla e di informare l'equipaggio è del pilota comandante.</p>`
    },
    {
      id: 'mitigazioni',
      titolo: 'Misure di mitigazione',
      html: `
<p>Mitigare significa ridurre il rischio residuo con un'azione concreta. Tre misure che funzionano e che l'esame chiede di conoscere.</p>
<h3>Modalità a bassa velocità</h3>
<p>Limita la velocità a un massimo di 3 metri al secondo e ammorbidisce la risposta ai comandi. Il pilota guadagna tempo di reazione per correggere una traiettoria indesiderata. È anche la condizione che consente la riduzione della distanza da 30 a 5 metri in sottocategoria A2.</p>
<h3>Stima della distanza di caduta</h3>
<p>La differenza fra il punto in cui l'aeromobile toccherebbe terra e il punto in cui si trovano le persone. Un drone in volo orizzontale non cade a piombo: prosegue lungo una traiettoria balistica che dipende da velocità e quota. Più veloce voli, più lontano finisce.</p>
<h3>Regola 1:1</h3>
<p>La distanza orizzontale che mantieni dalle persone non coinvolte è pari alla quota di volo. A 30 metri di quota, resta ad almeno 30 metri in orizzontale. È una regola semplice che approssima bene il cono di caduta.</p>
<figure>
<svg viewBox="0 0 660 260" role="img" aria-label="Applicazione della regola uno a uno fra quota e distanza orizzontale">
  <line x1="40" y1="220" x2="620" y2="220" stroke="var(--linea-forte)" stroke-width="1.5"/>
  <line x1="140" y1="220" x2="140" y2="80" stroke="var(--ottone)" stroke-dasharray="4 4"/>
  <circle cx="140" cy="80" r="7" fill="var(--ottone)"/>
  <text x="152" y="72" font-family="var(--dato), monospace" font-size="11" fill="var(--ottone)">30 m di quota</text>
  <line x1="140" y1="220" x2="280" y2="220" stroke="var(--ottone)" stroke-width="2"/>
  <text x="210" y="242" font-family="var(--dato), monospace" font-size="11" fill="var(--ottone)" text-anchor="middle">30 m</text>
  <line x1="140" y1="80" x2="280" y2="220" stroke="var(--z-rossa)" stroke-width="1.5" stroke-dasharray="3 4"/>
  <text x="228" y="140" font-family="var(--testo), sans-serif" font-size="11.5" fill="var(--z-rossa)">cono di caduta</text>
  <g fill="var(--grigio)" opacity=".55">
    <circle cx="300" cy="206" r="6"/><rect x="296" y="212" width="8" height="12"/>
    <circle cx="326" cy="206" r="6"/><rect x="322" y="212" width="8" height="12"/>
  </g>
  <text x="360" y="216" font-family="var(--testo), sans-serif" font-size="12" fill="var(--inchiostro)">persone non coinvolte, oltre il perimetro</text>
</svg>
<figcaption>Regola 1:1. La distanza orizzontale dalle persone eguaglia la quota di volo.</figcaption>
</figure>
<h3>Altre misure che valgono la pena</h3>
<ul>
<li>Delimitare fisicamente l'area di decollo e atterraggio, che è la fase più critica.</li>
<li>Scegliere l'orario. Lo stesso luogo cambia completamente fra le 7 e le 18.</li>
<li>Portare un membro di equipaggio dedicato al contenimento del pubblico.</li>
<li>Ridurre la durata dell'operazione: meno tempo in aria significa meno esposizione.</li>
<li>Impostare quota massima e distanza massima nel software prima di decollare.</li>
</ul>
<figure data-src="v04-regola-1-1.mp4" data-cap="La regola 1:1 applicata sul campo: quota di volo e distanza orizzontale a confronto."></figure>`
    },
    {
      id: 'meteo-a2',
      titolo: 'Condizioni meteorologiche in operazione',
      html: `
<p>La pianificazione ideale coincide raramente con la giornata reale. Le condizioni da tenere sotto controllo durante l'operazione:</p>
<div class="tab-wrap"><table>
<thead><tr><th>Condizione</th><th>Effetto sull'operazione</th></tr></thead>
<tbody>
<tr><td>Temperature estreme</td><td>Guasto o degrado dei componenti, errori di cella nelle batterie</td></tr>
<tr><td>Umidità e precipitazioni</td><td>L'acqua assorbe le onde radio, con perdita di segnale. Molti multirotori non sono impermeabili</td></tr>
<tr><td>Quota</td><td>Aria più rarefatta, meno portanza, più corrente assorbita</td></tr>
<tr><td>Vento</td><td>Controllo più difficile e autonomia ridotta, soprattutto nel rientro controvento</td></tr>
<tr><td>Indice Kp</td><td>Disturbo geomagnetico: volo in modalità GPS con Kp fino a 4</td></tr>
</tbody></table></div>
<p>Due emergenze già viste restano le più probabili anche in A2: la perdita del collegamento, gestita dal Return to Home, e il fly away. Una terza, tipica dell'ambiente urbano, è la perdita improvvisa del segnale satellitare fra edifici alti, che fa passare l'aeromobile in modalità di stabilizzazione senza posizionamento. Devi saperlo pilotare in quelle condizioni.</p>`
    }
  ],
  ricorda: [
    'Regola 1:1: la distanza orizzontale dalle persone non coinvolte eguaglia la quota di volo.',
    'La modalità a bassa velocità limita a 3 m/s ed è condizione per la riduzione a 5 metri in A2.',
    'La stima della distanza di caduta considera la traiettoria balistica, non la verticale.',
    'Ogni rischio identificato genera una procedura definita prima e comunicata all equipaggio.',
    'Un C2 pesa fra 900 g e 4 kg: le conseguenze di un impatto sono di un altro ordine rispetto a un C0.',
    'Decollo e atterraggio sono le fasi più critiche: delimitare fisicamente l area.'
  ],
  quiz: [
    { d: 'Cosa afferma la regola 1:1?', o: ['La distanza dalle persone è il doppio della quota', 'La distanza orizzontale dalle persone non coinvolte è pari alla quota di volo', 'Il drone deve pesare quanto il payload', 'Ogni metro di quota richiede un secondo di osservazione'], c: 1,
      sp: 'A 30 metri di quota mantieni almeno 30 metri di distanza orizzontale. Approssima il cono di caduta.' },
    { d: 'A quanto limita la velocità la modalità a bassa velocità?', o: ['1 m/s', '3 m/s', '5 m/s', '10 m/s'], c: 1,
      sp: 'Massimo 3 metri al secondo. È il requisito per ridurre a 5 metri la distanza in A2.' },
    { d: 'Qual è la massa di un aeromobile di classe C2?', o: ['Meno di 250 g', 'Meno di 900 g', 'Meno di 4 kg', 'Meno di 25 kg'], c: 2,
      sp: 'La C2 è la classe della sottocategoria A2, con massa massima al decollo sotto i 4 chili.' },
    { d: 'Perché la stima della distanza di caduta non coincide con la verticale sotto il drone?', o: ['Per effetto del vento soltanto', 'Perché un drone in volo orizzontale prosegue lungo una traiettoria balistica', 'Perché i sensori compensano la caduta', 'Perché la gravità agisce in diagonale'], c: 1,
      sp: 'La velocità orizzontale al momento del guasto sposta il punto di impatto in avanti.' },
    { d: 'Quale fase dell\'operazione richiede la delimitazione fisica dell\'area?', o: ['Il volo di crociera', 'Decollo e atterraggio', 'La calibrazione della bussola', 'Il download delle immagini'], c: 1,
      sp: 'Sono le fasi in cui il drone è più vicino alle persone e meno controllabile.' },
    { d: 'Con quale valore massimo dell\'indice Kp si vola in modalità GPS?', o: ['2', '4', '6', '9'], c: 1,
      sp: 'Da 5 in su il disturbo geomagnetico degrada in modo apprezzabile il posizionamento.' }
  ]
},

/* ================================================================= XII */
{
  id: 'uas-avanzato',
  num: 'XII',
  titolo: 'Massa, equilibrio e batterie',
  area: 'tecnica',
  percorsi: ['a2'],
  durata: 28,
  sommario: 'Tipi di aeromobile a confronto, centro di gravità, MTOM e MTOW, comportamento delle diverse chimiche di batteria.',
  sezioni: [
    {
      id: 'tipi',
      titolo: 'Tre architetture a confronto',
      html: `
<div class="tab-wrap"><table>
<thead><tr><th>Tipo</th><th>Caratteristiche</th><th>Impiego tipico</th></tr></thead>
<tbody>
<tr><td><b>Multirotore</b></td><td>Due o più bracci con motori. Decolla e atterra in verticale, si sposta in ogni direzione, può restare fermo in aria. Serve un'area di decollo e atterraggio.</td><td>Riprese video, ispezioni, luoghi difficili da raggiungere</td></tr>
<tr><td><b>Ala fissa</b></td><td>Un aeroplano senza equipaggio. Lanciato a mano o da una piccola rampa. Stabilità in aria molto elevata, non può fermarsi in volo.</td><td>Rilievi su grandi superfici, agricoltura</td></tr>
<tr><td><b>Ibrido</b></td><td>Combina i due principi. Decolla in verticale (VTOL), poi ruota i motori e vola in orizzontale.</td><td>Aree urbane con poco spazio, logistica su distanze medie</td></tr>
</tbody></table></div>
<div class="tab-wrap"><table>
<thead><tr><th>Parametro</th><th>Multirotore</th><th>Ala fissa</th><th>Ibrido</th></tr></thead>
<tbody>
<tr><td>Manovrabilità</td><td>Eccellente</td><td>Scarsa</td><td>Buona</td></tr>
<tr><td>Stabilità in aria</td><td>Scarsa</td><td>Eccellente</td><td>Eccellente</td></tr>
<tr><td>Autonomia orizzontale</td><td>Scarsa</td><td>Eccellente</td><td>Buona</td></tr>
<tr><td>Capacità di carico</td><td>Eccellente</td><td>Scarsa</td><td>Buona</td></tr>
<tr><td>Decollo</td><td>Eccellente</td><td>Scarsa</td><td>Eccellente</td></tr>
<tr><td>Costo</td><td>Contenuto</td><td>Medio</td><td>Elevato</td></tr>
<tr><td>Facilità d'uso</td><td>Eccellente</td><td>Scarsa</td><td>Buona</td></tr>
</tbody></table></div>`
    },
    {
      id: 'massa',
      titolo: 'Massa, peso e centro di gravità',
      html: `
<p>Nel linguaggio comune massa e peso si usano come sinonimi, ma non lo sono. La <b>massa</b> è una proprietà della materia, si esprime in chilogrammi e non cambia. Il <b>peso</b> è la forza con cui la gravità agisce su quella massa, quindi dipende dalla posizione.</p>
<p>Il punto in cui la massa totale dell'aeromobile e del carico utile si concentra è il <b>centro di gravità</b>, in inglese Center of Gravity o COG. In un multirotore si trova al centro geometrico fra i rotori.</p>
<h3>Perché conta</h3>
<ul>
<li>Il telaio potrebbe non essere progettato per sopportare uno spostamento del baricentro o un sovrappeso.</li>
<li>Con il centro di gravità spostato in avanti, sollevare il muso diventa difficile e l'atterraggio avviene a velocità più alta.</li>
<li>Con il centro di gravità spostato indietro, la stabilità peggiora.</li>
<li>Le eliche che sostengono più peso lavorano di più. Le altre non possono spingere al massimo, altrimenti l'aeromobile si inclinerebbe. Il risultato è portanza sprecata per compensare lo squilibrio.</li>
</ul>
<h3>Verificare l'equilibrio</h3>
<p>L'equilibrio si comporta come una leva con due bracci. Il <b>momento</b> di ciascun braccio è il prodotto fra la forza applicata e la lunghezza del braccio. La leva è in equilibrio quando i due momenti si eguagliano.</p>
<p>In pratica: sostieni il multirotore con due dita alle estremità dell'asse trasversale e osserva se resta orizzontale o se si inclina. Ogni cambio di payload richiede una nuova verifica. Se serve, sposta il carico utile.</p>
<div class="nota attenzione">
<span class="eyebrow">Zavorre</span>
<p>Non fissare mai una zavorra in punti non previsti dal costruttore. Un peso all'estremità dei bracci, lontano dal centro di gravità, aumenta il momento d'inerzia: l'aeromobile fatica sia a iniziare sia a fermare una rotazione.</p>
</div>`
    },
    {
      id: 'mtom',
      titolo: 'MTOM, MTOW e massa di atterraggio',
      html: `
<div class="tab-wrap"><table>
<thead><tr><th>Sigla</th><th>Cosa indica</th></tr></thead>
<tbody>
<tr><td><b>MTOW</b><br>Maximum Take-Off Weight</td><td>Peso massimo al decollo. È un valore fisso per un dato aeromobile e dipende dall'influenza della gravità. Compare nel manuale del costruttore e nei processi di approvazione.</td></tr>
<tr><td><b>MTOM</b><br>Maximum Take-Off Mass</td><td>Massa massima al decollo. È il termine usato dalla normativa europea e nazionale, perché la massa è indipendente dalla posizione.</td></tr>
<tr><td><b>LM</b><br>Landing Mass</td><td>Massa operativa a secco dell'aeromobile, comprensiva del carico utile e dell'energia residua utilizzabile all'inizio dell'atterraggio.</td></tr>
<tr><td><b>MLM</b><br>Maximum Landing Mass</td><td>Massa massima consentita al momento del contatto con il suolo.</td></tr>
</tbody></table></div>
<p>La differenza fra MTOW e MTOM è la stessa che c'è fra peso e massa. La normativa usa MTOM, il manuale del costruttore spesso usa MTOW: sono valori numericamente coincidenti nell'uso corrente.</p>
<p>Il limite di massa all'atterraggio esiste per una ragione meccanica: il carrello e la struttura devono assorbire l'energia cinetica del contatto. Superarlo può produrre danni strutturali anche senza un impatto violento.</p>
<div class="nota esame">
<span class="eyebrow">Da ricordare</span>
<p>Le classi di marcatura si basano sulla MTOM: C0 sotto 250 g, C1 sotto 900 g, C2 sotto 4 kg, C3 e C4 sotto 25 kg. La massa comprende batteria e payload, quindi un drone dichiarato a 249 grammi può uscire dalla classe C0 con un accessorio aggiunto.</p>`
    },
    {
      id: 'payload',
      titolo: 'Payload',
      html: `
<p>Il payload è il carico utile che l'aeromobile può trasportare, escluse le componenti proprie. Può essere <b>fisso</b>, come una fotocamera integrata nel telaio, oppure <b>intercambiabile</b>.</p>
<p>Con il payload fisso il costruttore ha già tenuto conto dell'effetto sull'equilibrio. Con quello intercambiabile la responsabilità passa a te: ogni sensore ha forma e massa proprie e sposta il baricentro in modo diverso.</p>
<figure data-src="10-equilibrio-payload.jpg" data-cap="Verifica dell'equilibrio sostenendo il multirotore alle estremità dell'asse trasversale."></figure>
<ul>
<li>Fissa il carico in modo che non possa muoversi durante il volo.</li>
<li>Verifica il movimento del gimbal su tutto l'arco, comandandolo dal radiocomando.</li>
<li>Per carichi non fotografici, come un pacco, controlla fisicamente la tenuta prima di ogni decollo.</li>
<li>Fai sempre un volo di prova dopo un cambio di configurazione.</li>
</ul>`
    },
    {
      id: 'batterie-conf',
      titolo: 'Chimiche di batteria a confronto',
      html: `
<p>Una batteria converte energia chimica in energia elettrica. Nella cella, una reazione libera elettroni al polo negativo mentre un'altra li trattiene al positivo: la differenza di potenziale che ne risulta mette in movimento la corrente in un circuito chiuso.</p>
<div class="tab-wrap"><table>
<thead><tr><th>Caratteristica</th><th>Litio-polimero<br>(Lipo)</th><th>Ioni di litio<br>(Li-ion)</th><th>Litio-ferro-fosfato<br>(LiFePO4)</th><th>Piombo</th></tr></thead>
<tbody>
<tr><td>Densità energetica</td><td>Alta</td><td>Alta</td><td>Alta</td><td>Media</td></tr>
<tr><td>Capacità</td><td>Alta</td><td>Alta</td><td>Alta</td><td>Media</td></tr>
<tr><td>Velocità di ricarica</td><td>Media</td><td>Media</td><td>Media</td><td>Bassa</td></tr>
<tr><td>Numero di cicli</td><td>300-1000</td><td>500-1500</td><td>2000-5000</td><td>300-800</td></tr>
<tr><td>Autoscarica</td><td>Bassa</td><td>Bassa</td><td>Bassa</td><td><b>Alta</b></td></tr>
<tr><td>Peso</td><td>Basso</td><td>Basso</td><td>Basso</td><td>Alto</td></tr>
<tr><td>Stabilità interna</td><td>Media</td><td>Media</td><td>Media</td><td>Alta</td></tr>
<tr><td>Temperatura di esercizio</td><td>-20 / +60 °C</td><td>-20 / +60 °C</td><td><b>-45 / +70 °C</b></td><td>-65 / +65 °C</td></tr>
</tbody></table></div>
<div class="nota esame">
<span class="eyebrow">Le due domande ricorrenti</span>
<p>La batteria con l'autoscarica più elevata è quella al <b>piombo</b>. La batteria con l'intervallo di temperatura di esercizio più ampio è la <b>litio-ferro-fosfato</b>.</p>
</div>
<h3>Rischio di incendio</h3>
<p>Le batterie ad alta densità energetica, poco stabili e sensibili alle temperature estreme, sono un rischio antincendio. Le Lipo sono note per la possibilità di accendersi spontaneamente, in particolare quando vengono caricate in modo scorretto, cadono o subiscono un danno meccanico.</p>
<h3>Effetto memoria</h3>
<p>Le batterie moderne non soffrono praticamente più dell'effetto memoria, il fenomeno per cui una batteria ricaricata senza essere stata scaricata perde progressivamente capacità utile. Restava un problema con le vecchie chimiche al nichel-cadmio.</p>
<h3>C-rating in pratica</h3>
<p>Il C-rating indica la massima corrente di scarica continua come multiplo della capacità. Su un pacco da 20.000 mAh, 1C corrisponde a 20 ampere; un C-rating dichiarato di 24C significa 480 ampere di scarica continua massima.</p>`
    }
  ],
  ricorda: [
    'La massa è una proprietà della materia e non cambia. Il peso dipende dalla gravità e quindi dalla posizione.',
    'La normativa europea usa MTOM, massa massima al decollo. Il manuale del costruttore usa spesso MTOW.',
    'Il centro di gravità di un multirotore si trova al centro fra i rotori.',
    'Il momento si calcola moltiplicando la forza per la lunghezza del braccio.',
    'Batteria con autoscarica più alta: piombo. Intervallo di temperatura più ampio: litio-ferro-fosfato.',
    'Le batterie moderne non soffrono praticamente più dell effetto memoria.',
    'Multirotore: manovrabile e con buon carico. Ala fissa: stabile e con grande autonomia. Ibrido: decolla in verticale e vola in orizzontale.'
  ],
  quiz: [
    { d: 'Un multirotore, rispetto a un\'ala fissa, ha:', o: ['Più stabilità in aria', 'Più autonomia orizzontale', 'Più manovrabilità', 'Meno capacità di carico'], c: 2,
      sp: 'Il multirotore eccelle in manovrabilità e capacità di carico. L ala fissa in stabilità e autonomia.' },
    { d: 'Un\'ala fissa, rispetto a un multirotore, ha:', o: ['Meno stabilità', 'Meno autonomia', 'Meno capacità di carico utile', 'Più manovrabilità'], c: 2,
      sp: 'Compensa con stabilità e autonomia molto superiori.' },
    { d: 'Cosa può fare una configurazione ibrida che un\'ala fissa non può fare?', o: ['Decollare verticalmente come un multirotore', 'Volare in orizzontale', 'Trasportare solo carichi leggeri', 'Volare solo in area urbana'], c: 0,
      sp: 'VTOL: decolla e atterra in verticale, poi ruota i motori e prosegue in orizzontale.' },
    { d: 'Quale termine indica il valore fisso di peso al decollo riportato nel manuale del costruttore?', o: ['MTOW', 'MATW', 'LM', 'MLM'], c: 0,
      sp: 'Maximum Take-Off Weight. La normativa europea usa invece MTOM, massa massima al decollo.' },
    { d: 'A cosa serve il limite di massa massima all\'atterraggio?', o: ['A proteggere il carico utile', 'A proteggere la struttura dall\'energia cinetica del contatto con il suolo', 'A garantire un decollo stabile', 'A mantenere il drone stabile in volo'], c: 1,
      sp: 'Superarlo può produrre danni strutturali al carrello e alla cellula.' },
    { d: 'Cosa indica l\'acronimo MTOM?', o: ['Massa massima al decollo', 'Peso al decollo variabile con le condizioni locali', 'Massa operativa a secco più carburante', 'Il centro di gravità dell\'aeromobile'], c: 0,
      sp: 'Maximum Take-Off Mass, il termine usato dalla normativa europea perché la massa non dipende dalla posizione.' },
    { d: 'Quale tipo di batteria ha la maggiore autoscarica?', o: ['Litio-polimero', 'Ioni di litio', 'Litio-ferro-fosfato', 'Piombo'], c: 3,
      sp: 'Le chimiche al litio hanno autoscarica bassa. Il piombo la ha alta.' },
    { d: 'Quale tipo di batteria ha l\'intervallo di temperatura di esercizio più ampio?', o: ['Litio-polimero', 'Ioni di litio', 'Litio-ferro-fosfato', 'Piombo'], c: 2,
      sp: 'Da meno 45 a più 70 gradi Celsius, il campo più esteso fra quelle a confronto.' },
    { d: 'Di quale problema le batterie moderne non soffrono praticamente più?', o: ['Accensione spontanea', 'Effetto memoria', 'Autoscarica', 'Errori di cella'], c: 1,
      sp: 'L effetto memoria era tipico delle vecchie chimiche al nichel-cadmio.' },
    { d: 'Dove si trova il centro di gravità di un multirotore?', o: ['Sul braccio anteriore destro', 'Esattamente al centro fra i rotori', 'Nel punto di attacco della batteria', 'Sotto il carrello di atterraggio'], c: 1,
      sp: 'Tutti e tre gli assi di rotazione passano per quel punto. Uno spostamento del payload lo altera.' }
  ]
}

];
