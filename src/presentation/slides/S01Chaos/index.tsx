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

// S01 V2.1 — cocina-diorama 2.5D con cámara virtual. Seis beats (stepIndex
// 0–5), todo el estado deriva de data-step / data-present / data-invade.
// Fondo y halo viven fuera de .chaos-camera (no viajan con el zoom).
// Lookdev 3D (?dev=1&s01Renderer=three): carga diferida para que el bundle
// normal no pague el costo de three.js.
const S01ThreeCanvas = lazy(() => import('./three/S01Canvas'))

export default function S01Chaos({ stepIndex, active = true }: SlideProps & { active?: boolean }) {
  const step = Math.min(Math.max(stepIndex, 0), 5)
  const climax = step === 5
  const search = step >= 3
  // Dev-only (?s01Camera=off): congela la cámara en el plano general.
  const cameraOff = new URLSearchParams(window.location.search).get('s01Camera') === 'off'
  // Dev-only (?dev=1&s01Renderer=three): lookdev 3D estático en vez del
  // diorama 2.5D. El renderer original queda intacto por defecto.
  if (isS01ThreeRenderer()) {
    return (
      <div className="chaos-scene opening-layer" data-active={active} aria-hidden={!active}>
        <Suspense fallback={null}>
          <S01ThreeCanvas stepIndex={step} />
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
