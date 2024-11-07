import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/wavtools.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/wavtools.umd.js', 
      format: 'umd',
      name: 'WavTools',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs()
  ]
};
