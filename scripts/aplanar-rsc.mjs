// Después de `next build` con `output: "export"`.
//
// Next 16 escribe los datos de navegación de cada segmento en subcarpetas
// (`__next.catalogo/__PAGE__.txt`), pero el cliente los pide con el nombre en
// una sola pieza (`__next.catalogo.__PAGE__.txt`). En un hosting estático como
// GitHub Pages esos pedidos dan 404 y se pierde la precarga y la transición
// entre páginas. Este paso crea una copia con el nombre que se pide.
import fs from "node:fs";
import path from "node:path";

const raiz = path.resolve("out");
let copias = 0;

function aplanar(carpeta, prefijo, destino) {
  for (const entrada of fs.readdirSync(carpeta, { withFileTypes: true })) {
    const ruta = path.join(carpeta, entrada.name);
    const nombre = `${prefijo}.${entrada.name}`;
    if (entrada.isDirectory()) {
      aplanar(ruta, nombre, destino);
    } else {
      fs.copyFileSync(ruta, path.join(destino, nombre));
      copias++;
    }
  }
}

function recorrer(carpeta) {
  for (const entrada of fs.readdirSync(carpeta, { withFileTypes: true })) {
    if (!entrada.isDirectory()) continue;
    const ruta = path.join(carpeta, entrada.name);
    if (entrada.name.startsWith("__next.")) aplanar(ruta, entrada.name, carpeta);
    else if (entrada.name !== "_next") recorrer(ruta);
  }
}

if (!fs.existsSync(raiz)) {
  console.error("No existe out/: correr primero next build.");
  process.exit(1);
}
recorrer(raiz);
console.log(`aplanar-rsc: ${copias} archivos copiados`);
