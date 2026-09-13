"use client";

import { useEffect, useRef, useState } from "react";

type Variante = "arriba" | "izquierda" | "derecha" | "escala" | "cortina";

/**
 * Aparición al entrar en pantalla. El contenido viene renderizado desde el
 * servidor; acá solo se enciende la transición. Si el usuario salta la sección
 * con un scroll largo, igual queda visible.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variante = "arriba",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variante?: Variante;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    function check() {
      if (node!.getBoundingClientRect().top < window.innerHeight * 0.9) {
        setVisible(true);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    }

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    const frame = requestAnimationFrame(check);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={`reveal ${className}`}
      data-visible={visible || undefined}
      data-variante={variante === "arriba" ? undefined : variante}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
