// HOMIE V8 — Una pregunta, tres perspectivas (P19–P21).
// Pregunta única arriba (60–68px master = 40–45px canvas). La superficie se
// reorganiza en tres paneles con la misma estructura; sin skeletons, sin
// placeholders, sin tres teléfonos ni tres chats. Las respuestas se revelan
// coordinadamente y el hold comparativo queda totalmente quieto.

import { useEffect, useRef, useState } from 'react'
import HomeIcon from '../../app-screens/HomeDemoScreen/HomeIcon'
import { D1_SHORT, TOMORROW_QUESTION, PROFILE_ANSWERS, type ProfileAnswer } from './homiV8Data'

type PerspectiveStage = 'question' | 'perspectives' | 'answers'

function QuestionBar({ mini = false }: { mini?: boolean }) {
  return (
    <div className={`v8-question${mini ? ' v8-question-mini' : ''}`} role="img" aria-label={TOMORROW_QUESTION}>
      <p>{TOMORROW_QUESTION}</p>
    </div>
  )
}

function QuestionComposer() {
  const [sent, setSent] = useState(false)
  const timer = useRef(0)
  useEffect(() => {
    timer.current = window.setTimeout(() => setSent(true), 1050)
    return () => window.clearTimeout(timer.current)
  }, [])
  return (
    <div className="v8-q-composer">
      {!sent ? (
        <div className="homi-composer v8-composer-typing" aria-hidden="true">
          <span className="v8-typing-text">
            <span className="v8-typing-group" data-group={0}>¿Qué me queda</span>{' '}
            <span className="v8-typing-group" data-group={1}>para mañana?</span>
          </span>
          <span className="v8-caret" />
          <span className="homi-send" />
        </div>
      ) : (
        <div className="v8-q-sent" aria-label={TOMORROW_QUESTION}>
          <HomeIcon name="right" size={14} />
          <span>{TOMORROW_QUESTION}</span>
        </div>
      )}
    </div>
  )
}

function ProfilePanel({ answer, revealed }: { answer: ProfileAnswer; revealed: boolean }) {
  return (
    <article className={`v8-profile v8-present`} data-profile={answer.id} aria-label={`${answer.name}: ${answer.summary}`}>
      <header className="v8-profile-head">
        <span className="v8-profile-avatar" style={{ background: answer.color }} aria-hidden="true">{answer.initial}</span>
        <div className="v8-profile-id">
          <p className="v8-profile-name">{answer.name}</p>
          <p className="v8-profile-tag">{answer.tag}</p>
        </div>
      </header>
      {revealed && (
        <>
          <p className="v8-profile-when">{D1_SHORT}</p>
          <p className="v8-profile-summary">{answer.summary}</p>
          <ul className="v8-profile-records">
            {answer.records.map(record => (
              <li key={record.title} className="v8-profile-record">
                <p className="v8-profile-record-title">{record.title}</p>
                <p className="v8-profile-record-meta">{record.meta}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  )
}

export function PerspectiveComparison({ stage }: { stage: PerspectiveStage }) {
  if (stage === 'question') {
    return (
      <div className="v8-qa" data-qa="ask">
        <QuestionBar />
        <QuestionComposer />
      </div>
    )
  }
  const revealed = stage === 'answers'
  return (
    <div className="v8-qa" data-qa={stage}>
      <QuestionBar />
      <div className="v8-trio">
        {PROFILE_ANSWERS.map(answer => (
          <ProfilePanel key={answer.id} answer={answer} revealed={revealed} />
        ))}
      </div>
    </div>
  )
}
