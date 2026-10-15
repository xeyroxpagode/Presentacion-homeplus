async function main () {
  const urls = [
    'src/presentation/slides/S01Chaos/three/S01Camera.tsx?t=999',
    'src/presentation/slides/S01Chaos/three/S01Camera.tsx?t=1.5',
    'src/presentation/slides/S01Chaos/three/S01Camera.tsx',
  ]
  for (const u of urls) {
    const r = await fetch('http://localhost:8443/' + u)
    console.log(u.split('Camera.tsx')[1] || '(none)', '->', r.status)
  }
}
main().catch((e) => { console.error('FATAL', e.message); process.exit(1) })
