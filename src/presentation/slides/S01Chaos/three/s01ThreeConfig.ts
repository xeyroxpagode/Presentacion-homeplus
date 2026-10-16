// S01 CANÓNICA 3D — configuración del renderer original.
// La S01 final aprobada ES la experiencia tridimensional (Three.js + React
// Three Fiber, FOV 36°). El renderer 3D es el recorrido de producción por
// defecto; `?s01Renderer=flat` conserva el diorama 2.5D sólo como fallback
// de depuración (no forma parte del recorrido aprobado).

/** ¿S01 debe usar el diorama 2.5D en vez del renderer 3D original? (sólo debug) */
export function isS01ThreeRenderer(): boolean {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('s01Renderer') !== 'flat'
}

/** Paleta apagada: negros cálidos, antracita azulada, maderas neutras,
 *  blancos rotos y un único acento cálido HomePlus usado con cuentagotas. */
export const s01Palette = {
  void: '#0d0c12', // fondo/niebla — negro cálido
  floor: '#26242c', // piso — madera oscura desaturada
  wall: '#2c2f3a', // paredes — gris azulado
  wallSide: '#292c36',
  ceiling: '#16141b',
  trim: '#3a3d49', // marcos, zócalos, frentes de mueble
  kick: '#17151c', // toe-kick / contras
  cabinet: '#3a3e46', // muebles bajos
  cabinetFront: '#43474f',
  counter: '#7a5c3f', // mesada de madera
  counterBack: '#4a4c55',
  fridge: '#b6b1a6', // blanco roto hueso
  fridgeHandle: '#cfcac0',
  paper: '#ddd6c6', // papeles
  kraft: '#a5814f', // bolsa / carpeta
  metal: '#b9bdc4', // llaves / herrajes
  plastic: '#2a2a2e', // llavero
  accent: '#c97f3d', // naranja HomePlus — mínimo, como clima
  warmLight: '#ffc98a',
  coolLight: '#6a7ba8',
  bulb: '#ffd9a0',
} as const

/** Cámara fija cinematográfica: ángulo oblicuo, mesada en el plano medio,
 *  heladera legible al fondo a la derecha, entrada de puerta a la izquierda. */
export const s01Camera = {
  position: [2.35, 1.72, 3.1] as const,
  target: [0.2, 0.75, -0.5] as const,
  fov: 36,
}
