import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const babelOption = {
  presets: [['@babel/env', { modules: false }]]
}

export default [{
  input: 'src/index.js',
  plugins: [
    commonjs(),
    resolve(),
    babel(babelOption),
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
    babel(babelOption),
    terser(),
    filesize()
  ],
  output: {
    file: 'dist/lottery-wheel.min.js',
    format: 'umd',
    name: 'Wheel'
  }
}]
