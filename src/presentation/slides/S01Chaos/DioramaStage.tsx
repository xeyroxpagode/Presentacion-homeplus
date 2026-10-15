// S01 V2.1 — Escenografía: cocina-diorama 2.5D editorial.
// Piso implícito en perspectiva (sin frente macizo), mesa doméstica con
// cuatro patas + cajón integrado, y heladera independiente apoyada en el
// piso. Reemplaza la tarima/repisa anterior.

export function DioramaFloor() {
  return (
    <svg className="chaos-floor" viewBox="0 0 1280 720" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="s01-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgb(44 33 25 / 0.5)" />
          <stop offset="0.5" stopColor="rgb(30 23 17 / 0.26)" />
          <stop offset="1" stopColor="rgb(6 4 4 / 0)" />
        </linearGradient>
        <radialGradient id="s01-contact" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgb(0 0 0 / 0.5)" />
          <stop offset="1" stopColor="rgb(0 0 0 / 0)" />
        </radialGradient>
      </defs>
      <g className="stage-reveal stage-floor">
        <polygon points="210,455 1085,455 1190,655 80,655" fill="url(#s01-floor)" />
        {/* Sombras de contacto ancladas al suelo, mismas físicas de luz */}
        <ellipse cx="308" cy="569" rx="24" ry="5" fill="url(#s01-contact)" opacity="0.65" />
        <ellipse cx="748" cy="564" rx="24" ry="5" fill="url(#s01-contact)" opacity="0.65" />
        <ellipse cx="237" cy="621" rx="34" ry="7" fill="url(#s01-contact)" />
        <ellipse cx="808" cy="621" rx="35" ry="7" fill="url(#s01-contact)" />
        <ellipse cx="966" cy="574" rx="98" ry="10" fill="url(#s01-contact)" opacity="0.8" />
      </g>
    </svg>
  )
}

export function DioramaTable() {
  return (
    <svg className="chaos-table" viewBox="0 0 1280 720" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="s01-tabletop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B3227" />
          <stop offset="1" stopColor="#2B231A" />
        </linearGradient>
        <linearGradient id="s01-leg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4A3E2E" />
          <stop offset="0.4" stopColor="#2C241A" />
          <stop offset="1" stopColor="#191410" />
        </linearGradient>
      </defs>
      <g className="stage-reveal stage-table">
        {/* Patas traseras, parcialmente ocluidas por faldón y tablero */}
        <polygon points="299,426 317,426 315,571 301,571" fill="#1F1913" />
        <polygon points="739,427 757,427 755,566 741,566" fill="#1F1913" />
        {/* Faldón delantero: 28px, sin llegar al piso (anti-repisa) */}
        <polygon points="200,451 830,451 830,479 200,479" fill="#241D15" />
        <polyline points="202,452 828,452" fill="none" stroke="rgb(255 235 200 / 0.05)" strokeWidth="1" />
        {/* Cavidad del cajón integrado (sombra interior visible al abrir) */}
        <rect x="634" y="449" width="136" height="26" fill="#0C0A08" />
        {/* Tablero superior en perspectiva */}
        <polygon points="270,345 755,345 845,438 185,438" fill="url(#s01-tabletop)" />
        <path d="M330,372 L760,372 M300,398 L806,398 M288,420 L824,420" fill="none" stroke="rgb(0 0 0 / 0.13)" strokeWidth="1" />
        <polyline points="270,345 755,345" fill="none" stroke="rgb(255 235 200 / 0.1)" strokeWidth="1.5" />
        {/* Canto frontal del tablero: 13px de espesor */}
        <polygon points="185,438 845,438 845,451 185,451" fill="#211A12" />
        <polyline points="185,438 845,438" fill="none" stroke="rgb(255 235 200 / 0.07)" strokeWidth="1" />
        {/* Patas delanteras, delante del faldón */}
        <polygon points="225,456 248,456 245,622 228,622" fill="url(#s01-leg)" />
        <polygon points="796,456 820,456 817,622 800,622" fill="url(#s01-leg)" />
      </g>
    </svg>
  )
}

export function FridgeUnit() {
  return (
    <div className="chaos-fridge-rig" aria-hidden="true">
      <svg className="chaos-fridge-body" viewBox="0 0 200 390" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="s01-fridge-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#716B65" />
            <stop offset="1" stopColor="#55504A" />
          </linearGradient>
          <linearGradient id="s01-fridge-door" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#78726C" />
            <stop offset="1" stopColor="#5F5A54" />
          </linearGradient>
        </defs>
        {/* Techo discreto */}
        <polygon points="12,8 167,8 192,22 37,22" fill="#7E7871" />
        {/* Frente */}
        <polygon points="12,22 167,22 167,372 12,372" fill="url(#s01-fridge-front)" />
        {/* Lateral derecho */}
        <polygon points="167,22 192,22 192,372 167,372" fill="#4A443E" />
        {/* Base al suelo */}
        <rect x="12" y="372" width="180" height="17" fill="#3A3530" />
        {/* Cavidad interior oscura (visible sólo con puertas entreabiertas) */}
        <rect x="17" y="28" width="144" height="332" fill="#0B0908" />
        <path d="M22,92 H156 M22,152 H156 M22,212 H156 M22,272 H156" fill="none" stroke="rgb(120 112 100 / 0.13)" strokeWidth="3" />
      </svg>
      <div className="chaos-door chaos-door-top">
        <svg viewBox="0 0 148 138" aria-hidden="true" focusable="false">
          <rect x="0" y="0" width="148" height="138" rx="3" fill="url(#s01-fridge-door)" />
          <rect x="4" y="4" width="140" height="130" rx="2" fill="none" stroke="rgb(0 0 0 / 0.22)" strokeWidth="1.5" />
          <rect x="131" y="46" width="8" height="46" rx="4" fill="#9B958E" />
          <rect x="131" y="46" width="8" height="46" rx="4" fill="none" stroke="rgb(0 0 0 / 0.3)" strokeWidth="1" />
        </svg>
      </div>
      <div className="chaos-door chaos-door-bottom">
        <svg viewBox="0 0 148 192" aria-hidden="true" focusable="false">
          <rect x="0" y="0" width="148" height="192" rx="3" fill="url(#s01-fridge-door)" />
          <rect x="4" y="4" width="140" height="184" rx="2" fill="none" stroke="rgb(0 0 0 / 0.22)" strokeWidth="1.5" />
          <rect x="131" y="70" width="8" height="62" rx="4" fill="#9B958E" />
          <rect x="131" y="70" width="8" height="62" rx="4" fill="none" stroke="rgb(0 0 0 / 0.3)" strokeWidth="1" />
        </svg>
      </div>
      <div className="chaos-light" />
      <div className="chaos-smoke">
        <svg viewBox="0 0 108 78" aria-hidden="true" focusable="false">
          <defs>
            <radialGradient id="s01-smoke" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="rgb(150 142 132 / 0.85)" />
              <stop offset="1" stopColor="rgb(150 142 132 / 0)" />
            </radialGradient>
          </defs>
          <ellipse cx="38" cy="46" rx="30" ry="20" fill="url(#s01-smoke)" />
          <ellipse cx="70" cy="32" rx="26" ry="18" fill="url(#s01-smoke)" />
          <ellipse cx="56" cy="58" rx="24" ry="14" fill="url(#s01-smoke)" />
        </svg>
      </div>
    </div>
  )
}

export default function DioramaStage() {
  return (
    <>
      <DioramaFloor />
      <DioramaTable />
    </>
  )
}
