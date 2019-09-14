import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default [
{
    input: 'index.js',
    plugins: [
        resolve(
        {
            preferBuiltins: false
        }),
        commonjs(),
        terser()
    ],
    output:
    {
        file: 'dist/shape-points.js',
        format: 'umd',
        name: 'ShapePoints',
        sourcemap: true
    }
},
{
    input: 'index.js',
    plugins: [
        resolve(
        {
            preferBuiltins: false
        }),
        commonjs()
    ],
    output:
    {
        file: 'dist/shape-points.es.js',
        format: 'esm',
        sourcemap: true
    }
}]