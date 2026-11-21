# Icônes de l'app (issue #12) : python scripts/make-icons.py
# Carré au drapeau suédois (même tracé que Flag dans src/Melodi.tsx) sur fond bleu Melodi.
# Écrit les icônes de la PWA, l'icône iPhone et les icônes de l'APK Android (le favicon est public/favicon.svg).
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
BG = '#3b4fa8'      # --strong de src/index.css
BLUE = '#006AA7'
YELLOW = '#FECC00'
RING = '#ffffff'
TILE = 0.56         # part du carré occupée par le drapeau ; sa demi-diagonale (0,396) tient dans la zone sûre maskable (0,4)
SS = 4              # suréchantillonnage pour des bords lisses


def flag(size):
    """Drapeau carré aux coins arrondis, sur fond transparent, avec un liseré blanc."""
    s = size * SS
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = round(s * 0.28)
    ring = max(SS, round(s * 0.045))
    d.rounded_rectangle([0, 0, s - 1, s - 1], r, fill=RING)
    inner = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    di = ImageDraw.Draw(inner)
    k = s / 52
    di.rectangle([0, 0, s, s], fill=BLUE)
    di.rectangle([15 * k, 0, 24 * k, s], fill=YELLOW)
    di.rectangle([0, 21.5 * k, s, 30.5 * k], fill=YELLOW)
    mask = Image.new('L', (s, s), 0)
    ImageDraw.Draw(mask).rounded_rectangle([ring, ring, s - 1 - ring, s - 1 - ring], r - ring, fill=255)
    img.paste(inner, (0, 0), mask)
    return img.resize((size, size), Image.LANCZOS)


def icon(size, tile=TILE, background=True, round_bg=False):
    """Icône carrée : fond bleu (carré plein ou disque) et drapeau centré."""
    s = size * SS
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    if background:
        d = ImageDraw.Draw(img)
        if round_bg:
            d.ellipse([0, 0, s - 1, s - 1], fill=BG)
        else:
            d.rectangle([0, 0, s, s], fill=BG)
    img = img.resize((size, size), Image.LANCZOS)
    f = flag(round(size * tile))
    off = (size - f.width) // 2
    img.alpha_composite(f, (off, off))
    return img


def save(img, rel):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, optimize=True)


# PWA et iPhone (iOS arrondit lui-même les coins : fond plein jusqu'au bord)
save(icon(192), 'public/icons/icon-192.png')
save(icon(512), 'public/icons/icon-512.png')
save(icon(180).convert('RGB'), 'public/apple-touch-icon.png')

# Android : icônes classiques (API 24-25) et icône adaptative (API 26+, 108 dp dont 72 visibles)
for name, px in {'mdpi': 48, 'hdpi': 72, 'xhdpi': 96, 'xxhdpi': 144, 'xxxhdpi': 192}.items():
    res = f'android/app/src/main/res/mipmap-{name}'
    save(icon(px), f'{res}/ic_launcher.png')
    save(icon(px, round_bg=True), f'{res}/ic_launcher_round.png')
    fg = round(px * 108 / 48)
    save(icon(fg, tile=TILE * 72 / 108, background=False), f'{res}/ic_launcher_foreground.png')

print('Icônes écrites.')
