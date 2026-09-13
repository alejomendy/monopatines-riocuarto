import { Fragment } from "react";

/**
 * Kanit dibuja la "ō" con el macrón corrido hacia la letra siguiente, y en
 * "ewōl" se lee "ewol". Este componente cambia cada "ō" por una "o" con el
 * macrón hecho en CSS (`.o-macron` en globals.css).
 */
export function Texto({ children }: { children: string }) {
  if (!/[ōŌ]/.test(children)) return children;
  const partes = children.split(/([ōŌ])/);
  return (
    <>
      {partes.map((parte, i) =>
        parte === "ō" || parte === "Ō" ? (
          <span key={i} className="o-macron">
            {parte === "ō" ? "o" : "O"}
          </span>
        ) : (
          <Fragment key={i}>{parte}</Fragment>
        ),
      )}
    </>
  );
}
