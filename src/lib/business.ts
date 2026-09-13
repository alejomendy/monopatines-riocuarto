/**
 * Datos del negocio. Todo lo que el local puede querer cambiar sin tocar
 * componentes está acá: teléfonos, redes y textos de confianza.
 *
 * Los dos WhatsApp salen de los links de la bio de Instagram: uno figura como
 * "Ventas!" y el otro como "Reparación!".
 */
export const negocio = {
  nombre: "Monopatines Río Cuarto",
  ciudad: "Río Cuarto",
  provincia: "Córdoba",
  // Sin dirección publicada en Instagram: completar cuando la confirme el local.
  direccion: null as string | null,
  horarios: null as string | null,
  whatsappVentas: "5493584122669",
  // Provisorio: el taller recibe en el mismo número que ventas. El de la bio
  // de Instagram para reparaciones es 5493884322271.
  whatsappTaller: "5493584122669",
  instagram: "monopatinesriocuarto",
  seguidores: "17,8 mil",
  garantia: "Hasta 2 años de garantía",
  cuotas: "6 cuotas sin interés",
};

export function formatearTelefono(numero: string) {
  // 549 358 412-2669 → 358 412-2669
  const local = numero.replace(/^549/, "");
  return `${local.slice(0, 3)} ${local.slice(3, 6)}-${local.slice(6)}`;
}

export function linkWhatsapp(numero: string, mensaje: string) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

export const linkInstagram = `https://www.instagram.com/${negocio.instagram}/`;
