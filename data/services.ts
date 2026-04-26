import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    id: "1",
    slug: "reparacion",
    title: "Reparación de Consolas",
    description: "Diagnóstico profesional y reparación garantizada.",
    longDescription:
      "Reparamos PS5, PS4, Xbox Series, Xbox One, Nintendo Switch y consolas retro. Diagnóstico gratuito en el momento. Presupuesto sin cargo. Reparaciones con repuestos originales y garantía de 90 días en el trabajo realizado.",
    price: "Desde $8.000",
    icon: "wrench",
    whatsappText:
      "Hola Spot Games! Necesito reparar una consola. ¿Pueden ayudarme?",
  },
  {
    id: "2",
    slug: "trade-in",
    title: "Trade-In",
    description: "Cambiá lo que ya no usás por lo que querés.",
    longDescription:
      "Traé tus juegos, consolas o accesorios usados y los valuamos en el momento. El crédito se aplica directo a tu próxima compra. Aceptamos cualquier plataforma y cualquier estado. Mejor precio de la zona garantizado.",
    icon: "arrows",
    whatsappText:
      "Hola Spot Games! Me interesa el trade-in. ¿Cómo funciona?",
  },
  {
    id: "3",
    slug: "usados-retro",
    title: "Usados & Retro",
    description: "Stock de joyas retro con garantía de 30 días.",
    longDescription:
      "Tenemos el mejor stock de consolas y juegos retro de la zona. NES, SNES, Mega Drive, N64, PS1, PS2 y mucho más. Todo revisado, limpiado y con garantía de 30 días. Si buscás algo específico que no tenemos, te lo conseguimos.",
    icon: "gamepad",
    whatsappText:
      "Hola Spot Games! Busco algo retro. ¿Tienen stock disponible?",
  },
  {
    id: "4",
    slug: "envios",
    title: "Envíos a Todo el País",
    description: "Embalaje seguro y envío rápido a cualquier punto.",
    longDescription:
      "Enviamos a todo el país a través de Andreani y OCA. Embalaje reforzado especial para consolas y electrónica. Seguro de envío incluido. Seguimiento en tiempo real. Retiro gratis en nuestro local de Palermo.",
    price: "Desde $3.500",
    icon: "truck",
    whatsappText: "Hola Spot Games! Me interesa comprar y necesito envío.",
  },
  {
    id: "5",
    slug: "asesoramiento",
    title: "Asesoramiento Gratuito",
    description: "Te ayudamos a elegir la mejor opción para tu presupuesto.",
    longDescription:
      "¿No sabés qué consola o juego comprar? Nuestro equipo de gamers con más de 10 años de experiencia te asesora sin compromiso. Comparamos opciones, te explicamos diferencias y te ayudamos a maximizar tu presupuesto.",
    icon: "chat",
    whatsappText:
      "Hola Spot Games! Necesito asesoramiento para comprar un videojuego/consola.",
  },
];
