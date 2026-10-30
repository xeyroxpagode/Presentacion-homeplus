import type { CSSProperties } from 'react'
import type { SlideProps } from '../../presentationTypes'
import figma from '../../assets/tech/figma-color.svg'
import react from '../../assets/tech/react-native-color.svg'
import expo from '../../assets/tech/expo.svg'
import node from '../../assets/tech/nodejs-color.svg'
import supabase from '../../assets/tech/supabase-color.svg'
import postgres from '../../assets/tech/postgresql-color.svg'
import './s13-stack.css'

const tech = [
  { id: 'figma', name: 'Figma', subtitle: 'Diseño', color: '#F24E1E', mark: [figma], title: 'Figma', caption: 'Diseño', kind: 'figma' },
  { id: 'react', name: 'RN + Expo', subtitle: 'Aplicación', color: '#61DAFB', mark: [react, expo], title: 'React Native', caption: 'Expo · Aplicación', kind: 'react' },
  { id: 'node', name: 'Node.js', subtitle: 'Lógica', color: '#72BD5A', mark: [node], title: 'Node.js', caption: 'Lógica', kind: 'node' },
  { id: 'data', name: 'Supabase', subtitle: 'Datos', color: '#3ECF8E', mark: [supabase, postgres], title: 'Supabase', caption: 'PostgreSQL · Datos', kind: 'data' },
  { id: 'ai', name: 'IA', subtitle: 'Inteligencia', color: '#EFAE89', mark: [], title: 'IA', caption: 'Integrada en HomePlus', kind: 'ai' },
] as const

function Logo({ files, compact = false }: { files: readonly string[]; compact?: boolean }) {
  return <span className={`s13-logo${compact ? ' s13-logo-compact' : ''}`}>{files.length ? files.map((file) => <img key={file} src={file} alt="" draggable={false} />) : <svg viewBox="0 0 100 100" aria-hidden="true"><path d="m50 10 8 25 24 8-24 8-8 25-8-25-24-8 24-8Z"/></svg>}</span>
}

function Demo({ kind }: { kind: typeof tech[number]['kind'] }) {
  if (kind === 'figma') return <div className="s13-demo s13-figma"><article><header>HomePlus <i /></header><div className="s13-window-hero"><small>FAMILIA GARCÍA</small>Hola, Juli.</div><p><i /> Tareas y planes</p><p><i /> Calendario familiar</p></article><article><header>HomePlus <i /></header><div className="s13-window-hero"><small>ORGANIZACIÓN</small>Tareas y planes</div><p><i /> Responsabilidades</p><p><i /> Horarios</p></article><article><header>HomePlus <i /></header><div className="s13-window-hero"><small>FAMILIA GARCÍA</small>Todo en un lugar.</div><p><i /> Finanzas y hogar</p><p><i /> Recuerdos</p></article></div>
  if (kind === 'react') return <div className="s13-demo s13-react"><span className="s13-phone-ghost" /><article className="s13-phone"><i className="s13-notch"/><b>HomePlus</b><small>Hola, Juli</small><div>Hoy en casa<span>3 tareas para hoy</span></div><div>Plan familiar<span>Esta semana</span></div><div>Finanzas<span>Movimientos recientes</span></div><footer>⌂　♡　＋　▦</footer></article></div>
  if (kind === 'node') return <div className="s13-demo s13-node"><div className="s13-flow-line"/><i className="s13-datum"/>{['Entrada','Validar','Guardar'].map((label, i) => <article key={label} style={{ animationDelay: `${i * 600}ms` }}><b>{['↘','✓','⌂'][i]}</b><span>{label}</span></article>)}</div>
  if (kind === 'data') return <div className="s13-demo s13-data"><div className="s13-records"><span>Gastos</span><span>Tareas</span><span>Familia</span></div><i className="s13-data-line"/><div className="s13-db"><i/><i/><i/></div><small>PostgreSQL · Datos organizados</small></div>
  return <div className="s13-demo s13-ai"><i className="s13-orbit"/><span className="s13-core"><svg viewBox="0 0 100 100" aria-hidden="true"><path d="m50 10 8 25 24 8-24 8-8 25-8-25-24-8 24-8Z"/></svg></span><b className="s13-chip s13-chip-a">Calendario</b><b className="s13-chip s13-chip-b">Familia</b><b className="s13-chip s13-chip-c">Finanzas</b><b className="s13-chip s13-chip-d">Hogar</b></div>
}

export default function S13Stack({ stepIndex }: SlideProps) {
  const focus = stepIndex - 1
  return <main className="s13-stack-stage" data-focus={focus} aria-label="Así construimos HomePlus: stack tecnológico">
    <header className="s13-stack-head"><strong>Home<span>Plus</span></strong><small>BENJA · STACK TÉCNICO</small></header>
    <h1 className="s13-stack-title">Así construimos HomePlus.</h1>
    <p className="s13-stack-subtitle">Cinco herramientas. Una sola experiencia.</p>
    <div className="s13-stack-cards">{tech.map((item, i) => {
      const focused = focus === i
      const docked = focus >= 0 && !focused
      return <article key={item.id} className={`s13-card${focused ? ' is-focused' : ''}${docked ? ' is-docked' : ''}`} style={{ '--card-color': item.color, '--overview-left': `${68 + i * 232}px`, '--dock-left': `${100 + i * 194}px` } as CSSProperties}>
        <div className="s13-card-mini"><Logo files={item.mark} compact={docked}/><b>{item.name}</b>{!docked && <small>{item.subtitle}</small>}</div>
        {focused && <div className="s13-card-detail"><section className="s13-card-copy"><Logo files={item.mark}/><h2>{item.title}</h2><p>{item.caption}</p><i/></section><Demo kind={item.kind}/></div>}
      </article>
    })}</div>
    <footer className="s13-stack-foot">{focus < 0 ? 'STACK · VISTA GENERAL' : 'STACK · DEMOSTRACIÓN VISUAL'}</footer>
    <div className="s13-stack-rule"/>
  </main>
}
