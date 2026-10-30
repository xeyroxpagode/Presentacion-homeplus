export type S01QualityName = 'cinematic' | 'balanced' | 'safe'

export type S01QualityProfile = {
  name: S01QualityName
  dpr: [number, number]
  shadowMap: number
  msaaSamples: number
  ao: boolean
  aoScale: number
  aoSamples: number
  dof: boolean
  dofMaxBlur: number
  motionBlur: boolean
  bloom: boolean
  bloomStrength: number
  atmosphere: boolean
  dustCount: number
  exposure: number
}

export const s01QualityProfiles: Record<S01QualityName, S01QualityProfile> = {
  cinematic: {
    name: 'cinematic',
    dpr: [1, 1.5],
    shadowMap: 2048,
    msaaSamples: 4,
    ao: true,
    aoScale: 0.72,
    aoSamples: 16,
    dof: true,
    dofMaxBlur: 0.0026,
    motionBlur: true,
    bloom: true,
    bloomStrength: 0.06,
    atmosphere: true,
    dustCount: 34,
    exposure: 0.74,
  },
  balanced: {
    name: 'balanced',
    dpr: [1, 1.25],
    shadowMap: 1024,
    msaaSamples: 2,
    ao: true,
    aoScale: 0.5,
    aoSamples: 8,
    dof: true,
    dofMaxBlur: 0.0018,
    motionBlur: true,
    bloom: true,
    bloomStrength: 0.04,
    atmosphere: true,
    dustCount: 18,
    exposure: 0.8,
  },
  safe: {
    name: 'safe',
    dpr: [1, 1],
    shadowMap: 512,
    msaaSamples: 0,
    ao: false,
    aoScale: 0,
    aoSamples: 0,
    dof: false,
    dofMaxBlur: 0,
    motionBlur: false,
    bloom: false,
    bloomStrength: 0,
    atmosphere: false,
    dustCount: 0,
    exposure: 0.82,
  },
}

export function getS01QualityProfile(): S01QualityProfile {
  if (typeof window === 'undefined') return s01QualityProfiles.balanced
  const requested = new URLSearchParams(window.location.search).get('s01Quality') as S01QualityName | null
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced && requested !== 'cinematic') return s01QualityProfiles.safe
  return s01QualityProfiles[requested ?? 'cinematic'] ?? s01QualityProfiles.cinematic
}

