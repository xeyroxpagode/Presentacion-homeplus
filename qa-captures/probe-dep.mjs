async function main () {
  const r = await fetch('http://localhost:8443/node_modules/.vite/deps/@react-three_fiber.js?t=1792067698297&v=1d4739ed')
  console.log('status', r.status)
  console.log((await r.text()).slice(0, 2000))
}
main().catch((e) => { console.error('FATAL', e.message); process.exit(1) })
