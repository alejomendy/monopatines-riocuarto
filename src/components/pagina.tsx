import { ViewTransition } from "react";

/**
 * Envuelve el contenido de cada página para que la navegación entre páginas
 * haga un fundido corto (clase `pagina` en globals.css). Las fotos con nombre
 * propio (`producto-*`) viajan aparte, de la tarjeta a la ficha.
 */
export function Pagina({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="pagina" exit="pagina" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
