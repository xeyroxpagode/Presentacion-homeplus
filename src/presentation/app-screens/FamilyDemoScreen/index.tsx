import type { RefObject } from 'react'
import HomeHeader from '../HomeDemoScreen/HomeHeader'
import HomeIcon from '../HomeDemoScreen/HomeIcon'
import { homeVariables } from '../HomeDemoScreen/homeTokens'
import FeedDemoScreen from '../FeedDemoScreen'
import FamilyNavigation from './FamilyNavigation'
import './family-screen.css'

type FamilyDemoScreenProps = { view: 'family' | 'map' | 'feed'; mapSlotRef?: RefObject<HTMLDivElement | null> }

export default function FamilyDemoScreen({ view, mapSlotRef }: FamilyDemoScreenProps) {
  return (
    <div className="home-demo-screen family-demo-screen" style={homeVariables} data-family-view={view} aria-label="Familia HomePlus">
      <HomeHeader showJuli />
      <div className="family-workspace">
        <header className="family-screen-heading"><h1>{view === 'feed' ? 'Feed' : view === 'map' ? 'Mapa' : 'Familia'}</h1></header>
        <div className="family-switch" data-selected={view === 'map' ? 'map' : 'family'} aria-label="Secciones de Familia" aria-hidden={view === 'feed'}>
          <span data-selected={view === 'family'}>Familia</span>
          <span data-selected={view === 'map'}>Mapa</span>
          <span>Lugares</span>
        </div>
        <div className="family-members family-content-layer" data-present={view === 'family'} aria-hidden={view !== 'family'}>
          <div className="family-member-card family-tomi">
            <span className="family-avatar family-avatar-tomi">T</span>
            <div><h2>Tomi</h2><p>Colegio</p></div>
            <HomeIcon name="right" size={18} />
          </div>
          <div className="family-member-card"><span className="family-avatar family-avatar-mom">M</span><div><h3>Mamá</h3><p>Casa</p></div></div>
          <div className="family-member-card"><span className="family-avatar family-avatar-dad">P</span><div><h3>Papá</h3><p>Trabajo</p></div></div>
        </div>
        <div className="family-map-product family-content-layer" data-present={view === 'map'} aria-hidden={view !== 'map'}>
          <div ref={mapSlotRef} className="family-map-slot" />
          <div className="family-now">
            <span className="family-avatar family-avatar-tomi">T</span>
            <div><strong>Tomi · Club</strong><p>Entrenamiento <b>+1 h</b></p></div>
          </div>
        </div>
        <div className="family-feed-product family-content-layer" data-present={view === 'feed'} aria-hidden={view !== 'feed'}>
          <FeedDemoScreen />
        </div>
      </div>
      <FamilyNavigation />
      <div className="home-system-indicator" aria-hidden="true" />
    </div>
  )
}
