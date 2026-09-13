import Image from "next/image";
import Link from "next/link";

import { Hero } from "@/components/hero";
import { Pagina } from "@/components/pagina";
import { ArrowIcon, CardIcon, InstagramIcon, PlusIcon, ShieldIcon, WhatsappIcon, WrenchIcon } from "@/components/icons";
import { ProductCarousel } from "@/components/product-carousel";
import { Reveal } from "@/components/reveal";
import { Taller } from "@/components/taller";
import { Texto } from "@/components/texto";
import { formatearTelefono, linkInstagram, linkWhatsapp, negocio } from "@/lib/business";
import { productos, productosDe, usos } from "@/lib/catalog";

const monopatines = productosDe("monopatines");
const complementos = [...productosDe("accesorios"), ...productosDe("repuestos")].filter((p) => p.imagenes.length);

const confianza = [
  { icon: ShieldIcon, titulo: negocio.garantia, texto: "Según el equipo" },
  { icon: CardIcon, titulo: negocio.cuotas, texto: "Y distintas formas de pago" },
  { icon: WrenchIcon, titulo: "Taller propio", texto: "Reparaciones y upgrades" },
  { icon: PlusIcon, titulo: "Repuestos y accesorios", texto: "Cubiertas, frenos, cascos" },
];

const preguntas = [
  {
    p: "¿Qué garantía tienen los monopatines?",
    r: "Tenemos equipos con hasta 2 años de garantía; el plazo depende de la marca y el modelo. Además, al tener taller propio, cualquier problema lo resolvemos acá, sin mandar el equipo a otra ciudad.",
  },
  {
    p: "¿Puedo pagar en cuotas?",
    r: "Sí. Contamos con distintas formas de pago y 6 cuotas sin interés. Escribinos por WhatsApp y te pasamos las opciones vigentes para el equipo que te interesa.",
  },
  {
    p: "¿Se pueden usar cuando llueve?",
    r: "Los ewōl i25 e i35 tienen certificación IPX5: aguantan salpicaduras y lluvia. No significa que se puedan sumergir ni lavar con hidrolavadora. Otros modelos, como el ewōl R o el MINI, no son resistentes al agua.",
  },
  {
    p: "¿Arreglan monopatines comprados en otro lado?",
    r: "Escribinos al WhatsApp del taller con la marca, el modelo y qué le pasa, y te decimos si lo podemos atender y cómo seguimos.",
  },
  {
    p: "¿Por qué el servicio técnico no es el más barato?",
    r: "Podríamos bajar el precio, pero implicaría dejar de usar insumos de calidad. Preferimos que tu monopatín salga del taller bien y no tengas que volver a la semana.",
  },
  {
    p: "¿Cómo sé qué monopatín me conviene?",
    r: "Depende de cuántos kilómetros hacés por día, tu peso, si lo tenés que subir por escaleras y por dónde andás. Vení al local o escribinos y te asesoramos sin compromiso.",
  },
];

function Encabezado({ eyebrow, titulo, bajada, claro }: { eyebrow: string; titulo: string; bajada?: string; claro?: boolean }) {
  return (
    <Reveal className="text-center">
      <p className={`eyebrow ${claro ? "text-fuego-ink" : "text-fuego"}`}>{eyebrow}</p>
      <h2 className={`titulo mt-3 text-4xl sm:text-5xl ${claro ? "text-tinta" : "text-white"}`}>
        {titulo}
      </h2>
      {bajada && <p className={`mx-auto mt-4 max-w-xl text-base leading-relaxed ${claro ? "text-tinta/70" : "text-white/75"}`}>{bajada}</p>}
    </Reveal>
  );
}

export default function HomePage() {
  return (
    <Pagina>
      <Hero />

      {/* ================= CONFIANZA ================= */}
      <section className="relative bg-fuego text-noche">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {confianza.map(({ icon: Icon, titulo, texto }, i) => (
            <Reveal
              key={titulo}
              delay={i * 80}
              className={`group flex items-center gap-3 px-5 py-5 lg:px-8 ${i % 2 ? "" : "border-r border-noche/15"} ${i < 2 ? "border-b border-noche/15 lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}
            >
              <Icon className="size-7 shrink-0 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
              <div>
                <p className="text-[0.8rem] leading-tight font-extrabold uppercase sm:text-sm">{titulo}</p>
                <p className="text-xs text-noche/70">{texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= NUEVOS INGRESOS ================= */}
      <section className="fondo-grafito relative overflow-hidden py-20 lg:py-24">
        <Encabezado
          eyebrow="Nuevos ingresos"
          titulo="Monopatines destacados"
          bajada="Elegí tu equipo. Te asesoramos, tiene garantía y lo atendemos en nuestro taller."
        />
        <div className="mx-auto mt-14 max-w-7xl px-3 sm:px-5 lg:px-8">
          <ProductCarousel productos={monopatines} />
        </div>
        <div className="mt-8 text-center">
          <Link href="/catalogo" className="group inline-flex items-center gap-2 text-sm font-bold tracking-wider text-white uppercase hover:text-fuego">
            Ver todo el catálogo <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ================= POR USO ================= */}
      <section className="bg-niebla text-tinta">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <Encabezado eyebrow="Encontrá el tuyo" titulo="¿Para qué lo vas a usar?" claro />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {usos.map((u, i) => {
              const cantidad = productos.filter((p) => p.uso?.includes(u.id)).length;
              return (
                <Reveal key={u.id} delay={i * 90}>
                  <Link
                    href={`/catalogo?categoria=monopatines&uso=${u.id}`}
                    className="esquina group relative flex h-full items-center gap-5 overflow-hidden bg-white p-5 pl-7 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-1 hover:bg-tinta hover:text-white active:scale-[0.98] md:flex-col md:items-start md:gap-0 md:p-7 md:pl-8"
                  >
                    <span className="absolute top-0 left-0 h-full w-1.5 bg-fuego transition-all group-hover:w-2.5" />
                    <span className="cifra w-16 shrink-0 text-5xl leading-none text-fuego/35 md:w-auto transition duration-500 group-hover:text-fuego md:text-7xl">0{i + 1}</span>
                    <span className="flex-1 md:mt-6">
                      <span className="cifra block text-xl leading-tight uppercase md:text-2xl">{u.nombre}</span>
                      <span className="mt-1 block text-sm text-tinta/70 group-hover:text-white/75 md:mt-2">{u.bajada}</span>
                      <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-fuego-ink uppercase group-hover:text-fuego md:mt-6">
                        Ver {cantidad} modelos <ArrowIcon className="size-4 transition group-hover:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= TRÍPTICO ================= */}
      <section className="relative grid bg-noche md:h-[26rem] md:grid-cols-[1fr_1.15fr_1fr]">
        <Reveal className="relative hidden overflow-hidden md:block">
          <Image src="/instagram/pirulo.webp" alt="Clientes de visita en el taller" fill sizes="33vw" className="ken-burns object-cover grayscale-[35%]" />
          <div className="absolute inset-0 bg-noche/35" />
        </Reveal>
        <Reveal variante="cortina" className="relative z-10 flex flex-col justify-center bg-fuego px-8 py-14 text-noche md:-mx-12 md:[clip-path:polygon(9%_0,100%_0,91%_100%,0_100%)] md:px-[14%]">
          <h2 className="titulo text-3xl text-white sm:text-4xl">
            El monopatín te puede fallar.
            <span className="acento block text-noche">Nosotros no.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed font-medium text-noche/85">
            Vender monopatines lo puede hacer cualquiera; lo que
            casi nadie te da es asesoramiento después de la compra y un servicio técnico que responda. Nuestra atención
            no termina cuando te vas del local.
          </p>
        </Reveal>
        <Reveal className="relative h-64 overflow-hidden md:h-auto" delay={150}>
          <Image src="/instagram/ewol-i35.webp" alt="ewōl i35 en la puerta del local" fill sizes="(min-width: 768px) 33vw, 100vw" className="ken-burns object-cover grayscale-[35%]" />
          <div className="absolute inset-0 bg-noche/25" />
        </Reveal>
      </section>

      <Taller />

      {/* ================= REPUESTOS Y ACCESORIOS ================= */}
      <section className="fondo-grafito relative overflow-hidden py-20 lg:py-24">
        <Encabezado
          eyebrow="Repuestos y accesorios"
          titulo="Todo para tu monopatín"
          bajada="Cubiertas, frenos, baterías y accesorios. Te confirmamos compatibilidad con tu equipo."
        />
        <div className="mx-auto mt-14 max-w-7xl px-3 sm:px-5 lg:px-8">
          <ProductCarousel productos={complementos} />
        </div>
        <div className="mt-8 flex justify-center gap-6">
          <Link href="/catalogo?categoria=repuestos" className="group inline-flex items-center gap-2 text-sm font-bold tracking-wider text-white uppercase hover:text-fuego">
            Repuestos <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/catalogo?categoria=accesorios" className="group inline-flex items-center gap-2 text-sm font-bold tracking-wider text-white uppercase hover:text-fuego">
            Accesorios <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ================= COMUNIDAD ================= */}
      <section className="bg-noche py-20 lg:py-24">
        <Encabezado eyebrow={`@${negocio.instagram}`} titulo={`${negocio.seguidores} riders`} bajada="Ya andan con nosotros. Seguinos para ver ingresos, promos y el día a día del taller." />
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-2 px-5 sm:gap-3 lg:grid-cols-4 lg:px-8">
          {[
            { src: "/instagram/rural.webp", alt: "Recorriendo la Rural en monopatín" },
            { src: "/instagram/pirulo.webp", alt: "Pirulo de visita en el taller" },
            { src: "/instagram/ewol-i25.webp", alt: "ewōl i25 en la puerta del local" },
            { src: "/instagram/garantia2.webp", alt: "Hasta 2 años de garantía" },
          ].map((f, i) => (
            <Reveal key={f.src} delay={i * 90} variante="escala">
              <a href={linkInstagram} target="_blank" rel="noopener" className="group relative block aspect-[4/5] overflow-hidden">
                <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 24vw, 48vw" className="object-cover transition duration-700 group-hover:scale-110 group-hover:grayscale" />
                <div className="absolute inset-0 grid place-items-center bg-fuego/80 opacity-0 transition duration-300 group-hover:opacity-100">
                  <InstagramIcon className="size-9 scale-50 text-noche transition-transform duration-300 group-hover:scale-100" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={linkInstagram}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center gap-2 border border-white/30 px-6 text-sm font-bold tracking-wider text-white uppercase transition hover:border-fuego hover:bg-fuego hover:text-noche active:scale-[0.97]"
          >
            <InstagramIcon className="size-5" /> Seguinos en Instagram
          </a>
        </div>
      </section>

      {/* ================= PREGUNTAS ================= */}
      <section id="preguntas" className="bg-niebla text-tinta">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24">
          <Reveal>
            <p className="eyebrow text-fuego-ink">Preguntas frecuentes</p>
            <h2 className="titulo mt-3 text-4xl sm:text-5xl">
              Antes de <span className="block">comprar</span>
            </h2>
            <p className="mt-5 max-w-sm text-tinta/65">¿No encontrás tu respuesta? Escribinos y te asesoramos sin compromiso.</p>
          </Reveal>
          <div className="space-y-2">
            {preguntas.map((f, i) => (
              <Reveal key={f.p} delay={i * 60}>
                <details className="suave group bg-white transition-shadow duration-300 open:shadow-lg hover:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold transition-colors group-open:text-fuego-ink hover:text-fuego-ink [&::-webkit-details-marker]:hidden">
                    {f.p}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-fuego text-white transition-transform duration-300 group-open:rotate-[135deg] group-hover:scale-110">
                      <PlusIcon className="size-4" />
                    </span>
                  </summary>
                  <p className="border-l-4 border-fuego px-5 pb-5 leading-relaxed text-tinta/70"><Texto>{f.r}</Texto></p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACTO ================= */}
      <section id="contacto" className="relative grid overflow-hidden bg-carbon lg:grid-cols-2">
        <Reveal variante="cortina" className="relative bg-fuego px-5 py-16 text-noche lg:py-24 lg:pr-24 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:[clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]">
          <p className="eyebrow text-noche/70">Contacto</p>
          <h2 className="titulo mt-3 text-4xl text-white sm:text-6xl">
            Ya sabés,
            <span className="block">vení a Monopatines Río Cuarto</span>
          </h2>
          <p className="mt-5 max-w-md font-medium text-noche/80">
            {negocio.direccion ?? `${negocio.ciudad}, ${negocio.provincia}`}
            {negocio.horarios && ` · ${negocio.horarios}`}. Escribinos al WhatsApp que corresponda y te respondemos a la
            brevedad.
          </p>
        </Reveal>
        <div className="flex flex-col justify-center gap-3 px-5 py-14 lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pl-4">
          {[
            { titulo: "Ventas", bajada: "Monopatines, repuestos y accesorios", numero: negocio.whatsappVentas, mensaje: "Hola! Quiero consultar por un monopatín." },
            { titulo: "Taller", bajada: "Reparaciones y service", numero: negocio.whatsappTaller, mensaje: "Hola! Quiero consultar por una reparación." },
          ].map((c, i) => (
            <Reveal key={c.titulo} variante="derecha" delay={200 + i * 120}>
              <a
                href={linkWhatsapp(c.numero, c.mensaje)}
                target="_blank"
                rel="noopener"
                className="group flex items-center gap-4 border-l-4 border-fuego bg-grafito p-5 transition-all duration-300 hover:translate-x-1 hover:border-l-8 hover:bg-linea active:scale-[0.98]"
              >
                <span className="grid size-12 shrink-0 place-items-center bg-whatsapp text-noche transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <WhatsappIcon className="size-6" />
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-extrabold tracking-wide text-white uppercase">{c.titulo}</span>
                  <span className="block text-sm text-humo">{c.bajada}</span>
                  <span className="mt-1 block font-bold text-white sm:hidden">{formatearTelefono(c.numero)}</span>
                </span>
                <span className="hidden text-right font-bold text-white sm:block">{formatearTelefono(c.numero)}</span>
                <ArrowIcon className="size-5 text-white/60 transition group-hover:translate-x-1 group-hover:text-fuego" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </Pagina>
  );
}
