import type { RefObject } from 'react'
import FamilyDemoScreen from '../../app-screens/FamilyDemoScreen'
import type { SlideProps } from '../../presentationTypes'
import './family-scene.css'

export default function S06Family({ stepIndex, mapSlotRef }: SlideProps & { mapSlotRef?: RefObject<HTMLDivElement | null> }) {
  return <FamilyDemoScreen view={stepIndex === 0 ? 'family' : stepIndex === 5 ? 'feed' : 'map'} mapSlotRef={mapSlotRef} />
}
