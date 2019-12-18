import svelte from 'rollup-plugin-svelte'
import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import html from '@rollup/plugin-html'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import sveltePreprocess from 'svelte-preprocess'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import bundleSize from 'rollup-plugin-bundle-size'
import brotli from 'rollup-plugin-brotli'

export default {
	input: './src/index.ts',
	output: {
		format: 'iife',
		name: 'app',
		file: 'build/bundle.js'
	},
	plugins: [
		svelte({ dev: false, emitCss: true, preprocess: sveltePreprocess() }),
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
			customResolveOptions: {
				moduleDirectory: ['src', 'node_modules'],
				extensions: ['.svelte', '.mjs', '.js', '.json']
			}
		}),
		alias({
			entries: {
				components: path.resolve(__dirname, 'src', 'components')
			}
		}),
		typescript({ objectHashIgnoreUnknownHack: true }),
		terser(),
		commonjs(),
		postcss({ extract: true, minimize: true }),
		html(),
		brotli({ additional: ['build/bundle.css'] }),
		bundleSize()
	]
}
