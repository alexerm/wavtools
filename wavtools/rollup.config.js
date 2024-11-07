import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
  {
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
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript()
    ]
  },
  {
    input: 'index.js',
    output: [{ file: 'dist/wavtools.d.ts', format: 'es' }],
    plugins: [dts()]
  }
];
