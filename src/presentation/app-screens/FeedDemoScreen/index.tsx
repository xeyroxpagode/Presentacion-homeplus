import './feed-screen.css'

type FeedDemoScreenProps = {
  author?: string
  authorInitial?: string
  authorAvatar?: 'mom' | 'dad' | 'tomi'
  message?: string
  question?: string
}

export default function FeedDemoScreen({ author = 'Mamá',
  authorInitial = 'M', authorAvatar = 'mom',
  message = 'El técnico viene entre las cuatro y las seis.', question = '¿Quién puede estar?' }: FeedDemoScreenProps) {
  return (
    <section className="feed-demo-screen" aria-label="Conversación del hogar">
      <article className="feed-household-post">
        <header className="feed-author"><span className={`family-avatar family-avatar-${authorAvatar}`} aria-hidden="true">{authorInitial}</span>
          <div><strong>{author}</strong><p>Familia García · Ahora</p></div>
        </header>
        <p className="feed-message">{message}</p>
        {question && <p className="feed-question">{question}</p>}
        <footer className="feed-reply"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 5h16v12H9l-5 4V5Z" strokeLinejoin="round" /></svg><span>Responder</span></footer>
      </article>
    </section>
  )
}
