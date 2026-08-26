#!/usr/bin/env python3
"""Quota Zero · primitive di disegno condivise.

Tutte le tavole e le animazioni nascono da qui, così restano coerenti fra loro
e con il portale: stessa tavolozza, stessi caratteri, stessi pesi di linea.
"""

import math
from PIL import Image, ImageDraw, ImageFont

# ------------------------------------------------------------------ colori
NOTTE      = (10, 22, 34)
NOTTE_2    = (14, 31, 47)
CARTA      = (244, 241, 233)
GRIGIO     = (138, 152, 165)
GRIGIO_2   = (99, 113, 126)
OTTONE     = (200, 147, 63)
OTTONE_CHI = (232, 193, 115)

Z_BIANCA    = (241, 239, 230)
Z_CELESTE   = (62, 146, 198)
Z_GIALLA    = (224, 178, 58)
Z_ARANCIONE = (224, 123, 36)
Z_ROSSA     = (191, 58, 43)
Z_VERDE     = (78, 124, 69)

F_DIR = "/mnt/skills/examples/canvas-design/canvas-fonts/"
FR_DIR = "/home/claude/quotazero/design/fonts/"


# ---------------------------------------------------------------- caratteri
def mono(px):
    return ImageFont.truetype(F_DIR + "GeistMono-Regular.ttf", int(px))


def sans(px, grassetto=False):
    nome = "InstrumentSans-Bold.ttf" if grassetto else "InstrumentSans-Regular.ttf"
    try:
        return ImageFont.truetype(F_DIR + nome, int(px))
    except OSError:
        return ImageFont.truetype(F_DIR + "InstrumentSans-Regular.ttf", int(px))


def serif(px, corsivo=False, peso=360, opsz=120):
    f = ImageFont.truetype(FR_DIR + ("fraunces-it.ttf" if corsivo else "fraunces.ttf"), int(px))
    f.set_variation_by_axes([opsz, peso, 0, 1])
    return f


# ------------------------------------------------------------------ testo
def tracked(d, xy, testo, fnt, fill, track=0, anchor="ls"):
    """Testo con spaziatura fra lettere controllata."""
    larghezze = [d.textlength(c, font=fnt) for c in testo]
    totale = sum(larghezze) + track * (len(testo) - 1)
    x, y = xy
    if anchor in ("ms", "mm"):
        x -= totale / 2
    elif anchor in ("rs", "rm"):
        x -= totale
    for c, w in zip(testo, larghezze):
        d.text((x, y), c, font=fnt, fill=fill, anchor="ls")
        x += w + track
    return totale


def avvolgi(d, testo, fnt, larghezza):
    """Manda a capo un testo entro una larghezza data."""
    parole, righe, riga = testo.split(), [], ""
    for p in parole:
        prova = (riga + " " + p).strip()
        if d.textlength(prova, font=fnt) <= larghezza or not riga:
            riga = prova
        else:
            righe.append(riga)
            riga = p
    if riga:
        righe.append(riga)
    return righe


def paragrafo(d, xy, testo, fnt, fill, larghezza, interlinea=1.5, anchor="ls"):
    x, y = xy
    passo = fnt.size * interlinea
    for r in avvolgi(d, testo, fnt, larghezza):
        d.text((x, y), r, font=fnt, fill=fill, anchor=anchor)
        y += passo
    return y


# ------------------------------------------------------------------ tavola
def tela(w, h, ss=2):
    """Crea una tela sovracampionata con il fondo del portale."""
    img = Image.new("RGB", (w * ss, h * ss), NOTTE)
    d = ImageDraw.Draw(img, "RGBA")
    W, H = w * ss, h * ss
    # sfumatura verticale appena percettibile
    for y in range(H):
        t = (1 - y / H) ** 2.1
        c = tuple(int(NOTTE[i] + (NOTTE_2[i] - NOTTE[i]) * t * 0.9) for i in range(3))
        d.line([(0, y), (W, y)], fill=c)
    # reticolo cartografico
    passo = 44 * ss
    for x in range(0, W, passo):
        d.line([(x, 0), (x, H)], fill=(255, 255, 255, 9), width=max(1, ss // 2))
    for y in range(0, H, passo):
        d.line([(0, y), (W, y)], fill=(255, 255, 255, 9), width=max(1, ss // 2))
    return img, d


def intestazione(d, ss, w, occhiello, titolo, sottotitolo=None, m=54):
    """Barra superiore comune a tutte le tavole."""
    x = m * ss
    tracked(d, (x, 46 * ss), occhiello.upper(), mono(11 * ss), OTTONE + (230,), 3.6 * ss)
    d.text((x, 92 * ss), titolo, font=serif(34 * ss, peso=380), fill=CARTA, anchor="ls")
    y = 108 * ss
    if sottotitolo:
        paragrafo(d, (x, 118 * ss), sottotitolo, sans(15 * ss), (188, 199, 209), (w - 2 * m) * ss * 0.72)
        y = 140 * ss
    d.line([(x, y + 12 * ss), ((w - m) * ss, y + 12 * ss)], fill=(255, 255, 255, 34), width=max(1, ss // 2))
    return y + 12 * ss


def firma(d, ss, w, h, testo="QUOTA ZERO · GIORIVA.IT/QUOTAZERO", m=54):
    tracked(d, (m * ss, (h - 34) * ss), testo, mono(10 * ss), (*GRIGIO_2, 190), 3.4 * ss)


# Le tavole vengono esportate più grandi della dimensione di lettura: servono
# pixel di riserva per lo zoom della lente, che arriva oltre il 300%.
FATTORE_EXPORT = 1.5


def salva(img, ss, path, w, h):
    W, H = int(w * FATTORE_EXPORT), int(h * FATTORE_EXPORT)
    img.resize((W, H), Image.LANCZOS).save(path, "PNG", optimize=True)
    return path


# ------------------------------------------------------------- quadricottero
def drone_alto(d, cx, cy, k, ang=0.0, colore=OTTONE_CHI, corpo=NOTTE):
    """Quadricottero visto dall'alto, la stessa costruzione dell'animazione del sito."""
    ca, sa = math.cos(ang), math.sin(ang)

    def P(px, py):
        return (cx + px * ca - py * sa, cy + px * sa + py * ca)

    rotori = [(-10 * k, -6.6 * k), (10 * k, -6.6 * k), (10 * k, 6.6 * k), (-10 * k, 6.6 * k)]
    largh = max(1, int(0.52 * k))
    for rx, ry in rotori:
        d.line([P(0, 0), P(rx, ry)], fill=(*colore, 240), width=largh)
    for rx, ry in rotori:
        px, py = P(rx, ry)
        for raggio, alfa, sp in ((6.0 * k, 95, 0.34), (5.2 * k, 150, 0.46), (3.0 * k, 75, 0.34)):
            d.ellipse([px - raggio, py - raggio, px + raggio, py + raggio],
                      outline=(*colore, alfa), width=max(1, int(sp * k)))
    quad = [P(-4.8 * k, -3.6 * k), P(4.8 * k, -3.6 * k), P(4.8 * k, 3.6 * k), P(-4.8 * k, 3.6 * k)]
    d.polygon(quad, fill=(*corpo, 255), outline=(*colore, 240))
    r = 1.2 * k
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*colore, 255))


def drone_lato(d, cx, cy, k, colore=OTTONE_CHI):
    """Quadricottero visto di lato, per gli schemi di quota."""
    largh = max(1, int(0.55 * k))
    d.line([(cx - 9 * k, cy - 2 * k), (cx + 9 * k, cy - 2 * k)], fill=(*colore, 235), width=largh)
    d.rounded_rectangle([cx - 4.6 * k, cy - 3.4 * k, cx + 4.6 * k, cy + 2.2 * k],
                        radius=1.8 * k, fill=(10, 22, 34, 255), outline=(*colore, 240), width=largh)
    for sx in (-9 * k, 9 * k):
        d.line([(cx + sx - 4.6 * k, cy - 5.2 * k), (cx + sx + 4.6 * k, cy - 5.2 * k)],
               fill=(*colore, 200), width=max(1, int(0.45 * k)))
        d.line([(cx + sx, cy - 5.2 * k), (cx + sx, cy - 2 * k)], fill=(*colore, 220), width=largh)
    for sx in (-3 * k, 3 * k):
        d.line([(cx + sx, cy + 2.2 * k), (cx + sx, cy + 4.4 * k)], fill=(*colore, 180), width=largh)


def persona(d, x, y, k, colore=GRIGIO, alfa=210):
    """Figura umana schematica, misura di riferimento negli schemi."""
    r = 1.5 * k
    d.ellipse([x - r, y - 6.4 * k, x + r, y - 6.4 * k + 2 * r], fill=(*colore, alfa))
    d.line([(x, y - 3.4 * k), (x, y - 1.4 * k)], fill=(*colore, alfa), width=max(1, int(1.2 * k)))
    d.line([(x - 1.6 * k, y), (x, y - 1.4 * k)], fill=(*colore, alfa), width=max(1, int(1.1 * k)))
    d.line([(x + 1.6 * k, y), (x, y - 1.4 * k)], fill=(*colore, alfa), width=max(1, int(1.1 * k)))
    d.line([(x - 1.8 * k, y - 3.1 * k), (x + 1.8 * k, y - 3.1 * k)], fill=(*colore, alfa), width=max(1, int(1.1 * k)))


def albero(d, x, y, k, colore=(70, 96, 88), alfa=190):
    d.line([(x, y), (x, y - 4 * k)], fill=(*colore, alfa), width=max(1, int(1.2 * k)))
    d.ellipse([x - 3.4 * k, y - 10 * k, x + 3.4 * k, y - 3.2 * k], fill=(*colore, alfa))


def edificio(d, x, y, w, h, alfa=150):
    d.rectangle([x, y - h, x + w, y], fill=(*GRIGIO_2, alfa), outline=(*GRIGIO, 120))
    passo = max(4, int(h / 5))
    for yy in range(int(y - h + passo), int(y), passo):
        d.line([(x + 3, yy), (x + w - 3, yy)], fill=(10, 22, 34, 120), width=1)


# --------------------------------------------------------------- annotazioni
def quota_freccia(d, x, y0, y1, testo, ss, colore=OTTONE, lato="dx"):
    """Freccia verticale quotata."""
    d.line([(x, y0), (x, y1)], fill=(*colore, 220), width=max(1, ss))
    for yy in (y0, y1):
        d.line([(x - 5 * ss, yy), (x + 5 * ss, yy)], fill=(*colore, 220), width=max(1, ss))
    f = mono(12 * ss)
    tx = x + 12 * ss if lato == "dx" else x - 12 * ss
    tracked(d, (tx, (y0 + y1) / 2 + 4 * ss), testo, f, (*colore, 240), 1.6 * ss,
            anchor="ls" if lato == "dx" else "rs")


def misura_oriz(d, y, x0, x1, testo, ss, colore=OTTONE, sopra=True):
    d.line([(x0, y), (x1, y)], fill=(*colore, 220), width=max(1, ss))
    for xx in (x0, x1):
        d.line([(xx, y - 5 * ss), (xx, y + 5 * ss)], fill=(*colore, 220), width=max(1, ss))
    f = mono(12 * ss)
    ty = y - 14 * ss if sopra else y + 24 * ss
    tracked(d, ((x0 + x1) / 2, ty), testo, f, (*colore, 240), 1.6 * ss, anchor="ms")


def etichetta(d, x, y, testo, ss, colore=OTTONE, riempi=False, corpo=11):
    """Targhetta con contorno, come le pillole del portale."""
    f = mono(corpo * ss)
    w = sum(d.textlength(c, font=f) for c in testo) + 2.6 * ss * (len(testo) - 1)
    pad = 9 * ss
    h = corpo * ss + 10 * ss
    box = [x, y, x + w + 2 * pad, y + h]
    if riempi:
        d.rounded_rectangle(box, radius=h / 2, fill=(*colore, 235))
        tracked(d, (x + pad, y + h - 8 * ss), testo, f, (10, 22, 34, 255), 2.6 * ss)
    else:
        d.rounded_rectangle(box, radius=h / 2, outline=(*colore, 190), width=max(1, ss))
        tracked(d, (x + pad, y + h - 8 * ss), testo, f, (*colore, 235), 2.6 * ss)
    return box[2] - box[0]


def richiamo(d, x0, y0, x1, y1, ss, colore=OTTONE):
    """Linea di richiamo con pallino all'origine."""
    d.line([(x0, y0), (x1, y1)], fill=(*colore, 170), width=max(1, ss))
    r = 3 * ss
    d.ellipse([x0 - r, y0 - r, x0 + r, y0 + r], fill=(*colore, 235))


def suolo(d, y, x0, x1, ss, alfa=150):
    d.line([(x0, y), (x1, y)], fill=(*CARTA, alfa), width=max(1, int(2 * ss)))
    passo = 14 * ss
    x = x0
    while x < x1:
        d.line([(x, y), (x - 7 * ss, y + 8 * ss)], fill=(*CARTA, 60), width=max(1, ss))
        x += passo
