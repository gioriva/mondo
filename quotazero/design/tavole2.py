#!/usr/bin/env python3
"""Quota Zero · tavole illustrate (2 di 5)."""

import sys, math, os
sys.path.insert(0, "/home/claude/quotazero/design")
from comune import *

W, H, SS = 1600, 900, 2
OUT = "/home/claude/quotazero/media/"
os.makedirs(OUT, exist_ok=True)


# ======================================================= 03 · lettura area
def tav_area():
    img, d = tela(W, H, SS)
    s = SS
    intestazione(d, s, W, "Sicurezza operativa", "Leggere l'area prima di decollare",
                 "Pianta in scala. La domanda da farsi è una sola: se il drone cadesse adesso, dove finirebbe e chi c'è in quel punto.")

    # scala di riferimento: 1 metro = 2,6 unità
    MET = 2.6
    x0, y0, x1, y1 = 60 * s, 214 * s, 1090 * s, 828 * s
    d.rounded_rectangle([x0, y0, x1, y1], radius=6 * s, fill=(255, 255, 255, 10),
                        outline=(255, 255, 255, 30), width=max(1, s))

    # prato
    d.rounded_rectangle([x0 + 26 * s, y0 + 30 * s, x0 + 566 * s, y1 - 30 * s], radius=8 * s,
                        fill=(78, 124, 69, 30), outline=(78, 124, 69, 80), width=max(1, s))
    tracked(d, (x0 + 46 * s, y0 + 64 * s), "PRATO APERTO", mono(11 * s), (*Z_VERDE, 230), 3 * s)

    # strada
    rx = x0 + 586 * s
    d.rectangle([rx, y0 + 24 * s, rx + 52 * s, y1 - 24 * s], fill=(*GRIGIO_2, 110))
    yy = y0 + 44 * s
    while yy < y1 - 40 * s:
        d.line([(rx + 26 * s, yy), (rx + 26 * s, yy + 18 * s)], fill=(*CARTA, 120), width=max(1, int(1.4 * s)))
        yy += 44 * s
    tracked(d, (rx + 26 * s, y1 - 46 * s), "STRADA", mono(9.5 * s), (*GRIGIO, 215), 1.4 * s, anchor="ms")

    # area edificata
    ax = x0 + 660 * s
    d.rounded_rectangle([ax, y0 + 30 * s, x1 - 26 * s, y1 - 30 * s], radius=8 * s,
                        fill=(191, 58, 43, 16), outline=(191, 58, 43, 70), width=max(1, s))
    edificio(d, ax + 40 * s, y0 + 200 * s, 84 * s, 74 * s)
    edificio(d, ax + 150 * s, y0 + 222 * s, 104 * s, 92 * s)
    edificio(d, ax + 66 * s, y0 + 400 * s, 116 * s, 80 * s)
    edificio(d, ax + 200 * s, y0 + 452 * s, 92 * s, 70 * s)
    tracked(d, (ax + 24 * s, y0 + 64 * s), "AREA RESIDENZIALE", mono(11 * s), (*Z_ROSSA, 225), 3 * s)

    # sentiero con passanti
    d.line([(x0 + 50 * s, y1 - 96 * s), (x0 + 560 * s, y1 - 140 * s)],
           fill=(*OTTONE, 55), width=max(1, int(6 * s)))
    for i, xx in enumerate((x0 + 170 * s, x0 + 300 * s, x0 + 430 * s)):
        persona(d, xx, y1 - 108 * s - i * 4 * s, 4.2 * s)
    tracked(d, (x0 + 190 * s, y1 - 58 * s), "PASSAGGIO NON PREVEDIBILE", mono(10.5 * s), (*GRIGIO, 205), 2.8 * s)

    # punto di decollo con anello dei 30 metri
    dx, dy = x0 + 240 * s, y0 + 246 * s
    r30 = 30 * MET * s
    d.ellipse([dx - r30, dy - r30, dx + r30, dy + r30], fill=(224, 123, 36, 22), outline=(*Z_ARANCIONE, 170), width=max(1, s))
    tracked(d, (dx + r30 + 14 * s, dy - r30 * 0.34), "30 m", mono(11.5 * s), (*Z_ARANCIONE, 240), 1.6 * s)
    d.rectangle([dx - 30 * s, dy - 22 * s, dx + 30 * s, dy + 22 * s], outline=(*OTTONE, 190), width=max(1, int(1.3 * s)))
    drone_alto(d, dx, dy, 2.4 * s)
    tracked(d, (dx, dy + 46 * s), "DECOLLO DELIMITATO", mono(10.5 * s), (*OTTONE, 235), 2.6 * s, anchor="ms")

    # quota dei 150 metri fino al margine dell'edificato
    yq = y0 + 130 * s
    misura_oriz(d, yq, dx, ax, "150 m", s, Z_ROSSA)
    d.line([(dx, dy - r30 - 6 * s), (dx, yq + 6 * s)], fill=(*Z_ROSSA, 70), width=max(1, s))
    d.line([(ax, y0 + 30 * s), (ax, yq + 6 * s)], fill=(*Z_ROSSA, 70), width=max(1, s))

    # barra di scala
    sbx, sby = x0 + 40 * s, y1 - 26 * s
    d.line([(sbx, sby), (sbx + 100 * MET * s, sby)], fill=(*CARTA, 170), width=max(1, int(1.6 * s)))
    for xx in (sbx, sbx + 50 * MET * s, sbx + 100 * MET * s):
        d.line([(xx, sby - 6 * s), (xx, sby + 6 * s)], fill=(*CARTA, 170), width=max(1, s))
    tracked(d, (sbx + 100 * MET * s + 14 * s, sby + 5 * s), "100 m", mono(11 * s), (*CARTA, 200), 2.2 * s)

    # colonna a destra
    bx, by = 1130 * s, 214 * s
    d.rounded_rectangle([bx, by, bx + 410 * s, by + 614 * s], radius=6 * s,
                        fill=(255, 255, 255, 12), outline=(255, 255, 255, 40), width=max(1, s))
    tracked(d, (bx + 24 * s, by + 44 * s), "PERSONA COINVOLTA SOLO SE", mono(11 * s), (*OTTONE, 235), 3 * s)
    yy = by + 84 * s
    for i, v in enumerate(["ha dato un consenso esplicito a partecipare all'operazione",
                           "ha ricevuto istruzioni su come comportarsi in emergenza"]):
        tracked(d, (bx + 26 * s, yy + 4 * s), str(i + 1), mono(13 * s), (*OTTONE, 210), 0)
        yy = paragrafo(d, (bx + 52 * s, yy), v, sans(15 * s), (206, 215, 223), 336 * s) + 16 * s

    d.line([(bx + 24 * s, yy + 6 * s), (bx + 386 * s, yy + 6 * s)], fill=(255, 255, 255, 34), width=max(1, s))
    yy += 46 * s
    tracked(d, (bx + 24 * s, yy), "DISTANZE MINIME", mono(11 * s), (*OTTONE, 235), 3 * s)
    yy += 34 * s
    for col, valore, nota in ((Z_ARANCIONE, "30 m", "in A2 dalle persone non coinvolte, riducibili a 5 m con la modalità a bassa velocità attiva"),
                              (Z_ROSSA, "150 m", "in A3 da aree residenziali, commerciali, industriali e ricreative")):
        d.rectangle([bx + 24 * s, yy - 11 * s, bx + 31 * s, yy + 1 * s], fill=(*col, 220))
        tracked(d, (bx + 46 * s, yy), valore, mono(14 * s), (*col, 240), 1.6 * s)
        yy = paragrafo(d, (bx + 46 * s, yy + 22 * s), nota, sans(14 * s), (190, 201, 211), 336 * s) + 18 * s

    d.line([(bx + 24 * s, yy), (bx + 386 * s, yy)], fill=(255, 255, 255, 34), width=max(1, s))
    paragrafo(d, (bx + 24 * s, yy + 34 * s),
              "Se una persona entra nell'area durante il volo, aumenta subito la distanza. Se si forma un gruppo, fai atterrare.",
              sans(14 * s), (*OTTONE_CHI, 230), 336 * s)

    firma(d, s, W, H)
    return salva(img, s, OUT + "03-lettura-area.png", W, H)


# ============================================================== 04 · UDP
def tav_udp():
    img, d = tela(W, H, SS)
    s = SS
    intestazione(d, s, W, "Sicurezza operativa", "Il periodo di luce diurna uniforme",
                 "La finestra utile in categoria Open si apre 15 minuti prima dell'alba e si chiude 15 minuti dopo il tramonto.")

    # linea del tempo
    tx0, tx1 = 110 * s, 1490 * s
    ty = 560 * s
    alt = 74 * s

    # segmenti: notte, margine, giorno, margine, notte
    q = [tx0, 300 * s, 380 * s, 1220 * s, 1300 * s, tx1]
    fasce = [((191, 58, 43, 34), "NOTTE"), ((200, 147, 63, 60), None),
             ((241, 239, 230, 30), "GIORNO"), ((200, 147, 63, 60), None), ((191, 58, 43, 34), "NOTTE")]
    for i, (col, testo) in enumerate(fasce):
        d.rectangle([q[i], ty, q[i + 1], ty + alt], fill=col)
        if testo:
            tracked(d, ((q[i] + q[i + 1]) / 2, ty + alt / 2 + 5 * s), testo, mono(12 * s),
                    ((*Z_ROSSA, 220) if testo == "NOTTE" else (*CARTA, 210)), 4 * s, anchor="ms")
    d.rectangle([tx0, ty, tx1, ty + alt], outline=(255, 255, 255, 45), width=max(1, s))

    # fascia utile evidenziata
    d.rectangle([q[1], ty - 12 * s, q[4], ty + alt + 12 * s], outline=(*OTTONE, 200), width=max(1, int(1.6 * s)))
    etichetta(d, (q[1] + q[4]) / 2 - 168 * s, ty - 62 * s, "FINESTRA UTILE IN CATEGORIA OPEN", s, OTTONE, riempi=True)

    # tacche
    for x, sopra, sotto in ((q[1], "ALBA", "meno 15 min"), (q[2], "ALBA", None),
                            (q[3], "TRAMONTO", None), (q[4], "TRAMONTO", "più 15 min")):
        d.line([(x, ty - 24 * s), (x, ty + alt + 24 * s)], fill=(*CARTA, 120), width=max(1, s))
    for x, testo in ((q[2], "ALBA"), (q[3], "TRAMONTO")):
        tracked(d, (x, ty + alt + 52 * s), testo, mono(12.5 * s), (*CARTA, 235), 3.4 * s, anchor="ms")
    for a, b in ((q[1], q[2]), (q[3], q[4])):
        misura_oriz(d, ty + alt + 92 * s, a, b, "15 min", s, OTTONE, sopra=False)

    # arco del sole sopra la fascia diurna
    ax0, ax1 = q[1], q[4]
    cx, r = (ax0 + ax1) / 2, (ax1 - ax0) / 2
    for i in range(0, 181, 2):
        a0 = math.radians(180 + i)
        a1 = math.radians(180 + i + 2)
        p0 = (cx + r * math.cos(a0), ty + 8 * s + (r * 0.42) * math.sin(a0))
        p1 = (cx + r * math.cos(a1), ty + 8 * s + (r * 0.42) * math.sin(a1))
        d.line([p0, p1], fill=(255, 255, 255, 40), width=max(1, s))
    sa = math.radians(180 + 62)
    sx, sy = cx + r * math.cos(sa), ty + 8 * s + (r * 0.42) * math.sin(sa)
    d.ellipse([sx - 16 * s, sy - 16 * s, sx + 16 * s, sy + 16 * s], fill=(*OTTONE_CHI, 240))
    for i in range(12):
        a = math.radians(i * 30)
        d.line([(sx + 22 * s * math.cos(a), sy + 22 * s * math.sin(a)),
                (sx + 30 * s * math.cos(a), sy + 30 * s * math.sin(a))],
               fill=(*OTTONE_CHI, 140), width=max(1, s))

    # drone ammesso e drone escluso
    drone_lato(d, (q[2] + q[3]) / 2, ty - 96 * s, 2.6 * s)
    tracked(d, ((q[2] + q[3]) / 2, ty - 130 * s), "SI VOLA", mono(11 * s), (*OTTONE, 235), 3 * s, anchor="ms")

    fx = (tx0 + q[1]) / 2
    drone_lato(d, fx, ty - 96 * s, 2.6 * s, colore=GRIGIO)
    for dxx, dyy in ((-1, -1), (1, -1)):
        d.line([(fx - 15 * s * dxx, ty - 96 * s - 15 * s * dyy), (fx + 15 * s * dxx, ty - 96 * s + 15 * s * dyy)],
               fill=(*Z_ROSSA, 220), width=max(1, int(1.8 * s)))
    tracked(d, (fx, ty - 130 * s), "NON SI VOLA", mono(11 * s), (*Z_ROSSA, 225), 3 * s, anchor="ms")

    # nota
    paragrafo(d, (110 * s, ty + alt + 150 * s),
              "Fuori dalla finestra servono condizioni particolari: luce verde lampeggiante ben visibile sul drone e rispetto delle prescrizioni nazionali applicabili.",
              sans(15 * s), (196, 207, 216), 900 * s)

    firma(d, s, W, H)
    return salva(img, s, OUT + "04-udp.png", W, H)


if __name__ == "__main__":
    for f in (tav_area, tav_udp):
        print("scritta", f())
