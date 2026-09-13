"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

import { ArrowIcon, WrenchIcon } from "@/components/icons";
import { negocio } from "@/lib/business";
import { useSinMovimiento } from "@/lib/use-sin-movimiento";
import { Texto } from "@/components/texto";

const destacados = [
  {
    slug: "ewol-i35",
    marca: "ewōl",
    modelo: "i35",
    recorte: "/productos/ewol-i35-sin-fondo.png",
    etiqueta: "Nuevo ingreso",
    datos: [
      { valor: "35", unidad: "km/h" },
      { valor: "40", unidad: "km" },
      { valor: "IPX5", unidad: "agua" },
    ],
    ficha: "Doble suspensión, guiños integrados y Bluetooth.",
  },
  {
    slug: "ewol-i25",
    marca: "ewōl",
    modelo: "i25",
    recorte: "/productos/ewol-i25-sin-fondo.png",
    etiqueta: "Nuevo ingreso",
    datos: [
      { valor: "30", unidad: "km/h" },
      { valor: "20", unidad: "km" },
      { valor: "IPX5", unidad: "agua" },
    ],
    ficha: "Liviano y plegable, con guiños y Bluetooth.",
  },
];

const INTERVALO = 7000;

export function Hero() {
  const [actual, setActual] = useState(0);
  const [direccion, setDireccion] = useState<1 | -1>(1);
  const [pausado, setPausado] = useState(false);
  const sinMovimiento = useSinMovimiento();
  const p = destacados[actual];

  const cambiar = useCallback((d: 1 | -1) => {
    setDireccion(d);
    setActual((a) => (a + d + destacados.length) % destacados.length);
  }, []);

  const entrada = direccion === 1 ? "entra-derecha" : "entra-izquierda";

  return (
    <section
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      className="relative isolate overflow-hidden bg-noche lg:h-[100svh] lg:max-h-[920px] lg:min-h-[720px]"
    >
      {/* Zona clara de la derecha, con el frente del local de fondo. */}
      <div
        className="absolute top-18 right-0 bottom-0 hidden w-[50%] bg-gradient-to-b from-[#efefef] to-[#b9b9bd] lg:block"
        style={{ clipPath: "polygon(34% 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <Image
          src="/instagram/ewol-i35.webp"
          alt=""
          fill
          sizes="50vw"
          className="scale-105 object-cover opacity-20 mix-blend-multiply blur-[3px] grayscale"
          priority
        />
      </div>

      {/* Franjas naranjas. */}
      <div className="absolute inset-x-0 top-18 bottom-0 hidden overflow-hidden lg:block">
        <span className="franja entra-franja left-[30%] w-[12%]" />
        <span className="franja entra-franja left-[47%] w-[3%] bg-white!" style={{ animationDelay: "120ms" }} />
        <span className="franja entra-franja left-[53%] w-[9%]" style={{ animationDelay: "220ms" }} />
      </div>

      {/* Bloque negro en diagonal: deja el título siempre legible sobre las franjas. */}
      <div
        className="absolute bottom-0 left-0 hidden h-[56%] w-[60%] bg-noche lg:block"
        style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
      />

      {/* ---- Escritorio: producto ---- */}
      <div className="absolute top-[calc(4.5rem+3%)] right-[1.5%] bottom-[36%] hidden w-[33%] lg:block xl:right-0">
        <Image
          key={p.recorte}
          src={p.recorte}
          alt={`${p.marca} ${p.modelo}`}
          fill
          sizes="33vw"
          priority
          className={`${entrada} object-contain`}
        />
      </div>

      <div className="relative mx-auto h-full max-w-7xl px-5 lg:px-8">
        {/* Título abajo a la izquierda. */}
        <div className="relative z-10 pt-28 pb-10 sm:pt-32 lg:absolute lg:bottom-[9%] lg:left-8 lg:max-w-[40rem] lg:p-0">
          <p className="eyebrow entra text-fuego">
            Venta {"//"} <span className="hidden sm:inline">Servicio técnico</span>
            <span className="sm:hidden">Taller</span> {"//"} Repuestos
          </p>
          <h1
            className="titulo entra mt-4 text-[clamp(2rem,10.4vw,3.1rem)] text-white sm:text-7xl lg:text-[4.3rem] xl:text-[4.8rem]"
            style={{ animationDelay: "90ms" }}
          >
            Monopatines
            <span className="barrido mt-1 block text-fuego" style={{ animationDelay: "450ms" }}>
              Río Cuarto
            </span>
          </h1>
          <p className="entra mt-5 max-w-md text-base leading-relaxed text-white/70" style={{ animationDelay: "200ms" }}>
            Equipos eléctricos con {negocio.garantia.toLowerCase()}, {negocio.cuotas} y taller propio. Te asesoramos
            antes y después de comprar.
          </p>
          <div className="entra mt-7 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "300ms" }}>
            <Link
              href="/catalogo"
              className="brillo group inline-flex h-13 items-center justify-center gap-2 bg-fuego px-7 text-sm font-bold tracking-wider text-noche uppercase transition hover:bg-fuego-hover active:scale-[0.97]"
            >
              Ver catálogo <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#taller"
              className="group inline-flex h-13 items-center justify-center gap-2 border border-white/30 px-7 text-sm font-bold tracking-wider text-white uppercase transition hover:border-white hover:bg-white hover:text-noche active:scale-[0.97]"
            >
              <WrenchIcon className="size-4 transition-transform duration-500 group-hover:-rotate-45" /> Llevar al taller
            </Link>
          </div>
        </div>
      </div>

      {/* ---- Móvil y tablet: el monopatín apoyado sobre su panel ---- */}
      <div className="relative z-20 -mb-7 h-[19rem] sm:h-[26rem] lg:hidden">
        <div className="absolute inset-x-0 top-0 bottom-7 overflow-hidden">
          <span className="franja entra-franja left-[18%] w-[24%]" />
          <span className="franja entra-franja left-[50%] w-[4%] bg-white!" style={{ animationDelay: "120ms" }} />
          <span className="franja entra-franja left-[60%] w-[13%]" style={{ animationDelay: "220ms" }} />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-noche/70 to-transparent" />
        </div>
        <Image
          key={p.recorte}
          src={p.recorte}
          alt={`${p.marca} ${p.modelo}`}
          fill
          sizes="(min-width: 640px) 60vw, 90vw"
          priority
          className={`${entrada} object-contain object-bottom px-10 pt-2 sm:px-24`}
        />
      </div>

      {/* Panel blanco del modelo, abajo a la derecha. */}
      <div
        className="entra relative z-10 lg:absolute lg:right-0 lg:bottom-[4%] lg:w-[36%] xl:w-[33%]"
        style={{ animationDelay: "380ms" }}
      >
        <div className="relative overflow-hidden bg-white pt-11 pb-6 pr-5 pl-5 text-tinta lg:pt-6 lg:[clip-path:polygon(11%_0,100%_0,100%_100%,0_100%)] lg:pr-10 lg:pl-[15%]">
          <div className="flex items-start justify-between gap-4">
            <div key={p.slug} className={entrada} style={{ animationDuration: "0.6s" }}>
              <p className="text-[0.65rem] font-bold tracking-[0.2em] text-tinta/45 uppercase">{p.etiqueta}</p>
              <p className="cifra mt-1 text-4xl leading-none">
                <span className="text-fuego"><Texto>{p.marca}</Texto></span> {p.modelo}
              </p>
              <p className="mt-2 text-[0.8rem] text-tinta/60">{p.ficha}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <div className="flex gap-1">
                {([-1, 1] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => cambiar(d)}
                    aria-label={d < 0 ? "Modelo anterior" : "Modelo siguiente"}
                    className="group grid size-9 place-items-center bg-niebla text-tinta/60 transition hover:bg-fuego hover:text-noche active:scale-90"
                  >
                    <ArrowIcon
                      className={`size-4 transition-transform ${d < 0 ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-[0.7rem] font-bold tracking-widest text-tinta/40 tabular-nums">
                <span className="text-tinta">0{actual + 1}</span> / 0{destacados.length}
              </p>
            </div>
          </div>

          <dl key={`d-${p.slug}`} className="mt-4 grid grid-cols-3 border-y border-niebla-2">
            {p.datos.map((d, i) => (
              <div
                key={d.unidad}
                className={`entra py-2.5 ${i ? "border-l border-niebla-2 pl-3" : ""}`}
                style={{ animationDelay: `${80 + i * 70}ms` }}
              >
                <dt className="sr-only">{d.unidad}</dt>
                <dd className="cifra text-xl leading-none">
                  {d.valor} <span className="text-[0.65rem] font-bold tracking-wider text-tinta/45 uppercase">{d.unidad}</span>
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href={`/producto/${p.slug}`}
            className="group mt-4 inline-flex items-center gap-2 text-[0.78rem] font-bold tracking-wider text-fuego-ink uppercase hover:text-fuego"
          >
            Ver ficha completa <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Progreso del avance automático. */}
          <span className="absolute inset-x-0 bottom-0 h-1 bg-niebla" aria-hidden>
            {!sinMovimiento && (
              <span
                key={`p-${actual}`}
                className="block h-full origin-left bg-fuego"
                style={{ animation: `progreso ${INTERVALO}ms linear both`, animationPlayState: pausado ? "paused" : "running" }}
                // El avance automático lo marca la barra: pausada con el mouse encima, sigue donde quedó.
                onAnimationEnd={() => cambiar(1)}
              />
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
