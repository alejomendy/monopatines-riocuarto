"use client";

import { useState, ViewTransition } from "react";

import { ProductImage } from "@/components/product-image";
import type { Producto } from "@/lib/catalog";

export function ProductGallery({ producto }: { producto: Producto }) {
  const [actual, setActual] = useState(0);
  const { imagenes } = producto;

  return (
    <div>
      <div className="relative overflow-hidden">
        <ViewTransition name={`producto-${producto.slug}`} share="morph" default="none">
          <div key={actual} className={actual ? "entra" : undefined} style={{ animationDuration: "0.45s" }}>
            <ProductImage producto={producto} src={imagenes[actual]} sizes="(min-width: 1024px) 50vw, 100vw" priority className="aspect-square" />
          </div>
        </ViewTransition>
        {producto.etiqueta && (
          <span className="absolute top-0 left-0 bg-fuego px-4 py-2 text-xs font-bold tracking-wider text-noche uppercase">
            {producto.etiqueta}
          </span>
        )}
      </div>
      {imagenes.length > 1 && (
        <div className="mt-3 flex gap-2">
          {imagenes.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActual(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === actual}
              className={`w-20 overflow-hidden border-b-4 transition duration-300 active:scale-95 ${i === actual ? "border-fuego" : "border-transparent opacity-55 hover:-translate-y-0.5 hover:opacity-100"}`}
            >
              <ProductImage producto={producto} src={src} sizes="80px" className="aspect-square" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
