const WHATSAPP_NUMBER = "5491157649264";

export function buildWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildBookingURL(
  service: string,
  date: string,
  time: string
): string {
  const message = `Hola, quiero reservar un turno para ${service} el ${date} a las ${time}.`;
  return buildWhatsAppURL(message);
}

export function buildContactURL(subject?: string): string {
  const message = subject
    ? `Hola, me comunico por: ${subject}`
    : "Hola, me gustaría consultar sobre sus servicios.";
  return buildWhatsAppURL(message);
}
