import { register, init, getLocaleFromNavigator } from 'svelte-i18n'

register('en', () => import('./en.json'))
register('pt', () => import('./pt.json'))

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
})
