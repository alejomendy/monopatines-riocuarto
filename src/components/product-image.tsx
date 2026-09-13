import Image from "next/image";

import type { Producto } from "@/lib/catalog";
import { Texto } from "@/components/texto";

/**
 * Foto del producto sobre gris claro, como las tarjetas de la referencia. Las
 * fotos de fábrica vienen en blanco y se funden con el gris (multiply). Sin
 * foto, muestra el logo con el nombre.
 */
export function ProductImage({
  producto,
  src = producto.imagenes[0],
  sizes,
  priority,
  className = "",
}: {
  producto: Producto;
  src?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!src) {
    return (
      <div className={`relative grid place-items-center overflow-hidden bg-grafito ${className}`}>
        <span className="franja left-[58%] w-[16%] opacity-90" />
        <span className="franja left-[80%] w-[5%] opacity-60" />
        <div className="relative flex flex-col items-center gap-3 px-6 text-center">
          <Image src="/marca/logo.jpg" alt="" width={84} height={84} className="rounded-full ring-2 ring-white/20" />
          <span className="titulo text-base text-white"><Texto>{producto.nombre}</Texto></span>
          <span className="bg-noche/70 px-2 py-1 text-[0.7rem] text-white/80">Pedinos fotos por WhatsApp</span>
        </div>
      </div>
    );
  }

  const esFotoReal = src.startsWith("/instagram/");
  const aSangre = esFotoReal || src === producto.fotoAmbiente;
  return (
    <div
      className={`relative overflow-hidden ${
        esFotoReal ? "bg-carbon-2" : "bg-gradient-to-b from-[#f4f4f4] to-[#dedede]"
      } ${className}`}
    >
      <Image
        src={src}
        alt={producto.nombre}
        fill
        sizes={sizes}
        priority={priority}
        className={`${
          aSangre ? "object-cover" : "object-contain p-[9%] mix-blend-multiply"
        } transition duration-500 group-hover:scale-[1.05]`}
      />
    </div>
  );
}
