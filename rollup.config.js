import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default [{
  input: 'src/index.js',
  plugins: [
    commonjs(),
    resolve(),
    filesize()
  ],
  output: {
    file: 'dist/lottery-wheel.js',
    format: 'umd',
    name: 'Wheel'
  }
}, {
  input: 'src/index.js',
  plugins: [
    commonjs(),
    resolve(),
    terser(),
    filesize()
  ],
  output: {
    file: 'dist/lottery-wheel.min.js',
    format: 'umd',
    name: 'Wheel'
  }
}]
