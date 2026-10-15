import AmbientGlow from '../../components/AmbientGlow'
import PhoneFrame from '../../components/PhoneFrame'
import HomeDemoScreen from '../../app-screens/HomeDemoScreen'
import type { SlideProps } from '../../presentationTypes'
import './home-scene.css'

export default function S04Home({ stepIndex, active = true }: SlideProps & { active?: boolean }) {
  return (
    <div className="home-scene" data-active={active} data-home-step={stepIndex} aria-hidden={!active}>
      <AmbientGlow x={720} y={380} size={860} intensity={0.65} opacity={0.18} />
      <div className="home-phone-position">
        <PhoneFrame>
          <HomeDemoScreen
            showJuli={stepIndex >= 1}
            educationPhysical={stepIndex >= 2}
            authorization={stepIndex >= 3}
            schoolTask={stepIndex >= 4}
            complete={stepIndex === 5}
            authorizationCompleted={stepIndex >= 3}
            schoolTaskCompleted={stepIndex >= 4}
            focus={stepIndex === 2 ? 'educationPhysical' : stepIndex === 3 ? 'authorization' : stepIndex === 4 ? 'schoolTask' : null}
          />
        </PhoneFrame>
      </div>
    </div>
  )
}
