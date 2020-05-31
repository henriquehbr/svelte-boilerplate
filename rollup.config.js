import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
	input: './src/index.ts',
	output: {
		format: 'es',
		name: 'app',
		dir: 'public/build'
	},
	plugins: [
		json(),
		svelte({
			dev: !production,
			css: css => css.write('public/build/bundle.css', false),
			preprocess: require('svelte-preprocess')()
		}),
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
			customResolveOptions: {
				moduleDirectory: ['src', 'node_modules'],
				extensions: ['.svelte', '/index.svelte', '.mjs', '.js', '.json']
			}
		}),
		commonjs(),
		typescript(),
		alias({
			entries: {
				components: path.resolve(__dirname, 'src', 'components'),
				styles: path.resolve(__dirname, 'src', 'styles')
			}
		}),
		serve('public'),
		!production && livereload('public'),
		production && terser(),
	],
	onwarn: warning => {
		if (warning.code === 'THIS_IS_UNDEFINED') return
	}
}
