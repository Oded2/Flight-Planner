import { writable, derived } from 'svelte/store';
import english from '../translations/en.json';
import hebrew from '../translations/he.json';
import arabic from '../translations/ar.json';

export const localeMap: Record<
	string,
	{
		label: string;
		map: Record<string, string>;
	}
> = {
	en: {
		label: 'English',
		map: english
	},
	he: {
		label: 'עברית',
		map: hebrew
	},
	ar: {
		label: 'عربي',
		map: arabic
	}
};

export const locale = writable('en');

// Derived store that updates translations automatically
export const t = derived(locale, (newLocale) => {
	const translations = localeMap[newLocale] ?? {};
	return (key: string) => translations.map[key] ?? key;
});

export function updateLocale(newLocale: string) {
	locale.set(newLocale);
	localStorage.setItem('locale', newLocale);
}
