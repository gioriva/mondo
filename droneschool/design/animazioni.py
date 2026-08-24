#!/usr/bin/env python3
"""Drone School · animazioni.

Quattro sequenze brevi, mute, pensate per essere guardate una volta e capite:
il controllo pre volo, il rientro automatico, la lettura di un METAR e la
regola 1:1. Ogni fotogramma nasce dalle stesse primitive delle tavole.
"""

import sys, os, math, subprocess, shutil
sys.path.insert(0, "/home/claude/droneschool/design")
from comune import *
from PIL import Image, ImageDraw

VW, VH, FPS, SS = 1280, 720, 30, 2
OUT = "/home/claude/droneschool/media/"
TMP = "/tmp/gs-frames"
os.makedirs(OUT, exist_ok=True)


# ------------------------------------------------------------- infrastruttura
# Il fondale è identico in ogni fotogramma: si disegna una volta sola e si copia.
_SFONDO = None


def nuovo_frame():
    global _SFONDO
    if _SFONDO is None:
        _SFONDO, _ = tela(VW, VH, SS)
    img = _SFONDO.copy()
    return img, ImageDraw.Draw(img, "RGBA")


def testa(d, occhiello, titolo):
    s = SS
    tracked(d, (52 * s, 52 * s), occhiello.upper(), mono(11 * s), (*OTTONE, 230), 3.4 * s)
    d.text((52 * s, 92 * s), titolo, font=serif(30 * s, peso=380), fill=CARTA, anchor="ls")
    d.line([(52 * s, 112 * s), ((VW - 52) * s, 112 * s)], fill=(255, 255, 255, 32), width=max(1, s // 2))


def piede_video(d):
    s = SS
    tracked(d, (52 * s, (VH - 30) * s), "DRONE SCHOOL · GIORIVA.IT/DRONESCHOOL",
            mono(10 * s), (*GRIGIO_2, 180), 3.2 * s)


def scrivi(nome, disegna, durata, fade=0.6):
    """Genera i fotogrammi, li codifica e ripulisce."""
    if os.path.isdir(TMP):
        shutil.rmtree(TMP)
    os.makedirs(TMP)
    n = int(durata * FPS)
    for i in range(n):
        t = i / (n - 1)
        img, d = nuovo_frame()
        disegna(d, t, SS)
        piede_video(d)
        img.resize((VW, VH), Image.LANCZOS).save(f"{TMP}/{i:04d}.png", compress_level=1)
    dest = OUT + nome
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS),
           "-i", f"{TMP}/%04d.png", "-c:v", "libx264", "-preset", "slow",
           "-crf", "23", "-pix_fmt", "yuv420p", "-movflags", "+faststart", dest]
    subprocess.run(cmd, check=True)
    shutil.rmtree(TMP)
    return dest


def dissolve(v, a, b, morbido=0.12):
    """Rampa 0-1 fra due istanti normalizzati."""
    if v <= a:
        return 0.0
    if v >= b:
        return 1.0
    x = (v - a) / (b - a)
    return x * x * (3 - 2 * x)


def alfa(base, k):
    return (*base[:3], int(max(0, min(1, k)) * (base[3] if len(base) > 3 else 255)))


# ============================================================ v01 · pre volo
VOCI_PREFLIGHT = [
    ("Eliche", "integre, senza scheggiature, montate nel verso giusto"),
    ("Batterie", "drone e radiocomando cariche, celle equilibrate"),
    ("Massa e centraggio", "carico entro il limite, aeromobile in equilibrio"),
    ("Satelliti", "posizionamento agganciato, home point registrato"),
    ("Failsafe", "quota di rientro sopra l'ostacolo più alto"),
    ("Contrassegni", "QR operatore applicato e caricato nel software"),
    ("Zone e meteo", "D-Flight verificato oggi, vento e visibilità nei limiti"),
]


def dis_preflight(d, t, s):
    testa(d, "Procedure operative", "Il controllo prima del volo")

    # drone al centro a sinistra
    cx, cy = 300 * s, 400 * s
    ang = math.sin(t * math.pi * 2) * 0.04
    drone_alto(d, cx, cy, 6.6 * s, ang)

    # cerchio di scansione
    fase = (t * 2.4) % 1.0
    r = (60 + 90 * fase) * s
    d.ellipse([cx - r, cy - r, cx + r, cy + r],
              outline=alfa((*OTTONE_CHI, 150), 1 - fase), width=max(1, s))

    # elenco che si spunta
    x0, y0 = 620 * s, 190 * s
    passo = 62 * s
    quante = len(VOCI_PREFLIGHT)
    avanz = t * (quante + 1.4)

    for i, (titolo, nota) in enumerate(VOCI_PREFLIGHT):
        k = dissolve(avanz, i * 0.92, i * 0.92 + 0.55)
        if k <= 0.01:
            continue
        y = y0 + i * passo
        fatto = avanz > i * 0.92 + 0.75

        col = OTTONE_CHI if fatto else GRIGIO
        # quadratino
        lato = 24 * s
        if fatto:
            d.rounded_rectangle([x0, y - lato + 4 * s, x0 + lato, y + 4 * s], radius=5 * s,
                                fill=alfa((*OTTONE_CHI, 235), k))
            d.line([(x0 + 6 * s, y - 8 * s), (x0 + 10 * s, y - 2 * s)],
                   fill=alfa((10, 22, 34, 255), k), width=max(1, int(2.4 * s)))
            d.line([(x0 + 10 * s, y - 2 * s), (x0 + 18 * s, y - 16 * s)],
                   fill=alfa((10, 22, 34, 255), k), width=max(1, int(2.4 * s)))
        else:
            d.rounded_rectangle([x0, y - lato + 4 * s, x0 + lato, y + 4 * s], radius=5 * s,
                                outline=alfa((255, 255, 255, 90), k), width=max(1, s))

        d.text((x0 + 42 * s, y), titolo, font=sans(17 * s, True), fill=alfa((*CARTA, 245), k), anchor="ls")
        d.text((x0 + 42 * s, y + 24 * s), nota, font=sans(13.5 * s), fill=alfa((190, 201, 211, 235), k), anchor="ls")

    # conteggio
    fatte = sum(1 for i in range(quante) if avanz > i * 0.92 + 0.75)
    tracked(d, (x0, 150 * s), f"{fatte} / {quante}", mono(15 * s), (*OTTONE, 240), 3 * s)

    if fatte == quante:
        k = dissolve(t, 0.9, 1.0)
        etichetta(d, 200 * s, 560 * s, "PRONTO AL DECOLLO", s, Z_VERDE, riempi=True, corpo=12)


# ================================================== v02 · return to home
def dis_rth(d, t, s):
    testa(d, "Procedure operative", "Return to Home")

    ys = 560 * s
    suolo(d, ys, 60 * s, (VW - 60) * s, s, alfa=120)

    hx = 200 * s          # home point
    fx = 980 * s          # punto in cui si perde il collegamento
    qv = 250 * s          # quota di rientro impostata

    # linea della quota di rientro
    d.line([(120 * s, qv), ((VW - 120) * s, qv)], fill=(*OTTONE, 70), width=max(1, s))
    tracked(d, ((VW - 130) * s, qv - 12 * s), "QUOTA DI RIENTRO", mono(10.5 * s), (*OTTONE, 200), 2.6 * s, anchor="rs")

    # home point
    d.polygon([(hx, ys - 26 * s), (hx - 16 * s, ys - 8 * s), (hx + 16 * s, ys - 8 * s)], fill=(*OTTONE_CHI, 230))
    d.rectangle([hx - 12 * s, ys - 10 * s, hx + 12 * s, ys], fill=(*OTTONE_CHI, 180))
    tracked(d, (hx, ys + 30 * s), "HOME POINT", mono(10.5 * s), (*OTTONE_CHI, 225), 2.6 * s, anchor="ms")

    # pilota
    persona(d, hx + 70 * s, ys, 4.6 * s, colore=CARTA, alfa=200)

    # fasi
    f1, f2, f3, f4 = 0.20, 0.36, 0.74, 0.94

    if t < f1:                                   # volo normale
        k = t / f1
        x = hx + (fx - hx) * k
        y = ys - 120 * s
        stato, col = "VOLO IN CORSO", CARTA
    elif t < f2:                                 # salita
        k = (t - f1) / (f2 - f1)
        x, y = fx, ys - 120 * s + (qv - (ys - 120 * s)) * dissolve(k, 0, 1)
        stato, col = "SALITA ALLA QUOTA DI RIENTRO", OTTONE
    elif t < f3:                                 # rientro
        k = (t - f2) / (f3 - f2)
        x, y = fx + (hx - fx) * dissolve(k, 0, 1), qv
        stato, col = "RIENTRO SULL'HOME POINT", OTTONE
    else:                                        # discesa
        k = (t - f3) / (f4 - f3) if t < f4 else 1.0
        x, y = hx, qv + (ys - 26 * s - qv) * dissolve(min(k, 1), 0, 1)
        stato, col = "DISCESA E ATTERRAGGIO", Z_VERDE

    # traccia percorsa
    tratti = []
    if t >= f1:
        tratti.append(((hx, ys - 120 * s), (fx, ys - 120 * s)))
    if t >= f2:
        tratti.append(((fx, ys - 120 * s), (fx, qv)))
    if t >= f3:
        tratti.append(((fx, qv), (hx, qv)))
    for a, b in tratti:
        d.line([a, b], fill=(*OTTONE, 90), width=max(1, s))

    # perdita del collegamento
    if t >= f1:
        k = dissolve(t, f1, f1 + 0.06)
        for i in range(3):
            rr = (16 + i * 12) * s
            d.arc([fx - rr, ys - 120 * s - rr, fx + rr, ys - 120 * s + rr], 200, 340,
                  fill=alfa((*Z_ROSSA, 190), k * (1 - i * 0.25)), width=max(1, s))
        for dxx, dyy in ((-1, -1), (1, -1)):
            d.line([(fx - 12 * s * dxx, ys - 176 * s - 12 * s * dyy),
                    (fx + 12 * s * dxx, ys - 176 * s + 12 * s * dyy)],
                   fill=alfa((*Z_ROSSA, 220), k), width=max(1, int(2 * s)))
        tracked(d, (fx, ys - 200 * s), "COLLEGAMENTO PERSO", mono(10.5 * s),
                alfa((*Z_ROSSA, 230), k), 2.6 * s, anchor="ms")

    drone_lato(d, x, y, 3.2 * s)

    # stato corrente
    etichetta(d, 60 * s, 150 * s, stato, s, col, riempi=True, corpo=12)

    # nota finale
    if t > 0.94:
        k = dissolve(t, 0.94, 1.0)
        paragrafo(d, (60 * s, 640 * s),
                  "Il rientro automatico funziona solo se il posizionamento era valido al decollo: senza home point registrato, il drone non ha una destinazione.",
                  sans(14 * s), alfa((*OTTONE_CHI, 235), k), 900 * s)


# ====================================================== v03 · lettura METAR
METAR = [
    ("METAR", "osservazione di routine"),
    ("LIMC", "Milano Malpensa, codice ICAO"),
    ("171050Z", "giorno 17, ore 10:50 Zulu, cioè 12:50 in orario legale"),
    ("25014G24KT", "vento da 250 gradi, 14 nodi, raffiche a 24: circa 12 m/s"),
    ("9999", "visibilità pari o superiore a 10 chilometri"),
    ("SCT025", "nubi sparse con base a 2500 piedi"),
    ("BKN040", "cielo prevalentemente coperto a 4000 piedi"),
    ("14/12", "temperatura 14 °C, rugiada 12 °C: spread di 2 gradi"),
    ("Q1011", "QNH 1011 hPa, sotto la pressione standard"),
    ("NOSIG", "nessun cambiamento significativo nelle due ore"),
]


def dis_metar(d, t, s):
    testa(d, "Meteorologia", "Leggere un METAR, gruppo per gruppo")

    f = mono(24 * s)
    x = 60 * s
    y = 210 * s
    quante = len(METAR)
    avanz = t * (quante + 1.2)
    attivo = int(min(avanz, quante - 0.001))

    # riga del messaggio, mandata a capo se serve
    posizioni = []
    cx = x
    cy = y
    for i, (gruppo, _) in enumerate(METAR):
        w = sum(d.textlength(c, font=f) for c in gruppo) + 1.6 * s * (len(gruppo) - 1)
        if cx + w > (VW - 60) * s:
            cx = x
            cy += 44 * s
        posizioni.append((cx, cy, w))
        cx += w + 20 * s

    for i, (gruppo, _) in enumerate(METAR):
        gx, gy, w = posizioni[i]
        letto = avanz > i + 0.55
        if i == attivo:
            k = dissolve(avanz - i, 0, 0.4)
            d.rounded_rectangle([gx - 9 * s, gy - 28 * s, gx + w + 9 * s, gy + 10 * s], radius=5 * s,
                                fill=alfa((*OTTONE, 230), k))
            col = alfa((10, 22, 34, 255), k) if k > 0.5 else (*CARTA, 245)
        elif letto:
            col = (*OTTONE_CHI, 235)
        else:
            col = (*GRIGIO_2, 150)
        tracked(d, (gx, gy), gruppo, f, col, 1.6 * s)

    # spiegazione del gruppo corrente
    ybox = 380 * s
    d.rounded_rectangle([60 * s, ybox, (VW - 60) * s, ybox + 170 * s], radius=6 * s,
                        fill=(255, 255, 255, 12), outline=(255, 255, 255, 40), width=max(1, s))
    gruppo, nota = METAR[attivo]
    tracked(d, (86 * s, ybox + 44 * s), gruppo, mono(22 * s), (*OTTONE_CHI, 245), 2 * s)
    paragrafo(d, (86 * s, ybox + 88 * s), nota, sans(17 * s), (*CARTA, 240), (VW - 200) * s)

    # verdetto operativo alla fine
    if avanz > quante - 0.2:
        k = dissolve(avanz - (quante - 0.2), 0, 0.6)
        etichetta(d, 60 * s, 600 * s, "VENTO OLTRE I 10 M/S · NON SI VOLA", s,
                  alfa((*Z_ROSSA, 255), k)[:3], riempi=True, corpo=13)
        paragrafo(d, (60 * s, 650 * s),
                  "Raffiche a 24 nodi e spread di due gradi: due motivi indipendenti per rimandare.",
                  sans(14 * s), alfa((190, 201, 211, 235), k), 900 * s)
    else:
        conteggio = f"{attivo + 1} / {quante}"
        tracked(d, ((VW - 60) * s, 620 * s), conteggio, mono(13 * s), (*GRIGIO, 210), 3 * s, anchor="rs")


# ======================================================== v04 · regola 1:1
def dis_uno_a_uno(d, t, s):
    testa(d, "Mitigazione del rischio", "La regola 1:1")

    ys = 600 * s
    suolo(d, ys, 60 * s, (VW - 60) * s, s, alfa=120)

    px = 260 * s                      # pilota
    persona(d, px, ys, 4.8 * s, colore=CARTA, alfa=210)

    # quota che sale e scende
    ciclo = (math.sin((t * 2 - 0.5) * math.pi) + 1) / 2
    quota_m = 8 + 42 * ciclo          # da 8 a 50 metri
    scala = 7.4 * s                   # unità per metro
    dy = quota_m * scala
    dxx = quota_m * scala             # la distanza eguaglia la quota

    dronex = px + 120 * s
    droney = ys - dy

    # colonna verticale quotata
    d.line([(dronex, ys), (dronex, droney)], fill=(*OTTONE, 80), width=max(1, s))
    quota_freccia(d, dronex - 40 * s, droney, ys, f"{quota_m:.0f} m", s, OTTONE, lato="sx")

    # distanza orizzontale pari alla quota
    limite = dronex + dxx
    d.line([(dronex, ys), (limite, ys)], fill=(*Z_ARANCIONE, 120), width=max(1, s))
    misura_oriz(d, ys + 48 * s, dronex, limite, f"{quota_m:.0f} m", s, Z_ARANCIONE, sopra=False)

    # cono di caduta
    d.polygon([(dronex, droney), (limite, ys), (dronex, ys)], fill=(191, 58, 43, 34))
    d.line([(dronex, droney), (limite, ys)], fill=(*Z_ROSSA, 150), width=max(1, s))

    # perimetro e persone oltre il limite
    d.line([(limite, ys - 40 * s), (limite, ys + 14 * s)], fill=(*Z_ARANCIONE, 200), width=max(1, int(1.6 * s)))
    for i, off in enumerate((60, 118, 176)):
        persona(d, limite + off * s, ys, 4.4 * s)
    tracked(d, (limite + 60 * s, ys + 46 * s), "PERSONE NON COINVOLTE", mono(10.5 * s), (*GRIGIO, 215), 2.6 * s)

    drone_lato(d, dronex, droney, 3.0 * s)

    # riquadro esplicativo
    d.rounded_rectangle([60 * s, 170 * s, 520 * s, 330 * s], radius=6 * s,
                        fill=(255, 255, 255, 12), outline=(255, 255, 255, 40), width=max(1, s))
    tracked(d, (84 * s, 208 * s), "REGOLA 1:1", mono(12 * s), (*OTTONE, 235), 3.4 * s)
    paragrafo(d, (84 * s, 244 * s),
              "La distanza orizzontale dalle persone non coinvolte è pari alla quota di volo. Se sali, ti allontani.",
              sans(15 * s), (206, 215, 223), 412 * s)

    # lettura corrente
    tracked(d, (860 * s, 208 * s), "QUOTA", mono(11 * s), (*GRIGIO, 210), 3 * s)
    tracked(d, (860 * s, 250 * s), f"{quota_m:.0f} m", mono(30 * s), (*OTTONE_CHI, 245), 2 * s)
    tracked(d, (1040 * s, 208 * s), "DISTANZA", mono(11 * s), (*GRIGIO, 210), 3 * s)
    tracked(d, (1040 * s, 250 * s), f"{quota_m:.0f} m", mono(30 * s), (*Z_ARANCIONE, 245), 2 * s)


LAVORI = {
    "v01": ("v01-preflight.mp4", dis_preflight, 20),
    "v02": ("v02-return-to-home.mp4", dis_rth, 18),
    "v03": ("v03-lettura-metar.mp4", dis_metar, 24),
    "v04": ("v04-regola-1-1.mp4", dis_uno_a_uno, 14),
}

if __name__ == "__main__":
    scelti = sys.argv[1:] or list(LAVORI)
    for chiave in scelti:
        nome, fn, dur = LAVORI[chiave]
        print("genero", nome, "...", flush=True)
        print("  scritto", scrivi(nome, fn, dur), flush=True)
