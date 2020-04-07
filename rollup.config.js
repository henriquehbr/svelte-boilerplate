import path from 'path'

const production = !process.env.ROLLUP_WATCH

export default {
	input: './src/index.ts',
	output: {
		format: 'es',
		name: 'app',
		dir: 'public/build'
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
		!production && require('rollup-plugin-serve')('public'),
		!production && require('rollup-plugin-livereload')('public'),
		require('rollup-plugin-terser').terser()
	]
}
