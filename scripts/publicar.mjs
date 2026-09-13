// Publica el sitio en GitHub Pages: compila la exportación estática con el
// prefijo del repo y sube la carpeta out/ a la rama gh-pages.
// Uso: npm run deploy
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const correr = (comando, opciones = {}) => execSync(comando, { stdio: "inherit", ...opciones });
const leer = (comando) => execSync(comando, { encoding: "utf8" }).trim();

const remoto = leer("git remote get-url origin");
const [, duenio, repo] = remoto.match(/github\.com[:/]([^/]+)\/(.+?)(\.git)?$/) ?? [];
if (!duenio) throw new Error(`No se reconoce el remoto de GitHub: ${remoto}`);

const env = {
  ...process.env,
  NEXT_PUBLIC_BASE_PATH: `/${repo}`,
  NEXT_PUBLIC_SITE_URL: `https://${duenio.toLowerCase()}.github.io`,
};

console.log(`Compilando para https://${duenio.toLowerCase()}.github.io/${repo}/`);
fs.rmSync("out", { recursive: true, force: true });
correr("npm run build", { env });

// Sin .nojekyll, GitHub Pages ignora las carpetas que empiezan con "_" (como _next).
fs.writeFileSync(path.join("out", ".nojekyll"), "");

const origen = leer("git rev-parse --short HEAD");
const git = (comando) => correr(`git ${comando}`, { cwd: "out" });
git("init -q -b gh-pages");
git("add -A");
git(`-c user.name="${leer("git config user.name")}" -c user.email="${leer("git config user.email")}" commit -q -m "Publicar ${origen}"`);
git(`push -q -f ${remoto} gh-pages`);
fs.rmSync(path.join("out", ".git"), { recursive: true, force: true });

console.log(`Listo: https://${duenio.toLowerCase()}.github.io/${repo}/ (GitHub tarda un minuto en actualizar)`);
