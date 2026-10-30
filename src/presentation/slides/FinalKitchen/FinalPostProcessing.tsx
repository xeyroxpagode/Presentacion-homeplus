import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js'
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import type { FinalBeatId } from './finalTimings'
import { getFinalQualityProfile } from './finalQuality'
import { A_WIDE, BACKPACK, FRIDGE_SERVICE, PAPER_STACK } from './finalGeometry'

const motionBlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    direction: { value: new THREE.Vector2() },
    amount: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform vec2 direction;
    uniform float amount;
    varying vec2 vUv;
    void main() {
      vec2 d = direction * amount;
      vec4 c = texture2D(tDiffuse, vUv) * 0.46;
      c += texture2D(tDiffuse, vUv + d) * 0.20;
      c += texture2D(tDiffuse, vUv - d) * 0.20;
      c += texture2D(tDiffuse, vUv + d * 2.0) * 0.07;
      c += texture2D(tDiffuse, vUv - d * 2.0) * 0.07;
      gl_FragColor = c;
    }
  `,
}

const gradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    vignette: { value: 0.08 },
    grain: { value: 0.0025 },
    seed: { value: 0.37 },
  },
  vertexShader: motionBlurShader.vertexShader,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float vignette;
    uniform float grain;
    uniform float seed;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7)) + seed * 17.0) * 43758.5453); }
    void main() {
      vec4 src = texture2D(tDiffuse, vUv);
      float luma = dot(src.rgb, vec3(0.2126, 0.7152, 0.0722));
      vec3 color = src.rgb;
      color += vec3(-0.006, 0.001, 0.014) * (1.0 - smoothstep(0.2, 0.7, luma));
      color += vec3(0.01, 0.004, -0.004) * smoothstep(0.55, 0.95, luma);
      float edge = 1.0 - smoothstep(0.28, 0.76, length(vUv - 0.5));
      color *= mix(1.0 - vignette, 1.0, edge);
      color += (hash(gl_FragCoord.xy) - 0.5) * grain;
      gl_FragColor = vec4(color, src.a);
    }
  `,
}

const FOCUS: Record<FinalBeatId, [number, number, number]> = {
  W00: [0.1, 0.92, -0.02],
  W01: [...A_WIDE.target],
  W02: [...A_WIDE.target],
  W03: [...A_WIDE.target],
  W04: [BACKPACK.root[0], 0.24, BACKPACK.root[2]],
  W05: [PAPER_STACK.anchor[0], PAPER_STACK.topY, PAPER_STACK.anchor[2]],
  W06: [...FRIDGE_SERVICE.screw],
  W07: [...A_WIDE.target],
  W08: [...A_WIDE.target],
  W09: [...A_WIDE.target],
  W14: [...A_WIDE.target],
}

export default function FinalPostProcessing({ beat }: { beat: FinalBeatId }) {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera
  const size = useThree((state) => state.size)
  const profile = useMemo(getFinalQualityProfile, [])
  const previousPosition = useRef(camera.position.clone())
  const previousBeat = useRef(beat)
  const deltaPosition = useMemo(() => new THREE.Vector3(), [])
  const inverseRotation = useMemo(() => new THREE.Quaternion(), [])
  const localVelocity = useMemo(() => new THREE.Vector3(), [])
  const focusPoint = useMemo(() => new THREE.Vector3(), [])
  const stats = useRef({ total: 0, count: 0, max: 0 })

  const pipeline = useMemo(() => {
    const target = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.HalfFloatType,
      samples: profile.msaaSamples,
      depthBuffer: true,
    })
    const composer = new EffectComposer(gl, target)
    const render = new RenderPass(scene, camera)
    const gtao = new GTAOPass(scene, camera, 1, 1)
    gtao.updateGtaoMaterial({ radius: 0.1, distanceExponent: 1.6, thickness: 0.08, distanceFallOff: 0.22, scale: 1, samples: profile.aoSamples, screenSpaceRadius: false })
    gtao.updatePdMaterial({ radius: 5, rings: 2, samples: profile.aoSamples, lumaPhi: 8, depthPhi: 2, normalPhi: 3 })
    gtao.blendIntensity = 0.46
    const bokeh = new BokehPass(scene, camera, { focus: 2, aperture: 0.000055, maxblur: profile.dofMaxBlur * 0.72 })
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), profile.bloomStrength * 0.8, 0.08, 1.7)
    const motion = new ShaderPass(motionBlurShader)
    const grade = new ShaderPass(gradeShader)
    const output = new OutputPass()
    composer.addPass(render)
    composer.addPass(gtao)
    composer.addPass(bokeh)
    composer.addPass(bloom)
    composer.addPass(motion)
    composer.addPass(grade)
    composer.addPass(output)
    return { composer, gtao, bokeh, bloom, motion, grade }
  }, [camera, gl, profile, scene])

  useEffect(() => {
    pipeline.composer.setSize(size.width, size.height)
    pipeline.gtao.setSize(
      Math.max(1, Math.round(size.width * profile.aoScale)),
      Math.max(1, Math.round(size.height * profile.aoScale)),
    )
  }, [pipeline, profile.aoScale, size.height, size.width])

  useEffect(() => {
    const debug = { profile: profile.name, averageRenderMs: 0, maxRenderMs: 0, frameCount: 0 }
    ;(window as unknown as Record<string, unknown>).__finalPost = debug
    return () => {
      pipeline.composer.dispose()
      pipeline.gtao.dispose()
      pipeline.bokeh.dispose()
      pipeline.bloom.dispose()
      pipeline.motion.dispose()
      pipeline.grade.dispose()
      delete (window as unknown as Record<string, unknown>).__finalPost
    }
  }, [pipeline, profile.name])

  useFrame((_, delta) => {
    pipeline.gtao.enabled = profile.ao && beat !== 'W14'
    pipeline.bokeh.enabled = profile.dof && !['W02', 'W03', 'W07', 'W08', 'W09', 'W14'].includes(beat)
    focusPoint.set(...FOCUS[beat])
    const uniforms = pipeline.bokeh.uniforms as Record<string, THREE.IUniform>
    uniforms.focus.value = camera.position.distanceTo(focusPoint)
    uniforms.aperture.value = beat === 'W05' ? 0.000045 : 0.000055
    uniforms.maxblur.value = beat === 'W05' ? profile.dofMaxBlur * 0.48 : profile.dofMaxBlur * 0.66
    pipeline.bloom.enabled = profile.bloom && beat !== 'W09' && beat !== 'W14'
    pipeline.bloom.strength = profile.bloomStrength * 0.8

    deltaPosition.copy(camera.position).sub(previousPosition.current)
    const cut = previousBeat.current !== beat || deltaPosition.length() > 0.55
    inverseRotation.copy(camera.quaternion).invert()
    localVelocity.copy(deltaPosition).applyQuaternion(inverseRotation)
    const speed = delta > 0 ? deltaPosition.length() / delta : 0
    const directionLength = Math.hypot(localVelocity.x, localVelocity.y)
    if (directionLength > 1e-6) pipeline.motion.uniforms.direction.value.set(-localVelocity.x / directionLength, localVelocity.y / directionLength)
    const cap = beat === 'W01' ? 0.0016 : beat === 'W05' ? 0.0003 : 0.00072
    const amount = cut || beat === 'W09' || beat === 'W14' ? 0 : Math.min(cap, speed * 0.00036)
    pipeline.motion.uniforms.amount.value = amount
    pipeline.motion.enabled = profile.motionBlur && amount > 0.00002
    previousPosition.current.copy(camera.position)
    previousBeat.current = beat

    pipeline.grade.uniforms.vignette.value = beat === 'W09' || beat === 'W14' ? 0 : 0.075
    pipeline.grade.uniforms.grain.value = profile.name === 'safe' ? 0 : 0.0024
    pipeline.grade.uniforms.seed.value = 0.31 + delta * 0.01
    const start = performance.now()
    pipeline.composer.render(delta)
    const elapsed = performance.now() - start
    stats.current.total += elapsed
    stats.current.count += 1
    stats.current.max = Math.max(stats.current.max, elapsed)
    const debug = (window as unknown as Record<string, { averageRenderMs: number; maxRenderMs: number; frameCount: number }>).__finalPost
    if (debug) {
      debug.averageRenderMs = stats.current.total / stats.current.count
      debug.maxRenderMs = stats.current.max
      debug.frameCount = stats.current.count
    }
  }, 1)

  return null
}
