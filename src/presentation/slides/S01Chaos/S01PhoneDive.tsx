// S01 terminal — teléfono físico en S01.3 (V1.6.1 §4).
// Representación ESTÁTICA (sin rAF propio): el Phone Dive completo es
// propiedad de S02.0 con un único controlador. Aquí d=0 siempre: el mismo
// WhatsApp histórico (ChatFaceStatic compartido) con la misma función pura
// (phoneDive.ts) que el F0 de S02.0 → continuidad exacta sin empalme.
// No se tocan diorama, materiales, composición ni narrativa aprobados.

import ChatFaceStatic from '../S02FragmentedInfo/PhoneFace'
import { diveBezelVisible, diveFrame, diveScreenRadius } from '../S02FragmentedInfo/phoneDive'

export default function S01PhoneDive({ step }: { step: number }) {
  if (step < 3) return null
  const frame = diveFrame(0)
  const bezel = diveBezelVisible(frame.screen)
  return (
    <div className="chaos-dive" data-step={step} aria-hidden="true">
      {bezel && (
        <div
          className="s02-phone-body"
          style={{
            left: frame.body.x, top: frame.body.y, width: frame.body.w, height: frame.body.h,
            transform: `rotate(${frame.tilt.toFixed(2)}deg)`,
          }}
        >
          <div className="s02-phone-notch" />
        </div>
      )}
      <div
        className="s02-phone-screen"
        style={{
          left: frame.screen.x, top: frame.screen.y, width: frame.screen.w, height: frame.screen.h,
          borderRadius: diveScreenRadius(0),
        }}
      >
        {/* El mapa es coords de stage; el bloque contenedor es la pantalla. */}
        <div
          className="s02-phone-surface"
          style={{ transform: `translate(${(frame.map.offX - frame.screen.x).toFixed(1)}px, ${(frame.map.offY - frame.screen.y).toFixed(1)}px) scale(${frame.map.scale.toFixed(4)})` }}
        >
          <ChatFaceStatic />
        </div>
      </div>
    </div>
  )
}
