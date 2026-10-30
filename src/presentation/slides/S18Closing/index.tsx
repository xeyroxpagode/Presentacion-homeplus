import type { SlideProps } from '../../presentationTypes'
import type { CSSProperties } from 'react'
import HomePlusLogo from '../../components/HomePlusLogo'
import './s18-closing.css'

const TEAM = [
  { name: 'Bernardo Gimenez', initials: 'BG' },
  { name: 'Benjamin Duarte', initials: 'BD' },
  { name: 'Gabriel Bazan', initials: 'GB' },
  { name: 'Maximo Echezarreta', initials: 'ME' },
]

export default function S18Closing({ stepIndex }: SlideProps) {
  return (
    <div className="s18-closing" data-step={stepIndex} aria-label="Cierre de HomePlus">
      <div className="s18-brand">
        <HomePlusLogo size={104} />
        <p className="s18-wordmark">HomePlus</p>
        <span className="s18-rule" aria-hidden="true" />
      </div>
      <div className="s18-team" aria-label="Integrantes">
        {TEAM.map((member, index) => (
          <div key={member.name} className="s18-member" style={{ '--member-index': index } as CSSProperties}>
            <span className="s18-initials" aria-hidden="true">{member.initials}</span>
            <p className="s18-name">{member.name}</p>
          </div>
        ))}
      </div>
      <p className="s18-thanks">
        Muchas gracias.
      </p>
    </div>
  )
}
