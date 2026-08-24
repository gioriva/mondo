#!/usr/bin/env python3
"""Drone School · tavole illustrate (3 di 5)."""

import sys, math, os, random
sys.path.insert(0, "/home/claude/droneschool/design")
from comune import *

W, H, SS = 1600, 900, 2
OUT = "/home/claude/droneschool/media/"
os.makedirs(OUT, exist_ok=True)


# ================================================== 05 · zone geografiche
def tav_zone():
    img, d = tela(W, H, SS)
    s = SS
    intestazione(d, s, W, "Spazio aereo", "Le zone geografiche UAS",
                 "Il sistema a colori della circolare ENAC ATM-09A, pubblicato su D-Flight. Ogni colore fissa la quota oltre la quale la categoria Open non è più ammessa.")

    # ---------------- mappa schematica
    mx0, my0, mx1, my1 = 60 * s, 216 * s, 980 * s, 830 * s
    d.rounded_rectangle([mx0, my0, mx1, my1], radius=6 * s, fill=(255, 255, 255, 8),
                        outline=(255, 255, 255, 30), width=max(1, s))

    def poly(pts, col, alfa=52):
        d.polygon([(mx0 + x * s, my0 + y * s) for x, y in pts], fill=(*col, alfa), outline=(*col, 150))

    # zona bianca di fondo
    d.rectangle([mx0 + 4 * s, my0 + 4 * s, mx1 - 4 * s, my1 - 4 * s], fill=(241, 239, 230, 12))

    # lago
    lago = [(60, 120), (150, 90), (230, 130), (250, 220), (190, 300), (110, 280), (60, 200)]
    d.polygon([(mx0 + x * s, my0 + y * s) for x, y in lago], fill=(62, 146, 198, 40), outline=(*Z_CELESTE, 90))
    tracked(d, (mx0 + 120 * s, my0 + 200 * s), "LAGO", mono(10.5 * s), (*Z_CELESTE, 190), 2.6 * s)

    # zone
    poly([(360, 40), (900, 40), (900, 330), (360, 330)], Z_CELESTE, 40)      # celeste
    poly([(470, 120), (830, 120), (830, 300), (470, 300)], Z_GIALLA, 46)     # gialla
    poly([(560, 170), (760, 170), (760, 268), (560, 268)], Z_ARANCIONE, 58)  # arancione
    poly([(614, 196), (716, 196), (716, 254), (614, 254)], Z_ROSSA, 80)      # rossa

    # aeroporto al centro della zona rossa
    apx, apy = mx0 + 663 * s, my0 + 224 * s
    d.line([(apx - 26 * s, apy + 12 * s), (apx + 26 * s, apy - 12 * s)], fill=(*CARTA, 210), width=max(1, int(2.4 * s)))
    d.ellipse([apx - 5 * s, apy - 5 * s, apx + 5 * s, apy + 5 * s], fill=(*CARTA, 230))
    tracked(d, (apx, apy + 40 * s), "AEROPORTO", mono(10 * s), (*CARTA, 200), 2.4 * s, anchor="ms")

    # abitato e area protetta
    for ex, ey in ((150, 400), (200, 430), (120, 460)):
        edificio(d, mx0 + ex * s, my0 + ey * s, 42 * s, 34 * s)
    tracked(d, (mx0 + 118 * s, my0 + 500 * s), "ABITATO", mono(10.5 * s), (*GRIGIO, 200), 2.6 * s)

    verde = [(700, 420), (860, 400), (900, 500), (780, 560), (690, 500)]
    d.polygon([(mx0 + x * s, my0 + y * s) for x, y in verde], fill=(78, 124, 69, 34), outline=(*Z_VERDE, 130))
    tracked(d, (mx0 + 740 * s, my0 + 480 * s), "AREA PROTETTA", mono(10 * s), (*Z_VERDE, 210), 2.4 * s)

    # etichette delle zone sulla mappa
    for x, y, testo, col in ((372, 62, "CELESTE", Z_CELESTE), (482, 142, "GIALLA", Z_GIALLA),
                             (566, 190, "ARANCIONE", Z_ARANCIONE), (730, 228, "ROSSA", Z_ROSSA)):
        tracked(d, (mx0 + x * s, my0 + y * s), testo, mono(10 * s), (*col, 235), 2.2 * s)
    tracked(d, (mx0 + 60 * s, my0 + 580 * s), "ZONA BIANCA", mono(10.5 * s), (*CARTA, 190), 2.6 * s)

    # ---------------- colonna delle quote
    bx, by = 1030 * s, 216 * s
    d.rounded_rectangle([bx, by, bx + 510 * s, by + 614 * s], radius=6 * s,
                        fill=(255, 255, 255, 12), outline=(255, 255, 255, 40), width=max(1, s))
    tracked(d, (bx + 26 * s, by + 44 * s), "QUOTA MASSIMA IN CATEGORIA OPEN", mono(11 * s), (*OTTONE, 235), 3 * s)

    # scala verticale
    sx = bx + 78 * s
    top, bot = by + 96 * s, by + 416 * s
    d.line([(sx, top - 10 * s), (sx, bot)], fill=(255, 255, 255, 60), width=max(1, s))
    suolo(d, bot + 30 * s, bx + 40 * s, bx + 470 * s, s, alfa=110)

    scala = [(120, Z_BIANCA, "BIANCA"), (60, Z_CELESTE, "CELESTE"),
             (45, Z_GIALLA, "GIALLA"), (25, Z_ARANCIONE, "ARANCIONE"), (0, Z_ROSSA, "ROSSA")]
    for q, col, nome in scala:
        y = bot - (bot - top) * (q / 120.0)
        d.line([(sx - 16 * s, y), (sx + 250 * s, y)], fill=(*col, 130), width=max(1, s))
        tracked(d, (sx - 22 * s, y + 5 * s), f"{q} m", mono(12 * s), (*col, 240), 1.6 * s, anchor="rs")
        tracked(d, (sx + 262 * s, y + 5 * s), nome, mono(11 * s), (*col, 225), 2.6 * s)
        if q:
            drone_lato(d, sx + 120 * s, y - 14 * s, 1.7 * s, colore=col)
    tracked(d, (sx + 262 * s, bot + 5 * s), "OPEN VIETATA", mono(11 * s), (*Z_ROSSA, 235), 2.6 * s)
    tracked(d, (sx + 120 * s, bot + 54 * s), "SUOLO", mono(10 * s), (*CARTA, 150), 2.4 * s, anchor="ms")

    d.line([(bx + 26 * s, by + 486 * s), (bx + 484 * s, by + 486 * s)], fill=(255, 255, 255, 34), width=max(1, s))
    yy = paragrafo(d, (bx + 26 * s, by + 524 * s),
                   "I limiti valgono identici per A1, A2 e A3: le sottocategorie regolano le distanze dalle persone, non l'altimetria.",
                   sans(15 * s), (206, 215, 223), 458 * s)
    paragrafo(d, (bx + 26 * s, yy + 18 * s),
              "Lo stato di una zona può cambiare da un giorno all'altro. Si verifica su D-Flight prima del volo.",
              sans(14 * s), (*OTTONE_CHI, 230), 458 * s)

    firma(d, s, W, H)
    return salva(img, s, OUT + "05-zone-geografiche.png", W, H)


# =================================================== 06 · carta aeronautica
def tav_carta():
    img, d = tela(W, H, SS)
    s = SS
    intestazione(d, s, W, "Spazio aereo", "Leggere la carta aeronautica",
                 "La simbologia della carta ICAO 1:500.000 è standardizzata: quello che impari su una carta italiana funziona ovunque.")

    mx0, my0, mx1, my1 = 60 * s, 216 * s, 1000 * s, 830 * s
    d.rounded_rectangle([mx0, my0, mx1, my1], radius=6 * s, fill=(241, 239, 230, 10),
                        outline=(255, 255, 255, 30), width=max(1, s))

    def arco_tratteggiato(cx, cy, r, col, tratto=10, spazio=9, largh=2.0):
        per = 2 * math.pi * r
        n = max(8, int(per / ((tratto + spazio) * s)))
        for i in range(n):
            a0 = 2 * math.pi * i / n
            a1 = a0 + 2 * math.pi * tratto / (tratto + spazio) / n
            d.line([(cx + r * math.cos(a0), cy + r * math.sin(a0)),
                    (cx + r * math.cos(a1), cy + r * math.sin(a1))],
                   fill=(*col, 210), width=max(1, int(largh * s)))

    # CTR
    ctrx, ctry, ctrr = mx0 + 340 * s, my0 + 300 * s, 210 * s
    d.ellipse([ctrx - ctrr, ctry - ctrr, ctrx + ctrr, ctry + ctrr], fill=(62, 146, 198, 18))
    arco_tratteggiato(ctrx, ctry, ctrr, Z_CELESTE, 14, 8, 2.2)
    tracked(d, (ctrx - 70 * s, ctry - ctrr + 30 * s), "CTR", mono(13 * s), (*Z_CELESTE, 240), 3 * s)

    # ATZ
    atzr = 78 * s
    arco_tratteggiato(ctrx, ctry, atzr, Z_CELESTE, 4, 7, 1.6)
    tracked(d, (ctrx + atzr + 10 * s, ctry - 34 * s), "ATZ", mono(11 * s), (*Z_CELESTE, 220), 2.6 * s)

    # pista
    d.line([(ctrx - 40 * s, ctry + 18 * s), (ctrx + 40 * s, ctry - 18 * s)], fill=(*CARTA, 220), width=max(1, int(3 * s)))

    # area R tratteggiata
    rx0, ry0, rx1, ry1 = mx0 + 620 * s, my0 + 90 * s, mx0 + 880 * s, my0 + 280 * s
    d.rectangle([rx0, ry0, rx1, ry1], outline=(*Z_ROSSA, 200), width=max(1, int(1.6 * s)))
    for i in range(-int((ry1 - ry0) / (12 * s)), int((rx1 - rx0) / (12 * s)) + 1):
        x = rx0 + i * 12 * s
        d.line([(max(rx0, x), ry0 + max(0, rx0 - x)), (min(rx1, x + (ry1 - ry0)), ry0 + min(ry1 - ry0, rx1 - x))],
               fill=(*Z_ROSSA, 90), width=max(1, s))
    tracked(d, (rx0 + 14 * s, ry0 + 30 * s), "R  ZONA REGOLAMENTATA", mono(11 * s), (*Z_ROSSA, 235), 2.6 * s)

    # area protetta
    verde = [(560, 420), (760, 400), (860, 500), (760, 580), (600, 550)]
    d.polygon([(mx0 + x * s, my0 + y * s) for x, y in verde], fill=(78, 124, 69, 26), outline=(*Z_VERDE, 170))
    tracked(d, (mx0 + 610 * s, my0 + 470 * s), "AREA PROTETTA", mono(10.5 * s), (*Z_VERDE, 220), 2.4 * s)

    # ostacoli
    def ostacolo(x, y, quota, tipo="antenna"):
        if tipo == "antenna":
            d.line([(x, y), (x, y - 34 * s)], fill=(*CARTA, 220), width=max(1, int(1.6 * s)))
            d.line([(x - 9 * s, y), (x, y - 34 * s)], fill=(*CARTA, 150), width=max(1, s))
            d.line([(x + 9 * s, y), (x, y - 34 * s)], fill=(*CARTA, 150), width=max(1, s))
        else:
            d.line([(x, y), (x, y - 30 * s)], fill=(*CARTA, 220), width=max(1, int(1.6 * s)))
            for a in (90, 210, 330):
                ar = math.radians(a)
                d.line([(x, y - 30 * s), (x + 16 * s * math.cos(ar), y - 30 * s + 16 * s * math.sin(ar))],
                       fill=(*CARTA, 200), width=max(1, int(1.4 * s)))
        tracked(d, (x + 14 * s, y - 4 * s), f"{quota} ft", mono(10.5 * s), (*OTTONE, 230), 1.6 * s)

    ostacolo(mx0 + 180 * s, my0 + 560 * s, 1120, "antenna")
    ostacolo(mx0 + 300 * s, my0 + 610 * s, 940, "eolica")
    ostacolo(mx0 + 430 * s, my0 + 580 * s, 1310, "eolica")

    # campo volo
    cvx, cvy = mx0 + 130 * s, my0 + 140 * s
    d.ellipse([cvx - 13 * s, cvy - 13 * s, cvx + 13 * s, cvy + 13 * s], outline=(*CARTA, 200), width=max(1, int(1.6 * s)))
    d.line([(cvx - 8 * s, cvy + 5 * s), (cvx + 8 * s, cvy - 5 * s)], fill=(*CARTA, 200), width=max(1, int(1.4 * s)))
    tracked(d, (cvx + 22 * s, cvy + 4 * s), "CAMPO NON CONTROLLATO", mono(10 * s), (*CARTA, 190), 2.2 * s)

    # legenda
    bx, by = 1050 * s, 216 * s
    d.rounded_rectangle([bx, by, bx + 490 * s, by + 614 * s], radius=6 * s,
                        fill=(255, 255, 255, 12), outline=(255, 255, 255, 40), width=max(1, s))
    tracked(d, (bx + 26 * s, by + 44 * s), "SIMBOLI DA RICONOSCERE", mono(11 * s), (*OTTONE, 235), 3 * s)

    voci = [
        (Z_CELESTE, "CTR", "Zona di controllo attorno a un aeroporto, dal suolo verso l'alto. In Open non si entra."),
        (Z_CELESTE, "ATZ", "Zona di traffico d'aeroporto, protegge il traffico in prossimità della pista."),
        (Z_ROSSA, "P · R · D", "Aree proibite, regolamentate o pericolose. La P è vietata sempre."),
        (Z_VERDE, "Area protetta", "Parco o sito Natura 2000: serve in genere l'autorizzazione dell'ente gestore."),
        (OTTONE, "Ostacoli", "Antenne, ciminiere, pale eoliche. La quota è sempre espressa in piedi."),
    ]
    yy = by + 90 * s
    for col, titolo, nota in voci:
        d.rectangle([bx + 26 * s, yy - 11 * s, bx + 34 * s, yy + 1 * s], fill=(*col, 220))
        tracked(d, (bx + 48 * s, yy), titolo.upper(), mono(11.5 * s), (*col, 240), 2.4 * s)
        yy = paragrafo(d, (bx + 48 * s, yy + 22 * s), nota, sans(14 * s), (196, 207, 216), 414 * s) + 22 * s

    d.line([(bx + 26 * s, yy), (bx + 464 * s, yy)], fill=(255, 255, 255, 34), width=max(1, s))
    paragrafo(d, (bx + 26 * s, yy + 34 * s),
              "Un aeroporto controllato sta sempre dentro un CTR. Un campo non controllato può ricadere nel CTR di un aeroporto vicino: la sua presenza non significa libertà di volo.",
              sans(14 * s), (*OTTONE_CHI, 230), 438 * s)

    firma(d, s, W, H)
    return salva(img, s, OUT + "06-carta-aeronautica.png", W, H)


if __name__ == "__main__":
    for f in (tav_zone, tav_carta):
        print("scritta", f())
