import mapArtwork from '../../assets/illustrations/family-neighborhood-map.svg'
import HomeIcon from '../../app-screens/HomeDemoScreen/HomeIcon'
import './family-map-intro.css'

const places = [
  { name: 'Casa', x: 17, y: 47, icon: 'M3 11 12 4l9 7v9h-6v-6H9v6H3z' },
  { name: 'Colegio', x: 36, y: 26, icon: 'm2 9 10-5 10 5-10 5zM6 11v6q6 5 12 0v-6' },
  { name: 'Trabajo', x: 77, y: 27, icon: 'M8 7V4h8v3M4 7h16v13H4zM4 13h16' },
  { name: 'Gimnasio', x: 29, y: 71, icon: 'M3 9v6m4-9v12m10-12v12m4-9v6M7 12h10' },
  { name: 'Club de Tomi', x: 69, y: 67, icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5 4 3-2 5h-4l-2-5z' },
]

export default function FamilyMapIntro({ phase, active, snapshot }: { phase: number; active: boolean; snapshot: boolean }) {
  const tomiProfile = phase === 3
  return (
    <section className="r01-stage family-map-intro" data-active={active} data-phase={phase} data-snapshot={snapshot}
      aria-hidden={!active} aria-label="Mapa de Familia García">
      <div className="family-map-canvas">
        <img src={mapArtwork} alt="" />
        <div className="family-map-caption">
          <h2>Familia · Mapa</h2>
          <p>{phase === 0 ? 'Lugares del día a día' : 'Ubicación compartida voluntariamente'}</p>
        </div>
        {places.map(place => (
          <div key={place.name} className="family-map-marker" style={{ left: `${place.x}%`, top: `${place.y}%` }}>
            <span className="family-map-pin">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d={place.icon} /></svg>
            </span>
            <strong>{place.name}</strong>
          </div>
        ))}
        <div className="family-map-marker family-map-member family-map-mom" aria-hidden={phase === 0}>
          <span className="family-map-pin">M</span><strong>Mamá · Trabajo</strong>
        </div>
        <div className="family-map-marker family-map-member family-map-dad" aria-hidden={phase === 0}>
          <span className="family-map-pin">P</span><strong>Papá · En camino</strong>
        </div>
      </div>
      <header className="r01-topbar">
        <div className="family-map-profile" aria-label={tomiProfile ? 'Perfil de Tomi' : 'Perfil de Juli'}>
          <span className="r01-j-avatar">{tomiProfile ? 'T' : 'J'}</span>
          <strong>{tomiProfile ? 'Tomi' : 'Juli'}</strong>
        </div>
        <div className="r01-family-name">Familia García <HomeIcon name="down" /></div>
        <div className="r01-top-actions"><HomeIcon name="search" /><HomeIcon name="bell" /></div>
      </header>
      <div className="family-map-dim" aria-hidden="true" />
      <span className="family-map-hero" aria-hidden="true">T</span>
      <div className="family-map-intro-name" aria-hidden={phase !== 2}>
        <strong>Tomi</strong><span>16 años · Integrante de la familia</span>
      </div>
      <nav className="r01-nav" aria-label="Navegación representada de HomePlus">
        <span className="r01-nav-item"><HomeIcon name="home" /></span>
        <span className="r01-nav-item r01-nav-active" aria-current="page" aria-label="Familia"><HomeIcon name="family" /></span>
        <span className="r01-nav-item r01-nav-plus"><HomeIcon name="add" /></span>
        <span className="r01-nav-item"><HomeIcon name="calendar" /></span>
        <span className="r01-nav-item"><HomeIcon name="more" /></span>
      </nav>
    </section>
  )
}
