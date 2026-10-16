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

// S01 CANÓNICA 3D — cuatro beats navegables sobre el renderer original.
// Beats 0–2 → estados históricos 1–3 del director; beat 3 → HOLD en el
// origen del Phone Dive (acumulación original asentada + cámara A_WIDE,
// ver S01Camera.enterBeat). El dive vive en el intervalo original
// [holdUntil → portal[1]] y lo maneja el puente S01→S02 (s01DiveBridge):
// S01 permanece montada y visible durante S02.0 hasta la cobertura total.
// El diorama 2.5D queda sólo tras ?s01Renderer=flat (debug, fuera del
// recorrido aprobado); el teléfono artificial de V1.6.1 no se ejecuta en
// producción.
const S01ThreeCanvas = lazy(() => import('./three/S01Canvas'))

export default function S01Chaos({ stepIndex, active = true, phoneHidden = false, sceneKey = 0 }: SlideProps & { active?: boolean; phoneHidden?: boolean; sceneKey?: number }) {
  const step = Math.min(Math.max(stepIndex, 0), 3)
  const search = step >= 3
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
