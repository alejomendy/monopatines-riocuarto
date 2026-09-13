"use client";

import { useEffect, useState } from "react";

import { WhatsappIcon } from "@/components/icons";
import { linkWhatsapp, negocio } from "@/lib/business";

/** Botón de WhatsApp: aparece al empezar a bajar y muestra una etiqueta al pasar el mouse. */
export function WhatsappFlotante() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={linkWhatsapp(negocio.whatsappVentas, "Hola! Vengo de la web y quiero hacer una consulta.")}
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`group fixed right-4 bottom-4 z-50 flex items-center transition-all duration-500 ease-[var(--ease-salida)] sm:right-6 sm:bottom-6 ${
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-6 scale-75 opacity-0"
      }`}
    >
      <span className="mr-3 hidden translate-x-3 bg-white px-3 py-2 text-xs font-bold tracking-wider text-noche uppercase opacity-0 shadow-lg transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        ¿Te asesoramos?
      </span>
      <span
        className="grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
        style={visible ? { animation: "pulso 2.6s ease-out 1.2s 3" } : undefined}
      >
        <WhatsappIcon className="size-7 transition-transform duration-500 group-hover:rotate-[-12deg]" />
      </span>
    </a>
  );
}
