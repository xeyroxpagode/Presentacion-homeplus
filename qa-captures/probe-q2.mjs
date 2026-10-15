async function main () {
  const qs = ['?t=1792067625117', '?t=1792067625117.0', '?t=abc', '?t=a.b', '?v=1d4739ed', '?t=1792067637425&v=1d4739ed', '?t=999&v=x']
  for (const q of qs) {
    const r = await fetch('http://localhost:8443/src/presentation/slides/S01Chaos/three/S01Camera.tsx' + q)
    console.log(JSON.stringify(q), '->', r.status)
  }
}
main().catch((e) => { console.error('FATAL', e.message); process.exit(1) })
