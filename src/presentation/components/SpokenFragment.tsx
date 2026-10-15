import personSpeaking from '../assets/illustrations/person-speaking.svg'

export default function SpokenFragment({ children }: { children: string }) {
  return (
    <div className="spoken-fragment">
      <img src={personSpeaking} alt="" aria-hidden="true" width={74} height={74} draggable={false} />
      <p>{children}</p>
    </div>
  )
}
