import { Suspense, lazy } from 'react'
import type { SlideProps } from '../../presentationTypes'
import { DioramaFloor, DioramaTable, FridgeUnit } from './DioramaStage'
import { isS01ThreeRenderer } from './three/s01ThreeConfig'
import {
  AutoPolicy,
  CarKeys,
  DocOne,
  DocThree,
  DocTwo,
  DrawerFront,
  ExtraAutoSheet,
  ExtraListNote,
  ExtraW1,
  ExtraW2,
  ExtraW3,
  GroceryBag,
  ShoppingList,
  WarrantyFolder,
} from './DioramaProps'
import './chaos-scene.css'

// S01 V5.2.1 — mundo 3D canónico (Three.js + React Three Fiber, FOV 36°).
// Seis beats (stepIndex 0–5); el beat 5 es exclusivamente el dive físico
// WIDE→PHONE_INSIDE (1450 ms). El renderer 3D es el recorrido de producción
// por defecto; el diorama 2.5D queda sólo tras ?s01Renderer=flat (debug).
// Handoff S01→S02: S01 permanece montada y visible durante S02.0 (el puente
// s01DiveBridge mantiene la cámara en PHONE_INSIDE); S02.0 toma la superficie
// sólo con cobertura geométrica total, sin fade ni corte. Al avanzar a S02.1+
// el fullscreen de WhatsApp ya la ocluye y S01 puede retirarse.
const S01ThreeCanvas = lazy(() => import('./three/S01Canvas'))

export default function S01Chaos({ stepIndex, active = true, phoneHidden = false, sceneKey = 0 }: SlideProps & { active?: boolean; phoneHidden?: boolean; sceneKey?: number }) {
  const step = Math.min(Math.max(stepIndex, 0), 5)
  const climax = step === 5
  const search = step >= 3
  void phoneHidden
  // Dev-only (?s01Camera=off): congela la cámara en el plano general.
  const cameraOff = new URLSearchParams(window.location.search).get('s01Camera') === 'off'
  // Renderer 3D original (producción). Carga diferida para que el bundle
  // normal no pague el costo de three.js.
  if (isS01ThreeRenderer()) {
    return (
      <div className="chaos-scene opening-layer" data-active={active} aria-hidden={!active}>
        <Suspense fallback={null}>
          <S01ThreeCanvas stepIndex={step} sceneKey={sceneKey} />
        </Suspense>
      </div>
    )
  }
  return (
    <div className="chaos-scene opening-layer" data-active={active} data-step={step} data-camera-off={cameraOff} aria-hidden={!active}>
      <div className="chaos-camera">
        <DioramaFloor />
        <FridgeUnit />
        <DioramaTable />
        <div className="chaos-drawer" data-open={search}>
          <DrawerFront />
        </div>
        {/* Contenedor con recorte en la boca del cajón: los papeles que
            nacen abajo quedan ocultos hasta cruzar el borde (oclusión real). */}
        <div className="chaos-doc-clip">
          <div className="chaos-prop chaos-extra-list" data-present={climax}>
            <ExtraListNote />
          </div>
          <div className="chaos-prop chaos-list" data-present={step >= 2} data-invade={climax}>
            <ShoppingList />
          </div>
          <div className="chaos-prop chaos-search-doc chaos-folder" data-present={search} data-invade={climax}>
            <WarrantyFolder />
          </div>
          <div className="chaos-prop chaos-search-doc chaos-doc-1" data-present={search} data-invade={climax}>
            <DocOne />
          </div>
          <div className="chaos-prop chaos-search-doc chaos-doc-2" data-present={search} data-invade={climax}>
            <DocTwo />
          </div>
          <div className="chaos-prop chaos-search-doc chaos-doc-3" data-present={search} data-invade={climax}>
            <DocThree />
          </div>
          <div className="chaos-prop chaos-extra-w1" data-present={climax}>
            <ExtraW1 />
          </div>
          <div className="chaos-prop chaos-extra-w2" data-present={climax}>
            <ExtraW2 />
          </div>
          <div className="chaos-prop chaos-extra-w3" data-present={climax}>
            <ExtraW3 />
          </div>
        </div>
        <div className="chaos-prop chaos-extra-auto" data-present={climax}>
          <ExtraAutoSheet />
        </div>
        <div className="chaos-prop chaos-policy" data-present={step >= 1} data-invade={climax}>
          <AutoPolicy />
        </div>
        <div className="chaos-prop chaos-keys" data-present={step >= 1} data-invade={climax}>
          <CarKeys />
        </div>
        <div className="chaos-prop chaos-bag" data-present={step >= 2} data-invade={climax}>
          <GroceryBag />
        </div>
      </div>
    </div>
  )
}
