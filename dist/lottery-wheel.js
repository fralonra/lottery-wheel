(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Wheel = factory());
})(this, (function () { 'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /*
   * anime.js v3.2.1
   * (c) 2020 Julian Garnier
   * Released under the MIT license
   * animejs.com
   */

  // Defaults

  var defaultInstanceSettings = {
    update: null,
    begin: null,
    loopBegin: null,
    changeBegin: null,
    change: null,
    changeComplete: null,
    loopComplete: null,
    complete: null,
    loop: 1,
    direction: 'normal',
    autoplay: true,
    timelineOffset: 0
  };
  var defaultTweenSettings = {
    duration: 1000,
    delay: 0,
    endDelay: 0,
    easing: 'easeOutElastic(1, .5)',
    round: 0
  };
  var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective', 'matrix', 'matrix3d'];

  // Caching

  var cache = {
    CSS: {},
    springs: {}
  };

  // Utils

  function minMax(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }
  function stringContains(str, text) {
    return str.indexOf(text) > -1;
  }
  function applyArguments(func, args) {
    return func.apply(null, args);
  }
  var is = {
    arr: function arr(a) {
      return Array.isArray(a);
    },
    obj: function obj(a) {
      return stringContains(Object.prototype.toString.call(a), 'Object');
    },
    pth: function pth(a) {
      return is.obj(a) && a.hasOwnProperty('totalLength');
    },
    svg: function svg(a) {
      return a instanceof SVGElement;
    },
    inp: function inp(a) {
      return a instanceof HTMLInputElement;
    },
    dom: function dom(a) {
      return a.nodeType || is.svg(a);
    },
    str: function str(a) {
      return typeof a === 'string';
    },
    fnc: function fnc(a) {
      return typeof a === 'function';
    },
    und: function und(a) {
      return typeof a === 'undefined';
    },
    nil: function nil(a) {
      return is.und(a) || a === null;
    },
    hex: function hex(a) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
    },
    rgb: function rgb(a) {
      return /^rgb/.test(a);
    },
    hsl: function hsl(a) {
      return /^hsl/.test(a);
    },
    col: function col(a) {
      return is.hex(a) || is.rgb(a) || is.hsl(a);
    },
    key: function key(a) {
      return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes';
    }
  };

  // Easings

  function parseEasingParameters(string) {
    var match = /\(([^)]+)\)/.exec(string);
    return match ? match[1].split(',').map(function (p) {
      return parseFloat(p);
    }) : [];
  }

  // Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js

  function spring(string, duration) {
    var params = parseEasingParameters(string);
    var mass = minMax(is.und(params[0]) ? 1 : params[0], .1, 100);
    var stiffness = minMax(is.und(params[1]) ? 100 : params[1], .1, 100);
    var damping = minMax(is.und(params[2]) ? 10 : params[2], .1, 100);
    var velocity = minMax(is.und(params[3]) ? 0 : params[3], .1, 100);
    var w0 = Math.sqrt(stiffness / mass);
    var zeta = damping / (2 * Math.sqrt(stiffness * mass));
    var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
    var a = 1;
    var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
    function solver(t) {
      var progress = duration ? duration * t / 1000 : t;
      if (zeta < 1) {
        progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
      } else {
        progress = (a + b * progress) * Math.exp(-progress * w0);
      }
      if (t === 0 || t === 1) {
        return t;
      }
      return 1 - progress;
    }
    function getDuration() {
      var cached = cache.springs[string];
      if (cached) {
        return cached;
      }
      var frame = 1 / 6;
      var elapsed = 0;
      var rest = 0;
      while (true) {
        elapsed += frame;
        if (solver(elapsed) === 1) {
          rest++;
          if (rest >= 16) {
            break;
          }
        } else {
          rest = 0;
        }
      }
      var duration = elapsed * frame * 1000;
      cache.springs[string] = duration;
      return duration;
    }
    return duration ? solver : getDuration;
  }

  // Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function

  function steps(steps) {
    if (steps === void 0) steps = 10;
    return function (t) {
      return Math.ceil(minMax(t, 0.000001, 1) * steps) * (1 / steps);
    };
  }

  // BezierEasing https://github.com/gre/bezier-easing

  var bezier = function () {
    var kSplineTableSize = 11;
    var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
    function A(aA1, aA2) {
      return 1.0 - 3.0 * aA2 + 3.0 * aA1;
    }
    function B(aA1, aA2) {
      return 3.0 * aA2 - 6.0 * aA1;
    }
    function C(aA1) {
      return 3.0 * aA1;
    }
    function calcBezier(aT, aA1, aA2) {
      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
      return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
    }
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
      var currentX,
        currentT,
        i = 0;
      do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0.0) {
          aB = currentT;
        } else {
          aA = currentT;
        }
      } while (Math.abs(currentX) > 0.0000001 && ++i < 10);
      return currentT;
    }
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
      for (var i = 0; i < 4; ++i) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) {
          return aGuessT;
        }
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }
    function bezier(mX1, mY1, mX2, mY2) {
      if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
        return;
      }
      var sampleValues = new Float32Array(kSplineTableSize);
      if (mX1 !== mY1 || mX2 !== mY2) {
        for (var i = 0; i < kSplineTableSize; ++i) {
          sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
      }
      function getTForX(aX) {
        var intervalStart = 0;
        var currentSample = 1;
        var lastSample = kSplineTableSize - 1;
        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }
        --currentSample;
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= 0.001) {
          return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0.0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
      }
      return function (x) {
        if (mX1 === mY1 && mX2 === mY2) {
          return x;
        }
        if (x === 0 || x === 1) {
          return x;
        }
        return calcBezier(getTForX(x), mY1, mY2);
      };
    }
    return bezier;
  }();
  var penner = function () {
    // Based on jQuery UI's implemenation of easing equations from Robert Penner (http://www.robertpenner.com/easing)

    var eases = {
      linear: function linear() {
        return function (t) {
          return t;
        };
      }
    };
    var functionEasings = {
      Sine: function Sine() {
        return function (t) {
          return 1 - Math.cos(t * Math.PI / 2);
        };
      },
      Circ: function Circ() {
        return function (t) {
          return 1 - Math.sqrt(1 - t * t);
        };
      },
      Back: function Back() {
        return function (t) {
          return t * t * (3 * t - 2);
        };
      },
      Bounce: function Bounce() {
        return function (t) {
          var pow2,
            b = 4;
          while (t < ((pow2 = Math.pow(2, --b)) - 1) / 11) {}
          return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t, 2);
        };
      },
      Elastic: function Elastic(amplitude, period) {
        if (amplitude === void 0) amplitude = 1;
        if (period === void 0) period = .5;
        var a = minMax(amplitude, 1, 10);
        var p = minMax(period, .1, 2);
        return function (t) {
          return t === 0 || t === 1 ? t : -a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p);
        };
      }
    };
    var baseEasings = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
    baseEasings.forEach(function (name, i) {
      functionEasings[name] = function () {
        return function (t) {
          return Math.pow(t, i + 2);
        };
      };
    });
    Object.keys(functionEasings).forEach(function (name) {
      var easeIn = functionEasings[name];
      eases['easeIn' + name] = easeIn;
      eases['easeOut' + name] = function (a, b) {
        return function (t) {
          return 1 - easeIn(a, b)(1 - t);
        };
      };
      eases['easeInOut' + name] = function (a, b) {
        return function (t) {
          return t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 1 - easeIn(a, b)(t * -2 + 2) / 2;
        };
      };
      eases['easeOutIn' + name] = function (a, b) {
        return function (t) {
          return t < 0.5 ? (1 - easeIn(a, b)(1 - t * 2)) / 2 : (easeIn(a, b)(t * 2 - 1) + 1) / 2;
        };
      };
    });
    return eases;
  }();
  function parseEasings(easing, duration) {
    if (is.fnc(easing)) {
      return easing;
    }
    var name = easing.split('(')[0];
    var ease = penner[name];
    var args = parseEasingParameters(easing);
    switch (name) {
      case 'spring':
        return spring(easing, duration);
      case 'cubicBezier':
        return applyArguments(bezier, args);
      case 'steps':
        return applyArguments(steps, args);
      default:
        return applyArguments(ease, args);
    }
  }

  // Strings

  function selectString(str) {
    try {
      var nodes = document.querySelectorAll(str);
      return nodes;
    } catch (e) {
      return;
    }
  }

  // Arrays

  function filterArray(arr, callback) {
    var len = arr.length;
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    var result = [];
    for (var i = 0; i < len; i++) {
      if (i in arr) {
        var val = arr[i];
        if (callback.call(thisArg, val, i, arr)) {
          result.push(val);
        }
      }
    }
    return result;
  }
  function flattenArray(arr) {
    return arr.reduce(function (a, b) {
      return a.concat(is.arr(b) ? flattenArray(b) : b);
    }, []);
  }
  function toArray(o) {
    if (is.arr(o)) {
      return o;
    }
    if (is.str(o)) {
      o = selectString(o) || o;
    }
    if (o instanceof NodeList || o instanceof HTMLCollection) {
      return [].slice.call(o);
    }
    return [o];
  }
  function arrayContains(arr, val) {
    return arr.some(function (a) {
      return a === val;
    });
  }

  // Objects

  function cloneObject(o) {
    var clone = {};
    for (var p in o) {
      clone[p] = o[p];
    }
    return clone;
  }
  function replaceObjectProps(o1, o2) {
    var o = cloneObject(o1);
    for (var p in o1) {
      o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
    }
    return o;
  }
  function mergeObjects(o1, o2) {
    var o = cloneObject(o1);
    for (var p in o2) {
      o[p] = is.und(o1[p]) ? o2[p] : o1[p];
    }
    return o;
  }

  // Colors

  function rgbToRgba(rgbValue) {
    var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
    return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
  }
  function hexToRgba(hexValue) {
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hexValue.replace(rgx, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(rgb[1], 16);
    var g = parseInt(rgb[2], 16);
    var b = parseInt(rgb[3], 16);
    return "rgba(" + r + "," + g + "," + b + ",1)";
  }
  function hslToRgba(hslValue) {
    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
    var h = parseInt(hsl[1], 10) / 360;
    var s = parseInt(hsl[2], 10) / 100;
    var l = parseInt(hsl[3], 10) / 100;
    var a = hsl[4] || 1;
    function hue2rgb(p, q, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    }
    var r, g, b;
    if (s == 0) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
  }
  function colorToRgb(val) {
    if (is.rgb(val)) {
      return rgbToRgba(val);
    }
    if (is.hex(val)) {
      return hexToRgba(val);
    }
    if (is.hsl(val)) {
      return hslToRgba(val);
    }
  }

  // Units

  function getUnit(val) {
    var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
    if (split) {
      return split[1];
    }
  }
  function getTransformUnit(propName) {
    if (stringContains(propName, 'translate') || propName === 'perspective') {
      return 'px';
    }
    if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) {
      return 'deg';
    }
  }

  // Values

  function getFunctionValue(val, animatable) {
    if (!is.fnc(val)) {
      return val;
    }
    return val(animatable.target, animatable.id, animatable.total);
  }
  function getAttribute(el, prop) {
    return el.getAttribute(prop);
  }
  function convertPxToUnit(el, value, unit) {
    var valueUnit = getUnit(value);
    if (arrayContains([unit, 'deg', 'rad', 'turn'], valueUnit)) {
      return value;
    }
    var cached = cache.CSS[value + unit];
    if (!is.und(cached)) {
      return cached;
    }
    var baseline = 100;
    var tempEl = document.createElement(el.tagName);
    var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
    parentEl.appendChild(tempEl);
    tempEl.style.position = 'absolute';
    tempEl.style.width = baseline + unit;
    var factor = baseline / tempEl.offsetWidth;
    parentEl.removeChild(tempEl);
    var convertedUnit = factor * parseFloat(value);
    cache.CSS[value + unit] = convertedUnit;
    return convertedUnit;
  }
  function getCSSValue(el, prop, unit) {
    if (prop in el.style) {
      var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || '0';
      return unit ? convertPxToUnit(el, value, unit) : value;
    }
  }
  function getAnimationType(el, prop) {
    if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) {
      return 'attribute';
    }
    if (is.dom(el) && arrayContains(validTransforms, prop)) {
      return 'transform';
    }
    if (is.dom(el) && prop !== 'transform' && getCSSValue(el, prop)) {
      return 'css';
    }
    if (el[prop] != null) {
      return 'object';
    }
  }
  function getElementTransforms(el) {
    if (!is.dom(el)) {
      return;
    }
    var str = el.style.transform || '';
    var reg = /(\w+)\(([^)]*)\)/g;
    var transforms = new Map();
    var m;
    while (m = reg.exec(str)) {
      transforms.set(m[1], m[2]);
    }
    return transforms;
  }
  function getTransformValue(el, propName, animatable, unit) {
    var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + getTransformUnit(propName);
    var value = getElementTransforms(el).get(propName) || defaultVal;
    if (animatable) {
      animatable.transforms.list.set(propName, value);
      animatable.transforms['last'] = propName;
    }
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
  function getOriginalTargetValue(target, propName, unit, animatable) {
    switch (getAnimationType(target, propName)) {
      case 'transform':
        return getTransformValue(target, propName, animatable, unit);
      case 'css':
        return getCSSValue(target, propName, unit);
      case 'attribute':
        return getAttribute(target, propName);
      default:
        return target[propName] || 0;
    }
  }
  function getRelativeValue(to, from) {
    var operator = /^(\*=|\+=|-=)/.exec(to);
    if (!operator) {
      return to;
    }
    var u = getUnit(to) || 0;
    var x = parseFloat(from);
    var y = parseFloat(to.replace(operator[0], ''));
    switch (operator[0][0]) {
      case '+':
        return x + y + u;
      case '-':
        return x - y + u;
      case '*':
        return x * y + u;
    }
  }
  function validateValue(val, unit) {
    if (is.col(val)) {
      return colorToRgb(val);
    }
    if (/\s/g.test(val)) {
      return val;
    }
    var originalUnit = getUnit(val);
    var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
    if (unit) {
      return unitLess + unit;
    }
    return unitLess;
  }

  // getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
  // adapted from https://gist.github.com/SebLambla/3e0550c496c236709744

  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
  function getCircleLength(el) {
    return Math.PI * 2 * getAttribute(el, 'r');
  }
  function getRectLength(el) {
    return getAttribute(el, 'width') * 2 + getAttribute(el, 'height') * 2;
  }
  function getLineLength(el) {
    return getDistance({
      x: getAttribute(el, 'x1'),
      y: getAttribute(el, 'y1')
    }, {
      x: getAttribute(el, 'x2'),
      y: getAttribute(el, 'y2')
    });
  }
  function getPolylineLength(el) {
    var points = el.points;
    var totalLength = 0;
    var previousPos;
    for (var i = 0; i < points.numberOfItems; i++) {
      var currentPos = points.getItem(i);
      if (i > 0) {
        totalLength += getDistance(previousPos, currentPos);
      }
      previousPos = currentPos;
    }
    return totalLength;
  }
  function getPolygonLength(el) {
    var points = el.points;
    return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
  }

  // Path animation

  function getTotalLength(el) {
    if (el.getTotalLength) {
      return el.getTotalLength();
    }
    switch (el.tagName.toLowerCase()) {
      case 'circle':
        return getCircleLength(el);
      case 'rect':
        return getRectLength(el);
      case 'line':
        return getLineLength(el);
      case 'polyline':
        return getPolylineLength(el);
      case 'polygon':
        return getPolygonLength(el);
    }
  }
  function setDashoffset(el) {
    var pathLength = getTotalLength(el);
    el.setAttribute('stroke-dasharray', pathLength);
    return pathLength;
  }

  // Motion path

  function getParentSvgEl(el) {
    var parentEl = el.parentNode;
    while (is.svg(parentEl)) {
      if (!is.svg(parentEl.parentNode)) {
        break;
      }
      parentEl = parentEl.parentNode;
    }
    return parentEl;
  }
  function getParentSvg(pathEl, svgData) {
    var svg = svgData || {};
    var parentSvgEl = svg.el || getParentSvgEl(pathEl);
    var rect = parentSvgEl.getBoundingClientRect();
    var viewBoxAttr = getAttribute(parentSvgEl, 'viewBox');
    var width = rect.width;
    var height = rect.height;
    var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(' ') : [0, 0, width, height]);
    return {
      el: parentSvgEl,
      viewBox: viewBox,
      x: viewBox[0] / 1,
      y: viewBox[1] / 1,
      w: width,
      h: height,
      vW: viewBox[2],
      vH: viewBox[3]
    };
  }
  function getPath(path, percent) {
    var pathEl = is.str(path) ? selectString(path)[0] : path;
    var p = percent || 100;
    return function (property) {
      return {
        property: property,
        el: pathEl,
        svg: getParentSvg(pathEl),
        totalLength: getTotalLength(pathEl) * (p / 100)
      };
    };
  }
  function getPathProgress(path, progress, isPathTargetInsideSVG) {
    function point(offset) {
      if (offset === void 0) offset = 0;
      var l = progress + offset >= 1 ? progress + offset : 0;
      return path.el.getPointAtLength(l);
    }
    var svg = getParentSvg(path.el, path.svg);
    var p = point();
    var p0 = point(-1);
    var p1 = point(+1);
    var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
    var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
    switch (path.property) {
      case 'x':
        return (p.x - svg.x) * scaleX;
      case 'y':
        return (p.y - svg.y) * scaleY;
      case 'angle':
        return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    }
  }

  // Decompose value

  function decomposeValue(val, unit) {
    // const rgx = /-?\d*\.?\d+/g; // handles basic numbers
    // const rgx = /[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
    var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
    var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + '';
    return {
      original: value,
      numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
      strings: is.str(val) || unit ? value.split(rgx) : []
    };
  }

  // Animatables

  function parseTargets(targets) {
    var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
    return filterArray(targetsArray, function (item, pos, self) {
      return self.indexOf(item) === pos;
    });
  }
  function getAnimatables(targets) {
    var parsed = parseTargets(targets);
    return parsed.map(function (t, i) {
      return {
        target: t,
        id: i,
        total: parsed.length,
        transforms: {
          list: getElementTransforms(t)
        }
      };
    });
  }

  // Properties

  function normalizePropertyTweens(prop, tweenSettings) {
    var settings = cloneObject(tweenSettings);
    // Override duration if easing is a spring
    if (/^spring/.test(settings.easing)) {
      settings.duration = spring(settings.easing);
    }
    if (is.arr(prop)) {
      var l = prop.length;
      var isFromTo = l === 2 && !is.obj(prop[0]);
      if (!isFromTo) {
        // Duration divided by the number of tweens
        if (!is.fnc(tweenSettings.duration)) {
          settings.duration = tweenSettings.duration / l;
        }
      } else {
        // Transform [from, to] values shorthand to a valid tween value
        prop = {
          value: prop
        };
      }
    }
    var propArray = is.arr(prop) ? prop : [prop];
    return propArray.map(function (v, i) {
      var obj = is.obj(v) && !is.pth(v) ? v : {
        value: v
      };
      // Default delay value should only be applied to the first tween
      if (is.und(obj.delay)) {
        obj.delay = !i ? tweenSettings.delay : 0;
      }
      // Default endDelay value should only be applied to the last tween
      if (is.und(obj.endDelay)) {
        obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0;
      }
      return obj;
    }).map(function (k) {
      return mergeObjects(k, settings);
    });
  }
  function flattenKeyframes(keyframes) {
    var propertyNames = filterArray(flattenArray(keyframes.map(function (key) {
      return Object.keys(key);
    })), function (p) {
      return is.key(p);
    }).reduce(function (a, b) {
      if (a.indexOf(b) < 0) {
        a.push(b);
      }
      return a;
    }, []);
    var properties = {};
    var loop = function loop(i) {
      var propName = propertyNames[i];
      properties[propName] = keyframes.map(function (key) {
        var newKey = {};
        for (var p in key) {
          if (is.key(p)) {
            if (p == propName) {
              newKey.value = key[p];
            }
          } else {
            newKey[p] = key[p];
          }
        }
        return newKey;
      });
    };
    for (var i = 0; i < propertyNames.length; i++) loop(i);
    return properties;
  }
  function getProperties(tweenSettings, params) {
    var properties = [];
    var keyframes = params.keyframes;
    if (keyframes) {
      params = mergeObjects(flattenKeyframes(keyframes), params);
    }
    for (var p in params) {
      if (is.key(p)) {
        properties.push({
          name: p,
          tweens: normalizePropertyTweens(params[p], tweenSettings)
        });
      }
    }
    return properties;
  }

  // Tweens

  function normalizeTweenValues(tween, animatable) {
    var t = {};
    for (var p in tween) {
      var value = getFunctionValue(tween[p], animatable);
      if (is.arr(value)) {
        value = value.map(function (v) {
          return getFunctionValue(v, animatable);
        });
        if (value.length === 1) {
          value = value[0];
        }
      }
      t[p] = value;
    }
    t.duration = parseFloat(t.duration);
    t.delay = parseFloat(t.delay);
    return t;
  }
  function normalizeTweens(prop, animatable) {
    var previousTween;
    return prop.tweens.map(function (t) {
      var tween = normalizeTweenValues(t, animatable);
      var tweenValue = tween.value;
      var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
      var toUnit = getUnit(to);
      var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
      var previousValue = previousTween ? previousTween.to.original : originalValue;
      var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
      var fromUnit = getUnit(from) || getUnit(originalValue);
      var unit = toUnit || fromUnit;
      if (is.und(to)) {
        to = previousValue;
      }
      tween.from = decomposeValue(from, unit);
      tween.to = decomposeValue(getRelativeValue(to, from), unit);
      tween.start = previousTween ? previousTween.end : 0;
      tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
      tween.easing = parseEasings(tween.easing, tween.duration);
      tween.isPath = is.pth(tweenValue);
      tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
      tween.isColor = is.col(tween.from.original);
      if (tween.isColor) {
        tween.round = 1;
      }
      previousTween = tween;
      return tween;
    });
  }

  // Tween progress

  var setProgressValue = {
    css: function css(t, p, v) {
      return t.style[p] = v;
    },
    attribute: function attribute(t, p, v) {
      return t.setAttribute(p, v);
    },
    object: function object(t, p, v) {
      return t[p] = v;
    },
    transform: function transform(t, p, v, transforms, manual) {
      transforms.list.set(p, v);
      if (p === transforms.last || manual) {
        var str = '';
        transforms.list.forEach(function (value, prop) {
          str += prop + "(" + value + ") ";
        });
        t.style.transform = str;
      }
    }
  };

  // Set Value helper

  function setTargetsValue(targets, properties) {
    var animatables = getAnimatables(targets);
    animatables.forEach(function (animatable) {
      for (var property in properties) {
        var value = getFunctionValue(properties[property], animatable);
        var target = animatable.target;
        var valueUnit = getUnit(value);
        var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
        var unit = valueUnit || getUnit(originalValue);
        var to = getRelativeValue(validateValue(value, unit), originalValue);
        var animType = getAnimationType(target, property);
        setProgressValue[animType](target, property, to, animatable.transforms, true);
      }
    });
  }

  // Animations

  function createAnimation(animatable, prop) {
    var animType = getAnimationType(animatable.target, prop.name);
    if (animType) {
      var tweens = normalizeTweens(prop, animatable);
      var lastTween = tweens[tweens.length - 1];
      return {
        type: animType,
        property: prop.name,
        animatable: animatable,
        tweens: tweens,
        duration: lastTween.end,
        delay: tweens[0].delay,
        endDelay: lastTween.endDelay
      };
    }
  }
  function getAnimations(animatables, properties) {
    return filterArray(flattenArray(animatables.map(function (animatable) {
      return properties.map(function (prop) {
        return createAnimation(animatable, prop);
      });
    })), function (a) {
      return !is.und(a);
    });
  }

  // Create Instance

  function getInstanceTimings(animations, tweenSettings) {
    var animLength = animations.length;
    var getTlOffset = function getTlOffset(anim) {
      return anim.timelineOffset ? anim.timelineOffset : 0;
    };
    var timings = {};
    timings.duration = animLength ? Math.max.apply(Math, animations.map(function (anim) {
      return getTlOffset(anim) + anim.duration;
    })) : tweenSettings.duration;
    timings.delay = animLength ? Math.min.apply(Math, animations.map(function (anim) {
      return getTlOffset(anim) + anim.delay;
    })) : tweenSettings.delay;
    timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function (anim) {
      return getTlOffset(anim) + anim.duration - anim.endDelay;
    })) : tweenSettings.endDelay;
    return timings;
  }
  var instanceID = 0;
  function createNewInstance(params) {
    var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
    var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
    var properties = getProperties(tweenSettings, params);
    var animatables = getAnimatables(params.targets);
    var animations = getAnimations(animatables, properties);
    var timings = getInstanceTimings(animations, tweenSettings);
    var id = instanceID;
    instanceID++;
    return mergeObjects(instanceSettings, {
      id: id,
      children: [],
      animatables: animatables,
      animations: animations,
      duration: timings.duration,
      delay: timings.delay,
      endDelay: timings.endDelay
    });
  }

  // Core

  var activeInstances = [];
  var engine = function () {
    var raf;
    function play() {
      if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) {
        raf = requestAnimationFrame(step);
      }
    }
    function step(t) {
      // memo on algorithm issue:
      // dangerous iteration over mutable `activeInstances`
      // (that collection may be updated from within callbacks of `tick`-ed animation instances)
      var activeInstancesLength = activeInstances.length;
      var i = 0;
      while (i < activeInstancesLength) {
        var activeInstance = activeInstances[i];
        if (!activeInstance.paused) {
          activeInstance.tick(t);
          i++;
        } else {
          activeInstances.splice(i, 1);
          activeInstancesLength--;
        }
      }
      raf = i > 0 ? requestAnimationFrame(step) : undefined;
    }
    function handleVisibilityChange() {
      if (!anime.suspendWhenDocumentHidden) {
        return;
      }
      if (isDocumentHidden()) {
        // suspend ticks
        raf = cancelAnimationFrame(raf);
      } else {
        // is back to active tab
        // first adjust animations to consider the time that ticks were suspended
        activeInstances.forEach(function (instance) {
          return instance._onDocumentVisibility();
        });
        engine();
      }
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }
    return play;
  }();
  function isDocumentHidden() {
    return !!document && document.hidden;
  }

  // Public Instance

  function anime(params) {
    if (params === void 0) params = {};
    var startTime = 0,
      lastTime = 0,
      now = 0;
    var children,
      childrenLength = 0;
    var resolve = null;
    function makePromise(instance) {
      var promise = window.Promise && new Promise(function (_resolve) {
        return resolve = _resolve;
      });
      instance.finished = promise;
      return promise;
    }
    var instance = createNewInstance(params);
    makePromise(instance);
    function toggleInstanceDirection() {
      var direction = instance.direction;
      if (direction !== 'alternate') {
        instance.direction = direction !== 'normal' ? 'normal' : 'reverse';
      }
      instance.reversed = !instance.reversed;
      children.forEach(function (child) {
        return child.reversed = instance.reversed;
      });
    }
    function adjustTime(time) {
      return instance.reversed ? instance.duration - time : time;
    }
    function resetTime() {
      startTime = 0;
      lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
    }
    function seekChild(time, child) {
      if (child) {
        child.seek(time - child.timelineOffset);
      }
    }
    function syncInstanceChildren(time) {
      if (!instance.reversePlayback) {
        for (var i = 0; i < childrenLength; i++) {
          seekChild(time, children[i]);
        }
      } else {
        for (var i$1 = childrenLength; i$1--;) {
          seekChild(time, children[i$1]);
        }
      }
    }
    function setAnimationsProgress(insTime) {
      var i = 0;
      var animations = instance.animations;
      var animationsLength = animations.length;
      while (i < animationsLength) {
        var anim = animations[i];
        var animatable = anim.animatable;
        var tweens = anim.tweens;
        var tweenLength = tweens.length - 1;
        var tween = tweens[tweenLength];
        // Only check for keyframes if there is more than one tween
        if (tweenLength) {
          tween = filterArray(tweens, function (t) {
            return insTime < t.end;
          })[0] || tween;
        }
        var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
        var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
        var strings = tween.to.strings;
        var round = tween.round;
        var numbers = [];
        var toNumbersLength = tween.to.numbers.length;
        var progress = void 0;
        for (var n = 0; n < toNumbersLength; n++) {
          var value = void 0;
          var toNumber = tween.to.numbers[n];
          var fromNumber = tween.from.numbers[n] || 0;
          if (!tween.isPath) {
            value = fromNumber + eased * (toNumber - fromNumber);
          } else {
            value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
          }
          if (round) {
            if (!(tween.isColor && n > 2)) {
              value = Math.round(value * round) / round;
            }
          }
          numbers.push(value);
        }
        // Manual Array.reduce for better performances
        var stringsLength = strings.length;
        if (!stringsLength) {
          progress = numbers[0];
        } else {
          progress = strings[0];
          for (var s = 0; s < stringsLength; s++) {
            strings[s];
            var b = strings[s + 1];
            var n$1 = numbers[s];
            if (!isNaN(n$1)) {
              if (!b) {
                progress += n$1 + ' ';
              } else {
                progress += n$1 + b;
              }
            }
          }
        }
        setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
        anim.currentValue = progress;
        i++;
      }
    }
    function setCallback(cb) {
      if (instance[cb] && !instance.passThrough) {
        instance[cb](instance);
      }
    }
    function countIteration() {
      if (instance.remaining && instance.remaining !== true) {
        instance.remaining--;
      }
    }
    function setInstanceProgress(engineTime) {
      var insDuration = instance.duration;
      var insDelay = instance.delay;
      var insEndDelay = insDuration - instance.endDelay;
      var insTime = adjustTime(engineTime);
      instance.progress = minMax(insTime / insDuration * 100, 0, 100);
      instance.reversePlayback = insTime < instance.currentTime;
      if (children) {
        syncInstanceChildren(insTime);
      }
      if (!instance.began && instance.currentTime > 0) {
        instance.began = true;
        setCallback('begin');
      }
      if (!instance.loopBegan && instance.currentTime > 0) {
        instance.loopBegan = true;
        setCallback('loopBegin');
      }
      if (insTime <= insDelay && instance.currentTime !== 0) {
        setAnimationsProgress(0);
      }
      if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) {
        setAnimationsProgress(insDuration);
      }
      if (insTime > insDelay && insTime < insEndDelay) {
        if (!instance.changeBegan) {
          instance.changeBegan = true;
          instance.changeCompleted = false;
          setCallback('changeBegin');
        }
        setCallback('change');
        setAnimationsProgress(insTime);
      } else {
        if (instance.changeBegan) {
          instance.changeCompleted = true;
          instance.changeBegan = false;
          setCallback('changeComplete');
        }
      }
      instance.currentTime = minMax(insTime, 0, insDuration);
      if (instance.began) {
        setCallback('update');
      }
      if (engineTime >= insDuration) {
        lastTime = 0;
        countIteration();
        if (!instance.remaining) {
          instance.paused = true;
          if (!instance.completed) {
            instance.completed = true;
            setCallback('loopComplete');
            setCallback('complete');
            if (!instance.passThrough && 'Promise' in window) {
              resolve();
              makePromise(instance);
            }
          }
        } else {
          startTime = now;
          setCallback('loopComplete');
          instance.loopBegan = false;
          if (instance.direction === 'alternate') {
            toggleInstanceDirection();
          }
        }
      }
    }
    instance.reset = function () {
      var direction = instance.direction;
      instance.passThrough = false;
      instance.currentTime = 0;
      instance.progress = 0;
      instance.paused = true;
      instance.began = false;
      instance.loopBegan = false;
      instance.changeBegan = false;
      instance.completed = false;
      instance.changeCompleted = false;
      instance.reversePlayback = false;
      instance.reversed = direction === 'reverse';
      instance.remaining = instance.loop;
      children = instance.children;
      childrenLength = children.length;
      for (var i = childrenLength; i--;) {
        instance.children[i].reset();
      }
      if (instance.reversed && instance.loop !== true || direction === 'alternate' && instance.loop === 1) {
        instance.remaining++;
      }
      setAnimationsProgress(instance.reversed ? instance.duration : 0);
    };

    // internal method (for engine) to adjust animation timings before restoring engine ticks (rAF)
    instance._onDocumentVisibility = resetTime;

    // Set Value helper

    instance.set = function (targets, properties) {
      setTargetsValue(targets, properties);
      return instance;
    };
    instance.tick = function (t) {
      now = t;
      if (!startTime) {
        startTime = now;
      }
      setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
    };
    instance.seek = function (time) {
      setInstanceProgress(adjustTime(time));
    };
    instance.pause = function () {
      instance.paused = true;
      resetTime();
    };
    instance.play = function () {
      if (!instance.paused) {
        return;
      }
      if (instance.completed) {
        instance.reset();
      }
      instance.paused = false;
      activeInstances.push(instance);
      resetTime();
      engine();
    };
    instance.reverse = function () {
      toggleInstanceDirection();
      instance.completed = instance.reversed ? false : true;
      resetTime();
    };
    instance.restart = function () {
      instance.reset();
      instance.play();
    };
    instance.remove = function (targets) {
      var targetsArray = parseTargets(targets);
      removeTargetsFromInstance(targetsArray, instance);
    };
    instance.reset();
    if (instance.autoplay) {
      instance.play();
    }
    return instance;
  }

  // Remove targets from animation

  function removeTargetsFromAnimations(targetsArray, animations) {
    for (var a = animations.length; a--;) {
      if (arrayContains(targetsArray, animations[a].animatable.target)) {
        animations.splice(a, 1);
      }
    }
  }
  function removeTargetsFromInstance(targetsArray, instance) {
    var animations = instance.animations;
    var children = instance.children;
    removeTargetsFromAnimations(targetsArray, animations);
    for (var c = children.length; c--;) {
      var child = children[c];
      var childAnimations = child.animations;
      removeTargetsFromAnimations(targetsArray, childAnimations);
      if (!childAnimations.length && !child.children.length) {
        children.splice(c, 1);
      }
    }
    if (!animations.length && !children.length) {
      instance.pause();
    }
  }
  function removeTargetsFromActiveInstances(targets) {
    var targetsArray = parseTargets(targets);
    for (var i = activeInstances.length; i--;) {
      var instance = activeInstances[i];
      removeTargetsFromInstance(targetsArray, instance);
    }
  }

  // Stagger helpers

  function stagger(val, params) {
    if (params === void 0) params = {};
    var direction = params.direction || 'normal';
    var easing = params.easing ? parseEasings(params.easing) : null;
    var grid = params.grid;
    var axis = params.axis;
    var fromIndex = params.from || 0;
    var fromFirst = fromIndex === 'first';
    var fromCenter = fromIndex === 'center';
    var fromLast = fromIndex === 'last';
    var isRange = is.arr(val);
    var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
    var val2 = isRange ? parseFloat(val[1]) : 0;
    var unit = getUnit(isRange ? val[1] : val) || 0;
    var start = params.start || 0 + (isRange ? val1 : 0);
    var values = [];
    var maxValue = 0;
    return function (el, i, t) {
      if (fromFirst) {
        fromIndex = 0;
      }
      if (fromCenter) {
        fromIndex = (t - 1) / 2;
      }
      if (fromLast) {
        fromIndex = t - 1;
      }
      if (!values.length) {
        for (var index = 0; index < t; index++) {
          if (!grid) {
            values.push(Math.abs(fromIndex - index));
          } else {
            var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
            var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
            var toX = index % grid[0];
            var toY = Math.floor(index / grid[0]);
            var distanceX = fromX - toX;
            var distanceY = fromY - toY;
            var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (axis === 'x') {
              value = -distanceX;
            }
            if (axis === 'y') {
              value = -distanceY;
            }
            values.push(value);
          }
          maxValue = Math.max.apply(Math, values);
        }
        if (easing) {
          values = values.map(function (val) {
            return easing(val / maxValue) * maxValue;
          });
        }
        if (direction === 'reverse') {
          values = values.map(function (val) {
            return axis ? val < 0 ? val * -1 : -val : Math.abs(maxValue - val);
          });
        }
      }
      var spacing = isRange ? (val2 - val1) / maxValue : val1;
      return start + spacing * (Math.round(values[i] * 100) / 100) + unit;
    };
  }

  // Timeline

  function timeline(params) {
    if (params === void 0) params = {};
    var tl = anime(params);
    tl.duration = 0;
    tl.add = function (instanceParams, timelineOffset) {
      var tlIndex = activeInstances.indexOf(tl);
      var children = tl.children;
      if (tlIndex > -1) {
        activeInstances.splice(tlIndex, 1);
      }
      function passThrough(ins) {
        ins.passThrough = true;
      }
      for (var i = 0; i < children.length; i++) {
        passThrough(children[i]);
      }
      var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
      insParams.targets = insParams.targets || params.targets;
      var tlDuration = tl.duration;
      insParams.autoplay = false;
      insParams.direction = tl.direction;
      insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
      passThrough(tl);
      tl.seek(insParams.timelineOffset);
      var ins = anime(insParams);
      passThrough(ins);
      children.push(ins);
      var timings = getInstanceTimings(children, params);
      tl.delay = timings.delay;
      tl.endDelay = timings.endDelay;
      tl.duration = timings.duration;
      tl.seek(0);
      tl.reset();
      if (tl.autoplay) {
        tl.play();
      }
      return tl;
    };
    return tl;
  }
  anime.version = '3.2.1';
  anime.speed = 1;
  // TODO:#review: naming, documentation
  anime.suspendWhenDocumentHidden = true;
  anime.running = activeInstances;
  anime.remove = removeTargetsFromActiveInstances;
  anime.get = getOriginalTargetValue;
  anime.set = setTargetsValue;
  anime.convertPx = convertPxToUnit;
  anime.path = getPath;
  anime.setDashoffset = setDashoffset;
  anime.stagger = stagger;
  anime.timeline = timeline;
  anime.easing = parseEasings;
  anime.penner = penner;
  anime.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var NAME_SPACE = 'http://www.w3.org/2000/svg';
  var did = 1;
  var svgDefaultAttrs = {
    version: '1.1',
    baseProfile: 'full',
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    'xmlns:ev': 'http://www.w3.org/2001/xml-events'
  };
  function completeSVGAttrs(el, attrs) {
    if (!attrs) return;
    for (var key in svgDefaultAttrs) {
      if (el && attrs[key] === undefined && el.hasAttribute(key)) {
        attrs[key] = el.getAttribute(key);
      }
      if (attrs[key] === undefined || attrs[key] === null || attrs[key] === '') {
        attrs[key] = svgDefaultAttrs[key];
      }
    }
  }
  function createElNS(tag) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var el = document.createElementNS(NAME_SPACE, tag);
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
    return el;
  }
  function createMatrix() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var e = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var f = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    return {
      a: a,
      b: b,
      c: c,
      d: d,
      e: e,
      f: f
    };
  }
  function getMatrix(el) {
    var transformString = el.getAttribute('transform');
    if (!transformString || transformString.indexOf('matrix') < 0) {
      return createMatrix();
    }
    var values = transformString.split('matrix(')[1].split(')')[0].split(',').map(function (v) {
      return parseInt(v);
    });
    return createMatrix.apply(void 0, _toConsumableArray(values));
  }
  function circle(cx, cy, radius) {
    var attrs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    attrs.cx = cx;
    attrs.cy = cy;
    attrs.r = radius;
    return createElNS('circle', attrs);
  }
  function dropShadow(rootEl, el, offsetX, offsetY, blur) {
    var opacity = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
    var id = "drop-shadow-".concat(did++);
    var defs = createElNS('defs');
    var filter = createElNS('filter', {
      id: id,
      filterUnits: 'userSpaceOnUse'
    });
    var gBlur = createElNS('feGaussianBlur', {
      in: 'SourceAlpha',
      stdDeviation: blur
    });
    var offset = createElNS('feOffset', {
      dx: offsetX,
      dy: offsetY
    });
    var merge = createElNS('feMerge');
    var mergeNodeA = createElNS('feMergeNode');
    var mergeNodeB = createElNS('feMergeNode', {
      in: 'SourceGraphic'
    });
    merge.appendChild(mergeNodeA);
    merge.appendChild(mergeNodeB);
    filter.appendChild(gBlur);
    filter.appendChild(offset);
    if (opacity !== 1) {
      var transfer = createElNS('feComponentTransfer');
      var funcA = createElNS('feFuncA', {
        type: 'linear',
        slope: opacity
      });
      transfer.appendChild(funcA);
      filter.appendChild(transfer);
    }
    filter.appendChild(merge);
    defs.appendChild(filter);
    rootEl.appendChild(defs);
    el.setAttribute('filter', "url(#".concat(id, ")"));
  }
  function g() {
    var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var el = createElNS('g', attrs);
    var _iterator = _createForOfIteratorHelper(children),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var child = _step.value;
        el.appendChild(child);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return el;
  }
  function image(href) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    attrs.href = href;
    return createElNS('image', attrs);
  }
  function path(d) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    attrs.d = d;
    return createElNS('path', attrs);
  }
  function rotate(el, r) {
    var cx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var cy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var cos = Math.cos(r);
    var sin = Math.sin(r);
    var _getMatrix = getMatrix(el),
      a = _getMatrix.a,
      b = _getMatrix.b,
      c = _getMatrix.c,
      d = _getMatrix.d,
      e = _getMatrix.e,
      f = _getMatrix.f;
    var na = a * cos - b * sin;
    var nb = b * cos + a * sin;
    var nc = c * cos - d * sin;
    var nd = d * cos + c * sin;
    var ne = e * cos - f * sin + cy * sin - cx * cos + cx;
    var nf = f * cos + e * sin - cx * sin - cy * cos + cy;
    el.setAttribute('transform', "matrix(".concat(na, ",").concat(nb, ",").concat(nc, ",").concat(nd, ",").concat(ne, ",").concat(nf, ")"));
  }
  function svg() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    completeSVGAttrs(null, attrs);
    return createElNS('svg', attrs);
  }
  function text(text) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var el = createElNS('text', attrs);
    el.textContent = text;
    return el;
  }
  function translate(el, x) {
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
    var _getMatrix2 = getMatrix(el),
      a = _getMatrix2.a,
      b = _getMatrix2.b,
      c = _getMatrix2.c,
      d = _getMatrix2.d,
      e = _getMatrix2.e,
      f = _getMatrix2.f;
    el.setAttribute('transform', "matrix(".concat(a, ",").concat(b, ",").concat(c, ",").concat(d, ",").concat(e + x, ",").concat(f + y, ")"));
  }
  function useSVG(el) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (el.tagName !== 'svg') return;
    completeSVGAttrs(el, attrs);
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  function degreeToRadians(degree) {
    return degree * Math.PI / 180;
  }
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = degreeToRadians(angleInDegrees - 90);
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  }

  var baseFontSize = 16;
  var themes = {
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
  };
  var Wheel = /*#__PURE__*/function () {
    function Wheel() {
      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Wheel);
      this.option = _objectSpread2({
        pos: [0, 0],
        radius: 100,
        buttonWidth: 50,
        buttonDeg: 80,
        buttonText: 'Draw',
        textBottomPercentage: 0.6,
        textRotate: false,
        limit: 0,
        duration: 5000,
        turn: 4,
        clockwise: true,
        draw: true,
        theme: 'default'
      }, option);
      if (!this.option.el) throw new Error('el is undefined');
      if (!this.option.data) throw new Error('data is undefined');
      var len = this.option.data.length;
      if (len < 3 || len > 12) {
        throw new Error('data.length must between 3 and 12');
      }
      this._count = 0;
      this._rotation = 0;
      this._weight = [];
      this._weightSum = 0;
      this._running = false;
      this._checkPrize();
      if (this.option.draw) this.draw();
    }
    _createClass(Wheel, [{
      key: "_checkPrize",
      value: function _checkPrize() {
        var data = this.option.data;
        for (var i in data) {
          var d = data[i];
          if (typeof d === 'string') {
            data[i] = {
              text: d,
              chance: 1
            };
          } else {
            data[i] = _objectSpread2(_objectSpread2({}, data[i]), {}, {
              text: d.text || i,
              chance: d.chance > 0 ? d.chance : 1
            });
          }
          this._weight.push(Number(data[i].chance));
          this._weightSum += Number(data[i].chance);
        }
      }
    }, {
      key: "draw",
      value: function draw() {
        var opt = this.option;
        this._center = opt.pos.map(function (p) {
          return p + opt.radius;
        });
        var svgAttrs = {
          width: opt.radius * 2,
          height: opt.radius * 2
        };
        if (opt.el.tagName !== 'svg') {
          this._svg = svg(svgAttrs);
          opt.el.appendChild(this._svg);
        } else {
          this._svg = opt.el;
          useSVG(opt.el, svgAttrs);
        }
        this._deg = 360 / opt.data.length;
        if (opt.image) this._drawResource();
        this._drawDefault();
        this._animeFunc();
      }
    }, {
      key: "_drawDefault",
      value: function _drawDefault() {
        if (this._turntable && this._button) return;
        var opt = this.option;
        var theme = themes[opt.theme] || themes.default;
        opt.color = _objectSpread2(_objectSpread2({}, theme), opt.color);
        if (!opt.inRadius) {
          opt.inRadius = getInnerRadius(opt.radius);
        } else if (opt.inRadius > opt.radius) {
          opt.inRadius = opt.radius;
        }
        if (!this._turntable) this._drawTurntable();
        if (!this._button) this._drawButton();
      }
    }, {
      key: "_drawResource",
      value: function _drawResource() {
        var opt = this.option;
        var res = opt.image;
        if (_typeof(res) === 'object' && Object.keys(res).length > 0) {
          if (res.turntable && typeof res.turntable === 'string') {
            this._turntable = image(res.turntable, {
              width: opt.radius * 2,
              height: opt.radius * 2,
              x: opt.pos[0],
              y: opt.pos[1]
            });
            this._svg.appendChild(this._turntable);
          }
          if (res.button && typeof res.button === 'string') {
            if (!res.offset || typeof res.offset !== 'number') res.offset = 0;
            var size = [50, 50];
            var buttonHeight = size[1] * opt.buttonWidth / size[0];
            this._button = image(res.button, {
              width: opt.buttonWidth,
              height: buttonHeight,
              x: this._center[0] - opt.buttonWidth / 2,
              y: this._center[1] + res.offset - buttonHeight / 2
            });
            this._svg.appendChild(this._button);
          }
        }
      }
    }, {
      key: "_drawTurntable",
      value: function _drawTurntable() {
        if (this._turntable) return;
        var opt = this.option;
        this._svg.appendChild(circle(this._center[0], this._center[1], opt.radius, {
          fill: opt.color.border
        }));
        this._svg.appendChild(circle(this._center[0], this._center[1], opt.inRadius, {
          fill: opt.color.prize
        }));
        this._turntable = g();
        this._svg.appendChild(this._turntable);
        var _iterator = _createForOfIteratorHelper(opt.data),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var d = _step.value;
            var _describeArc = describeArc(this._center[0], this._center[1], opt.inRadius, -this._deg / 2, this._deg / 2),
              _describeArc2 = _slicedToArray(_describeArc, 2),
              pathD = _describeArc2[0],
              dLen = _describeArc2[1];
            var pie = path(pathD, {
              fill: d.color || opt.color.prize,
              stroke: opt.color.line,
              strokeWidth: 2
            });
            var fontSize = d.fontSize || opt.fontSize;
            if (!fontSize) {
              var textSum = 0;
              for (var i = 0; i < d.text.length; ++i) {
                if (d.text[i].match(/\w/)) {
                  textSum += 1;
                } else textSum += 2;
              }
              fontSize = baseFontSize * textSum / 2 > dLen * opt.textBottomPercentage ? dLen * opt.textBottomPercentage / textSum * 2 : baseFontSize;
            }
            var text$1 = text(d.text, {
              x: this._center[0],
              y: opt.pos[1] + opt.radius - opt.inRadius * opt.textBottomPercentage,
              fontSize: fontSize,
              fill: d.fontColor || opt.color.prizeFont
            });
            if (this.option.textRotate) {
              rotate(text$1, degreeToRadians(90), this._center[0], opt.pos[1] + opt.radius - opt.inRadius * opt.textBottomPercentage);
            }
            var gtext = g([text$1]);
            var g$1 = g([pie, gtext]);
            rotate(g$1, degreeToRadians(this._deg * opt.data.indexOf(d)), this._center[0], this._center[1]);
            this._turntable.appendChild(g$1);
            if (this.option.textRotate) {
              translate(gtext, 0, -text$1.getComputedTextLength() / 2);
            } else {
              translate(gtext, -text$1.getComputedTextLength() / 2, 0);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "_drawButton",
      value: function _drawButton() {
        if (this._button) return;
        var opt = this.option;
        if (opt.button && typeof opt.button === 'string') return;
        var r = opt.buttonWidth / 2;
        var center = this._center;
        var deg = (180 - opt.buttonDeg) / 2;
        var _describeArc3 = describeArc(center[0], center[1], r, deg - 360, 360 - deg),
          _describeArc4 = _slicedToArray(_describeArc3, 4),
          pathArc = _describeArc4[0],
          end = _describeArc4[3];
        var top = [center[0], center[1] - r / Math.cos(degreeToRadians(deg))];
        var pathD = "".concat(pathArc, " L ").concat(top[0], " ").concat(top[1], " L ").concat(end.x, " ").concat(end.y, " L ").concat(center[0], " ").concat(center[1]);
        var button = path(pathD, {
          fill: opt.color.button
        });
        dropShadow(this._svg, button, 0, 3, 3, 0.5);
        var text$1 = null;
        if (opt.buttonText !== '') {
          var maxLen = r * 2 * 0.8;
          var fontSize = opt.buttonFontSize;
          if (!fontSize) {
            var textSum = 0;
            for (var i = 0; i < opt.buttonText.length; ++i) {
              if (opt.buttonText[i].match(/\w/)) {
                textSum += 1;
              } else textSum += 2;
            }
            fontSize = baseFontSize * textSum / 2 > maxLen ? maxLen / textSum * 2 : baseFontSize;
          }
          text$1 = text(opt.buttonText, {
            x: center[0],
            y: center[1],
            fontSize: fontSize,
            fill: opt.color.buttonFont
          });
        }
        this._button = g([button, text$1]);
        this._svg.appendChild(this._button);
        translate(text$1, -text$1.getComputedTextLength() / 2, 0);
      }
    }, {
      key: "_animeFunc",
      value: function _animeFunc() {
        var _this = this;
        var opt = this.option;
        this._turntable.style['transform-origin'] = 'center';
        this._button.style.cursor = 'pointer';
        this._button.style['transform-origin'] = 'center';
        this._button.addEventListener('mouseover', function () {
          if (opt.onButtonHover && typeof opt.onButtonHover === 'function') {
            opt.onButtonHover(anime, _this._button);
            return;
          }
          anime({
            targets: _this._button,
            scale: 1.2,
            duration: 500
          });
        });
        this._button.addEventListener('mouseout', function () {
          anime({
            targets: _this._button,
            scale: 1,
            duration: 500
          });
        });
        this._button.addEventListener('click', function () {
          _this._run();
        });
      }
    }, {
      key: "_run",
      value: function _run() {
        var _this2 = this;
        if (this._running) return;
        var opt = this.option;
        if (opt.limit > 0 && this._count >= opt.limit) {
          opt.onFail && typeof opt.onFail === 'function' && opt.onFail();
          return;
        }
        var runAnime = function runAnime(pie) {
          if (_this2._rotation > 0) {
            var revision = 360 - _this2._rotation % 360;
            _this2._rotation += revision;
          }
          _this2._rotation += getRotation(pie, _this2._deg, opt.turn);
          anime({
            targets: _this2._turntable,
            rotate: opt.clockwise ? _this2._rotation + 'deg' : '-' + _this2._rotation + 'deg',
            duration: opt.duration,
            begin: function begin() {
              _this2._running = true;
            },
            complete: function complete() {
              _this2._running = false;
              ++_this2._count;
              if (opt.onSuccess && typeof opt.onSuccess === 'function') {
                var d = opt.clockwise ? opt.data[(opt.data.length - pie) % opt.data.length] : opt.data[pie];
                opt.onSuccess(d);
              }
            }
          });
        };
        var random = Math.random() * this._weightSum;
        var randomWeight = 0;
        var pie = 0;
        for (var i in this._weight) {
          randomWeight += this._weight[i];
          if (randomWeight > random) {
            pie = i;
            runAnime(pie);
            break;
          }
        }
      }
    }]);
    return Wheel;
  }();
  function getInnerRadius(radius) {
    if (radius < 50) return radius;
    if (radius < 100) return radius - 10;
    return Math.round(radius / 10) * 9;
  }
  function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    var d = "M ".concat(start.x, " ").concat(start.y, " A ").concat(radius, " ").concat(radius, " 0 ").concat(largeArcFlag, " 0 ").concat(end.x, " ").concat(end.y, " L ").concat(x, " ").concat(y, " L ").concat(start.x, " ").concat(start.y);
    var l = start.x - end.x;
    return [d, l, start, end];
  }
  function getRotation(i, deg, minTurn) {
    return minTurn * 360 + i * deg;
  }

  return Wheel;

}));
