import AmbientGlow from '../../components/AmbientGlow'
import PhoneFrame from '../../components/PhoneFrame'
import AssetsDemoScreen from '../../app-screens/AssetsDemoScreen'
import HomeCloudDemoScreen from '../../app-screens/HomeCloudDemoScreen'
import type { SlideProps } from '../../presentationTypes'
import './s10-scene.css'

export default function S10AssetsHomeCloud({ stepIndex }: SlideProps) {
  const showCloud = stepIndex >= 3
  return (
    <div className="s10-scene" data-step={stepIndex} aria-label="Activos y HomeCloud">
      <AmbientGlow x={640} y={380} size={900} intensity={0.6} opacity={0.14} />
      <div className="s10-phone-motion">
        <div className="s10-phone-slot" data-side={showCloud ? 'right' : 'left'}>
          <PhoneFrame scale={1.08}>
            <div className="s10-screen-stack">
              <div className="s10-layer" data-present={!showCloud} aria-hidden={showCloud}>
                <div className={`s10-screen-fill${stepIndex === 1 ? ' s10-assets-focus' : ''}`}>
                  <AssetsDemoScreen view={stepIndex >= 2 ? 'detail' : 'list'} />
                </div>
              </div>
              <div className="s10-layer" data-present={showCloud} aria-hidden={!showCloud}>
                <HomeCloudDemoScreen tab={stepIndex >= 4 ? 'recuerdos' : 'documentos'} />
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}
