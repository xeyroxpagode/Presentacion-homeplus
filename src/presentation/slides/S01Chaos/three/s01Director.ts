// S01 CINEMATIC FINAL PRIME — state machine determinista (steps 0–5).
// Autoridad = (previousStep, currentStep). Forward dramatiza; reverse restaura
// el F100 del destino sin drama. Step 5 = acumulación + staging + PHONE PORTAL;
// su F100 es PHONE_INSIDE (pantalla negra llenando el viewport).
// Cada frame se escribe en un objeto persistente (sin alloc por frame).
// Interrupción: todo script mezcla desde los params actuales en 120–220 ms.

import {
  DEG,
  s01AccumDocs,
  s01AnchorByStep,
  s01Anchors,
  s01BeatDuration,
  s01Dishes,
  s01Docs,
  s01Geo,
  s01Loose,
  s01Smoke,
  s01SmokeMaxOpacity,
  s01Timings,
  type Vec3,
} from './s01CinematicConfig'
import { s01PortalFinal, s01ScreenFrame } from './s01Portal'

export type Pose = { p: Vec3; r: Vec3; v: number }
export type S01Frame = {
  camPos: Vec3
  camTarget: Vec3
  camUp: Vec3
  blackout: number
  pantry: [number, number, number]
  fTop: number
  fBot: number
  fLift: number
  fRoll: number
  fShift: number
  drawer: number
  manualCover: number
  /** V5.1 — luz fría interior (1 encendida en S01.2, 0 tras el fallo). */
  fridgeLight: number
  /** V5.2 — factor compartido de iluminación de cocina (§06C): 1 en
   *  reposo, parpadea 0.72–1.0 durante el fallo. Ambiental base intacta. */
  kitchenLight: number
  /** V5.1 — cuatro alimentos con estados independientes. */
  apple: { p: Vec3; r: Vec3 }
  water: { p: Vec3; r: Vec3 }
  eggA: { p: Vec3; r: Vec3 }
  eggB: { p: Vec3; r: Vec3 }
  policy: { p: Vec3; r: Vec3 }
  docs: Pose[]
  accumDocs: Pose[]
  loose: { p: Vec3; r: Vec3 }[]
  list: { p: Vec3; r: Vec3 }
  smoke: { p: Vec3; s: number; o: number }[]
  dishes: Pose[]
}

type Ease = (u: number) => number
const easeInOut: Ease = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2)
const easeOut: Ease = (u) => 1 - Math.pow(1 - u, 3)
const easeOutBack: Ease = (u) => {
  const c = 0.55
  const t = u - 1
  return 1 + (c + 1) * t * t * t + c * t * t
}
const clamp01 = (u: number) => (u < 0 ? 0 : u > 1 ? 1 : u)
const lerp = (a: number, b: number, u: number) => a + (b - a) * u
const lerp3 = (a: Vec3, b: Vec3, u: number): Vec3 => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)]
const smooth = (u: number) => u * u * (3 - 2 * u)

function makeFrame(): S01Frame {
  return {
    camPos: [0, 0, 0],
    camTarget: [0, 0, 0],
    camUp: [0, 1, 0],
    blackout: 1,
    pantry: [0, 0, 0],
    fTop: 0,
    fBot: 0,
    fLift: 0,
    fRoll: 0,
    fShift: 0,
    drawer: 0,
    manualCover: 0,
    fridgeLight: 0,
    kitchenLight: 1,
    apple: { p: [0, 0, 0] as Vec3, r: [0, 0, 0] as Vec3 },
    water: { p: [0, 0, 0] as Vec3, r: [0, 0, 0] as Vec3 },
    eggA: { p: [0, 0, 0] as Vec3, r: [0, 0, 0] as Vec3 },
    eggB: { p: [0, 0, 0] as Vec3, r: [0, 0, 0] as Vec3 },
    policy: { p: [0, 0, 0] as Vec3, r: [0, 0, 0] as Vec3 },
    docs: s01Docs.map(() => ({ p: [0, 0, 0] as Vec3, r: [0, 0, 0] as Vec3, v: 0 })),
    accumDocs: s01AccumDocs.map(() => ({ p: [0, 0, 0] as Vec3, r: [0, 0, 0] as Vec3, v: 0 })),
    loose: s01Loose.map(() => ({ p: [0, 0, 0] as Vec3, r: [0, 0, 0] as Vec3 })),
    list: { p: [0, 0, 0] as Vec3, r: [0, 0, 0] as Vec3 },
    smoke: s01Smoke.map(() => ({ p: [0, 0, 0] as Vec3, s: 0.001, o: 0 })),
    dishes: s01Dishes.map(() => ({ p: [0, 0, 0] as Vec3, r: [0, 0, 0] as Vec3, v: 0 })),
  }
}

export class S01Director {
  /** Estado visible del beat actual (lectura directa desde useFrame). */
  readonly frame = makeFrame()
  step = 0
  reduced = false
  /** Reloj local del beat en curso (ms). La QA lo lee para capturar fases. */
  elapsed = 0
  /** Aspect del canvas (el portal final depende de él). */
  aspect = 16 / 9

  private params: Record<string, number> = {}
  private channels: { key: string; from: number; to: number; t0: number; t1: number; ease: Ease }[] = []
  private mode: 'idle' | 'tween' | 'script3' | 'script4' | 'script5' = 'idle'
  private scriptEnd = 0
  private camFrom: Vec3 = [0, 0, 0]
  private camTargetFrom: Vec3 = [0, 0, 0]
  private blendFrom: Record<string, number> | null = null
  private target: Record<string, number> = {}

  constructor() {
    this.reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.f100(0, this.params)
    this.f100(0, this.target)
    this.writeFrame()
  }

  /** Montaje / deep-link: salto directo al F100 del step (sin re-drama). */
  init(step: number, aspect = 16 / 9) {
    this.aspect = aspect
    this.step = Math.min(Math.max(step, 0), 5)
    this.f100(this.step, this.params)
    this.f100(this.step, this.target)
    this.channels = []
    this.mode = 'idle'
    this.elapsed = 0
    this.blendFrom = null
    this.writeFrame()
  }

  /** Cambio de step: la autoridad es (previousStep, currentStep). */
  setStep(next: number) {
    const target = Math.min(Math.max(next, 0), 5)
    const prev = this.step
    if (target === prev) return
    const forward = target > prev
    this.step = target
    this.elapsed = 0
    this.f100(target, this.target)
    this.channels = []
    this.blendFrom = { ...this.params }

    if (this.reduced) {
      this.mode = 'tween'
      this.blendFrom = null
      this.tweenAll([0, s01Timings.reduced.snap], forward ? easeOut : easeInOut)
      return
    }
    if (forward && target === 3) {
      this.mode = 'script3'
      this.scriptEnd = s01Timings.fridgeFail.end
      this.camFrom = [...this.frame.camPos] as Vec3
      this.camTargetFrom = [...this.frame.camTarget] as Vec3
      return
    }
    if (forward && target === 5) {
      this.mode = 'script5'
      this.scriptEnd = s01Timings.enter5.portal[1]
      return
    }
    if (forward && target === 4) {
      this.mode = 'script4'
      this.scriptEnd = s01Timings.enter4.end
      this.camFrom = [...this.frame.camPos] as Vec3
      this.camTargetFrom = [...this.frame.camTarget] as Vec3
      return
    }
    this.mode = 'tween'
    this.blendFrom = null
    if (forward && target === 1) this.buildEnter1()
    else if (forward && target === 2) this.buildEnter2()
    else this.buildReverse(target)
  }

  /** Inspección dev-only: ?s01InspectPortal=0..1 (pose del portal de step 5). */
  debugPortal(u: number, aspect = 16 / 9) {
    this.aspect = aspect
    this.step = 5
    const t = s01Timings.enter5.portal[0] + clamp01(u) * (s01Timings.enter5.portal[1] - s01Timings.enter5.portal[0])
    this.f100(5, this.params)
    this.sampleScript5(t, this.params)
    this.mode = 'idle'
    this.elapsed = t
    this.writeFrame()
  }

  /** QA dev-only: muestra un tiempo exacto de los beats 3–5 sin depender
   * del reloj de pared ni del costo de readPixels. */
  debugBeat(step: 3 | 4 | 5, t: number, aspect = 16 / 9) {
    this.aspect = aspect
    this.step = step
    this.elapsed = Math.max(0, t)
    this.blendFrom = null
    this.channels = []
    if (step === 3) {
      this.f100(2, this.params)
      this.camFrom = [...s01Anchors.A_FRIDGE_SIDE.pos] as Vec3
      this.camTargetFrom = [...s01Anchors.A_FRIDGE_SIDE.target] as Vec3
      this.applyScript3(Math.min(t, s01Timings.fridgeFail.end))
    } else if (step === 4) {
      this.f100(3, this.params)
      this.camFrom = [...s01Anchors.A_DOCS.pos] as Vec3
      this.camTargetFrom = [...s01Anchors.A_DOCS.target] as Vec3
      this.sampleScript4(Math.min(t, s01Timings.enter4.end), this.params)
    } else {
      this.sampleScript5(Math.min(t, s01Timings.enter5.portal[1]), this.params)
    }
    this.mode = 'idle'
    this.writeFrame()
  }

  /** ¿Sigue animando? El Canvas mantiene frameloop="demand" con invalidate. */
  get animating() {
    return this.mode !== 'idle' || this.step === 3 || this.step === 4
  }

  /** Duración del beat actual (para QA). */
  beatDuration() {
    if (this.mode === 'script5') return this.scriptEnd
    if (this.mode === 'script4') return this.scriptEnd
    if (this.mode === 'script3') return this.scriptEnd
    if (this.mode === 'tween') return this.tweenEnd()
    return s01BeatDuration[this.step] ?? 1000
  }

  /** Actualiza el frame. Devuelve true si la animación sigue viva. */
  update(dt: number, aspect = 16 / 9) {
    if (this.mode === 'idle') {
      if (this.step === 3 || this.step === 4) {
        this.elapsed += dt
        const smokeTime = this.step === 4 ? s01Timings.fridgeFail.end + this.elapsed : this.elapsed
        this.sampleSmoke(smokeTime, this.params)
        this.writeFrame()
        return true
      }
      return false
    }
    this.aspect = aspect
    this.elapsed += dt
    if (this.mode === 'tween') this.applyTween()
    else if (this.mode === 'script3') this.applyScript3(this.elapsed)
    else if (this.mode === 'script4') this.sampleScript4(this.elapsed, this.params)
    else this.sampleScript5(this.elapsed, this.params)
    // Interrupción / entrada: mezcla desde el estado previo (120–220 ms).
    if (this.blendFrom && (this.mode === 'script3' || this.mode === 'script4' || this.mode === 'script5')) {
      const bu = easeOut(clamp01(this.elapsed / 180))
      for (const key of Object.keys(this.params)) {
        const from = this.blendFrom[key] ?? this.params[key]
        this.params[key] = lerp(from, this.params[key], bu)
      }
      if (this.elapsed >= 180) this.blendFrom = null
    }
    const end = this.mode === 'tween' ? this.tweenEnd() : this.scriptEnd
    if (this.elapsed >= end) {
      if (this.mode === 'tween') {
        for (const ch of this.channels) this.params[ch.key] = ch.to
      } else {
        this.f100(this.step, this.params)
      }
      this.mode = 'idle'
      this.blendFrom = null
    }
    this.writeFrame()
    return this.mode !== 'idle'
  }

  /* ---------------- F100 por step (destino de forward y reverse) -------- */

  private f100(step: number, out: Record<string, number>) {
    const anchor = s01Anchors[s01AnchorByStep[Math.min(Math.max(step, 0), 5)]]
    if (step === 5) {
      // PHONE_INSIDE: cámara alineada al screen (pose frontal ideal, §76).
      const fin = s01PortalFinal(this.aspect)
      out['camPos.0'] = fin.pos[0]
      out['camPos.1'] = fin.pos[1]
      out['camPos.2'] = fin.pos[2]
      out['camTarget.0'] = fin.target[0]
      out['camTarget.1'] = fin.target[1]
      out['camTarget.2'] = fin.target[2]
      out['camUp.0'] = fin.up[0]
      out['camUp.1'] = fin.up[1]
      out['camUp.2'] = fin.up[2]
    } else {
      out['camPos.0'] = anchor.pos[0]
      out['camPos.1'] = anchor.pos[1]
      out['camPos.2'] = anchor.pos[2]
      out['camTarget.0'] = anchor.target[0]
      out['camTarget.1'] = anchor.target[1]
      out['camTarget.2'] = anchor.target[2]
      out['camUp.0'] = 0
      out['camUp.1'] = 1
      out['camUp.2'] = 0
    }
    out['blackout'] = step === 0 ? 1 : 0

    const open = step >= 2 ? 1 : 0
    out['pantry.0'] = open * s01Geo.pantry.leafA_L.open
    out['pantry.1'] = open * s01Geo.pantry.leafA_R.open
    out['pantry.2'] = open * s01Geo.pantry.leafB_R.open

    out['fTop'] = step >= 3 ? s01Geo.fridge.topRest : step >= 2 ? s01Geo.fridge.topPre : 0
    out['fBot'] = step >= 3 ? s01Geo.fridge.botRest : step >= 2 ? s01Geo.fridge.botPre : 0
    out['fLift'] = 0
    out['fRoll'] = 0
    out['fShift'] = 0
    out['drawer'] = step >= 3 ? s01Geo.docTower.drawerTravel : 0
    out['manualCover'] = step >= 3 ? 57 * DEG : 0
    // Luz interior V5.1 (§5): encendida sólo en step 2 (heladera abierta,
    // casi vacía). Apagada tras el fallo y en el resto.
    out['fridgeLight'] = step === 2 ? 1 : 0
    out['kitchenLight'] = 1

    // Alimentos V5.1 (§5): step 0–1 reposo oculto (origen, v=0 visualmente
    // dentro de heladera cerrada); step 2 cuatro en posición original;
    // step 3+ posiciones post-avería (persisten en 4 y 5).
    const foodPose = step >= 3 ? 'post' : 'home'
    const fBotA = step >= 3 ? s01Geo.fridge.botRest : step >= 2 ? s01Geo.fridge.botPre : 0
    const appleP = foodPose === 'post' ? s01Geo.fridgeFood.appleLand : doorWorld(s01Geo.fridgeFood.appleDoor, fBotA)
    setPose(out, 'apple', appleP, foodPose === 'post' ? [0.4, 0.6, 1.2] : [0, 0.3, 0], 1)
    const waterP = foodPose === 'post' ? s01Geo.fridgeFood.waterLand : s01Geo.fridgeFood.waterHome
    setPose(out, 'water', waterP, foodPose === 'post' ? [0, 0, Math.PI / 2] : [0, 0, 0], 1)
    const eggAP = doorWorld(s01Geo.fridgeFood.eggADoor, fBotA)
    setPose(out, 'eggA', eggAP, [0, 0, 0], 1)
    const eggBP = foodPose === 'post' ? s01Geo.fridgeFood.eggBLand : doorWorld(s01Geo.fridgeFood.eggBDoor, fBotA)
    setPose(out, 'eggB', eggBP, foodPose === 'post' ? [0, 0.4, Math.PI / 2] : [0, 0, 0], 1)

    // V5.2.1: la póliza nunca se suma a una pila; conserva su pose física.
    out['policy.p.0'] = 0
    out['policy.p.1'] = 0
    out['policy.p.2'] = 0
    out['policy.r.0'] = 0
    out['policy.r.1'] = 0
    out['policy.r.2'] = 0

    s01Docs.forEach((d, i) => {
      const pose = step >= 3 ? 'land' : 'origin'
      const p = pose === 'land' ? add3(d.land, d.slide) : d.origin
      const r = pose === 'land' ? ([d.landRot[0], d.landRot[1] + d.slideRot, d.landRot[2]] as Vec3) : d.originRot
      out[`docs.${i}.p.0`] = p[0]
      out[`docs.${i}.p.1`] = p[1]
      out[`docs.${i}.p.2`] = p[2]
      out[`docs.${i}.r.0`] = r[0]
      out[`docs.${i}.r.1`] = r[1]
      out[`docs.${i}.r.2`] = r[2]
      out[`docs.${i}.v`] = pose === 'origin' ? 0 : 1
    })

    s01AccumDocs.forEach((d, i) => {
      setPose(out, `accumDocs.${i}`, d.p, d.r, step >= 4 ? 1 : 0)
    })

    s01Loose.forEach((l, i) => {
      const p = l.home
      const r = l.homeRot
      out[`loose.${i}.p.0`] = p[0]
      out[`loose.${i}.p.1`] = p[1]
      out[`loose.${i}.p.2`] = p[2]
      out[`loose.${i}.r.0`] = r[0]
      out[`loose.${i}.r.1`] = r[1]
      out[`loose.${i}.r.2`] = r[2]
    })

    const listP = s01Geo.listHome
    out['list.p.0'] = listP[0]
    out['list.p.1'] = listP[1]
    out['list.p.2'] = listP[2]
    out['list.r.0'] = 0
    out['list.r.1'] = -0.2
    out['list.r.2'] = 0

    // Humo V5.2: persiste en los HOLD de steps 3 y 4. El sampler cíclico
    // actualiza estas semillas sin alterar ningún otro objeto quieto.
    s01Smoke.forEach((s, i) => {
      out[`smoke.${i}.p.0`] = s.origin[0]
      out[`smoke.${i}.p.1`] = s.origin[1]
      out[`smoke.${i}.p.2`] = s.origin[2]
      out[`smoke.${i}.s`] = step >= 3 && step <= 4 ? 0.12 : 0.001
      out[`smoke.${i}.o`] = step >= 3 && step <= 4 ? 0.12 : 0
    })

    s01Dishes.forEach((d, i) => {
      const visible = step >= 4
      setPose(out, `dishes.${i}`, d.p, d.r, visible ? 1 : 0)
    })
  }

  /* ---------------- construcción de transiciones ---------------- */

  private addTween(key: string, t0: number, t1: number, ease: Ease) {
    this.channels.push({ key, from: this.params[key] ?? 0, to: this.target[key] ?? 0, t0, t1, ease })
  }

  private addCamTween(t0: number, t1: number, ease: Ease) {
    for (let i = 0; i < 3; i++) {
      this.addTween(`camPos.${i}`, t0, t1, ease)
      this.addTween(`camTarget.${i}`, t0, t1, ease)
      this.addTween(`camUp.${i}`, t0, t1, ease)
    }
  }

  private tweenEnd() {
    let end = 0
    for (const ch of this.channels) if (ch.t1 > end) end = ch.t1
    return end
  }

  private tweenAll(range: [number, number], ease: Ease) {
    for (const key of Object.keys(this.target)) this.addTween(key, range[0], range[1], ease)
  }

  private buildEnter1() {
    const t = s01Timings.enter1
    this.addTween('blackout', t.blackout[0], t.blackout[1], easeOut)
    this.addCamTween(t.cam[0], t.cam[1], easeInOut)
  }

  private buildEnter2() {
    const t = s01Timings.enter2
    // Travelling continuo pantry → fridge (§05, feedback de dirección):
    // DOS framings solamente — 1) alacena abierta (lectura del vacío),
    // 2) revelación lateral izquierda del interior de la heladera.
    // Sin punto intermedio que muestre la mesada trasera (recortado V5.2).
    const mid = s01Anchors.A_PANTRY
    const end = s01Anchors.A_FRIDGE_SIDE
    for (let i = 0; i < 3; i++) {
      const fromP = this.params[`camPos.${i}`] ?? 0
      const fromT = this.params[`camTarget.${i}`] ?? 0
      this.channels.push({ key: `camPos.${i}`, from: fromP, to: mid.pos[i], t0: t.camPantry[0], t1: t.camPantry[1], ease: easeInOut })
      this.channels.push({ key: `camTarget.${i}`, from: fromT, to: mid.target[i], t0: t.camPantry[0], t1: t.camPantry[1], ease: easeInOut })
      // Segunda fase (misma key: el último canal activo domina; antes de
      // t0 se salta): mid→end directo, por el pasillo libre, sin cortes.
      this.channels.push({ key: `camPos.${i}`, from: mid.pos[i], to: end.pos[i], t0: t.camTravel[0], t1: t.camTravel[1], ease: easeInOut })
      this.channels.push({ key: `camTarget.${i}`, from: mid.target[i], to: end.target[i], t0: t.camTravel[0], t1: t.camTravel[1], ease: easeInOut })
      this.channels.push({ key: `camUp.${i}`, from: this.params[`camUp.${i}`] ?? (i === 1 ? 1 : 0), to: i === 1 ? 1 : 0, t0: t.camPantry[0], t1: t.camPantry[1], ease: easeInOut })
    }
    // Stagger orgánico con overshoot (A-L 170, A-R 235, B-R 305).
    for (let i = 0; i < 3; i++) this.addTween(`pantry.${i}`, t.doors[i][0], t.doors[i][1], easeOutBack)
    // Heladera: bottom 0°→42° + luz fría durante la apertura (1300–1900).
    this.addTween('fBot', t.fridgeOpen[0], t.fridgeOpen[1], easeInOut)
    this.addTween('fTop', t.fridgeOpen[0], t.fridgeOpen[1], easeInOut)
    this.addTween('fridgeLight', t.fridgeOpen[0], t.fridgeOpen[1], easeOut)
    // Alimentos: siguen a sus posiciones originales con la apertura
    // (lineal en params; el anclaje exacto a puerta lo resuelve F100 + script3).
    for (const key of Object.keys(this.target)) {
      if (key.startsWith('apple.') || key.startsWith('water.') || key.startsWith('eggA.') || key.startsWith('eggB.')) {
        this.addTween(key, t.fridgeOpen[0], t.fridgeOpen[1], easeInOut)
      }
    }
  }

  private buildEnter4() {
    this.addCamTween(s01Timings.enter4.cam[0], s01Timings.enter4.cam[1], easeInOut)
  }

  /** Reverse: restaura el F100 del destino. Sin drama, sin humo, sin shake. */
  private buildReverse(target: number) {
    const t = s01Timings.reverse
    for (const key of Object.keys(this.target)) {
      if (key.startsWith('camPos.') || key.startsWith('camTarget.') || key.startsWith('camUp.')) continue
      if (key.startsWith('docs.') && key.endsWith('.v')) {
        const from = this.params[key] ?? 0
        const to = this.target[key] ?? 0
        this.channels.push({ key, from, to, t0: t.state[1] * 0.72, t1: t.state[1], ease: easeInOut })
        continue
      }
      if (key.startsWith('pantry.') && target <= 1) {
        // 2→1: cierre limpio con leve stagger, sin overshoot.
        const i = Number(key.split('.')[1] ?? 0)
        this.channels.push({
          key,
          from: this.params[key] ?? 0,
          to: this.target[key] ?? 0,
          t0: t.pantry[0] - 60 + i * 20,
          t1: t.pantry[0] - 60 + i * 20 + (t.pantry[1] - t.pantry[0]),
          ease: easeInOut,
        })
        continue
      }
      this.addTween(key, t.state[0], t.state[1], easeInOut)
    }
    if (target === 0) this.addTween('blackout', t.blackout[0], t.blackout[1], easeInOut)
    this.addCamTween(t.cam[0], target === 0 ? t.blackout[1] : t.cam[1], easeInOut)
  }

  private applyTween() {
    for (const ch of this.channels) {
      if (this.elapsed < ch.t0) continue
      const u = clamp01((this.elapsed - ch.t0) / Math.max(1, ch.t1 - ch.t0))
      this.params[ch.key] = lerp(ch.from, ch.to, ch.ease(u))
    }
  }

  /* ---------------- beat 3: script de fallo ---------------- */

  private applyScript3(t: number) {
    const T = s01Timings.fridgeFail
    // Base analítica del beat anterior: hace que una navegación rápida
    // 0→3 converja al mismo estado que 2→3, sin depender de frames omitidos.
    this.f100(2, this.params)
    // 0–320: SIDE→heladera completa; 320–500: lectura quieta. La avería
    // empieza recién después del asentamiento. 1850–2200: travelling al
    // área documental, sin corte.
    const uCam = easeInOut(clamp01((t - T.reframe[0]) / (T.reframe[1] - T.reframe[0])))
    const fridge = s01Anchors.A_FRIDGE
    const docs = s01Anchors.A_DOCS
    for (let i = 0; i < 3; i++) {
      const atFridgeP = lerp(this.camFrom[i], fridge.pos[i], uCam)
      const atFridgeT = lerp(this.camTargetFrom[i], fridge.target[i], uCam)
      const uDocs = easeInOut(clamp01((t - T.docReframe[0]) / (T.docReframe[1] - T.docReframe[0])))
      this.params[`camPos.${i}`] = lerp(atFridgeP, docs.pos[i], uDocs)
      this.params[`camTarget.${i}`] = lerp(atFridgeT, docs.target[i], uDocs)
      this.params[`camUp.${i}`] = i === 1 ? 1 : 0
    }
    this.params['blackout'] = 0

    // Puertas V5.1: parten de la pose pre-open (42°/0°, nunca 0°) → peak
    // 58°/22° → rebound 46°/8° → rest 50°/12° (680–980ms).
    const F = s01Geo.fridge
    this.params['fTop'] = doorFailPhase(t, T.topDoorPeak, T.topDoorMid, T.topDoorRest, F.topPre, F.topPeak, F.topRebound, F.topRest)
    this.params['fBot'] = doorFailPhase(t, T.botDoorPeak, T.botDoorMid, T.botDoorRest, F.botPre, F.botPeak, F.botRebound, F.botRest)
    // Luces: la cocina completa parpadea sin perder la base ambiental;
    // el interior de la heladera se apaga definitivamente tras el golpe.
    this.params['fridgeLight'] = fridgeLightAt(t)
    this.params['kitchenLight'] = kitchenLightAt(t)
    // Drawer prismático: abre DESPUÉS de la pausa (1750+), no con el golpe.
    const travel = s01Geo.docTower.drawerTravel
    this.params['drawer'] = drawer3Phase(t, T.drawerA, T.drawerB, T.drawerC, travel)

    // Cuerpo: microtirón 480–580 → golpe 620–750 → rebound → recupero a base.
    const { lift, roll, shift } = fridgeBody(t)
    this.params['fLift'] = lift
    this.params['fRoll'] = roll
    this.params['fShift'] = shift

    // Alimentos V5.1 §8: trayectorias deterministas 760–1500ms.
    const fBot = this.params['fBot']
    const ap = appleAt(t, fBot)
    setPose(this.params, 'apple', ap.p, ap.r, 1)
    const wa = waterAt(t)
    setPose(this.params, 'water', wa.p, wa.r, 1)
    const ea = eggAt(t, fBot, 'A')
    setPose(this.params, 'eggA', ea.p, ea.r, 1)
    const eb = eggAt(t, fBot, 'B')
    setPose(this.params, 'eggB', eb.p, eb.r, 1)

    // Documentación V5.2: aparece localmente durante el travelling y cada
    // hoja recorre sólo su pequeño slide sobre la superficie de destino.
    s01Docs.forEach((d, i) => {
      if (t < d.appear) {
        setPose(this.params, `docs.${i}`, d.origin, d.originRot, 0)
        return
      }
      const start = T.searchStart + i * T.searchStagger
      const u = easeInOut(clamp01((t - start) / T.searchEach))
      const p = lerp3(d.land, add3(d.land, d.slide), u)
      const r: Vec3 = [d.landRot[0], d.landRot[1] + d.slideRot * u, d.landRot[2]]
      setPose(this.params, `docs.${i}`, p, r, 1)
    })

    this.params['manualCover'] = manualCoverAt(t, 2200)
    this.sampleSmoke(t, this.params)
  }

  /** Humo low-poly cíclico y determinista. Sólo este canal permanece vivo en
   * los HOLD de los beats 3 y 4; las seis geometrías se reutilizan. */
  private sampleSmoke(t: number, out: Record<string, number>) {
    s01Smoke.forEach((s, i) => {
      if (t < s.start) {
        out[`smoke.${i}.o`] = 0
        out[`smoke.${i}.s`] = 0.001
        return
      }
      const phase = ((t - s.start + i * 97) % s.life) / s.life
      const envelope = Math.sin(Math.PI * Math.pow(phase, 0.82))
      out[`smoke.${i}.p.0`] = s.origin[0] + s.drift * Math.sin(phase * Math.PI * 2)
      out[`smoke.${i}.p.1`] = s.origin[1] + s.rise * phase
      out[`smoke.${i}.p.2`] = s.origin[2] + s.drift * 0.3 * phase
      out[`smoke.${i}.s`] = 0.1 + 0.16 * Math.pow(phase, 0.7)
      out[`smoke.${i}.o`] = Math.min(s01SmokeMaxOpacity, (0.2 + i * 0.012) * envelope)
    })
  }

  /* ----------- beat 4: acumulación + bacha/vajilla ----------------- */

  private sampleScript4(t: number, out: Record<string, number>) {
    const T = s01Timings.enter4
    this.f100(3, out)
    out['blackout'] = 0
    out['kitchenLight'] = 1

    const wide = s01Anchors.A_WIDE
    const uCam = easeInOut(clamp01((t - T.cam[0]) / (T.cam[1] - T.cam[0])))
    for (let i = 0; i < 3; i++) {
      out[`camPos.${i}`] = lerp(this.camFrom[i], wide.pos[i], uCam)
      out[`camTarget.${i}`] = lerp(this.camTargetFrom[i], wide.target[i], uCam)
      out[`camUp.${i}`] = i === 1 ? 1 : 0
    }

    s01Dishes.forEach((d, i) => {
      const u = easeOut(clamp01((t - d.reveal) / 180))
      const p: Vec3 = [d.p[0], d.p[1] - 0.025 * (1 - u), d.p[2]]
      const r: Vec3 = [d.r[0] + 0.06 * (1 - u), d.r[1], d.r[2] - 0.05 * (1 - u)]
      setPose(out, `dishes.${i}`, p, r, u > 0 ? 1 : 0)
    })

    // Los nueve documentos, dos recibos, lista y póliza previos quedan
    // exactamente en su F100 del beat 3. Sólo aparecen seis hojas nuevas,
    // cada una desde un offset local corto sobre su propia superficie.
    s01AccumDocs.forEach((d, i) => {
      const u = easeOut(clamp01((t - d.reveal) / 240))
      const from = add3(d.p, d.from)
      const p = lerp3(from, d.p, u)
      p[1] += 0.012 * Math.sin(Math.PI * u)
      const r: Vec3 = [d.r[0], d.r[1] + 0.055 * (1 - u) * (i % 2 === 0 ? 1 : -1), d.r[2]]
      setPose(out, `accumDocs.${i}`, p, r, u > 0 ? 1 : 0)
    })
    this.sampleSmoke(s01Timings.fridgeFail.end + t, out)
  }

  /* ----------- beat 5: PHONE PORTAL exclusivamente ----------------- */

  private sampleScript5(t: number, out: Record<string, number>) {
    const T = s01Timings.enter5
    this.f100(4, out)
    out['blackout'] = 0
    this.sampleSmoke(s01Timings.fridgeFail.end + s01Timings.enter4.end + t, out)

    // WIDE→BLACK en un único perfil físico de 1450 ms. Dolly, reframe y
    // alineación ocurren simultáneamente; no existe staging intermedio.
    const wide = s01Anchors.A_WIDE
    const fin = s01PortalFinal(this.aspect)
    const setCam = (pos: Vec3, tgt: Vec3, up: Vec3) => {
      out['camPos.0'] = pos[0]
      out['camPos.1'] = pos[1]
      out['camPos.2'] = pos[2]
      out['camTarget.0'] = tgt[0]
      out['camTarget.1'] = tgt[1]
      out['camTarget.2'] = tgt[2]
      out['camUp.0'] = up[0]
      out['camUp.1'] = up[1]
      out['camUp.2'] = up[2]
    }
    const pu = clamp01((t - T.portal[0]) / (T.portal[1] - T.portal[0]))
    const ePos = easeInOut(pu)
    const pos: Vec3 = lerp3(wide.pos, fin.pos, ePos)
    // Reframe monótono al centro: wide.target → screen center con easeOut
    // (el target lidera a la posición: convergencia monótona verificada
    // analíticamente, sin overshoot ni retorno lateral).
    const uT = easeOut(pu)
    const tgt = lerp3(wide.target, fin.target, uT)
    // Align angular desde 15%: up wide→screen up gradual.
    const uU = smooth(clamp01((pu - 0.15) / 0.85))
    const up: Vec3 = [lerp(0, fin.up[0], uU), lerp(1, fin.up[1], uU), lerp(0, fin.up[2], uU)]
    setCam(pos, tgt, up)
  }

  /* ---------------- salida al frame de consumo ---------------- */

  private writeFrame() {
    const f = this.frame
    const p = this.params
    f.camPos[0] = p['camPos.0']
    f.camPos[1] = p['camPos.1']
    f.camPos[2] = p['camPos.2']
    f.camTarget[0] = p['camTarget.0']
    f.camTarget[1] = p['camTarget.1']
    f.camTarget[2] = p['camTarget.2']
    f.camUp[0] = p['camUp.0'] ?? 0
    f.camUp[1] = p['camUp.1'] ?? 1
    f.camUp[2] = p['camUp.2'] ?? 0
    f.blackout = p['blackout']
    f.pantry[0] = p['pantry.0']
    f.pantry[1] = p['pantry.1']
    f.pantry[2] = p['pantry.2']
    f.fTop = p['fTop']
    f.fBot = p['fBot']
    f.fLift = p['fLift']
    f.fRoll = p['fRoll']
    f.fShift = p['fShift']
    f.drawer = p['drawer']
    f.manualCover = p['manualCover'] ?? 0
    f.fridgeLight = p['fridgeLight'] ?? 0
    f.kitchenLight = p['kitchenLight'] ?? 1
    for (const k of ['apple', 'water', 'eggA', 'eggB'] as const) {
      f[k].p[0] = p[`${k}.p.0`]
      f[k].p[1] = p[`${k}.p.1`]
      f[k].p[2] = p[`${k}.p.2`]
      f[k].r[0] = p[`${k}.r.0`]
      f[k].r[1] = p[`${k}.r.1`]
      f[k].r[2] = p[`${k}.r.2`]
    }
    f.policy.p[0] = p['policy.p.0'] ?? 0
    f.policy.p[1] = p['policy.p.1'] ?? 0
    f.policy.p[2] = p['policy.p.2'] ?? 0
    f.policy.r[0] = p['policy.r.0'] ?? 0
    f.policy.r[1] = p['policy.r.1'] ?? 0
    f.policy.r[2] = p['policy.r.2'] ?? 0
    for (let i = 0; i < f.docs.length; i++) {
      const d = f.docs[i]
      d.p[0] = p[`docs.${i}.p.0`]
      d.p[1] = p[`docs.${i}.p.1`]
      d.p[2] = p[`docs.${i}.p.2`]
      d.r[0] = p[`docs.${i}.r.0`]
      d.r[1] = p[`docs.${i}.r.1`]
      d.r[2] = p[`docs.${i}.r.2`]
      d.v = p[`docs.${i}.v`]
    }
    for (let i = 0; i < f.accumDocs.length; i++) {
      const d = f.accumDocs[i]
      d.p[0] = p[`accumDocs.${i}.p.0`]
      d.p[1] = p[`accumDocs.${i}.p.1`]
      d.p[2] = p[`accumDocs.${i}.p.2`]
      d.r[0] = p[`accumDocs.${i}.r.0`]
      d.r[1] = p[`accumDocs.${i}.r.1`]
      d.r[2] = p[`accumDocs.${i}.r.2`]
      d.v = p[`accumDocs.${i}.v`]
    }
    for (let i = 0; i < f.loose.length; i++) {
      const l = f.loose[i]
      l.p[0] = p[`loose.${i}.p.0`]
      l.p[1] = p[`loose.${i}.p.1`]
      l.p[2] = p[`loose.${i}.p.2`]
      l.r[0] = p[`loose.${i}.r.0`]
      l.r[1] = p[`loose.${i}.r.1`]
      l.r[2] = p[`loose.${i}.r.2`]
    }
    for (let c = 0; c < 3; c++) {
      f.list.p[c] = p[`list.p.${c}`]
      f.list.r[c] = p[`list.r.${c}`]
    }
    for (let i = 0; i < f.smoke.length; i++) {
      const s = f.smoke[i]
      s.p[0] = p[`smoke.${i}.p.0`]
      s.p[1] = p[`smoke.${i}.p.1`]
      s.p[2] = p[`smoke.${i}.p.2`]
      s.s = p[`smoke.${i}.s`]
      s.o = p[`smoke.${i}.o`]
    }
    for (let i = 0; i < f.dishes.length; i++) {
      const d = f.dishes[i]
      d.p[0] = p[`dishes.${i}.p.0`]
      d.p[1] = p[`dishes.${i}.p.1`]
      d.p[2] = p[`dishes.${i}.p.2`]
      d.r[0] = p[`dishes.${i}.r.0`]
      d.r[1] = p[`dishes.${i}.r.1`]
      d.r[2] = p[`dishes.${i}.r.2`]
      d.v = p[`dishes.${i}.v`]
    }
  }
}

function setPose(params: Record<string, number>, key: string, p: Vec3, r: Vec3, v: number) {
  params[`${key}.p.0`] = p[0]
  params[`${key}.p.1`] = p[1]
  params[`${key}.p.2`] = p[2]
  params[`${key}.r.0`] = r[0]
  params[`${key}.r.1`] = r[1]
  params[`${key}.r.2`] = r[2]
  params[`${key}.v`] = v
}

const add3 = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
/** Bézier cúbica 3D determinista (sin linear lerp, sin physics). */
function cubic(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, u: number): Vec3 {
  const v = 1 - u
  const a = v * v * v
  const b = 3 * v * v * u
  const c = 3 * v * u * u
  const d = u * u * u
  return [
    a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
    a * p0[2] + b * p1[2] + c * p2[2] + d * p3[2],
  ]
}

/** Puerta con un solo rebound V5.1: parte de baseOpen (S01.2, 42°/0°),
 *  sube a peak (58°/22°), rebota a mid (46°/8°) y asienta en rest (50°/12°).
 *  Nunca vuelve a 0° al iniciar S01.3. */
function doorFailPhase(
  t: number,
  peak: [number, number],
  mid: [number, number],
  rest: [number, number],
  base: number,
  max: number,
  rebound: number,
  settled: number,
) {
  if (t < peak[0]) return base
  if (t < peak[1]) return lerp(base, max, easeOut(clamp01((t - peak[0]) / (peak[1] - peak[0]))))
  if (t < mid[1]) return lerp(max, rebound, easeInOut(clamp01((t - peak[1]) / Math.max(1, mid[1] - peak[1]))))
  if (t < rest[1]) return lerp(rebound, settled, easeInOut(clamp01((t - mid[1]) / Math.max(1, rest[1] - mid[1]))))
  return settled
}

/** Punto door-local (desde la bisagra inferior) → mundo, con ángulo θ.
 *  Misma matemática que el rig (hingeX/hingeZ + R_y). Sin saltos. */
function doorWorld(local: Vec3, theta: number): Vec3 {
  const F = s01Geo.fridge
  const c = Math.cos(theta)
  const s = Math.sin(theta)
  const x = local[0] * c + local[2] * s
  const z = -local[0] * s + local[2] * c
  return [F.group[0] + F.hingeX + x, F.group[1] + F.botCenterY + local[1], F.group[2] + F.hingeZ + z]
}

/** Luz interior: dos flickers breves y apagado definitivo. */
function fridgeLightAt(t: number): number {
  const T = s01Timings.fridgeFail
  if (t < T.innerFlickerA[0]) return 1
  if (t < T.innerFlickerA[1]) return t < (T.innerFlickerA[0] + T.innerFlickerA[1]) / 2 ? 0.12 : 0.88
  if (t < T.innerFlickerB[0]) return 1
  if (t < T.innerFlickerB[1]) return t < (T.innerFlickerB[0] + T.innerFlickerB[1]) / 2 ? 0.08 : 0.7
  if (t < T.innerOff) return lerp(0.7, 0, clamp01((t - T.innerFlickerB[1]) / (T.innerOff - T.innerFlickerB[1])))
  return 0
}

function kitchenLightAt(t: number): number {
  const keys = s01Timings.fridgeFail.kitchenLight
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1]
    const b = keys[i]
    if (t <= b[0]) return lerp(a[1], b[1], smooth(clamp01((t - a[0]) / (b[0] - a[0]))))
  }
  return 1
}

/** Manzana V5.1 §8: adosada a puerta hasta 760ms; arco corto, caída, un
 *  rebote bajo, rodadura con desaceleración hasta appleLand; HOLD. */
function appleAt(t: number, fBot: number): { p: Vec3; r: Vec3 } {
  const T = s01Timings.fridgeFail
  const t0 = T.foodApple[0]
  const t1 = T.foodApple[1]
  if (t < t0) return { p: doorWorld(s01Geo.fridgeFood.appleDoor, fBot), r: [0, 0.3, 0] }
  const u = clamp01((t - t0) / (t1 - t0))
  const F = s01Geo.fridge
  const releaseAngle = doorFailPhase(t0, T.botDoorPeak, T.botDoorMid, T.botDoorRest, F.botPre, F.botPeak, F.botRebound, F.botRest)
  const start = doorWorld(s01Geo.fridgeFood.appleDoor, releaseAngle)
  const end = s01Geo.fridgeFood.appleLand
  // Arco corto (0–0.35): desprende + vuela; caída (0.35–0.6); rebote bajo
  // único (0.6–0.72); rodadura con desaceleración (0.72–1).
  const arcH = 0.22
  let p: Vec3
  if (u < 0.35) {
    const k = easeOut(u / 0.35)
    p = lerp3(start, [(start[0] + end[0]) / 2, Math.max(start[1], end[1]) + arcH, (start[2] + end[2]) / 2], k)
  } else if (u < 0.6) {
    const k = easeInOut((u - 0.35) / 0.25)
    const mid: Vec3 = [(start[0] + end[0]) / 2, Math.max(start[1], end[1]) + arcH, (start[2] + end[2]) / 2]
    p = lerp3(mid, [end[0], end[1] + 0.09, end[2]], k)
    p[1] -= 0.09 * k * k
  } else if (u < 0.72) {
    const k = Math.sin(((u - 0.6) / 0.12) * Math.PI)
    p = [end[0], end[1] + 0.055 * k, end[2]]
  } else {
    const k = easeOut((u - 0.72) / 0.28)
    p = [lerp(end[0] + 0.14, end[0], k), end[1], lerp(end[2] - 0.1, end[2], k)]
  }
  const r: Vec3 = [lerp(0, 0.4, u), lerp(0.3, 0.6 + u * 3.2, u), lerp(0, 1.2, u)]
  return { p, r }
}

/** Botella V5.1 §8: permanece sobre el estante; oscila, pierde equilibrio,
 *  se vuelca, toca estante y lateral, queda acostada. Nunca vuela. */
function waterAt(t: number): { p: Vec3; r: Vec3 } {
  const T = s01Timings.fridgeFail
  const t0 = T.foodWater[0]
  const t1 = T.foodWater[1]
  const home = s01Geo.fridgeFood.waterHome
  const land = s01Geo.fridgeFood.waterLand
  if (t < t0) return { p: [...home] as Vec3, r: [0, 0, 0] }
  const u = clamp01((t - t0) / (t1 - t0))
  // 0–0.3 oscilación; 0.3–0.6 vuelco; 0.6+ acostada con micro-asentamiento.
  let tilt: number
  if (u < 0.3) tilt = Math.sin((u / 0.3) * Math.PI * 2) * 0.12 * (u / 0.3)
  else if (u < 0.6) tilt = lerp(0.12, Math.PI / 2, easeInOut((u - 0.3) / 0.3))
  else tilt = Math.PI / 2 - 0.06 * Math.sin(((u - 0.6) / 0.4) * Math.PI)
  const p: Vec3 = [lerp(home[0], land[0], easeInOut(u)), lerp(home[1], land[1], easeInOut(Math.min(1, u * 1.2))), lerp(home[2], land[2], easeInOut(u))]
  return { p, r: [0, 0, tilt] }
}

/** Huevo B V5.1 §8: supera el borde, cae, contacta el suelo, queda de costado.
 *  Sin fisura exagerada, sin yema ni partículas. Huevo A: sólo balanceo. */
function eggAt(t: number, fBot: number, which: 'A' | 'B'): { p: Vec3; r: Vec3 } {
  const T = s01Timings.fridgeFail
  const range = which === 'A' ? T.foodEggA : T.foodEggB
  const t0 = range[0]
  const t1 = range[1]
  const local = which === 'A' ? s01Geo.fridgeFood.eggADoor : s01Geo.fridgeFood.eggBDoor
  if (which === 'A') {
    // Balanceo leve, permanece en bandeja (sigue a la puerta final).
    const p = doorWorld(local, fBot)
    const wob = t < t0 ? 0 : Math.sin(clamp01((t - t0) / (t1 - t0)) * Math.PI * 3) * 0.05 * (1 - clamp01((t - t0) / (t1 - t0)))
    return { p: [p[0], p[1] + Math.abs(wob) * 0.3, p[2]], r: [wob, 0, wob * 0.6] }
  }
  if (t < t0) return { p: doorWorld(local, fBot), r: [0, 0, 0] }
  const u = clamp01((t - t0) / ((t1 - t0) * 0.85))
  const start = doorWorld(local, s01Geo.fridge.botPre)
  const end = s01Geo.fridgeFood.eggBLand
  let p: Vec3
  if (u < 0.45) {
    const k = easeInOut(u / 0.45)
    p = lerp3(start, [(start[0] + end[0]) / 2, start[1] - 0.1, (start[2] + end[2]) / 2], k)
  } else if (u < 0.75) {
    const k = (u - 0.45) / 0.3
    p = [lerp((start[0] + end[0]) / 2, end[0], k), lerp(start[1] - 0.1, end[1] + 0.05, k * k), lerp((start[2] + end[2]) / 2, end[2], k)]
  } else {
    p = [end[0], end[1], end[2]]
  }
  return { p, r: [0, lerp(0, 0.4, u), lerp(0, Math.PI / 2, easeOut(Math.min(1, u * 1.1)))] }
}

/** Puerta con un solo rebound: 0 → peak → mid → rest. */
function door3Phase(
  t: number,
  peak: [number, number],
  mid: [number, number],
  rest: [number, number],
  max: number,
  rebound: number,
  settled: number,
) {
  if (t < peak[0]) return 0
  if (t < peak[1]) return lerp(0, max, easeOut(clamp01((t - peak[0]) / (peak[1] - peak[0]))))
  if (t < mid[1]) return lerp(max, rebound, easeInOut(clamp01((t - peak[1]) / Math.max(1, mid[1] - peak[1]))))
  if (t < rest[1]) return lerp(rebound, settled, easeInOut(clamp01((t - mid[1]) / Math.max(1, rest[1] - mid[1]))))
  return settled
}

/** Drawer prismático en fracciones del recorrido (§41). */
function drawer3Phase(t: number, a: [number, number], b: [number, number], c: [number, number], travel: number) {
  if (t < a[0]) return 0
  if (t < a[1]) return travel * 0.12 * easeOut(clamp01((t - a[0]) / (a[1] - a[0])))
  if (t < b[1]) return travel * lerp(0.12, 0.86, easeInOut(clamp01((t - a[1]) / Math.max(1, b[1] - a[1]))))
  if (t < c[1]) return travel * lerp(0.86, 1, easeInOut(clamp01((t - b[1]) / Math.max(1, c[1] - b[1]))))
  return travel
}

/** Tapa del manual: contacto sobre canto → 62° → 49° → settle 57°. */
function manualCoverAt(t: number, land: number) {
  const c3 = 3 * DEG
  if (t < land) return c3
  if (t < land + 35) return lerp(c3, 62 * DEG, easeOut((t - land) / 35))
  if (t < land + 75) return lerp(62 * DEG, 49 * DEG, easeInOut((t - land - 35) / 40))
  if (t < land + 105) return lerp(49 * DEG, 57 * DEG, easeInOut((t - land - 75) / 30))
  return 57 * DEG
}

/** Cuerpo de heladera V5.2: vibración contenida → golpe → rebote → base. */
function fridgeBody(t: number) {
  const T = s01Timings.fridgeFail
  if (t >= T.vibrate[0] && t < T.vibrate[1]) {
    const u = (t - T.vibrate[0]) / (T.vibrate[1] - T.vibrate[0])
    const fade = Math.sin(Math.PI * u)
    return {
      lift: 0.004 * fade,
      roll: 0.42 * DEG * Math.sin(u * Math.PI * 4) * fade,
      shift: 0.012 * Math.sin(u * Math.PI * 5) * fade,
    }
  }
  if (t >= T.strike[0] && t < T.strike[1]) {
    const u = easeOut((t - T.strike[0]) / (T.strike[1] - T.strike[0]))
    return { lift: 0.018 * u, roll: 2.2 * DEG * u, shift: 0.022 * u }
  }
  if (t >= T.rebound[0] && t < T.rebound[1]) {
    const u = easeInOut((t - T.rebound[0]) / (T.rebound[1] - T.rebound[0]))
    return {
      lift: lerp(0.018, 0.004, u),
      roll: lerp(2.2 * DEG, -0.38 * DEG, u),
      shift: lerp(0.022, -0.008, u),
    }
  }
  if (t >= T.recover[0] && t < T.recover[1]) {
    const u = easeInOut((t - T.recover[0]) / (T.recover[1] - T.recover[0]))
    return {
      lift: lerp(0.004, 0, u),
      roll: lerp(-0.32 * DEG, 0, u),
      shift: lerp(-0.009, 0, u),
    }
  }
  return { lift: 0, roll: 0, shift: 0 }
}

/** Triedro del screen para QA (upside-down guarantee §77). */
export function s01ScreenUpCheck() {
  const f = s01ScreenFrame()
  return { up: f.up, topIsBack: f.up[2] < -0.9 }
}

/** Singleton del módulo: una sola autoridad de estado para toda la escena. */
export const s01Director = new S01Director()
