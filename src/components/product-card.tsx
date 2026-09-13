import Link from "next/link";
import { ViewTransition } from "react";

import { ArrowIcon, BatteryIcon, BoltIcon, GaugeIcon } from "@/components/icons";
import { ProductImage } from "@/components/product-image";
import { Texto } from "@/components/texto";
import { type Producto, formatearPrecio, nombreCategoria } from "@/lib/catalog";
import { negocio } from "@/lib/business";

/**
 * Tarjeta de producto. Orden de lectura: foto → nombre → datos clave → precio
 * y acción. La acción queda siempre visible (en celular no hay hover).
 * `morph` conecta la foto con la de la ficha al navegar (View Transitions):
 * solo se activa donde la tarjeta aparece una única vez en la página.
 */
export function ProductCard({ producto, priority, morph }: { producto: Producto; priority?: boolean; morph?: boolean }) {
  const { claves } = producto;
  const esMonopatin = producto.categoria === "monopatines";

  const imagen = (
    <ProductImage
      producto={producto}
      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
      priority={priority}
      className="aspect-[4/3]"
    />
  );

  return (
    <Link
      href={`/producto/${producto.slug}`}
      className="group @container relative flex h-full flex-col overflow-hidden bg-white text-tinta shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)] ring-1 ring-black/5 transition duration-300 ease-[var(--ease-salida)] hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-28px_rgba(0,0,0,0.85)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-fuego active:translate-y-0 active:scale-[0.99]"
    >
      <div className="relative">
        {morph ? (
          <ViewTransition name={`producto-${producto.slug}`} share="morph" default="none">
            {imagen}
          </ViewTransition>
        ) : (
          imagen
        )}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          {producto.etiqueta ? (
            <span className="whitespace-nowrap bg-fuego px-2.5 py-1 text-[0.68rem] font-bold tracking-wider text-noche uppercase shadow-sm">
              {producto.etiqueta}
            </span>
          ) : (
            <span />
          )}
          <span className="whitespace-nowrap bg-noche/85 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm">
            <Texto>{producto.marca}</Texto>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 @[19rem]:p-5">
        <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-fuego-ink uppercase">{nombreCategoria(producto.categoria)}</p>
        <h3 className="cifra mt-1 text-[1.35rem] leading-[1.05] @[19rem]:text-[1.6rem] text-tinta transition-colors group-hover:text-fuego-ink">
          <Texto>{producto.nombre}</Texto>
        </h3>

        {claves ? (
          <dl className="mt-4 grid grid-cols-3 divide-x divide-tinta/10 border-y border-tinta/10">
            {[
              { icon: GaugeIcon, label: "Velocidad", valor: claves.velocidad },
              { icon: BatteryIcon, label: "Autonomía", valor: claves.autonomia },
              { icon: BoltIcon, label: "Motor", valor: claves.motor },
            ].map(({ icon: Icon, label, valor }) => (
              <div key={label} className="flex min-w-0 flex-col gap-0.5 px-2 py-2.5 first:pl-0 @[19rem]:px-2.5">
                <dt className="flex items-center gap-1 text-[0.62rem] font-semibold tracking-wider text-tinta/55 uppercase">
                  <Icon className="hidden size-3.5 text-fuego-ink @[21rem]:block" />
                  {label}
                </dt>
                <dd className="cifra text-[0.95rem] leading-none whitespace-nowrap text-tinta @[19rem]:text-base">{valor}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-2 line-clamp-2 text-sm leading-snug text-tinta/70">
            <Texto>{producto.resumen}</Texto>
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-lg leading-none font-bold text-tinta">
              {producto.precio ? formatearPrecio(producto.precio) : "Consultá precio"}
            </p>
            <p className="mt-1 text-xs text-tinta/60">{esMonopatin ? negocio.cuotas : "Te confirmamos compatibilidad"}</p>
          </div>
          <span className="inline-flex h-10 shrink-0 items-center gap-1.5 bg-tinta px-3.5 text-[0.72rem] font-bold tracking-wider text-white uppercase transition-colors duration-300 group-hover:bg-fuego group-hover:text-noche">
            Ver ficha
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      {/* Línea naranja que barre la base al pasar el mouse. */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-fuego transition-transform duration-500 ease-[var(--ease-salida)] group-hover:scale-x-100"
      />
    </Link>
  );
}
