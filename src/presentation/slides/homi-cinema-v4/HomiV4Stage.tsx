// HOMI V4.2 — HomiV4Stage: escenario 1280×720, doce disparadores manuales.
// Cada trigger renderiza su estado final estable; la coreografía de entrada
// corre como animación `both` sobre el montaje (remount por key en el slide).
// Sin morph semántico, sin máscara expansiva, sin V3.1.

import FrictionEcho from './FrictionEcho'
import {
  HomiAfterConfirm, HomiGlimpse, HomiHero, HomiImportantProposal,
  HomiImportantRequest, HomiProposalCoca, HomiReady, HomiRequest,
} from './HomiShots'
import { PlannerGlimpse, PlannerResult, PlannerWide } from './PlannerShots'
import type { HomiTrigger } from './homiV4Data'
import './homi-v4.css'

export default function HomiV4Stage({ trigger }: { trigger: HomiTrigger }) {
  return (
    <div className="h4-stage" data-trigger={trigger}>
      <div className="h4-layer" data-layer="bg" aria-hidden="true" />
      {trigger === 'T01' && (
        <div className="h4-box" data-box="hero">
          <HomiHero />
        </div>
      )}
      {trigger === 'T02' && (
        <div className="h4-box h4-friction-scope" data-box="friction">
          <FrictionEcho />
        </div>
      )}
      {trigger === 'T03' && (
        <>
          <div className="h4-ghost-form h4-friction-scope" aria-hidden="true">
            <FrictionEcho />
          </div>
          <div className="h4-box" data-box="homi">
            <HomiReady />
          </div>
        </>
      )}
      {trigger === 'T04' && (
        <div className="h4-box" data-box="homi">
          <HomiRequest />
        </div>
      )}
      {trigger === 'T05' && (
        <div className="h4-box" data-box="homi">
          <HomiProposalCoca />
        </div>
      )}
      {trigger === 'T06' && (
        <>
          <div className="h4-ghost-confirm" aria-hidden="true">
            <span>Confirmar</span>
          </div>
          <div className="h4-box" data-box="planner">
            <PlannerResult />
          </div>
        </>
      )}
      {trigger === 'T07' && (
        <div className="h4-box" data-box="planner-wide">
          <PlannerWide />
        </div>
      )}
      {trigger === 'T08' && (
        <div className="h4-box" data-box="homi">
          <HomiAfterConfirm />
        </div>
      )}
      {trigger === 'T09' && (
        <>
          <div className="h4-box" data-box="glimpse-homi">
            <HomiGlimpse />
          </div>
          <div className="h4-box" data-box="glimpse-planner">
            <PlannerGlimpse />
          </div>
        </>
      )}
      {trigger === 'T10' && (
        <div className="h4-box" data-box="homi">
          <HomiImportantRequest />
        </div>
      )}
      {trigger === 'T11' && (
        <div className="h4-box" data-box="homi">
          <HomiImportantProposal />
        </div>
      )}
      {trigger === 'T12' && (
        <>
          <div className="h4-ghost-out" aria-hidden="true">
            <HomiImportantProposal />
          </div>
          <div className="h4-black" aria-label="Fin de la intervención" />
        </>
      )}
    </div>
  )
}
