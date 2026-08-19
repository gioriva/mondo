#!/usr/bin/env python3
"""Drone School · segno ridotto e favicon.

Il marchio si riduce a due elementi: la linea di terra e il punto sopra di essa.
La distanza fra i due è l'unica informazione, ed è sufficiente anche a 16 pixel.
"""

from PIL import Image, ImageDraw
import os

NOTTE  = (10, 22, 34, 255)
OTTONE = (200, 147, 63, 255)
CARTA  = (244, 241, 233, 255)

OUT = "/home/claude/droneschool"


def segno(lato, pieno=False, fondo=NOTTE, marchio=OTTONE, ss=8):
    """Disegna il segno a risoluzione ss volte superiore, poi riduce."""
    L = lato * ss
    img = Image.new("RGBA", (L, L), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    if pieno:
        d.rectangle([0, 0, L, L], fill=fondo)
    else:
        r = int(L * 0.215)
        d.rounded_rectangle([0, 0, L - 1, L - 1], radius=r, fill=fondo)

    # linea di terra
    y_suolo = int(L * 0.715)
    x0, x1 = int(L * 0.215), int(L * 0.785)
    spess = max(ss, int(L * 0.075))
    d.rounded_rectangle([x0, y_suolo - spess // 2, x1, y_suolo + spess // 2],
                        radius=spess // 2, fill=marchio)

    # il punto: l'aeromobile alla sua quota. Fra i due elementi c'è solo aria,
    # e la distanza è l'unica informazione che il segno deve trasmettere.
    rp = int(L * 0.112)
    cx, cy = L // 2, int(L * 0.315)
    d.ellipse([cx - rp, cy - rp, cx + rp, cy + rp], fill=marchio)

    return img.resize((lato, lato), Image.LANCZOS)


# ------------------------------------------------------------------ PNG
for lato in (16, 32, 48, 180, 512):
    pieno = lato == 180                      # iOS applica la propria mascheratura
    img = segno(lato, pieno=pieno)
    nome = "apple-touch-icon.png" if lato == 180 else f"favicon-{lato}.png"
    if lato == 512:
        nome = "icona-512.png"
    img.save(os.path.join(OUT, nome), "PNG", optimize=True)
    print(nome, img.size)

# ------------------------------------------------------------------ ICO
base = segno(256)
base.save(os.path.join(OUT, "favicon.ico"), format="ICO",
          sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print("favicon.ico")

# ------------------------------------------------------------------ SVG
svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Drone School">
  <rect width="64" height="64" rx="13.8" fill="#0A1622"/>
  <circle cx="32" cy="20.2" r="7.2" fill="#C8933F"/>
  <rect x="13.8" y="43.4" width="36.4" height="4.8" rx="2.4" fill="#C8933F"/>
</svg>
'''
with open(os.path.join(OUT, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(svg)
print("favicon.svg")

# ---------------------------------------------- provino di verifica a 16 px
prova = Image.new("RGB", (560, 130), (238, 236, 228))
d = ImageDraw.Draw(prova)
x = 30
for lato in (16, 32, 48, 64):
    ic = segno(lato)
    prova.paste(ic, (x, 65 - lato // 2), ic)
    d.text((x, 105), f"{lato}px", fill=(90, 100, 110))
    x += lato + 46
# resa su fondo scuro, come nelle schede in tema notte
d.rectangle([330, 0, 560, 130], fill=(28, 30, 34))
x = 356
for lato in (16, 32, 48):
    ic = segno(lato)
    prova.paste(ic, (x, 65 - lato // 2), ic)
    x += lato + 40
prova.save("/tmp/prova-favicon.png")
print("provino in /tmp/prova-favicon.png")
