"""Recorta el fondo de una foto de producto y le dibuja una sombra de piso limpia.

El recorte lo hace rembg (modelo de segmentación). La sombra original de la foto
de estudio se descarta y se reemplaza por una sombra de contacto suave entre las
dos ruedas, así queda bien sobre cualquier fondo.

Uso (con rembg instalado):
    python scripts/recortar-fondo.py entrada salida
"""

import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from rembg import new_session, remove
from scipy import ndimage

MODELO = sys.argv[3] if len(sys.argv) > 3 else "birefnet-general-lite"


def punto_mas_bajo(alfa: np.ndarray, x0: int, x1: int) -> tuple[int, int]:
    """Píxel opaco más bajo dentro de un rango de columnas (apoyo de una rueda)."""
    zona = alfa[:, x0:x1] > 128
    filas = np.where(zona.any(axis=1))[0]
    y = int(filas.max())
    xs = np.where(zona[y])[0]
    return int(x0 + xs.mean()), y


def main(entrada: str, salida: str) -> None:
    foto = Image.open(entrada).convert("RGB")
    sesion = new_session(MODELO)
    # Máscara directa del modelo: el "alpha matting" de rembg rellena los huecos
    # finos (entre cable y manubrio) con fondo blanco, así que no se usa.
    alfa = np.array(remove(foto, session=sesion, only_mask=True))
    alto, ancho = alfa.shape

    # Huecos chicos de fondo que el modelo deja dentro de la horquilla y el
    # guardabarros: manchas blancas sin color en la parte baja de la foto.
    rgb = np.array(foto).astype(int)
    blanco = (rgb.min(axis=2) > 215) & (rgb.max(axis=2) - rgb.min(axis=2) < 15) & (alfa > 0)
    etiquetas, _ = ndimage.label(blanco)
    for i, zona in enumerate(ndimage.find_objects(etiquetas), 1):
        if zona[0].start > alto * 0.6 and (etiquetas[zona] == i).sum() < 150:
            alfa[zona][etiquetas[zona] == i] = 0
    alfa = np.array(Image.fromarray(alfa).filter(ImageFilter.GaussianBlur(0.6)))

    recorte = foto.convert("RGBA")
    recorte.putalpha(Image.fromarray(alfa))
    columnas = np.where((alfa > 128).any(axis=0))[0]
    izq, der = int(columnas.min()), int(columnas.max())
    mitad = (izq + der) // 2

    # Apoyo de cada rueda: lo más bajo de la mitad izquierda y de la derecha.
    delantera = punto_mas_bajo(alfa, izq, mitad)
    trasera = punto_mas_bajo(alfa, mitad, der + 1)

    margen = 60
    lienzo = Image.new("RGBA", (ancho + margen * 2, alto + margen * 2), (0, 0, 0, 0))
    sombra = Image.new("L", lienzo.size, 0)
    dibujo = ImageDraw.Draw(sombra)
    (x1, y1), (x2, y2) = delantera, trasera
    x1, y1, x2, y2 = x1 + margen, y1 + margen, x2 + margen, y2 + margen

    # Franja difusa bajo la plataforma, uniendo las dos ruedas.
    dibujo.line([(x1, y1 - 4), (x2, y2 - 4)], fill=70, width=34)
    # Apoyos más oscuros en cada rueda.
    for x, y in ((x1, y1), (x2, y2)):
        dibujo.ellipse([x - 70, y - 16, x + 70, y + 12], fill=150)
        dibujo.ellipse([x - 34, y - 8, x + 34, y + 6], fill=215)
    sombra = sombra.filter(ImageFilter.GaussianBlur(16))

    negro = Image.new("RGBA", lienzo.size, (0, 0, 0, 255))
    negro.putalpha(sombra)
    lienzo = Image.alpha_composite(lienzo, negro)
    capa = Image.new("RGBA", lienzo.size, (0, 0, 0, 0))
    capa.paste(recorte, (margen, margen))
    lienzo = Image.alpha_composite(lienzo, capa)

    lienzo = lienzo.crop(lienzo.getbbox())
    lienzo.save(salida, optimize=True)
    print("listo", salida, lienzo.size, "apoyos", delantera, trasera)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
