/**
 * Catálogo. Es el único archivo a editar para sumar, sacar o cambiar productos.
 *
 * - `precio: null` muestra "Consultá precio" y lleva al WhatsApp de ventas.
 *   Cargando un número se muestra el precio en pesos.
 * - Las fichas de ewōl salen del sitio oficial de la marca (ewol.ar). La del
 *   Clap sale de publicaciones de distribuidores y está marcada para confirmar.
 * - Las fotos van en `public/productos/`. Un producto sin foto muestra el
 *   placeholder con el logo.
 */

export type Categoria = "monopatines" | "repuestos" | "accesorios";
export type Uso = "ciudad" | "distancia" | "potencia";

export type Spec = { label: string; valor: string };

export type Producto = {
  slug: string;
  nombre: string;
  marca: string;
  categoria: Categoria;
  resumen: string;
  descripcion: string;
  imagenes: string[];
  precio: number | null;
  etiqueta?: string;
  destacado?: boolean;
  /** Solo monopatines: para filtrar por uso y mostrar los tres datos clave. */
  uso?: Uso[];
  claves?: { velocidad: string; autonomia: string; motor: string; velocidadKmh: number; autonomiaKm: number };
  specs: Spec[];
  /** Foto de ambiente (con piso y pared) dentro de `imagenes`: se muestra a sangre, sin margen. */
  fotoAmbiente?: string;
  /** La ficha técnica no es oficial de la marca y hay que confirmarla con el local. */
  fichaAConfirmar?: boolean;
};

export const categorias: { id: Categoria; nombre: string; bajada: string }[] = [
  { id: "monopatines", nombre: "Monopatines", bajada: "Equipos nuevos con garantía y asesoramiento" },
  { id: "repuestos", nombre: "Repuestos", bajada: "Cubiertas, cámaras, frenos y baterías" },
  { id: "accesorios", nombre: "Accesorios", bajada: "Para andar más cómodo y más seguro" },
];

export const usos: { id: Uso; nombre: string; bajada: string }[] = [
  { id: "ciudad", nombre: "Ciudad y facultad", bajada: "Livianos, plegables y fáciles de guardar" },
  { id: "distancia", nombre: "Recorridos largos", bajada: "Más batería para ir y volver sin cargar" },
  { id: "potencia", nombre: "Potencia", bajada: "Doble motor, suspensión y frenos de moto" },
];

export const productos: Producto[] = [
  {
    slug: "ewol-i35",
    nombre: "ewōl i35",
    marca: "ewōl",
    categoria: "monopatines",
    resumen: "Doble suspensión, 40 km reales y certificado IPX5.",
    descripcion:
      "El más completo de la línea inizio. Pensado para quien lo usa todos los días: doble suspensión, autonomía para ir y volver sin cargar y resistencia al agua para no preocuparte cuando llueve. Trae guiños integrados y se maneja desde el celular por Bluetooth.",
    imagenes: ["/productos/ewol-i35-sin-fondo.png", "/instagram/ewol-i35.webp"],
    precio: null,
    etiqueta: "Nuevo ingreso",
    destacado: true,
    uso: ["ciudad", "distancia"],
    claves: { velocidad: "35 km/h", autonomia: "40 km", motor: "500 W", velocidadKmh: 35, autonomiaKm: 40 },
    specs: [
      { label: "Motor", valor: "500 W nominal · 700 W pico" },
      { label: "Batería", valor: "36 V · 15,6 Ah" },
      { label: "Velocidad máxima", valor: "35 km/h (modo sport)" },
      { label: "Autonomía", valor: "Hasta 40 km (modo sport, usuario de 75 kg)" },
      { label: "Rodado", valor: '10 × 2,125" inflable' },
      { label: "Suspensión", valor: "Doble, con resortes" },
      { label: "Frenos", valor: "Tambor delantero + regenerativo" },
      { label: "Resistencia al agua", valor: "IPX5" },
      { label: "Luces", valor: "Delantera, trasera y guiños integrados" },
      { label: "Conectividad", valor: "Bluetooth, app Tuya" },
      { label: "Peso", valor: "20 kg" },
      { label: "Carga máxima", valor: "120 kg" },
      { label: "Tiempo de carga", valor: "8 horas" },
      { label: "Plegable", valor: "Sí" },
    ],
  },
  {
    slug: "ewol-i25",
    nombre: "ewōl i25",
    marca: "ewōl",
    categoria: "monopatines",
    resumen: "Liviano, con guiños, Bluetooth y certificado IPX5.",
    descripcion:
      "La puerta de entrada a la movilidad eléctrica. Liviano y plegable para subirlo a casa o guardarlo en la facu, con certificado IPX5 para andar tranquilo cuando llueve, guiños integrados y cuatro modos de manejo.",
    imagenes: ["/productos/ewol-i25-sin-fondo.png", "/instagram/ewol-i25.webp"],
    precio: null,
    etiqueta: "Nuevo ingreso",
    destacado: true,
    uso: ["ciudad"],
    claves: { velocidad: "30 km/h", autonomia: "20 km", motor: "350 W", velocidadKmh: 30, autonomiaKm: 20 },
    specs: [
      { label: "Motor", valor: "350 W nominal · 600 W pico" },
      { label: "Batería", valor: "36 V · 7,8 Ah" },
      { label: "Velocidad máxima", valor: "30 km/h (modo sport)" },
      { label: "Autonomía", valor: "Hasta 20 km (modo sport, usuario de 75 kg)" },
      { label: "Rodado", valor: '10 × 2,125" inflable' },
      { label: "Frenos", valor: "Tambor trasero + regenerativo" },
      { label: "Resistencia al agua", valor: "IPX5" },
      { label: "Luces", valor: "Delantera, trasera y guiños integrados" },
      { label: "Conectividad", valor: "Bluetooth, app Tuya" },
      { label: "Peso", valor: "17 kg" },
      { label: "Carga máxima", valor: "100 kg" },
      { label: "Tiempo de carga", valor: "6 horas" },
      { label: "Plegable", valor: "Sí" },
    ],
  },
  {
    slug: "clap-2025",
    nombre: "Clap 2025",
    marca: "RVN",
    categoria: "monopatines",
    resumen: "Doble suspensión y toda la comodidad para el día a día.",
    descripcion:
      "El infaltable. Toda la comodidad que puede tener un equipo: doble suspensión para las calles de la ciudad, batería de 48 V para recorridos largos y cuatro modos de manejo.",
    imagenes: [],
    precio: null,
    etiqueta: "El infaltable",
    destacado: true,
    uso: ["distancia"],
    claves: { velocidad: "50 km/h", autonomia: "45 km", motor: "800 W", velocidadKmh: 50, autonomiaKm: 45 },
    fichaAConfirmar: true,
    specs: [
      { label: "Motor", valor: "800 W trasero" },
      { label: "Batería", valor: "48 V · 15 Ah" },
      { label: "Velocidad máxima", valor: "Hasta 50 km/h" },
      { label: "Autonomía", valor: "45 a 55 km" },
      { label: "Suspensión", valor: "Doble" },
      { label: "Modos de manejo", valor: "4" },
      { label: "Peso", valor: "18 kg" },
      { label: "Carga máxima", valor: "120 kg" },
      { label: "Tiempo de carga", valor: "4 a 6 horas" },
    ],
  },
  {
    slug: "ewol-mini",
    nombre: "ewōl MINI",
    marca: "ewōl",
    categoria: "monopatines",
    resumen: "Ultracompacto, liviano y práctico para la ciudad.",
    descripcion:
      "Liviano, práctico y urbano. El más chico de la marca, para trayectos cortos y para quien lo tiene que subir por escaleras o llevar en el auto.",
    imagenes: ["/productos/ewol-mini-sin-fondo.png", "/productos/ewol-mini.webp"],
    fotoAmbiente: "/productos/ewol-mini.webp",
    precio: null,
    uso: ["ciudad"],
    claves: { velocidad: "35 km/h", autonomia: "15 km", motor: "900 W", velocidadKmh: 35, autonomiaKm: 15 },
    specs: [
      { label: "Motor", valor: "900 W" },
      { label: "Batería", valor: "36 V · 10,4 Ah" },
      { label: "Velocidad máxima", valor: "Más de 35 km/h" },
      { label: "Autonomía", valor: "15 km (modo 3)" },
      { label: "Rodado", valor: '8" inflable (200 × 50)' },
      { label: "Frenos", valor: "Doble tambor" },
      { label: "Resistencia al agua", valor: "No" },
      { label: "Pantalla", valor: "Display digital" },
      { label: "Peso", valor: "16,5 kg" },
      { label: "Carga máxima", valor: "100 kg" },
      { label: "Tiempo de carga", valor: "6 horas" },
      { label: "Plegable", valor: "Sí, ultracompacto" },
    ],
  },
  {
    slug: "ewol-pro",
    nombre: "ewōl PRO",
    marca: "ewōl",
    categoria: "monopatines",
    resumen: "Motor Minimotors de 1400 W y frenos de disco semi hidráulicos.",
    descripcion:
      "Potencia, control y tecnología. Motor Minimotors, chasis de aluminio, suspensión y doble freno de disco Xtech para frenar con seguridad a más de 50 km/h.",
    imagenes: ["/productos/ewol-pro-sin-fondo.png", "/productos/ewol-pro.webp"],
    fotoAmbiente: "/productos/ewol-pro.webp",
    precio: null,
    uso: ["distancia", "potencia"],
    claves: { velocidad: "50 km/h", autonomia: "30 km", motor: "1400 W", velocidadKmh: 50, autonomiaKm: 30 },
    specs: [
      { label: "Motor", valor: "1400 W Minimotors" },
      { label: "Batería", valor: "48 V · 15,6 Ah" },
      { label: "Velocidad máxima", valor: "Más de 50 km/h" },
      { label: "Autonomía", valor: "30 km (modo 3)" },
      { label: "Rodado", valor: '10" inflable CST' },
      { label: "Suspensión", valor: "Sí" },
      { label: "Frenos", valor: "Doble disco Xtech semi hidráulico" },
      { label: "Luces", valor: "LED" },
      { label: "Pantalla", valor: "LCD Minimotors, 3 velocidades" },
      { label: "Chasis", valor: "Aleación de aluminio" },
      { label: "Peso", valor: "24 kg" },
      { label: "Carga máxima", valor: "120 kg" },
      { label: "Tiempo de carga", valor: "8 horas" },
    ],
  },
  {
    slug: "ewol-max",
    nombre: "ewōl MAX",
    marca: "ewōl",
    categoria: "monopatines",
    resumen: "Doble motor de 2700 W y hasta 60 km de autonomía.",
    descripcion:
      "La definición de potencia. Doble motor Minimotors, doble suspensión y cubiertas tubeless de 10 × 2,7 pulgadas que suben pendientes de hasta 43 %.",
    imagenes: ["/productos/ewol-max-sin-fondo.png", "/productos/ewol-max.webp"],
    fotoAmbiente: "/productos/ewol-max.webp",
    precio: null,
    uso: ["distancia", "potencia"],
    claves: { velocidad: "55 km/h", autonomia: "60 km", motor: "2700 W", velocidadKmh: 55, autonomiaKm: 60 },
    specs: [
      { label: "Motor", valor: "Doble Minimotors · 2700 W" },
      { label: "Batería", valor: "48 V · 20,8 Ah" },
      { label: "Velocidad máxima", valor: "Más de 55 km/h" },
      { label: "Autonomía", valor: "Hasta 60 km (modo eco)" },
      { label: "Rodado", valor: '10 × 2,7" tubeless CST' },
      { label: "Suspensión", valor: "Doble, con resortes" },
      { label: "Frenos", valor: "Xtech semi hidráulicos" },
      { label: "Pendiente máxima", valor: "43 %" },
      { label: "Peso", valor: "29 kg" },
      { label: "Carga máxima", valor: "120 kg" },
      { label: "Tiempo de carga", valor: "11 horas" },
    ],
  },
  {
    slug: "ewol-r",
    nombre: "ewōl R",
    marca: "ewōl",
    categoria: "monopatines",
    resumen: "4000 W, 60 V y frenos hidráulicos. De 0 a 40 km/h en 3,8 s.",
    descripcion:
      "El límite es el asfalto. Doble motor de 4000 W, batería de 60 V, frenos hidráulicos Zoom y doble suspensión. Para quien ya anduvo y quiere lo máximo.",
    imagenes: ["/productos/ewol-r-sin-fondo.png", "/productos/ewol-r.webp"],
    fotoAmbiente: "/productos/ewol-r.webp",
    precio: null,
    uso: ["potencia"],
    claves: { velocidad: "70 km/h", autonomia: "80 km", motor: "4000 W", velocidadKmh: 70, autonomiaKm: 80 },
    specs: [
      { label: "Motor", valor: "Doble Minimotors · 4000 W" },
      { label: "Batería", valor: "60 V · 23,4 Ah litio" },
      { label: "Velocidad máxima", valor: "Más de 70 km/h" },
      { label: "Autonomía", valor: "80 km (eco) · 45 km (sport)" },
      { label: "Aceleración", valor: "0 a 40 km/h en 3,8 s" },
      { label: "Rodado", valor: '10 × 2,7" tubeless' },
      { label: "Suspensión", valor: "Doble, delantera y trasera" },
      { label: "Frenos", valor: "Hidráulicos Zoom, disco de 140 mm" },
      { label: "Pendiente máxima", valor: "43 %" },
      { label: "Resistencia al agua", valor: "No" },
      { label: "Peso", valor: "32 kg" },
      { label: "Carga máxima", valor: "150 kg" },
      { label: "Tiempo de carga", valor: "12 horas" },
    ],
  },

  // --- Repuestos ---------------------------------------------------------
  {
    slug: "cubierta-tubeless-10x27",
    nombre: 'Cubierta tubeless 10 × 2,7"',
    marca: "CST",
    categoria: "repuestos",
    resumen: "Sin cámara, con más agarre y menos pinchaduras.",
    descripcion:
      "Cubierta tubeless para monopatines de rodado 10 × 2,7 pulgadas. Se usa con líquido sellador: si pinchás, el líquido tapa el agujero y seguís andando.",
    imagenes: ["/productos/cubierta-tubeless-10.webp"],
    precio: null,
    specs: [
      { label: "Medida", valor: '10 × 2,7"' },
      { label: "Tipo", valor: "Tubeless (sin cámara)" },
      { label: "Compatibles", valor: "ewōl MAX, ewōl R y equipos con la misma medida" },
    ],
  },
  {
    slug: "cubierta-solida-85x2",
    nombre: 'Cubierta sólida 8,5 × 2"',
    marca: "Genérica",
    categoria: "repuestos",
    resumen: "Maciza: no se pincha nunca.",
    descripcion:
      "Cubierta sólida con alvéolos que amortiguan el impacto. Olvidate de las pinchaduras en monopatines de 8,5 pulgadas.",
    imagenes: ["/productos/cubierta-solida-85.webp"],
    precio: null,
    specs: [
      { label: "Medida", valor: '8,5 × 2"' },
      { label: "Tipo", valor: "Sólida, sin aire" },
    ],
  },
  {
    slug: "camara-10",
    nombre: 'Cámara 10"',
    marca: "CST",
    categoria: "repuestos",
    resumen: "Cámara reforzada con válvula curva.",
    descripcion: "Cámara para monopatines de 10 pulgadas con válvula curva, más fácil de inflar con la rueda puesta.",
    imagenes: ["/productos/camara-10.webp"],
    precio: null,
    specs: [
      { label: "Medida", valor: '10"' },
      { label: "Válvula", valor: "Curva" },
    ],
  },
  {
    slug: "pastillas-freno",
    nombre: "Pastillas de freno",
    marca: "Zoom · Xtech",
    categoria: "repuestos",
    resumen: "Para frenos de disco Zoom y Xtech.",
    descripcion:
      "Pastillas de freno para cálipers Zoom y Xtech. Si el freno chilla o tenés que apretar hasta el fondo, es hora de cambiarlas.",
    imagenes: ["/productos/pastillas-freno.webp"],
    precio: null,
    specs: [{ label: "Compatibles", valor: "Cálipers Zoom y Xtech" }],
  },
  {
    slug: "disco-freno-140",
    nombre: "Disco de freno 140 mm",
    marca: "Genérica",
    categoria: "repuestos",
    resumen: "Disco de 140 mm, 6 tornillos.",
    descripcion: "Disco de freno de 140 mm con fijación de 6 tornillos, para monopatines con freno de disco.",
    imagenes: ["/productos/disco-freno.webp"],
    precio: null,
    specs: [
      { label: "Diámetro", valor: "140 mm" },
      { label: "Fijación", valor: "6 tornillos" },
    ],
  },
  {
    slug: "caliper-xtech",
    nombre: "Cáliper Xtech semi hidráulico",
    marca: "Xtech",
    categoria: "repuestos",
    resumen: "Más potencia de frenado con menos esfuerzo.",
    descripcion:
      "Cáliper de freno semi hidráulico Xtech. Un upgrade clásico para frenar mejor en monopatines de más de 40 km/h.",
    imagenes: ["/productos/caliper-xtech.webp"],
    precio: null,
    specs: [{ label: "Tipo", valor: "Semi hidráulico" }],
  },
  {
    slug: "bateria-36v-13ah",
    nombre: "Batería de litio 36 V 13 Ah",
    marca: "ewōl",
    categoria: "repuestos",
    resumen: "Para devolverle la autonomía a tu monopatín.",
    descripcion:
      "Batería de litio de 36 V y 13 Ah. Antes de comprar, traé el equipo o escribinos el modelo: te confirmamos medida, conector y compatibilidad.",
    imagenes: ["/productos/bateria-36v.webp"],
    precio: null,
    specs: [
      { label: "Tensión", valor: "36 V" },
      { label: "Capacidad", valor: "13 Ah" },
      { label: "Química", valor: "Litio" },
    ],
  },

  // --- Accesorios --------------------------------------------------------
  {
    slug: "casco",
    nombre: "Cascos",
    marca: "Varias",
    categoria: "accesorios",
    resumen: "El accesorio que no puede faltar.",
    descripcion: "Cascos para monopatín en distintos talles y colores. Vení a probártelos al local.",
    imagenes: [],
    precio: null,
    specs: [{ label: "Talles", valor: "Consultá disponibilidad" }],
  },
  {
    slug: "liquido-sellador",
    nombre: "Líquido sellador tubeless",
    marca: "Varias",
    categoria: "accesorios",
    resumen: "El que usamos en el taller. Exigí calidad.",
    descripcion:
      "Cuando tubelizás tu monopatín, el líquido hace la diferencia. Usamos y vendemos selladores de primera marca que tapan pinchaduras sin dañar la cubierta.",
    imagenes: [],
    precio: null,
    specs: [{ label: "Uso", valor: "Cubiertas tubeless" }],
  },
  {
    slug: "inflador-xiaomi-air-pump-2",
    nombre: "Inflador Xiaomi Mijia Air Pump 2",
    marca: "Xiaomi",
    categoria: "accesorios",
    resumen: "Portátil, con pantalla y carga USB-C.",
    descripcion:
      "Inflador eléctrico portátil con pantalla digital que muestra la presión en tiempo real y se corta solo al llegar a la presión elegida. Hasta 150 PSI.",
    imagenes: ["/productos/inflador-xiaomi.webp"],
    precio: null,
    specs: [
      { label: "Presión máxima", valor: "150 PSI" },
      { label: "Carga", valor: "USB-C" },
      { label: "Válvulas", valor: "Presta y Schrader" },
    ],
  },
  {
    slug: "luz-delantera-bocina",
    nombre: "Luz delantera + bocina",
    marca: "ewōl",
    categoria: "accesorios",
    resumen: "Ver y que te vean.",
    descripcion: "Luz delantera LED con bocina integrada, modelo 2024. Para andar de noche con seguridad.",
    imagenes: ["/productos/luz-bocina.webp"],
    precio: null,
    specs: [{ label: "Modelo", valor: "2024" }],
  },
  {
    slug: "kit-nfc",
    nombre: "Kit de encendido NFC",
    marca: "ewōl",
    categoria: "accesorios",
    resumen: "Encendé tu monopatín con una tarjeta.",
    descripcion:
      "Kit de encendido por NFC: el monopatín solo arranca con tu tarjeta o llavero. Más seguridad cuando lo dejás estacionado. Lo instalamos en el taller.",
    imagenes: ["/productos/kit-nfc.webp"],
    precio: null,
    specs: [{ label: "Instalación", valor: "En el taller" }],
  },
  {
    slug: "punos-grips",
    nombre: "Puños / grips",
    marca: "ewōl",
    categoria: "accesorios",
    resumen: "Más agarre y menos vibración en las manos.",
    descripcion: "Puños de goma antideslizante con diseño ergonómico. Verificá el diámetro de tu manillar antes de comprar.",
    imagenes: ["/productos/grips.webp"],
    precio: null,
    specs: [{ label: "Compatibles", valor: "ewōl MINI, PRO y MAX" }],
  },
];

export function productoPorSlug(slug: string) {
  return productos.find((p) => p.slug === slug);
}

export function productosDe(categoria: Categoria) {
  return productos.filter((p) => p.categoria === categoria);
}

export function nombreCategoria(id: Categoria) {
  return categorias.find((c) => c.id === id)?.nombre ?? id;
}

export function mensajeConsulta(p: Producto) {
  return `Hola! Vi ${p.categoria === "monopatines" ? "el monopatín" : ""} ${p.nombre} en la web y quiero consultar precio y disponibilidad.`.replace(
    /\s+/g,
    " ",
  );
}

export function formatearPrecio(precio: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(precio);
}
