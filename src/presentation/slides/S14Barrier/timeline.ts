/**
 * S14 Friction — deterministic timeline controller (V5.0 contract, §22).
 *
 * Model: every narrative step owns ONE local timeline (tracks with start /
 * duration / easing / from / to). Steps always play their full timeline on
 * mount and terminate in a manual HOLD (§4). No auto-advance.
 *
 * Navigation policy (§4.1):
 * - NEXT from HOLD starts the next state; remount via React key replays it.
 * - PREVIOUS reconstructs the previous state from its snapshot (remount).
 * - Direct jumps (?dev=1&slide=13&step=M) mount the requested state directly.
 * - No concurrent timelines share an element: each step owns its layers and
 *   unmounts them on exit (React unmount = cancel + cleanup).
 *
 * Inspection (§22.1): append `&s14t=<ms>` to freeze a step at a local time.
 * sampleStep(step, tMs) derives every layer's visual values from local time,
 * so 0/10/25/50/75/90/100% can be inspected without manual capture.
 */

import { EASING, FORM_CAM, STEP_DURATION } from './geometry'

export type Track = {
  id: string
  start: number
  duration: number
  easing: string
  from: number
  to: number
}

export type Beat = {
  id: string
  trigger: string
  duration: number
  tracks: Track[]
}

const T = (id: string, start: number, duration: number, easing: string, from: number, to: number): Track => ({
  id, start, duration, easing, from, to,
})

/** H02 beats (§7.3). Times are ms from H02 start. */
export const H02_BEATS: Beat[] = [
  { id: 'phone-to-context', trigger: '“si quiero crear una tarea”', duration: 650, tracks: [
    T('phoneX', 0, 650, EASING.CONCEPT, 0, 1),
  ]},
  { id: 'plus-emphasis', trigger: 'control auténtico +', duration: 280, tracks: [
    T('plusScale', 160, 280, EASING.SHARED, 1, 1),
  ]},
  { id: 'row-extract', trigger: 'TaskRow protagonista', duration: 580, tracks: [
    T('rowExtract', 360, 580, EASING.HERO, 0, 1),
  ]},
  { id: 'row-read-hold', trigger: 'lectura', duration: 160, tracks: [
    T('hold', 940, 160, EASING.SHARED, 0, 1),
  ]},
  { id: 'row-to-form', trigger: 'morph TaskRow → formulario', duration: 980, tracks: [
    T('morph', 1100, 980, EASING.SHARED, 0, 1),
  ]},
  { id: 'cam-to-date', trigger: 'cámara → Fecha', duration: 420, tracks: [
    T('camP', 2080, 420, EASING.CAMERA, FORM_CAM.TOP, FORM_CAM.DATE),
  ]},
  { id: 'picker-open', trigger: 'abrir InlinePicker (nativo 180ms)', duration: 180, tracks: [
    T('picker', 2460, 180, EASING.SHARED, 0, 1),
  ]},
  { id: 'picker-select', trigger: 'seleccionar Mañana', duration: 140, tracks: [
    T('selectMañana', 2640, 140, EASING.SHARED, 0, 1),
  ]},
  { id: 'picker-close', trigger: 'cerrar InlinePicker (nativo ~120ms)', duration: 120, tracks: [
    T('picker', 2780, 120, EASING.SHARED, 1, 0),
  ]},
  { id: 'cam-to-footer', trigger: 'cámara → Crear tarea', duration: 440, tracks: [
    T('camP', 2900, 440, EASING.CAMERA, FORM_CAM.DATE, FORM_CAM.FOOTER),
  ]},
]

/** H03 exit beats (§9). Local to H03 start. */
export const H03_BEATS: Beat[] = [
  { id: 'cam-off-cta', trigger: 'cámara abandona CTA', duration: 140, tracks: [
    T('camP', 0, 140, EASING.CAMERA, FORM_CAM.FOOTER, FORM_CAM.DATE),
  ]},
  { id: 'reframe-form', trigger: 'encuadre general', duration: 290, tracks: [
    T('camP', 100, 290, EASING.CAMERA, FORM_CAM.DATE, FORM_CAM.TOP),
  ]},
  { id: 'form-fold', trigger: 'formulario → previsualización', duration: 330, tracks: [
    T('morph', 240, 330, EASING.SHARED, 1, 0),
  ]},
  { id: 'row-fade', trigger: 'TaskRow temporal se desvanece', duration: 200, tracks: [
    T('rowOut', 520, 200, EASING.EXIT, 0, 1),
  ]},
]

/** H04 beats (§10.3). Local to H04 start. */
export const H04_BEATS: Beat[] = [
  { id: 'to-assets', trigger: 'llegar a Activos (500ms)', duration: 500, tracks: [
    T('phoneView', 0, 500, EASING.CAMERA, 0, 1),
  ]},
  { id: 'scroll-ps', trigger: 'scroll hasta PlayStation (650ms)', duration: 700, tracks: [
    T('assetsScroll', 350, 700, EASING.CAMERA, 0, 1),
  ]},
  { id: 'ps5-extract', trigger: 'extracción fila PS5 (650ms E_HERO)', duration: 650, tracks: [
    T('ps5Extract', 800, 650, EASING.HERO, 0, 1),
  ]},
  { id: 'row-to-card', trigger: 'fila → ficha (730ms)', duration: 730, tracks: [
    T('ps5Morph', 1290, 730, EASING.SHARED, 0, 1),
  ]},
  { id: 'cam-data', trigger: 'cámara → Datos y documentos (460ms)', duration: 460, tracks: [
    T('assetsCam', 1900, 460, EASING.CAMERA, 0, 1),
  ]},
  { id: 'warranty-hero', trigger: 'registro garantía protagonista (530ms)', duration: 530, tracks: [
    T('warrantyExtract', 2220, 530, EASING.HERO, 0, 1),
  ]},
  { id: 'warranty-sheet', trigger: 'hoja de garantía (nativa 260ms)', duration: 480, tracks: [
    T('warrantyMorph', 2650, 400, EASING.SHARED, 0, 1),
  ]},
  { id: 'cam-docs', trigger: 'cámara → Documentos', duration: 365, tracks: [
    T('warrantyCam', 2980, 310, EASING.CAMERA, 0, 1),
  ]},
  { id: 'pdf-hero', trigger: 'PDF protagonista (390–500ms)', duration: 445, tracks: [
    T('pdfExtract', 3210, 390, EASING.HERO, 0, 1),
  ]},
  { id: 'pdf-detail', trigger: 'detalle PDF anidado (nativo 200ms)', duration: 310, tracks: [
    T('pdfMorph', 3600, 310, EASING.SHARED, 0, 1),
  ]},
]

/** H05+H06 reintegration beats (§19). Local to step-4 start. */
export const H05_BEATS: Beat[] = [
  { id: 'pdf-out', trigger: 'sale detalle PDF (200ms E_EXIT)', duration: 200, tracks: [
    T('pdfMorph', 0, 200, EASING.EXIT, 1, 0),
  ]},
  { id: 'pdf-back', trigger: 'fila PDF regresa a Documentos', duration: 290, tracks: [
    T('pdfExtract', 150, 290, EASING.SHARED, 1, 0),
  ]},
  { id: 'warranty-close', trigger: 'se cierra hoja de garantía (nativa 200ms)', duration: 260, tracks: [
    T('warrantyMorph', 350, 260, EASING.EXIT, 1, 0),
  ]},
  { id: 'cam-back', trigger: 'cámara vuelve a ficha PS5', duration: 380, tracks: [
    T('assetsCam', 570, 380, EASING.CAMERA, 1, 0),
  ]},
  { id: 'card-dock', trigger: 'ficha se reintegra al teléfono', duration: 410, tracks: [
    T('ps5Morph', 870, 410, EASING.SHARED, 1, 0),
  ]},
  { id: 'phone-home', trigger: 'teléfono al centro, HomePlus limpio', duration: 300, tracks: [
    T('phoneX', 1180, 300, EASING.CONCEPT, 1, 0),
  ]},
]

export const STEP_BEATS: Record<number, Beat[]> = {
  2: H02_BEATS, 3: [...H03_BEATS, ...H04_BEATS.map(b => ({ ...b, tracks: b.tracks.map(t => ({ ...t, start: t.start + 720 })) }))],
  4: H05_BEATS,
}

export function stepDuration(step: number): number {
  if (step === 3) return 720 + 3910
  return STEP_DURATION[step] ?? 500
}

const clamp01 = (v: number): number => Math.min(1, Math.max(0, v))

/** Progress of one track at local time t (linear; easing lives in CSS). */
export function trackProgress(track: Track, t: number): number {
  if (t <= track.start) return track.from
  if (t >= track.start + track.duration) return track.to
  const p = (t - track.start) / track.duration
  return track.from + (track.to - track.from) * p
}

/** Value of a channel id at local time t for a step (latest started track wins). */
export function channelAt(step: number, channelId: string, t: number): number | null {
  const beats = STEP_BEATS[step]
  if (!beats) return null
  let best: Track | null = null
  for (const beat of beats) {
    for (const track of beat.tracks) {
      if (track.id !== channelId) continue
      if (t < track.start) continue
      if (!best || track.start >= best.start) best = track
    }
  }
  if (!best) {
    // Before any track starts: initial value of the earliest track.
    let earliest: Track | null = null
    for (const beat of beats) {
      for (const track of beat.tracks) {
        if (track.id !== channelId) continue
        if (!earliest || track.start < earliest.start) earliest = track
      }
    }
    return earliest ? earliest.from : null
  }
  return trackProgress(best, t)
}

/** Freeze-frame snapshot for the main visual channels (§22.1). */
export type StepSnapshot = {
  phoneBlend: number // 0 = center/home, 1 = context-left
  camP: number // form camera P (master px)
  picker: number // 0 closed, 1 open
  mañana: number // 0 Sin fecha, 1 Mañana
  morph: number // 0 row, 1 form
  rowOut: number
  ps5Extract: number
  ps5Morph: number
  assetsCam: number
  warrantyExtract: number
  warrantyMorph: number
  pdfExtract: number
  pdfMorph: number
}

export function sampleStep(step: number, tMs: number): StepSnapshot {
  const at = (id: string, fallback: number): number => channelAt(step, id, tMs) ?? fallback
  return {
    phoneBlend: step === 2 || step === 3 ? 1 : step === 4 ? clamp01(1 - (tMs - 1180) / 300) : 0,
    camP: at('camP', step === 2 ? FORM_CAM.FOOTER : FORM_CAM.TOP),
    picker: at('picker', 0),
    mañana: step === 2 ? (tMs >= 2640 ? 1 : 0) : step === 3 ? 0 : 0,
    morph: at('morph', step === 2 ? 1 : 0),
    rowOut: at('rowOut', 0),
    ps5Extract: at('ps5Extract', step === 4 ? 0 : 0),
    ps5Morph: at('ps5Morph', step === 4 ? 0 : step === 3 && tMs >= 2020 ? 1 : 0),
    assetsCam: at('assetsCam', 0),
    warrantyExtract: at('warrantyExtract', 0),
    warrantyMorph: at('warrantyMorph', 0),
    pdfExtract: at('pdfExtract', 0),
    pdfMorph: at('pdfMorph', 0),
  }
}

/** Parse `s14t` freeze param (ms). Null = play timelines normally. */
export function freezeTimeParam(): number | null {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get('s14t')
  if (raw === null) return null
  const t = Number(raw)
  return Number.isFinite(t) && t >= 0 ? t : 0
}
