import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowIcon, BatteryIcon, BoltIcon, CardIcon, GaugeIcon, ShieldIcon, WhatsappIcon, WrenchIcon } from "@/components/icons";
import { Pagina } from "@/components/pagina";
import { ProductCarousel } from "@/components/product-carousel";
import { ProductGallery } from "@/components/product-gallery";
import { asset } from "@/lib/base-path";
import { linkWhatsapp, negocio } from "@/lib/business";
import { formatearPrecio, mensajeConsulta, nombreCategoria, productoPorSlug, productos } from "@/lib/catalog";
import { Texto } from "@/components/texto";

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const producto = productoPorSlug(slug);
  if (!producto) return {};
  return {
    title: producto.nombre,
    description: `${producto.resumen} ${producto.categoria === "monopatines" ? "Con garantía y servicio técnico en Río Cuarto." : ""}`.trim(),
    openGraph: producto.imagenes[0] ? { images: [asset(producto.imagenes[0])] } : undefined,
  };
}

/** "ewōl i35" → marca en naranja y modelo en blanco, como "CustomNaked". */
function NombreEnDosColores({ nombre, marca }: { nombre: string; marca: string }) {
  if (nombre.startsWith(marca)) {
    return (
      <>
        <span className="text-fuego"><Texto>{marca}</Texto></span> <Texto>{nombre.slice(marca.length).trim()}</Texto>
      </>
    );
  }
  const [primera, ...resto] = nombre.split(" ");
  return (
    <>
      <span className="text-fuego"><Texto>{primera}</Texto></span> <Texto>{resto.join(" ")}</Texto>
    </>
  );
}

export default async function ProductoPage({ params }: PageProps<"/producto/[slug]">) {
  const { slug } = await params;
  const producto = productoPorSlug(slug);
  if (!producto) notFound();

  const esMonopatin = producto.categoria === "monopatines";
  const relacionados = productos.filter((p) => p.categoria === producto.categoria && p.slug !== producto.slug);
  const wa = linkWhatsapp(negocio.whatsappVentas, mensajeConsulta(producto));

  return (
    <Pagina>
      <section className="relative overflow-hidden bg-noche pt-24 pb-16 lg:pt-28">
        <div className="absolute inset-x-0 top-36 bottom-0 hidden overflow-hidden lg:block">
          <span className="franja left-[6%] w-[16%]" />
          <span className="franja left-[25%] w-[3%] bg-white!" />
          <span className="franja left-[31%] w-[8%]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <nav aria-label="Migas de pan" className="entra text-xs font-semibold tracking-wider text-white/75 uppercase">
            <Link href="/catalogo" className="hover:text-white">
              Catálogo
            </Link>
            <span className="mx-2 text-white/25">{"//"}</span>
            <Link href={`/catalogo?categoria=${producto.categoria}`} className="hover:text-white">
              {nombreCategoria(producto.categoria)}
            </Link>
            <span className="mx-2 text-white/25">{"//"}</span>
            <span className="text-white"><Texto>{producto.nombre}</Texto></span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
              <ProductGallery producto={producto} />
            </div>

            <div className="entra lg:pt-6" style={{ animationDelay: "140ms" }}>
              <p className="eyebrow text-white/50"><Texto>{producto.marca}</Texto></p>
              <h1 className="cifra mt-3 text-5xl leading-none text-white sm:text-6xl">
                <NombreEnDosColores nombre={producto.nombre} marca={producto.marca} />
              </h1>
              <p className="mt-6 leading-relaxed text-white/75"><Texto>{producto.descripcion}</Texto></p>

              {producto.claves && (
                <dl className="mt-8 grid grid-cols-3 gap-px bg-white/10">
                  {[
                    { icon: GaugeIcon, label: "Vel. máxima", valor: producto.claves.velocidad },
                    { icon: BatteryIcon, label: "Autonomía", valor: producto.claves.autonomia },
                    { icon: BoltIcon, label: "Motor", valor: producto.claves.motor },
                  ].map(({ icon: Icon, label, valor }) => (
                    <div key={label} className="group bg-carbon p-3 transition-colors duration-300 hover:bg-grafito sm:p-4">
                      <Icon className="size-5 text-fuego transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
                      <dd className="cifra mt-2 text-lg whitespace-nowrap text-white sm:text-2xl">{valor}</dd>
                      <dt className="text-[0.68rem] font-semibold tracking-wider text-humo uppercase">{label}</dt>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-8 bg-white p-6 text-tinta">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-2xl font-extrabold">{producto.precio ? formatearPrecio(producto.precio) : "Consultá precio"}</p>
                  {esMonopatin && <p className="text-xs font-bold tracking-wider text-fuego-ink uppercase">{negocio.cuotas}</p>}
                </div>
                <p className="mt-1 text-sm text-tinta/60">
                  {esMonopatin ? "Te confirmamos stock y colores." : "Te confirmamos stock y compatibilidad con tu equipo."}
                </p>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener"
                  className="brillo group mt-5 flex h-13 items-center justify-center gap-2 bg-fuego text-sm font-bold tracking-wider text-noche uppercase transition hover:bg-fuego-hover active:scale-[0.98]"
                >
                  <WhatsappIcon className="size-5" />
                  Consultar por WhatsApp
                </a>
                {esMonopatin && (
                  <ul className="mt-5 grid gap-2.5 border-t border-niebla-2 pt-5 text-sm text-tinta/75">
                    <li className="flex gap-3">
                      <ShieldIcon className="size-5 shrink-0 text-fuego-ink" />
                      {negocio.garantia}, según el equipo.
                    </li>
                    <li className="flex gap-3">
                      <WrenchIcon className="size-5 shrink-0 text-fuego-ink" />
                      Servicio técnico propio en Río Cuarto.
                    </li>
                    <li className="flex gap-3">
                      <CardIcon className="size-5 shrink-0 text-fuego-ink" />
                      Asesoramiento antes y después de la compra.
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-niebla text-tinta">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-20">
          <div>
            <p className="eyebrow text-fuego-ink">Especificaciones</p>
            <h2 className="titulo mt-3 text-4xl">
              Ficha técnica
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-tinta/60">
              {producto.fichaAConfirmar
                ? "Datos de referencia publicados por distribuidores. Confirmalos con nosotros antes de comprar."
                : "Datos del fabricante. La autonomía real depende del peso, el modo de manejo y el terreno."}
            </p>
          </div>
          <dl className="border-l-4 border-fuego bg-white">
            {producto.specs.map((s, i) => (
              <div key={s.label} className={`grid transition-colors hover:bg-fuego/10 grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-4 px-5 py-3.5 sm:px-6 ${i % 2 ? "bg-niebla/60" : ""}`}>
                <dt className="text-xs font-semibold tracking-wider text-tinta/55 uppercase">{s.label}</dt>
                <dd className="text-sm font-bold"><Texto>{s.valor}</Texto></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="fondo-grafito py-20">
          <div className="text-center">
            <p className="eyebrow text-fuego">{nombreCategoria(producto.categoria)}</p>
            <h2 className="titulo mt-3 text-4xl text-white">
              También te puede interesar
            </h2>
          </div>
          <div className="mx-auto mt-14 max-w-7xl px-3 sm:px-5 lg:px-8">
            <ProductCarousel productos={relacionados} />
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/catalogo?categoria=${producto.categoria}`}
              className="inline-flex items-center gap-2 text-sm font-bold tracking-wider text-white uppercase hover:text-fuego"
            >
              Ver todos <ArrowIcon className="size-4" />
            </Link>
          </div>
        </section>
      )}
    </Pagina>
  );
}
