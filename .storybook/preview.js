import { addParameters } from '@storybook/svelte'

addParameters({
	backgrounds: [
		{ name: 'Dodger blue', value: '#1e90ff' },
		{ name: 'Wine', value: '#722f37' },
	],
	viewport: {
		viewports: {
			iPhone5: {
				name: 'iPhone 5/SE',
				styles: {
					width: '320px',
					height: '568px',
				},
			},
			motoG4: {
				name: 'Moto G4',
				styles: {
					width: '360px',
					height: '640px',
				},
			},
		}
	},
})
