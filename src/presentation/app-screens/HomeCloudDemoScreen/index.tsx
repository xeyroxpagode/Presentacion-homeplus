import HomeHeader from '../HomeDemoScreen/HomeHeader'
import { homeVariables } from '../HomeDemoScreen/homeTokens'
import HomeCloudNavigation from './HomeCloudNavigation'
import { cloudAlbumsRow, cloudDocuments, cloudMemories, cloudVoiceNote } from './homecloudData'
import '../HomeDemoScreen/home-screen.css'
import './homecloud-screen.css'

export type HomeCloudTab = 'documentos' | 'recuerdos'

export default function HomeCloudDemoScreen({ tab = 'documentos' }: { tab?: HomeCloudTab }) {
  return (
    <div className="home-demo-screen homecloud-demo-screen" style={homeVariables} data-cloud-tab={tab} aria-label="HomeCloud HomePlus">
      <HomeHeader showJuli />
      <div className="homecloud-workspace">
        <header className="homecloud-heading"><h1>HomeCloud</h1></header>
        <div className="homecloud-tabs" role="tablist" aria-label="Secciones de HomeCloud">
          {(['documentos', 'recuerdos'] as const).map(name => (
            <span key={name} className="homecloud-tab" role="tab" aria-selected={tab === name}>
              {name === 'documentos' ? 'Documentos' : 'Recuerdos'}
            </span>
          ))}
        </div>
        {tab === 'documentos' ? (
          <>
            <h2 className="homecloud-section-label">Recientes</h2>
            <div className="homecloud-card">
              {cloudDocuments.map(doc => (
                <div key={doc.id} className="homecloud-doc-row">
                  <span className="assets-doc-tile" aria-hidden="true">PDF</span>
                  <div className="assets-row-copy">
                    <p className="assets-row-title homecloud-doc-title">{doc.title}</p>
                    <p className="assets-row-meta">{doc.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="homecloud-section-label">Fotos</h2>
            <div className="homecloud-photos">
              {cloudMemories.map(memory => (
                <div key={memory.id} className="homecloud-photo">
                  <span className="homecloud-photo-thumb" data-memory={memory.id} aria-hidden="true" />
                  <p className="homecloud-photo-title">{memory.title}</p>
                  <p className="homecloud-photo-date">{memory.date}</p>
                </div>
              ))}
            </div>
            <div className="homecloud-voice">
              <span className="homecloud-play" aria-hidden="true" />
              <div className="homecloud-wave" aria-hidden="true">
                <span style={{ height: 8 }} /><span style={{ height: 14 }} /><span style={{ height: 20 }} /><span style={{ height: 12 }} /><span style={{ height: 17 }} /><span style={{ height: 9 }} /><span style={{ height: 15 }} />
              </div>
              <div className="assets-row-copy">
                <p className="assets-row-title homecloud-voice-title">{cloudVoiceNote.title}</p>
                <p className="assets-row-meta">{cloudVoiceNote.meta}</p>
              </div>
            </div>
            <h2 className="homecloud-section-label">Álbumes</h2>
            <div className="homecloud-card">
              <div className="homecloud-album-row">
                <div className="assets-row-copy">
                  <p className="assets-row-title">{cloudAlbumsRow.title}</p>
                  <p className="assets-row-meta">{cloudAlbumsRow.meta}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <HomeCloudNavigation />
      <div className="home-system-indicator" aria-hidden="true" />
    </div>
  )
}
