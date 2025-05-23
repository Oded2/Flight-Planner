import { writable, derived } from 'svelte/store';
import english from '../translations/en.json';
import hebrew from '../translations/he.json';

const localeMap: Record<string, Record<string, string>> = {
	en: english,
	he: hebrew
};

export const locale = writable('en');

// Derived store that updates translations automatically
export const t = derived(locale, (newLocale) => {
	const translations = localeMap[newLocale] ?? {};
	return (key: string) => translations[key] ?? key;
});

export function setLocale(loc: string) {
	locale.set(loc);
}
