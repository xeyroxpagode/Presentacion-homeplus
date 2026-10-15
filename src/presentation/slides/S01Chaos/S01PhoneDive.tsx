// S01 terminal — Phone Dive hacia S02 (§9, intervención mínima).
// El teléfono yace en primer plano con la pantalla encendida mostrando el
// MISMO WhatsApp histórico de S02.0 (ChatFaceStatic compartido). Al llegar
// a S01.5, la cámara entra físicamente en la pantalla: d 0→D_SPLICE con la
// misma función pura (phoneDive.ts) que continúa S02.0 → empalme exacto.
// No se tocan diorama, materiales, composición ni narrativa aprobados.

import { useEffect, useState } from 'react'
import ChatFaceStatic from '../S02FragmentedInfo/PhoneFace'
import { D_SPLICE, diveBezelVisible, diveFrame } from '../S02FragmentedInfo/phoneDive'

const DIVE_MS = 1400

function smootherstep(t: number): number {
  const x = t < 0 ? 0 : t > 1 ? 1 : t
  return x * x * x * (x * (x * 6 - 15) + 10)
}

function useDiveProgress(step: number): number {
  const [p, setP] = useState(0)
  useEffect(() => {
    if (step !== 5) {
      setP(0)
      return
    }
    // Reduced motion: estados finales sin desplazamiento (sin toggle nuevo).
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setP(1)
      return
    }
    let raf = 0
    let start = -1
    const tick = (now: number) => {
      if (start < 0) start = now
      setP(Math.min(1, (now - start) / DIVE_MS))
      if (start >= 0 && now - start < DIVE_MS) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [step])
  return p
}

export default function S01PhoneDive({ step }: { step: number }) {
  const p = useDiveProgress(step)
  if (step < 4) return null
  const d = step === 5 ? D_SPLICE * smootherstep(p) : 0
  const frame = diveFrame(d)
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
        style={{ left: frame.screen.x, top: frame.screen.y, width: frame.screen.w, height: frame.screen.h }}
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
