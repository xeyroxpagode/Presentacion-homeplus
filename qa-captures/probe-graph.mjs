async function main () {
  const mods = [
    'src/presentation/slides/S01Chaos/three/S01Camera.tsx',
    'src/presentation/slides/S01Chaos/three/S01Lighting.tsx',
    'src/presentation/slides/S01Chaos/three/S01World.tsx',
    'src/presentation/slides/S01Chaos/three/S01CinematicProps.tsx',
    'src/presentation/slides/S01Chaos/three/s01Director.ts',
    'src/presentation/slides/S01Chaos/three/s01CinematicConfig.ts',
    'src/presentation/slides/S01Chaos/three/s01Portal.ts',
    'src/presentation/slides/S01Chaos/three/s01ThreeConfig.ts',
  ]
  for (const m of mods) {
    const r = await fetch('http://localhost:8443/' + m + '?t=' + Date.now() + Math.random())
    const t = await r.text()
    console.log(m, '->', r.status, r.status === 200 ? 'ok' : t.slice(0, 1200))
  }
}
main().catch((e) => { console.error('FATAL', e.message); process.exit(1) })
