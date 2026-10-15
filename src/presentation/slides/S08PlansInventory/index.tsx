import AmbientGlow from '../../components/AmbientGlow'
import PhoneFrame from '../../components/PhoneFrame'
import PlannerDemoScreen from '../../app-screens/PlannerDemoScreen'
import InventoryDemoScreen from '../../app-screens/InventoryDemoScreen'
import type { SlideProps } from '../../presentationTypes'
import './s08-scene.css'

export default function S08PlansInventory({ stepIndex }: SlideProps) {
  const showInventory = stepIndex >= 3
  const showQuestion = stepIndex === 2
  return (
    <div className="s08-scene" data-step={stepIndex} aria-label="Planes e inventario">
      <AmbientGlow x={640} y={380} size={900} intensity={0.6} opacity={0.14} />
      <div className="s08-phone-motion">
        <div
          className="s08-phone-slot"
          data-side={showInventory ? 'right' : 'left'}
          data-dim={stepIndex === 2}
        >
          <PhoneFrame>
            <div className="s08-screen-stack">
              <div className="s08-layer" data-present={!showInventory} aria-hidden={showInventory}>
                <div className={`s08-screen-fill${stepIndex === 1 ? ' s08-plans-focus' : ''}`}>
                  <PlannerDemoScreen view="plans" settled />
                </div>
              </div>
              <div className="s08-layer" data-present={showInventory} aria-hidden={!showInventory}>
                <InventoryDemoScreen focusShortages={stepIndex >= 4} />
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
      <p className="s08-question" data-present={showQuestion} aria-hidden={!showQuestion}>
        ¿Qué falta<br />en casa?
      </p>
    </div>
  )
}
