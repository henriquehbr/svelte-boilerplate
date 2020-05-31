import { Card } from 'components'
import { withA11y } from '@storybook/addon-a11y'

export default {
	title: 'Card',
	decorators: [withA11y]
}

export const defaultCard = () => ({
	Component: Card
})
