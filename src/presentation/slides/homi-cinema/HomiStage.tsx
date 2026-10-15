import type { HomiBeat } from './homiCinemaData'
import {
  BlackHandoff, ChangeRequest, ConfirmationBeat, DualInteractionComposition,
  HomiIdentity, HumanDecisionFocus, ChangeComparison, PlannerFocusCamera,
  PlannerReveal, RequestFocus, SemanticTextMorph,
} from './cineBeats'
import './homi-cinema.css'

// HOMI V3.1 — HomiStage: película de producto sobre canvas 1280×720.
// Capas: STAGE_BG(0) → ENVIRONMENT(10) → FOCUS_SURFACE(20) →
// EDITORIAL_MASK(30) → SHARED_ELEMENT(40) → TRANSIENT(50) → EXIT_COVER(60).
// Cada beat es reconstruible: renderiza su estado final estable y la
// coreografía de llegada corre como animación `both` sobre el montaje.

export default function HomiStage({ beat }: { beat: HomiBeat }) {
  const showIdentity = beat !== 'I00' && beat !== 'I13'
  return (
    <div className="homi-stage" data-beat={beat}>
      <div className="homi-layer" data-layer="bg" aria-hidden="true" />
      {showIdentity && (
        <div className="homi-layer" data-layer="environment">
          <HomiIdentity variant="corner" />
        </div>
      )}
      <div className="homi-layer" data-layer="focus">
        {beat === 'I00' && <HomiIdentity variant="hero" />}
        {beat === 'I01' && <div className="homi-beat-hold" aria-label="Homi cede espacio" />}
        {beat === 'I02' && <RequestFocus />}
        {beat === 'I04' && <SemanticTextMorph />}
        {beat === 'I06' && <ConfirmationBeat />}
        {beat === 'I08' && <PlannerFocusCamera />}
        {beat === 'I09' && <DualInteractionComposition />}
        {beat === 'I10' && <ChangeRequest />}
        {beat === 'I11' && <ChangeComparison />}
        {beat === 'I12' && <HumanDecisionFocus />}
        {beat === 'I13' && <BlackHandoff />}
      </div>
      {beat === 'I06' && (
        <div className="homi-layer" data-layer="shared" aria-hidden="true" />
      )}
    </div>
  )
}

// Re-export para inspección directa: el beat I06 termina en Planner estable.
export function HomiPlannerHold() {
  return <PlannerReveal focus="coca" />
}
