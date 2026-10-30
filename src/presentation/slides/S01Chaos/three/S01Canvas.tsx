import { Canvas } from '@react-three/fiber'
import S01Camera from './S01Camera'
import S01Lighting from './S01Lighting'
import S01World from './S01World'
import { s01Camera, s01Palette } from './s01ThreeConfig'
import { s01Director } from './s01Director'

// Canvas cinematográfico de S01: una sola cámara con FOV fijo, seis beats
// deterministas y render bajo demanda (la state machine invalida mientras
// anima y se detiene en los HOLD). No hay timers: todo el tiempo es local
// al beat y se deriva de (previousStep, currentStep).
export default function S01Canvas({ stepIndex, sceneKey = 0 }: { stepIndex: number; sceneKey?: number }) {
  return (
    <div className="chaos-three" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 2]}
        frameloop="demand"
        gl={{ antialias: true }}
        camera={{ position: [...s01Camera.position], fov: s01Camera.fov, near: 0.015, far: 40 }}
        onCreated={(state) => {
          // QA tooling (qa-captures/s01-three-cinematic.mjs): estado R3F para
          // capturar el framebuffer real vía readPixels + director inspeccionable.
          if (typeof window !== 'undefined') {
            const w = window as unknown as Record<string, unknown>
            w.__s01ThreeDebug = state
            w.__s01Director = s01Director
          }
        }}
      >
        <color attach="background" args={[s01Palette.void]} />
        <fog attach="fog" args={[s01Palette.void, 7, 17]} />
        <S01Camera stepIndex={stepIndex} sceneKey={sceneKey} />
        <S01Lighting />
        <S01World />
      </Canvas>
    </div>
  )
}