import S01Chaos from './slides/S01Chaos'
import S02FragmentedInfo from './slides/S02FragmentedInfo'
import S03HomePlus from './slides/S03HomePlus'
import S07CoordinarNoEsVigilar from './slides/S07CoordinarNoEsVigilar'
import S12FrontendBackend from './slides/S12FrontendBackend'
import CineRun from './slides/CineRun'
import S14Barrier from './slides/S14Barrier'
import S15HomiAction from './slides/S15HomiAction'
import S16HomiContext from './slides/S16HomiContext'
import S17HumanControl from './slides/S17HumanControl'
import S18Closing from './slides/S18Closing'
import FinalKitchenCanvas, { INTEGRATED_FINAL_BEATS } from './slides/FinalKitchen/FinalKitchenCanvas'
import type { SlideDefinition } from './presentationTypes'

export const presentationConfig = {
  assistantName: 'HOMI',
  // stepCount includes step 0. All 18 scenes implemented.
  // S04-S13 run the cinematic composition from src/cine; each stepCount below
  // covers that slide's contiguous block of cine steps (see cineSlides.ts).
  // S07 and S12 keep their own scenes: the cine run has no counterpart.
  slides: [
    { id: 'S01', name: 'Chaos', stepCount: 6, component: S01Chaos },
    { id: 'S02', name: 'Fragmented Info', stepCount: 9, component: S02FragmentedInfo },
    { id: 'S03', name: 'HomePlus', stepCount: 11, component: S03HomePlus },
    { id: 'S04', name: 'Home', stepCount: 3, component: CineRun },
    { id: 'S05', name: 'Planner', stepCount: 5, component: CineRun },
    { id: 'S06', name: 'Family', stepCount: 6, component: CineRun },
    { id: 'S07', name: 'Coordinar No Es Vigilar', stepCount: 2, component: S07CoordinarNoEsVigilar },
    { id: 'S08', name: 'Plans Inventory', stepCount: 5, component: CineRun },
    { id: 'S09', name: 'Finance', stepCount: 2, component: CineRun },
    { id: 'S10', name: 'Assets HomeCloud', stepCount: 4, component: CineRun },
    { id: 'S11', name: 'Continuity', stepCount: 1, component: CineRun },
    { id: 'S12', name: 'Frontend Backend', stepCount: 3, component: S12FrontendBackend },
    { id: 'S13', name: 'Stack', stepCount: 1, component: CineRun },
    { id: 'S14', name: 'Barrier', stepCount: 7, component: S14Barrier },
    { id: 'S15', name: 'HOMI Action', stepCount: 7, component: S15HomiAction },
    { id: 'S16', name: 'HOMI Context', stepCount: 8, component: S16HomiContext },
    { id: 'S17', name: 'Human Control', stepCount: 8, component: S17HumanControl },
    { id: 'FINAL_KITCHEN', name: 'Final Kitchen', stepCount: INTEGRATED_FINAL_BEATS.length, component: FinalKitchenCanvas },
    { id: 'S18', name: 'Closing', stepCount: 4, component: S18Closing },
  ] satisfies readonly SlideDefinition[],
} as const
