import type { SlideProps } from '../../presentationTypes'
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
      <div className="s18-brand" data-present={stepIndex >= 1} aria-hidden={stepIndex < 1}>
        <HomePlusLogo size={120} />
        <p className="s18-wordmark">HomePlus</p>
      </div>
      <div className="s18-team" data-present={stepIndex >= 2} aria-hidden={stepIndex < 2}>
        {TEAM.map((member, index) => (
          <div key={member.name} className="s18-member" style={{ transitionDelay: `${index * 90}ms` }}>
            <span className="s18-avatar" aria-hidden="true">{member.initials}</span>
            <p className="s18-name">{member.name}</p>
          </div>
        ))}
      </div>
      <p className="s18-thanks" data-present={stepIndex >= 3} aria-hidden={stepIndex < 3}>
        Muchas gracias.
      </p>
    </div>
  )
}
