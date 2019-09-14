import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
    input: 'docs/code.js',
    plugins: [
        resolve({
            preferBuiltins: false,
            browser: true
        }),
        commonjs()
    ],
    output:
    {
        file: 'docs/index.js',
        format: 'iife',
        sourcemap: true
    }
}