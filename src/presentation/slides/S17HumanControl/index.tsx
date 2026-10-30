import HomiV9Stage from '../homi-cinema-v8/HomiV9Stage'
import type { SlideProps } from '../../presentationTypes'

export default function S17HumanControl({ stepIndex, directSnapshot }: SlideProps) {
  return (
    <HomiV9Stage scene="s17" stepIndex={stepIndex} directSnapshot={directSnapshot} />
  )
}
