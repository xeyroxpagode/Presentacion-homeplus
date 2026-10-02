import type { CSSProperties } from 'react'
import type { SlideProps } from '../../presentationTypes'
import whatsapp from '../../assets/app-icons/whatsapp.svg'
import calendar from '../../assets/app-icons/calendar.svg'
import drive from '../../assets/app-icons/drive.svg'
import notes from '../../assets/app-icons/notes.svg'
import location from '../../assets/app-icons/location.svg'
import bank from '../../assets/app-icons/bank.svg'
import family from '../../assets/illustrations/family-avatars.svg'
import AmbientGlow from '../../components/AmbientGlow'
import { openingTokens } from '../../opening/openingTokens'

const services = [
  { name: 'WhatsApp', src: whatsapp, step: 1, x: 294, y: 177, rotation: -7, column: 0, row: 0 },
  { name: 'Calendario', src: calendar, step: 2, x: 996, y: 169, rotation: 8, column: 1, row: 0 },
  { name: 'Google Drive', src: drive, step: 3, x: 190, y: 390, rotation: -5, column: 2, row: 0 },
  { name: 'Notas', src: notes, step: 3, x: 1080, y: 407, rotation: 6, column: 0, row: 1 },
  { name: 'Ubicación', src: location, step: 4, x: 346, y: 580, rotation: 4, column: 1, row: 1 },
  { name: 'Banco', src: bank, step: 4, x: 936, y: 587, rotation: -4, column: 2, row: 1 },
] as const

type FragmentedInfoProps = SlideProps & { phase?: 'active' | 'converging' | 'hidden' }

export default function S02FragmentedInfo({ stepIndex, phase = 'active' }: FragmentedInfoProps) {
  return (
    <div className="fragmented-scene opening-layer" data-phase={phase} data-step={stepIndex} aria-hidden={phase !== 'active'}>
      <AmbientGlow className="metrics-zero-light" x={openingTokens.metrics.coordinationCenter} y={374}
        size={540} intensity={0.55} opacity={stepIndex === 6 && phase === 'active' ? openingTokens.glow.coordination : 0} />
      <h1 className="information-statement" data-family={stepIndex >= 5} data-present={stepIndex < 6}>
        La información<br />ya existe.
      </h1>
      {services.map(service => (
        <div key={service.name} className="service-icon" data-service={service.name}
          data-present={stepIndex >= service.step} aria-hidden={stepIndex < service.step}
          style={{ '--service-x': `${service.x}px`, '--service-y': `${service.y}px`,
            '--service-group-x': `${openingTokens.metrics.appsCenter + (service.column - 1) * openingTokens.metrics.iconGap}px`,
            '--service-group-y': `${openingTokens.metrics.iconTop + service.row * openingTokens.metrics.iconGap}px`,
            '--service-rotation': `${service.rotation}deg` } as CSSProperties}>
          <img src={service.src} alt={service.name} width={84} height={84} draggable={false} />
        </div>
      ))}
      <div className="family-center" data-present={stepIndex >= 5} data-metrics={stepIndex === 6}
        aria-hidden={stepIndex < 5}>
        <img src={family} alt="Una familia de cuatro personas" width={284} height={100} draggable={false} />
      </div>
      <div className="fragmented-metrics" data-present={stepIndex === 6} aria-hidden={stepIndex !== 6}>
        <div className="fragmented-metric"><span className="metric-number">6</span><span className="metric-label">APPS</span></div>
        <div className="fragmented-metric"><span className="metric-number">1</span><span className="metric-label">FAMILIA</span></div>
        <div className="fragmented-metric"><span className="metric-number metric-zero">0</span><span className="metric-label">COORDINACIÓN</span></div>
      </div>
    </div>
  )
}
