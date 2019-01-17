const anime = require('animejs')
const Snap = require('snapsvg')
const axios = require('axios')

const count = Symbol('count') // 已抽奖次数
const deg = Symbol('deg') // pie 夹角
const rotation = Symbol('rotation') // 当前转动角度
const weight = Symbol('weight') // 权重
const weightSum = Symbol('weight-sum') // 权重总和
const turntable = Symbol('turntable') // 转盘元素
const button = Symbol('button') // 按钮元素
const checkPrize = Symbol('check-prize') // 检查数据函数
const drawDefault = Symbol('draw-default') // 默认绘制函数
const drawResource = Symbol('draw-resource') // 素材绘制函数
const drawTurntable = Symbol('draw-turntable') // 绘制转盘函数
const drawButton = Symbol('draw-button') // 绘制按钮函数
const animeFunc = Symbol('anime-func') // 动画函数
const run = Symbol('run') // 启动转盘函数
const running = Symbol('running') // 转盘正在转动
const baseFontSize = 16

const themes = {
  default: {
    border: 'red',
    prize: 'gold',
    button: 'darkorange',
    line: 'red',
    prizeFont: 'red',
    buttonFont: 'white'
  },
  light: {
    border: 'orange',
    prize: 'lightyellow',
    button: 'tomato',
    line: 'orange',
    prizeFont: 'orange',
    buttonFont: 'white'
  },
  dark: {
    border: 'silver',
    prize: 'dimgray',
    button: 'darkslategray',
    line: 'silver',
    prizeFont: 'silver',
    buttonFont: 'lightyellow'
  }
}

class Wheel {
  constructor(option = {}) {
    const self = this
    self.option = {
      pos: [0, 0], // 左上角坐标
      radius: 100, // 半径
      buttonWidth: 50, // 按钮宽度
      buttonDeg: 80, // 顶针夹角
      buttonText: 'Draw', // 按钮文字
      textBottomPercentage: 0.6, // 文字底部对于圆半径的百分比
      limit: 0, // 抽奖限定次数
      duration: 5000, // 转动持续时间
      turn: 4, // 最小转动圈数
      clockwise: true, // 顺时针旋转
      draw: true, // 立刻绘制
      theme: 'default', // 主题
      mode: 'default' // 模式
    }
    Object.keys(option).forEach(function (k) {
      self.option[k] = option[k]
    })

    if (!self.option.el) throw new Error('el is undefined in Wheel')
    if (!self.option.data) throw new Error('data is undefined in Wheel')

    self.doc = self.option.el.ownerDocument
    self[count] = 0
    self[rotation] = 0
    self[weight] = []
    self[weightSum] = 0
    self[running] = false

    self[checkPrize]()

    if (self.option.draw) self.draw()
  }

  [checkPrize]() {
    const self = this
    const opt = self.option
    for (let i in opt.data) {
      let d = opt.data[i]
      if (typeof d === 'string') {
        opt.data[i] = {
          text: d,
          chance: 1
        }
      }
      if (!opt.data[i].text) opt.data[i].text = i
      if (!opt.data[i].chance) opt.data[i].chance = 1

      self[weight].push(Number(opt.data[i].chance))
      self[weightSum] += Number(opt.data[i].chance)
    }
  }

  draw() {
    const self = this
    const opt = self.option
    if (!opt.el) throw new Error('el is undefined in Wheel')
    if (!opt.data) throw new Error('data is undefined in Wheel')

    const center = opt.pos.map(p => p + opt.radius)
    opt.center = center

    const svg = Snap(opt.el)
    svg.node.style.width = String(opt.radius * 2) + 'px'
    svg.node.style.height = String(opt.radius * 2) + 'px'

    self[deg] = 360 / opt.data.length

    // image resource provided?
    if (opt.image) self[drawResource](svg)
    else self[drawDefault](svg)

    self[animeFunc]()
  }

  [drawDefault](svg) {
    const self = this
    if (self[turntable] && self[button]) return

    const opt = self.option

    // theme
    const theme = themes[opt.theme] ? opt.theme : 'default'
    if (!opt.color) opt.color = {}
    Object.keys(themes[theme]).forEach(k => {
      if (!opt.color[k]) opt.color[k] = themes[theme][k]
    })

    // params caculate
    if (!opt.inRadius) {
      opt.inRadius = getInRadius(opt.radius)
    } else if (opt.inRadius > opt.radius) {
      opt.inRadius = opt.radius
    }

    // draw turntable
    self[drawTurntable](svg)

    // draw button
    self[drawButton](svg)
  }

  [drawResource](svg) {
    const self = this
    const opt = self.option

    const res = opt.image
    if (typeof res === 'object' && Object.keys(res).length > 0) {
      if (res.turntable && typeof res.turntable === 'string') {
        self[turntable] = svg.image(res.turntable, opt.pos[0], opt.pos[1], opt.radius * 2, opt.radius * 2)
      }
      if (res.button && typeof res.button === 'string') {
        if (!res.offset || typeof res.offset !== 'number') res.offset = 0
        const size = getImageSize(res.button, svg, self.doc)
        const buttonHeight = size[1] * opt.buttonWidth / size[0]

        self[button] = svg.image(res.button, opt.center[0] - opt.buttonWidth / 2,
          opt.center[1] + res.offset - Math.round(buttonHeight / 2), opt.buttonWidth, buttonHeight)
      }
    }

    return self[drawDefault](svg)
  }

  [drawTurntable](svg) {
    const self = this
    if (self[turntable]) return

    const opt = self.option

    // draw circle
    let obj = svg.circle(opt.center[0], opt.center[1], opt.radius)
    obj.attr({
      fill: opt.color.border
    })

    obj = svg.circle(opt.center[0], opt.center[1], opt.inRadius)
    obj.attr({
      fill: opt.color.prize
    })

    // draw pie
    const len = opt.data.length
    self[turntable] = svg.g()
    if (len < 2 || len > 12) throw new Error('data.length must between 3 and 12')
    for (let i in opt.data) {
      const d = opt.data[i]
      const r = opt.inRadius

      const [pathD, dLen] = describeArc(opt.center[0], opt.center[1], r, -self[deg] / 2, self[deg] / 2)
      const pie = svg.path(pathD)
      pie.attr({
        fill: d.color ? d.color : opt.color.prize,
        stroke: opt.color.line,
        strokeWidth: 2
      })

      let fontSize = d.fontSize ? d.fontSize : (opt.fontSize ? opt.fontSize : baseFontSize)
      let textSum = 0 // a-z0-9 为 1，其他为 2
      for (let i = 0; i < d.text.length; ++i) {
        if (d.text[i].match(/\w/)) {
          textSum += 1
        } else textSum += 2
      }
      if (!opt.fontSize && !d.fontSize) {
        fontSize = fontSize * textSum / 2 > dLen * opt.textBottomPercentage ? dLen * opt.textBottomPercentage / textSum * 2 : fontSize
      }
      const text = svg.text(opt.center[0], opt.pos[1] + opt.radius - (r * opt.textBottomPercentage * Snap.cos(self[deg] / 2)) - fontSize, d.text)
      text.attr({
        fill: d.fontColor ? d.fontColor : opt.color.prizeFont,
        fontSize: opt.fontSize ? opt.fontSize : fontSize
      })
      const box = text.node.getBoundingClientRect()
      text.transform(new Snap.Matrix().translate(-Math.round(box.width / 2), 2))

      const g = svg.g(pie, text).transform(new Snap.Matrix().rotate(self[deg] * Number(i), opt.center[0], opt.center[1]))
      self[turntable].add(g)
    }
  }

  [drawButton](svg) {
    const self = this
    if (self[button]) return

    const opt = self.option

    if (opt.button && typeof opt.button === 'string') {
      return
    }

    const r = opt.buttonWidth / 2
    const center = opt.center
    const deg = (180 - opt.buttonDeg) / 2
    const [pathArc, , , end] = describeArc(center[0], center[1], r, deg - 360, 360 - deg)
    const top = [center[0], center[1] - r / Snap.cos(deg)]
    const pathD = `${pathArc}L${top[0]},${top[1]}L${end.x},${end.y}L${center[0]},${center[1]}`
    const b = svg.path(pathD)
    b.attr({
      fill: opt.color.button,
      filter: svg.filter(Snap.filter.shadow(0, 3, 3, 'black', 0.5))
    })

    let text = null
    if (opt.buttonText !== '') {
      const maxLen = r * 2 * 0.8
      let fontSize = opt.buttonFontSize ? opt.buttonFontSize : baseFontSize
      let textSum = 0
      for (let i = 0; i < opt.buttonText.length; ++i) {
        if (opt.buttonText[i].match(/\w/)) {
          textSum += 1
        } else textSum += 2
      }
      if (!opt.buttonFontSize) {
        fontSize = fontSize * textSum / 2 > maxLen ? maxLen / textSum * 2 : fontSize
      }
      text = svg.text(center[0], center[1], opt.buttonText)
      text.attr({
        fill: opt.color.buttonFont,
        fontSize: opt.buttonFontSize ? opt.buttonFontSize : fontSize
      })
      const box = text.node.getBoundingClientRect()
      text.transform(new Snap.Matrix().translate(-Math.round(box.width / 2), 2))
    }

    self[button] = svg.g(b, text)
  }

  [animeFunc]() {
    const self = this
    const opt = self.option

    self[turntable].node.style['transform-origin'] = 'center'

    self[button].node.style.cursor = 'pointer'
    self[button].node.style['transform-origin'] = 'center'
    self[button].hover(() => {
      if (opt.onButtonHover && typeof opt.onButtonHover === 'function') {
        return opt.onButtonHover(anime, self[button])
      }
      anime({
        targets: self[button].node,
        scale: 1.2,
        duration: 500
      })
    }, () => {
      anime({
        targets: self[button].node,
        scale: 1,
        duration: 500
      })
    })
    self[button].click(() => {
      self[run]()
    })
  }

  [run]() {
    const self = this
    if (self[running]) return
    const opt = self.option
    if (!opt.el) throw new Error('el is undefined in Wheel')
    if (!opt.data) throw new Error('data is undefined in Wheel')

    // 抽奖次数超过 limit
    if (opt.limit > 0 && self[count] >= opt.limit) {
      return (opt.onFail && typeof opt.onFail === 'function') ? opt.onFail() : null
    }

    // rotate animation
    const runAnime = (pie) => {
      if (self[rotation] > 0) {
        const revision = 360 - (self[rotation] % 360)
        self[rotation] += revision
      }
      self[rotation] += getRotation(pie, self[deg], opt.turn)
      anime({
        targets: self[turntable].node,
        rotate: opt.clockwise ? String(self[rotation]) + 'deg' : '-' + String(self[rotation]) + 'deg',
        duration: opt.duration,
        begin() {
          self[running] = true
        },
        complete() {
          self[running] = false
            ++self[count]
          if (opt.onSuccess && typeof opt.onSuccess === 'function') {
            const d = opt.clockwise ? opt.data[(opt.data.length - pie) % opt.data.length] : opt.data[pie]
            opt.onSuccess(d)
          }
        }
      })
    }

    const random = Math.random() * self[weightSum]
    let randomWeight = 0;
    let pie = 0
    if (opt.mode === 'online' && opt.url) {
      axios.get(opt.url)
        .then((response) => {
          pie = response.data
          runAnime(pie)
        })
        .catch((error) => {
          throw new Error(error)
        })
    } else {
      for (let i in self[weight]) {
        randomWeight += self[weight][i]
        if (randomWeight > random) {
          pie = Number(i)
          runAnime(pie)
          break
        }
      }
    }
  }
}

// 获取内圈半径
function getInRadius(radius) {
  if (radius < 50) return radius
  if (radius < 100) return radius - 10
  return Math.round(radius / 10) * 9
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'L', x, y,
    'L', start.x, start.y
  ].join(' ')
  const l = start.x - end.x // 扇形最大宽度
  return [d, l, start, end]
}

// 获取旋转角度
function getRotation(i, deg, minTurn) {
  return minTurn * 360 + i * deg
}

// 获取图片尺寸
function getImageSize(src, svg, doc) {
  const img = doc.createElement('img')
  const body = doc.body
  body.appendChild(img)
  img.src = src

  const size = [
    img.width || img.naturalWidth || img.getBoundingClientRect().width || 50,
    img.height || img.naturalHeight || img.getBoundingClientRect().height || 50
  ]
  doc.body.removeChild(img)
  return size
}

module.exports = Wheel