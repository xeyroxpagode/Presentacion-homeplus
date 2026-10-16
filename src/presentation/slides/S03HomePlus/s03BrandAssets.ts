// S03 — isotipo auténtico: capas derivadas píxel a píxel del PNG oficial.
// orange = fondo redondeado · white = trazos (sin «+») · plus = signo «+».
// El composite de las tres capas es idéntico al original (verificación en
// scripts/extract-s03-logo.mjs + s03-logo-metrics.json).
import orangeUrl from './assets/s03-logo-orange.png'
import whiteUrl from './assets/s03-logo-white.png'
import plusUrl from './assets/s03-logo-plus.png'

export const S03_ORANGE_URL = orangeUrl
export const S03_WHITE_URL = whiteUrl
export const S03_PLUS_URL = plusUrl

// Recorte del «+» dentro del PNG 1254² (métricas verificadas).
export const PLUS_CROP = { x0: 818, y0: 269, x1: 1011, y1: 464 } as const
export const PLUS_CROP_W = PLUS_CROP.x1 - PLUS_CROP.x0 + 1
export const PLUS_CROP_H = PLUS_CROP.y1 - PLUS_CROP.y0 + 1
