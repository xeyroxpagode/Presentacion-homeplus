import type { SlideProps } from '../../presentationTypes'
import AmbientGlow from '../../components/AmbientGlow'
import ai from '../../assets/tech/ai.svg'
import expo from '../../assets/tech/expo.svg'
import figmaColor from '../../assets/tech/figma-color.svg'
import nodejs from '../../assets/tech/nodejs.svg'
import nodejsColor from '../../assets/tech/nodejs-color.svg'
import postgresql from '../../assets/tech/postgresql.svg'
import postgresqlColor from '../../assets/tech/postgresql-color.svg'
import reactNative from '../../assets/tech/react-native.svg'
import reactNativeColor from '../../assets/tech/react-native-color.svg'
import supabase from '../../assets/tech/supabase.svg'
import supabaseColor from '../../assets/tech/supabase-color.svg'
import './s13-stack.css'

type StackTech = { name: string; role: string; src: string; tint?: string }

const frontendStack: StackTech[] = [
  { name: 'React Native', role: 'Interfaz móvil', src: reactNative, tint: reactNativeColor },
  { name: 'Expo', role: 'Build y preview', src: expo },
]

const backendStack: StackTech[] = [
  { name: 'Node.js', role: 'API y lógica', src: nodejs, tint: nodejsColor },
  { name: 'Supabase', role: 'Auth y datos', src: supabase, tint: supabaseColor },
  { name: 'PostgreSQL', role: 'Base de datos', src: postgresql, tint: postgresqlColor },
]

function TechRow({ tech, enriched, index }: { tech: StackTech; enriched: boolean; index: number }) {
  return (
    <li>
      {tech.tint ? (
        <span className="s13-mark" data-tint={enriched}>
          <img className="s13-mark-mono" src={tech.src} alt="" aria-hidden="true" draggable={false} />
          <img className="s13-mark-tint" src={tech.tint} alt="" aria-hidden="true" draggable={false} />
        </span>
      ) : (
        <img className="s13-mark-single" src={tech.src} alt="" aria-hidden="true" draggable={false} />
      )}
      <div className="s13-tech-copy">
        <span>{tech.name}</span>
        {enriched && <em className="s13-role" style={{ animationDelay: `${index * 70}ms` }}>{tech.role}</em>}
      </div>
    </li>
  )
}

export default function S13Stack({ stepIndex }: SlideProps) {
  return (
    <div className="s13-stage" data-step={stepIndex} aria-label="Stack tecnológico">
      <AmbientGlow x={640} y={360} size={900} intensity={0.6} opacity={0.14} />
      <div className="s13-core-glow" data-visible={stepIndex >= 3} aria-hidden="true">
        <AmbientGlow x={640} y={360} size={360} intensity={0.55} opacity={0.9} />
      </div>
      <div className="s13-panels">
        <section className="s13-panel" aria-label="Frontend">
          <h1 className="s13-title">Frontend</h1>
          <p className="s13-desc">La app que usás</p>
          <ul className="s13-tech">
            {frontendStack.map((tech, i) => (
              <TechRow key={tech.name} tech={tech} enriched={stepIndex >= 1} index={i} />
            ))}
          </ul>
        </section>
        <div className="s13-center" data-visible={stepIndex >= 3} aria-hidden={stepIndex < 3}>
          <div className="s13-center-item">
            <img src={figmaColor} alt="" aria-hidden="true" draggable={false} />
            <span>Figma</span>
            <em>Diseño</em>
          </div>
          <div className="s13-center-item">
            <img src={ai} alt="" aria-hidden="true" draggable={false} />
            <span>IA</span>
          </div>
        </div>
        <div className="s13-bridge" aria-hidden="true">
          <span className="s13-bridge-line" aria-hidden="true" />
          <span className="s13-bridge-node" aria-hidden="true" />
        </div>
        <section className="s13-panel" aria-label="Backend">
          <h1 className="s13-title">Backend</h1>
          <p className="s13-desc">Datos y servicios</p>
          <ul className="s13-tech">
            {backendStack.map((tech, i) => (
              <TechRow key={tech.name} tech={tech} enriched={stepIndex >= 2} index={i} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
