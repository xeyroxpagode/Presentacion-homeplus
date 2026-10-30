import { s01QualityProfiles, type S01QualityName, type S01QualityProfile } from '../S01Chaos/three/s01Quality'

export function getFinalQualityProfile(): S01QualityProfile {
  if (typeof window === 'undefined') return s01QualityProfiles.balanced
  const params = new URLSearchParams(window.location.search)
  const requested = (params.get('finalQuality') ?? params.get('s01Quality')) as S01QualityName | null
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced && requested !== 'cinematic') return s01QualityProfiles.safe
  return s01QualityProfiles[requested ?? 'cinematic'] ?? s01QualityProfiles.cinematic
}
