// SVG illustrated map of Belgrano, centered on Av. Cabildo 2230.
// SMIL animations handle the pulsing marker — no client JS needed.
export function BelgranoMap() {
  return (
    <svg
      viewBox="0 0 560 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-label="Mapa ilustrado del barrio de Belgrano, Buenos Aires. Spot Games se encuentra en Av. Cabildo 2230, Local 36/38."
    >
      {/* ── BACKGROUND ── */}
      <rect width="560" height="420" fill="#180840" />

      {/* Ambient glow around store block */}
      <ellipse cx="225" cy="185" rx="165" ry="118" fill="rgba(109,40,217,0.065)" />

      {/* ── CITY BLOCKS ── */}
      {/* Row above Monroe */}
      <rect x="1"   y="1"  width="88"  height="58"  fill="rgba(255,255,255,0.016)" />
      <rect x="91"  y="1"  width="133" height="58"  fill="rgba(255,255,255,0.019)" />
      <rect x="226" y="1"  width="158" height="58"  fill="rgba(255,255,255,0.015)" />
      <rect x="386" y="1"  width="173" height="58"  fill="rgba(255,255,255,0.013)" />
      {/* Monroe → Juramento */}
      <rect x="1"   y="62" width="88"  height="102" fill="rgba(255,255,255,0.019)" />
      <rect x="91"  y="62" width="133" height="102" fill="rgba(255,255,255,0.022)" />
      <rect x="226" y="62" width="158" height="102" fill="rgba(255,255,255,0.018)" />
      <rect x="386" y="62" width="173" height="102" fill="rgba(255,255,255,0.015)" />
      {/* Juramento → Echeverría — highlighted (store block) */}
      <rect x="1"   y="166" width="88"  height="98" fill="rgba(255,255,255,0.016)" />
      <rect x="91"  y="166" width="133" height="98" fill="rgba(255,255,255,0.019)" />
      <rect x="226" y="166" width="158" height="98" fill="rgba(109,40,217,0.055)" />
      <rect x="386" y="166" width="173" height="98" fill="rgba(255,255,255,0.015)" />
      {/* Echeverría → La Pampa */}
      <rect x="1"   y="266" width="88"  height="83" fill="rgba(255,255,255,0.018)" />
      <rect x="91"  y="266" width="133" height="83" fill="rgba(255,255,255,0.015)" />
      <rect x="226" y="266" width="158" height="83" fill="rgba(255,255,255,0.018)" />
      <rect x="386" y="266" width="173" height="83" fill="rgba(255,255,255,0.013)" />
      {/* La Pampa → bottom */}
      <rect x="1"   y="351" width="558" height="68" fill="rgba(255,255,255,0.010)" />

      {/* ── HORIZONTAL STREETS ── */}
      {/* Monroe */}
      <line x1="0" y1="60"  x2="560" y2="60"  stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      {/* Juramento — slightly heavier (bigger street) */}
      <line x1="0" y1="165" x2="560" y2="165" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      {/* Echeverría */}
      <line x1="0" y1="265" x2="560" y2="265" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
      {/* La Pampa */}
      <line x1="0" y1="350" x2="560" y2="350" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      {/* Sucre — near bottom */}
      <line x1="0" y1="405" x2="560" y2="405" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />

      {/* ── VERTICAL STREETS ── */}
      {/* Secondary west */}
      <line x1="90"  y1="0" x2="90"  y2="420" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" />
      {/* Vuelta de Obligado */}
      <line x1="385" y1="0" x2="385" y2="420" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

      {/* ── AV. CABILDO — protagonist ── */}
      <line x1="225" y1="0" x2="225" y2="420" stroke="rgba(255,255,255,0.42)" strokeWidth="3" />

      {/* ── STREET LABELS (left of Cabildo) ── */}
      <text
        x="219" y="56"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="8" fill="rgba(255,255,255,0.30)"
        letterSpacing="1.1" textAnchor="end"
      >
        MONROE
      </text>
      <text
        x="219" y="161"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="8.5" fill="rgba(255,255,255,0.40)"
        letterSpacing="1.1" textAnchor="end"
      >
        JURAMENTO
      </text>
      <text
        x="219" y="261"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="8" fill="rgba(255,255,255,0.30)"
        letterSpacing="1.1" textAnchor="end"
      >
        ECHEVERRÍA
      </text>
      <text
        x="219" y="346"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="7.5" fill="rgba(255,255,255,0.24)"
        letterSpacing="1.1" textAnchor="end"
      >
        LA PAMPA
      </text>

      {/* Cabildo label at top — centered on the avenue */}
      <text
        x="225" y="22"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="9" fill="rgba(255,255,255,0.52)"
        letterSpacing="2.5" textAnchor="middle" fontWeight="700"
      >
        AV. CABILDO
      </text>

      {/* ── BELGRANO C STATION ── */}
      <circle cx="385" cy="165" r="7" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" />
      <circle cx="385" cy="165" r="2.5" fill="rgba(255,255,255,0.65)" />
      <rect x="396" y="158" width="62" height="14" rx="2" fill="rgba(10,10,10,0.55)" />
      <text
        x="400" y="168"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="7" fill="rgba(255,255,255,0.42)"
        letterSpacing="0.6"
      >
        BELGRANO C
      </text>

      {/* ── STORE MARKER at Cabildo 2230 ── */}
      {/* Pulse ring 1 */}
      <circle cx="225" cy="182" r="10" fill="none" stroke="#00E676" strokeWidth="1.5">
        <animate attributeName="r"       values="10;28"   dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.65;0"  dur="2.5s" repeatCount="indefinite" />
      </circle>
      {/* Pulse ring 2 — offset half period */}
      <circle cx="225" cy="182" r="10" fill="none" stroke="#00E676" strokeWidth="1">
        <animate attributeName="r"       values="10;28"  dur="2.5s" begin="1.25s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.45;0" dur="2.5s" begin="1.25s" repeatCount="indefinite" />
      </circle>
      {/* Soft glow disc */}
      <circle cx="225" cy="182" r="9"   fill="rgba(0,230,118,0.16)" />
      {/* Main neon dot */}
      <circle cx="225" cy="182" r="5.5" fill="#00E676" />
      {/* Center highlight */}
      <circle cx="225" cy="182" r="2"   fill="rgba(255,255,255,0.88)" />

      {/* Connector to callout */}
      <line x1="231" y1="182" x2="242" y2="178" stroke="rgba(0,230,118,0.32)" strokeWidth="1" />

      {/* Store callout box */}
      <rect x="242" y="165" width="110" height="32" rx="3" fill="rgba(10,10,10,0.72)" />
      <rect x="242" y="165" width="110" height="32" rx="3" stroke="rgba(0,230,118,0.28)" strokeWidth="1" fill="none" />
      <text
        x="249" y="178"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="9.5" fill="#00E676"
        letterSpacing="0.8" fontWeight="700"
      >
        SPOT GAMES
      </text>
      <text
        x="249" y="191"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="7.5" fill="rgba(255,255,255,0.42)"
        letterSpacing="0.6"
      >
        CABILDO 2230
      </text>

      {/* ── COMPASS ── */}
      <g transform="translate(533,30)">
        <circle r="13" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <text
          x="0" y="-3"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8" fill="rgba(255,255,255,0.48)"
          textAnchor="middle" fontWeight="700"
        >
          N
        </text>
        <line x1="0" y1="1" x2="0" y2="8" stroke="rgba(255,255,255,0.26)" strokeWidth="1" />
      </g>

      {/* ── SCALE BAR ── */}
      <line x1="14" y1="402" x2="74" y2="402" stroke="rgba(255,255,255,0.26)" strokeWidth="1" />
      <line x1="14" y1="398" x2="14" y2="406" stroke="rgba(255,255,255,0.26)" strokeWidth="1" />
      <line x1="74" y1="398" x2="74" y2="406" stroke="rgba(255,255,255,0.26)" strokeWidth="1" />
      <text
        x="44" y="416"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="7" fill="rgba(255,255,255,0.24)"
        textAnchor="middle" letterSpacing="0.8"
      >
        400 M
      </text>
    </svg>
  );
}
