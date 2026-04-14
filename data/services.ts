import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "reparacion",
    title: "Reparación de Consolas",
    description:
      "Reparamos PS4, PS5, Xbox One, Xbox Series, Nintendo Switch y consolas retro. Diagnóstico sin cargo, presupuesto sin compromiso. Técnicos especializados con años de experiencia.",
    iconName: "wrench",
    price: "Desde $8.000",
    whatsappText:
      "Hola! Quiero consultar sobre reparación de consola. ¿Pueden ayudarme?",
  },
  {
    id: "trade-in",
    title: "Trade-In y Cambios",
    description:
      "Traé tu consola o juego usado y llevate otro. Tasamos tu equipo de forma justa y lo aplicamos como descuento directo en tu próxima compra. Sin vueltas.",
    iconName: "arrows",
    price: "Consultar tasación",
    whatsappText:
      "Hola! Me interesa hacer un trade-in. ¿Cómo funciona el proceso?",
  },
  {
    id: "usados",
    title: "Usados & Retro",
    description:
      "Todos nuestros usados pasan por revisión técnica y vienen con garantía de 30 días. Amplia selección de títulos clásicos y consolas retro en perfectas condiciones.",
    iconName: "gamepad",
    price: "Garantía incluida",
    whatsappText:
      "Hola! Quiero ver qué juegos usados o retro tienen disponibles.",
  },
  {
    id: "envios",
    title: "Envíos a Todo el País",
    description:
      "Enviamos a cualquier punto de Argentina por Correo Argentino o correos privados. Empaque seguro especial para consolas y electrónica. Seguimiento en tiempo real.",
    iconName: "truck",
    price: "Coordinar costo",
    whatsappText:
      "Hola! Quiero consultar sobre envío a [ciudad]. ¿Cuánto sale y cuánto tarda?",
  },
  {
    id: "asesoramiento",
    title: "Asesoramiento Personalizado",
    description:
      "No sabés qué consola comprar o qué juegos son los mejores para vos? Te ayudamos a elegir según tu presupuesto y gustos. Somos gamers, no vendedores.",
    iconName: "chat",
    price: "Sin costo",
    whatsappText:
      "Hola! Necesito asesoramiento para elegir una consola/juego. ¿Me pueden ayudar?",
  },
];
