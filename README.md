[![Build Status](https://travis-ci.com/fralonra/lottery-wheel.svg?branch=master)](https://travis-ci.com/fralonra/lottery-wheel)
[![npm version](https://img.shields.io/npm/v/lottery-wheel.svg)](https://www.npmjs.com/package/lottery-wheel)
[![Greenkeeper badge](https://badges.greenkeeper.io/fralonra/lottery-wheel.svg)](https://greenkeeper.io/)

# lottery-wheel

A library helps you performing a wheel for lottery game. Using [Snap.svg](https://github.com/adobe-webplatform/Snap.svg) and [anime.js](https://github.com/juliangarnier/anime/).

[demo](https://fralonra.github.io/lottery-wheel/demo/)

# Usage

```bash
npm install lottery-wheel
```
Or download the latest [release](https://github.com/fralonra/lottery-wheel/releases).

Then link `lottery-wheel.min.js` or `lottery-wheel.js` in your HTML.
```html
<script src="/path/to/lottery-wheel.min.js"></script>
```

Supposed you have an element whose id is 'wheel' in your html file.
```html
<svg id="wheel"></svg>
```

Then you can do the following to create a wheel:
```javascript
const wheel = new Wheel({
  el: document.getElementById('wheel'),
  data: [{
    text: 'apple',
    chance: 20
  }, {
    text: 'banana'
  }, {
    text: 'orange'
  }, {
    text: 'peach'
  }],
  onSuccess(data) {
    console.log(data.text);
  }
});
```

# API

## Methods

### constructor(option)

More for `option`, see [below](#options).

### draw()
To manually render the wheel when the `draw` property is set to false.
```javascript
const wheel = new Wheel({
  el: document.getElementById('wheel'),
  data: ['Beijing', 'London', 'New York', 'Tokyo'],
  draw: false
});
setTimeout(() => {
  wheel.draw();
}, 2000);
```

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| el | The element where the wheel mounted. [Details](#el). | Object | - |
| data | An array of prizes. [Details](#data). | Array | - |
| pos | The top-left corner of the wheel related to its parent element (the `el` element). | Array | [0, 0]
| radius | The radius of the wheel in `px`. | Number | 100 |
| buttonText | The text on the button. | String | 'Draw' |
| fontSize | The size of text for prizes. | Number | (auto generate) |
| buttonWidth | The width of the button in `px`. | Number | 50 |
| buttonFontSize | The size of text on the button. | Number | (auto generate) |
| limit | The maxium times the wheel can be run. | Number | 0 (unlimited) |
| duration | How long will the animation last in millseconds. | Number | 5000 |
| turn | The minimum amount of circles the wheel will turn during the animation. | Number | 4 |
| draw | If true, the wheel will be rendered immediately the instance created. Otherwise, you should call [draw](#draw) to manually render it. | Boolean | true |
| clockwise | If true, the rotation movement will be clockwise. Otherwise, it will be counter-clockwise. | Boolean | true |
| theme | The color preset to be used. [Details](#themes). | String | 'default' |
| image | Allow you to render the wheel using image resources. See [image](#image). | Object | - |
| color | An object used to override the color in the current theme. See [themes](#themes) | Object | - |
| onSuccess | The callback function called when a prize is drawn successfully. [Details](#onsuccess). | Function | - |
| onFail | The callback function called when trying to draw prize while has already drawn `limit` times. [Details](#onfail). | Function | - |
| onButtonHover | The function called when the mouse moves over the button. [Details](#onbuttonhover) | Function | - |

### el
The `el` property defines the element where to render the wheel. You should pass a
DOM Element to it:
```javascript
const wheel = new Wheel({
  el: document.getElementById('wheel'),
  data: []
});
```

### data
The `data` property use an array to define the things relating to the lottery game itself. The length of the array must between 3 and 12.

The simplest way is to put the name of each prize in an array:
```javascript
const wheel = new Wheel({
  el: document.getElementById('wheel'),
  data: ['Beijing', 'London', 'New York', 'Tokyo']
});
```
It will generate the following wheel with default [options](#options). Every prizes take the same chance to be drawn, as the program will create four 'prize' objects with their `text` property set to the string in `data` array and `chance` property to `1` automatically.

![](/doc/images/data.png)

You can also custom each prize by making it an object. The properties for the 'prize' object are listed [here](#prize-object).
```javascript
const wheel = new Wheel({
  el: document.getElementById('wheel'),
  data: [{
    text: 'Beijing',
    chance: 5
  }, {
    text: 'London',
    chance: 4
  }, 'New York', 'Tokyo']
});
```

### onSuccess
The callback function called when a prize is drawn successfully.

| Parameter | Description | Type |
| --- | --- | --- |
| data | The drawn '[prize](#prize-object)' object. | Object |

```javascript
const wheel = new Wheel({
  el: document.getElementById('wheel'),
  data: ['prize A', 'prize B', 'prize C', 'prize D'],
  onSuccess(data) {
    alert(`Congratulations! You picked up ${data.text}`);
  }
});
```

### onFail
The callback function called when trying to draw prize while has already drawn the maximum times (defined in `limit`). Notice that by the default options, one can draw unlimited times.

```javascript
const wheel = new Wheel({
  el: document.getElementById('wheel'),
  data: ['prize A', 'prize B', 'prize C', 'prize D'],
  limit: 1,
  onFail() {
    alert('You have no more chance to draw');
  }
});
```
In this case, if one has already drawn a prize, the next time he clicks the button the alert dialog will be shown.

### onButtonHover
Called when the mouse is moving over the button.

| Parameter | Description | Type |
| --- | --- | --- |
| anime | Refer to animejs. See the [doc](https://github.com/juliangarnier/anime) for usage.|  |
| button | Refer to the Snap [Element](http://snapsvg.io/docs/#Element) where the button lies. | Object |

```javascript
const wheel = new Wheel({
  el: document.getElementById('wheel'),
  data: ['prize A', 'prize B', 'prize C', 'prize D'],
  onButtonHover(anime, button) {
    anime({
      targets: button.node,
      scale: 1.2,
      duration: 500
    });
  }
});
```

## Prize Object

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| text | The name for the prize | String | '' |
| chance | The probability the prize to be drawn. The higher the value, the more chances the prize to be picked up. The probability is actually calculated by the formula `probability = 1 * chance / (sum of every prize's chance)` | Number | 1 |
| color | The background color for the prize (will override `color.prize` of Wheel). | String | - |
| fontColor | The color of the text (will override `color.fontColor` of Wheel). | String | - |
| fontSize | The size of the text (will override `fontSize` of Wheel). | Number | - |

```javascript
const wheel = new Wheel({
  el: document.getElementById('wheel'),
  data: [{
    text: 'Beijing',
    color: 'silver',
    fontSize: 24
  }, {
    text: 'London',
    fontColor: '#008000'
  }, 'New York', 'Tokyo']
});
```
The above code will result the following wheel:

![](/doc/images/prize.png)

## Themes

A theme is an object where stores the colors used in the wheel. It has following properties:
* border: background color for the wheel's border.
* prize: background color for the prize part.
* button: background color for the button.
* line: color for the line between prize parts.
* prizeFont: color for prize text.
* buttonFont: color for button text.

There are three themes preseted:

* default
```javascript
default: {
    border: 'red',
    prize: 'gold',
    button: 'darkorange',
    line: 'red',
    prizeFont: 'red',
    buttonFont: 'white'
}
```

* light
```javascript
light: {
    border: 'orange',
    prize: 'lightyellow',
    button: 'tomato',
    line: 'orange',
    prizeFont: 'orange',
    buttonFont: 'white'
}
```
![theme light](/doc/images/theme-light.png)

* dark
```javascript
dark: {
    border: 'silver',
    prize: 'dimgray',
    button: 'darkslategray',
    line: 'silver',
    prizeFont: 'silver',
    buttonFont: 'lightyellow'
}
 ```
![theme dark](/doc/images/theme-dark.png)

You can also change the color by setting `color` property.
```javascript
const wheel = new Wheel({
  el: document.getElementById('wheel'),
  data: ['Beijing', 'London', 'New York', 'Tokyo'],
  theme: 'dark',
  color: {
    button: '#fef5e7',
    buttonFont: '#34495e'
  }
});
```
![setting color](/doc/images/color.png)

## Image
The `image` property lets you render the wheel using the existing resources by setting an object. It will make an `image` SVG element and it supports jpeg, png and svg formats.

| Property | Description | Type |
| --- | --- | --- |
| turntable | The image for the turntable. | String |
| button | The image for the button. It's width is controled by `buttonWidth` property and the aspect ratio will be preserved. Centered in the turntable by default. | String |
| offset | The y-axis offsets for the button. If negative, the button moves up. | Number |

Here's an example of how it looks like when using the images in [/doc/images](https://github.com/fralonra/lottery-wheel/tree/master/doc/images) folder in this repo.
```javascript
const wheel = new Wheel({
  el: document.getElementById('wheel'),
  data: ['Prize A', 'Prize B', 'Prize C', 'Prize D', 'Prize E', 'Prize F'],
  image: {
    turntable: 'turntable.png',
    button: 'button.png',
    offset: -10
  },
});
```
![image example](/doc/images/image.png)
