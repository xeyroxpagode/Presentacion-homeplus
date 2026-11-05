import type { CSSProperties } from 'react'
import type { SlideProps } from '../../presentationTypes'
import figma from '../../assets/tech/figma.png'
import react from '../../assets/tech/react-native.png'
import expo from '../../assets/tech/expo.png'
import node from '../../assets/tech/nodejs.png'
import supabase from '../../assets/tech/supabase.png'
import postgres from '../../assets/tech/postgresql.png'
import ai from '../../assets/tech/ai.png'
import homiOrb from '../../assets/illustrations/homi-orb.svg'
import './s13-stack.css'

const tech = [
  { id: 'figma', name: 'Figma', subtitle: 'Diseño', color: '#F24E1E', mark: [figma], title: 'Figma', caption: 'Diseño', kind: 'figma' },
  { id: 'react', name: 'RN + Expo', subtitle: 'Aplicación', color: '#61DAFB', mark: [react, expo], title: 'React Native', caption: 'Expo · Aplicación', kind: 'react' },
  { id: 'node', name: 'Node.js', subtitle: 'Lógica', color: '#72BD5A', mark: [node], title: 'Node.js', caption: 'Lógica', kind: 'node' },
  { id: 'data', name: 'Supabase', subtitle: 'Datos', color: '#3ECF8E', mark: [supabase, postgres], title: 'Supabase', caption: 'PostgreSQL · Datos', kind: 'data' },
  { id: 'ai', name: 'IA', subtitle: 'Inteligencia', color: '#EFAE89', mark: [ai], title: 'IA', caption: 'Integrada en HomePlus', kind: 'ai' },
] as const

function Logo({ files, compact = false }: { files: readonly string[]; compact?: boolean }) {
  return <span className={`s13-logo${compact ? ' s13-logo-compact' : ''}`}>{files.length ? files.map((file) => <img key={file} src={file} alt="" draggable={false} />) : <svg viewBox="0 0 100 100" aria-hidden="true"><path d="m50 10 8 25 24 8-24 8-8 25-8-25-24-8 24-8Z"/></svg>}</span>
}

function Demo({ kind }: { kind: typeof tech[number]['kind'] }) {
  if (kind === 'figma') return <div className="s13-demo s13-figma"><article><header>HomePlus <i /></header><div className="s13-window-hero"><small>FAMILIA GARCÍA</small>Hola, Juli.</div><p><i /> Tareas y planes</p><p><i /> Calendario familiar</p></article><article><header>HomePlus <i /></header><div className="s13-window-hero"><small>ORGANIZACIÓN</small>Tareas y planes</div><p><i /> Responsabilidades</p><p><i /> Horarios</p></article><article><header>HomePlus <i /></header><div className="s13-window-hero"><small>FAMILIA GARCÍA</small>Todo en un lugar.</div><p><i /> Finanzas y hogar</p><p><i /> Recuerdos</p></article></div>
  if (kind === 'react') return <div className="s13-demo s13-react"><span className="s13-phone-ghost" /><article className="s13-phone"><i className="s13-notch"/><b>HomePlus</b><small>Hola, Juli</small><div>Hoy en casa<span>3 tareas para hoy</span></div><div>Plan familiar<span>Esta semana</span></div><div>Finanzas<span>Movimientos recientes</span></div><footer>⌂　♡　＋　▦</footer></article></div>
  if (kind === 'node') return <div className="s13-demo s13-node"><div className="s13-node-track">
    {['Entrada', 'Validar', 'Guardar'].map((label, index) => (
      <div className="s13-node-stage" key={label} style={{ '--delay': `${index * 950}ms` } as CSSProperties}>
        <article><b>{['↘', '✓', '↓'][index]}</b><span>{label}</span></article>
        {index < 2 && <span className="s13-node-link" aria-hidden="true" />}
      </div>
    ))}
  </div></div>
  if (kind === 'data') return <div className="s13-demo s13-data"><div className="s13-data-track">
    <div className="s13-records">{['Gastos', 'Tareas', 'Familia'].map((label, index) => (
      <span key={label} style={{ '--delay': `${index * 1000}ms` } as CSSProperties}>{label}</span>
    ))}</div>
    <svg className="s13-data-routes" viewBox="0 0 160 160" preserveAspectRatio="none" aria-hidden="true">
      {[27, 80, 133].map((y, index) => {
        const route = `M0 ${y} H24 C65 ${y} 71 80 114 80 H160`
        return <g key={y} style={{ '--delay': `${index * 1000}ms` } as CSSProperties}>
          <path d={route} /><path className="s13-route-pulse" d={route} pathLength="1" />
        </g>
      })}
    </svg>
    <svg className="s13-db" viewBox="0 0 140 130" role="img" aria-label="Base de datos PostgreSQL">
      <path className="s13-db-body" d="M9 22H131V104C131 115 104 124 70 124S9 115 9 104Z" />
      <ellipse cx="70" cy="22" rx="61" ry="16" />
      <path className="s13-db-seams" d="M9 50C9 61 36 70 70 70S131 61 131 50M9 77C9 88 36 97 70 97S131 88 131 77" />
    </svg>
  </div><small>PostgreSQL</small></div>
  return <div className="s13-demo s13-ai">
    <svg className="s13-ai-lines" viewBox="0 0 600 340" preserveAspectRatio="none" aria-hidden="true">
      {['M192 90 C235 90 224 143 259 143', 'M408 90 C365 90 376 143 341 143',
        'M192 250 C235 250 224 197 259 197', 'M408 250 C365 250 376 197 341 197'].map((path, index) => (
        <g key={path} style={{ '--signal-delay': `${index * 380}ms` } as CSSProperties}>
          <path d={path} /><path d={path} pathLength="1" className="s13-ai-pulse" />
        </g>
      ))}
    </svg>
    <div className="s13-ai-hub"><img src={homiOrb} alt="" /><strong>Homi</strong></div>
    {[
      ['01', 'Calendario', 'Eventos y horarios'],
      ['02', 'Familia', 'Contexto de cada integrante'],
      ['03', 'Finanzas', 'Compras y pagos'],
      ['04', 'Hogar', 'Tareas y pendientes'],
    ].map(([number, title, detail]) => (
      <article className="s13-ai-source" key={title} data-source={number}>
        <span>{number}</span><strong>{title}</strong><small>{detail}</small>
      </article>
    ))}
  </div>
}

export default function S13Stack({ stepIndex }: SlideProps) {
  const focus = stepIndex - 1
  return <main className="s13-stack-stage" data-focus={focus} aria-label="Así construimos HomePlus: stack tecnológico">
    <h1 className="s13-stack-title">Así construimos HomePlus.</h1>
    <div className="s13-stack-cards">{tech.map((item, i) => {
      const focused = focus === i
      const docked = focus >= 0 && !focused
      return <article key={item.id} className={`s13-card${focused ? ' is-focused' : ''}${docked ? ' is-docked' : ''}`} style={{ '--card-color': item.color, '--overview-left': `${68 + i * 232}px`, '--dock-left': `${100 + i * 194}px` } as CSSProperties}>
        <div className="s13-card-mini"><Logo files={item.mark} compact={docked}/><b>{item.name}</b></div>
        {focused && <div className="s13-card-detail"><section className="s13-card-copy"><Logo files={item.mark}/><h2>{item.title}</h2><i/></section><Demo kind={item.kind}/></div>}
      </article>
    })}</div>
  </main>
}
