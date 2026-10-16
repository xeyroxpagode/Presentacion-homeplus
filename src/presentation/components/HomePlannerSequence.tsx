import AmbientGlow from './AmbientGlow'
import PhoneFrame from './PhoneFrame'
import HomeDemoScreen from '../app-screens/HomeDemoScreen'
import S05Planner from '../slides/S05Planner'
import '../slides/S04Home/home-scene.css'
import './home-planner-sequence.css'
import { useRef } from 'react'
import S06Family from '../slides/S06Family'
import FamilyMapStage from '../slides/S06Family/FamilyMapStage'

type HomePlannerSequenceProps = { slideIndex: number; stepIndex: number }

// Preserve one physical phone across Home → Planner and keep completed tasks
// completed when entering Planner. Interior states remain fully reversible.
// On slide 6 the product stage exits as a block over the S06.5 composition.
export default function HomePlannerSequence({ slideIndex, stepIndex }: HomePlannerSequenceProps) {
  const inPlanner = slideIndex === 4
  const inFamily = slideIndex === 5
  const exiting = slideIndex === 6
  const homeStep = slideIndex === 3 ? stepIndex : slideIndex >= 4 ? 5 : 0
  const familyStep = inFamily ? stepIndex : exiting ? 5 : 0
  const stageRef = useRef<HTMLDivElement>(null)
  const mapSlotRef = useRef<HTMLDivElement>(null)
  const expanded = inFamily && stepIndex >= 1 && stepIndex <= 3
  return (
    <div ref={stageRef} className="home-scene home-planner-sequence" data-active={slideIndex >= 3}
      data-exiting={exiting}
      data-map-expanded={expanded}
      data-home-step={homeStep} data-product-screen={inFamily ? 'family' : inPlanner ? 'planner' : 'home'} aria-hidden={slideIndex < 3}>
      <AmbientGlow x={720} y={380} size={860} intensity={0.65} opacity={0.18} />
      <div className="home-phone-position">
        <PhoneFrame>
          <div className="product-home-layer" data-present={!inPlanner && !inFamily} aria-hidden={inPlanner || inFamily}>
            <HomeDemoScreen showJuli={homeStep >= 1} educationPhysical={homeStep >= 2}
              authorization={homeStep >= 3} schoolTask={homeStep >= 4} complete={homeStep === 5}
              authorizationCompleted={homeStep >= 3} schoolTaskCompleted={homeStep >= 4}
              focus={homeStep === 2 ? 'educationPhysical' : homeStep === 3 ? 'authorization' : homeStep === 4 ? 'schoolTask' : null} />
          </div>
          <div className="product-planner-layer" data-present={inPlanner} aria-hidden={!inPlanner}>
            <S05Planner stepIndex={inPlanner ? stepIndex : inFamily ? 3 : 0} />
          </div>
          <div className="product-family-layer" data-present={inFamily} aria-hidden={!inFamily}>
            <S06Family stepIndex={familyStep} mapSlotRef={mapSlotRef} />
          </div>
        </PhoneFrame>
      </div>
      <FamilyMapStage active={inFamily} stepIndex={inFamily ? stepIndex : 0} stageRef={stageRef} slotRef={mapSlotRef} />
    </div>
  )
}
