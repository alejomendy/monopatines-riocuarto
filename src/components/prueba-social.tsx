import { InstagramIcon } from "@/components/icons";
import { google, linkInstagram, negocio } from "@/lib/business";

/** Logo "G" de Google en sus colores. */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

const ESTRELLA = "M10 1.5l2.6 5.5 6 .7-4.5 4.1 1.2 5.9L10 14.8l-5.3 2.9 1.2-5.9L1.4 7.7l6-.7z";

/** Cinco estrellas con relleno parcial (4,5 → media estrella). Sin ids, se puede repetir en la página. */
function Estrellas({ valor }: { valor: number }) {
  return (
    <span className="flex gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => {
        const relleno = Math.max(0, Math.min(1, valor - i + 1));
        return (
          <span key={i} className="relative size-4">
            <svg viewBox="0 0 20 20" className="absolute inset-0 size-4 fill-white/25">
              <path d={ESTRELLA} />
            </svg>
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${relleno * 100}%` }}>
              <svg viewBox="0 0 20 20" className="size-4 fill-[#FBBC04]">
                <path d={ESTRELLA} />
              </svg>
            </span>
          </span>
        );
      })}
    </span>
  );
}

/**
 * Prueba social del hero: calificación real de Google Maps y seguidores de
 * Instagram. Cada dato lleva a su fuente.
 */
export function PruebaSocial({ className = "" }: { className?: string }) {
  const nota = google.calificacion.toLocaleString("es-AR", { minimumFractionDigits: 1 });
  const nombres = google.cincoEstrellas;
  const lista = `${nombres.slice(0, -1).join(", ")} y ${nombres.at(-1)}`;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="border border-white/10 bg-carbon/90 backdrop-blur">
      <a
        href={google.url}
        target="_blank"
        rel="noopener"
        aria-label={`${nota} de 5 estrellas en Google, ${google.cantidad} reseñas. Ver la ficha en Google Maps`}
        className="group flex items-center gap-4 p-4 transition hover:bg-white/5"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white">
          <GoogleG className="size-6" />
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-2">
            <span className="cifra text-2xl leading-none text-white">{nota}</span>
            <Estrellas valor={google.calificacion} />
          </span>
          <span className="mt-1 block text-xs text-white/70">
            {google.cantidad} reseñas en Google{" "}
            <span className="text-white/45 transition group-hover:text-white">↗</span>
          </span>
        </span>
      </a>

      <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3">
        <span className="flex -space-x-2" aria-hidden>
          {nombres.map((n, i) => (
            <span
              key={n}
              className="grid size-7 place-items-center rounded-full border-2 border-carbon text-[0.7rem] font-bold text-noche"
              style={{ background: ["#ff5a1f", "#ffffff", "#FBBC04"][i % 3] }}
            >
              {n[0]}
            </span>
          ))}
        </span>
        <p className="text-xs leading-snug text-white/75">
          <span className="font-semibold text-white">{lista}</span> nos pusieron 5 estrellas
        </p>
      </div>
      </div>

      <a
        href={linkInstagram}
        target="_blank"
        rel="noopener"
        className="flex items-center gap-2 px-1 text-xs text-white/65 transition hover:text-white"
      >
        <InstagramIcon className="size-4" />
        <span>
          <span className="font-semibold text-white">{negocio.seguidores}</span> seguidores en Instagram
        </span>
      </a>
    </div>
  );
}
