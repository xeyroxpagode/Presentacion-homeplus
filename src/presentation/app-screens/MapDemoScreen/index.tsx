import './map-screen.css'
import mapArtwork from '../../assets/illustrations/family-neighborhood-map.svg'

type MapDemoScreenProps = { showSchool: boolean; showClub: boolean; highlightClub?: boolean; compact?: boolean }

export default function MapDemoScreen({ showSchool, showClub, highlightClub = false, compact = false }: MapDemoScreenProps) {
  return (
    <div className="map-demo-screen" data-compact={compact} role="group" aria-label="Mapa ilustrativo con Colegio y Club; sin ubicación GPS real">
      <img className="map-base-image" src={mapArtwork} alt="" draggable={false} />
      <div className="map-place map-school" data-present={showSchool} aria-hidden={!showSchool}>
        <span className="map-place-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 27V12l11-7 11 7v15H5Zm7 0v-8h8v8M10 14h2m8 0h2M16 5V1h7v4" strokeLinejoin="round" /></svg></span>
        <strong>Colegio</strong>
      </div>
      <div className="map-place map-club" data-present={showClub} data-highlight={highlightClub} aria-hidden={!showClub}>
        <span className="map-place-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M8 11v10M12 13v6M20 13v6M24 11v10M12 16h8"/><path d="M5 13v6m22-6v6"/></svg></span>
        <strong>Club</strong>
      </div>
      <span className="map-illustration-note" aria-hidden="true">Mapa ilustrativo · Sin GPS</span>
    </div>
  )
}
