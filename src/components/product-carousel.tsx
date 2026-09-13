"use client";

import { useEffect, useRef, useState } from "react";

import { ProductCard } from "@/components/product-card";
import type { Producto } from "@/lib/catalog";
import { useSinMovimiento } from "@/lib/use-sin-movimiento";

const INTERVALO = 5500;

/**
 * Carrusel con la tarjeta del centro al frente y las vecinas atrás, como el
 * de accesorios de la referencia. Avanza solo mientras está en pantalla y
 * nadie lo está usando; en celular muestra una sola tarjeta y se desliza.
 */
export function ProductCarousel({ productos }: { productos: Producto[] }) {
  const [actual, setActual] = useState(0);
  const [direccion, setDireccion] = useState<1 | -1>(1);
  const [enUso, setEnUso] = useState(false);
  const [visible, setVisible] = useState(false);
  const sinMovimiento = useSinMovimiento();
  const raiz = useRef<HTMLDivElement>(null);
  const inicioToque = useRef<number | null>(null);
  const total = productos.length;

  const ir = (i: number, d: 1 | -1) => {
    setDireccion(d);
    setActual((i + total) % total);
  };

  useEffect(() => {
    const nodo = raiz.current;
    if (!nodo) return;
    const observador = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  const automatico = visible && !enUso && !sinMovimiento;
  const visibles = [-1, 0, 1].map((d) => ({ d, producto: productos[(actual + d + total) % total] }));
  const entrada = direccion === 1 ? "entra-derecha" : "entra-izquierda";

  return (
    <div
      ref={raiz}
      className="relative"
      onMouseEnter={() => setEnUso(true)}
      onMouseLeave={() => setEnUso(false)}
      onFocus={() => setEnUso(true)}
      onBlur={() => setEnUso(false)}
      onTouchStart={(e) => {
        setEnUso(true);
        inicioToque.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (inicioToque.current !== null) {
          const dx = e.changedTouches[0].clientX - inicioToque.current;
          if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
        }
        inicioToque.current = null;
        setEnUso(false);
      }}
    >
      <div className="flex items-center justify-center gap-6">
        <Flecha direccion="anterior" onClick={() => ir(actual - 1, -1)} className="hidden lg:grid" />

        <div className="grid w-full max-w-sm grid-cols-1 items-center gap-6 lg:max-w-5xl lg:grid-cols-[1fr_1.18fr_1fr]">
          {visibles.map(({ d, producto }) => (
            <div
              key={`${producto.slug}-${d}-${actual}`}
              className={d === 0 ? "relative z-10 lg:-my-6" : "hidden lg:block"}
              onClickCapture={(e) => {
                // Tocar una vecina la trae al centro en vez de abrir la ficha.
                if (d !== 0) {
                  e.preventDefault();
                  ir(actual + d, d as 1 | -1);
                }
              }}
            >
              <div
                className={`${entrada} ${d === 0 ? "" : "cursor-pointer opacity-60 transition-opacity duration-300 hover:opacity-90 lg:scale-[0.92]"}`}
                style={{ animationDuration: "0.65s", animationDelay: `${(d + 1) * 40}ms` }}
              >
                <ProductCard producto={producto} />
              </div>
            </div>
          ))}
        </div>

        <Flecha direccion="siguiente" onClick={() => ir(actual + 1, 1)} className="hidden lg:grid" />
      </div>

      <div className="mt-8 flex items-center justify-center gap-3 lg:mt-12">
      <Flecha direccion="anterior" onClick={() => ir(actual - 1, -1)} className="grid lg:hidden" />
      <div className="flex flex-wrap justify-center gap-1.5" role="tablist" aria-label="Productos">
        {productos.map((p, i) => (
          <button
            key={p.slug}
            role="tab"
            aria-selected={i === actual}
            aria-label={p.nombre}
            onClick={() => ir(i, i >= actual ? 1 : -1)}
            className="group grid h-6 place-items-center"
          >
            <span
              className={`relative block h-0.5 overflow-hidden transition-all duration-500 ${
                i === actual ? "w-12 bg-white/25" : "w-5 bg-white/30 group-hover:w-7 group-hover:bg-white/60"
              }`}
            >
              {i === actual && (
                <span
                  key={`${actual}-${automatico}`}
                  className="absolute inset-0 origin-left bg-fuego"
                  style={
                    automatico
                      ? { animation: `progreso ${INTERVALO}ms linear both` }
                      : { transform: "scaleX(1)" }
                  }
                  onAnimationEnd={() => ir(actual + 1, 1)}
                />
              )}
            </span>
          </button>
        ))}
      </div>
      <Flecha direccion="siguiente" onClick={() => ir(actual + 1, 1)} className="grid lg:hidden" />
      </div>
    </div>
  );
}

function Flecha({ direccion, onClick, className = "" }: { direccion: "anterior" | "siguiente"; onClick: () => void; className?: string }) {
  const anterior = direccion === "anterior";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={anterior ? "Producto anterior" : "Producto siguiente"}
      className={`${className} size-11 shrink-0 place-items-center border border-white/15 text-2xl font-light text-white/80 transition duration-300 hover:border-fuego hover:text-fuego active:scale-90 lg:size-12 lg:border-0 lg:text-3xl ${
        anterior ? "hover:-translate-x-1" : "hover:translate-x-1"
      }`}
    >
      {anterior ? "«" : "»"}
    </button>
  );
}
