import anime from 'animejs'
import Snap from 'snapsvg'

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
  constructor (option = {}) {
    this.option = {
      pos: [0, 0],
      radius: 100,
      buttonWidth: 50,
      buttonDeg: 80,
      buttonText: 'Draw',
      textBottomPercentage: 0.6,
      limit: 0,
      duration: 5000,
      turn: 4,
      clockwise: true,
      draw: true,
      theme: 'default',
      ...option
    }

    if (!this.option.el) throw new Error('el is undefined')
    if (!this.option.data) throw new Error('data is undefined')
    const len = this.option.data.length
    if (len < 3 || len > 12) { throw new Error('data.length must between 3 and 12') }

    this._count = 0
    this._rotation = 0
    this._weight = []
    this._weightSum = 0
    this._running = false

    this._checkPrize()

    if (this.option.draw) this.draw()
  }

  _checkPrize () {
    const data = this.option.data
    for (const i in data) {
      const d = data[i]
      if (typeof d === 'string') {
        data[i] = {
          text: d,
          chance: 1
        }
      } else {
        data[i] = {
          ...data[i],
          text: d.text || i,
          chance: d.chance > 0 ? d.chance : 1
        }
      }

      this._weight.push(Number(data[i].chance))
      this._weightSum += Number(data[i].chance)
    }
  }

  draw () {
    const opt = this.option

    this._center = opt.pos.map((p) => p + opt.radius)

    const svg = Snap(opt.el)
    svg.node.style.width = opt.radius * 2 + 'px'
    svg.node.style.height = opt.radius * 2 + 'px'

    this._deg = 360 / opt.data.length

    if (opt.image) this._drawResource(svg)
    this._drawDefault(svg)

    this._animeFunc()
  }

  _drawDefault (svg) {
    if (this._turntable && this._button) return

    const opt = this.option
    const theme = themes[opt.theme] || themes.default
    opt.color = {
      ...theme,
      ...opt.color
    }
    if (!opt.inRadius) {
      opt.inRadius = getInnerRadius(opt.radius)
    } else if (opt.inRadius > opt.radius) {
      opt.inRadius = opt.radius
    }

    this._drawTurntable(svg)
    this._drawButton(svg)
  }

  _drawResource (svg) {
    const opt = this.option
    const res = opt.image
    if (typeof res === 'object' && Object.keys(res).length > 0) {
      if (res.turntable && typeof res.turntable === 'string') {
        this._turntable = svg.image(
          res.turntable,
          opt.pos[0],
          opt.pos[1],
          opt.radius * 2,
          opt.radius * 2
        )
      }
      if (res.button && typeof res.button === 'string') {
        if (!res.offset || typeof res.offset !== 'number') res.offset = 0
        const size = getImageSize(res.button)
        const buttonHeight = (size[1] * opt.buttonWidth) / size[0]

        this._button = svg.image(
          res.button,
          this._center[0] - opt.buttonWidth / 2,
          this._center[1] + res.offset - Math.round(buttonHeight / 2),
          opt.buttonWidth,
          buttonHeight
        )
      }
    }
  }

  _drawTurntable (svg) {
    if (this._turntable) return

    const opt = this.option
    let obj = svg.circle(this._center[0], this._center[1], opt.radius)
    obj.attr({
      fill: opt.color.border
    })
    obj = svg.circle(this._center[0], this._center[1], opt.inRadius)
    obj.attr({
      fill: opt.color.prize
    })

    this._turntable = svg.g()
    for (const d of opt.data) {
      const r = opt.inRadius

      const [pathD, dLen] = describeArc(
        this._center[0],
        this._center[1],
        r,
        -this._deg / 2,
        this._deg / 2
      )
      const pie = svg.path(pathD)
      pie.attr({
        fill: d.color ? d.color : opt.color.prize,
        stroke: opt.color.line,
        strokeWidth: 2
      })

      let fontSize = d.fontSize
        ? d.fontSize
        : opt.fontSize
          ? opt.fontSize
          : baseFontSize
      let textSum = 0
      for (let i = 0; i < d.text.length; ++i) {
        if (d.text[i].match(/\w/)) {
          textSum += 1
        } else textSum += 2
      }
      if (!opt.fontSize && !d.fontSize) {
        fontSize =
          (fontSize * textSum) / 2 > dLen * opt.textBottomPercentage
            ? ((dLen * opt.textBottomPercentage) / textSum) * 2
            : fontSize
      }
      const text = svg.text(
        this._center[0],
        opt.pos[1] +
          opt.radius -
          r * opt.textBottomPercentage * Snap.cos(this._deg / 2) -
          fontSize,
        d.text
      )
      text.attr({
        fill: d.fontColor ? d.fontColor : opt.color.prizeFont,
        fontSize: opt.fontSize ? opt.fontSize : fontSize
      })
      const box = text.node.getBoundingClientRect()
      text.transform(new Snap.Matrix().translate(-Math.round(box.width / 2), 2))

      const g = svg
        .g(pie, text)
        .transform(
          new Snap.Matrix().rotate(
            this._deg * opt.data.indexOf(d),
            this._center[0],
            this._center[1]
          )
        )
      this._turntable.add(g)
    }
  }

  _drawButton (svg) {
    if (this._button) return

    const opt = this.option
    if (opt.button && typeof opt.button === 'string') return

    const r = opt.buttonWidth / 2
    const center = this._center
    const deg = (180 - opt.buttonDeg) / 2
    const [pathArc, , , end] = describeArc(
      center[0],
      center[1],
      r,
      deg - 360,
      360 - deg
    )
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
        fontSize =
          (fontSize * textSum) / 2 > maxLen ? (maxLen / textSum) * 2 : fontSize
      }
      text = svg.text(center[0], center[1], opt.buttonText)
      text.attr({
        fill: opt.color.buttonFont,
        fontSize: opt.buttonFontSize ? opt.buttonFontSize : fontSize
      })
      const box = text.node.getBoundingClientRect()
      text.transform(new Snap.Matrix().translate(-Math.round(box.width / 2), 2))
    }

    this._button = svg.g(b, text)
  }

  _animeFunc () {
    const opt = this.option

    this._turntable.node.style['transform-origin'] = 'center'

    this._button.node.style.cursor = 'pointer'
    this._button.node.style['transform-origin'] = 'center'
    this._button.hover(
      () => {
        if (opt.onButtonHover && typeof opt.onButtonHover === 'function') {
          opt.onButtonHover(anime, this._button)
          return
        }
        anime({
          targets: this._button.node,
          scale: 1.2,
          duration: 500
        })
      },
      () => {
        anime({
          targets: this._button.node,
          scale: 1,
          duration: 500
        })
      }
    )
    this._button.click(() => {
      this._run()
    })
  }

  _run () {
    if (this._running) return

    const opt = this.option
    if (opt.limit > 0 && this._count >= opt.limit) {
      opt.onFail && typeof opt.onFail === 'function' && opt.onFail()
      return
    }

    const runAnime = (pie) => {
      if (this._rotation > 0) {
        const revision = 360 - (this._rotation % 360)
        this._rotation += revision
      }
      this._rotation += getRotation(pie, this._deg, opt.turn)
      anime({
        targets: this._turntable.node,
        rotate: opt.clockwise
          ? this._rotation + 'deg'
          : '-' + this._rotation + 'deg',
        duration: opt.duration,
        begin: () => {
          this._running = true
        },
        complete: () => {
          this._running = false
          ++this._count
          if (opt.onSuccess && typeof opt.onSuccess === 'function') {
            const d = opt.clockwise
              ? opt.data[(opt.data.length - pie) % opt.data.length]
              : opt.data[pie]
            opt.onSuccess(d)
          }
        }
      })
    }

    const random = Math.random() * this._weightSum
    let randomWeight = 0
    let pie = 0
    for (const i in this._weight) {
      randomWeight += this._weight[i]
      if (randomWeight > random) {
        pie = i
        runAnime(pie)
        break
      }
    }
  }
}

function getInnerRadius (radius) {
  if (radius < 50) return radius
  if (radius < 100) return radius - 10
  return Math.round(radius / 10) * 9
}

function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

function describeArc (x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    'L',
    x,
    y,
    'L',
    start.x,
    start.y
  ].join(' ')
  const l = start.x - end.x
  return [d, l, start, end]
}

function getRotation (i, deg, minTurn) {
  return minTurn * 360 + i * deg
}

function getImageSize (src) {
  const img = new Image()
  img.src = src
  return [img.width, img.height]
}

export default Wheel
