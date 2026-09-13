import { asset } from "@/lib/base-path";

/**
 * Loader de `next/image` para la exportación estática: GitHub Pages no
 * optimiza imágenes, así que se sirve el archivo tal cual con el prefijo del
 * sitio. El ancho viaja en la query solo para que cada tamaño sea una URL
 * distinta; el hosting lo ignora.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  return `${asset(src)}?w=${width}`;
}
