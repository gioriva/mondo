#!/usr/bin/env python3
"""Drone School · immagine di anteprima social 1200x630.

Riprende l'impaginato della home: composizione centrata sulla stessa carta
batimetrica dell'hero, con la rotta e il quadricottero che la percorre.
"""

import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
S = 3
FW, FH = W * S, H * S
F = "/mnt/skills/examples/canvas-design/canvas-fonts/"
FR = "/home/claude/droneschool/design/fonts/"

NOTTE_BASSO = np.array([8, 18, 29], dtype=float)
NOTTE_ALTO  = np.array([17, 38, 58], dtype=float)
LINEA       = np.array([120, 168, 205], dtype=float)
CARTA       = (244, 241, 233)
OTTONE      = (200, 147, 63)
OTTONE_CHI  = (232, 193, 115)
GRIGIO      = (138, 152, 165)


def font(nome, corpo):
    return ImageFont.truetype(F + nome, int(corpo * S))


def fraunces(corpo, corsivo=False, peso=360, opsz=120):
    f = ImageFont.truetype(FR + ("fraunces-it.ttf" if corsivo else "fraunces.ttf"), int(corpo * S))
    f.set_variation_by_axes([opsz, peso, 0, 1])
    return f


def tracked(d, xy, testo, fnt, fill, track, anchor="ls"):
    track *= S
    larghezze = [d.textlength(c, font=fnt) for c in testo]
    totale = sum(larghezze) + track * (len(testo) - 1)
    x, y = xy
    if anchor == "ms":
        x -= totale / 2
    elif anchor == "rs":
        x -= totale
    for c, w in zip(testo, larghezze):
        d.text((x, y), c, font=fnt, fill=fill, anchor="ls")
        x += w + track
    return totale


# ------------------------------------------------------------ carta di fondo
rng = np.random.default_rng(11)
yy, xx = np.mgrid[0:FH, 0:FW].astype(np.float32)
campo = np.zeros((FH, FW), dtype=np.float32)

sorgenti = [
    (0.24 * FW, 0.34 * FH, 0.30 * FW, 0.26 * FH, -35, 1.00),
    (0.70 * FW, 0.24 * FH, 0.24 * FW, 0.16 * FH,  18, 0.74),
    (0.84 * FW, 0.72 * FH, 0.28 * FW, 0.22 * FH, -12, 0.60),
    (0.12 * FW, 0.80 * FH, 0.22 * FW, 0.16 * FH,  30, 0.46),
    (0.52 * FW, 0.90 * FH, 0.32 * FW, 0.14 * FH,  -6, 0.38),
]
for cx, cy, sx, sy, ang, peso in sorgenti:
    a = np.deg2rad(ang)
    dx = (xx - cx) * np.cos(a) + (yy - cy) * np.sin(a)
    dy = -(xx - cx) * np.sin(a) + (yy - cy) * np.cos(a)
    campo += peso * np.exp(-((dx / sx) ** 2 + (dy / sy) ** 2))

grezzo = rng.random((FH // 40 + 2, FW // 40 + 2)).astype(np.float32)
rumore = np.array(
    Image.fromarray((grezzo * 255).astype(np.uint8))
    .resize((FW, FH), Image.BICUBIC)
    .filter(ImageFilter.GaussianBlur(60)),
    dtype=np.float32,
) / 255.0
campo += (rumore - rumore.mean()) * 0.34
campo = np.clip(campo, 0, None) / campo.max()


def isolinee(f, n):
    q = np.floor(f * n)
    bordo = np.zeros_like(q, dtype=bool)
    bordo[:, 1:] |= q[:, 1:] != q[:, :-1]
    bordo[1:, :] |= q[1:, :] != q[:-1, :]
    return bordo


fine  = isolinee(campo, 42)
madre = isolinee(campo, 9)

t = (yy / FH)[:, :, None]
tela = NOTTE_ALTO * (1 - t) ** 1.7 + NOTTE_BASSO * (1 - (1 - t) ** 1.7)

# il centro si ritira: lì va il testo
cx, cy = 0.5 * FW, 0.46 * FH
rad = np.sqrt(((xx - cx) / (0.56 * FW)) ** 2 + ((yy - cy) / (0.60 * FH)) ** 2)
varco = np.clip((rad - 0.62) / 0.44, 0, 1) ** 1.1

tela += LINEA * (fine[:, :, None] * (varco * 0.15)[:, :, None])
tela += LINEA * (madre[:, :, None] * (varco * 0.26)[:, :, None])

img = Image.fromarray(np.clip(tela, 0, 255).astype(np.uint8), "RGB")
d = ImageDraw.Draw(img, "RGBA")

passo = 180
for x in range(0, FW, passo):
    d.line([(x, 0), (x, FH)], fill=(255, 255, 255, 7), width=S)
for y in range(0, FH, passo):
    d.line([(0, y), (FW, y)], fill=(255, 255, 255, 7), width=S)


# ------------------------------------------------------------------- rotta
def catmull(pts, n=1600):
    p = [pts[0]] + list(pts) + [pts[-1]]
    out = []
    for i in range(len(p) - 3):
        p0, p1, p2, p3 = (np.array(p[i + k], dtype=float) for k in range(4))
        for s in np.linspace(0, 1, n // (len(p) - 3)):
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * s
                              + (2 * p0 - 5 * p1 + 4 * p2 - p3) * s * s
                              + (-p0 + 3 * p1 - 3 * p2 + p3) * s ** 3))
    return out


rotta = catmull([(-180, 0.92 * FH), (0.18 * FW, 0.86 * FH), (0.42 * FW, 0.76 * FH),
                 (0.66 * FW, 0.78 * FH), (0.88 * FW, 0.46 * FH), (FW + 180, 0.30 * FH)])

for i in range(1, len(rotta)):
    if (i // 13) % 2:
        continue
    x0, y0 = rotta[i - 1]
    x1, y1 = rotta[i]
    q = x0 / FW
    a = int(26 + 62 * np.clip((q - 0.04) / 0.55, 0, 1) * (1 - np.clip((q - 0.72) / 0.30, 0, 1) * 0.7))
    d.line([x0, y0, x1, y1], fill=(*OTTONE, a), width=int(1.6 * S))


# ------------------------------------------------- quadricottero sulla rotta
def drone(dr, cx, cy, ang, k):
    """Stessa costruzione dell'animazione della home: quattro bracci e quattro rotori."""
    ca, sa = math.cos(ang), math.sin(ang)

    def P(px, py):
        return (cx + px * ca - py * sa, cy + px * sa + py * ca)

    rotori = [(-10 * k, -6.6 * k), (10 * k, -6.6 * k), (10 * k, 6.6 * k), (-10 * k, 6.6 * k)]
    largh = max(1, int(1.3 * k))

    for rx, ry in rotori:
        dr.line([P(0, 0), P(rx, ry)], fill=(*OTTONE_CHI, 235), width=largh)

    for rx, ry in rotori:
        px, py = P(rx, ry)
        for raggio, alfa, sp in ((6.0 * k, 95, 1.0), (5.4 * k, 130, 1.5), (3.2 * k, 70, 1.2)):
            dr.ellipse([px - raggio, py - raggio, px + raggio, py + raggio],
                       outline=(*OTTONE_CHI, alfa), width=max(1, int(sp * k)))

    corpo = [P(-4.8 * k, -3.6 * k), P(4.8 * k, -3.6 * k), P(4.8 * k, 3.6 * k), P(-4.8 * k, 3.6 * k)]
    dr.polygon(corpo, fill=(10, 22, 34, 255), outline=(*OTTONE_CHI, 240))
    r = 1.5 * k
    dr.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*OTTONE_CHI, 255))


idx = int(0.20 * (len(rotta) - 1))
px, py = rotta[idx]
qx, qy = rotta[idx + 10]
drone(d, px, py, math.atan2(qy - py, qx - px), 2.5 * S)

# ---------------------------------------------------------------- tipografia
CX = FW / 2

f_eti = font("GeistMono-Regular.ttf", 12)
tracked(d, (CX, 96 * S), "GIORIVA.IT  /  DRONESCHOOL", f_eti, (*GRIGIO, 195), 4.6, anchor="ms")
d.line([(CX - 148 * S, 111 * S), (CX + 148 * S, 111 * S)], fill=(255, 255, 255, 28), width=max(1, S // 2))

f_tit = fraunces(102, peso=360)
f_tit_c = fraunces(102, corsivo=True, peso=360)
w1 = d.textlength("Drone", font=f_tit)
w2 = d.textlength("School", font=f_tit_c)
gap = 26 * S
x0 = CX - (w1 + gap + w2) / 2
y_tit = 296 * S
d.text((x0, y_tit), "Drone", font=f_tit, fill=CARTA, anchor="ls")
d.text((x0 + w1 + gap, y_tit), "School", font=f_tit_c, fill=OTTONE_CHI, anchor="ls")

f_pay = fraunces(35, peso=320)
f_pay_c = fraunces(35, corsivo=True, peso=320)
a1, a2 = "Il volo comincia ", "a terra."
wa1 = d.textlength(a1, font=f_pay)
wa2 = d.textlength(a2, font=f_pay_c)
xp = CX - (wa1 + wa2) / 2
d.text((xp, 374 * S), a1, font=f_pay, fill=(216, 222, 228), anchor="ls")
d.text((xp + wa1, 374 * S), a2, font=f_pay_c, fill=OTTONE, anchor="ls")

f_sub = font("InstrumentSans-Regular.ttf", 21)
d.text((CX, 428 * S), "Formazione per i patentini droni A1/A3 e A2",
       font=f_sub, fill=(176, 187, 198), anchor="ms")

f_piede = font("GeistMono-Regular.ttf", 12)
y_piede = FH - 60 * S
d.line([(CX - 250 * S, y_piede - 28 * S), (CX + 250 * S, y_piede - 28 * S)],
       fill=(255, 255, 255, 24), width=max(1, S // 2))

voci = [("REG. UE", "2019/947"), ("CATEGORIA", "OPEN"), ("QUOTA MAX", "120 M AGL")]


def larghezza(testo, fnt, track):
    return sum(d.textlength(c, font=fnt) for c in testo) + track * S * (len(testo) - 1)


blocchi = [(e, v, larghezza(e, f_piede, 3.4) + 11 * S + larghezza(v, f_piede, 3.4)) for e, v in voci]
tot = sum(b[2] for b in blocchi) + 52 * S * (len(blocchi) - 1)
x = CX - tot / 2
for e, v, wtot in blocchi:
    we = tracked(d, (x, y_piede), e, f_piede, (*GRIGIO, 145), 3.4)
    tracked(d, (x + we + 11 * S, y_piede), v, f_piede, (*OTTONE, 225), 3.4)
    x += wtot + 52 * S

# vignettatura finale
vig = np.clip(1.18 - np.sqrt(((xx - FW / 2) / (FW * 0.74)) ** 2 + ((yy - FH / 2) / (FH * 0.82)) ** 2), 0, 1) ** 0.5
arr = np.array(img, dtype=float) * (0.66 + 0.34 * vig[:, :, None])
img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")

img.resize((W, H), Image.LANCZOS).save(
    "/home/claude/droneschool/og-droneschool.jpg", "JPEG", quality=90, optimize=True, progressive=True)
print("og-droneschool.jpg", W, "x", H)
