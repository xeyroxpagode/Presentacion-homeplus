async function main () {
  const mods = [
    'src/presentation/slides/S01Chaos/three/S01Canvas.tsx',
    'src/presentation/slides/S01Chaos/three/S01CinematicProps.tsx',
    'src/presentation/slides/S01Chaos/three/S01Camera.tsx',
    'src/presentation/slides/S01Chaos/three/s01Director.ts',
    'src/presentation/slides/S01Chaos/three/s01CinematicConfig.ts',
    'src/presentation/slides/S01Chaos/three/s01Portal.ts',
  ]
  for (const m of mods) {
    const r = await fetch('http://localhost:8443/' + m)
    const t = await r.text()
    console.log('=== ' + m + ' -> ' + r.status)
    if (r.status !== 200) console.log(t.slice(0, 1500))
  }
}
main().catch((e) => { console.error('FATAL', e.message); process.exit(1) })
