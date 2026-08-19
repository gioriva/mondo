#!/usr/bin/env python3
"""Ground School · sfondo dell'hero.

Una carta batimetrica immaginaria: campo scalare costruito da sorgenti gaussiane,
letto per curve di livello. Lo stesso linguaggio della cartografia scientifica
usato come atmosfera, non come informazione.
"""

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 2400, 1350
OUT = "/home/claude/groundschool/sfondo-hero.jpg"

NOTTE_BASSO = np.array([8, 18, 29], dtype=float)
NOTTE_ALTO  = np.array([17, 38, 58], dtype=float)
LINEA       = np.array([120, 168, 205], dtype=float)   # azzurro freddo
OTTONE      = np.array([200, 147, 63], dtype=float)

rng = np.random.default_rng(11)

# ------------------------------------------------------------ campo scalare
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
campo = np.zeros((H, W), dtype=np.float32)

# sorgenti principali: due bacini allungati, come i rami di un lago prealpino
sorgenti = [
    (0.30 * W, 0.42 * H, 0.34 * W, 0.30 * H, -35, 1.00),
    (0.62 * W, 0.30 * H, 0.26 * W, 0.17 * H,  18, 0.72),
    (0.80 * W, 0.66 * H, 0.30 * W, 0.22 * H, -12, 0.58),
    (0.14 * W, 0.78 * H, 0.22 * W, 0.16 * H,  30, 0.44),
    (0.50 * W, 0.86 * H, 0.34 * W, 0.14 * H,  -6, 0.36),
]
for cx, cy, sx, sy, ang, peso in sorgenti:
    a = np.deg2rad(ang)
    dx = (xx - cx) * np.cos(a) + (yy - cy) * np.sin(a)
    dy = -(xx - cx) * np.sin(a) + (yy - cy) * np.cos(a)
    campo += peso * np.exp(-((dx / sx) ** 2 + (dy / sy) ** 2))

# perturbazione a bassa frequenza: le curve non devono essere ellissi perfette
grezzo = rng.random((H // 24 + 2, W // 24 + 2)).astype(np.float32)
rumore = np.array(
    Image.fromarray((grezzo * 255).astype(np.uint8))
    .resize((W, H), Image.BICUBIC)
    .filter(ImageFilter.GaussianBlur(38)),
    dtype=np.float32,
) / 255.0
campo += (rumore - rumore.mean()) * 0.34

campo = np.array(
    Image.fromarray((np.clip(campo, 0, None) / campo.max() * 255).astype(np.uint8))
    .filter(ImageFilter.GaussianBlur(3)),
    dtype=np.float32,
) / 255.0

# ------------------------------------------------------- estrazione isolinee
def isolinee(f, n_livelli):
    """Restituisce una maschera dei passaggi di livello."""
    q = np.floor(f * n_livelli)
    bordo = np.zeros_like(q, dtype=bool)
    bordo[:, 1:] |= q[:, 1:] != q[:, :-1]
    bordo[1:, :] |= q[1:, :] != q[:-1, :]
    return bordo

fine   = isolinee(campo, 46)     # curve fitte
madre  = isolinee(campo, 46 // 5)  # curve maestre, una ogni cinque

# ------------------------------------------------------------------ fondale
t = (yy / H)[:, :, None]
tela = NOTTE_ALTO * (1 - t) ** 1.7 + NOTTE_BASSO * (1 - (1 - t) ** 1.7)

# attenuazione radiale: le curve vivono a destra, il testo respira a sinistra
cx, cy = 0.68 * W, 0.46 * H
rad = np.sqrt(((xx - cx) / (0.78 * W)) ** 2 + ((yy - cy) / (0.86 * H)) ** 2)
peso = np.clip(1.0 - rad, 0, 1) ** 1.25

sfuma_sx = np.clip((xx / W - 0.06) / 0.34, 0, 1) ** 1.5
maschera = peso * (0.30 + 0.70 * sfuma_sx)

tela += LINEA * (fine[:, :, None] * (maschera * 0.150)[:, :, None])
tela += LINEA * (madre[:, :, None] * (maschera * 0.265)[:, :, None])

img = Image.fromarray(np.clip(tela, 0, 255).astype(np.uint8), "RGB")
img = img.filter(ImageFilter.GaussianBlur(0.4))

# --------------------------------------------- reticolo e riferimenti incisi
d = ImageDraw.Draw(img, "RGBA")
passo = 120
for x in range(0, W, passo):
    d.line([(x, 0), (x, H)], fill=(255, 255, 255, 8), width=1)
for y in range(0, H, passo):
    d.line([(0, y), (W, y)], fill=(255, 255, 255, 8), width=1)

# crocette di registro, come sulle lastre di stampa
for x in range(passo * 2, W, passo * 4):
    for y in range(passo * 2, H, passo * 4):
        d.line([(x - 7, y), (x + 7, y)], fill=(255, 255, 255, 22), width=1)
        d.line([(x, y - 7), (x, y + 7)], fill=(255, 255, 255, 22), width=1)

# un'unica traccia in ottone: la rotta
punti = [(-80, 0.70 * H), (0.22 * W, 0.62 * H), (0.46 * W, 0.50 * H),
         (0.70 * W, 0.53 * H), (0.90 * W, 0.36 * H), (W + 80, 0.30 * H)]


def catmull(pts, n=1400):
    p = [pts[0]] + list(pts) + [pts[-1]]
    out = []
    for i in range(len(p) - 3):
        p0, p1, p2, p3 = (np.array(p[i + k], dtype=float) for k in range(4))
        for s in np.linspace(0, 1, n // (len(p) - 3)):
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * s
                              + (2 * p0 - 5 * p1 + 4 * p2 - p3) * s * s
                              + (-p0 + 3 * p1 - 3 * p2 + p3) * s ** 3))
    return out


rotta = catmull(punti)
for i in range(1, len(rotta)):
    if (i // 11) % 2:
        continue
    x0, y0 = rotta[i - 1]
    x1, y1 = rotta[i]
    a = int(30 + 34 * np.clip((x0 / W - 0.05) / 0.6, 0, 1))
    d.line([x0, y0, x1, y1], fill=(*OTTONE.astype(int), a), width=2)

# vignettatura finale, tenuta bassa
vig = np.clip(1.15 - np.sqrt(((xx - W / 2) / (W * 0.72)) ** 2
                             + ((yy - H / 2) / (H * 0.80)) ** 2), 0, 1) ** 0.55
arr = np.array(img, dtype=float) * (0.62 + 0.38 * vig[:, :, None])
img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")

img.resize((1800, 1013), Image.LANCZOS).save(OUT, "JPEG", quality=86, optimize=True, progressive=True)
print(OUT, "1800x1013")
