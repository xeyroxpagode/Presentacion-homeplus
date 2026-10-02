import type { SlideProps } from '../../presentationTypes'
import AmbientGlow from '../../components/AmbientGlow'
import expo from '../../assets/tech/expo.svg'
import nodejs from '../../assets/tech/nodejs.svg'
import postgresql from '../../assets/tech/postgresql.svg'
import reactNative from '../../assets/tech/react-native.svg'
import supabase from '../../assets/tech/supabase.svg'
import './s12-layers.css'

const frontendStack = [
  { name: 'React Native', src: reactNative },
  { name: 'Expo', src: expo },
]

const backendStack = [
  { name: 'Node.js', src: nodejs },
  { name: 'Supabase', src: supabase },
  { name: 'PostgreSQL', src: postgresql },
]

export default function S12FrontendBackend({ stepIndex }: SlideProps) {
  return (
    <div className="s12-stage" data-step={stepIndex} aria-label="Frontend y backend">
      <AmbientGlow x={640} y={360} size={900} intensity={0.6} opacity={0.14} />
      <div className="s12-panels">
        <section className="s12-panel" aria-label="Frontend">
          <h1 className="s12-title">Frontend</h1>
          <p className="s12-desc">La app que usás</p>
          <ul className="s12-tech">
            {frontendStack.map(tech => (
              <li key={tech.name}>
                <img src={tech.src} alt="" aria-hidden="true" draggable={false} />
                <span>{tech.name}</span>
              </li>
            ))}
          </ul>
        </section>
        <div className="s12-bridge" data-visible={stepIndex >= 2} aria-hidden={stepIndex < 2}>
          <span className="s12-bridge-line" aria-hidden="true" />
          <span className="s12-bridge-node" aria-hidden="true" />
        </div>
        <section className="s12-panel" data-visible={stepIndex >= 1} aria-hidden={stepIndex < 1} aria-label="Backend">
          <h1 className="s12-title">Backend</h1>
          <p className="s12-desc">Datos y servicios</p>
          <ul className="s12-tech">
            {backendStack.map(tech => (
              <li key={tech.name}>
                <img src={tech.src} alt="" aria-hidden="true" draggable={false} />
                <span>{tech.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
