// S02 V1.6 — set de reacciones vectorial local (§15).
// Estética iOS consistente servida desde el bundle: no depende de los
// emojis de Windows/Android/Linux. Orden canónico: 👍 ❤️ 😂 😮 😢 🙏.
// Si este set se considera insuficiente, reportarlo como gap P1 antes
// de declarar PASS (no usar assets propietarios obtenidos irregularmente).

export const REACTION_ORDER = ['like', 'love', 'laugh', 'wow', 'sad', 'pray'] as const

function Face({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 34 34" width="31" height="31" aria-hidden="true">
      <circle cx="17" cy="17" r="14.5" fill="#FFCC4D" />
      <ellipse cx="17" cy="17" rx="14.5" ry="14.5" fill="url(#s02face-shade)" opacity="0" />
      {children}
    </svg>
  )
}

export function ReactionGlyph({ kind }: { kind: (typeof REACTION_ORDER)[number] }) {
  switch (kind) {
    case 'like':
      return (
        <svg viewBox="0 0 34 34" width="31" height="31" aria-hidden="true">
          <path
            d="M12 16.5c-1.8 0-3 1.4-3 3.2v4.6c0 1.8 1.2 3.2 3 3.2h6.6c2.4 0 4.2-1.2 5-3.4l2-5.6c.5-1.4-.4-2.6-1.8-2.6h-3.4l.9-4.6c.3-1.6-.9-2.9-2.2-2.6-1.1.2-1.8 1.2-2 2.6l-1 5.2H12z"
            fill="#FFCC4D"
            stroke="#B07818"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <rect x="7" y="17" width="3.4" height="10" rx="1.7" fill="#FFCC4D" stroke="#B07818" strokeWidth="1.4" />
        </svg>
      )
    case 'love':
      return (
        <svg viewBox="0 0 34 34" width="31" height="31" aria-hidden="true">
          <path
            d="M17 28.5C10 22.5 5.5 18.4 5.5 13.9c0-3.2 2.4-5.4 5.3-5.4 2.4 0 4.7 1.6 6.2 4 1.5-2.4 3.8-4 6.2-4 2.9 0 5.3 2.2 5.3 5.4 0 4.5-4.5 8.6-11.5 14.6z"
            fill="#E0245E"
          />
          <path d="M10.5 13.5c-1 .8-1.6 2-1.6 3.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" fill="none" />
        </svg>
      )
    case 'laugh':
      return (
        <Face>
          <path d="M8.5 12.5c1.2-1.6 3-2.4 4.7-2.1M25.5 12.5c-1.2-1.6-3-2.4-4.7-2.1" stroke="#664500" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M9 19c2.5 4.6 5.5 6.8 8 6.8s5.5-2.2 8-6.8c-2.6-1.4-5.3-2-8-2s-5.4.6-8 2z" fill="#664500" />
          <path d="M11.5 21.5c2 2.6 3.9 3.9 5.5 3.9s3.5-1.3 5.5-3.9c-1.8-.7-3.6-1-5.5-1s-3.7.3-5.5 1z" fill="#fff" />
          <path d="M5.6 20.5c-1.2 1-1.7 2.6-1.2 4.2.4 1.3 1.8 1.9 3 1.3 1.5-.8 2-2.9 1.1-4.6-.8-1.4-2-1.7-2.9-.9zM28.4 20.5c1.2 1 1.7 2.6 1.2 4.2-.4 1.3-1.8 1.9-3 1.3-1.5-.8-2-2.9-1.1-4.6.8-1.4 2-1.7 2.9-.9z" fill="#5AC8FA" />
        </Face>
      )
    case 'wow':
      return (
        <Face>
          <ellipse cx="11.5" cy="13.5" rx="2.1" ry="2.8" fill="#664500" />
          <ellipse cx="22.5" cy="13.5" rx="2.1" ry="2.8" fill="#664500" />
          <path d="M8 8.5c1-1.2 2.4-1.9 4-2M26 8.5c-1-1.2-2.4-1.9-4-2" stroke="#664500" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <ellipse cx="17" cy="23" rx="4.4" ry="5.4" fill="#664500" />
          <ellipse cx="17" cy="24.2" rx="2.6" ry="3.2" fill="#7A4A3A" />
        </Face>
      )
    case 'sad':
      return (
        <Face>
          <path d="M9 14.5c1.4-1.2 3.2-1.6 5-1M25 14.5c-1.4-1.2-3.2-1.6-5-1" stroke="#664500" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <ellipse cx="11" cy="17.5" rx="1.5" ry="2" fill="#664500" />
          <ellipse cx="23" cy="17.5" rx="1.5" ry="2" fill="#664500" />
          <path d="M10.5 25.5c1.5-2.6 3.8-3.9 6.5-3.9s5 1.3 6.5 3.9" stroke="#664500" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M27.5 17c1.6 2.2 1.9 4.8.8 7-.7 1.3-2.3 1.5-3.3.5-1.2-1.3-1.3-3.9.1-5.9 1-1.5 1.7-2.3 2.4-1.6z" fill="#5AC8FA" />
        </Face>
      )
    case 'pray':
      return (
        <svg viewBox="0 0 34 34" width="31" height="31" aria-hidden="true">
          <path d="M13 5l-6 14.5c-.7 1.7-.2 3.2 1.2 3.9 1.2.6 2.7.3 3.5-1L17 12l5.3 10.4c.8 1.3 2.3 1.6 3.5 1 1.4-.7 1.9-2.2 1.2-3.9L21 5h-8z" fill="#FFCC4D" stroke="#B07818" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M17 12v10" stroke="#B07818" strokeWidth="1.4" />
          <path d="M9 26l-2 3.5h7L13 26M25 26l2 3.5h-7l1-3.5" fill="#5AC8FA" />
        </svg>
      )
  }
}
