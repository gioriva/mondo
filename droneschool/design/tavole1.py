#!/usr/bin/env python3
"""Drone School · tavole illustrate (1 di 2)."""

import sys, math
sys.path.insert(0, "/home/claude/droneschool/design")
from comune import *

W, H, SS = 1600, 900, 2
OUT = "/home/claude/droneschool/media/"
import os
os.makedirs(OUT, exist_ok=True)


# ============================================================== 01 · VLOS
def tav_vlos():
    img, d = tela(W, H, SS)
    s = SS
    intestazione(d, s, W, "Sicurezza operativa", "Volare a vista",
                 "Il contatto visivo diretto è un vincolo di risultato, non una distanza fissa: dipende da quanto il drone resta distinguibile.")

    ys = 760 * s
    suolo(d, ys, 60 * s, (W - 60) * s, s)

    # pilota
    px = 250 * s
    persona(d, px, ys, 5.2 * s, colore=CARTA, alfa=235)
    tracked(d, (px, ys + 34 * s), "PILOTA", mono(11 * s), (*CARTA, 200), 3 * s, anchor="ms")

    # cono di vista
    cono = [(px, ys - 26 * s), (1180 * s, 300 * s), (1180 * s, 640 * s)]
    d.polygon(cono, fill=(200, 147, 63, 26))
    d.line([cono[0], cono[1]], fill=(*OTTONE, 90), width=max(1, s))
    d.line([cono[0], cono[2]], fill=(*OTTONE, 90), width=max(1, s))

    # caso favorevole
    drone_alto(d, 760 * s, 430 * s, 2.4 * s)
    richiamo(d, 760 * s, 430 * s, 900 * s, 330 * s, s, OTTONE)
    etichetta(d, 908 * s, 312 * s, "SEMPRE DISTINGUIBILE", s, OTTONE, riempi=True)

    # ostacolo che interrompe la linea di vista
    edificio(d, 1000 * s, ys, 132 * s, 210 * s)
    albero(d, 960 * s, ys, 7 * s)
    drone_alto(d, 1230 * s, 600 * s, 2.4 * s, colore=(*GRIGIO,)[:3])
    d.line([(px, ys - 26 * s), (1230 * s, 600 * s)], fill=(*Z_ROSSA, 120), width=max(1, s))
    # crocetta sulla linea interrotta
    ix, iy = 1052 * s, 626 * s
    for dx, dy in ((-1, -1), (1, -1)):
        d.line([(ix - 11 * s * dx, iy - 11 * s * dy), (ix + 11 * s * dx, iy + 11 * s * dy)],
               fill=(*Z_ROSSA, 235), width=max(1, int(2 * s)))
    richiamo(d, 1230 * s, 600 * s, 1290 * s, 690 * s, s, Z_ROSSA)
    etichetta(d, 1150 * s, 706 * s, "LINEA DI VISTA INTERROTTA", s, Z_ROSSA)

    # scheda laterale
    bx, by = 60 * s, 300 * s
    d.rounded_rectangle([bx, by, bx + 330 * s, by + 330 * s], radius=6 * s,
                        fill=(255, 255, 255, 12), outline=(255, 255, 255, 40), width=max(1, s))
    tracked(d, (bx + 22 * s, by + 36 * s), "COSA INTERROMPE IL VLOS", mono(11 * s), (*OTTONE, 235), 3 * s)
    voci = ["Edifici, alberi, crinali",
            "Foschia e sole contro",
            "Drone chiaro su cielo chiaro",
            "Pilota su mezzo in movimento"]
    yy = by + 76 * s
    for v in voci:
        d.ellipse([bx + 22 * s, yy - 13 * s, bx + 29 * s, yy - 6 * s], fill=(*OTTONE, 200))
        paragrafo(d, (bx + 42 * s, yy - 8 * s), v, sans(15 * s), (206, 215, 223), 268 * s)
        yy += 46 * s
    d.line([(bx + 22 * s, by + 262 * s), (bx + 308 * s, by + 262 * s)], fill=(255, 255, 255, 34), width=max(1, s))
    paragrafo(d, (bx + 22 * s, by + 282 * s),
              "Visibilità minima in VMC classe G: 1500 metri.",
              sans(14 * s), (*OTTONE_CHI, 235), 286 * s)

    firma(d, s, W, H)
    return salva(img, s, OUT + "01-vlos.png", W, H)


# ================================================== 02 · marcatura e QR
def tav_marcatura():
    img, d = tela(W, H, SS)
    s = SS
    intestazione(d, s, W, "Sicurezza operativa", "Cosa deve portare addosso il drone",
                 "Due contrassegni distinti, con obblighi distinti: l'etichetta di classe la applica il costruttore, il numero di operatore lo applichi tu.")

    cx, cy = 540 * s, 520 * s
    drone_alto(d, cx, cy, 7.4 * s)

    # etichetta di classe
    ex, ey = cx - 104 * s, cy - 86 * s
    d.rounded_rectangle([ex - 26 * s, ey - 20 * s, ex + 26 * s, ey + 20 * s], radius=5 * s,
                        fill=(*CARTA, 240))
    tracked(d, (ex, ey + 7 * s), "C1", mono(20 * s), (10, 22, 34, 255), 2 * s, anchor="ms")
    richiamo(d, ex, ey - 22 * s, 240 * s, 296 * s, s, OTTONE)
    tracked(d, (110 * s, 288 * s), "ETICHETTA DI CLASSE", mono(12 * s), (*OTTONE, 240), 3.2 * s)
    paragrafo(d, (110 * s, 310 * s),
              "La applica il costruttore. Dichiara che il prodotto rispetta i requisiti della sua classe, dalla C0 alla C6.",
              sans(15 * s), (200, 210, 219), 300 * s)

    # QR operatore
    qx, qy = cx + 96 * s, cy + 76 * s
    lato = 48 * s
    d.rounded_rectangle([qx - lato / 2, qy - lato / 2, qx + lato / 2, qy + lato / 2],
                        radius=4 * s, fill=(*CARTA, 240))
    # trama del codice, puramente illustrativa
    import random
    rng = random.Random(7)
    passo = lato / 9
    for i in range(9):
        for j in range(9):
            ang = (i < 3 and j < 3) or (i < 3 and j > 5) or (i > 5 and j < 3)
            if ang or rng.random() < 0.42:
                d.rectangle([qx - lato / 2 + i * passo + 1, qy - lato / 2 + j * passo + 1,
                             qx - lato / 2 + (i + 1) * passo - 1, qy - lato / 2 + (j + 1) * passo - 1],
                            fill=(10, 22, 34, 255))
    richiamo(d, qx + lato / 2, qy, 880 * s, 700 * s, s, OTTONE)
    tracked(d, (908 * s, 692 * s), "NUMERO DI OPERATORE", mono(12 * s), (*OTTONE, 240), 3.2 * s)
    paragrafo(d, (908 * s, 712 * s),
              "Lo ottieni registrandoti su D-Flight. Va applicato in modo leggibile e caricato nel sistema di identificazione remota.",
              sans(15 * s), (200, 210, 219), 400 * s)

    # quando serve
    bx, by = 980 * s, 268 * s
    d.rounded_rectangle([bx, by, bx + 470 * s, by + 268 * s], radius=6 * s,
                        fill=(255, 255, 255, 12), outline=(255, 255, 255, 40), width=max(1, s))
    tracked(d, (bx + 22 * s, by + 36 * s), "REGISTRAZIONE OBBLIGATORIA SE", mono(11 * s), (*OTTONE, 235), 3 * s)
    for i, v in enumerate(["Massa al decollo pari o superiore a 250 g",
                           "Oppure, a qualsiasi peso, se il drone ha telecamera, microfono o altri sensori"]):
        d.ellipse([bx + 22 * s, by + 63 * s + i * 82 * s, bx + 29 * s, by + 70 * s + i * 82 * s], fill=(*OTTONE, 200))
        paragrafo(d, (bx + 42 * s, by + 68 * s + i * 82 * s), v, sans(15 * s), (206, 215, 223), 400 * s)
    d.line([(bx + 22 * s, by + 206 * s), (bx + 448 * s, by + 206 * s)], fill=(255, 255, 255, 34), width=max(1, s))
    paragrafo(d, (bx + 22 * s, by + 236 * s),
              "Un drone da 249 g con fotocamera va registrato lo stesso.",
              sans(14 * s), (*OTTONE_CHI, 235), 420 * s)

    firma(d, s, W, H)
    return salva(img, s, OUT + "02-marcatura.png", W, H)


if __name__ == "__main__":
    for f in (tav_vlos, tav_marcatura):
        print("scritta", f())
