"use client";

import { useRef, useState } from "react";

import { ArrowIcon, WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { formatearTelefono, linkWhatsapp, negocio } from "@/lib/business";

const servicios = [
  { problema: "Pinchadura o cubierta", titulo: "Cubiertas y cámaras", texto: "Pinchaduras, cambio de cubiertas y cámaras." },
  { problema: "Tubelizado", titulo: "Tubelizado", texto: "Paso a tubeless con líquido sellador de primera. El que vos te merecés." },
  { problema: "Frenos", titulo: "Frenos", texto: "Pastillas, discos, cálipers y regulación." },
  { problema: "No enciende / batería", titulo: "Batería y carga", texto: "No enciende, no carga o la batería dura poco." },
  { problema: "Electrónica o pierde potencia", titulo: "Electrónica", texto: "Controladora, display, luces, encendido NFC y pérdida de potencia." },
  { problema: "Service general", titulo: "Service general", texto: "Ruidos, juego en el plegado, ajustes y puesta a punto." },
];

const problemas = [...servicios.map((s) => s.problema), "Otro"];

const pasos = ["Contanos qué le pasa", "Te respondemos por WhatsApp", "Coordinamos cuándo traerlo"];

/**
 * Sección del taller: la lista de servicios y la orden de taller comparten
 * estado. Elegir un servicio lo marca en la orden, que arma el mensaje para el
 * WhatsApp del taller. No guarda nada.
 */
export function Taller() {
  const [problema, setProblema] = useState(problemas[0]);
  const [modelo, setModelo] = useState("");
  const [detalle, setDetalle] = useState("");
  const [destello, setDestello] = useState(0);
  const orden = useRef<HTMLFormElement>(null);
  const campoModelo = useRef<HTMLInputElement>(null);

  function elegir(p: string) {
    setProblema(p);
    setDestello((n) => n + 1);
    // En pantallas chicas la orden queda abajo: se lleva al usuario hasta ella.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      orden.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    campoModelo.current?.focus({ preventScroll: true });
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const lineas = [
      "Hola! Quiero consultar por una reparación.",
      `Monopatín: ${modelo.trim() || "sin especificar"}`,
      `Problema: ${problema}`,
      detalle.trim() && `Detalle: ${detalle.trim()}`,
    ].filter(Boolean);
    window.open(linkWhatsapp(negocio.whatsappTaller, lineas.join("\n")), "_blank", "noopener");
  }

  const campo =
    "w-full border-0 border-b-2 border-niebla-2 bg-transparent px-0 py-2.5 text-[0.95rem] font-medium text-tinta placeholder:font-normal placeholder:text-tinta/35 outline-none transition-colors focus:border-fuego";

  return (
    <section id="taller" className="relative overflow-hidden bg-carbon">
      {/* Una sola franja, detrás de la orden. */}
      <Reveal variante="derecha" className="pointer-events-none absolute top-[46%] right-0 bottom-0 hidden w-[40%] overflow-hidden lg:block">
        <span className="franja left-[46%] w-[26%]" />
        <span className="franja left-[76%] w-[5%] bg-white!" />
      </Reveal>

      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        {/* Encabezado: título, manifiesto y cómo funciona. */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-fuego">Servicio técnico {"//"} Taller propio</p>
            <h2 className="titulo mt-4 text-[2.6rem] text-white sm:text-6xl xl:text-[4.1rem]">
              Nuestro servicio
              <span className="acento block text-fuego">no es barato.</span>
            </h2>
          </Reveal>
          <Reveal className="self-end lg:col-span-5 lg:pb-2" delay={120}>
            <p className="text-lg leading-relaxed font-medium text-white">
              Podríamos bajar el precio, pero implicaría dejar de usar insumos de excelente calidad.
            </p>
            <p className="mt-3 leading-relaxed text-white/60">
              Si buscás el service más barato, no vengas. Si querés que tu monopatín quede bien, te esperamos.
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <ol className="mt-12 grid border-y border-white/10 sm:grid-cols-3">
            {pasos.map((paso, i) => (
              <li
                key={paso}
                className={`flex items-center gap-4 py-5 ${i ? "border-t border-white/10 sm:border-t-0 sm:border-l sm:pl-6" : ""}`}
              >
                <span className="grid size-9 shrink-0 place-items-center bg-white text-sm font-extrabold text-noche">{i + 1}</span>
                <span className="text-sm font-bold tracking-wide text-white uppercase">{paso}</span>
                {i < pasos.length - 1 && <ArrowIcon className="ml-auto hidden size-4 text-white/25 sm:mr-6 sm:block" />}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Servicios: filas numeradas que se pueden elegir. */}
          <div className="lg:col-span-7">
            <Reveal className="flex items-end justify-between gap-4">
              <h3 className="text-sm font-extrabold tracking-[0.18em] text-white/70 uppercase">¿Qué necesita tu monopatín?</h3>
              <p className="hidden text-xs text-white/60 sm:block">Tocá uno y lo sumamos a la orden</p>
            </Reveal>
            <ul className="mt-5 border-t border-white/10">
              {servicios.map((s, i) => {
                const activo = problema === s.problema;
                return (
                  <Reveal as="li" key={s.titulo} delay={i * 60} variante="izquierda">
                    <button
                      type="button"
                      onClick={() => elegir(s.problema)}
                      aria-pressed={activo}
                      className={`group relative grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-4 overflow-hidden border-b border-white/10 py-5 pr-4 text-left transition-colors sm:grid-cols-[4.5rem_1fr_auto] ${
                        activo ? "text-noche" : "text-white"
                      }`}
                    >
                      {/* Relleno naranja que barre la fila. */}
                      <span
                        aria-hidden
                        className={`absolute inset-0 origin-left bg-fuego transition-transform duration-500 ease-[var(--ease-salida)] ${
                          activo ? "scale-x-100" : "scale-x-0 group-hover:scale-x-[0.012]"
                        }`}
                      />
                      <span
                        className={`cifra relative pl-3 text-3xl tabular-nums transition-colors sm:text-4xl ${
                          activo ? "text-noche" : "text-white/30 group-hover:text-fuego"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="relative">
                        <span className="block text-base font-extrabold tracking-wide uppercase sm:text-lg">{s.titulo}</span>
                        <span className={`mt-0.5 block text-sm leading-snug ${activo ? "text-noche/80" : "text-white/70"}`}>{s.texto}</span>
                      </span>
                      <span
                        className={`relative grid size-9 place-items-center transition-all duration-300 ${
                          activo
                            ? "bg-noche text-fuego"
                            : "border border-white/25 text-white/60 group-hover:border-fuego group-hover:text-fuego"
                        }`}
                      >
                        {activo ? (
                          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                            <path d="m5 12 5 5L20 7" />
                          </svg>
                        ) : (
                          <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                        )}
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* Orden de taller. */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start" variante="escala" delay={120}>
            <form ref={orden} onSubmit={enviar} className="scroll-mt-24 bg-white text-tinta shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between bg-noche px-6 py-4 text-white">
                <p className="text-sm font-extrabold tracking-[0.16em] uppercase">
                  Orden <span className="text-fuego">de taller</span>
                </p>
                <span className="flex gap-1" aria-hidden>
                  <span className="h-4 w-1.5 -skew-x-[24deg] bg-fuego" />
                  <span className="h-4 w-1.5 -skew-x-[24deg] bg-white" />
                  <span className="h-4 w-1.5 -skew-x-[24deg] bg-fuego" />
                </span>
              </div>

              <div className="space-y-6 p-6 sm:p-7">
                <label className="block">
                  <span className="flex items-baseline gap-2 text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
                    <span className="text-fuego-ink">01</span> Tu monopatín
                  </span>
                  <input
                    ref={campoModelo}
                    className={campo}
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    placeholder="Marca y modelo. Ej.: Xiaomi Pro 2"
                  />
                </label>

                <fieldset>
                  <legend className="flex items-baseline gap-2 text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
                    <span className="text-fuego-ink">02</span> Qué le pasa
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {problemas.map((p) => {
                      const activo = problema === p;
                      return (
                        <button
                          key={activo ? `${p}-${destello}` : p}
                          type="button"
                          onClick={() => setProblema(p)}
                          aria-pressed={activo}
                          className={`px-3 py-2 text-[0.8rem] transition-all duration-200 active:scale-95 ${
                            activo ? "entra bg-fuego font-bold text-noche" : "bg-niebla text-tinta/70 hover:bg-niebla-2 hover:text-tinta"
                          }`}
                          style={activo ? { animationDuration: "0.4s" } : undefined}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="flex items-baseline gap-2 text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
                    <span className="text-fuego-ink">03</span> Detalle <span className="font-medium tracking-normal normal-case text-tinta/45">(opcional)</span>
                  </span>
                  <textarea
                    className={`${campo} min-h-20 resize-none`}
                    value={detalle}
                    onChange={(e) => setDetalle(e.target.value)}
                    placeholder="Desde cuándo pasa, si tuvo un golpe…"
                  />
                </label>

                <button
                  type="submit"
                  className="brillo group flex h-14 w-full items-center justify-center gap-2.5 bg-fuego text-sm font-extrabold tracking-wider text-noche uppercase transition hover:bg-fuego-hover active:scale-[0.98]"
                >
                  <WhatsappIcon className="size-5" />
                  Enviar al taller
                  <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <a
                href={linkWhatsapp(negocio.whatsappTaller, "Hola! Quiero consultar por una reparación.")}
                target="_blank"
                rel="noopener"
                className="group flex items-center justify-between gap-3 border-t border-niebla-2 bg-niebla px-6 py-4 text-sm transition-colors hover:bg-niebla-2"
              >
                <span className="text-tinta/60">¿Preferís escribir directo?</span>
                <span className="flex items-center gap-2 font-extrabold">
                  <WhatsappIcon className="size-4 text-whatsapp" />
                  {formatearTelefono(negocio.whatsappTaller)}
                </span>
              </a>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
