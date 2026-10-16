import Presentation from './presentation/Presentation'
import FinalKitchenCanvas from './presentation/slides/FinalKitchen/FinalKitchenCanvas'

export default function App() {
  if (new URLSearchParams(window.location.search).get('finalKitchen') === '1') return <FinalKitchenCanvas />
  return <Presentation />
}
