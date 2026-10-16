import Presentation from './presentation/Presentation'
import FinalKitchenCanvas from './presentation/slides/FinalKitchen/FinalKitchenCanvas'

export default function App() {
  // Harness aislado del cierre (?finalKitchen=1): no altera la presentación.
  if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('finalKitchen')) {
    return <FinalKitchenCanvas />
  }
  return <Presentation />
}
