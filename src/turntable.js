const anime = require('animejs');
const Snap = require('snapsvg');

const count = Symbol('count'); // 已抽奖次数
const deg = Symbol('deg'); // pie 夹角
const rotation = Symbol('rotation'); // 当前转动角度
const totalPies = Symbol('totalPies'); // 当前转动 pie 总数
const weight = Symbol('weight'); // 权重
const weightSum = Symbol('weight-sum'); // 权重总和
const turntable = Symbol('turntable'); // 转盘元素
const button = Symbol('button'); // 按钮元素
const run = Symbol('run'); // 启动转盘函数
const baseFontSize = 16;

const themes = {
  default: {
    out: 'red',
    in: 'gold',
    button: 'darkorange',
    inLine: 'red',
    fontColor: 'red',
    buttonFontColor: 'white'
  },
  light: {
    out: 'red',
    in: 'gold',
    button: 'darkorange',
    inLine: 'red',
    fontColor: 'red',
    buttonFontColor: 'white'
  },
  dark: {
    out: 'red',
    in: 'gold',
    button: 'darkorange',
    inLine: 'red',
    fontColor: 'red',
    buttonFontColor: 'white'
  }
};

class Turntable {
  constructor (option = {}) {
    const self = this;
    self.option = {
      pos: [0, 0], // 左上角坐标
      radius: 50, // 半径
      // inRadius: , // 中圈半径
      buttonWidth: 50, // 按钮宽度
      buttonDeg: 80, // 顶针夹角
      buttonText: '抽奖', // 按钮文字
      // fontSize: , // 文字大小
      // buttonFontSize: , // 按钮文字大小,
      textBottomPercentage: 0.6, // 文字底部对于圆半径的百分比
      limit: 1, // 抽奖限定次数
      duration: 5000, // 转动持续时间
      turn: 4, // 最小转动圈数
      clockwise: true, // 顺时针旋转
      draw: true, // 立刻绘制
      theme: 'default' // 主题
    };
    Object.keys(option).forEach(function (k) {
      self.option[k] = option[k];
    });

    if (!self.option.el) throw new Error('el is undefined in Turntable');
    if (!self.option.data) throw new Error('data is undefined in Turntable');
    self[count] = 0;
    self[rotation] = 0;
    self[totalPies] = 1;
    self[weight] = [];
    self[weightSum] = 0;

    if (self.option.draw) self.draw();
  }

  draw () {
    const self = this;
    const opt = self.option;
    if (!opt.el) throw new Error('el is undefined in Turntable');
    if (!opt.data) throw new Error('data is undefined in Turntable');

    // theme
    const theme = themes[opt.theme] ? opt.theme : 'default';
    if (!opt.color) opt.color = {};
    Object.keys(themes[theme]).forEach(k => {
      if (!opt.color[k]) opt.color[k] = themes[theme][k];
    });

    // params caculate
    if (!opt.inRadius) {
      opt.inRadius = getInRadius(opt.radius);
    } else if (opt.inRadius > opt.radius) {
      opt.inRadius = opt.radius;
    }

    const svg = Snap(opt.el);
    opt.el.style.width = String(opt.radius * 2) + 'px';
    opt.el.style.height = String(opt.radius * 2) + 'px';

    // draw circle
    const center = opt.pos.map(p => p + opt.radius);
    opt.center = center;
    let obj = svg.circle(center[0], center[1], opt.radius);
    obj.attr({
      fill: opt.color.out
    });
    obj = svg.circle(center[0], center[1], opt.inRadius);
    obj.attr({
      fill: opt.color.in
    });

    // draw pie
    const len = opt.data.length;
    self[deg] = 360 / len;
    self[turntable] = svg.g();
    if (len < 2 || len > 12) throw new Error('data.length must between 3 to 12');
    for (let i in opt.data) {
      let d = opt.data[i];
      const r = opt.inRadius;
      const m = new Snap.Matrix();

      if (typeof d === 'string') {
        d = {
          text: d,
          chance: 1
        };
      }
      if (!d.text) d.text = '';
      self[weight].push(Number(d.chance));
      self[weightSum] += Number(d.chance);

      const [pathD, dLen] = describeArc(center[0], center[1], r, -self[deg] / 2, self[deg] / 2);
      const pie = svg.path(pathD);
      pie.attr({
        fill: d.color ? d.color : opt.color.in,
        stroke: opt.color.inLine,
        strokeWidth: 2
      });

      let fontSize = d.fontSize ? d.fontSize : (opt.fontSize ? opt.fontSize : baseFontSize);
      let textSum = 0; // a-z0-9 为 1，其他为 2
      for (let i = 0; i < d.text.length; ++i) {
        if (d.text[i].match(/\w/)) {
          textSum += 1;
        } else textSum += 2;
      }
      if (!opt.fontSize && !d.fontSize) {
        fontSize = fontSize * textSum / 2 > dLen * opt.textBottomPercentage ? dLen * opt.textBottomPercentage / textSum * 2 : fontSize;
      }
      const textLen = fontSize * textSum / 2;
      const text = svg.text(center[0] - textLen / 2, opt.pos[1] + opt.radius - (r * opt.textBottomPercentage * Snap.cos(self[deg] / 2)) - fontSize, d.text);
      text.attr({
        fill: d.fontColor ? d.fontColor : opt.color.fontColor,
        fontSize: opt.fontSize ? opt.fontSize : fontSize
      });

      const g = svg.g(pie, text).transform(m.rotate(self[deg] * Number(i), center[0], center[1]));
      self[turntable].add(g);
    }
    self[turntable].node.style['transform-origin'] = 'center';

    // draw button
    self[button] = drawButton(opt, svg);
    self[button].hover(() => {
      anime({
        targets: self[button].node,
        scale: 1.2,
        duration: 500
      });
    }, () => {
      anime({
        targets: self[button].node,
        scale: 1,
        duration: 500
      });
    });
    self[button].click(() => {
      self[run]();
    });
  }

  [run] () {
    const self = this;
    const opt = self.option;
    if (!opt.el) throw new Error('el is undefined in Turntable');
    if (!opt.data) throw new Error('data is undefined in Turntable');

    // 抽奖次数超过 limit
    if (opt.limit > 0 && self[count] >= opt.limit) {
      return (opt.onFail && typeof opt.onFail === 'function') ? opt.onFail() : null;
    }

    const random = Math.random() * self[weightSum] + 1;
    let w = 0, s = 0;
    for (let i in self[weight]) {
      w += self[weight][i];
      if (w > random) {
        s = Number(i);
        self[totalPies] += s;
        break;
      }
    }

    // rotate animation
    self[rotation] += getRotation(s, self[deg], opt.turn);
    anime({
      targets: self[turntable].node,
      rotate: opt.clockwise ? String(self[rotation]) + 'deg' : '-' + String(self[rotation]) + 'deg',
      duration: opt.duration,
      complete () {
        ++self[count];
        if (opt.onSuccess && typeof opt.onSuccess === 'function') {
          opt.onSuccess(opt.data[(self[totalPies] - 1) % opt.data.length]);
        }
      }
    });
  }
}

function getInRadius (radius) {
  if (radius < 50) return radius;
  if (radius < 100) return radius - 10;
  return Math.floor(radius / 10) * 9;
}

function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc (x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'L', x, y,
    'L', start.x, start.y
  ].join(' ');
  const l = start.x - end.x; // 扇形最大宽度
  return [d, l, start, end];
}

function drawButton (opt, svg) {
  if (opt.button && typeof opt.button === 'string') {
    return;
  }

  const r = opt.buttonWidth / 2;
  const center = opt.center;
  const deg = (180 - opt.buttonDeg) / 2;
  const [pathArc, , , end] = describeArc(center[0], center[1], r, deg - 360, 360 - deg);
  const top = [center[0], center[1] - r / Snap.cos(deg)];
  const pathD = `${pathArc}L${top[0]},${top[1]}L${end.x},${end.y}L${center[0]},${center[1]}`;
  const button = svg.path(pathD);
  button.attr({
    fill: opt.color.button,
    filter: svg.filter(Snap.filter.shadow(0, 3, 3, 'black', 0.5))
  });

  let text = null;
  if (opt.buttonText !== '') {
    const maxLen = r * 2 * 0.8;
    let fontSize = opt.buttonFontSize ? opt.buttonFontSize : baseFontSize;
    let textSum = 0;
    for (let i = 0; i < opt.buttonText.length; ++i) {
      if (opt.buttonText[i].match(/\w/)) {
        textSum += 1;
      } else textSum += 2;
    }
    if (!opt.buttonFontSize) {
      fontSize = fontSize * textSum / 2 > maxLen ? maxLen / textSum * 2 : fontSize;
    }
    const textLen = fontSize * textSum / 2;
    text = svg.text(center[0] - textLen / 2, center[1], opt.buttonText);
    text.attr({
      fill: opt.color.buttonFontColor,
      fontSize: opt.buttonFontSize ? opt.buttonFontSize : fontSize
    });
  }

  const g = svg.g(button, text);
  g.node.style.cursor = 'pointer';
  g.node.style['transform-origin'] = 'center';
  return g;
}

function getRotation (i, deg, minTurn) {
  return minTurn * 360 - i * deg;
}

global.Turntable = Turntable; // 变成一个全局变量
