# Monopatines Río Cuarto · landing con catálogo

Sitio para [@monopatinesriocuarto](https://www.instagram.com/monopatinesriocuarto/): venta de
monopatines eléctricos, servicio técnico, repuestos y accesorios en Río Cuarto, Córdoba. El
cliente ve el catálogo con fichas técnicas y consulta por WhatsApp con el mensaje ya escrito.

## Correrlo

```bash
npm install
npm run dev
```

Abre en `http://localhost:3000`.

El sitio en línea: **https://alejomendy.github.io/monopatines-riocuarto/**

## Páginas

| Ruta | Qué muestra |
| --- | --- |
| `/` | Hero, garantía y cuotas, nuevos ingresos, elegir por uso, "por qué comprar acá", servicio técnico con formulario al WhatsApp del taller, repuestos, comunidad de Instagram, preguntas frecuentes y contacto |
| `/catalogo` | Monopatines, repuestos y accesorios con búsqueda, filtro por uso y marca, y orden por velocidad o autonomía. Los filtros quedan en la URL (`/catalogo?categoria=monopatines&uso=potencia`) |
| `/producto/[slug]` | Ficha con galería, datos clave, ficha técnica completa, consulta por WhatsApp y relacionados |

Todo se genera estático al compilar: no hay base de datos ni backend.

## Qué editar

- **Productos:** [`src/lib/catalog.ts`](src/lib/catalog.ts). Cada producto tiene nombre, marca,
  categoría, fotos, ficha y `precio`. Con `precio: null` se muestra "Consultá precio".
- **Datos del negocio:** [`src/lib/business.ts`](src/lib/business.ts). WhatsApp de ventas y de
  taller, Instagram, dirección y horarios.
- **Fotos:** `public/productos/` (catálogo), `public/instagram/` (fotos reales del local) y
  `public/marca/logo.jpg`.

## Identidad

Colores del logo y los reels de la marca, con la estética de landing de moto de referencia:

- **Base:** negro `#0C0C0E` y grises carbón. Las secciones de producto usan un degradé de gris a negro.
- **Acento:** naranja `#FF5A1F` de los textos de los reels, en botones, franjas y la palabra destacada de cada título.
- **Franjas diagonales** naranjas y blancas detrás del producto, cortes en diagonal y esquinas rectas.
- **Tipografía:** Kanit, deportiva y redondeada como los textos de los reels. Títulos en itálica extra bold, en mayúsculas y en dos colores ("Monopatines **destacados**").
- **Tarjetas blancas** con la foto sobre gris y botón redondo naranja; carrusel con la tarjeta central al frente.
- **Tríptico** foto / panel naranja / foto para el mensaje de marca.
- La cursiva "Río Cuarto" (Cormorant Garamond) queda solo en el logo.

Los colores y las piezas (`.franja`, `.titulo`, `.fondo-grafito`) están en [`src/app/globals.css`](src/app/globals.css).

## Movimiento

Todo en CSS y React, sin librerías de animación. Con `prefers-reduced-motion` activo se apaga todo y el contenido queda visible.

- **Hero:** franjas que entran, monopatín y panel que cambian con dirección, avance automático marcado por la barra de progreso (se pausa con el mouse encima).
- **Scroll:** aparición escalonada con variantes (`src/components/reveal.tsx`), barrido de la palabra naranja de cada título, fotos del tríptico que se acomodan despacio y paneles naranjas que se abren como cortina.
- **Carruseles:** deslizamiento con dirección, avance automático solo mientras están en pantalla y sin uso, progreso en la rayita activa.
- **Taller:** elegir un servicio lo marca en la orden de taller con un barrido naranja.
- **Microinteracciones:** tarjetas que se levantan con línea naranja en la base, botones con brillo, preguntas que se abren con altura animada, menú que se esconde al bajar y WhatsApp flotante que aparece al empezar a bajar.
- **Entre páginas:** View Transitions de React. La foto de una tarjeta del catálogo viaja hasta la ficha del producto.

## De dónde sale el contenido

- **Instagram:** logo, bio, los dos WhatsApp de la bio (Ventas y Reparación), 17,8 mil
  seguidores, las fotos de `public/instagram/` y los mensajes de garantía, cuotas y taller.
- **ewōl i25 e i35:** publicados en Instagram como nuevos ingresos. Fichas y fotos del sitio
  oficial [ewol.ar](https://ewol.ar/productos/).
- **Clap 2025 (RVN):** publicado en Instagram. El sitio de RVN no respondía, así que la ficha sale
  de publicaciones de distribuidores y la página lo aclara. No tiene foto de producto.
- **ewōl MINI, PRO, MAX y R, repuestos y accesorios:** fichas y fotos de ewol.ar. **No aparecen
  en las publicaciones recientes del local**: se sumaron para completar el catálogo.
- **Google Maps:** calificación del hero (4,5 con 4 reseñas, revisada el 15/09/2026). Las reseñas
  son solo estrellas, sin texto. Se actualiza a mano en `google` de [`src/lib/business.ts`](src/lib/business.ts).
- **Cascos y líquido sellador:** se ven en los reels del taller, sin foto de producto.

## Antes de publicar

1. **Confirmar el catálogo con el local.** Sacar lo que no venden (sobre todo MINI, PRO, MAX y R,
   repuestos y accesorios) y sumar lo que falte.
2. **Precios.** Los de ewol.ar no son los del local, así que se muestra "Consultá precio". Si
   quieren mostrar precios, cargarlos en `precio`.
3. **Fotos faltantes:** Clap 2025, cascos y líquido sellador muestran el logo de placeholder.
4. **Ficha del Clap 2025:** confirmar datos y sacar `fichaAConfirmar: true`.
5. **Dirección y horarios:** no están publicados en Instagram. Completarlos en `business.ts`.
6. **Logo en alta.** El actual es la foto de perfil de Instagram (150 px) y se usa hasta ~75 px.
   Pedir el archivo original para usarlo más grande.
7. **Garantía.** "Hasta 2 años" sale de un reel; la ficha oficial del i35 dice 6 meses. El sitio
   dice "según el equipo". Confirmar por modelo.
8. **Dominio propio (opcional).** Si se usa uno, ver "Publicar" más abajo.

## Publicar

El sitio está en **GitHub Pages**, publicado desde la rama `gh-pages`. Para subir cambios:

```bash
npm run deploy
```

[`scripts/publicar.mjs`](scripts/publicar.mjs) compila la exportación estática con el prefijo del repo
y sube la carpeta `out/` a `gh-pages`. GitHub tarda un minuto en mostrar la versión nueva.
Los cambios de código se suben a `main` como siempre (`git push`); publicar es un paso aparte.

Cómo está armado:

- `next.config.ts` usa `output: "export"`: `npm run build` genera `out/` con HTML, CSS, JS e
  imágenes, sin servidor.
- Pages de proyecto se sirve bajo `/monopatines-riocuarto`. Ese prefijo llega por
  `NEXT_PUBLIC_BASE_PATH` y se aplica a links (automático), imágenes
  ([`src/lib/image-loader.ts`](src/lib/image-loader.ts)) y metadatos ([`src/lib/base-path.ts`](src/lib/base-path.ts)).
  Con `npm run dev` queda vacío y el sitio corre en la raíz.
- `scripts/aplanar-rsc.mjs` corre después del build: copia los datos de navegación de Next al
  nombre que pide el navegador, para que la navegación interna no dé 404 en Pages.
- `public/.nojekyll` evita que Pages ignore la carpeta `_next`.

**Vercel:** el repo también está conectado a Vercel (https://monopatines-riocuarto.vercel.app), que
despliega solo cada push a `main` en la raíz, sin prefijo. La rama `gh-pages` está excluida en
[`vercel.json`](vercel.json): solo tiene el sitio compilado y Vercel no puede construirla.

**Con dominio propio:** configurarlo en *Settings → Pages* y en `scripts/publicar.mjs` dejar
`NEXT_PUBLIC_BASE_PATH` vacío y poner el dominio en `NEXT_PUBLIC_SITE_URL`.

## Material crudo

`scripts/preparar-imagenes.cjs` arma `public/` a partir de lo descargado en `_ig/` (Instagram) y
`_ewol/` (sitio de ewōl): recorta las infografías de accesorios para dejar solo el producto y
convierte todo a WebP. `scripts/recortar-fondo.py` recorta los monopatines del hero (`public/productos/*-sin-fondo.png`) con [rembg](https://github.com/danielgatis/rembg) y el modelo BiRefNet, y les dibuja una sombra de contacto limpia bajo las ruedas. Requiere Python con `pip install "rembg[cpu]"`; uso: `python scripts/recortar-fondo.py _ewol/img/ewol-i35.webp public/productos/ewol-i35-sin-fondo.png`. Las carpetas `_ig/` y `_ewol/` no van al repo.

## Stack

Next.js 16 (App Router, exportación estática) · React 19 · TypeScript · Tailwind CSS v4 · GitHub Pages.
