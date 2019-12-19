import path from 'path'

import resolve from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'

import svelte from 'rollup-plugin-svelte'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import serve from 'rollup-plugin-serve'
import bundleSize from 'rollup-plugin-bundle-size'
import brotli from 'rollup-plugin-brotli'
import livereload from 'rollup-plugin-livereload'

import sveltePreprocess from 'svelte-preprocess'

const production = !process.env.ROLLUP_WATCH

export default {
	input: './src/index.ts',
	output: {
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			dev: !production,
			css: css => css.write('public/build/bundle.css', false),
			preprocess: sveltePreprocess()
		}),
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
			customResolveOptions: {
				moduleDirectory: ['src', 'node_modules'],
				extensions: ['.svelte', '/index.svelte', '.mjs', '.js', '.json']
			}
		}),
		alias({
			entries: {
				components: path.resolve(__dirname, 'src', 'components')
			}
		}),
		typescript({ objectHashIgnoreUnknownHack: true }),
		commonjs(),
		bundleSize(),
		production && brotli({ additional: ['public/build/bundle.css'] }),
		!production && serve('public'),
		!production && livereload('public'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}
