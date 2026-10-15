import './map-screen.css'

type MapDemoScreenProps = { showSchool: boolean; showClub: boolean; showPeople: boolean; showDelay: boolean; compact?: boolean }

export default function MapDemoScreen({ showSchool, showClub, showPeople, showDelay, compact = false }: MapDemoScreenProps) {
  return (
    <div className="map-demo-screen" data-compact={compact} aria-label="Mapa de lugares y ubicaciones compartidas">
      <svg className="map-local-geometry" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
        <rect width="1000" height="600" fill="#EBEEE6" />
        <g fill="#E0E6D7"><rect x="25" y="25" width="190" height="122" rx="18" /><rect x="290" y="25" width="220" height="122" rx="18" /><rect x="570" y="235" width="155" height="195" rx="22" /><rect x="35" y="470" width="175" height="105" rx="18" /></g>
        <g fill="#E9E2D8"><rect x="580" y="30" width="150" height="125" rx="16" /><rect x="800" y="25" width="175" height="127" rx="16" /><rect x="285" y="240" width="220" height="190" rx="16" /><rect x="795" y="470" width="180" height="100" rx="18" /></g>
        <g stroke="#FFFFFF" strokeWidth="26" fill="none"><path d="M0 193H1000M0 450H1000M250 0V600M548 0V600M765 0V600" /></g>
        <g stroke="#D5DCD4" strokeWidth="2" fill="none"><path d="M0 193H1000M0 450H1000M250 0V600M548 0V600M765 0V600" /></g>
      </svg>
      <div className="map-place map-school" data-present={showSchool} aria-hidden={!showSchool}>
        <span className="map-place-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 27V12l11-7 11 7v15H5Zm7 0v-8h8v8M10 14h2m8 0h2M16 5V1h7v4" strokeLinejoin="round" /></svg></span>
        <strong>Colegio</strong>
      </div>
      <div className="map-place map-club" data-present={showClub} aria-hidden={!showClub}>
        <span className="map-place-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="6" width="26" height="20" rx="3" /><path d="M16 6v20M3 12h5v8H3m26-8h-5v8h5" /><circle cx="16" cy="16" r="4" /></svg></span>
        <strong>Club</strong>
        <span className="map-tomi" data-present={showPeople} aria-hidden={!showPeople}>Tomi</span>
      </div>
      <div className="map-delay" data-present={showDelay} aria-hidden={!showDelay}><span>Entrenamiento</span><strong>+1 h</strong></div>
      <div className="map-person map-mom" data-present={showPeople} aria-hidden={!showPeople}><span aria-hidden="true">M</span><strong>Mamá</strong></div>
      <div className="map-person map-dad" data-present={showPeople} aria-hidden={!showPeople}><span aria-hidden="true">P</span><strong>Papá</strong></div>
      <span className="map-sharing" data-present={showPeople} aria-hidden={!showPeople}>Ubicaciones compartidas</span>
    </div>
  )
}
