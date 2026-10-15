async function main () {
  const r = await fetch('http://localhost:8443/src/presentation/slides/S01Chaos/three/S01Canvas.tsx?t=999')
  console.log('status', r.status)
  console.log((await r.text()).slice(0, 3000))
}
main().catch((e) => { console.error('FATAL', e.message); process.exit(1) })
