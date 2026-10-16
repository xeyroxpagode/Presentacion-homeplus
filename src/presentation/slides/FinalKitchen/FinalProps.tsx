// FINAL KITCHEN V6.0 — ensamblado de props nuevos (S2/S3A/S3B).
// Todos estáticos salvo el técnico (gesto) — decisión documentada: la pila
// documental y la factura (póliza VENCIDA canónica Nº 0048217) vienen del
// mundo S01 con el frame finalRest; este módulo NO duplica papeles.
// (PaperStack.tsx plegado aquí: no aportaba valor como archivo separado.)

import Backpack from './Backpack'
import DishArea from './DishArea'
import FacturaOverlay from './FacturaOverlay'
import FridgeService from './FridgeService'
import TechnicianGLB from './TechnicianGLB'
import type { TechRigApi } from './TechnicianRig'

export default function FinalProps({ techApiRef }: { techApiRef: React.MutableRefObject<TechRigApi | null> }) {
  return (
    <group name="FINAL_PROPS">
      <Backpack />
      <DishArea />
      <FacturaOverlay />
      <FridgeService />
      <TechnicianGLB apiRef={techApiRef} />
    </group>
  )
}
