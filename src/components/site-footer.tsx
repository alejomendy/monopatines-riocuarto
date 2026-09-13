import Link from "next/link";

import { InstagramIcon, WhatsappIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { formatearTelefono, linkInstagram, linkWhatsapp, negocio } from "@/lib/business";
import { categorias } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t-4 border-fuego bg-noche">
      <span className="franja left-[88%] hidden w-[5%] opacity-15 lg:block" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Logo size={56} />
          <p className="max-w-xs text-sm leading-relaxed text-humo">
            Venta de monopatines eléctricos, servicio técnico, repuestos y accesorios en {negocio.ciudad},{" "}
            {negocio.provincia}.
          </p>
        </div>

        <div>
          <h2 className="eyebrow text-fuego">Catálogo</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categorias.map((c) => (
              <li key={c.id}>
                <Link href={`/catalogo?categoria=${c.id}`} className="text-white/75 hover:text-white">
                  <span className="mr-2 text-white/25">{"//"}</span>
                  {c.nombre}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#taller" className="text-white/75 hover:text-white">
                <span className="mr-2 text-white/25">{"//"}</span>
                Servicio técnico
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-fuego">WhatsApp</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { label: "Ventas", numero: negocio.whatsappVentas, mensaje: "Hola! Quiero consultar por un monopatín." },
              { label: "Taller", numero: negocio.whatsappTaller, mensaje: "Hola! Quiero consultar por una reparación." },
            ].map((c) => (
              <li key={c.label}>
                <a
                  href={linkWhatsapp(c.numero, c.mensaje)}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2.5 text-white/75 hover:text-white"
                >
                  <WhatsappIcon className="size-4 text-whatsapp" />
                  <span>
                    <span className="font-bold text-white">{c.label}</span> {formatearTelefono(c.numero)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-fuego">Seguinos</h2>
          <a
            href={linkInstagram}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex items-center gap-2.5 text-sm text-white/75 hover:text-white"
          >
            <InstagramIcon className="size-5" />@{negocio.instagram}
          </a>
          <p className="mt-2 text-sm text-humo">{negocio.seguidores} riders nos siguen.</p>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-white/60 lg:px-8">
          © {new Date().getFullYear()} {negocio.nombre}. Fichas técnicas de referencia según el fabricante; las fotos
          pueden no coincidir con la unidad en stock.
        </p>
      </div>
    </footer>
  );
}
