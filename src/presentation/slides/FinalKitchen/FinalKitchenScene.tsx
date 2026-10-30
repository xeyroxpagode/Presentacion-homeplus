// FINAL KITCHEN V6.0 — escena persistente del cierre (S0).
// Una sola escena durante todo W00–W14: no se reconstruye al cambiar de beat.
// Mundo S01 (estático + props con frame finalRest congelado) + props finales
// + luces del director + cámara/reloj. Sin scripts de caos de S01.

import { useMemo } from 'react'
import type * as THREE from 'three'
import S01World from '../S01Chaos/three/S01World'
import type { S01FinalOverride, S01FinalLive } from '../S01Chaos/three/S01CinematicProps'
import { buildFinalRestFrame } from './FinalDirector'
import FinalCamera, { type FinalClock } from './FinalCamera'
import FinalLighting, { type FinalLightApi } from './FinalLighting'
import FinalProps from './FinalProps'
import type { TechRigApi } from './TechnicianRig'
import type { FinalBeatId } from './finalTimings'

export default function FinalKitchenScene({
  beat,
  clockRef,
  techApiRef,
  lightApiRef,
  liveRef,
  screenMap,
  reducedMotion,
  onStable,
}: {
  beat: FinalBeatId
  clockRef: React.MutableRefObject<FinalClock>
  techApiRef: React.MutableRefObject<TechRigApi | null>
  lightApiRef: React.MutableRefObject<FinalLightApi | null>
  liveRef: React.MutableRefObject<S01FinalLive>
  screenMap: THREE.Texture | null
  reducedMotion: boolean
  onStable: (beat: FinalBeatId) => void
}) {
  // Frame congelado: se construye UNA vez (props inmóviles todo el cierre).
  const override = useMemo<S01FinalOverride>(
    () => ({
      frame: buildFinalRestFrame(),
      screenMap,
      live: liveRef.current,
    }),
    [screenMap, liveRef],
  )

  return (
    <>
      <color attach="background" args={['#0d0c12']} />
      <fog attach="fog" args={['#0d0c12', 7, 17]} />
      <S01World finalOverride={override} />
      <FinalLighting apiRef={lightApiRef} />
      <FinalProps techApiRef={techApiRef} />
      <FinalCamera
        beat={beat}
        clockRef={clockRef}
        techApiRef={techApiRef}
        lightApiRef={lightApiRef}
        liveRef={liveRef}
        reducedMotion={reducedMotion}
        onStable={onStable}
      />
    </>
  )
}
