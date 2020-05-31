const path = require('path')
const webpack = require('webpack')

module.exports = {
	stories: ['../src/stories/**/*.stories.ts'],
	addons: ['@storybook/addon-backgrounds'],
	webpackFinal: async (/** @type {webpack.Configuration} */ config) => {
		config.module.rules.push({
			test: /\.ts$/,
			use: [
				{
					loader: require.resolve('ts-loader'),
				},
			],
		})
		config.resolve.extensions.push('.ts', '.svelte')
		config.resolve.alias.components = path.resolve(__dirname, '..', 'src', 'components')
		config.resolve.modules.push('../src', '../node_modules')
		return config
	},
}
