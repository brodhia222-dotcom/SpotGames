type IconProps = { className?: string };

export const RepairIcon = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="14" y="28" width="36" height="20" rx="10" />
    <circle cx="22" cy="38" r="3" fill="currentColor" />
    <circle cx="42" cy="38" r="3" fill="currentColor" />
    <line x1="32" y1="28" x2="32" y2="22" />
    <circle cx="32" cy="20" r="2" fill="currentColor" />
    <line x1="42" y1="20" x2="50" y2="12" />
    <rect x="47" y="6" width="8" height="6" rx="1" transform="rotate(45 51 9)" />
  </svg>
);

export const TradeIcon = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="20" width="22" height="14" rx="7" />
    <rect x="36" y="30" width="22" height="14" rx="7" />
    <polyline points="30,22 38,22 36,19" />
    <line x1="30" y1="22" x2="38" y2="22" />
    <polyline points="34,42 26,42 28,39" />
    <line x1="34" y1="42" x2="26" y2="42" />
  </svg>
);

export const RetroIcon = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 12 L50 12 L50 44 L44 44 L44 52 L20 52 L20 44 L14 44 Z" />
    <line x1="20" y1="20" x2="44" y2="20" />
    <rect x="24" y="26" width="16" height="10" />
    <line x1="22" y1="46" x2="42" y2="46" strokeDasharray="2 2" />
  </svg>
);

export const ShipIcon = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="20" width="44" height="32" />
    <line x1="10" y1="30" x2="54" y2="30" />
    <line x1="32" y1="20" x2="32" y2="52" />
    <polyline points="22,12 32,4 42,12" />
    <line x1="32" y1="4" x2="32" y2="20" />
  </svg>
);

export const AdviceIcon = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 14 L56 14 L56 42 L36 42 L28 52 L28 42 L8 42 Z" />
    <rect x="18" y="22" width="28" height="14" rx="7" />
    <circle cx="24" cy="29" r="2" fill="currentColor" />
    <circle cx="40" cy="29" r="2" fill="currentColor" />
  </svg>
);
