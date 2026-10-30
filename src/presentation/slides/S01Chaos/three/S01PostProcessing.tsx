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
import { s01Director } from './s01Director'
import { sampleS01Focus } from './s01Focus'
import { getS01QualityProfile } from './s01Quality'

const motionBlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    direction: { value: new THREE.Vector2() },
    amount: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform vec2 direction;
    uniform float amount;
    varying vec2 vUv;
    void main() {
      vec2 stepUv = direction * amount;
      vec4 color = texture2D(tDiffuse, vUv) * 0.28;
      color += texture2D(tDiffuse, vUv + stepUv * 1.0) * 0.18;
      color += texture2D(tDiffuse, vUv - stepUv * 1.0) * 0.18;
      color += texture2D(tDiffuse, vUv + stepUv * 2.0) * 0.12;
      color += texture2D(tDiffuse, vUv - stepUv * 2.0) * 0.12;
      color += texture2D(tDiffuse, vUv + stepUv * 3.0) * 0.06;
      color += texture2D(tDiffuse, vUv - stepUv * 3.0) * 0.06;
      gl_FragColor = color;
    }
  `,
}

const gradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    strength: { value: 1 },
    vignette: { value: 0.12 },
    grain: { value: 0.0035 },
    seed: { value: 0.37 },
  },
  vertexShader: motionBlurShader.vertexShader,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float strength;
    uniform float vignette;
    uniform float grain;
    uniform float seed;
    varying vec2 vUv;
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7)) + seed * 19.19) * 43758.5453123);
    }
    void main() {
      vec4 source = texture2D(tDiffuse, vUv);
      float luma = dot(source.rgb, vec3(0.2126, 0.7152, 0.0722));
      vec3 graded = source.rgb;
      graded += vec3(-0.006, 0.0, 0.014) * (1.0 - smoothstep(0.18, 0.7, luma));
      graded += vec3(0.008, 0.002, -0.004) * smoothstep(0.55, 0.95, luma);
      float gray = dot(graded, vec3(0.299, 0.587, 0.114));
      graded = mix(vec3(gray), graded, 0.96);
      float edge = 1.0 - smoothstep(0.28, 0.78, length(vUv - 0.5));
      graded *= mix(1.0 - vignette, 1.0, edge);
      graded += (hash(gl_FragCoord.xy) - 0.5) * grain;
      gl_FragColor = vec4(mix(source.rgb, graded, strength), source.a);
    }
  `,
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const u = clamp01(value)
  return u * u * (3 - 2 * u)
}

export default function S01PostProcessing() {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera
  const size = useThree((state) => state.size)
  const profile = useMemo(getS01QualityProfile, [])
  const previousPosition = useRef(camera.position.clone())
  const deltaPosition = useMemo(() => new THREE.Vector3(), [])
  const inverseRotation = useMemo(() => new THREE.Quaternion(), [])
  const localVelocity = useMemo(() => new THREE.Vector3(), [])
  const focusPoint = useMemo(() => new THREE.Vector3(), [])
  const renderStats = useRef({ totalMs: 0, frameCount: 0, maxRenderMs: 0 })

  const pipeline = useMemo(() => {
    const target = new THREE.WebGLRenderTarget(size.width, size.height, {
      type: THREE.HalfFloatType,
      samples: profile.msaaSamples,
      depthBuffer: true,
    })
    const composer = new EffectComposer(gl, target)
    const render = new RenderPass(scene, camera)
    const gtao = new GTAOPass(
      scene,
      camera,
      Math.max(1, Math.round(size.width * profile.aoScale)),
      Math.max(1, Math.round(size.height * profile.aoScale)),
    )
    gtao.updateGtaoMaterial({ radius: 0.11, distanceExponent: 1.6, thickness: 0.08, distanceFallOff: 0.22, scale: 1, samples: profile.aoSamples, screenSpaceRadius: false })
    gtao.updatePdMaterial({ radius: 6, rings: 2, samples: profile.aoSamples, lumaPhi: 8, depthPhi: 2, normalPhi: 3 })
    gtao.blendIntensity = 0.52
    const bokeh = new BokehPass(scene, camera, { focus: 2, aperture: 0.00012, maxblur: profile.dofMaxBlur })
    const bloom = new UnrealBloomPass(new THREE.Vector2(size.width, size.height), profile.bloomStrength, 0.08, 1.65)
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
    gtao.enabled = profile.ao
    bokeh.enabled = profile.dof
    bloom.enabled = profile.bloom
    motion.enabled = profile.motionBlur
    return { composer, target, gtao, bokeh, bloom, motion, grade }
  }, [camera, gl, profile, scene])

  useEffect(() => {
    pipeline.composer.setSize(size.width, size.height)
    pipeline.gtao.setSize(
      Math.max(1, Math.round(size.width * profile.aoScale)),
      Math.max(1, Math.round(size.height * profile.aoScale)),
    )
  }, [pipeline, profile.aoScale, size.height, size.width])

  useEffect(() => {
    const debug = {
      profile: profile.name,
      lastRenderMs: 0,
      averageRenderMs: 0,
      maxRenderMs: 0,
      frameCount: 0,
      render: () => pipeline.composer.render(0),
      composer: pipeline.composer,
    }
    if (typeof window !== 'undefined') (window as unknown as Record<string, unknown>).__s01Post = debug
    return () => {
      pipeline.composer.dispose()
      pipeline.gtao.dispose()
      pipeline.bokeh.dispose()
      pipeline.bloom.dispose()
      pipeline.motion.dispose()
      pipeline.grade.dispose()
      if (typeof window !== 'undefined') delete (window as unknown as Record<string, unknown>).__s01Post
    }
  }, [pipeline, profile.name])

  useFrame((_, delta) => {
    const frame = s01Director.frame
    const focus = sampleS01Focus(s01Director.step, s01Director.elapsed, profile)
    const portalFade = s01Director.step === 5 ? 1 - smooth((s01Director.elapsed - 650) / 280) : 1
    const directPortal = s01Director.step === 5 && s01Director.elapsed >= 920
    const directRender = profile.name === 'safe' || directPortal

    pipeline.gtao.enabled = profile.ao && portalFade > 0.02
    pipeline.bokeh.enabled = profile.dof && focus.maxBlur > 0.00001 && portalFade > 0.02
    focusPoint.set(focus.point[0], focus.point[1], focus.point[2])
    const bokehUniforms = pipeline.bokeh.uniforms as Record<string, THREE.IUniform>
    bokehUniforms.focus.value = camera.position.distanceTo(focusPoint)
    bokehUniforms.aperture.value = focus.aperture * portalFade
    bokehUniforms.maxblur.value = focus.maxBlur * portalFade
    pipeline.bloom.enabled = profile.bloom && portalFade > 0.02
    pipeline.bloom.strength = profile.bloomStrength * portalFade

    deltaPosition.copy(camera.position).sub(previousPosition.current)
    inverseRotation.copy(camera.quaternion).invert()
    localVelocity.copy(deltaPosition).applyQuaternion(inverseRotation)
    const spatialSpeed = delta > 0 ? deltaPosition.length() / delta : 0
    const maxTrailUv = s01Director.step === 5 ? 0.002 : 0.00085
    const cutDetected = deltaPosition.length() > 0.45
    const blurAmount = cutDetected ? 0 : Math.min(maxTrailUv, spatialSpeed * 0.00045) * portalFade
    const directionLength = Math.hypot(localVelocity.x, localVelocity.y)
    if (directionLength > 1e-6) pipeline.motion.uniforms.direction.value.set(-localVelocity.x / directionLength, localVelocity.y / directionLength)
    pipeline.motion.uniforms.amount.value = blurAmount
    pipeline.motion.enabled = profile.motionBlur && blurAmount > 0.00002
    previousPosition.current.copy(camera.position)

    pipeline.grade.uniforms.strength.value = portalFade
    pipeline.grade.uniforms.vignette.value = 0.1 * portalFade
    pipeline.grade.uniforms.grain.value = 0.0032 * portalFade
    pipeline.grade.uniforms.seed.value = 0.31 + s01Director.step * 0.137

    const start = performance.now()
    if (directRender) gl.render(scene, camera)
    else pipeline.composer.render(delta)
    const elapsed = performance.now() - start
    renderStats.current.totalMs += elapsed
    renderStats.current.frameCount += 1
    renderStats.current.maxRenderMs = Math.max(renderStats.current.maxRenderMs, elapsed)
    if (typeof window !== 'undefined') {
      const debug = (window as unknown as Record<string, {
        lastRenderMs?: number
        averageRenderMs?: number
        maxRenderMs?: number
        frameCount?: number
        render?: () => void
      }>).__s01Post
      if (debug) {
        debug.lastRenderMs = elapsed
        debug.averageRenderMs = renderStats.current.totalMs / renderStats.current.frameCount
        debug.maxRenderMs = renderStats.current.maxRenderMs
        debug.frameCount = renderStats.current.frameCount
        debug.render = () => {
          if (profile.name === 'safe' || (s01Director.step === 5 && s01Director.elapsed >= 920)) gl.render(scene, camera)
          else pipeline.composer.render(0)
        }
      }
    }
  }, 1)

  return null
}

