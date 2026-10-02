import HomeHeader from './HomeHeader'
import HomeNavigation from './HomeNavigation'
import HomeRow from './HomeRow'
import { homeVariables } from './homeTokens'
import './home-screen.css'

export type HomeDemoScreenProps = {
  showJuli?: boolean
  educationPhysical?: boolean
  authorization?: boolean
  schoolTask?: boolean
  complete?: boolean
  authorizationCompleted?: boolean
  schoolTaskCompleted?: boolean
  focus?: 'educationPhysical' | 'authorization' | 'schoolTask' | null
}

// All rows stay mounted. Completion and focus are declarative presentation data.
export default function HomeDemoScreen({ showJuli = false, educationPhysical = false,
  authorization = false, schoolTask = false, complete = false,
  authorizationCompleted = false, schoolTaskCompleted = false, focus = null }: HomeDemoScreenProps) {
  return (
    <div className="home-demo-screen" style={homeVariables} aria-label="Home de Juli">
      <HomeHeader showJuli={showJuli} />
      <div className="home-demo-content">
        <p className="home-current-date">Domingo, 16 de agosto</p>
        <section className="home-section" aria-label="Hoy">
          <h2 className="home-section-heading">Hoy</h2>
          <div className="home-rows-card">
            <HomeRow id="authorization" title="Llevar autorización" kind="task" attention={authorization} complete={complete}
              completed={authorizationCompleted} focused={focus === 'authorization'} />
            <HomeRow id="schoolTask" title="Tarea de Matemática" kind="task" attention={schoolTask} complete={complete}
              completed={schoolTaskCompleted} focused={focus === 'schoolTask'} />
          </div>
        </section>
        <section className="home-section" aria-label="Próximamente">
          <h2 className="home-section-heading">Próximamente</h2>
          <div className="home-rows-card">
            <HomeRow id="educationPhysical" title="Educación Física" kind="event" attention={educationPhysical} complete={complete}
              focused={focus === 'educationPhysical'} />
          </div>
        </section>
      </div>
      <HomeNavigation />
      <div className="home-system-indicator" aria-hidden="true" />
    </div>
  )
}
