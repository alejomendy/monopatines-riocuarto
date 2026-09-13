/**
 * Prefijo de la URL donde se publica el sitio. En GitHub Pages de proyecto es
 * `/nombre-del-repo`; en local o en un dominio propio queda vacío. Lo define
 * `NEXT_PUBLIC_BASE_PATH` al compilar (ver .github/workflows/deploy.yml).
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Ruta a un archivo de `public/` con el prefijo aplicado. */
export function asset(ruta: string) {
  return ruta.startsWith("/") ? `${basePath}${ruta}` : ruta;
}
