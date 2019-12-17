import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config: webpack.Configuration = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, '/dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						preprocess: require('svelte-preprocess')({})
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.mjs', '.ts', '.js', '.json', '.svelte'],
		modules: ['./src/', 'node_modules'],
		alias: {
			'*': path.resolve(__dirname, 'src'),
			components: path.resolve(__dirname, 'src/components')
		}
	},
	plugins: [
		new HtmlWebpackPlugin()
	]
}

export default config
