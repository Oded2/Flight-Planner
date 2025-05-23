import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./en.json'));
register('he', () => import('./he.json'));

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
});
