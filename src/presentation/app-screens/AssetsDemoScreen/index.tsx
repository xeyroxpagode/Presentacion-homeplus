import HomeHeader from '../HomeDemoScreen/HomeHeader'
import { homeVariables } from '../HomeDemoScreen/homeTokens'
import AssetsNavigation from './AssetsNavigation'
import { homeAssets, ps5Documents } from './assetsData'
import '../HomeDemoScreen/home-screen.css'
import './assets-screen.css'

export type AssetsView = 'list' | 'detail'

export default function AssetsDemoScreen({ view = 'list' }: { view?: AssetsView }) {
  const ps5 = homeAssets[0]
  return (
    <div className="home-demo-screen assets-demo-screen" style={homeVariables} data-assets-view={view} aria-label="Activos HomePlus">
      <HomeHeader showJuli />
      <div className="assets-workspace">
        {view === 'list' ? (
          <>
            <header className="assets-heading"><h1>Activos</h1></header>
            <div className="assets-card">
              {homeAssets.map(asset => (
                <div key={asset.id} className="assets-row" data-asset={asset.id}>
                  <span className="assets-tile" aria-hidden="true">{asset.name.charAt(0)}</span>
                  <div className="assets-row-copy">
                    <p className="assets-row-title">{asset.name}</p>
                    <p className="assets-row-meta">{asset.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="assets-hero">
              <span className="assets-hero-tile" aria-hidden="true">{ps5.name.charAt(0)}</span>
              <div className="assets-row-copy">
                <p className="assets-hero-title">{ps5.name}</p>
                <p className="assets-row-meta">{ps5.detail}</p>
              </div>
            </div>
            <h2 className="assets-section-label">Documentos</h2>
            <div className="assets-card">
              {ps5Documents.map(doc => (
                <div key={doc.id} className="assets-doc-row">
                  <span className="assets-doc-tile" aria-hidden="true">PDF</span>
                  <div className="assets-row-copy">
                    <p className="assets-row-title">{doc.title}</p>
                    <p className="assets-row-meta">{doc.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <AssetsNavigation />
      <div className="home-system-indicator" aria-hidden="true" />
    </div>
  )
}
