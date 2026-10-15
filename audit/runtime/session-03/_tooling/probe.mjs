// Session 3 probe: S08 / S09 / S10 deep measurement.
// Self-contained in-page function, evaluated after every state settle.

export const PROBE = () => {
  const canvas = document.querySelector('.presentation-canvas')
  const scene = document.querySelector('.presentation-scene')
  const slot = document.querySelector('.s08-phone-slot, .s09-phone-slot, .s10-phone-slot')
  const phone = document.querySelector('.phone-frame')
  const screen = document.querySelector('.phone-frame-screen')
  const surface = screen && screen.firstElementChild

  const cs = (el) => (el ? getComputedStyle(el) : null)
  const box = (el) => {
    if (!el) return null
    const r = el.getBoundingClientRect()
    return {
      x: +r.x.toFixed(2), y: +r.y.toFixed(2),
      w: +r.width.toFixed(2), h: +r.height.toFixed(2),
    }
  }

  const visible = (el) => {
    const s = cs(el)
    if (!s) return false
    if (s.display === 'none' || s.visibility === 'hidden') return false
    if (parseFloat(s.opacity) === 0) return false
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0
  }

  const all = Array.from(document.querySelectorAll('#root *'))

  // Per-element record for everything visible inside the canvas.
  const nodes = all.map((el) => {
    const s = cs(el)
    const r = el.getBoundingClientRect()
    const text = (el.textContent || '').trim().slice(0, 60)
    const ownText = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(' ')
      .slice(0, 60)
    return {
      path: (() => {
        const parts = []
        let n = el
        let d = 0
        while (n && n.nodeType === 1 && n !== document.body && d < 40) {
          let idx = 0
          let p = n.previousElementSibling
          while (p) { idx++; p = p.previousElementSibling }
          parts.unshift(`${n.tagName.toLowerCase()}.${(n.className && n.className.baseVal !== undefined ? n.className.baseVal : n.className || '').toString().trim().split(/\s+/).slice(0, 2).join('.')}[${idx}]`)
          n = n.parentElement
          d++
        }
        return parts.join('>')
      })(),
      tag: el.tagName.toLowerCase(),
      cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || '').toString(),
      txt: ownText,
      vis: visible(el),
      box: box(el),
      op: +(parseFloat(s.opacity) || 0).toFixed(4),
      fs: s.fontSize,
      fw: s.fontWeight,
      color: s.color,
      bg: s.backgroundColor,
      bgImg: s.backgroundImage && s.backgroundImage !== 'none' ? s.backgroundImage.slice(0, 90) : null,
      transform: s.transform,
      filter: s.filter,
      cw: el.clientWidth, ch: el.clientHeight,
      sw: el.scrollWidth, sh: el.scrollHeight,
      radius: s.borderRadius,
      letter: s.letterSpacing,
      lh: s.lineHeight,
    }
  })

  // Everything the audience can read, in DOM order.
  const readText = []
  for (const el of all) {
    if (!visible(el)) continue
    const s = cs(el)
    if (parseFloat(s.fontSize) < 6) continue
    const own = Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim()
    if (!own) continue
    const r = el.getBoundingClientRect()
    readText.push({
      t: own.slice(0, 80),
      fs: s.fontSize,
      fw: s.fontWeight,
      color: s.color,
      op: +(parseFloat(s.opacity) || 0).toFixed(3),
      box: box(el),
      cls: (el.className || '').toString().slice(0, 70),
    })
  }

  const stageText = Array.from(document.querySelectorAll('.s08-question, .s09-copy *, .s08-copy *')).map((el) => {
    const s = cs(el)
    return {
      t: (el.textContent || '').trim().slice(0, 80),
      fs: s.fontSize, fw: s.fontWeight, color: s.color,
      op: +(parseFloat(s.opacity) || 0).toFixed(3),
      box: box(el),
      cls: (el.className || '').toString().slice(0, 60),
    }
  })

  const maxScale = nodes.reduce((m, n) => {
    if (!n.vis || !n.transform || n.transform === 'none') return m
    const mm = /matrix\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)/.exec(n.transform)
    if (!mm) return m
    const sx = Math.abs(parseFloat(mm[1]))
    const sy = Math.abs(parseFloat(mm[4]))
    return Math.max(m, sx, sy)
  }, 0)

  // Font inventory inside the device screen only.
  const appFonts = {}
  if (screen) {
    for (const el of screen.querySelectorAll('*')) {
      if (!visible(el)) continue
      const fs = cs(el).fontSize
      appFonts[fs] = (appFonts[fs] || 0) + 1
    }
  }

  const overflow = []
  if (screen) {
    for (const el of screen.querySelectorAll('*')) {
      if (!visible(el)) continue
      const dh = el.scrollHeight - el.clientHeight
      const dw = el.scrollWidth - el.clientWidth
      if (dh > 0 || dw > 0) overflow.push({ cls: (el.className || '').toString().slice(0, 50), dh, dw })
    }
  }

  return {
    slide: document.querySelector('[aria-label*="Planes"]') ? 'S08'
      : document.querySelector('[aria-label*="Finanzas"]') ? 'S09'
      : document.querySelector('[aria-label*="Activos"]') ? 'S10' : 'other',
    slideLabel: scene ? scene.getAttribute('aria-label') : null,
    step: document.documentElement.getAttribute('data-step-index')
      || (document.body.getAttribute('data-step-index')),
    slideIndex: document.documentElement.getAttribute('data-slide-index'),
    canvas: { box: box(canvas), cw: canvas && canvas.clientWidth, ch: canvas && canvas.clientHeight, sw: canvas && canvas.scrollWidth, sh: canvas && canvas.scrollHeight },
    slot: { box: box(slot), transform: slot && cs(slot).transform, opacity: slot && +(parseFloat(cs(slot).opacity) || 0).toFixed(3), side: slot && slot.getAttribute('data-side'), dim: slot && slot.getAttribute('data-dim') },
    phone: { box: box(phone), transform: phone && cs(phone).transform, cw: phone && phone.clientWidth, ch: phone && phone.clientHeight },
    screen: { box: box(screen), cw: screen && screen.clientWidth, ch: screen && screen.clientHeight },
    surface: { cls: surface && surface.className, box: box(surface) },
    maxScale: +maxScale.toFixed(4),
    appFonts,
    overflow,
    stageText,
    readText,
    nodes: nodes.filter((n) => n.vis),
  }
}