"use client";

import { useSyncExternalStore } from "react";

const consulta = "(prefers-reduced-motion: reduce)";

function suscribir(avisar: () => void) {
  const media = window.matchMedia(consulta);
  media.addEventListener("change", avisar);
  return () => media.removeEventListener("change", avisar);
}

/** `true` si el usuario pidió menos movimiento en su sistema. */
export function useSinMovimiento() {
  return useSyncExternalStore(
    suscribir,
    () => window.matchMedia(consulta).matches,
    () => false,
  );
}
