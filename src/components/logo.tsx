import Image from "next/image";
import Link from "next/link";

/**
 * Logo de la marca. La imagen es la foto de perfil de Instagram (150 px), que
 * se ve nítida hasta ~75 px. Para usarlo más grande hay que pedir el original.
 */
export function Logo({ size = 44, conTexto = true }: { size?: number; conTexto?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Monopatines Río Cuarto, inicio">
      <Image
        src="/marca/logo.jpg"
        alt=""
        width={size}
        height={size}
        className="rounded-full ring-1 ring-white/15 transition group-hover:ring-fuego"
        priority
      />
      {conTexto && (
        <span className="hidden leading-none min-[380px]:block">
          <span className="block text-[0.8rem] font-semibold tracking-[0.26em] text-white">MONOPATINES</span>
          <span className="script block text-[1.1rem] text-white/75">Río Cuarto</span>
        </span>
      )}
    </Link>
  );
}
