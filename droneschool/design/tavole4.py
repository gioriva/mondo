#!/usr/bin/env python3
"""Drone School · tavole illustrate (4 di 5)."""

import sys, math, os
sys.path.insert(0, "/home/claude/droneschool/design")
from comune import *

W, H, SS = 1600, 900, 2
OUT = "/home/claude/droneschool/media/"
os.makedirs(OUT, exist_ok=True)


# ============================================================ 07 · batterie
def tav_batterie():
    img, d = tela(W, H, SS)
    s = SS
    intestazione(d, s, W, "Tecnica UAS", "Leggere una batteria ai polimeri di litio",
                 "Quattro numeri sull'etichetta raccontano tutto: quante celle, quanta carica, quanta energia, quanta corrente può erogare.")

    # ---------- celle in serie
    y0 = 264 * s
    tracked(d, (60 * s, y0), "CELLE IN SERIE: LA TENSIONE SI SOMMA", mono(11 * s), (*OTTONE, 235), 3 * s)
    cx = 66 * s
    for i in range(4):
        x = cx + i * 152 * s
        d.rounded_rectangle([x, y0 + 30 * s, x + 116 * s, y0 + 132 * s], radius=6 * s,
                            fill=(200, 147, 63, 26), outline=(*OTTONE, 170), width=max(1, int(1.4 * s)))
        tracked(d, (x + 58 * s, y0 + 88 * s), "4,2 V", mono(16 * s), (*OTTONE_CHI, 245), 1.6 * s, anchor="ms")
        tracked(d, (x + 58 * s, y0 + 114 * s), f"CELLA {i + 1}", mono(9.5 * s), (*GRIGIO, 200), 2.2 * s, anchor="ms")
        if i < 3:
            d.line([(x + 116 * s, y0 + 81 * s), (x + 152 * s, y0 + 81 * s)], fill=(*OTTONE, 180), width=max(1, int(1.6 * s)))
            tracked(d, (x + 134 * s - 5 * s, y0 + 70 * s), "+", mono(14 * s), (*OTTONE, 220), 0, anchor="ms")
    d.line([(cx, y0 + 158 * s), (cx + 3 * 152 * s + 116 * s, y0 + 158 * s)], fill=(255, 255, 255, 60), width=max(1, s))
    tracked(d, (cx + (3 * 152 * s + 116 * s) / 2, y0 + 190 * s), "4S CARICA = 16,8 V", mono(15 * s), (*CARTA, 240), 3.4 * s, anchor="ms")

    # ---------- etichetta di esempio
    ex, ey = 66 * s, y0 + 250 * s
    d.rounded_rectangle([ex, ey, ex + 570 * s, ey + 268 * s], radius=6 * s,
                        fill=(255, 255, 255, 12), outline=(255, 255, 255, 40), width=max(1, s))
    tracked(d, (ex + 24 * s, ey + 40 * s), "SULL'ETICHETTA", mono(11 * s), (*OTTONE, 235), 3 * s)
    righe = [("4S", "quattro celle in serie: 14,8 V nominali, 16,8 V a piena carica"),
             ("5000 mAh", "capacità, cioè quanta carica contiene"),
             ("74 Wh", "energia: capacità per tensione. È il dato che chiedono le compagnie aeree"),
             ("25C", "scarica continua massima: 25 volte la capacità, quindi 125 A")]
    yy = ey + 84 * s
    for sigla, nota in righe:
        tracked(d, (ex + 24 * s, yy), sigla, mono(14 * s), (*OTTONE_CHI, 245), 1.8 * s)
        paragrafo(d, (ex + 150 * s, yy - 2 * s), nota, sans(14 * s), (200, 210, 219), 396 * s)
        yy += 52 * s

    # ---------- conservazione
    bx, by = 700 * s, 264 * s
    d.rounded_rectangle([bx, by - 34 * s, bx + 840 * s, by + 504 * s], radius=6 * s,
                        fill=(255, 255, 255, 12), outline=(255, 255, 255, 40), width=max(1, s))
    tracked(d, (bx + 26 * s, by + 6 * s), "STATO DI CARICA E DURATA", mono(11 * s), (*OTTONE, 235), 3 * s)

    gx0, gx1 = bx + 26 * s, bx + 814 * s
    gy = by + 60 * s
    alt = 54 * s
    fasce = [(0.0, 0.20, Z_ROSSA, "SOTTO IL 20%"), (0.20, 0.50, Z_ARANCIONE, None),
             (0.50, 0.70, Z_VERDE, "CONSERVAZIONE"), (0.70, 1.0, Z_CELESTE, "PRONTA AL VOLO")]
    for a, b, col, testo in fasce:
        d.rectangle([gx0 + (gx1 - gx0) * a, gy, gx0 + (gx1 - gx0) * b, gy + alt], fill=(*col, 60))
        if testo:
            tracked(d, (gx0 + (gx1 - gx0) * (a + b) / 2, gy + alt / 2 + 5 * s), testo, mono(10.5 * s),
                    (*col, 245), 2.4 * s, anchor="ms")
    d.rectangle([gx0, gy, gx1, gy + alt], outline=(255, 255, 255, 55), width=max(1, s))
    for p in (0, 20, 50, 70, 100):
        x = gx0 + (gx1 - gx0) * p / 100
        d.line([(x, gy + alt), (x, gy + alt + 10 * s)], fill=(255, 255, 255, 90), width=max(1, s))
        tracked(d, (x, gy + alt + 30 * s), f"{p}%", mono(10.5 * s), (*GRIGIO, 220), 1.6 * s, anchor="ms")

    yy = gy + alt + 70 * s
    coppie = [("Carica", "a temperatura ambiente, fra 0 e 45 °C, sempre in borsa ignifuga e sotto sorveglianza"),
              ("Scarica", "non scendere sotto il 20% residuo. Dopo un volo impegnativo lascia raffreddare 30 minuti"),
              ("Conservazione", "attorno al 60%, mai completamente scarica, fra meno 20 e più 40 °C"),
              ("Fine vita", "rigonfiamenti, celle sbilanciate o urti: raccolta rifiuti pericolosi, non nel cestino")]
    for titolo, nota in coppie:
        tracked(d, (bx + 26 * s, yy), titolo.upper(), mono(11 * s), (*OTTONE_CHI, 240), 2.6 * s)
        yy = paragrafo(d, (bx + 200 * s, yy - 2 * s), nota, sans(14 * s), (200, 210, 219), 614 * s) + 16 * s

    paragrafo(d, (bx + 26 * s, yy + 10 * s),
              "Una Lipo può incendiarsi da sola se caricata male, se cade o se subisce un urto. Dopo ogni atterraggio duro ispeziona il pacco.",
              sans(14 * s), (*Z_ARANCIONE, 235), 788 * s)

    firma(d, s, W, H)
    return salva(img, s, OUT + "07-batterie.png", W, H)


# =============================================================== 08 · nubi
def tav_nubi():
    img, d = tela(W, H, SS)
    s = SS
    intestazione(d, s, W, "Meteorologia", "Nubi e copertura del cielo",
                 "La base delle nubi si legge in centinaia di piedi, la copertura in ottavi di cielo. Due dati che decidono se il volo si fa.")

    ys = 606 * s
    suolo(d, ys, 60 * s, 1540 * s, s, alfa=110)

    # scala verticale in piedi
    sx = 108 * s
    d.line([(sx, 240 * s), (sx, ys)], fill=(255, 255, 255, 50), width=max(1, s))
    for ft, y in ((0, ys), (2000, 534 * s), (5000, 424 * s), (10000, 278 * s)):
        d.line([(sx - 8 * s, y), (sx + 8 * s, y)], fill=(255, 255, 255, 70), width=max(1, s))
        tracked(d, (sx - 16 * s, y + 5 * s), f"{ft} ft", mono(10.5 * s), (*GRIGIO, 220), 1.6 * s, anchor="rs")

    def nuvola(cx, cy, k, alfa=52):
        col = (226, 232, 238)
        for dxx, dyy, r in ((-1.5, .12, 1.0), (-.55, -.42, 1.3), (.55, -.24, 1.15), (1.5, .16, .95)):
            d.ellipse([cx + dxx * k - r * k, cy + dyy * k - r * k,
                       cx + dxx * k + r * k, cy + dyy * k + r * k], fill=(*col, alfa))
        d.rectangle([cx - 2.5 * k, cy - .1 * k, cx + 2.5 * k, cy + .8 * k], fill=(*col, alfa))

    # cumuli
    nuvola(330 * s, 500 * s, 30 * s)
    nuvola(486 * s, 522 * s, 22 * s)
    tracked(d, (238 * s, 566 * s), "CUMULI", mono(12 * s), (*CARTA, 235), 3 * s)
    paragrafo(d, (238 * s, 590 * s), "base sotto i 7000 piedi, aria in salita",
              sans(13 * s), (190, 201, 211), 420 * s)

    # cumulonembo: torre continua e incudine agganciata
    cbx = 860 * s
    d.polygon([(cbx - 74 * s, ys), (cbx + 74 * s, ys), (cbx + 96 * s, 400 * s),
               (cbx + 78 * s, 320 * s), (cbx - 78 * s, 320 * s), (cbx - 96 * s, 400 * s)],
              fill=(226, 232, 238, 40))
    for dyy, r in ((-76, 86), (-166, 74), (-244, 58)):
        d.ellipse([cbx - r * s, ys + dyy * s - r * 0.62 * s, cbx + r * s, ys + dyy * s + r * 0.62 * s],
                  fill=(226, 232, 238, 34))
    d.ellipse([cbx - 168 * s, 276 * s, cbx + 168 * s, 344 * s], fill=(226, 232, 238, 44))
    tracked(d, (cbx, 262 * s), "INCUDINE", mono(10 * s), (*GRIGIO, 200), 2.4 * s, anchor="ms")

    # pioggia e fulmine
    for i in range(15):
        x = cbx - 66 * s + i * 10 * s
        d.line([(x, ys - 60 * s), (x - 7 * s, ys - 6 * s)], fill=(*Z_CELESTE, 110), width=max(1, s))
    d.line([(cbx + 34 * s, ys - 118 * s), (cbx + 14 * s, ys - 74 * s)], fill=(*OTTONE_CHI, 240), width=max(1, int(2 * s)))
    d.line([(cbx + 14 * s, ys - 74 * s), (cbx + 36 * s, ys - 68 * s)], fill=(*OTTONE_CHI, 240), width=max(1, int(2 * s)))
    d.line([(cbx + 36 * s, ys - 68 * s), (cbx + 10 * s, ys - 16 * s)], fill=(*OTTONE_CHI, 240), width=max(1, int(2 * s)))

    tracked(d, (1080 * s, 330 * s), "CUMULONEMBO", mono(12 * s), (*Z_ROSSA, 240), 3 * s)
    paragrafo(d, (1080 * s, 352 * s),
              "Da 30 a 90 minuti di vita, diametro medio 15 km, sviluppo oltre i 10 km. Raffiche improvvise, wind shear, grandine.",
              sans(13.5 * s), (190, 201, 211), 420 * s)
    etichetta(d, 1080 * s, 448 * s, "NON SI VOLA NELLE VICINANZE", s, Z_ROSSA)

    # ---------- scala degli ottavi
    by = 700 * s
    d.line([(60 * s, by - 34 * s), (1540 * s, by - 34 * s)], fill=(255, 255, 255, 34), width=max(1, s))
    tracked(d, (60 * s, by - 2 * s), "COPERTURA IN OTTAVI DI CIELO", mono(11 * s), (*OTTONE, 235), 3 * s)
    voci = [("SKC", 0, "sereno"), ("FEW", 2, "1-2 ottavi"), ("SCT", 4, "3-4 ottavi"),
            ("BKN", 6, "5-7 ottavi"), ("OVC", 8, "8 ottavi")]
    x = 60 * s
    for sigla, ott, nota in voci:
        w, h = 108 * s, 50 * s
        yb = by + 26 * s
        d.rectangle([x, yb, x + w, yb + h], outline=(255, 255, 255, 70), width=max(1, s))
        if ott:
            d.rectangle([x + 1, yb + h - h * ott / 8, x + w - 1, yb + h - 1], fill=(226, 232, 238, 62))
        tracked(d, (x + w / 2, yb + 32 * s), sigla, mono(13 * s), (*CARTA, 245), 2.4 * s, anchor="ms")
        tracked(d, (x + w / 2, yb + h + 24 * s), nota, mono(10 * s), (*GRIGIO, 215), 1.6 * s, anchor="ms")
        x += w + 20 * s

    paragrafo(d, (x + 26 * s, by + 34 * s),
              "La quota della base si legge moltiplicando per 100 il numero che segue la sigla: BKN040 significa cielo prevalentemente coperto con base a 4000 piedi.",
              sans(14 * s), (*OTTONE_CHI, 235), 660 * s)

    firma(d, s, W, H)
    return salva(img, s, OUT + "08-nubi.png", W, H)


# ============================================================ 09 · spread
def tav_spread():
    img, d = tela(W, H, SS)
    s = SS
    intestazione(d, s, W, "Meteorologia", "Lo spread e la nebbia",
                 "La differenza fra temperatura e punto di rugiada è il dato più utile che leggi in un METAR. Quando si azzera, l'aria condensa.")

    # assi
    gx0, gy0, gx1, gy1 = 130 * s, 250 * s, 1010 * s, 700 * s
    d.line([(gx0, gy1), (gx1, gy1)], fill=(255, 255, 255, 70), width=max(1, s))
    d.line([(gx0, gy0), (gx0, gy1)], fill=(255, 255, 255, 70), width=max(1, s))

    tmin, tmax = 2, 20
    def Y(t):
        return gy1 - (gy1 - gy0) * (t - tmin) / (tmax - tmin)

    for t in range(4, 21, 4):
        y = Y(t)
        d.line([(gx0, y), (gx1, y)], fill=(255, 255, 255, 16), width=max(1, s))
        tracked(d, (gx0 - 14 * s, y + 5 * s), f"{t}°", mono(10.5 * s), (*GRIGIO, 220), 1.4 * s, anchor="rs")

    ore = ["12", "15", "18", "21", "00", "03", "06", "09"]
    for i, o in enumerate(ore):
        x = gx0 + (gx1 - gx0) * i / (len(ore) - 1)
        d.line([(x, gy1), (x, gy1 + 8 * s)], fill=(255, 255, 255, 70), width=max(1, s))
        tracked(d, (x, gy1 + 28 * s), o, mono(11 * s), (*GRIGIO, 225), 1.6 * s, anchor="ms")
    tracked(d, ((gx0 + gx1) / 2, gy1 + 56 * s), "ORE LOCALI", mono(10 * s), (*GRIGIO_2, 210), 3 * s, anchor="ms")

    temp = [19, 18, 15.5, 12.5, 10.5, 9.2, 8.6, 12]
    rug = [8.5, 8.4, 8.4, 8.3, 8.3, 8.4, 8.5, 8.6]

    def curva(valori, col, largh=2.4):
        pts = [(gx0 + (gx1 - gx0) * i / (len(valori) - 1), Y(v)) for i, v in enumerate(valori)]
        for i in range(len(pts) - 1):
            d.line([pts[i], pts[i + 1]], fill=(*col, 235), width=max(1, int(largh * s)))
        for p in pts:
            d.ellipse([p[0] - 3.4 * s, p[1] - 3.4 * s, p[0] + 3.4 * s, p[1] + 3.4 * s], fill=(*col, 245))
        return pts

    # area dello spread
    pt = [(gx0 + (gx1 - gx0) * i / 7, Y(temp[i])) for i in range(8)]
    pr = [(gx0 + (gx1 - gx0) * i / 7, Y(rug[i])) for i in range(8)]
    d.polygon(pt + pr[::-1], fill=(200, 147, 63, 30))

    curva(rug, Z_CELESTE)
    curva(temp, OTTONE_CHI)

    tracked(d, (gx0 + 16 * s, Y(19.6)), "TEMPERATURA", mono(11 * s), (*OTTONE_CHI, 240), 2.6 * s)
    tracked(d, (gx0 + 16 * s, Y(7.4)), "PUNTO DI RUGIADA", mono(11 * s), (*Z_CELESTE, 240), 2.6 * s)

    # zona critica
    xcrit = gx0 + (gx1 - gx0) * 6 / 7
    d.rectangle([xcrit - 60 * s, gy0, xcrit + 60 * s, gy1], fill=(191, 58, 43, 26))
    tracked(d, (xcrit, gy0 - 14 * s), "SPREAD MINIMO", mono(11 * s), (*Z_ROSSA, 240), 2.6 * s, anchor="ms")
    quota_freccia(d, xcrit + 26 * s, Y(rug[6]), Y(temp[6]), "0,1 °C", s, Z_ROSSA)

    quota_freccia(d, gx0 + 40 * s, Y(rug[0]), Y(temp[0]), "10,5 °C", s, OTTONE)

    # colonna a destra
    bx, by = 1060 * s, 250 * s
    d.rounded_rectangle([bx, by, bx + 480 * s, by + 480 * s], radius=6 * s,
                        fill=(255, 255, 255, 12), outline=(255, 255, 255, 40), width=max(1, s))
    tracked(d, (bx + 26 * s, by + 44 * s), "COME SI LEGGE", mono(11 * s), (*OTTONE, 235), 3 * s)
    yy = by + 84 * s
    for col, sigla, nota in ((Z_VERDE, "oltre 5 °C", "aria secca, cielo limpido"),
                             (Z_GIALLA, "fra 3 e 5 °C", "aria umida, foschia possibile"),
                             (Z_ROSSA, "sotto 2 °C", "aria prossima alla saturazione: nebbia e nubi basse probabili nelle ore successive")):
        d.rectangle([bx + 26 * s, yy - 11 * s, bx + 34 * s, yy + 1 * s], fill=(*col, 220))
        tracked(d, (bx + 48 * s, yy), sigla.upper(), mono(12 * s), (*col, 240), 2.2 * s)
        yy = paragrafo(d, (bx + 48 * s, yy + 22 * s), nota, sans(14 * s), (200, 210, 219), 404 * s) + 22 * s

    d.line([(bx + 26 * s, yy), (bx + 454 * s, yy)], fill=(255, 255, 255, 34), width=max(1, s))
    yy += 34 * s
    tracked(d, (bx + 26 * s, yy), "NEL METAR", mono(11 * s), (*OTTONE, 235), 3 * s)
    tracked(d, (bx + 26 * s, yy + 42 * s), "09/08", mono(22 * s), (*CARTA, 245), 2.4 * s)
    paragrafo(d, (bx + 150 * s, yy + 28 * s),
              "temperatura 9 °C, punto di rugiada 8 °C. Spread di un grado: il volo del mattino è a rischio.",
              sans(14 * s), (*OTTONE_CHI, 235), 300 * s)
    paragrafo(d, (bx + 26 * s, yy + 106 * s),
              "Sotto i 1000 metri di visibilità si parla di nebbia. Sotto i 1500 non si è più in VMC nello spazio aereo di classe G.",
              sans(14 * s), (196, 207, 216), 428 * s)

    firma(d, s, W, H)
    return salva(img, s, OUT + "09-spread.png", W, H)


# ====================================================== 10 · centro di gravità
def tav_equilibrio():
    img, d = tela(W, H, SS)
    s = SS
    intestazione(d, s, W, "Massa ed equilibrio", "Il centro di gravità",
                 "Ogni cambio di carico utile sposta il baricentro. Le eliche che sostengono più peso lavorano di più, e la portanza serve a compensare invece che a volare.")

    ys = 640 * s

    def multirottore(cx, cy, k, offset=0.0, col=OTTONE_CHI):
        """Vista laterale schematica con il baricentro spostato di offset."""
        d.line([(cx - 15 * k, cy), (cx + 15 * k, cy)], fill=(*col, 230), width=max(1, int(0.5 * k)))
        for sx in (-15 * k, 15 * k):
            d.line([(cx + sx - 6 * k, cy - 4 * k), (cx + sx + 6 * k, cy - 4 * k)], fill=(*col, 200), width=max(1, int(0.42 * k)))
            d.line([(cx + sx, cy - 4 * k), (cx + sx, cy)], fill=(*col, 220), width=max(1, int(0.5 * k)))
        d.rounded_rectangle([cx - 6 * k, cy - 3 * k, cx + 6 * k, cy + 4 * k], radius=1.6 * k,
                            fill=(10, 22, 34, 255), outline=(*col, 235), width=max(1, int(0.5 * k)))
        # baricentro
        bx = cx + offset * k
        r = 2.4 * k
        d.ellipse([bx - r, cy + 1 * k - r, bx + r, cy + 1 * k + r], outline=(*CARTA, 240), width=max(1, int(0.5 * k)))
        d.pieslice([bx - r, cy + 1 * k - r, bx + r, cy + 1 * k + r], 0, 90, fill=(*CARTA, 240))
        d.pieslice([bx - r, cy + 1 * k - r, bx + r, cy + 1 * k + r], 180, 270, fill=(*CARTA, 240))
        return bx

    # caso equilibrato
    c1x = 400 * s
    b1 = multirottore(c1x, ys - 120 * s, 7 * s, 0.0)
    d.line([(b1, ys - 120 * s + 30 * s), (b1, ys)], fill=(*CARTA, 70), width=max(1, s))
    tracked(d, (c1x, ys + 42 * s), "IN EQUILIBRIO", mono(12 * s), (*Z_VERDE, 240), 3.4 * s, anchor="ms")
    paragrafo(d, (c1x - 170 * s, ys + 68 * s),
              "Il baricentro cade al centro fra i rotori. I quattro motori lavorano allo stesso regime.",
              sans(14 * s), (196, 207, 216), 340 * s)

    # caso sbilanciato
    c2x = 880 * s
    b2 = multirottore(c2x, ys - 120 * s, 7 * s, 5.4)
    # payload spostato
    d.rounded_rectangle([c2x + 30 * s, ys - 120 * s + 30 * s, c2x + 82 * s, ys - 120 * s + 64 * s],
                        radius=4 * s, fill=(*OTTONE, 90), outline=(*OTTONE, 200), width=max(1, s))
    tracked(d, (c2x + 56 * s, ys - 120 * s + 52 * s), "PAYLOAD", mono(9 * s), (*CARTA, 230), 1.4 * s, anchor="ms")
    d.line([(b2, ys - 120 * s + 30 * s), (b2, ys)], fill=(*Z_ARANCIONE, 110), width=max(1, s))
    misura_oriz(d, ys - 16 * s, c2x, b2, "braccio", s, Z_ARANCIONE, sopra=True)
    tracked(d, (c2x, ys + 42 * s), "SBILANCIATO", mono(12 * s), (*Z_ARANCIONE, 240), 3.4 * s, anchor="ms")
    paragrafo(d, (c2x - 170 * s, ys + 68 * s),
              "I rotori di destra spingono di più. Gli altri non possono spingere al massimo, altrimenti l'assetto si inclina.",
              sans(14 * s), (196, 207, 216), 340 * s)

    # frecce di spinta
    for cx, spinte in ((c1x, (1.0, 1.0)), (c2x, (0.6, 1.4))):
        for i, sx in enumerate((-15, 15)):
            x = cx + sx * 7 * s
            h = 46 * s * spinte[i]
            d.line([(x, ys - 120 * s - 34 * s), (x, ys - 120 * s - 34 * s - h)],
                   fill=(*OTTONE, 200), width=max(1, int(2 * s)))
            d.polygon([(x - 6 * s, ys - 120 * s - 34 * s - h), (x + 6 * s, ys - 120 * s - 34 * s - h),
                       (x, ys - 120 * s - 34 * s - h - 12 * s)], fill=(*OTTONE, 220))

    suolo(d, ys, 140 * s, 1120 * s, s, alfa=110)

    # scheda a destra
    bx, by = 1180 * s, 250 * s
    d.rounded_rectangle([bx, by, bx + 360 * s, by + 420 * s], radius=6 * s,
                        fill=(255, 255, 255, 12), outline=(255, 255, 255, 40), width=max(1, s))
    tracked(d, (bx + 24 * s, by + 42 * s), "VERIFICA IN CAMPO", mono(11 * s), (*OTTONE, 235), 3 * s)
    yy = by + 82 * s
    for i, v in enumerate(["Sostieni il multirotore con due dita alle estremità dell'asse trasversale",
                           "Osserva se resta orizzontale o se si inclina da un lato",
                           "Sposta il carico utile finché non resta piano",
                           "Ripeti la verifica a ogni cambio di configurazione"]):
        tracked(d, (bx + 26 * s, yy + 4 * s), f"0{i + 1}", mono(11 * s), (*OTTONE, 215), 1.4 * s)
        yy = paragrafo(d, (bx + 62 * s, yy), v, sans(14 * s), (200, 210, 219), 286 * s) + 16 * s
    d.line([(bx + 24 * s, yy + 6 * s), (bx + 336 * s, yy + 6 * s)], fill=(255, 255, 255, 34), width=max(1, s))
    paragrafo(d, (bx + 24 * s, yy + 40 * s),
              "Il momento è forza per lunghezza del braccio. Una zavorra all'estremità pesa molto più di quanto dica la bilancia.",
              sans(14 * s), (*OTTONE_CHI, 230), 310 * s)

    firma(d, s, W, H)
    return salva(img, s, OUT + "10-equilibrio.png", W, H)


if __name__ == "__main__":
    for f in (tav_batterie, tav_nubi, tav_spread, tav_equilibrio):
        print("scritta", f())
