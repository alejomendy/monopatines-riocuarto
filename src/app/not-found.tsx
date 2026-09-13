import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-noche">
      <div className="absolute inset-x-0 top-18 bottom-0 overflow-hidden">
        <span className="franja left-[60%] w-[18%]" />
        <span className="franja left-[82%] w-[5%]" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-start px-5 pt-40 pb-32 lg:px-8">
        <p className="eyebrow text-fuego">Error 404</p>
        <h1 className="titulo mt-4 text-6xl text-white sm:text-8xl">
          Esta calle <span className="block">no existe</span>
        </h1>
        <p className="mt-5 max-w-md text-white/65">La página que buscás no está. Volvé al catálogo y seguí rodando.</p>
        <Link href="/catalogo" className="mt-8 bg-fuego px-6 py-4 text-sm font-bold tracking-wider text-noche uppercase hover:bg-fuego-hover">
          Ir al catálogo
        </Link>
      </div>
    </section>
  );
}
