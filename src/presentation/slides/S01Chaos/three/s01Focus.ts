import type { S01QualityProfile } from './s01Quality'
import { s01Geo, s01Timings, type Vec3 } from './s01CinematicConfig'

export type S01FocusName = 'policy' | 'pantry' | 'fridgeInterior' | 'fridgeBody' | 'documents' | 'wide' | 'phone'

export const s01FocusAnchors: Record<S01FocusName, Vec3> = {
  policy: [-0.05, 0.925, -0.38],
  pantry: [-1.0, 1.95, -2.76],
  fridgeInterior: [s01Geo.fridge.group[0], 0.95, -2.08],
  fridgeBody: [s01Geo.fridge.group[0], 0.92, -2.4],
  documents: [0.04, 0.93, -0.36],
  wide: [0.15, 0.82, -0.9],
  phone: [s01Geo.phone.group[0], s01Geo.phone.screenY, s01Geo.phone.group[2]],
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const u = clamp01(value)
  return u * u * (3 - 2 * u)
}
const mix3 = (a: Vec3, b: Vec3, u: number): Vec3 => [
  a[0] + (b[0] - a[0]) * u,
  a[1] + (b[1] - a[1]) * u,
  a[2] + (b[2] - a[2]) * u,
]

export function sampleS01Focus(step: number, elapsed: number, profile: S01QualityProfile): { point: Vec3; aperture: number; maxBlur: number } {
  if (!profile.dof) return { point: s01FocusAnchors.wide, aperture: 0, maxBlur: 0 }
  if (step <= 1) return { point: s01FocusAnchors.policy, aperture: 0.00008, maxBlur: profile.dofMaxBlur }
  if (step === 2) {
    const u = smooth((elapsed - 1180) / 320)
    return { point: mix3(s01FocusAnchors.pantry, s01FocusAnchors.fridgeInterior, u), aperture: 0.00007, maxBlur: profile.dofMaxBlur * 0.86 }
  }
  if (step === 3) {
    const u = smooth((elapsed - s01Timings.fridgeFail.docReframe[0]) / 300)
    return {
      point: mix3(s01FocusAnchors.fridgeBody, s01FocusAnchors.documents, u),
      aperture: elapsed < 1650 ? 0.00004 : 0.000065,
      maxBlur: profile.dofMaxBlur * (elapsed < 1650 ? 0.48 : 0.78),
    }
  }
  if (step === 4) return { point: s01FocusAnchors.wide, aperture: 0.000025, maxBlur: profile.dofMaxBlur * 0.22 }
  const portalU = smooth((elapsed - 420) / 420)
  return {
    point: mix3(s01FocusAnchors.wide, s01FocusAnchors.phone, portalU),
    aperture: 0.00004 * (1 - smooth((elapsed - 720) / 220)),
    maxBlur: profile.dofMaxBlur * 0.35 * (1 - smooth((elapsed - 720) / 220)),
  }
}

