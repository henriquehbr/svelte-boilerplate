import path from 'path'

const production = !process.env.ROLLUP_WATCH

export default {
	input: './src/index.ts',
	output: {
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		require('rollup-plugin-svelte')({
			dev: !production,
			css: css => css.write('public/build/bundle.css', false),
			preprocess: require('svelte-preprocess')()
		}),
		require('@rollup/plugin-node-resolve')({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
			customResolveOptions: {
				moduleDirectory: ['src', 'node_modules'],
				extensions: ['.svelte', '/index.svelte', '.mjs', '.js', '.json']
			}
		}),
		require('@rollup/plugin-alias')({
			entries: {
				components: path.resolve(__dirname, 'src', 'components')
			}
		}),
		require('@rollup/plugin-typescript')(),
		require('@rollup/plugin-commonjs')(),
		require('rollup-plugin-bundle-size')(),
		production && require('rollup-plugin-brotli')({ additional: ['public/build/bundle.css'] }),
		!production && require('rollup-plugin-serve')('public'),
		!production && require('rollup-plugin-livereload')('public'),
		production && require('rollup-plugin-terser').terser()
	]
}
