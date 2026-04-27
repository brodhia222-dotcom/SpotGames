export type ServiceCategory =
  | "REPARACION"
  | "FLASHEO"
  | "JOYSTICKS"
  | "MANTENIMIENTO"
  | "TRADE_IN";

export type ConsoleBrand =
  | "PS1"
  | "PS2"
  | "PS3"
  | "PS4"
  | "PS5"
  | "PSP"
  | "PSVita"
  | "Xbox360"
  | "XboxOne"
  | "XboxOneSX"
  | "XboxSeries"
  | "Switch"
  | "SwitchOLED"
  | "SwitchLite"
  | "Joycon"
  | "ProController"
  | "WiiU"
  | "Wii"
  | "GameCube"
  | "N64"
  | "3DS"
  | "2DS"
  | "DSi"
  | "NESMini"
  | "SNESMini";

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  consoles: ConsoleBrand[];
  priceFrom: number | null; // null = "Consultar"
}

export interface CategoryMeta {
  id: ServiceCategory;
  title: string;
  short: string;
  tagline: string;
  description: string;
  color: string;
  iconKey: "repair" | "flash" | "joystick" | "maintenance" | "trade";
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "REPARACION",
    title: "REPARACIÓN",
    short: "REP",
    tagline: "Volvé a jugar.",
    description:
      "Diagnóstico gratuito y reparación garantizada. HDMI, lásers, fuentes, ventiladores y módulos. 90 días de garantía en el trabajo realizado.",
    color: "#A855F7",
    iconKey: "repair",
  },
  {
    id: "FLASHEO",
    title: "FLASHEO",
    short: "FLS",
    tagline: "Desbloqueá tu consola.",
    description:
      "Modificaciones para PS1 a PS5, Xbox, Switch, retro y más. Accedé a más contenido en tu consola de siempre.",
    color: "#22D3EE",
    iconKey: "flash",
  },
  {
    id: "JOYSTICKS",
    title: "JOYSTICKS",
    short: "JOY",
    tagline: "Adiós al drift.",
    description:
      "Drift fix con analógico estándar o magnético. Baterías, gomitas, gatillos, puertos y todo lo que tu joystick necesita.",
    color: "#EC4899",
    iconKey: "joystick",
  },
  {
    id: "MANTENIMIENTO",
    title: "MANTENIMIENTO",
    short: "MNT",
    tagline: "Limpia, fría, perfecta.",
    description:
      "Limpieza interna profesional y recambio de pasta térmica. Alargá la vida útil de tu consola y bajá la temperatura.",
    color: "#4ADE80",
    iconKey: "maintenance",
  },
  {
    id: "TRADE_IN",
    title: "TRADE-IN",
    short: "TRD",
    tagline: "Cambiá lo viejo.",
    description:
      "Tasamos tu consola, juegos o accesorios al instante. Crédito directo para tu próxima compra. Mejor precio de la zona garantizado.",
    color: "#F59E0B",
    iconKey: "trade",
  },
];

export const CONSOLE_LABELS: Record<
  ConsoleBrand,
  { label: string; brand: "PS" | "Xbox" | "Nintendo" | "Retro" }
> = {
  PS1: { label: "PS1", brand: "PS" },
  PS2: { label: "PS2", brand: "PS" },
  PS3: { label: "PS3", brand: "PS" },
  PS4: { label: "PS4", brand: "PS" },
  PS5: { label: "PS5", brand: "PS" },
  PSP: { label: "PSP", brand: "PS" },
  PSVita: { label: "PS Vita", brand: "PS" },
  Xbox360: { label: "Xbox 360", brand: "Xbox" },
  XboxOne: { label: "Xbox One", brand: "Xbox" },
  XboxOneSX: { label: "Xbox One S/X", brand: "Xbox" },
  XboxSeries: { label: "Xbox Series", brand: "Xbox" },
  Switch: { label: "Switch", brand: "Nintendo" },
  SwitchOLED: { label: "Switch OLED", brand: "Nintendo" },
  SwitchLite: { label: "Switch Lite", brand: "Nintendo" },
  Joycon: { label: "Joy-Con", brand: "Nintendo" },
  ProController: { label: "Pro Controller", brand: "Nintendo" },
  WiiU: { label: "Wii U", brand: "Nintendo" },
  Wii: { label: "Wii", brand: "Nintendo" },
  GameCube: { label: "GameCube", brand: "Retro" },
  N64: { label: "N64", brand: "Retro" },
  "3DS": { label: "3DS", brand: "Nintendo" },
  "2DS": { label: "2DS", brand: "Nintendo" },
  DSi: { label: "DSi", brand: "Nintendo" },
  NESMini: { label: "NES Mini", brand: "Retro" },
  SNESMini: { label: "SNES Mini", brand: "Retro" },
};

export const BRAND_COLORS = {
  PS: "#006FCD",
  Xbox: "#107C10",
  Nintendo: "#E60012",
  Retro: "#F59E0B",
};

// ⚠️ PRECIOS PLACEHOLDER — el cliente debe ajustar antes de publicar
export const SERVICES: ServiceItem[] = [
  // ============ MANTENIMIENTO ============
  { id: "mant-ps1", category: "MANTENIMIENTO", name: "Mantenimiento PlayStation 1", description: "Limpieza interna profunda. Modelos Fat y Slim.", consoles: ["PS1"], priceFrom: 6000 },
  { id: "mant-ps2", category: "MANTENIMIENTO", name: "Mantenimiento PlayStation 2", description: "Limpieza completa del modelo Slim.", consoles: ["PS2"], priceFrom: 6000 },
  { id: "mant-ps3", category: "MANTENIMIENTO", name: "Mantenimiento PlayStation 3", description: "Limpieza interna + pasta térmica. Fat o Slim.", consoles: ["PS3"], priceFrom: 9000 },
  { id: "mant-ps4", category: "MANTENIMIENTO", name: "Mantenimiento PlayStation 4", description: "Limpieza interna + pasta térmica. Fat, Slim o Pro.", consoles: ["PS4"], priceFrom: 12000 },
  { id: "mant-ps5", category: "MANTENIMIENTO", name: "Mantenimiento PlayStation 5", description: "Limpieza interna + pasta térmica. Fat, Slim o Pro.", consoles: ["PS5"], priceFrom: 15000 },
  { id: "mant-xbox360", category: "MANTENIMIENTO", name: "Mantenimiento Xbox 360", description: "Cualquier modelo. Limpieza + lectora.", consoles: ["Xbox360"], priceFrom: 9000 },
  { id: "mant-xboxone", category: "MANTENIMIENTO", name: "Mantenimiento Xbox One", description: "Original, S y X.", consoles: ["XboxOne", "XboxOneSX"], priceFrom: 12000 },
  { id: "mant-xboxseries", category: "MANTENIMIENTO", name: "Mantenimiento Xbox Series", description: "Series S y Series X.", consoles: ["XboxSeries"], priceFrom: 15000 },
  { id: "mant-switch", category: "MANTENIMIENTO", name: "Mantenimiento Nintendo Switch", description: "V1, V2, OLED y Lite.", consoles: ["Switch", "SwitchOLED", "SwitchLite"], priceFrom: 12000 },
  { id: "mant-retro", category: "MANTENIMIENTO", name: "Mantenimiento Consolas Retro", description: "N64, GameCube, Wii, Wii U.", consoles: ["N64", "GameCube", "Wii", "WiiU"], priceFrom: 8000 },

  // ============ REPARACIÓN ============
  { id: "rep-laser-ps1-2", category: "REPARACION", name: "Cambio de Láser PS1 / PS2", description: "Reemplazo de lente óptica. Modelos Fat y Slim.", consoles: ["PS1", "PS2"], priceFrom: 18000 },
  { id: "rep-laser-ps3", category: "REPARACION", name: "Cambio de Láser PS3", description: "Modelos 2xxx, 3xxx y 4xxx.", consoles: ["PS3"], priceFrom: 25000 },
  { id: "rep-laser-ps4", category: "REPARACION", name: "Cambio de Láser PS4", description: "Fat, Slim o Pro. Incluye mantenimiento de lectora.", consoles: ["PS4"], priceFrom: 30000 },
  { id: "rep-mecanismo-ps3", category: "REPARACION", name: "Cambio Mecanismo + Láser PS3", description: "Reemplazo completo de lectora + láser.", consoles: ["PS3"], priceFrom: null },
  { id: "rep-mecanismo-ps4", category: "REPARACION", name: "Cambio Mecanismo + Láser PS4", description: "Reemplazo completo de lectora + láser. Fat, Slim o Pro.", consoles: ["PS4"], priceFrom: null },
  { id: "rep-hdmi-ps3", category: "REPARACION", name: "Cambio Ficha HDMI PS3", description: "Solo cambio de ficha + mantenimiento. Sin reparación de pistas.", consoles: ["PS3"], priceFrom: 18000 },
  { id: "rep-hdmi-ps4", category: "REPARACION", name: "Cambio Ficha HDMI PS4", description: "Solo cambio de ficha + mantenimiento. Sin reparación de pistas.", consoles: ["PS4"], priceFrom: 20000 },
  { id: "rep-hdmi-ps5", category: "REPARACION", name: "Cambio Ficha HDMI PS5", description: "Solo cambio de ficha. Fat, Slim o Pro.", consoles: ["PS5"], priceFrom: 22000 },
  { id: "rep-ic-hdmi-ps3", category: "REPARACION", name: "Cambio IC Módulo HDMI PS3", description: "Reballing del IC HDMI. Modelos 2xxx, 3xxx, 4xxx.", consoles: ["PS3"], priceFrom: null },
  { id: "rep-ic-hdmi-ps4", category: "REPARACION", name: "Cambio IC Módulo HDMI PS4", description: "Incluye bobinas + mantenimiento. Fat, Slim o Pro.", consoles: ["PS4"], priceFrom: null },
  { id: "rep-ic-hdmi-ps5", category: "REPARACION", name: "Cambio IC Módulo HDMI PS5", description: "Reballing del IC HDMI. Fat, Slim o Pro.", consoles: ["PS5"], priceFrom: null },
  { id: "rep-ic-hdmi-xbox", category: "REPARACION", name: "Cambio IC Módulo HDMI Xbox Series", description: "Reballing del IC HDMI. Series S y X.", consoles: ["XboxSeries"], priceFrom: null },
  { id: "rep-fuente-ps", category: "REPARACION", name: "Recambio de Fuente PS3 / PS4 / PS5", description: "Fuente de alimentación interna. Todos los modelos.", consoles: ["PS3", "PS4", "PS5"], priceFrom: null },
  { id: "rep-fuente-xbox", category: "REPARACION", name: "Recambio de Fuente Xbox Series", description: "Fuente interna. Series S y X.", consoles: ["XboxSeries"], priceFrom: null },
  { id: "rep-wifi-ps", category: "REPARACION", name: "Cambio Módulo WiFi/BT PlayStation", description: "Reballing del módulo WiFi/Bluetooth. PS3 y PS4.", consoles: ["PS3", "PS4"], priceFrom: null },
  { id: "rep-southbridge-ps", category: "REPARACION", name: "Cambio Módulo Southbridge", description: "Reemplazo del IC Southbridge. PS4 y PS5.", consoles: ["PS4", "PS5"], priceFrom: null },
  { id: "rep-fan-ps", category: "REPARACION", name: "Cambio Ventilador / Fan Cooler", description: "Reemplazo del ventilador. PS3, PS4 y Xbox Series X.", consoles: ["PS3", "PS4", "XboxSeries"], priceFrom: 15000 },
  { id: "rep-hdmi-xbox", category: "REPARACION", name: "Cambio Ficha HDMI Xbox", description: "Solo cambio de ficha. 360, One y Series.", consoles: ["Xbox360", "XboxOne", "XboxOneSX", "XboxSeries"], priceFrom: 18000 },
  { id: "rep-pin-switch", category: "REPARACION", name: "Cambio Pin de Carga Switch", description: "Reemplazo del conector USB-C. V1, V2, OLED y Lite.", consoles: ["Switch", "SwitchOLED", "SwitchLite"], priceFrom: 14000 },
  { id: "rep-pantalla-switch", category: "REPARACION", name: "Cambio Pantalla Switch", description: "Reemplazo de display. V1, V2, OLED y Lite.", consoles: ["Switch", "SwitchOLED", "SwitchLite"], priceFrom: 35000 },
  { id: "rep-tactil-switch", category: "REPARACION", name: "Cambio Panel Táctil Switch", description: "Reemplazo del panel táctil. V1, V2 y Lite.", consoles: ["Switch", "SwitchLite"], priceFrom: 18000 },
  { id: "rep-ic-switch", category: "REPARACION", name: "Cambio IC Switch (Carga / Video / WiFi / Power)", description: "BQ24193, P13USB, BCM4356, M92T36. V1, V2, OLED y Lite.", consoles: ["Switch", "SwitchOLED", "SwitchLite"], priceFrom: null },
  { id: "rep-riel-switch", category: "REPARACION", name: "Cambio Riel Switch", description: "Reemplazo del riel del Joy-Con. V1, V2 y OLED.", consoles: ["Switch", "SwitchOLED"], priceFrom: 12000 },
  { id: "rep-pantalla-3ds", category: "REPARACION", name: "Cambio Pantalla 3DS / 2DS", description: "Pantalla superior, inferior o táctil.", consoles: ["3DS", "2DS"], priceFrom: 25000 },
  { id: "rep-pin-3ds", category: "REPARACION", name: "Pin de Carga 3DS / 2DS", description: "Reemplazo del conector de carga. Cualquier versión.", consoles: ["3DS", "2DS"], priceFrom: 12000 },

  // ============ FLASHEO ============
  { id: "fls-ps1mini", category: "FLASHEO", name: "Flasheo PS1 Mini", description: "Modificación para acceder a más juegos.", consoles: ["PS1"], priceFrom: 8000 },
  { id: "fls-ps2-basico", category: "FLASHEO", name: "Flasheo PS2 + 5 Juegos", description: "Modelo Fat o Slim. Sin pendrive.", consoles: ["PS2"], priceFrom: null },
  { id: "fls-ps2-pendrive", category: "FLASHEO", name: "Flasheo PS2 + Pendrive 64GB / 128GB", description: "Pack completo con pendrive y juegos cargados.", consoles: ["PS2"], priceFrom: null },
  { id: "fls-ps3", category: "FLASHEO", name: "Flasheo PS3 + 5 Juegos + 3 Tiendas", description: "Todos los modelos compatibles.", consoles: ["PS3"], priceFrom: null },
  { id: "fls-ps4", category: "FLASHEO", name: "Flasheo PS4", description: "Compatible hasta versión 13.00 del sistema.", consoles: ["PS4"], priceFrom: null },
  { id: "fls-psp", category: "FLASHEO", name: "Flasheo PSP", description: "Fat, Slim o PSP Go. Opción con micro SD 32/64GB.", consoles: ["PSP"], priceFrom: 8000 },
  { id: "fls-vita", category: "FLASHEO", name: "Flasheo PS Vita", description: "Opción con micro SD 64/128GB.", consoles: ["PSVita"], priceFrom: null },
  { id: "fls-xbox360-rgh", category: "FLASHEO", name: "RGH Xbox 360", description: "Reset Glitch Hack en placas compatibles.", consoles: ["Xbox360"], priceFrom: null },
  { id: "fls-xbox360-slim", category: "FLASHEO", name: "Flasheo Xbox 360 Slim E", description: "Modelos 2015+. Requiere pendrive.", consoles: ["Xbox360"], priceFrom: null },
  { id: "fls-switch", category: "FLASHEO", name: "Chipeo Nintendo Switch", description: "V1, V2 (Mariko), OLED y Lite. También Switch Android.", consoles: ["Switch", "SwitchOLED", "SwitchLite"], priceFrom: null },
  { id: "fls-wii", category: "FLASHEO", name: "Flasheo Wii / Wii U", description: "Wii U incluye flasheo vWii.", consoles: ["Wii", "WiiU"], priceFrom: 10000 },
  { id: "fls-3ds", category: "FLASHEO", name: "Flasheo 3DS / 2DS / DSi", description: "Cualquier versión o modelo. Opción modo DS.", consoles: ["3DS", "2DS", "DSi"], priceFrom: 9000 },
  { id: "fls-gamecube", category: "FLASHEO", name: "Flasheo / Chipeo GameCube", description: "Modificación para juegos backup.", consoles: ["GameCube"], priceFrom: null },
  { id: "fls-mini", category: "FLASHEO", name: "Flasheo NES Mini / SNES Mini", description: "Agregá juegos a tu consola Mini.", consoles: ["NESMini", "SNESMini"], priceFrom: 7000 },

  // ============ JOYSTICKS ============
  { id: "joy-mant-ps", category: "JOYSTICKS", name: "Mantenimiento Joystick PlayStation", description: "Limpieza interna + lubricación. PS1 a PS5.", consoles: ["PS1", "PS2", "PS3", "PS4", "PS5"], priceFrom: 5000 },
  { id: "joy-mant-xbox", category: "JOYSTICKS", name: "Mantenimiento Joystick Xbox", description: "360, One y Series.", consoles: ["Xbox360", "XboxOne", "XboxSeries"], priceFrom: 5000 },
  { id: "joy-honguitos", category: "JOYSTICKS", name: "Cambio de Honguitos x2", description: "Reemplazo de gomas analógicas. Todas las consolas.", consoles: ["PS1", "PS2", "PS3", "PS4", "PS5", "Xbox360", "XboxOne", "XboxSeries", "ProController"], priceFrom: 4000 },
  { id: "joy-rubber", category: "JOYSTICKS", name: "Kit Gomitas Rubber", description: "Reemplazo de gomitas de contacto. Todas las consolas.", consoles: ["PS1", "PS2", "PS3", "PS4", "PS5", "Xbox360", "XboxOne", "XboxSeries"], priceFrom: 4500 },
  { id: "joy-analog", category: "JOYSTICKS", name: "Cambio Analógico (drift fix)", description: "x1 o x2 analógicos. PS1 a PS5 y Xbox.", consoles: ["PS1", "PS2", "PS3", "PS4", "PS5", "Xbox360", "XboxOne", "XboxSeries"], priceFrom: 8000 },
  { id: "joy-analog-mag", category: "JOYSTICKS", name: "Cambio Analógico Magnético", description: "Hall effect. Anti-drift permanente. PS4, PS5 y Xbox.", consoles: ["PS4", "PS5", "XboxOne", "XboxSeries"], priceFrom: 18000 },
  { id: "joy-membrana", category: "JOYSTICKS", name: "Cambio de Membrana", description: "Reemplazo de membranas internas. PS2 a PS5.", consoles: ["PS2", "PS3", "PS4", "PS5"], priceFrom: 5000 },
  { id: "joy-pin", category: "JOYSTICKS", name: "Pin de Carga Joystick", description: "Reemplazo del puerto USB. PS3, PS4, PS5, Xbox.", consoles: ["PS3", "PS4", "PS5", "XboxOne", "XboxSeries"], priceFrom: 7000 },
  { id: "joy-jack", category: "JOYSTICKS", name: "Cambio Puerto Jack Auricular", description: "Reemplazo del puerto 3.5mm. PS4, PS5 y Xbox.", consoles: ["PS4", "PS5", "XboxOne", "XboxSeries"], priceFrom: 6000 },
  { id: "joy-gatillos", category: "JOYSTICKS", name: "Set Gatillos + Resortes", description: "Reemplazo de gatillos L2/R2. PS4 y PS5.", consoles: ["PS4", "PS5"], priceFrom: 6000 },
  { id: "joy-gatillos-ps5", category: "JOYSTICKS", name: "Gatillos Motores L2/R2 PS5", description: "Reemplazo de los motores adaptativos del DualSense.", consoles: ["PS5"], priceFrom: 12000 },
  { id: "joy-bateria", category: "JOYSTICKS", name: "Cambio Batería Joystick", description: "Reemplazo de batería. PS3, PS4 y PS5.", consoles: ["PS3", "PS4", "PS5"], priceFrom: 6000 },
  { id: "joy-joycon-drift", category: "JOYSTICKS", name: "Joy-Con Drift Fix", description: "Cambio de analógico Joy-Con (Drift).", consoles: ["Joycon"], priceFrom: 8000 },
  { id: "joy-joycon-buttons", category: "JOYSTICKS", name: "Joy-Con Botones / SL-SR / ZL-ZR", description: "Reemplazo de botones. L, R, SL, SR, ZL, ZR.", consoles: ["Joycon"], priceFrom: 5000 },
  { id: "joy-joycon-bat", category: "JOYSTICKS", name: "Joy-Con Batería + Riel", description: "Cambio de batería y riel.", consoles: ["Joycon"], priceFrom: 7000 },
  { id: "joy-procontroller", category: "JOYSTICKS", name: "Pro Controller Switch", description: "Mantenimiento, analógicos x1/x2, gomitas, pin de carga.", consoles: ["ProController"], priceFrom: 6000 },

  // ============ TRADE-IN ============
  { id: "trade-consola", category: "TRADE_IN", name: "Tasación de Consola", description: "Tasamos tu consola al instante. Cualquier modelo o estado.", consoles: ["PS1", "PS2", "PS3", "PS4", "PS5", "Xbox360", "XboxOne", "XboxSeries", "Switch", "SwitchOLED", "SwitchLite", "WiiU", "Wii", "GameCube", "N64", "3DS", "2DS"], priceFrom: null },
  { id: "trade-juegos", category: "TRADE_IN", name: "Tasación de Juegos", description: "Físicos o digitales. Cualquier plataforma.", consoles: ["PS3", "PS4", "PS5", "XboxOne", "XboxSeries", "Switch", "SwitchOLED"], priceFrom: null },
  { id: "trade-accesorios", category: "TRADE_IN", name: "Tasación de Accesorios", description: "Joysticks, headsets, volantes, periféricos.", consoles: ["PS4", "PS5", "XboxOne", "XboxSeries", "Switch"], priceFrom: null },
];

export const FEATURED_SERVICES = SERVICES.filter((s) =>
  ["mant-ps5", "fls-switch", "joy-analog-mag", "rep-pantalla-switch", "trade-consola"].includes(s.id)
);

export default SERVICES;
