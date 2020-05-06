const NAME_SPACE = 'http://www.w3.org/2000/svg'

let did = 1

const svgDefaultAttrs = {
  version: '1.1',
  baseProfile: 'full',
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  'xmlns:ev': 'http://www.w3.org/2001/xml-events'
}

function completeSVGAttrs (el, attrs) {
  if (!attrs) return
  for (const key in svgDefaultAttrs) {
    if (el && attrs[key] === undefined && el.hasAttribute(key)) {
      attrs[key] = el.getAttribute(key)
    }
    if (attrs[key] === undefined || attrs[key] === null || attrs[key] === '') {
      attrs[key] = svgDefaultAttrs[key]
    }
  }
}

function createElNS (tag, attrs = {}) {
  const el = document.createElementNS(NAME_SPACE, tag)
  for (const key in attrs) {
    el.setAttribute(key, attrs[key])
  }
  return el
}

function createMatrix (a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {
  return { a, b, c, d, e, f }
}

function getMatrix (el) {
  const transformString = el.hasAttribute('transform')
  if (!transformString || transformString.indexOf('matrix') < 0) return createMatrix()
  const values = transformString.split(',')
  return createMatrix(...values)
}

export function circle (cx, cy, radius, attrs = {}) {
  attrs.cx = cx
  attrs.cy = cy
  attrs.r = radius
  return createElNS('circle', attrs)
}

export function dropShadow (rootEl, el, offsetX, offsetY, blur, opacity = 1) {
  const id = `drop-shadow-${did++}`
  const defs = createElNS('defs')
  const filter = createElNS('filter', { id, filterUnits: 'userSpaceOnUse' })
  const gBlur = createElNS('feGaussianBlur', { in: 'SourceAlpha', stdDeviation: blur })
  const offset = createElNS('feOffset', { dx: offsetX, dy: offsetY })
  const merge = createElNS('feMerge')
  const mergeNodeA = createElNS('feMergeNode')
  const mergeNodeB = createElNS('feMergeNode', { in: 'SourceGraphic' })
  merge.appendChild(mergeNodeA)
  merge.appendChild(mergeNodeB)
  filter.appendChild(gBlur)
  filter.appendChild(offset)
  if (opacity !== 1) {
    const transfer = createElNS('feComponentTransfer')
    const funcA = createElNS('feFuncA', { type: 'linear', slope: opacity })
    transfer.appendChild(funcA)
    filter.appendChild(transfer)
  }
  filter.appendChild(merge)
  defs.appendChild(filter)
  rootEl.appendChild(defs)
  el.setAttribute('filter', `url(#${id})`)
}

export function g (children = [], attrs = {}) {
  const el = createElNS('g', attrs)
  for (const child of children) {
    el.appendChild(child)
  }
  return el
}

export function image (href, attrs = {}) {
  attrs.href = href
  return createElNS('image', attrs)
}

export function path (d, attrs = {}) {
  attrs.d = d
  return createElNS('path', attrs)
}

export function rotate (el, r, cx = 0, cy = 0) {
  const cos = Math.cos(r)
  const sin = Math.sin(r)

  const { a, b, c, d, e, f } = getMatrix(el)

  const na = a * cos - b * sin
  const nb = b * cos + a * sin
  const nc = c * cos - d * sin
  const nd = d * cos + c * sin
  const ne = e * cos - f * sin + cy * sin - cx * cos + cx
  const nf = f * cos + e * sin - cx * sin - cy * cos + cy

  el.setAttribute('transform', `matrix(${na},${nb},${nc},${nd},${ne},${nf})`)
}

export function svg (attrs = {}) {
  completeSVGAttrs(null, attrs)
  return createElNS('svg', attrs)
}

export function text (text, attrs = {}) {
  const el = createElNS('text', attrs)
  el.textContent = text
  return el
}

export function translate (el, x, y = x) {
  const { a, b, c, d, e, f } = getMatrix(el)
  el.setAttribute('transform', `matrix(${a},${b},${c},${d},${e + x},${f + y})`)
}

export function useSVG (el, attrs = {}) {
  if (el.tagName !== 'svg') return
  completeSVGAttrs(el, attrs)
  for (const key in attrs) {
    el.setAttribute(key, attrs[key])
  }
}
