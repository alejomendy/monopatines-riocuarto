"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { SearchIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { Texto } from "@/components/texto";
import { type Categoria, type Uso, categorias, productos, usos } from "@/lib/catalog";

const ordenes = [
  { id: "destacados", nombre: "Destacados" },
  { id: "velocidad", nombre: "Más velocidad" },
  { id: "autonomia", nombre: "Más autonomía" },
  { id: "nombre", nombre: "Nombre A-Z" },
] as const;

type Orden = (typeof ordenes)[number]["id"];

/**
 * Grilla filtrable. Los filtros viven en la URL para que se puedan compartir
 * por WhatsApp y para que el botón "atrás" vuelva al mismo listado.
 */
export function CatalogBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoria = (categorias.some((c) => c.id === params.get("categoria")) ? params.get("categoria") : "monopatines") as Categoria;
  const uso = usos.some((u) => u.id === params.get("uso")) ? (params.get("uso") as Uso) : null;
  const marca = params.get("marca");
  const orden = (ordenes.some((o) => o.id === params.get("orden")) ? params.get("orden") : "destacados") as Orden;
  const [q, setQ] = useState(params.get("q") ?? "");

  function actualizar(cambios: Record<string, string | null>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(cambios)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }

  const deCategoria = productos.filter((p) => p.categoria === categoria);
  const marcas = [...new Set(deCategoria.map((p) => p.marca))];

  const lista = (() => {
    const texto = q.trim().toLowerCase();
    const filtrada = deCategoria.filter(
      (p) =>
        (!uso || p.uso?.includes(uso)) &&
        (!marca || p.marca === marca) &&
        (!texto || `${p.nombre} ${p.marca} ${p.resumen}`.toLowerCase().includes(texto)),
    );
    const ordenada = [...filtrada];
    if (orden === "destacados") ordenada.sort((a, b) => Number(!!b.destacado) - Number(!!a.destacado));
    if (orden === "velocidad") ordenada.sort((a, b) => (b.claves?.velocidadKmh ?? 0) - (a.claves?.velocidadKmh ?? 0));
    if (orden === "autonomia") ordenada.sort((a, b) => (b.claves?.autonomiaKm ?? 0) - (a.claves?.autonomiaKm ?? 0));
    if (orden === "nombre") ordenada.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    return ordenada;
  })();

  const chip = (activo: boolean) =>
    `border px-3.5 py-2 text-[0.8rem] font-semibold tracking-wide uppercase transition duration-200 active:scale-95 ${
      activo ? "border-fuego bg-fuego text-noche" : "border-white/15 text-white/75 hover:border-white/50 hover:text-white"
    }`;

  return (
    <div>
      {/* Categorías */}
      <div role="tablist" aria-label="Categorías" className="flex gap-1 overflow-x-auto border-b border-white/10">
        {categorias.map((c) => {
          const activa = c.id === categoria;
          const cantidad = productos.filter((p) => p.categoria === c.id).length;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={activa}
              onClick={() => {
                setQ("");
                actualizar({ categoria: c.id, uso: null, marca: null, q: null });
              }}
              className={`relative shrink-0 px-5 py-4 text-left text-sm font-extrabold tracking-wider uppercase transition ${
                activa ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              <span className="block font-bold">
                {c.nombre} <span className={activa ? "text-fuego" : "text-white/35"}>{cantidad}</span>
              </span>
              <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-fuego transition-transform duration-500 ease-[var(--ease-salida)] ${activa ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          );
        })}
      </div>

      {/* Filtros */}
      <div className="mt-6 flex flex-col gap-4 bg-noche/60 p-4 sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Buscar</span>
            <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-humo" />
            <input
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                actualizar({ q: e.target.value || null });
              }}
              placeholder="Buscar por modelo o marca"
              className="w-full border border-white/15 bg-noche py-3 pr-4 pl-12 text-white placeholder:text-white/35 outline-none focus:border-fuego focus:ring-2 focus:ring-fuego/30"
            />
          </label>
          <label className="flex items-center gap-3 text-sm text-humo">
            Ordenar
            <select
              value={orden}
              onChange={(e) => actualizar({ orden: e.target.value === "destacados" ? null : e.target.value })}
              className="border border-white/15 bg-noche px-4 py-3 text-white outline-none focus:border-fuego"
            >
              {ordenes
                .filter((o) => categoria === "monopatines" || (o.id !== "velocidad" && o.id !== "autonomia"))
                .map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.nombre}
                  </option>
                ))}
            </select>
          </label>
        </div>

        {categoria === "monopatines" && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-2 text-white/45">Uso</span>
            <button className={chip(!uso)} onClick={() => actualizar({ uso: null })}>
              Todos
            </button>
            {usos.map((u) => (
              <button key={u.id} className={chip(uso === u.id)} onClick={() => actualizar({ uso: uso === u.id ? null : u.id })}>
                {u.nombre}
              </button>
            ))}
          </div>
        )}

        {marcas.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-2 text-white/45">Marca</span>
            <button className={chip(!marca)} onClick={() => actualizar({ marca: null })}>
              Todas
            </button>
            {marcas.map((m) => (
              <button key={m} className={chip(marca === m)} onClick={() => actualizar({ marca: marca === m ? null : m })}>
                <Texto>{m}</Texto>
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-xs font-semibold tracking-widest text-white/70 uppercase" aria-live="polite">
        {lista.length} {lista.length === 1 ? "producto" : "productos"}
      </p>

      {lista.length ? (
        <div className="mt-5 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((p, i) => (
            // La clave incluye los filtros: al cambiarlos, las tarjetas vuelven a entrar escalonadas.
            <div key={`${p.slug}-${categoria}-${uso}-${marca}-${orden}`} className="entra" style={{ animationDelay: `${Math.min(i, 8) * 55}ms` }}>
              <ProductCard producto={p} priority={i < 3} morph />
            </div>
          ))}
        </div>
      ) : (
        <div className="entra mt-4 border border-dashed border-white/20 p-12 text-center">
          <p className="text-lg font-bold text-white">No encontramos productos con esos filtros.</p>
          <button
            onClick={() => {
              setQ("");
              actualizar({ uso: null, marca: null, q: null });
            }}
            className="mt-4 bg-fuego px-5 py-2.5 text-sm font-bold tracking-wider text-noche uppercase"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
