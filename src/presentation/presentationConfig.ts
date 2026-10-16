import S01Chaos from './slides/S01Chaos'
import S02FragmentedInfo from './slides/S02FragmentedInfo'
import S03HomePlus from './slides/S03HomePlus'
import S04Home from './slides/S04Home'
import S05Planner from './slides/S05Planner'
import S06Family from './slides/S06Family'
import S07CoordinarNoEsVigilar from './slides/S07CoordinarNoEsVigilar'
import S08PlansInventory from './slides/S08PlansInventory'
import S09Finance from './slides/S09Finance'
import S10AssetsHomeCloud from './slides/S10AssetsHomeCloud'
import S11Continuity from './slides/S11Continuity'
import S12FrontendBackend from './slides/S12FrontendBackend'
import S13Stack from './slides/S13Stack'
import S14Barrier from './slides/S14Barrier'
import S15HomiAction from './slides/S15HomiAction'
import S16HomiContext from './slides/S16HomiContext'
import S17HumanControl from './slides/S17HumanControl'
import S18Closing from './slides/S18Closing'
import type { SlideDefinition } from './presentationTypes'

export const presentationConfig = {
  assistantName: 'HOMI',
  // stepCount includes step 0. All 18 scenes implemented.
  slides: [
    { id: 'S01', name: 'Chaos', stepCount: 4, component: S01Chaos },
    { id: 'S02', name: 'Fragmented Info', stepCount: 9, component: S02FragmentedInfo },
    { id: 'S03', name: 'HomePlus', stepCount: 1, component: S03HomePlus },
    { id: 'S04', name: 'Home', stepCount: 6, component: S04Home },
    { id: 'S05', name: 'Planner', stepCount: 4, component: S05Planner },
    { id: 'S06', name: 'Family', stepCount: 6, component: S06Family },
    { id: 'S07', name: 'Coordinar No Es Vigilar', stepCount: 2, component: S07CoordinarNoEsVigilar },
    { id: 'S08', name: 'Plans Inventory', stepCount: 5, component: S08PlansInventory },
    { id: 'S09', name: 'Finance', stepCount: 5, component: S09Finance },
    { id: 'S10', name: 'Assets HomeCloud', stepCount: 5, component: S10AssetsHomeCloud },
    { id: 'S11', name: 'Continuity', stepCount: 3, component: S11Continuity },
    { id: 'S12', name: 'Frontend Backend', stepCount: 3, component: S12FrontendBackend },
    { id: 'S13', name: 'Stack', stepCount: 4, component: S13Stack },
    { id: 'S14', name: 'Barrier', stepCount: 5, component: S14Barrier },
    { id: 'S15', name: 'HOMI Action', stepCount: 5, component: S15HomiAction },
    { id: 'S16', name: 'HOMI Context', stepCount: 5, component: S16HomiContext },
    { id: 'S17', name: 'Human Control', stepCount: 4, component: S17HumanControl },
    { id: 'S18', name: 'Closing', stepCount: 4, component: S18Closing },
  ] satisfies readonly SlideDefinition[],
} as const
