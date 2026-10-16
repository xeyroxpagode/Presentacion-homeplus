import { Suspense, lazy } from 'react'
import type { SlideProps } from '../../presentationTypes'
import S01PhoneDive from './S01PhoneDive'
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

// S01 V1.6.1 — cocina-diorama 2.5D con cámara virtual. Cuatro beats
// (stepIndex 0–3), todo el estado deriva de data-step / data-present.
// Los antiguos beats 4/5 dejan de formar parte de la navegación: sin
// reencuadre, sin acumulación extra, sin clímax invasivo (§2–§3).
// Fondo y halo viven fuera de .chaos-camera (no viajan con el zoom).
// Lookdev 3D (?dev=1&s01Renderer=three): carga diferida para que el bundle
// normal no pague el costo de three.js.
const S01ThreeCanvas = lazy(() => import('./three/S01Canvas'))

export default function S01Chaos({ stepIndex, active = true, phoneHidden = false }: SlideProps & { active?: boolean; phoneHidden?: boolean }) {
  const step = Math.min(Math.max(stepIndex, 0), 3)
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
          <div className="chaos-prop chaos-extra-list" data-present={false}>
            <ExtraListNote />
          </div>
          <div className="chaos-prop chaos-list" data-present={step >= 2} data-invade={false}>
            <ShoppingList />
          </div>
          <div className="chaos-prop chaos-search-doc chaos-folder" data-present={search} data-invade={false}>
            <WarrantyFolder />
          </div>
          <div className="chaos-prop chaos-search-doc chaos-doc-1" data-present={search} data-invade={false}>
            <DocOne />
          </div>
          <div className="chaos-prop chaos-search-doc chaos-doc-2" data-present={search} data-invade={false}>
            <DocTwo />
          </div>
          <div className="chaos-prop chaos-search-doc chaos-doc-3" data-present={search} data-invade={false}>
            <DocThree />
          </div>
          <div className="chaos-prop chaos-extra-w1" data-present={false}>
            <ExtraW1 />
          </div>
          <div className="chaos-prop chaos-extra-w2" data-present={false}>
            <ExtraW2 />
          </div>
          <div className="chaos-prop chaos-extra-w3" data-present={false}>
            <ExtraW3 />
          </div>
        </div>
        <div className="chaos-prop chaos-extra-auto" data-present={false}>
          <ExtraAutoSheet />
        </div>
        <div className="chaos-prop chaos-policy" data-present={step >= 1} data-invade={false}>
          <AutoPolicy />
        </div>
        <div className="chaos-prop chaos-keys" data-present={step >= 1} data-invade={false}>
          <CarKeys />
        </div>
        <div className="chaos-prop chaos-bag" data-present={step >= 2} data-invade={false}>
          <GroceryBag />
        </div>
      </div>
      {/* V1.6.1 §7 — ownership único: S01 muestra el teléfono físico sólo
          mientras S02 no lo ha asumido. Al entrar en S02.0 el relevo ocurre
          en el mismo commit con geometría idéntica → sin doble teléfono. */}
      {!phoneHidden && <S01PhoneDive step={step} />}
    </div>
  )
}
