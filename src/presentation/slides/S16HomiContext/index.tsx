import HomiV9Stage from '../homi-cinema-v8/HomiV9Stage'
import type { SlideProps } from '../../presentationTypes'

export default function S16HomiContext({ stepIndex, directSnapshot }: SlideProps) {
  return (
    <HomiV9Stage scene="s16" stepIndex={stepIndex} directSnapshot={directSnapshot} />
  )
}
