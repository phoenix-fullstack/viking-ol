// @ts-nocheck
import typescript from 'rollup-plugin-typescript';

export default {
  input: './src/index.ts',
  plugins: [
    typescript()
  ],
  external: ['react', 'react-dom']
}