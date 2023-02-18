import * as anime from 'animejs'

interface ImageOptions {
  // The image for the turntable.
  turnable: string
  // The image for the button.
  // It's width is controled by `buttonWidth` property
  // and the aspect ratio will be preserved.
  // Centered in the turntable by default.
  button: string
  // The y-axis offsets for the button.
  // If negative, the button moves up.
  offset: number
}

interface Prize {
  text: string
  chance: number
  color?: string
  fontColor?: string
  fontSize?: number
}

interface PrizeOptions {
  // The name for the prize. Default: ''
  text?: string
  // The probability the prize to be drawn.
  // The higher the value, the more chances the prize to be picked up.
  // The probability is actually calculated by the formula
  // `probability = 1 * chance / (sum of every prize's chance)`
  // Default: 1
  chance?: number
  // The background color for the prize.
  // Will override `color.prize` of Wheel.
  color?: string
  // The color of the text
  // Will override `color.fontColor` of Wheel.
  fontColor?: string
  // The size of the text
  // Will override `fontSize` of Wheel.
  fontSize?: number
}

// A theme is an object where stores the colors used in the wheel.
interface Theme {
  // background color for the wheel's border
  border: string
  // background color for the prize part
  prize: string
  // background color for the button
  button: string
  // color for the line between prize parts
  line: string
  // color for prize text
  prizeFont: string
  // color for button text
  buttonFont: string
}

interface WheelOptions {
  // The `el` property defines the element where to render the wheel.
  // You should pass a DOM Element to it.
  el: HTMLElement
  // The `data` property use an array to define the things
  // relating to the lottery game itself.
  // The length of the array must between 3 and 12.
  data: Array<string | PrizeOptions>
  // The top-left corner of the wheel related to its parent element (the `el` element).
  // Default: [0, 0]
  pos?: [number, number]
  // The radius of the wheel in `px`. Default: 100
  radius?: number
  // The size of text for prizes.
  fontSize?: number
  // The text on the button. Default: 'Draw'
  buttonText?: string
  // The width of the button in `px`. Default: 50
  buttonWidth?: number
  // The size of text on the button.
  buttonFontSize?: number
  // If the text on each prize rotate 90 degrees. Default: false
  textRotate?: boolean
  // The maxium times the wheel can be run. Default: 0(unlimited)
  limit?: number
  // How long will the animation last in millseconds. Default: 5000
  duration?: number
  // The minimum amount of circles the wheel will turn during the animation.
  // Default: 4
  turn?: number
  // If true, the wheel will be rendered immediately the instance created.
  // Otherwise, you should call `draw()` to manually render it.
  // Default: true
  draw?: boolean
  // If true, the rotation movement will be clockwise.
  // Otherwise, it will be counter-clockwise.
  // Default: true
  clockwise?: boolean
  // The color preset to be used. Default: 'default'
  theme?: 'default' | 'light' | 'dark'
  // Allow you to render the wheel using image resources.
  image?: ImageOptions
  // An object used to override the color in the current theme.
  color?: Theme
  // The callback function called when a prize is drawn successfully.
  onSuccess?: (data: Prize) => void
  // The callback function called when trying to draw prize
  // while has already drawn `limit` times.
  onFail?: () => void
  // The function called when the mouse moves over the button.
  onButtonHover?: (
    anime: (params: anime.AnimeParams) => anime.AnimeInstance,
    button: SVGImageElement
  ) => void
}

declare class Wheel {
  constructor(option: WheelOptions)
  // To manually render the wheel when the `draw` property is set to false.
  draw: () => void
}

export default Wheel
