import type { Metadata } from "next";
import { Suspense } from "react";

import { CatalogBrowser } from "@/components/catalog-browser";
import { Pagina } from "@/components/pagina";
import { WhatsappIcon } from "@/components/icons";
import { linkWhatsapp, negocio } from "@/lib/business";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Monopatines eléctricos ewōl y RVN, repuestos y accesorios en Río Cuarto.",
};

export default function CatalogoPage() {
  return (
    <Pagina>
      <section className="relative overflow-hidden bg-noche pt-32 pb-14 lg:pt-36 lg:pb-16">
        <div className="absolute inset-x-0 top-18 bottom-0 hidden overflow-hidden md:block">
          <span className="franja entra-franja left-[70%] w-[12%]" />
          <span className="franja entra-franja left-[84%] w-[3%] bg-white!" style={{ animationDelay: "120ms" }} />
          <span className="franja entra-franja left-[89%] w-[8%]" style={{ animationDelay: "200ms" }} />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-5 lg:px-8">
          <div>
            <p className="eyebrow entra text-fuego">Catálogo</p>
            <h1 className="titulo entra mt-3 text-5xl text-white sm:text-7xl" style={{ animationDelay: "80ms" }}>
              Elegí tu <span className="barrido inline-block text-fuego" style={{ animationDelay: "380ms" }}>equipo</span>
            </h1>
            <p className="entra mt-4 max-w-xl text-base text-white/80 sm:text-lg" style={{ animationDelay: "160ms" }}>
              {negocio.garantia} {"//"} {negocio.cuotas}. Consultá precio y disponibilidad por WhatsApp.
            </p>
          </div>
          <a
            href={linkWhatsapp(negocio.whatsappVentas, "Hola! Quiero que me asesoren para elegir un monopatín.")}
            target="_blank"
            rel="noopener"
            className="entra group relative inline-flex h-12 items-center gap-2 self-start bg-white px-5 text-sm font-bold tracking-wider text-tinta uppercase shadow-lg transition hover:bg-fuego active:scale-[0.97]"
            style={{ animationDelay: "240ms" }}
          >
            <WhatsappIcon className="size-5 text-whatsapp transition-transform duration-300 group-hover:scale-110 group-hover:text-noche" />
            No sé cuál elegir
          </a>
        </div>
      </section>

      <section className="fondo-grafito">
        <div className="mx-auto max-w-7xl px-5 pt-10 pb-24 lg:px-8">
          <Suspense>
            <CatalogBrowser />
          </Suspense>
        </div>
      </section>
    </Pagina>
  );
}
