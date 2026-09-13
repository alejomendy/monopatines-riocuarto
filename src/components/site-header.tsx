"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CloseIcon, MenuIcon, SearchIcon, WhatsappIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { linkWhatsapp, negocio } from "@/lib/business";

const links = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#taller", label: "Taller" },
  { href: "/catalogo?categoria=repuestos", label: "Repuestos" },
  { href: "/#preguntas", label: "Preguntas" },
  { href: "/#contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [abierto, setAbierto] = useState(false);
  const [scrolleado, setScrolleado] = useState(false);
  const [oculto, setOculto] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Se esconde al bajar y vuelve al subir, para no tapar el contenido.
    let ultimo = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolleado(y > 12);
      if (Math.abs(y - ultimo) > 6) {
        setOculto(y > ultimo && y > 480);
        ultimo = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al navegar.
  const [ruta, setRuta] = useState(pathname);
  if (ruta !== pathname) {
    setRuta(pathname);
    setAbierto(false);
  }

  const wa = linkWhatsapp(negocio.whatsappVentas, "Hola! Quiero consultar por un monopatín.");
  const activo = (href: string) => href === "/catalogo" && pathname.startsWith("/catalogo");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,translate] duration-500 ease-[var(--ease-salida)] ${
        oculto && !abierto ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolleado || abierto ? "bg-noche/92 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Logo />

        <div className="flex items-center gap-8">
          <nav className="hidden items-center lg:flex" aria-label="Principal">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`group relative py-2 text-[0.8rem] font-semibold tracking-[0.12em] uppercase ${
                  i > 0 ? "barras ml-4" : ""
                } ${activo(l.href) ? "text-white" : "text-white/70 hover:text-white"}`}
              >
                <span className="relative">
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 bg-fuego transition-all ${
                      activo(l.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/catalogo"
              aria-label="Buscar en el catálogo"
              className="group hidden size-10 place-items-center bg-grafito text-white transition hover:bg-fuego hover:text-noche active:scale-90 sm:grid"
            >
              <SearchIcon className="size-4.5 transition-transform duration-300 group-hover:scale-110" />
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener"
              className="brillo inline-flex h-10 items-center gap-2 bg-fuego px-4 text-[0.78rem] font-bold tracking-wider text-noche uppercase transition hover:bg-fuego-hover active:scale-[0.97]"
            >
              <WhatsappIcon className="size-4" />
              <span className="hidden sm:inline">Ventas</span>
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center bg-grafito text-white hover:bg-linea lg:hidden"
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={abierto}
              onClick={() => setAbierto((v) => !v)}
            >
              {abierto ? <CloseIcon className="entra size-5" /> : <MenuIcon className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {abierto && (
        <nav className="border-t border-white/10 px-5 pb-6 lg:hidden" aria-label="Menú móvil">
          <ul>
            {links.map((l, i) => (
              <li key={l.href} className="entra border-b border-white/10" style={{ animationDelay: `${i * 50}ms`, animationDuration: "0.5s" }}>
                <Link
                  href={l.href}
                  onClick={() => setAbierto(false)}
                  className="group flex items-center gap-3 py-4 text-base font-bold tracking-wider text-white uppercase transition-colors hover:text-fuego"
                >
                  <span className="text-fuego transition-transform group-hover:translate-x-1">{"//"}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
