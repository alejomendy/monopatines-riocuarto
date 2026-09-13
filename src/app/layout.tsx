import type { Metadata } from "next";
import { Cormorant_Garamond, Kanit } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsappFlotante } from "@/components/whatsapp-flotante";
import { asset } from "@/lib/base-path";
import { negocio } from "@/lib/business";
import "./globals.css";

// Kanit: deportiva y redondeada, la más cercana a los textos de los reels.
const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  // URL pública del sitio (con el prefijo de GitHub Pages incluido en las rutas).
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${negocio.nombre} · Venta y servicio técnico de monopatines eléctricos`,
    template: `%s · ${negocio.nombre}`,
  },
  description:
    "Monopatines eléctricos ewōl y RVN en Río Cuarto, con hasta 2 años de garantía, 6 cuotas sin interés, servicio técnico propio, repuestos y accesorios.",
  openGraph: {
    title: negocio.nombre,
    description: "Monopatines eléctricos con taller propio en Río Cuarto.",
    images: [asset("/instagram/ewol-i35.webp")],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${kanit.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsappFlotante />
      </body>
    </html>
  );
}
