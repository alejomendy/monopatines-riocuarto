// Arma public/ a partir del material crudo descargado (_ig y _ewol).
// Se corre una sola vez: node scripts/preparar-imagenes.cjs
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const out = (...p) => path.join(root, "public", ...p);
for (const d of ["productos", "instagram", "marca"]) fs.mkdirSync(out(d), { recursive: true });

// Fotos de estudio de monopatines: se usan enteras.
const enteras = ["ewol-i25", "ewol-i35", "ewol-mini", "ewol-pro", "ewol-max", "ewol-r", "caliper-xtech", "disco-freno", "luz-bocina", "pastillas-freno"];
// Infografías: se recorta solo el producto [left, top, width, height] sobre 1024 px.
const recortes = {
  "bateria-36v": [590, 110, 340, 820],
  "camara-10": [500, 180, 500, 500],
  "cubierta-solida-85": [585, 130, 439, 570],
  "cubierta-tubeless-10": [560, 130, 464, 600],
  grips: [430, 200, 594, 440],
  "inflador-xiaomi": [570, 40, 420, 810],
  "kit-nfc": [510, 225, 440, 455],
};

(async () => {
  for (const n of enteras) {
    await sharp(path.join(root, "_ewol/img", n + ".webp"))
      .flatten({ background: "#ffffff" })
      // Lleva los casi blancos del fondo de estudio a blanco puro, así la foto no
      // deja un recuadro gris sobre la tarjeta.
      .linear(1.07, -5)
      .resize(900, 900, { fit: "contain", background: "#ffffff" })
      .webp({ quality: 84 })
      .toFile(out("productos", n + ".webp"));
  }
  for (const [n, [left, top, width, height]] of Object.entries(recortes)) {
    await sharp(path.join(root, "_ewol/img", n + ".webp"))
      .extract({ left, top, width, height })
      .flatten({ background: "#ffffff" })
      .linear(1.07, -5)
      .resize(760, 760, { fit: "inside" })
      .toBuffer()
      .then(async (buf) => {
        // Completa el cuadrado en blanco: sobre la tarjeta gris la foto se funde
        // (mix-blend-multiply) y no queda recuadro.
        const { width, height } = await sharp(buf).metadata();
        const fondo = "#ffffff";
        const lado = 900;
        const x = Math.floor((lado - width) / 2);
        const y = Math.floor((lado - height) / 2);
        return sharp(buf).extend({ top: y, bottom: lado - height - y, left: x, right: lado - width - x, background: fondo });
      })
      .then((img) => img.webp({ quality: 84 }).toFile(out("productos", n + ".webp")));
  }
  for (const n of ["garantia-local", "rural", "pirulo", "servicio", "liquido", "falla", "ewol-i25", "ewol-i35", "garantia2", "clap2025"]) {
    await sharp(path.join(root, "_ig", n + ".jpg")).webp({ quality: 82 }).toFile(out("instagram", n + ".webp"));
  }
  fs.copyFileSync(path.join(root, "_ig/logo150.jpg"), out("marca", "logo.jpg"));
  await sharp(path.join(root, "_ig/logo150.jpg")).resize(96, 96).png().toFile(path.join(root, "src/app/icon.png"));
  console.log("listo");
})();
