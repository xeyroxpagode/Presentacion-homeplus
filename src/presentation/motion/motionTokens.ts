export const motionTokens = {
  easing: 'cubic-bezier(.2,.8,.2,1)',
  durations: { fast: 220, standard: 320, emphasis: 420, spatial: 500 },
  enterDistance: 12,
} as const

export const motionPrimitives = {
  ENTER: { className: 'motion-enter', duration: motionTokens.durations.standard, purpose: 'Introduce attention.' },
  EXIT: { className: 'motion-exit', duration: motionTokens.durations.fast, purpose: 'Release attention.' },
  REPLACE: { className: 'motion-replace', duration: motionTokens.durations.standard, purpose: 'Exchange one element for another in the same place.' },
  ACCUMULATE: { className: 'motion-accumulate', duration: motionTokens.durations.standard, purpose: 'Introduce an element while retaining existing context.' },
  REFRAME: { className: 'motion-reframe', duration: motionTokens.durations.emphasis, purpose: 'Change framing through a scene-controlled transform.' },
  SPATIAL_WIPE: { className: 'motion-spatial-wipe', duration: motionTokens.durations.spatial, purpose: 'Reveal a new spatial territory.' },
  BLACKOUT: { className: 'motion-blackout', duration: motionTokens.durations.fast, purpose: 'Clear the stage for a spoken pause.' },
} as const

export type MotionPrimitive = keyof typeof motionPrimitives

export const motionVariables: Record<string, string> = {
  '--motion-easing': motionTokens.easing,
  '--motion-enter-distance': `${motionTokens.enterDistance}px`,
  ...Object.fromEntries(Object.entries(motionPrimitives).map(([name, primitive]) => [
    `--motion-${name.toLowerCase().replace(/_/g, '-')}-duration`,
    `${primitive.duration}ms`,
  ])),
}
